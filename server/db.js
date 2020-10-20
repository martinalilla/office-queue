'use strict';

const sqlite = require('sqlite3').verbose();
const env = process.env.NODE_ENV || 'development';
var DBSOURCE;

if(env==='test'){
     DBSOURCE = './test/office-queue-test.db';
} else DBSOURCE = './office-queue.db';

const db = new sqlite.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message);
        throw err;
    }
});

module.exports = db;