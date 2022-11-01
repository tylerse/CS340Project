export const update = async (e1, e2, e1_id, e2_id) => {
    let response = '';
    switch(e1_id){
        case "CustomerID":
            response = e2_id === "HouseID" ? 
                await fetch(`/customerhouses/${e1[e1_id]}/${e2[e2_id]}`, {
                method: 'POST'
            }) :
                await fetch(`/customercosts/${e1[e1_id]}/${e2[e2_id]}`, {
                method: 'POST'
            });
            console.log(`/customerhouses/${e1[e1_id]}/${e2[e2_id]}`)       
            break;
        default:
            return {"Error":"Could not process request"}
    }

    
    response.ok ? console.log("Posted OK") : console.log("Error updating information") 
    const data = await response.json();
    return data;   
}

export const get = async (type, e_id) => {

    let response = '';
    switch(type){
        case "Houses":
            response = await fetch(`/houses`)
            break;
        case "CustomerHouses":
            response = await fetch(`/customerhouses/${e_id}`)
            break;
        default:
            return {Error: "Could not process request get request"};
    }
    response.ok ? console.log("Posted OK") : console.log("Error getting information from server") 
    const data = await response.json();
    return data[0];
}

export const del = async (type, e1_id, e2_id) => {
    let response = '';
    switch(type){
        case "CustomerHouses":
            response = await fetch(`/customerhouses/${e1_id}/${e2_id}`,{
                method: 'DELETE'
            })
            break;
        default:
            return {Error: "Could not process request get request"};
    }
    response.ok ? console.log("Posted OK") : console.log("Error getting information from server") 
    const data = await response.json();
    return data[0];
}
