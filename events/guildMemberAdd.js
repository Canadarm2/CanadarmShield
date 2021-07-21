const Discord = require('discord.js')
const {db} = require('../index.js')
const tts=require('gtts')

module.exports = class {
    constructor(client){
        this.client=client
    }
    async run(member){
    db.query(`select * from guilds where gid = ${member.guild.id}`, async(err, req) => {
        if(err)throw err
        if(req[0].welcome === 'off')return
        else{
            let wc = req[0].wchannel
    member.guild.channels.cache.get(wc).send(new Discord.MessageEmbed()
        .setDescription(`${member} a rejoint le serveur. Nous sommes désormais ${member.guild.memberCount} ! 🎉`)
        .setColor('#00ff00')
        .setFooter(`${member.guild.name}`)
        .setTimestamp())
        }
})
}
}