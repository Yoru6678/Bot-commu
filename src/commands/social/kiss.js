module.exports = {
    name: 'kiss',
    aliases: ['bisou'],
    description: 'Fais un bisou à quelqu\'un',
    cooldown: 3,
    async execute(message, args, client) {
        const target = message.mentions.users.first();

        if (!target) {
            return message.reply('❌ Mentionne quelqu\'un ! Exemple: `+kiss @user`');
        }

        if (target.id === message.author.id) {
            return message.reply('😘 Tu t\'envoies un bisou à toi-même ! Très narcissique ! 💋');
        }

        message.channel.send(`💋 **${message.author.username}** envoie un bisou à **${target.username}** ! 😘✨`);
    }
};
