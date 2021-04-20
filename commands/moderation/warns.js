const g = require("../../globals");

module.exports = {
    name: "warns",
    description: "Lists all warns for a user",
    usage: "@user",
    guildOnly: true,
    async execute(msg, args) {
        let member = msg.mentions.members.first();
        if (member == undefined) return msg.channel.send(g.words.target);
        let warns = await g.storage.read("warns");
        if (warns[msg.guild.id] && warns[msg.guild.id][member.id]) {
            let memberWarns = Object.keys(warns[msg.guild.id][member.id]).map((key) => [key, warns[msg.guild.id][member.id][key]]);
            let output = "";
            for (var i = 0; i < memberWarns.length; i++) {
                output += "`" + memberWarns[i][0] + "`: " + memberWarns[i][1];
                if (i < memberWarns.length) {
                    output += "\n";
                }
            }
            let embed = new g.Discord.MessageEmbed()
                .setAuthor(memberWarns.length + " total warn(s)")
                .setColor(g.color())
                .setDescription(output);
            msg.channel.send(embed);
        } else {
            msg.channel.send(g.words.noshow);
        }
    }
};
