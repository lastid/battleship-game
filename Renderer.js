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
        [Grid.CELL_MISSED]: 'miss',
        [Grid.CELL_OCCUPIED]: grid.isCheating() ? 'occupied' : '',
        [Grid.CELL_HIT]: 'hit'
      }
      const cellClassName = cellClassMap[cellType]

      if (cellClassName) {
        classNames.push('grid__cell--' + cellClassName)
      }

      return `<td class='${classNames.join(' ')}' data-cell='${row},${col}'></td>`
    }

    _renderRow (grid, row) {
      const rowLabel = String.fromCharCode('A'.charCodeAt(0) + row)
      const labelCell = `<th class='grid__row-label'>${rowLabel}</th>`
      const cells = [...Array(grid.getSize()).keys()].map(
          col => this._renderCell(grid, row, col)
      )

      return `<tr class='grid__row'>${labelCell}${cells.join('')}</tr>`
    }

    _renderGrid (grid) {
      const arrayNumbers = [...Array(grid.getSize()).keys()]
      const emptyCell = "<th class='grid__col-label'></th>"
      const headerRow = '<tr>' + emptyCell + arrayNumbers.map(
          i => `<th class='grid__col-label'>${i + 1}</th>`
      ).join('') + '</tr>'

      const rows = arrayNumbers.map(
          rowNumber => this._renderRow(grid, rowNumber)
      )

      return `
        <div class='grid'>
          <table class='grid__inner'>${headerRow}${rows.join('')}</table>
        </div>
      `
    }

    render (grid, log) {
      const content = this._renderGrid(grid) + this._renderLog(log)

      this._el.innerHTML = content

      // scroll log panel to the bottom aka lastest events
      const logLinesEl = document.querySelector('.log__lines')
      logLinesEl.scrollTop = logLinesEl.scrollHeight
    }
  }

  window.battleship.Renderer = Renderer
}
