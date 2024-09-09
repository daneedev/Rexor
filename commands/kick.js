const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const Discord = require('discord.js');  

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
        .addUserOption(option => option.setName('user').setDescription('The user to kick').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason for the kick'))
        .setDefaultMemberPermissions(PermissionsBitField.Flags.KickMembers)
		.setDescription('Kick a user'),
	async execute(interaction) {
        const user = interaction.options.getMember('user');
        const reason = interaction.options.getString('reason') || "No reason provided";
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.kickMembers)) {
            const error = new Discord.EmbedBuilder()
            error.setTitle("You don't have permission to kick users")
            error.setDescription("You need the `KICK_MEMBERS` permission to kick users.")
            error.setColor("Red")
            await interaction.reply({ embeds: [error], ephemeral: true });
        } else if (user.roles.highest.position > interaction.guild.members.me.roles.highest.position) {
            const error = new D.members.highest.positionord.EmbedBuilder()
            error.setTitle("You cannot kick this user")
            error.setDescription("Please check my role and make sure it's higher than the user you want to kick.")
            error.setColor("Red")
            await interaction.reply({ embeds: [error], ephemeral: true });
        } else if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.KickMembers)) {
            const error = new Discord.EmbedBuilder()
            error.setTitle("I don't have permission to kick users")
            error.setDescription("I need the `KICK_MEMBERS` permission to kick users.")
            error.setColor("Red")
            await interaction.reply({ embeds: [error], ephemeral: true });
        } else {
            user.kick({reason: reason});
            const embed = new Discord.EmbedBuilder()
            embed.setTitle(`User ${user.user.username} has been kickned`)
            if (reason) {
                embed.setTitle(`User ${user.user.username} has been kickned for ${reason}`)
            }
            embed.setColor("Green")
            await interaction.reply({ embeds: [embed]});
        }
	},
};