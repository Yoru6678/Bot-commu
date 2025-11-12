module.exports = {
    name: 'slap',
    aliases: ['gifle'],
    description: 'Gifle quelqu\'un',
    cooldown: 3,
    async execute(message, args, client) {
        const target = message.mentions.users.first();

        if (!target) {
            return message.reply('❌ Mentionne quelqu\'un ! Exemple: `+slap @user`');
        }

        if (target.id === message.author.id) {
            return message.reply('👋 Tu te gifles toi-même ? Bizarre... 😅');
        }

        message.channel.send(`👋 **${message.author.username}** gifle **${target.username}** ! *SLAP* 💥`);
    }
};
