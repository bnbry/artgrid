const renderInitialGrid = ({artboard, grid, delay = 0}) => {
  renderCells({
    artboard,
    delay,
    cells: grid.cells,
    cellRenderer: ({artboard, cell}) => {
      let color = artboard.palette.getColor("light");
      const width = cell.size - 1;
      const height = cell.size - 1;
      let lineWidth = 1;

      artboard.drawRect({
        width,
        height,
        lineWidth,
        color,
        ...cell.tl,
      })
    }
  })
};

const renderDots1 = ({artboard, grid, delay = 0}) => {
  renderCells({
    artboard,
    delay,
    cells: grid.cells,
    cellRenderer: ({artboard, cell}) => {
      const radius = Math.floor(cell.size * 0.2);

      artboard.fillArc({
        radius,
        ...cell.tl,
      })
    },
  })
};

const renderDots2 = ({artboard, grid, delay = 0}) => {
  renderCells({
    artboard,
    delay,
    cells: grid.cells,
    cellRenderer: ({artboard, cell}) => {
      const maxRadius = cell.size * 0.5;
      const minRadius = cell.size * 0.1;
      const color = artboard.palette.getColor("light");
      const radius = noise({ max: maxRadius, min: minRadius })

      artboard.fillArc({
        radius,
        color,
        ...cell.tl,
      })
    },
  })
};

const renderDots3 = ({artboard, grid, delay = 0}) => {
  renderCells({
    artboard,
    delay,
    cells: grid.cells,
    cellRenderer: ({artboard, cell}) => {
      const maxRadius = cell.size * 0.5;
      const minRadius = cell.size * 0.1;
      const radius = noise({ max: maxRadius, min: minRadius })
      const alpha = Math.random();
      const color = artboard.palette.getColor("light", { a: alpha });

      artboard.fillArc({
        color,
        radius,
        ...cell.tl,
      })
    },
  })
};

const renderDots4 = ({artboard, grid, delay = 0}) => {
  renderCells({
    artboard,
    delay,
    cells: grid.cells,
    cellRenderer: ({artboard, cell}) => {
      const maxRadius = cell.size * 0.9;
      const minRadius = cell.size * 0.1;
      const radius = noise({ max: maxRadius, min: minRadius })
      const alpha = Math.random();
      const color = artboard.palette.getColor("light", { a: alpha });

      artboard.fillArc({
        color,
        radius,
        ...cell.tl,
      })
    },
  })
};

const renderDots5 = ({artboard, grid, delay = 0}) => {
  renderCells({
    artboard,
    delay,
    cells: grid.cells,
    cellRenderer: ({artboard, cell}) => {
      const maxRadius = cell.size * 0.9;
      const minRadius = cell.size * 0.1;
      const radius = noise({ max: maxRadius, min: minRadius })
      const alpha = 1 - radius / maxRadius;
      const color = artboard.palette.getColor("light", { a: alpha });
      const xPos = noise({ max: cell.tl.xPos + 32, min: cell.tl.xPos - 32 });
      const yPos = noise({ max: cell.tl.yPos + 32, min: cell.tl.yPos - 32 });

      artboard.fillArc({
        color,
        radius,
        xPos,
        yPos,
      })
    },
  })
};

const renderDots6 = ({artboard, grid, delay = 0}) => {
  animateCells({
    artboard,
    cells: grid.cells,
    cellRenderer: ({artboard, cell}) => {
      const maxRadius = cell.size * 1.5;
      const minRadius = cell.size * 0.1;
      let radius = noise({ max: maxRadius, min: minRadius })
      let direction = sample([-1, 1]);
      let xPos = noise({ max: cell.tl.xPos + 32, min: cell.tl.xPos - 32 });
      let yPos = noise({ max: cell.tl.yPos + 32, min: cell.tl.yPos - 32 });

      if (cell.data?.radius) {
        direction = cell.data.direction;
        radius = cell.data.radius + cell.data.direction;
        xPos = cell.data.xPos;
        yPos = cell.data.yPos;

        if (direction > 0 && radius > maxRadius) {
          direction = -1;
        } else if (direction < 0 && radius < minRadius) {
          direction = 1;
        }
      }

      const alpha = Math.max(1 - radius / maxRadius, 0.1);
      const color = artboard.getColor("light", { a: alpha });
      cell.data = { radius, direction, xPos, yPos }

      artboard.fillArc({
        color,
        radius,
        xPos,
        yPos,
      })
    },
  })
};

const renderTenPrint = ({artboard, grid, delay = 0}) => {
  //renderInitialGrid({artboard, grid, delay})
  renderCells({
    artboard,
    delay,
    cells: grid.cells,
    cellRenderer: ({artboard, cell}) => {
      const rightToLeft = coinToss();
      const lineCap = "square";
      const lineWidth = 4;
      let color = artboard.getColor("light");
      let fromCellPoint, toCellPoint;

      if(rightToLeft) {
        fromCellPoint = cell.tr;
        toCellPoint = cell.bl;
      } else {
        fromCellPoint = cell.tl;
        toCellPoint = cell.br;
      }

      const { xPos: xFromPos, yPos: yFromPos } = fromCellPoint;
      const { xPos: xToPos, yPos: yToPos } = toCellPoint;

      artboard.drawLine({
        xFromPos,
        yFromPos,
        xToPos,
        yToPos,
        lineCap,
        lineWidth,
        color,
      });
    },
  });
};

const renderScribble = ({artboard, grid, delay = 0}) => {
  renderCells({
    artboard,
    delay,
    cells: grid.cells,
    cellRenderer: ({artboard, cell}) => {
      const lineCap = "square";
      const lineWidth = 1;
      const xBounds = { min: cell.tl.xPos + cell.size * 0.05, max: cell.br.xPos - cell.size * 0.05 };
      const yBounds = { min: cell.tl.yPos + cell.size * 0.05, max: cell.br.yPos - cell.size * 0.05 };

      let xFromPos = noise(xBounds)
      let yFromPos = noise(yBounds)

      for(i = 1; i <= 16; i++) {
        const xToPos = noise(xBounds)
        const yToPos = noise(yBounds)
        const alpha = 1;
        const color = artboard.getColor("light", { a: alpha })

        artboard.drawLine({
          lineCap,
          lineWidth,
          color,
          xFromPos,
          yFromPos,
          xToPos,
          yToPos,
        })

        xFromPos = xToPos;
        yFromPos = yToPos;
      }
    },
  });
};

const renderQuarters = ({artboard, grid, delay = 0}) => {
  renderCells({
    artboard,
    delay,
    cells: grid.cells,
    cellRenderer: ({artboard, cell}) => {
      const position = Math.floor(Math.random() * 4)
      const radius = cell.size;
      let startRadians, endRadians;

      if (position == 0) {
        baseCellPoint = cell.tl;
        startRadians = 0 * Math.PI;
        endRadians = 0.5 * Math.PI;
      } else if (position == 1) {
        baseCellPoint = cell.tr;
        startRadians = 0.5 * Math.PI;
        endRadians = 1 * Math.PI;
      } else if (position == 2) {
        baseCellPoint = cell.br;
        startRadians = 1 * Math.PI;
        endRadians = 1.5 * Math.PI;
      } else {
        baseCellPoint = cell.bl;
        startRadians = 1.5 * Math.PI;
        endRadians = 2 * Math.PI;
      }

      artboard.drawArc({
        radius,
        startRadians,
        endRadians,
        ...baseCellPoint,
      })
    },
  })
};

const renderPetal = ({artboard, grid, delay = 0}) => {
  renderCells({
    artboard,
    delay,
    cells: grid.cells,
    cellRenderer: ({artboard, cell}) => {
      const flip = cell.idx % 2 == 0;
      let controlPointAShift, controlPointBShift, endPointShift;

      if (flip) {
        for(i = 1; i <= 9; i++) {
          endPointShift = noise({ max: 4 * i, min: i });
          artboard.ctx.beginPath();
          artboard.ctx.fillStyle = artboard.getColor("light", { a: 0.3 / i });
          artboard.ctx.moveTo(cell.tl.xPos - endPointShift, cell.tl.yPos - endPointShift)
          controlPointAShift = noise({min: cell.size * 0.6, max: cell.size})
          controlPointBShift = cell.size - controlPointAShift
          artboard.ctx.bezierCurveTo(
            cell.tl.xPos + controlPointAShift,
            cell.tl.yPos + controlPointBShift,
            cell.tl.xPos + controlPointAShift,
            cell.tl.yPos + controlPointBShift,
            cell.br.xPos + endPointShift,
            cell.br.yPos + endPointShift,
          )
          artboard.ctx.moveTo(cell.tl.xPos - endPointShift, cell.tl.yPos - endPointShift)
          controlPointAShift = noise({min: cell.size * 0.6, max: cell.size})
          controlPointBShift = cell.size - controlPointAShift
          artboard.ctx.bezierCurveTo(
            cell.tl.xPos + controlPointBShift,
            cell.tl.yPos + controlPointAShift,
            cell.tl.xPos + controlPointBShift,
            cell.tl.yPos + controlPointAShift,
            cell.br.xPos + endPointShift,
            cell.br.yPos + endPointShift,
          )
          artboard.ctx.fill()
        }
      } else {
        for(i = 1; i <= 9; i++) {
          endPointShift = noise({ max: 4 * i, min: i });
          artboard.ctx.beginPath();
          artboard.ctx.fillStyle = artboard.getColor("light", { a: 0.3 / i });
          artboard.ctx.moveTo(cell.tr.xPos + endPointShift, cell.tr.yPos - endPointShift)
          controlPointAShift = noise({min: cell.size * 0.6, max: cell.size})
          controlPointBShift = cell.size - controlPointAShift
          artboard.ctx.bezierCurveTo(
            cell.tr.xPos - controlPointAShift,
            cell.tr.yPos + controlPointBShift,
            cell.tr.xPos - controlPointAShift,
            cell.tr.yPos + controlPointBShift,
            cell.bl.xPos - endPointShift,
            cell.bl.yPos + endPointShift,
          )
          artboard.ctx.moveTo(cell.tr.xPos + endPointShift, cell.tr.yPos - endPointShift)
          controlPointAShift = noise({min: cell.size * 0.6, max: cell.size})
          controlPointBShift = cell.size - controlPointAShift
          artboard.ctx.bezierCurveTo(
            cell.tr.xPos - controlPointBShift,
            cell.tr.yPos + controlPointAShift,
            cell.tr.xPos - controlPointBShift,
            cell.tr.yPos + controlPointAShift,
            cell.bl.xPos - endPointShift,
            cell.bl.yPos + endPointShift,
          )
          artboard.ctx.fill()
        }
      }
    },
  })
};

const renderGravel = ({artboard, grid, delay = 0}) => {
  renderCells({
    artboard,
    delay,
    cells: grid.cells,
    cellRenderer: ({artboard, cell}) => {
      const color = artboard.palette.getColor("light");
      const width = cell.size;
      const height = cell.size;
      const lineWidth = 2;
      const xPos = noise({ max: cell.row, min: -cell.row });
      const yPos = noise({ max: cell.row, min: -cell.row });
      const plusOrMinus = coinToss() ? 1 : -1;
      const rotateMultiplier = 2;
      const rotateAmt = cell.row * Math.PI / 180 * (Math.random() * rotateMultiplier * plusOrMinus);

      artboard.translate(cell.tl.xPos, cell.tl.yPos)
      artboard.rotate(rotateAmt)
      artboard.drawRect({
        width,
        height,
        lineWidth,
        color,
        xPos,
        yPos,
      })
      artboard.restore()
    },
  })
};

const renderGlitch = ({artboard, grid, delay = 0}) => {
  renderCells({
    artboard,
    delay,
    cells: grid.cells,
    cellRenderer: ({artboard, cell}) => {
      let lineWidth = 2;
      let color = artboard.getColor("light");
      const rectWidth = Math.floor(Math.random() * cell.size);
      const innerRectHeight = Math.floor(Math.random() * cell.size) / 2;

      artboard.fillRect({
        xPos: cell.x + Math.floor(Math.random() * rectWidth),
        yPos: cell.y + Math.floor(Math.random() * cell.size),
        width: rectWidth,
        height: cell.size,
        color,
      })

      lineWidth = 1;
      artboard.drawRect({
        xPos: cell.x + Math.random() * cell.size,
        yPos: cell.y + Math.random() * innerRectHeight,
        width: Math.random() * cell.size,
        height:innerRectHeight,
        lineWidth,
        color,
      });

      // color = artboard.getColor("medium");
      lineWidth = 2;
      artboard.drawRect({
        xPos: cell.x + Math.random() * cell.size,
        yPos: cell.y + Math.random() * cell.size,
        width: Math.random() * cell.size,
        height: cell.size,
        lineWidth,
        color,
      });

      color = artboard.getColor("dark");
      artboard.fillRect({
        xPos: cell.x + Math.floor(Math.random() * cell.size / 4),
        yPos: cell.y + Math.floor(Math.random() * cell.size / 4),
        width: Math.floor(Math.random() * cell.size),
        height: Math.floor(Math.random() * cell.size),
        color,
      });
    },
  });
}

const renderCells = ({artboard, cells, cellRenderer, delay}) => {
  cells.forEach(async (cell, index) => {
    if (delay > 0) {
      await sleep(delay * index)
    }
    cellRenderer({artboard, cell});
  })
}

const animateCells = ({cellRenderer, artboard, cells, iterations = 240, fps = 30}) => {
  const delay = 0;
  const tick = 1000 / fps;

  artboard.clear();

  renderCells({
    artboard,
    delay,
    cells,
    cellRenderer,
  })

  iterations = iterations - 1;

  if (iterations > 0) {
    setTimeout(() => animateCells({cellRenderer, artboard, iterations, cells, fps}), tick)
  }
}

// Utilities

// randomly select an element from collection
const sample = (collection) => {
  return collection[noise({ max: collection.length })];
}

// random integer between min and max
const noise = ({ min = 0, max = 1 }) => {
  return Math.floor(Math.random() * (max - min) + min);
}

const coinToss = () => {
  return Math.random() >= 0.5;
}

// sleep x milliseconds
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
