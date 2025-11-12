const axios = require('axios');
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    data: {
        name: 'translate',
        description: 'Traduit un texte vers la langue indiquée',
        options: [
            { name: 'text', description: 'Texte à traduire', type: ApplicationCommandOptionType.String, required: true },
            { name: 'target', description: 'Langue cible (ex: fr, en, es)', type: ApplicationCommandOptionType.String, required: true }
        ]
    },
    async execute(interaction) {
        const text = interaction.options.getString('text');
        const target = interaction.options.getString('target');
        await interaction.deferReply();
        try {
            const res = await axios.post('https://libretranslate.de/translate', {
                q: text,
                source: 'auto',
                target: target,
                format: 'text'
            }, { headers: { 'accept': 'application/json' } });

            if (res.data && res.data.translatedText) {
                await interaction.editReply(res.data.translatedText);
            } else {
                await interaction.editReply('❌ Traduction impossible.');
            }
        } catch (err) {
            console.error('translate error', err?.response?.data || err.message);
            await interaction.editReply('❌ Erreur lors de la traduction.');
        }
    }
};
