module.exports = (knex, routes) => {
    routes.get('/products', (req, res) => {
        knex.select('*').from('product')
            .then((data) => {
                var overallData = {
                    count: data.length,
                    rows: data
                }
                res.send(overallData)
            }).catch((err) => {
                res.send(err);
            })
    })

    routes.get('/products/:product_id', (req, res) => {
        knex.select('*').from('product').where('product_id', req.params.product_id)
            .then((data) => {
                res.send(data);
            }).catch((err) => {
                res.send(err)
            })
    })


    routes.get('/products/inCategory/:category_id', (req, res) => {
        knex.from('product')
            .select("product.product_id", "product.name", "product.description", "product.price", "product.discounted_price", "product.thumbnail")
            .join("product_category", "product.product_id", "=", "product_category.product_id")
            .where("product_category.category_id", req.params.category_id)
            .then((data) => {
                var overallData = {
                    count: data.length,
                    rows: data
                }
                res.send(overallData);
            }).catch((err) => {
                res.send(err);
            })
    })
    routes.get('/products/inDepartment/:department_id', (req, res) => {
        knex.from('product')
            .join("product_category", "product.product_id", "product_category.product_id")
            .join("category", "category.category_id", "product_category.category_id")
            .select("product.product_id", "product.name", "product.description", "product.price", "product.discounted_price", "product.thumbnail")
            .where("category.department_id", req.params.department_id)
            .then((data) => {
                var overallData = {
                    count: data.length,
                    rows: data
                }
                res.send(overallData);

            }).catch((err) => {
                res.send(err)
            })

    })
    routes.get('/products/:product_id/details', (req, res) => {
        knex.from('product')
            .select("product.product_id", "product.name", "product.description", "product.price", "product.discounted_price", "product.image", "product.image_2")
            .where("product_id", req.params.product_id)
            .then((data) => {
                res.send(data);
            }).catch((err) => {
                res.send(err);
            })
    })
    routes.get('/products/:product_id/locations', (req, res) => {
        knex('product')
            .select("category.category_id", "category.name as category_name", "department.department_id", "department.name as department_name")
            .join('product_category', 'product.product_id', 'product_category.product_id')
            .join('category', 'product_category.category_id', 'category.category_id')
            .join('department', 'category.department_id', 'department.department_id')
            .where("product.product_id", req.params.product_id)
            .then((data) => {
                res.send(data)
            }).catch((err) => {
                res.send(err)
            })

    })
    routes.get('/products/:product_id/reviews', (req, res) => {
        knex.from('review')
            .select('product.name', 'review.review', 'review.rating', 'review.created_on')
            .join('product', 'review.product_id', 'product.product_id')
            .where('product.product_id', req.params.product_id)
            .then((data) => {
                res.send(data)
                console.log(data);
            }).catch((err) => {
                res.send(err)
                console.log(err);
            })
    })

    routes.post('/products/:product_id/reviews', (req, res) => {
        knex.from('review')
            .insert({
                review: req.body.review, rating: req.body.rating, created_on: new Date(), customer_id: "1",
                product_id: req.params.product_id
            }).where('product.product_id', req.params.product_id).then((data) => {
                res.send("All Set")
            }).catch((err) => {
                res.send(err)
            })
    })

}

