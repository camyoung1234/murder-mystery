#!/usr/bin/env node
"use strict";

/**
 * Generates all 180 balanced variations of "The Last Chime of Ravenshollow"
 * across player counts 20 down to 12 (20 * (20 - 12 + 1) = 180 variations).
 *
 * Construction:
 *  1. Start at N = 20 players with 20 variations (one with each character #1..#20 as Killer)
 *     and 3 accomplices per game, assigned so every character is an accomplice equally often (3x).
 *  2. Iteratively step down N = 19, 18, ..., 12:
 *     - Remove 1 innocent character from each of the 20 variations (forming a bijection of 1..20
 *       at every round so every character appears in exactly N variations).
 *     - Scale accomplices for player count N (3 for 18-20, 2 for 14-17, 1 for 12-13), keeping
 *       the number of times each character is an accomplice strictly equal across all 20 characters.
 *     - Rebuild scripts, roles, dialogues, and exhibits via mystery-engine.js so every variation
 *       is 100% self-consistent for its active cast.
 *  3. Validate probability balance and self-consistency across all 180 variations.
 *  4. Write:
 *     - variations/<N>-players/variation-<01..20>.json  (180 full variations)
 *     - variations/index.json                           (manifest + balance stats)
 *     - assets/variations-data.js                       (browser bundle for web/print pages)
 */

const fs = require("fs");
const path = require("path");
const Engine = require("../assets/mystery-engine.js");

const ROOT_DIR = path.resolve(__dirname, "..");
const VARIATIONS_DIR = path.join(ROOT_DIR, "variations");
const VARIATIONS_DATA_JS = path.join(ROOT_DIR, "assets", "variations-data.js");

const NUM_CHARS = 20;
const MAX_PLAYERS = Engine.MAX_PLAYERS; // 20
const MIN_PLAYERS = Engine.MIN_PLAYERS; // 12
const REMOVAL_STEPS = MAX_PLAYERS - MIN_PLAYERS; // 8

// Deterministic Mulberry32 PRNG so re-running the script produces identical output
function createRng(seed) {
  let a = seed >>> 0;
  return function next() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle(arr, rng) {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const tmp = out[i];
    out[i] = out[j];
    out[j] = tmp;
  }
  return out;
}

/**
 * Finds a perfect matching on the bipartite graph between rows (1..20) and
 * symbols (1..20), avoiding already-used symbols in each row (guaranteed to
 * exist by Hall's Marriage Theorem for any partial Latin rectangle).
 */
function findBalancedColumn(usedByRow, rng, fixedPairs) {
  const matchRowToSym = new Map();
  const matchSymToRow = new Map();

  for (const [r, s] of Object.entries(fixedPairs || {})) {
    const row = Number(r);
    const sym = Number(s);
    if (usedByRow[row].has(sym)) {
      throw new Error(`Fixed pair (${row} -> ${sym}) conflicts with existing assignment`);
    }
    matchRowToSym.set(row, sym);
    matchSymToRow.set(sym, row);
  }

  const adj = {};
  for (let row = 1; row <= NUM_CHARS; row++) {
    const candidates = [];
    for (let sym = 1; sym <= NUM_CHARS; sym++) {
      if (!usedByRow[row].has(sym)) candidates.push(sym);
    }
    adj[row] = shuffle(candidates, rng);
  }

  function tryAugment(row, visitedSyms) {
    for (const sym of adj[row]) {
      if (visitedSyms.has(sym)) continue;
      if (fixedPairs && Object.values(fixedPairs).includes(sym)) continue;
      visitedSyms.add(sym);
      const prevRow = matchSymToRow.get(sym);
      if (prevRow === undefined || tryAugment(prevRow, visitedSyms)) {
        matchRowToSym.set(row, sym);
        matchSymToRow.set(sym, row);
        return true;
      }
    }
    return false;
  }

  for (let row = 1; row <= NUM_CHARS; row++) {
    if (matchRowToSym.has(row)) continue;
    const visited = new Set();
    if (!tryAugment(row, visited)) {
      throw new Error(`Failed to find perfect matching at row ${row}`);
    }
  }

  const col = {};
  for (let row = 1; row <= NUM_CHARS; row++) {
    col[row] = matchRowToSym.get(row);
  }
  return col;
}

/**
 * Builds the balanced 20x12 Latin rectangle schedule:
 *  - Column 0: killerId = 1..20
 *  - Column 1: coreAccomplice (active for all N = 12..20; #4 -> #6 locked for Classic J.M. pair)
 *  - Column 2: lookoutAccomplice (active for N = 14..20)
 *  - Column 3: deflectionAccomplice (active for N = 18..20)
 *  - Columns 4..11: innocent character removed at each step (20->19, 19->18, ..., 13->12)
 */
function buildBalancedSchedule() {
  const rng = createRng(20261121);
  const usedByRow = {};
  for (let k = 1; k <= NUM_CHARS; k++) {
    usedByRow[k] = new Set([k]); // Killer is column 0
  }

  // Columns 1..3: 3 accomplice slots (mutually disjoint permutations of 1..20)
  const coreCol = findBalancedColumn(usedByRow, rng, { 4: 6 });
  for (let k = 1; k <= NUM_CHARS; k++) usedByRow[k].add(coreCol[k]);

  const lookoutCol = findBalancedColumn(usedByRow, rng);
  for (let k = 1; k <= NUM_CHARS; k++) usedByRow[k].add(lookoutCol[k]);

  const deflectionCol = findBalancedColumn(usedByRow, rng);
  for (let k = 1; k <= NUM_CHARS; k++) usedByRow[k].add(deflectionCol[k]);

  // Columns 4..11: 8 innocent removal rounds (20->19 down to 13->12)
  const removalCols = [];
  for (let step = 0; step < REMOVAL_STEPS; step++) {
    const remCol = findBalancedColumn(usedByRow, rng);
    for (let k = 1; k <= NUM_CHARS; k++) usedByRow[k].add(remCol[k]);
    removalCols.push(remCol);
  }

  return { coreCol, lookoutCol, deflectionCol, removalCols };
}

/**
 * Generates all 180 variations top-down from 20 players down to 12 players.
 */
function generateAllVariations() {
  const { coreCol, lookoutCol, deflectionCol, removalCols } = buildBalancedSchedule();

  const blueprintsByCount = {};
  const scenariosByCount = {};

  // Round 20: 20 variations of the 20-player game (one per killer #1..#20)
  blueprintsByCount[MAX_PLAYERS] = {};
  scenariosByCount[MAX_PLAYERS] = {};

  for (let k = 1; k <= NUM_CHARS; k++) {
    const activeIds = Array.from({ length: NUM_CHARS }, (_, i) => i + 1);
    const accomplices = [coreCol[k], lookoutCol[k], deflectionCol[k]];
    const caseCode = Engine.encodeCaseCode(k, k === 4 ? 107 : (k * 23) % 500);
    const blueprint = {
      playerCount: MAX_PLAYERS,
      variationId: k,
      caseCode,
      killerId: k,
      accomplices,
      activeIds,
      removedIds: [],
      removedThisRound: null
    };
    blueprintsByCount[MAX_PLAYERS][k] = blueprint;
    scenariosByCount[MAX_PLAYERS][k] = Engine.buildScenario(caseCode, MAX_PLAYERS, blueprint);
  }

  // Rounds 19 down to 12: remove 1 innocent character from each game in the previous round
  for (let n = MAX_PLAYERS - 1; n >= MIN_PLAYERS; n--) {
    const stepIndex = MAX_PLAYERS - n - 1; // 0 for 19, 1 for 18, ..., 7 for 12
    const remCol = removalCols[stepIndex];
    const accCount = Engine.accompliceCountFor(n);

    blueprintsByCount[n] = {};
    scenariosByCount[n] = {};

    for (let k = 1; k <= NUM_CHARS; k++) {
      const parent = blueprintsByCount[n + 1][k];
      const removedChar = remCol[k];

      // Verify the removed character is currently active and innocent
      if (!parent.activeIds.includes(removedChar)) {
        throw new Error(`Round ${n} var ${k}: character #${removedChar} is not active in parent`);
      }
      if (removedChar === parent.killerId || parent.accomplices.includes(removedChar)) {
        throw new Error(`Round ${n} var ${k}: attempted to remove Shadow Team member #${removedChar}`);
      }

      const activeIds = parent.activeIds.filter(id => id !== removedChar);
      const removedIds = [...parent.removedIds, removedChar];
      const allThreeAccomplices = [coreCol[k], lookoutCol[k], deflectionCol[k]];
      const accomplices = allThreeAccomplices.slice(0, accCount);

      const blueprint = {
        playerCount: n,
        variationId: k,
        caseCode: parent.caseCode,
        killerId: k,
        accomplices,
        activeIds,
        removedIds,
        removedThisRound: removedChar
      };
      blueprintsByCount[n][k] = blueprint;
      scenariosByCount[n][k] = Engine.buildScenario(parent.caseCode, n, blueprint);
    }
  }

  return { blueprintsByCount, scenariosByCount };
}

/**
 * Exhaustive self-consistency and probability-balance validation across all 180 variations.
 */
function validateAll(blueprintsByCount, scenariosByCount) {
  let totalCount = 0;
  const roundSummaries = [];

  for (let n = MAX_PLAYERS; n >= MIN_PLAYERS; n--) {
    const expectedAcc = Engine.accompliceCountFor(n);
    const appearCounts = new Array(NUM_CHARS + 1).fill(0);
    const killerCounts = new Array(NUM_CHARS + 1).fill(0);
    const accompliceCounts = new Array(NUM_CHARS + 1).fill(0);
    const accompliceSlotCounts = Array.from({ length: expectedAcc }, () => new Array(NUM_CHARS + 1).fill(0));
    const removedThisRoundSet = new Set();

    for (let k = 1; k <= NUM_CHARS; k++) {
      totalCount++;
      const bp = blueprintsByCount[n][k];
      const sc = scenariosByCount[n][k];
      const tag = `[${n}p var #${k}]`;

      // 1. Cast size & parent consistency
      if (sc.characters.length !== n || sc.activeIds.length !== n) {
        throw new Error(`${tag} Expected ${n} active characters, got ${sc.characters.length}`);
      }
      if (sc.removedIds.length !== MAX_PLAYERS - n) {
        throw new Error(`${tag} Expected ${MAX_PLAYERS - n} removed characters, got ${sc.removedIds.length}`);
      }
      if (n < MAX_PLAYERS) {
        const parent = blueprintsByCount[n + 1][k];
        const diff = parent.activeIds.filter(id => !bp.activeIds.includes(id));
        if (diff.length !== 1 || diff[0] !== bp.removedThisRound) {
          throw new Error(`${tag} Cast does not equal parent minus 1 innocent`);
        }
        removedThisRoundSet.add(bp.removedThisRound);
      }

      // 2. Tally probabilities
      for (const id of sc.activeIds) appearCounts[id]++;
      killerCounts[sc.killerId]++;
      if (sc.accomplices.length !== expectedAcc) {
        throw new Error(`${tag} Expected ${expectedAcc} accomplices, got ${sc.accomplices.length}`);
      }
      sc.accomplices.forEach((aid, idx) => {
        accompliceCounts[aid]++;
        accompliceSlotCounts[idx][aid]++;
      });

      // 3. All key roles must be active & properly disjoint
      const activeSet = new Set(sc.activeIds);
      const mustBeActive = [
        sc.killerId,
        ...sc.accomplices,
        sc.inspectorId,
        sc.witnessId,
        sc.wineSpikerId,
        sc.alibiWitnessId,
        sc.automatonSpeakerId,
        ...sc.exhibitEIds
      ];
      for (const id of mustBeActive) {
        if (!activeSet.has(id)) {
          throw new Error(`${tag} Role/Exhibit character #${id} is not in activeIds`);
        }
      }

      const shadowSet = new Set(sc.shadowIds);
      const anchors = [sc.inspectorId, sc.witnessId, sc.wineSpikerId, sc.alibiWitnessId];
      if (new Set(anchors).size !== 4) {
        throw new Error(`${tag} Innocent story anchors collide: ${anchors.join(",")}`);
      }
      for (const a of anchors) {
        if (shadowSet.has(a)) {
          throw new Error(`${tag} Innocent anchor #${a} is on Shadow Team`);
        }
      }
      if (sc.exhibitEIds.length !== 6 || new Set(sc.exhibitEIds).size !== 6) {
        throw new Error(`${tag} Exhibit E must have 6 distinct active characters`);
      }

      // 4. Zero references to removed characters & zero self-addressed dialogues
      const removedChars = sc.removedIds.map(rid => Engine.BASE_CHARACTERS[rid - 1]);
      const checkNoRemovedRefs = (text, label) => {
        for (const rc of removedChars) {
          if (text.includes(`(#${rc.id})`) || text.includes(`#${rc.id})`) || text.includes(rc.name)) {
            throw new Error(`${tag} ${label} references removed character ${rc.name} (#${rc.id})`);
          }
        }
      };

      for (const ch of sc.characters) {
        checkNoRemovedRefs(ch.persona, `char #${ch.id} persona`);
        checkNoRemovedRefs(ch.special, `char #${ch.id} special`);
        checkNoRemovedRefs(ch.secret, `char #${ch.id} secret`);
        checkNoRemovedRefs(ch.clue, `char #${ch.id} clue`);
        checkNoRemovedRefs(ch.detention, `char #${ch.id} detention`);
        for (const d of ch.dialogues) {
          checkNoRemovedRefs(d.target + " " + d.line, `char #${ch.id} ${d.act} dialogue`);
          if (d.target.includes(`(#${ch.id})`)) {
            throw new Error(`${tag} char #${ch.id} ${d.act} dialogue addresses itself: ${d.target}`);
          }
        }
      }
      for (const ex of sc.exhibits) {
        checkNoRemovedRefs(ex.title + " " + ex.html, `exhibit ${ex.id}`);
      }
      for (const [actKey, actObj] of Object.entries(sc.acts)) {
        checkNoRemovedRefs(actObj.html, `act ${actKey}`);
      }
      checkNoRemovedRefs(sc.revealHtml, "revealHtml");
    }

    // Verify exact equality across all 20 characters for round N
    if (n < MAX_PLAYERS && removedThisRoundSet.size !== NUM_CHARS) {
      throw new Error(`Round ${n}: removed characters are not a bijection of 1..20`);
    }
    for (let id = 1; id <= NUM_CHARS; id++) {
      if (appearCounts[id] !== n) {
        throw new Error(`Round ${n}: char #${id} appeared ${appearCounts[id]} times (expected ${n})`);
      }
      if (killerCounts[id] !== 1) {
        throw new Error(`Round ${n}: char #${id} was Killer ${killerCounts[id]} times (expected 1)`);
      }
      if (accompliceCounts[id] !== expectedAcc) {
        throw new Error(`Round ${n}: char #${id} was Accomplice ${accompliceCounts[id]} times (expected ${expectedAcc})`);
      }
      for (let slot = 0; slot < expectedAcc; slot++) {
        if (accompliceSlotCounts[slot][id] !== 1) {
          throw new Error(`Round ${n}: char #${id} was Accomplice slot ${slot + 1} ${accompliceSlotCounts[slot][id]} times (expected 1)`);
        }
      }
    }

    roundSummaries.push({
      playerCount: n,
      variations: NUM_CHARS,
      accomplicesPerGame: expectedAcc,
      appearancesPerCharacter: n,
      killerCountPerCharacter: 1,
      accompliceCountPerCharacter: expectedAcc,
      killerProbabilityOverall: Number((1 / NUM_CHARS).toFixed(4)),
      accompliceProbabilityOverall: Number((expectedAcc / NUM_CHARS).toFixed(4)),
      killerProbabilityWhenPresent: Number((1 / n).toFixed(4)),
      accompliceProbabilityWhenPresent: Number((expectedAcc / n).toFixed(4))
    });
  }

  const expectedTotal = NUM_CHARS * (MAX_PLAYERS - MIN_PLAYERS + 1);
  if (totalCount !== expectedTotal) {
    throw new Error(`Expected ${expectedTotal} total variations, generated ${totalCount}`);
  }

  return { totalCount, roundSummaries };
}

function writeOutputs(blueprintsByCount, scenariosByCount, validation) {
  // Clean and recreate variations/ directory
  fs.rmSync(VARIATIONS_DIR, { recursive: true, force: true });
  fs.mkdirSync(VARIATIONS_DIR, { recursive: true });

  const manifestEntries = [];

  for (let n = MAX_PLAYERS; n >= MIN_PLAYERS; n--) {
    const dir = path.join(VARIATIONS_DIR, `${n}-players`);
    fs.mkdirSync(dir, { recursive: true });

    for (let k = 1; k <= NUM_CHARS; k++) {
      const sc = scenariosByCount[n][k];
      const bp = blueprintsByCount[n][k];
      const fileName = `variation-${String(k).padStart(2, "0")}.json`;
      const relPath = `${n}-players/${fileName}`;

      const payload = {
        playerCount: sc.playerCount,
        variationId: sc.variationId,
        caseCode: sc.code,
        activeIds: sc.activeIds,
        removedIds: sc.removedIds,
        removedThisRound: bp.removedThisRound,
        killerId: sc.killerId,
        accomplices: sc.accomplices,
        shadowIds: sc.shadowIds,
        inspectorId: sc.inspectorId,
        witnessId: sc.witnessId,
        wineSpikerId: sc.wineSpikerId,
        alibiWitnessId: sc.alibiWitnessId,
        automatonSpeakerId: sc.automatonSpeakerId,
        exhibitEIds: sc.exhibitEIds,
        characters: sc.characters,
        exhibits: sc.exhibits,
        acts: sc.acts,
        revealHtml: sc.revealHtml
      };

      fs.writeFileSync(path.join(dir, fileName), JSON.stringify(payload, null, 2) + "\n", "utf8");

      manifestEntries.push({
        playerCount: n,
        variationId: k,
        caseCode: sc.code,
        killerId: sc.killerId,
        killerName: sc.killerBase.name,
        accomplices: sc.accomplices,
        removedThisRound: bp.removedThisRound,
        removedIds: sc.removedIds,
        activeIds: sc.activeIds,
        file: relPath
      });
    }
  }

  const indexPayload = {
    totalVariations: validation.totalCount,
    playerCountRange: { min: MIN_PLAYERS, max: MAX_PLAYERS },
    variationsPerPlayerCount: NUM_CHARS,
    balanceSummary: validation.roundSummaries,
    variations: manifestEntries
  };

  fs.writeFileSync(
    path.join(VARIATIONS_DIR, "index.json"),
    JSON.stringify(indexPayload, null, 2) + "\n",
    "utf8"
  );

  // Compact browser-loadable blueprint bundle for assets/mystery-engine.js
  const compactTable = {};
  for (let n = MAX_PLAYERS; n >= MIN_PLAYERS; n--) {
    compactTable[n] = {};
    for (let k = 1; k <= NUM_CHARS; k++) {
      const bp = blueprintsByCount[n][k];
      compactTable[n][k] = {
        playerCount: bp.playerCount,
        variationId: bp.variationId,
        caseCode: bp.caseCode,
        killerId: bp.killerId,
        accomplices: bp.accomplices,
        activeIds: bp.activeIds,
        removedIds: bp.removedIds
      };
    }
  }

  const jsContent =
    `/* AUTO-GENERATED by scripts/generate-variations.js — DO NOT EDIT MANUALLY.\n` +
    `   Contains all ${validation.totalCount} balanced game variations (${NUM_CHARS} variations x ${MAX_PLAYERS - MIN_PLAYERS + 1} player counts, ${MIN_PLAYERS}-${MAX_PLAYERS} players). */\n` +
    `(function (global) {\n` +
    `  "use strict";\n` +
    `  const VARIATIONS = ${JSON.stringify(compactTable)};\n` +
    `  if (typeof module !== "undefined" && module.exports) {\n` +
    `    module.exports = VARIATIONS;\n` +
    `  }\n` +
    `  if (global) {\n` +
    `    global.RAVENSHOLLOW_VARIATIONS = VARIATIONS;\n` +
    `  }\n` +
    `})(typeof window !== "undefined" ? window : (typeof globalThis !== "undefined" ? globalThis : this));\n`;

  fs.writeFileSync(VARIATIONS_DATA_JS, jsContent, "utf8");
}

function main() {
  const { blueprintsByCount, scenariosByCount } = generateAllVariations();
  const validation = validateAll(blueprintsByCount, scenariosByCount);
  writeOutputs(blueprintsByCount, scenariosByCount, validation);

  console.log(`Generated and validated ${validation.totalCount} balanced variations (${MIN_PLAYERS}–${MAX_PLAYERS} players).`);
  for (const r of validation.roundSummaries) {
    console.log(
      `  ${r.playerCount} players: ${r.variations} variations | ` +
      `each char present ${r.appearancesPerCharacter}x, killer ${r.killerCountPerCharacter}x ` +
      `(${(r.killerProbabilityWhenPresent * 100).toFixed(2)}%), accomplice ${r.accompliceCountPerCharacter}x ` +
      `(${(r.accompliceProbabilityWhenPresent * 100).toFixed(2)}%)`
    );
  }
  console.log(`Wrote variations/ (${validation.totalCount} JSON files + index.json) and assets/variations-data.js`);
}

if (require.main === module) {
  main();
}
