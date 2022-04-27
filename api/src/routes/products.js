const axios = require('axios');
const {Router} = require('express');
const {Product} = require('../db') // traer mi modelo
const router = Router();
//const {} = require('./utiles');

/* #### Backend 
   - [ ] __GET /products__:
     - Obtener un listado de los productos
     - Debe devolver solo los datos necesarios para la ruta principal
*/
router.get('/', async (req, res, next) => {
      console.log('estoy BACK get __GET /products__ ')
      try {   
          let getAllBdProduct = await Product.findAll()
          return res.status(200).send(getAllBdProduct); 
    }catch(error) {next(error)}
})

module.exports = router;