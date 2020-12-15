// Express js is what we use to make a website server
const port = process.env.PORT || 3333;
const { response } = require("express");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");

// Setup express and configure some options for our use case.
const app = express();
app.use(express.static("public"));
app.use(expressLayouts);
app.set("layout", "./layouts/page");
app.set("view engine", "ejs");

// Some stuff to make our form work
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies

// Setup our database
const fs = require("fs");
const dbFile = "../data/database.db";
const dbExists = fs.existsSync(dbFile);
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(dbFile);

const luxon = require("luxon");

// if the database does not exist, create it, otherwise print records to console
db.serialize(() => {
  if (!dbExists) {
    db.run(
      "CREATE TABLE Dates (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, date INT)"
    );
    console.log("New table Dates created!");

    // insert some dates
    db.serialize(() => {
      db.run('INSERT INTO Dates (name, date) VALUES ("Christmas", 1608854400)');
    });
  }
});

function formatDate(date) {
  return luxon.DateTime.fromSeconds(date).toFormat("MMMM dd");
}

// This function runs everytime someone goes to "/" which just means the root.
// it would be something like http://localhost:3333/ or http://oursite.com
app.get("/", async (request, response) => {
  db.all("SELECT * from Dates", (err, rows) => {
    if (err) {
      response.render("pages/index", {
        title: "Home page",
        message: "Error loading dates",
        dates: [],
      });
    } else {
      const dates = rows.map((date) => {
        return {
          id: date.id,
          name: date.name,
          date: formatDate(date.date),
        };
      });

      response.render("pages/index", {
        title: "Home page",
        dates: dates,
      });
    }
  });
});

app.post("/add-date", (request, response) => {
  const unixDate = luxon.DateTime.fromSQL(request.body.date).toSeconds();
  db.run(
    `INSERT INTO Dates (name, date) VALUES ($name, $date)`,
    {
      $name: request.body.name,
      $date: unixDate,
    },
    (error) => {
      if (error) {
        console.log(error);
        response.redirect("/");
      } else {
        response.redirect("/");
      }
    }
  );
});

app.get("/delete-date/:id", (request, response) => {
  const rowId = request.params.id;
  db.run(`DELETE FROM Dates WHERE ID=?`, rowId, (error, row) => {
    console.log(`deleted row ${rowId}`);
    response.redirect("/");
  });
});

const listener = app.listen(port, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
