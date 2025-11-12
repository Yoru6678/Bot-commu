const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    data: {
        name: 'avatar',
        description: "Affiche l'avatar d'un utilisateur",
        options: [
            {
                name: 'user',
                description: 'Utilisateur (optionnel)',
                type: ApplicationCommandOptionType.User,
                required: false
            }
        ]
    },
    async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;
        const url = user.displayAvatarURL({ dynamic: true, size: 1024 });
        await interaction.reply({ content: url });
    }
};
