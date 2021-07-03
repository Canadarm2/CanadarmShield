const db = require('./db.json')
const fs = require('fs')

module.exports = {
    run: (message, args) => {
        if (!message.member.hasPermission('ADMINISTRATOR'))return message.reply('Vous n\'avez pas la permition d\'effectuer cette commande!')
        const lc = args[0]
 if (!lc)return message.reply('Veuillez mettre le nom du salon dans lequel seront envoyé les messages de log.')
 db.guilds[message.guild.id]["logChannel"] = lc
 fs.writeFile("./db.json", JSON.stringify(db, null, 4), (err) => {
    if (err) message.channel.send("Une erreure est survenue.");
 });
    message.channel.send(`Le salon ${lc} est maintenant un salon de log!`)
    },
    name: 'setlog',
    disable: false,
    delete: true,
    guildOnly: true
}