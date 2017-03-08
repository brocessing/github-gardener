'use strict'

const sortBy = require(`lodash/sortBy`)
const filter =require(`lodash/filter`)
const find = require(`lodash/find`)

const sh = require(`kool-shell`)()
const log = require(`kool-shell/plugins/log`)
sh.use(log)

function graph (opts = {}) {
  opts = Object.assign({}, opts)

  const api = {
    data: opts,
    render
  }

  function render (cells = opts.cells) {

    let columns = (even(process.stdout.columns) < 159)
      ? even(process.stdout.columns) : 159

    for (let i = 0; i < opts.rows; i++) {
      let filteredCells = filter(cells, (o) => {
        return o.day === i
      })

      filteredCells = filteredCells.slice(0, columns/2)

      let days = new String()
      for (let j in filteredCells) {
        days += `${filteredCells[j].day}︎ `
      }

      if (i !== 6) days += `\n`

      process.stdout.write(days)
    }

    return api
  }

  return api
}

function even (n) {
  if (n%2 === 0) return n
  return n-1
}


module.exports = graph