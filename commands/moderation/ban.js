const Discord = require('discord.js')
const config = require('../../config.json')
const command = require('../../utils/command')

class ban extends command {
	constructor(client){
		super(client, {
			name: 'ban',
			category: 'moderation',
			guildOnly: true,
			description: 'permet de bannir un membre',
			syntax: '<utilisateur> <raison>'
		})
	}
	async run(message, args) {
		if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply('Vous n\'avez pas les permitions requises!');
		const member = message.mentions.members.first();
		if (!member) return message.reply(`Veuillez mentioner un membre du serveur! La syntaxe de la commande est: ${config.prefix}ban <utilisateur \à mentioner> <raison>`);
		if (member.id === message.guild.ownerID) return message.reply('Vous ne pouvez pas exclure le propriétaire du serveur.')
		if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.reply('Vous ne pouvez pas exclure ce membre.')
		if (!member.bannable) return message.reply('Erreur fatal: impossible de bannir ce membre!');
        const reason = args.slice(1).join(' ') || 'Aucune raison fournie'
		await member.send(new Discord.MessageEmbed()
		.setTitle('Bannissement')
		.setDescription(`Vous avez été banni du serveur pour la raison suivante: ${reason}`)
		.setFooter(`${member.guild.name}`)
		.setTimestamp())
		await member.ban({reason})
		message.channel.send(`Je vients de bannir ${member.user.username} du serveur.`);
	}
}
module.exports = ban