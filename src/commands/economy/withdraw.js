module.exports = {
    name: 'withdraw',
    aliases: ['with', 'retirer'],
    description: 'Retire des coins de la banque',
    cooldown: 2,
    async execute(message, args, client) {
        const user = client.db.getUser(message.author.id, message.guild.id);

        if (!args[0]) {
            return message.reply('❌ Indique un montant ! Exemple: `+withdraw 1000` ou `+withdraw all`');
        }

        let amount;
        if (args[0].toLowerCase() === 'all') {
            amount = user.bank;
        } else {
            amount = parseInt(args[0]);
        }

        if (isNaN(amount) || amount <= 0) {
            return message.reply('❌ Montant invalide !');
        }

        if (amount > user.bank) {
            return message.reply(`❌ Tu n'as que **${user.bank.toLocaleString()} coins** à la banque !`);
        }

        client.db.updateUser(message.author.id, message.guild.id, {
            coins: user.coins + amount,
            bank: user.bank - amount
        });

        message.reply(`💵 Tu as retiré **${amount.toLocaleString()} coins** de la banque ! ✅`);
    }
};
