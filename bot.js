console.log('ya know what i mean');

require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
client.login(process.env.BOTTOKEN);

client.on('ready', readyDiscord);

function readyDiscord() {
  console.log('happy birthday winter babies');
}

const replies = [
  'December 24',
  'check the calendar!!!',
  'ask jq',
  'Christmas eve',
  'uuhhhh ya know what i mean',
]

client.on('message', gotMessage);

function gotMessage(msg){
  if (msg.channel.id == '785990104366841897'  && msg.content === 'when is break') {
    const index = Math.floor(Math.random() * replies.length);
    msg.reply(replies[index]);
  }
}
