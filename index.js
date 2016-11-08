{
  const { Ship, Grid, Renderer } = window.battleship
  const GRID_SIZE = 10
  const ALLOWED_SHIPS = [
    Ship.TYPE_BATTLESHIP, Ship.TYPE_DESTROYER, Ship.TYPE_DESTROYER
  ]
  const letterACharCode = 'A'.charCodeAt(0)

  // convert grid cell (e.g. {row: 0, col: 6} ) to coordinates (eg. A5)
  const convertToCordinates = (cell) => {
    return String.fromCharCode(cell.row + letterACharCode) + (cell.col + 1)
  }

  // convert coordinates (eg. A5) to grid cell (e.g. {row: 0, col: 6} )
  const convertToCell = (coordinates) => {
    return {
      row: coordinates.charCodeAt(0) - letterACharCode,
      col: coordinates.charAt(1)
    }
  }

  const grid = new Grid(GRID_SIZE, ALLOWED_SHIPS)
  const log = []

  const gameEl = document.querySelector('.game')

  gameEl.addEventListener('click', e => {
    const target = e.target

    if (target.classList.contains('grid__cell')) {
      const cellData = target.getAttribute('data-cell')
      const [row, col] = cellData.split(',').map(Number)
      const cell = { row, col }
      const cellType = grid.getCellTypeAt(cell)

      if (cellType === Grid.CELL_EMPTY || cellType === Grid.CELL_OCCUPIED) {
        const ship = grid.takeShotAt(cell)
        const pad = '&nbsp;&nbsp'

        log.push('-- Shoot at ' + convertToCordinates(cell))

        if (ship) {
          const shipName = ship.getName()
          log.push(`${pad} Hit ship: ${shipName}</span>`)

          if (ship.isSunken()) {
            log.push(`${pad} Ship sunk: ${shipName}`)
          }

          if (grid.countRemainingShips() === 0) {
            log.push(`${pad} No ships left`)
            log.push('-- THE END --')
          }
        } else {
          log.push(`${pad} Missed`)
        }

        renderer.render(grid, log)
      }
    }
  })

  const renderer = new Renderer(gameEl)

  renderer.render(grid, log)
}
