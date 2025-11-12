const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'balance',
    aliases: ['bal', 'money', 'coins'],
    description: 'Affiche ton argent',
    cooldown: 3,
    async execute(message, args, client) {
        const target = message.mentions.users.first() || message.author;
        const user = client.db.getUser(target.id, message.guild.id);

        const total = user.coins + user.bank;

        const embed = new EmbedBuilder()
            .setTitle(`💰 Argent de ${target.username}`)
            .setColor(client.config.EMBED_COLOR)
            .setThumbnail(target.displayAvatarURL())
            .addFields(
                { name: '💵 Portefeuille', value: `${user.coins.toLocaleString()} coins`, inline: true },
                { name: '🏦 Banque', value: `${user.bank.toLocaleString()} coins`, inline: true },
                { name: '💎 Total', value: `${total.toLocaleString()} coins`, inline: true }
            )
            .setTimestamp();

        message.reply({ embeds: [embed] });
    }
};
