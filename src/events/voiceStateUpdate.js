module.exports = {
    name: 'voiceStateUpdate',
    execute(oldState, newState, client) {
        const userId = newState.id;
        const guildId = newState.guild.id;
        
        const joined = !oldState.channelId && newState.channelId;
        const left = oldState.channelId && !newState.channelId;

        if (joined) {
            client.db.db.prepare(`
                INSERT OR REPLACE INTO voice_sessions (user_id, guild_id, joined_at) 
                VALUES (?, ?, ?)
            `).run(userId, guildId, Date.now());
        } else if (left) {
            const session = client.db.db.prepare(`
                SELECT * FROM voice_sessions WHERE user_id = ? AND guild_id = ?
            `).get(userId, guildId);

            if (session) {
                const duration = Math.floor((Date.now() - session.joined_at) / 1000 / 60);
                const user = client.db.getUser(userId, guildId);
                client.db.updateUser(userId, guildId, {
                    voice_time: user.voice_time + duration
                });

                client.db.db.prepare(`
                    DELETE FROM voice_sessions WHERE user_id = ? AND guild_id = ?
                `).run(userId, guildId);
            }
        }
    }
};
