const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { resolveMember } = require('../../utils/validators');
const db = require('../../database/database');

module.exports = {
    name: 'profile',
    description: 'Affiche le profil simplifié d\'un membre (avatar, dates, rôles)',
    category: 'information',
    async execute(message, args, client) {
        try {
            const target = (await resolveMember(message.guild, args[0])) || message.member;
            const user = target.user;

            const embed = new EmbedBuilder()
                .setColor(client.config.EMBED_COLOR || '#00AAFF')
                .setAuthor({ name: `${user.tag}`, iconURL: user.displayAvatarURL({ dynamic: true }) })
                .setThumbnail(user.displayAvatarURL({ dynamic: true }))
                .addFields(
                    { name: '🆔 ID', value: user.id, inline: true },
                    { name: '📅 Compte créé', value: `${user.createdAt.toLocaleString('fr-FR')}`, inline: true },
                    { name: '🔗 Rejoint le serveur', value: `${target.joinedAt ? target.joinedAt.toLocaleString('fr-FR') : 'Inconnu'}`, inline: true },
                    { name: '🎭 Nombre de rôles', value: `${target.roles.cache.size - 1}`, inline: true }
                )
                .setFooter({ text: `Demandé par ${message.author.tag}` });

            // Prepare delete-profile button if allowed
            const canDelete = (message.author.id === target.id) || message.member.permissions.has('ManageGuild');
            const components = [];
            if (canDelete) {
                const row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId(`haruka_profile_delete:${target.id}`)
                        .setLabel('Supprimer mes données')
                        .setStyle(ButtonStyle.Danger)
                );
                components.push(row);
            }

            await message.reply({ embeds: [embed], components });
        } catch (err) {
            client.logger.error('profile command error: ' + (err.stack || err.message));
            return message.reply('Une erreur est survenue lors de la récupération du profil.');
        }
    }
};
