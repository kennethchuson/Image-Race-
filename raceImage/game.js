
const Discord = require("discord.js"); 
const fs = require('fs'); 
const request = require("request");
const importFunc1 = require("./funcs"); 
const guilds = require('./guilds.json');


const client = new Discord.Client(); 
const fetch = require("node-fetch");


const channelLocation = "799473452369051699";


class Game {


    constructor(gameOver, score_pass, player, board, arr, countSent) {
        this.gameOver = gameOver; 
        this.score_pass = score_pass; 
        this.player = player; 
        this.board = board; 
        this.arr = arr; 
        this.countSent = countSent
    }


    checkScore() {
        var sum_even = 0; 
        var sum_odd = 0; 
        var value_odd = 0; 
        var check_odd = false;  
        var score = 0;
        var score_step = 0; 
    
        for (var i = 0; i < this.arr.length; i++) {
            if (this.arr[i] % 2 == 0) {
                sum_even += this.arr[i]; 
            }
            else {
                value_odd = this.arr[i]; 
                check_odd = true; 
            }
        }
        if (check_odd) {
            sum_odd = (this.arr[0] - this.arr[this.arr.length - 1]) + value_odd;
        }
        if (sum_even > this.score_pass || sum_odd > this.score_pass) {
            score++; 
        }
        else {
            score--; 
            if (score < 0) {
                score = 0; 
            }
        }
        return score;  
    }


    

    drawGame(receivedMessage) {


        this.board[0] = this.player; 

        var score = this.checkScore(); 

        var points; 
        var scoring = score;  
        var check_won = false; 
        var storeScore = []; 

        storeScore.push(scoring); 

        console.log(storeScore); 
        console.log("counts: " + this.countSent); 

       
        console.log("score: " + score); 
        if (score == 1) {
            points = guilds[receivedMessage.author.username].pointCount++;
        }
        else {
            points = guilds[receivedMessage.author.username].pointCount;
        }
        try {
          fs.writeFileSync('./guilds.json', JSON.stringify(guilds)); 
        } catch(err) {
          console.error(err);
        }

        console.log("points: " + points); 
        
        for (var i = 0; i < this.board.length; i++) {
            this.board[i] = '.'; 
            
            if (points == i) {
                this.board[points] = '*' + this.player + '*'; 
            }

            if (points == 5) {
                check_won = true; 
            }

        }

        if (check_won) {
            receivedMessage.channel.send(this.player + " won the game!"); 
        }

        receivedMessage.channel.send(this.board); 
        receivedMessage.channel.send("🏁"); 

    }


}

function main(player, countSent, m1, m2, m3, receivedMessage) {

    var gameOver = false; 
    var score_pass = 95; 
    var board = [0,0,0,0,0,0]; 
    
    var arr = [m1, m2, m3]; 

    receivedMessage.channel.send("--------------------GAME-------------------"); 

    var game = new Game(gameOver, score_pass, player, board, arr, countSent);

    game.drawGame(receivedMessage); 



}


module.exports = { main };  



