

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

module.exports = {handleError}