# Miniproject Software Engineering

Description of iTempTracker 
--------------------------
The project is a home temperature & Humidity tracking website,
where you can login to your account and check your personal status easily.
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





     
Languages and Tools 
-------------------

### Node Js and Express


### HTML, pug and CSS

For the UI design, we used HTML web page,
used hyperlink to connect each sites,
used .css files to create the front-end design,
use .active function to make simple animates.

### Firebase Authentication 

### JWT Token

### MongoDB and mLAB

### Plotly


### Contributor

Seung Hee Lee(cassielee04): user Authentication, mongoDB mLab integration with server, DB plotting (Backend Developer)
seunghee@bu.edu 

Tianyu Zhang(ztylove61) : Page design, Creatging HTML and CSS files, Button Design, (Frontend Developer)             
ztyluv@bu.edu     

### Reference


