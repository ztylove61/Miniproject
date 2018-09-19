const express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var firebase = require ('firebase');
var router = express.Router();
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const secret = 'secret';
const roundTo = ('round-to');
var mongo = require('mongodb');
var mongoose = require ('mongoose');
var plotly = require('plotly')("cassielee04","uAi8BnsPWVUvBLBjjW0Z");
var MongoClient = require('mongodb').MongoClient;
var rn = require('random-number');
var date = require('date-and-time');
var popupTools = require('popup-tools');
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
   
var newemail = new emails();

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
//app.use(express.static(__dirname + '/files/css')); 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set('view engine', 'pug');
app.set('files', path.join(__dirname, '/files'));


//Sign Up
app.post('/registered', function(req,res){
    const txtEmail = req.body.email;
    const password = req.body.password;
    firebase.auth().createUserWithEmailAndPassword(txtEmail, password)
    .then(function(firbaseUser){
              var emailArray = []; 
              var dateNow = new Date();
              var dateYear = dateNow.getFullYear();
              var dateMonth = dateNow.getMonth();
              var dateDay = dateNow.getDay();     
              emails.count({},function(err, count){
              
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
                    //console.log(userMap);
                    if(txtEmail !== user)
                    {
                        newemail.email = txtEmail;
                        newemail.save().then((doc1)=>{
                        
                        },(e)=>{
                            //console.log('err');

                        });    
                    }
                        
                    });
                    console.log('check out emails');
                    })
                }       
            });
            for(let i = 0 ; i < 10 ; i++)
            {   
                
                dateDay = dateDay + 1;
                var parsed = dateYear + '-' + dateMonth + '-' + dateDay;
                var newobj = new obj();   
                newobj.email = txtEmail;
                newobj.livingroom.push({temp_liv:Math.round(temp_gen()),
                    hum_liv:Math.round(hum_gen()),time:parsed});
                newobj.bedroom.push({temp_bed:Math.round(temp_gen()),
                    hum_bed:Math.round(hum_gen()),time:parsed});

                newobj.save().then((doc)=>{
                
                },(e)=>{
                    //console.log('err');
                });
            }

            var token = jwt.sign({userID:txtEmail},secret,{ expiresIn: '1h' });
            res.cookie('token',token);
            res.redirect('/logged');

    })
    .catch(e=>res.render(__dirname + '/files/html/SignUp.pug',{title: 'Invalid', message: 'Invalid', errors: e.message}))
        // Handle Errors here.
   
})

//Sign In
app.post('/login', function(req,res){
    const txtEmail = req.body.email;
    const password = req.body.password;
    
    console.log('IN LOGIN');
    
    var promise = firebase.auth().signInWithEmailAndPassword(txtEmail,password);
    promise
    .then(function(user){
        console.log('logged in')
        var token = jwt.sign({userID:txtEmail},secret,{ expiresIn: '1h' });
        console.log('hi cassie');
        res.cookie('token',token);
        console.log('token after',token);
        res.redirect('/logged');
        
    })
    .catch(e=>res.render(__dirname + '/files/html/index2.pug',{title: 'Invalid', message: 'Invalid', errors: 'Invalid Username or Password'}))
        //res.render(__dirname + '/files/html/index2.pug',{title: 'Invalid', message: 'Invalid', errors: 'Invalid Username or Password'});
        
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
    jwt.verify(req.cookies.token, 'secret', function(err , decoded) {
        // err
        if(err){

            console.log('logged out');
            res.sendFile('home.html',{root: path.join(__dirname,'./files/html')});
            
        }else{
            
            console.log('confirmed');
            console.log('decoded: ',decoded);
            var Email = decoded.userID;
            var split = Email.split("@");
            var username = split[0];
            console.log(Email);
            obj.find({email:Email},function(err,doc){
                if(err){

                    return console.log('NO');
                }
                else{
                    console.log('doc',doc);
                    var livingroomT = [];
                    var bedroomT =[];
                    var livingroomH = [];
                    var bedroomH = [];
                    var timeArray = [];
                    doc.forEach(function(data){
                        var arraylivT = data.livingroom[0];
                        var arraybedT = data.bedroom[0];
                        var arraylivH = data.livingroom[0];
                        var arraybedH = data.bedroom[0];
                        var arrayTime = data.livingroom[0];
                        livingroomT.push(arraylivT.temp_liv);
                        bedroomT.push(arraybedT.temp_bed);
                        livingroomH.push(arraylivH.hum_liv);
                        bedroomH.push(arraybedH.hum_bed);
                        timeArray.push(arrayTime.time);
                        

                    });
                    timeArray.sort(function(a, b){
                        var nums1 = a.split('-');
                        var nums2 = b.split('-');
                        var numcon1 = Number(nums1[2]);
                        var numcon2 = Number(nums2[2]);
                        console.log(nums1,nums2);
                        return numcon1 > numcon2;
                    });
                    console.log(timeArray);
                    var temp_liv_datas = {
                        x:timeArray,
                        y:livingroomT,
                        name:'Temperature(Celcius)',
                        fill: 'tozeroy',
                        type: "scatter"
                    };

                    var hum_liv_datas = {
                        x:timeArray,
                        y:livingroomH,
                        name:'Humidity(%)',
                        fill:'tonexty',
                        type: "scatter"
                    };

                    var layout_living = {
                        title: 'Livingroom Info',
                        autosize:false,
                        width:700,
                        height:700,
                        margin:{
                            l:50,
                            r:50,
                            b:100,
                            t:100,
                            pad:4
                        },
                        paper_bgcolor:'#ffffff',
                        plot_bgcolor:'#ffffff'
                        
                    };
                    
                    console.log(timeArray);
                    
                    var liv_data = [temp_liv_datas,hum_liv_datas];
                    var graphOptions = {layout:layout_living, filename: "bar-line", fileopt: "overwrite"};
                    plotly.plot(liv_data, graphOptions, function (err, msg) {
                        if(err){
                            console.log(err);
                        }
                        console.log(msg);

                    });

                    
                }
            
            });


            
            //res.sendFile('loggedin.html',{root: path.join(__dirname,'./files/html')})
            res.render(__dirname + '/files/html/loggedin.pug',{username:username});
        }
        // decoded undefined
      });

});


app.get('/signup',(req,res)=>{
    res.render(__dirname + '/files/html/SignUp.pug')
});


//Listen to auth state changes

app.get('/signin',(req,res)=>{    
    //res.sendFile('home.html',{root: path.join(__dirname,'./files/html')})
    console.log('Im Here');
    res.render(__dirname + '/files/html/index2.pug');
});

app.get('/',(req,res)=>{ 
     
    res.sendFile('home.html',{root: path.join(__dirname,'./files/html')})
    //res.render(__dirname + '/files/html/home.html');
});

app.listen(3000,() => {
    console.log('Starting on port 3000');
});
