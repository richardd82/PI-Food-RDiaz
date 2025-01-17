require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const {DB_DIALECT, MYSQLUSER, MYSQLPASSWORD, MYSQLPORT, MYSQLHOST, MYSQLDATABASE } = process.env;


const sequelize = new Sequelize(`${DB_DIALECT}://${MYSQLUSER}:${MYSQLPASSWORD}@${MYSQLHOST}:${MYSQLPORT}/${MYSQLDATABASE}`,
{
	host: process.env.MYSQLHOST || 'api-food.richadd82.dev', // Host proporcionado por Railway
	port: process.env.MYSQLPORT || 3306, 
	dialect: 'mysql', // Dialecto
    	logging: console.log, // Mostrar logs SQL
    	dialectOptions: {
      	ssl: {
        	require: true, // Activa conexiones seguras si Railway lo requiere
        	rejectUnauthorized: false, // Acepta certificados autofirmados
      	},
		}
});

// const sequelize = new Sequelize(
// 	// `${DB_DIALECT}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
// 	`${DB_DIALECT}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${PGPORT}/${DB_NAME}`,
// 	// `${DB_DIALECT}://${{ DB_USER }}:${{ DB_PASSWORD }}@${{ DB_HOST }}:${{ PGPORT }}/${{ DB_NAME }}`,
// 	{
// 	  logging: false, // set to console.log to see the raw SQL queries
// 	  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
// 	}
//   );


//Funcionaba para local MySQL
// const sequelize = new Sequelize('food', 'root', '12345678',{
	
	
// 		host: "localhost",
// 		dialect: "mysql", 
	
// });
// sequelize.authenticate().then(() => {
//   console.log('Connection has been established successfully.');
// }).catch((error) => {
//   console.error('Unable to connect to the database: ', error);
// });
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
	.filter(
		(file) =>
			file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
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
//const { Recipe } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
const { Recipes, Types } = sequelize.models;

Recipes.belongsToMany(Types, { through: "Recipes_Types" });
Types.belongsToMany(Recipes, { through: "Recipes_Types" });

module.exports = {
	...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
	conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
