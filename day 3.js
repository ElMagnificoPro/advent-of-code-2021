// eslint-disable-next-line no-unused-vars
const test = ['00100', '11110', '10110', '10111', '10101', '01111', '00111', '11100', '10000', '11001', '00010', '01010']

const input = require('fs').readFileSync('./day 3.txt', {
  encoding: 'utf8'
}).split('\r\n')

let gamma = ''
let epsilon = ''
let zeroCount = 0
let oneCount = 0

for (let i = 0; i < input[0].length; i++) {
  for (let j = 0; j < input.length; j++) {
    if (input[j].charAt(i) === '0') zeroCount++
    if (input[j].charAt(i) === '1') oneCount++
  }

  if (zeroCount > oneCount) {
    gamma += '0'; epsilon += '1'
  } else {
    gamma += '1'; epsilon += '0'
  }
}

// console.log(gamma ,parseInt(gamma,2),epsilon,parseInt(epsilon,2));
console.log('part 1: ', parseInt(gamma, 2) * parseInt(epsilon, 2))

function countCommon (array, i) {
  let zeroCount = 0
  let oneCount = 0
  for (let j = 0; j < array.length; j++) {
    if (array[j].charAt(i) === '1') oneCount++
    if (array[j].charAt(i) === '0') zeroCount++
  }

  if (zeroCount > oneCount) return 0
  else return 1
}

let index = 0
let oxygen = input
let co2 = input

while (oxygen.length > 1 && index < oxygen[0].length) {
  const common = countCommon(oxygen, index)
  oxygen = oxygen.filter((v) => {
    return parseInt(v.charAt(index)) === common
  })
  index++
}

index = 0
while (co2.length > 1 && index < co2[0].length) {
  const common = countCommon(co2, index)
  co2 = co2.filter((v) => {
    return parseInt(v.charAt(index)) !== common
  })
  index++
}

// console.log(oxygen,parseInt(oxygen[0],2),co2,parseInt(co2[0],2));
console.log('part 2 :', parseInt(oxygen[0], 2) * parseInt(co2[0], 2))
