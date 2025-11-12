const { Events } = require('discord.js');
const CacheService = require('../../services/CacheService');
const logger = require('../../utils/logger');

module.exports = {
    name: Events.MessageUpdate,
    once: false,
    
    async execute(oldMessage, newMessage, client) {
        try {
            if (newMessage.author?.bot) return;
            if (!oldMessage.content || !newMessage.content) return;
            if (oldMessage.content === newMessage.content) return;
            
            CacheService.cacheEditedMessage(oldMessage, newMessage);
            logger.debug(`✏️ Message edit cached from ${newMessage.author?.tag} in ${newMessage.channel.id}`);
        } catch (error) {
            logger.error('[MessageUpdate] Error:', error);
        }
    }
};
