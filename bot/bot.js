// Import our .env file
require("dotenv").config();

// Import the plugins we need
const Discord = require("discord.js");
const luxon = require("luxon");
const fs = require("fs");

// Setup our database
const dbFile = "../data/database.db";
const exists = fs.existsSync(dbFile);
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(dbFile);

// if the database does not exist, create it, otherwise print records to console
db.serialize(() => {
  if (!exists) {
    db.run(
      "CREATE TABLE Dates (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, date INT)"
    );
    console.log("New table Dates created!");

    // insert some dates
    db.serialize(() => {
      db.run('INSERT INTO Dates (name, date) VALUES ("Christmas", 1608854400)');
    });
  } else {
    console.log('Database "Dates" ready to go!');
    db.each("SELECT * from Dates", (err, row) => {
      if (row) {
        console.log(`record: ${row.name} ${row.date}`);
      }
    });
  }
});

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

function gotMessage(msg) {
  if (msg.channel.id == CHANNEL_ID && msg.content === "when is break") {
    msg.reply(getReply());
  }
}

async function getReply() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * from Dates", (err, rows) => {
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
