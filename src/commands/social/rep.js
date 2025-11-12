const ms = require('ms');

module.exports = {
    name: 'rep',
    aliases: ['reputation', 'réputation'],
    description: 'Donne un point de réputation à quelqu\'un (1x/24h)',
    cooldown: 2,
    async execute(message, args, client) {
        const target = message.mentions.users.first();

        if (!target) {
            return message.reply('❌ Mentionne quelqu\'un ! Exemple: `+rep @user`');
        }

        if (target.id === message.author.id) {
            return message.reply('❌ Tu ne peux pas te donner de la réputation à toi-même !');
        }

        if (target.bot) {
            return message.reply('❌ Les bots n\'ont pas besoin de réputation ! 🤖');
        }

        const user = client.db.getUser(message.author.id, message.guild.id);
        const lastRep = user.last_rep || 0;
        const cooldown = 24 * 60 * 60 * 1000;

        if (Date.now() - lastRep < cooldown) {
            const timeLeft = lastRep + cooldown - Date.now();
            return message.reply(`⏰ Tu as déjà donné de la réputation ! Reviens dans **${ms(timeLeft, { long: true })}** !`);
        }

        const targetUser = client.db.getUser(target.id, message.guild.id);

        client.db.updateUser(target.id, message.guild.id, {
            rep: targetUser.rep + 1
        });

        client.db.db.prepare(`UPDATE users SET last_rep = ? WHERE user_id = ?`).run(Date.now(), `${message.author.id}-${message.guild.id}`);

        message.reply(`❤️ Tu as donné **+1 réputation** à **${target.username}** !\n\n📊 ${target.username} a maintenant **${targetUser.rep + 1} points de réputation** ! 🎉`);
    }
};
