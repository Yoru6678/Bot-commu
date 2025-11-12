require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('./config');
const db = require('./database');

console.log('\n🎉 SORA COMMUNITY BOT - DÉMARRAGE\n');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
    ]
});

client.commands = new Collection();
client.cooldowns = new Collection();
client.config = config;
client.db = db;

function loadCommands() {
    const commandsPath = path.join(__dirname, 'commands');
    const categories = fs.readdirSync(commandsPath);
    
    let count = 0;
    for (const category of categories) {
        const categoryPath = path.join(commandsPath, category);
        if (!fs.statSync(categoryPath).isDirectory()) continue;
        
        const files = fs.readdirSync(categoryPath).filter(f => f.endsWith('.js'));
        for (const file of files) {
            const command = require(path.join(categoryPath, file));
            if (command.name) {
                client.commands.set(command.name, command);
                if (command.aliases) {
                    command.aliases.forEach(alias => client.commands.set(alias, command));
                }
                count++;
            }
        }
    }
    console.log(`✅ ${count} commandes chargées`);
}

function loadEvents() {
    const eventsPath = path.join(__dirname, 'events');
    const files = fs.readdirSync(eventsPath).filter(f => f.endsWith('.js'));
    
    for (const file of files) {
        const event = require(path.join(eventsPath, file));
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
        }
    }
    console.log(`✅ ${files.length} événements chargés`);
}

loadCommands();
loadEvents();

client.login(process.env.TOKEN).catch(err => {
    console.error('❌ Erreur de connexion:', err.message);
    process.exit(1);
});

process.on('unhandledRejection', err => console.error('❌ Unhandled Rejection:', err));
process.on('uncaughtException', err => { console.error('❌ Uncaught Exception:', err); process.exit(1); });
