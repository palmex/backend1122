const express = require('express')
const app = express()
const port = 3000

app.use(express.json())
app.use(
    express.urlencoded({extended:true})
)

// This is our first route!
app.get('/welcome', (request,response)=>{
    // console.log(request)
    response.json({"welcome":"Welcome Class of OU-Stellantis Module 3!"})
})


app.listen(port, ()=>{
    console.log(`Listening on port localhost:${port}.`)
})

