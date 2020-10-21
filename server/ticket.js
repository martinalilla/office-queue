class Ticket{    
    constructor(ticket_number, request_type, wait_time) {

        this.ticket_number = ticket_number;
        this.request_type = request_type;
        this.wait_time=wait_time; 
    }
    
}

module.exports = Ticket;