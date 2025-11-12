module.exports = {
    name: 'say',
    aliases: ['echo', 'dire'],
    description: 'Le bot répète ce que tu dis',
    cooldown: 5,
    async execute(message, args, client) {
        const text = args.join(' ');

        if (!text) {
            return message.reply('❌ Donne-moi quelque chose à dire ! Exemple: `+say Bonjour tout le monde !`');
        }

        if (text.length > 500) {
            return message.reply('❌ Message trop long ! (max 500 caractères)');
        }

        message.delete().catch(() => {});
        message.channel.send(text);
    }
};
