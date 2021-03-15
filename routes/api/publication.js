const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");

const { v4: uuid } = require('uuid');
const mime = require('mime-types');
const multer = require('multer');

//Multer
const {uploadSingle} = require('../../config/multer-setup');

// Exporting two objects
const { check, validationResult } = require("express-validator");

// Returns a moongose model of the user
const User = require("../../models/User");
const Publication = require("../../models/Publication");

// route to create a new publication
// @route  POST api/publication
// @access private, requires a user token
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


// route to add media to a publication
// @route  POST api/publication/upload
// @access private, requires a user token
router.post(
  "/upload/video", /*auth,*/ multer().single('file'), //aut not yet activated because of testing (easier to post without headder)
  [
    // Second parameter of check is a custom error message
    check("publication_id", "A publication is required").not().isEmpty(),
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
    const { publication_id } = req.body;

    try{
      //VERIFICATIONS of user, publication and content

      // // Get token from header and get user id from it
      // const token = req.header("x-auth-token");
      // const decoded = jwt.verify(token, config.get("jwtSecret"));
      // tokenUser = decoded.user;

      if(!req.file){
        return res.send("No file sent");
      }

      let publicationFound = await Publication.findById(publication_id).exec();
      if (!publicationFound) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Publication does not exist" }] });
      }

      let oldVideo = publicationFound.video;

      //FILE UPLOAD

      const type = mime.lookup(req.file.originalname);
      const blob = mediaBucket.file(`${uuid()}.${mime.extensions[type][0]}`);

      const stream = blob.createWriteStream({
        resumable: true,
        contentType: type,
        //predefinedAcl: 'publicRead', //posible error
      });
    
      stream.on('error', err => {
        console.log(err);
        return res.status(500).send(err);
      });

      publicURL = `https://storage.googleapis.com/${mediaBucket.name}/${blob.name}`;
    
      stream.on('finish', () => { //idk if needed
        console.log("File finished upload");
      });
    
      stream.end(req.file.buffer);

      //PUBLICATION UPDATE

      await Publication.findByIdAndUpdate(publication_id, {video: {URL: publicURL, name: blob.name} }, (err, doc)=>{
        if(err){
          console.error(err.message);
          return res.status(500).send(`DB error: ${err}`);
        }
      }).exec();
    
      res.send(`Publication updated, video uploaded: ${publicURL}`);
      
      //No error handling if video was not deleted. idk were to put error handling for this, as this is not of concert for the user
      if(oldVideo){
        await mediaBucket.file(oldVideo.name).delete();
        console.log(`gs://${mediaBucket.name}/${oldVideo.name} deleted.`);
      }

    } catch (err) {
      console.error(err);
      return res.status(500).send("Server error");
    }
  }
);

module.exports = router;