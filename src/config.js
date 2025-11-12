module.exports = {
    PREFIX: process.env.PREFIX || '+',
    OWNER_ID: process.env.OWNER_ID,
    EMBED_COLOR: process.env.EMBED_COLOR || '#7289DA',
    
    XP: {
        PER_MESSAGE_MIN: parseInt(process.env.XP_PER_MESSAGE_MIN || '15'),
        PER_MESSAGE_MAX: parseInt(process.env.XP_PER_MESSAGE_MAX || '25'),
        COOLDOWN: parseInt(process.env.XP_COOLDOWN || '60000'),
        PER_VOICE_MIN: parseInt(process.env.XP_PER_VOICE_MIN || '20'),
        PER_VOICE_MAX: parseInt(process.env.XP_PER_VOICE_MAX || '30'),
    },
    
    ECONOMY: {
        DAILY_MIN: parseInt(process.env.DAILY_AMOUNT_MIN || '500'),
        DAILY_MAX: parseInt(process.env.DAILY_AMOUNT_MAX || '1000'),
        WORK_MIN: parseInt(process.env.WORK_AMOUNT_MIN || '200'),
        WORK_MAX: parseInt(process.env.WORK_AMOUNT_MAX || '500'),
        WORK_COOLDOWN: parseInt(process.env.WORK_COOLDOWN || '3600000'),
    },
    
    LEVEL_REWARDS: [
        { level: 5, coins: 500 },
        { level: 10, coins: 1000 },
        { level: 20, coins: 2500 },
        { level: 30, coins: 5000 },
        { level: 50, coins: 10000 },
    ]
};
