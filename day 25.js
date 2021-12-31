const input = require('fs').readFileSync('./day 25.txt', { encoding: 'utf8' })
  .split('\r\n').map(v => v.split(''))

/*
function print(arr) {
return arr.map(v => v.join('')).join('\n')
}
*/
function step(input) {
  function fillArr(x, y) {
    const arr = []
    for (let i = 0; i < y; i++) {
      arr[i] = []
      for (let j = 0; j < x; j++) {
        arr[i][j] = '.'
      }
    }
    return arr
  }

  let nextStep = []
  nextStep = fillArr(input[0].length, input.length)
  // east first
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x + 1] && input[y][x] === '>' && input[y][x + 1] === '.') {
        nextStep[y][x + 1] = '>'
      } else if (input[y][x] === '>' && input[y][0] === '.' && x === input[y].length - 1) {
        nextStep[y][0] = '>'
      } else if (input[y][x] === '>') {
        nextStep[y][x] = '>'
      }
    }
  }
  // then south
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (input[y + 1] && input[y][x] === 'v' && nextStep[y + 1][x] === '.' && input[y + 1][x] !== 'v') {
        nextStep[y + 1][x] = 'v'
      } else if (input[y][x] === 'v' && nextStep[0][x] === '.' && input[0][x] !== 'v' && y === input.length - 1) {
        nextStep[0][x] = 'v'
      } else if (input[y][x] === 'v') {
        nextStep[y][x] = 'v'
      }
    }
  }
  return nextStep
}

function compair(arr1, arr2) {
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr1[i].length; j++) {
      if (arr1[i][j] !== arr2[i][j]) return false
    }
  }
  return true
}

let currentStep = input
let nextStep = step(currentStep)
let steps = 1

while (!compair(currentStep, nextStep)) {
  steps++
  currentStep = nextStep
  nextStep = step(currentStep)
}

console.log(steps)
