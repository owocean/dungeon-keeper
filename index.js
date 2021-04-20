#!/usr/bin/env node

"use strict";

const g = require("./globals");
const client = new g.Discord.Client();

client.commands = new g.Discord.Collection();
let commandTypes = g.fs.readdirSync("./commands");

for (let type of commandTypes) {
    g.commandCategories.push(type);
    let commandFiles = g.fs.readdirSync("./commands/" + type).filter((file) => file.endsWith(".js"));
    for (let file of commandFiles) {
        let command = require("./commands/" + type + "/" + file);
        command.type = type;
        client.commands.set(command.name, command);
    }
}

let messageCounter = 0;
let messageThreshold = 0;

client.on("ready", () => {
    messageThreshold = client.guilds.cache.array().length * 100;
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setActivity(g.words.games[Math.floor(Math.random() * g.words.games.length)]);
});

client.on("message", async (msg) => {
    messageCounter++;
    if (messageCounter >= messageThreshold) {
        messageCounter = 0;
        client.user.setActivity(g.words.games[Math.floor(Math.random() * g.words.games.length)]);
    }
    if (msg.author.bot) return;
    let prefix = ",";
    let prefixes = await g.storage.read("prefixes");
    if (msg.guild && prefixes[msg.guild.id]) {
        prefix = prefixes[msg.guild.id];
    }
    if (msg.mentions.has(client.user) && !msg.content.startsWith(prefix)) {
        msg.channel.send("My configured prefix for " + msg.guild.name + " is `" + prefix + "`\nUse `" + prefix + "help` for a list of commands.");
    }
    if (!msg.content.startsWith(prefix)) return;

    let args = msg.content.slice(prefix.length).split(/ +/);
    let commandName = args.shift().toLowerCase();
    let command = client.commands.get(commandName) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

    if (command) {
        if (command.guildOnly && msg.channel.type !== "text") return msg.channel.send(g.words.guildOnly);
        command.execute(msg, args, prefix);
    }
});

client.login(g.env.TOKEN);
