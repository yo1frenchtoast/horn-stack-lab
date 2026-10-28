# Simulation methodology

This document explains what Horn Stack Lab computes, how, and where the results stop being trustworthy. Code references point to `engine.js` (the single-cabinet model and the filters) and `template.html` (stack geometry, summation, maps, listening, advice).

**In one sentence**: each cabinet is simulated alone with a Hornresp-style lumped/plane-wave model, giving a complex pressure at 1 m; the stack is then built by summing these complex pressures at the listening point with free-field propagation, piston directivity, and each way's filters, gain, polarity and delay.

```
Hornresp script ─► simulate()  ─► p(f) at 1 m, per cabinet type  (complex)
                                   │
 positions() ── geometry ─────────►│ × directivity × e^{-jkr}/r, × way factor (EQ, HP/LP, gain, polarity, delay)
                                   ▼
                       Σ over cabinets and groups  ─► SPL / phase / group delay at the listening spot
                                   │
                    wave maps ◄────┤────► impulse response ─► convolution (simulated listening)
                                   └────► advice engine (gain, delay, polarity, crossover)
```

## 1. Conventions

- Time convention `e^{+jωt}`; complex numbers are `[re, im]` pairs.
- `ρ = 1.205 kg/m³`, `c = 343.4 m/s` in the cabinet model (`engine.js`); the stack layer uses `c = 343.4` too (`C_SND`), the driver library conversion uses `ρ = 1.18`, `c = 343`.
- Frequency grid for curves: `NF = 380` log-spaced points from 10 Hz to 20 kHz. The listening filter uses a linear FFT grid instead (section 7).
- Distances in metres. Axes: `x` to the audience's left, `y` forward from the stack, `z` up. Azimuth 0 points along `+y`.
- SPL is referenced to 20 µPa and is the RMS value, since the drive is `Eg` volts RMS (2.83 V by default, i.e. 1 W into 8 Ω) times the global drive offset.

## 2. Single cabinet: Hornresp-style model

Implemented in `simulate(p, freqs)`; the input is a parsed Hornresp script (`parseHornresp`, compact and detailed formats; `Nd` identical drivers are folded into one equivalent driver: `Sd×Nd`, `Mmd×Nd`, `Rms×Nd`, `Cms/Nd`, `Le/Nd`, `Re/Nd`).

**Acoustic chain, from the mouth back to the cone**

1. **Mouth radiation.** The mouth of area `S_m` is a flat circular piston in an infinite baffle (half-space, `2π` sr). Its normalised radiation impedance is `1 − 2J₁(2ka)/(2ka) + j·2H₁(2ka)/(2ka)` (Bessel `J₁`, Struve `H₁` computed with Abramowitz–Stegun and Aarts–Janssen approximations), scaled by `ρc/S_m`.
2. **Horn.** The horn is cut into slices of at most 1 cm (4 to 300 per segment) and treated as a cascade of plane-wave tubes. Each slice contributes the transfer matrix `[[cos kdx, jZ₀ sin kdx], [j sin kdx / Z₀, cos kdx]]` with `Z₀ = ρc/S`. Segment profiles: conical (linear radius) or hyperbolic-exponential (`S = S₁(cosh mx + T sinh mx)²`, `T` from Hornresp's `F` parameter, `m` solved by bisection to hit the end area). The load is propagated from mouth to throat, giving `Z_horn` and the mouth/throat volume-velocity ratio.
3. **Front chamber.** A compression chamber `V_tc` is a compliance in parallel with the horn input.
4. **Rear chamber and port.** A sealed rear chamber `V_rc` is a compliance. With a port (`Ap`, `Lpt`) it becomes the compliance in parallel with the port mass `M = ρ·Lpt/Ap`, with a fixed loss `Qp = 15`. If `PortOut = 1` the port radiates: its volume velocity `−U_d·Z_c/(Z_c+Z_p)` is added to the mouth's (so it is in antiphase below tuning).
5. **Driver.** The total acoustic load is reflected to the mechanical side (`× Sd²`), added to `Rms`, `jωMmd` and `1/(jωCms)`; the electrical impedance is `Re + jωLe + Bl²/Z_mech`. Current from the generator (`Eg`, `Rg`), then velocity `v = Bl·I/Z_mech`, cone volume velocity `U_d = Sd·v`.
6. **Output.** Pressure at 1 m in a solid angle `Ang` (`2π` by default): `p = jωρ/Ang · U_mouth`.

**Other outputs**: cone excursion (peak, mm: `|v|/ω·√2`, shown as % of `Xmax`) and electrical input impedance `Zin = Ze + Rg`.

**Not modelled**: lossy horn walls and damping material, cone breakup, voice-coil heating and power compression, nonlinearity (Bl(x), Cms(x), port compression, Doppler), the horn's radiation beyond the piston-in-baffle approximation, cabinet panel resonances, and diffraction at cabinet edges.

### Two-way cabinets (e.g. Audiophony E15)

A speaker may have a second way (`s.hf`): the bass way and the HF horn are simulated separately and summed with complementary LR4 filters at the internal crossover frequency, plus an HF gain, a time offset `τ` and a sign. Directivity switches from the bass mouth radius to the HF mouth radius above the crossover (`aOf`).

## 3. Where the parameters come from

- **Real Hornresp scripts** (`data/`): Cubo 18, Cubo Sub, Kick 15, Kick 12, MT130, MT121, X1. The curves are those Hornresp would give within the limits above.
- **Estimated cabinets** (`params.js`, `gen.js` → `est/*.txt`): rebuilt from plans or photos as an equivalent horn or bass-reflex cabinet (areas and lengths from drawings, chamber volumes and port from the internal volume) driven by a proxy driver. Treat their curves as indicative only. The cabinet's `Comment` line says "(estimated)" or "(measured)".
- **Driver library**: Thiele–Small parameters are converted to Hornresp parameters (`tsToHr`): `Cms = Vas/(ρc²Sd²)`, `Mms = 1/(ω_s²Cms)`, `Bl = √(ω_s·Mms·Re/Qes)`, `Rms = ω_s·Mms/Qms`, and `Mmd = Mms − 2·Mas` where `Mas = 0.85·ρ·Sd·a` is the radiation mass on one side. Swapping the driver keeps the horn, chambers and port, so the driver's `Sd` must remain close to the throat area for the coupling to make sense (the UI warns on `Sd/throat`).

## 4. From cabinets to a stack

`positions()` produces one entry per cabinet: position `(X, Y, Z)`, azimuth, elevation and unit axis `(nx, ny, nz)`.

- Each stage is a row of `count` cabinets, centred on `x = 0`, stacked in height (a stage with no cabinet takes no room; pyramids are rows that shrink going up). `N` identical groups are placed side by side with a given spacing.
- Within a row, neighbouring cabinets touch at their front corner (plus the gap) and are fanned by the splay angle; groups can toe-in.
- Aiming: azimuth/tilt per stage, or converging aim at a focus point `(0, focus, fz)` on the centre axis.
- Each cabinet's acoustic centre is its mouth centre; this is an approximation for folded horns and bass-reflex ports.

## 5. Summation at the listening spot

For a listening point `(lx, ly, lz)` (`computeCurves`, `systemSpectrum`), for every frequency and every cabinet `q` of way `i`:

```
P_q(f) = p_i(f) · W_i(f) · D(f, θ_q) / r_q · e^{-j k r_q}
P(f)   = Σ_i Σ_q P_q(f)
```

- `p_i(f)`: complex pressure at 1 m from section 2 (including the `Eg` drive and the global drive offset).
- `W_i(f)`: the way factor (`wayFactor`): parametric EQ (common to all ways) × high-pass × low-pass × `10^{gain/20}` × polarity × `e^{-j2πf·delay}`.
- `r_q`: distance from the mouth to the listening point (minimum 10 cm).
- `D`: **piston directivity** `2J₁(z)/z` with `z = k·a·sinθ`, `a` = mouth radius, `θ` the angle off the cabinet axis. It is zero behind the mouth plane (no rear radiation) and 1 on axis. Cabinets that are tilted or splayed simply change `θ`.
- The sum is **coherent** (complex), so arrival-time differences, filter phase, polarity and delays all show up as interference.

**Crossover filters** (`filterResponse`): Butterworth (`butter`), Linkwitz–Riley (`lr`, i.e. a squared Butterworth of half the order, so LR4 = two cascaded Butterworth 2nd-order) and Bessel (orders 1–4, normalised to −3 dB at the cut-off). They are analog prototypes evaluated directly in the frequency domain, so there is no sampling or latency approximation. Low-pass and high-pass use the same prototypes via `s → 1/s`.

**Parametric EQ**: RBJ-cookbook biquads (bell, shelves, high/low-pass, notch) designed at 48 kHz, evaluated in the frequency domain and applied before the crossover filters.

## 6. Curves

| Curve | Definition |
|---|---|
| SPL | `20·log₁₀(|P|/20 µPa)` per way and for the sum |
| Phase | `arg P` (no unwrapping needed to display) |
| Group delay | `−Δφ/Δω` between neighbouring grid points, after removing the direct flight time of the nearest mouth (avoids phase aliasing), clamped to −20…120 ms. Peaks mark resonances that ring on after the attack; the rise towards the bass is the horn's and high-pass filters' delay. |
| Excursion | cone peak displacement of the way (with its filters and drive) as % of `Xmax`; 100 % is the manufacturer limit, not a distortion limit |
| Impedance | `|Zin|` of the way, filters excluded |

A group-delay peak near a bass-reflex port's tuning or a crossover is expected: it reflects the resonance's ringing, and a steep filter close to it adds its own delay.

## 7. Wave maps (2D and 3D)

The map evaluates the same sum as above on a grid, at a chosen frequency, for a horizontal, vertical or 3D slice: each mouth is a piston with the directivity above, with `1/r` spreading and the phase `e^{-jkr}`. Colours show the pressure (in wave mode, the instantaneous value at a chosen phase that can be animated). The map is a **free-field**, **single-frequency** picture: no floor or wall reflection, no air absorption, no diffraction around the cabinets, nothing to the rear. It warns when the grid cells are too wide for the wavelength (`λ < 6` cells).

## 8. Simulated listening

The "simulated listening" renders audio through the computed system response, so you can hear the effect of delays, filters and cancellations.

1. **Impulse response**: `systemSpectrum` computes the complex spectrum of the whole system at the listening point on a linear FFT grid, for the active ways (or one way alone). A 15 Hz 2nd-order high-pass and a 19 kHz 4th-order low-pass protect the ends, and a fixed 15 ms shift (`t0`) keeps the response causal. `spectrumToIR` inverse-transforms it (Hermitian symmetry), applying a cosine fade on the last 20 % of the buffer.
2. **Level calibration**: the filter is scaled so that pink noise at −20 dBFS gives a fixed output level whatever the configuration (`calibrate`: RMS of the response between 30 Hz and 16 kHz, weighted `1/f`). This keeps the loudness comparable between configurations; it is **not** an absolute SPL.
3. **Convolution**: a Web Audio `ConvolverNode` convolves the chosen source (pink noise, sweep, tone, an instrument mix, a user audio file) with the impulse response. Changes crossfade between two convolvers over 80 ms.
4. **Stereo**: with "two ears" on, the response is computed at two points half the ear spacing on each side of the listening spot (left ear at `+x`, no head model), so moving along `x` produces level and time differences. For stereo files the left channel feeds the groups on the audience's left, the right channel those on the right; an odd middle group gets both at −3 dB.
5. **Isolator**: the optional "isolate a band" filter acts only on the listening signal, after the system response, and never changes the displayed curves.

The mixer's instruments are synthesised patterns (kick, bass, chord, …) locked to one tempo; the chord follows the bass root.

## 9. Advice engine

`adviceModel` / `updateAdvice` analyse the current curves and propose changes, never applying them silently (undo is kept):

- **Useful band** of each way: the range within −6 dB of its (third-octave smoothed) maximum.
- **Crossover** between neighbouring ways: the frequency where their smoothed curves cross inside the band overlap, rounded to a convenient value; type advice follows (LR4 for a flat sum with matched slopes).
- **Gain**: aligns each way's mean level over its useful band with the mean of all ways, capped by excursion headroom (`Xmax`), range −20…+12 dB in 0.5 dB steps.
- **Delay and polarity**: for each way, a 0–20 ms search (0.1 ms steps) maximises the power of its sum with the other ways over the band where both are within −12 dB of their peak (`|a| > 0.25·max`); the same score with inverted polarity decides whether to flip it first.
- **Position and group**: height (bass on the floor), gap between cabinets (under λ/4 at the row's top frequency), group spacing (under λ/2 at the top bass frequency to keep groups coupled).

The advice is a local optimum for the **sum at the listening spot** only; a delay optimal there may be worse elsewhere in the audience area. "Apply all" runs in the order filters → polarity → delays → gains, then the model recomputes.

## 10. Assumptions and known limits

| Topic | Assumption | Consequence |
|---|---|---|
| Propagation | Free field, no floor or wall reflection | A floor-coupled bass cabinet gains +3 to +6 dB in reality; the advice mentions it, the curves do not include it |
| Air | No absorption, no temperature or wind variation | Optimistic above a few kHz at distance |
| Directivity | Piston in a baffle at the mouth, nothing to the rear | Real horns are not circular pistons; low-frequency (omnidirectional) rear radiation is ignored |
| Source position | Acoustic centre at the mouth centre | Folded horns and ports shift the effective source (a few cm to tens of cm) |
| Horn | Plane waves, lossless | No higher-order modes, no wall losses |
| Driver | Linear, cold, fixed parameters | No compression or distortion; real excursion limit may be lower or higher |
| Estimated cabinets | Rebuilt from plans or photos, proxy drivers | Indicative only |
| Listening | One point (or two ears), no room reverberation, no head model | Not a room simulation; use it to hear **relative** effects |

It does not replace a measurement with a microphone, nor a boundary-element simulation when the geometry matters.

## 11. Verification

- `tests/` holds headless Playwright tests (`npm test`): they check the translation, the UI, the audio graph (convolver channels, isolator, mixer, stereo ears) and numerical consistency of the curves (group delay, excursion, summation and filter behaviour).
- Cabinet curves can be compared with Hornresp by loading the same script in both tools: the model is written to follow Hornresp's equations, but no systematic point-by-point comparison is shipped yet, so treat residual differences as possible. If you find a gap, please open an issue with the script.

## 12. References

- D. B. Keele Jr., *Low-frequency horn design using Thiele/Small driver parameters*, AES Preprint 1250 (1977).
- Hornresp by David McBean, documentation of the model and of the script parameters.
- L. L. Beranek, *Acoustics*; H. F. Olson, *Acoustical Engineering* (horns, radiation impedance).
- M. Abramowitz & I. Stegun, *Handbook of Mathematical Functions* (Bessel functions, §9.4).
- R. M. Aarts & A. J. E. M. Janssen, *Approximation of the Struve function H₁ occurring in impedance calculations*, JASA 113 (2003).
- S. H. Linkwitz, *Active crossover networks for noncoincident drivers*, JAES 24 (1976).
- R. Bristow-Johnson, *Audio EQ Cookbook* (biquad filters).
