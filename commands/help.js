const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');  

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Show all commands'),
	async execute(interaction) {
        const embed = new Discord.EmbedBuilder()
        .setTitle('Help')
        .setDescription('🔵**Moderation**\n**/ban** - Ban a user\n**/kick** - Kick a user\n\n💿**Other**\n**/info** - Show information about bot')
        .setColor("Random")
        await interaction.reply({ embeds: [embed], ephemeral: true });
	},
};