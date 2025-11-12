module.exports = {
    name: 'choose',
    aliases: ['choice', 'choix'],
    description: 'Le bot choisit pour toi !',
    cooldown: 3,
    async execute(message, args, client) {
        if (args.length < 2) {
            return message.reply('❌ Donne au moins 2 options ! Exemple: `+choose pizza burger tacos`');
        }

        const choice = args[Math.floor(Math.random() * args.length)];
        message.reply(`🤔 Je choisis... **${choice}** ! ✨`);
    }
};
