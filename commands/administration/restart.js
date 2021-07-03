const command = require('../../utils/command')

class restart extends command{
constructor(client){
    super(client, {
        name: 'restart',
        category: 'administration',
        guildOnly: true,
        description: 'permet de restart le bot',
        syntax: 'aucune'
    })
}
run(message){
    if (message.author.id !== '384003005202038794')return message.reply('Vous ne pouvez pas exécuter cette commande!')
        message.channel.send('Le bot a bien été redémarrer!')
setTimeout(() => {
        process.exit()
}, 1e2)
}
}
module.exports = restart