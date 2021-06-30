const knex = require("knex")({
    client: "mysql",
    connection: {
        host: "localhost",
        user: "root",
        password: "Mehzabeen@123",
        database: "tshirtshop"
    }
})

module.exports = knex;



