const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
    try {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) 
      {
          return res.status(200).send({ success: false, message: "User Already Exists" });
      }

      const password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      req.body.password = hashedPassword;
      const newuser = new User(req.body);
      const result = await newuser.save();
      //await sendEmail(result, "verifyemail");
      res.status(200).send({
        success: true,
        message: "Registration successfull , Please verify your email",
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  });

  router.post("/login", async (req, res) => {
    try {

      const user = await User.findOne({email: req.body.email});
     if(user) 
     {
        const passwordsMatched = await bcrypt.compare(req.body.password, user.password);
        if(passwordsMatched) 
        {
            const dataToBeSentToFrontend = {
                _id: user._id,
                email: user.email,
                name: user.name,
              }; // this is data that will be encrypted in JWT
              const token = jwt.sign(dataToBeSentToFrontend, "SHEY", {
                expiresIn: 60 * 60,
              });
            res.status(200).send({
                success: true,
                message: "Login successfull", 
                data: token
              });
        }
        else 
        {
            res.status(200).send({
                success: false, 
                message: "Incorrect Password"
              });
        }
        
     }
     else 
     {
        res.status(200).send({
            success: false,
            message: "User Does Not Exists", data: null
          });
     }
      
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  });


  module.exports = router;

  