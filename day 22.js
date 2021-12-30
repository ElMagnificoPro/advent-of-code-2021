const input = require('fs').readFileSync('./day 22.txt', {
  encoding: 'utf8'
}).split('\r\n').map(v => {
  return {
    state: v.split(' ')[0],
    xMin: Number(v.split('x=')[1].split('..')[0]),
    xMax: Number(v.split('..')[1].split(',')[0]),
    yMin: Number(v.split('y=')[1].split('..')[0]),
    yMax: Number(v.split('..')[2].split(',')[0]),
    zMin: Number(v.split('z=')[1].split('..')[0]),
    zMax: Number(v.split('..')[3].split(',')[0])
  }
})

function part1() {
  const cubes = new Set()

  input.forEach((rule) => {
    if (rule.xMin >= -50 && rule.xMax <= 50 &&
      rule.yMin >= -50 && rule.yMax <= 50 &&
      rule.zMin >= -50 && rule.zMax <= 50) {
      for (let x = rule.xMin; x <= rule.xMax; x++) {
        for (let y = rule.yMin; y <= rule.yMax; y++) {
          for (let z = rule.zMin; z <= rule.zMax; z++) {
            if (rule.state === 'on') {
              cubes.add(`${x},${y},${z}`)
            } else {
              cubes.delete(`${x},${y},${z}`)
            }
          }
        }
      }
    }
  })

  return cubes.size
}

function part2() {
  class Cube {
    constructor(xMin, xMax, yMin, yMax, zMin, zMax) {
      this.xMin = xMin
      this.xMax = xMax
      this.yMin = yMin
      this.yMax = yMax
      this.zMin = zMin
      this.zMax = zMax
    }

    volume() {
      return (this.xMax - this.xMin + 1) * (this.yMax - this.yMin + 1) * (this.zMax - this.zMin + 1)
    }

    isOverlapping(cube) {
      return (this.xMin <= cube.xMax && this.xMax >= cube.xMin &&
        this.yMin <= cube.yMax && this.yMax >= cube.yMin &&
        this.zMin <= cube.zMax && this.zMax >= cube.zMin)
    }

    getOverlap(cube) {
      const xMin = Math.max(this.xMin, cube.xMin)
      const xMax = Math.min(this.xMax, cube.xMax)
      const yMin = Math.max(this.yMin, cube.yMin)
      const yMax = Math.min(this.yMax, cube.yMax)
      const zMin = Math.max(this.zMin, cube.zMin)
      const zMax = Math.min(this.zMax, cube.zMax)
      return new Cube(xMin, xMax, yMin, yMax, zMin, zMax)
    }
  }

  const cubesOn = []
  const CubesOff = []
  for (const rule of input) {
    const curr = new Cube(rule.xMin, rule.xMax, rule.yMin, rule.yMax, rule.zMin, rule.zMax)
    const overlaps = []
    const rewritten = []
    for (const cube of cubesOn) if (curr.isOverlapping(cube)) overlaps.push(curr.getOverlap(cube))
    for (const cube of CubesOff) if (curr.isOverlapping(cube)) rewritten.push(curr.getOverlap(cube))
    cubesOn.push(...rewritten)
    CubesOff.push(...overlaps)
    if (rule.state === 'on') { cubesOn.push(curr) }
  }

  let count = 0
  for (const cube of cubesOn) count += cube.volume()
  for (const cube of CubesOff) count -= cube.volume()
  return count
}

console.log('part 1: ', part1())
console.log('part 2: ', part2())
