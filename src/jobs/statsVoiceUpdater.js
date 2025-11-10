const logger = require('../utils/logger');

/**
 * Periodically updates configured voice channel names to reflect server stats.
 * Reads channel IDs from client.config (STATS_VC_MEMBERS_ONLINE, STATS_VC_VOICE_COUNT) and
 * updates them every STATS_UPDATE_INTERVAL seconds.
 */
module.exports = {
    start: async (client) => {
        try {
            const cfg = client.config || {};
            const membersOnlineChanId = cfg.STATS_VC_MEMBERS_ONLINE;
            const voiceCountChanId = cfg.STATS_VC_VOICE_COUNT;
            const intervalSec = cfg.STATS_UPDATE_INTERVAL || 60;

            if (!membersOnlineChanId && !voiceCountChanId) {
                logger.info('No stats voice channels configured; statsVoiceUpdater disabled.');
                return;
            }

            async function updateOnce() {
                try {
                    // Prepare distinct channel IDs
                    const ids = [membersOnlineChanId, voiceCountChanId].filter(Boolean);
                    for (const id of ids) {
                        const channel = await client.channels.fetch(id).catch(() => null);
                        if (!channel) {
                            logger.warn(`Stats channel ${id} not found in cache or API.`);
                            continue;
                        }

                        const guild = channel.guild;
                        if (!guild) {
                            logger.warn(`Stats channel ${id} is not attached to a guild.`);
                            continue;
                        }

                        // Compute stats (try to fetch members for accuracy when possible)
                        let totalMembers = guild.memberCount || 0;
                        let onlineCount = 0;
                        let voiceCount = 0;
                        try {
                            // fetch members may be heavy on large guilds — ignore failures
                            await guild.members.fetch();
                            onlineCount = guild.members.cache.filter(m => m.presence && m.presence.status !== 'offline').size;
                            voiceCount = guild.members.cache.filter(m => m.voice && m.voice.channel).size;
                        } catch (e) {
                            // fallback to cache-based approximations
                            onlineCount = guild.members.cache.filter(m => m.presence && m.presence.status !== 'offline').size || 0;
                            voiceCount = guild.channels.cache
                                .filter(c => c.isVoiceBased && c.members)
                                .reduce((acc, ch) => acc + ch.members.size, 0);
                        }

                        // Decide which stat to write based on configured channel id
                        if (id === membersOnlineChanId) {
                            const newName = `Membres: ${totalMembers} • Online: ${onlineCount}`;
                            if (channel.name !== newName) {
                                if (!channel.manageable) {
                                    logger.warn(`Cannot rename channel ${id} (no MANAGE_CHANNELS permission).`);
                                } else {
                                    await channel.setName(newName, 'Updating server stats (members/online)');
                                    logger.info(`Updated stats channel ${id} -> ${newName}`);
                                }
                            }
                        }

                        if (id === voiceCountChanId) {
                            const newName = `En vocal: ${voiceCount}`;
                            if (channel.name !== newName) {
                                if (!channel.manageable) {
                                    logger.warn(`Cannot rename channel ${id} (no MANAGE_CHANNELS permission).`);
                                } else {
                                    await channel.setName(newName, 'Updating server stats (voice count)');
                                    logger.info(`Updated voice count channel ${id} -> ${newName}`);
                                }
                            }
                        }
                    }
                } catch (err) {
                    logger.error('Error while updating stats channels: ' + (err.stack || err.message));
                }
            }

            // Initial run then interval
            await updateOnce();
            setInterval(updateOnce, (intervalSec || 60) * 1000);
            logger.info('statsVoiceUpdater started.');
        } catch (err) {
            logger.error('Failed to start statsVoiceUpdater: ' + (err.stack || err.message));
        }
    }
};
