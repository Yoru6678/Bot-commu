const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'avatar',
    aliases: ['av', 'pfp'],
    description: 'Affiche l\'avatar d\'un utilisateur',
    cooldown: 3,
    async execute(message, args, client) {
        const target = message.mentions.users.first() || message.author;

        const embed = new EmbedBuilder()
            .setTitle(`🖼️ Avatar de ${target.username}`)
            .setColor(client.config.EMBED_COLOR)
            .setImage(target.displayAvatarURL({ dynamic: true, size: 4096 }))
            .setDescription(`[Télécharger](${target.displayAvatarURL({ dynamic: true, size: 4096 })})`)
            .setTimestamp();

        message.reply({ embeds: [embed] });
    }
};
