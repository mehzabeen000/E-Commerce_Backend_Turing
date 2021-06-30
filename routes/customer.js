const jwt = require('jsonwebtoken');
module.exports = (knex, routes) => {
    //Updating a customer by using cookie and token
    routes.put('/customer', (req, res) => {
        var token = req.headers.cookie.split(" ")
        token = (token[0]).slice(0, -10)
        jwt.verify(token, 'mehzabeen', (err, data) => {
            if (!err) {
                knex.from('customer')
                    .where("customer_id", data.customer_id)
                    .update({
                        name: req.body.name,
                        password: req.body.password,
                        email: req.body.email,
                        address_1: req.body.address_1,
                        address_2: req.body.address_2,
                        city: req.body.city,
                        region: req.body.region,
                        postal_code: req.body.postal_code,
                        country: req.body.country,
                        shipping_region_id: req.body.shipping_region_id,
                        credit_card: req.body.credit_card,
                        day_phone: req.body.day_phone,
                        eve_phone: req.body.eve_phone,
                        mob_phone: req.body.mob_phone
                    })
                    .then(() => {
                        res.send('Updated Successfully')
                    }).catch((err) => {
                        res.send(err)
                    })
            } else {
                res.send(err.message)
            }
        })
    })

    // Getting customer detail by customer Id. The customer is getting by Token.
    routes.get('/customer', (req, res) => {
        var token = req.headers.cookie.split(" ")
        token = (token[0]).slice(0, -10)
        jwt.verify(token, 'mehzabeen', (err, data) => {
            if (!err) {
                knex.from('customer')
                    .select('*')
                    .where('customer.customer_id', data.customer_id)
                    .then((data) => {
                        delete data[0].password
                        res.send(data)
                    }).catch((err) => {
                        res.send(err)
                    })
            } else {
                res.send(err)
            }
        })
    })

    // Register a customer
    routes.post('/customer', (req, res) => {
        var email = req.body.email
        var password = req.body.password
        knex.select('*')
            .from('customer')
            .where({ "email": email, "password": password })
            .then((data) => {
                if (data.length < 1) {
                    knex('customer').insert({ name: req.body.name, email: req.body.email, password: req.body.password, city: req.body.city, country: req.body.country })
                        .then((user) => {
                            res.send("Register Successfully")
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                }
                else {
                    res.send({ "exist": "this user alredy exists.." })
                }
            })
            .catch((err) => {
                console.log(err);
            })
    })


    //Customer Logging
    routes.post('/customer/login', (req, res) => {
        knex.select('email')
            .from('customer').havingIn('customer.email', req.body.email)
            .then((data) => {
                if (data.length == 0) {
                    res.send('wrong email')
                } else {
                    knex
                        .select('customer_id', 'password').from('customer').where('customer.email', req.body.email).havingIn('customer.password', req.body.password)
                        .then((data) => {
                            if (data.length == 0) {
                                res.send('wrong password ')
                            } else {
                                data = JSON.parse(JSON.stringify(data))
                                let id = (data[0]['customer_id']).toString()
                                // id containing customer id and password
                                const token = jwt.sign({ "customer_id": id }, "mehzabeen")
                                res.cookie(token)
                                res.send({ 'login successful': token })
                            }
                        })
                }
            }).catch((err) => {
                res.send(err)
            })
    })

    // Update address of customer
    routes.put('/customer/address', (req, res) => {
        var token = req.headers.cookie.split(" ")
        token = (token[0]).slice(0, -10)
        jwt.verify(token, 'mehzabeen', (err, data) => {
            if (!err) {
                knex('customer')
                    .where("customer_id", data.customer_id)
                    .update({
                        address_1: req.body.address_1,
                        address_2: req.body.address_2,})
                    .then(() => {
                        res.send('Updated')
                    }).catch((err) => {
                        res.send(err)
                    })
            }else {
                res.send(err.message)
            }
        })


    })

    // Update Credit Card of customer
    routes.put('/customer/creditcard', (req, res) => {
        var token = req.headers.cookie.split(" ")
        token = (token[0]).slice(0, -10)
        jwt.verify(token, 'mehzabeen', (err, data) => {
            if (!err) {
                knex('customer')
                    .where("customer_id", data.customer_id)
                    .update({
                        credit_card: req.body.credit_card
                    })
                    .then(() => {
                        res.send('Updated')
                    }).catch((err) => {
                        res.send(err)
                    })
            }else{
                res.send(err.message)
            }
        })
    })
}