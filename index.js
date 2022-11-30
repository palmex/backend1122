const express = require('express')
const app = express()
const port = 3000
const db = require('./db')
const carsRouter = require('./routes/cars')

app.use(express.json())
app.use(
    express.urlencoded({extended:true})
)

app.use('/cars', carsRouter)

// This is our first route!
app.get('/welcome', (request,response)=>{
    // console.log(request)
    response.json({"welcome":"Welcome Class of OU-Stellantis Module 3!"})
})

app.post('/echo', (request,response)=>{
    console.log("echo contents: " ,request.body)
    response.json(request.body)
})



app.listen(port, ()=>{
    console.log(`Listening on port localhost:${port}.`)
})

