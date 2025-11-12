const config = require('../config');

module.exports = (client) => {
    setInterval(() => {
        client.guilds.cache.forEach(guild => {
            guild.members.cache.forEach(member => {
                if (member.voice.channel && !member.voice.mute && !member.voice.deaf && !member.voice.selfMute && !member.voice.selfDeaf) {
                    const guildConfig = client.db.getGuildConfig(guild.id);
                    if (!guildConfig.leveling_enabled) return;

                    const xpGain = Math.floor(
                        Math.random() * (config.XP.PER_VOICE_MAX - config.XP.PER_VOICE_MIN + 1)
                    ) + config.XP.PER_VOICE_MIN;

                    const result = client.db.addXP(member.id, guild.id, xpGain);

                    if (result.leveledUp) {
                        const user = client.users.cache.get(member.id);
                        if (user) {
                            user.send(`🎉 GG ! Tu es maintenant niveau ${result.newLevel} sur ${guild.name} ! 💪`).catch(() => {});
                        }

                        const reward = config.LEVEL_REWARDS.find(r => r.level === result.newLevel);
                        if (reward) {
                            client.db.addCoins(member.id, guild.id, reward.coins);
                        }
                    }
                }
            });
        });
    }, 5 * 60 * 1000);

    console.log('✅ Voice XP tracker démarré (5 min)');
};
