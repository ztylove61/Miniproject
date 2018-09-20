# Miniproject Software Engineering

Description of iTempTracker 
--------------------------
The project is a home temperature & Humidity tracking website,
where you can login to your account and check your personal status easily.
Supporting multiple usersby having our own database in mongodb.      

Getting Started
-----------------
### Requirements: ###
 * npm: '6.2.0', node: '8.11.3', firebase-tools: 4.2.1, or above

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


### Sign Up page
The new user can create account through this page. Entering the email address and password, user can create the account and directly can see the profile page with room information.  


### Profile Page
Once the user is logged in, the specific data that corresponds to the user will appear. The plot will be shown about the temperature in celcious and humidity in percentage. The date is next 10 days since user registered the app. If the user clicks the "Sign Out", the session is out, and the main page will be show up.





     
Languages and Tools 
-------------------

### Node Js 

### HTML, pug and CSS

For the UI design, we used HTML web page,
used hyperlink to connect each sites,
used .css files to create the front-end design,
use .active function to make simple animates.


### Contributor

Seung Hee Lee(cassielee04)
seunghee@bu.edu 

Tianyu Zhang(ztylove61)             
ztyluv@bu.edu     

### Reference
