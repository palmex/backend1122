const express = require('express')
const db = require('../db')
var carsRouter = express.Router()
carsRouter.use(express.json())


// GET ALL CARS
carsRouter.get('/all', (request,response)=>{
    console.log('admin header: ', request.headers.admin)
    if (request.headers.admin == 'true'){
        let dbQueryStatement = "SELECT * FROM cars; "
        dbQuery(dbQueryStatement, request, response)
    } else {
        response.status(401).json({"not authorized":"please provider admin credentials"})
    }
})

// INSERT NEW CAR
carsRouter.post('/new', (req,res)=>{
        console.log(req.body)
        let dbQueryStatement = `INSERT INTO cars (make, model, year, odometer) VALUES (
            '${req.body.make}', '${req.body.model}', ${req.body.year}, ${req.body.odometer}) RETURNING *;`
        console.log(dbQueryStatement)
        dbQuery(dbQueryStatement, req, res)
  
})

// UPDATE CAR
carsRouter.put('/update/:carId', (req,res)=>{
    console.log(req.params.carId)
    console.log(req.body)
    let dbQueryStatement = `UPDATE cars SET make='${req.body.make}', model='${req.body.model}'
     , year = ${req.body.year}, odometer =${req.body.odometer}
        WHERE car_id = '${req.params.carId}'
        RETURNING *;`
    console.log(dbQueryStatement)
    dbQuery(dbQueryStatement, req, res)
})

// SELECT SPECIFIC CAR
carsRouter.get('/details/:carId', (req,res)=>{
    console.log(req.params.carId)
    
    let dbQueryStatement = `SELECT * FROM cars
        WHERE car_id = '${req.params.carId}';`
    console.log(dbQueryStatement)
    dbQuery(dbQueryStatement, req, res)
})

// DELETE SPECIFIC CAR
carsRouter.delete('/delete/:carId', (req,res)=>{
    console.log(req.params.carId)
    
    let dbQueryStatement = `DELETE FROM cars
        WHERE car_id = '${req.params.carId}';`
    console.log(dbQueryStatement)
    dbQuery(dbQueryStatement, req, res)
})


const dbQuery = (queryStatement, request, response) => {
    db.query(queryStatement, (error,results)=>{
        if (error){
            response.status(500).json(error)
        }
        result = results.rows
        response.status(200).json(result)
    })
}

module.exports = carsRouter; 

