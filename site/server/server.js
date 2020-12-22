/*
  NOTE:
  DON'T WORRY MUCH ABOUT THIS CODE,
  IT'S JUST SETTING SOME THINGS UP
*/

// Setup our database
const fs = require("fs");
const dbFile = "../data/database.db";
const dbExists = fs.existsSync(dbFile);
if (!dbExists) {
  console.error(
    "Please run npm setup in the /data folder to create the database"
  );
  process.exit();
}
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(dbFile);

// Express js is what we use to make a website server
const port = process.env.PORT || 3333;
const { response } = require("express");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
app.use(express.static("public"));
app.use(express.static("js/build"));
app.use(expressLayouts);
app.set("layout", "./templates/page");
app.set("view engine", "ejs");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const luxon = require("luxon");

/*
  NOTE:
  START READING THE CODE HERE
*/

// Our goal here is to make what's called a web server.
// All a web server is is a program that does stuff when people
// go to a link on the website.
// Down below we have code for three different URLs.

//
// This function runs everytime someone goes to "/".
// It would be something like http://localhost:3333/ or http://oursite.com/
app.get("/", async (request, response) => {
  //
  // On the homepage of our bot we want to show a list of all the holidays.
  // To do that we have to get them from our database and then pass them to our HTML.

  //
  // Get all of our holidays
  getAllHolidays((databaseHolidays) => {
    getAllMeetings((databaseMeetings) => {
      console.log(databaseMeetings);
      //
      // databaseHolidays is the data we got straight from the database.
      // It looks like this:
      // [
      //  {id: 1, name: "Christmas", date: 1608854400}
      // ]
      // Remember, date here is a Unix timestamp which isn't very readable.

      //
      // Here we use a thing called map.
      // What map does is it goes through every item in the array,
      // and does something to it.
      // If we have three holidays in databaseHolidays the code inside the
      // map will run three times. Once for each holiday item.
      const holidays = databaseHolidays.map((databaseHoliday) => {
        // databaseHoliday looks like {id: 1, name: "Christmas", startDate: 1608854400}
        //
        // Here we take the start date from the database entry and set it to a variable
        const databaseStartDate = databaseHoliday.startDate;
        //
        // then we take that variable that has the database start date
        // and use luxon to make it a date we can read.
        // 1608854400 goes in, and "December 25" comes out.
        const formattedStartDate = luxon.DateTime.fromSeconds(
          databaseStartDate
        ).toFormat("MMMM dd");
        //
        // Here is where we tell the map what data we want to use.
        // Notice that we are passing id and name directly back
        // but for the date we are using the date we formatted.
        return {
          id: databaseHoliday.id,
          name: databaseHoliday.name,
          startDate: formattedStartDate,
        };
      });
      const meetings = databaseMeetings.map((databaseMeeting) => {

        const databaseStartDate = databaseMeeting.date;

        const formattedStartDate = luxon.DateTime.fromSeconds(
          databaseStartDate
        ).toFormat("MMMM dd");

        return {
          ...databaseMeeting,
          date:formattedStartDate
        };
      });
      console.log(meetings);

      //
      // Finally we want to use the data we retrieved and formatted from the database
      // and pass it into our HTML files.
      // What this code is doing is passing a variable called holiday
      // into the file located in our project at /site/views/pages/index.ejs
      response.render("pages/index", {
        holidays: holidays,
      });
    });
  });
});

//
// Here is where we tell the server what to do on another URL.
// This is the URL that our add holiday form sends it's data to.
// We never visit this URL ourselves. When we submit the form it will
// go to this URL for us.
app.post("/add-holiday", (request, response) => {
  //
  // We can get the name and start date sent by the form
  // through request.body
  //
  // This start date from the form is sent to use like 2020-12-25
  const formHolidayStartDate = request.body.startDate;
  const formHolidayName = request.body.name;

  //
  // Here we convert the start date from the 2020-12-25 format into the Unix date format 1608854400
  const unixStartDate = luxon.DateTime.fromSQL(
    formHolidayStartDate
  ).toSeconds();

  // Add the holiday with name and date
  addHoliday(formHolidayName, unixStartDate, () => {
    //
    // After we add the holiday to the database
    // reload the homepage.
    response.redirect("/");
  });
});

//
// This is the URL that our delete button navigates to.
// Notice the :id in the URL. This is a way we can use a variable in the URL.
// So visiting /delete-holiday/3 will make our id 3
// visiting /delete-holiday/5 will make our id 5
app.get("/delete-holiday/:id", (request, response) => {
  //
  // This is how we get the variable id from the URL.
  const holidayId = request.params.id;

  // Call our deleteHoliday function and pass the id of the holiday to it
  deleteHoliday(holidayId, () => {
    //
    // After we delete the holiday from the database
    // reload the homepage.
    response.redirect("/");
  });
});

//
// This function runs everytime someone goes to "/about".
// All we do here is simply tell the server to show our page's HTML
// which is located at /site/views/pages/about.ejs
app.get("/about", (request, response) => {
  //
  // Show our about page
  response.render("pages/about");
});

/*
  NOTE:
  DATABASE STUFF. DON'T WORRY TOO MUCH ABOUT THE DETAILS.
*/

// Get all of our Holidays from the database
// and pass them to our callback function once they are retrieved.
const getAllHolidays = (callback) => {
  db.all("SELECT * from Holidays", (err, rows) => {
    callback(rows);
  });
};
const getAllMeetings = (callback) => {
  db.all("SELECT * from Meetings", (err, rows) => {
    callback(rows);
  });
};

// Add a holiday to the database with a name and start date.
// Run our callback function once it has been added.
const addHoliday = (name, startDate, callback) => {
  db.run(
    `INSERT INTO Holidays (name, startDate) VALUES ($name, $startDate)`,
    {
      $name: name,
      $startDate: startDate,
    },
    () => {
      // Run our callback function
      callback();
    }
  );
};

// Delete a holiday with a specific id.
// Run our callback function once it has been added.
const deleteHoliday = (id, callback) => {
  db.run(`DELETE FROM Holidays WHERE ID=?`, id, () => {
    // Run our callback function
    callback();
  });
};

// Don't worry about this. More server stuff.
const listener = app.listen(port, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
