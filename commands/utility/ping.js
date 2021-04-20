module.exports = {
    name: "ping",
    description: "Get bot ping time",
    usage: "",
    execute(msg, args) {
        msg.reply("Pong! " + Math.floor(msg.client.ws.ping) + "ms");
    }
};
