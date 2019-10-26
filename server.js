const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const sendContactEmail = require("./services/email");

const reviews = require("./routes/api/reviews");
const users = require("./routes/api/users");
const programs = require("./routes/api/programs");
const teachers = require("./routes/api/teachers");
const carousel = require("./routes/api/carousel");

const app = express();

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Use routes
app.use("/api/users", users);
app.use("/api/reviews", reviews);
app.use("/api/programs", programs);
app.use("/api/teachers", teachers);
app.use("/api/carousel", carousel);

app.use("/uploads", express.static("uploads"));
// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

// email contact form sending
app.post("/send", async (req, res) => {
  sendContactEmail(req, res).catch(err => {
    err.error = true;
    err.mailSent = false;
    res.json(err);
  });
});
