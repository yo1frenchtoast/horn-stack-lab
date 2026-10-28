// Moteur de calcul "façon Hornresp" : pilote + chambres + pavillon (tubes en escalier) + rayonnement de bouche.
// Convention e^{+jwt}. Complexes = [re, im].
const RHO = 1.205, CSND = 343.4;
const cx = {
  add: (a, b) => [a[0] + b[0], a[1] + b[1]],
  sub: (a, b) => [a[0] - b[0], a[1] - b[1]],
  mul: (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]],
  div: (a, b) => { const d = b[0] * b[0] + b[1] * b[1]; return [(a[0] * b[0] + a[1] * b[1]) / d, (a[1] * b[0] - a[0] * b[1]) / d]; },
  abs: a => Math.hypot(a[0], a[1]),
  arg: a => Math.atan2(a[1], a[0]),
  sc: (a, k) => [a[0] * k, a[1] * k],
  inv: a => { const d = a[0] * a[0] + a[1] * a[1]; return [a[0] / d, -a[1] / d]; },
  fromPolar: (m, ph) => [m * Math.cos(ph), m * Math.sin(ph)],
};

// ---------- Bessel J0, J1 (Abramowitz & Stegun 9.4) et fonction de Struve H1 (Aarts & Janssen) ----------
function besselJ0(x) {
  const ax = Math.abs(x);
  if (ax < 8) {
    const y = x * x;
    return (57568490574.0 + y * (-13362590354.0 + y * (651619640.7 + y * (-11214424.18 + y * (77392.33017 + y * (-184.9052456)))))) /
      (57568490411.0 + y * (1029532985.0 + y * (9494680.718 + y * (59272.64853 + y * (267.8532712 + y)))));
  }
  const z = 8 / ax, y = z * z, xx = ax - 0.785398164;
  const a1 = 1 + y * (-0.1098628627e-2 + y * (0.2734510407e-4 + y * (-0.2073370639e-5 + y * 0.2093887211e-6)));
  const a2 = -0.1562499995e-1 + y * (0.1430488765e-3 + y * (-0.6911147651e-5 + y * (0.7621095161e-6 - y * 0.934935152e-7)));
  return Math.sqrt(0.636619772 / ax) * (Math.cos(xx) * a1 - z * Math.sin(xx) * a2);
}
function besselJ1(x) {
  const ax = Math.abs(x);
  if (ax < 8) {
    const y = x * x;
    const a = x * (72362614232.0 + y * (-7895059235.0 + y * (242396853.1 + y * (-2972611.439 + y * (15704.48260 + y * (-30.16036606))))));
    const b = 144725228442.0 + y * (2300535178.0 + y * (18583304.74 + y * (99447.43394 + y * (376.9991397 + y))));
    return a / b;
  }
  const z = 8 / ax, y = z * z, xx = ax - 2.356194491;
  const a1 = 1 + y * (0.183105e-2 + y * (-0.3516396496e-4 + y * (0.2457520174e-5 + y * (-0.240337019e-6))));
  const a2 = 0.04687499995 + y * (-0.2002690873e-3 + y * (0.8449199096e-5 + y * (-0.88228987e-6 + y * 0.105787412e-6)));
  const ans = Math.sqrt(0.636619772 / ax) * (Math.cos(xx) * a1 - z * Math.sin(xx) * a2);
  return x < 0 ? -ans : ans;
}
function struveH1(x) {
  if (x < 1e-6) return 0;
  if (x < 2) { // série de Taylor
    let sum = 0, term = x * x / 3; // H1(x) = (2/pi) * (x^2/3 - x^4/(3^2*5) + ...) approximé
    // forme exacte : H1 = sum_{m>=0} (-1)^m (x/2)^{2m+2} / (Gamma(m+3/2)Gamma(m+5/2))
    sum = 0;
    const gam = n => { // Gamma(n+1/2) pour n entier >=1 : (2n)!/(4^n n!) sqrt(pi)
      let g = Math.sqrt(Math.PI);
      for (let i = 1; i <= n; i++) g *= (i - 0.5);
      return g;
    };
    for (let m = 0; m < 14; m++) {
      sum += Math.pow(-1, m) * Math.pow(x / 2, 2 * m + 2) / (gam(m + 1) * gam(m + 2));
    }
    return sum;
  }
  return 2 / Math.PI - besselJ0(x) + (16 / Math.PI - 5) * Math.sin(x) / x + (12 - 36 / Math.PI) * (1 - Math.cos(x)) / (x * x);
}
// Impédance de rayonnement d'un piston plan dans un baffle infini (demi-espace 2π), rapportée à rho*c/S
function pistonZnorm(ka) {
  const x = 2 * ka;
  if (x < 1e-6) return [0, 0];
  return [1 - 2 * besselJ1(x) / x, 2 * struveH1(x) / x];
}

// ---------- Lecture d'un fichier Hornresp (formats compact et détaillé) ----------
function parseHornresp(text) {
  const lines = text.split(/\r?\n/);
  const kv = [];
  for (const raw of lines) {
    const line = raw.trim();
    if (line.startsWith('~')) break;
    if (!line || line.startsWith('|')) continue;
    const m = line.match(/^([^=]+?)\s*=\s*(.*)$/);
    if (m) kv.push([m[1].trim(), m[2].trim()]);
  }
  const first = {};
  const cons = [], fs = [];
  for (const [k, v] of kv) {
    if (k === 'Con' || k === 'L45') cons.push(parseFloat(v));
    if (/^F\d\d$/.test(k)) fs.push(parseFloat(v));
    if (!(k in first)) first[k] = v;
  }
  const num = (k, d = 0) => { const v = parseFloat(first[k]); return isFinite(v) ? v : d; };
  let ang = 2 * Math.PI;
  if (first.Ang) { const m = first.Ang.match(/([\d.]+)\s*x\s*Pi/i); if (m) ang = parseFloat(m[1]) * Math.PI; }
  const S = [0, num('S1'), num('S2'), num('S3'), num('S4'), num('S5')];
  const segs = [];
  for (let i = 1; i <= 4; i++) {
    const len = cons[i - 1] || 0;
    if (S[i] > 0 && S[i + 1] > 0 && len >= 0 && (i === 1 || segs.length)) {
      if (len > 0 || segs.length === 0 || true) segs.push({ S1: S[i], S2: S[i + 1], L: len, F: fs[i - 1] || 0 });
    } else break;
  }
  // Nd haut-parleurs identiques en parallèle -> pilote équivalent unique
  const Nd = Math.max(1, Math.round(num('Nd', 1)));
  return {
    Nd,
    comment: first.Comment || 'sans nom',
    ang, Eg: num('Eg', 2.83), Rg: num('Rg', 0.1),
    segs,
    Sd: num('Sd') * Nd, Bl: num('Bl'), Cms: num('Cms') / Nd, Rms: num('Rms') * Nd, Mmd: num('Mmd') * Nd, Le: num('Le') / Nd, Re: num('Re', 6) / Nd,
    Vrc: num('Vrc'), Ap: num('Ap', num('Ap1')), Lpt: num('Lpt', num('Lp')),
    Vtc: num('Vtc'), Atc: num('Atc'), Pmax: num('Pmax'), Xmax: num('Xmax'),
    portOut: num('PortOut', 0) > 0,
  };
}

// ---------- Découpage du pavillon en tranches ----------
function hornSlices(p, maxdx = 0.01) {
  const sl = [];
  for (const g of p.segs) {
    const L = g.L / 100;
    if (L < 0.0005) continue;
    const n = Math.max(4, Math.min(300, Math.ceil(L / maxdx)));
    const S1 = g.S1 / 1e4, S2 = g.S2 / 1e4, dx = L / n;
    for (let i = 0; i < n; i++) {
      const t = (i + 0.5) / n;
      let S;
      if (!g.F) { const r = Math.sqrt(S1) + (Math.sqrt(S2) - Math.sqrt(S1)) * t; S = r * r; }
      else {
        // hyperbolo-exponentiel : S = S1 (cosh(mx) + T sinh(mx))^2
        const T = g.F;
        const target = Math.sqrt(S2 / S1);
        let lo = 1e-6, hi = 60; // résoudre m*L
        const fn = u => Math.cosh(u) + T * Math.sinh(u) - target;
        for (let it = 0; it < 80; it++) { const mid = (lo + hi) / 2; (fn(mid) < 0) ? lo = mid : hi = mid; }
        const u = (lo + hi) / 2 * t;
        S = S1 * Math.pow(Math.cosh(u) + T * Math.sinh(u), 2);
      }
      sl.push({ S, dx });
    }
  }
  return sl;
}

// ---------- Calcul complet d'une enceinte ----------
function simulate(p, freqs) {
  const sl = hornSlices(p);
  const hasHorn = sl.length > 0;
  const Smouth = hasHorn ? sl[sl.length - 1].S : p.Sd / 1e4;
  const Sd = p.Sd / 1e4, Mmd = p.Mmd / 1000, Le = p.Le / 1000;
  const Ctc = (p.Vtc / 1e6) / (RHO * CSND * CSND);
  const Crc = (p.Vrc / 1e3) / (RHO * CSND * CSND);
  const Ap = p.Ap / 1e4, Lpt = p.Lpt / 100;
  const hasPort = Ap > 0 && Lpt > 0 && Crc > 0;
  const Mport = hasPort ? RHO * Lpt / Ap : 0;
  const Qp = 15;
  const out = [];
  const amouth = Math.sqrt(Smouth / Math.PI);
  for (const f of freqs) {
    const w = 2 * Math.PI * f, k = w / CSND;
    // charge de bouche
    const zn = pistonZnorm(k * amouth);
    const Zm = cx.sc(zn, RHO * CSND / Smouth);
    // propagation de la bouche vers la gorge (U_bouche = 1)
    let P = Zm, U = [1, 0];
    for (let i = sl.length - 1; i >= 0; i--) {
      const { S, dx } = sl[i];
      const Z0 = RHO * CSND / S, c = Math.cos(k * dx), s = Math.sin(k * dx);
      // [p;U]_in = [[c, jZ0 s],[j s/Z0, c]] [p;U]_out
      const nP = [c * P[0] - Z0 * s * U[1], c * P[1] + Z0 * s * U[0]];
      const nU = [c * U[0] - (s / Z0) * P[1], c * U[1] + (s / Z0) * P[0]];
      P = nP; U = nU;
    }
    const Zhorn = hasHorn ? cx.div(P, U) : Zm;
    // chambre de compression en parallèle de l'entrée du pavillon
    const Yfront = cx.add([0, w * Ctc], cx.inv(Zhorn));
    const Zfront = cx.inv(Yfront);
    // arrière
    let Zrear = [0, 0], Zp = null;
    if (hasPort) {
      Zp = cx.add([Math.sqrt(Mport / Crc) / Qp, 0], [0, w * Mport]);
      Zrear = cx.inv(cx.add([0, w * Crc], cx.inv(Zp)));
    } else if (Crc > 0) Zrear = [0, -1 / (w * Crc)];
    const Zacs = cx.sc(cx.add(Zfront, Zrear), Sd * Sd);
    const Zmt = cx.add(Zacs, [p.Rms, w * Mmd - 1 / (w * p.Cms)]);
    const Ze = cx.add([p.Re, w * Le], cx.div([p.Bl * p.Bl, 0], Zmt));
    const I = cx.div([p.Eg, 0], cx.add([p.Rg, 0], Ze));
    const v = cx.div(cx.sc(I, p.Bl), Zmt);
    const Ud = cx.sc(v, Sd);
    let Umouth;
    if (hasHorn) {
      const Uin = cx.mul(Ud, cx.div(Zfront, Zhorn));
      Umouth = cx.div(Uin, U);
    } else Umouth = Ud;
    // évent arrière rayonnant (bass-reflex) : débit sortant = -Ud * Zc/(Zc+Zp), en opposition de phase sous l'accord
    if (hasPort && p.portOut) {
      const Zc = [0, -1 / (w * Crc)];
      Umouth = cx.add(Umouth, cx.sc(cx.mul(Ud, cx.div(Zc, cx.add(Zc, Zp))), -1));
    }
    // pression à 1 m dans l'angle solide Ang
    const pr = cx.mul([0, w * RHO / p.ang], Umouth);
    out.push({ f, p: pr, Ze, x: cx.abs(v) / w * Math.SQRT2 * 1000, Ud, Zin: cx.add(Ze, [p.Rg, 0]) });
  }
  return { out, mouthArea: Smouth, mouthRadius: amouth };
}

// ---------- Filtres de répartition ----------
const BESSEL = { // [coefs de theta_n(s) du plus haut degré au plus bas ; fréquence -3 dB du polynôme normalisé]
  1: { c: [1, 1], w3: 1 },
  2: { c: [1, 3, 3], w3: 1.3617 },
  3: { c: [1, 6, 15, 15], w3: 1.7557 },
  4: { c: [1, 10, 45, 105, 105], w3: 2.1139 },
};
function polyEval(coefs, s) { let r = [0, 0]; for (const c of coefs) r = cx.add(cx.mul(r, s), [c, 0]); return r; }
function lpProto(type, n, s) {
  if (type === 'butter' || type === 'lr') {
    const m = type === 'lr' ? n / 2 : n;
    let D = [1, 0];
    for (let k = 0; k < m; k++) {
      const ph = Math.PI * (2 * k + m + 1) / (2 * m);
      D = cx.mul(D, cx.sub(s, [Math.cos(ph), Math.sin(ph)]));
    }
    let H = cx.inv(D);
    if (type === 'lr') H = cx.mul(H, H);
    return H;
  }
  if (type === 'bessel') {
    const b = BESSEL[n] || BESSEL[2];
    const th = polyEval(b.c, cx.sc(s, b.w3));
    return cx.div([b.c[b.c.length - 1], 0], th);
  }
  return [1, 0];
}
// type: 'off' | 'butter' | 'lr' | 'bessel'
function filterResponse(type, n, fc, hp, f) {
  if (type === 'off' || !fc) return [1, 0];
  let s = [0, f / fc];
  if (hp) s = cx.inv(s);
  return lpProto(type, n, s);
}

if (typeof module !== 'undefined') module.exports = { parseHornresp, simulate, filterResponse, cx, RHO, CSND };
