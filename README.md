# Horn Stack Lab

Simulator for horn and bass-reflex PA stacks, computed from Hornresp scripts (plane-wave model). The UI is available in English and French (selector in the page; defaults to the browser language).

**Features**: column or pyramid stacking, per-stage aiming and convergence, crossover filters, delays, gains, polarity, SPL / phase / group delay / excursion / impedance curves, 2D/3D pressure maps, multi-band listening-spot following, automatic advice engine with undo, simulated listening (kick, tempo), saved stack configurations, light/dark theme.

| File | Role |
|---|---|
| `template.html` | Page source (markers `/*I18N*/`, `/*ENGINE*/`, `/*DATA*/`) |
| `engine.js` | Hornresp-style simulation: `simulate(par, freqs)` |
| `i18n.js` | English → French translator (labels, phrases, plural rules), language and theme handling |
| `data/` | Real Hornresp scripts (Cubo 18, Cubo Sub, Kick 15, Kick 12, MT130, MT121, X1) |
| `params.js`, `gen.js` | Estimated or measured cabinets: drivers `D` and `mk` helper; `node gen.js` writes `est/*.txt` |
| `build.js` | Assembles `index.html` (and `page.html`, the Claude artifact fragment) and checks syntax |
| `tests/` | Headless Playwright tests (run from the repository root, e.g. `node tests/t43.js`) |
| `index.html` | Generated standalone page, committed and served by GitHub Pages |

```
npm install                  # playwright (tests only)
node gen.js && node build.js # writes index.html (and page.html)
npm test
```

GitHub Pages builds nothing: it serves the committed `index.html` (Settings → Pages → Deploy from a branch → `main` / root).

## Adding a cabinet

1. Real Hornresp script: put the `.txt` in `data/`, read it in `build.js`, add a line to the `EST` list.
2. Estimated cabinet: add the driver to `D` (`gen.js`) and a `mk(...)` to `params.js`, then add the line to `EST`.
3. Add French translations in `i18n.js` for any new text.

"Estimated" cabinets are rebuilt from plans (equivalent horn, proxy driver): their curves are indicative only.
