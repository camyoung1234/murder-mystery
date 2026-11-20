/* ============================================================================
   THE LAST CHIME OF RAVENSHOLLOW — 20-KILLER DYNAMIC MYSTERY ENGINE
   Shared across Companion App & All Printable Character / Evidence Sheets.
   Supports any player count (8-20) and any Killer (#1-#N) via a scrambled
   spoiler-free Case Code (e.g., RV-4821).
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
      clue: "Arthur's New Will specifically mandated releasing Archive Box #4 from 2008. Exhibit E reveals the Executive & Guest History Ledger plus Arthur's Horologist Journal.",
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
      deliveryItem: "private evening chamomile honey spoon",
      accomplices: [6, 14, 18]
    },
    {
      id: 4, name: "Dr. Julian Mercer", role: "Arthur's Personal Physician", initials: "J.M.",
      persona: "Calm, composed physician who has looked after Arthur's health for years and was standing in the Grand Hall at 8:55 PM.",
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
      deliveryItem: "rigged brass Automaton winding key (contact toxin)",
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
      deliveryItem: "private hand-delivered dark-chocolate truffle",
      accomplices: [6, 14, 18]
    },
    {
      id: 10, name: "Margot Bell", role: "Undercover Investigative Journalist", initials: "M.B.",
      persona: "Sharp Boston Chronicle reporter who secretly crashed the gala posing as a guest's plus-one to investigate Arthur's 2008 cover-up.",
      secret: "You paid your way onto the guest list under a fake name to hunt for Archive Box #4 in the manor library.",
      clue: "You carry a 2008 newspaper clipping confirming Archive Box #4 implicates someone who was professionally active in 2008—NOT someone hired in 2012!",
      detention: "Searched from Margot's Bag: A Boston Chronicle press pass and a 2008 clipping noting the Archive Box #4 cover-up was buried by Arthur Vance in November 2008.",
      ledger2008: "Investigative Reporter, Boston Chronicle (2007–2008)",
      scandalTitle: "2008 Blackmail Payout — Suppressed Exposé",
      scandalDetail: "Accepted $500k hush money to bury a fatal corporate scandal; source log FALSIFIED",
      deliveryItem: "spiced espresso demitasse handed before the toast",
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
      persona: "Icy, ambitious, and furious with Victor (#5) for gambling away your savings.",
      secret: "At 8:35 PM near the basement stairs, you overheard two people whispering furiously: 'Fifteen seconds of dark at nine sharp, or your secret goes to the police!'",
      clue: "You know for a fact that the 9:00 PM blackout was a deliberate blackmail job—NOT a storm surge!",
      detention: "Searched from Lydia's Purse: Signed divorce papers naming Victor's $400k debt, plus a cocktail napkin note: '8:35 PM basement stairs — overheard: 15 seconds of dark at 9 sharp or secret goes to police.'",
      ledger2008: "Corporate Accountant, Vance Holdings (2006–2008)",
      scandalTitle: "2008 Tax Shelter — Embezzled Dividend Ledger",
      scandalDetail: "$1.8M siphoned into Cayman accounts; audit sheet FALSIFIED",
      deliveryItem: "chilled champagne flute handed at 8:42 PM",
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
      id: 15, name: "Beatrice \"Bea\" Holloway", role: "Head Housekeeper", initials: "B.H.",
      persona: "Brisk, sharp-eyed housekeeper who notices everything dropped in a bin or tossed down the laundry chute.",
      secret: "At 9:04 PM, you heard something drop down the upstairs laundry chute right after the Study door was broken open—someone hastily ditched evidence from the Study!",
      clue: "The upstairs laundry chute is right outside the Study wing and drops straight into the basement Laundry Room.",
      detention: "Searched from Bea's Apron Pocket: A folded linen handkerchief containing trace shards pulled from the basement laundry chute at 9:04 PM!",
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
      clue: "At 8:38 PM, someone panicked and whispered to you that they were being blackmailed into cutting the manor's power at 9:00 PM sharp!",
      detention: "Searched from Gideon's Briefcase: A $150,000 cashier's check for 'consulting services' and a note: '8:38 PM — Blackout at 9:00 PM was forced by blackmail!'",
      ledger2008: "VP of Engineering, Vance Precision (2005–2008)",
      scandalTitle: "2008 Patent Espionage — Stolen Defense Blueprints",
      scandalDetail: "Sold classified naval chronometer specs abroad; export log FALSIFIED",
      deliveryItem: "celebratory Cuban cigar with laced tip",
      accomplices: [6, 14, 18]
    },
    {
      id: 17, name: "Vivienne Sterling", role: "Clara's Junior Law Associate", initials: "V.S.",
      persona: "Meticulous, ambitious junior attorney who personally typed up Arthur's New Will this afternoon.",
      secret: "You secretly copied the corporate restructuring pages onto a thumb drive to shop to a rival firm—shady ambition, NOT murder.",
      clue: "At 4:00 PM today in the library, you caught someone alone reading Page 14 (the 2008 Archive Box #4 clause) of the New Will—they went pale as a ghost!",
      detention: "Searched from Vivienne's Portfolio: A 4:00 PM legal sticky note: 'Caught a guest reading Page 14 (2008 Archive Box #4 clause) of the New Will in the library. They looked terrified.'",
      ledger2008: "Legal Clerk, Sterling & Vance (2008)",
      scandalTitle: "2008 Evidence Tampering — Altered Deposition",
      scandalDetail: "Swapped sworn testimony pages in a liability suit; filing log FALSIFIED",
      deliveryItem: "signature fountain pen & wax-seal stamp (laced)",
      accomplices: [6, 14, 18]
    },
    {
      id: 18, name: "Nadia Vance", role: "Pharmacology Student & Cousin", initials: "N.V.",
      persona: "Brilliant pharmacology student whose medical school tuition is funded by the Vance family trust.",
      secret: "You borrowed rare botanical specimens from the university conservatory for an unauthorized thesis experiment—academic misconduct, NOT murder.",
      clue: "As a pharmacology student, you know concentrated Aconite is completely odorless and fatal within 2–3 minutes—totally different from bitter-almond cyanide!",
      detention: "Searched from Nadia's Clutch: Lab notes comparing Chloral Hydrate (non-lethal sedative) vs. Aconite (odorless, fatal in 2–3 minutes).",
      ledger2008: "Vance Youth Science Fellow (2008)",
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
      deliveryItem: "honey-lemon throat pastille before Arthur's speech",
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

  function rollRandomCase(playerCount) {
    const maxP = Math.max(8, Math.min(20, parseInt(playerCount, 10) || 8));
    const killerId = Math.floor(Math.random() * maxP) + 1;
    return encodeCaseCode(killerId);
  }

  // Default Classic Case Code (Dr. Julian Mercer #4)
  const CLASSIC_CODE = encodeCaseCode(4, 107);

  function withArticle(phrase) {
    const clean = String(phrase || "").trim();
    return (/^[aeiou]/i.test(clean) ? "an " : "a ") + clean;
  }

  function buildScenario(caseCode, playerCount) {
    const n = Math.max(8, Math.min(20, parseInt(playerCount, 10) || 8));
    const decoded = decodeCaseCode(caseCode || CLASSIC_CODE);
    // If someone loads a code whose killerId > n, wrap cleanly into 1..n
    const killerId = decoded.killerId <= n ? decoded.killerId : ((decoded.killerId - 1) % n) + 1;
    const killerBase = BASE_CHARACTERS[killerId - 1];

    // Fixed Accomplices scaled by player count (never includes killerId, always <= n)
    const accomplices = [];
    const cand = killerBase.accomplices;
    accomplices.push(cand[0]); // Core accomplice (always 1..8)
    if (n >= 14) accomplices.push(cand[1]);
    if (n >= 18) accomplices.push(cand[2]);

    const shadowIds = [killerId, ...accomplices];
    const coreAccompliceId = accomplices[0];
    const coreAccompliceBase = BASE_CHARACTERS[coreAccompliceId - 1];

    // Choose Inspector (Harriet #8 by default; fallback Clara #2 or Graves #3 if #8 is Shadow)
    let inspectorId = 8;
    if (shadowIds.includes(8)) inspectorId = !shadowIds.includes(2) ? 2 : 3;
    const inspectorBase = BASE_CHARACTERS[inspectorId - 1];

    // Key Witness who saw the 8:42 PM delivery (Graves #3, or Clara #2 if Graves is Shadow, or Evelyn #1)
    let witnessId = 3;
    if (shadowIds.includes(3)) witnessId = !shadowIds.includes(2) ? 2 : 1;
    const witnessBase = BASE_CHARACTERS[witnessId - 1];

    // Red Herring Wine Spiker (Victor #5, or Lady Evelyn #1 / Celeste #7 if Victor is on Shadow Team)
    const wineSpikerId = shadowIds.includes(5) ? (!shadowIds.includes(1) ? 1 : 7) : 5;
    const wineSpikerBase = BASE_CHARACTERS[wineSpikerId - 1];

    // Alibi Witness who stood beside the Killer at 8:55 PM
    let alibiWitnessId = 1;
    if (shadowIds.includes(1) || alibiWitnessId === wineSpikerId || alibiWitnessId === witnessId) {
      alibiWitnessId = [2, 7, 8, 3].find(id => !shadowIds.includes(id) && id !== wineSpikerId && id !== witnessId) || 7;
    }
    const alibiWitnessBase = BASE_CHARACTERS[alibiWitnessId - 1];

    // Pillar 4: 2008 Audit Initials Red Herring (matches both Killer & Core Accomplice!)
    const sameInitials = killerBase.initials === coreAccompliceBase.initials;
    const auditPair = [killerBase, coreAccompliceBase].sort((a, b) => a.id - b.id);
    const auditInitialsLabel = sameInitials
      ? `'${killerBase.initials}'`
      : `'${auditPair[0].initials}' / '${auditPair[1].initials}'`;
    const deliveryWithArticle = withArticle(killerBase.deliveryItem);

    // Build Dynamic Characters 1..20
    const characters = BASE_CHARACTERS.map(base => {
      const id = base.id;
      const isKiller = id === killerId;
      const isAccomplice = accomplices.includes(id);
      const isInspector = id === inspectorId;
      const isCoreAcc = id === coreAccompliceId;
      const isWitness = id === witnessId;
      const isWineSpiker = id === wineSpikerId;

      let team = "innocent";
      let badge = "INNOCENT";
      let badgeClass = "";
      let special = "";
      let persona = base.persona;
      let secret = base.secret;
      let clue = base.clue;
      let detention = base.detention;

      if (isKiller) {
        team = "killer";
        badge = "SHADOW TEAM — KILLER";
        badgeClass = "shadow";
        const allyNames = accomplices.map(aid => `${BASE_CHARACTERS[aid - 1].name} (#${aid})`).join(", ");
        special = `YOU ARE THE KILLER! Win by avoiding indictment in the Final Verdict (frame ${coreAccompliceBase.name} #${coreAccompliceId} or ${wineSpikerBase.name} #${wineSpikerId}!). Your Shadow Team allies: ${allyNames}. During Blackouts, wake up to Intimidate 1 guest OR Plant a False Lead.`;
        secret = `In 2008, YOU were behind "${killerBase.scandalTitle}" (signed "${killerBase.initials}"). Tonight: at 8:15 PM you rigged the Chronos Automaton (8:55 PM voice + 9:00 PM carafe smash); at 8:35 PM you blackmailed ${coreAccompliceBase.name} (#${coreAccompliceId}) to cut the generator at 9:00 PM; at 8:42 PM you handed Arthur ${deliveryWithArticle} laced with concentrated Aconite (he died at 8:48 PM). You stood next to ${alibiWitnessBase.name} (#${alibiWitnessId}) at 8:55 PM for an alibi, then slipped up at 9:01 PM by claiming you saw his chalk-pale lips (he was face-down!), smelled 'bitter-almond wine,' and lied about the 8:48 PM watch.`;
        clue = `STRATEGY: Stay calm! Let the room suspect ${wineSpikerBase.name} (#${wineSpikerId}) for drugging the wine and ${coreAccompliceBase.name} (#${coreAccompliceId}) for the blackout and Exhibit C. If pressed on Exhibit E, claim Arthur's watch broke earlier or someone forged "${killerBase.initials}" to frame you!`;
        detention = `Searched from ${base.name}'s Effects: A folded dinner napkin smudged with faint fireplace soot and an unsigned note in ${base.name}'s handwriting: "Speak to Arthur privately before the 9:00 PM announcement—he cannot open that 2008 file tonight."`;
      } else if (isAccomplice) {
        team = "accomplice";
        badge = "SHADOW TEAM — ACCOMPLICE";
        badgeClass = "shadow";
        special = `YOU ARE ON THE SHADOW TEAM! You are allied with ${killerBase.name} (#${killerId}) and win ONLY if the Killer escapes indictment in the Final Verdict. Wake up with the Shadow Team during Blackout Phases.`;
        if (isCoreAcc) {
          secret = `${killerBase.name} (#${killerId}) caught your private scandal and blackmailed you into cutting the basement generator breaker for 15 seconds at 9:00 PM sharp! You didn't know they were going to murder Arthur, but if they go down, you go to prison as an accessory. Worse, your initials (${base.initials}) appear on the burned Exhibit C audit log from 2008—even though you had no access in 2008!`;
          detention = `Searched from ${base.name}'s Belongings: Heavy rubber-insulated electrical gloves (smelling of ozone from the generator breaker) and an unsigned blackmail note: '9:00 PM sharp. Fifteen seconds of dark, or your secret goes to the police.'`;
        } else {
          secret = `You are secretly tied to ${killerBase.name}'s (#${killerId}) 2008 cover-up and helped keep the upstairs gallery clear from 8:10–8:20 PM while they rigged the Automaton. Protect ${killerBase.name} in Town Hall votes!`;
          detention = `Searched from ${base.name}'s Belongings: A burner phone with an unsent draft: '${killerBase.initials} — Upstairs corridor clear 8:10 to 8:20 PM. Stop Archive Box #4 at any cost.'`;
        }
        clue = `STRATEGY: Deflect suspicion onto ${wineSpikerBase.name} (#${wineSpikerId}) and defend ${killerBase.name}'s (#${killerId}) 8:55 PM Grand Hall alibi!`;
      } else if (isInspector) {
        team = "inspector";
        badge = "INNOCENT — INSPECTOR";
        badgeClass = "inspector";
        special = "SPECIAL ABILITY (BLACKOUT PHASE): During each Blackout, if you are NOT Detained, the Host wakes you alone to secretly read ONE guest's Sealed Detention Card for 12 seconds!";
      }

      if (isWineSpiker && !isKiller && !isAccomplice) {
        secret = `RED HERRING! At 7:58 PM, you snuck into the Dining & Sideboard and put CHLORAL HYDRATE (non-lethal sleeping powder) into Arthur's 1998 Bordeaux wine decanter before a glass was carried up to his Study, then slipped into the Study around 8:05 PM to locate the New Will! You're terrified you killed him—until Exhibit F proves he never drank the wine!`;
        detention = `Searched from ${base.name}'s Pocket: A folded white paper packet labeled 'Chloral Hydrate (Sleep Aid)' and a desperate note about stealing the unsigned New Will.`;
      }

      if (isWitness && !isKiller && !isAccomplice) {
        clue = `1) At 8:40 PM a piping-hot cup of chamomile tea was poured in the Study—by 9:02 PM the untouched cup was barely lukewarm. 2) At 8:42 PM, YOU PERSONALLY SAW ${killerBase.name} (#${killerId}) hand Arthur ${deliveryWithArticle} in the Grand Hall right before Arthur locked himself in the Study!`;
        detention = `Searched from ${base.name}'s Pocket: Tonight's handwritten note: '8:40 PM — Poured hot cup of tea in Study. 8:42 PM — Watched ${killerBase.name} (#${killerId}) hand Arthur ${deliveryWithArticle} in the Grand Hall. 9:02 PM — Tea untouched & barely lukewarm; watch smashed at 8:48 PM.'`;
      }

      // Dynamic Act I-III Mandatory Dialogues
      const dialogues = buildDialoguesFor(id, {
        isKiller, isAccomplice, isCoreAcc, isInspector, isWitness, isWineSpiker,
        accomplices, sameInitials, auditPair, auditInitialsLabel, deliveryWithArticle,
        killerBase, coreAccompliceBase, inspectorBase, witnessBase, wineSpikerBase, alibiWitnessBase, base
      });

      return {
        id, name: base.name, role: base.role, initials: base.initials,
        team, badge, badgeClass, special, persona, secret, clue, detention, dialogues
      };
    });

    // Dynamic Exhibit C text (classic exact-initials match OR dual-flagged initials so Pillar 4 always works!)
    const exhibitCBody = sameInitials
      ? `VANCE PRECISION INSTRUMENTS — CONFIDENTIAL AUDIT\nARCHIVE BOX #4 (SLATED FOR RELEASE WITH NEW WILL)\n-------------------------------------------------\nSUBJECT:   ${killerBase.scandalTitle}\nFINDING:   ${killerBase.scandalDetail}\nSIGNED BY: "${killerBase.initials}" [REST OF LINE BURNED]\nSTATUS:    Suppressed by A. Vance (2008). Full disclosure\n           ordered upon execution of New Will.`
      : `VANCE PRECISION INSTRUMENTS — CONFIDENTIAL AUDIT\nARCHIVE BOX #4 (SLATED FOR RELEASE WITH NEW WILL)\n-------------------------------------------------\nSUBJECT:   ${killerBase.scandalTitle}\nFINDING:   ${killerBase.scandalDetail}\nFLAGGED INITIALS: "${auditPair[0].initials}" / "${auditPair[1].initials}" [ROLES & DATES BURNED]\nNOTE:      One party falsified the 2008 record; the other had\n           no 2008 access to Archive Box #4.\nSTATUS:    Suppressed by A. Vance (2008). Full disclosure\n           ordered upon execution of New Will.`;

    // Build Exhibit E with 6 active guests (Killer, Core Accomplice, Wine Spiker + 3 active innocents with 2008 ties)
    // so players must cross-reference Exhibit C, Exhibit E, and Exhibit F rather than getting an easy giveaway.
    const extraExhibitEIds = [];
    const preferredExtras = [2, 3, 1, 7, 8, 10, 12, 13, 14, 16];
    for (let i = 0; i < preferredExtras.length && extraExhibitEIds.length < 3; i++) {
      const cid = preferredExtras[i];
      if (cid <= n && cid !== killerId && cid !== coreAccompliceId && cid !== wineSpikerId) {
        extraExhibitEIds.push(cid);
      }
    }
    const exhibitERecords = [
      { id: killerId, html: `&bull; <strong>${killerBase.name} (#${killerId}):</strong> ${killerBase.ledger2008}` },
      { id: coreAccompliceId, html: `&bull; <strong>${coreAccompliceBase.name} (#${coreAccompliceId}):</strong> <em>No access to Archive Box #4 in 2008 (outside the 2008 incident window).</em>` },
      { id: wineSpikerId, html: `&bull; <strong>${wineSpikerBase.name} (#${wineSpikerId}):</strong> ${wineSpikerBase.ledger2008}` },
      ...extraExhibitEIds.map(cid => {
        const c = BASE_CHARACTERS[cid - 1];
        return { id: cid, html: `&bull; <strong>${c.name} (#${cid}):</strong> ${c.ledger2008}` };
      })
    ].sort((a, b) => a.id - b.id).map(r => r.html).join("<br/>\n            ");

    // Dynamic Exhibits A–F + False Leads
    const exhibits = [
      {
        id: "A", act: 1, title: "Exhibit A — Study Crime Scene Sketch (9:02 PM)",
        html: `<ul>
          <li><strong>Door &amp; Window:</strong> Heavy oak double-door bolted from the <em>inside</em>; cliff window latched inside.</li>
          <li><strong>The Body:</strong> Lord Arthur Vance slumped across his desk blotter. First reached and rolled over by <strong>${killerBase.name} (#${killerId})</strong> at 9:01 PM.</li>
          <li><strong>Initial Statement (9:01 PM):</strong> As guests rushed in, <strong>${killerBase.name} (#${killerId})</strong> loudly claimed to see Arthur's <em>"chalk-pale lips"</em> and smell <em>"bitter almonds from the spilled wine."</em></li>
          <li><strong>On the Desk:</strong> Unsigned New Will; a crystal wine glass; a single poured porcelain cup of chamomile tea (<strong>barely lukewarm</strong> by 9:02 PM); a broken pocket watch.</li>
          <li><strong>On the Floor:</strong> Shattered glass beside a heavy 5-lb brass counterweight in a pool of spilled liquid.</li>
        </ul>`
      },
      {
        id: "B", act: 1, title: "Exhibit B — Arthur's Shattered Pocket Watch",
        html: `<ul>
          <li><strong>Make:</strong> Custom Vance Precision Gold Chronometer (<em>"A.V. — Time Never Lies"</em>).</li>
          <li><strong>Condition:</strong> Crystal cracked; internal gears jammed from hitting the desk corner.</li>
          <li><strong>Frozen Time:</strong> <strong>8:48 PM</strong> (12 minutes before the 9:00 PM blackout).</li>
          <li><strong>Witness Note:</strong> <strong>${killerBase.name} (#${killerId})</strong> snapped the gold lid shut at 9:02 PM, claiming Arthur's watch <em>"always ran twelve minutes slow."</em></li>
        </ul>`
      },
      {
        id: "C", act: 2, title: `Exhibit C — Charred Audit Log (${auditInitialsLabel})`,
        html: `<pre>${exhibitCBody}</pre>`
      },
      {
        id: "D", act: 2, title: "Exhibit D — Chronos Automaton, Wax Cylinder & Study Re-Inspection",
        html: `<ul>
          <li><strong>Phonograph Drum:</strong> Plays a removable brass wax cylinder at a scheduled minute. Currently set to <strong>8:55 PM</strong>.</li>
          <li><strong>Release Cam:</strong> Drops a 5-lb brass counterweight at <strong>9:00 PM</strong> (shifted 2 inches to strike the water carafe).</li>
          <li><strong>Cylinder Label:</strong> Reads <em>"9:00 PM Gala Greeting"</em> — hastily glued over a scratched-out title: <strong>"Memoir Draft — Confrontation."</strong></li>
          <li><strong>Study Re-Inspection (Clear Light):</strong> The crystal wine glass on the desk is <strong>completely full &amp; untouched</strong>; the shattered glass on the floor is a <strong>water carafe</strong> in <strong>clear, odorless liquid</strong> (zero wine, zero bitter-almond scent). Desk-blotter impressions confirm Arthur collapsed <strong>face-down, facing away from the door</strong> until <strong>${killerBase.name} (#${killerId})</strong> rolled him over.</li>
        </ul>`
      },
      {
        id: "E", act: 3, title: "Exhibit E — 2008 Dossier Ledger & Horologist Journal",
        html: `<ul>
          <li><strong>Selected 2008 Archive Records:</strong><br/>
            ${exhibitERecords}
          </li>
          <li><strong>Arthur's Horologist Journal (Nov 15):</strong> <em>"A clockmaker whose own pocket watch loses a single second is a fraud. My gold chronometer is calibrated daily to the U.S. Naval Observatory signal. It has not drifted by half a second in eleven years."</em></li>
        </ul>`
      },
      {
        id: "F", act: 3, title: "Exhibit F — Field Toxicology Report",
        html: `<ul>
          <li><strong>Red Wine (Dining Sideboard Decanter &amp; Untouched Study Glass):</strong> Positive for <strong>Chloral Hydrate</strong> (non-lethal sleeping sedative). Arthur never drank it.</li>
          <li><strong>Residue on Arthur's Lips &amp; Cuff:</strong> Positive for <strong>Concentrated Aconite</strong> (fast-acting, completely <strong>odorless</strong> cardiac poison; fatal in <strong>2–3 minutes</strong>) — matching trace contact from ${deliveryWithArticle.replace(killerBase.deliveryItem, `<strong>${killerBase.deliveryItem}</strong>`)}.</li>
          <li><strong>Floor Puddle:</strong> Plain spring water. Zero wine, zero bitter-almond odor.</li>
        </ul>`
      },
      {
        id: "FL1", act: 0, title: "False Lead #1 — Crumpled Generator Note (Blackout Action)",
        html: `<p><em>Found crumpled on the basement stairs immediately after the blackout:</em></p><pre>"9:00 PM sharp. Pull the main breaker. Don't let anyone see you. — ${wineSpikerBase.initials}"</pre>`
      },
      {
        id: "FL2", act: 0, title: "False Lead #2 — Anonymous Library Rumor (Blackout Action)",
        html: `<p><em>Slipped under the Library door during the blackout:</em></p><pre>"Check the Dining &amp; Sideboard! Someone wiped down the Bordeaux decanter left on the sideboard with an almond-scented handkerchief right before 9:00 PM."</pre>`
      }
    ];

    const exhibitCScriptDesc = sameInitials
      ? `a half-burned 2008 audit log signed '${killerBase.initials}'`
      : `a half-burned 2008 audit log flagging the initials '${auditPair[0].initials}' and '${auditPair[1].initials}'`;

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
        sub: "Read Public Opener, unlock Exhibits A & B, mingle (7m), then Vote (3m) & Blackout (1m).",
        html: `
          <div class="script-line"><div class="script-speaker">${witnessBase.name} (#${witnessId})</div>"Nobody touch a thing! The oak door was bolted from the inside, and the window drops eighty feet to the rocks. How on earth could someone kill him in a locked room?"</div>
          <div class="script-line"><div class="script-speaker">${alibiWitnessBase.name} (#${alibiWitnessId})</div>"He was shouting at someone at 8:55! We all heard him! Then at 9:00 the lights went out and—my God, was that a gunshot?"</div>
          <div class="script-line"><div class="script-speaker">${killerBase.name} (#${killerId})</div>"There is no bullet wound. It was poison! The moment the lights came back on at 9:01, I saw Arthur's chalk-pale lips and smelled that unmistakable bitter-almond scent from the spilled wine. He died right around nine."</div>
          <div class="script-line"><div class="script-speaker">${witnessBase.name} (#${witnessId})</div>"Begging your pardon, but when I stepped beside the desk, I noticed Lord Arthur's pocket watch had smashed on the corner—its hands were stopped at 8:48."</div>
          <div class="script-line"><div class="script-speaker">${killerBase.name} (#${killerId})</div>"Ah, yes, I closed the lid so it wouldn't upset everyone. Arthur's watch always ran twelve minutes slow—he told me so himself just yesterday."</div>
          <div class="script-line"><div class="script-speaker">${inspectorBase.name} (#${inspectorId})</div>"Slow or not, the New Will is still on his desk—unsigned. Whoever wanted Arthur dead before 9:00 PM is standing in this room."</div>`
      },
      blackout1: {
        label: "BLACKOUT PHASE I (1 MIN)",
        sub: "100% Spoiler-Free Automated Blackout — everyone closes their eyes!",
        html: `<p style="margin-bottom:14px;">Click <strong>Start Auto-Blackout</strong> below (or in the top bar). The app will narrate the entire Blackout phase aloud—waking the Shadow Team to make a silent tap, then waking the Inspector to privately inspect 1 Detention Card—so <strong>nobody has to sit out as a human host!</strong></p>
        <button class="btn btn-gold" onclick="startAutoBlackout()">Launch Auto-Blackout Phase I</button>`
      },
      act2: {
        label: "ACT II — SHADOWS IN THE CLOCKWORK (6 MIN)",
        sub: "Read Public Opener, unlock Exhibits C & D, mingle (6m), then Vote (3m) & Blackout (1m).",
        html: `
          <div class="script-line"><div class="script-speaker">${inspectorBase.name} (#${inspectorId})</div>"While the upstairs gallery was cleared, we inspected the Study fireplace and the Chronos Automaton. We have two new exhibits—${exhibitCScriptDesc}, and a scratched brass wax cylinder inside the Automaton."</div>
          <div class="script-line"><div class="script-speaker">Celeste Moreau (#7)</div>"Wait—a scratched cylinder? Arthur built the Chronos Automaton to play a recorded greeting at 9:00 PM. You can also program its brass counterweight to drop on the hour. If someone swapped the cylinder..."</div>
          <div class="script-line"><div class="script-speaker">${coreAccompliceBase.name} (#${coreAccompliceId})</div>"Don't look at me just because '${coreAccompliceBase.initials}' is on that burned page! Half the people in this house had a reason to hate Arthur. And if you're wondering why the lights went out at nine, the storm probably surged the old breaker!"</div>
          <div class="script-line"><div class="script-speaker">${wineSpikerBase.name} (#${wineSpikerId})</div>"Oh, spare us! And what about the wine? ${killerBase.name} said it smelled of poison—who poured Arthur's glass?!"</div>
          <div class="script-line"><div class="script-speaker">${witnessBase.name} (#${witnessId})</div>"Actually... look at our Study re-inspection on Exhibit D. In clear light, the wine glass on the desk is completely full and untouched—it was the water carafe that shattered in odorless water, and Arthur was slumped face-down!"</div>`
      },
      blackout2: {
        label: "BLACKOUT PHASE II (1 MIN)",
        sub: "100% Spoiler-Free Automated Blackout — everyone closes their eyes!",
        html: `<p style="margin-bottom:14px;">Click <strong>Start Auto-Blackout</strong> below (or in the top bar). The app will narrate the entire Blackout phase aloud—waking the Shadow Team, then waking the Inspector—with zero spoilers for anyone!</p>
        <button class="btn btn-gold" onclick="startAutoBlackout()">Launch Auto-Blackout Phase II</button>`
      },
      act3: {
        label: "ACT III — THE LAST CHIME (7 MIN)",
        sub: "Read Public Opener, unlock Exhibits E & F, mingle (7m), then Final Verdict (3m) & Reveal!",
        html: `
          <div class="script-line"><div class="script-speaker">${inspectorBase.name} (#${inspectorId})</div>"Enough games. We unlocked Arthur's private Horologist Journal and the 2008 Archive Ledger—and tested the residue in the Study with a field chemistry kit."</div>
          <div class="script-line"><div class="script-speaker">${witnessBase.name} (#${witnessId})</div>"Look closely at Exhibit E and Exhibit F before you cast your final vote. The single cup of chamomile tea poured at 8:40 PM was untouched and barely lukewarm by 9:02 PM—and Arthur never touched his wine."</div>
          <div class="script-line"><div class="script-speaker">${killerBase.name} (#${killerId})</div>"Careful, everyone—wild theories will only let the real killer slip away. Look at who had the motive to steal the Will, who rigged the power, and who wasn't in the Grand Hall at nine. Let's settle this."</div>`
      }
    };

    const pillar4Proof = sameInitials
      ? `Exhibit C's charred <strong>"${killerBase.initials}"</strong> matches both ${killerBase.name} and ${coreAccompliceBase.name}, but Exhibit E clears ${coreAccompliceBase.name} (no 2008 access) and ties <strong>${killerBase.name}</strong> directly to <strong>${killerBase.scandalTitle}</strong> (${killerBase.ledger2008})!`
      : `Exhibit C flagged both <strong>"${auditPair[0].initials}"</strong> and <strong>"${auditPair[1].initials}"</strong>, but Exhibit E clears ${coreAccompliceBase.name} (no 2008 access) and ties <strong>${killerBase.name}</strong> directly to <strong>${killerBase.scandalTitle}</strong> (${killerBase.ledger2008})!`;

    const revealHtml = `
      <h2 class="serif" style="color:var(--gold); font-size:1.6rem; margin-bottom:12px;">The Truth Behind the Last Chime (${decoded.code})</h2>
      <p style="margin-bottom:12px;">
        <strong>The Killer:</strong> <span style="color:#ff7b7b; font-weight:700;">${killerBase.name} (#${killerId})</span><br/>
        <strong>The Accomplices (Shadow Team):</strong> <span style="color:var(--gold);">${accomplices.map(id => `${BASE_CHARACTERS[id - 1].name} (#${id})`).join(", ")}</span><br/>
        <strong>The Inspector:</strong> <span style="color:#6be0a3;">${inspectorBase.name} (#${inspectorId})</span>
      </p>
      <p style="margin-bottom:10px;">
        Arthur Vance did <strong>not</strong> die at 9:00 PM. He died at <strong>8:48 PM</strong>—alone behind a bolted door—from <strong>concentrated Aconite</strong> hidden in the <strong>${killerBase.deliveryItem}</strong> handed to him by <strong>${killerBase.name} (#${killerId})</strong> at 8:42 PM.
      </p>
      <p style="margin-bottom:10px;">
        ${wineSpikerBase.name} (#${wineSpikerId}) spiked the red wine with harmless sleeping powder, which Arthur never touched. The 8:55 PM argument was a <strong>pre-recorded brass wax cylinder</strong> played by the Chronos Automaton, and the 9:00 PM crash was the counterweight smashing the <strong>water carafe</strong> while blackmailed accomplice <strong>${coreAccompliceBase.name} (#${coreAccompliceId})</strong> cut the generator breaker for 15 seconds.
      </p>
      <p style="margin-bottom:10px;">
        <strong>The 4-Pillar Proof:</strong> (1) Arthur's pocket watch froze at <strong>8:48 PM</strong> and his Horologist Journal proves it never lost a second; (2) The wine was untouched and Arthur died of odorless Aconite from the ${killerBase.deliveryItem}; (3) ${killerBase.name} slipped up in Act I by claiming to see Arthur's pale lips (Arthur was face-down!) and smell bitter almonds from spilled wine (it was odorless water!); (4) ${pillar4Proof}
      </p>`;

    return {
      code: decoded.code,
      playerCount: n,
      killerId,
      accomplices,
      shadowIds,
      inspectorId,
      witnessId,
      wineSpikerId,
      alibiWitnessId,
      killerBase,
      coreAccompliceBase,
      inspectorBase,
      witnessBase,
      wineSpikerBase,
      alibiWitnessBase,
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
      isKiller, isAccomplice, isCoreAcc, isInspector, isWitness, isWineSpiker,
      accomplices, sameInitials, deliveryWithArticle,
      killerBase, coreAccompliceBase, inspectorBase, witnessBase, wineSpikerBase, alibiWitnessBase, base
    } = ctx;

    // Pick a guaranteed-active core character (1..8) that is not the speaker
    function pickTarget(preferredIds) {
      for (let i = 0; i < preferredIds.length; i++) {
        const tid = preferredIds[i];
        if (tid && tid !== id) return BASE_CHARACTERS[tid - 1];
      }
      return BASE_CHARACTERS[id === 2 ? 0 : 1];
    }

    if (isKiller) {
      return [
        { act: "ACT I", target: `Say to ${witnessBase.name} (#${witnessBase.id}):`, line: `"I was standing right beside ${alibiWitnessBase.name} in the Grand Hall at 8:55 PM when Arthur was shouting! Since you oversee the Study service, who had access to Arthur's Bordeaux decanter tonight? Someone clearly poisoned that wine before nine."` },
        { act: "ACT II", target: `Say to ${inspectorBase.name} (#${inspectorBase.id}):`, line: `"I rolled Arthur over at 9:01 to check his pulse—pure reflex! Don't get distracted by a half-burned 2008 page; ask ${coreAccompliceBase.name} why the lights conveniently died at nine!"` },
        { act: "ACT III", target: `Say to ${witnessBase.name} (#${witnessBase.id}):`, line: `"Yes, I handed Arthur ${deliveryWithArticle} at 8:42 PM—completely harmless! If his watch stopped at 8:48, he must have dropped it before arguing at 8:55. Don't fall for a frame-up!"` }
      ];
    }

    if (isCoreAcc) {
      const act2Line = sameInitials
        ? `"Are you kidding me?! Look at the date on Exhibit C—2008! Just because my initials are '${base.initials}' doesn't mean I had anything to do with '${killerBase.scandalTitle}'! Check the 2008 records!"`
        : `"Look at Exhibit C—2008! Yes, '${base.initials}' was flagged on that burned page, but I had NO access to Archive Box #4 in 2008 and nothing to do with '${killerBase.scandalTitle}'! You're barking up the wrong tree!"`;
      const acc3Target = pickTarget([7, 2, 1]);
      return [
        { act: "ACT I", target: `Say to ${inspectorBase.name} (#${inspectorBase.id}):`, line: `"I wasn't in the Grand Hall at nine because I heard a shutter banging near the basement stairs. Stop pointing fingers at me when ${wineSpikerBase.name} was sneaking out of the Study at 8:05!"` },
        { act: "ACT II", target: `Say to ${witnessBase.name} (#${witnessBase.id}):`, line: act2Line },
        { act: "ACT III", target: `Say to ${acc3Target.name} (#${acc3Target.id}):`, line: `"I don't know a thing about poison or the Automaton! Look at who stood to gain from the unsigned Will—and remember ${killerBase.name} was in the Grand Hall at 8:55!"` }
      ];
    }

    if (isAccomplice) {
      const accIndex = accomplices.indexOf(id);
      if (accIndex === 1) {
        // Shadow Accomplice #2 (14+ players — Upstairs corridor lookout / fixer)
        const t1 = pickTarget([2, inspectorBase.id, 1]);
        const t2 = pickTarget([inspectorBase.id, 7, 2]);
        return [
          { act: "ACT I", target: `Say to ${t1.name} (#${t1.id}):`, line: `"Let's not overcomplicate this—${wineSpikerBase.name} was spotted sneaking out of the Study around 8:05 PM, and everyone heard Arthur shouting at 8:55. This is a panicked family job over the Will, plain and simple."` },
          { act: "ACT II", target: `Say to ${t2.name} (#${t2.id}) [after Exhibit C]:`, line: `"Careful chasing ghosts in a half-burned 2008 audit page. Someone cut the power at nine sharp and someone tampered with the wine—focus on who had the motive to stop the Will tonight!"` },
          { act: "ACT III", target: `Say to ${killerBase.name} (#${killerBase.id}) [stage-managed defense]:`, line: `"Look, ${killerBase.name}, I don't care what a dusty 2008 ledger says—you were standing right beside ${alibiWitnessBase.name} in the Grand Hall when Arthur was shouting at 8:55! Tell everyone how you could possibly be in two places at once!"` }
        ];
      }
      // Shadow Accomplice #3 (18+ players — Cover-up / toxicology deflection ally)
      const t1 = pickTarget([inspectorBase.id, 2, 1]);
      const t3 = pickTarget([2, inspectorBase.id, 3]);
      return [
        { act: "ACT I", target: `Say to ${t1.name} (#${t1.id}):`, line: `"If ${killerBase.name} smelled bitter almonds the moment we opened the door, that's textbook fast-acting poison in the wine. Why are we ignoring the decanter on the sideboard?"` },
        { act: "ACT II", target: `Say to ${wineSpikerBase.name} (#${wineSpikerBase.id}):`, line: `"You've been sweating since 9:01 PM! Everybody knows you slipped into the Study around 8:05—stop trying to pin this on a clockwork toy and admit what you put in that wine!"` },
        { act: "ACT III", target: `Say to ${t3.name} (#${t3.id}) [after Exhibit F]:`, line: `"Even if Exhibit F found Aconite, trace residue can transfer from anything in a crowded hall—it doesn't prove ${killerBase.name} killed Arthur! Don't let an 18-year-old audit blind you!"` }
      ];
    }

    if (isWineSpiker) {
      return [
        { act: "ACT I", target: `Say to ${alibiWitnessBase.name} (#${alibiWitnessBase.id}):`, line: `"Keep your voice down! Yes, I stepped into the Study around 8:05 PM to talk to Arthur—he wasn't even there! Why is everyone blaming the wine?"` },
        { act: "ACT II", target: `Say to ${witnessBase.name} (#${witnessBase.id}):`, line: `"Between us—did Lord Arthur drink any of that red wine tonight? ${killerBase.name} claimed it smelled of poison, and I'm worried..."` },
        { act: "ACT III", target: `Confess to ${inspectorBase.name} (#${inspectorBase.id}) [after Exhibit F]:`, line: `"Fine! I put sleeping powder—chloral hydrate—in the Bordeaux decanter in the Dining & Sideboard at 7:58 PM to steal the Will! NOT Aconite! And Exhibit F proves he NEVER DRANK THE WINE! I'm a thief, not a murderer!"` }
      ];
    }

    if (isWitness) {
      const t1 = pickTarget([7, 2, 1]);
      return [
        { act: "ACT I", target: `Say to ${t1.name} (#${t1.id}):`, line: `"Did you see anyone near Lord Arthur's Study around 8:20 PM? Something about this 9:00 PM timeline doesn't add up—his watch smashed at 8:48!"` },
        { act: "ACT II", target: `Say to ${wineSpikerBase.name} (#${wineSpikerBase.id}):`, line: `"The wine glass on Arthur's desk was completely full. What troubles me is the single cup of hot chamomile tea poured at 8:40 PM—by 9:02 PM, it was untouched and barely lukewarm!"` },
        { act: "ACT III", target: `Say to ${alibiWitnessBase.name} (#${alibiWitnessBase.id}):`, line: `"Think back! At 8:42 PM in the Grand Hall, I personally watched ${killerBase.name} (#${killerBase.id}) hand Arthur ${deliveryWithArticle}—and Arthur carried it straight up to his locked Study!"` }
      ];
    }

    if (isInspector) {
      return [
        { act: "ACT I", target: `Say to ${coreAccompliceBase.name} (#${coreAccompliceBase.id}):`, line: `"I did a headcount in the Grand Hall when the clock struck nine. You weren't there. Where exactly were you when the lights went out?"` },
        { act: "ACT II", target: `Say to ${killerBase.name} (#${killerBase.id}):`, line: `"Wait a second—Exhibit D's Study re-inspection shows Arthur was slumped face-down at 9:01 PM, yet you claimed you saw his pale lips the instant the lights returned—and the puddle was odorless water, not wine!"` },
        { act: "ACT III", target: `Say to ${wineSpikerBase.name} (#${wineSpikerBase.id}) [after Exhibit F]:`, line: `"My field test found chloral hydrate—sleeping powder—in the red wine decanter. Tell the truth right now, or you're getting my final vote!"` }
      ];
    }

    // Unique, character-specific dialogues for EVERY Innocent character (#1–#20)
    switch (id) {
      case 1: { // Lady Evelyn Vance
        const t2 = pickTarget([7, 2, 3]);
        return [
          { act: "ACT I", target: `Say to ${wineSpikerBase.name} (#${wineSpikerBase.id}):`, line: `"Don't play innocent with me! I saw you slipping out of Arthur's Study around 8:05 PM looking like you'd seen a ghost. What were you doing in there?"` },
          { act: "ACT II", target: `Say to ${t2.name} (#${t2.id}) [after Exhibit D]:`, line: `"Wait a second—a brass wax cylinder?! Two days ago I heard Arthur recording that exact line—'You've gone too far! I'm calling the police'—for his memoirs! Could the Automaton have played it?!"` },
          { act: "ACT III", target: `Say to ${witnessBase.name} (#${witnessBase.id}):`, line: `"I snuck along the Upstairs Gallery to eavesdrop outside the Study door at 8:50 PM and heard TOTAL SILENCE inside! Think back—did anyone hand Arthur something right before he locked himself in at 8:45?"` }
        ];
      }
      case 2: { // Clara Sterling
        return [
          { act: "ACT I", target: `Say to ${witnessBase.name} (#${witnessBase.id}):`, line: `"Arthur's New Will is lying open and unsigned—and it specifically mandated releasing Archive Box #4 from 2008. Who spoke to Arthur between 8:40 and 8:45 PM?"` },
          { act: "ACT II", target: `Say to ${coreAccompliceBase.name} (#${coreAccompliceBase.id}) [after Exhibit C]:`, line: `"Look at Exhibit C—Archive Box #4 from 2008! Your initials are right there on the burned page, and the lights died at nine sharp. Explain yourself!"` },
          { act: "ACT III", target: `Say to ${inspectorBase.name} (#${inspectorBase.id}) [after Exhibit E]:`, line: `"Exhibit E settles two lies at once: Arthur's Horologist Journal proves his pocket watch never drifted a second, and the 2008 Archive Records clear one suspect and point straight to the true culprit!"` }
        ];
      }
      case 3: { // Thomas Graves (when not Witness)
        const t1 = pickTarget([7, 2, 1]);
        const t3 = pickTarget([2, inspectorBase.id, 1]);
        return [
          { act: "ACT I", target: `Say to ${t1.name} (#${t1.id}):`, line: `"Forgive me, but I saw someone on the upstairs gallery at 8:20 PM well before the gala toast. Did you spot anyone slipping out of Lord Arthur's Study?"` },
          { act: "ACT II", target: `Say to ${wineSpikerBase.name} (#${wineSpikerBase.id}):`, line: `"Everyone keeps talking about the wine, yet the crystal glass on Lord Arthur's desk was completely full. What troubles me is the piping-hot cup of chamomile tea I poured at 8:40 PM—untouched and barely lukewarm by 9:02!"` },
          { act: "ACT III", target: `Say to ${t3.name} (#${t3.id}):`, line: `"When we entered the Study at 9:02 PM, Lord Arthur's pocket watch had smashed at 8:48 PM—and someone snapped the gold lid shut almost immediately. Why hide the time?"` }
        ];
      }
      case 4: { // Dr. Julian Mercer (when Innocent)
        const t1 = pickTarget([2, 1, 3]);
        return [
          { act: "ACT I", target: `Say to ${t1.name} (#${t1.id}):`, line: `"As Arthur's physician, I can swear his heart was completely stable at dinner. Whatever killed him tonight behind that locked door was fast-acting foul play, not natural failure."` },
          { act: "ACT II", target: `Say to ${inspectorBase.name} (#${inspectorBase.id}):`, line: `"Something about that 'bitter-almond' claim makes zero medical sense. Cyanide smells of bitter almonds, yes—but concentrated Aconite is completely odorless, and Exhibit D's Study re-inspection says the puddle had no scent at all!"` },
          { act: "ACT III", target: `Say to ${witnessBase.name} (#${witnessBase.id}) [after Exhibit F]:`, line: `"Exhibit F confirms concentrated Aconite—fatal in two to three minutes. If Arthur collapsed at 8:48 PM, he ingested it right around 8:45 PM from whatever he carried into the Study!"` }
        ];
      }
      case 5: { // Victor Vance (when Innocent & not Wine Spiker)
        const t1 = pickTarget([1, 2, 3]);
        const t2 = pickTarget([2, 7, 1]);
        return [
          { act: "ACT I", target: `Say to ${t1.name} (#${t1.id}):`, line: `"Don't look at me just because I needed money! Everybody here knows Arthur's New Will wasn't just about disinheriting family—it was going to blow open a 2008 scandal!"` },
          { act: "ACT II", target: `Say to ${t2.name} (#${t2.id}) [after Exhibit C]:`, line: `"Someone tried to burn Exhibit C in the Study fireplace before nine o'clock! Who in this room was desperate enough to kill Arthur to keep Archive Box #4 sealed?"` },
          { act: "ACT III", target: `Say to ${inspectorBase.name} (#${inspectorBase.id}) [after Exhibit F]:`, line: `"Exhibit F proves the wine wasn't the murder weapon at all! Follow the odorless Aconite and the 8:42 PM handoff—that's where the real killer is hiding!"` }
        ];
      }
      case 6: { // Jasper Moore (when Innocent & not Accomplice)
        const t2 = pickTarget([7, 2, 3]);
        const t3 = pickTarget([2, inspectorBase.id, 1]);
        return [
          { act: "ACT I", target: `Say to ${inspectorBase.name} (#${inspectorBase.id}):`, line: `"I built the backup power system in this manor, and I'm telling you right now: the storm did NOT cause a clean 15-second blackout. Someone manually pulled the main breaker in the basement Generator Room!"` },
          { act: "ACT II", target: `Say to ${t2.name} (#${t2.id}) [after Exhibit D]:`, line: `"Look at Exhibit D—the Automaton's counterweight cam was shifted exactly two inches to strike the water carafe at 9:00 PM sharp. That takes deliberate calibration, not luck!"` },
          { act: "ACT III", target: `Say to ${t3.name} (#${t3.id}):`, line: `"Think like an engineer: the 9:00 PM blackout and the 9:00 PM counterweight drop happened on the exact same chime. Whoever pulled that basement breaker was working for the real killer!"` }
        ];
      }
      case 7: { // Celeste Moreau
        const t2 = pickTarget([1, 2, 3]);
        return [
          { act: "ACT I", target: `Say to ${witnessBase.name} (#${witnessBase.id}):`, line: `"Alright, I snuck up to the gallery at 8:20 PM for a glimpse of the Automaton—and right as I reached the top of the stairs, I saw a figure in a dark coat slip out of Arthur's Study carrying a small dark case!"` },
          { act: "ACT II", target: `Say to ${t2.name} (#${t2.id}) [after Exhibit D]:`, line: `"Mon Dieu—look at Exhibit D! The Chronos Automaton can play a pre-recorded brass cylinder at 8:55 PM AND drop its 5-pound counterweight at 9:00 PM! Arthur could have been dead BEFORE 8:55!"` },
          { act: "ACT III", target: `Say to ${coreAccompliceBase.name} (#${coreAccompliceBase.id}):`, line: `"The Automaton's counterweight was shifted two inches to smash that carafe at 9:00 PM—the exact second the lights went out while you were missing from the Grand Hall. Don't tell me that's a coincidence!"` }
        ];
      }
      case 8: { // Harriet Vance-Cole (when Innocent & not Inspector)
        const t2 = pickTarget([2, 1, 3]);
        return [
          { act: "ACT I", target: `Say to ${coreAccompliceBase.name} (#${coreAccompliceBase.id}):`, line: `"Old magistrate's habit—I did a headcount in the Grand Hall when the clock struck nine. You weren't there. Care to tell me where you vanished during the blackout?"` },
          { act: "ACT II", target: `Say to ${t2.name} (#${t2.id}):`, line: `"Arthur invited me back after ten years of silence for one reason: tonight he was finally exposing the 2008 Archive Box #4 cover-up, and he warned me to watch the people he trusted most."` },
          { act: "ACT III", target: `Say to ${witnessBase.name} (#${witnessBase.id}) [after Exhibit F]:`, line: `"My miniature field chemistry kit settled it: the wine only held sleeping sedative, while Arthur's lips and cuff tested positive for odorless Aconite. Who handed him something right before 8:45?"` }
        ];
      }
      case 9: { // Chef Henri Laurent
        const t3 = pickTarget([7, 1, 2]);
        return [
          { act: "ACT I", target: `Say to ${wineSpikerBase.name} (#${wineSpikerBase.id}):`, line: `"Do not insult my kitchen! At 7:58 PM I stepped into the Dining & Sideboard and saw someone hovering nervously over my 1998 Bordeaux decanter with a tiny white paper packet. What did you put in my wine?!"` },
          { act: "ACT II", target: `Say to ${inspectorBase.name} (#${inspectorBase.id}):`, line: `"I personally decanted that Bordeaux at 7:45 PM—notes of dark cherry, NEVER bitter almonds! And Exhibit D's Study re-inspection says the puddle on the Study floor was odorless water. Someone lied about smelling almonds!"` },
          { act: "ACT III", target: `Say to ${t3.name} (#${t3.id}):`, line: `"I brewed Lord Arthur's chamomile tea at a rolling boil at 8:38 PM! If that single poured cup sat untouched until it was barely lukewarm by 9:02 PM, then he never took a sip—he was already gone well before nine!"` }
        ];
      }
      case 10: { // Margot Bell
        const t1 = pickTarget([2, 1, 3]);
        const t3 = pickTarget([2, 1, 7]);
        return [
          { act: "ACT I", target: `Say to ${t1.name} (#${t1.id}):`, line: `"Forgive my curiosity, but I heard Arthur's New Will creates a transparency foundation. Does it unseal Archive Box #4 from November 2008?"` },
          { act: "ACT II", target: `Say to ${coreAccompliceBase.name} (#${coreAccompliceBase.id}) [after Exhibit C]:`, line: `"Interesting—I happen to carry a 2008 Boston Chronicle clipping about Archive Box #4. It implicates someone professionally active in November 2008. Where were you working in 2008?"` },
          { act: "ACT III", target: `Say to ${t3.name} (#${t3.id}) [after Exhibit E]:`, line: `"I'm actually an investigative reporter with the Boston Chronicle. My 2008 clipping matches Exhibit E—check who was actually in that 2008 role and cross off everyone who wasn't!"` }
        ];
      }
      case 11: { // Sebastian Cole
        const t1 = pickTarget([1, 2, 3]);
        const t2 = pickTarget([7, 2, 1]);
        const t3 = pickTarget([1, 7, 2]);
        return [
          { act: "ACT I", target: `Say to ${t1.name} (#${t1.id}):`, line: `"Don't let anyone tell you Arthur was alive and well at 8:50. I was... admiring the upstairs gallery around 8:48 PM, and I distinctly heard a heavy, muffled THUMP inside his locked Study—followed by dead silence."` },
          { act: "ACT II", target: `Say to ${t2.name} (#${t2.id}) [after Exhibit D]:`, line: `"You know clockwork better than anyone here—could the Automaton play a voice at 8:55 and drop a counterweight at 9:00? Because whatever thumped at 8:48 PM sounded like a man hitting the floor!"` },
          { act: "ACT III", target: `Say to ${t3.name} (#${t3.id}):`, line: `"Fine, I had no business lingering in the upstairs gallery at 8:48 PM—I was eyeing a Fabergé clock, alright? Arrest me for bad taste, not murder! But I swear Arthur collapsed at 8:48 PM!"` }
        ];
      }
      case 12: { // Lydia Vance
        const t3 = pickTarget([2, inspectorBase.id, 1]);
        return [
          { act: "ACT I", target: `Say to ${wineSpikerBase.name} (#${wineSpikerBase.id}):`, line: `"Look me in the eye. If you did something desperate with that wine tonight because of money, I am not going down with you."` },
          { act: "ACT II", target: `Say to ${coreAccompliceBase.name} (#${coreAccompliceBase.id}):`, line: `"Funny thing—at 8:35 PM near the basement stairs, I overheard two people whispering furiously: 'Fifteen seconds of dark at nine sharp, or your secret goes to the police!' Care to tell me who was blackmailing you?"` },
          { act: "ACT III", target: `Say to ${t3.name} (#${t3.id}):`, line: `"Stop blaming the storm for the 9:00 PM blackout! I overheard the blackmail threat on the basement stairs at 8:35 PM—whoever cut the lights was forced into it by the real killer!"` }
        ];
      }
      case 13: { // Father Silas Ward
        const t1 = pickTarget([2, 1, 3]);
        return [
          { act: "ACT I", target: `Say to ${t1.name} (#${t1.id}):`, line: `"I have been Arthur's confessor for twenty years. Last Tuesday he came to me burdened by eighteen years of shielding a guilty soul from a 2008 sin he could no longer keep buried."` },
          { act: "ACT II", target: `Say to ${inspectorBase.name} (#${inspectorBase.id}) [after Exhibit C]:`, line: `"I am bound by the Seal of Confession, so listen carefully: Arthur's New Will was his final act of penance to unseal Archive Box #4. The guilty soul feared the truth of 2008 far more than losing an inheritance."` },
          { act: "ACT III", target: `Say to ${wineSpikerBase.name} (#${wineSpikerBase.id}) [after Exhibit E]:`, line: `"Look past the noise of the 9:00 PM blackout and read Exhibit E with clear eyes. The person who truly belonged to that 2008 sin is the one who silenced Arthur before he could sign."` }
        ];
      }
      case 14: { // Damien Cross (when Innocent)
        const t2 = pickTarget([7, 2, 1]);
        return [
          { act: "ACT I", target: `Say to ${inspectorBase.name} (#${inspectorBase.id}):`, line: `"As head of security, I inspected the Study door at 9:01 PM myself—the steel deadbolt was genuinely thrown from the inside. Nobody walked in or out after Arthur locked it at 8:45 PM."` },
          { act: "ACT II", target: `Say to ${t2.name} (#${t2.id}) [after Exhibit D]:`, line: `"Think tactically: if the Study deadbolt was locked from inside at 8:45, the ONLY way to stage an 8:55 shout and a 9:00 crash was a rigged mechanical timer inside the room!"` },
          { act: "ACT III", target: `Say to ${witnessBase.name} (#${witnessBase.id}) [after Exhibit F]:`, line: `"Locked door from the inside means the Aconite walked into the Study WITH Arthur at 8:45 PM. Whoever handed him something at 8:42 PM in the Grand Hall is our killer!"` }
        ];
      }
      case 15: { // Beatrice "Bea" Holloway
        const t2 = pickTarget([1, 2, 7]);
        const t3 = pickTarget([1, 2, 7]);
        return [
          { act: "ACT I", target: `Say to ${witnessBase.name} (#${witnessBase.id}):`, line: `"Something's mighty odd! At 9:04 PM, right after the Study door was broken open, I was in the basement Laundry Room and heard something drop straight down the upstairs laundry chute!"` },
          { act: "ACT II", target: `Say to ${t2.name} (#${t2.id}):`, line: `"The upstairs laundry chute is right outside the Study wing—someone hastily ditched evidence from the Study at 9:04 PM before anyone could search their pockets!"` },
          { act: "ACT III", target: `Say to ${t3.name} (#${t3.id}) [after Exhibit F]:`, line: `"I pulled trace shards wrapped in a linen handkerchief from the basement laundry bin at 9:04 PM! Whoever rushed to Arthur's body first at 9:01 pocketed the murder weapon and dumped it down the chute!"` }
        ];
      }
      case 16: { // Gideon Thorne
        const t2 = pickTarget([2, inspectorBase.id, 1]);
        return [
          { act: "ACT I", target: `Say to ${coreAccompliceBase.name} (#${coreAccompliceBase.id}):`, line: `"A word in private! At 8:38 PM someone panicked and whispered to me that they were being blackmailed into cutting the manor's power at 9:00 PM sharp. What the hell is going on?"` },
          { act: "ACT II", target: `Say to ${t2.name} (#${t2.id}):`, line: `"Arthur and I were business rivals, not enemies to the death. If you want to know why the lights died at nine, stop blaming the storm—someone in this house blackmailed an accomplice into pulling the breaker!"` },
          { act: "ACT III", target: `Say to ${coreAccompliceBase.name} (#${coreAccompliceBase.id}):`, line: `"A man is dead! Whoever blackmailed you at 8:35 PM used your 9:00 PM blackout as cover for a murder that happened twelve minutes earlier—save yourself before you take the fall!"` }
        ];
      }
      case 17: { // Vivienne Sterling
        const t1 = pickTarget([2, 1, 3]);
        return [
          { act: "ACT I", target: `Say to ${t1.name} (#${t1.id}):`, line: `"I probably should have mentioned this sooner—at 4:00 PM today in the Library, I caught a guest alone reading Page 14 (the 2008 Archive Box #4 clause) of the New Will, and they went pale as a ghost!"` },
          { act: "ACT II", target: `Say to ${inspectorBase.name} (#${inspectorBase.id}) [after Exhibit C]:`, line: `"I typed up the New Will myself this afternoon. Arthur added the Archive Box #4 release clause at the very last minute—whoever read Page 14 at 4:00 PM realized they had until 9:00 PM to stop him!"` },
          { act: "ACT III", target: `Say to ${wineSpikerBase.name} (#${wineSpikerBase.id}) [after Exhibit E]:`, line: `"You didn't even know about Page 14's 2008 clause, did you? You only cared about the inheritance. Look at Exhibit E—the real killer was terrified of Archive Box #4!"` }
        ];
      }
      case 18: { // Nadia Vance (when Innocent)
        const t3 = pickTarget([2, 1, 7]);
        return [
          { act: "ACT I", target: `Say to ${inspectorBase.name} (#${inspectorBase.id}):`, line: `"As a pharmacology student, something bothers me: cyanide has a strong bitter-almond odor, whereas concentrated Aconite is completely odorless and stops the heart in two to three minutes!"` },
          { act: "ACT II", target: `Say to ${witnessBase.name} (#${witnessBase.id}):`, line: `"Look at Exhibit D's Study re-inspection—the puddle on the floor was clear, odorless water, and the wine glass wasn't even touched. Whoever claimed to smell 'bitter almonds from the wine' was steering us away from an odorless poison!"` },
          { act: "ACT III", target: `Say to ${t3.name} (#${t3.id}) [after Exhibit F]:`, line: `"Exhibit F confirms my hunch! Chloral Hydrate in the wine is just a non-lethal sedative, while concentrated Aconite on Arthur's lips kills in 2–3 minutes—matching an 8:45 PM dose and an 8:48 PM collapse!"` }
        ];
      }
      case 19: { // Capt. Roderick Hale
        const t2 = pickTarget([7, 2, 1]);
        const t3 = pickTarget([2, inspectorBase.id, 1]);
        return [
          { act: "ACT I", target: `Say to ${witnessBase.name} (#${witnessBase.id}):`, line: `"Hold everything! Someone just claimed Arthur's pocket watch ran twelve minutes slow? Hogwash! I synced my U.S. Naval Observatory chronometer with Arthur's watch at the pier yesterday—dead-on to the second!"` },
          { act: "ACT II", target: `Say to ${t2.name} (#${t2.id}) [after Exhibit D]:`, line: `"If Arthur's watch never lost a second and smashed at 8:48 PM, then whoever we heard yelling at 8:55 PM wasn't Arthur—unless ghosts can shout through oak doors, it had to be that brass cylinder!"` },
          { act: "ACT III", target: `Say to ${t3.name} (#${t3.id}) [after Exhibit E]:`, line: `"Arthur's Horologist Journal in Exhibit E backs me up 100%! His watch stopped at 8:48 PM—which means whoever snapped that watch lid shut and called it 'twelve minutes slow' lied to this entire room!"` }
        ];
      }
      case 20: // Alistair Finch
      default: {
        const t1 = pickTarget([1, 2, 3]);
        const t2 = pickTarget([7, 2, 1]);
        const t3 = pickTarget([7, 2, 1]);
        return [
          { act: "ACT I", target: `Say to ${t1.name} (#${t1.id}):`, line: `"Don't you find it extraordinary? The exact words we heard Arthur shouting at 8:55 PM—'You've gone too far! I'm calling the police as soon as the lines are back!'—are word-for-word from Chapter 12 of the memoir he dictated to me two days ago!"` },
          { act: "ACT II", target: `Say to ${t2.name} (#${t2.id}) [after Exhibit D]:`, line: `"I personally helped Arthur record Chapter 12 onto a blank brass cylinder two days ago and watched him set it beside the Automaton! If that cylinder is inside Exhibit D, someone swapped it to fake his voice!"` },
          { act: "ACT III", target: `Say to ${t3.name} (#${t3.id}) [after Exhibit E]:`, line: `"Arthur fired me yesterday just for peeking at his sealed Archive Box #4! Chapter 12 of his memoir was all about that 2008 cover-up—and Exhibit E finally names the culprit he was protecting!"` }
        ];
      }
    }
  }

  global.RavenshollowEngine = {
    BASE_CHARACTERS,
    CLASSIC_CODE,
    withArticle,
    encodeCaseCode,
    decodeCaseCode,
    rollRandomCase,
    buildScenario
  };
})(window);
