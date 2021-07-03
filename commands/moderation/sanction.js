const moment = require('moment'),
command = require('../../utils/command')
    Discord = require('discord.js'),
   {db} = require('../../index')

moment.locale('fr')

class infraction extends command{
    constructor(client){
        super(client, {
            name: 'infraction',
            category: 'moderation',
            guildOnly: true,
            description: 'permet d\'afficher les warns d\'un membre',
            syntax: '<utilisateur>'
        })
    }
    run(message, args) {
        let vide = []
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Veuillez mentionner le membre dont voir les warns.')
        db.query(`select * from warns where guildId = "${message.guild.id}" and userId = "${member.id}"`, (err, req) => {
        if(err)throw err
        if (req.length<1) return message.channel.send('Ce membre n\'a aucun warn.')
        const warns = vide.concat(req)
        message.channel.send(new Discord.MessageEmbed()
            .setDescription(`**Total de warns :** ${warns.length}\n\n${warns.map((warn, i) => `**${i + 1}.** ${warn.raison}\nSanctionné ${moment(Number(warn.date)).fromNow()}`).join('\n\n')}`))
        })
    }
}
module.exports = infraction
