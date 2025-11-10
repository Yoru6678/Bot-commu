const embeds = require('../../utils/embeds');

module.exports = {
    name: 'stats',
    description: 'Statistiques du bot',
    category: 'utility',
    async execute(message, args, client) {
        try {
            const memory = process.memoryUsage().rss / 1024 / 1024;
            const guilds = client.guilds.cache.size;
            const users = client.users.cache.size;
            const uptime = msToHuman(client.uptime || 0);

            const text = `• Guilds: ${guilds}\n• Users (cache): ${users}\n• Memory (RSS): ${memory.toFixed(2)} MB\n• Uptime: ${uptime}\n• Ping: ${Math.round(client.ws.ping)}ms`;
            return message.reply({ embeds: [embeds.info(text, 'Haruka Protect - Stats')] });
        } catch (err) {
            client.logger.error('Error in stats: ' + err.stack);
            return message.reply({ embeds: [embeds.error('Erreur lors de la récupération des stats')] });
        }
    }
};

function msToHuman(ms) {
    const s = Math.floor(ms / 1000) % 60;
    const m = Math.floor(ms / (60 * 1000)) % 60;
    const h = Math.floor(ms / (60 * 60 * 1000)) % 24;
    const d = Math.floor(ms / (24 * 60 * 60 * 1000));
    return `${d}d ${h}h ${m}m ${s}s`;
}
