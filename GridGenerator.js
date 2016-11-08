{
  const { Ship, Grid } = window.battleship
  // Returns a random integer between min (included) and max (included)
  // From MDN
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

  class GridGenerator {

    static _generateCells (firstCell, size, isHorizontal) {
      const cells = [firstCell]

      for (let i = 1; i < size; i++) {
        let newRow = firstCell.row + (isHorizontal ? 0 : i)
        let newCol = firstCell.col + (isHorizontal ? i : 0)

        cells.push({ row: newRow, col: newCol })
      }

      return cells
    }

    static _validateCells (gridSize, cells, existingShips) {
      // check if all cells are inside the grid
      const okWithGrid = cells.every(cell => {
        return cell.row < gridSize && cell.col < gridSize
      })

      if (okWithGrid) {
        // check if there is any collision with existing ships
        return !existingShips.some(ship => {
          return cells.some(cell => ship.doesOccupy(cell))
        })
      }

      return false
    }

    static _placeShip (gridSize, shipType, existingShips) {
      const shipSize = Ship.getShipTypeSize(shipType)
      const isHorizontal = random(0, 1) === 0
      const ALLOWED_TRY = 1000

      let nTry = 0
      let success = false

      // a grid of 10x10 has plenty of space, this naive implementation of
      // random placing ships have little chance to be stucked in an
      // infinite loop
      while (!success && nTry < ALLOWED_TRY) {
        nTry++
        let firstCell = {
          row: random(0, gridSize - 1),
          col: random(0, gridSize - 1)
        }
        const cells = this._generateCells(firstCell, shipSize, isHorizontal)

        success = this._validateCells(gridSize, cells, existingShips)

        if (success) {
          return new Ship(shipType, cells)
        }
      }

      throw new Error('Cannot place ships randomly. Bad luck today!')
    }

    static generate (size, shipTypes) {
      const ships = []

      shipTypes.forEach(type => ships.push(this._placeShip(size, type, ships)))

      return new Grid(size, ships)
    }
  }

  // export
  window.battleship.GridGenerator = GridGenerator
}

