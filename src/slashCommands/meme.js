const axios = require('axios');

module.exports = {
    data: {
        name: 'meme',
        description: 'Envoie un meme aléatoire'
    },
    async execute(interaction) {
        await interaction.deferReply();
        try {
            const res = await axios.get('https://meme-api.com/gimme');
            const body = res.data;
            const content = `${body.title}\n${body.postLink}`;
            if (body.url) {
                await interaction.editReply({ content, files: [body.url] });
            } else {
                await interaction.editReply({ content });
            }
        } catch (err) {
            console.error('meme error', err);
            await interaction.editReply('❌ Impossible de récupérer un meme pour le moment.');
        }
    }
};
