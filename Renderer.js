{
  const { Grid } = window.battleship

  class Renderer {
    constructor (el) {
      this._el = el
    }

    _renderLog (log) {
      return `
        <div class='log'>
          <div>
            <center>Logs</center>
            <hr />
          </div>
          <div class='log__lines'>${log.join('<br/>')}</div>
        </div>
      `
    }

    _renderCell (grid, row, col) {
      const classNames = ['grid__cell']

      const cellType = grid.getCellTypeAt({ row, col })
      const cellClassMap = {
        [Grid.CELL_EMPTY]: '',
        [Grid.CELL_MISSED]: 'missed',
        [Grid.CELL_OCCUPIED]: 'occupied',
        [Grid.CELL_HIT]: 'hit'
      }
      const cellClassName = cellClassMap[cellType]

      if (cellClassName) {
        classNames.push('grid__cell--' + cellClassName)
      }

      return `<span class='${classNames.join(' ')}' data-cell='${row},${col}'></span>`
    }

    _renderRow (grid, row) {
      const cells = [...Array(grid.getSize()).keys()].map(
          col => this._renderCell(grid, row, col)
      )

      return `<div class='grid__row'>${cells.join('')}</div>`
    }

    _renderGrid (grid) {
      // create a range from 0 -> grid size and get html for each row
      const rows = [...Array(grid.getSize()).keys()].map(
          row => this._renderRow(grid, row)
      )

      return `
        <div class='grid'>${rows.join('')}</div>
      `
    }

    render (grid, log) {
      const content = this._renderGrid(grid) + this._renderLog(log)

      this._el.innerHTML = content

      const logLinesEl = document.querySelector('.log__lines')
      logLinesEl.scrollTop = logLinesEl.scrollHeight
    }
  }

  window.battleship.Renderer = Renderer
}
