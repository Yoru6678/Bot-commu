const { EmbedBuilder } = require('discord.js');
const config = require('../config/config');

const COLORS = {
    success: '#00FF00',
    error: '#FF0000',
    warn: '#FFA500',
    info: '#0099FF',
    moderation: '#FF69B4',
    security: '#8B00FF',
    default: config.EMBED_COLOR || '#FF69B4'
};

const make = (type, title, description, options = {}) => {
    const color = COLORS[type] || COLORS.default;
    const embed = new EmbedBuilder()
        .setColor(color)
        .setTimestamp()
        .setFooter({ text: '{+} Nami Protection' });
    
    if (title) embed.setTitle(title);
    if (description) embed.setDescription(description);
    if (options.fields) options.fields.forEach(f => embed.addFields(f));
    if (options.thumbnail) embed.setThumbnail(options.thumbnail);
    if (options.image) embed.setImage(options.image);
    if (options.author) embed.setAuthor(options.author);
    
    return embed;
};

module.exports = {
    success: (description, title, options) => make('success', title || '✅ Succès', description, options),
    error: (description, title, options) => make('error', title || '❌ Erreur', description, options),
    info: (description, title, options) => make('info', title || 'ℹ️ Information', description, options),
    warn: (description, title, options) => make('warn', title || '⚠️ Avertissement', description, options),
    moderation: (description, title, options) => make('moderation', title || '🛡️ Modération', description, options),
    security: (description, title, options) => make('security', title || '🔒 Sécurité', description, options),
    custom: (title, description, color, options) => {
        const embed = new EmbedBuilder()
            .setColor(color || COLORS.default)
            .setTimestamp()
            .setFooter({ text: '{+} Nami Protection' });
        if (title) embed.setTitle(title);
        if (description) embed.setDescription(description);
        if (options?.fields) options.fields.forEach(f => embed.addFields(f));
        if (options?.thumbnail) embed.setThumbnail(options.thumbnail);
        if (options?.image) embed.setImage(options.image);
        if (options?.author) embed.setAuthor(options.author);
        return embed;
    }
};
