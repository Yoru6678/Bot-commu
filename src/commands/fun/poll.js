const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'poll',
    aliases: ['sondage', 'vote'],
    description: 'Crée un sondage avec réactions',
    cooldown: 10,
    async execute(message, args, client) {
        if (!args[0]) {
            return message.reply('❌ Utilise: `+poll <question> | <option1> | <option2> | ...`\nExemple: `+poll Votre jeu préféré? | Minecraft | Fortnite | Valorant`');
        }

        const pollData = args.join(' ').split('|').map(s => s.trim());
        
        if (pollData.length < 3) {
            return message.reply('❌ Tu dois avoir au moins 2 options ! Sépare avec `|`');
        }

        const question = pollData[0];
        const options = pollData.slice(1);

        if (options.length > 10) {
            return message.reply('❌ Maximum 10 options !');
        }

        const emojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];
        
        let description = '';
        for (let i = 0; i < options.length; i++) {
            description += `\n${emojis[i]} ${options[i]}`;
        }

        const embed = new EmbedBuilder()
            .setTitle(`📊 ${question}`)
            .setDescription(description)
            .setColor(client.config.EMBED_COLOR)
            .setFooter({ text: `Sondage créé par ${message.author.username}` })
            .setTimestamp();

        const pollMessage = await message.channel.send({ embeds: [embed] });

        for (let i = 0; i < options.length; i++) {
            await pollMessage.react(emojis[i]);
        }

        message.delete().catch(() => {});
    }
};
