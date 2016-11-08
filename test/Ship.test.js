/* global describe, beforeEach, it, expect */

describe('Ship', () => {
  const { Ship } = window.battleship
  let ship

  beforeEach(() => {
    const shipSize = Ship.getShipTypeSize(Ship.TYPE_DESTROYER)
    const range = [...Array(shipSize).keys()]
    const cells = range.map(i => ({row: 0, col: i}))

    ship = new Ship(Ship.TYPE_DESTROYER, cells)
  })

  it('is in good condition after creation', () => {
    expect(ship.getType()).toEqual(Ship.TYPE_DESTROYER)
    expect(ship.getName()).toEqual('Destroyer')
    expect(ship.isSunken()).toBe(false)
    expect(ship.doesOccupy({row: 0, col: 0})).toBe(true)
    expect(ship.doesOccupy({row: 1, col: 0})).toBe(false)
  })

  it('is damaged when get hit', () => {
    const cell = { row: 0, col: 0 }

    ship.addHitCell(cell)
    expect(ship.isHitAt(cell))
    expect(ship.isSunken()).toBe(false)
  })

  it('is sunken when all parts are hit', () => {
    ship._cells.map(cell => ship.addHitCell(cell))

    expect(ship.isSunken()).toBe(true)
  })
})
