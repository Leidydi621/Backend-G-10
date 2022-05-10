const axios = require("axios");
const { Router } = require("express");
const { Product } = require("../db"); // traer mi modelo
const router = Router();
//const {} = require('./utiles');

/* #### Backend 
    - [ ] __POST /product__:
    - Recibe los datos recolectados desde el formulario controlado de la ruta
      de creación del producto por body
    - Crea un producto en la base de datos */
router.post("/", async (req, res, next) => {
	console.log("estoy BACK POST /product");
	let {
		name,
		description,
		price,
		brand,
		color,
		warranty,
		image,
		discount,
		stock,
		categoryId,
	} = req.body;
	try {
		let postBdProduct = await Product.create({
			name,
			description,
			price,
			brand,
			color,
			warranty,
			image,
			discount,
			stock,
		});
		return res.send(await postBdProduct.setCategory(categoryId));
		//return res.status(200).send(getAllBdProduct);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
