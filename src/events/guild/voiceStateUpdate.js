const { Events } = require('discord.js');
const logger = require('../../utils/logger');

module.exports = {
    name: Events.VoiceStateUpdate,
    once: false,
    
    async execute(oldState, newState, client) {
        try {
            if (oldState.channelId !== newState.channelId) {
                const statsJob = require('../../jobs/statsVoiceUpdater');
                if (statsJob && statsJob.updateOnce) {
                    await statsJob.updateOnce(client, newState.guild);
                }
            }
        } catch (error) {
            logger.error('[VoiceStateUpdate] Erreur:', error);
        }
    }
};
