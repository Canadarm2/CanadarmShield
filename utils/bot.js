const {Client, Collection}=require('discord.js'),
erela = require('erela.js'),

fs = require('fs')

module.exports = class Main extends Client {
  constructor(){
    super({
      partials: ['MESSAGE', 'REACTION'],
  fetchAllMembers: true
    })
this.nodes = [
  {
    host: "gamma.projectheberg.fr",
    password: "youshallnotpass",
    port: 20155,
  }
]
this.commands = new Collection()
this.config=require("../config.json")
  }
loadErelas(){
const nodes=this.nodes
this.manager = new erela.Manager({
  nodes,
  send: (id, payload) => {
    const guild = this.guilds.cache.get(id);
    // NOTE: FOR ERIS YOU NEED JSON.stringify() THE PAYLOAD
    if (guild) guild.shard.send(payload);
  }
})
.on("trackStart", (player, track) => {
  const channel = this.channels.cache.get(player.textChannel);
  channel.send(`En cours de lecture: ${track.title}, demandé par ${track.requester}.`);
})
.on("queueEnd", player => {
  const channel = this.channels.cache.get(player.textChannel);
  channel.send("La fil d'attente est terminée.");
  player.destroy();
});
this.manager.on("nodeConnect", node => {
  console.log(`Node "${node.options.identifier}" connected.`)
})

// Emitted whenever a node encountered an error
this.manager.on("nodeError", (node, error) => {
  console.log(`Node "${node.options.identifier}" encountered an error: ${error.message}.`)
})


this.on("raw", d => this.manager.updateVoiceState(d));
}
  async loadCommands(){
    fs.readdirSync('./commands').forEach(dirs => {
      fs.readdir(`./commands/${dirs}`, (error, files) => {
        if(error)throw error
        files.forEach(file => {
          if(!file.endsWith('.js'))return
          const command = new (require(`../commands/${dirs}/${file}`))(this)
          this.commands.set(command.config.name, command)
        })
      })
    })
    return this
  }
  async loadEvent(){
    fs.readdir('./events', (err, files) => {
      if(err)throw err
      console.log(files.length+'events en marche')
      files.forEach(file => {
const events = new (require(`../events/${file}`))(this)
const event = file.split(".")[0]
this.on(event, (...args) => events.run(...args))
      })
    })
    return this
  }
  async init(){
  this.login(this.config.token)
  this.loadCommands()
  this.loadEvent()
this.loadErelas()
  return this
  }
}