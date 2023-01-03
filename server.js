const express = require('express');
require('dotenv').config({path:'./config/.env'});
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const nutritionRoutes = require('./routes/nutrition.routes');
const foodRoutes = require('./routes/food.routes');



require('./config/db');
const {checkUser, requireAuth} = require('./middleware/auth.middleware');
const cors = require('cors');
const app = express();

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}
app.get('/', (req, res) =>{
    res.send("Bienvenue sur notre api d'agenda nutritionnel")
})

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

//jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) =>{
   res.status(200).send(res.locals.user._id)
})

//user
app.use('/api/user',userRoutes);
app.use('/api/nutrition', nutritionRoutes);
app.use('/api/food', foodRoutes);

app.listen(process.env.PORT, ()=>{
    console.log(`listen on port ${process.env.PORT}`);
})