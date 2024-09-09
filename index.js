require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const { Client, Events, Collection, GatewayIntentBits } = require('discord.js');
const logger = require('./handlers/logger');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });


client.once(Events.ClientReady, readyClient => {
	logger.logSuccess(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.commands = new Collection();

const commandsFolder = path.join(__dirname, 'commands');
const commands = fs.readdirSync(commandsFolder).filter(file => file.endsWith('.js'));

for (const file of commands) {
    const filePath = path.join(commandsFolder, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        logger.logWarn(`Skipping invalid command file, ${file}`);
    }
}

client.login(process.env.TOKEN);