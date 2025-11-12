module.exports = {
    name: 'roll',
    aliases: ['dice', 'dé'],
    description: 'Lance un ou plusieurs dés',
    cooldown: 3,
    async execute(message, args, client) {
        let max = 100;
        let count = 1;

        if (args[0]) {
            const parsed = parseInt(args[0]);
            if (!isNaN(parsed) && parsed > 0 && parsed <= 1000000) {
                max = parsed;
            }
        }

        if (args[1]) {
            const parsed = parseInt(args[1]);
            if (!isNaN(parsed) && parsed > 0 && parsed <= 10) {
                count = parsed;
            }
        }

        if (count === 1) {
            const result = Math.floor(Math.random() * max) + 1;
            message.reply(`🎲 Tu as obtenu **${result}** ! (1-${max})`);
        } else {
            const results = [];
            let total = 0;
            for (let i = 0; i < count; i++) {
                const result = Math.floor(Math.random() * max) + 1;
                results.push(result);
                total += result;
            }
            message.reply(`🎲 **${count} dés** (1-${max}):\n${results.join(', ')}\n\n**Total:** ${total}`);
        }
    }
};
