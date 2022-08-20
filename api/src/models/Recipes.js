const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipes', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    healthScore:{
      type: DataTypes.TEXT,
      allowNull: true,
    },
    analyzedInstructions:{
      type: DataTypes.TEXT,
      allowNull: true
    },
    idDiets:{
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    //Esta columna es solo para recetas en BD
    createdInDb:{                              
      type : DataTypes.BOOLEAN,                    
      allowNull: false,
      defaultValue: true
    },
    idDiets:{
      type: DataTypes.TEXT,
      allowNull: false,
      foreignKey: true
    },
    like:{
      type: DataTypes.TEXT,
      allowNull: false,
    }
  });
};
