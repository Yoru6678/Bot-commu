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

            const embed = embeds.info('', '✏️ Message Modifié', {
                fields: [
                    { name: '👤 Auteur', value: edited.author.tag, inline: true },
                    { name: '📅 Modifié le', value: edited.editedAt.toLocaleString('fr-FR'), inline: true },
                    { name: '📝 Ancien contenu', value: edited.oldContent || '*Aucun contenu*', inline: false },
                    { name: '✨ Nouveau contenu', value: edited.newContent || '*Aucun contenu*', inline: false }
                ]
            });

            return message.reply({ embeds: [embed] });
        } catch (err) {
            client.logger.error('Editsnipe command error: ' + err.message);
            return message.reply({ embeds: [embeds.error('Erreur lors de la récupération du message.')] });
        }
    }
};
