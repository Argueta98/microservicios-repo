const express = require("express");
const router = express.Router();
const data = require("../../data/datos_perro");

const logger = (message) => console.log(`Perros Service: ${message}`);

//Obtener todos los perros
router.get("/", (req, res) => {
  
    const response = {
      service: "perros",
      data: data,
    };
    return res.json(response);
  });



//Obtener por id
  router.get("/:id",async (req, res) => {
    const reqId = req.params.id;
    const perroId = data.find((perro) => perro.Id === parseInt(reqId));

    const response = {
      service: "perros",
      data: perroId,
    };
    return res.json(response);
  });

  //Obtener perro por varios id separados por comas
  router.get("/busqueda/:id", async (req, res) => {
    const id = req.params.id.split(","); 
    const perrosDatos = data.filter((perro) => id.includes(String(perro.Id)));

    console.log(perrosDatos);
  
    const response = {
      service: "datos de varios perros por ID",
      datos: perrosDatos,
    };
  
    return res.json(response);
  });

 

//Obtener por el pais del dueño
  router.get("/paisCuidador/:pais", async (req, res) => {
   const duenio = req.params.pais;

    // Si se especifica un país, se filtran los perros según el país del dueño
   const pais = data.filter((perro)=> perro.pais_dueno === duenio)

    const response = {
      service: "perros",
      cantidad: pais.length,
      data: pais,
    };
  
    return res.json(response);
  });



//busqueda por el nombre de la raza
router.get("/raza/:raza", async (req, res) => {
  const raza = req.params.raza;
  const razaDato = data.filter((perro)=> perro.raza=== raza)

   const response = {
     service: "Datos perros  raza",
     data: razaDato,
   };
 
   return res.json(response);
 });

//Busqueda por el nombre del perro
 router.get("/perro/:nombre", async (req, res) => {
  const nombre = req.params.nombre;
  const perroDato = data.filter((perro) => perro.nombre_perro === nombre);

  const response = {
    service: "datos del perro por nombre",
    data: perroDato,
  };

  return res.json(response);
});

//Busqueda del perro por pais del dueño
router.get("/pais/:pais", async (req, res) => {
  const pais = req.params.pais;
  const perrosMexico = data.filter((perro) => perro.pais_dueno === pais);

  const response = {
    service: "perros por país del dueño",
    data: perrosMexico,
  };

  return res.json(response);
});

//Busqueda por dueños de estados unidos
router.get("/duenos/estadosunidos", async (req, res) => {
  const perrosEstadosUnidos = data.filter((perro) => perro.pais_dueno === "Estados Unidos");
  const nombresPerrosEstadosUnidos = perrosEstadosUnidos.map((perro) => perro.nombre_perro);

  const response = {
    service: "lista de nombres de perros de dueños de Estados Unidos",
    data: nombresPerrosEstadosUnidos,
  };

  return res.json(response);
});

//Busqueda por peso
router.get("/peso/:min/:max", async (req, res) => {
  const min = Number(req.params.min);
  const max = Number(req.params.max);
  const perros = data.filter(perro => perro.peso >= min && perro.peso <= max);
  const response = {
    service: "perros por peso",
    cantidad : perros.length,
    data: perros,
  };
  return res.json(response);
});




 //Ejemplos avanzados---------------------------------------------------------------
 
     //Obtener por id el perro y sus premios
router.get("/premios/:id", async (req, res) => {
  try {
    const reqId = req.params.id;
    // Obtener información del perro
    const perroId = data.find((perro) => perro.Id === parseInt(reqId));
    const premiosResponse = await fetch(` http://premios:4000/api/v2/premios/campeonId/${reqId}`);
    const premios = await premiosResponse.json();

    const response = {
      service: "perros_con_premios",
     // perro: perroId,
     // premios: premios
      data: {
        ...perroId,
        premios: premios,
      },
    };

    return res.json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al obtener información del perro y sus premios" });
  }
});

module.exports = router;