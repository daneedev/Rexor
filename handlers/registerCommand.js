const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const logger = require('./logger');


const rest = new REST().setToken(process.env.TOKEN);

async function registerGuildCommands(commands) {
    try {
		logger.logInfo(`Started refreshing ${commands.length} GUILD (/) commands.`);

		const data = await rest.put(
			Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
			{ body: commands },
		);

		logger.logSuccess(`Successfully reloaded ${data.length} GUILD (/) commands.`);
	} catch (error) {
		logger.logError(error);
	}
}

async function registerGlobalCommands(commands) {
    try {
        logger.logInfo(`Started refreshing ${commands.length} GLOBAL (/) commands.`);

        const data = await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands },
        );

        logger.logSuccess(`Successfully reloaded ${data.length} GLOBAL (/) commands.`);
    } catch (error) {
        logger.logError(error);
    }
}

module.exports = {
    registerGuildCommands,
    registerGlobalCommands
}