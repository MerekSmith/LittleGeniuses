const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const fs = require("fs");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    // Can define what the file name will be. Currently just leaving it as uploaded, original name
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // Check that image is a file.
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    // reject a file, need to add error message. The commented one below crashes the server.
    cb(null, false);
    // cb(new Error("file is not jpeg or png"), false);
  }
};

const upload = multer({
  storage,
  // limit size to 6mb
  limits: {
    fileSize: 1024 * 1024 * 6
  },
  fileFilter
});

function move(array, from, to) {
  if (to === from) return array;

  var target = array[from];
  var increment = to < from ? -1 : 1;

  for (var k = from; k != to; k += increment) {
    array[k] = array[k + increment];
  }
  array[to] = target;
  return array;
}

// Load Programs Model
const Program = require("../../models/Program");

// @route 	GET api/programs/test
// @desc 		Tests programs route
// @access 	Public
router.get("/test", (req, res) => res.json({ msg: "Programs works" }));

// @route 	GET api/programs
// @desc 		Get all programs
// @access 	Public
router.get("/", async (req, res) => {
  Program.find()
    .sort({ order: 1 })
    .then(programs => {
      programs.forEach(async (program, index) => {
        // runs through each program and update order to be the same as index to refresh order count. This is needed since a program is removed and causes a gap.
        await Program.findOneAndUpdate({ _id: program._id }, { order: index });
      });
      Program.find()
        .sort({ order: 1 })
        .then(programs => {
          res.json(programs);
        });
    })
    .catch(err =>
      res.status(404).json({ noprogramsfound: "No programs found" })
    );
});

// @route 	POST api/programs
// @desc 		Create program
// @access 	Private
router.post(
  "/",
  // passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  async (req, res) => {
    const { header, description, textColor } = req.body;
    const { path } = req.file;
    const order = await Program.find().countDocuments();

    const newProgram = new Program({
      header,
      description: Array.isArray(description)
        ? description
        : description.split(" ; "),
      imagePath: "/" + path,
      textColor,
      order
    });

    // newProgram.image.data = fs.readFileSync(path);
    // newProgram.image.contentType = mimetype;

    newProgram.save().then(program => res.json(program));
  }
);

// @route 	DELETE api/programs/:id
// @desc 		Delete a post
// @access 	Private
router.delete(
  "/:id",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Program.findByIdAndDelete(req.params.id)
      .then(program => {
        res.json({ success: true });
      })
      .catch(err => {
        res.status(404).json({ programnotfound: "this program doesn't exist" });
      });
  }
);

// @route 	PUT api/programs/:id
// @desc 		Update a program
// @access 	Private
router.put(
  "/:id",
  // passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  (req, res) => {
    Program.findById(req.params.id).then(program => {
      const { header, description, textColor } = req.body;
      const { imagePath } = program;

      let path;
      if (typeof req.file !== "undefined") {
        path = "/" + req.file.path;
      } else {
        path = imagePath;
      }

      program = {
        header,
        description: Array.isArray(description)
          ? description
          : description.split(" ; "),
        imagePath: path,
        textColor
      };

      Program.findOneAndUpdate(
        { _id: req.params.id },
        { $set: program },
        { new: true }
      ).then(program => res.json(program));
    });
  }
);

// @route 	PUT api/programs/move/:id
// @desc 		Update a program
// @access 	Private
router.put(
  "/order/:id",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { orderMove } = req.body;
    Program.findById(req.params.id).then(async program => {
      const { _id, order } = program;
      let newOrder;
      let oldOrder = order;
      if (orderMove === "up") {
        newOrder = order - 1;
      } else if (orderMove === "down") {
        newOrder = order + 1;
      }

      await Program.findOneAndUpdate({ order: newOrder }, { order: oldOrder });

      Program.findOneAndUpdate({ _id }, { order: newOrder }).then(program => {
        res.json({ orderUpdated: "success" });
      });
    });
  }
);

module.exports = router;
