const arreglito = [ 'catraminas.json', 'readme.md', 'tutus01.json', 'tutus02.json' ]


// arreglito.forEach(function(archivo){
//   console.log(archivo.endsWith('.json'))
// })

const jsonFiles = arreglito.filter(function(archivo){
  return archivo.endsWith('.json')
})
console.log(arreglito)
console.log(jsonFiles)