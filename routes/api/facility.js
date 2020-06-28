const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Facility Model
const Facility = require("../../models/Facility");

// @route 	GET api/facility/test
// @desc 		Tests facility route
// @access 	Public
router.get("/test", (req, res) => res.json({ msg: "Facility works" }));

// @route 	GET api/facility
// @desc 		Get all facility
// @access 	Public
router.get("/", async (req, res) => {
  Facility.find()
    .sort({ order: 1 })
    .then(facility => {
      facility.forEach(async (facilitySlide, index) => {
        // runs through each facilitySlide and update order to be the same as index to refresh order count. This is needed since a facilitySlide is removed and causes a gap.
        facilitySlide.order = index;
        await Facility.findOneAndUpdate(
          { _id: facilitySlide._id },
          { order: index }
        );
      });
      res.json(facility);
    })
    .catch(err =>
      res.status(404).json({ nofacilityfound: "No facility slides found" })
    );
});

// @route 	POST api/facility
// @desc 		Create facility
// @access 	Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { image, legend } = req.body;

    const order = await Facility.find().countDocuments();

    const newFacilitySlide = new Facility({
      legend,
      image,
      order
    });

    newFacilitySlide.save().then(facilitySlide => res.json(facilitySlide));
  }
);

// @route 	DELETE api/facility/:id
// @desc 		Delete a facility
// @access 	Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Facility.findByIdAndDelete(req.params.id)
      .then(facilitySlide => {
        res.json({ success: true });
      })
      .catch(err => {
        res
          .status(404)
          .json({ facilityslidenotfound: "this facility slide doesn't exist" });
      });
  }
);

// @route 	PUT api/facility/:id
// @desc 		Update a facility
// @access 	Private
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { image, legend } = req.body;

    facilitySlide = {
      legend,
      image
    };

    Facility.findOneAndUpdate(
      { _id: req.params.id },
      { $set: facilitySlide },
      { new: true }
    ).then(facilitySlide => res.json(facilitySlide));
  }
);

// @route 	PUT api/facility/order/:id
// @desc 		Update a facility's order position
// @access 	Private
router.put(
  "/order/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { orderMove } = req.body;
    Facility.findById(req.params.id).then(async facility => {
      const { _id, order } = facility;
      let newOrder;
      let oldOrder = order;
      if (orderMove === "up") {
        newOrder = order - 1;
      } else if (orderMove === "down") {
        newOrder = order + 1;
      }

      await Facility.findOneAndUpdate({ order: newOrder }, { order: oldOrder });

      Facility.findOneAndUpdate({ _id }, { order: newOrder }).then(
        facilitySlide => {
          res.json({ orderUpdated: "success" });
        }
      );
    });
  }
);

module.exports = router;
