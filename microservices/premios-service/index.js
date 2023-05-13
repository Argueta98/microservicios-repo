const server = require("./src/app"); // Importamos el servidor desde el archivo app.js
//Conexion a base de datos
const sequelize = require('./data/config.js');
sequelize.sync({force: false}).then(() => console.log('Base de datos de sqlite conectada'));

server.listen(process.env.PORT || 4000, () => {
  // Iniciamos el servidor en el puerto especificado en la variable de entorno PORT
  console.log(`Servicio activado: ${process.env.PORT || 4000}`);
});