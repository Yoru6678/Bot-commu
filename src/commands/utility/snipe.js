const embeds = require('../../utils/embeds');
const CacheService = require('../../services/CacheService');

module.exports = {
    name: 'snipe',
    description: 'Affiche le dernier message supprimé',
    category: 'utility',
    aliases: ['s'],
    cooldown: 3,
    
    async execute(message, args, client) {
        try {
            const deleted = CacheService.getDeletedMessage(message.channel.id);

            if (!deleted) {
                return message.reply({ embeds: [embeds.error('Aucun message supprimé récemment dans ce salon.')] });
            }

            const embed = embeds.info('', '🔍 Message Supprimé', {
                fields: [
                    { name: '👤 Auteur', value: deleted.author.tag, inline: true },
                    { name: '📅 Date', value: deleted.createdAt.toLocaleString('fr-FR'), inline: true },
                    { name: '💬 Contenu', value: deleted.content || '*Aucun contenu texte*', inline: false }
                ]
            });

            if (deleted.attachments.length > 0) {
                embed.addFields({ name: '📎 Pièces jointes', value: deleted.attachments.map(a => a.name).join(', '), inline: false });
            }

            return message.reply({ embeds: [embed] });
        } catch (err) {
            client.logger.error('Snipe command error: ' + err.message);
            return message.reply({ embeds: [embeds.error('Erreur lors de la récupération du message.')] });
        }
    }
};
