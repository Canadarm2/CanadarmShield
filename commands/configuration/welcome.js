const {db} = require('../../index.js')
const command = require('../../utils/command')

class welcome extends command{
    constructor(client){
        super(client, {
            name: 'welcome',
            category: 'configuration',
            guildOnly: true,
            description: 'permet d\'activer les messages de bienvenu',
            syntax: '<on / off>'
        })
    }
    run(message, args){
        let status = args[0]
    if (!message.member.hasPermission('ADMINISTRATOR'))return message.reply('Vous n\'avez pas la permition administrateur!')
        if (!status)return message.reply('Vous devez mettre on ou off!')
        if (status === "on") {
            db.query(`update guilds set welcome = "${status}" where gid = "${message.guild.id}"`, (err) => {
                if(err)throw err
            })
            return message.channel.send('Le message de bienvenu et de départ a bien été activer!')
        }
        if (status === "off") {
 db.query(`update guilds set welcome = "${status}" where gid = "${message.guild.id}"`, (err) => {
     if(err)throw err
 })
        return message.channel.send('Le message de bienvenu et de départ a bien été désactiver"')
        }
    }
    }
    module.exports = welcome