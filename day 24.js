const input = require('fs').readFileSync('./day 24.txt', { encoding: 'utf8' })

let ans1 = ''
let ans2 = ''

const ranges = []
const top = []
const adds = []
let c = 0
const chunks = input.split('inp w\r\n').slice(1)

for (const ch in chunks) {
  adds.push(parseInt((chunks[ch].match(/add y w\r\nadd y (.+)\r\n/))[1]))
  const tadd = parseInt((chunks[ch].match(/add x (.+)\r\neql x w/))[1])
  let topadd = 0
  if (top.length > 0) topadd = adds[top[top.length - 1]]

  if (topadd + tadd < 9 && topadd + tadd > -9) {
    const diff = topadd + tadd
    ranges[c] = []
    ranges[top[top.length - 1]] = []
    if (diff < 0) {
      for (let r = 1; r <= 9 + diff; r++) {
        ranges[top[top.length - 1]].push(r - diff)
        ranges[c].push(r)
      }
    } else {
      for (let r = 1 + diff; r <= 9; r++) {
        ranges[top[top.length - 1]].push(r - diff)
        ranges[c].push(r)
      }
    }
    top.pop()
  }

  if (chunks[ch].indexOf('div z 26') === -1) top.push(c)
  c++
}
for (let i = 0; i < 14; i++) {
  ans1 += ranges[i][ranges[i].length - 1]
  ans2 += ranges[i][0]
}

console.log('')
console.log('part 1: ' + ans1)
console.log('part 2: ' + ans2)
