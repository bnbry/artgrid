const renderTenPrint = ({ artboard, grid }) => {
  renderCells({
    artboard,
    grid,
    cellRenderer: ({ artboard, cell }) => {
      const rightToLeft = coinFlip();
      const lineCap = "square";
      const lineWidth = 4;
      let color = artboard.inkColor();
      let fromCellPoint, toCellPoint;

      if (rightToLeft) {
        fromCellPoint = cell.topRight;
        toCellPoint = cell.bottomLeft;
      } else {
        fromCellPoint = cell.topLeft;
        toCellPoint = cell.bottomRight;
      }

      const { x: xStart, y: yStart } = fromCellPoint;
      const { x: xFinish, y: yFinish } = toCellPoint;

      artboard.drawLine({
        xStart,
        yStart,
        xFinish,
        yFinish,
        lineCap,
        lineWidth,
        color,
      });
    },
  });
};

const renderScribble = ({ artboard, grid }) => {
  renderCells({
    artboard,
    grid,
    cellRenderer: ({ artboard, cell }) => {
      if (coinFlip()) {
        return;
      }

      const lineCap = "square";
      const lineWidth = 1;
      const xBounds = {
        min: cell.topLeft.x - cell.size,
        max: cell.bottomRight.x + cell.size,
      };
      const yBounds = {
        min: cell.topLeft.y - cell.size,
        max: cell.bottomRight.y + cell.size,
      };

      let xStart = noise(xBounds);
      let yStart = noise(yBounds);

      for (i = 1; i <= 20; i++) {
        const xFinish = noise(xBounds);
        const yFinish = noise(yBounds);
        const alpha = i / 20;
        const color = artboard.inkColor({ a: alpha });

        artboard.drawLine({
          xStart,
          yStart,
          xFinish,
          yFinish,
          color,
          lineCap,
          lineWidth,
        });

        xStart = xFinish;
        yStart = yFinish;
      }
    },
  });
};

const renderScribble1 = ({ artboard, grid }) => {
  renderCells({
    artboard,
    grid,
    cellRenderer: ({ artboard, cell }) => {
      const lineCap = "square";
      const lineWidth = 1;
      const xBounds = {
        min: cell.topLeft.x - cell.size,
        max: cell.bottomRight.x + cell.size,
      };
      const yBounds = {
        min: cell.topLeft.y - cell.size,
        max: cell.bottomRight.y + cell.size,
      };

      let xStart = noise(xBounds);
      let yStart = noise(yBounds);

      for (i = 1; i <= 100; i++) {
        const xFinish = noise(xBounds);
        const yFinish = noise(yBounds);
        const alpha = i / 100;
        let color = artboard.inkColor({ a: alpha });

        artboard.drawLine({
          xStart,
          yStart,
          xFinish,
          yFinish,
          color,
          lineCap,
          lineWidth,
        });

        xStart = xFinish;
        yStart = yFinish;
      }
    },
  });
};

const renderScribble2 = ({ artboard, grid }) => {
  renderCells({
    artboard,
    grid,
    cellRenderer: ({ artboard, cell }) => {
      const lineCap = "square";
      const lineWidth = 1;
      const xBounds = {
        min: cell.topLeft.x + cell.size * 0.05,
        max: cell.bottomRight.x - cell.size * 0.05,
      };
      const yBounds = {
        min: cell.topLeft.y + cell.size * 0.05,
        max: cell.bottomRight.y - cell.size * 0.05,
      };

      let xStart = noise(xBounds);
      let yStart = noise(yBounds);

      for (i = 1; i <= 20; i++) {
        const xFinish = noise(xBounds);
        const yFinish = noise(yBounds);
        const alpha = 1;
        const color = artboard.inkColor({ a: alpha });

        artboard.drawLine({
          xStart,
          yStart,
          xFinish,
          yFinish,
          color,
          lineCap,
          lineWidth,
        });

        xStart = xFinish;
        yStart = yFinish;
      }
    },
  });
};

const renderScribble3 = ({ artboard, grid }) => {
  renderCells({
    artboard,
    grid,
    cellRenderer: ({ artboard, cell }) => {
      const lineCap = "square";
      const lineWidth = 1;
      const xBounds = {
        min: cell.topLeft.x + cell.size * 0.025,
        max: cell.bottomRight.x - cell.size * 0.025,
      };
      const yBounds = {
        min: cell.topLeft.y + cell.size * 0.025,
        max: cell.bottomRight.y - cell.size * 0.025,
      };

      let xStart = noise(xBounds);
      let yStart = noise(yBounds);

      for (i = 1; i <= 50; i++) {
        const xFinish = noise(xBounds);
        const yFinish = noise(yBounds);
        const alpha = i / 50;
        const color = artboard.inkColor({ a: alpha });

        artboard.drawLine({
          xStart,
          yStart,
          xFinish,
          yFinish,
          color,
          lineCap,
          lineWidth,
        });

        xStart = xFinish;
        yStart = yFinish;
      }
    },
  });
};

const renderGravel1 = ({ artboard, grid }) => {
  for (i = 0; i < 20; i++) {
    renderCells({
      artboard,
      grid,
      cellRenderer: ({ artboard, cell }) => {
        let color = artboard.inkColor();
        const width = cell.size;
        const height = cell.size;
        const lineWidth = 2;
        const x = noise({ max: cell.row, min: -cell.row });
        const y = noise({ max: cell.row, min: -cell.row });
        const plusOrMinus = coinFlip() ? 1 : -1;
        const rotateMultiplier = 2;
        const rotateAmt =
          ((cell.row * Math.PI) / 180) *
          (Math.random() * rotateMultiplier * plusOrMinus);

        artboard.translate(cell.center.x, cell.center.y);
        artboard.rotate(rotateAmt);
        artboard.drawRect({
          x: x - cell.size / 2,
          y: y - cell.size / 2,
          width,
          height,
          color,
          lineWidth,
        });
        artboard.restore();
      },
    });
  }
};

const renderGravel = ({ artboard, grid }) => {
  renderCells({
    artboard,
    grid,
    cellRenderer: ({ artboard, cell }) => {
      let color = artboard.inkColor();
      const width = cell.size;
      const height = cell.size;
      const lineWidth = 2;
      const x = noise({ max: cell.row, min: -cell.row });
      const y = noise({ max: cell.row, min: -cell.row });
      const plusOrMinus = coinFlip() ? 1 : -1;
      const rotateMultiplier = 2;
      const rotatePlacement = (cell.row / cell.rowCount) * 50;
      const rotateAmt =
        ((rotatePlacement * Math.PI) / 180) * (Math.random() * plusOrMinus);

      artboard.translate(cell.center.x, cell.center.y);
      artboard.rotate(rotateAmt);
      artboard.drawRect({
        x: x - cell.size / 2,
        y: y - cell.size / 2,
        width,
        height,
        color,
        lineWidth,
      });
      artboard.restore();
    },
  });
};

const renderGlitch1 = ({ artboard, grid }) => {
  for (i = 0; i < 20; i++) {
    renderCells({
      artboard,
      grid,
      cellRenderer: ({ artboard, cell }) => {
        let lineWidth = sample([1, 2, 4, 8]);
        let color = artboard.randomColor();

        if (coinFlip()) {
          artboard.fillRect({
            x:
              cell.topLeft.x +
              Math.floor((Math.random() * cell.size) / lineWidth) -
              cell.size,
            y:
              cell.topLeft.y +
              Math.floor((Math.random() * cell.size) / lineWidth) -
              cell.size,
            width: Math.floor(Math.random() * cell.size),
            height: Math.floor(Math.random() * cell.size),
            color,
          });
        } else {
          artboard.drawRect({
            x: cell.topLeft.x + Math.random() * cell.size - cell.size,
            y: cell.topLeft.y + Math.random() * cell.size - cell.size,
            width: Math.random() * i * cell.size,
            height: Math.random() * i * cell.size,
            lineWidth,
            color,
          });
        }
      },
    });
  }
};

const renderWeb = ({ artboard, grid }) => {
  renderCells({
    artboard,
    grid,
    cellRenderer: ({ artboard, cell }) => {
      let lineWidth = 2;
      let color = artboard.inkColor();
      const rectWidth = Math.floor(Math.random() * cell.size);

      artboard.fillRect({
        x: cell.topLeft.x + Math.floor(Math.random() * rectWidth),
        y: cell.topLeft.y + Math.floor(Math.random() * cell.size),
        width: rectWidth,
        height: Math.random() * cell.size + cell.size * 0.25,
        color,
      });

      let colors = [
        artboard.bgColor(),
        artboard.inkColor(),
        artboard.bgColor(),
        artboard.inkColor(),
        artboard.bgColor(),
      ];

      colors.forEach((color, index) => {
        artboard.fillRect({
          x: cell.topLeft.x + Math.floor((Math.random() * cell.size) / index),
          y: cell.topLeft.y + Math.floor((Math.random() * cell.size) / index),
          width: Math.floor(Math.random() * cell.size * index),
          height: Math.floor(Math.random() * cell.size * index),
          color,
        });
      });

      colors.forEach((color, index) => {
        artboard.drawRect({
          x: cell.topLeft.x + Math.random() * cell.size,
          y: cell.topLeft.y + Math.random() * cell.size,
          width: Math.random() * cell.size,
          height: Math.random() * cell.size,
          lineWidth: index + 1,
          color,
        });
      });

      color = artboard.inkColor();

      artboard.fillRect({
        x: cell.topLeft.x + Math.floor(Math.random() * cell.size),
        y: cell.topLeft.y + Math.floor(Math.random() * cell.size),
        width: Math.floor(Math.random() * cell.size),
        height: Math.floor(Math.random() * cell.size),
        color,
      });

      lineWidth = sample([10, 20]);
      artboard.drawRect({
        x: cell.topLeft.x + Math.random() * sample([1, 2, 3]) * cell.size,
        y: cell.topLeft.y + Math.random() * sample([1, 2, 3]) * cell.size,
        width: Math.random() * sample([5, 10, 15]) * cell.size,
        height: Math.random() * sample([5, 10, 15]) * cell.size,
        lineWidth,
        color,
      });
    },
  });
};

const renderGlitch = ({ artboard, grid }) => {
  renderCells({
    artboard,
    grid,
    cellRenderer: ({ artboard, cell }) => {
      let lineWidth = 2;
      let color = artboard.inkColor();
      const rectWidth = Math.floor(Math.random() * cell.size);

      artboard.fillRect({
        x: cell.topLeft.x + Math.floor(Math.random() * rectWidth),
        y: cell.topLeft.y + Math.floor(Math.random() * cell.size),
        width: rectWidth,
        height: Math.random() * cell.size + cell.size * 0.25,
        color,
      });

      let colors = [
        artboard.bgColor(),
        artboard.inkColor(),
        artboard.bgColor(),
        artboard.inkColor(),
        artboard.bgColor(),
      ];

      colors.forEach((color, index) => {
        artboard.fillRect({
          x: cell.topLeft.x + Math.floor((Math.random() * cell.size) / index),
          y: cell.topLeft.y + Math.floor((Math.random() * cell.size) / index),
          width: Math.floor(Math.random() * cell.size * index),
          height: Math.floor(Math.random() * cell.size * index),
          color,
        });
      });

      colors.forEach((color, index) => {
        artboard.drawRect({
          x: cell.topLeft.x + Math.random() * cell.size,
          y: cell.topLeft.y + Math.random() * cell.size,
          width: Math.random() * cell.size,
          height: Math.random() * cell.size,
          lineWidth: index + 1,
          color,
        });
      });

      color = artboard.inkColor();

      artboard.fillRect({
        x: cell.topLeft.x + Math.floor(Math.random() * cell.size),
        y: cell.topLeft.y + Math.floor(Math.random() * cell.size),
        width: Math.floor(Math.random() * cell.size),
        height: Math.floor(Math.random() * cell.size),
        color,
      });

      lineWidth = sample([10, 20]);
      artboard.drawRect({
        x: cell.topLeft.x + Math.random() * sample([1, 2, 3]) * cell.size,
        y: cell.topLeft.y + Math.random() * sample([1, 2, 3]) * cell.size,
        width: Math.random() * sample([5, 10, 15]) * cell.size,
        height: Math.random() * sample([5, 10, 15]) * cell.size,
        lineWidth,
        color,
      });
    },
  });
};

const renderGrowingHuddle = ({ artboard, grid }) => {
  renderCells({
    artboard,
    grid,
    cellRenderer: ({ artboard, cell }) => {
      const numRects = noise({ min: 5, max: 11 }); // 5-10 rectangles
      // Progress from 0 (top row) to 1 (bottom row)
      const rowProgress =
        cell.rowCount > 1 ? cell.row / (cell.rowCount - 1) : 0;
      // Size range: top = 10-30%, bottom = 80-150%
      const minSize = cell.size * (0.1 + 0.7 * rowProgress); // 0.1 to 0.8
      const maxSize = cell.size * (0.3 + 1.2 * rowProgress); // 0.3 to 1.5
      // Offset range: top = ±10%, bottom = ±80%
      const maxOffset = cell.size * (0.1 + 0.7 * rowProgress); // 0.1 to 0.8
      for (let i = 0; i < numRects; i++) {
        const width = noise({ min: minSize, max: maxSize });
        const height = noise({ min: minSize, max: maxSize });
        const offsetX = noise({ min: -maxOffset, max: maxOffset });
        const offsetY = noise({ min: -maxOffset, max: maxOffset });
        const alpha = Math.random() * 0.6 + 0.2;
        const color = artboard.inkColor({ a: alpha });
        artboard.fillRect({
          x: cell.center.x + offsetX - width / 2,
          y: cell.center.y + offsetY - height / 2,
          width,
          height,
          color,
        });
      }
    },
  });
};

const renderHuddledRects = ({ artboard, grid }) => {
  renderCells({
    artboard,
    grid,
    cellRenderer: ({ artboard, cell }) => {
      const numRects = noise({ min: 4, max: 10 });
      for (let i = 0; i < numRects; i++) {
        // Offset from center, but not too far
        const offsetX = (Math.random() - 0.5) * cell.size * 0.4;
        const offsetY = (Math.random() - 0.5) * cell.size * 0.4;
        const centerX = cell.center.x + offsetX;
        const centerY = cell.center.y + offsetY;
        // Size varies, but not too large
        const width = noise({ min: cell.size * 0.15, max: cell.size * 0.6 });
        const height = noise({ min: cell.size * 0.15, max: cell.size * 0.6 });
        // Opacity varies
        const alpha = Math.random() * 0.7 + 0.2;
        const color = artboard.inkColor({ a: alpha });
        artboard.fillRect({
          x: centerX - width / 2,
          y: centerY - height / 2,
          width,
          height,
          color,
        });
      }
    },
  });
};

const renderRectsAndLines = ({ artboard, grid }) => {
  renderCells({
    artboard,
    grid,
    cellRenderer: ({ artboard, cell }) => {
      // Draw several filled rectangles
      const numFilledRects = noise({ min: 2, max: 5 });
      for (let i = 0; i < numFilledRects; i++) {
        const offsetX = (Math.random() - 0.5) * cell.size * 0.5;
        const offsetY = (Math.random() - 0.5) * cell.size * 0.5;
        const centerX = cell.center.x + offsetX;
        const centerY = cell.center.y + offsetY;
        // 20% chance to far exceed cell bounds
        const exceed = Math.random() < 0.2;
        const width = exceed
          ? noise({ min: cell.size * 1.5, max: cell.size * 3 })
          : noise({ min: cell.size * 0.15, max: cell.size * 0.5 });
        const height = exceed
          ? noise({ min: cell.size * 1.5, max: cell.size * 3 })
          : noise({ min: cell.size * 0.15, max: cell.size * 0.5 });
        const alpha = Math.random() * 0.6 + 0.3;
        const color = artboard.inkColor({ a: alpha });
        artboard.fillRect({
          x: centerX - width / 2,
          y: centerY - height / 2,
          width,
          height,
          color,
        });
      }
      // Draw several stroked rectangles
      const numStrokedRects = noise({ min: 1, max: 4 });
      for (let i = 0; i < numStrokedRects; i++) {
        const offsetX = (Math.random() - 0.5) * cell.size * 0.5;
        const offsetY = (Math.random() - 0.5) * cell.size * 0.5;
        const centerX = cell.center.x + offsetX;
        const centerY = cell.center.y + offsetY;
        // 20% chance to far exceed cell bounds
        const exceed = Math.random() < 0.2;
        const width = exceed
          ? noise({ min: cell.size * 1.5, max: cell.size * 3 })
          : noise({ min: cell.size * 0.2, max: cell.size * 0.7 });
        const height = exceed
          ? noise({ min: cell.size * 1.5, max: cell.size * 3 })
          : noise({ min: cell.size * 0.2, max: cell.size * 0.7 });
        const lineWidth = noise({ min: 1, max: 5 });
        const alpha = Math.random() * 0.5 + 0.2;
        const color = artboard.inkColor({ a: alpha });
        artboard.drawRect({
          x: centerX - width / 2,
          y: centerY - height / 2,
          width,
          height,
          lineWidth,
          color,
        });
      }
      // Draw several lines
      const numLines = noise({ min: 2, max: 6 });
      for (let i = 0; i < numLines; i++) {
        // 20% chance to far exceed cell bounds
        const exceed = Math.random() < 0.2;
        let xStart, yStart, xFinish, yFinish;
        if (exceed) {
          xStart = cell.center.x + (Math.random() - 0.5) * cell.size * 3;
          yStart = cell.center.y + (Math.random() - 0.5) * cell.size * 3;
          xFinish = cell.center.x + (Math.random() - 0.5) * cell.size * 3;
          yFinish = cell.center.y + (Math.random() - 0.5) * cell.size * 3;
        } else {
          xStart = cell.center.x + (Math.random() - 0.5) * cell.size * 0.6;
          yStart = cell.center.y + (Math.random() - 0.5) * cell.size * 0.6;
          xFinish = cell.center.x + (Math.random() - 0.5) * cell.size * 0.6;
          yFinish = cell.center.y + (Math.random() - 0.5) * cell.size * 0.6;
        }
        const lineWidth = noise({ min: 1, max: 4 });
        const alpha = Math.random() * 0.7 + 0.2;
        const color = artboard.inkColor({ a: alpha });
        artboard.drawLine({
          xStart,
          yStart,
          xFinish,
          yFinish,
          lineWidth,
          color,
        });
      }
    },
  });
};

const renderCenterRectAndLineToOtherCell = ({ artboard, grid }) => {
  renderCells({
    artboard,
    grid,
    cellRenderer: ({ artboard, cell }) => {
      // Draw a small rectangle at the center of the cell
      const rectSize = cell.size * 0.2;
      const rectColor = artboard.inkColor({ a: 0.9 });
      artboard.fillRect({
        x: cell.center.x - rectSize / 2,
        y: cell.center.y - rectSize / 2,
        width: rectSize,
        height: rectSize,
        color: rectColor,
      });
      // Find neighbor cells (adjacent: up, down, left, right)
      const neighbors = grid.cells.filter((otherCell) => {
        if (otherCell === cell) return false;
        const sameRow = otherCell.row === cell.row;
        const sameCol = otherCell.col === cell.col;
        const rowDiff = Math.abs(otherCell.row - cell.row);
        const colDiff = Math.abs(otherCell.col - cell.col);
        // Only direct neighbors, not diagonals
        return (sameRow && colDiff === 1) || (sameCol && rowDiff === 1);
      });
      if (neighbors.length > 0) {
        const neighbor = sample(neighbors);
        // Draw a line from this cell's center to the neighbor's center
        const lineColor = artboard.inkColor({ a: 0.7 });
        artboard.drawLine({
          xStart: cell.center.x,
          yStart: cell.center.y,
          xFinish: neighbor.center.x,
          yFinish: neighbor.center.y,
          lineWidth: 2,
          color: lineColor,
        });
      }
    },
  });
};

const renderCells = ({ artboard, grid, cellRenderer }) => {
  grid.cells.forEach((cell) => {
    cellRenderer({ artboard, cell });
  });
};

// Utilities

// random integer between min and max
const noise = ({ min = 0, max = 1 }) => {
  return Math.floor(Math.random() * (max - min) + min);
};

// randomly select an element from collection
const sample = (collection) => {
  return collection[noise({ max: collection.length })];
};

// randomly select true or false
const coinFlip = () => {
  return sample([true, false]);
};

const render = ({ artboard, grid }) => {
  const renderers = [
    renderTenPrint,
    renderScribble,
    renderScribble1,
    renderScribble2,
    renderScribble3,
    renderGravel,
    renderGravel1,
    renderGlitch1,
    renderGlitch,
    renderWeb,
    renderGrowingHuddle,
    renderHuddledRects,
    renderRectsAndLines,
    renderCenterRectAndLineToOtherCell,
  ];

  sample(renderers)({ artboard, grid });
};
