const Command = require('../Struct/Command.js');
const Discord = require('discord.js');
const moment = require('moment');
require('moment-duration-format');

class InfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'stats',
			description: 'Information about the bot.',
			usage: 'stats',
			example: ['stats'],
			aliases: ['botstats'],
			clientPermissions: ['EMBED_LINKS'],
		});
	}

	exec(message, client) {
		const duration = moment.duration(client.uptime).format(' D [days], H [hrs], m [mins], s [secs]');
		const embed = new Discord.RichEmbed()
			.setTitle('Statistics')
			.setColor(client.config.color)
			.addField('Memory usage', (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + 'MB')
			.addField('Uptime', duration)
			.addField('Users', client.users.size.toLocaleString())
			.addField('Channels', client.channels.size.toLocaleString())
			.addField('Servers', client.guilds.size.toLocaleString())
			.addField('Discord.js', 'v' + Discord.version)
			.addField('Node', process.version);
		message.channel.send(embed);
	}
}

module.exports = InfoCommand;
