const Command = require('../Struct/Command.js');
const Discord = require('discord.js');
const hastebin = require('hastebin-gen');

class EvalCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'eval',
			description: 'Evalutes JavaScript code.',
			usage: 'eval [--s|silent] <code>',
			aliases: ['e'],
			ownerOnly: true,
			example: ['eval --s message.channels.send(\'hello\')'],
			clientPermissions: ['EMBED_LINKS'],
		});
	}

	async exec(message, client, args) {

		function clean(text) {
			if (typeof (text) === 'string') {return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));}
			else {return text;}
		}
		if (!args.length) {
			return message.channel.send('There\'s nothing to evalulate!');
		}
		try {
			let code = args.join(' ');
			let silent = false;
			if (code.startsWith('--s') || code.startsWith('--silent')) {
				silent = true;
				code = args.slice(1).join(' ');
			}
			let evaled = eval(code);

			if (typeof evaled !== 'string') {evaled = require('util').inspect(evaled);}
			let send = `\`\`\`js\n${clean(evaled)}\n\`\`\``;
			send = send.replace(client.config.token, 'BOT_TOKEN');
			let printOutput = send;
			if (send.toString().length > 1024) {
				await hastebin(clean(evaled), { extension: 'js' })
					.then(link => printOutput = `Output was too long - [Hastebin Link](${link})`)
					.catch(() => printOutput = 'Output was too long - error generating hastebin link.');
			}
			const embed = new Discord.RichEmbed()
				.setTitle('Evalulate Code')
				.setColor('GREEN')
				.addField('Input', `\`\`\`js\n${code}\n\`\`\``)
				.addField('Output', printOutput);
			if (!silent) {
				message.channel.send(embed);
			}

		}
		catch (err) {
			const error = `\`\`\`js\n${clean(err)}\n\`\`\``;
			const errorembed = new Discord.RichEmbed()
				.setTitle('Error')
				.setColor('RED')
				.setDescription(error);
			message.channel.send(errorembed);
		}
	}
}

module.exports = EvalCommand;
