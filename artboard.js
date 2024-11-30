const RESET_MATRIX = [1, 0, 0, 1, 0, 0];

class Artboard {
  constructor({ canvas, dpr }) {
    this.canvas = canvas;
    this.dpr = dpr;
    this.width = this.canvas.offsetWidth;
    this.height = this.canvas.offsetHeight;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.ctx = this.canvas.getContext("2d");
    this.palette = selectPalette();
    this.inkChance = Math.random();
    this.restore();
    this.clear();
  }

  bgColor(overrides = {}) {
    return this.palette.getColor("bg", overrides);
  }

  fgColor(overrides = {}) {
    return this.palette.getColor("ink", overrides);
  }

  inkColor(overrides = {}) {
    if (Math.random() > this.inkChance) {
      return this.palette.getColor("blend", overrides);
    } else {
      return this.palette.getColor("ink", overrides);
    }
  }

  randomColor(overrides = {}) {
    if (Math.random() * 2 > 1) {
      return this.inkColor(overrides);
    } else {
      return this.bgColor(overrides);
    }
  }

  flipPalette() {
    this.palette.flip();
    this.restore();
    this.clear();
  }

  swapPalette() {
    this.palette = selectPalette();
    this.inkChance = Math.random();
    this.restore();
    this.clear();
  }

  clear() {
    this.fillRect({
      x: 0,
      y: 0,
      width: this.width,
      height: this.height,
      color: this.bgColor(),
    });
  }

  restore() {
    this.ctx.setTransform(...RESET_MATRIX);
    this.ctx.scale(this.dpr, this.dpr);
    this.ctx.translate(0, 0);
  }

  rotate(radians) {
    this.ctx.rotate(radians);
  }

  translate(x, y) {
    this.ctx.translate(x, y);
  }

  drawRect({ x, y, width, height, color = this.inkColor(), lineWidth = 1 }) {
    this.ctx.beginPath();
    this.ctx.lineWidth = lineWidth;
    this.ctx.strokeStyle = color;
    this.ctx.strokeRect(x, y, width, height);
  }

  fillRect({ x, y, width, height, color = this.inkColor() }) {
    this.ctx.beginPath();
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height);
  }

  drawLine({
    xStart,
    yStart,
    xFinish,
    yFinish,
    color = this.inkColor(),
    lineWidth = 1,
    lineCap = "round",
  }) {
    this.ctx.beginPath();
    this.ctx.lineCap = lineCap;
    this.ctx.lineWidth = lineWidth;
    this.ctx.strokeStyle = color;
    this.ctx.moveTo(xStart, yStart);
    this.ctx.lineTo(xFinish, yFinish);
    this.ctx.stroke();
  }
}

// Palette

const BASE_COLOR_VALUES = {
  bg: 15,
  blend: 145,
  ink: 220,
};

const SHIFT_COLOR_VALUES = {
  bg: 5,
  blend: 90,
  ink: 20,
};

const PALETTE_MODIFIERS = [
  { r: 1, g: 0, b: 0, a: 1, theme: "red" },
  { r: 1, g: 1, b: 0, a: 1, theme: "yellow" },
  { r: 0, g: 1, b: 0, a: 1, theme: "green" },
  { r: 0, g: 1, b: 1, a: 1, theme: "cyan" },
  { r: 0, g: 0, b: 1, a: 1, theme: "blue" },
  { r: 1, g: 0, b: 1, a: 1, theme: "magenta" },
  //{ r: 1, g: 1, b: 1, a: 1, theme: "grey" },
];

const selectPalette = () => {
  const randomModIndex = Math.floor(Math.random() * PALETTE_MODIFIERS.length);
  const mod = PALETTE_MODIFIERS[randomModIndex];

  return {
    bg: buildRGBA(mod, "bg"),
    ink: buildRGBA(mod, "ink"),
    blend: buildRGBA(mod, "blend"),
    theme: mod.theme,
    flip() {
      const _ink = this.bg;
      const _bg = this.ink;
      this.bg = _bg;
      this.ink = _ink;
    },
    getColor(name, overrides = {}) {
      const c = {
        ...this[name],
        ...overrides,
      };

      return `rgb(${c["r"]},${c["g"]},${c["b"]},${c["a"]})`;
    },
  };
};

const buildRGBA = (mod, name) => {
  const base = BASE_COLOR_VALUES[name];
  const shift = SHIFT_COLOR_VALUES[name];

  return {
    r: base + mod.r * shift,
    g: base + mod.g * shift,
    b: base + mod.b * shift,
    a: mod.a,
  };
};
