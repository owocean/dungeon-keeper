const g = require("../../globals");

module.exports = {
    name: "owner",
    description: "Gets owner of tag",
    usage: "<tag name>",
    guildOnly: true,
    async execute(msg, args) {
        if (!args[0]) return;
        let tags = await g.storage.read("tags");
        if (tags[msg.guild.id] && tags[msg.guild.id][args[0].trim()]) {
            let owner = tags[msg.guild.id][args[0].trim()].owner;
            msg.channel.send("Owner of tag `" + args[0].trim() + "` is " + owner.tag + ` (${owner.id})`);
        } else {
            msg.channel.send("Unknown tag `" + args[0].trim() + "`");
        }
    }
};
