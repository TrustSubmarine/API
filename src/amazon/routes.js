const express = require('express');
const controller = require('./controller')

const router = express.Router();

router.get('/', controller.getAllProd);


router
    .route('/:link')
    .get(controller.getProdById)
    .post(controller.addProd)
    .put(controller.updateProdById);

module.exports = router;