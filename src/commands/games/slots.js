module.exports = {
    name: 'slots',
    aliases: ['slot', 'machine'],
    description: 'Machine à sous ! 3 emojis identiques = JACKPOT',
    cooldown: 5,
    async execute(message, args, client) {
        const bet = parseInt(args[0]);

        if (isNaN(bet) || bet <= 0) {
            return message.reply('❌ Utilise: `+slots <mise>`\nExemple: `+slots 100`');
        }

        const user = client.db.getUser(message.author.id, message.guild.id);

        if (bet > user.coins) {
            return message.reply(`❌ Tu n'as que **${user.coins.toLocaleString()} coins** !`);
        }

        const emojis = ['🍒', '🍋', '🍊', '🍇', '💎', '7️⃣'];
        const slots = [
            emojis[Math.floor(Math.random() * emojis.length)],
            emojis[Math.floor(Math.random() * emojis.length)],
            emojis[Math.floor(Math.random() * emojis.length)]
        ];

        let winMultiplier = 0;

        if (slots[0] === slots[1] && slots[1] === slots[2]) {
            if (slots[0] === '💎') winMultiplier = 10;
            else if (slots[0] === '7️⃣') winMultiplier = 8;
            else winMultiplier = 5;
        } else if (slots[0] === slots[1] || slots[1] === slots[2] || slots[0] === slots[2]) {
            winMultiplier = 2;
        }

        let result = `🎰 | ${slots.join(' | ')} | 🎰\n\n`;

        if (winMultiplier > 0) {
            const winAmount = bet * (winMultiplier - 1);
            client.db.updateUser(message.author.id, message.guild.id, {
                coins: user.coins + winAmount
            });
            result += `🎉 GAGNÉ ! Multiplicateur x${winMultiplier} !\n💰 Tu gagnes **${winAmount} coins** !\n\n💵 Nouveau solde: **${(user.coins + winAmount).toLocaleString()} coins**`;
        } else {
            client.db.updateUser(message.author.id, message.guild.id, {
                coins: user.coins - bet
            });
            result += `❌ Perdu ! Tu perds **${bet} coins** !\n\n💵 Nouveau solde: **${(user.coins - bet).toLocaleString()} coins**`;
        }

        message.reply(result);
    }
};
