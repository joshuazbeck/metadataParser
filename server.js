import fetch from 'node-fetch';

import express from 'express';
var app = express();
import s from 'http';
var server = s.createServer(app);

var connections = [];

server.listen(8080);
///remove "types": "module" from /Users/joshbeck/node_modules/node-fetch/package.json
import SpotifyWebApi from 'spotify-web-api-node';
// import { publishJson } from './socket_publisher.js';

//CONSTANTS
const spotifyApi = new SpotifyWebApi({
    clientId: 'debfa47846774fc9a5955e35f2b69c4b',
    clientSecret: '60f45e2355af48a2bb364564293e20fc',
    grant_type: "client_credentials"
});

//We additionally access song information by hard coded parameters kept as {sid: 1}
const baseURL = "http://cp1.thepuremix.net:9954/currentsong"



//Function for returning the song metadata from Spotify API
export const songMeta = async (title) => {


function stringifyData(results) {
    console.log(results);
    if (results.body["tracks"].length <= 0) return null;
    //Get variables
    let album = results.body["tracks"].items[0].album.name;
    let albumUrl = results.body["tracks"].items[0].album.href;
   
    let artistName = results.body["tracks"].items[0].artists[0].name;
    let artistUrl = results.body["tracks"].items[0].artists[0].external_urls.spotify;
    let title = results.body["tracks"].items[0].name;
    let duration = results.body["tracks"].items[0].duration_ms/1000;
    let trackId = results.body["tracks"].items[0].id;
    let trackViewURL = results.body["tracks"].items[0].external_urls.spotify;
    let songImgHigh = results.body["tracks"].items[0].album.images[0].url;
//  server.js
//  Tinsel & Tunes
//
//  Created by Josh Beck on 10/13/21.  macmanjb@gmail.com
//  Copyright © 2021 Jesse McKeehan. All rights reserved.

let songImgLow = results.body["tracks"].items[0].album.images[2].url;

    var obj = new Object();
    obj.album = album;
    obj.albumUrl = albumUrl;
    obj.artistName = artistName;
    obj.artistUrl = artistUrl;
    obj.title = title;
    obj.duration = duration;
    obj.trackId = trackId;
    obj.trackViewURL = trackViewURL;
    obj.songImgHigh = songImgHigh;
    obj.songImgLow = songImgLow;

    var stringify = JSON.stringify(obj);
    return stringify;
}
var json;
await spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    spotifyApi.setAccessToken(data.body['access_token']);
    console.log(data.body['access_token']);
  }, function(err) {
    console.log('Something went wrong when retrieving an access token', err);
  });
  try {
    await spotifyApi.searchTracks(title, {limit: 1, offset: 0})
    .then(function(results){
        //Edge cases
        console.log(results);
        json = stringifyData(results);
    });
  } catch (e) {
      console.log("Could not find the song: " + e);
  }
  return await json;
}
app.get('/json', (req, res) => {
   
    res.setHeader('Content-Type', 'application/json');
    
    fetch('http://cp1.thepuremix.net:9954/currentsong', {"sid": 1})
        .then(response => response.text())
        .then(data => {

                //title not null
                var title = data.split(" - ")[0].replace(" FEAT. ", ", ").replace(" & ", ", ") + ", " + data.split(" - ")[1];
                let json = songMeta(title).then(function(json) {
                    if (json != null || json != "") {
                        console.log("[Non-fatal ERROR] Searching in Spotify API for title... no results.  Translate title to partial JSON: " + title);
                        var artistName = data.split(" - ")[0];
                        var title = data.split(" - ")[1];
                        var album = data.split(" - ")[2];
                        var obj = new Object();
                        obj.album = album;
                        obj.albumUrl = null;
                        obj.artists = null;
                        obj.artistName = artistName;
                        obj.artistUrl = null;
                        obj.title = title;
                        obj.duration = null;
                        obj.trackId = null;
                        obj.trackViewUrl = null;
                        obj.songImgHigh = null;
                        obj.songImgLow = null;
                        
                        //Return JSON to the url
                        res.statusCode = 200;
                        res.send(obj);
                            
                    } else {
                        console.log("Getting JSON for the song")
                        //Return JSON to the url
                        res.statusCode = 200;
                        res.send(json);
                    }
                });

        })
        .catch((error) => console.error(error))
}); 

