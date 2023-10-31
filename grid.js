const createGrid = ({gridWidthPixels, gridHeightPixels, cellSizePixels}) => {
  const columnCount = Math.ceil(gridWidthPixels / cellSizePixels);
  const rowCount = Math.ceil(gridHeightPixels / cellSizePixels);
  const cells = generateCells(rowCount, columnCount, cellSizePixels);

  return {
    gridWidthPixels,
    gridHeightPixels,
    cellSizePixels,
    columnCount,
    rowCount,
    cells,
    getCenter() {
      return this.cellAt(Math.floor(this.rowCount / 2) - 1, Math.floor(this.columnCount / 2) - 1);
    },
    cellAt(rowTarget, colTarget) {
      return this.cells.find(({row, col}) => rowTarget == row && colTarget == col);
    },
    resize(cellSizePixels) {
      this.cellSizePixels = cellSizePixels;
      this.columnCount = Math.ceil(this.gridWidthPixels / cellSizePixels);
      this.rowCount = Math.ceil(this.gridHeightPixels / cellSizePixels);
      this.cells = generateCells(this.rowCount, this.columnCount, cellSizePixels);
    },
  };
};

const generateCells = (rowCount, columnCount, size) => {
  let cells = [];

  for(let i = 0; i < rowCount; i++) {
    for(let j = 0; j < columnCount; j++) {
      const idx = i * columnCount + j;
      const col = j;
      const row = i;
      const x = size * col;
      const y = size * row;
      const xPos = size * col;
      const yPos = size * row;
      const data = {};

      cells.push({
        idx,
        col,
        row,
        x,
        y,
        size,
        data,
        width: size,
        height: size,
        center: { xPos: Math.floor(x + size / 2), yPos: Math.floor(y + size / 2) },
        tl: { xPos, yPos },
        tr: { xPos: xPos + size, yPos },
        br: { xPos: xPos + size, yPos: yPos + size },
        bl: { xPos, yPos: yPos + size },
      })
    }
  }

  return cells;
}
