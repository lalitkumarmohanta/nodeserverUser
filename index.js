const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/dev');
const Rental = require('./models/Rental');
const FakeDb = require('./db');

const rental_route = require('./router/rental_route');
const user_route = require('./router/user_rout');
const bookin_route = require('./router/booking_route');

mongoose.connect(config.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(db => {
    console.log('db  conmected')
    const fakeDb = new FakeDb();
    // fakeDb.seedDb();
}).catch(err => console.log(err))

const app = express();

app.use(bodyParser.json());


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});

app.use('/api/rentals', rental_route);
app.use('/api/users', user_route);
app.use('/api/booking', bookin_route);





const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`app is listening on portno ${port};`))
