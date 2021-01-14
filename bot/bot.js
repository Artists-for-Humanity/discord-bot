// Import our .env file
require("dotenv").config();

// Import our database functions
const { getAllHolidays } = require("../data/helpers/database");

// Import the plugins we need
const { Client, MessageEmbed } = require("discord.js");
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
const client = new Client();
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
client.on("warn", (info) => console.log(info));
client.on("error", console.error);

async function readyDiscord() {
  console.log(`${client.user.username} ready!`);
}


const checkTime = () => {
  console.log("send-invite")
  // Get latest meeting
  // Get meeting time
  // Get current time 
  // Subtract current time from meeting time
  // Check if difference is within the range of 29.9 and 30.1
  // We will send invite here
}
setInterval(checkTime, 1000);

client.on("message", messageRecieved);

async function messageRecieved(message) {
  if (message.author.bot) return;

  console.log(`Message Received: ${message.content}`);

  if (message.channel.id == CHANNEL_ID) {
    if (message.content.startsWith("/holiday")) {
      const reply = await getHolidayReply();
      message.reply(reply);
    }
    if (message.content.startsWith("/zoom")) {
      const reply = await getZoomReply();
      message.reply(reply);
    }
  }
}

async function getHolidayReply() {
  const holidays = await getAllHolidays(db);
  const index = Math.floor(Math.random() * holidays.length);
  const holiday = holidays[index];

  const formattedStartDate = luxon.DateTime.fromSeconds(
    holiday["startDate"]
  ).toFormat("MMMM dd");
  return holiday["name"] + " starts on " + formattedStartDate;
}

async function getZoomReply() {
  const latestMeeting = await getLatestMeeting(db);
  const zoomDate= luxon.DateTime.fromSeconds(
    latestMeeting.date
  ).toFormat("MMMM dd");
  const zoomTime= luxon.DateTime.fromSeconds(
    latestMeeting.date
  ).toFormat("hh:mm a");
  return "the next Zoom meeting is on "+zoomDate+" at "+zoomTime+". The link is: " + latestMeeting.zoomLink; 
}
const getLatestMeeting = (db) => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM Meetings ORDER BY date DESC LIMIT 1", (err, row) => {
      resolve(row[0]);
    });
  });
};
