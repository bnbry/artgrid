const RESET_MATRIX = [1, 0, 0, 1, 0, 0]

class Artboard {
  constructor ({canvas, dpr, palette}) {
    this.canvas = canvas;
    this.dpr = dpr;
    this.width = this.canvas.offsetWidth;
    this.height = this.canvas.offsetHeight;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.ctx = this.canvas.getContext('2d');
    this.palette = palette;
    this.restore();
    this.clear();
  }

  getColor (name, overrides = {}) {
    return this.palette.getColor(name, overrides);
  }

  flipPalette () {
    this.palette.flip();
    this.restore();
    this.clear();
  }

  updatePalette ({palette}) {
    this.palette = palette;
    this.restore();
    this.clear();
  }

  clear () {
    this.fillRect({
      xPos: 0,
      yPos: 0,
      width: this.width,
      height: this.height,
      color: this.palette.getColor("dark"),
    })
  }

  restore () {
    this.ctx.setTransform(...RESET_MATRIX)
    this.ctx.scale(this.dpr, this.dpr)
    this.ctx.translate(0, 0);
  }

  rotate (radians) {
    this.ctx.rotate(radians)
  }

  translate (x, y) {
    this.ctx.translate(x, y)
  }

  drawRect ({
    xPos,
    yPos,
    width,
    height,
    color = this.palette.getColor("light"),
    lineWidth = 2,
  }) {
    this.ctx.beginPath();
    this.ctx.lineWidth = lineWidth;
    this.ctx.strokeStyle = color;
    this.ctx.strokeRect(xPos, yPos, width, height);
  }

  fillRect ({
    xPos,
    yPos,
    width,
    height,
    color = this.palette.getColor("light"),
  }) {
    this.ctx.beginPath();
    this.ctx.fillStyle = color;
    this.ctx.fillRect(xPos, yPos, width, height);
  }

  drawArc({
    xPos,
    yPos,
    radius,
    startRadians = (0 * Math.PI),
    endRadians = (2 * Math.PI),
    color = this.palette.getColor("light"),
    lineWidth = 2,
  }) {
    this.ctx.beginPath();
    this.ctx.lineWidth = lineWidth;
    this.ctx.strokeStyle = color;
    this.ctx.arc(xPos, yPos, radius, startRadians, endRadians);
    this.ctx.stroke();
  }

  fillArc({
    xPos,
    yPos,
    radius,
    startRadians = (0 * Math.PI),
    endRadians = (2 * Math.PI),
    color = this.palette.getColor("light"),
  }) {
    this.ctx.beginPath();
    this.ctx.fillStyle = color;
    this.ctx.arc(xPos, yPos, radius, startRadians, endRadians);
    this.ctx.fill();
  }

  drawLine({
    xFromPos,
    yFromPos,
    xToPos,
    yToPos,
    lineCap = "round",
    lineWidth = 2,
    color = this.palette.getColor("light"),
  }) {
    this.ctx.beginPath();
    this.ctx.lineCap = lineCap;
    this.ctx.lineWidth = lineWidth;
    this.ctx.strokeStyle = color
    this.ctx.moveTo(xFromPos, yFromPos);
    this.ctx.lineTo(xToPos, yToPos);
    this.ctx.stroke();
  }
}
