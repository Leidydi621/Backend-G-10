const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('product', {
    name: {
          type: DataTypes.STRING(20),
          allowNull: false,},
    description: { 
          type: DataTypes.STRING(100),
          allowNull: false,},
    category_id: { 
          type: DataTypes.INTEGER,
          allowNull: false,},
    price: {
          type: DataTypes.INTEGER,
          allowNull: false,},
    brand: { 
          type: DataTypes.STRING(20),
          allowNull: false,},
    color: { 
          type: DataTypes.STRING(10),
          allowNull: false,},
    warranty: {  // grantia
          type: DataTypes.INTEGER,
          allowNull: false,},
    image: { 
            type: DataTypes.STRING(100),
            allowNull: false,},
    discount: {  // descuento
            type: DataTypes.INTEGER,
            allowNull: false,},
    
  
  });
};
