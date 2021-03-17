const multer = require("multer");
const path = require('path');

// const handleError = (err, res) => {
//   res.status(500).contentType("text/plain").end("Oops! Something went wrong!");
// };

function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb('Error: Images Only!');
    }
}

const  uploadSingle = (name, url) => {
    var upload = multer({
      //storage: storage,
      /*limits: {
          fields: 5,
          fieldNameSize: 50, // TODO: Check if this size is enough
          fieldSize: 20000, //TODO: Check if this size is enough
          // TODO: Change this line after compression
          fileSize: 30000000, // 150 KB for a 1080x1080 JPG 90
      },*/
      fileFilter: function(_req, file, cb){
          checkFileType(file, cb);
      }
    });

    try{
      const targetPath = path.join('./public/', url);
      const storage = multer.diskStorage({
          destination: targetPath,
          filename: function(_req, file, cb){
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
          } 
        });
      upload.storage = storage;

      return upload.single(name);

    } catch (err) {
      console.log("Error at Multer");
      console.log(err);
    }
}

const  uploadMultiple = (name, url) => {
  var upload = multer();

  const targetPath = path.join('./public/', url);

  const storage = multer.diskStorage({
      destination: targetPath,
      filename: function(_req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
      } 
    });

  upload.storage = storage;

  return upload.array(name, 10);
}

module.exports = {uploadSingle, uploadMultiple};