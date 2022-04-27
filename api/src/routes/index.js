const { Router }  = require('express');
const products = require('./products');        // Get listado y por id
//const categories  = require('./categories'); // Temperamentos grabarlo en b.d

// mildelword
const router = Router();

//console.log(products) //

router.use('/products', products); 
//router.use('/categories',categories); 

module.exports = router;