import express, { response } from 'express';
import * as sql from './SqlHandler.js'

const app = express()
const port = 8000

app.use(express.json())
app.use(express.urlencoded({
   extended: true
}));

// Define a route handler for HTTP GET requests
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

// CUSTOMER HOUSES

app.get("/customerhouses/:id", function (req, res) {
  const id = req.params.id
  console.log(`Received request for Houses related to Customer ID #${id}`)
  sql.GetCustomerHouses(id)
    .then( response => {
      res.send(response)
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
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



app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})