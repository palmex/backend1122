const express = require('express')
const app = express()
const port = 3000
const db = require('./db')
const cors = require('cors')
const carsRouter = require('./routes/cars')
const usersRouter = require('./routes/users')

app.use(cors())
app.use(express.json())
app.use(
    express.urlencoded({extended:true})
)

app.use('/cars', carsRouter)
app.use('/users', usersRouter)

// This is our first route!
app.get('/welcome', (request,response)=>{
    // console.log(request)
    response.json({"welcome":"Welcome Class of OU-Stellantis Module 3!"})
})

app.post('/echo', (request,response)=>{
    console.log("echo contents: " ,request.body)
    response.json(request.body)
})

app.get('/callback', (req,res) => {

    // BEFORE QUERY
    console.log("before DB callback")


    // db.query(param1, param2) | param1 = sqlQuery & param2 = callbackFcn
    // result, error = db.query(param1)
    // console.log(result | error)
    // DO SOMETHING WITH RESULT ONCE IT'S AVAILABLE 

    db.query("SELECT * FROM cars; ", (error,results)=>{
        console.log("inside DB callback")
        if (error){
            res.status(500).json(error)
        } else {
            result = results.rows
            res.status(200).json(result)
        }
        console.log("inside2 DB callback")
    })

    // IN THE MEANTIME WHILE WAITING FOR QUERY
    console.log("after DB callback")
})



app.listen(port, ()=>{
    console.log(`Listening on port localhost:${port}.`)
})

