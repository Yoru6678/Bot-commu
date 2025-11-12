const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'serverinfo',
    aliases: ['si', 'serveur'],
    description: 'Affiche les informations du serveur',
    cooldown: 5,
    async execute(message, args, client) {
        const guild = message.guild;
        
        const createdAt = Math.floor(guild.createdTimestamp / 1000);
        const owner = await guild.fetchOwner();

        const channels = guild.channels.cache;
        const textChannels = channels.filter(c => c.type === 0).size;
        const voiceChannels = channels.filter(c => c.type === 2).size;

        const embed = new EmbedBuilder()
            .setTitle(`📊 Informations de ${guild.name}`)
            .setThumbnail(guild.iconURL({ dynamic: true, size: 256 }))
            .setColor(client.config.EMBED_COLOR)
            .addFields(
                { name: '👑 Propriétaire', value: owner.user.tag, inline: true },
                { name: '📅 Créé le', value: `<t:${createdAt}:D>`, inline: true },
                { name: '🆔 ID', value: guild.id, inline: true },
                { name: '👥 Membres', value: guild.memberCount.toLocaleString(), inline: true },
                { name: '📝 Salons Texte', value: textChannels.toString(), inline: true },
                { name: '🎤 Salons Vocaux', value: voiceChannels.toString(), inline: true },
                { name: '😀 Emojis', value: guild.emojis.cache.size.toString(), inline: true },
                { name: '🎭 Rôles', value: guild.roles.cache.size.toString(), inline: true },
                { name: '💎 Niveau Boost', value: `Niveau ${guild.premiumTier}`, inline: true },
            )
            .setTimestamp();

        if (guild.description) {
            embed.setDescription(guild.description);
        }

        message.reply({ embeds: [embed] });
    }
};
