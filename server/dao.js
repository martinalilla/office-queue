'use strict';

// DAO module for accessing courses and exams
// Data Access Object

const sqlite = require('sqlite3');
const db = new sqlite.Database('office-queue.db', (err) => {
  if (err) throw err;
});

exports.listCounters = function() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM Counters';
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const counters = rows.map((e) => ({id: e.id, request_type: e.request_type}));
      resolve(counters);
    });
  });
};

exports.listRequests = function() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM Request_type';
      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        const requests = rows.map((e) => ({tag_name: e.tag_name, service_time: e.service_time}));
        resolve(requests);
      });
    });
  };