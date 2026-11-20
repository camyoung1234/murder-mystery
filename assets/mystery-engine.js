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
      secret: "At 8:50 PM, you snuck halfway up the Study stairs to eavesdrop and heard TOTAL SILENCE inside—not a sound until Arthur's voice boomed at 8:55 PM!",
      clue: "Two days ago, you heard Arthur recording that exact angry phrase ('You've gone too far! I'm calling the police as soon as the lines are back!') onto a blank brass phonograph cylinder for his memoirs.",
      detention: "Searched from Lady Evelyn's Clutch: A crumpled furious letter ('I won't let you ruin this family tonight'), PLUS a note in Evelyn's hand: '8:50 PM — Stood on upper stairs outside Arthur's Study. Complete silence inside until 8:55 PM.'",
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
      clue: "At 8:40 PM you delivered piping-hot chamomile tea to the Study—by 9:02 PM the pot was STONE COLD. You also saw Arthur's watch smashed at 8:48 PM.",
      detention: "Searched from Graves's Coat Pocket: Tonight's butler log: '8:40 PM — Hot chamomile tea delivered to Study. 9:02 PM — Teapot stone cold; watch crystal smashed at 8:48 PM.'",
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
      secret: "At 8:00 PM, you snuck into the Study and put CHLORAL HYDRATE (non-lethal sleeping powder) into Arthur's RED WINE DECANTER so you could steal the New Will later! Exhibit F proves he never drank the wine.",
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
      accomplices: [5, 14, 18]
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
      secret: "At 7:58 PM, you saw someone hovering nervously over the opened 1998 Bordeaux decanter with a tiny white paper packet.",
      clue: "You decanted the Bordeaux at 7:45 PM (zero almond scent, zero cyanide in your kitchen) and brewed Arthur's chamomile tea at a rolling boil at 8:38 PM.",
      detention: "Searched from Chef Henri's Apron: Kitchen inventory sheet signed 7:45 PM confirming the Bordeaux decanter was pristine, plus an angry note about someone near the wine at 7:58 PM.",
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

    // Red Herring Wine Spiker (Victor #5, or Lady Evelyn #1 if Victor is Killer)
    const wineSpikerId = (killerId === 5) ? 1 : 5;
    const wineSpikerBase = BASE_CHARACTERS[wineSpikerId - 1];

    // Alibi Witness who stood beside the Killer at 8:55 PM
    let alibiWitnessId = 1;
    if (shadowIds.includes(1) || alibiWitnessId === wineSpikerId) {
      alibiWitnessId = [2, 3, 7, 8].find(id => !shadowIds.includes(id)) || 2;
    }
    const alibiWitnessBase = BASE_CHARACTERS[alibiWitnessId - 1];

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
        secret = `In 2008, YOU were behind "${killerBase.scandalTitle}" (signed "${killerBase.initials}"). Tonight: at 8:15 PM you rigged the Chronos Automaton (8:55 PM voice + 9:00 PM carafe smash); at 8:35 PM you blackmailed ${coreAccompliceBase.name} (#${coreAccompliceId}) to cut the generator at 9:00 PM; at 8:42 PM you handed Arthur a ${killerBase.deliveryItem} laced with concentrated Aconite (he died at 8:48 PM). You stood next to ${alibiWitnessBase.name} (#${alibiWitnessId}) at 8:55 PM for an alibi, then lied about the 8:48 PM watch and 'bitter-almond wine.'`;
        clue = `STRATEGY: Stay calm! Let the room suspect ${wineSpikerBase.name} (#${wineSpikerId}) for drugging the wine and ${coreAccompliceBase.name} (#${coreAccompliceId}) for the blackout. If pressed on Exhibit E, claim Arthur's watch broke earlier or someone forged "${killerBase.initials}" to frame you!`;
        detention = `Searched from ${base.name}'s Effects: Trace residue of concentrated Aconite matching the ${killerBase.deliveryItem} handed to Arthur at 8:42 PM, PLUS a folded 2008 credential reading "${base.name} — ${base.ledger2008}."`;
      } else if (isAccomplice) {
        team = "accomplice";
        badge = "SHADOW TEAM — ACCOMPLICE";
        badgeClass = "shadow";
        special = `YOU ARE ON THE SHADOW TEAM! You are allied with ${killerBase.name} (#${killerId}) and win ONLY if the Killer escapes indictment in the Final Verdict. Wake up with the Shadow Team during Blackout Phases.`;
        if (isCoreAcc) {
          secret = `${killerBase.name} (#${killerId}) caught your private scandal and blackmailed you into cutting the basement generator breaker for 15 seconds at 9:00 PM sharp! You didn't know they were going to murder Arthur, but if they go down, you go to prison as an accessory.`;
          detention = `Searched from ${base.name}'s Belongings: Heavy rubber-insulated electrical gloves (smelling of ozone from the generator breaker) and an unsigned blackmail note: '9:00 PM sharp. Fifteen seconds of dark, or your secret goes to the police.'`;
        } else {
          secret = `You are secretly tied to ${killerBase.name}'s (#${killerId}) 2008 cover-up and helped keep the upstairs gallery clear from 8:10–8:20 PM while they rigged the Automaton. Protect ${killerBase.name} in Town Hall votes!`;
          detention = `Searched from ${base.name}'s Belongings: A burner phone with an unsent draft: '${killerBase.initials} — Upstairs corridor clear 8:10 to 8:20 PM. Stop Archive Box #4 at any cost.'`;
        }
        clue = `STRATEGY: Deflect suspicion onto ${wineSpikerBase.name} (#${wineSpikerId}) and defend ${killerBase.name}'s (#${killerId}) 9:00 PM Grand Hall alibi!`;
      } else if (isInspector) {
        team = "inspector";
        badge = "INNOCENT — INSPECTOR";
        badgeClass = "inspector";
        special = "SPECIAL ABILITY (BLACKOUT PHASE): During each Blackout, if you are NOT Detained, the Auto-Host wakes you alone to secretly read ONE guest's Sealed Detention Card for 12 seconds!";
      }

      if (isWineSpiker && !isKiller && !isAccomplice) {
        secret = `RED HERRING! At 8:00 PM, you snuck into the Study and put CHLORAL HYDRATE (non-lethal sleeping powder) into Arthur's RED WINE DECANTER so you could steal the New Will! You're terrified you killed him—until Exhibit F proves he never drank the wine!`;
        detention = `Searched from ${base.name}'s Pocket: A folded white paper packet labeled 'Chloral Hydrate (Sleep Aid)' and a desperate note about stealing the unsigned New Will.`;
      }

      if (isWitness && !isKiller && !isAccomplice) {
        clue = `1) At 8:40 PM hot chamomile tea was placed in the Study—by 9:02 PM it was STONE COLD. 2) At 8:42 PM, YOU PERSONALLY SAW ${killerBase.name} (#${killerId}) hand Arthur a ${killerBase.deliveryItem} in the Grand Hall right before Arthur locked himself in the Study!`;
        detention = `Searched from ${base.name}'s Pocket: Tonight's handwritten note: '8:40 PM — Hot tea in Study. 8:42 PM — Watched ${killerBase.name} (#${killerId}) hand Arthur a ${killerBase.deliveryItem} in the Grand Hall. 9:02 PM — Watch smashed at 8:48 PM.'`;
      }

      // Dynamic Act I-III Mandatory Dialogues
      const dialogues = buildDialoguesFor(id, {
        isKiller, isAccomplice, isCoreAcc, isInspector, isWitness, isWineSpiker,
        killerBase, coreAccompliceBase, inspectorBase, witnessBase, wineSpikerBase, alibiWitnessBase, base
      });

      return {
        id, name: base.name, role: base.role, initials: base.initials,
        team, badge, badgeClass, special, persona, secret, clue, detention, dialogues
      };
    });

    // Dynamic Exhibits A–F + False Leads
    const exhibits = [
      {
        id: "A", act: 1, title: "Exhibit A — Study Crime Scene Sketch (9:02 PM)",
        html: `<ul>
          <li><strong>Door &amp; Window:</strong> Heavy oak double-door bolted from the <em>inside</em>; cliff window latched inside.</li>
          <li><strong>The Body:</strong> Lord Arthur Vance slumped <strong>face-down</strong> on his desk blotter, facing <strong>away from the door</strong>. Rolled over first by <strong>${killerBase.name} (#${killerId})</strong> at 9:01 PM.</li>
          <li><strong>On the Desk:</strong> Unsigned New Will; crystal wine glass <strong>completely full &amp; untouched</strong>; chamomile teapot <strong>stone cold</strong> by 9:02 PM; broken pocket watch.</li>
          <li><strong>On the Floor:</strong> Shattered <strong>water carafe</strong> in a puddle of <strong>clear, odorless liquid</strong>, beside a heavy 5-lb brass counterweight.</li>
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
        id: "C", act: 2, title: `Exhibit C — Charred Audit Log ('${killerBase.initials}')`,
        html: `<pre>VANCE PRECISION INSTRUMENTS — CONFIDENTIAL AUDIT\nARCHIVE BOX #4 (SLATED FOR RELEASE WITH NEW WILL)\n-------------------------------------------------\nSUBJECT:   ${killerBase.scandalTitle}\nFINDING:   ${killerBase.scandalDetail}\nSIGNED BY: "${killerBase.initials}" [REST OF LINE BURNED]\nSTATUS:    Suppressed by A. Vance (2008). Full disclosure\n           ordered upon execution of New Will.</pre>`
      },
      {
        id: "D", act: 2, title: "Exhibit D — Chronos Automaton & Wax Cylinder",
        html: `<ul>
          <li><strong>Phonograph Drum:</strong> Plays a removable brass wax cylinder at a scheduled minute. Currently set to <strong>8:55 PM</strong>.</li>
          <li><strong>Release Cam:</strong> Drops a 5-lb brass counterweight at <strong>9:00 PM</strong> (shifted 2 inches to strike the water carafe).</li>
          <li><strong>Cylinder Label:</strong> Reads <em>"9:00 PM Gala Greeting"</em> — hastily glued over a scratched-out title: <strong>"Memoir Draft — Confrontation."</strong></li>
        </ul>`
      },
      {
        id: "E", act: 3, title: "Exhibit E — 2008 Dossier Ledger & Horologist Journal",
        html: `<ul>
          <li><strong>Selected 2008 Archive Records:</strong><br/>
            &bull; <strong>${killerBase.name} (#${killerId}):</strong> ${killerBase.ledger2008}<br/>
            &bull; <strong>${coreAccompliceBase.name} (#${coreAccompliceId}):</strong> <em>No access to Archive Box #4 in 2008 (outside the 2008 incident window).</em><br/>
            &bull; <strong>${wineSpikerBase.name} (#${wineSpikerId}):</strong> <em>Unrelated to "${killerBase.scandalTitle}".</em>
          </li>
          <li><strong>Arthur's Horologist Journal (Nov 15):</strong> <em>"A clockmaker whose own pocket watch loses a single second is a fraud. My gold chronometer is calibrated daily to the U.S. Naval Observatory signal. It has not drifted by half a second in eleven years."</em></li>
        </ul>`
      },
      {
        id: "F", act: 3, title: "Exhibit F — Field Toxicology Report",
        html: `<ul>
          <li><strong>Red Wine (Decanter &amp; Untouched Glass):</strong> Positive for <strong>Chloral Hydrate</strong> (non-lethal sleeping sedative). Arthur never drank it.</li>
          <li><strong>Residue on Arthur's Lips &amp; Cuff:</strong> Positive for <strong>Concentrated Aconite</strong> (fast-acting, completely <strong>odorless</strong> cardiac poison; fatal in <strong>2–3 minutes</strong>) — matching trace contact from a <strong>${killerBase.deliveryItem}</strong>.</li>
          <li><strong>Floor Puddle:</strong> Plain spring water. Zero wine, zero bitter-almond odor.</li>
        </ul>`
      },
      {
        id: "FL1", act: 0, title: "False Lead #1 — Crumpled Generator Note (Blackout Action)",
        html: `<p><em>Found crumpled on the basement stairs immediately after the blackout:</em></p><pre>"9:00 PM sharp. Pull the main breaker. Don't let anyone see you. — ${wineSpikerBase.initials}"</pre>`
      },
      {
        id: "FL2", act: 0, title: "False Lead #2 — Anonymous Parlor Rumor (Blackout Action)",
        html: `<p><em>Slipped under the Parlor door during the blackout:</em></p><pre>"Check the sideboard! Someone wiped down the wine decanter with an almond-scented handkerchief right before 9:00 PM."</pre>`
      }
    ];

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
          <div class="script-line"><div class="script-speaker">${inspectorBase.name} (#${inspectorId})</div>"While the parlor was cleared, we inspected the Study fireplace and the Chronos Automaton. We have two new exhibits—a half-burned 2008 audit log signed '${killerBase.initials}', and a scratched brass wax cylinder inside the Automaton."</div>
          <div class="script-line"><div class="script-speaker">Celeste Moreau (#7)</div>"Wait—a scratched cylinder? Arthur built the Chronos Automaton to play a recorded greeting at 9:00 PM. You can also program its brass counterweight to drop on the hour. If someone swapped the cylinder..."</div>
          <div class="script-line"><div class="script-speaker">${coreAccompliceBase.name} (#${coreAccompliceId})</div>"Don't look at me! Half the people in this house had a reason to hate Arthur. And if you're wondering why the lights went out at nine, the storm probably surged the old breaker!"</div>
          <div class="script-line"><div class="script-speaker">${wineSpikerBase.name} (#${wineSpikerId})</div>"Oh, spare us! And what about the wine? ${killerBase.name} said it smelled of poison—who poured Arthur's glass?!"</div>
          <div class="script-line"><div class="script-speaker">${witnessBase.name} (#${witnessId})</div>"Actually... look at Exhibit A. The wine glass on the desk is completely full. It was the water carafe that shattered."</div>`
      },
      blackout2: {
        label: "BLACKOUT PHASE II (1 MIN)",
        sub: "100% Spoiler-Free Automated Blackout — everyone closes their eyes!",
        html: `<p style="margin-bottom:14px;">Click <strong>Start Auto-Blackout</strong> below (or in the top bar). The app will narrate the entire Blackout phase aloud—waking the Shadow Team, then waking the Inspector—with zero spoilers for anyone!</p>
        <button class="btn btn-gold" onclick="startAutoBlackout()">Launch Auto-Blackout Phase II</button>`
      },
      act3: {
        label: "ACT III — THE LAST CHIME (5 MIN)",
        sub: "Read Public Opener, unlock Exhibits E & F, mingle (5m), then Final Verdict (3m) & Reveal!",
        html: `
          <div class="script-line"><div class="script-speaker">${inspectorBase.name} (#${inspectorId})</div>"Enough games. We unlocked Arthur's private Horologist Journal and the 2008 Archive Ledger—and tested the residue in the Study with a field chemistry kit."</div>
          <div class="script-line"><div class="script-speaker">${witnessBase.name} (#${witnessId})</div>"Look closely at Exhibit E and Exhibit F before you cast your final vote. The chamomile tea poured at 8:40 PM was stone cold by 9:02 PM—and Arthur never touched his wine."</div>
          <div class="script-line"><div class="script-speaker">${killerBase.name} (#${killerId})</div>"Careful, everyone—wild theories will only let the real killer slip away. Look at who had the motive to steal the Will, who rigged the power, and who wasn't in the Grand Hall at nine. Let's settle this."</div>`
      }
    };

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
        <strong>The 4-Pillar Proof:</strong> (1) Arthur's pocket watch froze at <strong>8:48 PM</strong> and his Horologist Journal proves it never lost a second; (2) The wine was untouched and Arthur died of odorless Aconite from the ${killerBase.deliveryItem}; (3) ${killerBase.name} slipped up in Act I by claiming to see Arthur's pale lips (Arthur was face-down!) and smell bitter almonds from spilled wine (it was odorless water!); (4) Exhibit C &amp; Exhibit E tie <strong>"${killerBase.initials}"</strong> directly to <strong>${killerBase.scandalTitle}</strong> (${killerBase.ledger2008})!
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
      characters,
      exhibits,
      acts,
      revealHtml
    };
  }

  function buildDialoguesFor(id, ctx) {
    const { isKiller, isAccomplice, isCoreAcc, isInspector, isWitness, isWineSpiker,
      killerBase, coreAccompliceBase, inspectorBase, witnessBase, wineSpikerBase, alibiWitnessBase } = ctx;

    if (isKiller) {
      return [
        { act: "ACT I", target: `Say to ${witnessBase.name} (#${witnessBase.id}):`, line: `"I was standing right beside ${alibiWitnessBase.name} in the Grand Hall at 8:55 PM when Arthur was shouting! And I smelled bitter almonds from the wine at 9:01—check who touched that decanter."` },
        { act: "ACT II", target: `Say to ${inspectorBase.name} (#${inspectorBase.id}):`, line: `"I rolled Arthur over at 9:01 to check his pulse—pure reflex! Don't get distracted by a half-burned 2008 page; ask ${coreAccompliceBase.name} why the lights conveniently died at nine!"` },
        { act: "ACT III", target: `Say to ${witnessBase.name} (#${witnessBase.id}):`, line: `"Yes, I handed Arthur a ${killerBase.deliveryItem} at 8:42 PM—completely harmless! If his watch stopped at 8:48, he must have dropped it before arguing at 8:55. Don't fall for a frame-up!"` }
      ];
    }
    if (isCoreAcc) {
      return [
        { act: "ACT I", target: `Say to ${inspectorBase.name} (#${inspectorBase.id}):`, line: `"I wasn't in the Grand Hall at nine because I heard a shutter banging near the basement stairs. Stop pointing fingers at me when ${wineSpikerBase.name} was sneaking out of the Study at 8:05!"` },
        { act: "ACT II", target: `Say to ${witnessBase.name} (#${witnessBase.id}):`, line: `"Look at Exhibit C—2008! I had nothing to do with '${killerBase.scandalTitle}'! You're barking up the wrong tree!"` },
        { act: "ACT III", target: `Say to Celeste Moreau (#7) [or Clara #2]:`, line: `"I don't know a thing about poison or the Automaton! Look at who stood to gain from the unsigned Will—not me!"` }
      ];
    }
    if (isWineSpiker) {
      return [
        { act: "ACT I", target: `Say to ${alibiWitnessBase.name} (#${alibiWitnessBase.id}):`, line: `"Keep your voice down! Yes, I stepped into the Study at 8:00 PM to talk to Arthur—he wasn't even there! Why is everyone blaming the wine?"` },
        { act: "ACT II", target: `Say to ${witnessBase.name} (#${witnessBase.id}):`, line: `"Between us—did Lord Arthur drink any of that red wine tonight? ${killerBase.name} claimed it smelled of poison, and I'm worried..."` },
        { act: "ACT III", target: `Confess to ${inspectorBase.name} (#${inspectorBase.id}) [after Exhibit F]:`, line: `"Fine! I put sleeping powder—chloral hydrate—in the wine decanter at 8:00 PM to steal the Will! NOT Aconite! And Exhibit F proves he NEVER DRANK THE WINE! I'm a thief, not a murderer!"` }
      ];
    }
    if (isWitness) {
      return [
        { act: "ACT I", target: `Say to Celeste Moreau (#7) [or Clara #2]:`, line: `"Did you see anyone near Lord Arthur's Study around 8:20 PM? Something about this 9:00 PM timeline doesn't add up—his watch smashed at 8:48!"` },
        { act: "ACT II", target: `Say to ${wineSpikerBase.name} (#${wineSpikerBase.id}):`, line: `"The wine glass on Arthur's desk was completely full. What troubles me is the hot chamomile tea poured at 8:40 PM—by 9:02 PM, the pot was stone cold!"` },
        { act: "ACT III", target: `Say to ${alibiWitnessBase.name} (#${alibiWitnessBase.id}):`, line: `"Think back! At 8:42 PM in the Grand Hall, I personally watched ${killerBase.name} (#${killerBase.id}) hand Arthur a ${killerBase.deliveryItem}—and Arthur carried it straight up to his locked Study!"` }
      ];
    }
    if (isInspector) {
      return [
        { act: "ACT I", target: `Say to ${coreAccompliceBase.name} (#${coreAccompliceBase.id}):`, line: `"I did a headcount in the Grand Hall when the clock struck nine. You weren't there. Where exactly were you when the lights went out?"` },
        { act: "ACT II", target: `Say to ${killerBase.name} (#${killerBase.id}):`, line: `"Wait a second—Arthur was slumped face-down at 9:01 PM, yet you claimed you saw his pale lips the instant the lights returned! And Exhibit A says the puddle was odorless water, not wine!"` },
        { act: "ACT III", target: `Say to ${wineSpikerBase.name} (#${wineSpikerBase.id}) [after Exhibit F]:`, line: `"My field test found chloral hydrate—sleeping powder—in the red wine decanter. Tell the truth right now, or you're getting my final vote!"` }
      ];
    }

    // Standard rich dialogues for remaining innocent / expansion characters (targeting lower-numbered core roles!)
    const t1 = (id === 1) ? wineSpikerBase : BASE_CHARACTERS[0];
    const t2 = (id === 7) ? BASE_CHARACTERS[0] : BASE_CHARACTERS[6];
    const t3 = (id === killerBase.id) ? witnessBase : killerBase;
    return [
      { act: "ACT I", target: `Say to ${t1.name} (#${t1.id}):`, line: `"Something is off about the 9:00 PM timeline. Did you notice who was missing from the Grand Hall—and who was strangely eager to blame the spilled wine?"` },
      { act: "ACT II", target: `Say to ${t2.name} (#${t2.id}) [after Exhibit D]:`, line: `"If the Chronos Automaton played a recorded cylinder at 8:55 PM and dropped its counterweight at 9:00 PM, then Arthur was ALREADY DEAD before the blackout!"` },
      { act: "ACT III", target: `Say to ${t3.name} (#${t3.id}) [after Exhibit E]:`, line: `"Look at Exhibit E and Arthur's Horologist Journal! His pocket watch never lost a second—and those '${killerBase.initials}' initials on the 2008 audit log point straight to one person!"` }
    ];
  }

  global.RavenshollowEngine = {
    BASE_CHARACTERS,
    CLASSIC_CODE,
    encodeCaseCode,
    decodeCaseCode,
    rollRandomCase,
    buildScenario
  };
})(window);
