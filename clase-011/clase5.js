const fs = require('fs')
const arr = [
  'val1',
  'val2',
  'val3'
]

arr.forEach(item => {
  console.log(item)
  fs.writeFile('./path.json', item, _ => {
    console.log('termine')
  })
})
