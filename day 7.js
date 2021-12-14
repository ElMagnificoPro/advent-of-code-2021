const input = require('fs').readFileSync('./day 7.txt', {
  encoding: 'utf8'
}).split(',').map(v => Number(v))

// eslint-disable-next-line no-unused-vars
const test = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14]

// input = test

function getMedian (arr) {
  const middle = Math.floor(arr.length / 2)
  arr = [...arr].sort((a, b) => a - b)
  return arr.length % 2 !== 0 ? arr[middle] : (arr[middle - 1] + arr[middle]) / 2
};

function getSum (n) {
  let sum = 0
  for (let i = 1; i <= n; i++) {
    sum += i
  }
  return sum
};

function part1 () { // median
  let fuel = 0
  const median = getMedian(input)

  for (let i = 0; i < input.length; i++) {
    fuel += Math.abs(input[i] - median)
  }

  return fuel
}

function part2 () { // average??
  const average1 = Math.ceil(input.reduce((a, b) => a + b) / input.length)
  const average2 = Math.floor(input.reduce((a, b) => a + b) / input.length)

  let fuel1 = 0
  for (let i = 0; i < input.length; i++) {
    fuel1 += getSum(Math.abs(input[i] - average1))
  }

  let fuel2 = 0
  for (let i = 0; i < input.length; i++) {
    fuel2 += getSum(Math.abs(input[i] - average2))
  }

  return Math.min(fuel1, fuel2)
}

console.log('part 1: ', part1())
console.log('part 2: ', part2())
