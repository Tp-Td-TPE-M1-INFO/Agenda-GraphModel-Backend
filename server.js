const express = require('express');
require('dotenv').config({path:'./config/.env'});
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const nutritionRoutes = require('./routes/nutrition.routes');
const foodRoutes = require('./routes/food.routes');
const searchRoutes = require('./routes/search.routes');
const healthProblemRoutes = require('./routes/healthProblem.routes');

require('./config/db');
const {checkUser, requireAuth} = require('./middleware/auth.middleware');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.get('/', (req, res) =>{
    res.send("Bienvenue sur notre api d'agenda nutritionnel - test CD")
})


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

//jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) =>{
   res.status(200).send(res.locals.user._id)
})

//routes
app.use('/api/user',userRoutes);
app.use('/api/nutrition', nutritionRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/health-problem', healthProblemRoutes)

app.listen(process.env.PORT, ()=>{
    console.log(`listen on port ${process.env.PORT}`);
})
