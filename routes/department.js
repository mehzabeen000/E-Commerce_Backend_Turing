module.exports = (knex, routes) => {
    routes.get('/department', (req, res) => {
        knex.select('*').from('department').then((data) => {
            res.send(data);

        }).catch((err) => {
            res.send(err);
        })
    })
    routes.get('/department/:department_id', (req, res) => {
        knex.select('*').from('department').where('department_id', req.params.department_id)
            .then((data) => {
                res.send(data);

            }).catch((err) => {
                res.send(err)
            })

    })


}