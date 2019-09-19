const express = require('express');
const helmet = require('helmet');
const session = require('express-session');
const MongoDbStore = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
const config = require('config');
const path = require('path');
const ejs = require('ejs');
const userRoutes = require('./routes/user');

const mongoUtil = require('./utils/mongo-con');

mongoose.Promise = require('bluebird');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');


const options = {
    auto_reconnect: true,
    auto_reconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    poolSize: 1000,
    bufferMaxEntries: 0,
    keepAlive: true,
    promiseLibrary: require('bluebird'),
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const store = new MongoDbStore({
    uri: 'mongodb://localhost:27017/way2',
    collection: 'sessions'
})

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'DRANGARAO',
    store: store
}));

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/static',express.static(path.join(__dirname, 'public')));
app.use('/user/static',express.static(path.join(__dirname, 'public')));

mongoose.connect(config.mongo.uri, options)
    .then((res) => console.log("Connection Successful for mongoose"))
    .catch(err => console.log(err));

app.use('/user',userRoutes);
app.use((req, res, next) => {
    res.status(404).send('Not Found');
})

app.disable('x-powered-by');

const port = process.env.port || 3000;

mongoUtil.createConn((success) => {
    console.log("Connection Successful")
    app.listen(port, () => {
        console.log(`app is listening on port ${port}`);
    })
})