const g = require("../../globals");

module.exports = {
    name: "prefix",
    description: "Changes the bot's prefix for the current guild. Requires the `MANAGE_GUILD` permission",
    usage: "<new prefix>",
    guildOnly: true,
    async execute(msg, args) {
        if (!msg.member.hasPermission("MANAGE_GUILD")) return;
        if (!args[0]) return msg.channel.send(g.words.empty);
        if (args[0].length > 5) return msg.channel.send("Prefix cannot be longer than 5 characters.");
        let prefixes = await g.storage.read("prefixes");
        prefixes[msg.guild.id] = args[0];
        if (prefixes[msg.guild.id] == ",") {
            delete prefixes[msg.guild.id];
        }
        await g.storage.write("prefixes", prefixes);
        msg.channel.send("The bot's prefix has been updated to `" + args[0] + "`");
    }
};
