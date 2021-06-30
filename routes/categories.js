module.exports = (knex, routes) => {
    routes.get('/categories', (req, res) => {
        knex.select('*').from('category').then((data) => {
            var overallData = {
                count : data.length,
                rows : data
            }
            res.send(overallData);
        }).catch((err) => {
            res.send(err);
        })
    })
    routes.get('/categories/:category_id', (req, res) => {
        knex.select('*').from('category').where('category_id', req.params.category_id)
            .then((data) => {
                res.send(data);
            }).catch((err) => {
                res.send(err)
            })

    })
    routes.get('/categories/inProduct/:product_id',(req,res) => {
        knex.from('category')
        .select('category.category_id','category.department_id','category.name')
        .join('product_category','category.category_id','=','product_category.category_id')
        .where('product_category.product_id',req.params.product_id)
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.send(err);
        })
    })
    routes.get('/categories/inDepartment/:department_id',(req,res) => {
        knex.from('category')
        .select('category.category_id','category.name','category.description','category.department_id')
        .join('department','category.department_id',"=",'department.department_id')
        .where('department.department_id',req.params.department_id)
        .then((data)=>{
            res.send(data);
        }).catch((err) => {
            res.send(err);
        })
    })
}
