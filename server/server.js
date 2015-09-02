var express = require('express');
var mongoose = require('mongoose');
var db = require('./config/dbConfig');
var jwt = require('express-jwt');
var dotenv = require('dotenv');
var BPromise = require('bluebird');
var fb = require('fb');
var aws = require('aws-lib');
var fs = require('fs');
var cors = require('cors');

//load .env file
dotenv.load();

var app = express();

// configure the server with all the middleware and the routing
require('./config/middleware')(app, express);

var prodAdv = aws.createProdAdvClient(process.env.AMAZON_CLIENT_ID, process.env.AMAZON_CLIENT_SECRET, process.env.AMAZON_ASSOCIATE_TAG);

app.get('/ping', function(req, res) {
  res.send(200, {text: "All good. You don't need to be authenticated to call this"});
});

// app.post('/api/friends', function(req, res) {
//     BPromise.all([
//         facebookApi.friends(req.body.access_token),
//         facebookApi.invitableFriends(req.body.access_token)
//     ])
//     .spread(function(friendsResponse, invitableFriendsResponse) {
//         var friends = friendsResponse.data.map(function(userData) {
//             // console.log(JSON.stringify(userData,null, '\t'));
//             return {
//                 id: userData.id,
//                 name: userData.name,
//                 pictureUrl: userData.picture.data.url,
//                 birthday : userData.birthday,
//                 hometown : userData.hometown.name,
//                 fav_atheletes : userData.favorite_athletes,
//                 inspirational_people : userData.inspirational_people,
//                 sports : userData.sports,
//                 books: userData.books,
//                 albums: userData.albums
//             };
//         });
//         var invitableFriends = invitableFriendsResponse.data.map(function(userData) {
//             return {
//                 id: userData.id,
//                 name: userData.name,
//                 pictureUrl: userData.picture.data.url,
//                 birthday : userData.birthday,
//                 fav_atheletes : userData.favorite_athletes,
//                 inspirational_people : userData.inspirational_people,
//                 sports : userData.sports,
//                 books: userData.books,
//                 albums: userData.albums
//             };
//         });
//         var allFriends = friends.concat(invitableFriends);
//         console.log(JSON.stringify(invitableFriends, null, '\t'));
//         res.send(JSON.stringify(allFriends));
//     })
//     .catch(function(err) {
//         log.error('Error building friends response: ' + util.inspect(err));
//         next(err);
//     });
// });

mongoose.connect(db.url);
mongoose.connection.once('connected', function(){
  console.log('Nifty gifty db is connected!');
});

// will change this later for production
var port = process.env.PORT || 3000;
app.listen(port);

console.log('Magical gifts on port ' + port);
module.exports = app;
