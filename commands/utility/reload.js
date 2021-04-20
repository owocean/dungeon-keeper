const g = require("../../globals");

module.exports = {
    name: "reload",
    description: "Reloads a command",
    usage: "<command name (optional)>",
    hidden: true,
    execute(msg, args) {
        if (!args[0] || msg.author.id != process.env.OWNER_ID) return;
        const commandName = args[0].toLowerCase();
        const command = msg.client.commands.get(commandName) || msg.client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

        let commandType = command.type;

        if (!command) {
            return msg.channel.send(`There is no command with name or alias \`${commandName}\``);
        }

        delete require.cache[require.resolve(`../${commandType}/${command.name}.js`)];

        try {
            const newCommand = require(`../${commandType}/${command.name}.js`);
            newCommand.type = commandType;
            msg.client.commands.set(newCommand.name, newCommand);
            msg.channel.send(`Command \`${command.name}\` has been reloaded`);
        } catch (error) {
            console.log(error);
            msg.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.msg}\``);
        }
    }
};
