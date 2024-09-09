const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');  
const ms = require("ms")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Show info about bot'),
	async execute(interaction) {
        const embed = new Discord.EmbedBuilder()
        .setTitle('Info')
        .addFields(
            { name: "Uptime", value: `${ms(interaction.client.uptime)}`, inline: true },
            { name: "Servers", value: `${interaction.client.guilds.cache.size}`, inline: true },
            { name: "RAM Usage", value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, inline: true },
            { name: "Version", value: "PRODUCTION", inline: true },
            { name: "Author", value: "Danee", inline: true },
            { name: "Github", value: "[Click here](https://github.com/daneedev/Rexor)", inline: true },
        )
        .setColor("Random")
        await interaction.reply({ embeds: [embed], ephemeral: true });
	},
};