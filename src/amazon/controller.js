const pool = require('../../db');
// const createUnixSocketPool = require('../../connect-unix-pool')
const queries = require('./queries');

const getProdById = (req, res) => {
    const link_id = decodeURIComponent(req.params.link);
    pool.query(queries.getProdById, [link_id], (error, results) => {
        if (error) {
            console.log(error);
        } else if (results.rows.length == 0) {
            // TODO: Make a call to the scraper here
            res.status(404);
            // TODO: Make a call to the post function below
        } else {
            res.json(results.rows);
        }
    });
};

const addProd = (req, res) => {
    const link_id = req.params.link;
    // TODO: Make a call to the scraper here and get everything
    const { product_name, product_desc, score, is_calc } = req.body; // is this safe?
    pool.query(queries.addProd, [link_id, product_name, product_desc, score, is_calc], (error, results) => {
        if (error) console.log(error);
        else res.send(`added ${link_id}`);
    });
};

const updateProdById = (req, res) => {
    const link_id = req.params.link;
    // TODO: Make a call to the scraper to recalculate the score
    const { score } = req.body; // TODO: is this safe?
    
    pool.query(queries.getProdById, [link_id], (error, results) => {
        if (error) {
            console.log(error);
        } else if (results.rows.length == 0) {
            res.status(404);
            res.send("Product does not exist");
        }
    });

    pool.query(queries.updateProdById, [score, link_id], (error, results) => {
        if (error) console.log(error);
        else res.send(`updated ${link_id}`);
    });
};

const getAllProd = (req, res) => {
    pool.query(queries.getAllProd, (e, r) => {
        if (e) console.log(e)
        else res.json(r.rows);
    })
}

module.exports = {
    getProdById,
    addProd,
    updateProdById,
    getAllProd
};