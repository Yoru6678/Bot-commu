const embeds = require('../../utils/embeds');

module.exports = {
    name: 'poll',
    description: 'Créer un sondage interactif',
    category: 'utility',
    aliases: ['sondage'],
    cooldown: 10,
    usage: '[question]',
    
    async execute(message, args, client) {
        try {
            if (!args[0]) {
                return message.reply({ embeds: [embeds.error('Veuillez fournir une question pour le sondage.\nUsage: `+poll Votre question ?`')] });
            }

            const question = args.join(' ');

            const embed = embeds.info('', '📊 Sondage', {
                fields: [
                    { name: '❓ Question', value: question, inline: false },
                    { name: '📌 Réagissez ci-dessous', value: '✅ = Oui | ❌ = Non', inline: false },
                    { name: '👤 Créé par', value: message.author.tag, inline: true }
                ]
            });

            const pollMessage = await message.channel.send({ embeds: [embed] });
            await pollMessage.react('✅');
            await pollMessage.react('❌');

            await message.delete().catch(() => {});
            client.logger.command(`POLL created by ${message.author.tag}: ${question}`);
        } catch (err) {
            client.logger.error('Poll command error: ' + err.message);
            return message.reply({ embeds: [embeds.error('Erreur lors de la création du sondage.')] });
        }
    }
};
