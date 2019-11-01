const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const fs = require("fs");
const upload = require("../../services/multerSettings");

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
        // runs through each carouselSlide and update order to be the same as index to refresh order count. This is needed since a carouselSlide is removed and causes a gap.
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
  upload.single("image"),
  async (req, res) => {
    // details, link, and linkName are not required and could change based on what slide the daycare director chooses to add. In the majority of the time, it will at least either have details or the link and linkName.
    const { header, details = null, link = null, linkName = null } = req.body;
    // default path to empty object in case where image is somehow not uploaded. This will at least create the program with a bad image path rather than crash server. The front UI should not allow the form to be submitted with no image, however.
    const { path = {} } = req.file;
    const order = await Carousel.find().countDocuments();

    const newCarouselSlide = new Carousel({
      header,
      details,
      imagePath: "/" + path,
      link,
      linkName,
      order
    });

    newCarouselSlide.save().then(carouselSlide => res.json(carouselSlide));
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
        // Delete the image stored on the server.
        fs.unlink("./" + carouselSlide.imagePath, function(err) {
          if (err && err.code == "ENOENT") return console.log(err);
          console.log("file deleted successfully");
        });
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
  upload.single("image"),
  (req, res) => {
    Carousel.findById(req.params.id).then(carouselSlide => {
      const { header, details = null, link = null, linkName = null } = req.body;
      const { imagePath } = carouselSlide;

      let path;
      if (typeof req.file !== "undefined") {
        path = "/" + req.file.path;
        // New picture was chosen. Delete the old one.
        // Delete the image stored on the server.
        fs.unlink("./" + carouselSlide.imagePath, function(err) {
          if (err && err.code == "ENOENT") return console.log(err);
          console.log("file deleted successfully");
        });
      } else {
        // Original picture was kept. Just keep the current imagePath.
        path = imagePath;
      }

      carouselSlide = {
        header,
        details,
        imagePath: path,
        link,
        linkName
      };

      Carousel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: carouselSlide },
        { new: true }
      ).then(carouselSlide => res.json(carouselSlide));
    });
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
