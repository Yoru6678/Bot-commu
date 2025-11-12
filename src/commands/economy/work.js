const ms = require('ms');

const jobs = [
    { name: 'développeur', emoji: '💻', min: 300, max: 600 },
    { name: 'médecin', emoji: '⚕️', min: 400, max: 700 },
    { name: 'cuisinier', emoji: '👨‍🍳', min: 200, max: 400 },
    { name: 'streamer', emoji: '🎮', min: 250, max: 500 },
    { name: 'musicien', emoji: '🎵', min: 200, max: 450 },
    { name: 'YouTubeur', emoji: '📹', min: 300, max: 550 },
    { name: 'designer', emoji: '🎨', min: 250, max: 500 },
    { name: 'professeur', emoji: '👨‍🏫', min: 300, max: 500 },
];

module.exports = {
    name: 'work',
    aliases: ['travail', 'job'],
    description: 'Travaille pour gagner des coins',
    cooldown: 2,
    async execute(message, args, client) {
        const user = client.db.getUser(message.author.id, message.guild.id);
        const now = Date.now();
        const cooldown = client.config.ECONOMY.WORK_COOLDOWN;

        if (user.last_work && (now - user.last_work) < cooldown) {
            const timeLeft = user.last_work + cooldown - now;
            return message.reply(`⏰ Tu es fatigué ! Repose-toi encore **${ms(timeLeft, { long: true })}** !`);
        }

        const job = jobs[Math.floor(Math.random() * jobs.length)];
        const amount = Math.floor(Math.random() * (job.max - job.min + 1)) + job.min;

        client.db.updateUser(message.author.id, message.guild.id, {
            coins: user.coins + amount,
            last_work: now
        });

        message.reply(`${job.emoji} Tu as travaillé en tant que **${job.name}** et gagné **${amount} coins** ! 💰`);
    }
};
