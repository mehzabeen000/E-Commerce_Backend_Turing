module.exports = (knex, routes) => {
    routes.get('/attributes', (req, res) => {
        knex.select('*').from('attribute').then((data) => {
            res.send(data);
        }).catch((err) => {
            res.send(err)
        })
    })
    routes.get('/attributes/:attribute_id', (req, res) => {
        knex.select('*').from('attribute').where('attribute_id', req.params.attribute_id).then((data) => {
            res.send(data);
        }).catch((err) => {
            res.send(err)
        })
    })
    routes.get('/attributes/values/:attribute_id', (req, res) => {
        knex.from("attribute")
            .select('attribute_value.attribute_value_id', 'attribute_value.value')
            .join("attribute_value", "attribute.attribute_id", "=", "attribute_value.attribute_id")
            .where('attribute.attribute_id', req.params.attribute_id)
            .then((data) => {
                res.send(data);
            }).catch((err) => {
                res.send(err);
            })
    })

    routes.get('/attributes/inProduct/:product_id', (req, res) => {
        knex.from("attribute")
            .select('attribute_value.attribute_value_id', "attribute_value.value", "attribute.name")
            .join("attribute_value", "attribute.attribute_id", "=", "attribute_value.attribute_id")
            .join("product_attribute", "attribute_value.attribute_value_id", "=", "product_attribute.attribute_value_id")
            .where('product_attribute.product_id', req.params.product_id)
            .then((data) => {
                res.send(data);
            }).catch((err) => {
                res.send(err);
            })
    })

}