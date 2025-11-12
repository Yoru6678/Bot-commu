const embeds = require('../../utils/embeds');
const db = require('../../database/database');

module.exports = {
    name: 'remind',
    description: 'Crée un rappel personnel',
    category: 'utility',
    aliases: ['reminder', 'remindme'],
    cooldown: 5,
    usage: '[temps] [message]',
    
    async execute(message, args, client) {
        try {
            if (args.length < 2) {
                return message.reply({ embeds: [embeds.error('Usage: `+remind 10m Faire quelque chose`\nFormats: s=secondes, m=minutes, h=heures, d=jours')] });
            }

            const timeArg = args[0].toLowerCase();
            const reminderMessage = args.slice(1).join(' ');

            const timeRegex = /^(\d+)([smhd])$/;
            const match = timeArg.match(timeRegex);

            if (!match) {
                return message.reply({ embeds: [embeds.error('Format de temps invalide. Utilisez: 10s, 5m, 2h, 1d')] });
            }

            const amount = parseInt(match[1]);
            const unit = match[2];

            const multipliers = { s: 1000, m: 60000, h: 3600000, d: 86400000 };
            const milliseconds = amount * multipliers[unit];

            if (milliseconds > 2592000000) {
                return message.reply({ embeds: [embeds.error('Le délai maximum est de 30 jours.')] });
            }

            const remindAt = new Date(Date.now() + milliseconds).toISOString();

            const stmt = db.db.prepare('INSERT INTO reminders (user_id, channel_id, message, remind_at, created_at) VALUES (?, ?, ?, ?, ?)');
            stmt.run(message.author.id, message.channel.id, reminderMessage, remindAt, new Date().toISOString());

            setTimeout(async () => {
                try {
                    const embed = embeds.info(`⏰ ${reminderMessage}`, 'Rappel !');
                    await message.author.send({ embeds: [embed] }).catch(() => {});
                    const channel = await client.channels.fetch(message.channel.id);
                    if (channel) {
                        await channel.send({ content: `<@${message.author.id}>`, embeds: [embed] });
                    }
                } catch (e) {
                    client.logger.error('Reminder error: ' + e.message);
                }
            }, milliseconds);

            const embed = embeds.success(`Je vous rappellerai dans ${amount}${unit}: ${reminderMessage}`, 'Rappel programmé');
            return message.reply({ embeds: [embed] });
        } catch (err) {
            client.logger.error('Remind command error: ' + err.message);
            return message.reply({ embeds: [embeds.error('Erreur lors de la création du rappel.')] });
        }
    }
};
