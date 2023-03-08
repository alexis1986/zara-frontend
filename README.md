# Prueba Tecnica de Backend para Shakers (https://www.shakersworks.com/)

## Comandos para ejecutar el proyecto

### `npm start`

Corre el proyecto en modo desarrollo y abre la app en el navegador en la URL: [http://localhost:3000](http://localhost:3000).

### `npm run build`

Construye la aplicación, dejandola preparada en el directorio `dist` para desplegar en el servidor.

## Control de versiones
v0.0.1
* Home mostrando los 100 podcasts mas escuchados.
* Ruteo hacia las 3 paginas.
* Contiene un mensaje de "Cargando..." que luego sera reemplazado por el indicador visual.
* NO contiene estilos 

v0.0.2
* Link de la cabecera para dirigir al Home.
* Muestra la cantidad de podcasts y el filtrado por Nombre y Autor.
* Aumento del timeout para desaparecer el mensaje de "Cargando..."

v0.0.3
* Refactor de Header: encapsulamiento de toda la logica en el componente.
* Pantalla de detalles de un Podcast.
* Creación del Header del Podcast.
* La info obtenida de la API se cachea por 24 horas.