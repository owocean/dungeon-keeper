const g = require("../../globals");

module.exports = {
    name: "kick",
    description: "Kick a user. Requires the `KICK_MEMBERS` permission",
    usage: "@user <reason (optional)>",
    guildOnly: true,
    async execute(msg, args) {
        if (!msg.member.hasPermission("KICK_MEMBERS")) return;
        if (!msg.guild.me.hasPermission("KICK_MEMBERS")) return msg.channel.send(g.words.perms);
        let member = msg.mentions.members.first();
        if (member == undefined) return msg.channel.send(g.words.target);
        await member.send("You have been kicked from " + msg.guild.name);
        if (args[0].startsWith("<")) {
            args.shift();
        }
        let reason = args.join(" ");
        member
            .kick(reason)
            .then((m) => {
                msg.channel.send(m.displayName + " has been kicked.");
            })
            .catch((err) => {
                msg.channel.send("Failed to kick member. Do they have higher permissions than me?");
            });
    }
};
