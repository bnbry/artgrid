const createGrid = ({ gridWidthPixels, gridHeightPixels, cellSizePixels }) => {
  const columnCount = vectorLength(gridWidthPixels, cellSizePixels);
  const rowCount = vectorLength(gridHeightPixels, cellSizePixels);
  const cells = generateCells(rowCount, columnCount, cellSizePixels);

  return {
    gridWidthPixels,
    gridHeightPixels,
    cellSizePixels,
    columnCount,
    rowCount,
    cells,
    resize(cellSizePixels) {
      this.cellSizePixels = cellSizePixels;
      this.columnCount = vectorLength(gridWidthPixels, cellSizePixels);
      this.rowCount = vectorLength(gridWidthPixels, cellSizePixels);
      this.cells = generateCells(
        this.rowCount,
        this.columnCount,
        cellSizePixels
      );
    },
  };
};

// Used to calculate how many rows or columns are needed given the width/height of the grid
// and the width/height of the cells. We add an additional 2 rows/2 columns here so that the
// grid can start and end off screen allowing for a full bleed effect of the grid when cells
// are rendered
const vectorLength = (gridDimensionPixels, cellDimensionPixels) => {
  return Math.ceil(gridDimensionPixels / cellDimensionPixels) + 2;
};

const generateCells = (rowCount, columnCount, size) => {
  let cells = [];
  let index = 0;
  let flourish = Math.floor(Math.random() * rowCount * columnCount);

  for (let i = -1; i < rowCount - 1; i++) {
    for (let j = -1; j < columnCount - 1; j++) {
      const col = j;
      const row = i;
      const x = size * col;
      const y = size * row;
      const data = {};

      cells.push({
        index,
        col,
        row,
        rowCount,
        columnCount,
        size,
        data,
        flourish: flourish == index,
        center: {
          x: Math.floor(x + size / 2),
          y: Math.floor(y + size / 2),
        },
        topLeft: { x, y },
        topRight: { x: x + size, y },
        bottomRight: { x: x + size, y: y + size },
        bottomLeft: { x, y: y + size },
      });

      index++;
    }
  }

  return cells;
};
