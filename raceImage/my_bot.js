const tf = require('@tensorflow/tfjs-node'); 
const mobilenet = require('@tensorflow-models/mobilenet'); 
const Discord = require("discord.js"); 
const fs = require('fs'); 
const request = require("request");
const importFunc1 = require("./funcs"); 
const importGame = require("./game"); 
const guilds = require('./guilds.json');

const client = new Discord.Client(); 

const channelLocation = "799473452369051699"; 



client.on('ready', () => {
    console.log("Connected as " + client.user.tag); 

    client.user.setActivity("Boring bot"); 

    client.guilds.cache.forEach((guild) => {
        console.log(guild.name);
        guild.channels.cache.forEach((channel) => {
            console.log(` - ${channel.name} ${channel.type} ${channel.id}`)
        })
    });

    let speakChannel = client.channels.cache.get(channelLocation); 

    //speakChannel.send("I'm active now!"); 
   
}); 




client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) {
        return; 
    }

    let user_username = receivedMessage.author.username; 
    let user_countSent;  

    if (!receivedMessage.author.bot) {
        if (!guilds[user_username]) {
            guilds[user_username] = { messageCount: 0, pointCount: 0 };
        }
        else {
            user_countSent = guilds[user_username].messageCount++;
        }
        try {
          fs.writeFileSync('./guilds.json', JSON.stringify(guilds)); // Again, path may vary.
        } catch(err) {
          console.error(err);
        }
      }

    importFunc1.downloadImage_ClassifyImage(receivedMessage, user_username, user_countSent); 
    importFunc1.greetings1(receivedMessage); 


    console.log(receivedMessage.content); 
 
    

})






client.login(/*Bot Token*/); 
