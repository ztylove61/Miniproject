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
app.use(express.static(__dirname + '/files')); // USING CSS files in project
//Middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({secret:"feaiosajfdklne1240",resave: false, saveUninitialized:true}));



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
            let expirationDate = Math.floor(Date.now()/1000)+30;
            var token = jwt.sign({userID:txtEmail, exp:expirationDate},secret);
            console.log(token);
           
        res.redirect('/logged')
    })
    .catch(e=>console.log(e))
    
        
});

    

//physical website

app.get('/logged',(req,res)=>{
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
            console.log('confirmed');
            //res.sendFile('loggedin.html',{root: path.join(__dirname,'./files/html')})
                
        }
        else{
            res.redirect('/');
        }
})
});


app.get('/signup',(req,res)=>{
    res.sendFile('SignUp.html',{root: path.join(__dirname,'./files/html')})
});


//Listen to auth state changes


app.get('/',(req,res)=>{
    
    res.sendFile('index2.html',{root: path.join(__dirname,'./files/html')})
});


app.get('/logout',function(res,req){
    var sessionCookie = req.cookies.session||'';
    res.clearCookie('session');
    admin.auth().verifySessionCookie(sessionCookie)
    .then((decodedClaims)=>{
    return admin.auth().revokeRefreshTokens(decodedClaims.sub)
    })
    .then(()=>{
        res.redirect('/logged');
    })
    .catch((error)=>{
        res.redirect('/logged');
    })
    
})

app.listen(3000,() => {
    console.log('Starting on port 3000');
});
