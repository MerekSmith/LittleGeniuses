const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const nodemailer = require("nodemailer");
// const crypto = require("crypto");
// const multer = require("multer");
// const GridFsStorage = require("multer-gridfs-storage");
// const Grid = require("gridfs-stream");

const reviews = require("./routes/api/reviews");
const users = require("./routes/api/users");
const programs = require("./routes/api/programs");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
// const conn = mongoose.createConnection(db, {
//   useNewUrlParser: true
// });

// Original mongo connection
mongoose
  .connect(db, {
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Init gfs
// let gfs;

// conn.once("open", () => {
//   // Init stream
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection("uploads");
// });

// Create storage engine
// const storage = new GridFsStorage({
//   url: db,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err);
//         }
//         const filename = buf.toString('hex') + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename,
//           bucketName: 'uploads'
//         };
//         resolve(fileInfo);
//       });
//     });
//   }
// });
// const upload = multer({ storage });

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Use routes
app.use("/api/reviews", reviews);
app.use("/api/programs", programs);
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

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
  sendEmail(req, res).catch(err => {
    err.error = true;
    err.mailSent = false;
    res.json(err);
  });
});

// TODO: Move this to a seperate file.
const sendEmail = async (req, res) => {
  const { name, email, phone, address, message } = req.body;

  const output = `
		<p>You have a new contact message from your website</p>
		<h3>Contact Details</h3>
		<ul>
			<li>Name: ${name}</li>
			<li>Email: ${email}</li>
			<li>Phone: ${phone}</li>
			<li>Address: ${address}</li>
		</ul>
		<h3>Message</h3>
		<p>${message}</p>
		`;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.mailgun.org",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "postmaster@sandbox82184c276df34e8b91b32a11560ff75e.mailgun.org", // generated ethereal user
      pass: "11912fd0decf8b411ff463256a1a9212-3939b93a-1d6e73c4" // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from:
      '"Little Geniuses Contact Form" <postmaster@sandbox82184c276df34e8b91b32a11560ff75e.mailgun.org>', // sender address
    to: "mereksmith@hotmail.com", // list of receivers
    subject: `Website Message from ${name}`, // Subject line
    // text: 'Hello world?', // plain text body
    html: output // html body
  });

  res.json({ mailSent: true });

  // console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};
