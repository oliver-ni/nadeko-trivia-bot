const Discord = require("discord.js");
const fs = require("fs");
const readline = require('readline');

let questions = JSON.parse(fs.readFileSync("qdict.json"));

function makeBot() {

    const client = new Discord.Client();

    let on = false;

    client.on("message", message => {
        if (message.author.id == 116275390695079945) {
            if (message.embeds.length == 1) {
                let embed = message.embeds[0];
                if (embed.title == "Trivia Game" && embed.fields.length == 2 && embed.fields[1].name == "Question") {
                    let question = embed.fields[1].value;
                    console.log("QUESTION – " + question);
                    if (question in questions) {
                        let answer = questions[question];
                        message.channel.send(answer);
                        console.log("ANSWERED – " + answer);
                    } else {
                        console.log("NOT FOUND");
                    }
                    console.log();
                }
            }
        }
    });

    return client;

}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Warning: Running Discord self-bots is aginst the Discord Terms of Service\n\n------\n\n*Discord Nadeko Trivia Bot*\n")

rl.question('What is your Discord token?\n', (answer) => {  
    const client = makeBot()
    client.login(answer);

    console.log("\nBot is running\n")
});
