// const {updateAirline:updateAirlineDB,deleteAirline:deleteAirlineDB
//     ,addAirline:addAirlineDB,
//     getAirlineById:getAirlineByIdDB
//     ,getAirlineById2:getAirlineById2DB} = require("./model/airlinesDb")



const airlinesDbFunctions = require("../model/airlinesDb")

const getAirlines = async (req,res)=> {
    const airlines = await airlinesDbFunctions.getAirlines()
    // res.json(result)
    res.render('airlines', {airlines})
}


const getAirlineById = async (req,res) => {
   
        const id = req.params.id
        const result = await airlinesDbFunctions.getAirlineById2(id)
        res.send(result)
  
}


const addAirline = async (req,res)=> {
    try {
        const newAirline = req.body
        const result = await airlinesDbFunctions.addAirline(newAirline)
        res.send(result)
    } catch(err) {
        res.send(err)
    }
}

const updateAirline = async (req, res)=> {
    try {
        const updatedAirline = req.body
        const result = await airlinesDbFunctions.updateAirline(updatedAirline)
        res.json(result)
    } catch (err) {
        res.status(500).send(err)
    }
}


const deleteAirline = async (req,res)=> {
    try {
        const id = req.params.id
        const result = await airlinesDbFunctions.deleteAirline(id)
        res.json(result)
    } catch (err) {
        res.status(500).send(err)
    }
}

module.exports = {
    getAirlineById,
    addAirline,
    updateAirline,
    deleteAirline,
    getAirlines
}