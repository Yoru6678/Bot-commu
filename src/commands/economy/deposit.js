module.exports = {
    name: 'deposit',
    aliases: ['dep'],
    description: 'Dépose des coins à la banque',
    cooldown: 2,
    async execute(message, args, client) {
        const user = client.db.getUser(message.author.id, message.guild.id);

        if (!args[0]) {
            return message.reply('❌ Indique un montant ! Exemple: `+deposit 1000` ou `+deposit all`');
        }

        let amount;
        if (args[0].toLowerCase() === 'all') {
            amount = user.coins;
        } else {
            amount = parseInt(args[0]);
        }

        if (isNaN(amount) || amount <= 0) {
            return message.reply('❌ Montant invalide !');
        }

        if (amount > user.coins) {
            return message.reply(`❌ Tu n'as que **${user.coins.toLocaleString()} coins** dans ton portefeuille !`);
        }

        client.db.updateUser(message.author.id, message.guild.id, {
            coins: user.coins - amount,
            bank: user.bank + amount
        });

        message.reply(`🏦 Tu as déposé **${amount.toLocaleString()} coins** à la banque ! ✅`);
    }
};
