const { Events } = require('discord.js');
const User = require("../models/User")

module.exports = {
	name: Events.GuildCreate,
	once: false,
	execute(guild) {
        guild.members.cache.forEach(member => {
            User.create({
                discordId: member.id,
                guildId: guild.id,
                coins: 0
            })
        })

    },
};