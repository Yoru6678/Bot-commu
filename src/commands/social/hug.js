module.exports = {
    name: 'hug',
    aliases: ['calin', 'câlin'],
    description: 'Fais un câlin à quelqu\'un',
    cooldown: 3,
    async execute(message, args, client) {
        const target = message.mentions.users.first();

        if (!target) {
            return message.reply('❌ Mentionne quelqu\'un ! Exemple: `+hug @user`');
        }

        if (target.id === message.author.id) {
            return message.reply('🤗 Tu te fais un câlin à toi-même ! Tout va bien ? 💙');
        }

        message.channel.send(`🤗 **${message.author.username}** fait un gros câlin à **${target.username}** ! 💕`);
    }
};
