const { Events } = require('discord.js');
const User = require("../models/User")

module.exports = {
	name: Events.GuildMemberAdd,
	once: false,
	execute(member) {
        User.create({
            discordId: member.id,
            guildId: member.guild.id,
            coins: 0
        })
    },
};