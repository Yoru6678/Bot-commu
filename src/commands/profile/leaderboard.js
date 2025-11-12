const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'leaderboard',
    aliases: ['lb', 'top', 'classement'],
    description: 'Affiche le classement du serveur',
    cooldown: 5,
    async execute(message, args, client) {
        const type = args[0]?.toLowerCase() || 'xp';
        const validTypes = ['xp', 'coins', 'vocal', 'messages'];
        
        if (!validTypes.includes(type)) {
            return message.reply('❌ Type invalide ! Utilise: `xp`, `coins`, `vocal`, ou `messages`');
        }

        const leaderboard = client.db.getLeaderboard(message.guild.id, type, 10);

        if (leaderboard.length === 0) {
            return message.reply('❌ Aucune donnée disponible !');
        }

        const medals = ['🥇', '🥈', '🥉'];
        let description = '';

        for (let i = 0; i < leaderboard.length; i++) {
            const userData = leaderboard[i];
            const userId = userData.user_id.split('-')[0];
            const user = await client.users.fetch(userId).catch(() => null);
            const username = user ? user.username : 'Utilisateur inconnu';

            const medal = medals[i] || `**${i + 1}.**`;
            let value;

            switch(type) {
                case 'coins':
                    value = `${userData.coins.toLocaleString()} 💰`;
                    break;
                case 'vocal':
                    const hours = Math.floor(userData.voice_time / 60);
                    const mins = userData.voice_time % 60;
                    value = `${hours}h ${mins}m 🎤`;
                    break;
                case 'messages':
                    value = `${userData.message_count.toLocaleString()} 💬`;
                    break;
                default:
                    value = `Niveau ${userData.level} (${userData.xp.toLocaleString()} XP) ⭐`;
            }

            description += `${medal} **${username}** - ${value}\n`;
        }

        const userKey = `${message.author.id}-${message.guild.id}`;
        const userRank = client.db.getUserRank(message.author.id, message.guild.id, type);
        
        const titles = {
            xp: '⭐ Classement XP',
            coins: '💰 Classement Coins',
            vocal: '🎤 Classement Vocal',
            messages: '💬 Classement Messages'
        };

        const embed = new EmbedBuilder()
            .setTitle(titles[type])
            .setDescription(description)
            .setColor(client.config.EMBED_COLOR)
            .setFooter({ text: `Tu es classé #${userRank}` })
            .setTimestamp();

        message.reply({ embeds: [embed] });
    }
};
