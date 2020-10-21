'use strict';

const sqlite = require('sqlite3').verbose();
const env = process.env.NODE_ENV;
var DBSOURCE = env === 'test' ? './test/office-queue-test.db' :  './office-queue.db' ;


const db = new sqlite.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message);
        throw err;
    }
});

module.exports = db;