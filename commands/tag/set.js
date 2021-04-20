const g = require("../../globals");

module.exports = {
    name: "set",
    description: "Sets a tag, must have `MANAGE_MESSAGES` permission",
    usage: "<tag name>",
    guildOnly: true,
    async execute(msg, args) {
        if (!msg.member.hasPermission("MANAGE_MESSAGES")) return;
        if (!args[0]) return;
        let tags = await g.storage.read("tags");
        if (tags[msg.guild.id] && tags[msg.guild.id][args[0].trim()]) {
            let owner = tags[msg.guild.id][args[0].trim()].owner;
            if (owner.id == msg.author.id) {
                let tagname = args.shift().trim();
                let value = args;
                if (args.length == 0) return msg.channel.send("Tag value cannot be empty.");
                tags[msg.guild.id][tagname].value = value;
                await g.storage.write("tags", tags);
                msg.channel.send("Set tag `" + tagname + "`");
            } else {
                msg.channel.send("Tag `" + args[0].trim() + "` is already owned by " + owner.tag + ` (${owner.id})`);
            }
        } else {
            let tagname = args.shift().trim();
            let value = args;
            if (args.length == 0) return msg.channel.send("Tag value cannot be empty.");
            if (!tags[msg.guild.id]) {
                tags[msg.guild.id] = {};
            }
            tags[msg.guild.id][tagname] = {
                value: value.join(" "),
                owner: {
                    tag: msg.author.tag,
                    id: msg.author.id
                }
            };
            await g.storage.write("tags", tags);
            msg.channel.send("Set tag `" + tagname + "`");
        }
    }
};
