let [p1pos, p2pos, p1score, p2score] = [5, 6, 0, 0]
// let [p1pos, p2pos, p1score, p2score] = [4, 8, 0, 0]
p1pos--
p2pos--

function part1() {
  let lastRoll = 0
  let turn = 0

  function roll() {
    return ((++lastRoll) % 1000) + ((++lastRoll) % 1000) + ((++lastRoll) % 1000)
  }

  while (p1score < 1000 && p2score < 1000) {
    if (++turn % 2) {
      p1pos = (p1pos + roll()) % 10
      p1score += p1pos + 1
    } else {
      p2pos = (p2pos + roll()) % 10
      p2score += p2pos + 1
    }
  }

  return ((p1score > p2score) ? p2score : p1score) * turn * 3
}

const rollsTotal = {
  3: 1,
  4: 3,
  5: 6,
  6: 7,
  7: 6,
  8: 3,
  9: 1
}

const cache = {}

function countWins({ p1pos, p2pos, p1score, p2score, p1turn, rollSum }) {
  if (p1turn) {
    p1pos = (p1pos + rollSum) % 10
    p1score += p1pos + 1
    p1turn = !p1turn
  } else {
    p2pos = (p2pos + rollSum) % 10
    p2score += p2pos + 1
    p1turn = !p1turn
  }
  if (p1score >= 21) {
    return {
      p1wins: 1,
      p2wins: 0
    }
  }
  if (p2score >= 21) {
    return {
      p1wins: 0,
      p2wins: 1
    }
  }
  return splitUniverse({ p1pos, p2pos, p1score, p2score, p1turn })
}

function splitUniverse({ p1pos, p2pos, p1score, p2score, p1turn }) {
  const univ = [p1pos, p2pos, p1score, p2score, p1turn].join(',')
  if (cache[univ]) {
    return cache[univ]
  }
  const wins = {
    p1wins: 0,
    p2wins: 0
  }
  for (const rollSum in rollsTotal) {
    const w = countWins({
      p1pos,
      p2pos,
      p1score,
      p2score,
      p1turn,
      rollSum
    })
    wins.p1wins += w.p1wins * rollsTotal[rollSum]
    wins.p2wins += w.p2wins * rollsTotal[rollSum]
  }
  cache[univ] = wins
  return wins
}

console.log('part 1: ', part1())
const part2 = splitUniverse({ p1pos, p2pos, p1score: 0, p2score: 0, p1turn: true })
console.log('part 2: ', Math.max(part2.p1wins, part2.p2wins))
