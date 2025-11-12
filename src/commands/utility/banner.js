const embeds = require('../../utils/embeds');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'banner',
    description: 'Affiche la bannière Discord d\'un membre',
    category: 'utility',
    aliases: ['banniere'],
    cooldown: 3,
    usage: '[@user]',
    
    async execute(message, args, client) {
        try {
            let user = message.mentions.users.first() || message.author;
            
            if (args[0] && !message.mentions.users.first()) {
                try {
                    user = await client.users.fetch(args[0]);
                } catch {
                    user = message.author;
                }
            }

            const fetchedUser = await user.fetch(true);
            const banner = fetchedUser.bannerURL({ size: 4096, dynamic: true });

            if (!banner) {
                return message.reply({ embeds: [embeds.error(`${user.tag} n'a pas de bannière définie.`)] });
            }

            const embed = new EmbedBuilder()
                .setTitle(`🎨 Bannière de ${user.tag}`)
                .setImage(banner)
                .setColor(client.config.EMBED_COLOR || '#FF69B4')
                .setTimestamp();

            return message.reply({ embeds: [embed] });
        } catch (err) {
            client.logger.error('Banner command error: ' + err.message);
            return message.reply({ embeds: [embeds.error('Erreur lors de la récupération de la bannière.')] });
        }
    }
};
