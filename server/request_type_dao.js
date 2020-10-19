
'use strict';

// DAO module for accessing courses and exams
// Data Access Object

const sqlite = require('sqlite3');
const moment = require('moment');
const db = new sqlite.Database('office-queue.db', (err) => {
  if (err) throw err;
});

const Request_type = require('./request_type');

const create_request_type = function (row) {
    return new Request_type(row.tag_name, row.service_time);
}

//GET ALL REQUESTS
exports.listRequests = function() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM Request_type';
      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        let requests = rows.map((row) => create_request_type(row));
        resolve(requests);
      });
    });
  };

  /**
 * Get the service time of a request_type
 */
exports.get_service_time = function(tag_name) {
  return new Promise((resolve, reject) => {
      const sql = "SELECT service_time FROM Request_type WHERE tag_name = ?";
      db.all(sql, [tag_name], (err, rows) => {
          if (err) {
              reject(err);
          }
          else if (rows.length === 0){
              resolve(undefined);
          }   
          else{
            let request_type = create_request_type(rows[0]);
              resolve(request_type.service_time);  
          }
      });
  });
}

  //CREATE A REQUEST_TYPE
  exports.create_request_type = function(request_type) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO Request_type(tag_name, service_time ) VALUES(?,?)';
        db.run(sql, [request_type.tag_name, request_type.service_time], function (err) {
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
 * Delete a request_type with a given tag_name
 */
exports.delete_request_type = function(tag_name) {
  return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM Request_type WHERE tag_name = ?';
      db.run(sql, [tag_name], (err) => {
          if(err)
              reject(err);
          else 
              resolve(null);
      })
  });
}


/**
 * Update the service time of an existing request_type with a given tag_name. 
 */
exports.update_request_type = function(tag_name, service_time) {
  return new Promise((resolve, reject) => {
      const sql = 'UPDATE Request_type SET service_time = ? WHERE tag_name = ?';
      db.run(sql, [service_time, tag_name], (err) => {
          if(err){
              console.log(err);
              reject(err);
          }
          else
              resolve(null);
      })
  });
}

