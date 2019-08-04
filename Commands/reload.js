const Command = require('../Struct/Command.js');
const Discord = require('discord.js');

class ReloadCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'reload',
			description: 'Reloads a command or all.',
			usage: 'reload [all|command]',
			example: ['reload all', 'reload help'],
			aliases: ['r'],
			clientPermissions: ['EMBED_LINKS'],
			ownerOnly: true,
		});
	}

	async exec(message, client, args) {
		if (!args.length) return message.channel.send('Nothing to reload!');

		if (args[0] === 'all') {
			client.commands.forEach(async cmd => {
				await client.unloadCommand(cmd.conf.location, cmd.help.name);
				client.loadCommand(cmd.conf.location, cmd.help.name);
			});
			message.channel.send(new Discord.RichEmbed().setTitle('Reloaded all commands!').setColor(client.config.color).setTimestamp());
			return;
		}
		const name = args[0].toLowerCase();
		const command = client.commands.get(name) || client.commands.find(c => c.help.aliases && c.help.aliases.includes(name));
		if (!command) return message.channel.send('No such command of that name or alias!');
		await client.unloadCommand(command.conf.location, command.help.name);
		client.loadCommand(command.conf.location, command.help.name);
		message.channel.send(new Discord.RichEmbed().setTitle(`Reloaded command ${command.help.name}!`).setTimestamp().setColor(client.config.color));
	}
}

module.exports = ReloadCommand;
