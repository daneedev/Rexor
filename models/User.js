const db = require("../handlers/dbConnect")
const { DataTypes } = require('sequelize');


const User = db.define('user', {
    discordId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    guildId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    coins: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
}, {
    tableName: 'users',
    timestamps: false
})

User.sync();

module.exports = User;