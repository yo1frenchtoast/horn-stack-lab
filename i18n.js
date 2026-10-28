// ---------- langue (FR / EN) et thème ----------
// Le texte de l'interface est écrit en français dans le code ; en mode EN, un traducteur remplace les textes
// (nœuds texte et attributs title / aria-label / placeholder) au fur et à mesure qu'ils apparaissent.
// EXACT : libellés complets ; FRAGS : morceaux de phrases (les plus longs d'abord) ; RX : motifs avec nombres.
const I18N = (() => {
  const EXACT = {
    'Niveau d\'attaque (dB re 2,83 V)': 'Drive level (dB re 2.83 V)', 'Nombre de groupes': 'Number of groups', 'Espace entre groupes (m)': 'Spacing between groups (m)',
    'Jeu entre caissons (m)': 'Gap between cabinets (m)', 'Convergence des groupes, tous les étages (°)': 'Group convergence, all stages (°)',
    'Tous les étages convergent à y = (m, 0 = non)': 'All stages converge at y = (m, 0 = off)', 'Tous les étages convergent à z = (m, vide = non)': 'All stages converge at z = (m, empty = off)',
    'Hauteur du sol au 1er caisson (m)': 'Floor to 1st cabinet height (m)', 'Écoute x (m)': 'Listening x (m)', 'Écoute y (m)': 'Listening y (m)', 'Écoute z (m)': 'Listening z (m)',
    'Empilement automatique': 'Automatic stacking', 'Critère': 'Criterion', 'Réponse la plus plate': 'Flattest response', 'Plat + niveau': 'Flat + level', 'Niveau moyen maximal': 'Highest mean level',
    'Distance min (m)': 'Min distance (m)', 'Distance max (m)': 'Max distance (m)', 'Demi-largeur (m)': 'Half-width (m)', 'Trouver le meilleur point d\'écoute': 'Find the best listening spot',
    'Annuler': 'Undo', 'Appliquer tous les conseils': 'Apply all advice', 'Réinitialiser les réglages': 'Reset settings', 'Conseils de réglage': 'Tuning advice',
    'Éditeur de stack': 'Stack editor', 'Ajouter': 'Add', '+ Étage au-dessus': '+ Stage above', 'Étage': 'Stage', 'Enceinte': 'Speaker', 'Caissons': 'Cabinets', 'Rangée': 'Row',
    'Largeur (m)': 'Width (m)', 'Centre z (m)': 'Centre z (m)', 'Ordre': 'Order', 'Configurations (du bas vers le haut) :': 'Configurations (bottom to top):',
    'Colonne 1·1·1': 'Column 1·1·1', 'Pyramide 4·2·1': 'Pyramid 4·2·1', 'Pyramide 2·2·1': 'Pyramid 2·2·1', 'Mur 4·4·2': 'Wall 4·4·2', 'Pyramide 4·2·1 (MT121)': 'Pyramid 4·2·1 (MT121)',
    'Audiophony E15 (grave + pavillon HF)': 'Audiophony E15 (bass + HF horn)', 'Bibliothèque de haut-parleurs': 'Speaker driver library',
    'choisis un haut-parleur par étage dans sa boîte, ou ajoute le tien à partir de ses paramètres Thiele-Small': 'pick a driver per stage in its enclosure, or add your own from its Thiele-Small parameters',
    'Partir de': 'Start from', 'Nom': 'Name', 'Ajouter / mettre à jour': 'Add / update', 'Supprimer': 'Delete', 'Lire le bloc': 'Read block',
    'Ou coller un bloc Hornresp (Sd, Bl, Cms, Rms, Mmd, Le, Re, Pmax, Xmax)': 'Or paste a Hornresp block (Sd, Bl, Cms, Rms, Mmd, Le, Re, Pmax, Xmax)',
    'Égaliseur (avant les filtres de répartition)': 'Equaliser (before the crossover filters)', 'Actif': 'On', 'Remettre à plat': 'Reset to flat', 'Cible': 'Target', 'Plat': 'Flat',
    'Pente −1,5 dB/oct': 'Slope −1.5 dB/oct', 'Graves +4 dB': 'Bass +4 dB', 'De (Hz)': 'From (Hz)', 'À (Hz)': 'To (Hz)', 'Boost max (dB)': 'Max boost (dB)', 'Coupe max (dB)': 'Max cut (dB)',
    'Auto-EQ au point d\'écoute': 'Auto-EQ at the listening spot', 'Type': 'Type', 'Fréq. (Hz)': 'Freq. (Hz)', 'Gain (dB)': 'Gain (dB)', 'Aucune': 'None', 'Cloche': 'Bell', 'Plateau grave': 'Low shelf',
    'Plateau aigu': 'High shelf', 'Passe-haut': 'High-pass', 'Passe-bas': 'Low-pass', 'Réjecteur': 'Notch', 'Charger .txt': 'Load .txt', 'Haut-parleur': 'Driver', 'Délai (ms)': 'Delay (ms)',
    'Décalage x (m)': 'Offset x (m)', 'Avancée y (m)': 'Forward y (m)', 'Hauteur z (m)': 'Height z (m)', 'Haut. caisson (m)': 'Cabinet height (m)', 'Polarité inversée': 'Polarity inverted',
    'Azimut (°, + vers la droite)': 'Azimuth (°, + to the right)', 'Inclinaison (°, + vers le haut)': 'Tilt (°, + upwards)', 'Convergence de la rangée (°, + converge)': 'Row convergence (°, + converges)',
    'Convergence des groupes (°, + converge)': 'Group convergence (°, + converges)', 'Converge à y = (m, 0 = non)': 'Converges at y = (m, 0 = off)', 'Converge à z = (m, vide = non)': 'Converges at z = (m, empty = off)',
    'Remettre droit': 'Reset aim', 'HP': 'HP', 'LP': 'LP', 'Aucun': 'None', 'Butterworth': 'Butterworth', 'Linkwitz-Riley': 'Linkwitz-Riley',
    '1er ordre': '1st order', '2e ordre': '2nd order', '3e ordre': '3rd order', '4e ordre': '4th order', '5e ordre': '5th order', '6e ordre': '6th order', '7e ordre': '7th order', '8e ordre': '8th order',
    'Gain': 'Gain', 'Délai': 'Delay', 'Polarité': 'Polarity', 'Avancée y': 'Forward y', 'Décalage x': 'Offset x', 'Hauteur z': 'Height z', 'Haut. caisson': 'Cabinet height', 'Passe-haut / bas': 'High / low-pass',
    'Filtres': 'Filters', 'État': 'Status', 'Niveau d\'attaque': 'Drive level', 'Écoute x': 'Listening x', 'Écoute y': 'Listening y', 'Écoute z': 'Listening z', 'Jeu entre caissons': 'Gap between cabinets',
    'Hauteur du sol': 'Floor height', 'Groupes / espacement': 'Groups / spacing', 'Réponse au point d\'écoute': 'Response at the listening spot', 'SPL': 'SPL', 'Phase': 'Phase', 'Retard de groupe': 'Group delay', 'Excursion': 'Excursion',
    'Impédance': 'Impedance', 'Somme': 'Sum', 'Fréquence de la carte': 'Map frequency', 'Survole la courbe pour lire les valeurs.': 'Hover the curve to read the values.', 'Carte des ondes': 'Wave map',
    'Onde': 'Wave', 'Niveau': 'Level', 'Pause': 'Pause', 'Lecture': 'Play', 'Coupe verticale': 'Vertical section', 'Vue de dessus': 'Top view', 'Vue 3D': '3D view', 'Iso': 'Iso', 'Dessus': 'Top',
    'Côté': 'Side', 'Face': 'Front', 'Arrière': 'Back', 'Dessous': 'Bottom', 'Suivre la lecture (multi-bandes)': 'Follow playback (multi-band)', 'Fréquence de la carte :': 'Map frequency:',
    'Largeur affichée': 'Displayed width', 'Écoute simulée': 'Simulated listening', '▶ Écouter': '▶ Play', '■ Arrêter': '■ Stop', 'Signal': 'Signal', 'Bruit rose': 'Pink noise', 'Kick + basse': 'Kick + bass', 'Tempo (bpm)': 'Tempo (bpm)',
    'Boucle de test (kick, basse, caisse claire, charley, accord)': 'Test loop (kick, bass, snare, hi-hat, chord)', 'Balayage 20 Hz – 20 kHz': 'Sweep 20 Hz – 20 kHz',
    'Sinus à la fréquence de la carte': 'Sine at the map frequency', 'Mon fichier audio…': 'My audio file…', 'La carte suit le balayage': 'Map follows the sweep', 'Écoute de': 'Listen to',
    'Somme du système': 'System sum', 'Système simulé': 'Simulated system', 'Source brute': 'Raw source', 'Volume :': 'Volume:', 'Charger un fichier audio': 'Load an audio file',
    'Recalibrer le niveau': 'Recalibrate level', 'Position dans le fichier :': 'Position in file:', 'FFT fine': 'Fine FFT', 'Tiers d\'octave': 'Third-octave', 'Superposer la source': 'Overlay the source',
    'Effacer les crêtes': 'Clear peaks', 'Survole la carte pour lire les coordonnées (x : latéral, y : distance devant la façade, z : hauteur) et le niveau.': 'Hover the map to read the coordinates (x: lateral, y: distance in front of the face, z: height) and the level.',
    'Survole le spectre pour lire la fréquence et le niveau. Trait plein : sortie du système, pointillés : source, trait fin : crêtes.': 'Hover the spectrum to read the frequency and the level. Solid: system output, dotted: source, thin line: peaks.',
    'Appuie sur Écouter. Commence avec un volume bas : les graves peuvent monter vite.': 'Press Play. Start with a low volume: the bass can climb fast.',
    'Références (fiches constructeur)': 'References (manufacturer datasheets)', 'Références (scripts Hornresp)': 'References (Hornresp scripts)', 'Génériques (estimés)': 'Generics (estimated)',
    'Nombre de caissons': 'Number of cabinets', 'Enceinte à ajouter': 'Speaker to add', 'Aucune excursion calculée.': 'No excursion computed.', 'Voie seule : aucun délai à régler.': 'Single way: no delay to set.',
    'écoute': 'listening', 'degrés': 'degrees', '% de Xmax': '% of Xmax', 'LECTURE · BANDES': 'PLAYBACK · BANDS', 'Nom de la configuration': 'Configuration name', 'Enregistrer la configuration': 'Save configuration', 'Orientation et convergence': 'Aiming and convergence', 'tout droit': 'straight', 'Réglages généraux': 'General settings', 'Informations': 'Information', 'Thème': 'Theme', 'Langue': 'Language', 'Auto': 'Auto', 'Clair': 'Light', 'Sombre': 'Dark',
    'Normale': 'Normal', 'Inversée': 'Inverted',
  };
  // fragments : (français → anglais), appliqués du plus long au plus court
  const FR = [
    ['Simulateur de stacks de sono à pavillons et bass-reflex, calculé à partir de scripts Hornresp : Cubo 18, Cubo Sub, Kick, MT130, MHB, E15, GK MB112 et d\'autres. Empile les caissons en colonne ou en pyramide, oriente-les, règle filtres, délais, gains et égaliseur, ajoute tes propres haut-parleurs, puis lis la réponse au point d\'écoute (SPL, phase, retard de groupe, excursion, impédance), les ondes en 2D ou 3D et une écoute simulée.',
      'Horn and bass-reflex PA stack simulator, computed from Hornresp scripts: Cubo 18, Cubo Sub, Kick, MT130, MHB, E15, GK MB112 and more. Stack the cabinets in a column or a pyramid, aim them, set filters, delays, gains and equaliser, add your own drivers, then read the response at the listening spot (SPL, phase, group delay, excursion, impedance), the waves in 2D or 3D and a simulated listening.'],
    ['La ligne du haut du tableau est le haut de la pile. Les nombres décroissants vers le haut donnent une pyramide symétrique, chaque rangée étant centrée sur x = 0. Pour 2 subs puis 2 subs, ajoute deux étages Cubo 18. Les filtres de chaque étage se règlent dans les cartes ci-dessous. Les enceintes marquées « estimé » (',
      'The top row of the table is the top of the stack. Numbers decreasing upwards give a symmetric pyramid, each row being centred on x = 0. For 2 subs then 2 subs, add two Cubo 18 stages. Each stage\'s filters are set in the cards below. Speakers marked "estimated" ('],
    [') sont reconstruites depuis les plans : pavillon équivalent, haut-parleur proxy et volumes approximatifs. Les courbes sont indicatives ; remplace-les par un vrai fichier Hornresp si tu en as un.',
      ') are rebuilt from the plans: equivalent horn, proxy driver and approximate volumes. The curves are indicative; replace them with a real Hornresp file if you have one.'],
    ['et sa voie HF', 'and its HF way'],
    ['Le pavillon, les chambres et l\'évent restent ceux de l\'enceinte ; seul le moteur change. Pour garder un bon couplage, la surface Sd du haut-parleur doit rester proche de la gorge du pavillon (ou de sa chambre avant). Les génériques sont des valeurs typiques, pas des mesures.',
      'The horn, chambers and port stay those of the enclosure; only the driver changes. To keep good coupling, the driver\'s Sd must stay close to the horn throat (or its front chamber). Generics are typical values, not measurements.'],
    ['L\'Auto-EQ mesure la somme du système au point d\'écoute (sans l\'égaliseur), la lisse au tiers d\'octave, puis place jusqu\'à 7 cloches pour la rapprocher de la cible sur la plage choisie. Refais-le après avoir déplacé l\'écoute ou changé la stack.',
      'Auto-EQ measures the system sum at the listening spot (without the equaliser), smooths it to third-octave, then places up to 7 bells to bring it closer to the target over the chosen range. Redo it after moving the listening spot or changing the stack.'],
    ['L\'égaliseur agit sur le signal commun, avant la séparation en trois voies : il modifie donc les trois voies à la fois, puis viennent les filtres de répartition, le gain et le délai de chaque voie. Il compte dans les courbes, la carte et l\'écoute simulée. Glisse les points sur la courbe ou règle les bandes dans le tableau. Filtres biquad classiques (formules RBJ) calculés à 48 kHz.',
      'The equaliser acts on the common signal, before the split into three ways: it therefore changes all three ways at once, then come the crossover filters, the gain and the delay of each way. It counts in the curves, the map and the simulated listening. Drag the points on the curve or set the bands in the table. Classic biquad filters (RBJ formulas) computed at 48 kHz.'],
    ['La carte additionne les bouches comme des pistons dans un baffle (directivité d\'un piston de même aire autour de l\'axe de chaque caisson, rien vers l\'arrière, pas de réflexion au sol). L\'azimut, l\'inclinaison et le splay font pivoter cet axe. Le calcul des pavillons suit le modèle d\'ondes planes de Hornresp. Il ne remplace pas une simulation par éléments de frontière.',
      'The map sums the mouths as pistons in a baffle (directivity of a piston of the same area around each cabinet\'s axis, nothing to the rear, no floor reflection). Azimuth, tilt and splay rotate this axis. The horn calculation follows Hornresp\'s plane-wave model. It does not replace a boundary-element simulation.'],
    ['Le signal est filtré par la réponse complexe (niveau et phase) du système au point d\'écoute, avec les filtres, délais et positions réglés ci-dessus. Le niveau est calibré au premier lancement puis conservé : ajouter des subs ou changer un gain s\'entend. Un limiteur protège les oreilles. Le spectre est mesuré à la sortie du système simulé, avant le volume et le limiteur (dB relatifs au plein échelle numérique). Pas de salle, de distorsion ni de compression de puissance. Ton casque ou tes haut-parleurs d\'ordinateur ne descendent pas dans les graves : ce qui est sous 60 à 80 Hz ne s\'entendra pas, même si le calcul est juste.',
      'The signal is filtered by the system\'s complex response (level and phase) at the listening spot, with the filters, delays and positions set above. The level is calibrated at first start and then kept: adding subs or changing a gain is audible. A limiter protects your ears. The spectrum is measured at the output of the simulated system, before the volume and the limiter (dB relative to digital full scale). No room, no distortion, no power compression. Your headphones or computer speakers do not go down into the bass: what is below 60 to 80 Hz will not be heard, even if the calculation is right.'],
    ['Le nombre de groupes répète toute la configuration côte à côte. Chaque caisson reçoit le même signal que les autres de sa voie (un canal d\'ampli par caisson). Clique sur la carte pour déplacer le point d\'écoute.',
      'The number of groups repeats the whole configuration side by side. Each cabinet receives the same signal as the others of its way (one amp channel per cabinet). Click on the map to move the listening spot.'],
    ['Cherche, à la hauteur d\'écoute réglée, la position qui donne la meilleure somme entre 40 Hz et 4 kHz, selon le critère choisi.',
      'Searches, at the set listening height, the position that gives the best sum between 40 Hz and 4 kHz, according to the chosen criterion.'],
    ['Retard de groupe −dφ/dω au point d\'écoute, en ms, relatif à l\'arrivée directe de la bouche la plus proche. Un pic marque une résonance qui « sonne » après l\'attaque ; un retard qui grimpe vers le grave est le retard du pavillon ou du filtre passe-haut.', 'Group delay −dφ/dω at the listening spot, in ms, relative to the direct arrival of the nearest mouth. A peak marks a resonance that keeps ringing after the attack; a delay rising towards the bass is the horn\'s or the high-pass filter\'s delay.'],
    ['Enregistre dans ce navigateur : étages, enceintes, filtres, délais, orientations, position d\'écoute et égaliseur', 'Saves in this browser: stages, speakers, filters, delays, aiming, listening spot and equaliser'],
    ['ex. Ma sono du samedi', 'e.g. My Saturday rig'], ['Charger cette configuration', 'Load this configuration'], ['Configuration par défaut (clique pour retirer)', 'Default configuration (click to remove)'],
    ['Définir comme configuration par défaut', 'Set as default configuration'], ['Supprimer la configuration', 'Delete configuration'], ['Configuration illisible.', 'Configuration unreadable.'],
    ['Plus de configuration par défaut : la page s\'ouvre avec la configuration d\'origine.', 'No default configuration any more: the page opens with the original configuration.'],
    ['Stockage du navigateur indisponible : la configuration ne sera conservée que jusqu\'à la fermeture de la page.', 'Browser storage unavailable: the configuration will only be kept until the page is closed.'],
    ['est maintenant la configuration par défaut : elle se charge à chaque ouverture de la page.', 'is now the default configuration: it loads every time the page opens.'],
    ['Configuration par défaut «', 'Default configuration «'], [' chargée.', ' loaded.'], [' mise à jour.', ' updated.'], [' enregistrée.', ' saved.'], [' supprimée.', ' deleted.'], ['Configuration «', 'Configuration «'],
    ['Tous les caissons visent le point (x = 0, y = distance) de l\'axe central ; 0 désactive', 'All cabinets aim at the point (x = 0, y = distance) on the centre axis; 0 disables'],
    ['Hauteur du point visé : les caissons s\'inclinent aussi vers lui. Vide = pas de convergence verticale', 'Height of the aim point: the cabinets also tilt towards it. Empty = no vertical convergence'],
    ['Applique les conseils dans le bon ordre (filtres, polarité, délais, gains, niveau) et recalcule entre chaque étape jusqu\'à stabilisation', 'Applies the advice in the right order (filters, polarity, delays, gains, level) and recomputes between each step until it settles'],
    ['Remet filtres, gains, délais, polarité et décalage de chaque étage à leurs valeurs d\'origine (annulable)', 'Puts the filters, gains, delays, polarity and offset of every stage back to their original values (can be undone)'],
    ['Pendant la lecture, la carte additionne 8 bandes de fréquence pondérées par le spectre du signal en cours', 'During playback, the 3D map sums 8 frequency bands weighted by the spectrum of the current signal'],
    ['Vue 3D : plan horizontal à ', '3D view: horizontal plane at '], [' m de hauteur et plan vertical à x = ', ' m height and vertical plane at x = '],
    ['Glisse pour tourner (tous les angles, y compris par en dessous), molette pour zoomer, double-clic ou boutons de vue pour recentrer.', 'Drag to rotate (all angles, including from below), wheel to zoom, double-click or view buttons to recentre.'],
    ['Rouge : surpression, bleu : dépression', 'Red: overpressure, blue: underpressure'], ['Échelle compressée autour du niveau au point d\'écoute', 'Scale compressed around the level at the listening spot'],
    [' au point d\'écoute à ', ' at the listening spot at '], ['Niveau de ', 'Level from '], [', du sombre au clair.', ', dark to bright.'],
    ['Pixels trop larges pour cette fréquence : réduis la largeur affichée.', 'Pixels too wide for this frequency: reduce the displayed width.'],
    ['Cellules trop larges pour cette fréquence : réduis la largeur affichée.', 'Cells too wide for this frequency: reduce the displayed width.'],
    ['Longueur d\'onde : ', 'Wavelength: '], ['Coupe verticale à x = ', 'Vertical section at x = '], ['(les stacks plus éloignés sont estompés)', '(farther stacks are faded)'],
    ['hors rayonnement (derrière les bouches)', 'outside radiation (behind the mouths)'], ["m du point d'écoute", 'm from the listening spot'],
    ['Étage inactif ou sans caisson : aucun conseil. Active-le et mets au moins 1 caisson.', 'Inactive stage or stage without cabinet: no advice. Enable it and set at least 1 cabinet.'],
    ['Active au moins un étage pour obtenir des conseils.', 'Enable at least one stage to get advice.'],
    ['Voie la plus chargée : ', 'Most loaded way: '], ['Tu peux monter jusqu\'à ≈ ', 'You can go up to ≈ '], [' dB (marge 1 dB) avant d\'atteindre Xmax.', ' dB (1 dB margin) before reaching Xmax.'],
    [' dépasse Xmax (', ' exceeds Xmax ('], ['Plafond conseillé ≈ ', 'Advised ceiling ≈ '], [', ou monte son passe-haut.', ', or raise its high-pass.'],
    ['Dans l\'axe : la somme est symétrique et plus facile à lire.', 'On axis: the sum is symmetric and easier to read.'],
    ['Hors axe : la somme change avec la directivité des pavillons ; 0 pour régler, décale ensuite pour vérifier la couverture.', 'Off axis: the sum changes with the horns\' directivity; use 0 to tune, then shift to check coverage.'],
    ['Au moins ≈ ', 'At least ≈ '], [' m pour être en champ lointain du stack (hauteur ', ' m to be in the stack\'s far field (height '], [', raccordement vers ', ', crossover around '],
    ['Le bouton « Trouver le meilleur point d\'écoute » affine.', 'The "Find the best listening spot" button refines it.'],
    ['1,7 m = oreilles d\'une personne debout, 1,2 m assis. Règle selon le public.', '1.7 m = ears of a standing person, 1.2 m seated. Set according to the audience.'],
    ['0 de préférence ; reste sous ', '0 preferably; stay under '], [' cm (λ/4 à la fréquence haute de la rangée) pour garder le couplage.', ' cm (λ/4 at the row\'s top frequency) to keep the coupling.'],
    ['0 de préférence (couplage maximal).', '0 preferably (maximum coupling).'],
    ['0 : un grave posé au sol profite du couplage au sol (+3 à +6 dB).', '0: a bass cabinet on the floor benefits from floor coupling (+3 to +6 dB).'],
    ['Sans grave dans le stack, ajuste librement pour viser la hauteur d\'écoute.', 'With no bass in the stack, adjust freely to aim at the listening height.'],
    ['Dans le grave, garde l\'espacement sous ', 'In the bass, keep the spacing under '], [' pour que les groupes se couplent ; au-delà ils interfèrent et creusent des trous.', ' so the groups couple; beyond that they interfere and dig holes.'],
    ['1 groupe suffit pour une source centrale ; ajoute des groupes pour la couverture ou +6 dB par doublement dans le grave.', '1 group is enough for a central source; add groups for coverage or +6 dB per doubling in the bass.'],
    ['(niveau moyen sur sa bande ', '(mean level over its band '], [', moyenne des voies ', ', mean of the ways '], ['Excursion actuelle ', 'Current excursion '], [' de Xmax.', ' of Xmax.'],
    ['limité par l\'excursion', 'limited by excursion'], ['Conseillé ', 'Advised '],
    [' de Xmax vers ', ' of Xmax around '], [' : baisse à ', ': lower to '], [' dB ou monte le passe-haut au-dessus de ', ' dB or raise the high-pass above '],
    ['Seule voie active : le gain règle juste le niveau. Marge d\'excursion avant Xmax : +', 'Only active way: the gain only sets the level. Excursion margin before Xmax: +'],
    ['Bien réglé (', 'Well set ('],
    ['Pas de recouvrement avec les autres voies : le délai ne change pas la somme. Pour aligner les arrivées au point d\'écoute, retarde les voies les plus proches (ici ', 'No overlap with the other ways: the delay does not change the sum. To align the arrivals at the listening spot, delay the closest ways (here '],
    ['Déjà optimal pour la somme avec les autres voies (', 'Already optimal for the sum with the other ways ('],
    [' donne +', ' gives +'], [' dB dans la zone de recouvrement (', ' dB in the overlap zone ('], ['équivaut à ', 'equivalent to '], [' cm de profondeur.', ' cm of depth.'],
    ['Corrige d\'abord la polarité (voir plus bas), puis ce conseil sera recalculé.', 'Fix the polarity first (see below), then this advice will be recomputed.'],
    ['Inverser la polarité donne +', 'Inverting the polarity gives +'], [' dB dans la zone de recouvrement : les voies s\'annulent en partie.', ' dB in the overlap zone: the ways partly cancel.'],
    ['Inverser aiderait un peu, mais le réglage du délai ci-dessus est plus efficace.', 'Inverting would help a little, but the delay setting above is more effective.'],
    ['Bonne (inverser dégraderait la somme).', 'Good (inverting would degrade the sum).'],
    ['Normale, sans recouvrement à vérifier. Ne l\'inverse que si une voie voisine s\'annule au raccordement.', 'Normal, no overlap to check. Invert it only if a neighbouring way cancels at the crossover.'],
    ['0 conseillé : l\'alignement temporel se règle mieux avec le délai. Équivalent d\'avancée : ', '0 advised: time alignment is better set with the delay. Equivalent forward offset: '],
    ['Centré : somme symétrique.', 'Centred: symmetric sum.'],
    ['Décalé : garde 0 sauf pour reproduire un montage réel, sinon la somme perd sa symétrie autour de l\'axe.', 'Offset: keep 0 unless reproducing a real set-up, otherwise the sum loses its symmetry about the axis.'],
    ['Empilement automatique : z = ', 'Automatic stacking: z = '], [' m (centre du caisson). ', ' m (cabinet centre). '],
    ['Reste au sol pour un grave (couplage au sol).', 'Stay on the floor for a bass cabinet (floor coupling).'],
    ['Plus la source est proche de ', 'The closer the source is to '], [' m, moins il y a d\'écart de trajet vers l\'oreille.', ' m, the smaller the path difference to the ear.'],
    ['Grave : pose-le au sol, z = ', 'Bass: put it on the floor, z = '], [' m (couplage au sol, +3 à +6 dB).', ' m (floor coupling, +3 to +6 dB).'],
    ['Plus près de ', 'Closer to '], [' m (hauteur d\'écoute) pour limiter l\'écart de trajet.', ' m (listening height) to limit the path difference.'],
    ['Dimension réelle du caisson (', 'Real cabinet size ('], [' cm) : sert au dessin et à l\'empilement, pas au son.', ' cm): used for the drawing and the stacking, not for the sound.'],
    ['Passe-haut (', 'High-pass ('], [' Hz) et passe-bas (', ' Hz) and low-pass ('], [' Hz) se chevauchent : cette voie est quasi muette. Remets les filtres d\'origine de l\'enceinte.', ' Hz) overlap: this way is almost silent. Put the speaker\'s original filters back.'],
    ['filtres d\'origine', 'original filters'],
    ['Les conseils donneraient ', 'The advice would give '], [' puis ', ' then '], [' : trop proches pour une bande utile. Cette voie recouvre presque la même bande qu\'une voisine (même enceinte en double ?). Aucun filtre n\'est proposé : sépare nettement leurs bandes ou fusionne-les.', ': too close for a useful band. This way covers almost the same band as a neighbour (same speaker twice?). No filter is proposed: clearly separate their bands or merge them.'],
    ['Raccordement avec ', 'Crossover with '], [' vers ', ' around '], [' (pas de recouvrement naturel : les bandes laissent un trou)', ' (no natural overlap: the bands leave a gap)'], [' (pas de recouvrement naturel)', ' (no natural overlap)'],
    ['Protection : coupe en dessous de la bande utile, vers ', 'Protection: cut below the useful band, around '], [' (limite à −6 dB de la voie)', ' (way\'s −6 dB limit)'],
    [' proche du conseil (', ' close to the advice ('], ['. Type conseillé : Linkwitz-Riley 4e ordre (somme plate, pas de bosse).', '. Advised type: 4th-order Linkwitz-Riley (flat sum, no bump).'],
    ['Type conseillé : Linkwitz-Riley 4e ordre (somme plate, pas de bosse).', 'Advised type: 4th-order Linkwitz-Riley (flat sum, no bump).'],
    ['Utilise la même fréquence et le même type que le passe-haut de la voie du dessus.', 'Use the same frequency and type as the high-pass of the way above.'],
    ['Voie la plus aiguë : un passe-bas à ', 'Highest way: a low-pass at '], [' ne sert qu\'à protéger (bande utile jusqu\'à ≈ ', ' only serves as protection (useful band up to ≈ '],
    ['Voie la plus aiguë : aucun passe-bas nécessaire (bande utile jusqu\'à ≈ ', 'Highest way: no low-pass needed (useful band up to ≈ '],
    ['Appliquer ', 'Apply '], ['Inverser', 'Invert'], ['Refusé : ', 'Refused: '], ['ce passe-haut', 'this high-pass'], ['ce passe-bas', 'this low-pass'], [' chevaucherait ', ' would overlap '],
    ['le passe-bas', 'the low-pass'], ['le passe-haut', 'the high-pass'], [' de la même voie (', ' of the same way ('], [' Hz) et la rendrait quasi muette.', ' Hz) and make it almost silent.'],
    ['Rien à appliquer : la configuration suit déjà les conseils.', 'Nothing to apply: the configuration already follows the advice.'],
    [' dans l\'ordre filtres → polarité → délais → gains', ' in the order filters → polarity → delays → gains'], [' (les réglages se sont recalculés après chaque passe)', ' (the settings were recomputed after each pass)'],
    ['Arrêt : les conseils se répondaient en boucle, la dernière combinaison est conservée. ', 'Stopped: the pieces of advice kept answering each other, the last combination is kept. '], ['Arrêt à 12 passes. ', 'Stopped at 12 passes. '],
    [' étape(s) ignorée(s) car elles dégradaient la somme au point d\'écoute. ', ' step(s) skipped because they degraded the sum at the listening spot. '], [' conseil(s) restent proposés.', ' piece(s) of advice remain.'],
    ['Tous les conseils sont satisfaits.', 'All the advice is satisfied.'],
    ['Réglages d\'origine restaurés (annulable).', 'Original settings restored (can be undone).'], ['Réglages précédents restaurés', 'Previous settings restored'], ['Réglages précédents rétablis.', 'Previous settings restored.'],
    ['Point d\'écoute précédent rétabli.', 'Previous listening spot restored.'],
    ['Meilleur point : ', 'Best spot: '], [' Écart à la moyenne ', ' Deviation from the mean '], [', creux d\'interférence ', ', interference dip '], [', niveau moyen ', ', mean level '], [' (avant : ', ' (before: '],
    ['Écart RMS au lissage ', 'RMS deviation from the smoothing '], [' dB sur ', ' dB over '], [' (cible ', ' (target '], ['Le niveau global baisse si la correction est surtout en coupe.', 'The overall level drops if the correction is mostly cuts.'],
    ['Plage trop étroite.', 'Range too narrow.'], ['Donne un nom au haut-parleur.', 'Give the driver a name.'], ['Tous les paramètres doivent être des nombres positifs.', 'All parameters must be positive numbers.'],
    ['Haut-parleur supprimé.', 'Driver deleted.'], ['Bloc incomplet : il faut Sd, Bl, Cms, Rms, Mmd, Le et Re.', 'Incomplete block: Sd, Bl, Cms, Rms, Mmd, Le and Re are required.'],
    ['Bloc lu : vérifie le nom puis « Ajouter ».', 'Block read: check the name then "Add".'], ['est dans la bibliothèque : choisis-le dans la liste « Haut-parleur » d\'un étage.', 'is in the library: pick it in the "Driver" list of a stage.'],
    ['Renseigne tous les champs Thiele-Small pour voir les paramètres Hornresp calculés.', 'Fill in all the Thiele-Small fields to see the computed Hornresp parameters.'],
    ['Fichier non reconnu : il faut un script Hornresp (.txt).', 'File not recognised: a Hornresp script (.txt) is required.'],
    ['En lecture : ', 'Playing: '], ['En lecture.', 'Playing.'], [' (hors de la carte, 1 kHz maximum)', ' (outside the map, 1 kHz maximum)'], ['Recalcul du filtre…', 'Recomputing the filter…'], ['Calcul du filtre…', 'Computing the filter…'],
    ['Audio non disponible dans ce navigateur.', 'Audio not available in this browser.'], ['Arrêté.', 'Stopped.'], ['Fichier chargé. ', 'File loaded. '], ['Appuie sur Écouter.', 'Press Play.'],
    ['Fichier audio non lisible.', 'Audio file unreadable.'], ['Le niveau est calibré au premier lancement.', 'The level is calibrated at first start.'],
    ['bruit rose', 'pink noise'], ['kick + basse', 'kick + bass'], ['boucle de test', 'test loop'], ['balayage 20 Hz – 20 kHz', 'sweep 20 Hz – 20 kHz'], ['fichier audio', 'audio file'], ['somme du système', 'system sum'], [' seule', ' alone'],
    ['multi-bandes (lecture)', 'multi-band (playback)'], ['Seulement : ', 'Only: '], ['Origine du script : ', 'Script source: '], ['Haut-parleur de l\'étage ', 'Driver of stage '],
    [' · bouche ', ' · mouth '], [' · pavillon HF ', ' · HF horn '], [' (LR4 à ', ' (LR4 at '], [': couplage à vérifier', ': check the coupling'],
    ['Cet étage vise le point (x = 0, y = distance) de l\'axe central ; 0 = suit le réglage global', 'This stage aims at the point (x = 0, y = distance) on the centre axis; 0 = follows the global setting'],
    ['Hauteur du point visé : le caisson s\'incline aussi vers (0, y, z). Vide = pas de convergence verticale ; sans effet si « Converge à y » est à 0', 'Height of the aim point: the cabinet also tilts towards (0, y, z). Empty = no vertical convergence; no effect if "Converges at y" is 0'],
    ['S\'ajoute au réglage global ; sans effet avec un seul groupe', 'Adds to the global setting; no effect with a single group'],
    ['Sans effet avec un seul caisson dans la rangée', 'No effect with a single cabinet in the row'],
    ['Enceinte de l\'étage ', 'Speaker of stage '], ['Nombre de caissons de l\'étage ', 'Number of cabinets of stage '], ['Monter l\'étage ', 'Move up stage '], ['Descendre l\'étage ', 'Move down stage '], ['Supprimer l\'étage ', 'Delete stage '],
    ['Type de filtre ', 'Filter type '], ['Ordre ', 'Order '], ['Fréquence de la bande ', 'Frequency of band '], ['Gain en dB de la bande ', 'Gain in dB of band '], ['Gain de la bande ', 'Gain of band '], ['Type de la bande ', 'Type of band '], ['Q de la bande ', 'Q of band '],
    [' en Hz', ' in Hz'], ['Fréquence ', 'Frequency '],
    ['Lance l\'écoute pour voir le spectre.', 'Start the listening to see the spectrum.'], ['Altec Lansing VS2721 4" H04-003A (estimé)', 'Altec Lansing VS2721 4" H04-003A (estimated)'],
    ['Générique moteur à compression 1"', 'Generic 1" compression driver'], ['Générique 18" grave pro', 'Generic 18" pro bass'], ['Générique 4" (caisson de basses)', 'Generic 4" (subwoofer)'],
    ['Générique ', 'Generic '], [' pro', ' pro'], ['Sub 4" bass-reflex', 'Sub 4" bass-reflex'], ['(mesuré ; Le et Xmax estimés)', '(measured; Le and Xmax estimated)'], ['néodyme', 'neodymium'], ['(estimés)', '(estimated)'], ['(estimé)', '(estimated)'], ['(mesuré)', '(measured)'], ['(fiche)', '(datasheet)'],
    [' (copie)', ' (copy)'], [' (haut)', ' (top)'], [' (bas)', ' (bottom)'], ['Étage ', 'Stage '], ['étage ', 'stage '],
  ];
  const FRAGS = FR.slice().sort((a, b) => b[0].length - a[0].length);
  // motifs avec accord (pluriels) et nombres
  const RX = [
    [/(\d+) paramètres? à ajuster/g, (m, n) => `${n} parameter${n > 1 ? 's' : ''} to adjust`],
    [/\btout est réglé\b/g, 'all set'],
    [/(\d+) réglages? appliqués?/g, (m, n) => `${n} setting${n > 1 ? 's' : ''} applied`],
    [/en (\d+) passes/g, 'in $1 passes'],
    [/(\d+) cloches?/g, (m, n) => `${n} band${n > 1 ? 's' : ''}`],
    [/encore (\d+) annulations? possibles?/g, (m, n) => `${n} more undo${n > 1 ? 's' : ''} possible`],
    [/(\d+)e ordre/g, (m, n) => `${n}th order`],
    [/(Hz|kHz|ms) à (\d)/g, '$1 to $2'],
    [/SPL à /g, 'SPL at '],
    [/(\d+) actifs?/g, '$1 active'],
    [/\bsomme\b/g, 'sum'],
  ];
  const fix = s => s.replace(/(\d),(\d)/g, '$1.$2').replace(/(\d) %/g, '$1%');
  const cache = new Map();
  function tr(s) {
    if (typeof s !== 'string' || !s) return s;
    const lead = s.match(/^\s*/)[0], trail = s.match(/\s*$/)[0], core = s.trim();
    if (!core) return s;
    if (cache.has(core)) return lead + cache.get(core) + trail;
    let r = EXACT[core];
    if (r === undefined) {
      r = core;
      for (const [a, b] of FRAGS) if (r.includes(a)) r = r.split(a).join(b);
      for (const [a, b] of RX) r = r.replace(a, b);
      r = fix(r);
    }
    if (cache.size > 4000) cache.clear();
    cache.set(core, r);
    return lead + r + trail;
  }
  return { tr, EXACT, FRAGS };
})();

let LANG = 'fr';
const T = s => LANG === 'en' ? I18N.tr(s) : s;
const ORIG_T = new WeakMap(), ORIG_A = new WeakMap(), LAST_T = new WeakMap(), LAST_A = new WeakMap();
const TR_ATTR = ['title', 'aria-label', 'placeholder'];
function trNode(n) {
  if (n.nodeType === 3) {
    const p = n.parentNode; if (!p || /^(SCRIPT|STYLE)$/.test(p.nodeName)) return;
    const cur = n.data;
    if (LANG === 'en') { if (LAST_T.get(n) === cur) return; ORIG_T.set(n, cur); const en = I18N.tr(cur); LAST_T.set(n, en); if (en !== cur) n.data = en; }
    else if (LAST_T.has(n) && LAST_T.get(n) === cur && ORIG_T.has(n)) { n.data = ORIG_T.get(n); LAST_T.delete(n); }
  } else if (n.nodeType === 1) {
    if (/^(SCRIPT|STYLE)$/.test(n.nodeName)) return;
    for (const a of TR_ATTR) if (n.hasAttribute(a)) trAttr(n, a);
    for (const c of n.childNodes) trNode(c);
  }
}
function trAttr(el, a) {
  let o = ORIG_A.get(el); if (!o) ORIG_A.set(el, o = {}); let l = LAST_A.get(el); if (!l) LAST_A.set(el, l = {});
  const cur = el.getAttribute(a);
  if (LANG === 'en') { if (l[a] === cur) return; o[a] = cur; const en = I18N.tr(cur); l[a] = en; if (en !== cur) el.setAttribute(a, en); }
  else if (l[a] !== undefined && l[a] === cur && o[a] !== undefined) { el.setAttribute(a, o[a]); delete l[a]; }
}
let trBusy = false;
const trObs = new MutationObserver(ms => {
  if (trBusy) return; trBusy = true;
  try {
    for (const m of ms) {
      if (m.type === 'characterData') trNode(m.target);
      else if (m.type === 'attributes') { if (TR_ATTR.includes(m.attributeName)) trAttr(m.target, m.attributeName); }
      else for (const n of m.addedNodes) trNode(n);
    }
  } finally { trBusy = false; }
});
function setLang(l, redraw) {
  LANG = l === 'en' ? 'en' : 'fr';
  document.documentElement.lang = LANG;
  trBusy = true; try { trNode(document.body); } finally { trBusy = false; }
  try { localStorage.setItem('cubo-lang', LANG); } catch (e) { }
  const sel = document.getElementById('langsel'); if (sel) sel.value = LANG;
  if (redraw) redraw();
}
function setTheme(t) {
  const root = document.documentElement;
  if (t === 'light' || t === 'dark') root.setAttribute('data-theme', t); else root.removeAttribute('data-theme');
  try { localStorage.setItem('cubo-theme', t); } catch (e) { }
  const sel = document.getElementById('themesel'); if (sel) sel.value = (t === 'light' || t === 'dark') ? t : 'auto';
}
function initI18n(redraw) {
  let l = null, th = 'auto';
  try { l = localStorage.getItem('cubo-lang'); th = localStorage.getItem('cubo-theme') || 'auto'; } catch (e) { }
  if (!l) l = (navigator.language || 'fr').toLowerCase().startsWith('fr') ? 'fr' : 'en';
  trObs.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: TR_ATTR });
  setTheme(th);
  document.getElementById('themesel').addEventListener('change', e => setTheme(e.target.value));
  document.getElementById('langsel').addEventListener('change', e => setLang(e.target.value, redraw));
  setLang(l, redraw);
}
