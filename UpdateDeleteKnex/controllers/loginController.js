
const login = (req,res)=> {
    res.render("login")
}

const loginApi = (req,res)=> {
    const username = req.body.username
    const password = req.body.password
    const isLoggedIn = tryLogin(username,password)
    if (isLoggedIn) {
        res.send("loggedIn")
    } else {
        res.send('not logged in')
    }
}




const tryLogin = (username, password) => {
    return false
}

module.exports = {
    login,
    loginApi
}