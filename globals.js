require("dotenv").config();

module.exports = {
    Discord: require("discord.js"),
    env: process.env,
    fs: require("fs"),
    fsp: require("fs").promises,
    words: require("./words"),
    storage: require("./storage"),
    color: function () {
        let chars = "0123456789abcdef".split("");
        let col = "#";
        for (var i = 0; i < 6; i++) {
            col += chars[Math.floor(Math.random() * chars.length)];
        }
        return col;
    },
    commandCategories: [],
    crypto: require("crypto")
};
