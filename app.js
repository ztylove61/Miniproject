const express = require('express');
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

// //Get elements
// const txtEmail = document.getElementById('txtEmail');
// const txtPassword = document.getElementById('txtPassword');
// const loginbutton = document.getElementById('loginbutton');
// const signupbutton = document.getElementById('signupbutton');

// //Add login event
// loginbutton.addEventListener('click', e =>{
//     const email = txtEmail.value;
//     const pass = txtPassword.value;
//     const auth = firebase.auth();
//     //Sign in 
//     const promise = auth.signInWithEmailAndPassword(email,password);

//     promise.catch(e=>console.log(e.message)); 

// });
// //Add sign up event
// signupbutton.addEventListener('click', e =>{
//     const email = txtEmail.value;
//     const pass = txtPassword.value;
//     const auth = firebase.auth();

//     //Sign in 
//     const promise = auth.createUserWithEmailAndPassword(email,pass);
//     promise
//         .then(user=> console.log())
//         .catch(e=> console.log(e.message));
// });

// //Add a user
// firebase.auth().onAuthStateChanged(firebaseUser => {
//     if(firebaseUser){
//         console.log(firebaseUser);
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

