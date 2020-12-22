# Discord-bot/data

This folder will hold the database file.

## Set up

1. Open the `/data` folder in your Terminal (Mac) or Powershell (Windows).
1. Run `npm install` in Terminal.

## Create/update the database

1. **Delete `data/database.db` if you've already created the database.**
1. Open the `/data` folder in your Terminal (Mac) or Powershell (Windows).
1. Run `npm run setup` in Terminal.

## View table data

1. [Download](https://tableplus.com/) the Table Plus app.
1. Open the app and click "Create a new connection".
1. Select "SQLite".
1. Click "Create".
1. Type "Discord Bot" for the name and then click "Select File" and open the `data/database.db` file.
1. Click "Connect".
1. You should see an item on the left of the app called "Holidays".
1. That is the data for our app!
