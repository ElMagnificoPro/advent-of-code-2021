let input = require('fs').readFileSync('./day 13.txt', {
  encoding: 'utf8'
})

const instr = input.split('\r\n\r\n')[1].split('\r\n').map((v) => {
  return [v.split(' ')[2].split('=')[0], Number(v.split('=')[1])]
})
input = input.split('\r\n\r\n')[0].split('\r\n').map(v => v.split(',').map(v => Number(v)))

function part1 (input) {
  if (instr[1][0] === 'y') {
    for (let j = 0; j < input.length; j++) {
      if (input[j][1] > instr[1][1]) {
        input[j][1] = (instr[1][1] * 2) - input[j][1]
      }
    }
  }
  if (instr[1][0] === 'x') {
    for (let j = 0; j < input.length; j++) {
      if (input[j][0] > instr[1][1]) {
        input[j][0] = (instr[1][1] * 2) - input[j][0]
      }
    }
  }
  return Array.from(new Set(input.map(JSON.stringify)), JSON.parse).length
}

function part2 (input) {
  // change size according to input or test
  let maxX = (instr[0][0] === 'x') ? instr[0][1] * 2 + 1 : instr[1][1] * 2 + 1
  let maxY = (instr[0][0] === 'y') ? instr[0][1] * 2 + 1 : instr[1][1] * 2 + 1

  for (let i = 0; i < instr.length; i++) {
    if (instr[i][0] === 'y') {
      for (let j = 0; j < input.length; j++) {
        if (input[j][1] > instr[i][1]) {
          input[j][1] = (instr[i][1] * 2) - input[j][1]
        }
      }
      maxY = Math.floor(maxY / 2)
    }
    if (instr[i][0] === 'x') {
      for (let j = 0; j < input.length; j++) {
        if (input[j][0] > instr[i][1]) {
          input[j][0] = (instr[i][1] * 2) - input[j][0]
        }
      }
      maxX = Math.floor(maxX / 2)
    }
  }

  Array.from(new Set(input.map(JSON.stringify)), JSON.parse)
  print(maxX, maxY)
}

function print (maxX, maxY) {
  let arr = []
  for (let i = 0; i < maxY; i++) {
    arr[i] = []
    for (let j = 0; j < maxX; j++) {
      arr[i].push(' ')
    }
  }

  for (let i = 0; i < input.length; i++) {
    const e = input[i]
    arr[e[1]][e[0]] = '#'
  }

  arr = arr.map(v => v.join('')).join('\r\n')
  console.log(arr)
  return arr
}

console.log('part 1: ', part1(input))
console.log('part 2: ')
part2(input)
