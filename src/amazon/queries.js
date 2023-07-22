const getAllProd = 'SELECT * FROM amazon';
const getProdById = 'SELECT * FROM amazon WHERE link = $1';
const addProd = 'INSERT INTO amazon (link, product_name, product_desc, score, is_calc) VALUES ($1, $2, $3, $4, $5)';
const updateProdById = 'UPDATE amazon SET score = $1 WHERE link = $2';

module.exports = {
    getProdById,
    addProd,
    updateProdById,
    getAllProd
}
