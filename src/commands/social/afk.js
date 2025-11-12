module.exports = {
    name: 'afk',
    description: 'Active le mode AFK',
    cooldown: 3,
    async execute(message, args, client) {
        const reason = args.join(' ') || 'Pas de raison';

        client.db.updateUser(message.author.id, message.guild.id, {
            afk_status: 1,
            afk_reason: reason
        });

        message.reply(`💤 Tu es maintenant AFK: **${reason}**\n\nTu seras automatiquement retiré de l'AFK quand tu enverras un message !`);
    }
};
