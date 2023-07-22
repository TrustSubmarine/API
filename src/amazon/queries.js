const getAllProd = 'SELECT * FROM amazon';
const getProdById = 'SELECT * FROM amazon WHERE link_id = $1';
const addProd = 'INSERT INTO amazon (link_id, prod_name, link, score) VALUES ($1, $2, $3, $4)';
const updateProdById = 'UPDATE amazon SET score = $1 WHERE link_id = $3';
// How to auto-update time here?

module.exports = {
    getProdById,
    addProd,
    updateProdById,
    getAllProd
}
