const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");

const { v4: uuid } = require('uuid');
const mime = require('mime-types');
const multer = require('multer');

// import uuid from 'uuid/v4';
// import mime from 'mime-types';
// import multer from 'multer';
//Multer
const {uploadSingle} = require('../../config/multer-setup');

// Exporting two objects
const { check, validationResult } = require("express-validator");

// Returns a moongose model of the user
const User = require("../../models/User");
const Publication = require("../../models/Publication");

// route to create a new publication
// @route  POST api/publication
// @access 
router.post(
    "/", auth,
    [
      // Second parameter of check is a custom error message
      check("name", "A name is required").not().isEmpty(),
    ],
    async (req, res) => {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      
      if (!errors.isEmpty()) {
        return res.status(400).json({ // 400 is for a bad request
          errors: errors.array(),
        });
      }
      //we get the alredy checked payload
      const { name } = req.body;
  
      try {
        // Get token from header and get user id from it
        const token = req.header("x-auth-token");
        const decoded = jwt.verify(token, config.get("jwtSecret"));
        tokenUser = decoded.user;
        user_id = tokenUser.id

        // All publications must be related to a user, so we check if there's a user with that id.
        let userFound = await User.findById(user_id).exec();

        if (!userFound) {
          return res
            .status(400)
            .json({ errors: [{ msg: "User non existent" }] });
        }

        //save current date in the created publication
        creationDate = Date.now();

        publication = new Publication({
          user_id,
          name,
          creationDate
        });

        await publication.save( (err, doc) => {
          res.json({ _id: doc.id });
        });

      } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
      }
      //res.send('POST request to create new publication');
    }
  );



router.post(
  "/upload", /*auth,*/ uploadSingle('file','/uploads'),
  // [
  //   // Second parameter of check is a custom error message
  //   check("post_id", "A post is required").not().isEmpty(),
  // ],
  async (req, res) => {

    try{
      if(req.file){
        const storedPath = req.file.path;
        console.log(`File saved at: ${String(storedPath)}`);
        res.send(`File saved at: ${String(storedPath)}`);
      }else{
        res.send("post succesful, but file not saved");
      }
      
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;