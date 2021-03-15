const express = require("express");
const router = express.Router();
//const jwt = require("jsonwebtoken");
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

// @route  GET api/publication/all
// @access Private/requires token
// Given a JSON web token , it returns all the user's publications
router.get("/all", auth, async (req, res) => {
  try {
    const publications = await Publication.find({user_id: req.user.id});
    res.json(publications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  GET api/publication
// @access Private/requires token
// Given a JSON web token , it returns all the user's publications
router.get("/", auth, async (req, res) => {
  try {
    const publication_id = req.header("publication_id");
    const publication = await Publication.findOne({_id: publication_id, user_id: req.user.id}).exec();
    res.json(publication);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

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
        //user exist in req because of the auth middleware
        const user_id = req.user.id;

        // All publications must be related to a user, so we check if there's a user with that id.
        let userFound = await User.findById(user_id).exec();

        if (!userFound) {
          return res
            .status(400)
            .json({ errors: [{ msg: "User non existent" }] });
        }

        //save current date in the created publication
        const registrationDate = Date.now();
        const updateDate = registrationDate;

        publication = new Publication({
          user_id,
          name,
          creationDate,
          updateDate
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

// route to add text content to a publication
// @route  POST api/publication/upload/text
// @access private, requires a user token
router.post(
  "/upload/text", auth,
  [
    // Second parameter of check is a custom error message
    check("text", "Text content is required").not().isEmpty(),
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
    const { publication_id, text } = req.body;

    try{
      const publicationFound = await Publication.findOne({_id: publication_id, user_id: req.user.id}).exec();
      if (!publicationFound) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Publication does not exist" }] });
      }

      //UPDATE PUBLICATION
      publicationFound.text = text;
      publicationFound.updateDate = Date.now();

      publicationFound.save((err)=>{
        if(err){
          console.error(err.message);
          return res.status(500).send(`DB error: ${err}`);
        }

        return res.send(`Publication updated, text uploaded`);
      });

    } catch (err) {
      console.error(err);
      return res.status(500).send("Server error");
    }
  });

// route to add multiple images to a publication
// @route  POST api/publication/upload/images
// @access private, requires a user token     //aut not yet activated
router.post(
  "/upload/images", /*auth,*/ multer().array('file', 4), //aut not yet activated because of testing (easier to post without headder)
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

    if(!req.files){
      return res
          .status(400)
          .json({ errors: [{ msg: "No images sent" }] });
    }  
    try{
      //use this instead when activating the auth middleware
      //const publicationFound = await Publication.findOne({_id: publication_id, user_id: req.user.id}).exec();
      let publicationFound = await Publication.findById(publication_id).exec();

      if (!publicationFound) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Publication does not exist" }] });
      }
      //user should be allowed to upload images up to 4
      if(publicationFound.images.length == 4){
        return res
          .status(400)
          .json({ errors: [{ msg: "Already reached max number of images" }] });
      }
      if(publicationFound.images.length + req.files.length > 4){
        return res
          .status(400)
          .json({ errors: [{ msg: "Please select fewer images or remove existing ones" }] });
      }
      //FILE TYPE VERIFICATION
      for (file of req.files){
        const type = mime.lookup(file.originalname);
        const regexImage = /image/g;
        if(type.search(regexImage) == -1){
          return res
            .status(400)
            .json({ errors: [{ msg: "Media type not allowed, please upload only images" }] });
        }
      }

      for (file of req.files){
        //FILE UPLOAD
        const type = mime.lookup(file.originalname);
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
      
        stream.end(file.buffer);
  
        //PUBLICATION UPDATE
        publicationFound.images.push({URL: publicURL, name: blob.name});
        publicationFound.updateDate = Date.now();
      }

      const imagesFinished = publicationFound.images;
      publicationFound.save((err)=>{
          if(err){
            console.error(err.message);
            return res.status(500).send(`DB error: ${err}`);
          }
        });
      
      res.send(`Publication updated, images uploaded: ${imagesFinished}`);

    } catch (err) {
      console.error(err);
      return res.status(500).send("Server error");
    }
    
  });


// route to add video media to a publication
// @route  POST api/publication/upload/video
// @access private, requires a user token       //aut not yet activated b
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

    if(!req.file){
      return res
          .status(400)
          .json({ errors: [{ msg: "No video sent" }] });
    }

    try{
      //VERIFICATIONS of user, publication and content

      //use this instead when activating the auth middleware
      //const publicationFound = await Publication.findOne({_id: publication_id, user_id: req.user.id}).exec();
      let publicationFound = await Publication.findById(publication_id).exec();

      if (!publicationFound) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Publication does not exist" }] });
      }

      let oldVideo = publicationFound.video;

      //FILE UPLOAD
      const type = mime.lookup(req.file.originalname);
      console.log(type);
      const regexVideo = /video/g;
      if(type.search(regexVideo) == -1){
        return res
          .status(400)
          .json({ errors: [{ msg: "Media type not allowed, please upload a video" }] });
      }

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

      //PUBLICATION UPDATE TODO: Dont use findByIdAndUpdate, but update existing publicationFound and save()

      const updateDate = Date.now();
      await Publication.findByIdAndUpdate(publication_id, {video: {URL: publicURL, name: blob.name}, updateDate: updateDate }, (err, doc)=>{
        if(err){
          console.error(err.message);
          return res.status(500).send(`DB error: ${err}`);
        }
      }).exec();
    
      res.send(`Publication updated, video uploaded: ${publicURL}`);
      
      //No error handling if video was not deleted. idk were to put error handling for this, as this is not of concert for the user
      if(oldVideo){
        try{
          await mediaBucket.file(oldVideo.name).delete();
          console.log(`gs://${mediaBucket.name}/${oldVideo.name} deleted.`);
        }catch (e){
          console.log(`could not delete file ${oldVideo.name}, maybe it does not exists`);
        }
      }

    } catch (err) {
      console.error(err);
      return res.status(500).send("Server error");
    }
  }
);

module.exports = router;