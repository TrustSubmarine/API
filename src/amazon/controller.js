const pool = require('../../db');
// const createUnixSocketPool = require('../../connect-unix-pool')
const queries = require('./queries');
const axios = require('axios');

const SCRAPER_BASE_ENDPOINT = "https://djrjzastptdwz2ddabucffyeka0mowff.lambda-url.eu-north-1.on.aws";

const getProdById = (req, res) => {
    const link_id = decodeURIComponent(req.params.link);
    pool.query(queries.getProdById, [link_id], (error, results) => {
        if (error) {
            console.log(error);
        } else if (results.rows.length == 0) {
            // Make a call to the scraper here
            const linkUrlObject = new URL(SCRAPER_BASE_ENDPOINT);
            const params = new URLSearchParams(linkUrlObject.search);
            params.append("url", link_id);
            linkUrlObject.search = params;

            const reviews = axios.get(linkUrlObject.href)
                .then(response => {
                    // handle success
                    console.log(response);
                    return response;
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                    res.status(500).send("Internal Server Error: Invalid Scraper Response");
                });

            // TODO: send this to the model
            // res.json(reviews);

            // TODO: Send reviews to model

            // TODO: Make a call to the post function below
            pool.query(queries.addProd, [encodeURIComponent(link_id), "prdo_name", "product_desco", 2.2, false], (error, results) => {
                if (error) console.log(error);
                else console.log(`added ${link_id}`);
            });

            res.json(reviews);

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