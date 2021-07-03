const {db} = require('../../index')
const command = require('../../utils/command')

class prefix extends command {
    constructor(client){
        super(client, {
            name: 'prefix',
            category: 'configuration',
            guildOnly: true,
            description: 'permet de changer le préfix du bot',
            syntax: '<nouveau préfix>'
        })
    }
    run(message, args){

    const newPrefix = args[0]
    if (!message.member.hasPermission('ADMINISTRATOR'))return message.reply('Vous n\'avez pas la permition administrateur!')
    if (!newPrefix)return message.reply('Vous devez mettre un nouveau préfix!') 
    db.query(`update guilds set prefix = ? where gid = ?`, [newPrefix, message.guild.id], (err) => {
        if(err)throw err
    })
        message.channel.send(`Le nouveau préfix est: ${args[0]}`)
        
    }
    }
    module.exports = prefix