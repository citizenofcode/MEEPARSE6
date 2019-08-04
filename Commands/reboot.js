const Command = require('../Struct/Command.js');

class RebootCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'reboot',
			description: 'Reboots the bot.',
			usage: 'reboot',
			example: ['reboot'],
			aliases: ['die'],
			clientPermissions: ['SEND_MESSAGES'],
			ownerOnly: true,
		});
	}

	async exec(message, client) {
		message.channel.send('Please confirm whether you want to reboot. [y|n]');
		const filter = m => ['y', 'yes', 'n', 'no', 'cancel'].includes(m.content.toLowerCase());
		message.channel.awaitMessages(filter, { max: 1, time: 10000, errors: ['time'] })
			.then(async collected => {
				switch (collected.first().content.toLowerCase()) {
				case 'y':
					await message.channel.send('Rebooting . . .');
					await process.exit();
					await client.destroy();
					break;
				case 'yes':
					await message.channel.send('Rebooting . . .');
					await process.exit();
					await client.destroy();
					break;
				case 'n':
					message.channel.send('Aborted process.');
					break;
				case 'no':
					message.channel.send('Aborted process.');
					break;
				}
			})
			.catch(() => message.channel.send('Timed out.'));
	}
}

module.exports = RebootCommand;
