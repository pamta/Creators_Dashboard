const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const connectGoogleCloud = require("./config/googleCloud");
const https = require("https");
const config = require("config");
const app = express();
const serverKey = config.get("serverKey");
const serverCert = config.get("serverCert");

app.use(cors());
// Connect database
connectDB();

global.mediaBucket = connectGoogleCloud();

// Ask the server to accept JSON objects in the body of the POST/GET requests
app.use(express.json({ extended: false }));

// If there's no env variable called port, used port 5000
const PORT = process.env.PORT || 5000;

// When a GET response hits the endpoint "/" it will send a response with res.send(), you are prepering the response
// And you can also get the parameters with req.params
// Make a request to "https://localhost:5000" on postman and you'll see
app.get("/", (req, res) => res.send("API Running"));

// Define Routes
// All the routes on ./routes/api/user are behind the main route /api/user
app.use("/api/user", require("./modules/api/user/userRoute"));
app.use("/api/auth", require("./modules/api/user/auth"));
app.use(
    "/api/publication",
    require("./modules/api/publication/publicationRoute")
);
app.use("/api/note", require("./modules/api/note/noteRoute"));
app.use("/youtube/auth", require("./modules/api/thirds/youtube/auth"));
app.use(
    "/youtube/analytics",
    require("./modules/api/thirds/youtube/analytics")
);
app.use("/youtube/upload", require("./modules/api/thirds/youtube/upload"));
app.use("/api/facebook", require("./modules/api/thirds/facebook/facebook"));
app.use(
    "/admin/socialnetworks",
    require("./modules/admin/socialNetworks/socialnetworks")
);

const server = https
    .createServer(
        {
        key: serverKey,
        cert: serverCert,
        },
        app
    )
    .listen(PORT, () => console.log(`Server started on port ${PORT}`));

//Socket connections
const sockets = {};
const io = require("socket.io")(server);

io.on("connection", socket => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("connectInit", (sessionId) => {
        // The socket ID is stored along with the unique ID generated by the client
        sockets[sessionId] = socket.id
        // The sockets object is stored in Express so it can be grabbed in a route
        app.set("sockets", sockets);
        console.log("sockets: ");
        console.log(JSON.stringify(sockets));
        
    });
    socket.on('disconnect', function (sessionId) {

        // delete sockets[socket.id];
        // app.set("sockets", sockets);
        
        //TODO: remove socket by session id on disconnect 

        console.log(socket.id + " disconnected");
    });

    socket.on('connectEnd', function (sessionId) {

        delete sockets[sessionId];
        app.set("sockets", sockets);

        console.log(socket.id + " session ended");
    });
});

app.set("io", io);