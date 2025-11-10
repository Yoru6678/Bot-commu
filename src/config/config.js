module.exports = {
    PREFIX: process.env.PREFIX || '+',
    OWNER_ID: process.env.OWNER_ID || 1431362559079874630,
    EMBED_COLOR: process.env.EMBED_COLOR || '#0c2ffa81',
    // Voice stats channels (IDs). Configure via .env or leave empty to disable per-stat.
    STATS_VC_MEMBERS_ONLINE: process.env.STATS_VC_MEMBERS_ONLINE || '', // voice channel id where name shows total members + online
    STATS_VC_VOICE_COUNT: process.env.STATS_VC_VOICE_COUNT || '', // voice channel id where name shows number of people in voice
    STATS_UPDATE_INTERVAL: parseInt(process.env.STATS_UPDATE_INTERVAL || '60', 10), // seconds
};
