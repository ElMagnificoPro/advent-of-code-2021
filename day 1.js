const test = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263]

const input = require('fs').readFileSync('./day 1.txt', {
  encoding: 'utf-8'
}).split('\r\n').map(v => Number(v))

// part 1
let count = 0
input.forEach((v, i, arr) => {
  if (v > arr[i - 1]) count++
})
console.log('part 1 :', count)

// part 2
count = 0
input.forEach((v, i, arr) => {
  if (arr[i] + arr[i + 1] + arr[i + 2] > arr[i - 1] + arr[i] + arr[i + 1]) count++
})

console.log('part 2 :', count)
