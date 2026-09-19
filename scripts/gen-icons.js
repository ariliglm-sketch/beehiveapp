// One-off generator for placeholder app icons (hexagon mark on the app's accent teal).
// Run with: node scripts/gen-icons.js
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const ACCENT = [0x00, 0x88, 0xb0]; // colors.accent
const DARK = [0x20, 0x1e, 0x1d]; // colors.text
const LIGHT = [0xf8, 0xf4, 0xf4]; // colors.neutral100

function hexPath(cx, cy, r) {
  const pts = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 180) * (60 * i - 90);
    pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }
  return pts;
}

function pointInPolygon(x, y, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    const intersect =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

function makeRGBA(size, bgColor, drawFn) {
  const buf = Buffer.alloc(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;
      const px = drawFn ? drawFn(x, y) : null;
      const [r, g, b, a] = px || [...bgColor, 255];
      buf[idx] = r;
      buf[idx + 1] = g;
      buf[idx + 2] = b;
      buf[idx + 3] = a;
    }
  }
  return buf;
}

function crc32(buf) {
  let c;
  const table = crc32.table || (crc32.table = (() => {
    const t = [];
    for (let n = 0; n < 256; n++) {
      c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      t[n] = c >>> 0;
    }
    return t;
  })());
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) crc = table[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function encodePNG(size, rgba) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const raw = Buffer.alloc(size * (size * 4 + 1));
  for (let y = 0; y < size; y++) {
    raw[y * (size * 4 + 1)] = 0; // filter type none
    rgba.copy(raw, y * (size * 4 + 1) + 1, y * size * 4, (y + 1) * size * 4);
  }
  const idat = zlib.deflateSync(raw);

  return Buffer.concat([
    sig,
    chunk('IHDR', ihdr),
    chunk('IDAT', idat),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

function hexIcon(size, bg, fg, scale = 0.62, transparentBg = false) {
  const cx = size / 2;
  const cy = size / 2;
  const poly = hexPath(cx, cy, (size * scale) / 2);
  return makeRGBA(size, bg, (x, y) => {
    if (pointInPolygon(x + 0.5, y + 0.5, poly)) return [...fg, 255];
    return transparentBg ? [0, 0, 0, 0] : [...bg, 255];
  });
}

const outDir = path.join(__dirname, '..', 'assets');
fs.mkdirSync(outDir, { recursive: true });

// App icon: teal ground, light hexagon mark.
fs.writeFileSync(path.join(outDir, 'icon.png'), encodePNG(1024, hexIcon(1024, ACCENT, LIGHT)));

// Android adaptive icon layers.
fs.writeFileSync(
  path.join(outDir, 'android-icon-background.png'),
  encodePNG(1024, makeRGBA(1024, ACCENT))
);
fs.writeFileSync(
  path.join(outDir, 'android-icon-foreground.png'),
  encodePNG(1024, hexIcon(1024, ACCENT, LIGHT, 0.42, true))
);
fs.writeFileSync(
  path.join(outDir, 'android-icon-monochrome.png'),
  encodePNG(1024, hexIcon(1024, [0, 0, 0], [255, 255, 255], 0.42, true))
);

// Favicon.
fs.writeFileSync(path.join(outDir, 'favicon.png'), encodePNG(196, hexIcon(196, ACCENT, LIGHT)));

console.log('Wrote icons to', outDir);
