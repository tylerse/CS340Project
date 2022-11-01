import mysql2 from 'mysql2/promise'

const pool = mysql2.createPool({
    host: 'classmysql.engr.oregonstate.edu',
    user: 'cs340_tylerse',
    password: '5039',
    database: 'cs340_tylerse',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    timezone: 'Z'
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

export async function GetAllCustomers() {
    try {
        const query = 'SELECT * FROM Customers'
        const result = await pool.query(query)
        return result[0];
    }
    catch (err) {
        console.log(err)
    }    
};

export async function CreateNewCustomer(data){
    try {
        const query = `INSERT INTO Customers (CustomerFirstname, CustomerLastname, OpenPayment, Paid, HouseOrdered)
                        VALUES (?,?,?,?,?)`
        const result = await pool.query(query, [
            data["CustomerFirstname"],
            data["CustomerLastname"],
            data["OpenPayment"],
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

export async function UpdateCustomer(id, data){
    try {
        const query = `UPDATE Customers
                        SET CustomerFirstname = ?, CustomerLastname = ?, OpenPayment = ?, Paid = ?, HouseOrdered = ?
                        WHERE CustomerID = ?`
        const result = await pool.query(query, [
            data["CustomerFirstname"],
            data["CustomerLastname"],
            data["OpenPayment"],
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

export async function GetCustomerHouses(id){
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