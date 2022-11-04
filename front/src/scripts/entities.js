export const update = async (e1, e2, e1_id, e2_id, total) => {
    let response = '';
    switch(e1_id){
        case "CustomerID":
            if(e2_id === "HouseID") {
                response = await fetch(`/customerhouses/${e1[e1_id]}/${e2[e2_id]}`, {
                    method: 'POST'
                }) 
            } 
            if(e2_id === "CostID") {
                await fetch(`/customercosts/${e1[e1_id]}/${e2[e2_id]}/${total}`, {
                method: 'POST'
                });
            }      
            break;
        case "HouseID":
            if(e2_id === "CostID"){
                await fetch(`/housecosts/${e1[e1_id]}/${e2[e2_id]}/${total}`, {
                    method: 'POST'
                    });
            }    
            break;
        case "InvestorID":
            if(e2_id === "CostID"){
                await fetch(`/investorcosts/${e1[e1_id]}/${e2[e2_id]}/${total}`, {
                    method: 'POST'
                    });
            } 
            break;
        case "EmployeeID":
            if(e2_id === "CostID"){
                await fetch(`/employeecosts/${e1[e1_id]}/${e2[e2_id]}/${total}`, {
                    method: 'POST'
                    });
            } 
            break;
        default:
            return {"Error":"Could not process request"}
    }

    console.log(response);
    response.ok ? console.log("Posted OK") : console.log("Error updating information") 
    const data = await response.json();
    return data;   
}

export const get = async (type, e_id) => {

    let response = '';
    switch(type){
        case "Customers":
            response = await fetch(`/customers`)
        break;
        case "Houses":
            response = await fetch(`/houses`)
            break;
        case "Costs":
            response = await fetch(`/costs`)
            break;
        case "Investors":
            response = await fetch(`/investors`)
            break;
        case "Employees":
            response = await fetch(`/employees`)
            break;
        case "EmployeeCosts":
            response = await fetch(`/employeecosts/?${e_id}`)
            break;
        case "InvestorCosts":
            response = await fetch(`/investorcosts/?${e_id}`)
            break;
        case "CustomerHouses":
            response = await fetch(`/customerhouses/?${e_id}`)
            break;
        case "CustomerCosts":
            response = await fetch(`/customercosts/?${e_id}`)
            break;
        case "HouseCosts":
            response = await fetch(`/housecosts/?${e_id}`)
            break;
        default:
            return {Error: "Could not process request get request"};
    }
    response.ok ? console.log("Posted OK") : console.log("Error getting information from server") 
    const data = await response.json();
    return data[0];
}

export const del = async (type, e1_id, e2_id, total) => {
    let response = '';
    switch(type){
        case "CustomerHouses":
            response = await fetch(`/customerhouses/${e1_id}/${e2_id}`,{
                method: 'DELETE'
            })
            break;
        case "CustomerCosts":
            response = await fetch(`/customercosts/${e1_id}/${e2_id}/${total}`,{
                method: 'DELETE'
            })
        case "InvestorCosts":
            response = await fetch(`/investorcosts/${e1_id}/${e2_id}/${total}`,{
                method: 'DELETE'
            })
        case "EmployeeCosts":
            response = await fetch(`/employeecosts/${e1_id}/${e2_id}/${total}`,{
                method: 'DELETE'
            })
        default:
            return {Error: "Could not process request get request"};
    }
    response.ok ? console.log("Posted OK") : console.log("Error getting information from server") 
    const data = await response.json();
    return data[0];
}
