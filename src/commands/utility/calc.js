const embeds = require('../../utils/embeds');

module.exports = {
    name: 'calc',
    description: 'Calculatrice simple (seulement chiffres et + - * / ( ) . )',
    category: 'utility',
    async execute(message, args, client) {
        try {
            const expr = args.join(' ');
            if (!expr) return message.reply({ embeds: [embeds.error('Usage: calc <expression>')] });

            // Validate expression: allow digits, spaces, operators + - * / ( ) and dot
            if (!/^[-+/*(). 0-9]+$/.test(expr)) return message.reply({ embeds: [embeds.error('Expression invalide. Seuls chiffres et opérateurs + - * / ( ) sont autorisés.')] });

            // Safe evaluation by Function after validation
            let result;
            try {
                // eslint-disable-next-line no-new-func
                result = Function(`"use strict"; return (${expr})`)();
            } catch (e) {
                return message.reply({ embeds: [embeds.error('Erreur d\'évaluation de l\'expression')] });
            }

            return message.reply({ embeds: [embeds.info(String(result), `Calc: ${expr}`)] });
        } catch (err) {
            client.logger.error('Error in calc: ' + err.stack);
            return message.reply({ embeds: [embeds.error('Erreur lors du calcul')] });
        }
    }
};
