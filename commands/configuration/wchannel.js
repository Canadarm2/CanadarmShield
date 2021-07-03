const {db} = require('../../index.js')
const command = require('../../utils/command')

class wchannel extends command{
constructor(client){
        super(client, {
                name: 'wchannel',
                category: 'configuration',
                guildOnly: true,
                description: 'permet de configurer le salon de bienvenu',
                syntax: '<salon>'
        })
}

        run(message, args){
                    if (!message.member.hasPermission('ADMINISTRATOR'))return message.reply('Vous n\'avez pas la permition d\'effectuer cette commande!')
                            let channel = message.mentions.channels.first()
                                    if (!channel)return message.reply('Vous devez mentioner un salon dans lequel les messages de départ et d\'accueils seront envoyés.')
                                    db.query(`update guilds set wchannel = "${channel.id}" where gid = "${message.guild.id}"`, (err) => {
                                            if(err)throw err
                                    })
                                            message.channel.send(`Le salon ${channel} a été défini en tant que salon de bienvenu!`)
                                }       
                        }
                        module.exports = wchannel
                        