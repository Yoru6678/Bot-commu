const { Events } = require('discord.js');
const logger = require('../../utils/logger');
const cooldownHandler = require('../../handlers/cooldownHandler');

module.exports = {
    name: Events.MessageCreate,
    once: false,
    
    async execute(message, client) {
        try {
            if (message.author.bot) return;
            
            const prefix = client.config.PREFIX || '+';
            if (!message.content.startsWith(prefix)) return;
            
            const args = message.content.slice(prefix.length).trim().split(/ +/);
            const commandName = args.shift().toLowerCase();
            
            logger.debug(`📝 Commande reçue: ${commandName} par ${message.author.tag}`);
            
            const command = client.commands.get(commandName) 
                         || client.commands.get(client.aliases.get(commandName));
            
            if (!command) return;
            
            logger.debug(`✅ Commande trouvée: ${command.name}`);
            
            const cooldownTime = cooldownHandler.isOnCooldown(message.author.id, command.name);
            if (cooldownTime) {
                return message.reply(`⏱️ Attendez ${cooldownTime}s avant de réutiliser cette commande.`);
            }
            
            const cooldown = command.cooldown || 3;
            cooldownHandler.setCooldown(message.author.id, command.name, cooldown);
            
            await command.execute(message, args, client);
            
        } catch (error) {
            logger.error('[MessageCreate] Erreur:', error);
            message.reply('❌ Une erreur est survenue lors de l\'exécution de la commande.').catch(() => {});
        }
    }
};
