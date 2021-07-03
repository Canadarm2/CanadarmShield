const Discord = require('discord.js'),
{db}=require('../index'),
tts=require('gtts')

module.exports = class {
    constructor(client){
        this.client=client
    }
    async run(message){
        db.query(`SELECT * FROM captchas WHERE userId = ? AND guildId = ?`, [message.author.id, message.guild.id], (err, req) => {
            if(err)throw err
if(message.content!==req[0].value)return message.author.send('\:x: Valeur incorrecte! Vous devez mettre tout les chiffres dans le bon ordre!')
message.author.send('\:white_check_mark: Vous avez réussi à faire ce terrible défi! Vous avez enfin accès à tout le serveur!')
db.query('DELETE FROM captchas WHERE userId = ? AND guildId = ?', [message.author.id, message.guild.id], (error) => {
    if(error)throw error
})
message.channel.delete()
message.guild.member(message.author.id).roles.add(req[0].role)
        })
    }
}