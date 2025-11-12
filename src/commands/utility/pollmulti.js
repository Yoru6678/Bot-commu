const embeds = require('../../utils/embeds');

module.exports = {
    name: 'pollmulti',
    description: 'Créer un sondage à plusieurs choix',
    category: 'utility',
    aliases: ['sondagemulti'],
    cooldown: 10,
    usage: '[question | choix1 | choix2 | ...]',
    
    async execute(message, args, client) {
        try {
            const input = args.join(' ');
            if (!input.includes('|')) {
                return message.reply({ embeds: [embeds.error('Format incorrect.\nUsage: `+pollmulti Question ? | Choix 1 | Choix 2 | Choix 3`')] });
            }

            const parts = input.split('|').map(p => p.trim());
            const question = parts[0];
            const choices = parts.slice(1);

            if (choices.length < 2 || choices.length > 10) {
                return message.reply({ embeds: [embeds.error('Vous devez fournir entre 2 et 10 choix.')] });
            }

            const emojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];
            const choicesText = choices.map((choice, i) => `${emojis[i]} ${choice}`).join('\n');

            const embed = embeds.info('', '📊 Sondage Multiple', {
                fields: [
                    { name: '❓ Question', value: question, inline: false },
                    { name: '📋 Choix', value: choicesText, inline: false },
                    { name: '👤 Créé par', value: message.author.tag, inline: true }
                ]
            });

            const pollMessage = await message.channel.send({ embeds: [embed] });
            
            for (let i = 0; i < choices.length; i++) {
                await pollMessage.react(emojis[i]);
            }

            await message.delete().catch(() => {});
            client.logger.command(`POLLMULTI created by ${message.author.tag}`);
        } catch (err) {
            client.logger.error('Pollmulti command error: ' + err.message);
            return message.reply({ embeds: [embeds.error('Erreur lors de la création du sondage.')] });
        }
    }
};
