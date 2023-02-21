const express = require("express");
const app = express();
let port = process.env.PORT || 5000;
const http = require('http').createServer(app)
const io = require("socket.io")(http)
const path = require('path');
const hbs = require("hbs");
app.use(express.json())

const static_path = path.join(__dirname, "../public");
const partials_path = path.join(__dirname, "../templates/partials");
const template_path = path.join(__dirname, "../templates/views");

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("/", (req,res)=>{
    res.render("index")
})

//socket

io.on('connection', (socket) => {
    console.log('connected.....')

    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

});

http.listen(port, ()=>{
    console.log(`https://localhost:${port}`);
})