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
var mysql = require('mysql');

var rn = require('random-number');
var gen = rn.generator({
    min:-10,
    max:40,
    interger:true
})

var temp = Math.round(gen());
//var temp_round = roundTo( temp , 2 );
console.log(temp);

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

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
//app.use(session({secret:"feaiosajfdklne1240",resave: false, saveUninitialized:true}));

var stateCheck = (req,res,next)=> {

    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
               
            // let expirationDate = Math.floor(Date.now()/1000)+30;
            console.log('confirmed');
            res.sendFile('loggedin.html',{root: path.join(__dirname,'./files/html')})
            
        }
        else{
            console.log('logged out');
            res.sendFile('index2.html',{root: path.join(__dirname,'./files/html')});
            
        }
    })
    next();
}


//Initialize Admin SDK

var serviceAccount = require("./miniproject-35c0c-firebase-adminsdk-l7ec7-89f99871ca.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://miniproject-35c0c.firebaseio.com"
});



//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//Sign Up
app.post('/registered', function(req,res){
    const txtEmail = req.body.email;
    const password = req.body.password;
    console.log(txtEmail);
    console.log(password);
    firebase.auth().createUserWithEmailAndPassword(txtEmail, password)
    .then(function(firbaseUser){
        console.log(firbaseUser);
        res.redirect('/logged')
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
    
app.get('/logged',(req,res)=>{

    console.log('token',req.cookies);
    jwt.verify(req.cookies.token, 'secret', function(err, decoded) {
        // err
        if(err){

            console.log('logged out');
            res.sendFile('index2.html',{root: path.join(__dirname,'./files/html')});
            
        }else{
            console.log('confirmed');
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
