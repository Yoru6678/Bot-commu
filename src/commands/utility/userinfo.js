const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'userinfo',
    aliases: ['ui', 'whois', 'user'],
    description: 'Affiche les informations d\'un utilisateur',
    cooldown: 3,
    async execute(message, args, client) {
        const target = message.mentions.users.first() || message.author;
        const member = await message.guild.members.fetch(target.id);

        const roles = member.roles.cache
            .filter(r => r.id !== message.guild.id)
            .sort((a, b) => b.position - a.position)
            .map(r => r.toString())
            .slice(0, 10);

        const embed = new EmbedBuilder()
            .setTitle(`👤 Informations sur ${target.username}`)
            .setThumbnail(target.displayAvatarURL({ dynamic: true, size: 256 }))
            .setColor(member.displayHexColor || client.config.EMBED_COLOR)
            .addFields(
                { name: '🏷️ Tag', value: target.tag, inline: true },
                { name: '🆔 ID', value: target.id, inline: true },
                { name: '🤖 Bot', value: target.bot ? 'Oui' : 'Non', inline: true },
                { name: '📅 Compte créé', value: `<t:${Math.floor(target.createdTimestamp / 1000)}:R>`, inline: true },
                { name: '📥 A rejoint', value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>`, inline: true },
                { name: `🎭 Rôles [${member.roles.cache.size - 1}]`, value: roles.length > 0 ? roles.join(', ') : 'Aucun', inline: false },
            )
            .setTimestamp();

        if (member.premiumSince) {
            embed.addFields({ name: '💎 Boost', value: `Depuis <t:${Math.floor(member.premiumSinceTimestamp / 1000)}:R>`, inline: false });
        }

        message.reply({ embeds: [embed] });
    }
};
