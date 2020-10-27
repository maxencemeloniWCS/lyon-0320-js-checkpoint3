module.exports = ErrorSql = (res, err) => {
  res.status(500).send({
    error: err.message,
    sql: err.sql,
  });
};
