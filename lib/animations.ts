// ─── Inline Lottie animation data ─────────────────────────────────────────────
// Kept as plain JS objects so no external CDN fetch is required.
// Replace with richer animations from lottiefiles.com as needed.

// ── pulseOrb ─────────────────────────────────────────────────────────────────
// Green outer ring expanding+fading while inner circle breathes in reverse.
// 200×200 canvas · 30 fps · 90 frames (3 s)
export const pulseOrb = {
  v: "5.7.4", fr: 30, ip: 0, op: 90, w: 200, h: 200,
  nm: "PulseOrb", ddd: 0, assets: [],
  layers: [
    {
      ddd: 0, ind: 1, ty: 4, nm: "Ring", sr: 1,
      ks: {
        o: { a: 1, k: [
          { i: { x: [0.5], y: [1] }, o: { x: [0.5], y: [0] }, t: 0,  s: [50] },
          { i: { x: [0.5], y: [1] }, o: { x: [0.5], y: [0] }, t: 45, s: [8]  },
          { t: 90, s: [50] },
        ]},
        r: { a: 0, k: 0 },
        p: { a: 0, k: [100, 100, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 1, k: [
          { i: { x: [0.5,0.5,0.5], y: [1,1,1] }, o: { x: [0.5,0.5,0.5], y: [0,0,0] }, t: 0,  s: [80,  80,  100] },
          { i: { x: [0.5,0.5,0.5], y: [1,1,1] }, o: { x: [0.5,0.5,0.5], y: [0,0,0] }, t: 45, s: [120, 120, 100] },
          { t: 90, s: [80, 80, 100] },
        ]},
      },
      ao: 0,
      shapes: [{
        ty: "gr",
        it: [
          { d: 1, ty: "el", s: { a: 0, k: [140, 140] }, p: { a: 0, k: [0, 0] }, nm: "E" },
          { ty: "st", c: { a: 0, k: [0.086, 0.651, 0.353, 1] }, o: { a: 0, k: 100 }, w: { a: 0, k: 2 }, lc: 2, lj: 2, nm: "S" },
          { ty: "tr", p: { a: 0, k: [0,0] }, a: { a: 0, k: [0,0] }, s: { a: 0, k: [100,100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 }, sk: { a: 0, k: 0 }, sa: { a: 0, k: 0 }, nm: "T" },
        ],
        nm: "G", np: 3, cix: 2, bm: 0, ix: 1,
      }],
      ip: 0, op: 90, st: 0, bm: 0,
    },
    {
      ddd: 0, ind: 2, ty: 4, nm: "Core", sr: 1,
      ks: {
        o: { a: 0, k: 80 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [100, 100, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 1, k: [
          { i: { x: [0.5,0.5,0.5], y: [1,1,1] }, o: { x: [0.5,0.5,0.5], y: [0,0,0] }, t: 0,  s: [100, 100, 100] },
          { i: { x: [0.5,0.5,0.5], y: [1,1,1] }, o: { x: [0.5,0.5,0.5], y: [0,0,0] }, t: 45, s: [85,  85,  100] },
          { t: 90, s: [100, 100, 100] },
        ]},
      },
      ao: 0,
      shapes: [{
        ty: "gr",
        it: [
          { d: 1, ty: "el", s: { a: 0, k: [70, 70] }, p: { a: 0, k: [0, 0] }, nm: "E" },
          { ty: "fl", c: { a: 0, k: [0.086, 0.651, 0.353, 1] }, o: { a: 0, k: 100 }, r: 1, bm: 0, nm: "F" },
          { ty: "tr", p: { a: 0, k: [0,0] }, a: { a: 0, k: [0,0] }, s: { a: 0, k: [100,100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 }, sk: { a: 0, k: 0 }, sa: { a: 0, k: 0 }, nm: "T" },
        ],
        nm: "G", np: 3, cix: 2, bm: 0, ix: 1,
      }],
      ip: 0, op: 90, st: 0, bm: 0,
    },
  ],
  markers: [],
};

// ── floatDots ─────────────────────────────────────────────────────────────────
// Three green dots rising and fading at staggered intervals — like tech particles.
// 300×300 canvas · 30 fps · 90 frames (3 s)
function makeDot(
  ind: number, x: number, yFrom: number, yTo: number,
  sz: number, opMax: number, st: number,
) {
  return {
    ddd: 0, ind, ty: 4, nm: `D${ind}`, sr: 1,
    ks: {
      o: { a: 1, k: [
        { t: 0, s: [0] },
        { i: { x: [0.5], y: [1] }, o: { x: [0.5], y: [0] }, t: 8,  s: [opMax] },
        { i: { x: [0.5], y: [1] }, o: { x: [0.5], y: [0] }, t: 52, s: [0]     },
        { t: 60, s: [0] },
      ]},
      r: { a: 0, k: 0 },
      p: { a: 1, k: [
        { i: { x: [0.33,0.33,0.33], y: [1,1,1] }, o: { x: [0.67,0.67,0.67], y: [0,0,0] }, t: 0,  s: [x, yFrom, 0] },
        { t: 60, s: [x, yTo, 0] },
      ]},
      a: { a: 0, k: [0,0,0] },
      s: { a: 0, k: [100,100,100] },
    },
    ao: 0,
    shapes: [{
      ty: "gr",
      it: [
        { d: 1, ty: "el", s: { a: 0, k: [sz, sz] }, p: { a: 0, k: [0,0] }, nm: "E" },
        { ty: "fl", c: { a: 0, k: [0.086, 0.651, 0.353, 1] }, o: { a: 0, k: 100 }, r: 1, bm: 0, nm: "F" },
        { ty: "tr", p: { a: 0, k: [0,0] }, a: { a: 0, k: [0,0] }, s: { a: 0, k: [100,100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 }, sk: { a: 0, k: 0 }, sa: { a: 0, k: 0 }, nm: "T" },
      ],
      nm: "G", np: 3, cix: 2, bm: 0, ix: 1,
    }],
    ip: 0, op: 90, st, bm: 0,
  };
}

export const floatDots = {
  v: "5.7.4", fr: 30, ip: 0, op: 90, w: 300, h: 300,
  nm: "FloatDots", ddd: 0, assets: [],
  layers: [
    makeDot(1,  80, 250,  80, 16, 80,  0),
    makeDot(2, 180, 270, 100, 12, 60, 30),
    makeDot(3, 130, 260,  90, 20, 70, 60),
  ],
  markers: [],
};
