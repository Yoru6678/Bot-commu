const embeds = require('../../utils/embeds');

const CATEGORY_EMOJIS = {
    'utility': '🔧',
    'moderation': '🛡️',
    'information': 'ℹ️',
    'administration': '⚙️',
    'system': '🔐'
};

module.exports = {
    name: 'help',
    description: 'Affiche toutes les commandes disponibles',
    category: 'utility',
    aliases: ['h', 'commands'],
    cooldown: 5,
    usage: '[commande]',
    
    async execute(message, args, client) {
        try {
            const prefix = client.config.PREFIX || '+';
            
            if (!args[0]) {
                const categories = {};
                client.commands.forEach(cmd => {
                    const cat = cmd.category || 'Autre';
                    if (!categories[cat]) categories[cat] = [];
                    categories[cat].push(`\`${cmd.name}\``);
                });

                const fields = Object.entries(categories).map(([cat, cmds]) => ({
                    name: `${CATEGORY_EMOJIS[cat] || '📁'} ${cat.charAt(0).toUpperCase() + cat.slice(1)}`,
                    value: cmds.join(', '),
                    inline: false
                }));

                const embed = embeds.info(
                    `Utilisez \`${prefix}help <commande>\` pour plus de détails sur une commande.`,
                    '📚 Liste des commandes',
                    { fields }
                );

                return message.reply({ embeds: [embed] });
            }

            const cmd = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]));
            if (!cmd) return message.reply({ embeds: [embeds.error('Commande introuvable.')] });
            
            const embed = embeds.info('', `📖 Aide : ${cmd.name}`, {
                fields: [
                    { name: '📝 Description', value: cmd.description || 'Aucune description', inline: false },
                    { name: '💡 Usage', value: `\`${prefix}${cmd.name} ${cmd.usage || ''}\``, inline: false },
                    { name: '🔖 Aliases', value: cmd.aliases ? cmd.aliases.map(a => `\`${a}\``).join(', ') : 'Aucun', inline: true },
                    { name: '⏱️ Cooldown', value: `${cmd.cooldown || 3}s`, inline: true },
                    { name: '📂 Catégorie', value: cmd.category || 'Autre', inline: true }
                ]
            });
            
            return message.reply({ embeds: [embed] });
            
        } catch (err) {
            client.logger.error('Help command error: ' + err.stack);
            return message.reply({ embeds: [embeds.error('Erreur lors de l\'affichage de l\'aide.')] });
        }
    }
};
