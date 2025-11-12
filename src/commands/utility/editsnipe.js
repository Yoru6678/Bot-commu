const embeds = require('../../utils/embeds');
const CacheService = require('../../services/CacheService');

module.exports = {
    name: 'editsnipe',
    description: 'Affiche le dernier message modifié',
    category: 'utility',
    aliases: ['es', 'esnipe'],
    cooldown: 3,
    
    async execute(message, args, client) {
        try {
            const edited = CacheService.getEditedMessage(message.channel.id);

            if (!edited) {
                return message.reply({ embeds: [embeds.error('Aucun message modifié récemment dans ce salon.')] });
            }

            const fields = [
                { name: '👤 Auteur', value: edited.author.tag, inline: true },
                { name: '📅 Modifié le', value: edited.editedAt.toLocaleString('fr-FR'), inline: true },
                { name: '📝 Ancien contenu', value: edited.oldContent || '*Aucun contenu*', inline: false },
                { name: '✨ Nouveau contenu', value: edited.newContent || '*Aucun contenu*', inline: false }
            ];

            if (edited.oldAttachments && edited.oldAttachments.length > 0) {
                const oldLinks = edited.oldAttachments.map(a => `[${a.name}](${a.url})`).join('\n');
                fields.push({ name: '📎 Anciennes pièces jointes', value: oldLinks, inline: false });
            }

            if (edited.newAttachments && edited.newAttachments.length > 0) {
                const newLinks = edited.newAttachments.map(a => `[${a.name}](${a.url})`).join('\n');
                fields.push({ name: '✨ Nouvelles pièces jointes', value: newLinks, inline: false });
            }

            const embed = embeds.info('', '✏️ Message Modifié', { fields });

            return message.reply({ embeds: [embed] });
        } catch (err) {
            client.logger.error('Editsnipe command error: ' + err.message);
            return message.reply({ embeds: [embeds.error('Erreur lors de la récupération du message.')] });
        }
    }
};
