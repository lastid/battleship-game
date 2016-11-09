{
  class Grid {
    constructor (size, ships) {
      this._size = size
      this._ships = ships
      this._shots = []
      this._cheating = false
    }

    getSize () {
      return this._size
    }

    isCheating () {
      return this._cheating
    }

    setCheating (cheating) {
      this._cheating = cheating
    }

    containsCell ({ row, col }) {
      const size = this._size

      return (row >= 0 && col >= 0) && (row < size && col < size)
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
