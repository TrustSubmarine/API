const pool = require('../../db');
// const createUnixSocketPool = require('../../connect-unix-pool')
const queries = require('./queries');

const getProdById = (req, res) => {
    const link_id = req.params.id;
    pool.query(queries.getProdById, [link_id], (error, results) => {
        if (error) console.log(error);
       else res.json(results.rows);
    });
};

const addProd = (req, res) => {
    const link_id = req.params.id;
    const { name, link, score } = req.body; // is this safe?
    pool.query(queries.addProd, [link_id, name, link, score], (error, results) => {
        if (error) console.log(error);
        else res.send(`added ${link_id}`);
    })
};

const updateProdById = (req, res) => {
    const link_id = req.params.id;
    const { score } = req.body; // TODO: is this safe?
    pool.query(queries.updateProdById, [score, link_id], (error, results) => {
        if (error) console.log(error);
        // how to check if it exists already here? is this check needed?
        else res.send(`updated ${link_id}`);
    })
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