const input = require('fs').readFileSync('./day 5.txt', {
  encoding: 'utf8'
}).split('\r\n').map(v => {
  return {
    x1: Number(v.split(' -> ')[0].split(',')[0]),
    y1: Number(v.split(' -> ')[0].split(',')[1]),
    x2: Number(v.split(' -> ')[1].split(',')[0]),
    y2: Number(v.split(' -> ')[1].split(',')[1])
  }
})

function part1 () {
  const diagram = []

  input.forEach(e => {
    if (e.x1 === e.x2) {
      const minY = (e.y1 < e.y2) ? e.y1 : e.y2
      const maxY = (e.y1 > e.y2) ? e.y1 : e.y2

      for (let i = minY; i <= maxY; i++) {
        diagram[`${e.x1}${i}`] = diagram[`${e.x1}${i}`] + 1 || 1
      }
    }
    if (e.y1 === e.y2) {
      const minX = (e.x1 < e.x2) ? e.x1 : e.x2
      const maxX = (e.x1 > e.x2) ? e.x1 : e.x2
      for (let i = minX; i <= maxX; i++) {
        diagram[`${i}${e.y1}`] = diagram[`${i}${e.y1}`] + 1 || 1
      }
    }
  })

  return Object.values(diagram).filter(v => v > 1).length
}

function part2 () {
  const diagram = []

  input.forEach(e => {
    const dirX = (e.x1 === e.x2) ? 0 : (e.x1 > e.x2) ? -1 : 1
    const dirY = (e.y1 === e.y2) ? 0 : (e.y1 > e.y2) ? -1 : 1

    let x = e.x1
    let y = e.y1
    diagram[`${x},${y}`] = diagram[`${x},${y}`] + 1 || 1
    while (x !== e.x2 || y !== e.y2) {
      x += dirX
      y += dirY
      diagram[`${x},${y}`] = diagram[`${x},${y}`] + 1 || 1
    }
  })

  return Object.values(diagram).filter(v => v > 1).length
}

console.log('part 1 : ', part1())
console.log('part 2 : ', part2())
