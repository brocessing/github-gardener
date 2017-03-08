'use strict'

const readline = require(`readline`)
const cursorPosition = require(`get-cursor-position`)

const MOVEMENTS = [
  { name: `up`,
    x: 0,
    y: -1 },
  { name: `right`,
    x: 2,
    y: 0 },
  { name: `down`,
    x: 0,
    y: 1 },
  { name: `left`,
    x: -2,
    y: 0 }]

function cursor (opts = {}) {
  opts = Object.assign({
    start: position()
  }, opts)

  const api = {
    data: opts,
    position,
    key,
    setPos,
    move,
    bounds,
    listen
  }

  setPos({
    x: bounds().left,
    y: bounds().up - 1
  })

  function position (opts = {}) {
    return {
      x: cursorPosition.sync().col,
      y: cursorPosition.sync().row
    }
  }

  function key (opts = {}) {
    opts = Object.assign({}, opts)

    return new Promise((resolve, reject) => {
      process.stdin.on(`keypress`, (char, key) => {
        if (key.name === opts.name) resolve(key)
      })
    })
  }

  function setPos (opts) {
    readline.cursorTo(process.stdin, opts.x, opts.y)
    return api
  }

  function move (opts) {
    readline.moveCursor(process.stdin, opts.x, opts.y)
    return api
  }

  function bounds (opts) {
    return {
      up:  api.data.start.y - api.data.rows + 1,
      right: api.data.columns,
      down: api.data.start.y,
      left: 0
    }
  }

  function isBound (opts) {
    if (opts.x < api.bounds().left || opts.x > api.bounds().right) return false
    if (opts.y < api.bounds().up || opts.y > api.bounds().down) return false
    return true
  }

  function listen (opts = MOVEMENTS) {
    process.stdin.on(`keypress`, (char, key) => {
      for (let movement of opts) {
        if (key.name === movement.name) {
          let bound = isBound({
            x: position().x + movement.x,
            y: position().y + movement.y
          })
          if (bound) return move(movement)
          else return api
        }
      }
    })
    return api
  }

  return api
}

module.exports = cursor