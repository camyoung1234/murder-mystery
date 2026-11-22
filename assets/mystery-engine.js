/* ============================================================================
   THE LAST CHIME OF RAVENSHOLLOW — BALANCED 260-VARIATION MYSTERY ENGINE
   Shared across Companion App, Printable Sheets & Variation Generator Script.
   Supports 8-20 players with 20 balanced variations per player count (260
   total variations), giving every character (#1-#20) equal probability of
   being the Killer or an Accomplice at every player count.
   ============================================================================ */

(function (global) {
  "use strict";

  // Base 20 Characters (Innocent defaults)
  const BASE_CHARACTERS = [
    {
      id: 1, name: "Lady Evelyn Vance", role: "Arthur's Disinherited Niece", initials: "E.V.",
      persona: "Sharp-tongued, glamorous heiress. At 8:30 PM, you had a furious public argument with Arthur about being disinherited and shouted, 'You'll regret this before nine!'",
      secret: "At 8:50 PM, you snuck along the Upstairs Gallery to eavesdrop outside the Study door and heard TOTAL SILENCE inside—not a sound until Arthur's voice boomed at 8:55 PM!",
      clue: "Two days ago, you heard Arthur recording that exact angry phrase ('You've gone too far! I'm calling the police as soon as the lines are back!') onto a blank brass phonograph cylinder for his memoirs.",
      detention: "Searched from Lady Evelyn's Clutch: A crumpled furious letter ('I won't let you ruin this family tonight'), PLUS a note in Evelyn's hand: '8:50 PM — Stood in the Upstairs Gallery outside Arthur's Study door. Complete silence inside until 8:55 PM.'",
      ledger2008: "Director of Vance Charity Gala Fund (2006–2008)",
      scandalTitle: "2008 Vance Charity Endowment — Embezzlement Audit",
      scandalDetail: "$2.4M diverted from children's hospital endowment; ledger forged",
      deliveryItem: "monogrammed silver throat-lozenge tin",
      accomplices: [6, 14, 18]
    },
    {
      id: 2, name: "Clara Sterling", role: "Arthur's Estate Attorney", initials: "C.S.",
      persona: "Composed, razor-sharp attorney retained since 2005. You drafted Arthur's New Will and serve as the room's anchor for facts and timelines.",
      secret: "You advised Arthur AGAINST publishing Archive Box #4 (the 2008 transparency audit) in his New Will because you knew it would put a target on his back.",
      clue: "Arthur's New Will specifically mandated releasing Archive Box #4 from 2008. The 2008 Dossier Ledger and Arthur's Horologist Journal in that archive will prove who had 2008 access and whether his watch ever lost time.",
      detention: "Searched from Clara's Briefcase: A confidential memo from Arthur dated yesterday: 'Clara — Do NOT remove the 2008 Archive Box #4 clause. Eighteen years of silence ends tonight.'",
      ledger2008: "Lead Trust Counsel, Vance Legal Holdings (2005–present)",
      scandalTitle: "2008 Offshore Escrow — Forged Beneficiary Deed",
      scandalDetail: "Trust signature forged to liquidate a partner's estate in Nov 2008",
      deliveryItem: "wax-sealed private digestif vial",
      accomplices: [5, 14, 18]
    },
    {
      id: 3, name: "Thomas Graves", role: "Head Butler (Hired 1999)", initials: "T.G.",
      persona: "Dignified, observant butler who notices everything and speaks quietly. You have served Ravenshollow Manor since 1999.",
      secret: "You skimmed small sums from the wine cellar budget for your sister's medical bills (making you nervous about wine questions), though you are innocent of murder.",
      clue: "At 8:40 PM you poured a piping-hot cup of chamomile tea in the Study—by 9:02 PM the untouched cup was barely lukewarm. You also saw Arthur's watch smashed at 8:48 PM.",
      detention: "Searched from Graves's Coat Pocket: Tonight's butler log: '8:40 PM — Poured hot cup of chamomile tea in Study. 9:02 PM — Cup untouched and barely lukewarm; watch crystal smashed at 8:48 PM.'",
      ledger2008: "Estate Steward & Keyholder, Ravenshollow (1999–present)",
      scandalTitle: "2008 Estate Insurance — Staged Clock Vault Theft",
      scandalDetail: "Priceless 18th-century chronometers vanished; security log falsified",
      deliveryItem: "silver-foil evening mint wafer",
      accomplices: [6, 14, 18]
    },
    {
      id: 4, name: "Dr. Julian Mercer", role: "Arthur's Personal Physician", initials: "J.M.",
      persona: "Calm, composed physician who has looked after Arthur's health for years.",
      secret: "You quietly wrote Arthur an off-the-books prescription for severe insomnia last month against hospital guidelines—embarrassing, not lethal.",
      clue: "You know Arthur's heart was stable at dinner and that fast-acting Aconite is completely odorless—unlike cyanide's bitter-almond smell.",
      detention: "Searched from Dr. Mercer's Medical Bag: A leather vial case with 6 sealed Heart Tonic vials (all intact) and an off-the-books insomnia prescription for Lord Arthur.",
      ledger2008: "Chief Resident, St. Jude's Clinic (2006–2008); retained 2009",
      scandalTitle: "2008 St. Jude's Clinic — Surgical Pump Trial",
      scandalDetail: "Patient fatality (Nov 2008); Calibration Log 08-B deliberately FALSIFIED",
      deliveryItem: "nightly 8:45 PM sealed amber Heart Tonic vial",
      accomplices: [6, 14, 18]
    },
    {
      id: 5, name: "Victor Vance", role: "Debt-Ridden Nephew", initials: "V.V.",
      persona: "Charming, desperate nephew who owes $400,000 to dangerous creditors and desperately needed Arthur's inheritance.",
      secret: "At 7:58 PM, you snuck into the Dining & Sideboard and put CHLORAL HYDRATE (non-lethal sleeping powder) into Arthur's 1998 Bordeaux wine decanter before a glass was carried up to his Study, then slipped into the Study around 8:05 PM to locate the New Will! Exhibit F proves he never drank the wine.",
      clue: "Once Exhibit F drops in Act III, confess to the sleeping powder so the room stops wasting votes on you and hunts the real killer!",
      detention: "Searched from Victor's Jacket Pocket: A folded white paper packet labeled 'Chloral Hydrate (Sleep Aid)' and a crumpled $400,000 gambling IOU due tomorrow morning.",
      ledger2008: "Junior Commodities Broker, Vance Capital (2007–2008)",
      scandalTitle: "2008 Vance Capital — Ponzi Margin Cover-Up",
      scandalDetail: "Client pension funds wiped out; trading ledger deliberately FALSIFIED",
      deliveryItem: "vintage cognac tasting flask",
      accomplices: [6, 14, 18]
    },
    {
      id: 6, name: "Jasper Moore", role: "Chief Engineer (Hired 2012)", initials: "J.M.",
      persona: "Intense Chief Engineer who maintains the manor's backup generator and knows the Chronos Automaton inside and out.",
      secret: "You have been secretly selling Vance Precision clockwork blueprints to a rival tech CEO—you were in the basement hallway at 8:50 PM hiding a schematic tube!",
      clue: "You know the manor's backup generator breaker can only be cut manually from the basement Generator Room—the storm did NOT cause a clean 15-second blackout.",
      detention: "Searched from Jasper's Tool Roll: A rolled-up Vance Precision gear blueprint tucked inside a brass tube with a note: 'Wire $150k upon delivery.' (Corporate espionage, not murder!)",
      ledger2008: "Vance Precision Intern & Lab Assistant (Summer 2008); hired full-time 2012",
      scandalTitle: "2008 Lab Safety — Sabotaged Prototype Test",
      scandalDetail: "High-pressure test rig failure; safety inspection log FALSIFIED",
      deliveryItem: "brass-capped flask of black workshop coffee",
      accomplices: [4, 14, 18]
    },
    {
      id: 7, name: "Celeste Moreau", role: "Rival Master Horologist", initials: "C.M.",
      persona: "Brilliant, fiercely proud master clockmaker and Arthur's former fiancée (he stole your escapement design 30 years ago). Invited to appraise the Chronos Automaton.",
      secret: "At 8:20 PM, you snuck upstairs to peek at the Automaton and saw a figure in a dark coat slip silently out of Arthur's Study carrying a small dark case.",
      clue: "You know the Chronos Automaton can be programmed to play a pre-recorded brass cylinder at 8:55 PM AND drop its 5-lb counterweight at 9:00 PM—proving Arthur could have died BEFORE 8:55!",
      detention: "Searched from Celeste's Handbag: A 30-year-old patent blueprint signed 'C. Moreau' ('He stole my life's work') PLUS a sketch showing the Automaton's timer gear can be set 60 minutes ahead.",
      ledger2008: "Master Appraiser, Geneva Horology Guild (2008)",
      scandalTitle: "2008 Geneva Auction — Counterfeit Breguet Fraud",
      scandalDetail: "Authenticated a $3M forged pocket watch; provenance certificate FALSIFIED",
      deliveryItem: "antique Parisian herbal breath pastille",
      accomplices: [6, 14, 18]
    },
    {
      id: 8, name: "Harriet Vance-Cole", role: "Arthur's Sister & Retired Magistrate", initials: "H.V.",
      persona: "Sharp-eyed retired magistrate estranged from Arthur because you suspected he covered up something rotten back in 2008.",
      secret: "You brought a miniature field chemistry kit in your coat and use it between Acts II and III to produce Exhibit F (testing the wine vs. Arthur's cuff).",
      clue: "You did a headcount in the Grand Hall at 9:00 PM and noticed someone was missing during the blackout.",
      detention: "Searched from Harriet's Coat: A retired magistrate's badge, a miniature chemistry testing kit, and a note from Arthur: 'Harriet — Tonight I am finally exposing the 2008 cover-up. Watch those I trust most.'",
      ledger2008: "County Magistrate, Coastal District (2004–2008)",
      scandalTitle: "2008 Judicial Inquiry — Sealed Bribery Docket",
      scandalDetail: "Key evidence suppressed in a 2008 wrongful-death inquest; docket FALSIFIED",
      deliveryItem: "private medicinal bitters flask",
      accomplices: [6, 14, 18]
    },
    {
      id: 9, name: "Chef Henri Laurent", role: "Head Chef of Ravenshollow Manor", initials: "H.L.",
      persona: "Dramatic, fiercely proud head chef—offended anyone would suggest Arthur was poisoned by your food or wine!",
      secret: "At 7:58 PM in the Dining & Sideboard, you saw someone hovering nervously over the opened 1998 Bordeaux decanter with a tiny white paper packet.",
      clue: "You decanted the Bordeaux in the Dining & Sideboard at 7:45 PM (zero almond scent, zero cyanide in your kitchen) and brewed Arthur's single cup of chamomile tea at a rolling boil at 8:38 PM.",
      detention: "Searched from Chef Henri's Apron: Kitchen inventory sheet signed 7:45 PM confirming the Bordeaux decanter on the Dining & Sideboard was pristine, plus an angry note about someone near the wine at 7:58 PM.",
      ledger2008: "Executive Chef, Le Chronomètre Paris (2006–2008)",
      scandalTitle: "2008 Paris Kitchen — Fatal Allergen Cover-Up",
      scandalDetail: "VIP guest fatality hushed up by Arthur Vance; supplier log FALSIFIED",
      deliveryItem: "signature dark-chocolate truffle",
      accomplices: [6, 14, 18]
    },
    {
      id: 10, name: "Margot Bell", role: "Undercover Investigative Journalist", initials: "M.B.",
      persona: "Sharp Boston Chronicle reporter who secretly crashed the gala posing as a guest's plus-one to investigate Arthur's 2008 cover-up.",
      secret: "You paid your way onto the guest list under a fake name to hunt for Archive Box #4 in the manor Library.",
      clue: "You carry a 2008 newspaper clipping confirming Archive Box #4 implicates someone who held direct 2008 access in Exhibit E—NOT someone cleared of 2008 access!",
      detention: "Searched from Margot's Bag: A Boston Chronicle press pass and a 2008 clipping noting the Archive Box #4 cover-up was buried by Arthur Vance in November 2008.",
      ledger2008: "Investigative Reporter, Boston Chronicle (2007–2008)",
      scandalTitle: "2008 Blackmail Payout — Suppressed Exposé",
      scandalDetail: "Accepted $500k hush money to bury a fatal corporate scandal; source log FALSIFIED",
      deliveryItem: "spiced espresso demitasse",
      accomplices: [6, 14, 18]
    },
    {
      id: 11, name: "Sebastian Cole", role: "Fine Art & Antique Appraiser", initials: "S.C.",
      persona: "Suave antique appraiser with a suspicious habit of disappearing into side rooms.",
      secret: "Drowning in auction debt, you snuck into the upstairs gallery at 8:45 PM to swap a priceless Fabergé clock with a replica! You're an art thief, NOT a killer.",
      clue: "At 8:48 PM, while hiding behind a curtain in the upstairs gallery, you heard a heavy muffled THUMP inside Arthur's locked Study—followed by dead silence!",
      detention: "Searched from Sebastian's Coat: A counterfeit brass Fabergé clock wrapped in velvet and a pawnshop receipt. (Art thief, NOT a murderer!)",
      ledger2008: "Senior Authenticator, Sotheby's Clock Desk (2006–2008)",
      scandalTitle: "2008 Auction Ring — Stolen Estate Heirlooms",
      scandalDetail: "Swapped three museum timepieces with replicas; provenance log FALSIFIED",
      deliveryItem: "antique gilded snuff & mint box",
      accomplices: [6, 14, 18]
    },
    {
      id: 12, name: "Lydia Vance", role: "Victor's Calculating Wife", initials: "L.V.",
      persona: "Icy, ambitious, and furious with Victor for gambling away your savings.",
      secret: "At 8:35 PM near the basement stairs, you overheard two people whispering furiously: 'Fifteen seconds of dark at nine sharp, or your secret goes to the police!'",
      clue: "You know for a fact that the 9:00 PM blackout was a deliberate blackmail job—NOT a storm surge!",
      detention: "Searched from Lydia's Purse: Signed divorce papers naming Victor's $400k debt, plus a cocktail napkin note: '8:35 PM basement stairs — overheard: 15 seconds of dark at 9 sharp or secret goes to police.'",
      ledger2008: "Corporate Accountant, Vance Holdings (2006–2008)",
      scandalTitle: "2008 Tax Shelter — Embezzled Dividend Ledger",
      scandalDetail: "$1.8M siphoned into Cayman accounts; audit sheet FALSIFIED",
      deliveryItem: "chilled champagne flute",
      accomplices: [6, 14, 18]
    },
    {
      id: 13, name: "Father Silas Ward", role: "Local Parish Priest & Confessor", initials: "S.W.",
      persona: "Gentle, solemn parish priest who has been Arthur Vance's spiritual confessor for twenty years.",
      secret: "Last Tuesday, Arthur confessed he had spent eighteen years 'shielding a guilty soul from a 2008 sin.' Bound by the Seal of Confession, you speak in pointed truths.",
      clue: "You know Arthur's New Will was his final act of penance to expose the true culprit from 2008.",
      detention: "Searched from Father Silas's Breviary: A Nov 14 bookmark in Arthur's hand: 'Father, pray for me. On the 19th I am ending eighteen years of silence about Archive Box #4.'",
      ledger2008: "Parish Treasurer, St. Jude's Coastal Parish (2005–2008)",
      scandalTitle: "2008 Parish Relief Fund — Missing Disaster Aid",
      scandalDetail: "Storm-relief donations vanished; parish accounting ledger FALSIFIED",
      deliveryItem: "blessed herbal cordial vial",
      accomplices: [6, 14, 18]
    },
    {
      id: 14, name: "Damien Cross", role: "Security Consultant & Corporate Fixer", initials: "D.C.",
      persona: "Tough, cynical head of security who knows every corridor, lock, and blind spot in Ravenshollow Manor.",
      secret: "You were paid years ago to bury corporate PR headaches for Arthur—and you're terrified of federal subpoenas.",
      clue: "You inspected the Study door at 9:01 PM and confirmed the steel deadbolt was genuinely thrown from the inside—meaning the poison entered the room WITH Arthur at 8:45 PM.",
      detention: "Searched from Damien's Jacket: A security log confirming the Study deadbolt was bolted from inside, plus an old NDA from Vance Precision.",
      ledger2008: "Private Investigator & Fixer, Cross Security (2006–2008)",
      scandalTitle: "2008 Witness Intimidation — Buried Police Report",
      scandalDetail: "Key whistleblower silenced with threats; incident report FALSIFIED",
      deliveryItem: "steel pocket flask of aged scotch",
      accomplices: [6, 12, 18]
    },
    {
      id: 15, name: "Beatrice (Bea) Holloway", role: "Head Housekeeper", initials: "B.H.",
      persona: "Brisk, sharp-eyed housekeeper who notices everything dropped in a bin or tossed down the laundry chute.",
      secret: "At 9:04 PM, minutes after the Study door was broken open, you heard something drop down the laundry chute—someone hastily ditched evidence from the Study!",
      clue: "The upstairs laundry chute is in the second-floor hall near the Grand Staircase and drops straight into the basement Laundry Room.",
      detention: "Searched from Bea's Apron Pocket: A crumpled linen handkerchief with faint botanical residue pulled from the basement laundry bin beneath the chute at 9:04 PM!",
      ledger2008: "Estate Housekeeper & Domestic Bookkeeper (2004–2008)",
      scandalTitle: "2008 Domestic Payroll — Ghost Employee Fraud",
      scandalDetail: "Over $900k billed to fictitious staff accounts; payroll ledger FALSIFIED",
      deliveryItem: "nightly bedside peppermint infusion",
      accomplices: [6, 14, 18]
    },
    {
      id: 16, name: "Gideon Thorne", role: "Rival Tech CEO (Thorne Robotics)", initials: "G.T.",
      persona: "Slick, ruthless business rival invited tonight so Arthur could gloat over the Chronos Automaton.",
      secret: "You are trying to buy stolen Vance Precision schematics on the sly—corporate espionage, NOT murder!",
      clue: "At 8:38 PM, you overheard someone panicked in the hall muttering that they were being blackmailed into cutting the manor's power at 9:00 PM sharp!",
      detention: "Searched from Gideon's Briefcase: A $150,000 cashier's check for 'consulting services' and a note: '8:38 PM — Blackout at 9:00 PM was forced by blackmail!'",
      ledger2008: "VP of Engineering, Vance Precision (2005–2008)",
      scandalTitle: "2008 Patent Espionage — Stolen Defense Blueprints",
      scandalDetail: "Sold classified naval chronometer specs abroad; export log FALSIFIED",
      deliveryItem: "celebratory Cuban cigar",
      accomplices: [6, 14, 18]
    },
    {
      id: 17, name: "Vivienne Sterling", role: "Clara's Junior Law Associate", initials: "V.S.",
      persona: "Meticulous, ambitious junior attorney who personally typed up Arthur's New Will this afternoon.",
      secret: "You secretly copied the corporate restructuring pages onto a thumb drive to shop to a rival firm—shady ambition, NOT murder.",
      clue: "At 4:00 PM today in the Library, you caught someone alone reading Page 14 (the 2008 Archive Box #4 clause) of the New Will—they went pale as a ghost!",
      detention: "Searched from Vivienne's Portfolio: A 4:00 PM legal sticky note: 'Caught someone alone reading Page 14 (2008 Archive Box #4 clause) of the New Will in the Library. They looked terrified.'",
      ledger2008: "Legal Clerk, Sterling & Vance (2008)",
      scandalTitle: "2008 Evidence Tampering — Altered Deposition",
      scandalDetail: "Swapped sworn testimony pages in a liability suit; filing log FALSIFIED",
      deliveryItem: "gilded tin of French anise mints",
      accomplices: [6, 14, 18]
    },
    {
      id: 18, name: "Nadia Vance", role: "Pharmacology Researcher & Cousin", initials: "N.V.",
      persona: "Brilliant pharmacology researcher whose doctoral fellowship is funded by the Vance family trust.",
      secret: "You borrowed rare botanical specimens from the university conservatory for an unauthorized thesis experiment—academic misconduct, NOT murder.",
      clue: "As a pharmacology researcher, you know concentrated Aconite is completely odorless and fatal within 2–3 minutes—totally different from bitter-almond cyanide!",
      detention: "Searched from Nadia's Clutch: Lab notes comparing Chloral Hydrate (non-lethal sedative) vs. Aconite (odorless, fatal in 2–3 minutes).",
      ledger2008: "Vance Junior Lab Fellow (2008)",
      scandalTitle: "2008 Lab Grant — Fabricated Clinical Dataset",
      scandalDetail: "Falsified toxicology data to secure a $2M fellowship grant; log FALSIFIED",
      deliveryItem: "custom botanical sleep-tincture dropper",
      accomplices: [6, 14, 16]
    },
    {
      id: 19, name: "Capt. Roderick Hale", role: "Coastal Harbormaster", initials: "R.H.",
      persona: "Booming, weathered retired naval navigator stranded at the manor by the washed-out bridge.",
      secret: "You're obsessed with precision timekeeping—at 8:55 PM you checked your U.S. Naval Observatory chronometer against the manor's Grand Clock (dead-on to the second).",
      clue: "Yesterday afternoon at the pier, you synced your naval chronometer with Arthur's pocket watch! Arthur's watch did NOT run 12 minutes slow—whoever claimed that in Act I was LYING!",
      detention: "Searched from Capt. Hale's Pea Coat: A brass U.S. Naval Observatory chronometer and harbor log: '14:00 — Synchronized with Arthur Vance. His gold pocket watch is accurate to ±0.1 sec.'",
      ledger2008: "Port Inspector, Coastal Maritime Authority (2005–2008)",
      scandalTitle: "2008 Smuggling Manifest — Fatal Cargo Cover-Up",
      scandalDetail: "Cleared an overloaded vessel that sank in a storm; manifest FALSIFIED",
      deliveryItem: "navy-strength rum dram in a pewter cup",
      accomplices: [6, 14, 18]
    },
    {
      id: 20, name: "Alistair Finch", role: "Arthur's Eccentric Biographer", initials: "A.F.",
      persona: "Theatrical, scatterbrained ghostwriter living at the manor for two months to write Arthur's tell-all memoirs.",
      secret: "Arthur fired you yesterday for peeking at his sealed Archive Box #4 (making you look bitter!), though you are innocent of murder.",
      clue: "Two days ago, you helped Arthur record Chapter 12 of his memoirs onto a blank brass cylinder—word-for-word: 'You've gone too far! I'm calling the police as soon as the lines are back!'",
      detention: "Searched from Alistair's Notebook: Nov 17 shorthand notes: 'Recorded Arthur's Ch. 12 quote onto brass cylinder (You've gone too far! I'm calling the police!). Subject: 2008 Archive Box #4 cover-up.'",
      ledger2008: "Ghostwriter & Archivist, Vance Press (2007–2008)",
      scandalTitle: "2008 Plagiarism & Libel — Forged Historical Letters",
      scandalDetail: "Forged rare horologist manuscripts sold for $1.2M; archive log FALSIFIED",
      deliveryItem: "honey-lemon throat pastille",
      accomplices: [6, 14, 18]
    }
  ];

  // Reversible scrambling for Case Codes (RV-XXXX)
  // 2713 * 4937 = 13,394,081 === 1 (mod 10000)
  const MUL = 2713;
  const INV = 4937;
  const ADD = 3187;

  function encodeCaseCode(killerId, salt) {
    const k = Math.max(1, Math.min(20, parseInt(killerId, 10) || 4));
    const s = (typeof salt === "number") ? (salt % 500) : Math.floor(Math.random() * 500);
    const plain = s * 20 + (k - 1); // 0..9999
    const scrambled = (plain * MUL + ADD) % 10000;
    return "RV-" + String(scrambled).padStart(4, "0");
  }

  function decodeCaseCode(code) {
    const clean = String(code || "").toUpperCase().replace(/[^0-9]/g, "");
    if (clean.length !== 4) return { valid: false, killerId: 4, code: encodeCaseCode(4, 107) };
    const scrambled = parseInt(clean, 10);
    const plain = (((scrambled - ADD) % 10000) + 10000) % 10000;
    const orig = (plain * INV) % 10000;
    const killerId = (orig % 20) + 1;
    return { valid: true, killerId, code: "RV-" + clean };
  }

  const MIN_PLAYERS = 8;
  const MAX_PLAYERS = 20;

  function accompliceCountFor(playerCount) {
    if (playerCount >= 18) return 3;
    if (playerCount >= 14) return 2;
    return 1;
  }

  function rollRandomCase() {
    const killerId = Math.floor(Math.random() * 20) + 1;
    return encodeCaseCode(killerId);
  }

  // Default Classic Case Code (Dr. Julian Mercer #4)
  const CLASSIC_CODE = encodeCaseCode(4, 107);

  function withArticle(phrase) {
    const clean = String(phrase || "").trim();
    return (/^[aeiou]/i.test(clean) ? "an " : "a ") + clean;
  }

  function escHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function spokenName(charBase) {
    return String((charBase && charBase.name) || "").replace(/\s*\([^)]*\)/g, "").trim();
  }

  const FAMILY_WILL_IDS = [1, 5, 12];

  function getVariationBlueprint(playerCount, killerId) {
    const table = global && global.RAVENSHOLLOW_VARIATIONS;
    if (table && table[playerCount] && table[playerCount][killerId]) {
      return table[playerCount][killerId];
    }
    // Fallback if variations-data.js is not loaded: cyclic balanced assignment
    const accCount = accompliceCountFor(playerCount);
    const allAccomplices = [
      ((killerId - 1 + 2) % 20) + 1,
      ((killerId - 1 + 7) % 20) + 1,
      ((killerId - 1 + 13) % 20) + 1
    ];
    const removalOffsets = [3, 5, 9, 11, 14, 16, 17, 19, 1, 4, 6, 8];
    const removedIds = removalOffsets
      .slice(0, 20 - playerCount)
      .map(off => ((killerId - 1 + off) % 20) + 1);
    const activeIds = [];
    for (let id = 1; id <= 20; id++) {
      if (!removedIds.includes(id)) activeIds.push(id);
    }
    return {
      playerCount,
      variationId: killerId,
      killerId,
      accomplices: allAccomplices.slice(0, accCount),
      activeIds,
      removedIds
    };
  }

  function pickFirstActive(preferredIds, activeIds, excludedIds) {
    for (let i = 0; i < preferredIds.length; i++) {
      const cid = preferredIds[i];
      if (activeIds.includes(cid) && !excludedIds.includes(cid)) return cid;
    }
    for (let i = 0; i < activeIds.length; i++) {
      const cid = activeIds[i];
      if (!excludedIds.includes(cid)) return cid;
    }
    return activeIds[0];
  }

  function buildScenario(caseCode, playerCount, blueprintOverride) {
    const n = Math.max(MIN_PLAYERS, Math.min(MAX_PLAYERS, parseInt(playerCount, 10) || MIN_PLAYERS));
    const decoded = decodeCaseCode(caseCode || CLASSIC_CODE);
    const killerId = blueprintOverride ? blueprintOverride.killerId : decoded.killerId;
    const blueprint = blueprintOverride || getVariationBlueprint(n, killerId);

    const activeIds = blueprint.activeIds.slice().sort((a, b) => a - b);
    const removedIds = (blueprint.removedIds || []).slice();
    const accomplices = blueprint.accomplices.slice();

    const killerBase = BASE_CHARACTERS[killerId - 1];
    const shadowIds = [killerId, ...accomplices];
    const coreAccompliceId = accomplices[0];
    const coreAccompliceBase = BASE_CHARACTERS[coreAccompliceId - 1];

    // Choose 4 distinct active Innocent story anchors (never removed, never Shadow Team)
    const inspectorId = pickFirstActive([8, 2, 3, 4, 10, 13, 14, 17, 19], activeIds, shadowIds);
    const inspectorBase = BASE_CHARACTERS[inspectorId - 1];

    const witnessId = pickFirstActive([3, 2, 1, 15, 9, 11, 14, 19], activeIds, [...shadowIds, inspectorId]);
    const witnessBase = BASE_CHARACTERS[witnessId - 1];

    const wineSpikerId = pickFirstActive([5, 1, 7, 11, 16, 12, 20], activeIds, [...shadowIds, inspectorId, witnessId]);
    const wineSpikerBase = BASE_CHARACTERS[wineSpikerId - 1];

    // Never pick #1 (upstairs gallery 8:50-8:55 PM) or #11 (upstairs gallery 8:45-8:48 PM) as Grand Hall 8:55 PM alibi witness
    const alibiWitnessId = pickFirstActive(
      [4, 7, 2, 8, 3, 13, 19, 10, 9, 14, 15, 16, 17, 18, 20],
      activeIds,
      [...shadowIds, inspectorId, witnessId, wineSpikerId, 1, 11]
    );
    const alibiWitnessBase = BASE_CHARACTERS[alibiWitnessId - 1];

    // Active Innocent speaker for Act II Automaton line (never on Shadow Team; prefers clockwork/engineering guests)
    const act2Reserved = [...shadowIds, inspectorId, witnessId, wineSpikerId];
    const automatonSpeakerId = pickFirstActive(
      [7, 6, 16, 11, 20, 19, 14, 2, 4, 1, 10, 3, 15, 17, 18, 8, 9, 12, 13],
      activeIds,
      act2Reserved
    );
    const automatonSpeakerBase = BASE_CHARACTERS[automatonSpeakerId - 1];

    // Pillar 4: 2008 Audit Initials Red Herring (matches both Killer & Core Accomplice!)
    const sameInitials = killerBase.initials === coreAccompliceBase.initials;
    const auditPair = [killerBase, coreAccompliceBase].sort((a, b) => a.id - b.id);
    const auditInitialsLabel = sameInitials
      ? `'${killerBase.initials}'`
      : `'${auditPair[0].initials}' / '${auditPair[1].initials}'`;
    const deliveryWithArticle = withArticle(killerBase.deliveryItem);
    const wineSpikerIsFamily = FAMILY_WILL_IDS.includes(wineSpikerId);
    const celesteHas820 = activeIds.includes(7) && !shadowIds.includes(7) && wineSpikerId !== 7;
    const evelynHas805 = activeIds.includes(1) && !shadowIds.includes(1) && inspectorId !== 1 && witnessId !== 1 && wineSpikerId !== 1;

    // Build Dynamic Characters ONLY for activeIds (exact length n)
    const characters = activeIds.map(id => {
      const base = BASE_CHARACTERS[id - 1];
      const isKiller = id === killerId;
      const isAccomplice = accomplices.includes(id);
      const isInspector = id === inspectorId;
      const isCoreAcc = id === coreAccompliceId;
      const isWitness = id === witnessId;
      const isWineSpiker = id === wineSpikerId;
      const isAlibiWitness = id === alibiWitnessId;

      let team = "innocent";
      let badge = "INNOCENT";
      let badgeClass = "";
      let special = "";
      let role = base.role;
      let persona = base.persona;
      let secret = base.secret;
      let clue = base.clue;
      let detention = base.detention;

      // Scrub any references to removed characters (#2 Clara, #5 Victor, #16 Gideon)
      if (id === 17 && !activeIds.includes(2)) {
        role = "Junior Estate Law Associate";
      }
      if (id === 12 && !activeIds.includes(5)) {
        role = "Calculating Vance In-Law";
        persona = "Icy, ambitious, and furious with your estranged husband for gambling away your savings.";
        detention = "Searched from Lydia's Purse: Signed divorce papers citing $400k in gambling debt, plus a cocktail napkin note: '8:35 PM basement stairs — overheard: 15 seconds of dark at 9 sharp or secret goes to police.'";
      }
      if (id === 6 && !activeIds.includes(16)) {
        secret = "You have been secretly selling Vance Precision clockwork blueprints to an outside robotics buyer—you were in the basement hallway at 8:50 PM hiding a schematic tube!";
      }

      // If Harriet (#8) is an Innocent but NOT the Inspector, she did not bring the field chemistry kit
      if (id === 8 && !isInspector && !isKiller && !isAccomplice) {
        secret = "Arthur secretly wrote to you yesterday warning that tonight he was finally exposing the 2008 cover-up and telling you to watch those he trusts most.";
        detention = "Searched from Harriet's Coat: A retired magistrate's badge and a note from Arthur: 'Harriet — Tonight I am finally exposing the 2008 cover-up. Watch those I trust most.'";
      }

      // If Victor (#5) is an Innocent but NOT the Wine Spiker, prevent duplicate wine-spiking secrets
      if (id === 5 && !isWineSpiker && !isKiller && !isAccomplice) {
        secret = "You owe $400,000 to dangerous creditors and spent dinner anxiously trying to talk Arthur out of disinheriting you—desperate, not a killer.";
        clue = "You know Arthur's New Will wasn't just about disinheriting family—it was going to blow open a 2008 scandal buried in Archive Box #4!";
        detention = "Searched from Victor's Jacket Pocket: A crumpled $400,000 gambling IOU due tomorrow morning and a pleading note to Arthur asking for one last loan.";
      }

      // Confirm 8:55 PM Grand Hall alibi on the Alibi Witness's own sheet
      if (isAlibiWitness) {
        persona += ` At 8:55 PM, you were standing right beside ${killerBase.name} in the Grand Hall when Arthur's voice boomed from upstairs.`;
      }

      if (isKiller) {
        team = "killer";
        badge = "SHADOW TEAM — KILLER";
        badgeClass = "shadow";
        if (id === 8) {
          persona = "Sharp-eyed retired magistrate long estranged from Arthur—everyone assumes it was over principle, though the truth about 2008 is far darker.";
        }
        if (id === 10) {
          persona = "Sharp, perceptive investigative reporter with the Boston Chronicle. You arrived as a guest's plus-one, claiming to cover the gala—though your real reason for coming tonight is far more personal.";
        }
        const allyNames = accomplices.map(aid => `${BASE_CHARACTERS[aid - 1].name}`).join(", ");
        const allyLabel = accomplices.length === 1 ? "ally" : "allies";
        special = `YOU ARE THE KILLER! Win by avoiding indictment in the Final Verdict (frame ${coreAccompliceBase.name} or ${wineSpikerBase.name}!). Your Shadow Team ${allyLabel}: ${allyNames}. Try to win the Act I Group Leader vote (or get an ally elected) to control tie-breakers and extra detentions!`;
        secret = `In 2008, YOU were behind "${killerBase.scandalTitle}" (signed "${killerBase.initials}"). Tonight: at 8:15 PM you rigged the Chronos Automaton (8:55 PM voice + 9:00 PM carafe smash) and tried to burn the 2008 audit log in the Study fireplace; at 8:35 PM you blackmailed ${coreAccompliceBase.name} to cut the generator at 9:00 PM; at 8:42 PM you handed Arthur ${deliveryWithArticle} laced with concentrated Aconite (he died at 8:48 PM). You stood next to ${alibiWitnessBase.name} at 8:55 PM for an alibi, then rushed to the desk at 9:01 PM—pocketing the ${killerBase.deliveryItem} (and dropping your botanical-smudged handkerchief down the upstairs laundry chute at 9:04 PM) while slipping up by claiming you saw his chalk-pale lips (he was face-down!), smelled 'bitter-almond wine,' and lied about the 8:48 PM watch.`;
        clue = `STRATEGY: Stay calm! Let the room suspect ${wineSpikerBase.name} for drugging the wine and ${coreAccompliceBase.name} for the blackout and Exhibit C. If pressed on Exhibit E, claim Arthur's watch broke earlier or someone forged "${killerBase.initials}" to frame you!`;
        detention = `Searched from ${base.name}'s Effects: A folded dinner napkin smudged with faint fireplace soot and an unsigned note in ${base.name}'s handwriting: "Speak to Arthur privately before the 9:00 PM announcement—he cannot open that 2008 file tonight."`;
      } else if (isAccomplice) {
        team = "accomplice";
        badge = "SHADOW TEAM — ACCOMPLICE";
        badgeClass = "shadow";
        if (id === 8) {
          persona = "Sharp-eyed retired magistrate long estranged from Arthur—everyone assumes it was over principle, though the truth about 2008 is far darker.";
        }
        const fellowAllies = accomplices
          .filter(aid => aid !== id)
          .map(aid => `${BASE_CHARACTERS[aid - 1].name}`);
        const fellowText = fellowAllies.length > 0 ? ` Fellow accomplice${fellowAllies.length > 1 ? "s" : ""}: ${fellowAllies.join(", ")}.` : "";
        special = `YOU ARE ON THE SHADOW TEAM! You are allied with ${killerBase.name} and win ONLY if the Killer escapes indictment in the Final Verdict.${fellowText} Support ${killerBase.name} in public Town Hall votes and try to win (or steer) the Act I Group Leader election!`;
        if (isCoreAcc) {
          secret = `${killerBase.name} caught your private scandal and blackmailed you into cutting the basement generator breaker for 15 seconds at 9:00 PM sharp! You didn't know ${killerBase.name} was going to murder Arthur, but if ${killerBase.name} goes down, you go to prison as an accessory. Worse, your initials (${base.initials}) appear on the burned Exhibit C audit log from 2008—even though you had no access to Archive Box #4 in 2008!`;
          detention = `Searched from ${base.name}'s Belongings: Heavy rubber-insulated electrical gloves (smelling of ozone from the generator breaker) and an unsigned blackmail note: '9:00 PM sharp. Fifteen seconds of dark, or your secret goes to the police.'`;
        } else if (accomplices.indexOf(id) === 1) {
          secret = `You are secretly tied to ${killerBase.name}'s 2008 cover-up and helped keep the upstairs gallery clear from 8:10–8:20 PM while ${killerBase.name} rigged the Automaton. Protect ${killerBase.name} in Town Hall votes!`;
          detention = `Searched from ${base.name}'s Belongings: A burner phone with an unsent draft: '${killerBase.initials} — Upstairs corridor clear 8:10 to 8:20 PM. Stop Archive Box #4 at any cost.'`;
        } else {
          secret = `You are quietly helping ${killerBase.name} bury the 2008 Archive Box #4 trail and agreed to steer the room toward the wine and away from the 2008 ledger. Protect ${killerBase.name} in Town Hall votes!`;
          detention = `Searched from ${base.name}'s Belongings: A torn corner of a 2008 file folder and a folded slip: '${killerBase.initials} — Keep everyone focused on the wine tonight. Archive Box #4 stays shut.'`;
        }
        clue = `STRATEGY: Deflect suspicion onto ${wineSpikerBase.name} and defend ${killerBase.name}'s 8:55 PM Grand Hall alibi!`;
      } else if (isInspector) {
        team = "inspector";
        badge = "INNOCENT — INSPECTOR";
        badgeClass = "inspector";
        special = "LEAD FORENSIC WITNESS: You brought a field chemistry kit (used to produce Exhibit F in Act III) and lead the Evidence Board briefings in Acts II & III.";
        if (id !== 8) {
          secret += " You also brought a miniature field chemistry kit in your bag, which you will use between Acts II and III to produce Exhibit F (testing the wine vs. Arthur's cuff).";
          clue += " You also did a headcount in the Grand Hall at 9:00 PM and noticed someone was missing during the blackout.";
          detention += " Also tucked inside: a miniature field chemistry testing kit.";
        }
      }

      if (isWineSpiker && !isKiller && !isAccomplice) {
        const willGoal = wineSpikerIsFamily
          ? "to locate the New Will"
          : "to get a secret look at the corporate clauses in Arthur's New Will";
        const detentionNote = wineSpikerIsFamily
          ? "a desperate note about stealing the unsigned New Will."
          : "a nervous note about getting a private look at the unsigned New Will.";
        if (id === 9) {
          persona = "Dramatic, fiercely proud head chef—furious at the suggestion that anyone was fatally poisoned by your kitchen!";
        }
        secret = `RED HERRING! At 7:58 PM, you snuck into the Dining & Sideboard and put CHLORAL HYDRATE (non-lethal sleeping powder) into Arthur's 1998 Bordeaux wine decanter before a glass was carried up to his Study, then slipped into the Study around 8:05 PM ${willGoal}! You're terrified you killed him—until Exhibit F proves he never drank the wine!`;
        if (id === 11) {
          clue = "Later at 8:48 PM, while slipping back along the upstairs gallery to retrieve a dropped glove, you ducked behind a curtain and heard a heavy muffled THUMP inside Arthur's locked Study—followed by dead silence! Also: once Exhibit F drops in Act III, confess to the sleeping powder so the room stops wasting votes on you and hunts the real killer!";
        } else if (id === 12) {
          clue = "At 8:35 PM near the basement stairs you overheard a blackmail threat—you know for a fact that the 9:00 PM blackout was a deliberate blackmail job, NOT a storm surge! Also: once Exhibit F drops in Act III, confess to the sleeping powder so the room stops wasting votes on you and hunts the real killer!";
        } else if (id !== 5) {
          clue += " Also: once Exhibit F drops in Act III, confess to the sleeping powder so the room stops wasting votes on you and hunts the real killer!";
        }
        detention = `Searched from ${base.name}'s Belongings: A folded white paper packet labeled 'Chloral Hydrate (Sleep Aid)' and ${detentionNote}`;
      }

      if (isWitness && !isKiller && !isAccomplice) {
        const teaNote = id === 3
          ? "8:40 PM — Poured hot cup of chamomile tea in Study."
          : "8:40 PM — Saw hot chamomile tea brought up to Study.";
        clue = `1) At 8:40 PM a piping-hot cup of chamomile tea was poured in the Study—by 9:02 PM the untouched cup was barely lukewarm. 2) At 8:42 PM, YOU PERSONALLY SAW ${killerBase.name} hand Arthur ${deliveryWithArticle} in the Grand Hall right before Arthur locked himself in the Study!`;
        detention = `Searched from ${base.name}'s Belongings: Tonight's handwritten note: '${teaNote} 8:42 PM — Watched ${killerBase.name} hand Arthur ${deliveryWithArticle} in the Grand Hall. 9:02 PM — Tea untouched & barely lukewarm; watch smashed at 8:48 PM.'`;
      }

      // Dynamic Act I-III Mandatory Dialogues
      const dialogues = buildDialoguesFor(id, {
        activeIds, shadowIds,
        isKiller, isAccomplice, isCoreAcc, isInspector, isWitness, isWineSpiker,
        accomplices, sameInitials, auditPair, auditInitialsLabel, deliveryWithArticle,
        wineSpikerIsFamily, celesteHas820, evelynHas805,
        killerBase, coreAccompliceBase, inspectorBase, witnessBase, wineSpikerBase, alibiWitnessBase, base
      });

      // Final Verdict Accusation Response (Read aloud only if indicted in the Final Verdict)
      let accusedResponse = "";
      if (isKiller) {
        const allyNames = accomplices.map(aid => BASE_CHARACTERS[aid - 1].name).join(" and ");
        accusedResponse = `CONFESSION (YOU CAUGHT ME!): "Alright—you got me! I killed Arthur Vance. In 2008 I was behind '${killerBase.scandalTitle}', and I couldn't let his New Will open Archive Box #4. At 8:15 PM I rigged the Chronos Automaton to play his angry recording at 8:55 PM and smash the water carafe at 9:00 PM. I blackmailed ${coreAccompliceBase.name} to cut the lights at nine, and at 8:42 PM I handed Arthur ${deliveryWithArticle} laced with concentrated Aconite—he died alone at 8:48 PM. I used ${alibiWitnessBase.name} for my 8:55 PM alibi, and only slipped up at 9:01 PM when I claimed I smelled bitter-almond wine and saw his pale lips while he was face-down! My Shadow Team ${accomplices.length === 1 ? "ally was" : "allies were"} ${allyNames}."`;
      } else if (isAccomplice) {
        let helpDetail = "";
        if (isCoreAcc) {
          helpDetail = "I was blackmailed into cutting the basement generator breaker for 15 seconds at 9:00 PM sharp";
        } else if (accomplices.indexOf(id) === 1) {
          helpDetail = "I kept the upstairs gallery clear from 8:10 to 8:20 PM while the Automaton was rigged";
        } else {
          helpDetail = "I helped steer suspicion toward the wine and away from the 2008 Archive Box #4 trail";
        }
        accusedResponse = `ACCOMPLICE CAUGHT (NOT THE KILLER!): "Wait—stop! I admit I'm on the Shadow Team: ${helpDetail}. But I am NOT the killer, and I'm not ratting them out! You caught an accomplice, not the mastermind. Hold ONE Sudden-Death Final Vote right now to name the true killer—if you miss again, the Shadow Team wins!"`;
      } else if (isWineSpiker) {
        accusedResponse = `INNOCENT DEFENSE: "I am INNOCENT of murder! Yes, I put Chloral Hydrate—harmless sleeping powder—into the Bordeaux decanter at 7:58 PM so I could check the New Will. I was terrified I'd killed him until Exhibit F proved his wine glass was completely full and untouched! Arthur died at 8:48 PM from concentrated Aconite—not my sleeping powder!"`;
      } else if (isInspector) {
        accusedResponse = `INNOCENT DEFENSE: "I am INNOCENT! In 2008 I was ${base.ledger2008}—I have zero connection to '${killerBase.scandalTitle}'. Better yet, I brought the field chemistry kit that produced Exhibit F and proved Arthur died of Aconite! Why would the killer expose their own murder weapon?"`;
      } else if (isWitness) {
        accusedResponse = `INNOCENT DEFENSE: "I am INNOCENT! Check Exhibit E—in 2008 I was ${base.ledger2008}, with no Archive Box #4 motive. I poured the chamomile tea that sat untouched, saw the 8:48 PM watch, and watched the real killer hand Arthur ${deliveryWithArticle} at 8:42 PM!"`;
      } else {
        accusedResponse = `INNOCENT DEFENSE: "I am INNOCENT! Check Exhibit E—in 2008 I was ${base.ledger2008}, with zero connection to '${killerBase.scandalTitle}' or Archive Box #4. I had no concentrated Aconite, didn't touch the Chronos Automaton, and didn't cut the generator!"`;
      }

      return {
        id, name: base.name, role, initials: base.initials,
        team, badge, badgeClass, special, persona, secret, clue, detention, accusedResponse, dialogues
      };
    });

    // Dynamic Exhibit C text (classic exact-initials match OR dual-flagged initials so Pillar 4 always works!)
    const exhibitCBody = sameInitials
      ? `VANCE PRECISION INSTRUMENTS — CONFIDENTIAL AUDIT\nARCHIVE BOX #4 (SLATED FOR RELEASE WITH NEW WILL)\n-------------------------------------------------\nSUBJECT:   ${killerBase.scandalTitle}\nFINDING:   ${killerBase.scandalDetail}\nSIGNED BY: "${killerBase.initials}" [REST OF LINE BURNED]\nSTATUS:    Suppressed by A. Vance (2008). Full disclosure\n           ordered upon execution of New Will.`
      : `VANCE PRECISION INSTRUMENTS — CONFIDENTIAL AUDIT\nARCHIVE BOX #4 (SLATED FOR RELEASE WITH NEW WILL)\n-------------------------------------------------\nSUBJECT:   ${killerBase.scandalTitle}\nFINDING:   ${killerBase.scandalDetail}\nFLAGGED INITIALS: "${auditPair[0].initials}" / "${auditPair[1].initials}" [ROLES & DATES BURNED]\nNOTE:      One party falsified the 2008 record; the other had\n           no clearance or access to Archive Box #4 in 2008.\nSTATUS:    Suppressed by A. Vance (2008). Full disclosure\n           ordered upon execution of New Will.`;

    // Build Exhibit E with 6 active guests (Killer, Core Accomplice, Wine Spiker + 3 active guests with 2008 ties).
    // Prioritize any active guest who shares initials with Killer or Core Accomplice (e.g. #4 & #6 J.M.) so Exhibit E cleanly distinguishes them.
    const extraExhibitEIds = [];
    const sameInitialsIds = activeIds.filter(cid => {
      const c = BASE_CHARACTERS[cid - 1];
      return c.initials === killerBase.initials || c.initials === coreAccompliceBase.initials;
    });
    const preferredExtras = [...sameInitialsIds, 2, 3, 1, 7, 8, 10, 12, 13, 14, 16, ...activeIds];
    for (let i = 0; i < preferredExtras.length && extraExhibitEIds.length < 3; i++) {
      const cid = preferredExtras[i];
      if (
        activeIds.includes(cid) &&
        cid !== killerId &&
        cid !== coreAccompliceId &&
        cid !== wineSpikerId &&
        !extraExhibitEIds.includes(cid)
      ) {
        extraExhibitEIds.push(cid);
      }
    }
    const exhibitERecords = [
      { id: killerId, html: `&bull; <strong>${escHtml(killerBase.name)}:</strong> ${escHtml(killerBase.ledger2008)}` },
      { id: coreAccompliceId, html: `&bull; <strong>${escHtml(coreAccompliceBase.name)}:</strong> <em>Cleared — No clearance or access to Archive Box #4 in 2008 (unrelated to the 2008 incident).</em>` },
      { id: wineSpikerId, html: `&bull; <strong>${escHtml(wineSpikerBase.name)}:</strong> ${escHtml(wineSpikerBase.ledger2008)}` },
      ...extraExhibitEIds.map(cid => {
        const c = BASE_CHARACTERS[cid - 1];
        return { id: cid, html: `&bull; <strong>${escHtml(c.name)}:</strong> ${escHtml(c.ledger2008)}` };
      })
    ].sort((a, b) => a.id - b.id).map(r => r.html).join("<br/>\n            ");

    // Dynamic Evidence (Acts I–III, presented by the Act or by specific Innocent characters)
    const exhibits = [
      {
        id: "A", act: 1, actLabel: "Act I",
        presenter: null,
        presenterLabel: "Act I",
        title: "Study Crime Scene Sketch (9:02 PM)",
        html: `<div class="sketch-frame"><img src="../assets/study-crime-scene-sketch.jpg" alt="Study Crime Scene Sketch (9:02 PM)" class="sketch-img" style="display:block; width:100%; max-width:560px; height:auto; margin:0 auto 10px; border:1px solid #8a6830; border-radius:4px;" /></div>
        <ul>
          <li><strong>The Body:</strong> Lord Arthur Vance found slumped across his desk blotter. First reached and rolled over by <strong>${escHtml(killerBase.name)}</strong> at 9:01 PM.</li>
          <li><strong>Initial Statement (9:01 PM):</strong> As guests rushed in, <strong>${escHtml(killerBase.name)}</strong> loudly claimed to see Arthur's <em>"chalk-pale lips"</em> and smell <em>"bitter almonds from the spilled wine."</em></li>
          <li><strong>Desk &amp; Floor Notes:</strong> Unsigned New Will; untouched crystal wine glass; single poured porcelain cup of chamomile tea (<strong>barely lukewarm</strong> by 9:02 PM); broken pocket watch; shattered glass beside a 5-lb brass counterweight in spilled liquid.</li>
        </ul>`
      },
      {
        id: "B", act: 1, actLabel: "Act I",
        presenter: { id: witnessId, name: witnessBase.name },
        presenterLabel: `${witnessBase.name} (#${witnessId})`,
        title: "Arthur's Shattered Pocket Watch",
        html: `<ul>
          <li><strong>Make:</strong> Custom Vance Precision Gold Chronometer (<em>"A.V. — Time Never Lies"</em>).</li>
          <li><strong>Condition:</strong> Crystal cracked; internal gears jammed from hitting the desk corner.</li>
          <li><strong>Frozen Time:</strong> <strong>8:48 PM</strong> (12 minutes before the 9:00 PM blackout).</li>
          <li><strong>Witness Note:</strong> <strong>${escHtml(killerBase.name)}</strong> snapped the gold lid shut at 9:01 PM, claiming Arthur's watch <em>"always ran twelve minutes slow."</em></li>
        </ul>`
      },
      {
        id: "C", act: 2, actLabel: "Act II",
        presenter: { id: inspectorId, name: inspectorBase.name },
        presenterLabel: `${inspectorBase.name} (#${inspectorId})`,
        title: `Charred Audit Log (${auditInitialsLabel})`,
        html: `<pre>${escHtml(exhibitCBody)}</pre>`
      },
      {
        id: "D", act: 2, actLabel: "Act II",
        presenter: { id: automatonSpeakerId, name: automatonSpeakerBase.name },
        presenterLabel: `${automatonSpeakerBase.name} (#${automatonSpeakerId})`,
        title: "Chronos Automaton, Wax Cylinder & Study Re-Inspection",
        html: `<ul>
          <li><strong>Phonograph Drum:</strong> Plays a removable brass wax cylinder at a scheduled minute. Currently set to <strong>8:55 PM</strong>.</li>
          <li><strong>Release Cam:</strong> Drops a 5-lb brass counterweight at <strong>9:00 PM</strong> (shifted 2 inches to strike the water carafe).</li>
          <li><strong>Cylinder Label:</strong> Reads <em>"9:00 PM Gala Greeting"</em> — hastily glued over a scratched-out title: <strong>"Memoir Draft — Confrontation."</strong></li>
          <li><strong>Study Re-Inspection (Clear Light):</strong> The crystal wine glass on the desk is <strong>completely full &amp; untouched</strong>; the shattered glass on the floor is a <strong>water carafe</strong> in <strong>clear, odorless liquid</strong> (zero wine, zero bitter-almond scent). Desk-blotter impressions confirm Arthur collapsed <strong>face-down, facing away from the door</strong> until <strong>${escHtml(killerBase.name)}</strong> rolled him over.</li>
        </ul>`
      },
      {
        id: "FL1", act: 2, actLabel: "Act II",
        presenter: null,
        presenterLabel: "Act II",
        title: "Crumpled Generator Note",
        html: `<p><em>Found crumpled on the basement stairs as guests regrouped before Act II:</em></p><pre>"9:00 PM sharp. Pull the main breaker. Don't let anyone see you. — ${wineSpikerBase.initials}"</pre>`
      },
      {
        id: "E", act: 3, actLabel: "Act III",
        presenter: null,
        presenterLabel: "Act III",
        title: "2008 Dossier Ledger & Horologist Journal",
        html: `<ul>
          <li><strong>Selected 2008 Archive Records:</strong><br/>
            ${exhibitERecords}
          </li>
          <li><strong>Arthur's Horologist Journal (Nov 15):</strong> <em>"A clockmaker whose own pocket watch loses a single second is a fraud. My gold chronometer is calibrated daily to the U.S. Naval Observatory signal. It has not drifted by half a second in eleven years."</em></li>
        </ul>`
      },
      {
        id: "F", act: 3, actLabel: "Act III",
        presenter: { id: inspectorId, name: inspectorBase.name },
        presenterLabel: `${inspectorBase.name} (#${inspectorId})`,
        title: "Field Toxicology Report",
        html: `<ul>
          <li><strong>Red Wine (Dining Sideboard Decanter &amp; Untouched Study Glass):</strong> Positive for <strong>Chloral Hydrate</strong> (non-lethal sleeping sedative). Arthur never drank it.</li>
          <li><strong>Residue on Arthur's Lips &amp; Cuff:</strong> Positive for <strong>Concentrated Aconite</strong> (fast-acting, completely <strong>odorless</strong> cardiac poison; fatal in <strong>2–3 minutes</strong>) — matching trace contact from ${escHtml(deliveryWithArticle).replace(escHtml(killerBase.deliveryItem), `<strong>${escHtml(killerBase.deliveryItem)}</strong>`)}.</li>
          <li><strong>Floor Puddle:</strong> Plain spring water. Zero wine, zero bitter-almond odor.</li>
        </ul>`
      },
      {
        id: "FL2", act: 3, actLabel: "Act III",
        presenter: null,
        presenterLabel: "Act III",
        title: "Anonymous Library Rumor",
        html: `<p><em>Found slipped under the Library door before Act III:</em></p><pre>"Check the Dining &amp; Sideboard! Someone wiped down the Bordeaux decanter left on the sideboard with an almond-scented handkerchief right before 9:00 PM."</pre>`
      }
    ];

    const exhibitCScriptDesc = sameInitials
      ? `a half-burned 2008 audit log signed '${killerBase.initials}'`
      : `a half-burned 2008 audit log flagging the initials '${auditPair[0].initials}' and '${auditPair[1].initials}'`;

    const witnessWatchLine = (witnessId === 3 || witnessId === 15)
      ? `"Begging your pardon, but when I stepped beside the desk, I noticed Lord Arthur's pocket watch had smashed on the corner—its hands were stopped at 8:48."`
      : `"Wait a moment—when I stepped beside the desk, I noticed Arthur's pocket watch had smashed on the corner—its hands were stopped at 8:48."`;

    const automatonLine = [7, 6, 16].includes(automatonSpeakerId)
      ? `"Wait—a scratched cylinder? Arthur built the Chronos Automaton to play a recorded greeting at 9:00 PM. You can also program its brass counterweight to drop on the hour. If someone swapped the cylinder..."`
      : `"Wait—a scratched cylinder? Arthur was bragging at dinner that the Chronos Automaton plays a recorded greeting at 9:00 PM and can even drop its brass counterweight on the hour. If someone swapped the cylinder..."`;

    // Dynamic Act I-III Public Opening Scripts
    const acts = {
      prologue: {
        label: "PROLOGUE — 9:00 PM",
        sub: "Read aloud (or click Read Aloud) to set the scene at Ravenshollow Manor.",
        html: `<p style="margin-bottom:12px;">Welcome to <strong>Ravenshollow Manor</strong>. Outside, a violent November nor'easter has washed out the wooden bridge to the mainland, and the telephone lines are dead. You are guests of billionaire clockmaker <strong>Lord Arthur Vance (72)</strong>.</p>
               <p style="margin-bottom:12px;">At 8:45 PM, Arthur retired alone to his second-floor Study to fetch his <strong>New Will</strong>, bolting the heavy oak door from the inside. At 8:55 PM, guests in the Grand Hall heard Arthur shouting from upstairs: <em>"You've gone too far! I'm calling the police as soon as the lines are back!"</em></p>
               <p>At 9:00 PM sharp, as the Grand Astronomical Clock struck nine, the backup generator died—plunging the manor into darkness for 15 seconds. A sharp crack and heavy thud echoed from the Study. When the lights returned at 9:01 PM, you broke down the bolted door—and found Arthur Vance <strong>dead at his desk</strong>.</p>`
      },
      act1: {
        label: "ACT I — THE LOCKED STUDY (7 MIN)",
        sub: "Read Public Opener, reveal Act I Evidence, mingle (7m), then Public Vote #1 (Detain 1 + Elect Group Leader).",
        html: `
          <div class="script-line"><div class="script-speaker">${escHtml(witnessBase.name)} (#${witnessId})</div>"Nobody touch a thing! The oak door was bolted from the inside, and the window drops eighty feet to the rocks. How on earth could someone kill him in a locked room?"</div>
          <div class="script-line"><div class="script-speaker">${escHtml(alibiWitnessBase.name)} (#${alibiWitnessId})</div>"He was shouting at someone at 8:55! We all heard him! Then at 9:00 the lights went out and—my God, was that a gunshot?"</div>
          <div class="script-line"><div class="script-speaker">${escHtml(killerBase.name)} (#${killerId})</div>"There is no bullet wound. It was poison! The moment the lights came back on at 9:01, I saw Arthur's chalk-pale lips and smelled that unmistakable bitter-almond scent from the spilled wine. He died right around nine."</div>
          <div class="script-line"><div class="script-speaker">${escHtml(witnessBase.name)} (#${witnessId})</div>${witnessWatchLine}</div>
          <div class="script-line"><div class="script-speaker">${escHtml(killerBase.name)} (#${killerId})</div>"Ah, yes, I closed the lid so it wouldn't upset everyone. Arthur's watch always ran twelve minutes slow—he told me so himself just yesterday."</div>
          <div class="script-line"><div class="script-speaker">${escHtml(inspectorBase.name)} (#${inspectorId})</div>"Slow or not, the New Will is still on his desk—unsigned. Whoever wanted Arthur dead before 9:00 PM is standing in this room."</div>`
      },
      act2: {
        label: "ACT II — SHADOWS IN THE CLOCKWORK (6 MIN)",
        sub: "Read Public Opener, reveal Act II Evidence, mingle (6m), then Public Vote #2 (Detain 1 + Group Leader's Extra Detention).",
        html: `
          <div class="script-line"><div class="script-speaker">${escHtml(inspectorBase.name)} (#${inspectorId})</div>"While the upstairs gallery was cleared, we inspected the Study fireplace and the Chronos Automaton. We have new evidence—${exhibitCScriptDesc}, and a scratched brass wax cylinder inside the Automaton."</div>
          <div class="script-line"><div class="script-speaker">${escHtml(automatonSpeakerBase.name)} (#${automatonSpeakerId})</div>${automatonLine}</div>
          <div class="script-line"><div class="script-speaker">${escHtml(coreAccompliceBase.name)} (#${coreAccompliceId})</div>"Don't look at me just because '${coreAccompliceBase.initials}' is on that burned page! Half the people in this house had a reason to hate Arthur. And if you're wondering why the lights went out at nine, the storm probably surged the old breaker!"</div>
          <div class="script-line"><div class="script-speaker">${escHtml(wineSpikerBase.name)} (#${wineSpikerId})</div>"Oh, spare us! And what about the wine? ${escHtml(spokenName(killerBase))} said it smelled of poison—who poured Arthur's glass?!"</div>
          <div class="script-line"><div class="script-speaker">${escHtml(witnessBase.name)} (#${witnessId})</div>"Actually... look at our Study re-inspection in the Chronos Automaton evidence. In clear light, the wine glass on the desk is completely full and untouched—it was the water carafe that shattered in odorless water, and Arthur was slumped face-down!"</div>`
      },
      act3: {
        label: "ACT III — THE LAST CHIME (7 MIN)",
        sub: "Read Public Opener, reveal Act III Evidence, mingle (7m), then Final Verdict (3m) & Reveal!",
        html: `
          <div class="script-line"><div class="script-speaker">${escHtml(inspectorBase.name)} (#${inspectorId})</div>"Enough games. We unlocked Arthur's private Horologist Journal and the 2008 Archive Ledger—and tested the residue in the Study with a field chemistry kit."</div>
          <div class="script-line"><div class="script-speaker">${escHtml(witnessBase.name)} (#${witnessId})</div>"Look closely at the 2008 Dossier Ledger and Field Toxicology Report before you cast your final vote. The single cup of chamomile tea poured at 8:40 PM was untouched and barely lukewarm by 9:02 PM—and Arthur never touched his wine."</div>
          <div class="script-line"><div class="script-speaker">${escHtml(killerBase.name)} (#${killerId})</div>"Careful, everyone—wild theories will only let the real killer slip away. Look at who had the motive to steal the Will, who rigged the power, and who wasn't in the Grand Hall at nine. Let's settle this."</div>`
      }
    };

    const pillar4Proof = sameInitials
      ? `Exhibit C's charred <strong>"${killerBase.initials}"</strong> matches both ${escHtml(killerBase.name)} and ${escHtml(coreAccompliceBase.name)}, but Exhibit E clears ${escHtml(coreAccompliceBase.name)} (no 2008 access) and ties <strong>${escHtml(killerBase.name)}</strong> directly to <strong>${escHtml(killerBase.scandalTitle)}</strong> — ${escHtml(killerBase.ledger2008)}!`
      : `Exhibit C flagged both <strong>"${auditPair[0].initials}"</strong> and <strong>"${auditPair[1].initials}"</strong>, but Exhibit E clears ${escHtml(coreAccompliceBase.name)} (no 2008 access) and ties <strong>${escHtml(killerBase.name)}</strong> directly to <strong>${escHtml(killerBase.scandalTitle)}</strong> — ${escHtml(killerBase.ledger2008)}!`;

    const revealHtml = `
      <h2 class="serif" style="color:var(--gold); font-size:1.6rem; margin-bottom:12px;">The Truth Behind the Last Chime (${decoded.code})</h2>
      <p style="margin-bottom:12px;">
        <strong>The Killer:</strong> <span style="color:#ff7b7b; font-weight:700;">${escHtml(killerBase.name)} (#${killerId})</span><br/>
        <strong>The Accomplice${accomplices.length > 1 ? "s" : ""} (Shadow Team):</strong> <span style="color:var(--gold);">${accomplices.map(id => `${escHtml(BASE_CHARACTERS[id - 1].name)} (#${id})`).join(", ")}</span><br/>
        <strong>The Inspector:</strong> <span style="color:#6be0a3;">${escHtml(inspectorBase.name)} (#${inspectorId})</span>
      </p>
      <p style="margin-bottom:10px;">
        Arthur Vance did <strong>not</strong> die at 9:00 PM. He died at <strong>8:48 PM</strong>—alone behind a bolted door—from <strong>concentrated Aconite</strong> hidden in the <strong>${escHtml(killerBase.deliveryItem)}</strong> handed to him by <strong>${escHtml(killerBase.name)} (#${killerId})</strong> at 8:42 PM. At 9:01 PM, ${escHtml(spokenName(killerBase))} rushed to the desk first, pocketing the ${escHtml(killerBase.deliveryItem)} and later ditching a botanical-smudged handkerchief down the upstairs laundry chute.
      </p>
      <p style="margin-bottom:10px;">
        ${escHtml(wineSpikerBase.name)} (#${wineSpikerId}) spiked the red wine with harmless sleeping powder, which Arthur never touched. The 8:55 PM argument was a <strong>pre-recorded brass wax cylinder</strong> played by the Chronos Automaton, and the 9:00 PM crash was the counterweight smashing the <strong>water carafe</strong> while blackmailed accomplice <strong>${escHtml(coreAccompliceBase.name)} (#${coreAccompliceId})</strong> cut the generator breaker for 15 seconds.
      </p>
      <p style="margin-bottom:10px;">
        <strong>The 4-Pillar Proof:</strong> (1) Arthur's pocket watch froze at <strong>8:48 PM</strong> and his Horologist Journal proves it never lost a second; (2) The wine was untouched and Arthur died of odorless Aconite from the ${escHtml(killerBase.deliveryItem)}; (3) ${escHtml(killerBase.name)} slipped up in Act I by claiming to see Arthur's pale lips (Arthur was face-down!) and smell bitter almonds from spilled wine (it was odorless water!); (4) ${pillar4Proof}
      </p>`;

    return {
      code: decoded.code,
      playerCount: n,
      variationId: killerId,
      activeIds,
      removedIds,
      killerId,
      accomplices,
      shadowIds,
      inspectorId,
      witnessId,
      wineSpikerId,
      alibiWitnessId,
      automatonSpeakerId,
      exhibitEIds: [killerId, coreAccompliceId, wineSpikerId, ...extraExhibitEIds].sort((a, b) => a - b),
      killerBase,
      coreAccompliceBase,
      inspectorBase,
      witnessBase,
      wineSpikerBase,
      alibiWitnessBase,
      automatonSpeakerBase,
      sameInitials,
      auditPair,
      auditInitialsLabel,
      deliveryWithArticle,
      characters,
      exhibits,
      acts,
      revealHtml
    };
  }

  function buildDialoguesFor(id, ctx) {
    const {
      activeIds, shadowIds,
      isKiller, isAccomplice, isCoreAcc, isInspector, isWitness, isWineSpiker,
      accomplices, sameInitials, deliveryWithArticle,
      wineSpikerIsFamily, celesteHas820, evelynHas805,
      killerBase, coreAccompliceBase, inspectorBase, witnessBase, wineSpikerBase, alibiWitnessBase, base
    } = ctx;

    const kSpoken = spokenName(killerBase);
    const caSpoken = spokenName(coreAccompliceBase);
    const wsSpoken = spokenName(wineSpikerBase);
    const awSpoken = spokenName(alibiWitnessBase);

    // Pick a guaranteed-active character from this variation's cast that is not the speaker
    // and (if possible) not in excludeIds.
    function pickTarget(preferredIds, excludeIds) {
      const excluded = excludeIds || [];
      for (let i = 0; i < preferredIds.length; i++) {
        const tid = preferredIds[i];
        if (tid && tid !== id && activeIds.includes(tid) && !excluded.includes(tid)) return BASE_CHARACTERS[tid - 1];
      }
      const fallbackOrder = [inspectorBase.id, witnessBase.id, alibiWitnessBase.id, ...activeIds];
      for (let i = 0; i < fallbackOrder.length; i++) {
        const tid = fallbackOrder[i];
        if (tid && tid !== id && activeIds.includes(tid) && !excluded.includes(tid)) return BASE_CHARACTERS[tid - 1];
      }
      for (let i = 0; i < fallbackOrder.length; i++) {
        const tid = fallbackOrder[i];
        if (tid && tid !== id && activeIds.includes(tid)) return BASE_CHARACTERS[tid - 1];
      }
      return BASE_CHARACTERS[activeIds[0] - 1];
    }

    if (isKiller) {
      const witnessPrompt = witnessBase.id === 3
        ? "Since you oversee the Study service, who had access to Arthur's Bordeaux decanter tonight?"
        : "With guests coming and going all evening, who had access to Arthur's Bordeaux decanter tonight?";
      return [
        { act: "ACT I", target: `Say to ${witnessBase.name}:`, line: `"I was standing right beside ${awSpoken} in the Grand Hall at 8:55 PM when Arthur was shouting! ${witnessPrompt} Someone clearly poisoned that wine before nine."` },
        { act: "ACT II", target: `Say to ${inspectorBase.name}:`, line: `"I rolled Arthur over at 9:01 to check his pulse—pure reflex! Don't get distracted by a half-burned 2008 page; ask ${caSpoken} why the lights conveniently died at nine!"` },
        { act: "ACT III", target: `Say to ${witnessBase.name}:`, line: `"Yes, I handed Arthur ${deliveryWithArticle} at 8:42 PM—completely harmless! If his watch stopped at 8:48, he must have dropped it before arguing at 8:55. Don't fall for a frame-up!"` }
      ];
    }

    if (isCoreAcc) {
      const act1WillClaim = wineSpikerIsFamily
        ? `everyone knows ${wsSpoken} was desperate to stop that Will tonight!`
        : `everyone knows ${wsSpoken} was desperate to get their hands on that Will tonight!`;
      const act2Line = sameInitials
        ? `"Are you kidding me?! Look at the date on Exhibit C—2008! Just because my initials are '${base.initials}' doesn't mean I had anything to do with '${killerBase.scandalTitle}'! Check the 2008 records!"`
        : `"Look at Exhibit C—2008! Yes, '${base.initials}' was flagged on that burned page, but I had NO access to Archive Box #4 in 2008 and nothing to do with '${killerBase.scandalTitle}'! You're barking up the wrong tree!"`;
      const acc3Target = pickTarget([7, 2, 1, 3, alibiWitnessBase.id, inspectorBase.id], shadowIds);
      return [
        { act: "ACT I", target: `Say to ${inspectorBase.name}:`, line: `"I wasn't in the Grand Hall at nine because I heard a shutter banging near the basement stairs. Stop pointing fingers at me when ${act1WillClaim}"` },
        { act: "ACT II", target: `Say to ${witnessBase.name} [after Exhibit C]:`, line: act2Line },
        { act: "ACT III", target: `Say to ${acc3Target.name}:`, line: `"I didn't touch any poison and I didn't rig that Automaton! Look at who stood to gain from the unsigned Will—and remember ${kSpoken} was in the Grand Hall at 8:55!"` }
      ];
    }

    if (isAccomplice) {
      const accIndex = accomplices.indexOf(id);
      if (accIndex === 1) {
        // Shadow Accomplice #2 (14+ players — Upstairs corridor lookout / fixer)
        const t1 = pickTarget([2, inspectorBase.id, 1, 3], shadowIds);
        const t2 = pickTarget([inspectorBase.id, 7, 2, 3], [...shadowIds, t1.id]);
        const sightingPhrase = evelynHas805
          ? `${wsSpoken} was spotted sneaking out of the Study around 8:05 PM`
          : `word is ${wsSpoken} slipped into the Study around 8:05 PM`;
        const motivePhrase = wineSpikerIsFamily
          ? "a panicked family job over the Will"
          : "a desperate scheme over the Will";
        return [
          { act: "ACT I", target: `Say to ${t1.name}:`, line: `"Let's not overcomplicate this—${sightingPhrase}, and everyone heard Arthur shouting at 8:55. This is ${motivePhrase}, plain and simple."` },
          { act: "ACT II", target: `Say to ${t2.name} [after Exhibit C]:`, line: `"Careful chasing ghosts in a half-burned 2008 audit page. Someone cut the power at nine sharp and someone tampered with the wine—focus on who had the motive to stop the Will tonight!"` },
          { act: "ACT III", target: `Say to ${killerBase.name} [stage-managed defense]:`, line: `"Look, ${kSpoken}, I don't care what a dusty 2008 ledger says—you were standing right beside ${awSpoken} in the Grand Hall when Arthur was shouting at 8:55! Tell everyone how you could possibly be in two places at once!"` }
        ];
      }
      // Shadow Accomplice #3 (18+ players — Cover-up / toxicology deflection ally)
      const t1 = pickTarget([inspectorBase.id, 2, 1, 3], shadowIds);
      const t3 = pickTarget([2, inspectorBase.id, 3, 7, 1], [...shadowIds, t1.id]);
      const studyClaim = evelynHas805
        ? "Everybody knows you slipped into the Study around 8:05"
        : "Word is you slipped into the Study around 8:05";
      return [
        { act: "ACT I", target: `Say to ${t1.name}:`, line: `"If ${kSpoken} smelled bitter almonds the moment we opened the door, that's textbook fast-acting poison in the wine. Why are we ignoring the decanter on the sideboard?"` },
        { act: "ACT II", target: `Say to ${wineSpikerBase.name}:`, line: `"You've been sweating since 9:01 PM! ${studyClaim}—stop trying to pin this on a clockwork toy and admit what you put in that wine!"` },
        { act: "ACT III", target: `Say to ${t3.name} [after Exhibit F]:`, line: `"Even if Exhibit F found Aconite, trace residue can transfer from anything in a crowded hall—it doesn't prove ${kSpoken} killed Arthur! Don't let an 18-year-old audit blind you!"` }
      ];
    }

    if (isWineSpiker) {
      const confessGoal = wineSpikerIsFamily ? "to steal the Will!" : "to get a look at the New Will!";
      return [
        { act: "ACT I", target: `Say to ${alibiWitnessBase.name}:`, line: `"Keep your voice down! People are whispering about the wine—yes, I stepped into the Study around 8:05 PM to talk to Arthur, and he wasn't even there!"` },
        { act: "ACT II", target: `Say to ${witnessBase.name}:`, line: `"Between us—did Lord Arthur drink any of that red wine tonight? ${kSpoken} claimed it smelled of poison, and I'm worried..."` },
        { act: "ACT III", target: `Confess to ${inspectorBase.name} [after Exhibit F]:`, line: `"Fine! I put sleeping powder—chloral hydrate—in the Bordeaux decanter in the Dining & Sideboard at 7:58 PM ${confessGoal} NOT Aconite! And Exhibit F proves he NEVER DRANK THE WINE! I'm a thief, not a murderer!"` }
      ];
    }

    if (isWitness) {
      const act1Target = celesteHas820
        ? BASE_CHARACTERS[6]
        : pickTarget([2, 1, 14, 13, 19, 10], [wineSpikerBase.id, alibiWitnessBase.id]);
      const act1Line = celesteHas820
        ? `"Did you see anyone near Lord Arthur's Study around 8:20 PM? Something about this 9:00 PM timeline doesn't add up—his watch smashed at 8:48!"`
        : `"Something about this 9:00 PM timeline doesn't add up—Arthur's pocket watch smashed at 8:48 PM, and the chamomile tea poured at 8:40 was untouched and barely lukewarm by 9:02!"`;
      return [
        { act: "ACT I", target: `Say to ${act1Target.name}:`, line: act1Line },
        { act: "ACT II", target: `Say to ${wineSpikerBase.name}:`, line: `"The wine glass on Arthur's desk was completely full. What troubles me is the single cup of hot chamomile tea poured at 8:40 PM—by 9:02 PM, it was untouched and barely lukewarm!"` },
        { act: "ACT III", target: `Say to ${alibiWitnessBase.name}:`, line: `"Think back! At 8:42 PM in the Grand Hall, I personally watched ${kSpoken} hand Arthur ${deliveryWithArticle}—and Arthur carried it straight up to his locked Study!"` }
      ];
    }

    if (isInspector) {
      return [
        { act: "ACT I", target: `Say to ${coreAccompliceBase.name}:`, line: `"I did a headcount in the Grand Hall when the clock struck nine. You weren't there. Where exactly were you when the lights went out?"` },
        { act: "ACT II", target: `Say to ${killerBase.name} [after Exhibit D]:`, line: `"Wait a second—Exhibit D's Study re-inspection shows Arthur was slumped face-down at 9:01 PM, yet you claimed you saw his pale lips the instant the lights returned—and the puddle was odorless water, not wine!"` },
        { act: "ACT III", target: `Say to ${wineSpikerBase.name} [after Exhibit F]:`, line: `"My field test found chloral hydrate—sleeping powder—in the red wine decanter. Exhibit F proves Arthur never drank it, so tell the truth right now and help us catch the real killer!"` }
      ];
    }

    // Unique, character-specific dialogues for EVERY Innocent character (#1–#20)
    switch (id) {
      case 1: { // Lady Evelyn Vance
        const t2 = pickTarget([7, 2, 3, 20, 4], [wineSpikerBase.id, witnessBase.id]);
        return [
          { act: "ACT I", target: `Say to ${wineSpikerBase.name}:`, line: `"Don't play innocent with me! I saw you slipping out of Arthur's Study around 8:05 PM looking like you'd seen a ghost. What were you doing in there?"` },
          { act: "ACT II", target: `Say to ${t2.name} [after Exhibit D]:`, line: `"Wait a second—a brass wax cylinder?! Two days ago I heard Arthur recording that exact line—'You've gone too far! I'm calling the police'—for his memoirs! Could the Automaton have played it?!"` },
          { act: "ACT III", target: `Say to ${witnessBase.name}:`, line: `"I snuck along the Upstairs Gallery to eavesdrop outside the Study door at 8:50 PM and heard TOTAL SILENCE inside! Think back—did anyone hand Arthur something right before he locked himself in at 8:45?"` }
        ];
      }
      case 2: { // Clara Sterling
        return [
          { act: "ACT I", target: `Say to ${witnessBase.name}:`, line: `"Arthur's New Will is lying open and unsigned—and it specifically mandated releasing Archive Box #4 from 2008. Who spoke to Arthur between 8:40 and 8:45 PM?"` },
          { act: "ACT II", target: `Say to ${coreAccompliceBase.name} [after Exhibit C]:`, line: `"Look at Exhibit C—Archive Box #4 from 2008! Your initials are right there on the burned page, and the lights died at nine sharp. Explain yourself!"` },
          { act: "ACT III", target: `Say to ${inspectorBase.name} [after Exhibit E]:`, line: `"Exhibit E settles two lies at once: Arthur's Horologist Journal proves his pocket watch never drifted a second, and the 2008 Archive Records clear one suspect and point straight to the true culprit!"` }
        ];
      }
      case 3: { // Thomas Graves (when not Witness)
        const t1 = celesteHas820 ? BASE_CHARACTERS[6] : pickTarget([2, 1, 14, 13], [wineSpikerBase.id]);
        const t3 = pickTarget([2, inspectorBase.id, 1, 4], [t1.id, wineSpikerBase.id]);
        return [
          { act: "ACT I", target: `Say to ${t1.name}:`, line: `"Forgive me, but I saw someone on the upstairs gallery at 8:20 PM well before the gala toast. Did you spot anyone slipping out of Lord Arthur's Study?"` },
          { act: "ACT II", target: `Say to ${wineSpikerBase.name}:`, line: `"Everyone keeps talking about the wine, yet the crystal glass on Lord Arthur's desk was completely full. What troubles me is the piping-hot cup of chamomile tea I poured at 8:40 PM—untouched and barely lukewarm by 9:02!"` },
          { act: "ACT III", target: `Say to ${t3.name}:`, line: `"When we entered the Study at 9:02 PM, Lord Arthur's pocket watch had smashed at 8:48 PM—and someone snapped the gold lid shut almost immediately. Why hide the time?"` }
        ];
      }
      case 4: { // Dr. Julian Mercer (when Innocent)
        const t1 = pickTarget([2, 1, 3, 7, 13], [inspectorBase.id, witnessBase.id]);
        return [
          { act: "ACT I", target: `Say to ${t1.name}:`, line: `"As Arthur's physician, I can swear his heart was completely stable at dinner. Whatever killed him tonight behind that locked door was fast-acting foul play, not natural failure."` },
          { act: "ACT II", target: `Say to ${inspectorBase.name} [after Exhibit D]:`, line: `"Something about that 'bitter-almond' claim makes zero medical sense. Cyanide smells of bitter almonds, yes—but Exhibit D's Study re-inspection says the puddle had no scent at all! An odorless plant poison fits far better than cyanide."` },
          { act: "ACT III", target: `Say to ${witnessBase.name} [after Exhibit F]:`, line: `"Exhibit F confirms concentrated Aconite—fatal in two to three minutes. If Arthur collapsed at 8:48 PM, it entered his system right around 8:45 PM from whatever he carried into the Study!"` }
        ];
      }
      case 5: { // Victor Vance (when Innocent & not Wine Spiker)
        const t1 = pickTarget([1, 2, 3, 7], [inspectorBase.id]);
        const t2 = pickTarget([2, 7, 1, 4], [inspectorBase.id, t1.id]);
        return [
          { act: "ACT I", target: `Say to ${t1.name}:`, line: `"Don't look at me just because I needed money! Everybody here knows Arthur's New Will wasn't just about disinheriting family—it was going to blow open a 2008 scandal!"` },
          { act: "ACT II", target: `Say to ${t2.name} [after Exhibit C]:`, line: `"Someone tried to burn Exhibit C in the Study fireplace before nine o'clock! Who in this room was desperate enough to kill Arthur to keep Archive Box #4 sealed?"` },
          { act: "ACT III", target: `Say to ${inspectorBase.name} [after Exhibit F]:`, line: `"Exhibit F proves the wine wasn't the murder weapon at all! Follow the odorless Aconite and the 8:42 PM handoff—that's where the real killer is hiding!"` }
        ];
      }
      case 6: { // Jasper Moore (when Innocent & not Accomplice)
        const t2 = pickTarget([7, 2, 3, 16, 4], [inspectorBase.id]);
        const t3 = pickTarget([2, 1, 3, 4, 13, 19], [inspectorBase.id, t2.id]);
        return [
          { act: "ACT I", target: `Say to ${inspectorBase.name}:`, line: `"I built the backup power system in this manor, and I'm telling you right now: the storm did NOT cause a clean 15-second blackout. Someone manually pulled the main breaker in the basement Generator Room!"` },
          { act: "ACT II", target: `Say to ${t2.name} [after Exhibit D]:`, line: `"Look at Exhibit D—the Automaton's counterweight cam was shifted exactly two inches to strike the water carafe at 9:00 PM sharp. That takes deliberate calibration, not luck!"` },
          { act: "ACT III", target: `Say to ${t3.name}:`, line: `"Think like an engineer: the 9:00 PM blackout and the 9:00 PM counterweight drop happened on the exact same chime. Whoever pulled that basement breaker was working for the real killer!"` }
        ];
      }
      case 7: { // Celeste Moreau
        const t2 = pickTarget([1, 2, 3, 4, 6], [witnessBase.id, coreAccompliceBase.id]);
        return [
          { act: "ACT I", target: `Say to ${witnessBase.name}:`, line: `"All right, I snuck up to the gallery at 8:20 PM for a glimpse of the Automaton—and right as I reached the top of the stairs, I saw a figure in a dark coat slip out of Arthur's Study carrying a small dark case!"` },
          { act: "ACT II", target: `Say to ${t2.name} [after Exhibit D]:`, line: `"Mon Dieu—look at Exhibit D! The Chronos Automaton can play a pre-recorded brass cylinder at 8:55 PM AND drop its 5-pound counterweight at 9:00 PM! Arthur could have been dead BEFORE 8:55!"` },
          { act: "ACT III", target: `Say to ${coreAccompliceBase.name}:`, line: `"The Automaton's counterweight was shifted two inches to smash that carafe at 9:00 PM—the exact second the lights went out while you were missing from the Grand Hall. Don't tell me that's a coincidence!"` }
        ];
      }
      case 8: { // Harriet Vance-Cole (when Innocent & not Inspector)
        const t2 = pickTarget([2, 1, 3, 4, 13], [coreAccompliceBase.id, witnessBase.id]);
        return [
          { act: "ACT I", target: `Say to ${coreAccompliceBase.name}:`, line: `"Old magistrate's habit—I did a headcount in the Grand Hall when the clock struck nine. You weren't there. Care to tell me where you vanished during the blackout?"` },
          { act: "ACT II", target: `Say to ${t2.name}:`, line: `"Arthur invited me back after ten years of silence for one reason: tonight he was finally exposing the 2008 Archive Box #4 cover-up, and he warned me to watch the people he trusted most."` },
          { act: "ACT III", target: `Say to ${witnessBase.name} [after Exhibit F]:`, line: `"Exhibit F settled it: the wine only held sleeping sedative, while Arthur's lips and cuff tested positive for odorless Aconite. Who handed him something right before 8:45?"` }
        ];
      }
      case 9: { // Chef Henri Laurent
        const t3 = pickTarget([7, 1, 2, 4, 13], [wineSpikerBase.id, inspectorBase.id]);
        return [
          { act: "ACT I", target: `Say to ${wineSpikerBase.name}:`, line: `"Do not insult my kitchen! At 7:58 PM I stepped into the Dining & Sideboard and saw someone hovering nervously over my 1998 Bordeaux decanter with a tiny white paper packet. What did you put in my wine?!"` },
          { act: "ACT II", target: `Say to ${inspectorBase.name} [after Exhibit D]:`, line: `"I personally decanted that Bordeaux at 7:45 PM—notes of dark cherry, NEVER bitter almonds! And Exhibit D's Study re-inspection says the puddle on the Study floor was odorless water. Someone lied about smelling almonds!"` },
          { act: "ACT III", target: `Say to ${t3.name}:`, line: `"I brewed Lord Arthur's chamomile tea at a rolling boil at 8:38 PM! If that single poured cup sat untouched until it was barely lukewarm by 9:02 PM, then he never took a sip—he was already gone well before nine!"` }
        ];
      }
      case 10: { // Margot Bell
        const t1 = pickTarget([2, 1, 3, 4], [coreAccompliceBase.id]);
        const t3 = pickTarget([2, 1, 7, 4, 13], [coreAccompliceBase.id, t1.id]);
        return [
          { act: "ACT I", target: `Say to ${t1.name}:`, line: `"Forgive my curiosity, but I heard Arthur's New Will creates a transparency foundation. Does it unseal Archive Box #4 from November 2008?"` },
          { act: "ACT II", target: `Say to ${coreAccompliceBase.name} [after Exhibit C]:`, line: `"Interesting—I happen to carry a 2008 Boston Chronicle clipping about Archive Box #4. It implicates someone with direct 2008 access. Did you have any access to Archive Box #4 in 2008?"` },
          { act: "ACT III", target: `Say to ${t3.name} [after Exhibit E]:`, line: `"I'm actually an investigative reporter with the Boston Chronicle. My 2008 clipping matches Exhibit E—check who actually had 2008 access and cross off everyone cleared!"` }
        ];
      }
      case 11: { // Sebastian Cole
        const t1 = pickTarget([1, 2, 3, 4, 13], []);
        const t2 = pickTarget([7, 6, 16, 2, 1, 4], [t1.id]);
        const t3 = pickTarget([1, 7, 2, 3, 4, 13], [t1.id, t2.id]);
        const clockworkPrefix = [7, 6, 16].includes(t2.id)
          ? "You know clockwork better than anyone here—could the Automaton play a voice at 8:55 and drop a counterweight at 9:00?"
          : "Look at Exhibit D—could the Automaton really play a voice at 8:55 and drop a counterweight at 9:00?";
        return [
          { act: "ACT I", target: `Say to ${t1.name}:`, line: `"Don't let anyone tell you Arthur was alive and well at 8:50. I was... admiring the upstairs gallery around 8:48 PM, and I distinctly heard a heavy, muffled THUMP inside his locked Study—followed by dead silence."` },
          { act: "ACT II", target: `Say to ${t2.name} [after Exhibit D]:`, line: `"${clockworkPrefix} Because whatever thumped at 8:48 PM sounded like a man hitting the floor!"` },
          { act: "ACT III", target: `Say to ${t3.name}:`, line: `"Fine, I had no business lingering in the upstairs gallery at 8:48 PM—I was eyeing a Fabergé clock, all right? Arrest me for bad taste, not murder! But I swear Arthur collapsed at 8:48 PM!"` }
        ];
      }
      case 12: { // Lydia Vance
        const t3 = pickTarget([2, 1, 3, 7, 13, 19], [inspectorBase.id, coreAccompliceBase.id, wineSpikerBase.id]);
        const act1Line = wineSpikerBase.id === 5
          ? `"Look me in the eye. If you did something desperate with that wine tonight because of money, I am not going down with you."`
          : `"Everyone's whispering about the wine decanter tonight—if you touched that wine before dinner, tell the truth right now before this room pins a murder on the wrong person!"`;
        return [
          { act: "ACT I", target: `Say to ${wineSpikerBase.name}:`, line: act1Line },
          { act: "ACT II", target: `Say to ${coreAccompliceBase.name}:`, line: `"Funny thing—at 8:35 PM near the basement stairs, I overheard two people whispering furiously: 'Fifteen seconds of dark at nine sharp, or your secret goes to the police!' Care to tell me who was blackmailing you?"` },
          { act: "ACT III", target: `Say to ${t3.name}:`, line: `"Don't let anyone blame the storm for the 9:00 PM blackout! I overheard the blackmail threat on the basement stairs at 8:35 PM—whoever cut the lights was forced into it by the real killer!"` }
        ];
      }
      case 13: { // Father Silas Ward
        const t1 = pickTarget([2, 1, 3, 4, 7], [inspectorBase.id, wineSpikerBase.id]);
        return [
          { act: "ACT I", target: `Say to ${t1.name}:`, line: `"I have been Arthur's confessor for twenty years. Last Tuesday he came to me burdened by eighteen years of shielding a guilty soul from a 2008 sin he could no longer keep buried."` },
          { act: "ACT II", target: `Say to ${inspectorBase.name} [after Exhibit C]:`, line: `"I am bound by the Seal of Confession, so listen carefully: Arthur's New Will was his final act of penance to unseal Archive Box #4. The guilty soul feared the truth of 2008 far more than losing an inheritance."` },
          { act: "ACT III", target: `Say to ${wineSpikerBase.name} [after Exhibit E]:`, line: `"Look past the noise of the 9:00 PM blackout and read Exhibit E with clear eyes. The person who truly belonged to that 2008 sin is the one who silenced Arthur before he could sign."` }
        ];
      }
      case 14: { // Damien Cross (when Innocent)
        const t2 = pickTarget([7, 2, 1, 6, 4], [inspectorBase.id, witnessBase.id]);
        return [
          { act: "ACT I", target: `Say to ${inspectorBase.name}:`, line: `"As head of security, I inspected the Study door at 9:01 PM myself—the steel deadbolt was genuinely thrown from the inside. Nobody walked in or out after Arthur locked it at 8:45 PM."` },
          { act: "ACT II", target: `Say to ${t2.name} [after Exhibit D]:`, line: `"Think tactically: if the Study deadbolt was locked from inside at 8:45, the ONLY way to stage an 8:55 shout and a 9:00 crash was a rigged mechanical timer inside the room!"` },
          { act: "ACT III", target: `Say to ${witnessBase.name} [after Exhibit F]:`, line: `"Locked door from the inside means the Aconite walked into the Study WITH Arthur at 8:45 PM. Whoever handed him something at 8:42 PM in the Grand Hall is our killer!"` }
        ];
      }
      case 15: { // Beatrice (Bea) Holloway
        const t2 = pickTarget([1, 2, 7, 4, 13, 19], [witnessBase.id]);
        const t3 = pickTarget([2, 7, 1, 4, 13, 19], [witnessBase.id, t2.id]);
        return [
          { act: "ACT I", target: `Say to ${witnessBase.name}:`, line: `"Something's mighty odd! At 9:04 PM, minutes after the Study door was broken open, I was in the basement Laundry Room and heard something drop straight down the upstairs laundry chute!"` },
          { act: "ACT II", target: `Say to ${t2.name}:`, line: `"The upstairs laundry chute is in the second-floor hall near the Grand Staircase—someone hastily ditched evidence from the Study at 9:04 PM before anyone could search their pockets!"` },
          { act: "ACT III", target: `Say to ${t3.name} [after Exhibit F]:`, line: `"I pulled a crumpled linen handkerchief with faint botanical residue from the basement laundry bin beneath the chute at 9:04 PM! Whoever rushed to Arthur's body first at 9:01 pocketed it from the Study and dumped it down the chute!"` }
        ];
      }
      case 16: { // Gideon Thorne
        const t2 = pickTarget([2, inspectorBase.id, 1, 4], [coreAccompliceBase.id]);
        return [
          { act: "ACT I", target: `Say to ${coreAccompliceBase.name}:`, line: `"A word in private! At 8:38 PM I saw you looking panicked in the hall and heard you mutter about being blackmailed into cutting the manor's power at 9:00 PM sharp. What the hell is going on?"` },
          { act: "ACT II", target: `Say to ${t2.name}:`, line: `"Arthur and I were business rivals, not enemies to the death. If you want to know why the lights died at nine, stop blaming the storm—someone in this house blackmailed an accomplice into pulling the breaker!"` },
          { act: "ACT III", target: `Say to ${coreAccompliceBase.name}:`, line: `"A man is dead! Whoever blackmailed you tonight used your 9:00 PM blackout as cover for a murder that happened twelve minutes earlier—save yourself before you take the fall!"` }
        ];
      }
      case 17: { // Vivienne Sterling
        const t1 = pickTarget([2, 1, 3, 4, 13], [inspectorBase.id, wineSpikerBase.id]);
        const act3Motive = wineSpikerIsFamily
          ? "You only cared about the inheritance."
          : "You only cared about getting into Arthur's Study for the New Will.";
        return [
          { act: "ACT I", target: `Say to ${t1.name}:`, line: `"I probably should have mentioned this sooner—at 4:00 PM today in the Library, I caught someone alone reading Page 14 (the 2008 Archive Box #4 clause) of the New Will, and they went pale as a ghost!"` },
          { act: "ACT II", target: `Say to ${inspectorBase.name} [after Exhibit C]:`, line: `"I typed up the New Will myself this afternoon. Arthur added the Archive Box #4 release clause at the very last minute—whoever read Page 14 at 4:00 PM realized they had until 9:00 PM to stop him!"` },
          { act: "ACT III", target: `Say to ${wineSpikerBase.name} [after Exhibit E]:`, line: `"You didn't even know about Page 14's 2008 clause, did you? ${act3Motive} Look at Exhibit E—the real killer was terrified of Archive Box #4!"` }
        ];
      }
      case 18: { // Nadia Vance (when Innocent)
        const t3 = pickTarget([2, 1, 7, 4, 13], [inspectorBase.id, witnessBase.id]);
        return [
          { act: "ACT I", target: `Say to ${inspectorBase.name}:`, line: `"As a pharmacology researcher, something bothers me: cyanide has a strong bitter-almond odor, whereas concentrated Aconite is completely odorless and stops the heart in two to three minutes!"` },
          { act: "ACT II", target: `Say to ${witnessBase.name} [after Exhibit D]:`, line: `"Look at Exhibit D's Study re-inspection—the puddle on the floor was clear, odorless water, and the wine glass wasn't even touched. Whoever claimed to smell 'bitter almonds from the wine' was steering us away from an odorless poison!"` },
          { act: "ACT III", target: `Say to ${t3.name} [after Exhibit F]:`, line: `"Exhibit F confirms my hunch! Chloral Hydrate in the wine is just a non-lethal sedative, while concentrated Aconite on Arthur's lips kills in 2–3 minutes—matching an 8:45 PM dose and an 8:48 PM collapse!"` }
        ];
      }
      case 19: { // Capt. Roderick Hale
        const t2 = pickTarget([7, 2, 1, 4, 6], [witnessBase.id]);
        const t3 = pickTarget([2, inspectorBase.id, 1, 4, 13], [witnessBase.id, t2.id]);
        return [
          { act: "ACT I", target: `Say to ${witnessBase.name}:`, line: `"Hold everything! Someone just claimed Arthur's pocket watch ran twelve minutes slow? Hogwash! I synced my U.S. Naval Observatory chronometer with Arthur's watch at the pier yesterday—dead-on to the second!"` },
          { act: "ACT II", target: `Say to ${t2.name} [after Exhibit D]:`, line: `"If Arthur's watch never lost a second and smashed at 8:48 PM, then whoever we heard yelling at 8:55 PM wasn't Arthur—unless ghosts can shout through oak doors, it had to be that brass cylinder!"` },
          { act: "ACT III", target: `Say to ${t3.name} [after Exhibit E]:`, line: `"Arthur's Horologist Journal in Exhibit E backs me up 100%! His watch stopped at 8:48 PM—which means whoever snapped that watch lid shut and called it 'twelve minutes slow' lied to this entire room!"` }
        ];
      }
      case 20: // Alistair Finch
      default: {
        const t1 = pickTarget([1, 2, 3, 4, 13], []);
        const t2 = pickTarget([7, 2, 1, 6, 4], [t1.id]);
        const t3 = pickTarget([2, 1, 7, 3, 4, 13], [t1.id, t2.id]);
        return [
          { act: "ACT I", target: `Say to ${t1.name}:`, line: `"Don't you find it extraordinary? The exact words we heard Arthur shouting at 8:55 PM—'You've gone too far! I'm calling the police as soon as the lines are back!'—are word-for-word from Chapter 12 of the memoir he dictated to me two days ago!"` },
          { act: "ACT II", target: `Say to ${t2.name} [after Exhibit D]:`, line: `"I personally helped Arthur record Chapter 12 onto a blank brass cylinder two days ago and watched him set it beside the Automaton! If that cylinder is inside Exhibit D, someone swapped it to fake his voice!"` },
          { act: "ACT III", target: `Say to ${t3.name} [after Exhibit E]:`, line: `"Arthur fired me yesterday just for peeking at his sealed Archive Box #4! Chapter 12 of his memoir was all about that 2008 cover-up—and Exhibit E finally names the culprit he was protecting!"` }
        ];
      }
    }
  }

  const engine = {
    MIN_PLAYERS,
    MAX_PLAYERS,
    BASE_CHARACTERS,
    CLASSIC_CODE,
    accompliceCountFor,
    getVariationBlueprint,
    withArticle,
    encodeCaseCode,
    decodeCaseCode,
    rollRandomCase,
    buildScenario
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = engine;
  }
  if (global) {
    global.RavenshollowEngine = engine;
  }
})(typeof window !== "undefined" ? window : (typeof globalThis !== "undefined" ? globalThis : this));
