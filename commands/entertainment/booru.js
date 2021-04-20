const g = require("../../globals"),
    Booru = require("booru");

module.exports = {
    name: "booru",
    description: "List all commands",
    hidden: true,
    usage: "<booru name> <tags>",
    async execute(msg, args) {
        try {
            let booru = args.shift();
            let res = await Booru.search(booru, args, { random: true });
            for (var i = 0; i < res.posts.length; i++) {
                let attachment = new g.Discord.MessageAttachment(res.posts[i].fileUrl);
                return msg.channel.send(attachment);
            }
            if (res.posts.length == 0) {
                msg.channel.send("No posts were found with query `" + args + "`");
            }
        } catch (err) {
            msg.channel.send(err.toString());
        }
    }
};
