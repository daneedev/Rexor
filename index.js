require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const { Client, Events, Collection, GatewayIntentBits } = require('discord.js');
const logger = require('./handlers/logger');
const { registerGuildCommands, registerGlobalCommands } = require('./handlers/registerCommand');
const sequelize = require("./handlers/dbConnect");

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });


client.once(Events.ClientReady, async readyClient => {
	logger.logInfo(`Ready! Logged in as ${readyClient.user.tag}`);

    try {
        await sequelize.authenticate();
        logger.logSuccess("Database connection established successfully");
    } catch (error) {
        logger.logError('Unable to connect to the database:', error);
    } 
    
});

client.commands = new Collection();

const commandsFolder = path.join(__dirname, 'commands');
const commands = fs.readdirSync(commandsFolder).filter(file => file.endsWith('.js'));
const commandsList = [];
// COMMAND HANDLER
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

// EVENT HANDLER
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
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