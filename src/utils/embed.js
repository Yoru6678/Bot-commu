const { EmbedBuilder } = require('discord.js');
const config = require('../config');

function createEmbed(title, description, color = config.EMBED_COLOR) {
    return new EmbedBuilder()
        .setTitle(title)
        .setDescription(description)
        .setColor(color)
        .setTimestamp();
}

function errorEmbed(message) {
    return createEmbed('❌ Erreur', message, '#FF0000');
}

function successEmbed(message) {
    return createEmbed('✅ Succès', message, '#00FF00');
}

function progressBar(current, max, length = 10) {
    const filled = Math.floor((current / max) * length);
    const empty = length - filled;
    return '█'.repeat(filled) + '░'.repeat(empty);
}

module.exports = { createEmbed, errorEmbed, successEmbed, progressBar };
