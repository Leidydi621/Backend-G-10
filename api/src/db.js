require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

// const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/ecommerce`, {
//   logging: false, // set to console.log to see the raw SQL queries
//   native: false, // lets Sequelize know we can use pg-native for ~30% more speed
// });

let sequelize =
	process.env.NODE_ENV === "production"
		? new Sequelize({
				database: DB_NAME,
				dialect: "postgres",
				host: DB_HOST,
				port: 5432,
				username: DB_USER,
				password: DB_PASSWORD,
				pool: {
					max: 3,
					min: 1,
					idle: 10000,
				},
				dialectOptions: {
					ssl: {
						require: true,
						// Ref.: https://github.com/brianc/node-postgres/issues/2009
						rejectUnauthorized: false,
					},
					keepAlive: true,
				},
				ssl: true,
		  })
		: new Sequelize(
				`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/ecommerce`,
				{ logging: false, native: false }
		  );

// *****************************

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
	.filter(
		(file) =>
			file.indexOf(".") !== 0 &&
			file !== basename &&
			file.slice(-3) === ".js"
	)
	.forEach((file) => {
		modelDefiners.push(require(path.join(__dirname, "/models", file)));
	});

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
	entry[0][0].toUpperCase() + entry[0].slice(1),
	entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {
	User,
	Role,
	ShoppingCart,
	Wishlist,
	Product,
	Category,
	Order,
	Reviews,
	Genre,
	Invoice,
} = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

// usuario/roles 1a1
Role.hasOne(User);
User.belongsTo(Role);

//orde/product */1
Product.hasMany(Order);
Order.belongsTo(Product);

// Role.hasOne(User);
// Tabla Product Relacion(1) --> (*) Category
Category.hasMany(Product);
Product.belongsTo(Category);

// //genre/product 1-*
Genre.hasMany(Product);
Product.belongsTo(Genre);

//usuario/ordenes 1-*
// se añade una clave user_id a la tabla order
User.hasMany(Order);
Order.belongsTo(User);

// //User/ShoppingCart 1-*
User.hasOne(ShoppingCart);
ShoppingCart.belongsTo(User);

// //User/ShoppingCart 1-*
Product.hasMany(ShoppingCart);
ShoppingCart.belongsTo(Product);

// // //product/review
Product.hasMany(Reviews);
Reviews.belongsTo(Product);

// // // //user/product *-*
User.hasOne(Wishlist);
Wishlist.belongsTo(User);

// // //wishlist/product *-*
//   Product.hasMany(Wishlist);
//   Wishlist.belongsTo(Product);
//Invoce/ordenes 1-*
Invoice.hasMany(Order);
Order.belongsTo(Invoice);

// se añade una clave user_id a la tabla order

module.exports = {
	...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
	conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
