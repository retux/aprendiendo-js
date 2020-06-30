# Aprendiendo.js

Este es el repositorio central de Aprendiendo.js, curso online gratuito de Node.js, disponible en [YouTube](https://www.youtube.com/channel/UCZYvniRWZdC_YeIL9fxwlsg).

Las clases se dictan en vivo, todos los Martes a las 18hs (Hora de Argentina). Suscribite al canal, y activá las alertas para poder recibir avisos cuando empiecen las clases.

Si tenés una duda, sugerencia o comentario, podés dejar un [issue](https://github.com/futurorandomico/aprendiendo-js/issues) y te lo respondemos lo mas rápido posible.

![Aprendiendo.js][logo]

## Temario

### Empezando con Node.js (Clase 1)

[![Introducción a Node.js - Aprendiendo.js - Clase 1](https://img.youtube.com/vi/uTsIyuUHsmI/0.jpg)](https://www.youtube.com/watch?v=uTsIyuUHsmI)

https://www.youtube.com/watch?v=uTsIyuUHsmI

- [x] Instalación
    - [x] Versiones de Node.js
        - [x] Stable
        - [x] LTS
        - [x] https://node.green/
    - [x] nvm
    - [x] Instalación en Windows 10: https://youtu.be/fKtuvRVOSXM
- [x] Configuración de un repositorio base
    - [x] .gitignore
    - [x] package.json
- [x] Entorno de desarrollo
    - [x] Visual Studio Code
- [x] Hello, world!
- [x] Extra
    - [x] Event loop
    - [x] V8

---

### Estructuras básicas (Clase 2)

[![Estructuras básicas en Node.js - Aprendiendo.js - Clase 2](https://img.youtube.com/vi/1UiguL677Kw/0.jpg)](https://www.youtube.com/watch?v=1UiguL677Kw)

https://www.youtube.com/watch?v=1UiguL677Kw

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

---

### Estructuras básicas - Parte 2 (Clase 3)

[![Estructuras básicas en Node.js - Pt 2 - Aprendiendo.js - Clase 3](https://img.youtube.com/vi/lvXh1I9LAsE/0.jpg)](https://www.youtube.com/watch?v=lvXh1I9LAsE)

https://www.youtube.com/watch?v=lvXh1I9LAsE

- [x] `if`
    - [x] `==` vs `===` (https://dorey.github.io/JavaScript-Equality-Table/ 🤦‍♂️)
- [x] `switch`
- [x] `function`
    - [x] Declaración
      - [x] Expresión
      - [x] Variable
      - [x] Arrow
- [x] Tarea: hacer un programa que tenga un array de objetos que sean marcas y autos, calcular el seguro de cada uno, y el total a pagar

---

### Estructuras básicas - Parte 3 (Clase 4)

[![Estructuras básicas en Node.js - Pt 3 - Aprendiendo.js - Clase 4](https://img.youtube.com/vi/LBgkvbPawHk/0.jpg)](https://www.youtube.com/watch?v=LBgkvbPawHk)

https://www.youtube.com/watch?v=LBgkvbPawHk

- [x] `for` / `while` / `do... while`
- [x] `try` / `catch` / `finally`
  - [x] `throw`
  - [x] `Error`
- [x] `JSON`
  - [x] `parse`
  - [x] `stringify`
- [x] `fs` (Filesystem)
- [x] `setTimeout` / `setInterval`
- [x] Tarea: hacer un programa que tenga un array de objetos que sean marcas y autos, calcular el seguro de cada uno, y el total a pagar. Con la diferencia de la Clase 3 que quiero que los autos vengan de un JSON en disco, y se guarde el seguro calculado de todos en disco asi como el total.

---

### Viviendo asincrónico - Callbacks (Clase 5)

[![Viviendo asincrónico - Callbacks en Node.js - Aprendiendo.js - Clase 5](https://img.youtube.com/vi/hnEv07gPy8A/0.jpg)](https://www.youtube.com/watch?v=hnEv07gPy8A)

https://www.youtube.com/watch?v=hnEv07gPy8A

- [x] Callbacks
    - [x] Callback hell

---

### Viviendo asincrónico - Promesas (Clase 6)

[![Viviendo asincrónico - Promises en Node.js - Aprendiendo.js - Clase 6](https://img.youtube.com/vi/oLGCdRkIccA/0.jpg)](https://www.youtube.com/watch?v=oLGCdRkIccA)
https://www.youtube.com/watch?v=oLGCdRkIccA

- [x] Promises

---

### Viviendo asincrónico - Promesas (Clase 7)

[![Viviendo asincrónico - Promises Reloaded - Aprendiendo.js - Clase 7](https://img.youtube.com/vi/aiJN0PknqCI/0.jpg)](https://www.youtube.com/watch?v=aiJN0PknqCI)

https://www.youtube.com/watch?v=aiJN0PknqCI

- [x] Promises Reloaded
- [x] Promises Revolutions - Clase Extra: https://youtu.be/9xiVrFTXaCs
- [x] Promises Live Coding - Clase Extra: https://youtu.be/kDx-pOQ725s

---

### Viviendo asincrónico - Promesas (Clase 8)

[![Viviendo asincrónico - async/await - Aprendiendo.js - Clase 8](https://img.youtube.com/vi/ZhyQXRac5pM/0.jpg)](https://www.youtube.com/watch?v=ZhyQXRac5pM)

https://www.youtube.com/watch?v=ZhyQXRac5pM

- [x] `async` / `await`
- [ ] Tarea: hacer un programa que tenga un array de objetos que sean marcas y autos, calcular el seguro de cada uno, y el total a pagar. Quiero que los autos vengan de un JSON en disco, y se guarde el seguro calculado de todos en disco asi como el total. Todo con async/await

---

### Librerías

- [ ] Utilización de librerías de Node.js
- [ ] Utilización de librerías de terceros (npm)
- [ ] Creación de librerías propias
- [ ] Tarea: Realizar un programa de consola que pida algunos datos, los guarde en un JSON, y si corro el programa de nuevo me deje ver los datos y modificarlos

---

### Programación orientada a objetos (POO, o tambíen OOP en inglés)

- [ ] Clases
- [ ] Objetos
- [ ] Herencia
- [ ] this
- [ ] Extra
    - [ ] Singleton

---

### APIs - Consumir una API

- [ ] HTTP / GET / POST / PUT / DELETE
- [ ] JSON
- [ ] Postman
- [ ] request / axios    

---

### APIs - Creando una API con Express

- [ ] Server inicial
- [ ] Rutas

---

### APIs - Una API en producción

- [ ] Linux bare
- [ ] Docker
    - [ ] Dockerfile

---

### Bases de datos

- [ ] MongoDB / mongoose
    - [ ] Schema / Modelo
    - [ ] Indices
    - [ ] insert
    - [ ] update
    - [ ] delete
    - [ ] find / findOne
- [ ] Redis

---

### Comunicación entre procesos - Moleculer
- [ ] moleculer

---

### Comunicación entre procesos - Cote
- [ ] cote

---

### Comunicación entre procesos - Bull
- [ ] bull

---

### Extras
- [ ] `RegExp` (Regular Expressions)
- [ ] `nodemon`
- [ ] Standard.js
- [ ] CLI
  - [ ] `readline`
  - [ ] `commander`
- [ ] `EventEmitter`
- [ ] HTML Templates
- [ ] nginx

---

Y mucho mas por venir...

[logo]: https://github.com/futurorandomico/aprendiendo-js/blob/master/resources/header.jpg?raw=true "Logo"
