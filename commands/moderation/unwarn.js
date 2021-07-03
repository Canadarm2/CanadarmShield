const {db} = require('../../index')
const command = require('../../utils/command')

class unwarn extends command{
    constructor(client){
        super(client, {
            name: 'unwarn',
            category: 'moderation',
            guildOnly: true,
    delete: true,
    description: 'permet d\'unwarn un utilisateur grâce au numéro obtenu via la commande infraction',
    syntax: '<utilisateur> <nuuméro>'

        })
    }
    run(message, args) {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Veuillez mentionner le membre à unwarn.')
        if(!args[1])return message.reply('il me faut le numéro du warn à supprimer.')
        if(!/\d+/.test(args[1]))return message.reply('j\'ai besoin juste d\'un nombre pour le numéro du warn!')
        db.query(`select * from warns where userId = ? and guildId = ?`, [member.id, message.guild.id], (err, req) => {
            if(err)throw err
            const i = parseInt(args[1])-1
            if(!req[i])return message.channel.send('Ce warn n\'existe pas.')
            db.query(`delete from warns where userId = ? and guildId = ? and date = ?`, [member.id, message.guild.id, req[i].date], (error) => {
                if(error)throw error
            })
        message.channel.send(`${member} a été unwarn pour ${req[i].raison} !`)
        })
    }
    }
    module.exports = unwarn