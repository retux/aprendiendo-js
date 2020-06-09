# Aprendiendo.js

Este es el repositorio central de Aprendiendo.js, curso online gratuito de Node.js, disponible en [YouTube](https://www.youtube.com/channel/UCZYvniRWZdC_YeIL9fxwlsg).

Las clases se dictan en vivo, todos los Martes a las 18hs (Hora de Argentina). Suscribite al canal, y activá las alertas para poder recibir avisos cuando empiecen las clases.

Si tenés una duda, sugerencia o comentario, podés dejar un [issue](https://github.com/futurorandomico/aprendiendo-js/issues) y te lo respondemos lo mas rápido posible.

![Aprendiendo.js][logo]

## Temario

### Empezando con Node.js (Clase 1)

- [x] Instalación
    - [x] Versiones de Node.js
        - [x] Stable
        - [x] LTS
        - [x] https://node.green/
    - [x] nvm
- [x] Configuración de un repositorio base
    - [x] .gitignore
    - [x] package.json
- [x] Entorno de desarrollo
    - [x] Visual Studio Code
- [x] Hello, world!
- [x] Extra
    - [x] Event loop
    - [x] V8

### Estructuras básicas (Clase 2)

- [x] Declarando variables
    - [x] Tipado dinámico
    - [x] `var` vs `let` vs `const`
    - [x] `typeof`
    - [x] Declaración
    - [x] Asignación    
- [ ] Tipos de datos
    - [x] `string`
    - [x] `number`
    - [x] `boolean`
    - [x] `null` / `undefined`
    - [x] `Array`
        - [x] Declaración
          - [x] Expresión
          - [x] new (no recomendada)
        - [x] Asignación
        - [x] `push` / `pop`
        - [x] `forEach`
        - [x] `map`
        - [x] `filter`
        - [x] `concat`
    - [ ] `Object` (Hashmaps)
        - [x] Declaración
          - [x] Expresión
          - [ ] function (no recomendada)
          - [ ] new (luego de ver POO)
        - [x] Asignación
        - [x] `keys`
        - [x] `assign`

### Estructuras básicas - Parte 2 (Clase 3)

- [x] `if`
    - [x] `==` vs `===` (https://dorey.github.io/JavaScript-Equality-Table/ 🤦‍♂️)
- [x] `switch`
- [x] `function`
    - [x] Declaración
      - [x] Expresión
      - [x] Variable
      - [x] Arrow
- [x] Tarea: hacer un programa que tenga un array de objetos que sean marcas y autos, calcular el seguro de cada uno, y el total a pagar

### Estructuras básicas - Parte 3 (Clase 4)

- [x] `for` / `while` / `do... while`
- [x] `try` / `catch` / `finally`
  - [x] `throw`
  - [x] `Error`
- [x] `JSON`
  - [x] `parse`
  - [x] `stringify`
- [x] `fs` (Filesystem)
- [x] `setTimeout` / `setInterval`
- [ ] Extra
  - [ ] `RegExp` (Regular Expressions)
- [x] Tarea: hacer un programa que tenga un array de objetos que sean marcas y autos, calcular el seguro de cada uno, y el total a pagar. Con la diferencia de la Clase 3 que quiero que los autos vengan de un JSON en disco, y se guarde el seguro calculado de todos en disco asi como el total.

### Viviendo asincrónico - Callbacks (Clase 5)

- [x] Callbacks
    - [x] Callback hell

### Viviendo asincrónico - Promesas (Clase 6)
- [ ] Promises
- [ ] `async` / `await`
- [ ] Extra
    - [ ] EventEmitter
    - [ ] Single Thread
    - [ ] Event Loop, parte 2

### Librerías

- [ ] Utilización de librerías de Node.js
- [ ] Utilización de librerías de terceros (npm)
- [ ] Creación de librerías propias
- [ ] Extra
    - [ ] `nodemon`
    - [ ] Standard.js
    - [ ] CLI
      - [ ] readline
      - [ ] commander
- [ ] Tarea: Realizar un programa de consola que pida algunos datos, los guarde en un JSON, y si corro el programa de nuevo me deje ver los datos y modificarlos

### Programación orientada a objetos (POO, o tambíen OOP en inglés)

- [ ] Clases
- [ ] Objetos
- [ ] Herencia
- [ ] this
- [ ] Extra
    - [ ] Singleton

### APIs - Consumir una API

- [ ] HTTP / GET / POST / PUT / DELETE
- [ ] JSON
- [ ] Postman
- [ ] request / axios    

### APIs - Creando una API con Express

- [ ] Server inicial
- [ ] Rutas
- [ ] Extra
    - [ ] HTML Templates

### APIs - Una API en producción

- [ ] Linux bare
- [ ] Docker
    - [ ] Dockerfile
- [ ] Extra
    - [ ] nginx

### Bases de datos

- [ ] MongoDB / mongoose
    - [ ] Schema / Modelo
    - [ ] Indices
    - [ ] insert
    - [ ] update
    - [ ] delete
    - [ ] find / findOne
- [ ] Redis

### Comunicación entre procesos - Moleculer
- [ ] moleculer

### Comunicación entre procesos - Cote
- [ ] cote

### Comunicación entre procesos - Bull
- [ ] bull

Y mucho mas por venir...

[logo]: https://github.com/futurorandomico/aprendiendo-js/blob/master/resources/header.jpg?raw=true "Logo"
