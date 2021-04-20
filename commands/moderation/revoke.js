const g = require("../../globals");

module.exports = {
    name: "revoke",
    description: "Revokes a warn. Requires the `MANAGE_GUILD` permission",
    usage: "@user <warn ID>",
    guildOnly: true,
    async execute(msg, args) {
        if (!msg.member.hasPermission("MANAGE_GUILD")) return;
        if (!msg.guild.me.hasPermission("MANAGE_GUILD")) return msg.channel.send(g.words.perms);
        let member = msg.mentions.members.first();
        if (member == undefined) return msg.channel.send(g.words.target);
        if (args[0].startsWith("<")) {
            args.shift();
        }
        if (args.join(" ") == "") return msg.channel.send(g.words.empty);
        let id = args[0].trim();
        let warns = await g.storage.read("warns");
        if (!warns[msg.guild.id]) return msg.channel.send("User does not have any warns.");
        delete warns[msg.guild.id][member.id][id];
        if (!Object.keys(warns[msg.guild.id][member.id]).length) {
            delete warns[msg.guild.id][member.id];
        }
        await g.storage.write("warns", warns);
        msg.channel.send("Warn has been revoked.");
    }
};
