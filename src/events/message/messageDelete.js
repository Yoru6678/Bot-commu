const { Events } = require('discord.js');
const CacheService = require('../../services/CacheService');
const logger = require('../../utils/logger');

module.exports = {
    name: Events.MessageDelete,
    once: false,
    
    async execute(message, client) {
        try {
            if (message.author?.bot) return;
            if (!message.content && message.attachments.size === 0) return;
            
            CacheService.cacheDeletedMessage(message);
            logger.debug(`📝 Message deleted cached from ${message.author?.tag} in ${message.channel.id}`);
        } catch (error) {
            logger.error('[MessageDelete] Error:', error);
        }
    }
};
