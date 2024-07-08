# toolbox

# Forma de ejecutar:

- Api: posicionarse en carpeta api, y ejecutar npm start
- Test backend: posicionarse en carpeta api, y ejecutar npm test
- Frontend: posicionarse en carpeta app, y ejecutar npm run client

# Estructura de archivos:

- Backend: el archivo principal es api\server.js, mientras que en api\routes\index.js se encuentran las rutas desarrolladas. En la carpeta api\handlers se encuentran los handlers que ejecutan la lógica de sus correspondientes rutas. Para los test, el archivo es api\test\test.js.
- Frontend: el archivo principal es app\src\index.js, donde se encuentra el render principal de React. Los componentes de app\src\pages definen las tres rutas implementadas (Home, List, y File). En la carpeta app\src\components se encuentran los dos componentes custom (Tabla y Navbar).

# Librerías usadas:

- Además de las exigidas para el desafío, se instaló axios para el manejo de request en backend, y nodemon para levantar el servidor en vivo mientras se desarrolló.

# Librerías omitidas:

- Tanto standardjs como jest, dado mis conocimientos, posiblemente reste más de lo que sume, por lo que evité utilizarlos para minimizar cualquier posible error. Redux, por otro lado, en toda iteración que intenté me pareció desprolijo y mal implementado.

# Imágenes Docker:

- docker pull ger14/toolbox-challenge-api
- docker pull ger14/toolbox-challenge-app

- al momento de levantar la imágen toolbox-challenge-api, será necesario utilizar la variable de entorno proporcionada por mail (MY_SECRET_KEY)
