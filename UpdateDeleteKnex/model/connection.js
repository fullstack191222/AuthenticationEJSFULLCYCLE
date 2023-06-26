require('dotenv').config()

const mySql2 = require('mysql2')

const knex = require("knex").knex({
    client: 'mysql2',
    connection: {
      host : process.env.HOST,
      port : process.env.DB_PORT,
      user : 'root',
      password : process.env.PASSWORD,
      database : process.env.DATABASE
    }
  });


  module.exports = {
    knex
  }
