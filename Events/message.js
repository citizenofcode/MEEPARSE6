const Parse = require('../Utils/parser.js');

module.exports = async (client, message) => {
    Parse(message);
    if (message.author.bot || !message.guild || !message.content.startsWith(client.config.prefix)) return;
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
    if (!cmd) return;

    if (cmd.conf.clientPermissions.length) {
        if (!message.channel.permissionsFor(message.guild.me).has(cmd.conf.clientPermissions)) return message.channel.send("The client does not have enough permissions to execute this command!")
    }

    if (cmd.conf.ownerOnly) {
        if (message.author.id !== client.config.owner) return message.channel.send("You have insufficient permissions to run this command!");
    }

    cmd.execute(message, client, args)
}