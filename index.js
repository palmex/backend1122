const express = require('express')
const app = express()
const port = 3000
const db = require('./db')

app.use(express.json())
app.use(
    express.urlencoded({extended:true})
)

// This is our first route!
app.get('/welcome', (request,response)=>{
    // console.log(request)
    response.json({"welcome":"Welcome Class of OU-Stellantis Module 3!"})
})

app.post('/echo', (request,response)=>{
    console.log("echo contents: " ,request.body)
    response.json(request.body)
})

app.get('/dbtest', (request,response)=>{
    db.query("SELECT * FROM cars", (error,results)=>{
        if (error){
            console.log(error)
            response.status(500).json(error)
        }
        result = results.rows
        response.status(200).json(result)
    })
})


app.listen(port, ()=>{
    console.log(`Listening on port localhost:${port}.`)
})

