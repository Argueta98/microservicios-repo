## MICROSERVICIOS-LABFINAL
Este repositorio esta construido usando docker, node.js, sqlite3, express, javascript.
La prueba consiste es desarrollar un microservicio para perros, premio, y razas y hacer peticiones. 

Data: `raza_info.csv`, `premios.sql`, `datos_perros.json`

## PROCESO PARA EJECUTAR

run microservice:
`docker-compose up --build`
or
`sudo docker-compose up --build`


## RESUMEN DE EJERICIOS RESUELTOS
EJERCICIO #1 #2 Y #3

#EL EJERCICIO #4 SOLO OBTUVE LA RAZA Y LOS PERROS CON ESA RAZA PERO NO OBTUVE LOS

#EJERCICIO 5 NO LO TERMINE FALTA DE TIEMPO

## DOCKERFILE

Este es un archivo Dockerfile que describe cómo construir una imagen de contenedor de Docker para una aplicación Node.js.

Aquí hay una explicación línea por línea del Dockerfile:

```
FROM node
```

Indica que la imagen base para construir nuestra imagen será la imagen oficial de Node.js que se encuentra en Docker Hub.

```
COPY . /app
```

Copia todos los archivos y directorios en el directorio actual a la ruta `/app` dentro del contenedor.

```
WORKDIR /app
```

Establece el directorio de trabajo actual dentro del contenedor en `/app`.

```
RUN npm install
```

Ejecuta el comando `npm install` dentro del contenedor para instalar todas las dependencias necesarias para la aplicación.

```
ENV PORT 3000
```

Establece una variable de entorno llamada `PORT` en el valor `3000`. Esta variable se utiliza más adelante en la aplicación para indicar en qué puerto escuchar.

```
EXPOSE 3000
```

Expone el puerto `3000` en el contenedor, lo que permite que otros contenedores o aplicaciones accedan a la aplicación que se está ejecutando en ese puerto.

```
ENTRYPOINT ["npm", "start"]
```

Establece el comando de inicio predeterminado para el contenedor. Cuando se inicia el contenedor, se ejecutará el comando `npm start` para iniciar la aplicación Node.js.

### En resumen, este Dockerfile define cómo construir una imagen de contenedor para una aplicación Node.js, copiando el código fuente en el contenedor, instalando las dependencias necesarias, exponiendo un puerto para acceder a la aplicación y definiendo un comando de inicio predeterminado para el contenedor.

## DOCKER COMPOSE

Este es un archivo YAML que se utiliza para definir la configuración de Docker Compose, que es una herramienta que permite definir y ejecutar aplicaciones Docker de varios contenedores. A continuación, se explican las líneas de código del archivo y su funcionalidad:

```
version: "3"
```

Esta es la versión de Docker Compose que se utilizará para definir la configuración.

```
services:
```

```
  perros:
    build: ./microservices/perros-service
```

Este servicio se llama `perros` y utiliza la imagen construida en el directorio `./microservices/perros-service`.

```
  premios:
    build: ./microservices/premios-service
```

Este servicio se llama `premios` y utiliza la imagen construida en el directorio `./microservices/premios-service`.

```
  razas:
    build: ./microservices/razas-service
```

Este servicio se llama `razas` y utiliza la imagen construida en el directorio `./microservices/razas-service`.

```
  nginx:
    image: nginx:latest
    ports:
      - "8080:8080"
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - perros
      - premios
      - razas
```

Este servicio se llama `nginx` y utiliza la imagen `nginx:latest` de Docker Hub. Se define un mapeo de puertos entre el puerto 8080 del contenedor y el puerto 8080 de la máquina host. También se define un volumen que vincula el archivo `nginx.conf` en el directorio actual con el archivo de configuración de nginx en el contenedor. Por último, se especifica que `nginx` depende de los servicios  `perros`, `premios` y `razas`.
