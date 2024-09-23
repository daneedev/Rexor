const { Events } = require('discord.js');
const User = require("../models/User")

module.exports = {
	name: Events.GuildMemberAdd,
	once: false,
	async execute(member) {
        if (member.user.bot) return;
        if (await User.findOne({where: {discordId: member.id, guildId: guild.id}})) return;
        User.create({
            discordId: member.id,
            guildId: member.guild.id,
            coins: 0
        })
    },
};