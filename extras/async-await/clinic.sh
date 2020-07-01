#!/bin/bash
./node_modules/.bin/clinic doctor -- node implementaciones/sincronico.js $1
./node_modules/.bin/clinic doctor -- node implementaciones/callbacks.js $1
./node_modules/.bin/clinic doctor -- node implementaciones/promises.js $1
./node_modules/.bin/clinic doctor -- node implementaciones/async-await.js $1
