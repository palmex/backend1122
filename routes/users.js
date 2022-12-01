const express = require('express')
const db = require('../db')
var usersRouter = express.Router()
usersRouter.use(express.json())
 
// GET ALL userS
usersRouter.get('/all', (request,response)=>{
    console.log('admin header: ', request.headers.admin)
    if (request.headers.admin == 'true'){
        let dbQueryStatement = "SELECT * FROM users; "
        dbQuery(dbQueryStatement, request, response)
    } else {
        response.status(401).json({"not authorized":"please provider admin credentials"})
    }
})
 
// INSERT NEW user
usersRouter.post('/new', (req,res)=>{
        console.log(req.body)
        let dbQueryStatement = `INSERT INTO users (name, email, phone) VALUES (
            '${req.body.name}', '${req.body.email}', ${req.body.phone_no}) RETURNING *;`
        console.log(dbQueryStatement)
        dbQuery(dbQueryStatement, req, res)
  
})
 
// UPDATE user
usersRouter.put('/update/:userId', (req,res)=>{
    console.log(req.params.userId)
    console.log(req.body)
    let dbQueryStatement = `UPDATE users SET name='${req.body.name}', email='${req.body.email}'
     , phone_no = ${req.body.phone_no}
        WHERE user_id = '${req.params.userId}'
        RETURNING *;`
    console.log(dbQueryStatement)
    dbQuery(dbQueryStatement, req, res)
})
 
// SELECT SPECIFIC user
usersRouter.get('/details/:userId', (req,res)=>{
    console.log(req.params.userId)
    
    let dbQueryStatement = `SELECT * FROM users
        WHERE user_id = '${req.params.userId}';`
    console.log(dbQueryStatement)
    dbQuery(dbQueryStatement, req, res)
})
 
// DELETE SPECIFIC user
usersRouter.delete('/delete/:userId', (req,res)=>{
    console.log(req.params.userId)
    
    let dbQueryStatement = `DELETE FROM users
        WHERE user_id = '${req.params.userId}';`
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
 
module.exports = usersRouter;