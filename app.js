const express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var firebase = require ('firebase');

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
app.use(bodyParser.urlencoded({extended:true}));

//HTML endpoint(recieving data from html)
app.post('/register', function(req,res){
    const txtEmail = req.body.email;
    const password = req.body.password;

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

    console.log('IN LOGIN');
    var promise = firebase.auth().signInWithEmailAndPassword(txtEmail,password);

    promise
    .then(function(user){
        //console.log(user);
        console.log('logged in');
        res.redirect('/logged');
    })
    .catch(e=>console.log(e.message)); 

    

})

app.get('/logged',(req,res)=>{
    res.sendFile('loggedin.html',{root: path.join(__dirname,'./files')})
});

//Add a user
// firebase.auth().onAuthStateChanged(firebaseUser => {
//     if(firebaseUser){
//         //console.log(firebaseUser);
//     }
//     else{
//         console.log('cannot log in');
//     }
// });

app.get('/',(req,res)=>{
    res.sendFile('index.html',{root: path.join(__dirname,'./files')})
});

app.listen(3000,() => {
    console.log('Starting on port 3000');
});

