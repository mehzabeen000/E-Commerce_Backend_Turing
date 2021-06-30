const express = require('express');
const router = express.Router();

const knex = require('../models/connect')


require('../routes/department')(knex, router)
require('../routes/categories')(knex, router)
require('../routes/attributes')(knex, router)
require('../routes/product')(knex, router)
require('../routes/customer')(knex,router)


module.exports = router;