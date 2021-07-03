const Discord = require('discord.js')
const {db} = require('../index.js')

module.exports = class {
    constructor(client){
        this.client=client
    }
    run() {
    console.log(`Logged in as ${this.client.user.tag}!`);
    //client.manager.init(client.user.id);
    this.client.user.setActivity('écouter vos demandes de support en DM.', {type: 'PLAYING'})
    //this.client.emit("banChecker")
    this.client.guilds.cache.forEach(g => {
        db.query(`select * from guilds where gid = ${g.id}`, (err, req) => {
            if(err)throw err
            if(req.length<1){
                let sq = "insert into guilds (gid, name, prefix, welcome, wchannel, logs, lockChannels) values ?"
                let values = [
                    [g.id, g.name, 'cs!', 'off', 'none', 'none', 'none']
                ]
                db.query(sq, [values], (err) => {
                    if(err)throw err;
                })
            }
        })
    })
}
}