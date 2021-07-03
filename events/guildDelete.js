const Discord = require('discord.js')
const {db} = require('../index.js')

module.exports = class {
    constructor(client){
        this.client=client
    }
    run(guildl){
    db.query(`delete from guilds where gid = ${guildl.id}`, (err) => {
        if(err)throw err
    })
}
}