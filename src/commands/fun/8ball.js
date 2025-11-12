const responses = [
    '✅ Oui, absolument !',
    '✅ C\'est certain !',
    '✅ Sans aucun doute !',
    '✅ Oui, définitivement !',
    '✅ Tu peux compter dessus !',
    '🤔 Les signes indiquent que oui',
    '🤔 Probablement',
    '🤔 Bonne perspective',
    '🤔 Oui',
    '🤔 Les signes pointent vers oui',
    '😐 Réponse floue, essaie encore',
    '😐 Redemande plus tard',
    '😐 Mieux vaut ne pas te le dire maintenant',
    '😐 Impossible de prédire',
    '😐 Concentre-toi et redemande',
    '❌ Ne compte pas dessus',
    '❌ Ma réponse est non',
    '❌ Mes sources disent non',
    '❌ Les perspectives ne sont pas bonnes',
    '❌ Très douteux'
];

module.exports = {
    name: '8ball',
    aliases: ['8b', 'boule'],
    description: 'Pose une question à la boule magique',
    cooldown: 3,
    async execute(message, args, client) {
        const question = args.join(' ');

        if (!question) {
            return message.reply('❌ Pose une question ! Exemple: `+8ball Est-ce que je vais gagner au loto ?`');
        }

        const response = responses[Math.floor(Math.random() * responses.length)];

        message.reply(`🔮 **Question:** ${question}\n\n**Réponse:** ${response}`);
    }
};
