const g = require("../../globals");

module.exports = {
    name: "warn",
    description: "Warns a user. Requires the `MANAGE_GUILD` permission",
    usage: "@user <reason (optional)>",
    guildOnly: true,
    async execute(msg, args) {
        if (!msg.member.hasPermission("MANAGE_GUILD")) return;
        let member = msg.mentions.members.first();
        if (member == undefined) return msg.channel.send(g.words.target);
        if (args[0].startsWith("<")) {
            args.shift();
        }
        let reason = args.join(" ") == "" ? "no reason" : args.join(" ");
        let warnID = g.crypto.randomBytes(3).toString("hex");
        let warns = await g.storage.read("warns");
        if (!warns[msg.guild.id]) {
            warns[msg.guild.id] = {};
        }
        if (!warns[msg.guild.id][member.id]) {
            warns[msg.guild.id][member.id] = {};
        }
        warns[msg.guild.id][member.id][warnID] = reason;
        await g.storage.write("warns", warns);
        msg.channel.send("User <@" + member.id + "> was warned for " + reason);
    }
};
