const embeds = require('../../utils/embeds');
const db = require('../../database/database');

module.exports = {
    name: 'afk',
    description: 'Définir un statut AFK',
    category: 'utility',
    aliases: ['away'],
    cooldown: 5,
    usage: '[raison]',
    
    async execute(message, args, client) {
        try {
            const reason = args.join(' ') || 'AFK';
            
            const stmt = db.db.prepare('INSERT OR REPLACE INTO afk_status (user_id, reason, since) VALUES (?, ?, ?)');
            stmt.run(message.author.id, reason, new Date().toISOString());

            const embed = embeds.success(`Vous êtes maintenant AFK: ${reason}`, 'Statut AFK activé');
            await message.reply({ embeds: [embed] });

            client.logger.command(`AFK set by ${message.author.tag}: ${reason}`);
        } catch (err) {
            client.logger.error('AFK command error: ' + err.message);
            return message.reply({ embeds: [embeds.error('Erreur lors de la définition du statut AFK.')] });
        }
    }
};
