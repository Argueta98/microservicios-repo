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
  
    const response = {
      service: "datos de varios perros por ID",
      datos: perrosDatos,
    };
  
    return res.json(response);
  });

/*
  router.get("/perros/pesados", async (req, res) => {
    const perros = await fetch("http://perros:3000/api/v2/perros");
    const perrosData = await perros.json();
  
    // Ordenar perros por peso de mayor a menor
    const perrosPesados = perrosData.sort((a, b) => b.peso - a.peso);
  
    // Tomar los primeros 10 elementos del array
    const perrosMasPesados = perrosPesados.slice(0, 10);
  
    const response = {
      servicio: "Perros más pesados",
      cantidad: perrosMasPesados.length,
      data: perrosMasPesados,
    };
  
    res.json(response);
  });*/

  ///--------------------------------EJERCICIO 4-------------------------------------------------------------------------------

  router.get("/perros/pesados", async (req, res) => {
    const perros = data;
  
    // Ordenar los perros por peso de forma descendente
    const perrosOrdenados = perros.sort((a, b) => b.peso - a.peso);
  
    // Tomar los primeros 10 perros de la lista
    const primeros10Perros = perrosOrdenados.slice(0, 10);
    const arrayRazas = primeros10Perros.map(raza => raza.raza);
    const arraypremios = primeros10Perros.map(id => id.Id);

    const razas = await fetch("http://razas:5000/api/v2/razas");
    const razasJson = await razas.json();

    const premios = await fetch("http://premios:4000/api/v2/premios");
    const premiosJson = await premios.json();
  
    const resultado_filtro = razasJson.data.filter((elemento) => {
      return elemento.raza.some((raza) => arrayRazas.includes(raza));
    });
    
    const resultado_filtro2 = premiosJson.premios.filter((elemento) => {
      return arraypremios.includes(elemento.id_campeon);
    });
    
  
    const response = {
    servicio: "Perros más pesados y sus razas , y premios",
    dataPerros: primeros10Perros,
      Datarazas : resultado_filtro,
     dataPremios : resultado_filtro2

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
router.get("/raza/:razas", async (req, res) => {
  const razas = req.params.razas.split(",");
  const razaDatos = data.filter((perro) => razas.includes(perro.raza));

  const response = {
    service: "Datos de perros por raza",
    data: razaDatos,
  };

  return res.json(response);
});

/*router.get("/raza/:raza", async (req, res) => {
  const raza = req.params.raza;
  const razaDato = data.filter((perro)=> perro.raza=== raza)

   const response = {
     service: "Datos perros  raza",
     data: razaDato,
   };
 
   return res.json(response);
 });*/

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