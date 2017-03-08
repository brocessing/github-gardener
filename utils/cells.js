'use strict'

const moment = require(`moment`)

function cells (opts = {}) {
  opts = Object.assign({
    from: moment().startOf(`week`).subtract(1, `year`),
    to: moment().startOf(`day`)
  }, opts)

  let data = []

  let currentDate = opts.from.clone()
  while (currentDate.add(1, `day`).diff(opts.to) <= 0) {
    data.push({
      date: currentDate.clone().toDate(),
      day: currentDate.day(),
      color: 0
    })
  }

  return data
}

module.exports = cells