const {db}=require('../index')

module.exports = class {
    constructor(client){
        this.client = client
    }
async run(){
    setInterval(async () => {
        db.query('SELECT * FROM bans', async(err, req) => {
            if(err)throw err
            if(req.length<1)return
            for(const bans of req){
                const guild = this.client.guilds.cache.get(bans.guildId)
                const time = bans.date-Date.now()
                const user = await this.client.users.fetch(bans.userId)
                const sql = `DELETE FROM BANS WHERE userId = ? AND guildId = ?`
                if(time>=1)setTimeout(async () => {
                    guild.members.unban(user)
                    db.query(sql, [user, guild], (error) => {
                        if(error)throw error
                    })
                }, time)
                if(time<1){
                    guild.members.unban(user)
                    db.query(sql, [user, guild], (error) => {
                        if(error)throw error
                    })
                }
            }
        })
    }, 120000)
}
}