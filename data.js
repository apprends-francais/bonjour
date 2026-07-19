/* =========================================================================
   Bonjour — French Learning Platform
   data.js — all learning content (vocabulary, grammar, conjugation, phrases,
   dialogues, and the guided beginner path).

   Notes:
   - "g" on a noun is its grammatical gender: "m" (masculine) or "f" (feminine).
   - "pl" marks plural-only entries; articles are shown accordingly in the UI.
   - Examples are short, natural beginner sentences.
   ========================================================================= */

const DATA = {

  /* ---------------------------------------------------------------------
     VOCABULARY DECKS
     --------------------------------------------------------------------- */
  decks: [
    {
      id: "greetings",
      name: "Greetings & Politeness",
      icon: "👋",
      blurb: "The first words you'll ever say in French.",
      cards: [
        { fr: "bonjour", en: "hello / good morning", pos: "phrase", ex: { fr: "Bonjour, comment ça va ?", en: "Hello, how's it going?" } },
        { fr: "bonsoir", en: "good evening", pos: "phrase" },
        { fr: "salut", en: "hi / bye (informal)", pos: "phrase" },
        { fr: "au revoir", en: "goodbye", pos: "phrase" },
        { fr: "merci", en: "thank you", pos: "phrase", ex: { fr: "Merci beaucoup !", en: "Thank you very much!" } },
        { fr: "s'il vous plaît", en: "please (formal)", pos: "phrase" },
        { fr: "s'il te plaît", en: "please (informal)", pos: "phrase" },
        { fr: "de rien", en: "you're welcome", pos: "phrase" },
        { fr: "oui", en: "yes", pos: "word" },
        { fr: "non", en: "no", pos: "word" },
        { fr: "pardon", en: "sorry / excuse me", pos: "phrase" },
        { fr: "excusez-moi", en: "excuse me (formal)", pos: "phrase" },
        { fr: "enchanté", en: "nice to meet you", pos: "phrase", ex: { fr: "Enchanté, je m'appelle Léa.", en: "Nice to meet you, I'm Léa." } },
        { fr: "à bientôt", en: "see you soon", pos: "phrase" },
        { fr: "à demain", en: "see you tomorrow", pos: "phrase" },
        { fr: "bienvenue", en: "welcome", pos: "phrase" }
      ]
    },
    {
      id: "numbers",
      name: "Numbers 0–20 & tens",
      icon: "🔢",
      blurb: "Counting, prices, phone numbers, ages.",
      cards: [
        { fr: "zéro", en: "0", pos: "number" },
        { fr: "un", en: "1", pos: "number" },
        { fr: "deux", en: "2", pos: "number" },
        { fr: "trois", en: "3", pos: "number" },
        { fr: "quatre", en: "4", pos: "number" },
        { fr: "cinq", en: "5", pos: "number" },
        { fr: "six", en: "6", pos: "number" },
        { fr: "sept", en: "7", pos: "number" },
        { fr: "huit", en: "8", pos: "number" },
        { fr: "neuf", en: "9", pos: "number" },
        { fr: "dix", en: "10", pos: "number" },
        { fr: "onze", en: "11", pos: "number" },
        { fr: "douze", en: "12", pos: "number" },
        { fr: "treize", en: "13", pos: "number" },
        { fr: "quatorze", en: "14", pos: "number" },
        { fr: "quinze", en: "15", pos: "number" },
        { fr: "seize", en: "16", pos: "number" },
        { fr: "dix-sept", en: "17", pos: "number" },
        { fr: "dix-huit", en: "18", pos: "number" },
        { fr: "dix-neuf", en: "19", pos: "number" },
        { fr: "vingt", en: "20", pos: "number" },
        { fr: "trente", en: "30", pos: "number" },
        { fr: "quarante", en: "40", pos: "number" },
        { fr: "cinquante", en: "50", pos: "number" },
        { fr: "cent", en: "100", pos: "number" }
      ]
    },
    {
      id: "family",
      name: "People & Family",
      icon: "👪",
      blurb: "Talk about the people in your life.",
      cards: [
        { fr: "la famille", en: "family", pos: "noun", g: "f" },
        { fr: "le père", en: "father", pos: "noun", g: "m" },
        { fr: "la mère", en: "mother", pos: "noun", g: "f" },
        { fr: "le frère", en: "brother", pos: "noun", g: "m" },
        { fr: "la sœur", en: "sister", pos: "noun", g: "f" },
        { fr: "les parents", en: "parents", pos: "noun", g: "pl" },
        { fr: "le fils", en: "son", pos: "noun", g: "m" },
        { fr: "la fille", en: "daughter / girl", pos: "noun", g: "f" },
        { fr: "le mari", en: "husband", pos: "noun", g: "m" },
        { fr: "la femme", en: "wife / woman", pos: "noun", g: "f" },
        { fr: "l'ami", en: "friend (m)", pos: "noun", g: "m" },
        { fr: "l'amie", en: "friend (f)", pos: "noun", g: "f" },
        { fr: "le garçon", en: "boy", pos: "noun", g: "m" },
        { fr: "l'enfant", en: "child", pos: "noun", g: "m" },
        { fr: "le grand-père", en: "grandfather", pos: "noun", g: "m" },
        { fr: "la grand-mère", en: "grandmother", pos: "noun", g: "f" }
      ]
    },
    {
      id: "colors",
      name: "Colors",
      icon: "🎨",
      blurb: "Describe the world around you.",
      cards: [
        { fr: "rouge", en: "red", pos: "adj" },
        { fr: "bleu", en: "blue", pos: "adj" },
        { fr: "vert", en: "green", pos: "adj" },
        { fr: "jaune", en: "yellow", pos: "adj" },
        { fr: "noir", en: "black", pos: "adj" },
        { fr: "blanc", en: "white", pos: "adj" },
        { fr: "gris", en: "grey", pos: "adj" },
        { fr: "orange", en: "orange", pos: "adj" },
        { fr: "rose", en: "pink", pos: "adj" },
        { fr: "violet", en: "purple", pos: "adj" },
        { fr: "marron", en: "brown", pos: "adj" }
      ]
    },
    {
      id: "food",
      name: "Food & Drink",
      icon: "🥐",
      blurb: "Order, shop, and survive a French menu.",
      cards: [
        { fr: "le pain", en: "bread", pos: "noun", g: "m" },
        { fr: "la baguette", en: "baguette", pos: "noun", g: "f" },
        { fr: "le croissant", en: "croissant", pos: "noun", g: "m" },
        { fr: "le fromage", en: "cheese", pos: "noun", g: "m" },
        { fr: "l'eau", en: "water", pos: "noun", g: "f", ex: { fr: "Une carafe d'eau, s'il vous plaît.", en: "A jug of water, please." } },
        { fr: "le vin", en: "wine", pos: "noun", g: "m" },
        { fr: "le café", en: "coffee", pos: "noun", g: "m" },
        { fr: "le thé", en: "tea", pos: "noun", g: "m" },
        { fr: "le lait", en: "milk", pos: "noun", g: "m" },
        { fr: "la pomme", en: "apple", pos: "noun", g: "f" },
        { fr: "le poulet", en: "chicken", pos: "noun", g: "m" },
        { fr: "le poisson", en: "fish", pos: "noun", g: "m" },
        { fr: "les légumes", en: "vegetables", pos: "noun", g: "pl" },
        { fr: "le petit-déjeuner", en: "breakfast", pos: "noun", g: "m" },
        { fr: "le déjeuner", en: "lunch", pos: "noun", g: "m" },
        { fr: "le dîner", en: "dinner", pos: "noun", g: "m" },
        { fr: "l'addition", en: "the bill", pos: "noun", g: "f", ex: { fr: "L'addition, s'il vous plaît.", en: "The bill, please." } }
      ]
    },
    {
      id: "time",
      name: "Days, Months & Time",
      icon: "📅",
      blurb: "Make plans and tell the time.",
      cards: [
        { fr: "lundi", en: "Monday", pos: "noun", g: "m" },
        { fr: "mardi", en: "Tuesday", pos: "noun", g: "m" },
        { fr: "mercredi", en: "Wednesday", pos: "noun", g: "m" },
        { fr: "jeudi", en: "Thursday", pos: "noun", g: "m" },
        { fr: "vendredi", en: "Friday", pos: "noun", g: "m" },
        { fr: "samedi", en: "Saturday", pos: "noun", g: "m" },
        { fr: "dimanche", en: "Sunday", pos: "noun", g: "m" },
        { fr: "aujourd'hui", en: "today", pos: "adv" },
        { fr: "demain", en: "tomorrow", pos: "adv" },
        { fr: "hier", en: "yesterday", pos: "adv" },
        { fr: "maintenant", en: "now", pos: "adv" },
        { fr: "le matin", en: "morning", pos: "noun", g: "m" },
        { fr: "l'après-midi", en: "afternoon", pos: "noun", g: "m" },
        { fr: "le soir", en: "evening", pos: "noun", g: "m" },
        { fr: "la semaine", en: "week", pos: "noun", g: "f" },
        { fr: "le mois", en: "month", pos: "noun", g: "m" },
        { fr: "l'année", en: "year", pos: "noun", g: "f" }
      ]
    },
    {
      id: "travel",
      name: "Travel & Directions",
      icon: "🧭",
      blurb: "Find your way around a French city.",
      cards: [
        { fr: "la gare", en: "train station", pos: "noun", g: "f" },
        { fr: "l'aéroport", en: "airport", pos: "noun", g: "m" },
        { fr: "l'hôtel", en: "hotel", pos: "noun", g: "m" },
        { fr: "la rue", en: "street", pos: "noun", g: "f" },
        { fr: "à gauche", en: "to the left", pos: "phrase" },
        { fr: "à droite", en: "to the right", pos: "phrase" },
        { fr: "tout droit", en: "straight ahead", pos: "phrase" },
        { fr: "le train", en: "train", pos: "noun", g: "m" },
        { fr: "le billet", en: "ticket", pos: "noun", g: "m" },
        { fr: "la voiture", en: "car", pos: "noun", g: "f" },
        { fr: "le bus", en: "bus", pos: "noun", g: "m" },
        { fr: "où", en: "where", pos: "adv", ex: { fr: "Où est la gare ?", en: "Where is the station?" } },
        { fr: "près", en: "near", pos: "adv" },
        { fr: "loin", en: "far", pos: "adv" }
      ]
    },
    {
      id: "home",
      name: "Home & Everyday Objects",
      icon: "🏠",
      blurb: "Words for daily life at home.",
      cards: [
        { fr: "la maison", en: "house", pos: "noun", g: "f" },
        { fr: "l'appartement", en: "apartment", pos: "noun", g: "m" },
        { fr: "la chambre", en: "bedroom", pos: "noun", g: "f" },
        { fr: "la cuisine", en: "kitchen", pos: "noun", g: "f" },
        { fr: "la porte", en: "door", pos: "noun", g: "f" },
        { fr: "la fenêtre", en: "window", pos: "noun", g: "f" },
        { fr: "la table", en: "table", pos: "noun", g: "f" },
        { fr: "la chaise", en: "chair", pos: "noun", g: "f" },
        { fr: "le lit", en: "bed", pos: "noun", g: "m" },
        { fr: "le livre", en: "book", pos: "noun", g: "m" },
        { fr: "le téléphone", en: "phone", pos: "noun", g: "m" },
        { fr: "la clé", en: "key", pos: "noun", g: "f" },
        { fr: "l'argent", en: "money", pos: "noun", g: "m" }
      ]
    },
    {
      id: "questions",
      name: "Question Words",
      icon: "❓",
      blurb: "Ask anything: who, what, where, when, why.",
      cards: [
        { fr: "qui", en: "who", pos: "word", ex: { fr: "Qui est-ce ?", en: "Who is it?" } },
        { fr: "quoi", en: "what", pos: "word" },
        { fr: "où", en: "where", pos: "word" },
        { fr: "quand", en: "when", pos: "word" },
        { fr: "pourquoi", en: "why", pos: "word" },
        { fr: "comment", en: "how", pos: "word", ex: { fr: "Comment vous appelez-vous ?", en: "What is your name?" } },
        { fr: "combien", en: "how much / how many", pos: "word", ex: { fr: "Combien ça coûte ?", en: "How much does it cost?" } },
        { fr: "quel", en: "which / what (m)", pos: "word" }
      ]
    },
    {
      id: "adjectives",
      name: "Common Adjectives",
      icon: "✨",
      blurb: "Describe things: big, small, good, bad.",
      cards: [
        { fr: "grand", en: "big / tall", pos: "adj" },
        { fr: "petit", en: "small", pos: "adj" },
        { fr: "bon", en: "good", pos: "adj" },
        { fr: "mauvais", en: "bad", pos: "adj" },
        { fr: "beau", en: "beautiful", pos: "adj" },
        { fr: "nouveau", en: "new", pos: "adj" },
        { fr: "vieux", en: "old", pos: "adj" },
        { fr: "jeune", en: "young", pos: "adj" },
        { fr: "chaud", en: "hot", pos: "adj" },
        { fr: "froid", en: "cold", pos: "adj" },
        { fr: "facile", en: "easy", pos: "adj" },
        { fr: "difficile", en: "difficult", pos: "adj" }
      ]
    }
  ],

  /* ---------------------------------------------------------------------
     GRAMMAR LESSONS  (body is light HTML)
     --------------------------------------------------------------------- */
  grammar: [
    {
      id: "gender-articles",
      title: "Gender & the words for “the” / “a”",
      summary: "Every French noun is masculine or feminine. The article changes to match.",
      body: `
        <p>French nouns have a <b>gender</b>. There's no deep logic to it — you learn it with the word, so always memorise the article <i>with</i> the noun.</p>
        <table class="g-table">
          <tr><th></th><th>“the”</th><th>“a / an”</th></tr>
          <tr><td>masculine</td><td><b>le</b> café</td><td><b>un</b> café</td></tr>
          <tr><td>feminine</td><td><b>la</b> pomme</td><td><b>une</b> pomme</td></tr>
          <tr><td>before a vowel</td><td><b>l'</b>eau, <b>l'</b>ami</td><td>un / une (unchanged)</td></tr>
          <tr><td>plural</td><td><b>les</b> amis</td><td><b>des</b> amis</td></tr>
        </table>
        <p class="gloss">café = coffee · pomme = apple · eau = water · ami / amis = friend(s)</p>
        <p class="tip">💡 Tip: learn “<b>une</b> pomme” <span class="gloss-i">(an apple)</span>, not just “pomme”. The article is part of the word in your memory.</p>`
    },
    {
      id: "le-la-les",
      title: "le, la, les, l' — the four ways to say “the”",
      summary: "Which one to use, and why French uses “the” far more than English.",
      body: `
        <p>French has four forms of <b>the</b>. Pick by the noun's gender and number:</p>
        <table class="g-table">
          <tr><th>form</th><th>when</th><th>example</th></tr>
          <tr><td><b>le</b></td><td>masculine singular</td><td>le cahier <span class="gloss-i">(the notebook)</span></td></tr>
          <tr><td><b>la</b></td><td>feminine singular</td><td>la table <span class="gloss-i">(the table)</span></td></tr>
          <tr><td><b>l'</b></td><td>before a vowel sound — any gender</td><td>l'ami, l'école, l'hôtel <span class="gloss-i">(the friend, the school, the hotel)</span></td></tr>
          <tr><td><b>les</b></td><td>any plural</td><td>les amis, les tables <span class="gloss-i">(the friends, the tables)</span></td></tr>
        </table>
        <p><b>l'</b> is just le or la with the vowel squeezed out — French hates two vowel sounds bumping together. It also happens before a silent <b>h</b>: <span class="ex">l'homme</span> <span class="gloss-i">(the man)</span>. A few h-words resist it (<span class="ex">le haricot</span> <span class="gloss-i">(the bean)</span>) — learn those as exceptions.</p>
        <p>With <b>les</b>, link the s into a vowel: <span class="ex">les amis</span> <span class="gloss-i">(sounds like “lez-ami”)</span>.</p>
        <p>French uses these where English drops “the”:</p>
        <ol>
          <li>Likes & dislikes: <span class="ex">J'aime le café.</span> <span class="gloss-i">(I like coffee.)</span></li>
          <li>General things: <span class="ex">La vie est belle.</span> <span class="gloss-i">(Life is beautiful.)</span></li>
          <li>Languages: <span class="ex">J'apprends le français.</span> <span class="gloss-i">(I'm learning French.)</span></li>
          <li>Habits with days: <span class="ex">le lundi</span> <span class="gloss-i">(on Mondays)</span></li>
        </ol>
        <p class="tip">💡 le and les merge after à and de: à + le → <b>au</b>, à + les → <b>aux</b>, de + le → <b>du</b>, de + les → <b>des</b>. <span class="gloss-i">(Je vais au marché = I'm going to the market.)</span> la and l' never merge.</p>`
    },
    {
      id: "pronouns",
      title: "Subject pronouns (I, you, he…)",
      summary: "The little words that start most sentences.",
      body: `
        <table class="g-table">
          <tr><td><b>je</b></td><td>I</td></tr>
          <tr><td><b>tu</b></td><td>you (one person, informal)</td></tr>
          <tr><td><b>il / elle</b></td><td>he / she (also “it”)</td></tr>
          <tr><td><b>nous</b></td><td>we</td></tr>
          <tr><td><b>vous</b></td><td>you (formal, or plural)</td></tr>
          <tr><td><b>ils / elles</b></td><td>they (m / f)</td></tr>
        </table>
        <p><b>tu</b> vs <b>vous</b>: use <b>tu</b> with friends, family, children. Use <b>vous</b> with strangers, shopkeepers, anyone you'd address formally — and always for more than one person.</p>
        <p class="tip">💡 “je” becomes “j'” before a vowel: <i>j'ai</i>, <i>j'aime</i>.</p>`
    },
    {
      id: "les-nombres",
      title: "Les nombres — how French numbers are built",
      summary: "The rules behind 0–1000, including the famous 70s, 80s and 90s.",
      body: `
        <p>Up to 69, French counts like English: tens + units, with a hyphen — <span class="ex">vingt-deux</span> <span class="gloss-i">(22)</span>, <span class="ex">quarante-cinq</span> <span class="gloss-i">(45)</span>.</p>
        <p>Exception: the 1s use <b>et</b>: <span class="ex">vingt et un</span> <span class="gloss-i">(21)</span>, <span class="ex">soixante et un</span> <span class="gloss-i">(61)</span>.</p>
        <table class="g-table">
          <tr><th>the tricky zone</th><th>logic</th></tr>
          <tr><td>70 <b>soixante-dix</b></td><td>60 + 10 — then 71 soixante et onze, 72 soixante-douze… up to 79 soixante-dix-neuf</td></tr>
          <tr><td>80 <b>quatre-vingts</b></td><td>4 × 20 — with an s, but only when nothing follows</td></tr>
          <tr><td>81 <b>quatre-vingt-un</b></td><td>no “et”, no s</td></tr>
          <tr><td>90 <b>quatre-vingt-dix</b></td><td>4 × 20 + 10 — then 91 quatre-vingt-onze… 99 quatre-vingt-dix-neuf</td></tr>
        </table>
        <p><b>Hundreds:</b> <span class="ex">cent</span> <span class="gloss-i">(100)</span>, <span class="ex">cent un</span> <span class="gloss-i">(101)</span>, <span class="ex">deux cents</span> <span class="gloss-i">(200)</span> — but the s disappears when a number follows: <span class="ex">deux cent un</span> <span class="gloss-i">(201)</span>. And 1000 is <span class="ex">mille</span>, always invariable.</p>
        <p class="tip">💡 Drill these until they're automatic: Practice → Numbers — hear-and-type-digits, or see-digits-and-write-the-French. The 70–100 range is where the points are scored.</p>`
    },
    {
      id: "etre-avoir",
      title: "The two giants: être & avoir",
      summary: "“to be” and “to have” — the most important verbs in French.",
      body: `
        <p>You'll use these constantly. Memorise them cold.</p>
        <div class="g-cols">
          <table class="g-table"><tr><th colspan="2">être — to be</th></tr>
            <tr><td>je suis</td><td>I am</td></tr><tr><td>tu es</td><td>you are</td></tr>
            <tr><td>il est</td><td>he is</td></tr><tr><td>nous sommes</td><td>we are</td></tr>
            <tr><td>vous êtes</td><td>you are</td></tr><tr><td>ils sont</td><td>they are</td></tr>
          </table>
          <table class="g-table"><tr><th colspan="2">avoir — to have</th></tr>
            <tr><td>j'ai</td><td>I have</td></tr><tr><td>tu as</td><td>you have</td></tr>
            <tr><td>il a</td><td>he has</td></tr><tr><td>nous avons</td><td>we have</td></tr>
            <tr><td>vous avez</td><td>you have</td></tr><tr><td>ils ont</td><td>they have</td></tr>
          </table>
        </div>
        <p class="tip">💡 French uses <b>avoir</b> for age: “J'ai vingt ans” = literally “I have twenty years”.</p>`
    },
    {
      id: "er-verbs",
      title: "Regular -ER verbs (present tense)",
      summary: "Most French verbs end in -er and follow one simple pattern.",
      body: `
        <p>About 90% of French verbs end in <b>-er</b>. Drop the <b>-er</b> and add these endings to the stem:</p>
        <table class="g-table"><tr><th colspan="2">parler — to speak</th></tr>
          <tr><td>je parl<b>e</b></td><td>I speak</td></tr>
          <tr><td>tu parl<b>es</b></td><td>you speak</td></tr>
          <tr><td>il parl<b>e</b></td><td>he speaks</td></tr>
          <tr><td>nous parl<b>ons</b></td><td>we speak</td></tr>
          <tr><td>vous parl<b>ez</b></td><td>you speak</td></tr>
          <tr><td>ils parl<b>ent</b></td><td>they speak</td></tr>
        </table>
        <p>The endings <b>-e, -es, -e, -ent</b> are all silent — they sound identical. Only <b>-ons</b> and <b>-ez</b> are pronounced.</p>
        <p class="tip">💡 Same pattern: aimer, habiter, travailler, manger, regarder, écouter… <span class="gloss-i">(to like, to live, to work, to eat, to watch, to listen)</span></p>`
    },
    {
      id: "negation",
      title: "Saying “not”: ne … pas",
      summary: "French wraps the verb in two pieces to make it negative.",
      body: `
        <p>To make a sentence negative, put <b>ne</b> before the verb and <b>pas</b> after it.</p>
        <p class="ex">Je <b>ne</b> parle <b>pas</b> français. — I don't speak French.</p>
        <p class="ex">Elle <b>n'</b>est <b>pas</b> ici. — She is not here. <span class="muted">(ne → n' before a vowel)</span></p>
        <p class="tip">💡 In casual speech French people often drop the “ne” — “Je sais pas” — but write it in full.</p>`
    },
    {
      id: "questions-grammar",
      title: "Asking questions",
      summary: "Three easy ways to turn a statement into a question.",
      body: `
        <p>Three common ways, from most casual to most formal:</p>
        <ol>
          <li><b>Intonation</b> — just raise your voice: <span class="ex">Tu parles français ?</span> <span class="gloss-i">(You speak French?)</span></li>
          <li><b>Est-ce que</b> — add it to the front: <span class="ex">Est-ce que tu parles français ?</span> <span class="gloss-i">(Do you speak French?)</span></li>
          <li><b>Inversion</b> — swap verb and pronoun: <span class="ex">Parles-tu français ?</span> <span class="gloss-i">(Do you speak French?)</span></li>
        </ol>
        <p>With question words: <span class="ex">Où est-ce que tu habites ?</span> <span class="gloss-i">(Where do you live?)</span> / <span class="ex">Comment allez-vous ?</span> <span class="gloss-i">(How are you?)</span></p>`
    },
    {
      id: "passe-compose",
      title: "Le passé composé — talking about the past",
      summary: "The everyday past tense: avoir/être + past participle.",
      body: `
        <p>To say what happened, French uses <b>avoir</b> (or sometimes <b>être</b>) + a <b>past participle</b>:</p>
        <p class="ex">J'ai mangé une pomme.</p> <span class="gloss-i">(I ate an apple.)</span>
        <p class="ex">Nous avons parlé français.</p> <span class="gloss-i">(We spoke French.)</span>
        <p>Making the participle: <b>-er → -é</b> (mangé), <b>-ir → -i</b> (fini), <b>-re → -u</b> (attendu). Common irregulars to memorise: eu <span class="gloss-i">(had)</span>, été <span class="gloss-i">(been)</span>, fait <span class="gloss-i">(done)</span>, pris <span class="gloss-i">(taken)</span>, vu <span class="gloss-i">(seen)</span>, bu <span class="gloss-i">(drunk)</span>.</p>
        <p>Movement & change verbs use <b>être</b> instead — and the participle agrees like an adjective:</p>
        <p class="ex">Je suis allé au marché.</p> <span class="gloss-i">(I went to the market — a woman writes: je suis allée.)</span>
        <p class="ex">Elle est partie à midi.</p> <span class="gloss-i">(She left at noon.)</span>
        <p class="tip">💡 The être club (a memorable core): aller, venir, arriver, partir, entrer, sortir, monter, descendre, rester, rentrer, tomber, naître, mourir.</p>`
    },
    {
      id: "aller-futur",
      title: "aller & the near future",
      summary: "Use “go” + a verb to talk about the future — just like English.",
      body: `
        <table class="g-table"><tr><th colspan="2">aller — to go</th></tr>
          <tr><td>je vais</td><td>I go</td></tr><tr><td>tu vas</td><td>you go</td></tr>
          <tr><td>il va</td><td>he goes</td></tr><tr><td>nous allons</td><td>we go</td></tr>
          <tr><td>vous allez</td><td>you go</td></tr><tr><td>ils vont</td><td>they go</td></tr>
        </table>
        <p>For things about to happen, use <b>aller + infinitive</b> (the “near future”):</p>
        <p class="ex">Je <b>vais manger</b>. — I'm going to eat.</p>
        <p class="ex">Nous <b>allons voyager</b> en France. — We're going to travel to France.</p>`
    }
  ],

  /* ---------------------------------------------------------------------
     CONJUGATION TABLES  (present tense) — used by the drill engine
     pronoun order: je, tu, il/elle, nous, vous, ils/elles
     --------------------------------------------------------------------- */
  verbs: [
    { inf: "être", en: "to be", group: "irregular", forms: ["suis", "es", "est", "sommes", "êtes", "sont"], elide: true },
    { inf: "avoir", en: "to have", group: "irregular", forms: ["ai", "as", "a", "avons", "avez", "ont"], elide: true },
    { inf: "aller", en: "to go", group: "irregular", forms: ["vais", "vas", "va", "allons", "allez", "vont"], elide: false },
    { inf: "faire", en: "to do / make", group: "irregular", forms: ["fais", "fais", "fait", "faisons", "faites", "font"], elide: false },
    { inf: "parler", en: "to speak", group: "-er", forms: ["parle", "parles", "parle", "parlons", "parlez", "parlent"], elide: true },
    { inf: "aimer", en: "to like / love", group: "-er", forms: ["aime", "aimes", "aime", "aimons", "aimez", "aiment"], elide: true },
    { inf: "habiter", en: "to live (reside)", group: "-er", forms: ["habite", "habites", "habite", "habitons", "habitez", "habitent"], elide: true },
    { inf: "manger", en: "to eat", group: "-er", forms: ["mange", "manges", "mange", "mangeons", "mangez", "mangent"], elide: true },
    { inf: "finir", en: "to finish", group: "-ir", forms: ["finis", "finis", "finit", "finissons", "finissez", "finissent"], elide: false },
    { inf: "attendre", en: "to wait", group: "-re", forms: ["attends", "attends", "attend", "attendons", "attendez", "attendent"], elide: true },
    { inf: "prendre", en: "to take", group: "irregular", forms: ["prends", "prends", "prend", "prenons", "prenez", "prennent"], elide: false },
    { inf: "vouloir", en: "to want", group: "irregular", forms: ["veux", "veux", "veut", "voulons", "voulez", "veulent"], elide: false },
    { inf: "pouvoir", en: "to be able to", group: "irregular", forms: ["peux", "peux", "peut", "pouvons", "pouvez", "peuvent"], elide: false },
    { inf: "venir", en: "to come", group: "irregular", forms: ["viens", "viens", "vient", "venons", "venez", "viennent"], elide: false },
    { inf: "boire", en: "to drink", group: "irregular", forms: ["bois", "bois", "boit", "buvons", "buvez", "boivent"], elide: false }
  ],

  /* ---------------------------------------------------------------------
     PHRASES — practical, grouped by situation
     --------------------------------------------------------------------- */
  phrases: [
    {
      id: "essentials",
      name: "Survival essentials",
      icon: "🛟",
      items: [
        { fr: "Je ne comprends pas.", en: "I don't understand." },
        { fr: "Pouvez-vous répéter, s'il vous plaît ?", en: "Can you repeat, please?" },
        { fr: "Parlez-vous anglais ?", en: "Do you speak English?" },
        { fr: "Je ne parle pas bien français.", en: "I don't speak French well." },
        { fr: "Comment dit-on … en français ?", en: "How do you say … in French?" },
        { fr: "Je suis désolé(e).", en: "I'm sorry." },
        { fr: "Où sont les toilettes ?", en: "Where is the bathroom?" },
        { fr: "Au secours !", en: "Help!" }
      ]
    },
    {
      id: "introductions",
      name: "Introducing yourself",
      icon: "🤝",
      items: [
        { fr: "Je m'appelle …", en: "My name is …" },
        { fr: "Comment vous appelez-vous ?", en: "What's your name? (formal)" },
        { fr: "Comment tu t'appelles ?", en: "What's your name? (informal)" },
        { fr: "Je viens du Canada.", en: "I'm from Canada." },
        { fr: "J'habite à …", en: "I live in …" },
        { fr: "Ravi de vous rencontrer.", en: "Pleased to meet you." },
        { fr: "J'apprends le français.", en: "I'm learning French." }
      ]
    },
    {
      id: "cafe",
      name: "At the café / restaurant",
      icon: "☕",
      items: [
        { fr: "Une table pour deux, s'il vous plaît.", en: "A table for two, please." },
        { fr: "Je voudrais un café.", en: "I would like a coffee." },
        { fr: "Qu'est-ce que vous recommandez ?", en: "What do you recommend?" },
        { fr: "C'est délicieux !", en: "It's delicious!" },
        { fr: "L'addition, s'il vous plaît.", en: "The bill, please." },
        { fr: "Je voudrais payer par carte.", en: "I'd like to pay by card." }
      ]
    },
    {
      id: "shopping",
      name: "Shopping & money",
      icon: "🛍️",
      items: [
        { fr: "Combien ça coûte ?", en: "How much does it cost?" },
        { fr: "C'est trop cher.", en: "It's too expensive." },
        { fr: "Je cherche …", en: "I'm looking for …" },
        { fr: "Avez-vous … ?", en: "Do you have … ?" },
        { fr: "Je vais le prendre.", en: "I'll take it." },
        { fr: "Juste un instant.", en: "Just a moment." }
      ]
    },
    {
      id: "directions",
      name: "Getting around",
      icon: "🗺️",
      items: [
        { fr: "Où est … ?", en: "Where is … ?" },
        { fr: "Je suis perdu(e).", en: "I'm lost." },
        { fr: "C'est loin d'ici ?", en: "Is it far from here?" },
        { fr: "Tournez à gauche.", en: "Turn left." },
        { fr: "Continuez tout droit.", en: "Keep going straight." },
        { fr: "À quelle heure part le train ?", en: "What time does the train leave?" }
      ]
    }
  ],

  /* ---------------------------------------------------------------------
     DIALOGUES — role-play scenes
     --------------------------------------------------------------------- */
  dialogues: [
    {
      id: "au-cafe",
      title: "Au café",
      scene: "Ordering a coffee and a croissant in a Paris café.",
      icon: "☕",
      lines: [
        { who: "Serveur", fr: "Bonjour ! Vous désirez ?", en: "Hello! What would you like?" },
        { who: "Vous", fr: "Bonjour. Un café, s'il vous plaît.", en: "Hello. A coffee, please." },
        { who: "Serveur", fr: "Très bien. Et avec ceci ?", en: "Very good. And with that?" },
        { who: "Vous", fr: "Un croissant aussi, s'il vous plaît.", en: "A croissant too, please." },
        { who: "Serveur", fr: "Parfait. Ça fait quatre euros.", en: "Perfect. That's four euros." },
        { who: "Vous", fr: "Voilà. Merci !", en: "Here you go. Thank you!" }
      ]
    },
    {
      id: "faire-connaissance",
      title: "Faire connaissance",
      scene: "Meeting someone new at a party.",
      icon: "🤝",
      lines: [
        { who: "Léa", fr: "Bonsoir ! Je m'appelle Léa. Et toi ?", en: "Good evening! My name is Léa. And you?" },
        { who: "Vous", fr: "Bonsoir Léa. Moi, c'est Alex. Enchanté.", en: "Good evening Léa. I'm Alex. Nice to meet you." },
        { who: "Léa", fr: "Enchantée ! Tu habites à Paris ?", en: "Nice to meet you! Do you live in Paris?" },
        { who: "Vous", fr: "Non, j'habite au Canada. Je suis en vacances.", en: "No, I live in Canada. I'm on holiday." },
        { who: "Léa", fr: "Super ! Tu parles très bien français.", en: "Great! You speak French very well." },
        { who: "Vous", fr: "Merci, c'est gentil. J'apprends !", en: "Thanks, that's kind. I'm learning!" }
      ]
    },
    {
      id: "demander-chemin",
      title: "Demander son chemin",
      scene: "Asking a stranger for directions to the station.",
      icon: "🧭",
      lines: [
        { who: "Vous", fr: "Excusez-moi, où est la gare ?", en: "Excuse me, where is the station?" },
        { who: "Passant", fr: "La gare ? Continuez tout droit.", en: "The station? Keep going straight." },
        { who: "Vous", fr: "C'est loin ?", en: "Is it far?" },
        { who: "Passant", fr: "Non, à cinq minutes. Puis tournez à droite.", en: "No, five minutes away. Then turn right." },
        { who: "Vous", fr: "Merci beaucoup !", en: "Thank you very much!" },
        { who: "Passant", fr: "Je vous en prie. Bonne journée !", en: "You're welcome. Have a good day!" }
      ]
    }
  ],

  /* ---------------------------------------------------------------------
     THE GUIDED PATH — ordered units that tie everything together.
     Each unit references decks / grammar / verbs / phrases / dialogue by id.
     --------------------------------------------------------------------- */
  path: [
    {
      id: "u1",
      title: "First Words",
      goal: "Greet people and be polite.",
      decks: ["greetings"],
      grammar: ["pronouns"],
      phrases: ["essentials"],
      verbs: [],
      dialogue: null
    },
    {
      id: "u2",
      title: "Who You Are",
      goal: "Introduce yourself and use être & avoir.",
      decks: ["family"],
      grammar: ["gender-articles", "le-la-les", "etre-avoir"],
      phrases: ["introductions"],
      verbs: ["être", "avoir"],
      dialogue: "faire-connaissance"
    },
    {
      id: "u3",
      title: "Numbers & Time",
      goal: "Count, tell time, and make plans.",
      decks: ["numbers", "time"],
      grammar: ["les-nombres", "questions-grammar"],
      phrases: [],
      verbs: [],
      dialogue: null
    },
    {
      id: "u4",
      title: "At the Café",
      goal: "Order food and drinks with confidence.",
      decks: ["food", "colors"],
      grammar: ["er-verbs"],
      phrases: ["cafe", "shopping"],
      verbs: ["parler", "aimer", "manger"],
      dialogue: "au-cafe"
    },
    {
      id: "u5",
      title: "Getting Around",
      goal: "Find your way and ask questions.",
      decks: ["travel", "questions"],
      grammar: ["negation", "aller-futur"],
      phrases: ["directions"],
      verbs: ["aller", "venir", "prendre"],
      dialogue: "demander-chemin"
    },
    {
      id: "u6",
      title: "Daily Life",
      goal: "Describe your home and surroundings.",
      decks: ["home", "adjectives"],
      grammar: [],
      phrases: [],
      verbs: ["faire", "vouloir", "pouvoir", "finir", "attendre", "boire", "habiter"],
      dialogue: null
    }
  ]
};

// Build quick lookup maps and a flat card index used by the SRS engine.
DATA.deckById = {};
DATA.cardIndex = [];      // every studyable item gets a stable id
DATA.grammarById = {};
DATA.verbByInf = {};
DATA.phrasesById = {};
DATA.dialogueById = {};

DATA.decks.forEach(deck => {
  DATA.deckById[deck.id] = deck;
  deck.cards.forEach((c, i) => {
    c.cid = deck.id + "::" + i;
    c.deckId = deck.id;
    DATA.cardIndex.push(c);
  });
});
DATA.grammar.forEach(g => { DATA.grammarById[g.id] = g; });
DATA.verbs.forEach(v => { DATA.verbByInf[v.inf] = v; });
DATA.phrases.forEach(p => { DATA.phrasesById[p.id] = p; });
DATA.dialogues.forEach(d => { DATA.dialogueById[d.id] = d; });

DATA.PRONOUNS = ["je", "tu", "il/elle", "nous", "vous", "ils/elles"];

/* ---------------------------------------------------------------------
   LEXICON — built-in A1 dictionary used to auto-correct class vocabulary.
   [french, gender(m/f/pl/""), english glosses (| separated), pos]
   pos: n=noun v=verb adj=adjective adv=adverb phr=phrase w=word
   --------------------------------------------------------------------- */
DATA.lexicon = [
  /* classroom & school */
  ["cahier","m","notebook|exercise book","n"], ["stylo","m","pen","n"], ["crayon","m","pencil","n"],
  ["gomme","f","eraser|rubber","n"], ["trousse","f","pencil case","n"], ["sac","m","bag","n"],
  ["sac à dos","m","backpack","n"], ["livre","m","book","n"], ["page","f","page","n"],
  ["papier","m","paper","n"], ["tableau","m","board|whiteboard|painting","n"], ["bureau","m","desk|office","n"],
  ["professeur","m","teacher|professor","n"], ["élève","","student|pupil","n"], ["étudiant","m","student","n"],
  ["étudiante","f","student","n"], ["devoir","m","homework|assignment","n"], ["leçon","f","lesson","n"],
  ["exercice","m","exercise","n"], ["question","f","question","n"], ["réponse","f","answer|reply","n"],
  ["mot","m","word","n"], ["phrase","f","sentence|phrase","n"], ["dictionnaire","m","dictionary","n"],
  ["examen","m","exam|test","n"], ["note","f","grade|mark|note","n"], ["classe","f","class|classroom","n"],
  ["cours","m","class|course|lesson","n"], ["salle","f","room","n"], ["salle de classe","f","classroom","n"],
  ["école","f","school","n"], ["université","f","university","n"], ["langue","f","language|tongue","n"],
  ["français","m","French","n"], ["anglais","m","English","n"],
  /* people & family */
  ["famille","f","family","n"], ["père","m","father|dad","n"], ["mère","f","mother|mom|mum","n"],
  ["frère","m","brother","n"], ["sœur","f","sister","n"], ["parents","pl","parents","n"],
  ["fils","m","son","n"], ["fille","f","daughter|girl","n"], ["mari","m","husband","n"],
  ["femme","f","wife|woman","n"], ["homme","m","man","n"], ["garçon","m","boy","n"],
  ["enfant","m","child|kid","n"], ["bébé","m","baby","n"], ["ami","m","friend","n"],
  ["amie","f","friend","n"], ["grand-père","m","grandfather|grandpa","n"], ["grand-mère","f","grandmother|grandma","n"],
  ["oncle","m","uncle","n"], ["tante","f","aunt","n"], ["cousin","m","cousin","n"],
  ["cousine","f","cousin","n"], ["gens","pl","people","n"], ["personne","f","person","n"],
  ["monsieur","m","sir|mister|gentleman","n"], ["madame","f","madam|ma'am|missus","n"], ["mademoiselle","f","miss","n"],
  ["voisin","m","neighbor|neighbour","n"], ["voisine","f","neighbor|neighbour","n"],
  /* food & drink */
  ["pain","m","bread","n"], ["baguette","f","baguette","n"], ["croissant","m","croissant","n"],
  ["fromage","m","cheese","n"], ["eau","f","water","n"], ["vin","m","wine","n"],
  ["café","m","coffee|café","n"], ["thé","m","tea","n"], ["lait","m","milk","n"],
  ["jus","m","juice","n"], ["jus d'orange","m","orange juice","n"], ["bière","f","beer","n"],
  ["boisson","f","drink|beverage","n"], ["pomme","f","apple","n"], ["banane","f","banana","n"],
  ["orange","f","orange","n"], ["fraise","f","strawberry","n"], ["citron","m","lemon","n"],
  ["poulet","m","chicken","n"], ["poisson","m","fish","n"], ["viande","f","meat","n"],
  ["légume","m","vegetable","n"], ["légumes","pl","vegetables","n"], ["fruit","m","fruit","n"],
  ["salade","f","salad|lettuce","n"], ["soupe","f","soup","n"], ["riz","m","rice","n"],
  ["pâtes","pl","pasta","n"], ["œuf","m","egg","n"], ["beurre","m","butter","n"],
  ["sucre","m","sugar","n"], ["sel","m","salt","n"], ["poivre","m","pepper","n"],
  ["gâteau","m","cake","n"], ["chocolat","m","chocolate","n"], ["glace","f","ice cream|ice|mirror","n"],
  ["dessert","m","dessert","n"], ["sandwich","m","sandwich","n"], ["petit-déjeuner","m","breakfast","n"],
  ["déjeuner","m","lunch","n"], ["dîner","m","dinner","n"], ["repas","m","meal","n"],
  ["addition","f","bill|check","n"], ["menu","m","menu|set menu","n"], ["carte","f","menu|card|map","n"],
  ["serveur","m","waiter|server","n"], ["serveuse","f","waitress|server","n"], ["restaurant","m","restaurant","n"],
  ["verre","m","glass","n"], ["tasse","f","cup","n"], ["assiette","f","plate","n"],
  ["fourchette","f","fork","n"], ["couteau","m","knife","n"], ["cuillère","f","spoon","n"],
  ["bouteille","f","bottle","n"], ["serviette","f","napkin|towel","n"],
  /* shopping & money */
  ["boulangerie","f","bakery","n"], ["marché","m","market","n"], ["supermarché","m","supermarket","n"],
  ["magasin","m","shop|store","n"], ["prix","m","price","n"], ["argent","m","money|silver","n"],
  ["euro","m","euro","n"], ["monnaie","f","change|currency","n"], ["cadeau","m","gift|present","n"],
  /* city & places */
  ["ville","f","city|town","n"], ["village","m","village","n"], ["rue","f","street","n"],
  ["avenue","f","avenue","n"], ["place","f","square|seat|place","n"], ["gare","f","train station|station","n"],
  ["aéroport","m","airport","n"], ["hôtel","m","hotel","n"], ["banque","f","bank","n"],
  ["poste","f","post office","n"], ["pharmacie","f","pharmacy|drugstore","n"], ["hôpital","m","hospital","n"],
  ["église","f","church","n"], ["musée","m","museum","n"], ["cinéma","m","cinema|movie theater","n"],
  ["théâtre","m","theater|theatre","n"], ["parc","m","park","n"], ["jardin","m","garden","n"],
  ["piscine","f","swimming pool|pool","n"], ["plage","f","beach","n"], ["mer","f","sea","n"],
  ["montagne","f","mountain","n"], ["campagne","f","countryside","n"], ["pays","m","country","n"],
  ["monde","m","world","n"], ["pont","m","bridge","n"], ["plan","m","map|plan","n"],
  /* transport & travel */
  ["train","m","train","n"], ["bus","m","bus","n"], ["métro","m","subway|metro|underground","n"],
  ["avion","m","plane|airplane","n"], ["voiture","f","car","n"], ["taxi","m","taxi|cab","n"],
  ["vélo","m","bike|bicycle","n"], ["bateau","m","boat|ship","n"], ["billet","m","ticket","n"],
  ["ticket","m","ticket","n"], ["voyage","m","trip|journey|travel","n"], ["valise","f","suitcase","n"],
  ["passeport","m","passport","n"], ["vacances","pl","vacation|holidays","n"],
  /* home */
  ["maison","f","house|home","n"], ["appartement","m","apartment|flat","n"], ["chambre","f","bedroom|room","n"],
  ["cuisine","f","kitchen|cooking","n"], ["salon","m","living room|lounge","n"], ["salle de bains","f","bathroom","n"],
  ["toilettes","pl","toilet|bathroom|restroom","n"], ["lit","m","bed","n"], ["canapé","m","sofa|couch","n"],
  ["douche","f","shower","n"], ["porte","f","door","n"], ["fenêtre","f","window","n"],
  ["table","f","table","n"], ["chaise","f","chair","n"], ["clé","f","key","n"],
  ["escalier","m","stairs|staircase","n"], ["ascenseur","m","elevator|lift","n"], ["étage","m","floor|storey","n"],
  ["mur","m","wall","n"], ["sol","m","floor|ground","n"], ["toit","m","roof","n"],
  ["lampe","f","lamp","n"], ["miroir","m","mirror","n"], ["frigo","m","fridge|refrigerator","n"],
  ["four","m","oven","n"], ["téléphone","m","phone|telephone","n"], ["portable","m","cell phone|mobile|laptop","n"],
  ["télévision","f","television|TV","n"], ["télé","f","TV|television","n"], ["radio","f","radio","n"],
  ["ordinateur","m","computer","n"], ["photo","f","photo|picture","n"],
  /* clothes */
  ["vêtement","m","garment|piece of clothing","n"], ["vêtements","pl","clothes|clothing","n"], ["pantalon","m","pants|trousers","n"],
  ["robe","f","dress","n"], ["jupe","f","skirt","n"], ["chemise","f","shirt","n"],
  ["tee-shirt","m","t-shirt|tee shirt","n"], ["pull","m","sweater|jumper|pullover","n"], ["manteau","m","coat","n"],
  ["veste","f","jacket","n"], ["chaussure","f","shoe","n"], ["chaussures","pl","shoes","n"],
  ["chaussette","f","sock","n"], ["chapeau","m","hat","n"], ["écharpe","f","scarf","n"],
  ["lunettes","pl","glasses|eyeglasses","n"], ["montre","f","watch|wristwatch","n"],
  /* body */
  ["tête","f","head","n"], ["cheveux","pl","hair","n"], ["yeux","pl","eyes","n"],
  ["œil","m","eye","n"], ["oreille","f","ear","n"], ["nez","m","nose","n"],
  ["bouche","f","mouth","n"], ["dent","f","tooth","n"], ["main","f","hand","n"],
  ["bras","m","arm","n"], ["jambe","f","leg","n"], ["pied","m","foot","n"],
  ["cœur","m","heart","n"], ["dos","m","back","n"], ["ventre","m","stomach|belly","n"],
  /* weather, time & seasons */
  ["temps","m","weather|time","n"], ["soleil","m","sun|sunshine","n"], ["pluie","f","rain","n"],
  ["neige","f","snow","n"], ["vent","m","wind","n"], ["nuage","m","cloud","n"],
  ["ciel","m","sky","n"], ["saison","f","season","n"], ["printemps","m","spring","n"],
  ["été","m","summer","n"], ["automne","m","autumn|fall","n"], ["hiver","m","winter","n"],
  ["jour","m","day","n"], ["journée","f","day|daytime","n"], ["nuit","f","night","n"],
  ["week-end","m","weekend","n"], ["heure","f","hour|time|o'clock","n"], ["minute","f","minute","n"],
  ["seconde","f","second","n"], ["moment","m","moment","n"], ["date","f","date","n"],
  ["anniversaire","m","birthday|anniversary","n"], ["fête","f","party|celebration|holiday","n"], ["Noël","m","Christmas","n"],
  /* work & professions */
  ["médecin","m","doctor|physician","n"], ["infirmier","m","nurse","n"], ["infirmière","f","nurse","n"],
  ["avocat","m","lawyer|avocado","n"], ["ingénieur","m","engineer","n"], ["boulanger","m","baker","n"],
  ["boulangère","f","baker","n"], ["vendeur","m","salesman|shop assistant|seller","n"], ["vendeuse","f","saleswoman|shop assistant","n"],
  ["cuisinier","m","cook|chef","n"], ["chanteur","m","singer","n"], ["chanteuse","f","singer","n"],
  ["acteur","m","actor","n"], ["actrice","f","actress","n"], ["journaliste","","journalist","n"],
  ["policier","m","police officer|policeman","n"], ["travail","m","work|job","n"], ["métier","m","job|profession|trade","n"],
  ["entreprise","f","company|business|firm","n"], ["réunion","f","meeting","n"], ["collègue","","colleague|coworker","n"],
  /* animals */
  ["chien","m","dog","n"], ["chat","m","cat","n"], ["oiseau","m","bird","n"],
  ["cheval","m","horse","n"], ["vache","f","cow","n"],
  /* common abstract */
  ["chose","f","thing","n"], ["vie","f","life","n"], ["amour","m","love","n"],
  ["nom","m","name|last name|noun","n"], ["prénom","m","first name","n"], ["âge","m","age","n"],
  ["adresse","f","address","n"], ["numéro","m","number","n"], ["nationalité","f","nationality","n"],
  ["musique","f","music","n"], ["chanson","f","song","n"], ["film","m","movie|film","n"],
  ["sport","m","sport|sports","n"], ["football","m","soccer|football","n"], ["tennis","m","tennis","n"],
  ["jeu","m","game","n"], ["histoire","f","story|history","n"], ["idée","f","idea","n"],
  ["problème","m","problem","n"], ["raison","f","reason","n"], ["weekend","m","weekend","n"],
  /* verbs */
  ["être","","to be","v"], ["avoir","","to have","v"], ["aller","","to go","v"],
  ["faire","","to do|to make","v"], ["parler","","to speak|to talk","v"], ["aimer","","to like|to love","v"],
  ["adorer","","to love|to adore","v"], ["détester","","to hate","v"], ["habiter","","to live|to reside","v"],
  ["manger","","to eat","v"], ["boire","","to drink","v"], ["prendre","","to take|to have (food)","v"],
  ["donner","","to give","v"], ["vouloir","","to want","v"], ["pouvoir","","to be able to|can","v"],
  ["devoir","","to have to|must","v"], ["savoir","","to know (facts)|to know how","v"], ["connaître","","to know (people/places)","v"],
  ["venir","","to come","v"], ["voir","","to see","v"], ["regarder","","to watch|to look at","v"],
  ["écouter","","to listen|to listen to","v"], ["entendre","","to hear","v"], ["dire","","to say|to tell","v"],
  ["lire","","to read","v"], ["écrire","","to write","v"], ["apprendre","","to learn","v"],
  ["comprendre","","to understand","v"], ["étudier","","to study","v"], ["travailler","","to work","v"],
  ["jouer","","to play","v"], ["acheter","","to buy","v"], ["payer","","to pay","v"],
  ["coûter","","to cost","v"], ["vendre","","to sell","v"], ["chercher","","to look for|to search","v"],
  ["trouver","","to find","v"], ["penser","","to think","v"], ["croire","","to believe","v"],
  ["aider","","to help","v"], ["ouvrir","","to open","v"], ["fermer","","to close|to shut","v"],
  ["commencer","","to start|to begin","v"], ["finir","","to finish|to end","v"], ["arriver","","to arrive|to happen","v"],
  ["partir","","to leave|to depart","v"], ["rester","","to stay|to remain","v"], ["rentrer","","to go home|to return","v"],
  ["sortir","","to go out|to exit","v"], ["entrer","","to enter|to come in","v"], ["monter","","to go up|to climb","v"],
  ["descendre","","to go down","v"], ["marcher","","to walk|to work (function)","v"], ["courir","","to run","v"],
  ["dormir","","to sleep","v"], ["se lever","","to get up","v"], ["se coucher","","to go to bed","v"],
  ["s'appeler","","to be called|to be named","v"], ["attendre","","to wait|to wait for","v"], ["demander","","to ask|to ask for","v"],
  ["répondre","","to answer|to reply","v"], ["répéter","","to repeat","v"], ["oublier","","to forget","v"],
  ["visiter","","to visit (a place)","v"], ["voyager","","to travel","v"], ["porter","","to wear|to carry","v"],
  ["mettre","","to put|to put on","v"], ["préférer","","to prefer","v"], ["choisir","","to choose","v"],
  ["essayer","","to try|to try on","v"], ["appeler","","to call","v"], ["téléphoner","","to phone|to call","v"],
  ["envoyer","","to send","v"], ["recevoir","","to receive|to get","v"], ["offrir","","to offer|to give (a gift)","v"],
  ["inviter","","to invite","v"], ["rencontrer","","to meet","v"], ["présenter","","to introduce|to present","v"],
  ["danser","","to dance","v"], ["chanter","","to sing","v"], ["nager","","to swim","v"],
  ["cuisiner","","to cook","v"], ["goûter","","to taste","v"],
  /* adjectives */
  ["grand","","big|tall|large","adj"], ["petit","","small|little|short","adj"], ["bon","","good","adj"],
  ["mauvais","","bad","adj"], ["beau","","beautiful|handsome","adj"], ["joli","","pretty|nice","adj"],
  ["nouveau","","new","adj"], ["vieux","","old","adj"], ["jeune","","young","adj"],
  ["chaud","","hot|warm","adj"], ["froid","","cold","adj"], ["facile","","easy","adj"],
  ["difficile","","difficult|hard","adj"], ["cher","","expensive|dear","adj"], ["gratuit","","free (no cost)","adj"],
  ["rapide","","fast|quick","adj"], ["lent","","slow","adj"], ["content","","happy|glad|pleased","adj"],
  ["heureux","","happy","adj"], ["triste","","sad","adj"], ["fatigué","","tired","adj"],
  ["malade","","sick|ill","adj"], ["occupé","","busy","adj"], ["libre","","free|available","adj"],
  ["ouvert","","open","adj"], ["fermé","","closed|shut","adj"], ["gentil","","kind|nice","adj"],
  ["sympa","","nice|friendly","adj"], ["intéressant","","interesting","adj"], ["ennuyeux","","boring","adj"],
  ["important","","important","adj"], ["possible","","possible","adj"], ["vrai","","true|real","adj"],
  ["faux","","false|wrong|fake","adj"], ["long","","long","adj"], ["court","","short","adj"],
  ["fort","","strong|loud","adj"], ["faible","","weak","adj"], ["propre","","clean|own","adj"],
  ["sale","","dirty","adj"], ["plein","","full","adj"], ["vide","","empty","adj"],
  ["riche","","rich","adj"], ["pauvre","","poor","adj"], ["délicieux","","delicious","adj"],
  ["magnifique","","magnificent|wonderful|gorgeous","adj"], ["super","","great|super","adj"], ["prêt","","ready","adj"],
  /* adverbs & little words */
  ["aujourd'hui","","today","adv"], ["demain","","tomorrow","adv"], ["hier","","yesterday","adv"],
  ["maintenant","","now","adv"], ["toujours","","always|still","adv"], ["souvent","","often","adv"],
  ["parfois","","sometimes","adv"], ["jamais","","never","adv"], ["ici","","here","adv"],
  ["là","","there|here","adv"], ["là-bas","","over there","adv"], ["beaucoup","","a lot|much|many","adv"],
  ["un peu","","a little|a bit","adv"], ["très","","very","adv"], ["trop","","too|too much","adv"],
  ["aussi","","also|too|as well","adv"], ["encore","","again|still|more","adv"], ["déjà","","already","adv"],
  ["bien","","well|good","adv"], ["mal","","badly|poorly","adv"], ["vite","","quickly|fast","adv"],
  ["ensemble","","together","adv"], ["seul","","alone|only","adj"], ["peut-être","","maybe|perhaps","adv"],
  /* greetings & phrases */
  ["bonjour","","hello|good morning|good day","phr"], ["bonsoir","","good evening","phr"], ["bonne nuit","","good night","phr"],
  ["salut","","hi|hey|bye","phr"], ["au revoir","","goodbye|bye","phr"], ["à bientôt","","see you soon","phr"],
  ["à demain","","see you tomorrow","phr"], ["à tout à l'heure","","see you later","phr"], ["merci","","thank you|thanks","phr"],
  ["merci beaucoup","","thank you very much|thanks a lot","phr"], ["de rien","","you're welcome","phr"], ["s'il vous plaît","","please (formal)","phr"],
  ["s'il te plaît","","please (informal)","phr"], ["pardon","","sorry|excuse me|pardon","phr"], ["excusez-moi","","excuse me","phr"],
  ["désolé","","sorry","adj"], ["oui","","yes","w"], ["non","","no","w"],
  ["d'accord","","okay|OK|agreed|all right","phr"], ["bienvenue","","welcome","phr"], ["enchanté","","nice to meet you|delighted","phr"],
  ["ça va","","how's it going|I'm fine|it's okay","phr"], ["comment ça va","","how's it going|how are you","phr"], ["je m'appelle","","my name is|I am called","phr"],
  ["bonne journée","","have a good day","phr"], ["bonne soirée","","have a good evening","phr"], ["bon appétit","","enjoy your meal","phr"],
  ["bonne chance","","good luck","phr"], ["félicitations","","congratulations","phr"], ["à table","","dinner's ready|time to eat","phr"],
  ["tout droit","","straight ahead|straight on","phr"], ["à gauche","","to the left|on the left","phr"], ["à droite","","to the right|on the right","phr"],
  ["en retard","","late","phr"], ["à l'heure","","on time","phr"], ["chez moi","","at my place|at home","phr"],
  ["bien sûr","","of course","phr"], ["pas de problème","","no problem","phr"], ["quelque chose","","something","phr"],
  ["quelqu'un","","someone|somebody","phr"], ["tout le monde","","everyone|everybody","phr"], ["il y a","","there is|there are","phr"],
  ["qu'est-ce que c'est","","what is it|what is this","phr"], ["combien ça coûte","","how much does it cost","phr"], ["comment","","how|what","w"],
  ["pourquoi","","why","w"], ["quand","","when","w"], ["où","","where","w"],
  ["qui","","who","w"], ["quoi","","what","w"], ["parce que","","because","phr"],
  ["avec","","with","w"], ["sans","","without","w"], ["pour","","for|to|in order to","w"],
  ["dans","","in|inside","w"], ["sur","","on|on top of","w"], ["sous","","under|beneath","w"],
  ["devant","","in front of","w"], ["derrière","","behind","w"], ["entre","","between","w"],
  ["à côté de","","next to|beside","phr"], ["près de","","near|close to","phr"], ["loin de","","far from","phr"],
  ["avant","","before","w"], ["après","","after|afterwards","w"], ["pendant","","during|for","w"],
  ["mais","","but","w"], ["et","","and","w"], ["ou","","or","w"],
  ["donc","","so|therefore","w"], ["alors","","so|then|well","w"]
];
