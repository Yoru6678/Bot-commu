const embeds = require('../../utils/embeds');

module.exports = {
    name: 'timezone',
    description: 'Donne l\'heure locale d\'un pays',
    category: 'utility',
    aliases: ['time', 'heure'],
    cooldown: 5,
    usage: '[pays/ville]',
    
    async execute(message, args, client) {
        try {
            const location = args.join(' ') || 'UTC';

            const timezones = {
                'france': 'Europe/Paris',
                'paris': 'Europe/Paris',
                'london': 'Europe/London',
                'londres': 'Europe/London',
                'newyork': 'America/New_York',
                'losangeles': 'America/Los_Angeles',
                'tokyo': 'Asia/Tokyo',
                'sydney': 'Australia/Sydney',
                'moscou': 'Europe/Moscow',
                'moscow': 'Europe/Moscow',
                'dubai': 'Asia/Dubai'
            };

            const tz = timezones[location.toLowerCase()] || 'UTC';
            const time = new Date().toLocaleString('fr-FR', { timeZone: tz });

            const embed = embeds.info('', '🌍 Fuseau Horaire', {
                fields: [
                    { name: '📍 Lieu', value: location, inline: true },
                    { name: '🕐 Heure actuelle', value: time, inline: true },
                    { name: '⏱️ Zone', value: tz, inline: true }
                ]
            });

            return message.reply({ embeds: [embed] });
        } catch (err) {
            client.logger.error('Timezone command error: ' + err.message);
            return message.reply({ embeds: [embeds.error('Erreur lors de la récupération de l\'heure.')] });
        }
    }
};
