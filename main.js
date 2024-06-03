const { Client, Events, GatewayIntentBits,Collection } = require("discord.js");
const { exec } = require('child_process');
const fs = require('fs');
const { stderr } = require("process");
const token = "____________TOKEN______________"


const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.MessageContent,
    ] 
});
client.once(Events.ClientReady, c => {
	console.log('Ready!');
});
client.on('ready', () =>{
})
client.on('messageCreate', message => {
    console.log(`Received message: ${message.content}`);
    
    
    if (message.content.includes("السلام عليكم") || message.content.includes("السلام عليكن ورحمة الله وبركاته")) {
        
        if (message.channel.id !== '1226176448612663376') {
            message.reply(`وعليكم السلام ورحمة الله وبركاته ${message.author.username}`);
        }
        return;
    }

    
    if (message.channel.id !== '1226176448612663376') return;

    
    if (!message.content.startsWith("py-run")) {
        
        message.delete().catch(console.error);
        return;
    }

    
    if (message.content.startsWith("py-run")) {
        let code = message.content.split("```")[1].split("```")[0];
        fs.writeFile("file.py", code, (err) => {
            if (err) {
                console.log(`error: ${err}`);
            } else {
                exec(`python file.py`, (error, stdout, stderr) => {
                    if (error) {
                        console.log(error);
                        return;
                    } else if (stderr) {
                        message.reply(stderr);
                        return;
                    }
                    message.reply(stdout);
                });
            }
        });
    }
});

client.login(token);
