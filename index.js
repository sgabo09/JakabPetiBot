const { Client } = require('discord.js');
const config = require("./config.json");
const fs = require('fs');
const parser = require('xml2json');
const client = new Client({ intents: ["Guilds", "GuildMessages", "MessageContent"] });

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function readXml() {
  return new Promise((resolve, reject) => {
      fs.readFile('./DirtyWords.xml', (err , data)=>{
          const input = JSON.parse(parser.toJson(data));
          return resolve(input);
      })
  });
}

async function generateInsult(arg) {
  const json = await readXml();
  const words = json.DirtyWords.Word;
  const number = arg ? arg : 3;

  let insult = "Jakab Péter te";

  for(let i = 0; i < number; i++) {
    const index = getRandomInt(words.length-1);
    insult += ` ${words[index].toLowerCase()}`;
  }

  return insult;
}

const prefix = "!";

client.on("messageCreate", function(message) {
  console.log(message);
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();
  const numArgs = args.map(x => parseFloat(x));

  if (command === "aneppartjan") {
      generateInsult(numArgs[0])
      .then(insult => message.reply(insult))
      .catch(message.reply("ENGEM NEM TUD MEGÁLLÍTANI MINISZTERELNÖK ÚR"));
  }

});

client.login(config.BOT_TOKEN);