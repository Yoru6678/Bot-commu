const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    aliases: ['aide', 'h', 'commands'],
    description: 'Affiche la liste des commandes',
    cooldown: 5,
    async execute(message, args, client) {
        const categories = {
            '📊 Profil & Leveling': {
                description: 'Système XP, niveaux et progression',
                commands: [
                    '`+profile [@user]` - Affiche ton profil détaillé',
                    '`+rank [@user]` - Carte de rang avec barre XP',
                    '`+leaderboard [type]` - Classement (xp/coins/vocal/messages)',
                    '`+setbio <texte>` - Définis ta bio personnelle'
                ]
            },
            '💰 Économie': {
                description: 'Gagne et dépense des coins',
                commands: [
                    '`+balance [@user]` - Voir ton argent',
                    '`+daily` - Récompense quotidienne (500-1000 coins)',
                    '`+work` - Travaille pour gagner des coins',
                    '`+deposit <montant>` - Dépose à la banque',
                    '`+withdraw <montant>` - Retire de la banque',
                    '`+transfer @user <montant>` - Transfère des coins'
                ]
            },
            '🎲 Jeux': {
                description: 'Mise tes coins et tente ta chance !',
                commands: [
                    '`+coinflip <pile/face> <mise>` - Pile ou face (x2)',
                    '`+dice <1-6> <mise>` - Lance un dé (x5)',
                    '`+slots <mise>` - Machine à sous (jusqu\'à x10)'
                ]
            },
            '💬 Social': {
                description: 'Interagis avec les autres membres',
                commands: [
                    '`+hug @user` - Fais un câlin',
                    '`+ship @user1 @user2` - Compatibilité amoureuse',
                    '`+rep @user` - Donne +1 réputation (1x/24h)',
                    '`+afk [raison]` - Active le mode AFK'
                ]
            },
            '🎉 Fun': {
                description: 'Commandes amusantes',
                commands: [
                    '`+meme` - Meme aléatoire',
                    '`+8ball <question>` - Boule magique'
                ]
            },
            '🛠️ Utilitaires': {
                description: 'Commandes utiles',
                commands: [
                    '`+ping` - Latence du bot',
                    '`+help` - Ce message'
                ]
            }
        };

        const mainEmbed = new EmbedBuilder()
            .setTitle('🎉 Sora Community Bot - Aide')
            .setDescription('**Bot communautaire** avec système XP, économie, jeux et bien plus !\n\n**Prefix:** `+`\n\n📝 Utilise le menu ci-dessous pour voir les commandes par catégorie !')
            .setColor(client.config.EMBED_COLOR)
            .addFields(
                { name: '📊 Profil & Leveling', value: 'XP, niveaux, classements', inline: true },
                { name: '💰 Économie', value: 'Coins, daily, work, transferts', inline: true },
                { name: '🎲 Jeux', value: 'Coinflip, dice, slots', inline: true },
                { name: '💬 Social', value: 'Hug, ship, rep, afk', inline: true },
                { name: '🎉 Fun', value: 'Meme, 8ball', inline: true },
                { name: '🛠️ Utilitaires', value: 'Ping, help', inline: true }
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
