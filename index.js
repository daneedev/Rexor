require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const { Client, Events, Collection, GatewayIntentBits } = require('discord.js');
const logger = require('./handlers/logger');
const { registerGuildCommands, registerGlobalCommands } = require('./handlers/registerCommand');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });


client.once(Events.ClientReady, readyClient => {
	logger.logSuccess(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.commands = new Collection();

const commandsFolder = path.join(__dirname, 'commands');
const commands = fs.readdirSync(commandsFolder).filter(file => file.endsWith('.js'));
const commandsList = [];

for (const file of commands) {
    const filePath = path.join(commandsFolder, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
        commandsList.push(command.data.toJSON());
    } else {
        logger.logWarn(`Skipping invalid command file, ${file}`);
    }
}

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);
	try {
		await command.execute(interaction);
	} catch (error) {
		logger.logError(error);
	}
});
if (process.env.APP_ENV == "dev") {
    registerGuildCommands(commandsList);
} else {
    registerGlobalCommands(commandsList);
}

client.login(process.env.TOKEN);