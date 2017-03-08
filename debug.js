
const gui = require(`./bin/gui`)
const app = gui()

const cells = require(`./utils/cells`)()

const graphUI = app.graph({
    rows: 7,
    columns: 53,
    cells: cells
  })
  .render()

const cursor = app.cursor(graphUI.data).startMove()