'use strict';

// DAO module for accessing tickets
// Data Access Object
const db = require('./db');

const Ticket = require('./ticket.js');

const create_ticket = function (row) {
    return new Counter(row.id, row.request_type);
}

//GET ALL TICKETS
exports.listTickets = function() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM Tickets';
      db.all(sql, [], (err, rows) => {
        if (err) {
            reject(err);
        }
        else if (rows.length === 0){
            resolve(undefined);
        }   
        else{
            const tickets = rows.map((e) => ({ticket_number: e.ticket_number,
                                             request_type: e.request_type,
                                             wait_time : e.wait_time  }));
            resolve(tickets);  
        }
      });
    });
  };


   /**
 * Get ticket list with a specific request_type
 */
exports.get_tickets = function(request_type) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM Tickets WHERE request_type= ?";
        db.all(sql, [request_type], (err, rows) => {
            if (err) {
                reject(err);
            }
            else if (rows.length === 0){
                resolve(undefined);
            }   
            else{
                const tickets = rows.map((e) => ({ticket_number: e.ticket_number,
                                             request_type: e.request_type,
                                             wait_time : e.wait_time  }));
                resolve(tickets);  
            }
        });
    });
  }

  
    //INSERT A TICKET 
    exports.create_ticket = function(request_type) {
      return new Promise((resolve, reject) => {
          const sql = 'INSERT INTO Tickets(request_type, wait_time ) VALUES(?,?)';
          db.run(sql, [request_type, "00:20:00"], function (err) {
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
  
  


  
 