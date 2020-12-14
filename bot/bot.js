console.log('ya know what i mean');

require('dotenv').config();
var luxon = require('luxon');

const Discord = require('discord.js');
const client = new Discord.Client();
client.login(process.env.BOTTOKEN);
const CHANNEL_ID = "785990104366841897"
client.on('ready', readyDiscord);

function readyDiscord() {
  console.log('happy winter');
  console.log(getReply());
  // client.channels.cache
  //   .get(CHANNEL_ID)
  //   .send(getReply())
}

const replies = [{
    name: 'Christmas eve',
    date: 1608768000,
  },
  {
    name: 'Christmas',
    date: 1608854400,
  }
]



client.on('message', gotMessage);

function gotMessage(msg) {
  if (msg.channel.id == CHANNEL_ID && msg.content === 'when is break') {

    msg.reply(getReply())
  }
}

function getReply() {
  const index = Math.floor(Math.random() * replies.length);
  const date = replies[index]
  const formattedDate = luxon.DateTime.fromSeconds(date['date']).toFormat('MMMM dd');
  return date['name'] + ' is on ' + formattedDate;
}