const axios = require('axios');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'meme',
    description: 'Affiche un meme aléatoire',
    cooldown: 5,
    async execute(message, args, client) {
        try {
            const response = await axios.get('https://meme-api.com/gimme');
            const data = response.data;

            const embed = new EmbedBuilder()
                .setTitle(data.title)
                .setImage(data.url)
                .setColor(client.config.EMBED_COLOR)
                .setFooter({ text: `👍 ${data.ups} | r/${data.subreddit}` })
                .setTimestamp();

            message.reply({ embeds: [embed] });
        } catch (error) {
            message.reply('❌ Impossible de récupérer un meme pour le moment ! Réessaye plus tard 😅');
        }
    }
};
