module.exports = {
    name: 'transfer',
    aliases: ['give', 'pay'],
    description: 'Transfère des coins à quelqu\'un',
    cooldown: 5,
    async execute(message, args, client) {
        const target = message.mentions.users.first();
        
        if (!target) {
            return message.reply('❌ Mentionne quelqu\'un ! Exemple: `+transfer @user 500`');
        }

        if (target.id === message.author.id) {
            return message.reply('❌ Tu ne peux pas te transférer de l\'argent à toi-même !');
        }

        if (target.bot) {
            return message.reply('❌ Tu ne peux pas donner de l\'argent à un bot !');
        }

        const amount = parseInt(args[1]);

        if (isNaN(amount) || amount <= 0) {
            return message.reply('❌ Montant invalide !');
        }

        const user = client.db.getUser(message.author.id, message.guild.id);

        if (amount > user.coins) {
            return message.reply(`❌ Tu n'as que **${user.coins.toLocaleString()} coins** !`);
        }

        const targetUser = client.db.getUser(target.id, message.guild.id);

        client.db.updateUser(message.author.id, message.guild.id, {
            coins: user.coins - amount
        });

        client.db.updateUser(target.id, message.guild.id, {
            coins: targetUser.coins + amount
        });

        message.reply(`✅ Tu as transféré **${amount.toLocaleString()} coins** à ${target.username} ! 💸`);
    }
};
