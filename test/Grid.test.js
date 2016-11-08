/* global describe, beforeEach, it, expect */

describe('Grid', () => {
  const { Ship, Grid } = window.battleship
  const GRID_SIZE = 10
  let grid

  beforeEach(() => {
    const ship = new Ship('fake', [{ row: 0, col: 0 }])

    grid = new Grid(GRID_SIZE, [ship])
  })

  it('is well created', () => {
    expect(grid.getSize()).toEqual(GRID_SIZE)
    expect(grid.containsCell({ row: 0, col: 5 })).toBe(true)
    expect(grid.containsCell({ row: -1, col: 0 })).toBe(false)
    expect(grid.containsCell({ row: 10, col: 9 })).toBe(false)
    expect(grid.getCellTypeAt({ row: 1, col: 1 })).toEqual(Grid.CELL_EMPTY)
    expect(grid.getCellTypeAt({ row: 0, col: 0 })).toEqual(Grid.CELL_OCCUPIED)
  })

  it('takes correct shots', () => {
    const cellHit = { row: 0, col: 0 }
    const cellMiss = { row: 1, col: 1 }
    grid.takeShotAt(cellHit)
    grid.takeShotAt(cellMiss)

    expect(grid.didTakeShotAt(cellHit)).toEqual(true)
    expect(grid.getCellTypeAt(cellHit)).toEqual(Grid.CELL_HIT)
    expect(grid.getCellTypeAt(cellMiss)).toEqual(Grid.CELL_MISSED)
  })

  it('is over when no ships left', () => {
    expect(grid.isOver()).toBe(false)

    grid.takeShotAt({ row: 0, col: 0 })
    expect(grid.isOver()).toBe(true)
  })
})
