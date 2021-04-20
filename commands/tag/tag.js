const g = require("../../globals");

module.exports = {
    name: "tag",
    description: "Sends associated tag value",
    usage: "<tag name>",
    aliases: ["t"],
    guildOnly: true,
    async execute(msg, args) {
        if (!args[0]) return;
        let tags = await g.storage.read("tags");
        if (tags[msg.guild.id] && tags[msg.guild.id][args[0].trim()]) {
            msg.channel.send(tags[msg.guild.id][args[0].trim()].value);
        } else {
            msg.channel.send("Unknown tag `" + args[0].trim() + "`");
        }
    }
};
