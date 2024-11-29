let cellSizes = [16, 32, 64, 128];
let cellSizePixels = 64;
let artboard = {};
let grid = {};

const loadInterface = () => {
  const canvas = document.querySelector("canvas");
  const palette = selectPalette();
  artboard = new Artboard({
    canvas,
    palette,
    dpr: window.devicePixelRatio,
  });
  grid = createGrid({
    cellSizePixels,
    gridWidthPixels: artboard.width,
    gridHeightPixels: artboard.height,
  });

  setPalette();

  document.querySelector("#clear").addEventListener("click", (event) => {
    event.preventDefault();
    swapPalette();
    grid.resize(cellSizePixels);
    artboard.clear();
  });

  document.querySelector("#render").addEventListener("click", (event) => {
    event.preventDefault();
    [flipPalette, swapPalette][Math.floor(Math.random() * 2)]();
    swapCellSize();
    render({ artboard, grid });
  });
};

const setPalette = () => {
  const root = document.querySelector(":root");
  root.style.setProperty("--bg-color", artboard.baseColor());
  root.style.setProperty("--fg-color", artboard.inkColor());
};

const swapPalette = () => {
  artboard.swapPalette();
  setPalette();
};

const flipPalette = () => {
  artboard.flipPalette();
  setPalette();
};

const swapCellSize = () => {
  cellSizePixels = cellSizes[Math.floor(Math.random() * cellSizes.length)];
  grid = createGrid({
    cellSizePixels,
    gridWidthPixels: artboard.width,
    gridHeightPixels: artboard.height,
  });
};
