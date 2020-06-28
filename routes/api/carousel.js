const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Carousel Model
const Carousel = require("../../models/Carousel");

// @route 	GET api/carousel/test
// @desc 		Tests carousel route
// @access 	Public
router.get("/test", (req, res) => res.json({ msg: "Carousel works" }));

// @route 	GET api/carousel
// @desc 		Get all carousel
// @access 	Public
router.get("/", async (req, res) => {
  Carousel.find()
    .sort({ order: 1 })
    .then(carousel => {
      carousel.forEach(async (carouselSlide, index) => {
        // runs through each carouselSlide and update order to be the same as index to refresh order count. This is needed since a carouselSlide may have been removed and causes a gap.
        carouselSlide.order = index;
        await Carousel.findOneAndUpdate(
          { _id: carouselSlide._id },
          { order: index }
        );
      });
      res.json(carousel);
    })
    .catch(err =>
      res.status(404).json({ nocarouselfound: "No carousel slides found" })
    );
});

// @route 	POST api/carousel
// @desc 		Create carousel
// @access 	Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // details, link, and linkName are not required and could change based on what slide the daycare director chooses to add. In the majority of the time, it will at least either have details or the link and linkName.
    const {
      header,
      image, //image comes as object with arrayBuffer and imageType
      details = null,
      link = null,
      linkName = null
    } = req.body;

    const order = await Carousel.find().countDocuments();
    const newCarouselSlide = new Carousel({
      header,
      details,
      image,
      link,
      linkName,
      order
    });
    newCarouselSlide
      .save()
      .then(carouselSlide => res.json(carouselSlide))
      .catch(err => {
        res.status(404).json({ err });
      });
  }
);

// @route 	DELETE api/carousel/:id
// @desc 		Delete a carousel
// @access 	Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Carousel.findByIdAndDelete(req.params.id)
      .then(carouselSlide => {
        res.json({ success: true });
      })
      .catch(err => {
        res
          .status(404)
          .json({ carouselslidenotfound: "this carousel slide doesn't exist" });
      });
  }
);

// @route 	PUT api/carousel/:id
// @desc 		Update a carousel
// @access 	Private
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const {
      header,
      image,
      details = null,
      link = null,
      linkName = null
    } = req.body;

    carouselSlide = {
      header,
      details,
      image,
      link,
      linkName
    };

    Carousel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: carouselSlide },
      { new: true }
    ).then(carouselSlide => res.json(carouselSlide));
  }
);

// @route 	PUT api/carousel/order/:id
// @desc 		Update a carousel's order position
// @access 	Private
router.put(
  "/order/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { orderMove } = req.body;
    Carousel.findById(req.params.id).then(async carousel => {
      const { _id, order } = carousel;
      let newOrder;
      let oldOrder = order;
      if (orderMove === "up") {
        newOrder = order - 1;
      } else if (orderMove === "down") {
        newOrder = order + 1;
      }

      await Carousel.findOneAndUpdate({ order: newOrder }, { order: oldOrder });

      Carousel.findOneAndUpdate({ _id }, { order: newOrder }).then(
        carouselSlide => {
          res.json({ orderUpdated: "success" });
        }
      );
    });
  }
);

module.exports = router;
