const input = require('fs').readFileSync('./day 16.txt', { encoding: 'utf8' })

function bin2hex(txt) {
  const dict = {
    0: '0000',
    1: '0001',
    2: '0010',
    3: '0011',
    4: '0100',
    5: '0101',
    6: '0110',
    7: '0111',
    8: '1000',
    9: '1001',
    A: '1010',
    B: '1011',
    C: '1100',
    D: '1101',
    E: '1110',
    F: '1111'
  }

  let ret = ''

  for (let i = 0; i < txt.length; i++) {
    ret += dict[txt[i]]
  }

  return ret
}

let globalIndex = 0
let versionSum = 0

function parse(input) {
  if (parseInt(input.slice(globalIndex)) === 0 || globalIndex >= input.length) {
    return
  }
  const packet = {}
  packet.version = parseInt(input.slice(globalIndex + 0, globalIndex + 3), 2)
  packet.id = parseInt(input.slice(globalIndex + 3, globalIndex + 6), 2)
  versionSum += packet.version

  if (packet.id === 4) {
    let final = false
    globalIndex += 6
    packet.data = ''
    while (!final) {
      packet.data += input.slice(globalIndex + 1, globalIndex + 5)
      final = (input.charAt(globalIndex) === '0')
      globalIndex += 5
    }
    packet.value = parseInt(packet.data, 2)
  } else {
    packet.lType = input.slice(globalIndex + 6, globalIndex + 7)
    if (packet.lType === '0') {
      packet.length = parseInt(input.slice(globalIndex + 7, globalIndex + 7 + 15), 2)
      globalIndex += 15
      globalIndex += 7
      const ltype0 = globalIndex + packet.length
      packet.subPacket = []
      do {
        packet.subPacket.push(parse(input))
      } while (globalIndex < ltype0)
    } else {
      packet.length = parseInt(input.slice(globalIndex + 7, globalIndex + 7 + 11), 2)
      globalIndex += 11
      globalIndex += 7
      packet.subPacket = []
      for (let i = 0; i < packet.length; i++) {
        packet.subPacket.push(parse(input))
      }
    }
  }

  if (packet.subPacket) {
    if (packet.id === 0) {
      packet.value = packet.subPacket.map((v) => v.value).reduce((a, b) => a + b)
    }
    if (packet.id === 1) {
      packet.value = packet.subPacket.map((v) => v.value).reduce((a, b) => a * b)
    }
    if (packet.id === 2) {
      packet.value = packet.subPacket.map((v) => v.value).sort((a, b) => a - b)[0]
    }
    if (packet.id === 3) {
      packet.value = packet.subPacket.map((v) => v.value).sort((a, b) => b - a)[0]
    }
    if (packet.id === 5) {
      packet.value = (packet.subPacket[0].value > packet.subPacket[1].value) ? 1 : 0
    }
    if (packet.id === 6) {
      packet.value = (packet.subPacket[0].value < packet.subPacket[1].value) ? 1 : 0
    }
    if (packet.id === 7) {
      packet.value = (packet.subPacket[0].value === packet.subPacket[1].value) ? 1 : 0
    }
  }
  return packet
}

const result = parse(bin2hex(input))

console.log('part 1: ', versionSum)
console.log('part 2: ', result.value)
