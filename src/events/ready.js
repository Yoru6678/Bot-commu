module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`✅ ${client.user.tag} est en ligne !`);
        console.log(`📊 Connecté à ${client.guilds.cache.size} serveur(s)`);
        
        client.user.setActivity('+help | Bot Communautaire', { type: 'PLAYING' });
        
        require('../systems/voiceTracker')(client);
    }
};
