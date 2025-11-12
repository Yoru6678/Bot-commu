module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`✅ ${client.user.tag} est en ligne !`);
        console.log(`📊 Connecté à ${client.guilds.cache.size} serveur(s)`);

        client.user.setActivity('+help | Bot Communautaire', { type: 'PLAYING' });

        require('../systems/voiceTracker')(client);

        // Enregistrement des slash commands (dev: GUILD_ID, sinon global)
        try {
            if (client.slashCommandData && client.slashCommandData.length) {
                if (process.env.GUILD_ID) {
                    const guild = client.guilds.cache.get(process.env.GUILD_ID);
                    if (guild) {
                        await guild.commands.set(client.slashCommandData);
                        console.log('✅ Slash commands enregistrées sur le serveur de dev');
                    } else {
                        await client.application.commands.set(client.slashCommandData);
                        console.log('⚠️ GUILD_ID introuvable, commandes enregistrées globalement');
                    }
                } else {
                    await client.application.commands.set(client.slashCommandData);
                    console.log('✅ Slash commands enregistrées globalement');
                }
            }
        } catch (err) {
            console.error('❌ Erreur lors de l\'enregistrement des slash commands:', err);
        }

        // Charger et planifier les rappels persistés
        try {
            const nowSec = Math.floor(Date.now() / 1000);
            // Rappels déjà dus -> envoyer immédiatement
            const due = client.db.getDueReminders(nowSec);
            for (const r of due) {
                try {
                    const ch = await client.channels.fetch(r.channel_id).catch(() => null);
                    if (ch) await ch.send(`<@${r.user_id}>, rappel: ${r.message}`);
                } catch (err) {
                    console.error('Erreur en envoyant un rappel dû:', err);
                } finally {
                    client.db.deleteReminder(r.id);
                }
            }

            // Rappels futurs -> planifier
            const pending = client.db.getPendingReminders(nowSec + 1);
            for (const r of pending) {
                const delay = (r.remind_at * 1000) - Date.now();
                if (delay <= 0) continue;
                setTimeout(async () => {
                    try {
                        const ch = await client.channels.fetch(r.channel_id).catch(() => null);
                        if (ch) await ch.send(`<@${r.user_id}>, rappel: ${r.message}`);
                    } catch (err) {
                        console.error('Erreur en envoyant un rappel planifié:', err);
                    } finally {
                        client.db.deleteReminder(r.id);
                    }
                }, delay);
            }
            console.log(`⏰ ${pending.length} rappel(s) rechargé(s)`);
        } catch (err) {
            console.error('Erreur lors du chargement des rappels:', err);
        }
    }
};
