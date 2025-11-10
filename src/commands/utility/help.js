const embeds = require('../../utils/embeds');

module.exports = {
    name: 'help',
    description: 'Affiche la liste des commandes ou les détails d\'une commande',
    category: 'utility',
    async execute(message, args, client) {
        try {
            if (!args[0]) {
                const categories = {};
                client.commands.forEach(cmd => {
                    const cat = cmd.category || 'Autre';
                    if (!categories[cat]) categories[cat] = [];
                    categories[cat].push(cmd.name);
                });

                const lines = Object.entries(categories).map(([cat, cmds]) => `**${cat}**: ${cmds.join(', ')}`);
                return message.reply({ embeds: [embeds.info(lines.join('\n\n'), 'Haruka Protect - Commandes')] });
            }

            const cmd = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]));
            if (!cmd) return message.reply({ embeds: [embeds.error('Commande introuvable')] });
            const info = `**Nom:** ${cmd.name}\n**Description:** ${cmd.description || 'Aucune'}\n**Usage:** ${cmd.usage || 'Aucun'}`;
            return message.reply({ embeds: [embeds.info(info, `Aide: ${cmd.name}`)] });
        } catch (err) {
            client.logger.error('Help command error: ' + err.stack);
            return message.reply({ embeds: [embeds.error('Erreur lors de l\'affichage de l\'aide.')] });
        }
    }
};
