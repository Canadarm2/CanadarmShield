const command=require('../../utils/command')

class kick extends command{
	constructor(client){
		super(client, {
			name: 'kick',
			category: 'moderation',
			guildOnly: true,
			description: 'permet de kick un utilisateur',
			syntax: '<utilisateur> <raison>'
		})
	}
	async run(message, args) {
		if (!message.member.hasPermission('KICK_MEMBERS')) return message.reply('Vous n\'avez pas les permitions requises!');
		const member = message.mentions.members.first(),
		reason = args.slice(1).join(' ')
		if (!member && !reason) return message.reply('Veuillez mentioner un utilisateur et mettre une raison!')
		if (!member) return message.reply(`Veuillez mentioner un membre du serveur! La syntaxe de la commande est: ${config.prefix}kick <utilisateur \à mentioner> <raison>`);
		if (member.id === message.guild.ownerID) return message.reply('Vous ne pouvez pas exclure le propriétaire du serveur.')
		if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.reply('Vous ne pouvez pas exclure ce membre.')
		if (!member.kickable) return message.reply('Erreur fatal: impossible d\'exclure ce membre!');
		if (!reason) return message.reply('veuillez entrer une raison!')
		await member.kick(reason);
		message.channel.send(`Je vient d\'exclure ${member.user.username} du serveur pour la raison suivante: ${reason}`);
	}
	}
	module.exports = kick