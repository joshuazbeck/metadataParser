import {checkForNewSong, songMeta} from './metadata.js';
import fetch from 'node-fetch';

checkForNewSong();
import express from 'express';
var app = express();
import s from 'http';
var server = s.createServer(app);

var connections = [];

server.listen(process.env.PORT || 3000);
app.get('/', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'content/text');
    res.send("Hello");
});
app.get('/json', (req, res) => {
   
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    
 fetch('http://cp1.thepuremix.net:9954/currentsong', {"sid": 1})
    .then(response => response.text())
    .then(data => {
        var title = data.split(" - ")[0].replace(" FEAT. ", ", ").replace(" & ", ", ") + ", " + data.split(" - ")[1];
        let json = songMeta(title).then(function(json) {
            console.log("HI THERE" + json);
            res.send(json);
        });
    });
    
    

}); 

