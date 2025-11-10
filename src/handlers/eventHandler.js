const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger');

module.exports = async (client) => {
    const eventsPath = path.join(process.cwd(), 'src', 'events');
    if (!fs.existsSync(eventsPath)) return;
    const categories = fs.readdirSync(eventsPath);
    for (const cat of categories) {
        const dir = path.join(eventsPath, cat);
        if (!fs.statSync(dir).isDirectory()) continue;
        const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));
        for (const file of files) {
            try {
                const ev = require(path.join(dir, file));
                if (!ev || !ev.name || !ev.execute) continue;
                if (ev.once) client.once(ev.name, (...args) => ev.execute(...args, client));
                else client.on(ev.name, (...args) => ev.execute(...args, client));
                logger.info(`Loaded event: ${ev.name}`);
            } catch (e) {
                logger.error(`Failed loading event ${file}: ${e.message}`);
            }
        }
    }
};
