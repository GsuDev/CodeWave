# Documentación del proyecto

# Arquitectura MVC

Hemos basado el proyecto en la arquitectura Modelo/Vista/Controlador de forma que tenemos 3 partes diferenciadas en nuestro código las cuales describiré de ellas tanto su funcionamiento como las tecnologías utilizadas.

### Modelo

En el modelo suceden principalmente las llamadas a base de datos así como la validación última de los datos. Están en la carpeta models y dentro tenemos una carpeta para cada SGBD. Dentro de mariadb que es el SGBD principal del proyecto tenemos tanto snippet.js como user.js para cada una de las entidades de la base de datos. En estos archivos hay una clase SnippetModel y UserModel las cuales contienen metodos estáticos (accesibles sin instanciar la clase).

Aquí hay tecnologías comunes y específicas:

- Construido en JS con node.js como todo el proyecto.
- La dependencia mysql2 que es el conector del SGBD (cuando terminemos de construir los modelos seguramente migremos a la dependencia específica de mariadb)

### Controlador

El controlador es el intermediario entre la vista y el modelo. Recibe las request del router y las procesa, llamando al modelo si es necesario. Hay un controlador para los snippets y otro para los usuarios los cuales cuentan al igual que el modelo con una clase cada uno y métodos estáticos. Cuando procesa la request y termina de llamar al modelo manda la response y todo este intercambio de información asi como las req y las res son en json.

Tecnologías comunes y específicas:

- JS con node.js

### Vista

En construcción🚧 (ANGULAR❓)

# Recursos importantes

## Routers

Para enrutar rutas especificas contamos con la dependencia Router de Express la cual nos facilita esta tarea. Los routers están en la carpeta routes y los usamos cuando hay varias url posibles para un mismo recurso, de esta manera queda mas limpio el app.js . La request llega al app.js y esta se manda al router si tiene que ver con snippets o usuarios. Ahí se manejan los verbos http y se manda al controlador.

Tecnologías comunes y específicas:

- La depencencia Router de Express

## Utils

En esta carpeta guardamos herramientas que se usan de manera recurrente a lo largo del proyecto.

## app.js

Punto de entrada del servidor construido con node.js y su framework express
