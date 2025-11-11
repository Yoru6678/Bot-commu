module.exports = {
    PREFIX: process.env.PREFIX || '+',
    OWNER_ID: process.env.OWNER_ID || 1431362559079874630,
    EMBED_COLOR: process.env.EMBED_COLOR || '#FF69B4',
    // Stats channels (IDs) - Configure via Replit Secrets
    STATS_CHANNEL_MEMBERS: process.env.STATS_CHANNEL_MEMBERS || '',
    STATS_CHANNEL_ONLINE: process.env.STATS_CHANNEL_ONLINE || '',
    STATS_CHANNEL_VOICE: process.env.STATS_CHANNEL_VOICE || '',
    STATS_UPDATE_INTERVAL: parseInt(process.env.STATS_UPDATE_INTERVAL || '300', 10), // 5 minutes par défaut
};
