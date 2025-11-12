const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

class DB {
    constructor() {
        const dbPath = path.join(process.cwd(), 'data', 'sora.db');
        const dir = path.dirname(dbPath);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        
        this.db = new Database(dbPath);
        console.log(`✅ Base de données connectée: ${dbPath}`);
        this.init();
    }

    init() {
        this.db.exec(`
            CREATE TABLE IF NOT EXISTS users (
                user_id TEXT PRIMARY KEY,
                guild_id TEXT,
                xp INTEGER DEFAULT 0,
                level INTEGER DEFAULT 0,
                bio TEXT,
                rep INTEGER DEFAULT 0,
                last_message INTEGER,
                last_rep INTEGER,
                message_count INTEGER DEFAULT 0,
                voice_time INTEGER DEFAULT 0,
                achievements TEXT DEFAULT '[]',
                married_to TEXT,
                afk_status INTEGER DEFAULT 0,
                afk_reason TEXT,
                created_at INTEGER DEFAULT (strftime('%s', 'now'))
            );

            CREATE TABLE IF NOT EXISTS guild_config (
                guild_id TEXT PRIMARY KEY,
                leveling_enabled INTEGER DEFAULT 1,
                xp_multiplier REAL DEFAULT 1.0,
                levelup_channel TEXT,
                levelup_message TEXT DEFAULT '🎉 GG {user} ! Tu es maintenant niveau {level} ! 💪',
                role_rewards TEXT DEFAULT '[]'
            );

            CREATE TABLE IF NOT EXISTS marriages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user1_id TEXT,
                user2_id TEXT,
                guild_id TEXT,
                married_at INTEGER DEFAULT (strftime('%s', 'now'))
            );

            CREATE TABLE IF NOT EXISTS voice_sessions (
                user_id TEXT,
                guild_id TEXT,
                joined_at INTEGER,
                PRIMARY KEY (user_id, guild_id)
            );
        `);
    }

    getUser(userId, guildId) {
        const key = `${userId}-${guildId}`;
        let user = this.db.prepare('SELECT * FROM users WHERE user_id = ?').get(key);
        if (!user) {
            this.db.prepare(`
                INSERT INTO users (user_id, guild_id) VALUES (?, ?)
            `).run(key, guildId);
            user = this.db.prepare('SELECT * FROM users WHERE user_id = ?').get(key);
        }
        return user;
    }

    updateUser(userId, guildId, data) {
        const key = `${userId}-${guildId}`;
        const fields = Object.keys(data).map(k => `${k} = ?`).join(', ');
        const values = [...Object.values(data), key];
        this.db.prepare(`UPDATE users SET ${fields} WHERE user_id = ?`).run(...values);
    }

    addXP(userId, guildId, xp) {
        const user = this.getUser(userId, guildId);
        const newXP = user.xp + xp;
        const newLevel = Math.floor(Math.sqrt(newXP / 100));
        const leveledUp = newLevel > user.level;
        
        this.updateUser(userId, guildId, { xp: newXP, level: newLevel });
        return { newXP, newLevel, leveledUp, oldLevel: user.level };
    }

    getLeaderboard(guildId, type = 'xp', limit = 10) {
        const validTypes = { xp: 'xp', vocal: 'voice_time', messages: 'message_count', rep: 'rep' };
        const column = validTypes[type] || 'xp';
        return this.db.prepare(`
            SELECT * FROM users 
            WHERE guild_id = ? 
            ORDER BY ${column} DESC 
            LIMIT ?
        `).all(guildId, limit);
    }

    getUserRank(userId, guildId, type = 'xp') {
        const key = `${userId}-${guildId}`;
        const validTypes = { xp: 'xp', vocal: 'voice_time', messages: 'message_count', rep: 'rep' };
        const column = validTypes[type] || 'xp';
        const result = this.db.prepare(`
            SELECT COUNT(*) + 1 as rank FROM users 
            WHERE guild_id = ? AND ${column} > (
                SELECT ${column} FROM users WHERE user_id = ?
            )
        `).get(guildId, key);
        return result ? result.rank : 0;
    }

    getGuildConfig(guildId) {
        let config = this.db.prepare('SELECT * FROM guild_config WHERE guild_id = ?').get(guildId);
        if (!config) {
            this.db.prepare('INSERT INTO guild_config (guild_id) VALUES (?)').run(guildId);
            config = this.db.prepare('SELECT * FROM guild_config WHERE guild_id = ?').get(guildId);
        }
        return config;
    }
}

module.exports = new DB();
