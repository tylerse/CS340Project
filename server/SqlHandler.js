import mysql2 from 'mysql2/promise'

const pool = mysql2.createPool({
    host: 'classmysql.engr.oregonstate.edu',
    user: 'cs340_tylerse',
    password: '5039',
    database: 'cs340_tylerse',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    dateStrings: 'date'
    });

export async function GetAllHouses() {
    try {
        const query = 'SELECT * FROM Houses'
        const result = await pool.query(query)
        return result;
    }
    catch (err) {
        console.log(err)
    }    
};

export async function GetAllCosts() {
    try {
        const query = 'SELECT * FROM Costs'
        const result = await pool.query(query)
        return result;
    }
    catch (err) {
        console.log(err)
    }    
};

export async function GetAllCustomers() {
    try {
        const query = 'SELECT * FROM Customers'
        const result = await pool.query(query)
        return result;
    }
    catch (err) {
        console.log(err)
    }    
};

export async function GetAllInvestors() {
    try {
        const query = 'SELECT * FROM Investors'
        const result = await pool.query(query)
        return result;
    }
    catch (err) {
        console.log(err)
    }    
};

export async function CreateNewCustomer(data){
    try {
        const query = `INSERT INTO Customers (CustomerFirstname, CustomerLastname, Paid, HouseOrdered)
                        VALUES (?,?,?,?,?)`
        const result = await pool.query(query, [
            data["CustomerFirstname"],
            data["CustomerLastname"],
            data["Paid"],
            data["HouseOrdered"]
        ])
        return result;
    }
    catch (err) {
        console.log(err)
        return {"Error": "Error processing request"}
    } 
}

export async function CreateNewHouse(data){
    try {
        const query = `INSERT INTO Houses (HouseSize, PatioUpgrade, GarageUpgrade)
                        VALUES (?,?,?)`
        const result = await pool.query(query, [
            data["HouseSize"],
            data["PatioUpgrade"],
            data["GarageUpgrade"],
        ])
        return result;
    }
    catch (err) {
        console.log(err)
        return {"Error": "Error processing request"}
    } 
}

export async function CreateNewCost(data){
    try {
        const query = `INSERT INTO Costs (CostDescription)
                        VALUES (?)`
        const result = await pool.query(query, [
            data["CostDescription"]
        ])
        return result;
    }
    catch (err) {
        console.log(err)
        return {"Error": "Error processing request"}
    } 
}

export async function UpdateCustomer(id, data){
    try {
        const query = `UPDATE Customers
                        SET CustomerFirstname = ?, CustomerLastname = ?, Paid = ?, HouseOrdered = ?
                        WHERE CustomerID = ?`
        const result = await pool.query(query, [
            data["CustomerFirstname"],
            data["CustomerLastname"],
            data["Paid"],
            data["HouseOrdered"],
            id
        ])
        return result;
    }
    catch (err) {
        console.log(err)
        return {"Error": "Error processing request"}
    } 
}

export async function UpdateHouse(id, data){
    try {
        const query = `UPDATE Houses
                        SET HouseSize = ?, PatioUpgrade = ?, GarageUpgrade = ?
                        WHERE HouseID = ?`
        const result = await pool.query(query, [
            data["HouseSize"],
            data["PatioUpgrade"],
            data["GarageUpgrade"],
            id
        ])
        return result;
    }
    catch (err) {
        console.log(err)
        return {"Error": "Error processing request"}
    } 
}

export async function GetHouseCosts(id){
    try {
        const query = `SELECT HouseCosts.HouseID, HouseCosts.CostID, HouseCosts.Total, Costs.CostDescription FROM HouseCosts
                        JOIN Costs ON HouseCosts.CostID=Costs.CostID
                        WHERE HouseCosts.HouseID = ?`
        const result = await pool.query(query, [id])
        return result;
    }
    catch (err) {
        console.log(err)
    }
}

export async function DeleteCustomer(id){
    try {
        const query = 'DELETE FROM Customers WHERE CustomerID = ?'
        const result = await pool.query(query, [id])
        return result;
    }
    catch (err) {
        console.log(err)
    }
}

export async function GetCustomerHousesByCustomer(id){
    try {
        const query = `SELECT * FROM CustomerHouses
                        JOIN Houses ON CustomerHouses.HouseID=Houses.HouseID
                        WHERE CustomerHouses.CustomerID = ?`
        const result = await pool.query(query, [id])
        return result;
    }
    catch (err) {
        console.log(err)
    }
}

export async function GetCustomerHousesByHouse(id){
    try {
        const query = `SELECT * FROM CustomerHouses
                        JOIN Customers ON CustomerHouses.CustomerID=Customers.CustomerID
                        WHERE CustomerHouses.HouseID = ?`
        const result = await pool.query(query, [id])
        return result;
    }
    catch (err) {
        console.log(err)
    }
}

export async function GetInvestorCostsByCost(id){
    try {
        const query = `SELECT * FROM InvestorCosts
                        JOIN Investors ON InvestorCosts.InvestorID=Investors.InvestorID
                        WHERE InvestorCosts.CostID = ?`
        const result = await pool.query(query, [id])
        return result;
    }
    catch (err) {
        console.log(err)
    }
}

export async function GetInvestorCostsByInvestor(id){
    try {
        const query = `SELECT * FROM InvestorCosts
                        JOIN Costs ON InvestorCosts.CostID=Costs.CostID
                        WHERE InvestorCosts.InvestorID = ?`
        const result = await pool.query(query, [id])
        return result;
    }
    catch (err) {
        console.log(err)
    }
}


export async function GetCustomerCosts(id){
    try {
        const query = `SELECT CustomerCosts.CustomerID, CustomerCosts.CostID, CustomerCosts.Total, Costs.CostDescription FROM CustomerCosts
                        JOIN Costs ON CustomerCosts.CostID=Costs.CostID
                        WHERE CustomerCosts.CustomerID = ?`
        const result = await pool.query(query, [id])
        return result;
    }
    catch (err) {
        console.log(err)
    }
}

export async function UpdateCustomerHouses(id, h_id){
    try {
        const query = `INSERT INTO CustomerHouses (CustomerID, HouseID)
                       VALUES (?, ?)`
        const result = await pool.query(query, [id, h_id])
        return result;
    }
    catch (err) {
        console.log(err)
    }
}


export async function UpdateCustomerCosts(id, h_id, total){
    try {
        const query = `INSERT INTO CustomerCosts (CustomerID, CostID, Total)
                       VALUES (?, ?, ?)`
        const result = await pool.query(query, [id, h_id, total])
        return result;
    }
    catch (err) {
        console.log(err)
    }
}

export async function DeleteCustomerHouses(id, h_id){
    try {
        const query = `DELETE FROM CustomerHouses
                       WHERE CustomerID = ? AND HouseID = ?`
        const result = await pool.query(query, [id, h_id])
        return result;
    }
    catch (err) {
        console.log(err)
    }
}

export async function DeleteCustomerCosts(id, h_id, total){
    try {
        const query = `DELETE FROM CustomerCosts
                       WHERE CustomerID = ? AND CostID = ? AND Total = ?`
        const result = await pool.query(query, [id, h_id, total])
        console.log(result)
        return result;
    }
    catch (err) {
        console.log(err)
    }
}

export async function DeleteInvestorCosts(id, h_id, total){
    try {
        const query = `DELETE FROM InvestorCosts
                       WHERE InvestorID = ? AND CostID = ? AND Total = ?`
        const result = await pool.query(query, [id, h_id, total])
        console.log(result)
        return result;
    }
    catch (err) {
        console.log(err)
    }
}