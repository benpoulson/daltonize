function n(t, i) {
  let e = 0;
  for (let a = 0; a < t.length; a++)
    e += t[a] * i[a];
  return e;
}
function g(t) {
  let i = t[0][0], e = t[0][1], a = t[0][2], u = t[1][0], s = t[1][1], b = t[1][2], c = t[2][0], h = t[2][1], M = t[2][2], p = M * s - b * h, l = -M * u + b * c, o = h * u - s * c, r = i * p + e * l + a * o;
  return r = 1 / r, [
    [p * r, (-M * e + a * h) * r, (b * e - a * s) * r],
    [l * r, (M * i - a * c) * r, (-b * i + a * u) * r],
    [o * r, (-h * i + e * c) * r, (s * i - e * u) * r]
  ];
}
const d = [
  [17.8824, 43.5161, 4.11935],
  [3.45565, 27.1554, 3.86714],
  [0.0299566, 0.184309, 1.46709]
], m = [
  [
    [0, 2.02344, -2.52581],
    [0, 1, 0],
    [0, 0, 1]
  ],
  [
    [1, 0, 0],
    [0.494207, 0, 1.24827],
    [0, 0, 1]
  ],
  [
    [1, 0, 0],
    [0, 1, 0],
    [-0.395913, 0.801109, 0]
  ]
  // tritanope
], f = [
  [0, 0, 0],
  [0.7, 1, 0],
  [0.7, 0, 1]
];
function k(t, i) {
  const e = [n(t, d[0]), n(t, d[1]), n(t, d[2])];
  let a = [0, 0, 0];
  switch (i) {
    case "protanope":
      a = [n(e, m[0][0]), n(e, m[0][1]), n(e, m[0][2])];
      break;
    case "deuteranope":
      a = [n(e, m[1][0]), n(e, m[1][1]), n(e, m[1][2])];
      break;
    case "tritanope":
      a = [n(e, m[2][0]), n(e, m[2][1]), n(e, m[2][2])];
      break;
    default:
      return t;
  }
  const u = g(d);
  let s = [n(a, u[0]), n(a, u[1]), n(a, u[2])];
  s = [t[0] - s[0], t[1] - s[1], t[2] - s[2]];
  const b = [
    n(s, f[0]),
    n(s, f[1]),
    n(s, f[2])
  ];
  return [
    Math.min(Math.max(t[0] + b[0] | 0, 0), 255),
    Math.min(Math.max(t[1] + b[1] | 0, 0), 255),
    Math.min(Math.max(t[2] + b[2] | 0, 0), 255)
  ];
}
export {
  k as daltonize
};
