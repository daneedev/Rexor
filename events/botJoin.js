const { Events } = require('discord.js');
const User = require("../models/User")

module.exports = {
	name: Events.GuildCreate,
	once: false,
	async execute(guild) {
       const members = await guild.members.fetch()
        members.forEach(async member => {
            if (member.user.bot) return;
            if (await User.findOne({where: {discordId: member.id, guildId: guild.id}})) return;
            User.create({
                discordId: member.id,
                guildId: guild.id,
                coins: 0
            })
        })
    },
};