const input = require('fs').readFileSync('./day 8.txt', {
  encoding: 'utf8'
}).split('\r\n')

function part1 () {
  let sum = 0
  input.forEach(e => {
    sum += e.split(' | ')[1].split(' ').filter(v => {
      return [2, 3, 4, 7].includes(v.length)
    }).length
  })
  return sum
}

function part2 () {
  let sum = 0

  input.forEach(message => {
    let numbers = Array(10)

    const line = message.split(' | ')[0].split(' ')

    while (line.length > 0) {
      for (let i = 0; i < line.length; i++) {
        const e = line[i]

        // find 1
        if (e.length === 2) {
          numbers[1] = e
          line.splice(i, 1)
          break
        }
        // find 7
        if (e.length === 3) {
          numbers[7] = e
          line.splice(i, 1)
          break
        }
        // find 4
        if (e.length === 4) {
          numbers[4] = e
          line.splice(i, 1)
          break
        }
        // find 8
        if (e.length === 7) {
          numbers[8] = e
          line.splice(i, 1)
          break
        }
        // find 6
        if (e.length === 6) {
          if (numbers[1] && !numbers[1].split('').every(v => e.includes(v))) {
            numbers[6] = e
            line.splice(i, 1)
            break
          } else
          // find 9
          if (numbers[4] && numbers[4].split('').every(v => e.includes(v))) {
            numbers[9] = e
            line.splice(i, 1)
            break
          } else
          // find 0
          if (numbers[9] && numbers[6]) {
            numbers[0] = e
            line.splice(i, 1)
            break
          }
        }
        // find 3
        if (e.length === 5) {
          if (numbers[1] && numbers[1].split('').every(v => e.includes(v))) {
            numbers[3] = e
            line.splice(i, 1)
            break
          } else
          // find 5
          if (numbers[6] && e.split('').every(v => numbers[6].includes(v))) {
            numbers[5] = e
            line.splice(i, 1)
            break
          } else
          // find 2
          if (numbers[3] && numbers[5]) {
            numbers[2] = e
            line.splice(i, 1)
            break
          }
        }
      }
    }

    numbers = numbers.map(v => v.split('').sort().join(''))
    let output = message.split(' | ')[1].split(' ')
    output = output.map(v => numbers.indexOf(v.split('').sort().join('')))

    sum += Number(output.join(''))
  })

  return sum
}

console.log('part 1: ', part1())
console.log('part 2: ', part2())
