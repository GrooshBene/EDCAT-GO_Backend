/**
 * Created by bene on 2016. 8. 20..
 */



var express = require('express');

var mongoose = require('mongoose');

var serveStatic = require('serve-static');

var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended : true
}));

app.use(serveStatic(__dirname, ({
    'index' : false
})));

var server = require('http').Server(app);

console.log('Server Running At Port 7070');
server.listen(7070);

var https = require('https');


var schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/edcat", function (err) {
    if(err){
        console.log("MongoDB Error!");
        throw err;
    }
});

var userSchema = new schema({
    _id : {
        type : String
    },

    name : {
        type : String
    },

    profile : {
        type : String
    },

    gender : {
        type : String
    },

    cats : {
        type : Array
    },

    exp : {
        type : Number
    }
});

var catSchema = new schema({
    _id : {
        type : String
    },

    name : {
        type : String
    },

    cat_type : {
        type : Number
    },

    cat_date : {
        type : Date
    }
});

var User = mongoose.model('users', userSchema);

var Cat = mongoose.model('cats', catSchema);

require('./route/oauth')(app,User);

require('./route/catch')(app,User,Cat);