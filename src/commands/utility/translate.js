const embeds = require('../../utils/embeds');

module.exports = {
    name: 'translate',
    description: 'Traduire un texte',
    category: 'utility',
    aliases: ['trad', 'tr'],
    cooldown: 10,
    usage: '[langue] [texte]',
    
    async execute(message, args, client) {
        try {
            if (args.length < 2) {
                return message.reply({ embeds: [embeds.error('Usage: `+translate en Bonjour`\nLangues: en, es, de, it, pt, ru, ja, zh')] });
            }

            const targetLang = args[0].toLowerCase();
            const text = args.slice(1).join(' ');

            const validLangs = ['en', 'es', 'de', 'it', 'pt', 'ru', 'ja', 'zh', 'fr'];
            if (!validLangs.includes(targetLang)) {
                return message.reply({ embeds: [embeds.error('Langue non supportée. Langues disponibles: ' + validLangs.join(', '))] });
            }

            const embed = embeds.info('', '🌐 Traduction', {
                fields: [
                    { name: '📝 Texte original', value: text, inline: false },
                    { name: '🔄 Langue cible', value: targetLang.toUpperCase(), inline: true },
                    { name: '⚠️ Remarque', value: 'La traduction automatique nécessite une API externe. Configuration requise.', inline: false }
                ]
            });

            return message.reply({ embeds: [embed] });
        } catch (err) {
            client.logger.error('Translate command error: ' + err.message);
            return message.reply({ embeds: [embeds.error('Erreur lors de la traduction.')] });
        }
    }
};
