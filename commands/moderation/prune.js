module.exports = {
    name: "prune",
    description: "Prune messages from chat. Requires `MANAGE_CHANNELS` permission",
    usage: "<# of messages to delete>",
    guildOnly: true,
    execute(msg, args) {
        if (!msg.member.hasPermission("MANAGE_CHANNELS")) return;
        if (!msg.guild.me.hasPermission("MANAGE_CHANNELS")) return msg.channel.send(g.words.perms);
        if (isNaN(parseInt(args[0]))) {
            return msg.channel.send(g.words.empty);
        } else {
            msg.channel.bulkDelete(parseInt(args) + 1);
        }
    }
};
