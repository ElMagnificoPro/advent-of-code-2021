let input = {
  xmin: 32,
  xmax: 65,
  ymin: -225,
  ymax: -177
}
const test = {
  xmin: 20,
  xmax: 30,
  ymin: -10,
  ymax: -5
}

// input = test

function shoot(x, y) {
  let currX = 0
  let currY = 0
  let vx = x
  let vy = y
  let maxHeight = 0
  while (currX <= input.xmax && currY >= input.ymin) {
    currX += vx
    currY += vy
    vx -= Math.sign(vx)
    vy--
    if (currY > maxHeight) {
      maxHeight = currY
    }
    if (currX >= input.xmin && currX <= input.xmax && currY >= input.ymin && currY <= input.ymax) {
      // console.log(x, y)
      return maxHeight
    }
  }
  return null
}

let part1 = 0
let part2 = 0

for (let y = -1000; y <= 1000; y++) {
  for (let x = 1; x <= 1000; x++) {
    const result = shoot(x, y)
    if (result != null) {
      part1 = result
      part2++
      // console.log(best, x, y)
    }
  }
}

console.log(part1, part2)
// console.log(shoot(6, 9))
