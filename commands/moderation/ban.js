const g = require("../../globals");

module.exports = {
    name: "ban",
    description: "Ban a user. Requires the `BAN_MEMBERS` permission",
    usage: "@user <reason (optional)>",
    guildOnly: true,
    async execute(msg, args) {
        if (!msg.member.hasPermission("BAN_MEMBERS")) return;
        if (!msg.guild.me.hasPermission("BAN_MEMBERS")) return msg.channel.send(g.words.perms);
        let member = msg.mentions.members.first();
        if (member == undefined) return msg.channel.send(g.words.target);
        await member.send("You have been banned from " + msg.guild.name);
        if (args[0].startsWith("<")) {
            args.shift();
        }
        let reason = args.join(" ");
        member
            .ban({ reason })
            .then((m) => {
                msg.channel.send(m.displayName + " has been banned.");
            })
            .catch((err) => {
                msg.channel.send("Failed to ban member. Do they have higher permissions than me?");
            });
    }
};
