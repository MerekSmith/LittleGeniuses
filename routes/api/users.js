const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validateEmailInput = require("../../validation/question");
const validateAnswerInput = require("../../validation/answer");

// Load User model
const User = require("../../models/User");

// @route 	GET api/users/test
// @desc 		Tests users route
// @access 	Public
router.get("/test", (req, res) => res.json({ msg: "Users works" }));

// @route 	GET api/users/register
// @desc 		Register user
// @access 	Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        email: req.body.email,
        password: req.body.password,
        secretQuestion: req.body.secretQuestion,
        secretAnswer: req.body.secretAnswer
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.secretAnswer, salt, (err, hash) => {
          if (err) throw err;
          newUser.secretAnswer = hash;
        });
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route 	POST api/users/login
// @desc 		Login user / Returning JWT Token
// @access 	Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find the user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // res.json({ msg: "Success" });

        // User Matched

        const payload = { id: user.id, email }; // Create jwt payload

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route 	GET api/users/current
// @desc 		Return current user
// @access 	Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // res.json(req.user)
    res.json({
      id: req.user.id,
      email: req.user.email
    });
  }
);

// @route 	GET api/users/question
// @desc 		gets secret question users route
// @access 	Public
router.post("/question", (req, res) => {
  const { errors, isValid } = validateEmailInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;

  // Find the user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    const { email, secretQuestion } = user;

    res.json({
      email,
      secretQuestion
    });
  });
});

// @route 	POST api/users/answer
// @desc 		Check answer for secret question / Returning JWT Token
// @access 	Public
router.post("/answer", (req, res) => {
  const { errors, isValid } = validateAnswerInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const answer = req.body.answer;

  // Find the user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    // Check answer
    bcrypt.compare(answer, user.secretAnswer).then(isMatch => {
      if (isMatch) {
        // res.json({ msg: "Success" });

        // User Matched

        const payload = { id: user.id, email }; // Create jwt payload

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.answer = "Answer incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route 	GET api/users/reset
// @desc 		Resets users password
// @access 	Private
router.put(
  "/reset",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) throw err;

        User.findOneAndUpdate(
          { email: req.body.email },
          { $set: { password: hash } },
          { new: true }
        )
          .then(() => res.json({ passwordReset: true }))
          .catch(err => console.log(err));
      });
    });
  }
);

module.exports = router;
