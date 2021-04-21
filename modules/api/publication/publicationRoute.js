const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const axios = require("axios");

const { v4: uuid } = require("uuid");
const mime = require("mime-types");
const multer = require("multer");
const progress = require('progress-stream');
const fs = require('fs');
const streamBuffers = require('stream-buffers');
const { Readable } = require('stream');
//const getStream = require('into-stream')

// Exporting two objects
const { check, validationResult } = require("express-validator");

// Returns a moongose model of the user
const User = require("../../../models/User");
const Publication = require("../../../models/Publication");
const { eventNames } = require("../../../models/User");

const handleError = (res, status, msg, err = null) => {
  if (!res.headersSent) {
    if (err) {
      console.error(err);
    }
    return res.status(status).json({ errors: [{ msg: msg }] });
  }

  if (err) {
    console.error(err);
  }
};

// ######## ROUTES ########

// @route  GET api/publication/all
// @access Private/requires token
// Given a JSON web token , it returns all the user's publications
router.get("/all", auth, async (req, res) => {
  try {
    const publications = await Publication.find({ user_id: req.user.id });
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
    const publication = await Publication.findOne({
      _id: publication_id,
      user_id: req.user.id,
    }).exec();
    res.json(publication);
  } catch (err) {
    return handleError(res, 500, "Server Error", err);
  }
});

// route to create a new publication
// @route  POST api/publication
// @access private, requires a user token
router.post(
  "/",
  auth,
  [
    // Second parameter of check is a custom error message
    check("name", "A name is required").not().isEmpty(),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        // 400 is for a bad request
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
        updateDate,
      });

      await publication.save((err, doc) => {
        if (err) {
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

// @route  POST api/publication/upload/name
// @access private, requires a user token
router.post(
  "/upload/name",
  auth,
  [
    // Second parameter of check is a custom error message
    check("name", "A name is required").not().isEmpty(),
    check("publication_id", "A publication is required").not().isEmpty(),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        // 400 is for a bad request
        errors: errors.array(),
      });
    }

    //we get the alredy checked payload
    const { publication_id, name } = req.body;
    console.log(name + " : " + publication_id);

    try {
      const publicationFound = await Publication.findOne({
        _id: publication_id,
        user_id: req.user.id,
      }).exec();
      if (!publicationFound) {
        return handleError(res, 400, "Publication does not exist");
      }

      //UPDATE PUBLICATION
      publicationFound.name = name;
      publicationFound.updateDate = Date.now();

      publicationFound.save((err, doc) => {
        if (err) {
          return handleError(res, 500, `DB error: ${err}`, err);
        }
        //we return the saved publication
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
  "/upload/text",
  auth,
  [
    // Second parameter of check is a custom error message
    check("text", "Text content is required").not().isEmpty(),
    check("publication_id", "A publication is required").not().isEmpty(),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        // 400 is for a bad request
        errors: errors.array(),
      });
    }

    //we get the alredy checked payload
    const { publication_id, text } = req.body;

    try {
      const publicationFound = await Publication.findOne({
        _id: publication_id,
        user_id: req.user.id,
      }).exec();
      if (!publicationFound) {
        return handleError(res, 400, "Publication does not exist");
      }

      //UPDATE PUBLICATION
      publicationFound.text = text;
      publicationFound.updateDate = Date.now();

      publicationFound.save((err, text) => {
        if (err) {
          return handleError(res, 500, `DB error: ${err}`, err);
        }
        //we return the saved text
        return res.json(text);
      });
    } catch (err) {
      return handleError(res, 500, "Server Error", err);
    }
  }
);

// route to add multiple images to a publication
// @route  POST api/publication/upload/images
// @access private, requires a user token     //aut not yet activated
router.post(
  "/upload/images",
  auth,
  multer().array("file", 4), //aut not yet activated because of testing (easier to post without headder)
  [
    // Second parameter of check is a custom error message
    check("publication_id", "A publication is required").not().isEmpty(),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        // 400 is for a bad request
        errors: errors.array(),
      });
    }

    //we get the alredy checked payload
    const { publication_id } = req.body;

    console.log("Uploading images");

    if (!req.files || req.files.length == 0) {
      return handleError(res, 400, "No images sent");
    }
    try {
      //use this instead when activating the auth middleware
      const publicationFound = await Publication.findOne({
        _id: publication_id,
        user_id: req.user.id,
      }).exec();
      //let publicationFound = await Publication.findById(publication_id).exec();

      if (!publicationFound) {
        return handleError(res, 400, "Publication does not exist");
      }
      //user should be allowed to upload images up to 4
      if (publicationFound.images.length == 4) {
        return handleError(res, 400, "Already reached max number of images");
      }
      if (publicationFound.images.length + req.files.length > 4) {
        return handleError(
          res,
          400,
          "Please select fewer images or remove existing ones"
        );
      }
      //FILE TYPE VERIFICATION
      for (file of req.files) {
        const type = mime.lookup(file.originalname);
        const regexImage = /image/g;
        if (type.search(regexImage) == -1) {
          return handleError(
            res,
            400,
            "Media type not allowed, please upload a video"
          );
        }
      }

      for (file of req.files) {
        //FILE UPLOAD
        const type = mime.lookup(file.originalname);
        const blob = mediaBucket.file(`${uuid()}.${mime.extensions[type][0]}`);

        const stream = blob.createWriteStream({
          resumable: true,
          contentType: type,
          //predefinedAcl: 'publicRead', //posible error
        });

        stream.on("error", (err) => {
          return handleError(res, 500, "Error during media streaming", err);
        });

        publicURL = `https://storage.googleapis.com/${mediaBucket.name}/${blob.name}`;

        stream.on("finish", () => {
          //idk if needed
          console.log("File finished upload");
        });

        stream.end(file.buffer);

        //PUBLICATION UPDATE
        publicationFound.images.push({ URL: publicURL, name: blob.name });
        publicationFound.updateDate = Date.now();
      }

      publicationFound.save((err, images) => {
        if (err) {
          return handleError(res, 500, `DB error: ${err}`, err);
        }
        //we return the saved images as an array of objects
        return res.json(images);
      });
    } catch (err) {
      return handleError(res, 500, "Server Error", err);
    }
  }
);

// route to add video media to a publication
// @route  POST api/publication/upload/video
// @access private, requires a user token       //aut not yet activated b
router.post(
  "/upload/video",
  auth,
  multer().single("file"), //aut not yet activated because of testing (easier to post without headder)
  [
    // Second parameter of check is a custom error message
    check("publication_id", "A publication is required").not().isEmpty(),
    //check("sessionId", "Socket connection sessionId missing").not().isEmpty(),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        // 400 is for a bad request
        errors: errors.array(),
      });
    }

    //we get the alredy checked payload
    const { publication_id } = req.body;

    if (!req.file) {
      return handleError(res, 400, "No video sent");
    }

    try {
      // Get the socket connection from Express app
      const io = req.app.get('io');
      const sockets = req.app.get('sockets');
      const thisSocketId = sockets[publication_id];
      const socketInstance = io.to(thisSocketId);
      socketInstance.emit('uploadProgress', 'File uploaded, processing data...');

      //VERIFICATIONS of user, publication and content
      console.log("Uploading: " + req.file.originalname);
      console.log("Of Size:  " + req.file.size);
      console.log("Buffer Size:  " + req.file.buffer.length );

      //use this instead when activating the auth middleware
      const publicationFound = await Publication.findOne({
        _id: publication_id,
        user_id: req.user.id,
      }).exec();
      //let publicationFound = await Publication.findById(publication_id).exec();

      if (!publicationFound) {
        return handleError(res, 400, "Publication does not exist");
      }

      let oldVideo;
      if (publicationFound.video) {
        oldVideo = Object.assign({}, publicationFound.video);
      }

      //FILE UPLOAD PREP
      const type = mime.lookup(req.file.originalname);
      console.log(type);
      const regexVideo = /video/g;
      if (type.search(regexVideo) == -1) {
        return handleError(
          res,
          400,
          "Media type not allowed, please upload a video"
        );
      }

      const blob = mediaBucket.file(`${uuid()}.${mime.extensions[type][0]}`);
      const publicURL = `https://storage.googleapis.com/${mediaBucket.name}/${blob.name}`;

      //SAVE IN DB
      const updateDate = Date.now();
      publicationFound.video = {
        URL: publicURL,
        name: blob.name,
        isLoading: true,
      };
      publicationFound.updateDate = updateDate;

      try {
        //we await for the save as we need a clear state in the db as the client will be waiting for an udate to isLoading for the lenght of the video upload
        await publicationFound.save().then((video) => {
          //no return as we still need to update the storage, but we send the video object back
          res.json(video);
        });
      } catch (err) {
        return handleError(res, 500, `DB error: ${err}`, err);
      }

      //FILE UPLOAD STREAM
      // console.log(blob);

      //progress bar
      // let str = progress({
      //   length: req.file.size,
      //   time: 100 /* ms */
      // });
      // str.on('progress', function(progress) {
      //   console.log(progress);
      // });
      
      //Write Stream config
      const writeStream = blob.createWriteStream({
        resumable: true,
        contentType: type,
        //predefinedAcl: 'publicRead', //posible error
      });

      writeStream.on("error", (err) => {
          return handleError(res, 500, "Error during media streaming", err);
        });

      writeStream.on("finish", () => {
        console.log("File finished upload: " + publicURL);

        //update db to signal that the video has finished uploading
        publicationFound.video.isLoading = false;
        publicationFound.save((err, video) => {
          if (err) {
            return handleError(res, 500, `DB error: ${err}`, err);
          }
          console.log("Updated IsLoading state");
        });
      });
      
      //Read Stream config
      let readableBuffer = new streamBuffers.ReadableStreamBuffer({
        frequency: 2,      // in milliseconds.
        chunkSize: 65536          // in bytes.
      });
      readableBuffer.put(req.file.buffer);

      let written = 0;

      readableBuffer.on('end', function() {
        console.log("Finished Readable Stream");
        writeStream.end();
      });

      readableBuffer.on('data', chunk => {
          writeStream.write(chunk, () => {
              written += chunk.length;
              let progress = (written/req.file.size) * 100;

              console.log(`${progress}% uploaded, ${written}Bytes out of ${req.file.size} Bytes.`);
              socketInstance.emit('uploadProgress', `${progress}%`);

              if(written >= req.file.size){
                readableBuffer.stop();    //special function of the stream-buffers module
              }
          });
      });


      //No error handling if video was not deleted. idk were to put error handling for this, as this is not of concert for the user
      if (oldVideo) {
        try {
          await mediaBucket.file(oldVideo.name).delete();
          console.log(`gs://${mediaBucket.name}/${oldVideo.name} deleted.`);
        } catch (e) {
          console.log(
            `could not delete file ${oldVideo.name}, maybe it does not exists`
          );
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
router.delete("/", auth, async (req, res) => {
  try {
    const publication_id = req.header("publication_id");
    const publication = await Publication.findOne({
      _id: publication_id,
      user_id: req.user.id,
    }).exec();
    //
    const oldVideo = Object.assign({}, publication.video);
    const oldImages = [...publication.images];

    if (!publication) {
      return handleError(res, 400, "Publication non existent");
    }

    //DELETE IN DB
    await Publication.remove(
      { _id: publication_id, user_id: req.user.id },
      (err, doc) => {
        if (err) {
          return handleError(res, 500, `DB error: ${err}`, err);
        }
      }
    ).exec();

    //responds with the id of the deleted publication
    res.json({ _id: publication_id }); //no return as we still need to delete the files in storage, the user does not need to wait for that

    //DELETE IN STORAGE
    //Delete Videos
    try {
      await mediaBucket.file(oldVideo.name).delete();
      console.log(`${oldVideo.URL} deleted.`);
    } catch (err) {
      console.log(
        `could not delete file ${oldVideo.name}, maybe it does not exists`
      );
    }
    //Delete Images
    for (let image of oldImages) {
      try {
        await mediaBucket.file(image.name).delete();
        console.log(`${image.URL}  deleted.`);
      } catch (err) {
        console.log(
          `could not delete file ${image.name}, maybe it does not exists`
        );
      }
    }
  } catch (err) {
    return handleError(res, 500, "Server Error", err);
  }
});

//delete text from publication
router.delete("/text", auth, async (req, res) => {
  try {
    const publication_id = req.header("publication_id");
    const publication = await Publication.findOne({
      _id: publication_id,
      user_id: req.user.id,
    }).exec();

    if (!publication) {
      return handleError(res, 400, "Publication non existent");
    }

    if (publication.text) {
      //DELETE IN DB
      publication.text = undefined;
      publication.save((err, doc) => {
        if (err) {
          return handleError(res, 500, `DB error: ${err}`, err);
        }
        return res.json(doc); //return the post with no text
      });
    } else {
      return handleError(
        res,
        400,
        "The publication already does not have text content",
        err
      );
      //return res.json(publication); //if there no text to delete
    }
  } catch (err) {
    return handleError(res, 500, "Server error", err);
  }
});

//delete video from publication
router.delete("/video", auth, async (req, res) => {
  try {
    const publication_id = req.header("publication_id");
    const publication = await Publication.findOne({
      _id: publication_id,
      user_id: req.user.id,
    }).exec();

    if (!publication) {
      return handleError(res, 400, "Publication non existent");
    }

    const oldVideo = Object.assign({}, publication.video);
    if (oldVideo) {
      //DELETE IN DB
      publication.video = undefined;
      publication.save((err, doc) => {
        if (err) {
          return handleError(res, 500, `DB error: ${err}`, err);
        }
        res.json(doc);
      });

      //DELETE IN CLOUD
      try {
        await mediaBucket.file(oldVideo.name).delete();
        console.log(`${oldVideo.URL} deleted.`);
      } catch (err) {
        console.log(
          `could not delete file ${oldVideo.name}, maybe it does not exists`
        );

        return handleError(res, 500, `Storage error: ${err}`, err);
      }
    } else {
      return handleError(
        res,
        400,
        "The publication already does not have a video",
        err
      );
      //return res.json({video: {} });
    }
  } catch (err) {
    return handleError(res, 500, "Server Error", err);
  }
});

//delete all images from publication
router.delete("/images", auth, async (req, res) => {
  try {
    const publication_id = req.header("publication_id");
    const publication = await Publication.findOne({
      _id: publication_id,
      user_id: req.user.id,
    }).exec();

    if (!publication) {
      return handleError(res, 400, "Publication non existent");
    }

    const oldImages = [...publication.images];
    if (!(oldImages === undefined || oldImages.length == 0)) {
      //DELETE IN DB
      publication.images = [];
      publication.save((err, doc) => {
        if (err) {
          return handleError(res, 500, `DB error: ${err}`, err);
        }
        //if succesful return the updated post object
        res.json(doc);
      });

      //DELETE IN CLOUD
      for (let image of oldImages) {
        try {
          await mediaBucket.file(image.name).delete();
          console.log(`${image.URL}  deleted.`);
        } catch (err) {
          console.log(
            `could not delete file ${image.name}, maybe it does not exists`
          );
          return handleError(res, 500, `Storage error: ${err}`, err);
        }
      }
    } else {
      return handleError(
        res,
        400,
        "The publication already does not have any images",
        err
      );
      //return res.json({images: []}); //if there are no images to delete
    }
  } catch (err) {
    return handleError(res, 500, "Server Error", err);
  }
});

//delete a specific image from the publication
router.delete("/image", auth, async (req, res) => {
  try {
    const publication_id = req.header("publication_id");
    const image_name = req.header("image_name");
    const publication = await Publication.findOne({
      _id: publication_id,
      user_id: req.user.id,
    }).exec();

    if (!publication) {
      return handleError(res, 400, "Publication non existent");
    }

    if (!(publication.images === undefined || publication.images.length == 0)) {
      //DELETE IN DB

      if (
        !publication.images.find((image) => {
          return image.name == image_name;
        })
      ) {
        return handleError(res, 400, "That image does not exist in DB");
      }

      publication.images = publication.images.filter((image) => {
        return image.name !== image_name;
      });

      publication.save((err, doc) => {
        if (err) {
          return handleError(res, 500, `DB error: ${err}`, err);
        }
        //if succesful return the updated post object
        res.json(doc);
        //after sending response we continue to delete it in storage as that is not of concern for the user
      });

      //DELETE IN CLOUD
      try {
        await mediaBucket.file(image_name).delete();
        console.log(`${image_name}  deleted.`);
      } catch (err) {
        console.log(
          `could not delete file ${image_name}, maybe it does not exists`
        );
        return handleError(res, 500, `Storage error: ${err}`, err);
      }
    } else {
      return handleError(
        res,
        400,
        "The publication already does not have any images",
        err
      );
    }
  } catch (err) {
    return handleError(res, 500, "Server Error", err);
  }
});

module.exports = router;