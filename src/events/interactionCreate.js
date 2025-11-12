module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (interaction.isChatInputCommand && interaction.isChatInputCommand()) {
            const command = client.slashCommands.get(interaction.commandName);
            if (!command) return interaction.reply({ content: 'Commande introuvable.', ephemeral: true });

            try {
                await command.execute(interaction, client);
            } catch (err) {
                console.error('Erreur slash command:', err);
                if (!interaction.replied) {
                    await interaction.reply({ content: '❌ Une erreur est survenue.', ephemeral: true });
                }
            }
        }
    }
};
