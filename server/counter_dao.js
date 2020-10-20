'use strict';

// DAO module for accessing courses and exams
// Data Access Object
const db = require('./db');

const Counter = require('./counter.js');

const create_counter = function (row) {
    return new Counter(row.id, row.request_type);
}

//GET ALL COUNTERS
exports.listCounters = function() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM Counters';
      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        const counters = rows.map((e) => create_counter(e));
        resolve(counters);
      });
    });
  };

  /**
 * Get the request types served by a counter
 */
exports.get_requests = function(id) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT request_type FROM Counters WHERE id = ?";
        db.all(sql, [id], (err, rows) => {
            if (err) {
                reject(err);
            }
            else if (rows.length === 0){
                resolve(undefined);
            }   
            else{
                const requests = rows.map((e) => ({request_type: e.request_type}));
                resolve(requests);  
            }
        });
    });
  }

   /**
 * Get counters that serve a specific request_type
 */
exports.get_counters = function(request_type) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT id FROM Counters WHERE request_type= ?";
        db.all(sql, [request_type], (err, rows) => {
            if (err) {
                reject(err);
            }
            else if (rows.length === 0){
                resolve(undefined);
            }   
            else{
                const counters = rows.map((e) => ({id: e.id}));
                resolve(counters);  
            }
        });
    });
  }

  
    //INSERT A COUNTER (NEW OR AN EXISTING ONE WITH A NEW REQUEST_TYPE)
    exports.create_counter = function(counter) {
      return new Promise((resolve, reject) => {
          const sql = 'INSERT INTO Counters(id, request_type ) VALUES(?,?)';
          db.run(sql, [counter.id, counter.request_type], function (err) {
              if(err){
                  console.log(err);
                  reject(err);
              }
              else{
                  console.log(this.lastID);
                  resolve(this.lastID);
              }
          });
      });
  }
  
  
  /**
   * Delete a counter with a given id
   */
  exports.delete_counter = function(id) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM Counters WHERE id = ?';
        db.run(sql, [id], (err) => {
            if(err)
                reject(err);
            else 
                resolve(null);
        })
    });
  }


  /**
   * Delete a specific request_type for a counter with a given id
   */
  exports.delete_request_type = function(id, request_type) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM Counters WHERE id = ? AND request_type = ?';
        db.run(sql, [id, request_type], (err) => {
            if(err)
                reject(err);
            else 
                resolve(null);
        })
    });
  }
  
  
 