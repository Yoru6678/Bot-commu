const ms = require('ms');

module.exports = {
    data: {
        name: 'remind',
        description: 'Crée un rappel simple (persisté)',
        options: [
            { name: 'time', description: 'Durée (ex: 10s, 5m, 2h)', type: 3, required: true },
            { name: 'message', description: 'Message du rappel', type: 3, required: true }
        ]
    },
    async execute(interaction, client) {
        const timeStr = interaction.options.getString('time');
        const text = interaction.options.getString('message');
        const delay = ms(timeStr);
        if (!delay || delay <= 0) return interaction.reply({ content: 'Durée invalide.', ephemeral: true });
        if (delay > 1000 * 60 * 60 * 24 * 30) return interaction.reply({ content: 'Durée trop longue (max 30 jours).', ephemeral: true });

        const remindAt = Date.now() + delay;

        try {
            const id = client.db.createReminder(interaction.user.id, interaction.guildId || interaction.channel.guildId || null, interaction.channelId, remindAt, text);
            await interaction.reply({ content: `⏰ Rappel programmé dans ${timeStr}. (id: ${id})`, ephemeral: true });

            // Planifier immédiatement en mémoire pour l'instance en cours
            setTimeout(async () => {
                try {
                    const channel = await client.channels.fetch(interaction.channelId).catch(() => null);
                    if (channel) {
                        await channel.send(`${interaction.user}, rappel: ${text}`);
                    }
                } catch (err) {
                    console.error('remind send error', err);
                } finally {
                    client.db.deleteReminder(id);
                }
            }, delay);
        } catch (err) {
            console.error('remind create error', err);
            await interaction.reply({ content: '❌ Impossible de créer le rappel.', ephemeral: true });
        }
    }
};
