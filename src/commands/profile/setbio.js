module.exports = {
    name: 'setbio',
    aliases: ['bio'],
    description: 'Définis ta bio personnelle',
    cooldown: 10,
    async execute(message, args, client) {
        const bio = args.join(' ');

        if (!bio) {
            return message.reply('❌ Tu dois écrire quelque chose ! Exemple: `+setbio J\'adore ce serveur !`');
        }

        if (bio.length > 200) {
            return message.reply('❌ Ta bio doit faire maximum 200 caractères !');
        }

        client.db.updateUser(message.author.id, message.guild.id, { bio });
        message.reply(`✅ Bio mise à jour ! Vérifie avec \`+profile\` 🎉`);
    }
};
