# Horn Stack Lab

Simulateur de stacks de sono à pavillons et bass-reflex, calculé à partir de scripts Hornresp (modèle d'ondes planes). Une seule page HTML autonome, en français et en anglais, thème clair/sombre.

**Fonctions** : empilement en colonne ou pyramide, orientation et convergence par étage, filtres de répartition, délais, gains, égaliseur et Auto-EQ, conseils de réglage appliqués récursivement, bibliothèque de haut-parleurs personnalisables, réponse au point d'écoute (SPL, phase, retard de groupe, excursion, impédance), carte d'ondes 2D/3D (avec suivi multi-bandes), écoute simulée, configurations enregistrées dans le navigateur.

## Structure

| Fichier | Rôle |
|---|---|
| `template.html` | Page (HTML/CSS/JS). Marqueurs `/*I18N*/`, `/*ENGINE*/`, `/*DATA*/` |
| `i18n.js` | Traduction FR → EN (dictionnaire de libellés et de phrases) |
| `engine.js` | Moteur Hornresp : `parseHornresp`, `simulate`, `filterResponse` |
| `data/` | Scripts Hornresp réels (Cubo 18, Cubo Sub, Kick 15, Kick 12, MT130, MT121, X1) |
| `params.js`, `gen.js` | Enceintes estimées ou mesurées : pilotes `D` et fonction `mk` ; `node gen.js` écrit `est/*.txt` |
| `build.js` | Assemble `page.html` (moteur + données + traduction + template) et vérifie la syntaxe |
| `tests/` | Tests headless Playwright (`node tests/t43.js`, etc., à lancer depuis la racine) |
| `page.html` | Page construite sans squelette HTML (format de l'artefact Claude) |
| `index.html` | Même page avec `<!doctype>`, charset et viewport : c'est celle que sert GitHub Pages |

## Construire

```sh
node gen.js && node build.js   # écrit page.html
```

Les tests demandent Playwright (`npm install`).

## Publier sur GitHub Pages

Pages ne construit rien : il sert `index.html`, qui est commité. Réglages : *Settings → Pages → Deploy from a branch → `main` / `(root)`*. Après une modification, lancer `node gen.js && node build.js`, puis commiter `index.html` et `page.html`.

## Ajouter une enceinte

1. Script Hornresp réel : déposer le `.txt` dans `data/`, le lire dans `build.js`, puis ajouter une ligne dans la liste `EST` de `template.html`.
2. Enceinte estimée : ajouter le pilote dans `D` (`gen.js`) et un `mk(...)` dans `params.js`, puis ajouter la ligne dans `EST`.
3. Ajouter les libellés traduits dans `i18n.js` si de nouveaux textes apparaissent.

Les enceintes « estimées » sont reconstruites depuis des plans (pavillon équivalent, haut-parleur proxy) : leurs courbes sont indicatives.
