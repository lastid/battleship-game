/* global describe, it, expect */

describe('GridGenerator', () => {
  const { GridGenerator, Ship } = window.battleship

  it('creates a correct grid', () => {
    const GRID_SIZE = 10
    const grid = GridGenerator.generate(
        GRID_SIZE, [Ship.TYPE_DESTROYER, Ship.TYPE_BATTLESHIP]
    )

    expect(grid.getSize()).toEqual(GRID_SIZE)

    const ships = grid._ships
    const [destroyer, battleship] = ships

    expect(ships.length).toEqual(2)
    expect(destroyer.getType()).toEqual(Ship.TYPE_DESTROYER)

    expect(destroyer._cells.length).toEqual(Ship.getShipTypeSize(Ship.TYPE_DESTROYER))

    const dCells = destroyer._cells
    const bCells = battleship._cells

    // check if ships are in the grid
    let isIn = dCells.every(cell => grid.containsCell(cell))
    expect(isIn).toBe(true)
    isIn = bCells.every(cell => grid.containsCell(cell))
    expect(isIn).toBe(true)

    // check there is no overlapping cell
    let overlapped = dCells.some(dCell => {
      // check if battleship cells contain a destroyer cell
      return bCells.some(
          bCell => dCell.row === bCell.row && dCell.col === bCell.col
      )
    })

    expect(overlapped).toBe(false)
  })
})
