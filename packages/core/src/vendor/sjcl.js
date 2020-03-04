const sjcl = {
  cipher: {},
  hash: {},
  keyexchange: {},
  mode: {},
  misc: {},
  codec: {},
  exception: {
    corrupt(a) { this.toString = function () { return `CORRUPT: ${this.message}`; }; this.message = a; }, invalid(a) { this.toString = function () { return `INVALID: ${this.message}`; }; this.message = a; }, bug(a) { this.toString = function () { return `BUG: ${this.message}`; }; this.message = a; }, notReady(a) { this.toString = function () { return `NOT READY: ${this.message}`; }; this.message = a; },
  },
};
sjcl.cipher.aes = function (a) {
  this.s[0][0][0] || this.O(); let b; let c; let d; let e; const f = this.s[0][4]; const g = this.s[1]; b = a.length; let h = 1; if (b !== 4 && b !== 6 && b !== 8) throw new sjcl.exception.invalid('invalid aes key size'); this.b = [d = a.slice(0), e = []]; for (a = b; a < 4 * b + 28; a++) { c = d[a - 1]; if (a % b === 0 || b === 8 && a % b === 4)c = f[c >>> 24] << 24 ^ f[c >> 16 & 255] << 16 ^ f[c >> 8 & 255] << 8 ^ f[c & 255], a % b === 0 && (c = c << 8 ^ c >>> 24 ^ h << 24, h = h << 1 ^ 283 * (h >> 7)); d[a] = d[a - b] ^ c; } for (b = 0; a; b++, a--) {
    c = d[b & 3 ? a : a - 4], e[b] = a <= 4 || b < 4 ? c : g[0][f[c >>> 24]] ^ g[1][f[c >> 16 & 255]] ^ g[2][f[c >> 8 & 255]] ^ g[3][f[c
& 255]];
  }
};
sjcl.cipher.aes.prototype = {
  encrypt(a) { return t(this, a, 0); },
  decrypt(a) { return t(this, a, 1); },
  s: [[[], [], [], [], []], [[], [], [], [], []]],
  O() {
    const a = this.s[0]; const b = this.s[1]; const c = a[4]; const d = b[4]; let e; let f; let g; const h = []; const k = []; let l; let n; let m; let p; for (e = 0; e < 0x100; e++)k[(h[e] = e << 1 ^ 283 * (e >> 7)) ^ e] = e; for (f = g = 0; !c[f]; f ^= l || 1, g = k[g] || 1) for (m = g ^ g << 1 ^ g << 2 ^ g << 3 ^ g << 4, m = m >> 8 ^ m & 255 ^ 99, c[f] = m, d[m] = f, n = h[e = h[l = h[f]]], p = 0x1010101 * n ^ 0x10001 * e ^ 0x101 * l ^ 0x1010100 * f, n = 0x101 * h[m] ^ 0x1010100 * m, e = 0; e < 4; e++)a[e][f] = n = n << 24 ^ n >>> 8, b[e][m] = p = p << 24 ^ p >>> 8; for (e = 0; e < 5; e++)a[e] = a[e].slice(0), b[e] = b[e].slice(0);
  },
};
function t(a, b, c) {
  if (b.length !== 4) throw new sjcl.exception.invalid('invalid aes block size'); const d = a.b[c]; let e = b[0] ^ d[0]; let f = b[c ? 3 : 1] ^ d[1]; let g = b[2] ^ d[2]; b = b[c ? 1 : 3] ^ d[3]; let h; let k; let l; const n = d.length / 4 - 2; let m; let p = 4; const r = [0, 0, 0, 0]; h = a.s[c]; a = h[0]; const q = h[1]; const v = h[2]; const w = h[3]; const x = h[4]; for (m = 0; m < n; m++)h = a[e >>> 24] ^ q[f >> 16 & 255] ^ v[g >> 8 & 255] ^ w[b & 255] ^ d[p], k = a[f >>> 24] ^ q[g >> 16 & 255] ^ v[b >> 8 & 255] ^ w[e & 255] ^ d[p + 1], l = a[g >>> 24] ^ q[b >> 16 & 255] ^ v[e >> 8 & 255] ^ w[f & 255] ^ d[p + 2], b = a[b >>> 24] ^ q[e >> 16 & 255] ^ v[f >> 8 & 255] ^ w[g & 255] ^ d[p + 3], p += 4, e = h, f = k, g = l; for (m = 0; m < 4; m++)r[c ? 3 & -m : m] = x[e >>> 24] << 24 ^ x[f >> 16 & 255] << 16 ^ x[g >> 8 & 255] << 8 ^ x[b & 255] ^ d[p++], h = e, e = f, f = g, g = b, b = h; return r;
}
sjcl.bitArray = {
  bitSlice(a, b, c) { a = sjcl.bitArray.$(a.slice(b / 32), 32 - (b & 31)).slice(1); return void 0 === c ? a : sjcl.bitArray.clamp(a, c - b); },
  extract(a, b, c) { const d = Math.floor(-b - c & 31); return ((b + c - 1 ^ b) & -32 ? a[b / 32 | 0] << 32 - d ^ a[b / 32 + 1 | 0] >>> d : a[b / 32 | 0] >>> d) & (1 << c) - 1; },
  concat(a, b) { if (a.length === 0 || b.length === 0) return a.concat(b); const c = a[a.length - 1]; const d = sjcl.bitArray.getPartial(c); return d === 32 ? a.concat(b) : sjcl.bitArray.$(b, d, c | 0, a.slice(0, a.length - 1)); },
  bitLength(a) {
    const b = a.length; return b
    === 0 ? 0 : 32 * (b - 1) + sjcl.bitArray.getPartial(a[b - 1]);
  },
  clamp(a, b) { if (32 * a.length < b) return a; a = a.slice(0, Math.ceil(b / 32)); const c = a.length; b &= 31; c > 0 && b && (a[c - 1] = sjcl.bitArray.partial(b, a[c - 1] & 2147483648 >> b - 1, 1)); return a; },
  partial(a, b, c) { return a === 32 ? b : (c ? b | 0 : b << 32 - a) + 0x10000000000 * a; },
  getPartial(a) { return Math.round(a / 0x10000000000) || 32; },
  equal(a, b) {
    if (sjcl.bitArray.bitLength(a) !== sjcl.bitArray.bitLength(b)) return !1; let c = 0; let d; for (d = 0; d < a.length; d++)c |= a[d] ^ b[d]; return c
        === 0;
  },
  $(a, b, c, d) { let e; e = 0; for (void 0 === d && (d = []); b >= 32; b -= 32)d.push(c), c = 0; if (b === 0) return d.concat(a); for (e = 0; e < a.length; e++)d.push(c | a[e] >>> b), c = a[e] << 32 - b; e = a.length ? a[a.length - 1] : 0; a = sjcl.bitArray.getPartial(e); d.push(sjcl.bitArray.partial(b + a & 31, b + a > 32 ? c : d.pop(), 1)); return d; },
  i(a, b) { return [a[0] ^ b[0], a[1] ^ b[1], a[2] ^ b[2], a[3] ^ b[3]]; },
  byteswapM(a) { let b; let c; for (b = 0; b < a.length; ++b)c = a[b], a[b] = c >>> 24 | c >>> 8 & 0xff00 | (c & 0xff00) << 8 | c << 24; return a; },
};
sjcl.codec.utf8String = { fromBits(a) { let b = ''; const c = sjcl.bitArray.bitLength(a); let d; let e; for (d = 0; d < c / 8; d++)(d & 3) === 0 && (e = a[d / 4]), b += String.fromCharCode(e >>> 8 >>> 8 >>> 8), e <<= 8; return decodeURIComponent(escape(b)); }, toBits(a) { a = unescape(encodeURIComponent(a)); const b = []; let c; let d = 0; for (c = 0; c < a.length; c++)d = d << 8 | a.charCodeAt(c), (c & 3) === 3 && (b.push(d), d = 0); c & 3 && b.push(sjcl.bitArray.partial(8 * (c & 3), d)); return b; } };
sjcl.codec.hex = { fromBits(a) { let b = ''; let c; for (c = 0; c < a.length; c++)b += ((a[c] | 0) + 0xf00000000000).toString(16).substr(4); return b.substr(0, sjcl.bitArray.bitLength(a) / 4); }, toBits(a) { let b; const c = []; let d; a = a.replace(/\s|0x/g, ''); d = a.length; a += '00000000'; for (b = 0; b < a.length; b += 8)c.push(parseInt(a.substr(b, 8), 16) ^ 0); return sjcl.bitArray.clamp(c, 4 * d); } };
sjcl.codec.base32 = {
  B: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567',
  X: '0123456789ABCDEFGHIJKLMNOPQRSTUV',
  BITS: 32,
  BASE: 5,
  REMAINING: 27,
  fromBits(a, b, c) { const d = sjcl.codec.base32.BASE; const e = sjcl.codec.base32.REMAINING; let f = ''; let g = 0; let h = sjcl.codec.base32.B; let k = 0; const l = sjcl.bitArray.bitLength(a); c && (h = sjcl.codec.base32.X); for (c = 0; f.length * d < l;)f += h.charAt((k ^ a[c] >>> g) >>> e), g < d ? (k = a[c] << d - g, g += e, c++) : (k <<= d, g -= d); for (;f.length & 7 && !b;)f += '='; return f; },
  toBits(a, b) {
    a = a.replace(/\s|=/g, '').toUpperCase(); const c = sjcl.codec.base32.BITS;
    const d = sjcl.codec.base32.BASE; const e = sjcl.codec.base32.REMAINING; const f = []; let g; let h = 0; let k = sjcl.codec.base32.B; let l = 0; let n; let m = 'base32'; b && (k = sjcl.codec.base32.X, m = 'base32hex'); for (g = 0; g < a.length; g++) { n = k.indexOf(a.charAt(g)); if (n < 0) { if (!b) try { return sjcl.codec.base32hex.toBits(a); } catch (p) {} throw new sjcl.exception.invalid(`this isn't ${m}!`); }h > e ? (h -= e, f.push(l ^ n >>> h), l = n << c - h) : (h += d, l ^= n << c - h); }h & 56 && f.push(sjcl.bitArray.partial(h & 56, l, 1)); return f;
  },
};
sjcl.codec.base32hex = { fromBits(a, b) { return sjcl.codec.base32.fromBits(a, b, 1); }, toBits(a) { return sjcl.codec.base32.toBits(a, 1); } };
sjcl.codec.base64 = {
  B: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
  fromBits(a, b, c) { let d = ''; let e = 0; let f = sjcl.codec.base64.B; let g = 0; const h = sjcl.bitArray.bitLength(a); c && (f = `${f.substr(0, 62)}-_`); for (c = 0; 6 * d.length < h;)d += f.charAt((g ^ a[c] >>> e) >>> 26), e < 6 ? (g = a[c] << 6 - e, e += 26, c++) : (g <<= 6, e -= 6); for (;d.length & 3 && !b;)d += '='; return d; },
  toBits(a, b) {
    a = a.replace(/\s|=/g, ''); const c = []; let d; let e = 0; let f = sjcl.codec.base64.B; let g = 0; let h; b && (f = `${f.substr(0, 62)}-_`); for (d = 0; d < a.length; d++) {
      h = f.indexOf(a.charAt(d));
      if (h < 0) throw new sjcl.exception.invalid("this isn't base64!"); e > 26 ? (e -= 26, c.push(g ^ h >>> e), g = h << 32 - e) : (e += 6, g ^= h << 32 - e);
    }e & 56 && c.push(sjcl.bitArray.partial(e & 56, g, 1)); return c;
  },
}; sjcl.codec.base64url = { fromBits(a) { return sjcl.codec.base64.fromBits(a, 1, 1); }, toBits(a) { return sjcl.codec.base64.toBits(a, 1); } }; sjcl.hash.sha256 = function (a) { this.b[0] || this.O(); a ? (this.F = a.F.slice(0), this.A = a.A.slice(0), this.l = a.l) : this.reset(); }; sjcl.hash.sha256.hash = function (a) { return (new sjcl.hash.sha256()).update(a).finalize(); };
sjcl.hash.sha256.prototype = {
  blockSize: 512,
  reset() { this.F = this.Y.slice(0); this.A = []; this.l = 0; return this; },
  update(a) {
    typeof a === 'string' && (a = sjcl.codec.utf8String.toBits(a)); let b; const c = this.A = sjcl.bitArray.concat(this.A, a); b = this.l; a = this.l = b + sjcl.bitArray.bitLength(a); if (a > 0x1fffffffffffff) throw new sjcl.exception.invalid('Cannot hash more than 2^53 - 1 bits'); if (typeof Uint32Array !== 'undefined') {
      const d = new Uint32Array(c); let e = 0; for (b = 512 + b - (512 + b & 0x1ff); b <= a; b += 512) {
        u(this, d.subarray(16 * e,
          16 * (e + 1))), e += 1;
      }c.splice(0, 16 * e);
    } else for (b = 512 + b - (512 + b & 0x1ff); b <= a; b += 512)u(this, c.splice(0, 16)); return this;
  },
  finalize() { let a; var b = this.A; const c = this.F; var b = sjcl.bitArray.concat(b, [sjcl.bitArray.partial(1, 1)]); for (a = b.length + 2; a & 15; a++)b.push(0); b.push(Math.floor(this.l / 0x100000000)); for (b.push(this.l | 0); b.length;)u(this, b.splice(0, 16)); this.reset(); return c; },
  Y: [],
  b: [],
  O() {
    function a(a) { return 0x100000000 * (a - Math.floor(a)) | 0; } for (var b = 0, c = 2, d, e; b < 64; c++) {
      e = !0; for (d = 2; d * d <= c; d++) {
        if (c % d === 0) {
          e = !1; break;
        }
      }e && (b < 8 && (this.Y[b] = a(Math.pow(c, 0.5))), this.b[b] = a(Math.pow(c, 1 / 3)), b++);
    }
  },
};
function u(a, b) {
  let c; let d; let e; const f = a.F; const g = a.b; let h = f[0]; let k = f[1]; let l = f[2]; let n = f[3]; let m = f[4]; let p = f[5]; let r = f[6]; let q = f[7]; for (c = 0; c < 64; c++)c < 16 ? d = b[c] : (d = b[c + 1 & 15], e = b[c + 14 & 15], d = b[c & 15] = (d >>> 7 ^ d >>> 18 ^ d >>> 3 ^ d << 25 ^ d << 14) + (e >>> 17 ^ e >>> 19 ^ e >>> 10 ^ e << 15 ^ e << 13) + b[c & 15] + b[c + 9 & 15] | 0), d = d + q + (m >>> 6 ^ m >>> 11 ^ m >>> 25 ^ m << 26 ^ m << 21 ^ m << 7) + (r ^ m & (p ^ r)) + g[c], q = r, r = p, p = m, m = n + d | 0, n = l, l = k, k = h, h = d + (k & l ^ n & (k ^ l)) + (k >>> 2 ^ k >>> 13 ^ k >>> 22 ^ k << 30 ^ k << 19 ^ k << 10) | 0; f[0] = f[0] + h | 0; f[1] = f[1] + k | 0; f[2] = f[2] + l | 0; f[3] = f[3] + n | 0; f[4] = f[4] + m | 0; f[5] = f[5] + p | 0; f[6] = f[6] + r | 0; f[7] = f[7] + q | 0;
}
sjcl.mode.ccm = {
  name: 'ccm',
  G: [],
  listenProgress(a) { sjcl.mode.ccm.G.push(a); },
  unListenProgress(a) { a = sjcl.mode.ccm.G.indexOf(a); a > -1 && sjcl.mode.ccm.G.splice(a, 1); },
  fa(a) { const b = sjcl.mode.ccm.G.slice(); let c; for (c = 0; c < b.length; c += 1)b[c](a); },
  encrypt(a, b, c, d, e) {
    let f; let g = b.slice(0); const h = sjcl.bitArray; const k = h.bitLength(c) / 8; const l = h.bitLength(g) / 8; e = e || 64; d = d || []; if (k < 7) throw new sjcl.exception.invalid('ccm: iv must be at least 7 bytes'); for (f = 2; f < 4 && l >>> 8 * f; f++);f < 15 - k && (f = 15 - k); c = h.clamp(c,
      8 * (15 - f)); b = sjcl.mode.ccm.V(a, b, c, d, e, f); g = sjcl.mode.ccm.C(a, g, c, b, e, f); return h.concat(g.data, g.tag);
  },
  decrypt(a, b, c, d, e) {
    e = e || 64; d = d || []; const f = sjcl.bitArray; const g = f.bitLength(c) / 8; var h = f.bitLength(b); let k = f.clamp(b, h - e); const l = f.bitSlice(b, h - e); var h = (h - e) / 8; if (g < 7) throw new sjcl.exception.invalid('ccm: iv must be at least 7 bytes'); for (b = 2; b < 4 && h >>> 8 * b; b++);b < 15 - g && (b = 15 - g); c = f.clamp(c, 8 * (15 - b)); k = sjcl.mode.ccm.C(a, k, c, l, e, b); a = sjcl.mode.ccm.V(a, k.data, c, d, e, b); if (!f.equal(k.tag, a)) throw new sjcl.exception.corrupt("ccm: tag doesn't match");
    return k.data;
  },
  na(a, b, c, d, e, f) { let g = []; const h = sjcl.bitArray; const k = h.i; d = [h.partial(8, (b.length ? 64 : 0) | d - 2 << 2 | f - 1)]; d = h.concat(d, c); d[3] |= e; d = a.encrypt(d); if (b.length) for (c = h.bitLength(b) / 8, c <= 65279 ? g = [h.partial(16, c)] : c <= 0xffffffff && (g = h.concat([h.partial(16, 65534)], [c])), g = h.concat(g, b), b = 0; b < g.length; b += 4)d = a.encrypt(k(d, g.slice(b, b + 4).concat([0, 0, 0]))); return d; },
  V(a, b, c, d, e, f) {
    const g = sjcl.bitArray; const h = g.i; e /= 8; if (e % 2 || e < 4 || e > 16) throw new sjcl.exception.invalid('ccm: invalid tag length');
    if (d.length > 0xffffffff || b.length > 0xffffffff) throw new sjcl.exception.bug("ccm: can't deal with 4GiB or more data"); c = sjcl.mode.ccm.na(a, d, c, e, g.bitLength(b) / 8, f); for (d = 0; d < b.length; d += 4)c = a.encrypt(h(c, b.slice(d, d + 4).concat([0, 0, 0]))); return g.clamp(c, 8 * e);
  },
  C(a, b, c, d, e, f) {
    let g; const h = sjcl.bitArray; g = h.i; const k = b.length; const l = h.bitLength(b); let n = k / 50; const m = n; c = h.concat([h.partial(8, f - 1)], c).concat([0, 0, 0]).slice(0, 4); d = h.bitSlice(g(d, a.encrypt(c)), 0, e); if (!k) return { tag: d, data: [] }; for (g = 0; g < k; g += 4) {
      g > n && (sjcl.mode.ccm.fa(g
        / k), n += m), c[3]++, e = a.encrypt(c), b[g] ^= e[0], b[g + 1] ^= e[1], b[g + 2] ^= e[2], b[g + 3] ^= e[3];
    } return { tag: d, data: h.clamp(b, l) };
  },
};
sjcl.mode.ocb2 = {
  name: 'ocb2',
  encrypt(a, b, c, d, e, f) {
    if (sjcl.bitArray.bitLength(c) !== 128) throw new sjcl.exception.invalid('ocb iv must be 128 bits'); let g; const h = sjcl.mode.ocb2.S; const k = sjcl.bitArray; const l = k.i; let n = [0, 0, 0, 0]; c = h(a.encrypt(c)); let m; let p = []; d = d || []; e = e || 64; for (g = 0; g + 4 < b.length; g += 4)m = b.slice(g, g + 4), n = l(n, m), p = p.concat(l(c, a.encrypt(l(c, m)))), c = h(c); m = b.slice(g); b = k.bitLength(m); g = a.encrypt(l(c, [0, 0, 0, b])); m = k.clamp(l(m.concat([0, 0, 0]), g), b); n = l(n, l(m.concat([0, 0, 0]), g)); n = a.encrypt(l(n, l(c, h(c))));
    d.length && (n = l(n, f ? d : sjcl.mode.ocb2.pmac(a, d))); return p.concat(k.concat(m, k.clamp(n, e)));
  },
  decrypt(a, b, c, d, e, f) {
    if (sjcl.bitArray.bitLength(c) !== 128) throw new sjcl.exception.invalid('ocb iv must be 128 bits'); e = e || 64; const g = sjcl.mode.ocb2.S; const h = sjcl.bitArray; const k = h.i; let l = [0, 0, 0, 0]; let n = g(a.encrypt(c)); let m; let p; const r = sjcl.bitArray.bitLength(b) - e; let q = []; d = d || []; for (c = 0; c + 4 < r / 32; c += 4)m = k(n, a.decrypt(k(n, b.slice(c, c + 4)))), l = k(l, m), q = q.concat(m), n = g(n); p = r - 32 * c; m = a.encrypt(k(n, [0, 0, 0, p])); m = k(m, h.clamp(b.slice(c), p).concat([0,
      0, 0])); l = k(l, m); l = a.encrypt(k(l, k(n, g(n)))); d.length && (l = k(l, f ? d : sjcl.mode.ocb2.pmac(a, d))); if (!h.equal(h.clamp(l, e), h.bitSlice(b, r))) throw new sjcl.exception.corrupt("ocb: tag doesn't match"); return q.concat(h.clamp(m, p));
  },
  pmac(a, b) {
    let c; const d = sjcl.mode.ocb2.S; const e = sjcl.bitArray; const f = e.i; let g = [0, 0, 0, 0]; var h = a.encrypt([0, 0, 0, 0]); var h = f(h, d(d(h))); for (c = 0; c + 4 < b.length; c += 4)h = d(h), g = f(g, a.encrypt(f(h, b.slice(c, c + 4)))); c = b.slice(c); e.bitLength(c) < 128 && (h = f(h, d(h)), c = e.concat(c, [-2147483648, 0, 0, 0])); g = f(g, c);
    return a.encrypt(f(d(f(h, d(h))), g));
  },
  S(a) { return [a[0] << 1 ^ a[1] >>> 31, a[1] << 1 ^ a[2] >>> 31, a[2] << 1 ^ a[3] >>> 31, a[3] << 1 ^ 135 * (a[0] >>> 31)]; },
};
sjcl.mode.gcm = {
  name: 'gcm',
  encrypt(a, b, c, d, e) { const f = b.slice(0); b = sjcl.bitArray; d = d || []; a = sjcl.mode.gcm.C(!0, a, f, d, c, e || 128); return b.concat(a.data, a.tag); },
  decrypt(a, b, c, d, e) { let f = b.slice(0); const g = sjcl.bitArray; const h = g.bitLength(f); e = e || 128; d = d || []; e <= h ? (b = g.bitSlice(f, h - e), f = g.bitSlice(f, 0, h - e)) : (b = f, f = []); a = sjcl.mode.gcm.C(!1, a, f, d, c, e); if (!g.equal(a.tag, b)) throw new sjcl.exception.corrupt("gcm: tag doesn't match"); return a.data; },
  ka(a, b) {
    let c; let d; let e; let f; let g; const h = sjcl.bitArray.i; e = [0, 0,
      0, 0]; f = b.slice(0); for (c = 0; c < 128; c++) { (d = (a[Math.floor(c / 32)] & 1 << 31 - c % 32) !== 0) && (e = h(e, f)); g = (f[3] & 1) !== 0; for (d = 3; d > 0; d--)f[d] = f[d] >>> 1 | (f[d - 1] & 1) << 31; f[0] >>>= 1; g && (f[0] ^= -0x1f000000); } return e;
  },
  j(a, b, c) { let d; const e = c.length; b = b.slice(0); for (d = 0; d < e; d += 4)b[0] ^= 0xffffffff & c[d], b[1] ^= 0xffffffff & c[d + 1], b[2] ^= 0xffffffff & c[d + 2], b[3] ^= 0xffffffff & c[d + 3], b = sjcl.mode.gcm.ka(b, a); return b; },
  C(a, b, c, d, e, f) {
    let g; let h; let k; let l; let n; let m; let p; let r; const q = sjcl.bitArray; m = c.length; p = q.bitLength(c); r = q.bitLength(d); h = q.bitLength(e);
    g = b.encrypt([0, 0, 0, 0]); h === 96 ? (e = e.slice(0), e = q.concat(e, [1])) : (e = sjcl.mode.gcm.j(g, [0, 0, 0, 0], e), e = sjcl.mode.gcm.j(g, e, [0, 0, Math.floor(h / 0x100000000), h & 0xffffffff])); h = sjcl.mode.gcm.j(g, [0, 0, 0, 0], d); n = e.slice(0); d = h.slice(0); a || (d = sjcl.mode.gcm.j(g, h, c)); for (l = 0; l < m; l += 4)n[3]++, k = b.encrypt(n), c[l] ^= k[0], c[l + 1] ^= k[1], c[l + 2] ^= k[2], c[l + 3] ^= k[3]; c = q.clamp(c, p); a && (d = sjcl.mode.gcm.j(g, h, c)); a = [Math.floor(r / 0x100000000), r & 0xffffffff, Math.floor(p / 0x100000000), p & 0xffffffff]; d = sjcl.mode.gcm.j(g, d, a); k = b.encrypt(e);
    d[0] ^= k[0]; d[1] ^= k[1]; d[2] ^= k[2]; d[3] ^= k[3]; return { tag: q.bitSlice(d, 0, f), data: c };
  },
}; sjcl.misc.hmac = function (a, b) { this.W = b = b || sjcl.hash.sha256; const c = [[], []]; let d; const e = b.prototype.blockSize / 32; this.w = [new b(), new b()]; a.length > e && (a = b.hash(a)); for (d = 0; d < e; d++)c[0][d] = a[d] ^ 909522486, c[1][d] = a[d] ^ 1549556828; this.w[0].update(c[0]); this.w[1].update(c[1]); this.R = new b(this.w[0]); };
sjcl.misc.hmac.prototype.encrypt = sjcl.misc.hmac.prototype.mac = function (a) { if (this.aa) throw new sjcl.exception.invalid('encrypt on already updated hmac called!'); this.update(a); return this.digest(a); }; sjcl.misc.hmac.prototype.reset = function () { this.R = new this.W(this.w[0]); this.aa = !1; }; sjcl.misc.hmac.prototype.update = function (a) { this.aa = !0; this.R.update(a); }; sjcl.misc.hmac.prototype.digest = function () { var a = this.R.finalize(); var a = (new this.W(this.w[1])).update(a).finalize(); this.reset(); return a; };
sjcl.misc.pbkdf2 = function (a, b, c, d, e) { c = c || 1E4; if (d < 0 || c < 0) throw new sjcl.exception.invalid('invalid params to pbkdf2'); typeof a === 'string' && (a = sjcl.codec.utf8String.toBits(a)); typeof b === 'string' && (b = sjcl.codec.utf8String.toBits(b)); e = e || sjcl.misc.hmac; a = new e(a); let f; let g; let h; let k; let l = []; const n = sjcl.bitArray; for (k = 1; 32 * l.length < (d || 1); k++) { e = f = a.encrypt(n.concat(b, [k])); for (g = 1; g < c; g++) for (f = a.encrypt(f), h = 0; h < f.length; h++)e[h] ^= f[h]; l = l.concat(e); }d && (l = n.clamp(l, d)); return l; };
sjcl.prng = function (a) { this.c = [new sjcl.hash.sha256()]; this.m = [0]; this.P = 0; this.H = {}; this.N = 0; this.U = {}; this.Z = this.f = this.o = this.ha = 0; this.b = [0, 0, 0, 0, 0, 0, 0, 0]; this.h = [0, 0, 0, 0]; this.L = void 0; this.M = a; this.D = !1; this.K = { progress: {}, seeded: {} }; this.u = this.ga = 0; this.I = 1; this.J = 2; this.ca = 0x10000; this.T = [0, 48, 64, 96, 128, 192, 0x100, 384, 512, 768, 1024]; this.da = 3E4; this.ba = 80; };
sjcl.prng.prototype = {
  randomWords(a, b) {
    const c = []; let d; d = this.isReady(b); let e; if (d === this.u) throw new sjcl.exception.notReady("generator isn't seeded"); if (d & this.J) {
      d = !(d & this.I); e = []; let f = 0; let g; this.Z = e[0] = (new Date()).valueOf() + this.da; for (g = 0; g < 16; g++)e.push(0x100000000 * Math.random() | 0); for (g = 0; g < this.c.length && (e = e.concat(this.c[g].finalize()), f += this.m[g], this.m[g] = 0, d || !(this.P & 1 << g)); g++);this.P >= 1 << this.c.length && (this.c.push(new sjcl.hash.sha256()), this.m.push(0)); this.f -= f; f > this.o && (this.o = f); this.P++; this.b = sjcl.hash.sha256.hash(this.b.concat(e)); this.L = new sjcl.cipher.aes(this.b); for (d = 0; d < 4 && (this.h[d] = this.h[d] + 1 | 0, !this.h[d]); d++);
    } for (d = 0; d < a; d += 4)(d + 1) % this.ca === 0 && y(this), e = z(this), c.push(e[0], e[1], e[2], e[3]); y(this); return c.slice(0, a);
  },
  setDefaultParanoia(a, b) { if (a === 0 && b !== 'Setting paranoia=0 will ruin your security; use it only for testing') throw new sjcl.exception.invalid('Setting paranoia=0 will ruin your security; use it only for testing'); this.M = a; },
  addEntropy(a,
    b, c) {
    c = c || 'user'; let d; let e; const f = (new Date()).valueOf(); let g = this.H[c]; const h = this.isReady(); let k = 0; d = this.U[c]; void 0 === d && (d = this.U[c] = this.ha++); void 0 === g && (g = this.H[c] = 0); this.H[c] = (this.H[c] + 1) % this.c.length; switch (typeof a) {
      case 'number': void 0 === b && (b = 1); this.c[g].update([d, this.N++, 1, b, f, 1, a | 0]); break; case 'object': c = Object.prototype.toString.call(a); if (c === '[object Uint32Array]') { e = []; for (c = 0; c < a.length; c++)e.push(a[c]); a = e; } else {
        for (c !== '[object Array]' && (k = 1), c = 0; c < a.length && !k; c++) {
          typeof a[c] !== 'number'
    && (k = 1);
        }
      } if (!k) { if (void 0 === b) for (c = b = 0; c < a.length; c++) for (e = a[c]; e > 0;)b++, e >>>= 1; this.c[g].update([d, this.N++, 2, b, f, a.length].concat(a)); } break; case 'string': void 0 === b && (b = a.length); this.c[g].update([d, this.N++, 3, b, f, a.length]); this.c[g].update(a); break; default: k = 1;
    } if (k) throw new sjcl.exception.bug('random: addEntropy only supports number, array of numbers or string'); this.m[g] += b; this.f += b; h === this.u && (this.isReady() !== this.u && A('seeded', Math.max(this.o, this.f)), A('progress', this.getProgress()));
  },
  isReady(a) { a = this.T[void 0 !== a ? a : this.M]; return this.o && this.o >= a ? this.m[0] > this.ba && (new Date()).valueOf() > this.Z ? this.J | this.I : this.I : this.f >= a ? this.J | this.u : this.u; },
  getProgress(a) { a = this.T[a || this.M]; return this.o >= a ? 1 : this.f > a ? 1 : this.f / a; },
  startCollectors() {
    if (!this.D) {
      this.a = {
        loadTimeCollector: B(this, this.ma), mouseCollector: B(this, this.oa), keyboardCollector: B(this, this.la), accelerometerCollector: B(this, this.ea), touchCollector: B(this, this.qa),
      }; if (window.addEventListener) {
        window.addEventListener('load',
          this.a.loadTimeCollector, !1), window.addEventListener('mousemove', this.a.mouseCollector, !1), window.addEventListener('keypress', this.a.keyboardCollector, !1), window.addEventListener('devicemotion', this.a.accelerometerCollector, !1), window.addEventListener('touchmove', this.a.touchCollector, !1);
      } else if (document.attachEvent)document.attachEvent('onload', this.a.loadTimeCollector), document.attachEvent('onmousemove', this.a.mouseCollector), document.attachEvent('keypress', this.a.keyboardCollector); else throw new sjcl.exception.bug("can't attach event");
      this.D = !0;
    }
  },
  stopCollectors() {
    this.D && (window.removeEventListener ? (window.removeEventListener('load', this.a.loadTimeCollector, !1), window.removeEventListener('mousemove', this.a.mouseCollector, !1), window.removeEventListener('keypress', this.a.keyboardCollector, !1), window.removeEventListener('devicemotion', this.a.accelerometerCollector, !1), window.removeEventListener('touchmove', this.a.touchCollector, !1)) : document.detachEvent && (document.detachEvent('onload', this.a.loadTimeCollector), document.detachEvent('onmousemove',
      this.a.mouseCollector), document.detachEvent('keypress', this.a.keyboardCollector)), this.D = !1);
  },
  addEventListener(a, b) { this.K[a][this.ga++] = b; },
  removeEventListener(a, b) { let c; let d; const e = this.K[a]; const f = []; for (d in e)e.hasOwnProperty(d) && e[d] === b && f.push(d); for (c = 0; c < f.length; c++)d = f[c], delete e[d]; },
  la() { C(this, 1); },
  oa(a) { let b; let c; try { b = a.x || a.clientX || a.offsetX || 0, c = a.y || a.clientY || a.offsetY || 0; } catch (d) { c = b = 0; }b != 0 && c != 0 && this.addEntropy([b, c], 2, 'mouse'); C(this, 0); },
  qa(a) {
    a = a.touches[0] || a.changedTouches[0]; this.addEntropy([a.pageX || a.clientX, a.pageY || a.clientY], 1, 'touch'); C(this, 0);
  },
  ma() { C(this, 2); },
  ea(a) { a = a.accelerationIncludingGravity.x || a.accelerationIncludingGravity.y || a.accelerationIncludingGravity.z; if (window.orientation) { const b = window.orientation; typeof b === 'number' && this.addEntropy(b, 1, 'accelerometer'); }a && this.addEntropy(a, 2, 'accelerometer'); C(this, 0); },
};
function A(a, b) { let c; const d = sjcl.random.K[a]; const e = []; for (c in d)d.hasOwnProperty(c) && e.push(d[c]); for (c = 0; c < e.length; c++)e[c](b); } function C(a, b) { typeof window !== 'undefined' && window.performance && typeof window.performance.now === 'function' ? a.addEntropy(window.performance.now(), b, 'loadtime') : a.addEntropy((new Date()).valueOf(), b, 'loadtime'); } function y(a) { a.b = z(a).concat(z(a)); a.L = new sjcl.cipher.aes(a.b); } function z(a) { for (let b = 0; b < 4 && (a.h[b] = a.h[b] + 1 | 0, !a.h[b]); b++);return a.L.encrypt(a.h); }
function B(a, b) { return function () { b.apply(a, arguments); }; }sjcl.random = new sjcl.prng(6);
a:try {
  let D; let E; let F; let G; if (G = typeof module !== 'undefined' && module.exports) { let H; try { H = require('crypto'); } catch (a) { H = null; }G = E = H; } if (G && E.randomBytes)D = E.randomBytes(128), D = new Uint32Array((new Uint8Array(D)).buffer), sjcl.random.addEntropy(D, 1024, "crypto['randomBytes']"); else if (typeof window !== 'undefined' && typeof Uint32Array !== 'undefined') {
    F = new Uint32Array(32); if (window.crypto && window.crypto.getRandomValues)window.crypto.getRandomValues(F); else if (window.msCrypto && window.msCrypto.getRandomValues)window.msCrypto.getRandomValues(F);
    else break a; sjcl.random.addEntropy(F, 1024, "crypto['getRandomValues']");
  }
} catch (a) { typeof window !== 'undefined' && window.console && (console.log('There was an error collecting entropy from the browser:'), console.log(a)); }
sjcl.json = {
  defaults: {
    v: 1, iter: 1E4, ks: 128, ts: 64, mode: 'ccm', adata: '', cipher: 'aes',
  },
  ja(a, b, c, d) {
    c = c || {}; d = d || {}; const e = sjcl.json; const f = e.g({ iv: sjcl.random.randomWords(4, 0) }, e.defaults); let g; e.g(f, c); c = f.adata; typeof f.salt === 'string' && (f.salt = sjcl.codec.base64.toBits(f.salt)); typeof f.iv === 'string' && (f.iv = sjcl.codec.base64.toBits(f.iv)); if (!sjcl.mode[f.mode] || !sjcl.cipher[f.cipher] || typeof a === 'string' && f.iter <= 100 || f.ts !== 64 && f.ts !== 96 && f.ts !== 128 || f.ks !== 128 && f.ks !== 192 && f.ks !== 0x100 || f.iv.length < 2
        || f.iv.length > 4) throw new sjcl.exception.invalid('json encrypt: invalid parameters'); typeof a === 'string' ? (g = sjcl.misc.cachedPbkdf2(a, f), a = g.key.slice(0, f.ks / 32), f.salt = g.salt) : sjcl.ecc && a instanceof sjcl.ecc.elGamal.publicKey && (g = a.kem(), f.kemtag = g.tag, a = g.key.slice(0, f.ks / 32)); typeof b === 'string' && (b = sjcl.codec.utf8String.toBits(b)); typeof c === 'string' && (f.adata = c = sjcl.codec.utf8String.toBits(c)); g = new sjcl.cipher[f.cipher](a); e.g(d, f); d.key = a; f.ct = f.mode === 'ccm' && sjcl.arrayBuffer && sjcl.arrayBuffer.ccm
    && b instanceof ArrayBuffer ? sjcl.arrayBuffer.ccm.encrypt(g, b, f.iv, c, f.ts) : sjcl.mode[f.mode].encrypt(g, b, f.iv, c, f.ts); return f;
  },
  encrypt(a, b, c, d) { const e = sjcl.json; const f = e.ja.apply(e, arguments); return e.encode(f); },
  ia(a, b, c, d) {
    c = c || {}; d = d || {}; const e = sjcl.json; b = e.g(e.g(e.g({}, e.defaults), b), c, !0); let f; let g; f = b.adata; typeof b.salt === 'string' && (b.salt = sjcl.codec.base64.toBits(b.salt)); typeof b.iv === 'string' && (b.iv = sjcl.codec.base64.toBits(b.iv)); if (!sjcl.mode[b.mode] || !sjcl.cipher[b.cipher] || typeof a
        === 'string' && b.iter <= 100 || b.ts !== 64 && b.ts !== 96 && b.ts !== 128 || b.ks !== 128 && b.ks !== 192 && b.ks !== 0x100 || !b.iv || b.iv.length < 2 || b.iv.length > 4) throw new sjcl.exception.invalid('json decrypt: invalid parameters'); typeof a === 'string' ? (g = sjcl.misc.cachedPbkdf2(a, b), a = g.key.slice(0, b.ks / 32), b.salt = g.salt) : sjcl.ecc && a instanceof sjcl.ecc.elGamal.secretKey && (a = a.unkem(sjcl.codec.base64.toBits(b.kemtag)).slice(0, b.ks / 32)); typeof f === 'string' && (f = sjcl.codec.utf8String.toBits(f)); g = new sjcl.cipher[b.cipher](a); f = b.mode
    === 'ccm' && sjcl.arrayBuffer && sjcl.arrayBuffer.ccm && b.ct instanceof ArrayBuffer ? sjcl.arrayBuffer.ccm.decrypt(g, b.ct, b.iv, b.tag, f, b.ts) : sjcl.mode[b.mode].decrypt(g, b.ct, b.iv, f, b.ts); e.g(d, b); d.key = a; return c.raw === 1 ? f : sjcl.codec.utf8String.fromBits(f);
  },
  decrypt(a, b, c, d) { const e = sjcl.json; return e.ia(a, e.decode(b), c, d); },
  encode(a) {
    let b; let c = '{'; let d = ''; for (b in a) {
      if (a.hasOwnProperty(b)) {
        if (!b.match(/^[a-z0-9]+$/i)) throw new sjcl.exception.invalid('json encode: invalid property name'); c += `${d}"${
          b}":`; d = ','; switch (typeof a[b]) { case 'number': case 'boolean': c += a[b]; break; case 'string': c += `"${escape(a[b])}"`; break; case 'object': c += `"${sjcl.codec.base64.fromBits(a[b], 0)}"`; break; default: throw new sjcl.exception.bug('json encode: unsupported type'); }
      }
    } return `${c}}`;
  },
  decode(a) {
    a = a.replace(/\s/g, ''); if (!a.match(/^\{.*\}$/)) throw new sjcl.exception.invalid("json decode: this isn't json!"); a = a.replace(/^\{|\}$/g, '').split(/,/); const b = {}; let c; let d; for (c = 0; c < a.length; c++) {
      if (!(d = a[c].match(/^\s*(?:(["']?)([a-z][a-z0-9]*)\1)\s*:\s*(?:(-?\d+)|"([a-z0-9+\/%*_.@=\-]*)"|(true|false))$/i))) throw new sjcl.exception.invalid("json decode: this isn't json!");
      d[3] != null ? b[d[2]] = parseInt(d[3], 10) : d[4] != null ? b[d[2]] = d[2].match(/^(ct|adata|salt|iv)$/) ? sjcl.codec.base64.toBits(d[4]) : unescape(d[4]) : d[5] != null && (b[d[2]] = d[5] === 'true');
    } return b;
  },
  g(a, b, c) { void 0 === a && (a = {}); if (void 0 === b) return a; for (const d in b) if (b.hasOwnProperty(d)) { if (c && void 0 !== a[d] && a[d] !== b[d]) throw new sjcl.exception.invalid('required parameter overridden'); a[d] = b[d]; } return a; },
  sa(a, b) { const c = {}; let d; for (d in a)a.hasOwnProperty(d) && a[d] !== b[d] && (c[d] = a[d]); return c; },
  ra(a,
    b) { const c = {}; let d; for (d = 0; d < b.length; d++) void 0 !== a[b[d]] && (c[b[d]] = a[b[d]]); return c; },
}; sjcl.encrypt = sjcl.json.encrypt; sjcl.decrypt = sjcl.json.decrypt; sjcl.misc.pa = {}; sjcl.misc.cachedPbkdf2 = function (a, b) { let c = sjcl.misc.pa; let d; b = b || {}; d = b.iter || 1E3; c = c[a] = c[a] || {}; d = c[d] = c[d] || { firstSalt: b.salt && b.salt.length ? b.salt.slice(0) : sjcl.random.randomWords(2, 0) }; c = void 0 === b.salt ? d.firstSalt : b.salt; d[c] = d[c] || sjcl.misc.pbkdf2(a, c, b.iter); return { key: d[c].slice(0), salt: c.slice(0) }; };
typeof module !== 'undefined' && module.exports && (module.exports = sjcl); typeof define === 'function' && define([], () => sjcl);
