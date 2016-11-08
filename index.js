{
  const { Ship, GridGenerator, Renderer } = window.battleship
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
      col: parseInt(coordinates.charAt(1), 10) - 1
    }
  }

  const shootAtGrid = (cell) => {
    const pad = '&nbsp;&nbsp'
    log.push('-- Shoot at ' + convertToCordinates(cell))

    if (grid.didTakeShotAt(cell)) {
      log.push(pad + ' Already shot at this cell')
      return
    }

    const ship = grid.takeShotAt(cell)

    if (ship) {
      const shipName = ship.getName()
      log.push(`${pad} HIT: ${shipName}</span>`)

      if (ship.isSunken()) {
        log.push(`${pad} Ship sunk: ${shipName}`)
      }

      if (grid.isOver()) {
        log.push(`${pad} No ships left`)
        log.push('<hr/>')
        log.push('<center>THE END</center>')
      }
    } else {
      log.push(pad + ' MISS')
    }
  }

  const grid = GridGenerator.generate(GRID_SIZE, ALLOWED_SHIPS)
  const log = []

  const gameEl = document.querySelector('.game')
  const formEl = document.querySelector('form')

  formEl.addEventListener('submit', e => {
    e.preventDefault()

    if (grid.isOver()) {
      return
    }

    const inputValue = formEl.querySelector('input').value.trim().toUpperCase()
    const cell = convertToCell(inputValue)

    if (grid.containsCell(cell)) {
      shootAtGrid(cell)
    } else {
      log.push('-- Invalid coordinates: ' + inputValue)
    }

    renderer.render(grid, log)
  })

  gameEl.addEventListener('click', e => {
    const target = e.target

    if (!grid.isOver() && target.classList.contains('grid__cell')) {
      const cellData = target.getAttribute('data-cell')
      const [row, col] = cellData.split(',').map(Number)
      const cell = { row, col }

      shootAtGrid(cell)
      renderer.render(grid, log)
    }
  })

  const renderer = new Renderer(gameEl)

  renderer.render(grid, log)
}
