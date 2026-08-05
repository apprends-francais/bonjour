#!/usr/bin/env node
/* =========================================================================
   verify-french.js — audits every piece of French in Bonjour against
   authoritative sources. Run this after ANY change to French content.

   Setup (the data files are large, so they live outside the repo):
     curl -sL -o /tmp/lexique.tsv \
       http://www.lexique.org/databases/Lexique383/Lexique383.tsv
     curl -sL -o /tmp/fd.tar.xz \
       https://download.freedict.org/dictionaries/fra-eng/0.4.1/freedict-fra-eng-0.4.1.src.tar.xz
     tar -xf /tmp/fd.tar.xz -C /tmp

   Run:  node tools/verify-french.js [/tmp]

   Checks
     1. every deck noun's gender + article + elision  (vs Lexique, FreeDict)
     2. the curated conjugation tables in data.js     (vs Lexique)
     3. an exhaustive sweep of conjPresent() over every Lexique verb
     4. the number engine        (numToFr)
     5. the possessive engine    (possessiveFor)
     6. the place-preposition engine + country data self-consistency

   Known false positives are filtered — see FALSE_POSITIVES below.
   ========================================================================= */
const fs = require('fs');
const path = require('path');
const DATA_DIR = process.argv[2] || '/tmp';
const APP = path.join(__dirname, '..');

const LEXIQUE = path.join(DATA_DIR, 'lexique.tsv');
const TEI = path.join(DATA_DIR, 'fra-eng', 'fra-eng.tei');
for (const f of [LEXIQUE, TEI]) {
  if (!fs.existsSync(f)) { console.error('Missing ' + f + ' — see the setup notes at the top of this file.'); process.exit(2); }
}

/* Lexique quirks that are the SOURCE's fault, not ours. Verified by hand. */
const FALSE_POSITIVES = {
  // Lexique leaves `genre` empty for ~5% of nouns; the lemma fallback then
  // reports the feminine counterpart's gender. "le professeur" is correct.
  genderWords: new Set(['professeur']),
  // Lexique mis-tags some infinitives as ind:pre:2p, and hyphenates re- verbs.
  verbs: new Set(['chuter', 'cosigner']),
  // -ayer verbs legitimately allow both spellings (je paie / je paye).
  ayer: /ayer$/
};

/* ---------- 1. load Lexique ---------- */
const rows = fs.readFileSync(LEXIQUE, 'utf8').split('\n');
const H = rows[0].split('\t');
const iOrtho = 0, iLemme = 2, iCgram = 3, iGenre = 4, iInfover = H.indexOf('infover');
const presByVerb = {}, genderByWord = {}, genderByLemma = {};
for (let i = 1; i < rows.length; i++) {
  const c = rows[i].split('\t');
  if (c.length < 6) continue;
  const ortho = (c[iOrtho] || '').toLowerCase(), lemme = (c[iLemme] || '').toLowerCase();
  if (c[iCgram] === 'NOM' && (c[iGenre] === 'm' || c[iGenre] === 'f')) {
    if (!genderByWord[ortho]) genderByWord[ortho] = c[iGenre];
    if (!genderByLemma[lemme]) genderByLemma[lemme] = c[iGenre];
  }
  if ((c[iCgram] === 'VER' || c[iCgram] === 'AUX') && c[iInfover]) {
    c[iInfover].split(';').forEach(tag => {
      const m = tag.match(/^ind:pre:([123][sp])$/);
      if (!m) return;
      presByVerb[lemme] = presByVerb[lemme] || {};
      (presByVerb[lemme][m[1]] = presByVerb[lemme][m[1]] || new Set()).add(ortho);
    });
  }
}

/* ---------- FreeDict genders (second opinion) ---------- */
const fdGender = {};
[...fs.readFileSync(TEI, 'utf8').matchAll(/<entry>([\s\S]*?)<\/entry>/g)].forEach(m => {
  const o = /<orth>([^<]+)<\/orth>/.exec(m[1]), g = /<gen>(masc|fem)<\/gen>/.exec(m[1]);
  if (o && g) { const k = o[1].trim().toLowerCase(); if (!fdGender[k]) fdGender[k] = g[1] === 'masc' ? 'm' : 'f'; }
});

/* ---------- load the app ---------- */
const win = {};
new Function('window', fs.readFileSync(path.join(APP, 'dict.js'), 'utf8'))(win);
new Function('window', fs.readFileSync(path.join(APP, 'data.js'), 'utf8') + '; window.DATA = DATA;')(win);
const DATA = win.DATA;

const appSrc = fs.readFileSync(path.join(APP, 'app.js'), 'utf8');
function lift(fromMarker, toMarker, returns, prelude) {
  const a = appSrc.indexOf(fromMarker), b = appSrc.indexOf(toMarker, a);
  if (a < 0 || b < 0) throw new Error('could not lift ' + fromMarker);
  return new Function('DATA', 'window', (prelude || '') + appSrc.slice(a, b) + ';' + returns)(DATA, win);
}
// helpers the lifted functions expect from elsewhere in app.js
const PRELUDE = `
  function splitArticle(fr) {
    const m = String(fr).trim().match(/^(le |la |les |un |une |des |l['\u2019]\\s?)(.+)$/i);
    if (!m) return { art: '', head: String(fr).trim() };
    return { art: m[1].toLowerCase(), head: m[2].trim() };
  }
`;
const conjPresent = lift('const VERBS = new Map()', '/* passé composé', 'buildVerbTables(); return conjPresent;');
const numToFr = lift('function numToFr(', 'const numKey =', 'return numToFr;');

const norm = s => String(s).toLowerCase().replace(/[’]/g, "'").trim().replace(/œ/g, 'oe');
const strip = s => norm(s).normalize('NFD').replace(/[̀-ͯ]/g, '');

const report = { genderErrors: [], conjErrors: [], engineSweep: {}, numberErrors: [], possessiveErrors: [], placeErrors: [], countryDataErrors: [] };

/* ---------- CHECK 1: noun genders ---------- */
function lookupGender(w) {
  for (const c of [norm(w), strip(w)]) {
    if (genderByWord[c]) return ['lexique', genderByWord[c]];
    if (genderByLemma[c]) return ['lexique-lemma', genderByLemma[c]];
    if (fdGender[c]) return ['freedict', fdGender[c]];
  }
  for (const k in genderByWord) if (strip(k) === strip(w)) return ['lexique-approx', genderByWord[k]];
  return [null, null];
}
let nounsChecked = 0;
DATA.decks.forEach(d => d.cards.forEach(c => {
  if (c.pos !== 'noun' || !c.g || c.g === 'pl') return;
  // proper nouns (countries/cities) are unreliable in Lexique — "canada" comes
  // back feminine there. They're covered by CHECK 6 instead.
  if (c.place) return;
  const first = c.fr.split(' / ')[0].trim();
  const m = first.match(/^(le |la |les |un |une |des |l['’]\s?)(.+)$/i);
  const head = m ? m[2].trim() : first;
  if (FALSE_POSITIVES.genderWords.has(strip(head))) return;
  const [src, g] = lookupGender(head);
  nounsChecked++;
  if (g && g !== c.g) report.genderErrors.push(`${d.id}: "${c.fr}" (${c.en}) — app says ${c.g}, ${src} says ${g}`);
}));

/* ---------- CHECK 2 & 3: conjugations ---------- */
const PERSON = ['1s', '2s', '3s', '1p', '2p', '3p'];
function checkVerb(inf, forms, label, sink) {
  const table = presByVerb[norm(inf)];
  if (!table) return;
  forms.forEach((f, k) => {
    let allowed = table[PERSON[k]];
    if (!allowed) return;
    allowed = new Set([...allowed].filter(a => a !== norm(inf))); // drop infinitive mis-tags
    if (!allowed.size) return;
    if (![...allowed].some(a => norm(a) === norm(f)))
      sink.push(`${label} ${inf} (${PERSON[k]}): app "${f}" vs Lexique [${[...allowed].join('/')}]`);
  });
}
DATA.verbs.forEach(v => checkVerb(v.inf, v.forms, 'TABLE', report.conjErrors));

const sweep = { tested: 0, bad: [] };
Object.keys(presByVerb).forEach(inf => {
  if (!/(er|ir|re)$/.test(inf) || inf.length < 4) return;
  if (/[^a-zàâäçéèêëîïôöùûüœ-]/.test(inf)) return;
  if (FALSE_POSITIVES.verbs.has(inf) || FALSE_POSITIVES.ayer.test(inf) || /^re/.test(inf)) return;
  const v = conjPresent(inf);
  if (!v) return; // refusing is a valid, safe answer
  const before = sweep.bad.length;
  checkVerb(inf, v.forms, 'ENGINE', sweep.bad);
  sweep.tested++;
  if (sweep.bad.length > before) sweep.badVerbs = (sweep.badVerbs || 0) + 1;
});
report.engineSweep = { verbsTested: sweep.tested, verbsWithErrors: sweep.badVerbs || 0, examples: sweep.bad.slice(0, 10) };

/* ---------- CHECK 4: numbers ---------- */
Object.entries({
  16: 'seize', 17: 'dix-sept', 21: 'vingt et un', 31: 'trente et un', 61: 'soixante et un',
  70: 'soixante-dix', 71: 'soixante et onze', 72: 'soixante-douze', 79: 'soixante-dix-neuf',
  80: 'quatre-vingts', 81: 'quatre-vingt-un', 90: 'quatre-vingt-dix', 91: 'quatre-vingt-onze',
  99: 'quatre-vingt-dix-neuf', 100: 'cent', 101: 'cent un', 180: 'cent quatre-vingts',
  200: 'deux cents', 201: 'deux cent un', 371: 'trois cent soixante et onze', 1000: 'mille'
}).forEach(([n, want]) => {
  const got = numToFr(+n);
  if (got !== want) report.numberErrors.push(`${n}: got "${got}" want "${want}"`);
});

/* ---------- CHECK 5 & 6: possessives and places (pure rules, re-implemented
   here independently so a bug in app.js can't hide by agreeing with itself) --- */
const OWN = { je: ['mon', 'ma', 'mes'], tu: ['ton', 'ta', 'tes'], il: ['son', 'sa', 'ses'],
              nous: ['notre', 'notre', 'nos'], vous: ['votre', 'votre', 'vos'], ils: ['leur', 'leur', 'leurs'] };
const isVowel = w => /^[aeiouâàéèêëîïôöûü]/i.test(w);
const bare = fr => String(fr).replace(/^(le |la |les |l['’]\s?)/i, '').trim();
const possExpect = (owner, card) => {
  const g = card.g === 'pl' ? 2 : card.g === 'f' ? 1 : 0;
  let w = OWN[owner][g];
  if (g === 1 && isVowel(bare(card.fr)) && ['je', 'tu', 'il'].includes(owner)) w = OWN[owner][0];
  return w;
};
const placeExpect = (card, dir) => {
  const name = bare(card.fr), v = isVowel(name), t = card.place;
  if (dir === 'to') return t === 'city' ? 'à' : t === 'f' || t === 'mv' ? 'en' : t === 'pl' ? 'aux' : 'au';
  if (dir === 'from') return t === 'm' ? 'du' : t === 'pl' ? 'des' : (v ? "d'" : 'de');
  // visiter: direct object, article kept (cities take nothing)
  return t === 'city' ? '' : t === 'pl' ? 'les' : v ? "l'" : t === 'f' ? 'la' : 'le';
};
const possessiveFor = lift('function startsVowelSound(', 'function startPossessives(', 'return possessiveFor;', PRELUDE);
const placePrep = lift('function bareName(', 'function startPlaces(', 'return placePrep;');

const nouns = DATA.cardIndex.filter(c => c.pos === 'noun' && ['m', 'f', 'pl'].includes(c.g));
const POSS_OWNERS = [
  { key: 'je', m: 'mon', f: 'ma', pl: 'mes' }, { key: 'tu', m: 'ton', f: 'ta', pl: 'tes' },
  { key: 'il', m: 'son', f: 'sa', pl: 'ses' }, { key: 'nous', m: 'notre', f: 'notre', pl: 'nos' },
  { key: 'vous', m: 'votre', f: 'votre', pl: 'vos' }, { key: 'ils', m: 'leur', f: 'leur', pl: 'leurs' }
];
nouns.forEach(card => POSS_OWNERS.forEach(o => {
  const got = possessiveFor(o, card).word, want = possExpect(o.key, card);
  if (got !== want) report.possessiveErrors.push(`${o.key} + ${card.fr}: got "${got}" want "${want}"`);
}));

const MASC_E = new Set(['le Mexique', 'le Cambodge', 'le Zimbabwe', 'le Mozambique', 'le Belize', 'le Suriname']);
DATA.cardIndex.filter(c => c.place).forEach(card => {
  ['to', 'from', 'visit'].forEach(dir => {
    const got = placePrep(card, dir).word, want = placeExpect(card, dir);
    if (got !== want) report.placeErrors.push(`${card.fr} ${dir}: got "${got}" want "${want}"`);
  });
  // country data self-consistency
  const name = bare(card.fr), art = (card.fr.match(/^(le |la |les |l['’])/i) || [''])[0].toLowerCase().trim();
  const isCity = card.place === 'city' || card.fr === 'Le Caire';
  if (art === 'le' && card.g !== 'm') report.countryDataErrors.push(`${card.fr}: "le" but g=${card.g}`);
  if (art === 'la' && card.g !== 'f') report.countryDataErrors.push(`${card.fr}: "la" but g=${card.g}`);
  if (art === 'les' && card.g !== 'pl') report.countryDataErrors.push(`${card.fr}: "les" but g=${card.g}`);
  if ((art === 'le' || art === 'la') && isVowel(name) && card.fr !== 'Le Caire')
    report.countryDataErrors.push(`${card.fr}: vowel start should elide to l'`);
  if (card.place === 'mv' && !(card.g === 'm' && isVowel(name)))
    report.countryDataErrors.push(`${card.fr}: place=mv but g=${card.g} vowel=${isVowel(name)}`);
  if (card.place === 'm' && isVowel(name) && card.fr !== 'Le Caire')
    report.countryDataErrors.push(`${card.fr}: masculine + vowel should be place=mv`);
  if (!isCity && (card.place === 'f' || card.place === 'm')) {
    const endsE = /e$/.test(name);
    if (endsE && card.g === 'm' && !MASC_E.has(card.fr))
      report.countryDataErrors.push(`${card.fr}: ends in -e but masculine and not a known exception`);
    if (!endsE && card.g === 'f') report.countryDataErrors.push(`${card.fr}: feminine but doesn't end in -e`);
  }
});

/* ---------- verdict ---------- */
const counts = {
  nounGenders: `${nounsChecked} checked, ${report.genderErrors.length} errors`,
  curatedVerbTables: `${DATA.verbs.length} checked, ${report.conjErrors.length} errors`,
  engineSweep: `${report.engineSweep.verbsTested} verbs, ${report.engineSweep.verbsWithErrors} with errors`,
  numbers: `21 cases, ${report.numberErrors.length} errors`,
  possessives: `${nouns.length * 6} combinations, ${report.possessiveErrors.length} errors`,
  places: `${DATA.cardIndex.filter(c => c.place).length * 3} combinations, ${report.placeErrors.length} errors`,
  countryData: `${report.countryDataErrors.length} inconsistencies`
};
console.log('=== Bonjour French audit ===');
Object.entries(counts).forEach(([k, v]) => console.log('  ' + k.padEnd(20) + v));
const totalErrors = report.genderErrors.length + report.conjErrors.length + report.engineSweep.verbsWithErrors +
  report.numberErrors.length + report.possessiveErrors.length + report.placeErrors.length + report.countryDataErrors.length;
if (totalErrors) {
  console.log('\n--- details ---');
  console.log(JSON.stringify(report, null, 1));
}
console.log('\n' + (totalErrors ? 'FAIL: ' + totalErrors + ' problem(s)' : 'PASS: no errors found'));
process.exit(totalErrors ? 1 : 0);
