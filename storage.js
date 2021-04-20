const fs = require("fs").promises; // Requiring globals would cause circular dependency
const f = require("fs");

async function init(name) {
    if (!(await f.existsSync("storage/"))) {
        await fs.mkdir("storage/");
    }
    if (!(await f.existsSync("storage/" + name + ".json"))) {
        await fs.writeFile("storage/" + name + ".json", "{}");
    }
    return;
}

async function read(name) {
    await init(name);
    let contents = await fs.readFile("storage/" + name + ".json");
    let json = JSON.parse(contents);
    return json;
}

async function write(name, contents) {
    await init(name);
    await fs.writeFile("storage/" + name + ".json", JSON.stringify(contents, null, 4));
}

module.exports = {
    read,
    write
};
