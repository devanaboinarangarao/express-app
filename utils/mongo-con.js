const mongodb = require('mongodb');
const Db = require('mongodb').Db;
const config = require('config');

const mongoClient = mongodb.MongoClient;

let _db;

const createConn = (cb) => {
    mongoClient.connect(config.mongo.uri, /*{auth: {user : config.mongo.username, password : config.mongo.password},*/ {useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
        if(err) {
            console.log(err);
            return;
        }
        _db = client.db();
        cb(true);
    });
}

const getDb = () => {
    if(_db) {
        return _db;
    } else {
        console.log('No Db to Return');
    }
}

exports.createConn = createConn;
exports.getDb = getDb;