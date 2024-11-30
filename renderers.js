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
  ];

  sample(renderers)({ artboard, grid });
};
