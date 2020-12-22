// Setup our database
const fs = require("fs");
const dbFile = "./database.db";
const dbExists = fs.existsSync(dbFile);
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(dbFile);

// if the database does not exist, create it, otherwise print records to console
db.serialize(() => {
  if (!dbExists) {
    db.run(
      "CREATE TABLE Holidays (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, startDate INT)"
    );
    db.run(
      "CREATE TABLE Meetings (id INTEGER PRIMARY KEY AUTOINCREMENT, zoomLink TEXT, date INT, name TEXT)"
    );
    console.log("New table Holidays created!");

    // insert some dates
    db.serialize(() => {
      db.run(
        'INSERT INTO Holidays (name, startDate) VALUES ("Christmas", 1608854400)'
      );
    });
  }
});