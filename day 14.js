const input = require('fs').readFileSync('./day 14.txt', {
  encoding: 'utf8'
})

const polymer = input.split('\r\n\r\n')[0]
const rules = input.split('\r\n\r\n')[1].split('\r\n').map(v => {
  return {
    pair: v.split(' -> ')[0],
    insert: v.split(' -> ')[1]
  }
})

function letterFrequency (str) { // from stackoverflow
  const map = str.split('').reduce((result, c) => {
    const count = result[c] || 0
    result[c] = count + 1
    return result
  }, {})
  return Object.keys(map).map((k) => map[k])
}

function part1 (polymer) {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < polymer.length - 1; j++) {
      const rule = rules.findIndex((v) => v.pair === polymer.slice(j, j + 2))
      if (rule >= 0) {
        polymer = polymer.slice(0, j + 1) + rules[rule].insert + polymer.slice(j + 1)
        j++
      }
    }
    // console.log(letterFrequency(polymer));
  }
  return letterFrequency(polymer).sort((a, b) => a - b).slice(-1)[0] - letterFrequency(polymer).sort((a, b) => a - b)[0]
}

function part2 () {
  // init find pairs
  const pairs = {}

  const firstLtr = polymer[0]
  const lastLtr = polymer.slice(-1)[0]
  for (let i = 0; i < polymer.length - 1; i++) {
    pairs[polymer.slice(i, i + 2)] = 1
  }

  for (let i = 0; i < 40; i++) {
    const newpairs = {}
    for (const p in pairs) {
      if (pairs[p] > 0) {
        const rule = rules.find(v => v.pair === p)
        if (newpairs[rule.pair[0] + rule.insert]) newpairs[rule.pair[0] + rule.insert] += pairs[p]
        else newpairs[rule.pair[0] + rule.insert] = pairs[p]

        if (newpairs[rule.insert + rule.pair[1]]) newpairs[rule.insert + rule.pair[1]] += pairs[p]
        else newpairs[rule.insert + rule.pair[1]] = pairs[p]

        pairs[p] = 0
      }
    }
    //    console.log("pairs",pairs);
    //    console.log("newpairs",newpairs);
    for (const np in newpairs) {
      if (pairs[np]) {
        pairs[np] += newpairs[np]
      } else {
        pairs[np] = newpairs[np]
      }
    }
  }

  const letters = {}
  for (const p in pairs) {
    if (letters[p[0]]) letters[p[0]] += pairs[p]
    else letters[p[0]] = pairs[p]
    if (letters[p[1]]) letters[p[1]] += pairs[p]
    else letters[p[1]] = pairs[p]
  }
  letters[firstLtr]++
  letters[lastLtr]++

  for (const l in letters) {
    letters[l] /= 2
  }

  // console.log(letters);
  return Array.from(Object.values(letters)).sort((a, b) => a - b).slice(-1)[0] - Array.from(Object.values(letters)).sort((a, b) => a - b)[0]
}

console.log('part 1: ', part1(polymer))
console.log('part 2: ', part2())
