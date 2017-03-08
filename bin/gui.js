// 'use strict'

const sh = require(`kool-shell`)()
const log = require(`kool-shell/plugins/log`)
sh.use(log)

const readline = require(`readline`)
readline.emitKeypressEvents(process.stdin)
if (process.stdin.isTTY) process.stdin.setRawMode(true);

function gui () {
  const api = {
    graph: require(`../utils/graph`),
    cursor: require(`../utils/cursor`)
  }

  readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  })

  process.stdin.on(`keypress`, (char, key) => {
    if (key.name === `c` && key.ctrl) {
      process.exit(`SIGINT`)
    }
    if (key.name === `z` && key.ctrl) {
      process.exit(`SIGSTP`)
    }
  })

  return api
}

module.exports = gui