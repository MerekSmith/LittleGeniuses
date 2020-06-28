const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Teacher Model
const Teacher = require("../../models/Teacher");

// @route 	GET api/teacher/test
// @desc 		Tests teacher route
// @access 	Public
router.get("/test", (req, res) => res.json({ msg: "Teacher works" }));

// @route 	GET api/teachers
// @desc 		Get all teachers
// @access 	Public
router.get("/", async (req, res) => {
  Teacher.find()
    .sort({ order: 1 })
    .then(teacher => {
      teacher.forEach(async (teacher, index) => {
        // runs through each teacher member and update order to be the same as index to refresh order count. This is needed when a teacher member is removed and causes a gap.
        teacher.order = index;
        await Teacher.findOneAndUpdate({ _id: teacher._id }, { order: index });
      });
      res.json(teacher);
    })
    .catch(err => res.status(404).json({ noTeacherFound: "No teacher found" }));
});

// @route 	POST api/teachers
// @desc 		Create teacher
// @access 	Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { image, name, position, bio } = req.body;
    console.log("body", req.body);
    const order = await Program.find().countDocuments();

    const newTeacher = new Teacher({
      name,
      position,
      bio: Array.isArray(bio) ? bio : bio.split(" ; "),
      image,
      order
    });

    newTeacher
      .save()
      .then(teacher => res.json(teacher))
      .catch(err => {
        res.status(404).json({ err });
      });
  }
);

// @route 	DELETE api/teachers/:id
// @desc 		Delete a teacher member
// @access 	Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Teacher.findByIdAndDelete(req.params.id)
      .then(teacher => {
        res.json({ success: true });
      })
      .catch(err => {
        res
          .status(404)
          .json({ teacherMemberNotFound: "this teacher member doesn't exist" });
      });
  }
);

// @route 	PUT api/teachers/:id
// @desc 		Update a teacher
// @access 	Private
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { image, name, position, bio } = req.body;

    teacher = {
      name,
      position,
      bio: Array.isArray(bio) ? bio : bio.split(" ; "),
      image
    };

    Teacher.findOneAndUpdate(
      { _id: req.params.id },
      { $set: teacher },
      { new: true }
    )
      .then(teacher => res.json(teacher))
      .catch(err => {
        res.status(404).json({ err });
      });
  }
);

// @route 	PUT api/teachers/move/:id
// @desc 		Update a teacher's order position
// @access 	Private
router.put(
  "/order/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { orderMove } = req.body;
    Teacher.findById(req.params.id).then(async teacher => {
      const { _id, order } = teacher;
      let newOrder;
      let oldOrder = order;
      if (orderMove === "up") {
        newOrder = order - 1;
      } else if (orderMove === "down") {
        newOrder = order + 1;
      }

      await Teacher.findOneAndUpdate({ order: newOrder }, { order: oldOrder });

      Teacher.findOneAndUpdate({ _id }, { order: newOrder }).then(teacher => {
        res.json({ orderUpdated: "success" });
      });
    });
  }
);

module.exports = router;
