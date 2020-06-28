const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

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
        program.order = index;
        await Program.findOneAndUpdate({ _id: program._id }, { order: index });
      });
      res.json(programs);
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
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { image, header, description, textColor } = req.body;

    const order = await Program.find().countDocuments();

    const newProgram = new Program({
      header,
      description: Array.isArray(description)
        ? description
        : description.split(" ; "),
      image,
      textColor,
      order
    });

    newProgram
      .save()
      .then(program => res.json(program))
      .catch(err => {
        res.status(404).json({ err });
      });
  }
);

// @route 	DELETE api/programs/:id
// @desc 		Delete a program
// @access 	Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
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
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { image, header, description, textColor } = req.body;

    program = {
      header,
      description: Array.isArray(description)
        ? description
        : description.split(" ; "),
      image,
      textColor
    };

    Program.findOneAndUpdate(
      { _id: req.params.id },
      { $set: program },
      { new: true }
    )
      .then(program => res.json(program))
      .catch(err => {
        res.status(404).json({ err });
      });
  }
);

// @route 	PUT api/programs/order/:id
// @desc 		Update a program's order position
// @access 	Private
router.put(
  "/order/:id",
  passport.authenticate("jwt", { session: false }),
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
