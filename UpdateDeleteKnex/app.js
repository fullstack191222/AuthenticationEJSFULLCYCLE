const express = require('express')



const airlineRouter = require("./routers/airlineRouter")
const {login,
    loginApi} = require("./controllers/loginController")

//const bodyParser = require("body-parser")
const app = express()
app.use(express.json())
//teaching app to take post requests from FORMS
app.use(express.urlencoded({extended: true})) 


//router definition
app.use("/api/airline", airlineRouter)
// app.use("/api/tickets", ticketRouter)



// Set EJS as the view engine
app.set('view engine', 'ejs');

app.get("/test", (req,res) => {
    getet = dfdsf
}) 


//Login APIS
app.get("/login",login )
app.post("/tryLogin",loginApi)



app.get("/", (req,res)=> {
    res.send("hello world")
})




// //error handling midlleware
// router.use((err, req, res, next) => {
//     console.error(err.stack)
//     res.status(500).send('Something broke!')
// })
  


const port = 4001
app.listen(port , (err)=>{
    if (err) {
        console.log(err);
    } else {
        console.log("app is running on port", port);
    }
})