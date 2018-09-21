# Miniproject Software Engineering

Description of iTempTracker 
--------------------------
The project is a home temperature & Humidity tracking website,
where user can login to your account and check your personal status easily.
Supporting multiple usersby having our own database in mongodb.      

Getting Started
-----------------
### Requirements: ###
 * npm: '6.2.0' node: '8.11.3' firebase-tools: '4.2.1' or above

### Build the app and Run

In order to compile the code please type as below on command line to turn on the server

    $ node app.js

Open any browser and type as below on address bar 
     
    $ localhost:3000 
    
Exploring the App
------------------
### The Main Page 
The home page that introduces users what this web application for.
This home page has button to sign in.

![Alt text](/files/img/homepage.png?raw=true "home")



### Sign In Page
The user can login through this page. When user entered their email and password that they registered, and click 
the button to "Log In", they can see their profile page. If the user put invalid password or email, then he/she will get the error message why cannot login. If anyone does not have username yet, they can click the "Sign Up"
button that will create the account.

![Alt text](/files/img/signin.png?raw=true "signin")


### Sign Up page
The new user can create account through this page. Entering the email address and password, user can create the account and directly can see the profile page with room information.  

![Alt text](/files/img/signup.png?raw=true "signin")


### Profile Page
Once the user is logged in, the specific data that corresponds to the user will appear. The plot will be shown about the temperature in celcious and humidity in percentage. The date is next 10 days since user registered the app. If the user clicks the "Sign Out", the session is out, and the main page will be show up.

![Alt text](/files/img/profile.png?raw=true "signin")


Diagram
---------
Here is the logic behind the app



![Alt text](/files/img/diagram.png?raw=true "diagram")


     
Languages and Tools 
-------------------

### Node Js and Express
Javascript was used as a mainn language and Node JS, Express were used as framework for the web application.


### HTML, pug and CSS

HTML and PUG pages are main UI design. In both languages, POST or GET method to connect with other pages,
For more professional UI design, the app used reference from existing bootstrap template for .css and .html file is used at this web. Some of the pages we used .pug files in order to correspond with app.js file. 

### Firebase Authentication (API) 
The App uses Firebase Authentication to allow users to sign in to the app using email and assword methods. 
In order to connect app to firebase, installing the Firebase SDK is first part. [Installing Firebase SDK]
(https://github.com/facebook/react/wiki/Sites-Using-React)

#### When the new user Sign Up
When signing up new users, the firebase function creates a form that allows anew users to register with yhe app using their email and password
            
                firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
                 });
             
#### When the user Sign In
Firebase creates a form that allows cxisting users to sign in using created email and password when users registered, when the user completes the form
        
                firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
                });

### JWT Token (JSON Web Token) 
The app uses JWT Token for managing user private route. When user first signs into the authentication server using the firebase authentication login system, the server creates the JWT and send it to user. When user logs in the server verifies incoming jwt token that is created by authentication server. If the token verified, the user can see his/her profile page. 
If not, the user will go back to the sign in page.

### MongoDB and mLAB (Cloud Database Service)
For saving and extracting user-specific data, the web-application uses mLab which is a cloud database based upon MongoDB.
When the client signs up to the website, the webserver saves the user object (Consisted of email,temperature data, and  humidity data) into the connected mLab database for further use. As the user enters the profile page, the webserver queries the data by the user's email address and extracts the enviromental data for plotting.

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



### Plotly
In order to plot user data, the app uses library called Plotly. 
Plotly recieves data when user creates the account. When the user login the profile data, plotly shows temperature and humidity information about user room.

![Alt text](/files/img/datas.png?raw=true "datas.png")



Contributor
------------
Seung Hee Lee(cassielee04): user Authentication, mongoDB mLab integration with server, DB plotting (Backend Developer)
seunghee@bu.edu 

Tianyu Zhang(ztylove61) : Page design, Creatging HTML and CSS files, Button Design, (Frontend Developer)
ztyluv@bu.edu     

Reference
-------------
https://www.npmjs.com/ <b>
https://firebase.google.com/docs/auth/web/start <b>
https://colorlib.com/wp/free-bootstrap-registration-forms/ <b>
https://plot.ly/products/dash/<b>



