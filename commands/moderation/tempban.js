const parseDuration = require('parse-duration'),
command=require('../../utils/command'),
    humanizeDuration = require('humanize-duration'),
    {MessageEmbed} = require('discord.js'),
    {db} = require('../../index')

class tempban extends command{
    constructor(client){
        super(client, {
            name: 'tempban',
            category: 'moderation',
            guildOnly: true,
            description: 'permet de bannir un membre pendant un certain temps',
            syntax: '<utilisateur> <durée> <raison>'
        })
    }
    async run(message, args) {
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Veuillez mentionner le membre à bannir.')
        if (member.id === message.guild.ownerID) return message.channel.send('Vous ne pouvez pas bannir le propriétaire du serveur.')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Vous ne pouvez pas Bannir ce membre.')
        if (!member.bannable) return message.channel.send('Le bot ne peut pas bannir ce membre.')
        const duration = parseDuration(args[1])
        if (!duration) return message.channel.send('Veuillez indiquer une durée valide.')
        const reason = args.slice(2).join(' ') || 'Aucune raison fournie'
        await member.ban({reason})
        message.channel.send(`${member.user.tag} a été banni pendant ${humanizeDuration(duration, {language: 'fr'})} !`)
        db.query(`INSERT INTO bans (userId, guildId, date) VALUES (?, ?, ?)`, [member.id, message.guild.id, Date.now()], (err) => {
            if(err)throw err
        })
        setTimeout(() => {
            message.guild.members.unban(member)
            message.channel.send(new MessageEmbed()
            .setTitle('Membre débanni!')
            .setDescription(`${member.user.tag} a été débanni.`)
            .setFooter(client.user.username)
            .setTimestamp())
        }, duration)
    }
    }
    module.exports = tempban