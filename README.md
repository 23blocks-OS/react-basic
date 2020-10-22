Uso de librerias json-api-normalizer y redux-object para serializacion de datos de API

Instrucciones:

La primera vez que se descarga:

-- Instalar las depencias
npm install

-- Crear archivo .env y agregar la api key de 23blocks. Este archivo esta en el .gitignore por lo que no se versionara
REACT_APP_API_KEY=ingresarapikey

-- Iniciar el proyecto:
npm start

-- Correr pruebas unitarias

npm run test

---

Para comenzar creando proyecto de React:

-- Ejecutar:

npx create-react-app my-app

-- Instalar librerias: axios: (cliente http), json-api-normalizer (serializacion de datos), redux-object (serializacion de datos), rxjs (reactive programming), formik (react forms)

npm install axios json-api-normalizer redux-object rxjs formik

-- Crear archivo api.js y dentro del mismo crear y exportar funcion setApiKey() y setCompanyToken() para agregar los headers de autenticacion necesarios para comunicacion con la API

-- Llamar a la funcion setApiKey() en App.jsx
