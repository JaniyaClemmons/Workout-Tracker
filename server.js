/**
 * Application entry point: Connect to express server, db server
 */
require('dotenv').config();
const path = require("path");
const express = require('express');
const mongoose = require('mongoose');

//express app
const app = express();

const exerciseRoutes = require('./routes/exercises');

const userRoutes = require('./routes/user');

const workoutRoutes = require('./routes/workout');


//Added for cyclic deployment - serve frontend (npm run build)
app.use(express.static(path.join(__dirname, "./frontend/build")));
app.get("/", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./frontend/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

//global middleware - LOGGER (called between every request between client and server)
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

//expects json data {"Name": "Pikachu", "Type": "Banana"}
//must be placed before routes 
app.use(express.json()); 
//app.use(express.urlencoded()) expects url data /Name=Pikachu&Type=Banana

//middleware grabs all the routes and uses them on the applcation 
/*arg 1 is the root, now as user adds endpoints, they will fire 
the functions on exerciseRoutes*/

//register routes
app.use('/api/exercises', exerciseRoutes); 

app.use('/api/user', userRoutes);

app.use('/api/workouts', workoutRoutes);

//middleware to parse data in outgoing request (post and patch) (body-parser no longer needed)



//Only fields specified in model will be saved to db
mongoose.set('strictQuery', true);
//connect to db 
/* Asynch process -  we dont have to wait for it to 
finish before other processes start, so returns a promise when its done*/
mongoose.connect(process.env.MONGO_URI)
    // .then() of a promise obj says to wait until completed, then do something
    .then(()=> {
        //listen for request after connected to db
        app.listen(process.env.PORT, () => {
        console.log("Connected to db and listening on 4000");
        })
    })
    .catch((error) =>{
        console.log(error);
    })


