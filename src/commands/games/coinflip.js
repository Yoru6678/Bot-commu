module.exports = {
    name: 'coinflip',
    aliases: ['cf', 'flip'],
    description: 'Pile ou face - Double ta mise si tu gagnes !',
    cooldown: 5,
    async execute(message, args, client) {
        if (!args[0] || !args[1]) {
            return message.reply('❌ Utilise: `+coinflip <pile/face> <mise>`\nExemple: `+coinflip pile 100`');
        }

        const choice = args[0].toLowerCase();
        if (choice !== 'pile' && choice !== 'face') {
            return message.reply('❌ Choisis `pile` ou `face` !');
        }

        const bet = parseInt(args[1]);
        if (isNaN(bet) || bet <= 0) {
            return message.reply('❌ Mise invalide !');
        }

        const user = client.db.getUser(message.author.id, message.guild.id);

        if (bet > user.coins) {
            return message.reply(`❌ Tu n'as que **${user.coins.toLocaleString()} coins** !`);
        }

        const result = Math.random() < 0.5 ? 'pile' : 'face';
        const won = choice === result;

        if (won) {
            client.db.updateUser(message.author.id, message.guild.id, {
                coins: user.coins + bet
            });
            message.reply(`🪙 La pièce tombe sur **${result}** !\n✅ Tu gagnes **${bet} coins** ! 🎉\n\n💰 Nouveau solde: **${(user.coins + bet).toLocaleString()} coins**`);
        } else {
            client.db.updateUser(message.author.id, message.guild.id, {
                coins: user.coins - bet
            });
            message.reply(`🪙 La pièce tombe sur **${result}** !\n❌ Tu perds **${bet} coins** ! 😢\n\n💰 Nouveau solde: **${(user.coins - bet).toLocaleString()} coins**`);
        }
    }
};
