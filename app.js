const express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var firebase = require ('firebase');
var router = express.Router();
var admin = require("firebase-admin");
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
var session = require('express-session');
const secret = 'secret';
const roundTo = ('round-to');
var mongo = require('mongodb');
var mongoose = require ('mongoose');
var MongoClient = require('mongodb').MongoClient;
var rn = require('random-number');
var temp_gen = rn.generator({
    min:10,
    max:40,
    interger:true
});

var hum_gen = rn.generator({
    min:0,
    max:100,
    interger:true
});

var url = 'mongodb://cassie:cassie1004@ds223542.mlab.com:23542/test-db'
mongoose.Promise = global.Promise
mongoose.connect(url);

var obj = mongoose.model('object',{
    email:String,
    livingroom:[{
        temp_liv:Number,
        hum_liv:Number,
        time:String
    }],
    bedroom:[{
        temp_bed:Number,
        hum_bed:Number,
        time:String
    }]

})



var emails = mongoose.model('Emails',{
    email:String
})
   
var newobj = new obj();
var newemail = new emails();

/*
var newtemp = setInterval(function(){
    console.log(Math.round(temp_gen()))
},5000);

*/
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCp_U1pcNOVN26LitgZCyiac-aIeGI_zfE",
    authDomain: "miniproject-35c0c.firebaseapp.com",
    databaseURL: "https://miniproject-35c0c.firebaseio.com",
    projectId: "miniproject-35c0c",
    storageBucket: "miniproject-35c0c.appspot.com",
    messagingSenderId: "357963499894"
};
firebase.initializeApp(config);


//Middleware
app.use(cookieParser());
app.use(express.static(__dirname + '/files')); // USING CSS files in project
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Initialize Admin SDK

var serviceAccount = require("./miniproject-35c0c-firebase-adminsdk-l7ec7-89f99871ca.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://miniproject-35c0c.firebaseio.com"
});

//Sign Up
app.post('/registered', function(req,res){
    const txtEmail = req.body.email;
    const password = req.body.password;
    console.log(txtEmail);
    console.log(password);
    firebase.auth().createUserWithEmailAndPassword(txtEmail, password)
    .then(function(firbaseUser){
              var emailArray = [];      
              emails.count({},function(err, count){
              console.log( "Number of docs: ", count );
              if(count === 0){
                        newemail.email = txtEmail;
                        newemail.save().then((doc1)=>{
                        console.log('emails added');
                    },(e)=>{
                        console.log('err');
                    });
                    
                }
                else{
                        emails.find({}, function(err, users){
                        var userMap = {};
                        users.forEach(function(user){
                        userMap[user.email] = user;
                        console.log(userMap);
                        if(txtEmail !== user)
                        {
                            newemail.email = txtEmail;
                            newemail.save().then((doc1)=>{
                            console.log('new emails added');
                            },(e)=>{
                            console.log('err');
                            });    
                        }
                          
                        });
                        console.log('check out emails');
                    })
                }       
            });                
            newobj.email = txtEmail;
            newobj.livingroom.push({temp_liv:Math.round(temp_gen()),
                hum_liv:Math.round(hum_gen())});
            newobj.bedroom.push({temp_bed:Math.round(temp_gen()),
                hum_bed:Math.round(hum_gen())});

            console.log('pushed info',newobj.bedroom.email);
            
            newobj.save().then((doc)=>{

                console.log('room info entered');
                console.log('info',doc);
                
            },(e)=>{
                console.log('err');
            });
            res.redirect('/logged');

    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
            
      });

})

//Sign In
app.post('/login', function(req,res){
    const txtEmail = req.body.email;
    const password = req.body.password;
    console.log(txtEmail,password);
    console.log('IN LOGIN');
    
    var promise = firebase.auth().signInWithEmailAndPassword(txtEmail,password);
    promise
    .then(function(user){
        console.log('logged in')
        var token = jwt.sign({userID:txtEmail},secret,{ expiresIn: '1h' });
        res.cookie('token',token);
        res.cookie('emailsending',txtEmail);
            var isExpiredToken = false;
            var dateNow = new Date();
            console.log(token);
            if(token.expiresIn < dateNow.getTime()/1000)
            {
                isExpiredToken = true;
                console.log("Exipred");
                res.redirect('/');
            }
        res.redirect('/logged')
    })
    .catch(e=>console.log(e))
    
        
});

app.post('/logout',function(req,res){

    firebase.auth().signOut().then(function() {
        console.log('Signed Out');
        res.clearCookie('token');
        res.redirect('/');
      }, function(error) {
        console.error('Sign Out Error', error);
      });

});

//check if user logged in or not
app.get('/logged',(req,res)=>{

    console.log('token and email',req.cookies);
    jwt.verify(req.cookies.token, 'secret', function(err, decoded) {
        // err
        if(err){

            console.log('logged out');
            res.sendFile('index2.html',{root: path.join(__dirname,'./files/html')});
            
        }else{
            console.log('confirmed');
            obj.find({email:req.cookies.emailsending},function(err,doc){
                if(err){
                    return console.log('NO');
                }
                console.log('doc',doc);
            
            });
            
            res.sendFile('loggedin.html',{root: path.join(__dirname,'./files/html')})
        }
        // decoded undefined
      });

});


app.get('/signup',(req,res)=>{
    res.sendFile('SignUp.html',{root: path.join(__dirname,'./files/html')})
});


//Listen to auth state changes

app.get('/',(req,res)=>{

    
    res.sendFile('index2.html',{root: path.join(__dirname,'./files/html')})
});


app.listen(3000,() => {
    console.log('Starting on port 3000');
});
