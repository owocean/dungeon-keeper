const g = require("../../globals");

module.exports = {
    name: "prefix",
    description: "Changes the bot's prefix for the current guild",
    usage: "<new prefix>",
    guildOnly: true,
    async execute(msg, args) {
        if (!args[0]) return msg.channel.send(g.words.empty);
        let prefixes = await g.storage.read("prefixes");
        prefixes[msg.guild.id] = args[0].trim();
        if (prefixes[msg.guild.id] == ",") {
            delete prefixes[msg.guild.id];
        }
        await g.storage.write("prefixes", prefixes);
        msg.channel.send("The bot's prefix has been updated to `" + args[0].trim() + "`");
    }
};
