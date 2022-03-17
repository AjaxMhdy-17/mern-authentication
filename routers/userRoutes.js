const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const CheckIsAuthValid = require("../middlewares/CheckIsAuthValid");
require("dotenv").config();
const sgMail = require("@sendgrid/mail");

//

const api_key =
  "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";
sgMail.setApiKey(api_key);

router.get("/currentUser", CheckIsAuthValid, async (req, res) => {
  try {
    const getUser = await User.findById({ _id: req.user.id }).select(
      "-password"
    );
    return res.status(200).json(getUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.post("/createUser", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const isUserExists = await User.findOne({ email: email });

    if (isUserExists) {
      return res.status(400).send("user already registerd");
    } else {
      const newUser = new User({
        name: name,
        email: email,
        password: password,
      });
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt);
      await newUser.save();

      const payload = {
        user: {
          id: newUser._id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRATE,
        { expiresIn: 36000000 },
        (err, token) => {
          if (err) {
            throw err;
          } else {
            const message = {
              to: newUser.email,
              from: "mhdyhasan017@gmail.com",
              subject: "confirm send email",
              text: "Hello There , Register Successfull",
              html: "<h1>Hello There , Register Successfull</h1>",
            };
            sgMail
              .send(message)
              .then((res) => console.log("email sent"))
              .catch((err) => {
                console.log(err);
                console.error(err);
              });
            res.json({ token });
          }
        }
      );
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.post("/loginUser", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).send("invalid credentials");
    } else {
      const checkPass = await bcrypt.compare(password, user.password);
      if (!checkPass) {
        return res.status(400).send("invalid credentials");
      } else {
        const payload = {
          user: {
            id: user._id,
          },
        };
        jwt.sign(
          payload,
          process.env.JWT_SECRATE,
          { expiresIn: 3600000 },
          (err, token) => {
            if (err) throw err;
            else res.status(200).json({ token });
          }
        );
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});



router.post("/reset-password", async (req, res) => {
  // console.log(req.body.email);
  let token;
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    token = buffer.toString("hex");
  });
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send("No User With This Email");
    } else {
      user.resetToken = token;
      user.expireToken = Date.now() + 3600000;
      const resetUser = await user.save();
      const message = {
        to: resetUser.email,
        from: "mhdyhasan017@gmail.com",
        subject: "reset password email",
        text: "Hello There ,  Reset Your Password",
        html: `<a href='http://localhost:3000/reset-password/${token}'> <h1> Reset Your Password By Clicking This Link </h1></a>`,
      };
      sgMail
        .send(message)
        .then((res) => console.log("Check Your Email"))
        .catch((err) => {
          console.log(err);
          console.error(err);
        });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.post("/new-password", async (req, res) => {
  try {
    const new_pass = req.body.password;
    const token = req.body.token;
    console.log(new_pass);
    console.log(token);

    const user = await User.findOne({
      resetToken: token,
      expireToken: { $gt: Date.now() },
    });
    if (!user) {
      res.status(400).send("session expired");
    } else {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(new_pass, salt);
      user.resetToken = undefined
      await user.save() 
    }
  } catch (error) {
    console.log(error);
    console.error(error);
  }
});

module.exports = router;
