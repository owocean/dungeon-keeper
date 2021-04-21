const g = require("../../globals");

module.exports = {
    name: "coin",
    description: "Flip a coin using cryptographic random",
    aliases: ["flip"],
    usage: "",
    execute(msg, args) {
        if (g.crypto.randomInt(2) == 1) {
            msg.channel.send("🪙 Heads!");
        } else {
            msg.channel.send("🪙 Tails!");
        }
    }
};
