const { render } = require('ejs');
const express = require('express')
const app = express()
const bcrypt = require("bcrypt")
const saltRounds = 10
const token_secret = "blablabla"
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
app.use(cookieParser())



// Middleware to parse URL-encoded form data for post
app.use(express.urlencoded({ extended: true }));



const usersDB = [{username:"Arya", email:"arya@gmail.com", password: "$2b$10$DZF55nZ7vGh06ByMJuUJ1.N.ijzsSxhkr7MZMB4LtIfcE6rPr0Eha"}]


// set the view engine to ejs
app.set('view engine', 'ejs');




const authenticate = (req,res,next)=> {
    if (req.path === '/login' || req.path === '/signUp') {
        return next()//we want to allow user to see those pages without authentication
    }

    const token = req.cookies.access_token
    // console.log("cookie token is: ", token);
    try {
        const user = jwt.verify(token, token_secret);
        next();
    } catch(err) {
        res.redirect("/login")
    }
}

app.use("/", authenticate)


app.get("/", async (req, res)=> {
    // const encryptedPassword = await bcrypt.hash("1111", saltRounds)
    // console.log(encryptedPassword);
    res.render("welcome")

})

app.get("/signUp", (req,res)=> {
    res.render("signUp")
})

app.get("/login", (req,res)=> {
    res.render("login")
})

//adding user to db
app.post("/signUp", (req,res)=> {
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email
    createUser(username,password,email)

    // const {username,password,email} = req.body
    res.redirect("/login")
})


const createUser = async (username,password,email) =>{
    const encryptedPassword = await bcrypt.hash(password, saltRounds)
    usersDB.push({username,email,password:encryptedPassword})
    console.log(usersDB);
}

app.post("/login", (req,res)=> {
    username = req.body.username
    password = req.body.password
    loginUser(username, password, res)
})


const loginUser = async (username, password, res) => {
    const user = usersDB.find(user => user.username === username)
    if (user) {
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (isPasswordCorrect) {  //user logged in succefully.
            //creating token for the user
            const token = jwt.sign(user, token_secret, { expiresIn: '7s' })
            // console.log("token is: ", token)
            //setting token in the cookie
            res.cookie("access_token", token, {sameSite:"strict", httpOnly:true})
            errorMessage = ""
            res.redirect("/")
        } else {
            errorMessage = "the password is not correct try again"
            res.render("login", { errorMessage })
        }
    } else {
        errorMessage = "no such user try again"
        res.render("login", { errorMessage })
    }
}





const port = 3000
app.listen(port, (err)=> {
    if(!err) {
        console.log("the server is running on localhost:"+port);
    }
})