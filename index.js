{
  const { Ship, GridGenerator, Renderer } = window.battleship

  const LETTER_A_CODE = 'A'.charCodeAt(0)

  // convert grid cell (e.g. {row: 0, col: 6} ) to coordinates (eg. A5)
  const convertToCordinates = (cell) => {
    return String.fromCharCode(cell.row + LETTER_A_CODE) + (cell.col + 1)
  }

  // convert coordinates (eg. A5) to grid cell (e.g. {row: 0, col: 6} )
  const convertToCell = (coordinates) => {
    return {
      row: coordinates.charCodeAt(0) - LETTER_A_CODE,
      col: parseInt(coordinates.substring(1), 10) - 1
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

        document.body.classList.add('game-over')
      }
    } else {
      log.push(pad + ' MISS')
    }
  }

  const addListeners = (gameEl, formEl) => {
    formEl.addEventListener('submit', e => {
      e.preventDefault()

      const inputEl = formEl.querySelector('input')
      const coordinates = inputEl.value.trim().toUpperCase()

      if (grid.isOver() || !coordinates) {
        return
      }

      const cell = convertToCell(coordinates)

      if (grid.containsCell(cell)) {
        shootAtGrid(cell)
        inputEl.value = ''
      } else {
        log.push('-- Invalid coordinates: ' + coordinates)
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

    const toggleShipsLink = document.querySelector('.shot-form__toggle-ships')
    toggleShipsLink.addEventListener('click', e => {
      e.preventDefault()

      if (grid.isOver()) {
        return
      }

      grid.setCheating(!grid.isCheating())
      toggleShipsLink.innerHTML = grid.isCheating() ? 'Hide ships' : 'Show ships'
      renderer.render(grid, log)
    })
  }

  const GRID_SIZE = 10
  const ALLOWED_SHIPS = [
    Ship.TYPE_BATTLESHIP, Ship.TYPE_DESTROYER, Ship.TYPE_DESTROYER
  ]
  const grid = GridGenerator.generate(GRID_SIZE, ALLOWED_SHIPS)
  const log = []
  const gameEl = document.querySelector('.game')
  const formEl = document.querySelector('form')
  const renderer = new Renderer(gameEl)

  addListeners(gameEl, formEl)

  renderer.render(grid, log)
}
