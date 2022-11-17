import mysql2 from 'mysql2/promise'

const pool = mysql2.createPool({
    host: 'sql.freedb.tech',
    user: 'freedb_seanpaultyler',
    password: 'W!ZmtQnVgxDy%@5',
    database: 'freedb_cs340database',
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
        const query = `SELECT * FROM Costs`
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

export async function GetAllEmployees() {
    try {
        const query = 'SELECT * FROM Employees'
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
                        VALUES (?,?,?,?)`
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

export async function CreateNewInvestor(data){
    try {
        const query = `INSERT INTO Investors (InvestorName, InvestorBirthday, InvestAmount, InvestName, Profit, ProfitName)
                        VALUES (?,?,?,?,?,?)`
        const result = await pool.query(query, [
            data["InvestorName"],
            data["InvestorBirthday"],
            data["InvestAmount"],
            data["InvestName"],
            data["Profit"],
            data["ProfitName"]
        ])
        return result;
    }
    catch (err) {
        console.log(err)
        return {"Error": "Error processing request"}
    } 
}

export async function CreateNewEmployee(data){
    try {
        const query = `INSERT INTO Employees (EmployeeFirstname, EmployeeLastname, EmployeeSalary, EmployeeInsurance, EmployeeBirthday, Employed)
                        VALUES (?,?,?,?,?,?)`
        const result = await pool.query(query, [
            data["EmployeeFirstname"],
            data["EmployeeLastname"],
            data["EmployeeSalary"],
            data["EmployeeInsurance"],
            data["EmployeeBirthday"],
            data["Employed"]
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

export async function UpdateCost(id, data){
    try {
        const query = `UPDATE Costs
                        SET CostDescription = ?
                        WHERE CostID = ?`
        const result = await pool.query(query, [
            data["CostDescription"],
            id
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

export async function UpdateInvestor(id, data){
    try {
        const query = `UPDATE Investors
                        SET InvestorName = ?, InvestorBirthday = ?, InvestAmount = ?, InvestName = ?, Profit = ?, ProfitName = ?
                        WHERE InvestorID = ?`
        const result = await pool.query(query, [
            data["InvestorName"],
            data["InvestorBirthday"],
            data["InvestAmount"],
            data["InvestName"],
            data["Profit"],
            data["ProfitName"],
            id
        ])
        return result;
    }
    catch (err) {
        console.log(err)
        return {"Error": "Error processing request"}
    } 
}

export async function UpdateEmployee(id, data){
    try {
        const query = `UPDATE Employees
                        SET EmployeeFirstname = ?, EmployeeLastname = ?, EmployeeSalary = ?, EmployeeBirthday = ?, EmployeeInsurance = ?, Employed = ?
                        WHERE EmployeeID = ?`
        const result = await pool.query(query, [
            data["EmployeeFirstname"],
            data["EmployeeLastname"],
            data["EmployeeSalary"],
            data["EmployeeBirthday"],
            data["EmployeeInsurance"],
            data["Employed"],
            id
        ])
        return result;
    }
    catch (err) {
        console.log(err)
        return {"Error": "Error processing request"}
    } 
}

export async function GetHouseCostsByHouse(id){
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

export async function DeleteHouse(id){
    try {
        const query = 'DELETE FROM Houses WHERE HouseID = ?'
        const result = await pool.query(query, [id])
        return result;
    }
    catch (err) {
        console.log(err)
    }
}

export async function DeleteInvestor(id){
    try {
        const query = 'DELETE FROM Investors WHERE InvestorID = ?'
        const result = await pool.query(query, [id])
        return result;
    }
    catch (err) {
        console.log(err)
    }
}

export async function DeleteEmployee(id){
    try {
        const query = 'DELETE FROM Employees WHERE EmployeeID = ?'
        const result = await pool.query(query, [id])
        return result;
    }
    catch (err) {
        console.log(err)
    }
}


export async function InsertInvestorCosts(id, i_id, total){
    try {
        const query = `INSERT INTO InvestorCosts (InvestorID, CostID, Total)
                        VALUES (?,?,?)`
        const result = await pool.query(query, [id, i_id, total])
        return result;
    }
    catch (err) {
        console.log(err)
    }
}

export async function InsertEmployeeCosts(id, i_id, total){
    try {
        const query = `INSERT INTO EmployeeCosts (EmployeeID, CostID, Total)
                        VALUES (?,?,?)`
        const result = await pool.query(query, [id, i_id, total])
        return result;
    }
    catch (err) {
        console.log(err)
    }
}

export async function InsertHouseCosts(id, i_id, total){
    try {
        const query = `INSERT INTO HouseCosts (HouseID, CostID, Total)
                        VALUES (?,?,?)`
        const result = await pool.query(query, [id, i_id, total])
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

export async function GetEmployeeCostsByCost(id){
    try {
        const query = `SELECT * FROM EmployeeCosts
                        JOIN Employees ON EmployeeCosts.EmployeeID=Employees.EmployeeID
                        WHERE EmployeeCosts.CostID = ?`
        const result = await pool.query(query, [id])
        return result;
    }
    catch (err) {
        console.log(err)
    }
}

export async function GetEmployeeCostsByEmployee(id){
    try {
        const query = `SELECT * FROM EmployeeCosts
                        JOIN Costs ON EmployeeCosts.CostID=Costs.CostID
                        WHERE EmployeeCosts.EmployeeID = ?`
        const result = await pool.query(query, [id])
        return result;
    }
    catch (err) {
        console.log(err)
    }
}


export async function GetCustomerCostsByCost(id){
    try {
        const query = `SELECT * FROM CustomerCosts
                        JOIN Customers ON CustomerCosts.CustomerID=Customers.CustomerID
                        WHERE CustomerCosts.CostID = ?`
        const result = await pool.query(query, [id])
        return result;
    }
    catch (err) {
        console.log(err)
    }
}

export async function GetCustomerCostsByCustomer(id){
    try {
        const query = `SELECT * FROM CustomerCosts
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

export async function DeleteEmployeeCosts(id, h_id, total){
    try {
        const query = `DELETE FROM EmployeeCosts
                       WHERE EmployeeID = ? AND CostID = ? AND Total = ?`
        const result = await pool.query(query, [id, h_id, total])
        console.log(result)
        return result;
    }
    catch (err) {
        console.log(err)
    }
}

export async function DeleteHouseCosts(id, h_id, total){
    try {
        const query = `DELETE FROM HouseCosts
                       WHERE HouseID = ? AND CostID = ? AND Total = ?`
        const result = await pool.query(query, [id, h_id, total])
        console.log(result)
        return result;
    }
    catch (err) {
        console.log(err)
    }
}