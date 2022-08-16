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
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    healthScore:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    analyzedInstructions:{
      type: DataTypes.STRING,
      allowNull: true
    },
    idDiets:{
      type: DataTypes.STRING,
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
    }
  });
};
