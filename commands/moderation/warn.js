const {db} = require('../../index')
const command = require('../../utils/command')

class warn extends command{
    constructor(client){
        super(client, {
            name: 'warn',
            category: 'moderation',
    guildOnly: true

        })
    }
    run(message, args) {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Veuillez mentionner le membre à warn.')
        if (member.id === message.guild.ownerID) return message.channel.send('Vous ne pouvez pas warn le propriétaire du serveur.')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Vous ne pouvez pas warn ce membre.')
        const reason = args.slice(1).join(' ')
        if (!reason) return message.channel.send('Veuillez indiquer une raison.')
        
    db.query(`insert into warns (userId, guildId, date, raison) values (?, ?, ?, ?)`, [member.id, message.guild.id, Date.now(), reason], (error) => {
        if(error)throw error
    })
    message.channel.send(`${member} a été warn pour ${reason} !`)
    }
    }
    module.exports = warn