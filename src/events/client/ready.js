const { Events, ActivityType } = require('discord.js');
const logger = require('../../utils/logger');

module.exports = {
    name: Events.ClientReady,
    once: true,
    
    async execute(client) {
        logger.success(`✅ Bot connecté : ${client.user.tag}`);
        logger.info(`📊 Serveurs : ${client.guilds.cache.size}`);
        logger.info(`👥 Utilisateurs : ${client.users.cache.size}`);
        logger.info(`🎯 Préfixe : ${client.config.PREFIX || '+'}`);
        
        client.user.setPresence({
            activities: [{
                name: '{+} Nami - Protection active',
                type: ActivityType.Watching
            }],
            status: 'online'
        });
        
        logger.success('🛡️ {+} Nami est prêt !');
    }
};
