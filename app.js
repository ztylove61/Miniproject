const express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var firebase = require ('firebase');
var router = express.Router();
//var database = firebase.database();


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


var admin = require("firebase-admin");

var serviceAccount = require("./miniproject-35c0c-firebase-adminsdk-l7ec7-89f99871ca.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://miniproject-35c0c.firebaseio.com"
});

var db = admin.database();
var ref = db.ref("server/saving-data/fireblog");
var userRef = ref.child("users");

userRef.set({
    email:"hi@bu.edu",
    password:"1234567",
    temp:"35 degree",
    humidity:"70%"
});
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~




//HTML endpoint(recieving data from html)
app.post('/registered', function(req,res){
    const txtEmail = req.body.email;
    const password = req.body.password;
    console.log(txtEmail);
    console.log(password);
    firebase.auth().createUserWithEmailAndPassword(txtEmail, password)
    .then(function(firbaseUser){
        console.log(firbaseUser);
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorMessage);
            
      });

})

app.post('/login', function(req,res){
    const txtEmail = req.body.email;
    const password = req.body.password;

    console.log(txtEmail,password);

    console.log('IN LOGIN');
    var promise = firebase.auth().signInWithEmailAndPassword(txtEmail,password);

    promise
    .then(function(user){
        //console.log(user);
        console.log('logged in');
        //res.redirect('/logged');
    })
    .catch(e=>console.log('error')); 
    
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
            firebaseUser.getIdToken().then(function(data) {
                console.log(data)
              });
            console.log("firebaseUser signed in");
            res.redirect('/logged');
        }
        else{
            console.log('cannot log in');
        }
    });
    
    

})

//physical website
app.get('/logged',(req,res)=>{
    res.sendFile('loggedin.html',{root: path.join(__dirname,'./files/html')})
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

