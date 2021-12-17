const input = require('fs').readFileSync('./day 15.txt', {
  encoding: 'utf8'
}).split('\r\n').map(v => v.split('').map(v => Number(v)))

// console.log(input)

const shortestPath = (matrix) => {
  const adjacent = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1]
  ]
  const queue = [{ pos: [0, 0], cost: 0 }]
  const visited = new Set()
  while (queue.length) {
    const {
      pos: [x, y],
      cost
    } = queue.shift()
    if (y === matrix.length - 1 && x === matrix[0].length - 1) {
      return cost
    }

    adjacent.map(([dx, dy]) => [dx + x, dy + y])
      .filter(([x, y]) => matrix[y]?.[x])
      .filter(pos => !visited.has(pos + ''))
      .forEach(pos => {
        visited.add(pos + '')
        queue.push({ pos, cost: cost + matrix[pos[1]][pos[0]] })
      })
    queue.sort((a, b) => a.cost - b.cost)
  }
}

const newInput = JSON.parse(JSON.stringify(input))

for (let i = 0; i < input.length; i++) {
  for (let j = input.length; j < input.length * 5; j++) {
    newInput[i][j] = (newInput[i][j - input.length] + 1) % 10
    if (newInput[i][j] === 0) newInput[i][j] = 1
  }
}
for (let i = input.length; i < input.length * 5; i++) {
  newInput[i] = []
  for (let j = 0; j < input.length * 5; j++) {
    newInput[i][j] = (newInput[i - input.length][j] + 1) % 10
    if (newInput[i][j] === 0) newInput[i][j] = 1
  }
}

console.log('part 1: ', shortestPath(input))
console.log('part 2: ', shortestPath(newInput))
