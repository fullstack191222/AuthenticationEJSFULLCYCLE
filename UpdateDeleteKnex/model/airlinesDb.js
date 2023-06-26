
const {knex} = require("./connection") 

//update airlines
const updateAirline = async (airline)=> {
    const rowsUpdate = await knex("airlines").where({Id : airline.Id}).update(airline)
    return rowsUpdate
}

//get all airlines
const getAirlines = async ()=> {
    const result = await knex('airlines').select()
    return result
}

//get airline by id knex
const getAirlineById = async (id) => {
    const result = await knex.select().from('airlines').where({Id: id})
    return result     
}


const getAirlineById2 = async (id) => {
    const result = await knex.raw("select * from airliness where id = ? ", [id])
    return result[0]     
}

//addAirline knex
const addAirline = async (airline) => {
    const result = await knex("airlines").insert(airline)
    return result
}

//delete from airlines.
const deleteAirline = async(id) => {
    const result = await knex("airlines").where({Id: id}).del()
    return result
}

module.exports = {
    updateAirline,
    deleteAirline,
    addAirline,
    getAirlineById,
    getAirlineById2,
    getAirlines
}