const Discord = require('discord.js')
const command = require('../../utils/command')

class clear_all extends command {
    constructor(client){
        super(client, {
            name: 'clear_all',
            category: 'moderation',
            guildOnly: true,
            description: 'permet de vider un salon',
            syntax: 'aucune'
        })
    }
    async run(message, args) {

    if (!message.member.hasPermission("MANAGE_CHANNELS")) {
        return message.channel.send('Tu n\'as pas la permition de faire ça!')
    }

    message.channel.send('Nettoyage en cours...')
    
    await message.channel.clone().then

    ((ch) =>{ch.setParent(message.channel.parent.id);

    ch.setPosition(message.channel.position);

    message.channel.delete().then

    (ch.send('Le salon a bien été vidé de tout ses bon vieux messages!'))

   });
}
 }
 module.exports = clear_all