const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    aliases: ['aide', 'h', 'commands'],
    description: 'Affiche la liste des commandes',
    cooldown: 5,
    async execute(message, args, client) {
        const categories = {
            '🧰 Utilitaires': {
                description: 'Commandes pratiques et informations',
                commands: [
                    '`+ping` - Latence du bot',
                    '`+help` - Ce message d\'aide',
                    '`+serverinfo` - Infos sur le serveur',
                    '`+userinfo [@user]` - Infos sur un membre',
                    '`+avatar [@user]` - Avatar d\'un utilisateur'
                ]
            },
            '📊 Profil & Stats': {
                description: 'Ton profil, XP, niveaux et statistiques',
                commands: [
                    '`+profile [@user]` - Affiche le profil détaillé',
                    '`+rank [@user]` - Carte de rang avec progression XP',
                    '`+leaderboard [xp/vocal/messages/rep]` - Classements du serveur',
                    '`+setbio <texte>` - Définis ta bio personnelle'
                ]
            },
            '💬 Social & Interactions': {
                description: 'Interagis avec les autres membres',
                commands: [
                    '`+hug @user` - Fais un câlin à quelqu\'un',
                    '`+kiss @user` - Envoie un bisou',
                    '`+slap @user` - Gifle quelqu\'un (pour rire !)',
                    '`+ship @user1 @user2` - Compatibilité amoureuse',
                    '`+rep @user` - Donne +1 réputation (1x/24h)',
                    '`+afk [raison]` - Active le mode AFK'
                ]
            },
            '🎮 Jeux & Mini-Games': {
                description: 'Jeux amusants sans mise d\'argent',
                commands: [
                    '`+rps <pierre/feuille/ciseaux>` - Pierre Feuille Ciseaux',
                    '`+roll [max] [count]` - Lance un ou plusieurs dés',
                    '`+8ball <question>` - Pose une question à la boule magique'
                ]
            },
            '🎉 Fun & Divertissement': {
                description: 'Commandes amusantes et créatives',
                commands: [
                    '`+meme` - Affiche un meme aléatoire',
                    '`+poll <question> | <opt1> | <opt2>...` - Crée un sondage',
                    '`+choose <opt1> <opt2> ...` - Le bot choisit pour toi',
                    '`+say <message>` - Le bot répète ce que tu dis',
                    '`+reverse <texte>` - Inverse ton message'
                ]
            }
        };

        const mainEmbed = new EmbedBuilder()
            .setTitle('🎉 Sora Community Bot - Aide')
            .setDescription('**Bot communautaire** fun et interactif !\n\nEncourage l\'engagement des membres avec des jeux, interactions sociales, statistiques et bien plus !\n\n**Prefix:** `+`\n\n📝 Utilise le menu ci-dessous pour voir les commandes par catégorie !')
            .setColor(client.config.EMBED_COLOR)
            .addFields(
                { name: '🧰 Utilitaires', value: 'Ping, serverinfo, userinfo, avatar', inline: true },
                { name: '📊 Profil & Stats', value: 'Profile, rank, leaderboard', inline: true },
                { name: '💬 Social', value: 'Hug, kiss, ship, rep, afk', inline: true },
                { name: '🎮 Jeux', value: 'RPS, roll, 8ball', inline: true },
                { name: '🎉 Fun', value: 'Meme, poll, choose, say', inline: true },
                { name: '✨ Engagement', value: 'Système XP automatique !', inline: true }
            )
            .setFooter({ text: `${client.commands.size} commandes disponibles` })
            .setTimestamp();

        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('help-menu')
            .setPlaceholder('📚 Sélectionne une catégorie')
            .addOptions(
                Object.keys(categories).map(cat => ({
                    label: cat,
                    description: categories[cat].description,
                    value: cat
                }))
            );

        const row = new ActionRowBuilder().addComponents(selectMenu);

        const msg = await message.reply({ embeds: [mainEmbed], components: [row] });

        const collector = msg.createMessageComponentCollector({ time: 60000 });

        collector.on('collect', async (interaction) => {
            if (interaction.user.id !== message.author.id) {
                return interaction.reply({ content: '❌ Ce menu n\'est pas pour toi !', ephemeral: true });
            }

            const category = interaction.values[0];
            const categoryData = categories[category];

            const categoryEmbed = new EmbedBuilder()
                .setTitle(category)
                .setDescription(categoryData.description + '\n\n' + categoryData.commands.join('\n'))
                .setColor(client.config.EMBED_COLOR)
                .setFooter({ text: 'Utilise le menu pour voir d\'autres catégories' })
                .setTimestamp();

            await interaction.update({ embeds: [categoryEmbed] });
        });

        collector.on('end', () => {
            msg.edit({ components: [] }).catch(() => {});
        });
    }
};
