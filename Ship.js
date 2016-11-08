{
  const TYPE_BATTLESHIP = 1
  const TYPE_DESTROYER = 2

  const ShipName = {
    [TYPE_BATTLESHIP]: 'Battleship',
    [TYPE_DESTROYER]: 'Destroyer'
  }

  const ShipSize = {
    [TYPE_BATTLESHIP]: 5,
    [TYPE_DESTROYER]: 4
  }

  const cellArrayContains = (cells, cell) => {
    return cells.some(c => c.row === cell.row && c.col === cell.col)
  }

  class Ship {
    constructor (type, cells) {
      this._type = type
      this._cells = cells
      this._hits = []
    }

    getType () {
      return this._type
    }

    isSunken () {
      return this._hits.length === this._cells.length
    }

    doesOccupy (cell) {
      return cellArrayContains(this._cells, cell)
    }

    addHitCell (cell) {
      if (this.doesOccupy(cell)) {
        this._hits.push(Object.assign({}, cell))
      } else {
        console.warn('Shoot at non occupied cell')
      }
    }

    isHitAt (cell) {
      return cellArrayContains(this._hits, cell)
    }

    getName () {
      return ShipName[this.getType()]
    }

    static getShipTypeSize (type) {
      return ShipSize[type]
    }
  }

  // export
  Ship.TYPE_BATTLESHIP = TYPE_BATTLESHIP
  Ship.TYPE_DESTROYER = TYPE_DESTROYER

  window.battleship.Ship = Ship
}
