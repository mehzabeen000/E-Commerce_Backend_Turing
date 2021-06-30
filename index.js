const express = require('express');

const app = express();
hostname = "localhost";
port = 6000;

app.use(express.json());

const router = require('./controller/connect')
app.use(router);


app.listen(port, hostname, () => {
    console.log(`Connected sucessfully on http://${hostname}/${port}`);
})
