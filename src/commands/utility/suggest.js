const embeds = require('../../utils/embeds');

module.exports = {
    name: 'suggest',
    description: 'Envoyer une suggestion au staff',
    category: 'utility',
    aliases: ['suggestion'],
    cooldown: 60,
    usage: '[votre suggestion]',
    
    async execute(message, args, client) {
        try {
            if (!args[0]) {
                return message.reply({ embeds: [embeds.error('Veuillez fournir votre suggestion.\nUsage: `+suggest Votre idée ici`')] });
            }

            const suggestion = args.join(' ');
            const ConfigService = require('../../services/ConfigService');
            const logChannel = ConfigService.getLogChannel(message.guild.id);

            const embed = embeds.info('', '💡 Nouvelle Suggestion', {
                fields: [
                    { name: '👤 Auteur', value: `${message.author.tag} (${message.author.id})`, inline: false },
                    { name: '📝 Suggestion', value: suggestion, inline: false },
                    { name: '📅 Date', value: new Date().toLocaleString('fr-FR'), inline: true },
                    { name: '📍 Salon', value: message.channel.toString(), inline: true }
                ]
            });

            if (logChannel) {
                const channel = message.guild.channels.cache.get(logChannel);
                if (channel) {
                    const suggestionMsg = await channel.send({ embeds: [embed] });
                    await suggestionMsg.react('✅');
                    await suggestionMsg.react('❌');
                }
            }

            await message.reply({ embeds: [embeds.success('Votre suggestion a été envoyée au staff !', 'Suggestion envoyée')] });
            client.logger.command(`SUGGEST by ${message.author.tag}: ${suggestion.substring(0, 50)}`);
        } catch (err) {
            client.logger.error('Suggest command error: ' + err.message);
            return message.reply({ embeds: [embeds.error('Erreur lors de l\'envoi de la suggestion.')] });
        }
    }
};
