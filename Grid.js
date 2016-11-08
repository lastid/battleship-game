{
  // Returns a random integer between min (included) and max (included)
  // From MDN
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

  class Grid {
    constructor (size, shipTypes) {
      this._size = size

      this._ships = this._placeShips(shipTypes)
      this._shots = []
    }

    getSize () {
      return this._size
    }

    _generateCells (firstCell, size, isHorizontal) {
      const cells = [firstCell]

      for (let i = 1; i < size; i++) {
        let newRow = firstCell.row + (isHorizontal ? 0 : i)
        let newCol = firstCell.col + (isHorizontal ? i : 0)

        cells.push({ row: newRow, col: newCol })
      }

      return cells
    }

    _validateCells (cells, existingShips) {
      // check if any cell is inside the grid
      const okWithGrid = cells.every(cell => {
        return cell.row < this._size && cell.col < this._size
      })

      if (okWithGrid) {
        // check if there is any collision with existing ships
        return !existingShips.some(ship => {
          return cells.some(cell => ship.doesOccupy(cell))
        })
      }

      console.log('not ok with grid')
      return false
    }

    _placeShip (shipType, existingShips) {
      const { Ship } = window.battleship
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
          row: random(0, this._size - 1),
          col: random(0, this._size - 1)
        }
        const cells = this._generateCells(firstCell, shipSize, isHorizontal)

        success = this._validateCells(cells, existingShips)

        if (success) {
          return new Ship(shipType, cells)
        }
      }

      throw new Error('Cannot place ships randomly. Bad luck today!')
    }

    _placeShips (shipTypes) {
      const ships = []

      shipTypes.forEach(type => {
        ships.push(this._placeShip(type, ships))
      })

      return ships
    }

    containsCell ({ row, col }) {
      const size = this._size

      return (row >= 0 && col >= 0) && (row < size && col < this._size)
    }

    didTakeShotAt (cell) {
      return this._shots.some(
          shot => shot.row === cell.row && shot.col === cell.col
      )
    }

    getCellTypeAt (cell) {
      for (let i = 0; i < this._ships.length; i++) {
        const ship = this._ships[i]

        if (ship.isHitAt(cell)) {
          return Grid.CELL_HIT
        }

        if (ship.doesOccupy(cell)) {
          return Grid.CELL_OCCUPIED
        }
      }

      if (this.didTakeShotAt(cell)) {
        return Grid.CELL_MISSED
      }

      return Grid.CELL_EMPTY
    }

    // return null if no ship is hit, otherwise return the hit ship
    takeShotAt (cell) {
      this._shots.push(cell)

      for (let i = 0; i < this._ships.length; i++) {
        const ship = this._ships[i]

        if (ship.doesOccupy(cell)) {
          ship.addHitCell(cell)

          return ship
        }
      }

      return null
    }

    isOver () {
      const ships = this._ships

      return ships.filter(ship => ship.isSunken()).length === ships.length
    }
  }

  Grid.CELL_EMPTY = 1
  Grid.CELL_MISSED = 2
  Grid.CELL_OCCUPIED = 3
  Grid.CELL_HIT = 4

  // export
  window.battleship.Grid = Grid
}
