const input = require('fs').readFileSync('./day 2.txt', { encoding: 'utf8' }).split('\r\n')

const test = [
  'forward 5',
  'down 5',
  'forward 8',
  'up 3',
  'down 8',
  'forward 2'
]

// part 1

let depth = 0; let pos = 0

input.forEach(e => {
  if (e.split(' ')[0] === 'forward') pos += Number(e.split(' ')[1])
  if (e.split(' ')[0] === 'up') depth -= Number(e.split(' ')[1])
  if (e.split(' ')[0] === 'down') depth += Number(e.split(' ')[1])
})

console.log('part 1:', pos * depth)

// part 2

let aim = 0
depth = 0; pos = 0

input.forEach(e => {
  if (e.split(' ')[0] === 'down') aim += Number(e.split(' ')[1])
  if (e.split(' ')[0] === 'up') aim -= Number(e.split(' ')[1])
  if (e.split(' ')[0] === 'forward') {
    pos += Number(e.split(' ')[1])
    depth += aim * Number(e.split(' ')[1])
  }
})

console.log('part 2:', pos * depth)
