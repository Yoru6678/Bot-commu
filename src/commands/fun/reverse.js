module.exports = {
    name: 'reverse',
    aliases: ['inverser'],
    description: 'Inverse ton message',
    cooldown: 3,
    async execute(message, args, client) {
        const text = args.join(' ');

        if (!text) {
            return message.reply('❌ Donne-moi du texte ! Exemple: `+reverse Bonjour`');
        }

        const reversed = text.split('').reverse().join('');
        message.reply(`🔄 **${reversed}**`);
    }
};
