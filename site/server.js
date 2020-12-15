// Express js is what we use to make a website server
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const port = process.env.PORT || 3333;

// Setup express and configure some options for our use case.
const app = express();
app.use(express.static("public"));
app.use(expressLayouts);
app.set("layout", "./layouts/page");
app.set("view engine", "ejs");

// This function runs everytime someone goes to "/" which just means the root.
// it would be something like http://localhost:3333/ or http://oursite.com
app.get("/", (request, response) => {
  response.render("pages/index", {
    title: "Home page",
    dates: ["Christmas", "Easter"],
  });
});

const listener = app.listen(port, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
