const g = require("../../globals");

module.exports = {
    name: "help",
    description: "List all commands",
    aliases: ["commands", "h"],
    usage: "<command name (optional)>",
    execute(msg, args, prefix) {
        if (args.length) {
            let name = args[0].toLowerCase();
            let commands = msg.client.commands;
            let command = commands.get(name) || commands.find((c) => c.aliases && c.aliases.includes(name));
            if (!command) {
                return msg.channel.send("Invalid command name");
            }
            let out = [];
            out.push(`**Name:** ${command.name}`);
            if (command.aliases) out.push(`**Aliases:** ${command.aliases.join(", ")}`);
            if (command.description) out.push(`**Description:** ${command.description}`);
            if (command.usage) out.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);
            msg.channel.send(out, { split: true });
        } else {
            msg.author
                .send("Hello! Here is a list of my commands:")
                .then(() => {
                    if (msg.channel.type === "dm") return;
                    msg.channel.send("DM has been sent.");
                })
                .catch((error) => {
                    msg.reply("It seems like I can't DM you.");
                });
            for (var i = 0; i < g.commandCategories.length; i++) {
                let category = g.commandCategories[i];
                let cmds = msg.client.commands.filter((c) => c.type == category).array();
                let unhidden = [];
                for (var e = 0; e < cmds.length; e++) {
                    if (!cmds[e].hidden) {
                        unhidden.push(prefix + cmds[e].name);
                    }
                }
                if (unhidden.length == 0) continue;
                let embed = new g.Discord.MessageEmbed()
                    .setColor(g.color())
                    .setAuthor(category + " commands")
                    .setDescription(unhidden.join("\n"));
                msg.author.send(embed);
            }
        }
    }
};
