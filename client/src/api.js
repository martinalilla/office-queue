
async function getAllCountersList() {

    // GET a list of all counters
    // Request body : empty
    // Response body: array of objects, each describing a Counter
    const response = await fetch('/counters');
    const result = await response.json();
    if(response.ok){       
        return result;

    } else{ 
        let error = {status: response.status, msg: "Cann't fetch counters list."};
        throw error;
    }
}

async function getRequestTypes(counterId) {

    // GET a list of request types served by the counter
    // Request header : /counter id
    // Response body: array of objects, each describing a request types served by the counter
    const response = await fetch('/api/counter/'+ counterId);
    const result = await response.json();
    if(response.ok){        
        return result;

    } else{ 
        let error = {status: response.status, msg: "Cann't fetch request types."};
        throw error;
    }

}

async function getCountersByRequestType (tag) {

    // GET a list of counters serves a specific request type
    // Request header : /tag name
    // Response body: array of objects
    const response = await fetch('/api/counters/request/'+ tag);
    const result = await response.json();
    if(response.ok){        
        return result;

    } else{ 
        let error = {status: response.status, msg: "Cann't fetch counters."};
        throw error;
    }

}

async function newCounter(counter) {

    // POST a new counter
    // Request body : counter object
    // Response body: id
    return new Promise((resolve, reject) => {
        fetch('/api/counter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(counter),
        }).then((response) => {
            if (response.ok) {
                    resolve(response.json());

            } else {
                reject({status: response.status, msg: "Database error..."})
            }
        }).catch((err) => { reject({status: err.status, msg: "Server error..."}) }); // connection errors
    });
}

async function deleteCounter(counterId) {

    // DELETE delete a counter
    // Request header : /id
    // Response body: empty
    return new Promise((resolve, reject) => {
        fetch('/api/counter/'+ counterId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if (response.ok) {
                    resolve(response);

            } else {
                reject({status: response.status, msg: "Database error..."})
            }
        }).catch((err) => { reject({status: err.status, msg: "Server error..."}) }); // connection errors
    });
}

async function deleteRequestTypeFromCounter(counterId, request_type) {

    // DELETE delete a request types served by the counter
    // Request header : /id/req_type
    // Response body: empty
    return new Promise((resolve, reject) => {
        fetch('/api/counter/'+ counterId +"/"+ request_type, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if (response.ok) {
                    resolve(response);

            } else {
                reject({status: response.status, msg: "Database error..."})
            }
        }).catch((err) => { reject({status: err.status, msg: "Server error..."}) }); // connection errors
    });
}


async function getAllRequestTypes() {

    // GET all request types list
    // Request body : empty
    // Response body: array of objects
    const response = await fetch('/request_type');
    const result = await response.json();
    if(response.ok){       
        return result;

    } else{ 
        let error = {status: response.status, msg: "Cann't fetch request types list."};
        throw error;
    }
}

async function getServiceTime(tag_name) {

    // GET service time for a specific request type
    // Request header : /tag_name
    // Response body: service time of a request type
    const response = await fetch('/api/request_type/' + tag_name);
    const result = await response.json();
    if(response.ok){        
        return result;

    } else{ 
        let error = {status: response.status, msg: "Cann't fetch request types list."};
        throw error;
    }
}

async function newRequestType(req_type) {

    // POST a new request type
    // Request body : request type object
    // Response body: id
    return new Promise((resolve, reject) => {
        fetch('/api/request_type', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req_type),
        }).then((response) => {
            if (response.ok) {
                    resolve(true);

            } else {
                reject({status: response.status, msg: "Database error..."})
            }
        }).catch((err) => { reject({status: err.status, msg: "Server error..."}) }); // connection errors
    });
}

async function deleteRequestType(tag_name) {

    // DELETE delete a request type
    // Request header : /tag_name
    // Response body: empty
    return new Promise((resolve, reject) => {
        fetch('/api/request_type/' + tag_name, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if (response.ok) {
                    resolve(true);

            } else {
                reject({status: response.status, msg: "Database error..."})
            }
        }).catch((err) => { reject({status: err.status, msg: "Server error..."}) }); // connection errors
    });
}

async function updateServiceTime(tag_name, service_time) {

    // PUT new service time for a given request type
    // Request body : service time object
    // Response body: empty
    return new Promise((resolve, reject) => {
        fetch('/api/request_type/' + tag_name, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({service_time: service_time}),
        }).then((response) => {
            if (response.ok) {
                    resolve(true);

            } else {
                reject({status: response.status, msg: "Database error..."})
            }
        }).catch((err) => { reject({status: err.status, msg: "Server error..."}) }); // connection errors
    });
}

async function updateTagName(tag_name, new_tag_name) {

    // PUT new tag name for a given request type
    // Request header : /current_tag_name
    // Request body : /new_tag_name
    // Response body: message about success
    return new Promise((resolve, reject) => {
        fetch('/api/request_type/change/' + tag_name, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({tag_name: new_tag_name}),
        }).then((response) => {
            if (response.ok) {
                    resolve(true);

            } else {
                reject({status: response.status, msg: "Database error..."})
            }
        }).catch((err) => { reject({status: err.status, msg: "Server error..."}) }); // connection errors
    });
}

async function newTicket(ticket_number , request_type , wait_time) {

    // POST a new ticket
    // Request body : ticket object
    //    object example: {ticket_number : 5 , request_typev: 'shipping' , wait_time : 15}
    // Response body: object : {ticket_number : 5}
    const ticket = {
                    ticket_number : ticket_number , 
                    request_type: request_type , 
                    wait_time : wait_time
                };
    return new Promise((resolve, reject) => {
        fetch('/api/tickets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ticket),
        }).then((response) => {
            if (response.ok) {
                    resolve(response.json());

            } else {
                reject({status: response.status, msg: "Database error..."})
            }
        }).catch((err) => { reject({status: err.status, msg: "Server error..."}) }); // connection errors
    });
}


// TEMPORARY function 
async function getTicket(requestType){
    // Temporary function to test frontend
    // EXPECTED INPUT: integer that corresponds to the index of the request type
    // EXPECTED OUTPUT: integer that corresponds to the number of the ticket generated
    const response = await fetch('/api/tickets', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({request_type: requestType}),
    });
    const result = await response.json();
    if(response.ok){
        return result.id;

    } else{
        let error = {status: response.status, msg: "Cann't fetch counters list."};
        throw error;
    }
}

export default{getAllRequestTypes, getAllCountersList, getRequestTypes, getCountersByRequestType, newCounter,
                deleteCounter, deleteRequestTypeFromCounter, getServiceTime, newRequestType, deleteRequestType,
                updateServiceTime, updateTagName, newTicket, getTicket};