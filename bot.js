console.log('ya know what i mean')

const Discord = require('discord.js');
const client = new Discord.Client();
client.login('Nzg1OTc3NTYwNTYzNDQ5ODg2.X8_spQ.oStzkXgNPWVWjvoiTS-lQ_CYKaI');

client.on('ready', readyDiscord);

function readyDiscord() {
  console.log('happy birthday winter babies');
}

client.on('message', gotMessage);

function gotMessage(msg){
  console.log(msg.content);
  if (msg.content === 'when is break') {
    msg.reply('December 24')
  }
}
