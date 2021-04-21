const g = require("../../globals");

var diceNotation = /(\d+)[dD](\d+)(.*)$/i;
var modifier = /([+-])(\d+)/;

module.exports = {
    name: "dice",
    description: "Roll dice using cryptographic random",
    usage: "<dice notation expression>",
    execute(msg, args) {
        if (!args[0]) {
            msg.channel.send("🎲 `" + rollDice(1, 6)[0] + "`");
        } else {
            if (args[0].toLowerCase().startsWith("d")) {
                args[0] = "1" + args[0];
            }
            let roll = args[0].trim().replace(/\s+/g, "").match(diceNotation),
                mod = 0;
            if (!roll || roll.length < 3) return msg.channel.send(g.words.expression);
            if (roll[3] && modifier.test(roll[3])) {
                let modParts = roll[3].match(modifier);
                let basicMod = check(modParts[2]);
                if (!basicMod.s) return msg.channel.send(g.words.expression);
                if (modParts[1].trim() === "-") {
                    basicMod.n *= -1;
                }
                mod = basicMod.n;
            }
            let c1 = check(roll[1]);
            let c2 = check(roll[2]);
            if (c1.s == false || c2.s == false) return msg.channel.send(g.words.expression);
            roll[1] = c1.n;
            roll[2] = c2.n;
            let rolls = rollDice(roll[1], roll[2]);
            let total = 0 + mod;
            for (var i = 0; i < rolls.length; i++) {
                total += rolls[i];
            }
            let embed = new g.Discord.MessageEmbed().setColor(g.color()).setAuthor(args[0]).setDescription(`Rolls: ${rolls.length}
                Die: ${roll[2]}
                Modifier: ${mod}
                Results: \`${rolls.join("`, `")}\`
                Total: ${total}`);
            msg.channel.send(embed);
        }
    }
};

function check(number) {
    number = Number(number);
    let success = true;
    if (Number.isNaN(number) || !Number.isInteger(number) || number < 1) {
        success = false;
    }
    return {
        n: number,
        s: success
    };
}

function rollDice(times, sides) {
    let output = [];
    for (var i = 0; i < times; i++) {
        output.push(g.crypto.randomInt(sides) + 1);
    }
    return output;
}
