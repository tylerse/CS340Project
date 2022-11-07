import express, { response } from 'express';
import * as sql from './SqlHandler.js'
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
const port = process.env.PORT || 3030;

app.use(express.json())
app.use(express.urlencoded({
   extended: true
}));



// Define a route handler for HTTP GET requests
app.use(express.static(path.join(__dirname ,'public')))


app.get('/' , function(req,res) {
  res.sendFile(path.join(__dirname, "public", "index.html"))
})
console.log(__dirname ,'/' ,'public')


// Cost REST =================================================

app.get("/costs", function (req, res) {
  console.log("Received request for all costs.")
  sql.GetAllCosts()
    .then( response => {
      res.send(response)
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
})

app.post("/cost", function(req, res) {
  console.log("Received new cost information.")
  console.log(req.body)
  const response = sql.CreateNewCost(req.body);
  res.send(response);
})


//============================================================
// Customer REST

app.get("/customers", function (req, res) {
  console.log("Received request for all customers.")
  sql.GetAllCustomers()
    .then( response => {
      res.send(response)
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
})

app.post("/customer", function(req, res) {
  console.log("Received new customer information.")
  console.log(req.body)
  const response = sql.CreateNewCustomer(req.body);
  res.send(response);
})

app.put("/customer/:id", function(req, res) {
  const id = req.params.id
  console.log("Received updated customer information.")
  console.log(req.body)
  const response = sql.UpdateCustomer(id, req.body);
  res.send(response);
})

app.delete("/customer/:id", function (req, res) {
 const id = req.params.id
  console.log(`Receieved request to delete customer with ID ${id}`)
  sql.DeleteCustomer(id)
  .then(response => {
    console.log(response);
    res.sendStatus(200);
  })
  .catch(err => {
    console.log(err);
    res.sendStatus(500);
  })
})

// HOUSE REST ===============================================================================

app.get("/houses", function (req, res) {
  console.log("received request for all houses.")
  // Make a request
  sql.GetAllHouses()
    .then(response => {
      // send the collected data back to the client-side DataTable
      res.send(
        response
      )
      console.log(response)
    })
    .catch(function (error) {
       // handle error
       console.log(error);
       res.json({"error": error});
    })
});

app.post("/house", function(req, res) {
  console.log("Received new house information.")
  console.log(req.body)
  const response = sql.CreateNewHouse(req.body);
  res.send(response);
})

app.put("/house/:id", function(req, res) {
  const id = req.params.id
  console.log("Received updated house information.")
  console.log(req.body)
  const response = sql.UpdateHouse(id, req.body);
  res.send(response);
})

app.get("/housecosts/", function (req, res) {
  const id = req.query.HouseID
  console.log(`Received request for Costs related to house ID #${id}`)
  sql.GetHouseCostsByHouse(id)
    .then( response => {
      res.send(response)
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
})

app.delete("/housecosts/:id/:h_id/:total", function (req, res) {
  const id = req.params.id
  const h_id = req.params.h_id
  const total = req.params.total
  console.log(`Received delete request for house #${id} and cost id #${h_id} and total ${total}`)
  sql.DeleteHouseCosts(id, h_id, total)
    .then( response => {
      res.send(response)
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
})

app.post("/housecosts/:id/:i_id/:total", function (req, res) {
  const id = req.params.id
  const i_id = req.params.i_id
  const total = req.params.total
  console.log(`Received post request for house #${id} and cost id #${i_id} and total ${total}`)
  sql.InsertHouseCosts(id, i_id, total)
    .then( response => {
      res.send(response)
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
})


// Investor REST =======================================================================

app.get("/investors", function (req, res) {
  console.log("Received request for all investors.")
  // Make a request
  sql.GetAllInvestors()
    .then(response => {
      // send the collected data back to the client-side DataTable
      res.send(
        response
      )
      console.log(response)
    })
    .catch(function (error) {
       // handle error
       console.log(error);
       res.json({"error": error});
    })
});

app.put("/investor/:id", function(req, res) {
  const id = req.params.id
  console.log("Received updated investor information.")
  console.log(req.body)
  const response = sql.UpdateInvestor(id, req.body);
  res.send(response);
})

app.get("/investorcosts/", function (req, res) {

  const id = req.query.InvestorID
  const cid = req.query.CostID

  if(id !== undefined){
    console.log(`Received request for Costs related to Investor ID #${id}`)
    sql.GetInvestorCostsByInvestor(id)
      .then( response => {
        res.send(response)
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
     }) 
    
  }
  else {
    console.log(`Received request for Investors related to Cost ID #${cid}`)
    sql.GetInvestorCostsByCost(cid)
      .then( response => {
        res.send(response)
        console.log(response)
      })
      .catch(function (error) { 
        console.log(error)
     })   
     
  }
  
})

app.post("/investorcosts/:id/:i_id/:total", function (req, res) {
  const id = req.params.id
  const i_id = req.params.i_id
  const total = req.params.total
  console.log(`Received post request for investor #${id} and cost id #${i_id} and total ${total}`)
  sql.InsertInvestorCosts(id, i_id, total)
    .then( response => {
      res.send(response)
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
})

app.delete("/investorcosts/:id/:h_id/:total", function (req, res) {
  const id = req.params.id
  const h_id = req.params.h_id
  const total = req.params.total
  console.log(`Received delete request for investor #${id} and cost id #${h_id} and total ${total}`)
  sql.DeleteInvestorCosts(id, h_id, total)
    .then( response => {
      res.send(response)
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
})

// EMPLOYEE REST =====================================================================


app.get("/employees", function (req, res) {
  console.log("Received request for all employees.")
  // Make a request
  sql.GetAllEmployees()
    .then(response => {
      // send the collected data back to the client-side DataTable
      res.send(
        response
      )
      console.log(response)
    })
    .catch(function (error) {
       // handle error
       console.log(error);
       res.json({"error": error});
    })
});

app.put("/employee/:id", function(req, res) {
  const id = req.params.id
  console.log("Received updated employee information.")
  console.log(req.body)
  const response = sql.UpdateEmployee(id, req.body);
  res.send(response);
})

app.get("/employeecosts/", function (req, res) {

  const id = req.query.EmployeeID
  const cid = req.query.CostID

  if(id !== undefined){
    console.log(`Received request for Costs related to Employee ID #${id}`)
    
    sql.GetEmployeeCostsByEmployee(id)
      .then( response => {
        res.send(response)
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
     }) 
    
  }
  else {
    console.log(`Received request for Employees related to Cost ID #${cid}`)
    sql.GetEmployeeCostsByCost(cid)
      .then( response => {
        res.send(response)
        console.log(response)
      })
      .catch(function (error) { 
        console.log(error)
     })
  }
  
})

app.post("/employeecosts/:id/:i_id/:total", function (req, res) {
  const id = req.params.id
  const i_id = req.params.i_id
  const total = req.params.total
  console.log(`Received post request for employee #${id} and cost id #${i_id} and total ${total}`)
  sql.InsertEmployeeCosts(id, i_id, total)
    .then( response => {
      res.send(response)
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
})


app.delete("/employeecosts/:id/:h_id/:total", function (req, res) {
  const id = req.params.id
  const h_id = req.params.h_id
  const total = req.params.total
  console.log(`Received delete request for employee #${id} and cost id #${h_id} and total ${total}`)
  sql.DeleteEmployeeCosts(id, h_id, total)
    .then( response => {
      res.send(response)
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
})

// CUSTOMER HOUSES

app.get("/customerhouses/", function (req, res) {

  const id = req.query.HouseID
  const cid = req.query.CustomerID

  if(id !== undefined){
    console.log(`Received request for Customers related to House ID #${id}`)
    sql.GetCustomerHousesByHouse(id)
      .then( response => {
        res.send(response)
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
     })
  }
  else {
    console.log(`Received request for Houses related to Customer ID #${cid}`)
    sql.GetCustomerHousesByCustomer(cid)
      .then( response => {
        res.send(response)
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
     }) 
  }
  
})

app.post("/customerhouses/:id/:h_id", function (req, res) {
  const id = req.params.id
  const h_id = req.params.h_id
  console.log(`Received post request for customer #${id} and house id #${h_id}`)
  sql.UpdateCustomerHouses(id, h_id)
    .then( response => {
      res.send(response)
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
})

app.delete("/customerhouses/:id/:h_id", function (req, res) {
  const id = req.params.id
  const h_id = req.params.h_id
  console.log(`Received delete request for customer #${id} and house id #${h_id}`)
  sql.DeleteCustomerHouses(id, h_id)
    .then( response => {
      res.send(response)
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
})

// CUSTOMER COSTS

app.get("/customercosts/", function (req, res) {
  const id = req.query.CostID
  const cid = req.query.CustomerID

  if(id !== undefined){
    console.log(`Received request for Customers related to Cost ID #${id}`)
    sql.GetCustomerCostsByCost(id)
      .then( response => {
        res.send(response)
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
     })
  }
  else {
    console.log(`Received request for Costs related to Customer ID #${cid}`)
    sql.GetCustomerCostsByCustomer(cid)
      .then( response => {
        res.send(response)
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
     }) 
  }
})

app.post("/customercosts/:id/:h_id/:total", function (req, res) {
  const id = req.params.id
  const h_id = req.params.h_id
  const total = req.params.total
  console.log(`Received post request for customer #${id} and cost id #${h_id}`)
  sql.UpdateCustomerCosts(id, h_id, total)
    .then( response => {
      console.log(response)
      res.send(response)
    })
    .catch(function (error) {
      console.log(error)
    })
})

app.delete("/customercosts/:id/:h_id/:total", function (req, res) {
  const id = req.params.id
  const h_id = req.params.h_id
  const total = req.params.total
  console.log(`Received delete request for customer #${id} and cost id #${h_id} and total ${total}`)
  sql.DeleteCustomerCosts(id, h_id, total)
    .then( response => {
      res.send(response)
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
})


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})