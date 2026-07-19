/* =========================================================================
   Bonjour — app.js
   App logic: state + persistence, spaced-repetition engine, routing,
   every study mode, text-to-speech, XP / streak / progress.
   Vanilla JS, no build step, works offline.
   ========================================================================= */

(function () {
  "use strict";

  /* ----------------------------------------------------------------------
     ICONS — inline SVG line set (no webfont, works offline)
     ---------------------------------------------------------------------- */
  const ICONS = {
    home: "<path d='M3 10.5 12 4l9 6.5'/><path d='M5 9.7V20h5v-6h4v6h5V9.7'/>",
    route: "<circle cx='6' cy='19' r='2.1'/><circle cx='18' cy='6' r='2.1'/><path d='M9 19h6.3a2.5 2.5 0 0 0 0-5h-6.6a2.5 2.5 0 0 1 0-5H15'/>",
    refresh: "<path d='M3.5 12a8.5 8.5 0 0 1 14.3-6.2L21 8'/><path d='M21 3.5V8h-4.5'/><path d='M20.5 12a8.5 8.5 0 0 1-14.3 6.2L3 16'/><path d='M3 20.5V16h4.5'/>",
    target: "<circle cx='12' cy='12' r='8.5'/><circle cx='12' cy='12' r='4.6'/><circle cx='12' cy='12' r='1.4' fill='currentColor' stroke='none'/>",
    book: "<path d='M12 6.6C10.4 5.4 7.8 4.9 4.6 5.3a1 1 0 0 0-.9 1v11a1 1 0 0 0 1.1 1c3-.4 5.3.1 7.2 1.4 1.9-1.3 4.2-1.8 7.2-1.4a1 1 0 0 0 1.1-1v-11a1 1 0 0 0-.9-1c-3.2-.4-5.8.1-7.4 1.3z'/><path d='M12 6.6V19.8'/>",
    message: "<path d='M20 15.4a2.5 2.5 0 0 1-2.5 2.5H8l-4 3V6.4A2.5 2.5 0 0 1 6.5 3.9h11A2.5 2.5 0 0 1 20 6.4z'/>",
    chart: "<path d='M4 20V4'/><path d='M4 20h16'/><path d='M8.5 16.5v-4'/><path d='M13 16.5V9'/><path d='M17.5 16.5v-6.5'/>",
    star: "<path d='M12 2.6l2.85 5.8 6.4.93-4.63 4.5 1.1 6.37L12 17.7l-5.72 3.0 1.1-6.37L2.75 9.83l6.4-.93z' fill='currentColor' stroke='none'/>",
    cap: "<path d='M2.5 9 12 5l9.5 4-9.5 4z'/><path d='M6 11v4.2c0 1.2 2.7 2.8 6 2.8s6-1.6 6-2.8V11'/><path d='M21.5 9.2v4.6'/>",
    flame: "<path d='M12 3c.5 2.7-1.6 3.9-1.6 6.3 0 1.1.8 1.9 1.6 1.9s1.6-.8 1.6-1.9c1.8 1.1 3.1 3.3 3.1 5.7a4.7 4.7 0 0 1-9.4 0C7.3 11.4 9 9 12 3z' fill='currentColor' stroke='none'/>",
    layers: "<path d='M12 3 3 7.5 12 12l9-4.5z'/><path d='M3 12.4 12 17l9-4.6'/><path d='M3 16.9 12 21.5 21 16.9'/>",
    flag: "<path d='M5 21V4'/><path d='M5 4.4c3-1.4 6 1.4 9 0v8c-3 1.4-6-1.4-9 0'/>",
    play: "<path d='M7 5.3v13.4l11-6.7z' fill='currentColor' stroke='none'/>",
    headphones: "<path d='M4 13v-1a8 8 0 0 1 16 0v1'/><rect x='3' y='13' width='4.2' height='7' rx='1.6'/><rect x='16.8' y='13' width='4.2' height='7' rx='1.6'/>",
    pencil: "<path d='M4 20h4L19 9a2.55 2.55 0 0 0-3.7-3.5L4 16.2z'/><path d='M14.5 6.3 17.7 9.5'/>",
    repeat: "<path d='M4 8h11a4 4 0 0 1 4 4'/><path d='M7 5 4 8l3 3'/><path d='M20 16H9a4 4 0 0 1-4-4'/><path d='M17 19l3-3-3-3'/>",
    grid: "<rect x='3.5' y='3.5' width='7' height='7' rx='1.6'/><rect x='13.5' y='3.5' width='7' height='7' rx='1.6'/><rect x='3.5' y='13.5' width='7' height='7' rx='1.6'/><rect x='13.5' y='13.5' width='7' height='7' rx='1.6'/>",
    hash: "<path d='M5 9.2h14M5 14.8h14M9.6 4 8 20M16 4l-1.6 16'/>",
    users: "<circle cx='9' cy='8' r='3.1'/><path d='M3.6 20a5.4 5.4 0 0 1 10.8 0'/><path d='M16 5.2a3.1 3.1 0 0 1 0 5.9'/><path d='M17.4 14.3A5.4 5.4 0 0 1 20.8 20'/>",
    palette: "<path d='M12 3.2a8.8 8.8 0 1 0 0 17.6c1.4 0 2-.95 2-1.95 0-1.35-1-1.55-1-2.55 0-.9.75-1.45 1.65-1.45H17a3.9 3.9 0 0 0 3.9-3.9c0-4.3-3.95-7.75-8.9-7.75z'/><circle cx='7.6' cy='11' r='1' fill='currentColor' stroke='none'/><circle cx='12' cy='7.7' r='1' fill='currentColor' stroke='none'/><circle cx='16.3' cy='10.6' r='1' fill='currentColor' stroke='none'/>",
    coffee: "<path d='M4 8h13v4.5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z'/><path d='M17 9.2h1.6a2.4 2.4 0 0 1 0 4.8H17'/><path d='M7.5 3.4c-.5.8-.5 1.2 0 2M11 3.4c-.5.8-.5 1.2 0 2'/>",
    calendar: "<rect x='3.5' y='5' width='17' height='15.5' rx='2.5'/><path d='M3.5 9.5h17M8 3.4v3M16 3.4v3'/>",
    compass: "<circle cx='12' cy='12' r='8.6'/><path d='M15.6 8.4 13 13l-4.6 2.6L11 11z' fill='currentColor' stroke='none'/>",
    help: "<circle cx='12' cy='12' r='8.6'/><path d='M9.3 9.3a2.8 2.8 0 0 1 5.4 1c0 1.8-2.7 2.2-2.7 4'/><circle cx='12' cy='16.6' r='1' fill='currentColor' stroke='none'/>",
    sparkles: "<path d='M12 3.2l1.7 4.7 4.7 1.7-4.7 1.7L12 16l-1.7-4.7L5.6 9.6l4.7-1.7z' fill='currentColor' stroke='none'/><path d='M18 14.2l.6 1.9 1.9.6-1.9.6-.6 1.9-.6-1.9-1.9-.6 1.9-.6z' fill='currentColor' stroke='none'/>",
    lifebuoy: "<circle cx='12' cy='12' r='8.6'/><circle cx='12' cy='12' r='3.5'/><path d='M5.4 5.4 9 9M15 15l3.6 3.6M18.6 5.4 15 9M9 15l-3.6 3.6'/>",
    bag: "<path d='M5.2 8h13.6l-1 12.4H6.2z'/><path d='M9 8V6.3a3 3 0 0 1 6 0V8'/>",
    smile: "<circle cx='12' cy='12' r='8.6'/><path d='M8.4 13.8a4.2 4.2 0 0 0 7.2 0'/><circle cx='9' cy='9.8' r='1' fill='currentColor' stroke='none'/><circle cx='15' cy='9.8' r='1' fill='currentColor' stroke='none'/>",
    volume: "<path d='M11 6 7 9.5H4v5h3l4 3.5z'/><path d='M15.5 9a4 4 0 0 1 0 6'/><path d='M18.2 6.4a8 8 0 0 1 0 11.2'/>",
    mute: "<path d='M11 6 7 9.5H4v5h3l4 3.5z'/><path d='M22 9.5 16 15.5M16 9.5l6 6'/>",
    arrowRight: "<path d='M5 12h14M13 6l6 6-6 6'/>",
    back: "<path d='M15 5l-7 7 7 7'/>",
    lock: "<rect x='5' y='10.4' width='14' height='10.1' rx='2.2'/><path d='M8 10.4V8a4 4 0 0 1 8 0v2.4'/>",
    check: "<path d='M5 12.5 10 17.5 19.5 6.8'/>",
    checkCircle: "<circle cx='12' cy='12' r='8.6'/><path d='M8.4 12.2 11 14.8l4.6-5.2'/>",
    download: "<path d='M12 4v11M7.5 11 12 15.5 16.5 11M5 19.5h14'/>",
    upload: "<path d='M12 15.5V4.5M7.5 9 12 4.5 16.5 9M5 19.5h14'/>",
    reset: "<path d='M4.5 9A8.5 8.5 0 1 1 3.6 14'/><path d='M3 4.5V9h4.5'/>",
    eye: "<path d='M2.6 12S6 5.6 12 5.6 21.4 12 21.4 12 18 18.4 12 18.4 2.6 12 2.6 12z'/><circle cx='12' cy='12' r='3'/>",
    trophy: "<path d='M7 4h10v4a5 5 0 0 1-10 0z'/><path d='M7 5.5H4.5V8a3 3 0 0 0 3 3M17 5.5h2.5V8a3 3 0 0 1-3 3'/><path d='M12 13v3M8.5 20h7M9.5 20c0-1.5 1-2.5 2.5-2.5s2.5 1 2.5 2.5'/>",
    bolt: "<path d='M13 3 5 13h5l-1 8 8-10h-5z' fill='currentColor' stroke='none'/>",
    x: "<path d='M6.5 6.5l11 11M17.5 6.5l-11 11'/>",
    plus: "<path d='M12 5.5v13M5.5 12h13'/>",
    note: "<path d='M6 3.5h9.5L19 7v13.5H6z'/><path d='M15 3.5V7.5H19'/><path d='M9 12h7M9 15.5h7'/>"
  };
  function ic(name) {
    return "<svg class='ic' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true'>" + (ICONS[name] || "") + "</svg>";
  }
  // montgolfière vignette (the Jouy factory printed famous balloon toiles), engraved line style
  const MEDALLION = "<svg viewBox='0 0 120 170' fill='none' stroke='currentColor' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true'>" +
    "<path d='M60 6 C90 6 105 31 105 55 C105 83 85 101 72 115 L48 115 C35 101 15 83 15 55 C15 31 30 6 60 6 Z'/>" +
    "<path d='M60 6 C73 34 73 84 66 115'/>" +
    "<path d='M60 6 C47 34 47 84 54 115'/>" +
    "<path d='M60 6 C87 24 96 66 71 115' opacity='.55'/>" +
    "<path d='M60 6 C33 24 24 66 49 115' opacity='.55'/>" +
    "<path d='M17.5 45 C40 55 80 55 102.5 45' opacity='.8'/>" +
    "<path d='M48 115 L51 140 M72 115 L69 140'/>" +
    "<rect x='45' y='140' width='30' height='19' rx='3'/>" +
    "<path d='M45 146.5 H75 M53 140 V159 M61 140 V159 M69 140 V159' opacity='.6'/>" +
    "</svg>";
  // map content (decks / phrase sets / dialogues) to icons
  const DECK_ICON = { greetings: "smile", numbers: "hash", family: "users", colors: "palette", food: "coffee", time: "calendar", travel: "compass", home: "home", questions: "help", adjectives: "sparkles", class: "cap" };
  const PHRASE_ICON = { essentials: "lifebuoy", introductions: "users", cafe: "coffee", shopping: "bag", directions: "compass" };
  const DIALOGUE_ICON = { "au-cafe": "coffee", "faire-connaissance": "users", "demander-chemin": "compass" };
  const deckIcon = id => ic(DECK_ICON[id] || "layers");
  const phraseIcon = id => ic(PHRASE_ICON[id] || "message");
  const dialogueIcon = id => ic(DIALOGUE_ICON[id] || "message");

  /* ----------------------------------------------------------------------
     STATE + PERSISTENCE
     ---------------------------------------------------------------------- */
  const STORAGE_KEY = "bonjour.v1";
  const DAILY_GOAL = 40; // XP target per day

  const defaultState = () => ({
    srs: {},            // cid -> { ease, interval, due, reps, lapses }
    readGrammar: {},    // grammar id -> true
    done: {},           // "unitId:step" -> true
    xp: 0,
    today: { day: todayStr(), xp: 0 },
    streak: { count: 0, lastDay: null },
    settings: { voice: true, voiceName: null, rate: 0.9 },
    scores: {},         // activity key -> { pct, right, total, when } (last result)
    asked: {},          // cid -> when last used as a quiz question (rotation)
    lastBackup: null,   // date of last automatic backup download
    notes: [],          // class notes: [{id, num, date, text}] — lessons get built from these
    createdDays: {},    // day -> xp earned that day (for the activity heatmap)
    classes: {          // course tracking (section currently unused)
      vocab: [],        // [{id, fr, en, pos, g?, added}] — become SRS cards
      dossiers: {},     // "d0".."d8" -> { title, steps:{i:true}, notes }
      homework: []      // [{id, text, due, done}]
    }
  });

  let state = load();

  // migrate older saves + guarantee the classes structure exists
  function ensureClasses() {
    if (!state.classes) state.classes = defaultState().classes;
    if (!state.classes.vocab) state.classes.vocab = [];
    if (!state.classes.homework) state.classes.homework = [];
    if (!state.classes.dossiers) state.classes.dossiers = {};
    for (let n = 0; n <= 8; n++) {
      const k = "d" + n;
      if (!state.classes.dossiers[k]) state.classes.dossiers[k] = { title: "", steps: {}, notes: "" };
    }
  }

  // Typical textbook structure: Dossier 0 is a short intro; Dossiers 1–8 have
  // 6 leçons + a Cultures page + DELF training.
  function dossierSteps(n) {
    return n === 0
      ? ["Leçon 1", "Leçon 2", "Leçon 3"]
      : ["Leçon 1", "Leçon 2", "Leçon 3", "Leçon 4", "Leçon 5", "Leçon 6", "Cultures", "DELF"];
  }

  // merge class vocabulary into DATA as a real deck, so Review, Flashcards,
  // Listening, Quiz, Match-up and Mastery all pick it up automatically
  function syncClassDeck() {
    DATA.decks = DATA.decks.filter(d => d.id !== "class");
    DATA.cardIndex = DATA.cardIndex.filter(c => c.deckId !== "class");
    delete DATA.deckById["class"];
    const words = state.classes.vocab;
    if (!words.length) return;
    const deck = {
      id: "class", name: "Mes mots de classe",
      blurb: "Words from your classes.",
      cards: words.map(w => {
        const c = { fr: w.fr, en: w.en, pos: w.pos || "word", cid: "class::" + w.id, deckId: "class" };
        if (w.g) c.g = w.g;
        // borrow an example sentence when a curated card has one for the same word
        const twin = DATA.cardIndex.find(b => b.deckId !== "class" && b.ex &&
          b.fr.replace(/^(le |la |les |l['’])/i, "").toLowerCase() === w.fr.replace(/^(le |la |les |l['’])/i, "").toLowerCase());
        if (twin) c.ex = twin.ex;
        return c;
      })
    };
    DATA.decks.push(deck);
    DATA.deckById["class"] = deck;
    DATA.cardIndex.push(...deck.cards);
  }

  /* ----------------------------------------------------------------------
     DICTIONARY — auto-corrects class vocabulary (offline, built-in)
     ---------------------------------------------------------------------- */
  const LEX = {};
  const POS_MAP = { n: "noun", v: "verb", adj: "adj", adv: "adv", phr: "phrase", w: "word" };

  function lexNorm(s) {
    return String(s).toLowerCase().replace(/[’]/g, "'").trim()
      .normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/\s+/g, " ");
  }
  function splitArticle(fr) {
    const m = String(fr).trim().match(/^(le |la |les |un |une |des |l['’]\s?)(.+)$/i);
    if (!m) return { art: "", head: String(fr).trim() };
    return { art: m[1].toLowerCase(), head: m[2].trim() };
  }
  function buildLex() {
    DATA.lexicon.forEach(e => {
      const k = lexNorm(e[0]);
      if (!LEX[k]) LEX[k] = { fr: e[0], g: e[1] || "", en: e[2], pos: POS_MAP[e[3]] || "word" };
    });
    // the app's own curated decks are dictionary too
    DATA.cardIndex.forEach(c => {
      if (c.deckId === "class") return;
      const { head } = splitArticle(c.fr);
      const k = lexNorm(head);
      if (!LEX[k]) LEX[k] = { fr: head, g: c.g || "", en: c.en, pos: c.pos || "word" };
    });
  }
  function lev(a, b) {
    if (a === b) return 0;
    const m = a.length, n = b.length;
    if (!m || !n) return m || n;
    let prev = Array.from({ length: n + 1 }, (_, i) => i);
    for (let i = 1; i <= m; i++) {
      const cur = [i];
      for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = cur;
    }
    return prev[n];
  }
  /* full dictionary (dict.js): 125k Lexique word forms + FreeDict translations */
  const FULL = new Map();   // exact ortho (accents kept, lowercased)
  const FULLN = new Map();  // accent-stripped — most frequent form wins
  const GLOSS = new Map();
  let SUGG = [];            // [normKey, ortho] pairs, frequency-ranked, for typo suggestions
  const POS2 = { n: "noun", v: "verb", j: "adj", d: "adv" };
  function buildFullDict() {
    if (!window.DICT_RAW) return;
    window.GLOSS_RAW.split("\n").forEach(l => {
      const t = l.split("\t");
      if (t[1] && !GLOSS.has(t[0])) GLOSS.set(t[0], t[1]);
    });
    window.DICT_RAW.split("\n").forEach(l => {
      const t = l.split("\t");
      const o = t[0];
      if (!o) return;
      const e = { fr: o, pos: POS2[t[1]] || "word", g: t[2] === "p" ? "pl" : (t[2] || ""), lem: t[3] || o };
      if (!FULL.has(o)) FULL.set(o, e);
      const k = lexNorm(o);
      if (!FULLN.has(k)) FULLN.set(k, e);
    });
    SUGG = window.DICT_SUGG.split("\n").filter(Boolean).map(o => [lexNorm(o), o]);
  }
  function fullEntry(e) {
    const en = GLOSS.get(lexNorm(e.fr)) || GLOSS.get(lexNorm(e.lem)) || "";
    return { fr: e.fr, g: e.g, pos: e.pos, en };
  }
  function lexFind(head) {
    const raw = String(head).toLowerCase().replace(/[’]/g, "'").trim();
    const k = lexNorm(head);
    // exact: curated first (best glosses), then the full dictionary
    if (LEX[k]) return { entry: LEX[k], exact: true };
    if (FULL.has(raw)) return { entry: fullEntry(FULL.get(raw)), exact: true };
    if (FULLN.has(k)) return { entry: fullEntry(FULLN.get(k)), exact: true };
    if (k.length < 3) return null;
    const maxd = k.length <= 5 ? 1 : 2;
    let best = null, bd = maxd + 1;
    for (const key in LEX) {
      if (Math.abs(key.length - k.length) > maxd) continue;
      const d = lev(k, key);
      if (d < bd) { bd = d; best = key; if (!d) break; }
    }
    if (best && bd === 1) return { entry: LEX[best], exact: false };
    // typo search across the frequency-ranked full dictionary
    let fBest = null, fbd = maxd + 1;
    for (let i = 0; i < SUGG.length; i++) {
      const key = SUGG[i][0];
      if (Math.abs(key.length - k.length) > maxd) continue;
      const d = lev(k, key);
      if (d < fbd) { fbd = d; fBest = SUGG[i][1]; if (d === 1) break; }
    }
    if (best && bd <= fbd) return { entry: LEX[best], exact: false };
    if (fBest) {
      const e = FULL.get(fBest) || FULLN.get(lexNorm(fBest));
      if (e) return { entry: fullEntry(e), exact: false };
    }
    return best ? { entry: LEX[best], exact: false } : null;
  }
  function articleFor(head, g) {
    if (g === "pl") return "les ";
    if (/^[aeiouyâàáéèêëîïíôöóûüúœæh]/i.test(head)) return "l'";
    return g === "f" ? "la " : "le ";
  }
  function displayFr(entry) {
    return entry.pos === "noun" && entry.g ? articleFor(entry.fr, entry.g) + entry.fr : entry.fr;
  }
  function enMatches(entry, en) {
    const mine = lexNorm(en).replace(/^to /, "");
    if (!mine) return false;
    return entry.en.split("|").some(gl => {
      const g = lexNorm(gl).replace(/^to /, "").replace(/\s*\(.*?\)\s*/g, "").trim();
      if (!g) return false;
      if (g === mine) return true;
      if (g.length >= 4 && mine.length >= 4 && (g.includes(mine) || mine.includes(g))) return true;
      return lev(g, mine) <= (Math.min(g.length, mine.length) <= 4 ? 1 : 2);
    });
  }
  // verdict for a new entry: {unknown} | {fix, notes, silent}
  function checkVocab(frRaw, enRaw, sel) {
    const { art, head } = splitArticle(frRaw);
    const found = lexFind(head);
    if (!found) return { unknown: true };
    const e = found.entry;
    const typedG = sel === "m" || sel === "f" ? sel
      : (art === "le " || art === "un " ? "m" : art === "la " || art === "une " ? "f" : art === "les " || art === "des " ? "pl" : "");
    const enOk = e.en ? enMatches(e, enRaw) : true; // no gloss available → trust her meaning
    const fix = {
      fr: displayFr(e),
      en: enOk ? enRaw.trim() : e.en.split("|")[0],
      pos: e.pos,
      g: e.pos === "noun" ? e.g : ""
    };
    const notes = [];
    if (!found.exact) notes.push(`spelling “${head}” → “${e.fr}”`);
    else if (head !== e.fr) notes.push(`accents “${head}” → “${e.fr}”`);
    if (e.pos === "noun" && typedG && e.g && typedG !== e.g)
      notes.push("gender is " + (e.g === "f" ? "feminine — la" : e.g === "pl" ? "plural — les" : "masculine — le"));
    if (!enOk) notes.push(`usually means “${e.en.split("|")[0]}”`);
    return { fix, notes, silent: found.exact && enOk };
  }
  // dictionary disagreement on an already-saved word (exact matches only)
  function rowFix(w) {
    const found = lexFind(splitArticle(w.fr).head);
    if (!found || !found.exact) return null;
    const e = found.entry;
    const enOk = e.en ? enMatches(e, w.en) : true;
    const want = { fr: displayFr(e), en: enOk ? w.en : e.en.split("|")[0], g: e.pos === "noun" ? e.g : "", pos: e.pos };
    if (want.fr === w.fr && (w.g || "") === (want.g || "") && enOk) return null;
    return want;
  }

  /* ----------------------------------------------------------------------
     CONJUGATION ENGINE — present tense for (nearly) any verb
     ---------------------------------------------------------------------- */
  function conjPresent(infRaw) {
    const inf = String(infRaw).toLowerCase().replace(/[’]/g, "'").trim();
    const K = DATA.verbByInf[inf];
    if (K) return { inf, en: K.en, group: K.group, forms: K.forms.slice(), elide: K.elide };
    const mk = (forms, group) => ({ inf, group, forms, elide: /^[aeiouâàéèêëîïôûùœh]/i.test(forms[0]) });
    if (inf.endsWith("prendre")) {
      const b = inf.slice(0, -7);
      return mk([b + "prends", b + "prends", b + "prend", b + "prenons", b + "prenez", b + "prennent"], "irregular");
    }
    if (inf.endsWith("venir") || inf.endsWith("tenir")) {
      const b = inf.slice(0, -5), r = inf.endsWith("venir") ? "v" : "t";
      return mk([b + r + "iens", b + r + "iens", b + r + "ient", b + r + "enons", b + r + "enez", b + r + "iennent"], "irregular");
    }
    if (/(vrir|frir)$/.test(inf)) { // ouvrir, offrir, découvrir — conjugate like -er
      const st = inf.slice(0, -2);
      return mk([st + "e", st + "es", st + "e", st + "ons", st + "ez", st + "ent"], "-ir (comme -er)");
    }
    if (/(mir|tir|vir)$/.test(inf) && inf.length > 5) { // dormir, partir, sortir, servir
      const short = inf.slice(0, -3), full = inf.slice(0, -2);
      return mk([short + "s", short + "s", short + "t", full + "ons", full + "ez", full + "ent"], "irregular");
    }
    if (inf.endsWith("er") && inf.length > 3) {
      const stem = inf.slice(0, -2);
      const nous = stem + (stem.endsWith("g") ? "eons" : stem.endsWith("c") ? "çons" : "ons");
      let strong = stem; // stem used in je/tu/il/ils
      if (/(el|et)$/.test(stem) && /^(appel|rappel|jet|projet|rejet)/.test(stem)) strong = stem + stem.slice(-1); // appelle, jette
      else if (/[eé][bcçdfglmnprstvz]$/.test(stem)) strong = stem.replace(/[eé](?=[bcçdfglmnprstvz]$)/, "è"); // achète, préfère, lève
      else if (/y$/.test(stem) && /[aou]y$/.test(stem)) strong = stem.replace(/y$/, "i"); // paie, essaie, nettoie
      return mk([strong + "e", strong + "es", strong + "e", nous, stem + "ez", strong + "ent"], "-er");
    }
    if (inf.endsWith("ir") && inf.length > 3) { // finir type
      const st = inf.slice(0, -2);
      return mk([st + "is", st + "is", st + "it", st + "issons", st + "issez", st + "issent"], "-ir");
    }
    if (inf.endsWith("re") && inf.length > 3) { // attendre type
      const st = inf.slice(0, -2);
      return mk([st + "s", st + "s", st.endsWith("d") ? st : st + "t", st + "ons", st + "ez", st + "ent"], "-re");
    }
    return null;
  }
  /* passé composé: aux + past participle */
  const PP_IRREG = {
    "être": "été", "avoir": "eu", "faire": "fait", "aller": "allé", "venir": "venu", "devenir": "devenu",
    "revenir": "revenu", "tenir": "tenu", "prendre": "pris", "apprendre": "appris", "comprendre": "compris",
    "vouloir": "voulu", "pouvoir": "pu", "devoir": "dû", "savoir": "su", "connaître": "connu",
    "boire": "bu", "voir": "vu", "dire": "dit", "lire": "lu", "écrire": "écrit", "mettre": "mis",
    "ouvrir": "ouvert", "offrir": "offert", "découvrir": "découvert", "recevoir": "reçu", "vivre": "vécu",
    "naître": "né", "mourir": "mort", "pleuvoir": "plu", "attendre": "attendu"
  };
  const ETRE_VERBS = new Set(["aller", "venir", "devenir", "revenir", "arriver", "partir", "rester", "sortir", "entrer", "rentrer", "monter", "descendre", "retourner", "tomber", "passer", "naître", "mourir"]);
  function conjPasse(infRaw) {
    const inf = String(infRaw).toLowerCase().replace(/[’]/g, "'").trim();
    let pp = PP_IRREG[inf];
    if (!pp) {
      if (inf.endsWith("er")) pp = inf.slice(0, -2) + "é";
      else if (inf.endsWith("ir")) pp = inf.slice(0, -2) + "i";
      else if (inf.endsWith("re")) pp = inf.slice(0, -2) + "u";
      else return null;
    }
    const etre = ETRE_VERBS.has(inf);
    const aux = etre ? ["suis", "es", "est", "sommes", "êtes", "sont"] : ["ai", "as", "a", "avons", "avez", "ont"];
    return {
      inf, group: etre ? "être + " + pp : "avoir + " + pp,
      // with être the participle agrees — show masculine agreement in the plural rows
      forms: aux.map((a, k) => a + " " + pp + (etre && k >= 3 ? "s" : "")),
      aux, pp,
      elide: !etre, // j'ai vs je suis
      agree: etre   // accept allé / allée / allés / allées when checking
    };
  }

  /* ----------------------------------------------------------------------
     NUMBER ENGINE — digits → correct French words (rule-generated, 0–1000)
     ---------------------------------------------------------------------- */
  function numToFr(n) {
    const U = ["zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix", "onze", "douze", "treize", "quatorze", "quinze", "seize"];
    if (n < 17) return U[n];
    if (n < 20) return "dix-" + U[n - 10];
    if (n < 70) {
      const T = { 2: "vingt", 3: "trente", 4: "quarante", 5: "cinquante", 6: "soixante" };
      const t = Math.floor(n / 10), r = n % 10;
      if (r === 0) return T[t];
      if (r === 1) return T[t] + " et un";
      return T[t] + "-" + U[r];
    }
    if (n < 80) return n === 71 ? "soixante et onze" : "soixante-" + numToFr(n - 60); // 70s ride on soixante + 10–19
    if (n < 100) {
      const r = n - 80;
      if (r === 0) return "quatre-vingts";            // the s only when nothing follows
      return "quatre-vingt-" + numToFr(r);            // no "et" in the 80s/90s
    }
    if (n < 200) return n === 100 ? "cent" : "cent " + numToFr(n - 100);
    if (n < 1000) {
      const h = Math.floor(n / 100), r = n % 100;
      if (r === 0) return U[h] + " cents";            // deux cents, but deux cent un
      return U[h] + " cent " + numToFr(r);
    }
    if (n === 1000) return "mille";
    return String(n);
  }
  // strict comparison: hyphens are required. Accepted spellings: traditional
  // (vingt et un, cent un) and 1990 rectified (vingt-et-un, cent-un). Accents lenient.
  const numKey = s => lexNorm(s).replace(/\s*-\s*/g, "-").replace(/\s+/g, " ").trim();
  function checkNumWord(typed, n) {
    const canon = numToFr(n);
    const a = numKey(typed);
    const forms = [numKey(canon), numKey(canon.replace(/ /g, "-"))]; // traditional + rectified
    if (forms.includes(a)) return { ok: true, exact: true, canon };
    const noS = forms.map(f => f.replace(/vingts\b/g, "vingt").replace(/cents\b/g, "cent"));
    if (noS.includes(a)) return { ok: true, exact: false, canon, note: "almost perfect — don't forget the s: " + canon };
    // right words, missing hyphens → wrong, with a pointed note
    const flat = s => s.replace(/[- ]+/g, " ");
    if (flat(a) === flat(numKey(canon)) || noS.map(flat).includes(flat(a)))
      return { ok: false, canon, note: "the hyphens matter: " + canon };
    return { ok: false, canon };
  }

  // is this plausibly a verb? (known table, dictionary says verb, or classic infinitive shape)
  function isVerbish(inf) {
    if (DATA.verbByInf[inf]) return true;
    const found = lexFind(inf);
    if (found && found.exact && found.entry.pos === "verb") return true;
    return false;
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return Object.assign(defaultState(), JSON.parse(raw));
    } catch (e) { /* storage blocked — fall back to memory */ }
    return defaultState();
  }
  let storageOK = true;
  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
    catch (e) {
      if (storageOK) { storageOK = false; toast("⚠︎ Progress can't be saved in this view — open via start.command"); }
    }
  }

  /* ----------------------------------------------------------------------
     DATE + STREAK HELPERS
     ---------------------------------------------------------------------- */
  function todayStr(d) { d = d || new Date(); return d.toISOString().slice(0, 10); }
  const DAY_MS = 86400000;
  function daysBetween(a, b) {
    return Math.round((Date.parse(b) - Date.parse(a)) / DAY_MS);
  }

  function rolloverDay() {
    const t = todayStr();
    if (state.today.day !== t) state.today = { day: t, xp: 0 };
  }

  function awardXP(n) {
    rolloverDay();
    state.xp += n;
    state.today.xp += n;
    state.createdDays[state.today.day] = (state.createdDays[state.today.day] || 0) + n;
    // streak
    const t = todayStr();
    const last = state.streak.lastDay;
    if (last !== t) {
      if (last && daysBetween(last, t) === 1) state.streak.count += 1;
      else state.streak.count = 1;
      state.streak.lastDay = t;
    }
    save();
    refreshChrome();
  }

  /* ----------------------------------------------------------------------
     SPACED REPETITION  (simplified SM-2)
     grade: 0 again | 1 hard | 2 good | 3 easy
     ---------------------------------------------------------------------- */
  function cardState(cid) { return state.srs[cid]; }
  function isSeen(cid) { return !!state.srs[cid]; }

  function reviewCard(cid, grade) {
    const now = Date.now();
    let s = state.srs[cid] || { ease: 2.5, interval: 0, due: now, reps: 0, lapses: 0 };
    if (grade === 0) {
      s.reps = 0;
      s.lapses += 1;
      s.ease = Math.max(1.3, s.ease - 0.2);
      s.interval = 0;                       // see again this session
      s.due = now;                          // due immediately
    } else {
      s.reps += 1;
      if (s.reps === 1)      s.interval = grade === 3 ? 3 : 1;
      else if (s.reps === 2) s.interval = grade === 1 ? 3 : 6;
      else                   s.interval = Math.round(s.interval * s.ease);
      if (grade === 1) { s.interval = Math.max(1, Math.round(s.interval * 0.6)); s.ease = Math.max(1.3, s.ease - 0.15); }
      if (grade === 3) { s.interval = Math.round(s.interval * 1.3); s.ease = Math.min(2.8, s.ease + 0.15); }
      s.due = now + s.interval * DAY_MS;
    }
    state.srs[cid] = s;
    save();
  }

  /* last-score memory for quizzes/drills, shown on the pages they launch from */
  function recordScore(key, right, total) {
    if (!key || !total) return;
    state.scores[key] = { pct: Math.round(right / total * 100), right, total, when: todayStr() };
    save();
  }
  const scoreSuffix = k => { const sc = state.scores[k]; return sc ? " · last " + sc.pct + "%" : ""; };

  function dueCards() {
    const now = Date.now();
    return DATA.cardIndex.filter(c => state.srs[c.cid] && state.srs[c.cid].due <= now);
  }
  function masteryOf(deckId) {
    const deck = DATA.deckById[deckId];
    let seen = 0, strong = 0;
    deck.cards.forEach(c => {
      const s = state.srs[c.cid];
      if (s) { seen++; if (s.interval >= 6) strong++; }
    });
    return { total: deck.cards.length, seen, strong, pct: Math.round((strong / deck.cards.length) * 100) };
  }

  /* ----------------------------------------------------------------------
     TEXT-TO-SPEECH
     ---------------------------------------------------------------------- */
  function frVoices() {
    if (!("speechSynthesis" in window)) return [];
    return speechSynthesis.getVoices().filter(v => /^fr/i.test(v.lang));
  }
  // rank by real-world quality: Premium/Enhanced (downloadable macOS voices),
  // Siri, Google and neural voices sound far clearer than the default "compact" ones
  function voiceScore(v) {
    const n = v.name.toLowerCase();
    let s = 0;
    if (/premium/.test(n)) s += 50;
    if (/enhanced|améliorée/.test(n)) s += 40;
    if (/siri/.test(n)) s += 36;
    if (/natural|neural/.test(n)) s += 32;
    if (/google/.test(n)) s += 30;
    if (/fr[-_]FR/i.test(v.lang)) s += 12;      // prefer France French over fr-CA/fr-CH
    if (/audrey|am[eé]lie|thomas|marie|daniel/.test(n)) s += 4;
    if (/compact/.test(n)) s -= 25;
    return s;
  }
  function chooseVoice() {
    const list = frVoices();
    if (!list.length) return null;
    if (state.settings.voiceName) {
      const picked = list.find(v => v.name === state.settings.voiceName);
      if (picked) return picked;
    }
    return list.slice().sort((a, b) => voiceScore(b) - voiceScore(a))[0];
  }
  if ("speechSynthesis" in window) {
    speechSynthesis.getVoices(); // kick off the async voice load
    speechSynthesis.onvoiceschanged = () => { if (current === "progress") RENDER.progress(); };
  }
  function utterFr(text) {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "fr-FR";
    const v = chooseVoice();
    if (v) u.voice = v;
    u.rate = state.settings.rate || 0.9;
    u.pitch = 1;
    u.volume = 1;
    return u;
  }
  function speak(text) {
    if (!state.settings.voice || !("speechSynthesis" in window)) return;
    try {
      // browsers clip the first syllable when speak() follows cancel() in the
      // same tick — the "muted start". Delay slightly if we actually cancelled.
      const wasBusy = speechSynthesis.speaking || speechSynthesis.pending;
      speechSynthesis.cancel();
      const u = utterFr(text);
      if (wasBusy) setTimeout(() => speechSynthesis.speak(u), 80);
      else speechSynthesis.speak(u);
    } catch (e) { /* ignore */ }
  }

  /* ----------------------------------------------------------------------
     SMALL DOM + UTIL HELPERS
     ---------------------------------------------------------------------- */
  const $ = sel => document.querySelector(sel);
  const view = $("#view");

  function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  function sample(arr, n) { return shuffle(arr).slice(0, n); }
  function normalize(s) {
    return String(s).toLowerCase().trim()
      .normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/[.,!?¿¡;:]/g, "").replace(/\s+/g, " ");
  }
  function speakBtn(text, sm) {
    return `<button class="speak-btn${sm ? " sm" : ""}" data-speak="${esc(text)}" title="Listen" aria-label="Listen">${ic("volume")}</button>`;
  }
  // event delegation: any element with data-speak speaks on click
  document.addEventListener("click", e => {
    const t = e.target.closest("[data-speak]");
    if (t) { e.stopPropagation(); speak(t.getAttribute("data-speak")); }
  });

  /* accent toolbar: tap to insert French characters into the focused input */
  const ACCENTS = ["é", "è", "ê", "à", "â", "ç", "î", "ô", "û", "ù", "ï", "œ"];
  let lastTyping = null;
  document.addEventListener("focusin", e => {
    if (e.target.matches("input.q-input, input.conj-input, input.v-in, textarea")) lastTyping = e.target;
  });
  function accentBar() {
    return `<div class="accent-bar" aria-label="French accents">${ACCENTS.map(c => `<button class="acc" data-acc="${c}" tabindex="-1">${c}</button>`).join("")}</div>`;
  }
  document.addEventListener("mousedown", e => {
    const b = e.target.closest("[data-acc]");
    if (!b) return;
    e.preventDefault(); // keep focus in the input
    let t = lastTyping;
    if (!t || !document.body.contains(t)) t = view.querySelector("input.q-input, input.conj-input, input.v-in, textarea");
    if (!t) return;
    const s = t.selectionStart == null ? t.value.length : t.selectionStart;
    const epos = t.selectionEnd == null ? s : t.selectionEnd;
    t.value = t.value.slice(0, s) + b.dataset.acc + t.value.slice(epos);
    t.selectionStart = t.selectionEnd = s + b.dataset.acc.length;
    t.focus();
  });

  let toastTimer;
  function toast(msg) {
    const el = $("#toast");
    el.textContent = msg; el.classList.remove("hidden");
    requestAnimationFrame(() => el.classList.add("show"));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { el.classList.remove("show"); setTimeout(() => el.classList.add("hidden"), 250); }, 2200);
  }

  function confetti() {
    const c = document.createElement("div");
    c.className = "confetti";
    const colors = ["#2b4a8a", "#3a5aa0", "#b1821c", "#b0453a", "#ffffff"];
    for (let i = 0; i < 90; i++) {
      const s = document.createElement("i");
      s.style.left = Math.random() * 100 + "vw";
      s.style.background = colors[Math.floor(Math.random() * colors.length)];
      s.style.animationDuration = (1.6 + Math.random() * 1.6) + "s";
      s.style.animationDelay = (Math.random() * 0.5) + "s";
      s.style.transform = `rotate(${Math.random() * 360}deg)`;
      c.appendChild(s);
    }
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 3500);
  }

  function articleColorFor(card) {
    if (card.g === "f") return "pill-red";
    if (card.g === "m") return "pill-blue";
    if (card.g === "pl") return "pill-gold";
    return "pill-green";
  }
  function posLabel(card) {
    if (card.g === "m") return "le · masculine";
    if (card.g === "f") return "la · feminine";
    if (card.g === "pl") return "les · plural";
    return { phrase: "phrase", word: "word", adj: "adjective", adv: "adverb", number: "number", noun: "noun" }[card.pos] || card.pos || "word";
  }

  /* ----------------------------------------------------------------------
     LEVEL
     ---------------------------------------------------------------------- */
  function levelInfo(xp) {
    // the app's content spans A1–A2 — no inflated B levels
    const tiers = [
      { min: 0,    name: "Débutant",      en: "Beginner",         cefr: "—"   },
      { min: 150,  name: "Élémentaire",   en: "Elementary",       cefr: "A1"  },
      { min: 600,  name: "Intermédiaire", en: "Intermediate",     cefr: "A2"  },
      { min: 1500, name: "Confirmé",      en: "Confident A2",     cefr: "A2+" }
    ];
    let cur = tiers[0], next = null;
    for (let i = 0; i < tiers.length; i++) {
      if (xp >= tiers[i].min) { cur = tiers[i]; next = tiers[i + 1] || null; }
    }
    return { cur, next };
  }

  /* ----------------------------------------------------------------------
     UNIT PROGRESS (derived)
     ---------------------------------------------------------------------- */
  function unitSteps(unit) {
    const steps = [];
    if (unit.decks.length)  steps.push("vocab");
    if (unit.grammar.length) steps.push("grammar");
    if (unit.verbs.length)  steps.push("verbs");
    if (unit.phrases.length) steps.push("phrases");
    if (unit.dialogue)      steps.push("dialogue");
    steps.push("quiz");
    return steps;
  }
  function stepDone(unit, step) { return !!state.done[unit.id + ":" + step]; }
  function markDone(unitId, step) {
    if (!state.done[unitId + ":" + step]) { state.done[unitId + ":" + step] = true; save(); }
  }
  function unitProgress(unit) {
    const steps = unitSteps(unit);
    const done = steps.filter(s => stepDone(unit, s)).length;
    return { done, total: steps.length, pct: Math.round((done / steps.length) * 100), complete: done === steps.length };
  }
  function unitUnlocked(index) {
    if (index === 0) return true;
    return unitProgress(DATA.path[index - 1]).complete;
  }

  /* ----------------------------------------------------------------------
     ROUTING
     ---------------------------------------------------------------------- */
  const TITLES = { home: "Home", learn: "Learning Path", notes: "Class Notes", review: "Review", practice: "Practice", grammar: "Grammar", phrases: "Phrasebook", progress: "Progress" };
  let current = "home";
  let activeCleanup = null;   // teardown hook for activities that bind global listeners

  function go(route, param) {
    if (activeCleanup) { try { activeCleanup(); } catch (e) {} activeCleanup = null; }
    current = route;
    document.querySelectorAll(".nav-item").forEach(b => b.classList.toggle("active", b.dataset.route === route));
    $("#topbarTitle").textContent = TITLES[route] || "Bonjour";
    view.scrollTop = 0; window.scrollTo(0, 0);
    if ("speechSynthesis" in window) speechSynthesis.cancel();
    (RENDER[route] || RENDER.home)(param);
  }

  document.querySelectorAll(".nav-item").forEach(b => b.addEventListener("click", () => go(b.dataset.route)));

  /* ----------------------------------------------------------------------
     CHROME (sidebar / topbar) REFRESH
     ---------------------------------------------------------------------- */
  function refreshChrome() {
    rolloverDay();
    $("#xpNum").textContent = state.xp;
    const lv = levelInfo(state.xp);
    $("#levelLabel").textContent = lv.cur.name + (lv.cur.cefr !== "—" ? " · " + lv.cur.cefr : "");
    $("#streakNum").textContent = state.streak.count;
    const due = dueCards().length;
    const badge = $("#reviewBadge");
    if (due > 0) { badge.textContent = due; badge.classList.remove("hidden"); }
    else badge.classList.add("hidden");
    $("#voiceToggle").innerHTML = ic(state.settings.voice ? "volume" : "mute");
  }

  $("#voiceToggle").addEventListener("click", () => {
    state.settings.voice = !state.settings.voice; save(); refreshChrome();
    toast(state.settings.voice ? "Sound on" : "Sound off");
    if (state.settings.voice) speak("Bonjour");
  });

  /* ======================================================================
     VIEWS
     ====================================================================== */
  const RENDER = {};

  /* ----- TODAY'S SESSION: reviews → new class words → mixed quiz ----- */
  function startToday() {
    const summary = { reviews: 0, newWords: 0 };
    const finishToday = () => {
      confetti();
      view.innerHTML = `<div class="empty">
        <div class="big-emoji-circle chip-gold">${ic("trophy")}</div>
        <h2>C'est fait pour aujourd'hui !</h2>
        <span class="gloss" style="margin:-4px 0 10px">that's it for today!</span>
        <p class="lead" style="margin:6px auto 20px">${summary.reviews} review${summary.reviews === 1 ? "" : "s"} · ${summary.newWords} new word${summary.newWords === 1 ? "" : "s"} · quiz done. À demain !</p>
        <button class="btn btn-primary btn-lg" data-home>Back home</button></div>`;
      view.querySelector("[data-home]").addEventListener("click", () => go("home"));
    };
    const stepQuiz = () => {
      const seen = DATA.cardIndex.filter(c => isSeen(c.cid));
      const pool = seen.length >= 8 ? seen : DATA.deckById[DATA.path[0].decks[0]].cards;
      startQuiz(pool, { title: "Today's quiz", scoreKey: "today:quiz", exit: () => go("home"), onComplete: finishToday });
    };
    const stepNew = () => {
      const fresh = (DATA.deckById["class"] || { cards: [] }).cards.filter(c => !isSeen(c.cid)).slice(0, 8);
      if (!fresh.length) return stepQuiz();
      summary.newWords = fresh.length;
      startFlashcards(fresh, { exit: () => go("home"), onComplete: stepQuiz });
    };
    const due = dueCards();
    if (due.length) {
      summary.reviews = due.length;
      startFlashcards(shuffle(due), { review: true, exit: () => go("home"), onComplete: stepNew });
    } else stepNew();
  }

  /* ----- HOME ----- */
  RENDER.home = function () {
    rolloverDay();
    const due = dueCards().length;
    const lv = levelInfo(state.xp);
    const goalPct = Math.min(100, Math.round((state.today.xp / DAILY_GOAL) * 100));
    const totalSeen = Object.keys(state.srs).length;
    const totalWords = DATA.cardIndex.length;
    const completedUnits = DATA.path.filter(u => unitProgress(u).complete).length;

    // next thing to do
    let nextUnit = DATA.path.find((u, i) => unitUnlocked(i) && !unitProgress(u).complete);
    const C = 2 * Math.PI * 42;

    view.innerHTML = `
      <section class="hero">
        <div class="hero-motif">${MEDALLION}</div>
        <h1 style="margin-bottom:2px">Bonjour !</h1>
        <span class="gloss" style="position:relative;z-index:1;color:rgba(255,255,255,.65);margin:0 0 14px">Hello!</span>
        <p>${due > 0
          ? `You have <b>${due}</b> word${due > 1 ? "s" : ""} ready to review. A few minutes keeps them in your memory for good.`
          : `Ready for today's French? ${nextUnit ? `Next up: <b>${esc(nextUnit.title)}</b>.` : "You've finished the whole path — <span style='white-space:nowrap'>magnifique!</span> <span class='gloss-i'>(wonderful!)</span>"}`}</p>
        <div class="hero-actions">
          <button class="btn btn-primary btn-lg" data-act="today">${ic("bolt")} Today's session${due > 0 ? ` · ${due} due` : ""}</button>
          ${nextUnit ? `<button class="btn btn-ghost btn-lg" data-act="continue" data-unit="${nextUnit.id}">${ic("play")} Continue learning</button>` : ""}
          <button class="btn btn-ghost btn-lg" data-act="practice">${ic("target")} Quick practice</button>
        </div>
      </section>

      <div class="grid cols-2" style="align-items:stretch">
        <div class="card">
          <div class="ring-wrap">
            <div class="ring" style="--p:${goalPct}">
              <svg width="92" height="92" viewBox="0 0 92 92">
                <circle class="track" cx="46" cy="46" r="42" fill="none" stroke-width="8"/>
                <circle class="fill" cx="46" cy="46" r="42" fill="none" stroke-width="8"
                  stroke-dasharray="${C}" stroke-dashoffset="${C - C * goalPct / 100}"/>
              </svg>
              <div class="ring-label"><b>${goalPct}%</b><small>daily goal</small></div>
            </div>
            <div>
              <div style="font-family:var(--serif);font-size:18px;font-weight:700;letter-spacing:-.02em">Today's goal</div>
              <div class="muted" style="font-size:13.5px;margin-top:4px">${state.today.xp} / ${DAILY_GOAL} XP earned today</div>
              ${goalPct >= 100 ? `<span class="pill pill-green" style="margin-top:8px">${ic("check")} Goal reached</span>` : `<div class="muted" style="font-size:12.5px;margin-top:8px">${DAILY_GOAL - state.today.xp} XP to go — about ${Math.ceil((DAILY_GOAL - state.today.xp) / 4)} reviews.</div>`}
            </div>
          </div>
        </div>
        <div class="card">
          <div style="font-family:var(--serif);font-size:18px;margin-bottom:6px">Your level</div>
          <div style="font-size:26px;font-family:var(--serif);font-weight:600">${lv.cur.name} ${lv.cur.cefr !== "—" ? `<span class="pill pill-blue" style="vertical-align:middle">${lv.cur.cefr}</span>` : ""}</div>
          <div class="gloss">${lv.cur.en}</div>
          ${lv.next ? `
            <div class="bar" style="margin-top:14px"><span style="width:${Math.round((state.xp - lv.cur.min) / (lv.next.min - lv.cur.min) * 100)}%"></span></div>
            <div class="muted" style="font-size:12.5px;margin-top:8px">${lv.next.min - state.xp} XP to <b>${lv.next.name}</b> ${lv.next.cefr} <span class="gloss-i">(${lv.next.en})</span></div>
          ` : `<div class="muted" style="font-size:13px;margin-top:12px">Top level reached. Félicitations ! <span class="gloss-i">(Congratulations!)</span></div>`}
        </div>
      </div>

      <h2 class="section-title">At a glance</h2>
      <div class="stat-grid">
        <div class="stat-box"><div class="stat-ico chip-orange">${ic("flame")}</div><div class="num">${state.streak.count}</div><div class="lbl">day streak</div></div>
        <div class="stat-box"><div class="stat-ico chip-brand">${ic("layers")}</div><div class="num">${totalSeen}<small>/${totalWords}</small></div><div class="lbl">words started</div></div>
        <div class="stat-box"><div class="stat-ico chip-green">${ic("flag")}</div><div class="num">${completedUnits}<small>/${DATA.path.length}</small></div><div class="lbl">units complete</div></div>
        <div class="stat-box"><div class="stat-ico chip-gold">${ic("star")}</div><div class="num">${state.xp}</div><div class="lbl">total XP</div></div>
      </div>

      <h2 class="section-title">Jump back in</h2>
      <div class="grid auto">
        ${tile("route", "chip-brand", "Learning Path", "Your step-by-step beginner course.", "learn")}
        ${tile("message", "chip-blue", "Phrasebook", "Real phrases for cafés, travel and more.", "phrases")}
        ${tile("book", "chip-green", "Grammar", "Clear, short explanations.", "grammar")}
      </div>
    `;

    // wire
    view.querySelectorAll("[data-act]").forEach(b => b.addEventListener("click", () => {
      const a = b.dataset.act;
      if (a === "today") startToday();
      else if (a === "review") go("review");
      else if (a === "practice") go("practice");
      else if (a === "continue") go("learn", b.dataset.unit);
    }));
    view.querySelectorAll("[data-tile]").forEach(t => t.addEventListener("click", () => go(t.dataset.tile)));
  };
  function tile(iconName, chipCls, title, desc, route) {
    return `<div class="card tile-card" data-tile="${route}">
      <div class="chip ${chipCls}">${ic(iconName)}</div>
      <div><h3>${title}</h3><p>${desc}</p></div>
    </div>`;
  }

  /* ----- LEARNING PATH ----- */
  RENDER.learn = function (unitId) {
    if (unitId) return renderUnit(unitId);
    view.innerHTML = `
      <p class="lead">A guided journey from your very first <i>bonjour</i> to ordering coffee, asking directions, and talking about yourself. Finish a unit to unlock the next.</p>
      <div class="grid" style="margin-top:22px">
        ${DATA.path.map((u, i) => {
          const p = unitProgress(u);
          const unlocked = unitUnlocked(i);
          const cls = !unlocked ? "locked" : p.complete ? "done" : "";
          return `<div class="unit ${cls}" data-unit="${unlocked ? u.id : ""}" ${unlocked ? 'style="cursor:pointer"' : ""}>
            <div class="unit-num">${p.complete ? ic("check") : !unlocked ? ic("lock") : i + 1}</div>
            <div class="unit-body">
              <h3>${esc(u.title)}</h3>
              <p>${esc(u.goal)}</p>
              <div class="unit-meta">
                ${u.decks.map(d => `<span class="pill pill-brand">${deckIcon(d)} ${esc(DATA.deckById[d].name)}</span>`).join("")}
                ${u.verbs.length ? `<span class="pill pill-gold">${ic("repeat")} ${u.verbs.length} verbs</span>` : ""}
                ${u.dialogue ? `<span class="pill pill-green">${ic("message")} dialogue</span>` : ""}
              </div>
            </div>
            <div class="unit-prog">
              <div class="bar"><span style="width:${p.pct}%"></span></div>
              <div class="muted" style="font-size:11.5px;margin-top:6px;text-align:right">${p.done}/${p.total} done</div>
            </div>
          </div>`;
        }).join("")}
      </div>`;
    view.querySelectorAll(".unit[data-unit]").forEach(u => {
      if (u.dataset.unit) u.addEventListener("click", () => go("learn", u.dataset.unit));
    });
  };

  function renderUnit(unitId) {
    const unit = DATA.path.find(u => u.id === unitId);
    const idx = DATA.path.indexOf(unit);
    const p = unitProgress(unit);
    const stepDefs = {
      vocab:    { icon: "layers", title: "Learn the words", sub: unit.decks.map(d => DATA.deckById[d].name).join(" · ") },
      grammar:  { icon: "book", title: "Grammar", sub: unit.grammar.map(g => DATA.grammarById[g].title).join(" · ") },
      verbs:    { icon: "repeat", title: "Conjugation drill", sub: unit.verbs.join(", ") },
      phrases:  { icon: "message", title: "Useful phrases", sub: unit.phrases.map(ph => DATA.phrasesById[ph].name).join(" · ") },
      dialogue: { icon: "users", title: "Role-play a conversation", sub: unit.dialogue ? DATA.dialogueById[unit.dialogue].title : "" },
      quiz:     { icon: "flag", title: "Checkpoint quiz", sub: "Prove you've got it" }
    };
    const steps = unitSteps(unit);

    view.innerHTML = `
      <button class="btn btn-ghost" data-back style="margin-bottom:18px">${ic("back")} All units</button>
      <div class="card" style="margin-bottom:20px">
        <span class="pill pill-brand">Unit ${idx + 1}</span>
        <h1 style="font-family:var(--serif);font-size:25px;font-weight:750;letter-spacing:-.025em;margin:10px 0 6px">${esc(unit.title)}</h1>
        <p class="muted" style="margin:0">${esc(unit.goal)}</p>
        <div class="bar" style="margin-top:16px"><span style="width:${p.pct}%"></span></div>
        <div class="muted" style="font-size:12.5px;margin-top:8px">${p.done} of ${p.total} steps complete${p.complete ? " — unit finished!" : ""}</div>
      </div>
      <div class="checklist">
        ${steps.map(s => {
          const d = stepDefs[s];
          const done = stepDone(unit, s);
          const sc = state.scores["unit:" + unit.id + ":" + s];
          return `<div class="check-row ${done ? "done" : ""}" data-step="${s}">
            <div class="ck">${done ? ic("check") : ""}</div>
            <div class="step-ico">${ic(d.icon)}</div>
            <div class="ck-body"><b>${d.title}</b><span>${esc(d.sub || "")}</span></div>
            ${sc ? `<span class="pill pill-gold" title="Your last score">${ic("star")} last ${sc.pct}%</span>` : ""}
            <div>${done ? '<span class="pill pill-green">done</span>' : `<span class="pill pill-brand">start ${ic("arrowRight")}</span>`}</div>
          </div>`;
        }).join("")}
      </div>`;

    view.querySelector("[data-back]").addEventListener("click", () => go("learn"));
    view.querySelectorAll(".check-row").forEach(r => r.addEventListener("click", () => startUnitStep(unit, r.dataset.step)));
  }

  function startUnitStep(unit, step) {
    const back = () => go("learn", unit.id);
    if (step === "vocab") {
      const cards = unit.decks.flatMap(d => DATA.deckById[d].cards);
      startFlashcards(cards, { title: unit.title + " — vocabulary", exit: back, onComplete: () => { markDone(unit.id, "vocab"); afterStep(unit, "Words learned!"); } });
    } else if (step === "grammar") {
      renderGrammarLessons(unit.grammar, { title: unit.title + " — grammar", onComplete: () => { markDone(unit.id, "grammar"); afterStep(unit, "Grammar read!"); }, backTo: back });
    } else if (step === "verbs") {
      startConjugation(unit.verbs, { exit: back, scoreKey: "unit:" + unit.id + ":verbs", onComplete: () => { markDone(unit.id, "verbs"); afterStep(unit, "Conjugations drilled!"); } });
    } else if (step === "phrases") {
      renderPhraseStudy(unit.phrases, { backTo: back, onComplete: () => { markDone(unit.id, "phrases"); afterStep(unit, "Phrases practised!"); } });
    } else if (step === "dialogue") {
      renderDialogue(unit.dialogue, { backTo: back, onComplete: () => { markDone(unit.id, "dialogue"); afterStep(unit, "Conversation complete!"); } });
    } else if (step === "quiz") {
      const cards = unit.decks.flatMap(d => DATA.deckById[d].cards);
      startQuiz(cards, { title: unit.title + " — checkpoint", pass: 0.7, exit: back, scoreKey: "unit:" + unit.id + ":quiz", onComplete: (passed) => {
        if (passed) { markDone(unit.id, "quiz"); afterStep(unit, "Checkpoint passed! 🎉", true); }
        else { toast("Almost — give it another go!"); back(); }
      } });
    }
  }
  function afterStep(unit, msg, big) {
    awardXP(big ? 15 : 8);
    toast(msg);
    const p = unitProgress(unit);
    if (p.complete) { confetti(); toast("Unit complete! 🇫🇷"); }
    go("learn", unit.id);
  }

  /* ----- MY CLASSES (course tracker — currently unused) ----- */
  let openDossier = null; // which dossier accordion is expanded (survives re-renders)
  let pendingSug = null;  // dictionary suggestion awaiting the user's choice
  let showImport = false; // bulk-import panel open?
  let importReport = null;// results of the last bulk import

  RENDER.classes = function () {
    ensureClasses();
    const cls = state.classes;
    const deck = DATA.deckById["class"];
    const cards = deck ? deck.cards : [];
    const now = Date.now();
    const newCount = cards.filter(c => !isSeen(c.cid)).length;
    const dueCount = cards.filter(c => state.srs[c.cid] && state.srs[c.cid].due <= now).length;

    // overall dossier progress
    let done = 0, total = 0;
    for (let n = 0; n <= 8; n++) {
      const steps = dossierSteps(n), st = cls.dossiers["d" + n].steps;
      total += steps.length;
      steps.forEach((_, i) => { if (st[i]) done++; });
    }
    const pct = Math.round(done / total * 100);
    const t = todayStr();

    view.innerHTML = `
      <div class="card class-head">
        <div class="chip chip-gold">${ic("cap")}</div>
        <div style="flex:1;min-width:0">
          <div style="font-family:var(--fancy);font-size:24px;color:var(--brand-ink)">Mes cours</div>
          <div class="muted" style="font-size:13px;margin-top:2px">Course tracker · A1–A2</div>
          <div class="bar" style="margin-top:12px"><span style="width:${pct}%"></span></div>
          <div class="muted" style="font-size:12px;margin-top:6px">${done} of ${total} steps done across the book — ${pct}%</div>
        </div>
      </div>

      <h2 class="section-title">Vocabulaire de classe</h2>
      <span class="gloss" style="margin:-12px 0 12px">class vocabulary — words you add here join your daily Review automatically</span>
      <div class="card">
        <div class="vocab-form">
          <input id="vFr" class="v-in" placeholder="le cahier" autocapitalize="off" autocomplete="off" spellcheck="false">
          <input id="vEn" class="v-in" placeholder="notebook" autocomplete="off">
          <select id="vPos" class="v-in v-sel">
            <option value="word">word</option>
            <option value="m">noun · le (m)</option>
            <option value="f">noun · la (f)</option>
            <option value="verb">verb</option>
            <option value="phrase">phrase</option>
          </select>
          <button class="btn btn-primary" data-add-vocab>${ic("plus")} Add</button>
          <button class="btn btn-ghost" data-toggle-import title="Paste a whole list at once">${ic("note")} Paste a list</button>
        </div>
        ${showImport ? `
        <div style="margin-top:12px">
          <textarea class="notes-area" id="impText" placeholder="One per line, French then English:&#10;le cahier - notebook&#10;bonsoir - good evening&#10;manger : to eat"></textarea>
          <div class="btn-row" style="margin-top:8px">
            <button class="btn btn-primary" data-run-import>${ic("check")} Import & auto-correct</button>
            <button class="btn btn-ghost" data-cancel-import>Cancel</button>
          </div>
        </div>` : ""}
        ${importReport ? `
        <div class="suggest-bar" style="display:block">
          <b>Imported ${importReport.added} word${importReport.added === 1 ? "" : "s"}.</b>
          ${importReport.fixed.length ? `<span class="gloss">corrected: ${importReport.fixed.map(esc).join(" · ")}</span>` : ""}
          ${importReport.unknown.length ? `<span class="gloss">not in dictionary (added as typed — double-check): ${importReport.unknown.map(esc).join(" · ")}</span>` : ""}
          ${importReport.skipped.length ? `<span class="gloss">already had: ${importReport.skipped.map(esc).join(" · ")}</span>` : ""}
          ${importReport.bad.length ? `<span class="gloss">couldn't read (use “french - english”): ${importReport.bad.map(esc).join(" · ")}</span>` : ""}
          <div class="btn-row" style="margin-top:8px"><button class="btn btn-ghost" data-dismiss-report>OK</button></div>
        </div>` : ""}
        ${accentBar()}
        <div class="gloss" style="margin-top:6px">French on the left, English on the right — spelling, accents, gender and meaning are checked against the built-in dictionary.</div>
        ${pendingSug ? `
        <div class="suggest-bar">
          <div class="sb-text">
            <span class="gloss" style="margin:0 0 2px">You typed “${esc(pendingSug.orig.fr)}” — “${esc(pendingSug.orig.en)}”. Dictionary says:</span>
            <span class="sb-word">${esc(pendingSug.fix.fr)}</span> — “${esc(pendingSug.fix.en)}”
            <span class="gloss">${pendingSug.notes.map(esc).join(" · ")}</span>
          </div>
          <div class="btn-row">
            <button class="btn btn-primary" data-sug-accept>${ic("check")} Use correction</button>
            <button class="btn btn-ghost" data-sug-keep>Keep what I typed</button>
          </div>
        </div>` : ""}
        ${cards.length ? `
          <div class="btn-row" style="margin:16px 0 4px">
            ${newCount ? `<button class="btn btn-blue" data-study-new>${ic("layers")} Study ${newCount} new word${newCount > 1 ? "s" : ""}</button>` : ""}
            ${dueCount ? `<button class="btn btn-ghost" data-go-review>${ic("refresh")} ${dueCount} due for review</button>` : ""}
          </div>
          <div style="margin-top:10px">
            ${cls.vocab.slice().reverse().map(w => `
              <div class="phrase-row vocab-row">
                ${speakBtn(w.fr, true)}
                <div class="pf"><div class="fr">${esc(w.fr)}</div><div class="en">${esc(w.en)}</div></div>
                ${w.g ? `<span class="pill ${w.g === "f" ? "pill-red" : w.g === "pl" ? "pill-gold" : "pill-blue"}">${w.g === "f" ? "la · f" : w.g === "pl" ? "les · pl" : "le · m"}</span>` : ""}
                ${(f => f ? `<button class="pill pill-gold fixp" data-fix="${w.id}" title="Apply dictionary correction">${ic("pencil")} fix → ${esc(f.fr)}</button>` : "")(rowFix(w))}
                ${isSeen("class::" + w.id) ? `<span class="pill pill-green">${ic("check")} in review</span>` : `<span class="pill pill-gold">new</span>`}
                <button class="x-btn" data-del-vocab="${w.id}" title="Remove" aria-label="Remove">${ic("x")}</button>
              </div>`).join("")}
          </div>` : `
          <div class="muted" style="font-size:13.5px;margin-top:14px">No words yet. After each class, add what you learned — a few words a day beats a cram before the exam.</div>`}
      </div>

      <h2 class="section-title">Devoirs</h2>
      <span class="gloss" style="margin:-12px 0 12px">homework</span>
      <div class="card">
        <div class="vocab-form">
          <input id="hwText" class="v-in" placeholder="Cahier d'activités p. 12, ex. 3–5" autocomplete="off" style="flex:2.5">
          <input id="hwDue" class="v-in v-date" type="date">
          <button class="btn btn-ghost" data-add-hw>${ic("plus")} Add</button>
        </div>
        ${cls.homework.length ? `
          <div style="margin-top:12px">
            ${cls.homework.slice().sort((a, b) => (a.done - b.done) || String(a.due || "9999").localeCompare(String(b.due || "9999"))).map(h => {
              const overdue = h.due && !h.done && h.due < t;
              return `<div class="hw-row ${h.done ? "done" : ""}">
                <button class="ck" data-hw-toggle="${h.id}" aria-label="Done">${h.done ? ic("check") : ""}</button>
                <div class="hw-text">${esc(h.text)}</div>
                ${h.due ? `<span class="pill ${overdue ? "pill-red" : h.done ? "pill-green" : "pill-brand"}">${overdue ? "overdue · " : ""}${new Date(h.due + "T12:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>` : ""}
                <button class="x-btn" data-del-hw="${h.id}" title="Remove" aria-label="Remove">${ic("x")}</button>
              </div>`;
            }).join("")}
          </div>` : `<div class="muted" style="font-size:13.5px;margin-top:14px">Nothing due. Profite ! <span class="gloss-i">(enjoy!)</span></div>`}
      </div>

      <h2 class="section-title">Dossiers du manuel</h2>
      <span class="gloss" style="margin:-12px 0 12px">textbook units — rename each dossier to match your book's table of contents</span>
      <div class="grid">
        ${Array.from({ length: 9 }, (_, n) => {
          const d = cls.dossiers["d" + n];
          const steps = dossierSteps(n);
          const dDone = steps.filter((_, i) => d.steps[i]).length;
          const open = openDossier === n;
          const complete = dDone === steps.length;
          return `<div class="card dossier ${complete ? "done" : ""}" data-dn="${n}">
            <div class="dossier-head" data-open="${n}">
              <div class="unit-num" style="width:44px;height:44px;font-size:18px">${complete ? ic("check") : n}</div>
              <div style="flex:1;min-width:0">
                <div style="font-family:var(--display);font-size:16.5px;font-weight:600">${esc(d.title || (n === 0 ? "Dossier 0 — introduction" : "Dossier " + n))}</div>
                <div class="muted" style="font-size:12px;margin-top:1px">${dDone}/${steps.length} done${n === 0 ? "" : " · 6 leçons + Cultures + DELF"}</div>
              </div>
              <button class="x-btn" data-rename="${n}" title="Rename from your book" aria-label="Rename">${ic("pencil")}</button>
              <div class="unit-prog" style="width:80px"><div class="bar"><span style="width:${Math.round(dDone / steps.length * 100)}%"></span></div></div>
            </div>
            <div class="dossier-body ${open ? "" : "hidden"}">
              <div class="step-wrap">
                ${steps.map((s, i) => `<button class="stepchip ${d.steps[i] ? "done" : ""}" data-step="${n}:${i}">${d.steps[i] ? ic("check") : ""}<span>${s}</span></button>`).join("")}
              </div>
              <textarea class="notes-area" data-notes="${n}" placeholder="Notes from class — grammar points, page numbers, things to ask the prof…">${esc(d.notes || "")}</textarea>
            </div>
          </div>`;
        }).join("")}
      </div>`;

    /* ----- wiring ----- */
    const commitWord = (fr, en, pos, g) => {
      const w = { id: Date.now(), fr, en, pos: pos || "word", added: todayStr() };
      if (g) w.g = g;
      cls.vocab.push(w);
      pendingSug = null;
      save(); syncClassDeck(); speak(fr);
      toast("Ajouté ✓ " + fr + " — " + en);
      RENDER.classes();
      const f = $("#vFr"); if (f) f.focus();
    };
    const addVocab = () => {
      const fr = $("#vFr").value.trim(), en = $("#vEn").value.trim(), sel = $("#vPos").value;
      if (!fr || !en) { toast("Need both the French and the English"); return; }
      const v = checkVocab(fr, en, sel);
      if (v.unknown) {
        const g = sel === "m" || sel === "f" ? sel : "";
        commitWord(fr, en, g ? "noun" : sel, g);
        toast("Added — not in my dictionary, double-check the spelling");
        return;
      }
      if (v.silent) { commitWord(v.fix.fr, v.fix.en, v.fix.pos, v.fix.g); return; }
      pendingSug = { orig: { fr, en, sel }, fix: v.fix, notes: v.notes };
      RENDER.classes();
    };
    view.querySelector("[data-add-vocab]").addEventListener("click", addVocab);
    ["vFr", "vEn"].forEach(id => $("#" + id).addEventListener("keydown", e => { if (e.key === "Enter") addVocab(); }));

    /* bulk import */
    view.querySelector("[data-toggle-import]").addEventListener("click", () => { showImport = !showImport; importReport = null; RENDER.classes(); });
    const cancelImp = view.querySelector("[data-cancel-import]");
    if (cancelImp) cancelImp.addEventListener("click", () => { showImport = false; RENDER.classes(); });
    const dismissRep = view.querySelector("[data-dismiss-report]");
    if (dismissRep) dismissRep.addEventListener("click", () => { importReport = null; RENDER.classes(); });
    const runImp = view.querySelector("[data-run-import]");
    if (runImp) runImp.addEventListener("click", () => {
      const rep = { added: 0, fixed: [], unknown: [], skipped: [], bad: [] };
      const have = new Set(cls.vocab.map(w => lexNorm(splitArticle(w.fr).head)));
      $("#impText").value.split(/\n+/).map(l => l.trim()).filter(Boolean).forEach(line => {
        const m = line.search(/\s[-–—:=]\s|\t/);
        if (m < 1) { rep.bad.push(line.slice(0, 24)); return; }
        const fr = line.slice(0, m).trim();
        const en = line.slice(m).replace(/^[\s\t\-–—:=]+/, "").trim();
        if (!fr || !en) { rep.bad.push(line.slice(0, 24)); return; }
        const head = lexNorm(splitArticle(fr).head);
        if (have.has(head)) { rep.skipped.push(fr); return; }
        const v = checkVocab(fr, en, "word");
        let w;
        if (v.unknown) { w = { id: Date.now() + rep.added, fr, en, pos: "word", added: todayStr() }; rep.unknown.push(fr); }
        else {
          w = { id: Date.now() + rep.added, fr: v.fix.fr, en: v.fix.en, pos: v.fix.pos, added: todayStr() };
          if (v.fix.g) w.g = v.fix.g;
          if (!v.silent || v.fix.fr !== fr) rep.fixed.push(fr + " → " + v.fix.fr + (v.fix.en !== en ? " (" + v.fix.en + ")" : ""));
        }
        cls.vocab.push(w);
        have.add(lexNorm(splitArticle(w.fr).head));
        rep.added++;
      });
      showImport = false;
      importReport = rep;
      save(); syncClassDeck(); refreshChrome();
      RENDER.classes();
    });

    const sugAccept = view.querySelector("[data-sug-accept]");
    if (sugAccept) sugAccept.addEventListener("click", () => {
      const s = pendingSug;
      commitWord(s.fix.fr, s.fix.en, s.fix.pos, s.fix.g);
    });
    const sugKeep = view.querySelector("[data-sug-keep]");
    if (sugKeep) sugKeep.addEventListener("click", () => {
      const s = pendingSug;
      const g = s.orig.sel === "m" || s.orig.sel === "f" ? s.orig.sel : "";
      commitWord(s.orig.fr, s.orig.en, g ? "noun" : s.orig.sel, g);
    });

    view.querySelectorAll("[data-fix]").forEach(b => b.addEventListener("click", () => {
      const w = cls.vocab.find(x => x.id === +b.dataset.fix);
      const f = w && rowFix(w);
      if (!f) return;
      w.fr = f.fr; w.en = f.en; w.pos = f.pos;
      if (f.g) w.g = f.g; else delete w.g;
      save(); syncClassDeck(); speak(w.fr);
      toast("Corrigé ✓ " + w.fr + " — " + w.en);
      RENDER.classes();
    }));

    view.querySelectorAll("[data-del-vocab]").forEach(b => b.addEventListener("click", () => {
      const id = +b.dataset.delVocab;
      cls.vocab = cls.vocab.filter(w => w.id !== id);
      delete state.srs["class::" + id];
      save(); syncClassDeck(); refreshChrome(); RENDER.classes();
    }));

    const studyBtn = view.querySelector("[data-study-new]");
    if (studyBtn) studyBtn.addEventListener("click", () => {
      const fresh = (DATA.deckById["class"] || { cards: [] }).cards.filter(c => !isSeen(c.cid));
      startFlashcards(fresh, { exit: () => go("classes"), onComplete: () => { awardXP(8); toast("Class words are in your review cycle now"); go("classes"); } });
    });
    const revBtn = view.querySelector("[data-go-review]");
    if (revBtn) revBtn.addEventListener("click", () => go("review"));

    const addHw = () => {
      const text = $("#hwText").value.trim(), due = $("#hwDue").value || null;
      if (!text) { toast("Type the homework first"); return; }
      cls.homework.push({ id: Date.now(), text, due, done: false });
      save(); RENDER.classes();
    };
    view.querySelector("[data-add-hw]").addEventListener("click", addHw);
    $("#hwText").addEventListener("keydown", e => { if (e.key === "Enter") addHw(); });

    view.querySelectorAll("[data-hw-toggle]").forEach(b => b.addEventListener("click", () => {
      const h = cls.homework.find(x => x.id === +b.dataset.hwToggle);
      h.done = !h.done;
      if (h.done) { awardXP(3); toast("Devoir fait ! (homework done!)"); }
      save(); RENDER.classes();
    }));
    view.querySelectorAll("[data-del-hw]").forEach(b => b.addEventListener("click", () => {
      cls.homework = cls.homework.filter(x => x.id !== +b.dataset.delHw);
      save(); RENDER.classes();
    }));

    view.querySelectorAll("[data-open]").forEach(h => h.addEventListener("click", e => {
      if (e.target.closest("[data-rename]")) return;
      const n = +h.dataset.open;
      openDossier = openDossier === n ? null : n;
      RENDER.classes();
    }));
    view.querySelectorAll("[data-rename]").forEach(b => b.addEventListener("click", () => {
      const n = +b.dataset.rename;
      const d = cls.dossiers["d" + n];
      const name = prompt("Dossier title (copy it from your book's table of contents):", d.title || "");
      if (name !== null) { d.title = name.trim(); save(); RENDER.classes(); }
    }));
    view.querySelectorAll("[data-step]").forEach(b => b.addEventListener("click", () => {
      const [n, i] = b.dataset.step.split(":").map(Number);
      const d = cls.dossiers["d" + n];
      d.steps[i] = !d.steps[i];
      if (d.steps[i]) awardXP(5);
      save();
      const steps = dossierSteps(n);
      if (steps.every((_, k) => d.steps[k])) { confetti(); toast("Dossier " + n + " terminé ! (finished!)"); }
      RENDER.classes();
    }));
    view.querySelectorAll("[data-notes]").forEach(ta => ta.addEventListener("change", () => {
      cls.dossiers["d" + ta.dataset.notes].notes = ta.value;
      save();
    }));
  };

  /* ----- CLASS NOTES: raw notes per class session; lessons get built from these ----- */
  RENDER.notes = function () {
    const notes = state.notes.slice().sort((a, b) => b.num - a.num); // newest first
    view.innerHTML = `
      <p class="lead">One entry per class. Dump everything in — vocabulary, grammar, phrases the teacher used, things you didn't understand. Claude turns these into lessons and drills for you.</p>
      <div class="btn-row" style="margin:18px 0 22px">
        <button class="btn btn-primary" data-new-note>${ic("plus")} New class note</button>
        ${state.notes.length ? `<button class="btn btn-ghost" data-dl-notes>${ic("download")} Download all notes</button>` : ""}
      </div>
      ${notes.length ? `<div class="grid">
        ${notes.map(n => `
          <div class="card" data-note="${n.id}">
            <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
              <div class="chip chip-brand" style="width:40px;height:40px;border-radius:11px">${ic("note")}</div>
              <div style="font-family:var(--fancy);font-size:21px;color:var(--brand-ink);flex:1">Class #${n.num}</div>
              <input type="date" class="v-in v-date" value="${esc(n.date || "")}" data-date="${n.id}">
              <button class="x-btn" data-del-note="${n.id}" title="Delete this note" aria-label="Delete">${ic("x")}</button>
            </div>
            <textarea class="notes-area" style="min-height:200px;margin-top:14px" data-text="${n.id}"
              placeholder="Everything from class — new words, grammar points, phrases, homework, questions…">${esc(n.text || "")}</textarea>
          </div>`).join("")}
      </div>` : `
      <div class="empty" style="padding:34px 20px">
        <div class="big-emoji-circle chip-brand">${ic("note")}</div>
        <h2>No notes yet</h2>
        <p class="lead" style="margin:6px auto 0">After each class, hit “New class note” and type everything in while it's fresh.</p>
      </div>`}`;

    view.querySelector("[data-new-note]").addEventListener("click", () => {
      const num = state.notes.reduce((m, n) => Math.max(m, n.num), 0) + 1;
      state.notes.push({ id: Date.now(), num, date: todayStr(), text: "" });
      save();
      RENDER.notes();
      const ta = view.querySelector(".notes-area");
      if (ta) ta.focus();
    });
    const dl = view.querySelector("[data-dl-notes]");
    if (dl) dl.addEventListener("click", () => {
      const txt = state.notes.slice().sort((a, b) => a.num - b.num)
        .map(n => `Class #${n.num} — ${n.date || "no date"}\n\n${n.text || "(empty)"}`).join("\n\n----------------\n\n");
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([txt], { type: "text/plain" }));
      a.download = "bonjour-class-notes.txt";
      a.click();
      toast("Notes downloaded");
    });
    view.querySelectorAll("[data-date]").forEach(inp => inp.addEventListener("change", () => {
      const n = state.notes.find(x => x.id === +inp.dataset.date);
      if (n) { n.date = inp.value; save(); }
    }));
    view.querySelectorAll("[data-text]").forEach(ta => ta.addEventListener("change", () => {
      const n = state.notes.find(x => x.id === +ta.dataset.text);
      if (n) { n.text = ta.value; save(); toast("Saved"); }
    }));
    view.querySelectorAll("[data-del-note]").forEach(b => b.addEventListener("click", () => {
      const n = state.notes.find(x => x.id === +b.dataset.delNote);
      if (!n) return;
      if (!confirm(`Delete Class #${n.num}${n.text ? " and its notes" : ""}? This can't be undone.`)) return;
      state.notes = state.notes.filter(x => x.id !== n.id);
      save();
      RENDER.notes();
    }));
  };

  /* ----- REVIEW ----- */
  RENDER.review = function () {
    const due = dueCards();
    if (!due.length) {
      view.innerHTML = `<div class="empty">
        <div class="big-emoji-circle chip-green">${ic("checkCircle")}</div>
        <h2>Nothing due right now</h2>
        <p class="lead" style="margin:6px auto 22px">Your reviews are all caught up. Learn new words on the path, or do some free practice.</p>
        <div class="btn-row" style="justify-content:center">
          <button class="btn btn-primary" data-go="learn">${ic("route")} Learning Path</button>
          <button class="btn btn-ghost" data-go="practice">${ic("target")} Practice</button>
        </div></div>`;
      view.querySelectorAll("[data-go]").forEach(b => b.addEventListener("click", () => go(b.dataset.go)));
      return;
    }
    startFlashcards(shuffle(due), { title: "Daily review", review: true, onComplete: () => {
      confetti(); view.innerHTML = `<div class="empty"><div class="big-emoji-circle chip-gold">${ic("trophy")}</div>
        <h2>Review done!</h2>
        <p class="lead" style="margin:6px auto 22px">Nice work keeping your French fresh. See you tomorrow!</p>
        <button class="btn btn-primary" data-go="home">Back home</button></div>`;
      view.querySelector("[data-go]").addEventListener("click", () => go("home"));
    } });
  };

  /* ----- PRACTICE MENU ----- */
  RENDER.practice = function () {
    view.innerHTML = `
      <p class="lead">Free practice — pick a mode and a topic. Nothing here is locked; explore anything you like.</p>
      <h2 class="section-title">Choose a mode</h2>
      <div class="grid auto">
        ${modeTile("note", "chip-brand", "Dictée", "Hear French, type it. Spelling and listening at once.", "dictee")}
        ${modeTile("hash", "chip-blue", "Numbers", "Hear a number, type the digits. Master soixante-dix.", "numbers")}
        ${modeTile("layers", "chip-brand", "Flashcards", "Flip cards and grade yourself. Feeds your reviews.", "flash")}
        ${modeTile("headphones", "chip-blue", "Listening", "Hear French, pick the meaning. Train your ear.", "listen")}
        ${modeTile("pencil", "chip-green", "Multiple choice", "Quick quiz, French to English and back.", "quiz")}
        ${modeTile("repeat", "chip-gold", "Conjugation", "Any verb, present tense — type all six forms.", "conj")}
        ${modeTile("grid", "chip-pink", "Match-up", "Match French words to English. Beat the clock.", "match")}
        ${modeTile("bolt", "chip-orange", "Tricky words", "Extra rounds on the words you keep missing.", "hard")}
      </div>`;
    view.querySelectorAll("[data-mode]").forEach(t => t.addEventListener("click", () => practicePick(t.dataset.mode)));
  };
  function modeTile(iconName, chipCls, title, desc, mode) {
    return `<div class="card tile-card" data-mode="${mode}">
      <div class="chip ${chipCls}">${ic(iconName)}</div>
      <div><h3>${title}</h3><p>${desc}</p></div></div>`;
  }

  function practicePick(mode) {
    const done = () => { awardXP(8); go("practice"); };
    if (mode === "conj") return renderConjPicker();
    if (mode === "hard") {
      const hard = DATA.cardIndex
        .filter(c => { const s = state.srs[c.cid]; return s && (s.lapses >= 2 || s.ease <= 1.7); })
        .sort((a, b) => (state.srs[b.cid].lapses - state.srs[a.cid].lapses))
        .slice(0, 12);
      if (!hard.length) { toast("No tricky words yet — keep reviewing and I'll spot them"); return; }
      return startFlashcards(shuffle(hard), { exit: () => go("practice"), onComplete: done });
    }
    if (mode === "numbers") return renderNumbersPicker();
    // deck-based modes
    pickList("Choose a topic", DATA.decks.map(d => ({ id: d.id, name: d.name, sub: d.cards.length + " words" + (mode === "flash" ? "" : scoreSuffix(mode + ":" + d.id)), icon: deckIcon(d.id), chip: "chip-brand" })), id => {
      const cards = DATA.deckById[id].cards;
      const key = mode + ":" + id;
      if (mode === "flash") startFlashcards(cards, { title: DATA.deckById[id].name, onComplete: done });
      else if (mode === "listen") startListening(cards, { scoreKey: key, onComplete: done });
      else if (mode === "quiz") startQuiz(cards, { title: DATA.deckById[id].name, scoreKey: key, onComplete: done });
      else if (mode === "match") startMatch(cards, { scoreKey: key, onComplete: done });
      else if (mode === "dictee") startDictee(cards, { scoreKey: key, onComplete: done });
    }, "practice");
  }

  /* numbers picker: two directions × four ranges */
  let numMode = "hear";
  function renderNumbersPicker() {
    const done = () => { awardXP(8); go("practice"); };
    const RANGES = [
      { id: "0-20", lo: 0, hi: 20, note: "the basics" },
      { id: "0-69", lo: 0, hi: 69, note: "regular numbers" },
      { id: "70-100", lo: 70, hi: 100, note: "the hard ones — soixante-dix, quatre-vingt…" },
      { id: "0-1000", lo: 0, hi: 1000, note: "everything — prices, years, addresses" }
    ];
    const pfx = () => (numMode === "write" ? "numwrite:" : "numbers:");
    view.innerHTML = `
      <button class="btn btn-ghost" data-back style="margin-bottom:18px">${ic("back")} Back</button>
      <h2 class="section-title">Numbers</h2>
      <div class="card" style="margin-bottom:18px">
        <div class="step-wrap">
          <button class="stepchip ${numMode === "hear" ? "done" : ""}" data-nummode="hear">${numMode === "hear" ? ic("check") : ""}<span>Listen → type digits</span></button>
          <button class="stepchip ${numMode === "write" ? "done" : ""}" data-nummode="write">${numMode === "write" ? ic("check") : ""}<span>See digits → write the French</span></button>
        </div>
        <div class="gloss" style="margin-top:10px">${numMode === "write"
          ? "72 → soixante-douze. Spelling is strict — hyphens required (vingt et un and vingt-et-un are both fine)."
          : "You hear « soixante-douze », you type 72. Trains your ear for prices and phone numbers."}</div>
      </div>
      <h2 class="section-title">Choose a range</h2>
      <div class="grid auto">
        ${RANGES.map(r => `<div class="card tile-card" data-id="${r.id}">
          <div class="chip chip-blue">${ic("hash")}</div>
          <div><h3>${r.id.replace("-", " – ")}</h3><p>${esc(r.note + scoreSuffix(pfx() + r.id))}</p></div></div>`).join("")}
      </div>`;
    view.querySelector("[data-back]").addEventListener("click", () => go("practice"));
    view.querySelectorAll("[data-nummode]").forEach(b => b.addEventListener("click", () => { numMode = b.dataset.nummode; renderNumbersPicker(); }));
    view.querySelectorAll("[data-id]").forEach(c => c.addEventListener("click", () => {
      const r = RANGES.find(x => x.id === c.dataset.id);
      startNumbers([r.lo, r.hi], { mode: numMode, scoreKey: pfx() + r.id, exit: () => renderNumbersPicker(), onComplete: done });
    }));
  }

  /* conjugation picker: built-in verbs + your class verbs + type-any-verb */
  let conjTense = "present";
  function renderConjPicker() {
    const done = () => { awardXP(8); go("practice"); };
    const keyPfx = () => (conjTense === "passe" ? "conjpc:" : "conj:");
    const conjOpts = inf => ({ tense: conjTense, scoreKey: keyPfx() + inf, exit: () => renderConjPicker(), onComplete: done });
    const classVerbs = state.classes.vocab
      .filter(w => (w.pos === "verb" || /(er|ir|re)$/.test(splitArticle(w.fr).head)) && isVerbish(splitArticle(w.fr).head))
      .map(w => splitArticle(w.fr).head)
      .filter(inf => !DATA.verbByInf[inf]);
    const items = DATA.verbs.map(v => ({ id: v.inf, name: v.inf, sub: v.en + " · " + v.group + scoreSuffix(keyPfx() + v.inf), icon: ic("repeat"), chip: "chip-gold" }))
      .concat([...new Set(classVerbs)].map(inf => ({ id: inf, name: inf, sub: "from your class" + scoreSuffix(keyPfx() + inf), icon: ic("cap"), chip: "chip-brand" })));
    view.innerHTML = `
      <button class="btn btn-ghost" data-back style="margin-bottom:18px">${ic("back")} Back</button>
      <h2 class="section-title">Drill any verb</h2>
      <div class="card" style="margin-bottom:18px">
        <div class="step-wrap" style="margin-bottom:12px">
          <button class="stepchip ${conjTense === "present" ? "done" : ""}" data-tense="present">${conjTense === "present" ? ic("check") : ""}<span>Présent</span></button>
          <button class="stepchip ${conjTense === "passe" ? "done" : ""}" data-tense="passe">${conjTense === "passe" ? ic("check") : ""}<span>Passé composé</span></button>
        </div>
        <div class="vocab-form">
          <input id="anyVerb" class="v-in" placeholder="regarder, choisir, vendre…" autocapitalize="off" autocomplete="off" spellcheck="false">
          <button class="btn btn-primary" data-go-verb>${ic("repeat")} Conjugate</button>
        </div>
        <div class="gloss" style="margin-top:6px">${conjTense === "passe"
          ? "Passé composé — type the full form (j'ai mangé, je suis allé). Agreement accepted either way."
          : "Type any infinitive — the engine builds the present-tense table, including stem changes (acheter → j'achète, manger → nous mangeons)."}</div>
      </div>
      <h2 class="section-title">Or pick one</h2>
      <div class="grid auto">
        ${items.map(it => `<div class="card tile-card" data-id="${esc(it.id)}">
          <div class="chip ${it.chip}">${it.icon}</div>
          <div><h3>${esc(it.name)}</h3><p>${esc(it.sub)}</p></div></div>`).join("")}
      </div>`;
    view.querySelector("[data-back]").addEventListener("click", () => go("practice"));
    view.querySelectorAll("[data-tense]").forEach(b => b.addEventListener("click", () => { conjTense = b.dataset.tense; renderConjPicker(); }));
    const goVerb = () => {
      const inf = $("#anyVerb").value.toLowerCase().replace(/[’]/g, "'").trim();
      if (!inf) return;
      if (!conjPresent(inf) || !(isVerbish(inf) || DATA.verbByInf[inf])) {
        toast("Hmm — I don't recognize that as a French verb. Check the spelling?");
        return;
      }
      startConjugation([inf], conjOpts(inf));
    };
    view.querySelector("[data-go-verb]").addEventListener("click", goVerb);
    $("#anyVerb").addEventListener("keydown", e => { if (e.key === "Enter") goVerb(); });
    view.querySelectorAll("[data-id]").forEach(c => c.addEventListener("click", () =>
      startConjugation([c.dataset.id], conjOpts(c.dataset.id))));
  }

  function pickList(title, items, onPick, backRoute) {
    view.innerHTML = `
      <button class="btn btn-ghost" data-back style="margin-bottom:18px">${ic("back")} Back</button>
      <h2 class="section-title">${title}</h2>
      <div class="grid auto">
        ${items.map(it => `<div class="card tile-card" data-id="${it.id}">
          ${it.icon ? `<div class="chip ${it.chip || "chip-brand"}">${it.icon}</div>` : ""}
          <div><h3>${esc(it.name)}</h3><p>${esc(it.sub || "")}</p></div></div>`).join("")}
      </div>`;
    view.querySelector("[data-back]").addEventListener("click", () => go(backRoute));
    view.querySelectorAll("[data-id]").forEach(c => c.addEventListener("click", () => onPick(c.dataset.id)));
  }

  /* ======================================================================
     STUDY ACTIVITIES
     ====================================================================== */

  /* ----- FLASHCARDS (with SRS grading) ----- */
  function startFlashcards(cards, opts) {
    opts = opts || {};
    let queue = opts.review ? cards.slice() : shuffle(cards); // fresh order every run
    let i = 0, flipped = false, studied = 0;
    const total = queue.length;
    const exit = opts.exit || (() => go(opts.review ? "home" : "practice"));

    function render() {
      if (i >= queue.length) return opts.onComplete && opts.onComplete();
      const card = queue[i];
      flipped = false;
      view.innerHTML = `
        <div class="study-wrap">
          <div class="study-top">
            <button class="btn btn-ghost" data-quit>${ic("back")} Exit</button>
            <div class="study-progress"><div class="bar"><span style="width:${Math.round(studied / total * 100)}%"></span></div></div>
            <div class="muted" style="font-size:13px">${studied}/${total}</div>
          </div>
          <div class="flashcard" id="fc">
            <div class="flashcard-inner">
              <div class="face face-front">
                <span class="pill ${articleColorFor(card)} pos-tag">${posLabel(card)}</span>
                <span class="speak">${speakBtn(card.fr)}</span>
                <div class="word">${esc(card.fr)}</div>
                <div class="hint">tap to flip</div>
              </div>
              <div class="face face-back">
                <span class="pill ${articleColorFor(card)} pos-tag">${posLabel(card)}</span>
                <span class="speak">${speakBtn(card.fr)}</span>
                <div class="answer">${esc(card.en)}</div>
                ${card.ex ? `<div class="ex"><div class="ex-fr">${esc(card.ex.fr)} ${speakBtn(card.ex.fr, true)}</div><div class="ex-en">${esc(card.ex.en)}</div></div>` : ""}
              </div>
            </div>
          </div>
          <div id="gradeZone"></div>
          <p class="muted" style="text-align:center;font-size:12.5px;margin-top:14px">Space = flip · 1–4 = grade</p>
        </div>`;
      const fc = $("#fc");
      fc.addEventListener("click", () => { if (!flipped) flip(); });
      $("[data-quit]").addEventListener("click", exit);
      // auto-speak the French prompt
      speak(card.fr);
    }

    function flip() {
      flipped = true;
      $("#fc").classList.add("flipped");
      const card = queue[i];
      $("#gradeZone").innerHTML = `
        <div class="grade-row">
          <button class="grade again" data-g="0">Again<small>&lt;1 min</small></button>
          <button class="grade hard" data-g="1">Hard<small>${gradePreview(card, 1)}</small></button>
          <button class="grade good" data-g="2">Good<small>${gradePreview(card, 2)}</small></button>
          <button class="grade easy" data-g="3">Easy<small>${gradePreview(card, 3)}</small></button>
        </div>`;
      $("#gradeZone").querySelectorAll(".grade").forEach(b => b.addEventListener("click", () => grade(+b.dataset.g)));
    }

    function grade(g) {
      const card = queue[i];
      reviewCard(card.cid, g);
      if (g === 0) {
        // requeue near the end of this session
        queue.push(card);
      } else {
        studied++;
        awardXP(g === 3 ? 3 : 2);
      }
      i++;
      render();
    }

    function key(e) {
      if (e.code === "Space") { e.preventDefault(); if (!flipped) flip(); }
      else if (flipped && e.key >= "1" && e.key <= "4") grade(+e.key - 1);
    }
    function cleanup() { document.removeEventListener("keydown", key); }
    document.addEventListener("keydown", key);
    activeCleanup = cleanup;

    // estimate interval text for a grade
    function gradePreview(card, g) {
      const s = state.srs[card.cid] || { ease: 2.5, interval: 0, reps: 0 };
      let iv;
      const reps = s.reps + 1;
      if (reps === 1) iv = g === 3 ? 3 : 1;
      else if (reps === 2) iv = g === 1 ? 3 : 6;
      else iv = Math.round(s.interval * s.ease);
      if (g === 1) iv = Math.max(1, Math.round(iv * 0.6));
      if (g === 3) iv = Math.round(iv * 1.3);
      return iv >= 1 ? iv + (iv === 1 ? " day" : " days") : "soon";
    }

    render();
  }

  /* ----- question pools: fresh shuffle every run + rotate least-recently-asked ----- */
  const QUIZ_LEN = 15;
  function pickPool(cards, n) {
    if (!state.asked) state.asked = {};
    // shuffle first so ties (never-asked cards) break randomly, then favour the least recent
    const ranked = shuffle(cards).sort((a, b) => (state.asked[a.cid] || 0) - (state.asked[b.cid] || 0));
    return shuffle(ranked.slice(0, Math.min(n, ranked.length)));
  }
  function markAsked(card) {
    state.asked[card.cid] = Date.now();
    save();
  }

  /* ----- plausible wrong answers: same deck first, then same word-type ----- */
  function distractorsFor(card, field, n) {
    const seen = new Set([normalize(card[field])]);
    const out = [];
    const take = pool => {
      for (const c of shuffle(pool)) {
        if (out.length >= n) break;
        const v = normalize(c[field] || "");
        if (!v || seen.has(v)) continue;
        seen.add(v);
        out.push(c);
      }
    };
    take(DATA.cardIndex.filter(c => c.deckId === card.deckId && c.cid !== card.cid));
    if (out.length < n) take(DATA.cardIndex.filter(c => c.deckId !== card.deckId && c.pos === card.pos));
    if (out.length < n) take(DATA.cardIndex.filter(c => c.cid !== card.cid));
    return out;
  }

  /* ----- LISTENING: hear French, choose meaning ----- */
  function startListening(cards, opts) {
    opts = opts || {};
    const exit = opts.exit || (() => go("practice"));
    let pool = pickPool(cards, QUIZ_LEN);
    let i = 0, correct = 0;
    function render() {
      if (i >= pool.length) {
        recordScore(opts.scoreKey, correct, pool.length);
        return finishScore(correct, pool.length, opts, "Listening");
      }
      const card = pool[i];
      markAsked(card);
      const distractors = distractorsFor(card, "en", 3);
      const options = shuffle([card, ...distractors]);
      view.innerHTML = `
        <div class="quiz-wrap">
          <div class="study-top">
            <button class="btn btn-ghost" data-quit>${ic("back")} Exit</button>
            <div class="study-progress"><div class="bar"><span style="width:${Math.round(i / pool.length * 100)}%"></span></div></div>
            <div class="muted" style="font-size:13px">${i + 1}/${pool.length}</div>
          </div>
          <div class="q-prompt">
            <button class="speak-btn" data-replay style="width:78px;height:78px;margin:10px auto">${ic("volume")}</button>
            <div class="q-sub">Listen and choose what it means</div>
          </div>
          <div class="options">
            ${options.map(o => `<button class="option" data-cid="${o.cid}">${esc(o.en)}</button>`).join("")}
          </div>
          <div class="feedback" id="fb"></div>
        </div>`;
      speak(card.fr);
      $("[data-replay]").addEventListener("click", () => speak(card.fr));
      $("[data-quit]").addEventListener("click", exit);
      view.querySelectorAll(".option").forEach(b => b.addEventListener("click", () => {
        const chosen = b.dataset.cid === card.cid;
        view.querySelectorAll(".option").forEach(o => {
          o.classList.add("disabled");
          if (o.dataset.cid === card.cid) o.classList.add("correct");
          else if (o === b) o.classList.add("wrong");
        });
        $("#fb").innerHTML = chosen ? `<span class="ok">✓ Oui ! <span class="gloss-i">(yes!)</span> “${esc(card.fr)}” — ${esc(card.en)}</span>` : `<span class="no">It was “${esc(card.fr)}” — ${esc(card.en)}</span>`;
        if (chosen) { correct++; awardXP(3); }
        setTimeout(() => { i++; render(); }, chosen ? 850 : 1700);
      }));
    }
    render();
  }

  /* ----- MULTIPLE CHOICE QUIZ (FR -> EN and EN -> FR) ----- */
  function startQuiz(cards, opts) {
    opts = opts || {};
    const exit = opts.exit || (() => go(opts.pass != null ? "learn" : "practice"));
    let pool = pickPool(cards, QUIZ_LEN);
    let i = 0, correct = 0;
    function render() {
      if (i >= pool.length) {
        recordScore(opts.scoreKey, correct, pool.length);
        const passed = (correct / pool.length) >= (opts.pass || 0);
        if (opts.pass != null) return finishScore(correct, pool.length, { onComplete: () => opts.onComplete && opts.onComplete(passed) }, opts.title || "Quiz", passed);
        return finishScore(correct, pool.length, opts, opts.title || "Quiz");
      }
      const card = pool[i];
      markAsked(card);
      const askFr = Math.random() < 0.5; // random direction — no fixed template
      const promptText = askFr ? card.fr : card.en;
      const answerField = askFr ? "en" : "fr";
      const distractors = distractorsFor(card, answerField, 3);
      const options = shuffle([card, ...distractors]);
      view.innerHTML = `
        <div class="quiz-wrap">
          <div class="study-top">
            <button class="btn btn-ghost" data-quit>${ic("back")} Exit</button>
            <div class="study-progress"><div class="bar"><span style="width:${Math.round(i / pool.length * 100)}%"></span></div></div>
            <div class="muted" style="font-size:13px">${i + 1}/${pool.length}</div>
          </div>
          <div class="q-prompt">
            <div class="q-word">${esc(promptText)} ${askFr ? speakBtn(card.fr) : ""}</div>
            <div class="q-sub">${askFr ? "What does this mean?" : "How do you say this in French?"}</div>
          </div>
          <div class="options">
            ${options.map(o => `<button class="option" data-cid="${o.cid}">${esc(o[answerField])}</button>`).join("")}
          </div>
          <div class="feedback" id="fb"></div>
        </div>`;
      if (askFr) speak(card.fr);
      $("[data-quit]").addEventListener("click", exit);
      view.querySelectorAll(".option").forEach(b => b.addEventListener("click", () => {
        const chosen = b.dataset.cid === card.cid;
        view.querySelectorAll(".option").forEach(o => {
          o.classList.add("disabled");
          if (o.dataset.cid === card.cid) o.classList.add("correct");
          else if (o === b) o.classList.add("wrong");
        });
        if (!askFr) speak(card.fr);
        $("#fb").innerHTML = chosen ? `<span class="ok">✓ Correct !</span>` : `<span class="no">✗ ${esc(card.fr)} = ${esc(card.en)}</span>`;
        if (chosen) { correct++; awardXP(3); }
        setTimeout(() => { i++; render(); }, chosen ? 800 : 1600);
      }));
    }
    render();
  }

  /* ----- CONJUGATION DRILL ----- */
  function startConjugation(infs, opts) {
    opts = opts || {};
    const exit = opts.exit || (() => go("practice"));
    const build = opts.tense === "passe" ? conjPasse : conjPresent;
    let verbs = shuffle(infs.map(inf => {
      const v = build(inf);
      if (v && !v.en) { const f = lexFind(v.inf); v.en = f && f.exact && f.entry.en ? f.entry.en.split("|")[0] : ""; }
      return v;
    }).filter(Boolean)); // engine handles any verb; fresh order every run
    let vi = 0, totalRight = 0, totalCells = 0;
    const mistakes = []; // {verb, label, correct, typed, revealed}
    const proLabels = ["je", "tu", "il", "nous", "vous", "ils"];

    function render() {
      if (vi >= verbs.length) {
        recordScore(opts.scoreKey, totalRight, totalCells);
        const pct = totalCells ? Math.round(totalRight / totalCells * 100) : 0;
        if (pct >= 70) { awardXP(5); confetti(); }
        view.innerHTML = `<div class="empty">
          <div class="big-emoji-circle ${pct >= 70 ? "chip-gold" : "chip-brand"}">${ic(pct >= 70 ? "trophy" : "bolt")}</div>
          <h2>Conjugation — ${pct}%</h2>
          <p class="lead" style="margin:6px auto 8px">You got <b>${totalRight}</b> of <b>${totalCells}</b> verb forms.</p>
          ${mistakes.length ? `
          <div class="card" style="max-width:540px;margin:18px auto 6px;text-align:left">
            <div style="font-family:var(--display);font-size:17px;font-weight:600;margin-bottom:6px">Corrections</div>
            ${mistakes.map(m => `<div class="phrase-row">
              ${speakBtn(m.label + m.correct, true)}
              <div class="pf">
                <div class="fr">${esc(m.label)}${esc(m.correct)} <span class="muted" style="font-weight:400;font-size:13px">· ${esc(m.verb)}</span></div>
                <div class="en">${m.revealed ? "revealed — try it from memory next time" : m.typed ? `you wrote “${esc(m.typed)}”` : "left blank"}</div>
              </div>
            </div>`).join("")}
          </div>` : `<p class="muted">Rien à corriger ! <span class="gloss-i">(nothing to correct!)</span></p>`}
          <div class="btn-row" style="justify-content:center;margin-top:18px">
            <button class="btn btn-ghost" data-retry>${ic("refresh")} Do it again</button>
            <button class="btn btn-primary" data-cont>Continue</button>
          </div></div>`;
        view.querySelector("[data-retry]").addEventListener("click", () => startConjugation(infs, opts));
        view.querySelector("[data-cont]").addEventListener("click", () => opts.onComplete && opts.onComplete());
        return;
      }
      const v = verbs[vi];
      view.innerHTML = `
        <div class="study-wrap">
          <div class="study-top">
            <button class="btn btn-ghost" data-quit>${ic("back")} Exit</button>
            <div class="muted" style="font-size:13px">Verb ${vi + 1}/${verbs.length}</div>
          </div>
          <div class="card">
            <div style="display:flex;align-items:center;justify-content:space-between">
              <div>
                <div style="font-family:var(--serif);font-size:26px">${esc(v.inf)} ${speakBtn(v.inf)}</div>
                <div class="muted" style="font-size:13.5px">${v.en ? esc(v.en) + " · " : ""}${esc(v.group)} · ${opts.tense === "passe" ? "passé composé" : "present tense"}</div>
              </div>
              <span class="pill ${v.group === "irregular" ? "pill-red" : "pill-blue"}">${v.group}</span>
            </div>
            <table class="conj-table" style="margin-top:14px">
              ${v.forms.map((f, k) => {
                const pro = proLabels[k];
                const display = (v.elide && k === 0) ? "j’" : pro + " ";
                return `<tr>
                  <td>${display}</td>
                  <td><input class="conj-input" data-k="${k}" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="…"></td>
                  <td class="muted" data-sol="${k}" style="font-size:13px"></td>
                </tr>`;
              }).join("")}
            </table>
            ${accentBar()}
            <div class="btn-row" style="margin-top:16px">
              <button class="btn btn-primary" data-check>Check answers</button>
              <button class="btn btn-ghost" data-reveal>Reveal</button>
            </div>
            <div class="feedback" id="fb"></div>
          </div>
          <p class="muted" style="text-align:center;font-size:12.5px;margin-top:12px">Type just the verb form (e.g. “suis”) — accents optional.</p>
        </div>`;

      const inputs = [...view.querySelectorAll(".conj-input")];
      inputs[0] && inputs[0].focus();
      inputs.forEach((inp, k) => inp.addEventListener("keydown", e => {
        if (e.key === "Enter") { if (k < inputs.length - 1) inputs[k + 1].focus(); else check(); }
      }));
      $("[data-quit]").addEventListener("click", exit);
      $("[data-reveal]").addEventListener("click", reveal);
      $("[data-check]").addEventListener("click", check);

      function expected(k) { return v.forms[k]; }
      function accepted(k) {
        const pro = ["je", "tu", "il", "nous", "vous", "ils"][k];
        const bases = v.agree
          ? ["", "e", "s", "es"].map(sfx => v.aux[k] + " " + v.pp + sfx) // être-verbs: any agreement accepted
          : [v.forms[k]];
        const out = [];
        bases.forEach(f => out.push(normalize(f), normalize(pro + " " + f), normalize((v.elide && k === 0 ? "j " : pro + " ") + f)));
        return out;
      }
      function check() {
        let right = 0;
        inputs.forEach((inp, k) => {
          const val = normalize(inp.value.replace(/[''`]/g, " "));
          const ok = accepted(k).includes(val);
          inp.classList.toggle("ok", ok); inp.classList.toggle("no", !ok && inp.value.trim() !== "");
          view.querySelector(`[data-sol="${k}"]`).textContent = ok ? "✓" : "→ " + expected(k);
          if (ok) right++;
          else mistakes.push({ verb: v.inf, label: (v.elide && k === 0) ? "j’" : proLabels[k] + " ", correct: expected(k), typed: inp.value.trim(), revealed: false });
        });
        totalRight += right; totalCells += 6;
        speak(v.inf);
        $("#fb").innerHTML = right === 6
          ? `<span class="ok">Parfait ! <span class="gloss-i">(perfect!)</span> All six correct.</span>`
          : `<span class="no">${right}/6 correct — corrections shown.</span>`;
        if (right === 6) awardXP(5);
        setTimeout(() => { vi++; render(); }, right === 6 ? 900 : 2200);
      }
      function reveal() {
        inputs.forEach((inp, k) => {
          inp.value = expected(k); inp.classList.add("ok"); view.querySelector(`[data-sol="${k}"]`).textContent = "✓";
          mistakes.push({ verb: v.inf, label: (v.elide && k === 0) ? "j’" : proLabels[k] + " ", correct: expected(k), typed: "", revealed: true });
        });
        totalCells += 6;
        setTimeout(() => { vi++; render(); }, 1400);
      }
    }
    render();
  }

  /* ----- MATCH-UP ----- */
  function startMatch(cards, opts) {
    opts = opts || {};
    const exit = opts.exit || (() => go("practice"));
    const pairs = sample(cards, Math.min(6, cards.length));
    let selectedFr = null, matched = 0, tries = 0;
    const left = shuffle(pairs), right = shuffle(pairs);

    view.innerHTML = `
      <div class="study-wrap">
        <div class="study-top">
          <button class="btn btn-ghost" data-quit>${ic("back")} Exit</button>
          <div class="muted" style="font-size:13px">Match all ${pairs.length} pairs</div>
        </div>
        <div class="grid cols-2">
          <div class="grid" id="colL">
            ${left.map(c => `<button class="option" data-fr="${c.cid}">${esc(c.fr)} ${speakBtn(c.fr)}</button>`).join("")}
          </div>
          <div class="grid" id="colR">
            ${right.map(c => `<button class="option" data-en="${c.cid}">${esc(c.en)}</button>`).join("")}
          </div>
        </div>
        <div class="feedback" id="fb"></div>
      </div>`;
    $("[data-quit]").addEventListener("click", exit);

    function clearSel() { view.querySelectorAll(".option").forEach(o => { if (!o.classList.contains("correct")) o.classList.remove("wrong"); o.style.outline = ""; }); }

    view.querySelectorAll("[data-fr]").forEach(b => b.addEventListener("click", () => {
      if (b.classList.contains("correct")) return;
      speak(pairs.find(p => p.cid === b.dataset.fr).fr);
      view.querySelectorAll("[data-fr]").forEach(x => x.style.outline = "");
      selectedFr = b.dataset.fr; b.style.outline = "3px solid var(--blue)";
    }));
    view.querySelectorAll("[data-en]").forEach(b => b.addEventListener("click", () => {
      if (!selectedFr || b.classList.contains("correct")) return;
      tries++;
      if (b.dataset.en === selectedFr) {
        const lBtn = view.querySelector(`[data-fr="${selectedFr}"]`);
        [lBtn, b].forEach(x => { x.classList.add("correct"); x.classList.add("disabled"); x.style.outline = ""; });
        matched++; awardXP(2);
        if (matched === pairs.length) {
          recordScore(opts.scoreKey, pairs.length, tries);
          $("#fb").innerHTML = `<span class="ok">Bravo ! <span class="gloss-i">(well done!)</span> All matched in ${tries} tries.</span>`;
          confetti();
          setTimeout(() => opts.onComplete && opts.onComplete(), 1400);
        }
      } else {
        b.classList.add("wrong");
        const lBtn = view.querySelector(`[data-fr="${selectedFr}"]`);
        if (lBtn) lBtn.style.outline = "3px solid var(--accent)";
        setTimeout(clearSel, 600);
      }
      selectedFr = null;
    }));
  }

  /* ----- corrections finish screen (dictée, numbers) ----- */
  function finishReport(o) {
    const pct = o.total ? Math.round(o.right / o.total * 100) : 0;
    if (pct >= 70) { awardXP(5); confetti(); }
    view.innerHTML = `<div class="empty">
      <div class="big-emoji-circle ${pct >= 70 ? "chip-gold" : "chip-brand"}">${ic(pct >= 70 ? "trophy" : "bolt")}</div>
      <h2>${esc(o.title)} — ${pct}%</h2>
      <p class="lead" style="margin:6px auto 8px">You got <b>${o.right}</b> of <b>${o.total}</b> right.</p>
      ${o.mistakes.length ? `
      <div class="card" style="max-width:540px;margin:18px auto 6px;text-align:left">
        <div style="font-family:var(--display);font-size:17px;font-weight:600;margin-bottom:6px">Corrections</div>
        ${o.mistakes.map(m => `<div class="phrase-row">
          ${m.say ? speakBtn(m.say, true) : ""}
          <div class="pf"><div class="fr">${esc(m.main)}</div><div class="en">${esc(m.sub)}</div></div>
        </div>`).join("")}
      </div>` : `<p class="muted">Rien à corriger ! <span class="gloss-i">(nothing to correct!)</span></p>`}
      <div class="btn-row" style="justify-content:center;margin-top:18px">
        <button class="btn btn-ghost" data-retry>${ic("refresh")} Do it again</button>
        <button class="btn btn-primary" data-cont>Continue</button>
      </div></div>`;
    view.querySelector("[data-retry]").addEventListener("click", o.onRetry);
    view.querySelector("[data-cont]").addEventListener("click", o.onDone);
  }

  /* ----- DICTÉE: hear French, type it ----- */
  function startDictee(cards, opts) {
    opts = opts || {};
    const exit = opts.exit || (() => go("practice"));
    const pool = pickPool(cards, 8);
    let i = 0, right = 0;
    const mistakes = [];
    const clean = s => String(s).toLowerCase().replace(/[’]/g, "'").replace(/\s+/g, " ").replace(/[.,!?;:]/g, "").trim();

    function render() {
      if (i >= pool.length) {
        recordScore(opts.scoreKey, right, pool.length);
        return finishReport({
          title: "Dictée", right, total: pool.length, mistakes,
          onRetry: () => startDictee(cards, opts),
          onDone: () => opts.onComplete && opts.onComplete()
        });
      }
      const card = pool[i];
      markAsked(card);
      view.innerHTML = `
        <div class="quiz-wrap">
          <div class="study-top">
            <button class="btn btn-ghost" data-quit>${ic("back")} Exit</button>
            <div class="study-progress"><div class="bar"><span style="width:${Math.round(i / pool.length * 100)}%"></span></div></div>
            <div class="muted" style="font-size:13px">${i + 1}/${pool.length}</div>
          </div>
          <div class="q-prompt">
            <button class="speak-btn" data-replay style="width:78px;height:78px;margin:10px auto">${ic("volume")}</button>
            <div class="q-sub">Listen and type the French — accents count, articles too</div>
          </div>
          <input class="q-input" id="dicIn" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="…">
          ${accentBar()}
          <div class="btn-row" style="justify-content:center;margin-top:14px">
            <button class="btn btn-primary" data-submit>Check</button>
            <button class="btn btn-ghost" data-reveal>${ic("eye")} Show me</button>
          </div>
          <div class="feedback" id="fb"></div>
        </div>`;
      speak(card.fr);
      const input = $("#dicIn");
      input.focus();
      $("[data-replay]").addEventListener("click", () => speak(card.fr));
      $("[data-quit]").addEventListener("click", exit);
      input.addEventListener("keydown", e => { if (e.key === "Enter") submit(); });
      $("[data-submit]").addEventListener("click", submit);
      $("[data-reveal]").addEventListener("click", () => {
        mistakes.push({ main: card.fr + " — " + card.en, sub: "revealed — try it from memory next time", say: card.fr });
        $("#fb").innerHTML = `<span class="no">${esc(card.fr)} — ${esc(card.en)}</span>`;
        setTimeout(() => { i++; render(); }, 1800);
      });

      function submit() {
        const typed = input.value.trim();
        if (!typed) { input.focus(); return; }
        const a = clean(typed), b = clean(card.fr);
        const exact = a === b;
        const accentsOff = !exact && lexNorm(a) === lexNorm(b);
        const noArticle = !exact && !accentsOff && lexNorm(a) === lexNorm(splitArticle(card.fr).head);
        if (exact || accentsOff) {
          right++;
          awardXP(3);
          if (accentsOff) mistakes.push({ main: card.fr, sub: `right word — watch the accents (you wrote “${typed}”)`, say: card.fr });
          $("#fb").innerHTML = `<span class="ok">✓ ${esc(card.fr)} — ${esc(card.en)}${accentsOff ? ` <span class="gloss-i">(watch the accents)</span>` : ""}</span>`;
          setTimeout(() => { i++; render(); }, 1100);
        } else {
          mistakes.push({ main: card.fr + " — " + card.en, sub: noArticle ? `almost — include the article (you wrote “${typed}”)` : `you wrote “${typed}”`, say: card.fr });
          $("#fb").innerHTML = `<span class="no">→ ${esc(card.fr)} — ${esc(card.en)}</span>`;
          setTimeout(() => { i++; render(); }, 2000);
        }
      }
    }
    render();
  }

  /* ----- NUMBERS TRAINER: hear a number, type the digits ----- */
  function startNumbers(range, opts) {
    opts = opts || {};
    const exit = opts.exit || (() => go("practice"));
    const [lo, hi] = range;
    const ROUNDS = 12;
    let i = 0, right = 0;
    const used = new Set();
    const mistakes = [];
    function nextNumber() {
      for (let t = 0; t < 50; t++) {
        const n = lo + Math.floor(Math.random() * (hi - lo + 1));
        if (!used.has(n)) { used.add(n); return n; }
      }
      return lo + Math.floor(Math.random() * (hi - lo + 1));
    }
    function render() {
      if (i >= ROUNDS) {
        recordScore(opts.scoreKey, right, ROUNDS);
        return finishReport({
          title: (opts.mode === "write" ? "Write numbers " : "Numbers ") + lo + "–" + hi, right, total: ROUNDS, mistakes,
          onRetry: () => startNumbers(range, opts),
          onDone: () => opts.onComplete && opts.onComplete()
        });
      }
      const n = nextNumber();
      const write = opts.mode === "write";
      view.innerHTML = `
        <div class="quiz-wrap">
          <div class="study-top">
            <button class="btn btn-ghost" data-quit>${ic("back")} Exit</button>
            <div class="study-progress"><div class="bar"><span style="width:${Math.round(i / ROUNDS * 100)}%"></span></div></div>
            <div class="muted" style="font-size:13px">${i + 1}/${ROUNDS}</div>
          </div>
          <div class="q-prompt">
            ${write
              ? `<div class="q-word">${n}</div><div class="q-sub">Write this number in French words</div>`
              : `<button class="speak-btn" data-replay style="width:78px;height:78px;margin:10px auto">${ic("volume")}</button>
                 <div class="q-sub">Listen and type the number in digits</div>`}
          </div>
          <input class="q-input" id="numIn" ${write ? `autocapitalize="off" spellcheck="false"` : `inputmode="numeric"`} autocomplete="off" placeholder="…">
          ${write ? accentBar() : ""}
          <div class="btn-row" style="justify-content:center;margin-top:14px">
            <button class="btn btn-primary" data-submit>Check</button>
          </div>
          <div class="feedback" id="fb"></div>
        </div>`;
      if (!write) {
        speak(String(n)); // the French voice reads digits as full French numbers
        $("[data-replay]").addEventListener("click", () => speak(String(n)));
      }
      const input = $("#numIn");
      input.focus();
      $("[data-quit]").addEventListener("click", exit);
      input.addEventListener("keydown", e => { if (e.key === "Enter") submit(); });
      $("[data-submit]").addEventListener("click", submit);
      function submit() {
        const typed = input.value.trim();
        if (!typed) { input.focus(); return; }
        if (write) {
          const r = checkNumWord(typed, n);
          if (r.ok) {
            right++; awardXP(3);
            if (!r.exact) mistakes.push({ main: n + " — " + r.canon, sub: r.note, say: r.canon });
            $("#fb").innerHTML = `<span class="ok">✓ ${n} — ${esc(r.canon)}${r.exact ? "" : ` <span class="gloss-i">(watch the s)</span>`}</span>`;
            speak(r.canon);
            setTimeout(() => { i++; render(); }, 1100);
          } else {
            mistakes.push({ main: n + " — " + r.canon, sub: r.note || `you wrote “${typed}”`, say: r.canon });
            $("#fb").innerHTML = `<span class="no">→ ${n} — ${esc(r.canon)}${r.note ? ` <span class="gloss-i">(the hyphens matter)</span>` : ""}</span>`;
            speak(r.canon);
            setTimeout(() => { i++; render(); }, 2000);
          }
          return;
        }
        if (parseInt(typed.replace(/\s/g, ""), 10) === n) {
          right++; awardXP(2);
          $("#fb").innerHTML = `<span class="ok">✓ ${n}</span>`;
          setTimeout(() => { i++; render(); }, 800);
        } else {
          mistakes.push({ main: String(n), sub: `you wrote “${typed}”`, say: String(n) });
          $("#fb").innerHTML = `<span class="no">→ it was ${n}</span>`;
          setTimeout(() => { i++; render(); }, 1600);
        }
      }
    }
    render();
  }

  /* ----- score / finish screen shared by quizzes ----- */
  function finishScore(correct, total, opts, label, passed, customMsg) {
    const pct = Math.round(correct / total * 100);
    const good = pct >= 70;
    if (good) { awardXP(5); confetti(); }
    view.innerHTML = `<div class="empty">
      <div class="big-emoji-circle ${good ? "chip-gold" : "chip-brand"}">${ic(good ? "trophy" : "bolt")}</div>
      <h2>${label} — ${pct}%</h2>
      <p class="lead" style="margin:6px auto 8px">${customMsg || `You got <b>${correct}</b> of <b>${total}</b> right.`}</p>
      ${passed === false ? `<p class="muted">You need 70% to clear the checkpoint — try again!</p>` : ""}
      <div class="btn-row" style="justify-content:center;margin-top:18px">
        <button class="btn btn-primary" data-again>Continue</button>
      </div></div>`;
    view.querySelector("[data-again]").addEventListener("click", () => opts.onComplete && opts.onComplete());
  }

  /* ----- GRAMMAR ----- */
  RENDER.grammar = function () {
    renderGrammarLessons(DATA.grammar.map(g => g.id), { title: "Grammar reference", browse: true });
  };
  function renderGrammarLessons(ids, opts) {
    opts = opts || {};
    const lessons = ids.map(id => DATA.grammarById[id]).filter(Boolean);
    view.innerHTML = `
      ${opts.browse ? `<p class="lead">Short, clear explanations of the essentials. Tap a card to expand. Everything here is beginner-friendly.</p>` : `<button class="btn btn-ghost" data-back style="margin-bottom:16px">${ic("back")} Back to unit</button>`}
      <div class="grid" style="margin-top:18px">
        ${lessons.map(l => `
          <div class="card lesson-block" data-id="${l.id}">
            <div data-toggle>
              <div>
                <div style="font-family:var(--serif);font-size:17px;font-weight:700;letter-spacing:-.015em">${esc(l.title)}</div>
                <div class="muted" style="font-size:13px;margin-top:3px">${esc(l.summary)}</div>
              </div>
              <span class="pill ${state.readGrammar[l.id] ? "pill-green" : "pill-brand"}">${state.readGrammar[l.id] ? ic("check") + " read" : "open"}</span>
            </div>
            <div class="grammar-body hidden" data-body>${l.body}</div>
          </div>`).join("")}
      </div>
      ${!opts.browse ? `<div class="btn-row" style="margin-top:22px;justify-content:center"><button class="btn btn-primary btn-lg" data-done>I've read these ${ic("arrowRight")}</button></div>` : ""}`;

    if (opts.backTo) view.querySelector("[data-back]") && view.querySelector("[data-back]").addEventListener("click", opts.backTo);
    view.querySelectorAll(".lesson-block").forEach(block => {
      block.querySelector("[data-toggle]").addEventListener("click", () => {
        const body = block.querySelector("[data-body]");
        body.classList.toggle("hidden");
        if (!body.classList.contains("hidden")) {
          state.readGrammar[block.dataset.id] = true; save();
          block.querySelector(".pill").className = "pill pill-green";
          block.querySelector(".pill").innerHTML = ic("check") + " read";
          // speak the first example if any
          const ex = body.querySelector(".ex"); if (ex) speak(ex.textContent.replace(/[—–-].*$/, "").trim());
        }
      });
    });
    const doneBtn = view.querySelector("[data-done]");
    if (doneBtn) doneBtn.addEventListener("click", () => opts.onComplete && opts.onComplete());
  }

  /* ----- PHRASEBOOK ----- */
  RENDER.phrases = function () {
    view.innerHTML = `
      <p class="lead">Ready-made phrases for real situations. Tap any phrase to hear it spoken aloud.</p>
      <h2 class="section-title">Conversations to role-play</h2>
      <div class="grid auto">
        ${DATA.dialogues.map(d => `<div class="card tile-card" data-dlg="${d.id}">
          <div class="chip chip-brand">${dialogueIcon(d.id)}</div>
          <div><h3>${esc(d.title)}</h3><p>${esc(d.scene)}</p></div></div>`).join("")}
      </div>
      <h2 class="section-title">Phrasebook</h2>
      <div class="grid">
        ${DATA.phrases.map(cat => `
          <div class="card">
            <div class="cat-head"><div class="chip chip-blue" style="width:38px;height:38px;border-radius:11px">${phraseIcon(cat.id)}</div><h3>${esc(cat.name)}</h3></div>
            ${cat.items.map(p => `<div class="phrase-row">
              ${speakBtn(p.fr, true)}
              <div class="pf"><div class="fr">${esc(p.fr)}</div><div class="en">${esc(p.en)}</div></div>
            </div>`).join("")}
          </div>`).join("")}
      </div>`;
    view.querySelectorAll("[data-dlg]").forEach(c => c.addEventListener("click", () => renderDialogue(c.dataset.dlg, { backTo: () => go("phrases") })));
  };

  function renderPhraseStudy(ids, opts) {
    const cats = ids.map(id => DATA.phrasesById[id]).filter(Boolean);
    view.innerHTML = `
      <button class="btn btn-ghost" data-back style="margin-bottom:16px">${ic("back")} Back to unit</button>
      <p class="lead">Listen to each phrase and say it out loud. Tap the speaker to hear a native-style voice.</p>
      <div class="grid" style="margin-top:16px">
        ${cats.map(cat => `<div class="card">
          <div class="cat-head"><div class="chip chip-blue" style="width:38px;height:38px;border-radius:11px">${phraseIcon(cat.id)}</div><h3>${esc(cat.name)}</h3></div>
          ${cat.items.map(p => `<div class="phrase-row">${speakBtn(p.fr, true)}<div class="pf"><div class="fr">${esc(p.fr)}</div><div class="en">${esc(p.en)}</div></div></div>`).join("")}
        </div>`).join("")}
      </div>
      <div class="btn-row" style="margin-top:22px;justify-content:center"><button class="btn btn-primary btn-lg" data-done>I've practised these ${ic("arrowRight")}</button></div>`;
    view.querySelector("[data-back]").addEventListener("click", () => opts.backTo ? opts.backTo() : go("learn"));
    view.querySelector("[data-done]").addEventListener("click", () => opts.onComplete && opts.onComplete());
  }

  /* ----- DIALOGUE / ROLE-PLAY ----- */
  function renderDialogue(id, opts) {
    opts = opts || {};
    const d = DATA.dialogueById[id];
    let hideMine = false;
    function paint() {
      view.innerHTML = `
        <button class="btn btn-ghost" data-back style="margin-bottom:16px">${ic("back")} Back</button>
        <div class="card" style="margin-bottom:18px">
          <div style="display:flex;align-items:center;gap:13px">
            <div class="chip chip-brand">${dialogueIcon(d.id)}</div>
            <div><div style="font-family:var(--serif);font-size:21px;font-weight:750;letter-spacing:-.02em">${esc(d.title)}</div>
            <div class="muted" style="font-size:13.5px;margin-top:2px">${esc(d.scene)}</div></div>
          </div>
          <div class="btn-row" style="margin-top:16px">
            <button class="btn btn-blue" data-play>${ic("play")} Play whole scene</button>
            <button class="btn btn-ghost" data-roleplay>${hideMine ? ic("eye") + " Show my lines" : ic("users") + " Hide my lines (role-play)"}</button>
          </div>
        </div>
        <div>
          ${d.lines.map((ln, k) => {
            const me = ln.who === "Vous";
            const hidden = hideMine && me;
            return `<div class="dlg-line ${me ? "me" : ""}">
              <div class="dlg-who">${esc(ln.who)}</div>
              <div class="dlg-bubble" data-speak="${esc(ln.fr)}">
                <div class="fr">${hidden ? '<span class="muted">··· your line — tap to reveal ···</span>' : esc(ln.fr)}</div>
                ${hidden ? "" : `<div class="en">${esc(ln.en)}</div>`}
              </div>
            </div>`;
          }).join("")}
        </div>
        ${opts.onComplete ? `<div class="btn-row" style="margin-top:22px;justify-content:center"><button class="btn btn-primary btn-lg" data-done>I've practised this ${ic("arrowRight")}</button></div>` : ""}`;

      view.querySelector("[data-back]").addEventListener("click", () => opts.backTo ? opts.backTo() : go("learn"));
      view.querySelector("[data-roleplay]").addEventListener("click", () => { hideMine = !hideMine; paint(); });
      view.querySelector("[data-play]").addEventListener("click", playScene);
      // in role-play mode, tapping a hidden "your" line reveals it (and speaks it)
      if (hideMine) {
        const myLines = d.lines.filter(l => l.who === "Vous");
        view.querySelectorAll(".dlg-line.me .dlg-bubble").forEach((b, idx) => {
          b.addEventListener("click", () => {
            const ln = myLines[idx];
            b.innerHTML = `<div class="fr">${esc(ln.fr)}</div><div class="en">${esc(ln.en)}</div>`;
          }, { once: true });
        });
      }
      const done = view.querySelector("[data-done]");
      if (done) done.addEventListener("click", () => opts.onComplete && opts.onComplete());
    }
    function playScene() {
      if (!("speechSynthesis" in window)) return;
      let k = 0;
      const bubbles = view.querySelectorAll(".dlg-bubble");
      function next() {
        if (k >= d.lines.length) return;
        bubbles.forEach(b => b.style.outline = "");
        if (bubbles[k]) bubbles[k].style.outline = "2px solid var(--blue)";
        const u = utterFr(d.lines[k].fr);
        u.onend = () => { k++; setTimeout(next, 350); };
        if (state.settings.voice) speechSynthesis.speak(u); else { k++; setTimeout(next, 600); }
      }
      speechSynthesis.cancel(); next();
    }
    paint();
  }

  /* ----- PROGRESS ----- */
  RENDER.progress = function () {
    const lv = levelInfo(state.xp);
    const totalSeen = Object.keys(state.srs).length;
    const due = dueCards().length;
    // build a simple 28-day activity strip
    const days = [];
    for (let n = 27; n >= 0; n--) {
      const ds = todayStr(new Date(Date.now() - n * DAY_MS));
      days.push({ ds, xp: state.createdDays[ds] || 0 });
    }
    const maxXp = Math.max(10, ...days.map(d => d.xp));

    view.innerHTML = `
      <div class="grid cols-2">
        <div class="card">
          <div class="muted" style="font-size:13px">Current level</div>
          <div style="font-family:var(--serif);font-size:30px;margin:4px 0">${lv.cur.name} ${lv.cur.cefr !== "—" ? `<span class="pill pill-blue">${lv.cur.cefr}</span>` : ""}</div>
          <div class="gloss">${lv.cur.en}</div>
          ${lv.next ? `<div class="bar" style="margin-top:10px"><span style="width:${Math.round((state.xp - lv.cur.min) / (lv.next.min - lv.cur.min) * 100)}%"></span></div>
          <div class="muted" style="font-size:12.5px;margin-top:8px">${lv.next.min - state.xp} XP to ${lv.next.name} <span class="gloss-i">(${lv.next.en})</span></div>` : ""}
        </div>
        <div class="card" style="display:flex;gap:14px;align-items:center;justify-content:space-around;text-align:center">
          <div><div style="font-family:var(--serif);font-size:28px;font-weight:750">${state.streak.count}</div><div class="muted" style="font-size:12.5px">day streak</div></div>
          <div><div style="font-family:var(--serif);font-size:28px;font-weight:750">${totalSeen}</div><div class="muted" style="font-size:12.5px">words started</div></div>
          <div><div style="font-family:var(--serif);font-size:28px;font-weight:750">${due}</div><div class="muted" style="font-size:12.5px">due now</div></div>
        </div>
      </div>
      ${(() => {
        const now = Date.now();
        let tmrw = 0, week = 0;
        Object.values(state.srs).forEach(s => {
          if (s.due > now) {
            if (s.due <= now + DAY_MS) tmrw++;
            if (s.due <= now + 7 * DAY_MS) week++;
          }
        });
        return `<div class="muted" style="font-size:13px;margin-top:12px">Coming up: <b>${tmrw}</b> review${tmrw === 1 ? "" : "s"} tomorrow · <b>${week}</b> in the next 7 days.</div>`;
      })()}

      <h2 class="section-title">Last 28 days</h2>
      <div class="card">
        <div class="heat">
          ${days.map(d => `<div title="${d.ds}: ${d.xp} XP" style="background:${d.xp ? "var(--brand)" : "var(--line-2)"};height:${d.xp ? Math.max(8, Math.round(d.xp / maxXp * 86)) : 6}px"></div>`).join("")}
        </div>
        <div class="muted" style="font-size:12px;margin-top:8px;text-align:right">XP earned per day</div>
      </div>

      <h2 class="section-title">Vocabulary mastery</h2>
      <div class="card">
        ${DATA.decks.map(d => {
          const m = masteryOf(d.id);
          return `<div class="mastery-row">
            <div class="mi">${deckIcon(d.id)}</div>
            <div class="mn">${esc(d.name)}<small>${m.strong} mastered · ${m.seen} started · ${m.total} total</small></div>
            <div class="mb"><div class="bar"><span style="width:${m.pct}%"></span></div></div>
          </div>`;
        }).join("")}
      </div>

      <h2 class="section-title">La voix</h2>
      <span class="gloss" style="margin:-12px 0 12px">the voice — how Bonjour reads French aloud</span>
      <div class="card">
        <div class="vocab-form">
          <select id="voiceSel" class="v-in" style="flex:2.4">
            <option value="">Auto — best available${(() => { const a = chooseVoice(); return a && !state.settings.voiceName ? ` (${a.name})` : ""; })()}</option>
            ${frVoices().map(v => `<option value="${esc(v.name)}" ${state.settings.voiceName === v.name ? "selected" : ""}>${esc(v.name)} — ${esc(v.lang)}</option>`).join("")}
          </select>
          <select id="rateSel" class="v-in v-sel">
            <option value="0.72" ${state.settings.rate < 0.8 ? "selected" : ""}>Slow — learner pace</option>
            <option value="0.9" ${state.settings.rate >= 0.8 && state.settings.rate < 1 ? "selected" : ""}>Natural</option>
            <option value="1" ${state.settings.rate >= 1 ? "selected" : ""}>Fast — native pace</option>
          </select>
          <button class="btn btn-blue" data-test-voice>${ic("volume")} Test</button>
        </div>
        ${frVoices().length ? "" : `<div class="muted" style="font-size:13px;margin-top:10px">Voices are still loading — tap Test or reopen this page.</div>`}
        <div class="grammar-body" style="margin:14px 0 0"><p class="tip" style="margin:0">💡 For a far clearer voice (2 minutes, once): open <b>System Settings → Accessibility → Spoken Content → System Voice → Manage Voices…</b>, find <b>French</b>, and download <b>Amélie (Enhanced)</b>, <b>Thomas (Enhanced)</b> or <b>Audrey (Premium)</b>. Restart your browser — Bonjour will pick it up automatically.</p></div>
      </div>

      <h2 class="section-title">Manage</h2>
      <div class="card">
        <p class="muted" style="margin-top:0">Your progress is saved automatically on this device, and a backup file downloads once a week by itself. You can also export one manually.</p>
        <div class="btn-row">
          <button class="btn btn-ghost" data-export>${ic("download")} Export backup</button>
          <button class="btn btn-ghost" data-import>${ic("upload")} Import backup</button>
        </div>
        <input type="file" id="importFile" accept="application/json" class="hidden">
      </div>

      <h2 class="section-title">Start over</h2>
      <div class="card">
        <p class="muted" style="margin-top:0">Wipe everything on <b>this device</b> and begin from zero — streak, XP, learned words, scores and notes all reset to 0. App updates never do this; only this button does. It won't affect anyone else's progress.</p>
        <div class="btn-row">
          <button class="btn btn-ghost" data-reset style="color:var(--accent-2);border-color:#e0bcb2">${ic("reset")} Refresh entire database — start from zero</button>
        </div>
      </div>`;

    const SAMPLE = "Bonjour ! Comment allez-vous ? Les amis arrivent à trois heures.";
    $("#voiceSel").addEventListener("change", () => {
      state.settings.voiceName = $("#voiceSel").value || null;
      save(); speak(SAMPLE);
    });
    $("#rateSel").addEventListener("change", () => {
      state.settings.rate = parseFloat($("#rateSel").value);
      save(); speak(SAMPLE);
    });
    view.querySelector("[data-test-voice]").addEventListener("click", () => {
      if (!state.settings.voice) { state.settings.voice = true; save(); refreshChrome(); }
      speak(SAMPLE);
    });

    view.querySelector("[data-export]").addEventListener("click", exportData);
    view.querySelector("[data-import]").addEventListener("click", () => $("#importFile").click());
    $("#importFile").addEventListener("change", importData);
    view.querySelector("[data-reset]").addEventListener("click", () => {
      if (!confirm("Start over from zero?\n\nThis erases your streak, XP, learned words, scores and notes on THIS device — everything back to 0. It can't be undone.\n\n(Nobody else's progress is affected.)")) return;
      if (confirm("Download a safety backup first? (recommended)\n\nOK = save a backup, then reset.\nCancel = reset without a backup.")) exportData();
      state = defaultState();
      ensureClasses(); syncClassDeck(); buildLex();
      save(); refreshChrome(); go("home"); toast("Fresh start — bonne chance !");
    });
  };

  function exportData(auto) {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "bonjour-progress-" + todayStr() + ".json";
    a.click();
    toast(auto ? "Weekly backup saved to your Downloads" : "Backup downloaded");
  }
  function importData(e) {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try { state = Object.assign(defaultState(), JSON.parse(reader.result)); save(); refreshChrome(); go("progress"); toast("Backup restored"); }
      catch (err) { toast("Couldn't read that file"); }
    };
    reader.readAsText(file);
  }

  /* ----------------------------------------------------------------------
     BOOT
     ---------------------------------------------------------------------- */
  // inject static chrome icons (nav, topbar chips, streak)
  document.querySelectorAll("[data-ico]").forEach(e => { e.innerHTML = ic(e.getAttribute("data-ico")); });
  ensureClasses();
  if (!state.scores) state.scores = {};
  if (!state.asked) state.asked = {};
  if (!state.notes) state.notes = [];
  if (state.settings.rate == null) state.settings.rate = 0.9;
  if (state.settings.voiceName === undefined) state.settings.voiceName = null;
  // My Classes section removed — state.classes data is kept
  // in storage untouched; call syncClassDeck() here again to bring it all back.
  buildLex();
  buildFullDict();
  window.__fr = { numToFr, checkNumWord, conjPresent, conjPasse }; // console access for checking generated answers
  refreshChrome();
  go("home");

  // a friendly first-time greeting
  if (!Object.keys(state.srs).length && state.xp === 0) {
    setTimeout(() => speak("Bonjour !"), 600);
  }

  // weekly automatic backup — localStorage can be wiped by "clear browsing data"
  (function autoBackup() {
    const last = state.lastBackup ? Date.parse(state.lastBackup) : 0;
    const hasProgress = state.xp > 0 || Object.keys(state.srs).length > 0;
    if (!hasProgress || Date.now() - last < 7 * DAY_MS) return;
    setTimeout(() => {
      try { exportData(true); state.lastBackup = todayStr(); save(); } catch (e) { /* ignore */ }
    }, 2500);
  })();
})();
