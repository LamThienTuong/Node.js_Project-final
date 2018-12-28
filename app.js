const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const debug = require("debug")("app");

const indexRouter = require("./routes/index");
const apiRouter = require("./routes/api");

const app = express();

app.log = debug;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api", apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.start = (PORT, MONGO_URL) => {
  mongoose
    .connect(MONGO_URL)
    .then(() => {
      debug(MONGO_URL + " database connect success");
      app.listen(PORT, () =>
        console.log("App started and listening on port", PORT)
      );
    })
    .catch(err => {
      debug("Database connection error:" + err);
    });
};

module.exports = app;
