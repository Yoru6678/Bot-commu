const { EmbedBuilder } = require('discord.js');
const config = require('../config/config');

const make = (type, title, description) => {
    const color = config.EMBED_COLOR || '#FF69B4';
    const e = new EmbedBuilder().setColor(color).setTitle(title || '').setDescription(description || '');
    return e;
};

module.exports = {
    success: (description, title) => make('success', title || 'Succès', description),
    error: (description, title) => make('error', title || 'Erreur', description),
    info: (description, title) => make('info', title || 'Info', description),
    warn: (description, title) => make('warn', title || 'Avertissement', description)
};
