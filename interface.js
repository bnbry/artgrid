let cellSizes = [32, 64, 128];
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

  document.querySelector("#render").addEventListener("click", (event) => {
    event.preventDefault();
    [flipPalette, swapPalette][Math.floor(Math.random() * 2)]();
    swapCellSize();
    grid.resize(cellSizePixels);
    artboard.clear();
    const selectedRenderer = document.querySelector("#renderer-select").value;
    render({ artboard, grid, selectedRenderer });
  });

  document.querySelector("#download").addEventListener("click", (event) => {
    event.preventDefault();
    let imageData = canvas.toDataURL();
    let downloader = document.createElement("a");
    downloader.download = "artgrid.png";
    downloader.href = imageData;
    downloader.click();
  });
};

const setPalette = () => {
  const root = document.querySelector(":root");
  root.style.setProperty("--bg-color", artboard.bgColor());
  root.style.setProperty("--fg-color", artboard.fgColor());
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
