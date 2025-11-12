const { PermissionFlagsBits } = require('discord.js');
const embeds = require('../../utils/embeds');
const ConfigService = require('../../services/ConfigService');

module.exports = {
    name: 'setlogs',
    description: 'Définir le salon de logs principal',
    category: 'administration',
    permissions: [PermissionFlagsBits.ManageGuild],
    cooldown: 5,
    usage: '[#salon]',
    
    async execute(message, args, client) {
        try {
            if (!message.member.permissions.has(this.permissions || [])) {
                return message.reply({ embeds: [embeds.error('Permission insuffisante')] });
            }

            const channel = message.mentions.channels.first();
            if (!channel) {
                return message.reply({ embeds: [embeds.error('Veuillez mentionner un salon.\nUsage: `+setlogs #logs`')] });
            }

            ConfigService.setLogChannel(message.guild.id, channel.id);

            const embed = embeds.success(`Salon de logs configuré: ${channel}`, '📝 Configuration');
            await message.reply({ embeds: [embed] });

            client.logger.command(`SETLOGS by ${message.author.tag} in ${message.guild.id}`);
        } catch (err) {
            client.logger.error('Setlogs command error: ' + err.message);
            return message.reply({ embeds: [embeds.error('Erreur lors de la configuration du salon de logs.')] });
        }
    }
};
