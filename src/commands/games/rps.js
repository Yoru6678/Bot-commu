module.exports = {
    name: 'rps',
    aliases: ['pfc', 'pierre', 'rockpaperscissors'],
    description: 'Pierre, Feuille, Ciseaux !',
    cooldown: 3,
    async execute(message, args, client) {
        const choices = ['pierre', 'feuille', 'ciseaux'];
        const userChoice = args[0]?.toLowerCase();

        if (!choices.includes(userChoice)) {
            return message.reply('❌ Choisis `pierre`, `feuille`, ou `ciseaux` !\nExemple: `+rps pierre`');
        }

        const botChoice = choices[Math.floor(Math.random() * choices.length)];

        const emojis = {
            pierre: '🪨',
            feuille: '📄',
            ciseaux: '✂️'
        };

        let result;
        if (userChoice === botChoice) {
            result = '🤝 Égalité !';
        } else if (
            (userChoice === 'pierre' && botChoice === 'ciseaux') ||
            (userChoice === 'feuille' && botChoice === 'pierre') ||
            (userChoice === 'ciseaux' && botChoice === 'feuille')
        ) {
            result = '🎉 Tu gagnes !';
        } else {
            result = '😢 Tu perds !';
        }

        message.reply(`${emojis[userChoice]} **vs** ${emojis[botChoice]}\n\n${result}`);
    }
};
