const Discord = require('discord.js')
const {db} = require('../index.js')

module.exports = class {
    constructor(client){
        this.client=client
    }
    async run(guildc){
    db.query("select * from guilds", (err, result) => {
if(err)throw err
    let dc = "";
 let sql = "insert into guilds (gid, name, prefix, welcome) values (?, ?, 'cs!', 'false')";
 db.query(sql, [guildc.id, guildc.name], (err, res) => {
if(err)throw err
 })
guildc.channels.cache.forEach(channel => {
    if(channel.type === 'text'&&dc==""){
        if(channel.permissionsFor(guildc.me).has("SEND_MESSAGES")) {
            if(channel.name.startsWith("g")||channel.name.startsWith('💬')||channel.name.startsWith('🌐')||channel.name.startsWith('cha')||channel.name.startsWith('『🌍')||channel.name.startsWith('『💬'))dc = channel
        }
    }
});
dc.send(new Discord.MessageEmbed()
.setTitle('Fiou! J\'ai réussi à franchir de terribles épreuves pour arriver ici!')
.setDescription(`j'ai enfin réussi \à arriver sur le serveur ${guildc.name}!\n\nMon préfix est cs!`)
.setFooter('CanadarmShield')
.setTimestamp())
    })
}
}