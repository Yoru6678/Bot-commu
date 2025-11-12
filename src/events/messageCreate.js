const config = require('../config');

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        if (message.author.bot || !message.guild) return;

        const db = client.db;
        
        const user = db.getUser(message.author.id, message.guild.id);
        
        if (user.afk_status) {
            db.updateUser(message.author.id, message.guild.id, { 
                afk_status: 0, 
                afk_reason: null 
            });
            message.reply('✅ Tu n\'es plus AFK !').catch(() => {});
        }

        message.mentions.users.forEach(mentionedUser => {
            if (mentionedUser.bot) return;
            const mentioned = db.getUser(mentionedUser.id, message.guild.id);
            if (mentioned.afk_status) {
                message.reply(`💤 ${mentionedUser.username} est AFK: ${mentioned.afk_reason || 'Pas de raison'}`).catch(() => {});
            }
        });

        const guildConfig = db.getGuildConfig(message.guild.id);
        if (guildConfig.leveling_enabled) {
            handleXP(message, client, user);
        }

        const prefix = config.PREFIX;
        if (!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName);
        if (!command) return;

        if (!client.cooldowns.has(command.name)) {
            client.cooldowns.set(command.name, new Map());
        }

        const now = Date.now();
        const timestamps = client.cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 3) * 1000;

        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(`⏰ Attends encore ${timeLeft.toFixed(1)}s avant de réutiliser \`${command.name}\` !`);
            }
        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        try {
            await command.execute(message, args, client);
        } catch (error) {
            console.error('Erreur commande:', error);
            message.reply('❌ Une erreur est survenue !').catch(() => {});
        }
    }
};

function handleXP(message, client, user) {
    const now = Date.now();
    const cooldown = client.config.XP.COOLDOWN;
    
    if (user.last_message && (now - user.last_message) < cooldown) return;

    const xpGain = Math.floor(
        Math.random() * (client.config.XP.PER_MESSAGE_MAX - client.config.XP.PER_MESSAGE_MIN + 1)
    ) + client.config.XP.PER_MESSAGE_MIN;

    const result = client.db.addXP(message.author.id, message.guild.id, xpGain);
    
    client.db.updateUser(message.author.id, message.guild.id, {
        last_message: now,
        message_count: user.message_count + 1
    });

    if (result.leveledUp) {
        const guildConfig = client.db.getGuildConfig(message.guild.id);
        const levelupMsg = (guildConfig.levelup_message || '🎉 GG {user} ! Tu es maintenant niveau {level} ! 💪')
            .replace('{user}', `<@${message.author.id}>`)
            .replace('{level}', result.newLevel);

        const reward = client.config.LEVEL_REWARDS.find(r => r.level === result.newLevel);
        let rewardText = '';
        if (reward) {
            client.db.addCoins(message.author.id, message.guild.id, reward.coins);
            rewardText = `\n💰 Bonus: ${reward.coins} coins !`;
        }

        message.channel.send(levelupMsg + rewardText).catch(() => {});
    }
}
