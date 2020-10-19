async function getAllRequestTypes() {
    // Temporary function to test frontend
    // EXPECTED OUTPUT: List of objects, each with
    // the integer that identifies the request type ("reqTypeId")
    // and the string with the name of that request type ("reqTypeName")

    return [
        {reqTypeName: "Reqtype 1", reqTypeId: 1},
        {reqTypeName: "Reqtype 2", reqTypeId: 2},
        {reqTypeName: "Reqtype 3", reqTypeId: 3},
        {reqTypeName: "Reqtype 4", reqTypeId: 4},
        {reqTypeName: "Reqtype 5", reqTypeId: 5}
        ];
}

async function getTicket(requestType){
    // Temporary function to test frontend
    // EXPECTED INPUT: integer that corresponds to the index of the request type
    // EXPECTED OUTPUT: integer that corresponds to the number of the ticket generated
    return Math.floor(Math.random() * 100) + 1;
}

export default{getAllRequestTypes, getTicket};