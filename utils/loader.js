const fs = require('fs')

        const loadCommands = (client) =>{
            fs.readdirSync("./commands/").forEach(dirs => {
                fs.readdir(`./commands/${dirs}`, (err, files) => {
                        if (err) throw err
                    files.forEach(file => {
                        if (!file.endsWith('.js')) return
                        const command = require(`../commands/${dirs}/${file}`)
                        client.commands.set(command.name, command)
                })
            })
            })
        }
        const loadEvents = (client) => {
            fs.readdir('./events/', (error, f) => {
                if(error) console.log(error);
                console.log(`${f.length} events en marche`);
            
                f.forEach(f2 => {
                    const events = require(`../events/${f2}`)
                    const event = f2.split(".")[0];
                    client.on(event, events.bind(null, client));
                });
            });
        }
        module.exports = {
            loadEvents,
            loadCommands
        }