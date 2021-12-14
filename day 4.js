const test = require('fs').readFileSync('./day 4.txt', {
  encoding: 'utf8'
})

const draws = test.split('\r\n')[0].split(',').map(v => Number(v))

let boards = test.split('\r\n\r\n').slice(1).map(v => v.split('\r\n').map(v => v.split(' ').filter(v => v !== '')))

function markNumber (draw) {
  boards = boards.map(v => v.map(v => v.map(v => {
    return (Number(v) === draw) ? '*' : v
  })))
}

function checkBingo (i) {
  const board = boards[i]
  // horizontal
  let x = 0; let y = 0

  while (x < board.length) {
    while (y < board[x].length && board[x][y] === '*') {
      y++
    }

    if (y >= board[x].length) return true

    y = 0
    x++
  }

  // vertical

  x = 0
  y = 0
  while (y < board[x].length) {
    while (x < board.length && board[x][y] === '*') {
      x++
    }
    if (x >= board.length) return true
    x = 0
    y++
  }
  return false
}

function part1 () {
  let draw = 0
  let bingo = false
  let index = 0

  while (draw < draws.length && !bingo) {
    markNumber(draws[draw])
    index = 0

    while (index < boards.length && !bingo) {
      bingo = checkBingo(index)
      index++
    }
    draw++
  }

  if (bingo) {
    draw--
    index--

    const wboard = boards[index]
    let sum = 0

    for (let i = 0; i < wboard.length; i++) {
      for (let j = 0; j < wboard[i].length; j++) {
        if (wboard[i][j] !== '*') {
          sum += Number(wboard[i][j])
        }
      }
    }
    return sum * draws[draw]
  }
}

function part2 () {
  let draw = 0
  let bingo = false
  let index = 0

  const bingos = []

  while (draw < draws.length && bingos.length < boards.length) {
    markNumber(draws[draw])
    index = 0

    while (index < boards.length) {
      bingo = checkBingo(index)
      if (bingo) {
        if (bingos.indexOf(index) < 0) {
          bingos.push(index)
        }
        bingo = false
      }
      index++
    }
    draw++
  }

  if (bingos.length >= boards.length) {
    draw--
    index--

    const wboard = boards[bingos[bingos.length - 1]]
    let sum = 0

    for (let i = 0; i < wboard.length; i++) {
      for (let j = 0; j < wboard[i].length; j++) {
        if (wboard[i][j] !== '*') {
          sum += Number(wboard[i][j])
        }
      }
    }

    return sum * draws[draw]
  }
}

console.log('part 1: ', part1())
console.log('part 2: ', part2())
