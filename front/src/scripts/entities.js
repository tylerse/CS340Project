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
                response = await fetch(`/customercosts/${e1[e1_id]}/${e2[e2_id]}/${total}`, {
                method: 'POST'
                });
            }      
            break;
        case "HouseID":
            console.log(`/housecosts/${e1[e1_id]}/${e2[e2_id]}/${total}`)
            if(e2_id === "CostID"){
                
                response = await fetch(`/housecosts/${e1[e1_id]}/${e2[e2_id]}/${total}`, {
                    method: 'POST'
                    });
            }    
            break;
        case "InvestorID":
            if(e2_id === "CostID"){
                response = await fetch(`/investorcosts/${e1[e1_id]}/${e2[e2_id]}/${total}`, {
                    method: 'POST'
                    });
            } 
            break;
        case "EmployeeID":
            if(e2_id === "CostID"){
                response = await fetch(`/employeecosts/${e1[e1_id]}/${e2[e2_id]}/${total}`, {
                    method: 'POST'
                    });
            } 
            break;
        default:
            return {"Error":"Could not process request"}
    }

    // try to json if appropriate
    try {
        const data = await response.json();
        return data;   
    }
    // else return object as is
    catch {
        return response;
    }
    
    
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
    response.ok ? console.log("Fetch OK") : console.log("Error getting information from server") 
    const data = await response.json();
    return data[0];
}

export const del = async (type, e1_id, e2_id, total) => {
    let response = '';
    switch(type){
        case "Customers":
            response = await fetch(`/customer/${e1_id}`,{
                method: 'DELETE'
            })
            break;
        case "Costs":
            response = await fetch(`/cost/${e1_id}`,{
            method: 'DELETE'
            })
        break;
        case "Investors":
            response = await fetch(`/investor/${e1_id}`,{
                method: 'DELETE'
            })
        break;
        case "Houses":
            response = await fetch(`/house/${e1_id}`,{
            method: 'DELETE'
            })
        break;
        case "Employees":
            response = await fetch(`/employee/${e1_id}`,{
            method: 'DELETE'
            })
        break;
        case "CustomerHouses":
            response = await fetch(`/customerhouses/${e1_id}/${e2_id}`,{
                method: 'DELETE'
            })
            break;
        case "CustomerCosts":
            response = await fetch(`/customercosts/${e1_id}/${e2_id}/${total}`,{
                method: 'DELETE'
            })
            break;
        case "InvestorCosts":
            console.log(`total ${total}`)
            response = await fetch(`/investorcosts/${e1_id}/${e2_id}/${total}`,{
                method: 'DELETE'
            })
            break;
        case "EmployeeCosts":
            response = await fetch(`/employeecosts/${e1_id}/${e2_id}/${total}`,{
                method: 'DELETE'
            })
        case "HouseCosts":
            response = await fetch(`/housecosts/${e1_id}/${e2_id}/${total}`,{
                method: 'DELETE'
            })
            break;
        default:
            return {Error: "Could not process request get request"};
    }
    //response.ok ? console.log("Posted OK") : console.log("Error getting information from server") 
    const data = await response.json();
    return data[0];
}

export const put = async (type, e_id, data) => {
    let response = '';
    switch(type){
        case "Customers":
            response = await fetch(`/customer/${e_id}`,{
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                }       
            })
            break;
        case "Investors":
            response = await fetch(`/investor/${e_id}`,{
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                }       
            })
            break;
        case "Houses":
            response = await fetch(`/house/${e_id}`,{
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                }       
            })
            break;
        case "Costs":
            response = await fetch(`/cost/${e_id}`,{
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                }       
            })
            break;
        case "Employees":
            response = await fetch(`/employee/${e_id}`,{
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                }       
            })
            break;
        default:
            return {Error: "Could not process request get request"};
    }
    response.ok ? console.log("Posted OK") : console.log("Error getting information from server") 
    try {
        const data = await response.json();
        return data[0];   
    }
    // else return object as is
    catch {
        return response;
    }
}
