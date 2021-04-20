const g = require("../../globals");

module.exports = {
    name: "eval",
    description: "Evaluate javascript code",
    usage: "<javascript expression>",
    hidden: true,
    execute(msg, args) {
        if (msg.author.id !== g.env.OWNER_ID) return;
        let client = msg.client;
        try {
            const code = args.join(" ");
            let evaled = eval(code);

            msg.channel.send(evaled, {
                code: "xl"
            });
        } catch (err) {
            msg.channel.send(`\`ERROR\` \`\`\`xl\n${err}\n\`\`\``);
        }
    }
};
