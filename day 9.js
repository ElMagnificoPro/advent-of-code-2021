const input = require('fs').readFileSync('./day 9.txt', {
  encoding: 'utf8'
}).split('\r\n').map(v => v.split('').map(v => Number(v)))

function getAdj (x, y) {
  const arr = []
  arr.push((input[y - 1]) ? input[y - 1][x] ?? 9 : 9)
  arr.push((input[y + 1]) ? input[y + 1][x] ?? 9 : 9)
  arr.push(input[y][x - 1] ?? 9)
  arr.push(input[y][x + 1] ?? 9)

  return arr
}

const lowPoints = []
const lowPointsPos = []
for (let y = 0; y < input.length; y++) {
  for (let x = 0; x < input[y].length; x++) {
    const e = input[y][x]

    if (getAdj(x, y).filter(v => {
      return e < v
    }).length === 4) {
      lowPoints.push(e)
      lowPointsPos.push({
        x,
        y
      })
    }
  }
}
console.log('part 1: ', lowPoints.reduce((a, b) => a + b) + lowPoints.length)

const basinMap = input.map(v => v.map(v => v < 9))

const width = basinMap[0].length
const height = basinMap.length
const basins = []

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    if (!basinMap[y][x]) {
      continue
    }

    const queue = []

    let size = 0

    queue.push([x, y])

    while (queue.length) {
      const [x, y] = queue.pop()

      if (!basinMap[y][x]) {
        continue
      }

      size++
      basinMap[y][x] = false

      x - 1 >= 0 && basinMap[y][x - 1] && queue.push([x - 1, y])
      x + 1 < width && basinMap[y][x + 1] && queue.push([x + 1, y])
      y - 1 >= 0 && basinMap[y - 1][x] && queue.push([x, y - 1])
      y + 1 < height && basinMap[y + 1][x] && queue.push([x, y + 1])
    }

    basins.push(size)
  }
}

console.log('part 2: ', basins.sort((a, b) => b - a).slice(0, 3).reduce((a, b) => a * b, 1))
