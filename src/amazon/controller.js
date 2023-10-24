const pool = require('../../db');
const queries = require('./queries');
const axios = require('axios');

const SCRAPER_BASE_ENDPOINT = "https://djrjzastptdwz2ddabucffyeka0mowff.lambda-url.eu-north-1.on.aws";
const MODEL_BASE_ENDPOINT = "https://morning-leaf-1132.fly.dev";

const getProdById = (req, res) => {
    const link_id = decodeURIComponent(req.params.link);
    pool.query(queries.getProdById, [encodeURIComponent(link_id)], async (error, results) => {
        if (error) {
            console.log(error);
        } else if (results.rows.length == 0) {
            // Make a call to the scraper here
            const linkUrlObject = new URL(SCRAPER_BASE_ENDPOINT);
            const params = new URLSearchParams(linkUrlObject.search);
            params.append("url", link_id);
            linkUrlObject.search = params;

            const reviews_scraped_response = await axios.get(linkUrlObject.href)
            const temp = reviews_scraped_response.data["body"];

            const reviews_scraped = reviews_scraped_response["data"];
            const model_res = await axios.post(MODEL_BASE_ENDPOINT + "/predict", {
                "reviews": reviews_scraped["reviews"]
            })
            const score = model_res.data["score"];

            // Make a call to the post function
            await pool.query(queries.addProd, [encodeURIComponent(link_id), reviews_scraped["title"], reviews_scraped["desc"], score, true, reviews_scraped["img"]]);

            const innerResults = await pool.query(queries.getProdById, [encodeURIComponent(link_id)]);
            res.json(innerResults.rows);

        } else {
            res.json(results.rows);
        }
    });
};

// FIXME: Potentially redundant endpoint, consider NOT exposing
const addProd = (req, res) => {
    const link_id = req.params.link;
    const { product_name, product_desc, score, is_calc } = req.body;
    pool.query(queries.addProd, [link_id, product_name, product_desc, score, is_calc], (error, results) => {
        if (error) console.log(error);
        else res.send(`added ${link_id}`);
    });
};

const updateProdById = async (req, res) => {
    const link_id = decodeURIComponent(req.params.link);

    pool.query(queries.getProdById, [encodeURIComponent(link_id)], async (error, results) => {
        if (error) {
            console.log(error);
        } else if (results["rows"].length == 0) {
            console.log("LOGGING RESULTS FROM UPDATE HERE");
            console.log(results);
            console.log(results.rows);
            res.status(404).send("Product does not exist");
        } else {
            const linkUrlObject = new URL(SCRAPER_BASE_ENDPOINT);
            const params = new URLSearchParams(linkUrlObject.search);
            params.append("url", link_id);
            linkUrlObject.search = params;
            
            const reviews_scraped_response = await axios.get(linkUrlObject.href)
                        const temp = reviews_scraped_response.data["body"];
                        const reviews_scraped = reviews_scraped_response["data"];
                        
                        const model_res = await axios.post(MODEL_BASE_ENDPOINT + "/predict", {
                            "reviews": reviews_scraped["reviews"]
                        })
            
            const score = model_res.data["score"];
            
            pool.query(queries.updateProdById, [score, encodeURIComponent(link_id)], (error, results) => {
                if (error) console.log(error);
                else res.send(`updated ${link_id}`);
            });
        }
    });
};

const getAllProd = (req, res) => {
    pool.query(queries.getAllProd, (error, results) => {
        if (error) console.log(error)
        else res.json(results.rows);
    })
}

module.exports = {
    getProdById,
    addProd,
    updateProdById,
    getAllProd
};