'use strict';

// DAO module for accessing tickets
// Data Access Object
const db = require('./db');

const Ticket = require('./ticket.js');

const create_ticket = function (ticket_number, request_type, wait_time) {
    return new Ticket(ticket_number, request_type, wait_time);
}

var  lastID=6;
var tickets = [{ticket_number:1, request_type: "shipping", wait_time: "00:20:00" },
                {ticket_number:2, request_type: "shipping", wait_time: "00:10:00" },
                {ticket_number:3, request_type: "accounts management", wait_time: "00:25:00" },
                {ticket_number:4, request_type: "send money", wait_time: "00:20:00" },
                {ticket_number:5, request_type: "packages", wait_time: "00:30:00" },
                {ticket_number:6, request_type: "letters", wait_time: "00:06:00" }]  ;              
//GET ALL TICKETS
exports.listTickets = function() {
   // lastID++; 
    //return  {ticket_number:lastID, request_type: "posta", wait_time: "00:20:00" }; 
    return tickets; 
  };
  


   /**
 * Get ticket list with a specific request_type
 */
exports.get_tickets = function(request_type) {
    var newArray= tickets.filter(function(el){
        return el.request_type==request_type; 
    });
    return newArray; 
  }

  
    //INSERT A TICKET 
    exports.create_ticket = function(request_type) {
        lastID++; 
        var t = create_ticket(lastID, request_type, "00:05:00"); 
        tickets.push(t); 
        console.log("ticket created"); 
        console.log(tickets);
        return t.ticket_number;
  }


    //INSERT A TICKET 
    exports.remove_ticket = function(ticket_number) {
       var index= findWithAttr(tickets, 'ticket_number', ticket_number);
       console.log(index); 
       tickets.splice(index, 1);
        // var t= tickets.filter(function(el){
        //     return el.ticket_number==ticket_number; 
        // });
        // console.log(t); 
        // tickets.pop(t); 
       
  }


  function findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

  
  


  
 