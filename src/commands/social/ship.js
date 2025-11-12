module.exports = {
    name: 'ship',
    aliases: ['love', 'couple'],
    description: 'Calcule la compatibilité entre deux personnes',
    cooldown: 5,
    async execute(message, args, client) {
        const user1 = message.mentions.users.first() || message.author;
        const user2 = message.mentions.users.toArray()[1] || message.author;

        if (user1.id === user2.id) {
            return message.reply('❌ Mentionne deux personnes différentes ! Exemple: `+ship @user1 @user2`');
        }

        const seed = user1.id + user2.id;
        let hash = 0;
        for (let i = 0; i < seed.length; i++) {
            hash = ((hash << 5) - hash) + seed.charCodeAt(i);
            hash = hash & hash;
        }
        const percentage = Math.abs(hash % 101);

        let heart = '';
        const filled = Math.floor(percentage / 10);
        heart = '❤️'.repeat(filled) + '🤍'.repeat(10 - filled);

        let message_text = '';
        if (percentage < 20) message_text = 'Pas vraiment compatible... 💔';
        else if (percentage < 40) message_text = 'Amitié possible ! 🤝';
        else if (percentage < 60) message_text = 'Bonne compatibilité ! 😊';
        else if (percentage < 80) message_text = 'Super compatible ! 💕';
        else message_text = 'ÂMES SŒURS ! 💖✨';

        message.reply(`💘 **Ship-o-meter**\n\n👤 **${user1.username}** x **${user2.username}**\n\n${heart}\n**${percentage}%** - ${message_text}`);
    }
};
