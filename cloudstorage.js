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
    password:"1234567"
});


