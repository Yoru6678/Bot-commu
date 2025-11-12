module.exports = {
    data: {
        name: '8ball',
        description: 'Pose une question à la boule magique',
        options: [
            {
                name: 'question',
                description: 'La question à poser',
                type: 3, // STRING
                required: true
            }
        ]
    },
    async execute(interaction) {
        const answers = [
            'Oui.', 'Non.', 'Peut-être.', 'Très probable.', 'Je ne peux pas répondre maintenant.',
            'Sans aucun doute.', 'C’est peu probable.', 'Demande plus tard.'
        ];
        const q = interaction.options.getString('question');
        const a = answers[Math.floor(Math.random() * answers.length)];
        await interaction.reply(`🎱 Question: **${q}**\nRéponse: **${a}**`);
    }
};
