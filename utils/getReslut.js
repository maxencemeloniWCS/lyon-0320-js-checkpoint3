const sqlError = require("../utils/errorSql");

module.exports = getResult = (res, err, results) => {
  if (err) {
    sqlError(res, err);
  } else if (results != "") {
    res.status(200).json(results);
  } else {
    res.sendStatus(404);
  }
};
