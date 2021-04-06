const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const { v4: uuid } = require('uuid');
const mime = require('mime-types');
const multer = require('multer');

// Exporting two objects
const { check, validationResult } = require("express-validator");

// Returns a moongose model of the user
const User = require("../../models/User");
const Publication = require("../../models/Publication");


const handleError = (res, status, msg, err = null) => {
  if (err) {
    console.error(err.message)
  };
  return res.status(status).json({ errors: [{ msg: msg }] });
};


// ######## ROUTES ########

// @route  GET api/publication/all
// @access Private/requires token
// Given a JSON web token , it returns all the user's publications
router.get("/all", auth, async (req, res) => {
  try {
    const publications = await Publication.find({user_id: req.user.id});
    res.json(publications);
  } catch (err) {
    return handleError(res, 500, "Server Error", err);
  }
});

// @route  GET api/publication
// @access Private/requires token
// Given a JSON web token , it returns a given  user's specific publication
router.get("/", auth, async (req, res) => {
  try {
    const publication_id = req.header("publication_id");
    const publication = await Publication.findOne({_id: publication_id, user_id: req.user.id}).exec();
    res.json(publication);
  } catch (err) {
    return handleError(res, 500, "Server Error", err);
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
          return handleError(res, 400, "User non existent");
        }

        //save current date in the created publication
        const creationDate = Date.now();
        const updateDate = creationDate;

        publication = new Publication({
          user_id,
          name,
          creationDate,
          updateDate
        });

        await publication.save( (err, doc) => {
          if(err){
            return handleError(res, 500, `DB error: ${err}`, err);
          }
          //we return the new publication object
          return res.json(doc);
        });

      } catch (err) {
        return handleError(res, 500, "Server Error", err);
      }
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
        return handleError(res, 400, "Publication does not exist");
      }

      //UPDATE PUBLICATION
      publicationFound.text = text;
      publicationFound.updateDate = Date.now();

      publicationFound.save((err, text)=>{
        if(err){
          return handleError(res, 500, `DB error: ${err}`, err);
        }
        //we return the saved text
        return res.json(text);
      });

    } catch (err) {
      return handleError(res, 500, "Server Error", err);
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
      return handleError(res, 400, "No images sent");
    }  
    try{
      //use this instead when activating the auth middleware
      //const publicationFound = await Publication.findOne({_id: publication_id, user_id: req.user.id}).exec();
      let publicationFound = await Publication.findById(publication_id).exec();

      if (!publicationFound) {
        return handleError(res, 400, "Publication does not exist");
      }
      //user should be allowed to upload images up to 4
      if(publicationFound.images.length == 4){
        return handleError(res, 400, "Already reached max number of images");
      }
      if(publicationFound.images.length + req.files.length > 4){
        return handleError(res, 400, "Please select fewer images or remove existing ones");
      }
      //FILE TYPE VERIFICATION
      for (file of req.files){
        const type = mime.lookup(file.originalname);
        const regexImage = /image/g;
        if(type.search(regexImage) == -1){
          return handleError(res, 400, "Media type not allowed, please upload a video");
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
          return handleError(res, 500, "Error during media streaming", err);
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
      publicationFound.save((err, images)=>{
          if(err){
            return handleError(res, 500, `DB error: ${err}`, err);
          }
          //we return the saved images as an array of objects
          return res.json(images);
        });

    } catch (err) {
      return handleError(res, 500, "Server Error", err);
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
      return handleError(res, 400, "No video sent");
    }

    try{
      //VERIFICATIONS of user, publication and content

      //use this instead when activating the auth middleware
      //const publicationFound = await Publication.findOne({_id: publication_id, user_id: req.user.id}).exec();
      let publicationFound = await Publication.findById(publication_id).exec();

      if (!publicationFound) {
        return handleError(res, 400, "Publication does not exist");
      }

      let oldVideo = publicationFound.video;

      //FILE UPLOAD
      const type = mime.lookup(req.file.originalname);
      console.log(type);
      const regexVideo = /video/g;
      if(type.search(regexVideo) == -1){
        return handleError(res, 400, "Media type not allowed, please upload a video");
      }

      const blob = mediaBucket.file(`${uuid()}.${mime.extensions[type][0]}`);

      const stream = blob.createWriteStream({
        resumable: true,
        contentType: type,
        //predefinedAcl: 'publicRead', //posible error
      });
    
      stream.on('error', err => {
        return handleError(res, 500, "Error during media streaming", err);
      });

      publicURL = `https://storage.googleapis.com/${mediaBucket.name}/${blob.name}`;
    
      stream.on('finish', () => { //idk if needed
        console.log("File finished upload");
      });
    
      stream.end(req.file.buffer);

      //PUBLICATION UPDATE TODO: Dont use findByIdAndUpdate, but update existing publicationFound and save()

      const updateDate = Date.now();
      publicationFound.video = {URL: publicURL, name: blob.name};
      publicationFound.updateDate = updateDate;
      
      publicationFound.save((err, video)=>{
        if(err){
          return handleError(res, 500, `DB error: ${err}`, err);
        }
        //no return as we still need to update the storage, but we send the video object back
        res.json(video);
      });
    
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
      return handleError(res, 500, "Server Error", err);
    }
  }
);


//DELETE ROUTES

// @route  DELETE api/publication
// @desct  Delete existing publication 
// @access Private/requires token and publication_id in headder
router.delete(
  "/", auth,
  async (req, res) => {
    try{
      const publication_id = req.header("publication_id");
      const publication = await Publication.findOne({_id: publication_id, user_id: req.user.id}).exec();

      if (!publication) {
        return handleError(res, 400, "Publication non existent");
      }

      await Publication.remove({_id: publication_id, user_id: req.user.id}, (err, doc) => {
        if(err){
          return handleError(res, 500, `DB error: ${err}`, err);
        }
      }).exec();
      
      //responds with the id of the deleted publication
      return res.json({_id: publication_id});

    } catch(err) {
      return handleError(res, 500, "Server Error", err);
    }
  });


  //delete video from publication
  router.delete(
    "/video", auth,
    async (req, res) => {
      try{
        const publication_id = req.header("publication_id");
        const publication = await Publication.findOne({_id: publication_id, user_id: req.user.id}).exec();
  
        if (!publication) {
          return handleError(res, 400, "Publication non existent");
        }

        //DELETE IN CLOUD
        const oldVideo = publication.video;
        if(oldVideo){
          try{
            await mediaBucket.file(oldVideo.name).delete();
            console.log(`${oldVideo.URL} deleted.`);
          }catch (err){
            console.log(`could not delete file ${oldVideo.name}, maybe it does not exists`);

            return handleError(res, 500, `Storage error: ${err}`, err);
          }

          //DELETE IN DB
          publication.video = undefined;
          publication.save((err)=>{
            if(err){
              return handleError(res, 500, `DB error: ${err}`, err);
            }
            return res.json({video: oldVideo});
          });
        }else{
          return res.json({video: {} });
        }
        
      } catch(err) {
        return handleError(res, 500, "Server error", err);
      }
    });

//delete text from publication
router.delete(
  "/text", auth,
  async (req, res) => {
    try{
      const publication_id = req.header("publication_id");
      const publication = await Publication.findOne({_id: publication_id, user_id: req.user.id}).exec();

      if (!publication) {
        return handleError(res, 400, "Publication non existent");
      }

      const oldtext = publication.text;
      if(oldtext){
        //DELETE IN DB
        publication.text = undefined;
        publication.save((err)=>{
          if(err){
            return handleError(res, 500, `DB error: ${err}`, err);
          }
          return res.json({text: oldtext});
        });
      }else{
        return res.json({text: ""}); //if there no text to delete
      }
      
    } catch(err) {
      return handleError(res, 500, "Server error", err);
    }
  });

//delete all images from publication
router.delete(
  "/images", auth,
  async (req, res) => {
    try{
      const publication_id = req.header("publication_id");
      const publication = await Publication.findOne({_id: publication_id, user_id: req.user.id}).exec();

      if (!publication) {
        return handleError(res, 400, "Publication non existent");
      }
      
      const oldImages = publication.images;
      if(!(oldImages === undefined || oldImages.length == 0)){
        //DELETE IN CLOUD
        for (let image of oldImages){
          try{
            await mediaBucket.file(image.name).delete();
            console.log(`${image.URL}  deleted.`);
          }catch (err){
            console.log(`could not delete file ${image.name}, maybe it does not exists`);
            return handleError(res, 500, `Storage error: ${err}`, err);
          }
        }

        //DELETE IN DB
        publication.images = [];
        publication.save((err)=>{
          if(err){
            return handleError(res, 500, `DB error: ${err}`, err);
          }
          //if succesful return deleted images
          return res.json({images: oldImages});
        });
      }else{
        return res.json({images: []}); //if there are no images to delete
      }
      
    } catch(err) {
      return handleError(res, 500, "Server error", err);
    }
  });

module.exports = router;