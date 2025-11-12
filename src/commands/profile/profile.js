const { EmbedBuilder } = require('discord.js');
const { progressBar } = require('../../utils/embed');

module.exports = {
    name: 'profile',
    aliases: ['profil', 'p'],
    description: 'Affiche ton profil ou celui d\'un autre membre',
    cooldown: 3,
    async execute(message, args, client) {
        const target = message.mentions.users.first() || message.author;
        const user = client.db.getUser(target.id, message.guild.id);

        const xpForNext = Math.pow(user.level + 1, 2) * 100;
        const xpCurrent = user.xp - (Math.pow(user.level, 2) * 100);
        const xpNeeded = xpForNext - (Math.pow(user.level, 2) * 100);

        const member = await message.guild.members.fetch(target.id);
        const joinedAt = Math.floor(member.joinedTimestamp / 1000);

        const rank = client.db.getUserRank(target.id, message.guild.id, 'xp');

        const embed = new EmbedBuilder()
            .setTitle(`📊 Profil de ${target.username}`)
            .setColor(client.config.EMBED_COLOR)
            .setThumbnail(target.displayAvatarURL({ dynamic: true, size: 256 }))
            .addFields(
                { name: '🎯 Niveau', value: `**${user.level}** (#${rank})`, inline: true },
                { name: '⭐ XP Total', value: `${user.xp.toLocaleString()} XP`, inline: true },
                { name: '❤️ Réputation', value: `${user.rep} pts`, inline: true },
                { name: '📈 Progression', value: `${progressBar(xpCurrent, xpNeeded, 15)}\n${xpCurrent}/${xpNeeded} XP`, inline: false },
                { name: '💬 Messages', value: user.message_count.toLocaleString(), inline: true },
                { name: '🎤 Temps Vocal', value: `${Math.floor(user.voice_time / 60)}h ${user.voice_time % 60}m`, inline: true },
                { name: '📅 Membre depuis', value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>`, inline: true },
            )
            .setFooter({ text: `ID: ${target.id}` })
            .setTimestamp();

        if (user.bio) {
            embed.addFields({ name: '📝 Bio', value: user.bio, inline: false });
        }

        if (user.married_to) {
            const marriedUser = await client.users.fetch(user.married_to.split('-')[0]).catch(() => null);
            if (marriedUser) {
                embed.addFields({ name: '💍 Marié(e) à', value: marriedUser.username, inline: false });
            }
        }

        if (member.premiumSince) {
            embed.addFields({ name: '💎 Booster', value: '✅ Merci pour ton soutien !', inline: false });
        }

        message.reply({ embeds: [embed] });
    }
};
