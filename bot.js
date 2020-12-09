console.log('ya know what i mean')

const Discord = require('discord.js');
const client = new Discord.Client();
client.login('Nzg1OTc3NTYwNTYzNDQ5ODg2.X8_spQ.oStzkXgNPWVWjvoiTS-lQ_CYKaI');

client.on('ready', readyDiscord);

function readyDiscord() {
  console.log('happy birthday winter babies');
}

const replies = [
  'December 24',
  'idk bro',
  'check the calendar!!!',
  'ask jq',
  'Christmas eve'
]

client.on('message', gotMessage);

function gotMessage(msg){
  if (msg.channel.id == '785990104366841897'  && msg.content === 'when is break') {
    const index = Math.floor(Math.random() * replies.length);
    msg.reply(replies[index]);
  }
}
