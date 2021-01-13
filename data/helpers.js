async function getAllHolidays(db) {
  return new Promise((resolve, reject) => {
    db.all("SELECT * from Holidays", (err, rows) => {
      resolve(rows);
    });
  });
}

exports.getAllHolidays = getAllHolidays;
