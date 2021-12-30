const input = require('fs').readFileSync('./day 19 test.txt', { encoding: 'utf8' })
  .split('\r\n\r\n').map(v => v.split('\r\n')
    .filter(v => {
      return v.length && v[1] !== '-'
    })
    .map(v => v.split(',').map(v => Number(v))))

function findCommonModifier(arr) {
  const a = arr.slice(0)
  a.sort((x, y) => x.v - y.v)
  let mx = 1
  let cur = 1
  let res = a[0]
  for (let i = 1; i < a.length; i++) {
    if (a[i].v === a[i - 1].v) {
      cur++
    } else {
      if (cur > mx) {
        mx = cur
        res = a[i - 1]
      }
      cur = 1
    }
  }
  if (cur > mx) {
    mx = cur
    res = a[a.length - 1]
  }
  res.occur = mx
  return res
}

function findTranslation(a, b) {
  const arr = [[], [], [], [], [], [], [], [], []]
  function push(ar, c, op, v) {
    ar.push({ c, v, op })
  }
  for (let i = 0; i < 3; i++) {
    // x translation
    push(arr[0], 0, -1, a[i][0] + b[i][0]) // x0:x1
    push(arr[0], 0, +1, a[i][0] - b[i][0]) // x0:-x1
    push(arr[1], 1, -1, a[i][0] + b[i][1]) // x0:y1
    push(arr[1], 1, +1, a[i][0] - b[i][1]) // x0:-y1
    push(arr[2], 2, -1, a[i][0] + b[i][2]) // x0:z1
    push(arr[2], 2, +1, a[i][0] - b[i][2]) // x0:-z1
    // y translation
    push(arr[3], 1, -1, a[i][1] + b[i][1]) // y0:y1
    push(arr[3], 1, +1, a[i][1] - b[i][1]) // y0:-y1
    push(arr[4], 0, -1, a[i][1] + b[i][0]) // y0:x1
    push(arr[4], 0, +1, a[i][1] - b[i][0]) // y0:-x1
    push(arr[5], 2, -1, a[i][1] + b[i][2]) // y0:z1
    push(arr[5], 2, +1, a[i][1] - b[i][2]) // y0:-z1
    // z translation
    push(arr[6], 2, -1, a[i][2] + b[i][2]) // z0:z1
    push(arr[6], 2, +1, a[i][2] - b[i][2]) // z0:-z1
    push(arr[7], 0, -1, a[i][2] + b[i][0]) // z0:x1
    push(arr[7], 0, +1, a[i][2] - b[i][0]) // z0:-x1
    push(arr[8], 1, -1, a[i][2] + b[i][1]) // z0:y1
    push(arr[8], 1, +1, a[i][2] - b[i][1]) // z0:-y1
  }
  const xyzTranslations = []
  for (const mod of arr) {
    const most = findCommonModifier(mod)
    if (most.occur === 3) xyzTranslations.push(most)
  }
  return xyzTranslations
}

function distance(a, b) {
  let sum = 0
  for (const i in a) {
    sum += (a[i] - b[i]) ** 2
  }
  return sum
}

function createBeaconThumbprints(A) {
  const beacons = []
  A.forEach((scanner, scannerIndex) => {
    scanner.forEach((beacon, beaconIndex) => {
      const bc = { scannerIndex, beaconIndex, peers: [] }

      scanner.forEach((to, toIndex) => {
        if (beaconIndex === toIndex) return
        const d = distance(beacon, to)
        bc.peers.push({ i: toIndex, d })
      })

      bc.peers.sort((a, b) => a.d - b.d).splice(2)
      bc.sum = bc.peers.reduce((ac, c) => ac + c.d, 0)
      bc.psum = distance(scanner[bc.peers[0].i], scanner[bc.peers[1].i])
      bc.hash = bc.sum * bc.psum
      bc.tri = [beacon, scanner[bc.peers[0].i], scanner[bc.peers[1].i]]
      beacons.push(bc)
    })
  })
  return beacons
}

const foundScanners = new Map()
let beacons = createBeaconThumbprints(input)
const uniq = new Set(beacons.map((x) => x.hash))

// part 2
while (foundScanners.size < input.length - 1) {
  for (const a of beacons.filter((x) => x.scannerIndex === 0)) {
    for (const b of beacons.filter((x) => x.scannerIndex > 0)) {
      if (foundScanners.has(b.scannerIndex)) continue
      if (a.hash === b.hash) {
        const translations = findTranslation(a.tri, b.tri)
        foundScanners.set(b.scannerIndex, { a, b, translations })
      }
    }
  }

  for (const [idx, match] of foundScanners) {
    for (const beacon of input[idx]) {
      const t = match.translations
      const a = [
        t[0].v + beacon[t[0].c] * t[0].op, // x
        t[1].v + beacon[t[1].c] * t[1].op, // y
        t[2].v + beacon[t[2].c] * t[2].op // z
      ]
      if (!input[0].some((b) => b[0] === a[0] && b[1] === a[1] && b[2] === a[2])) input[0].push(a)
    }
  }

  beacons = createBeaconThumbprints(input)
}

const scanners = [[0, 0, 0]]
for (const [idx, match] of foundScanners) {
  const t = match.translations
  scanners[idx] = [t[0].v, t[1].v, t[2].v]
}

let farthest = 0
for (const a of scanners) {
  for (const b of scanners) {
    const d =
      Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2])
    farthest = Math.max(d, farthest)
  }
}

console.log('part 1: ' + uniq.size)
console.log('part 2: ' + farthest)
