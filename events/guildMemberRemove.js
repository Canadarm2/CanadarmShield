const Discord = require('discord.js')
const {db} = require('../index.js')

module.exports = class {
    constructor(client){
        this.client=client
    }
    run(member){
    db.query(`select * from guilds where gid = ${member.guild.id}`, (err, req) => {
        if(err)throw err
        if(req[0].welcome === 'off')return
        else {
        let wc = req[0].wchannel
    member.guild.channels.cache.get(wc).send(new Discord.MessageEmbed()
        .setDescription(`${member.user.tag} a quitté le serveur... 😢`)
        .setColor('#ff0000')
        .setFooter(`${member.guild.name}`)
        .setTimestamp())
        }
    })
}
}