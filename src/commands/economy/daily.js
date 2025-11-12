const ms = require('ms');

module.exports = {
    name: 'daily',
    aliases: ['dailies'],
    description: 'Récupère ta récompense quotidienne',
    cooldown: 2,
    async execute(message, args, client) {
        const user = client.db.getUser(message.author.id, message.guild.id);
        const now = Date.now();
        const cooldown = 24 * 60 * 60 * 1000;

        if (user.last_daily && (now - user.last_daily) < cooldown) {
            const timeLeft = user.last_daily + cooldown - now;
            return message.reply(`⏰ Tu as déjà réclamé ton daily ! Reviens dans **${ms(timeLeft, { long: true })}** !`);
        }

        const daysSinceLastDaily = user.last_daily ? Math.floor((now - user.last_daily) / (24 * 60 * 60 * 1000)) : 999;
        let streak = user.daily_streak || 0;

        if (daysSinceLastDaily <= 1) {
            streak++;
        } else {
            streak = 1;
        }

        let amount = Math.floor(
            Math.random() * (client.config.ECONOMY.DAILY_MAX - client.config.ECONOMY.DAILY_MIN + 1)
        ) + client.config.ECONOMY.DAILY_MIN;

        let bonus = 0;
        if (streak >= 7) bonus = Math.floor(amount * 0.5);
        if (streak >= 30) bonus = Math.floor(amount * 1.0);

        const total = amount + bonus;

        client.db.updateUser(message.author.id, message.guild.id, {
            coins: user.coins + total,
            last_daily: now,
            daily_streak: streak
        });

        let msg = `💰 **Daily réclamé !**\n\n`;
        msg += `Tu as reçu **${amount} coins** !`;
        if (bonus > 0) msg += `\n🔥 Bonus streak (${streak} jours): **+${bonus} coins** !`;
        msg += `\n\n**Total:** ${total} coins 🎉`;
        msg += `\n📊 Streak actuel: **${streak} jour(s)**`;
        if (streak < 7) msg += `\n\n💡 Continue pendant 7 jours pour un bonus de 50% !`;

        message.reply(msg);
    }
};
