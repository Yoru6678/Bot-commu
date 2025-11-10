const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');
const logger = require('../utils/logger');

class DB {
    constructor() {
        const dbPath = process.env.SQLITE_PATH || path.join(process.cwd(), 'data', 'haruka.db');
        const dir = path.dirname(dbPath);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        this.db = new Database(dbPath);
        logger.info(`SQLite DB opened at ${dbPath}`);
        this._init();
    }

    _init() {
        // Minimal example table
        this.db.prepare(`CREATE TABLE IF NOT EXISTS sanctions (id INTEGER PRIMARY KEY, guild TEXT, user TEXT, type TEXT, reason TEXT, moderator TEXT, date TEXT)`).run();
        // Tickets table
        this.db.prepare(`CREATE TABLE IF NOT EXISTS tickets (id INTEGER PRIMARY KEY, guild TEXT, channel TEXT, owner TEXT, status TEXT, created_at TEXT)`).run();
        // Simple user data table for profile/data deletion
        this.db.prepare(`CREATE TABLE IF NOT EXISTS user_data (id INTEGER PRIMARY KEY, user_id TEXT UNIQUE, data TEXT, updated_at TEXT)`).run();
    }

    addSanction(guild, user, type, reason, mod) {
        const stmt = this.db.prepare('INSERT INTO sanctions (guild,user,type,reason,moderator,date) VALUES (?,?,?,?,?,?)');
        stmt.run(guild, user, type, reason, mod, new Date().toISOString());
    }

    // Tickets helpers
    addTicket(guild, channel, owner) {
        const stmt = this.db.prepare('INSERT INTO tickets (guild,channel,owner,status,created_at) VALUES (?,?,?,?,?)');
        const info = stmt.run(guild, channel, owner, 'open', new Date().toISOString());
        return info.lastInsertRowid;
    }

    getTicketByChannel(channel) {
        const stmt = this.db.prepare('SELECT * FROM tickets WHERE channel = ?');
        return stmt.get(channel);
    }

    closeTicket(channel) {
        const stmt = this.db.prepare('UPDATE tickets SET status = ?, updated_at = ? WHERE channel = ?');
        return stmt.run('closed', new Date().toISOString(), channel);
    }

    // User data helpers (for profile deletion etc.)
    upsertUserData(userId, data) {
        const stmt = this.db.prepare('INSERT INTO user_data (user_id, data, updated_at) VALUES (?,?,?) ON CONFLICT(user_id) DO UPDATE SET data=excluded.data, updated_at=excluded.updated_at');
        return stmt.run(userId, JSON.stringify(data || {}), new Date().toISOString());
    }

    deleteUserData(userId) {
        const stmt = this.db.prepare('DELETE FROM user_data WHERE user_id = ?');
        return stmt.run(userId);
    }
}

module.exports = new DB();
