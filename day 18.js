const input = require('fs').readFileSync('./day 18.txt', {
  encoding: 'utf8'
}).split('\r\n')

function explode(str) {
  let depth = 0
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '[') depth++
    else if (str[i] === ']') depth--
    else if (depth > 4) {
      const [pair, left, right] = str.slice(i).match(/(\d+),(\d+)/)

      const leftPart = str.slice(0, i - 1)
        .replace(/(\d+)([[\],]+)$/, (match, p1, p2) => `${Number(p1) + Number(left)}${p2}`)

      const rightPart = str.slice(i + pair.length + 1)
        .replace(/(\d+)/, v => Number(v) + Number(right))

      return leftPart + '0' + rightPart
    }
  }
  return str
}

function split(str) {
  return str.replace(
    /(\d\d+)/,
    v => `[${Math.floor(Number(v) / 2)},${Math.ceil(Number(v) / 2)}]`
  )
}

function reduce(str) {
  let curr = str
  while (true) {
    const prev = curr
    curr = explode(prev)
    if (curr !== prev) continue
    curr = split(prev)
    if (curr !== prev) continue

    return curr
  }
}

function add(str1, str2) {
  return '[' + str1 + ',' + str2 + ']'
}

function magnitude(node) {
  if (typeof node === 'string') node = JSON.parse(node)
  if (!Array.isArray(node)) return node
  return 3 * magnitude(node[0]) + 2 * magnitude(node[1])
}

function part1() {
  let str = input[0]
  for (let i = 1; i < input.length; i++) {
    str = add(str, input[i])
    str = reduce(str)
  }
  return magnitude(str)
}

function getAllPairs() {
  const arr = []
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input.length; j++) {
      if (i !== j) {
        arr.push([input[i], input[j]])
      }
    }
  }
  return arr
}

function part2() {
  return getAllPairs().map(v => magnitude(reduce(add(v[0], v[1])))).sort((a, b) => b - a)[0]
}

console.log('part 1 :', part1())
console.log('part 2 :', part2())
