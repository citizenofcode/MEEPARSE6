const Command = require('../Struct/Command.js');
const Discord = require('discord.js')

class HelpCommand extends Command {
    constructor(client) {
        super(client, {
            name: "help",
            description: "Help command.",
            usage: "tl.help [command name]",
            example: ["tl.help", "tl.help ping"],
            aliases: ["h"],
            clientPermissions: ["EMBED_LINKS", "SEND_MESSAGES"]
        })
    }

    execute(message, client, args) {
if (args.length) {
const name = args[0].toLowerCase();
const command = client.commands.get(name) || client.commands.find(c => c.help.aliases && c.help.aliases.includes(name));

if (!command) {
    return message.reply("that's not a valid command!");
}
let aliases = "None";
if (command.conf.aliases) {
    aliases = command.conf.aliases.join(", ");
}

const embed = new Discord.RichEmbed()
.setTitle(`Help for command ${command.help.name}`)
.addField("Description", command.help.description)
.addField("Usage", `\`${command.help.usage}\``)
.addField("Examples", `\`\`\`${command.help.example.join("\n")}\`\`\``)
.addField("Aliases", aliases)
.setColor(client.config.color)
.setTimestamp()
.setFooter("The Lonely Outpost")
message.channel.send(embed)

} else {
    const commandList = (client.commands.map(cmd => `\`${cmd.help.name}\` - ${cmd.help.description}`)).join("\n\n");
    const embed = new Discord.RichEmbed()
    .setTitle("Bot Commands")
    .setColor(client.config.color)
    .setFooter("The Lonely Outpost")
    .setTimestamp()
    .setDescription(`Here is a list of all my commands.\n\n${commandList}`)
    message.author.send(embed)
    .then(() => message.reply("I've DM'ed you with a list of my commands!"))
    .catch(() => message.reply("I was unable to DM you!"))
}

    }

}

module.exports = HelpCommand