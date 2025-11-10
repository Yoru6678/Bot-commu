const embeds = require('../../utils/embeds');
const { resolveMember } = require('../../utils/validators');

module.exports = {
    name: 'avatar',
    description: 'Afficher l\'avatar d\'un utilisateur',
    category: 'information',
    async execute(message, args, client) {
        try {
            const target = (await resolveMember(message.guild, args[0])) || message.member;
            const url = target.user.displayAvatarURL({ dynamic: true, size: 4096 });
            return message.reply({ embeds: [embeds.info(`[Télécharger l'avatar](${url})`, `${target.user.tag} — Avatar`)] });
        } catch (err) {
            client.logger.error('Error in avatar: ' + err.stack);
            return message.reply({ embeds: [embeds.error('Erreur lors de la récupération de l\'avatar')] });
        }
    }
};
