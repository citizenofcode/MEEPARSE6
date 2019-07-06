const Command = require('../Struct/Command.js');
const Discord = require('discord.js')

class PingCommand extends Command {
    constructor(client) {
        super(client, {
            name: "ping",
            description: "Latency and API response times.",
            usage: "tl.ping",
            example: ["tl.ping"],
            aliases: ["pong"],
            clientPermissions: ["EMBED_LINKS"]
        })
    }

    execute(message, client, args) {
        message.channel.send("Ping?")
        .then(msg => msg.edit(new Discord.RichEmbed()
        .setTitle("Pong!")
        .setDescription(`**-** Latency: ${msg.createdTimestamp - message.createdTimestamp}ms\n**-** API Latency: ${Math.round(client.ping)}ms`)
        .setColor(client.config.color)))
        .catch(e => console.error(e))
    }
}

module.exports = PingCommand;