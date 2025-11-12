module.exports = {
    name: 'dice',
    aliases: ['dé'],
    description: 'Lance un dé ! Gagne x5 si tu devines le bon numéro',
    cooldown: 5,
    async execute(message, args, client) {
        if (!args[0] || !args[1]) {
            return message.reply('❌ Utilise: `+dice <numéro 1-6> <mise>`\nExemple: `+dice 4 100`');
        }

        const guess = parseInt(args[0]);
        if (isNaN(guess) || guess < 1 || guess > 6) {
            return message.reply('❌ Choisis un numéro entre 1 et 6 !');
        }

        const bet = parseInt(args[1]);
        if (isNaN(bet) || bet <= 0) {
            return message.reply('❌ Mise invalide !');
        }

        const user = client.db.getUser(message.author.id, message.guild.id);

        if (bet > user.coins) {
            return message.reply(`❌ Tu n'as que **${user.coins.toLocaleString()} coins** !`);
        }

        const result = Math.floor(Math.random() * 6) + 1;
        const won = guess === result;

        if (won) {
            const winAmount = bet * 5;
            client.db.updateUser(message.author.id, message.guild.id, {
                coins: user.coins + winAmount
            });
            message.reply(`🎲 Le dé affiche **${result}** !\n🎉 JACKPOT ! Tu gagnes **${winAmount} coins** ! (x5) 🎊\n\n💰 Nouveau solde: **${(user.coins + winAmount).toLocaleString()} coins**`);
        } else {
            client.db.updateUser(message.author.id, message.guild.id, {
                coins: user.coins - bet
            });
            message.reply(`🎲 Le dé affiche **${result}** ! (Tu avais choisi ${guess})\n❌ Tu perds **${bet} coins** ! 😢\n\n💰 Nouveau solde: **${(user.coins - bet).toLocaleString()} coins**`);
        }
    }
};
