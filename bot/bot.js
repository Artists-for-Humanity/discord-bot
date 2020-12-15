// Import our .env file
require("dotenv").config();

// Import the plugins we need
const Discord = require("discord.js");
const luxon = require("luxon");

// Setup our database
const fs = require("fs");
const dbFile = "../data/database.db";
const dbExists = fs.existsSync(dbFile);
if (!dbExists) {
  console.log(
    "Please run npm start in the /data folder to create the database"
  );
  return;
}
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(dbFile);

// Set up the Discord plugin.
const client = new Discord.Client();
const CHANNEL_ID = process.env.CHANNEL_ID;

if (!process.env.BOT_TOKEN) {
  console.log("Please create an .env file with a BOT_TOKEN");
  return;
}

if (!process.env.CHANNEL_ID) {
  console.log("Please create an .env file with a CHANNEL_ID");
  return;
}

client.login(process.env.BOT_TOKEN);
client.on("ready", readyDiscord);

async function readyDiscord() {
  console.log("Bot is ready");
  console.log("Testing get reply...");
  const reply = await getReply();
  console.log(reply);
}

client.on("message", gotMessage);

async function gotMessage(msg) {
  console.log("Message in channel");
  if (msg.channel.id == CHANNEL_ID && msg.content === "when is break") {
    const reply = await getReply();
    msg.reply(reply);
  }
}

async function getReply() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * from Holidays", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        const index = Math.floor(Math.random() * rows.length);
        const date = rows[index];
        const formattedDate = luxon.DateTime.fromSeconds(date["date"]).toFormat(
          "MMMM dd"
        );
        resolve(date["name"] + " is on " + formattedDate);
      }
    });
  });
}
