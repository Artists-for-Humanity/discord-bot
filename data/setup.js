// Setup our database
const fs = require("fs");
const dbFile = "./database.db";
const dbExists = fs.existsSync(dbFile);
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(dbFile);

const insertHolidaySql = (name, date) =>
  `INSERT INTO Holidays (name, startDate) VALUES ("${name}", ${date})`;

const insertMeetingSql = (link, date, name) =>
  `INSERT INTO Meetings (zoomLink, date, name) VALUES ("${link}", ${date}, "${name}")`;

// if the database does not exist, create it, otherwise print records to console
db.serialize(() => {
  if (!dbExists) {
    db.serialize(() => {
      // Create tables
      db.run(
        "CREATE TABLE Holidays (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, startDate INT)",
        (err) => {
          if (err) {
            console.error("Error creating Holidays table");
            console.error(err);
          }
          console.log("New table Holidays created!");
        }
      );
      db.run(
        "CREATE TABLE Meetings (id INTEGER PRIMARY KEY AUTOINCREMENT, zoomLink TEXT, date INT, name TEXT)",
        (err) => {
          if (err) {
            console.error("Error creating Meetings table");
            console.error(err);
          }
          console.log("New table Meetings created!");
        }
      );
    });

    // Insert Data
    db.serialize(() => {
      db.run(insertHolidaySql("Christmas", 1608854400));
      db.run(
        insertMeetingSql(
          "https://zoom.us/j/95454828935?pwd=QWlkUktxRWttRHpLOUw3ei9lajBHdz09",
          1607990400,
          "December 15th at 5:30pm w/ Special Guest Joy Triche"
        )
      );
      db.run(
        insertMeetingSql(
          "https://zoom.us/j/95454828935?pwd=QWlkUktxRWttRHpLOUw3ei9lajBHdz09",
          1607385600,
          "December 8th at 5:30pm w/ Special Guest Joy Triche"
        )
      );
      db.run(
        insertMeetingSql(
          "https://zoom.us/j/95454828935?pwd=QWlkUktxRWttRHpLOUw3ei9lajBHdz09",
          1608658200,
          "December 22nd at 5:30pm w/ Special Guest Joy Triche"
        )
      );
    });
  } else {
    console.warn(
      "Database already exists, please run 'npm run reset-db' before running setup."
    );
  }
});
