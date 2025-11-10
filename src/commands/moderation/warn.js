const embeds = require('../../utils/embeds');
const { resolveMember } = require('../../utils/validators');
const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'warn',
    description: 'Avertir un membre',
    category: 'moderation',
    permissions: [],
    async execute(message, args, client) {
        try {
            if (!message.member.permissions.has('ModerateMembers')) return message.reply({ embeds: [embeds.error('Permission insuffisante')] });

            const target = await resolveMember(message.guild, args[0]);
            if (!target) return message.reply({ embeds: [embeds.error('Membre introuvable.')] });

            const reason = args.slice(1).join(' ') || 'Aucune raison spécifiée';
            const warnData = getWarnData(message.guild.id, target.id);

            warnData.warns.push({ id: warnData.warns.length + 1, reason, moderator: message.author.tag, date: new Date().toISOString() });
            saveWarnData(message.guild.id, target.id, warnData);

            await message.reply({ embeds: [embeds.success(`${target.user.tag} a été averti.`, 'Action: Warn').addFields({ name: 'Raison', value: reason }, { name: 'Total avertissements', value: `${warnData.warns.length}` })] });
            client.logger.command(`WARN: ${target.user.tag} by ${message.author.tag} in ${message.guild.id} - ${reason}`);
        } catch (err) {
            client.logger.error('Error in warn command: ' + err.stack);
            return message.reply({ embeds: [embeds.error('Erreur lors de l\'avertissement.')] });
        }
    }
};

function getWarnData(guildId, userId) {
    const dir = path.join(process.cwd(), 'src', 'database', 'warns');
    const file = path.join(dir, `${guildId}.json`);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (!fs.existsSync(file)) return { warns: [] };
    try { const data = JSON.parse(fs.readFileSync(file, 'utf8')); return data[userId] || { warns: [] }; } catch { return { warns: [] }; }
}

function saveWarnData(guildId, userId, warnData) {
    const dir = path.join(process.cwd(), 'src', 'database', 'warns');
    const file = path.join(dir, `${guildId}.json`);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const data = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {};
    data[userId] = warnData;
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
}
