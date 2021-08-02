const tf = require('@tensorflow/tfjs-node'); 
const mobilenet = require('@tensorflow-models/mobilenet'); 
const Discord = require("discord.js"); 
const fs = require('fs'); 
const request = require("request");
const importGame = require("./game"); 

const client = new Discord.Client(); 

const channelLocation = "799473452369051699";




function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    while (0 !== currentIndex) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with  current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}

function greetings1(receivedMessage) {
    let data1 = fs.readFileSync('data/different_hello_greetings.txt', 'utf8'); 
    let result_data1 = data1.split("\n"); 
    let message_data1 = ["hi there!", "yo!", "hello!", "Welcome!"]; 

    shuffle(message_data1); 
    for (var i = 0; i < result_data1.length; i++) {
        if (receivedMessage.content.trim() == result_data1[i]) {
            receivedMessage.channel.send(message_data1[0] + " " + receivedMessage.author.username); 
        }
    }
}



async function downloadImage_ClassifyImage(receivedMessage, user_username, user_countSent) {
    

    if (!receivedMessage.author.bot && receivedMessage.channel.id == channelLocation) {

        const url = receivedMessage.attachments.first().url;
        const download = (url, path, callback) => {
          request.head(url, (err, res, body) => {
            request(url).pipe(fs.createWriteStream(path)).on("close", callback);
          });
        };

        const pathCreate = "./images/image.png";
        
        download(url, pathCreate, () => {
          console.log("Done! Downloading the image"); 
          ImageClassification(receivedMessage, pathCreate, user_username, user_countSent);
        });
      }

}



async function ImageClassification(receivedMessage, imageClient, user_username, user_countSent) {


    const image = fs.readFileSync(imageClient); 
    const decodeImage = tf.node.decodeImage(image, 3); 

    const model = await mobilenet.load(); 
    const predictions = await model.classify(decodeImage); 
    var messageResult = `${JSON.stringify(predictions, undefined, 2)}`; 


    var m1 = Math.round(predictions[0].probability * 100); 
    var m2 = Math.round(predictions[1].probability * 100); 
    var m3 = Math.round(predictions[2].probability * 100); 


    var describe = "First, for me it looks like " + predictions[0].className + " that I am " + m1 +"%" + " confident!"; 
    var describe1 = "secondly, for me it looks like " + predictions[1].className + " that I am " + m2 +"%" + " confident!"; 
    var describe2 = "thirdly, for me it looks like " + predictions[2].className + " that I am " + m3 +"%" + " confident!"; 

    receivedMessage.channel.send(receivedMessage.author.username + " sent this post!");
    receivedMessage.channel.send(describe); 
    receivedMessage.channel.send(describe1); 
    receivedMessage.channel.send(describe2); 

    importGame.main(user_username, user_countSent, m1, m2, m3, receivedMessage); 



}
 


module.exports = {shuffle, 
    greetings1, downloadImage_ClassifyImage, ImageClassification }; 
