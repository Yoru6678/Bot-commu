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

            const fields = [
                { name: '👤 Auteur', value: deleted.author.tag, inline: true },
                { name: '📅 Date', value: deleted.createdAt.toLocaleString('fr-FR'), inline: true },
                { name: '💬 Contenu', value: deleted.content || '*Aucun contenu texte*', inline: false }
            ];

            if (deleted.attachments && deleted.attachments.length > 0) {
                const attachmentLinks = deleted.attachments.map(a => `[${a.name}](${a.url})`).join('\n');
                fields.push({ name: '📎 Pièces jointes', value: attachmentLinks, inline: false });
            }

            const embed = embeds.info('', '🔍 Message Supprimé', { fields });

            return message.reply({ embeds: [embed] });
        } catch (err) {
            client.logger.error('Snipe command error: ' + err.message);
            return message.reply({ embeds: [embeds.error('Erreur lors de la récupération du message.')] });
        }
    }
};
