const Discord =  require('discord.js');
const Config = require('../config.js');
const fs = require('fs');
const klaw = require('klaw');
const path = require('path');
module.exports = class OutpostClient extends Discord.Client {
    constructor() {
        super(Config.clientOptions);
        this.commands = new Discord.Collection();
        this.aliases = new Discord.Collection();
        this.config = Config;

    }

    loadCommand(commandPath, commandName) {
        try {
            const command = new (require(`${commandPath}${path.sep}${commandName}`))(this);
            command.conf.location = commandPath;
            this.commands.set(command.help.name, command);
            if (command.conf.aliases) {
                command.conf.aliases.forEach(alias => {
                    this.aliases.set(alias, command.help.name)
                });
            }
        } catch (error) {
            console.log(`Error loading command ${commandName}: ${error.stack}`);
        }
    }

    async unloadCommand(commandPath, commandName) {
        let command;
        if (this.commands.has(commandName)) {
            command = this.commands.get(commandName);
        }
        if (!command) return `The command \`${commandName}\` doesn't seem to exist. Please try again.`;
        await delete require.cache[require.resolve(`${commandPath}/${commandName}.js`)];
        this.commands.delete(commandName)
    }

    loadCommands() { // This was meant for my other bot, also works here. This allows recursive adding of files (meaning you can seperate your commands into folders.
        klaw("./Commands/").on('data', (item) => {
            const file = path.parse(item.path);
            if (!file.ext || file.ext !== '.js') return;
            const response = this.loadCommand(file.dir, `${file.name}${file.ext}`);
            if (response) console.log(response);
        });
    }

    loadEvents() {
        fs.readdir("./Events/", (err, files) => {
            if (err) return console.error(err);
            files.forEach(file => {
                const event = require(`../Events/${file}`);
                let eventName = file.split(".")[0];
                this.on(eventName, event.bind(null, this));
            });
        });
    }

    async connect() {
        await this.loadEvents()
        await this.loadCommands()
        this.login(Config.token)
    }
}
