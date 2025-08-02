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

const renderChaos = ({ artboard, grid }) => {
  renderCells({
    artboard,
    grid,
    cellRenderer: ({ artboard, cell }) => {
      // Randomly decide how many lines and rectangles to draw in this cell
      const numLines = noise({ min: 2, max: 8 });
      const numRects = noise({ min: 1, max: 5 });
      // Draw random lines
      for (let i = 0; i < numLines; i++) {
        const xStart = noise({ min: cell.topLeft.x, max: cell.bottomRight.x });
        const yStart = noise({ min: cell.topLeft.y, max: cell.bottomRight.y });
        const xFinish = noise({ min: cell.topLeft.x, max: cell.bottomRight.x });
        const yFinish = noise({ min: cell.topLeft.y, max: cell.bottomRight.y });
        const lineWidth = noise({ min: 1, max: 6 });
        const color = coinFlip() ? artboard.inkColor() : artboard.randomColor();
        artboard.drawLine({
          xStart,
          yStart,
          xFinish,
          yFinish,
          lineWidth,
          color,
          lineCap: sample(["round", "square", "butt"]),
        });
      }
      // Draw random rectangles
      for (let i = 0; i < numRects; i++) {
        const rectWidth = noise({ min: 4, max: cell.size });
        const rectHeight = noise({ min: 4, max: cell.size });
        const x = noise({
          min: cell.topLeft.x,
          max: cell.bottomRight.x - rectWidth,
        });
        const y = noise({
          min: cell.topLeft.y,
          max: cell.bottomRight.y - rectHeight,
        });
        const color = coinFlip() ? artboard.inkColor() : artboard.randomColor();
        if (coinFlip()) {
          artboard.fillRect({
            x,
            y,
            width: rectWidth,
            height: rectHeight,
            color,
          });
        } else {
          artboard.drawRect({
            x,
            y,
            width: rectWidth,
            height: rectHeight,
            color,
            lineWidth: noise({ min: 1, max: 5 }),
          });
        }
      }
    },
  });
};

const renderShatter = ({ artboard, grid }) => {
  renderCells({
    artboard,
    grid,
    cellRenderer: ({ artboard, cell }) => {
      const numLines = noise({ min: 5, max: 20 });
      const lineWidth = noise({ min: 2, max: 8 });
      const color = artboard.inkColor();
      const center = cell.center;
      let margin;
      for (let i = 0; i < numLines; i++) {
        margin = cell.size * (noise({ min: 10, max: 50 }) / 100);
        if (coinFlip()) {
          margin = 0 - margin;
        }
        // Pick a random edge: 0=top, 1=right, 2=bottom, 3=left
        const edge = noise({ min: 0, max: 4 });
        let xStart, yStart;
        if (edge === 0) {
          // top (but not on the edge)
          xStart = noise({
            min: cell.topLeft.x + margin,
            max: cell.topRight.x - margin,
          });
          yStart = cell.topLeft.y + margin;
        } else if (edge === 1) {
          // right (but not on the edge)
          xStart = cell.topRight.x - margin;
          yStart = noise({
            min: cell.topRight.y + margin,
            max: cell.bottomRight.y - margin,
          });
        } else if (edge === 2) {
          // bottom (but not on the edge)
          xStart = noise({
            min: cell.bottomLeft.x + margin,
            max: cell.bottomRight.x - margin,
          });
          yStart = cell.bottomLeft.y - margin;
        } else {
          // left (but not on the edge)
          xStart = cell.topLeft.x + margin;
          yStart = noise({
            min: cell.topLeft.y + margin,
            max: cell.bottomLeft.y - margin,
          });
        }
        artboard.drawLine({
          xStart,
          yStart,
          xFinish: center.x,
          yFinish: center.y,
          lineWidth,
          color,
          lineCap: "round",
        });
      }
    },
  });
};

const renderLargeShatter = ({ artboard, grid }) => {
  renderCells({
    artboard,
    grid,
    cellRenderer: ({ artboard, cell }) => {
      const numLines = noise({ min: 5, max: 20 });
      const lineWidth = noise({ min: 2, max: 8 });
      const color = artboard.inkColor();
      const center = cell.center;
      for (let i = 0; i < numLines; i++) {
        // Pick a random edge: 0=top, 1=right, 2=bottom, 3=left
        const edge = noise({ min: 0, max: 4 });
        let xStart, yStart;
        // Ensure starting points are at least two cell widths away
        const minDist = cell.size * 2;
        const maxDist = cell.size * noise({ min: 2.1, max: 4 });
        if (edge === 0) {
          // above top
          xStart = noise({
            min: cell.topLeft.x - maxDist,
            max: cell.topRight.x + maxDist,
          });
          yStart = cell.topLeft.y - noise({ min: minDist, max: maxDist });
        } else if (edge === 1) {
          // right of right
          xStart = cell.topRight.x + noise({ min: minDist, max: maxDist });
          yStart = noise({
            min: cell.topRight.y - maxDist,
            max: cell.bottomRight.y + maxDist,
          });
        } else if (edge === 2) {
          // below bottom
          xStart = noise({
            min: cell.bottomLeft.x - maxDist,
            max: cell.bottomRight.x + maxDist,
          });
          yStart = cell.bottomLeft.y + noise({ min: minDist, max: maxDist });
        } else {
          // left of left
          xStart = cell.topLeft.x - noise({ min: minDist, max: maxDist });
          yStart = noise({
            min: cell.topLeft.y - maxDist,
            max: cell.bottomLeft.y + maxDist,
          });
        }
        artboard.drawLine({
          xStart,
          yStart,
          xFinish: center.x,
          yFinish: center.y,
          lineWidth,
          color,
          lineCap: "round",
        });
      }
    },
  });
};

const renderFragments = ({ artboard, grid }) => {
  renderCells({
    artboard,
    grid,
    cellRenderer: ({ artboard, cell }) => {
      // Draw a random number of overlapping rectangles with varying transparency
      const numRects = noise({ min: 2, max: 6 });
      for (let i = 0; i < numRects; i++) {
        const rectWidth = noise({ min: cell.size * 0.2, max: cell.size });
        const rectHeight = noise({ min: cell.size * 0.2, max: cell.size });
        const x = noise({
          min: cell.topLeft.x,
          max: cell.bottomRight.x - rectWidth,
        });
        const y = noise({
          min: cell.topLeft.y,
          max: cell.bottomRight.y - rectHeight,
        });
        const color = artboard.inkColor({ a: Math.random() * 0.7 + 0.2 });
        if (coinFlip()) {
          artboard.fillRect({
            x,
            y,
            width: rectWidth,
            height: rectHeight,
            color,
          });
        } else {
          artboard.drawRect({
            x,
            y,
            width: rectWidth,
            height: rectHeight,
            color,
            lineWidth: noise({ min: 1, max: 4 }),
          });
        }
      }
      // Draw a burst of lines radiating from a random point in the cell
      const burstOrigin = {
        x: noise({
          min: cell.topLeft.x + cell.size * 0.2,
          max: cell.bottomRight.x - cell.size * 0.2,
        }),
        y: noise({
          min: cell.topLeft.y + cell.size * 0.2,
          max: cell.bottomRight.y - cell.size * 0.2,
        }),
      };
      const numLines = noise({ min: 6, max: 16 });
      for (let i = 0; i < numLines; i++) {
        const angle = Math.random() * Math.PI * 2;
        const length = noise({ min: cell.size * 0.3, max: cell.size });
        const xFinish = burstOrigin.x + Math.cos(angle) * length;
        const yFinish = burstOrigin.y + Math.sin(angle) * length;
        const color = artboard.inkColor({ a: Math.random() * 0.5 + 0.3 });
        artboard.drawLine({
          xStart: burstOrigin.x,
          yStart: burstOrigin.y,
          xFinish,
          yFinish,
          lineWidth: noise({ min: 1, max: 3 }),
          color,
          lineCap: sample(["round", "square"]),
        });
      }
    },
  });
};

const renderFragmentsUnbound = ({ artboard, grid }) => {
  renderCells({
    artboard,
    grid,
    cellRenderer: ({ artboard, cell }) => {
      // Draw a random number of rectangles, many of which extend outside the cell
      const numRects = noise({ min: 2, max: 6 });
      for (let i = 0; i < numRects; i++) {
        // Allow rectangles to start before or after the cell boundary, and be larger than the cell
        const rectWidth = noise({ min: cell.size * 0.5, max: cell.size * 1.8 });
        const rectHeight = noise({
          min: cell.size * 0.5,
          max: cell.size * 1.8,
        });
        const x = noise({
          min: cell.topLeft.x - cell.size * 0.5,
          max: cell.bottomRight.x + cell.size * 0.2,
        });
        const y = noise({
          min: cell.topLeft.y - cell.size * 0.5,
          max: cell.bottomRight.y + cell.size * 0.2,
        });
        const color = artboard.inkColor({ a: Math.random() * 0.7 + 0.2 });
        if (coinFlip()) {
          artboard.fillRect({
            x,
            y,
            width: rectWidth,
            height: rectHeight,
            color,
          });
        } else {
          artboard.drawRect({
            x,
            y,
            width: rectWidth,
            height: rectHeight,
            color,
            lineWidth: noise({ min: 1, max: 4 }),
          });
        }
      }
      // Draw a burst of lines radiating from a random point in the cell (same as renderFragments)
      const burstOrigin = {
        x: noise({
          min: cell.topLeft.x + cell.size * 0.2,
          max: cell.bottomRight.x - cell.size * 0.2,
        }),
        y: noise({
          min: cell.topLeft.y + cell.size * 0.2,
          max: cell.bottomRight.y - cell.size * 0.2,
        }),
      };
      const numLines = noise({ min: 6, max: 16 });
      for (let i = 0; i < numLines; i++) {
        const angle = Math.random() * Math.PI * 2;
        const length = noise({ min: cell.size * 0.3, max: cell.size });
        const xFinish = burstOrigin.x + Math.cos(angle) * length;
        const yFinish = burstOrigin.y + Math.sin(angle) * length;
        const color = artboard.inkColor({ a: Math.random() * 0.5 + 0.3 });
        artboard.drawLine({
          xStart: burstOrigin.x,
          yStart: burstOrigin.y,
          xFinish,
          yFinish,
          lineWidth: noise({ min: 1, max: 3 }),
          color,
          lineCap: sample(["round", "square"]),
        });
      }
    },
  });
};

const renderOverflowBursts = ({ artboard, grid }) => {
  renderCells({
    artboard,
    grid,
    cellRenderer: ({ artboard, cell }) => {
      if (Math.random() > 0.4) return; // 40% chance to draw
      const origin = {
        x: noise({
          min: cell.topLeft.x + cell.size * 0.2,
          max: cell.bottomRight.x - cell.size * 0.2,
        }),
        y: noise({
          min: cell.topLeft.y + cell.size * 0.2,
          max: cell.bottomRight.y - cell.size * 0.2,
        }),
      };
      const numLines = noise({ min: 8, max: 20 });
      for (let i = 0; i < numLines; i++) {
        const angle = Math.random() * Math.PI * 2;
        // 60% of lines stay inside, 40% overflow
        const maxLen =
          Math.random() < 0.6
            ? cell.size * 0.5
            : cell.size * (1.5 + Math.random() * 1.5);
        const length = noise({ min: cell.size * 0.2, max: maxLen });
        const xFinish = origin.x + Math.cos(angle) * length;
        const yFinish = origin.y + Math.sin(angle) * length;
        const color = artboard.inkColor({ a: 0.5 + Math.random() * 0.5 });
        artboard.drawLine({
          xStart: origin.x,
          yStart: origin.y,
          xFinish,
          yFinish,
          lineWidth: noise({ min: 1, max: 4 }),
          color,
          lineCap: sample(["round", "square"]),
        });
      }
    },
  });
};

const renderZigZag = ({ artboard, grid }) => {
  renderCells({
    artboard,
    grid,
    cellRenderer: ({ artboard, cell }) => {
      // Start at a random point inside the cell
      let x0 = noise({
        min: cell.topLeft.x + cell.size * 0.1,
        max: cell.bottomRight.x - cell.size * 0.1,
      });
      let y0 = noise({
        min: cell.topLeft.y + cell.size * 0.1,
        max: cell.bottomRight.y - cell.size * 0.1,
      });
      let points = [{ x: x0, y: y0 }];
      // Generate three segments
      for (let i = 0; i < 3; i++) {
        // Random angle, random length (not too short, not too long)
        const angle = Math.random() * Math.PI * 2;
        const length = noise({ min: cell.size * 0.2, max: cell.size * 0.7 });
        const prev = points[points.length - 1];
        const x = prev.x + Math.cos(angle) * length;
        const y = prev.y + Math.sin(angle) * length;
        points.push({ x, y });
      }
      // Draw the zigzag (three connected lines)
      for (let i = 0; i < 3; i++) {
        artboard.drawLine({
          xStart: points[i].x,
          yStart: points[i].y,
          xFinish: points[i + 1].x,
          yFinish: points[i + 1].y,
          color: artboard.inkColor({ a: 0.8 }),
          lineWidth: noise({ min: 2, max: 5 }),
          lineCap: sample(["round", "square"]),
        });
      }
    },
  });
};

const renderBlocks = ({ artboard, grid }) => {
  renderCells({
    artboard,
    grid,
    cellRenderer: ({ artboard, cell }) => {
      const streetMargin = cell.size * (noise({ min: 8, max: 16 }) / 100); // margin for streets/walkways
      const numBuildings = noise({ min: 2, max: 6 });
      const usedRects = [];
      for (let i = 0; i < numBuildings; i++) {
        // Building size
        const maxWidth = cell.size * (noise({ min: 18, max: 45 }) / 100);
        const maxHeight = cell.size * (noise({ min: 18, max: 45 }) / 100);
        // Position: must be within cell, leaving street margin
        const x = noise({
          min: cell.topLeft.x + streetMargin,
          max: cell.bottomRight.x - streetMargin - maxWidth,
        });
        const y = noise({
          min: cell.topLeft.y + streetMargin,
          max: cell.bottomRight.y - streetMargin - maxHeight,
        });
        // Check for overlap with existing buildings (simple check)
        let overlaps = false;
        for (const r of usedRects) {
          if (
            x < r.x + r.width + streetMargin &&
            x + maxWidth + streetMargin > r.x &&
            y < r.y + r.height + streetMargin &&
            y + maxHeight + streetMargin > r.y
          ) {
            overlaps = true;
            break;
          }
        }
        if (overlaps) continue;
        usedRects.push({ x, y, width: maxWidth, height: maxHeight });
        // Draw building
        artboard.fillRect({
          x,
          y,
          width: maxWidth,
          height: maxHeight,
          color: artboard.inkColor({ a: 0.7 + Math.random() * 0.3 }),
        });
        // Optional: draw border
        artboard.drawRect({
          x,
          y,
          width: maxWidth,
          height: maxHeight,
          color: artboard.inkColor(),
          lineWidth: 1,
        });
      }
    },
  });
};

const renderRandomLines = ({ artboard, grid }) => {
  renderCells({
    artboard,
    grid,
    cellRenderer: ({ artboard, cell }) => {
      // Randomly choose orientation
      const isVertical = coinFlip();
      // Random number of lines per cell
      const numLines = noise({ min: 2, max: 8 });
      for (let i = 0; i < numLines; i++) {
        const lineWidth = noise({ min: 1, max: 8 });
        const color = artboard.inkColor({ a: 0.7 + Math.random() * 0.3 });
        if (isVertical) {
          // Vertical lines: x varies, y is full cell
          const x = noise({
            min: cell.topLeft.x + cell.size * 0.05,
            max: cell.bottomRight.x - cell.size * 0.05,
          });
          artboard.drawLine({
            xStart: x,
            yStart: cell.topLeft.y,
            xFinish: x,
            yFinish: cell.bottomRight.y,
            lineWidth,
            color,
            lineCap: sample(["round", "square", "butt"]),
          });
        } else {
          // Horizontal lines: y varies, x is full cell
          const y = noise({
            min: cell.topLeft.y + cell.size * 0.05,
            max: cell.bottomRight.y - cell.size * 0.05,
          });
          artboard.drawLine({
            xStart: cell.topLeft.x,
            yStart: y,
            xFinish: cell.bottomRight.x,
            yFinish: y,
            lineWidth,
            color,
            lineCap: sample(["round", "square", "butt"]),
          });
        }
      }
    },
  });
};

const renderEveryPixelVertical = ({ artboard, grid }) => {
  renderCells({
    artboard,
    grid,
    cellRenderer: ({ artboard, cell }) => {
      const cellWidth = Math.round(cell.bottomRight.x - cell.topLeft.x);
      for (let i = 0; i < cellWidth; i++) {
        const x = cell.topLeft.x + i;
        // Assign a line width for each line, e.g., cycle through 1-8
        const lineWidth = 1 + (i % 8);
        const color = artboard.inkColor({ a: 0.8 });
        artboard.drawLine({
          xStart: x,
          yStart: cell.topLeft.y,
          xFinish: x,
          yFinish: cell.bottomRight.y,
          lineWidth,
          color,
          lineCap: sample(["round", "square", "butt"]),
        });
      }
    },
  });
};

const renderHuddledRects2 = ({ artboard, grid }) => {
  renderCells({
    artboard,
    grid,
    cellRenderer: ({ artboard, cell }) => {
      const numRects = noise({ min: 4, max: 10 });
      const center = cell.center;
      for (let i = 0; i < numRects; i++) {
        // Size: random but not too large
        const width = noise({ min: cell.size * 0.2, max: cell.size * 0.7 });
        const height = noise({ min: cell.size * 0.2, max: cell.size * 0.7 });
        // Offset from center: clustered, but not all at center
        const maxOffset = cell.size * 0.18;
        const offsetAngle = Math.random() * Math.PI * 2;
        const offsetRadius = Math.random() * maxOffset;
        const x = center.x - width / 2 + Math.cos(offsetAngle) * offsetRadius;
        const y = center.y - height / 2 + Math.sin(offsetAngle) * offsetRadius;
        // Opacity: random, but not fully transparent or opaque
        const alpha = 0.25 + Math.random() * 0.5;
        const color = artboard.inkColor({ a: alpha });
        if (coinFlip()) {
          artboard.fillRect({ x, y, width, height, color });
        } else {
          artboard.drawRect({
            x,
            y,
            width,
            height,
            color,
            lineWidth: noise({ min: 1, max: 4 }),
          });
        }
      }
    },
  });
};

const renderGrowingRects = ({ artboard, grid }) => {
  renderCells({
    artboard,
    grid,
    cellRenderer: ({ artboard, cell }) => {
      const numRects = noise({ min: 3, max: 8 });
      // Growth factor based on row: 0 (top) to 1 (bottom)
      const rowFactor = cell.rowCount > 1 ? cell.row / (cell.rowCount - 1) : 0;
      for (let i = 0; i < numRects; i++) {
        // Base size
        const baseWidth = noise({ min: cell.size * 0.2, max: cell.size * 0.7 });
        const baseHeight = noise({
          min: cell.size * 0.2,
          max: cell.size * 0.7,
        });
        // Growth: up to 2.5x at bottom rows
        const growth = 1 + rowFactor * 1.5 + Math.random() * rowFactor;
        const width = baseWidth * growth;
        const height = baseHeight * growth;
        // Centered, but allow some jitter
        const jitter = cell.size * 0.15 * (1 - rowFactor);
        const x =
          cell.center.x - width / 2 + noise({ min: -jitter, max: jitter });
        const y =
          cell.center.y - height / 2 + noise({ min: -jitter, max: jitter });
        // Opacity: random, but not fully transparent or opaque
        const alpha = 0.2 + Math.random() * 0.6;
        const color = artboard.inkColor({ a: alpha });
        if (coinFlip()) {
          artboard.fillRect({ x, y, width, height, color });
        } else {
          artboard.drawRect({
            x,
            y,
            width,
            height,
            color,
            lineWidth: noise({ min: 1, max: 4 }),
          });
        }
      }
    },
  });
};

const renderGrowingLines = ({ artboard, grid }) => {
  renderCells({
    artboard,
    grid,
    cellRenderer: ({ artboard, cell }) => {
      // Number of lines increases with row value
      const minLines = 1;
      const maxLines = 12;
      const rowFactor = cell.rowCount > 1 ? cell.row / (cell.rowCount - 1) : 0;
      const numLines = Math.round(minLines + rowFactor * (maxLines - minLines));
      for (let i = 0; i < numLines; i++) {
        // Random start and end points within the cell
        const xStart = noise({ min: cell.topLeft.x, max: cell.bottomRight.x });
        const yStart = noise({ min: cell.topLeft.y, max: cell.bottomRight.y });
        const xFinish = noise({ min: cell.topLeft.x, max: cell.bottomRight.x });
        const yFinish = noise({ min: cell.topLeft.y, max: cell.bottomRight.y });
        const lineWidth = noise({ min: 1, max: 5 });
        const color = artboard.inkColor({ a: 0.5 + 0.5 * Math.random() });
        artboard.drawLine({
          xStart,
          yStart,
          xFinish,
          yFinish,
          lineWidth,
          color,
          lineCap: sample(["round", "square", "butt"]),
        });
      }
    },
  });
};

const renderStringArt = ({ artboard, grid }) => {
  renderCells({
    artboard,
    grid,
    cellRenderer: ({ artboard, cell }) => {
      // Define the four edges as arrays of [start, end] points
      const edges = [
        [cell.topLeft, cell.topRight], // Top
        [cell.topRight, cell.bottomRight], // Right
        [cell.bottomRight, cell.bottomLeft], // Bottom
        [cell.bottomLeft, cell.topLeft], // Left
      ];

      // Randomly pick two different edges
      let edgeIndices = [0, 1, 2, 3];
      const firstEdgeIdx = sample(edgeIndices);
      edgeIndices = edgeIndices.filter((idx) => idx !== firstEdgeIdx);
      const secondEdgeIdx = sample(edgeIndices);

      const [edgeA, edgeB] = [edges[firstEdgeIdx], edges[secondEdgeIdx]];

      const numPoints = noise({ min: 8, max: 20 });

      // Helper to interpolate between two points
      const lerp = (a, b, t) => ({
        x: a.x + (b.x - a.x) * t,
        y: a.y + (b.y - a.y) * t,
      });

      // Generate points along each edge
      const pointsA = [];
      const pointsB = [];
      for (let i = 0; i < numPoints; i++) {
        const t = i / (numPoints - 1);
        pointsA.push(lerp(edgeA[0], edgeA[1], t));
        pointsB.push(lerp(edgeB[0], edgeB[1], t));
      }

      // Draw lines between corresponding points (reverse one for a curve effect)
      for (let i = 0; i < numPoints; i++) {
        artboard.drawLine({
          xStart: pointsA[i].x,
          yStart: pointsA[i].y,
          xFinish: pointsB[numPoints - i - 1].x,
          yFinish: pointsB[numPoints - i - 1].y,
          color: artboard.inkColor({ a: 0.7 }),
          lineWidth: 1 + Math.floor(i / 6),
          lineCap: "round",
        });
      }
    },
  });
};

const renderQuarterRect = ({ artboard, grid }) => {
  renderCells({
    artboard,
    grid,
    cellRenderer: ({ artboard, cell }) => {
      // Determine which quarter to fill: 0=top left, 1=top right, 2=bottom right, 3=bottom left
      const quarter = noise({ min: 0, max: 4 });
      const half = cell.size / 2;
      let x, y;
      if (quarter === 0) {
        // top left
        x = cell.topLeft.x;
        y = cell.topLeft.y;
      } else if (quarter === 1) {
        // top right
        x = cell.topLeft.x + half;
        y = cell.topLeft.y;
      } else if (quarter === 2) {
        // bottom right
        x = cell.topLeft.x + half;
        y = cell.topLeft.y + half;
      } else {
        // bottom left
        x = cell.topLeft.x;
        y = cell.topLeft.y + half;
      }
      artboard.fillRect({
        x,
        y,
        width: half,
        height: half,
        color: artboard.inkColor({ a: 0.8 }),
      });
    },
  });
};

const renderConverge = ({ artboard, grid }) => {
  const xFinish = noise({ min: 0, max: grid.gridWidthPixels });
  const yFinish = noise({ min: 0, max: grid.gridHeightPixels });

  renderCells({
    artboard,
    grid,
    cellRenderer: ({ artboard, cell }) => {
      if (coinFlip()) return;
      // The closer to (0,0), the more lines; farther, fewer lines
      // We'll use a simple formula: maxLines - (row + col) * factor
      const maxLines = 20;
      const minLines = 2;
      // Normalize row and col to [0, 1]
      const rowNorm = cell.rowCount > 1 ? cell.row / (cell.rowCount - 1) : 0;
      const colNorm =
        cell.columnCount > 1 ? cell.col / (cell.columnCount - 1) : 0;
      // The farther from top left, the fewer lines
      const factor = (rowNorm + colNorm) / 2;
      const numLines = Math.max(minLines, Math.round(maxLines * (1 - factor)));
      for (let i = 0; i < numLines; i++) {
        // Add a small random offset to the start and end for visual interest
        const jitter = noise({ min: cell.size / 2, max: cell.size * 2 });
        const xStart = cell.center.x + noise({ min: -jitter, max: jitter });
        const yStart = cell.center.y + noise({ min: -jitter, max: jitter });
        artboard.drawLine({
          xStart,
          yStart,
          xFinish,
          yFinish,
          color: artboard.inkColor({ a: Math.random() - 0.5 }),
          lineWidth: noise({ min: 1, max: 4 }),
          lineCap: sample(["round", "square", "butt"]),
        });
      }
    },
  });
};

const renderSpiralNest = ({ artboard, grid }) => {
  renderCells({
    artboard,
    grid,
    cellRenderer: ({ artboard, cell }) => {
      const center = cell.center;
      const maxRadius = cell.size * 0.4;

      // Draw 3-6 overlapping circles with decreasing opacity
      const numCircles = noise({ min: 3, max: 7 });
      for (let i = 0; i < numCircles; i++) {
        const radius =
          maxRadius * (1 - i / numCircles) +
          noise({ min: 0, max: cell.size * 0.1 });
        const offsetX = noise({ min: -cell.size * 0.2, max: cell.size * 0.2 });
        const offsetY = noise({ min: -cell.size * 0.2, max: cell.size * 0.2 });
        const alpha = 0.3 + (0.7 * (numCircles - i)) / numCircles;
        const width = radius;
        const height = radius;

        artboard.drawRect({
          x: center.x + offsetX,
          y: center.y + offsetY,
          width,
          height,
          color: artboard.inkColor({ a: alpha }),
          lineWidth: noise({ min: 1, max: 3 }),
        });
      }

      // Draw connecting lines between circle centers
      const numLines = noise({ min: 2, max: 5 });
      for (let i = 0; i < numLines; i++) {
        const angle1 = Math.random() * Math.PI * 2;
        const angle2 = Math.random() * Math.PI * 2;
        const radius1 = noise({ min: cell.size * 0.1, max: maxRadius });
        const radius2 = noise({ min: cell.size * 0.1, max: maxRadius });

        const x1 = center.x + Math.cos(angle1) * radius1;
        const y1 = center.y + Math.sin(angle1) * radius1;
        const x2 = center.x + Math.cos(angle2) * radius2;
        const y2 = center.y + Math.sin(angle2) * radius2;

        artboard.drawLine({
          xStart: x1,
          yStart: y1,
          xFinish: x2,
          yFinish: y2,
          color: artboard.inkColor({ a: 0.6 }),
          lineWidth: noise({ min: 1, max: 2 }),
          lineCap: "round",
        });
      }

      // Add some small accent rectangles
      const numRects = noise({ min: 1, max: 4 });
      for (let i = 0; i < numRects; i++) {
        const rectSize = noise({
          min: cell.size * 0.05,
          max: cell.size * 0.15,
        });
        const x = noise({
          min: cell.topLeft.x,
          max: cell.bottomRight.x - rectSize,
        });
        const y = noise({
          min: cell.topLeft.y,
          max: cell.bottomRight.y - rectSize,
        });

        if (coinFlip()) {
          artboard.fillRect({
            x,
            y,
            width: rectSize,
            height: rectSize,
            color: artboard.inkColor({ a: 0.4 }),
          });
        } else {
          artboard.drawRect({
            x,
            y,
            width: rectSize,
            height: rectSize,
            color: artboard.inkColor({ a: 0.6 }),
            lineWidth: 1,
          });
        }
      }
    },
  });
};

const renderCellConnections = ({ artboard, grid }) => {
  renderCells({
    artboard,
    grid,
    cellRenderer: ({ artboard, cell }) => {
      if (coinFlip()) return;

      // Pick a random target cell (could be the same cell, but that's fine)
      const targetCell = sample(grid.cells);

      const lineWidth = coinFlip() ? 5 : 2;

      artboard.drawLine({
        xStart: cell.center.x,
        yStart: cell.center.y,
        xFinish: targetCell.center.x,
        yFinish: targetCell.center.y,
        color: artboard.inkColor({ a: 0.7 }),
        lineWidth,
        lineCap: "round",
      });
    },
  });
};

const renderCornerLines = ({ artboard, grid }) => {
  renderCells({
    artboard,
    grid,
    cellRenderer: ({ artboard, cell }) => {
      // Define the four corners of the cell
      const corners = [
        cell.topLeft, // top-left
        cell.topRight, // top-right
        cell.bottomRight, // bottom-right
        cell.bottomLeft, // bottom-left
      ];

      // Pick two different random corners
      const startCorner = sample(corners);
      let endCorner;
      do {
        endCorner = sample(corners);
      } while (endCorner === startCorner); // Ensure we pick a different corner

      artboard.drawLine({
        xStart: startCorner.x,
        yStart: startCorner.y,
        xFinish: endCorner.x,
        yFinish: endCorner.y,
        color: artboard.inkColor({ a: 0.8 }),
        lineWidth: 5,
        lineCap: "round",
      });
    },
  });
};

const renderCornerPath = ({ artboard, grid }) => {
  renderCells({
    artboard,
    grid,
    cellRenderer: ({ artboard, cell }) => {
      // Choose starting corner: top-left or top-right
      const startCorner = coinFlip() ? cell.topLeft : cell.topRight;

      // Choose ending corner: bottom-left or bottom-right
      const endCorner = coinFlip() ? cell.bottomLeft : cell.bottomRight;

      // Generate two random points inside the cell
      const point1 = {
        x: noise({
          min: cell.topLeft.x + cell.size * 0.1,
          max: cell.bottomRight.x - cell.size * 0.1,
        }),
        y: noise({
          min: cell.topLeft.y + cell.size * 0.1,
          max: cell.bottomRight.y - cell.size * 0.1,
        }),
      };

      const point2 = {
        x: noise({
          min: cell.topLeft.x + cell.size * 0.1,
          max: cell.bottomRight.x - cell.size * 0.1,
        }),
        y: noise({
          min: cell.topLeft.y + cell.size * 0.1,
          max: cell.bottomRight.y - cell.size * 0.1,
        }),
      };

      const lineWidth = noise({ min: 2, max: 6 });
      const color = artboard.inkColor({ a: 0.8 });

      // Draw the three line segments
      // 1. From start corner to first random point
      artboard.drawLine({
        xStart: startCorner.x,
        yStart: startCorner.y,
        xFinish: point1.x,
        yFinish: point1.y,
        color,
        lineWidth,
        lineCap: "round",
      });

      // 2. From first random point to second random point
      artboard.drawLine({
        xStart: point1.x,
        yStart: point1.y,
        xFinish: point2.x,
        yFinish: point2.y,
        color,
        lineWidth,
        lineCap: "round",
      });

      // 3. From second random point to end corner
      artboard.drawLine({
        xStart: point2.x,
        yStart: point2.y,
        xFinish: endCorner.x,
        yFinish: endCorner.y,
        color,
        lineWidth,
        lineCap: "round",
      });
    },
  });
};

const renderEdgeLine = ({ artboard, grid }) => {
  renderCells({
    artboard,
    grid,
    cellRenderer: ({ artboard, cell }) => {
      // Choose a random edge: 0=top, 1=right, 2=bottom, 3=left
      const edge = noise({ min: 0, max: 4 });

      const lineWidth = noise({ min: 8, max: 16 }); // Thick line
      const color = artboard.inkColor({ a: 0.9 });

      let xStart, yStart, xFinish, yFinish;

      if (edge === 0) {
        // Top edge
        xStart = cell.topLeft.x;
        yStart = cell.topLeft.y;
        xFinish = cell.topRight.x;
        yFinish = cell.topRight.y;
      } else if (edge === 1) {
        // Right edge
        xStart = cell.topRight.x;
        yStart = cell.topRight.y;
        xFinish = cell.bottomRight.x;
        yFinish = cell.bottomRight.y;
      } else if (edge === 2) {
        // Bottom edge
        xStart = cell.bottomLeft.x;
        yStart = cell.bottomLeft.y;
        xFinish = cell.bottomRight.x;
        yFinish = cell.bottomRight.y;
      } else {
        // Left edge
        xStart = cell.topLeft.x;
        yStart = cell.topLeft.y;
        xFinish = cell.bottomLeft.x;
        yFinish = cell.bottomLeft.y;
      }

      artboard.drawLine({
        xStart,
        yStart,
        xFinish,
        yFinish,
        color,
        lineWidth,
        lineCap: "square",
      });
    },
  });
};

const renderRotatedRects = ({ artboard, grid }) => {
  renderCells({
    artboard,
    grid,
    cellRenderer: ({ artboard, cell }) => {
      // Random number of rectangles per cell
      const numRects = noise({ min: 0, max: 5 });

      for (let i = 0; i < numRects; i++) {
        // Random rotation angle for this rectangle
        const rotationAngle = Math.random() * Math.PI * 2; // 0 to 2π radians

        // Random rectangle dimensions
        let width, height;

        height = noise({ min: cell.size * 0.2, max: cell.size * 0.8 });
        width = height * noise({ min: 2, max: 5 });

        // Random position within the cell
        const x = noise({
          min: cell.topLeft.x + width * 0.5,
          max: cell.bottomRight.x - width * 0.5,
        });
        const y = noise({
          min: cell.topLeft.y + height * 0.5,
          max: cell.bottomRight.y - height * 0.5,
        });

        // Random opacity
        const alpha = Math.random() * 0.7 + 0.2; // 0.2 to 0.9
        const color = artboard.inkColor({ a: alpha });

        // Apply rotation around the cell center
        artboard.translate(cell.center.x, cell.center.y);
        artboard.rotate(rotationAngle);
        artboard.translate(-cell.center.x, -cell.center.y);

        // Draw the filled rectangle (no outline)
        artboard.fillRect({
          x: x - width / 2,
          y: y - height / 2,
          width,
          height,
          color,
        });

        // Restore the transformation
        artboard.restore();
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

const render = ({ artboard, grid, selectedRenderer = "random" }) => {
  const renderers = {
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
    renderChaos, // This renderer generated with AI
    renderShatter, // This renderer generated with AI
    renderLargeShatter, // This renderer generated with AI
    renderFragments, // This renderer generated with AI
    renderFragmentsUnbound, // This renderer generated with AI
    renderOverflowBursts, // This renderer generated with AI
    renderZigZag, // This renderer generated with AI
    renderBlocks, // This renderer generated with AI
    renderRandomLines, // This renderer generated with AI
    renderEveryPixelVertical, // This renderer generated with AI
    renderHuddledRects2, // This renderer generated with AI
    renderGrowingRects, // This renderer generated with AI
    renderGrowingLines, // This renderer generated with AI
    renderStringArt, // This renderer generated with AI
    renderQuarterRect, // This renderer generated with AI
    renderConverge, // This renderer generated with AI
    renderSpiralNest, // This renderer generated with AI
    renderCellConnections, // This renderer generated with AI
    renderCornerLines, // This renderer generated with AI
    renderCornerPath, // This renderer generated with AI
    renderEdgeLine, // This renderer generated with AI
    renderRotatedRects, // This renderer generated with AI
  };

  if (selectedRenderer === "random") {
    sample(Object.values(renderers))({ artboard, grid });
  } else if (renderers[selectedRenderer]) {
    renderers[selectedRenderer]({ artboard, grid });
  } else {
    // Fallback to random if invalid selection
    sample(Object.values(renderers))({ artboard, grid });
  }
};
