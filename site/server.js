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

const luxon = require("luxon");

function formatDate(date) {
  return luxon.DateTime.fromSeconds(date).toFormat("MMMM dd");
}

// This function runs everytime someone goes to "/" which just means the root.
// it would be something like http://localhost:3333/ or http://oursite.com
app.get("/", async (request, response) => {
  db.all("SELECT * from Holidays", (err, rows) => {
    if (err) {
      response.render("pages/index", {
        title: "Home page",
        message: "Error loading holidays",
        holidays: [],
      });
    } else {
      const holidays = rows.map((holiday) => {
        return {
          id: holiday.id,
          name: holiday.name,
          date: formatDate(holiday.date),
        };
      });

      response.render("pages/index", {
        title: "Home page",
        holidays: holidays,
      });
    }
  });
});

app.post("/add-holiday", (request, response) => {
  const unixDate = luxon.DateTime.fromSQL(request.body.date).toSeconds();
  db.run(
    `INSERT INTO Holidays (name, date) VALUES ($name, $date)`,
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

app.get("/delete-holiday/:id", (request, response) => {
  const holidayId = request.params.id;
  db.run(`DELETE FROM Holidays WHERE ID=?`, holidayId, (error, row) => {
    console.log(`deleted holiday with id: ${holidayId}`);
    response.redirect("/");
  });
});

const listener = app.listen(port, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
