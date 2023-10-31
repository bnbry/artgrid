const BASE_COLOR_VALUES = {
  dark: 15,
  medium: 110,
  light: 220,
  grid: 0,
}
const SHIFT_COLOR_VALUES = {
  dark: 5,
  medium: 10,
  light: 20,
  grid: 5,
}
const PALETTE_MODIFIERS = [
  { r: 1, g: 0, b: 0, a: 1, theme: "red" },
  { r: 1, g: 1, b: 0, a: 1, theme: "yellow" },
  { r: 0, g: 1, b: 0, a: 1, theme: "green" },
  { r: 0, g: 1, b: 1, a: 1, theme: "cyan" },
  { r: 0, g: 0, b: 1, a: 1, theme: "blue" },
  { r: 1, g: 0, b: 1, a: 1, theme: "magenta" },
  { r: 1, g: 1, b: 1, a: 1, theme: "grey" },
]

const selectPalette = () => {
  const randomModIndex = Math.floor(Math.random() * PALETTE_MODIFIERS.length);
  const mod = PALETTE_MODIFIERS[randomModIndex];

  return {
    dark: buildRGB(mod, "dark"),
    medium: buildRGB(mod, "medium"),
    light: buildRGB(mod, "light"),
    grid: buildRGB(mod, "grid"),
    theme: mod.theme,
    flip() {
      const newLight = this.dark;
      const newDark = this.light;
      this.dark = newDark;
      this.light = newLight;
    },
    getColor(name, overrides = {}) {
      const c = {
        ...this[name],
        ...overrides,
      };

      return `rgb(${c['r']},${c['g']},${c['b']},${c['a']})`;
    },
  }
}

const buildRGB = (mod, name) => {
  const base = BASE_COLOR_VALUES[name];
  const shift = SHIFT_COLOR_VALUES[name];

  return {
    r: base + (mod.r * shift),
    g: base + (mod.g * shift),
    b: base + (mod.b * shift),
    a: mod.a,
  }
}
