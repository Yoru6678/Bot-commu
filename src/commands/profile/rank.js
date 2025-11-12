const { EmbedBuilder } = require('discord.js');
const { progressBar } = require('../../utils/embed');

module.exports = {
    name: 'rank',
    aliases: ['niveau', 'level'],
    description: 'Affiche ta carte de rang',
    cooldown: 3,
    async execute(message, args, client) {
        const target = message.mentions.users.first() || message.author;
        const user = client.db.getUser(target.id, message.guild.id);

        const xpForNext = Math.pow(user.level + 1, 2) * 100;
        const xpCurrent = user.xp - (Math.pow(user.level, 2) * 100);
        const xpNeeded = xpForNext - (Math.pow(user.level, 2) * 100);
        const percentage = Math.floor((xpCurrent / xpNeeded) * 100);

        const rank = client.db.getUserRank(target.id, message.guild.id, 'xp');

        const embed = new EmbedBuilder()
            .setTitle(`🎯 Rang de ${target.username}`)
            .setColor(client.config.EMBED_COLOR)
            .setThumbnail(target.displayAvatarURL({ dynamic: true }))
            .setDescription(`
**Niveau:** ${user.level} ⭐
**Rang:** #${rank} 🏆
**XP Total:** ${user.xp.toLocaleString()}

**Progression vers niveau ${user.level + 1}:**
${progressBar(xpCurrent, xpNeeded, 20)}
${xpCurrent.toLocaleString()} / ${xpNeeded.toLocaleString()} XP (${percentage}%)

💰 **Coins:** ${user.coins.toLocaleString()}
            `)
            .setTimestamp();

        message.reply({ embeds: [embed] });
    }
};
