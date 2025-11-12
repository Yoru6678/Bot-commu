module.exports = {
    name: 'ping',
    description: 'Affiche la latence du bot',
    cooldown: 2,
    async execute(message, args, client) {
        const sent = await message.reply('🏓 Pong !');
        const latency = sent.createdTimestamp - message.createdTimestamp;
        const apiLatency = Math.round(client.ws.ping);

        sent.edit(`🏓 Pong !\n\n📊 Latence: **${latency}ms**\n💓 API: **${apiLatency}ms**`);
    }
};
