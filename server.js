<<<<<<< HEAD
<<<<<<< HEAD
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const connectGoogleCloud = require("./config/googleCloud");
const https = require("https");
const config = require("config");
const app = express();
const serverKey = config.get("serverKey");
const serverCert = config.get("serverCert");
=======
=======
>>>>>>> 52aee2815465dc79bc6ab08e2aa675f2bf778fec
const express = require('express')
const connectDB = require('./config/db')
const https = require('https')
const config = require('config')
const app = express()
const serverKey = config.get('serverKey')
const serverCert = config.get('serverCert')
<<<<<<< HEAD
>>>>>>> Add YouTube analytics route
=======
>>>>>>> 52aee2815465dc79bc6ab08e2aa675f2bf778fec

app.use(cors());
// Connect database
connectDB()
<<<<<<< HEAD

global.mediaBucket = connectGoogleCloud();
=======
>>>>>>> 52aee2815465dc79bc6ab08e2aa675f2bf778fec

// Ask the server to accept JSON objects in the body of the POST/GET requests
app.use(express.json({ extended: false }))

// If there's no env variable called port, used port 5000
const PORT = process.env.PORT || 5000

// When a GET response hits the endpoint "/" it will send a response with res.send(), you are prepering the response
// And you can also get the parameters with req.params
// Make a request to "https://localhost:5000" on postman and you'll see
app.get('/', (req, res) => res.send('API Running'))

// Define Routes
// All the routes on ./routes/api/user are behind the main route /api/user
app.use("/api/user", require("./routes/api/user"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/publication", require("./routes/api/publication"));
app.use('/youtube/analytics', require('./routes/youtube/analytics'))
app.use('/youtube/upload', require('./routes/youtube/upload'))

https
	.createServer(
		{
			key: serverKey,
			cert: serverCert,
		},
		app
	)
	.listen(PORT, () => console.log(`Server started on port ${PORT}`))
