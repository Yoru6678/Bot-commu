const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType } = require('discord.js');
const db = require('../../database/database');

module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(interaction, client) {
        try {
            if (!interaction.isButton()) return;

            const customId = interaction.customId || '';

            // Ticket creation
            if (customId === 'haruka_ticket_create') {
                await interaction.deferReply({ ephemeral: true });
                const guild = interaction.guild;
                const owner = interaction.user;

                const safeName = `${owner.username.toLowerCase().replace(/[^a-z0-9\-]/g, '')}-${Math.floor(Math.random() * 9000) + 1000}`;

                const channel = await guild.channels.create({
                    name: `ticket-${safeName}`,
                    type: ChannelType.GuildText,
                    permissionOverwrites: [
                        { id: guild.id, deny: ['ViewChannel'] },
                        { id: owner.id, allow: ['ViewChannel', 'SendMessages', 'ReadMessageHistory'] },
                    ],
                });

                // record ticket
                db.addTicket(guild.id, channel.id, owner.id);

                const embed = new EmbedBuilder()
                    .setTitle('Ticket de support')
                    .setDescription(`Bonjour ${owner}, un membre du staff va arriver bientôt.`)
                    .setColor(client.config.EMBED_COLOR || '#2b2d31');

                const row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId('haruka_ticket_close')
                        .setLabel('Fermer le ticket')
                        .setStyle(ButtonStyle.Danger)
                );

                await channel.send({ content: `${owner}`, embeds: [embed], components: [row] });

                await interaction.editReply({ content: `Ticket créé: ${channel}`, components: [], embeds: [] });
                return;
            }

            // Ticket closing (button inside ticket channel)
            if (customId === 'haruka_ticket_close') {
                await interaction.deferReply({ ephemeral: true });
                const channel = interaction.channel;
                const ticket = db.getTicketByChannel(channel.id);
                if (!ticket) return interaction.editReply({ content: 'Ticket introuvable en base de données.' });

                const isOwner = interaction.user.id === ticket.owner;
                const canManage = interaction.member.permissions.has('ManageGuild');
                if (!isOwner && !canManage) return interaction.editReply({ content: 'Vous n\'avez pas la permission de fermer ce ticket.' });

                // close in DB then delete channel
                db.closeTicket(channel.id);
                await interaction.editReply({ content: 'Fermeture du ticket, suppression du salon...' });
                // small delay to allow message delivery
                setTimeout(async () => {
                    try { await channel.delete('Ticket fermé'); } catch (e) { client.logger.error('Error deleting ticket channel: ' + (e.stack || e.message)); }
                }, 1200);
                return;
            }

            // Profile data deletion: customId = haruka_profile_delete:<userid>
            if (customId.startsWith('haruka_profile_delete:')) {
                await interaction.deferReply({ ephemeral: true });
                const parts = customId.split(':');
                const targetId = parts[1];
                const isSelf = interaction.user.id === targetId;
                const canManage = interaction.member.permissions.has('ManageGuild');
                if (!isSelf && !canManage) return interaction.editReply({ content: 'Vous n\'avez pas la permission de supprimer ces données.' });

                db.deleteUserData(targetId);
                await interaction.editReply({ content: `Données de l'utilisateur <@${targetId}> supprimées.` });

                // Try to update original message to remove buttons if possible
                try {
                    if (interaction.message && interaction.message.edit) {
                        await interaction.message.edit({ components: [] });
                    }
                } catch (e) {
                    // ignore
                }
                return;
            }

        } catch (err) {
            client.logger.error('Error in interactionCreate event: ' + (err.stack || err.message));
            try { if (interaction.deferred || interaction.replied) await interaction.editReply({ content: 'Une erreur est survenue.' }); else await interaction.reply({ content: 'Une erreur est survenue.', ephemeral: true }); } catch (_) {}
        }
    }
};
