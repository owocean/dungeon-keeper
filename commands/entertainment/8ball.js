const g = require("../../globals");

module.exports = {
    name: "8ball",
    description: "Ask a Magic 8-Ball using cryptographic magic",
    aliases: ["ball"],
    usage: "<question>",
    execute(msg, args) {
        msg.channel.send("🎱 " + g.words.ball[g.crypto.randomInt(g.words.ball.length)]);
    }
};
