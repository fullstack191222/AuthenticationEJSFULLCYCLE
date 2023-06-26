const express = require("express")
const router = express.Router()

const { getAirlineById,
    addAirline,
    updateAirline,
    deleteAirline, getAirlines} = require("../controllers/airlineController")


//Airline APIS
router.get("/getAirlines", getAirlines)
router.get("/getAirlineById/:id", getAirlineById)
router.post("/addAirline",addAirline )
router.put("/updateAirline", updateAirline)
router.delete("/deleteAirline/:id",deleteAirline)





module.exports = router