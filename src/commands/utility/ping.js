module.exports = {
    name: 'ping',
    description: 'Check bot latency',
    category: 'utility',
    async execute(message, args, client) {
        try {
            const sent = await message.reply('Pinging...');
            const time = sent.createdTimestamp - message.createdTimestamp;
            await sent.edit(`Pong! Latency: ${time}ms | API: ${Math.round(client.ws.ping)}ms`);
            client.logger.command(`PING used by ${message.author.tag}`);
        } catch (err) {
            client.logger.error('Ping command error: ' + err.message);
            return message.reply('Erreur lors du test de latence.');
        }
    }
};
