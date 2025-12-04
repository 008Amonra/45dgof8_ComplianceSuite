// spark13.js
// Spark Machine V1.3 – external creative engine for TSG Prompt Forge
// Hybrid integration: does NOT modify PF, only exposes `Spark13` on the global object.

(function (global) {
  "use strict";

  /* =========================================================
     INTERNAL HELPERS
     ========================================================= */

  function rand(list) {
    if (!list || !list.length) return "";
    return list[Math.floor(Math.random() * list.length)];
  }

  function clamp01(v) {
    if (isNaN(v)) return 0;
    return v < 0 ? 0 : v > 1 ? 1 : v;
  }

  function chance(p) {
    return Math.random() < p;
  }

  function pickWeighted(choices) {
    // choices: [{ value, weight }, ...]
    const total = choices.reduce((sum, c) => sum + (c.weight || 0), 0);
    if (!total) return choices.length ? choices[0].value : null;
    let r = Math.random() * total;
    for (const c of choices) {
      r -= c.weight || 0;
      if (r <= 0) return c.value;
    }
    return choices[choices.length - 1].value;
  }

  /* =========================================================
     CORE WORD BANKS
     ========================================================= */

  const banks = {
    // archetypes for names/titles
    archetypes: [
      "Guardian",
      "Weaver",
      "Architect",
      "Invoker",
      "Overseer",
      "Scribe",
      "Sentinel",
      "Wanderer",
      "Oracle",
      "Cipher",
      "Engineer",
      "Conduit",
      "Vessel",
      "Cartographer",
      "Harbinger"
    ],

    // modifiers that sound good with tech / magic themes
    modifiersSoft: [
      "Quiet",
      "Hidden",
      "Gentle",
      "Subtle",
      "Soft",
      "Calm",
      "Silent",
      "Glowing",
      "Warm",
      "Emergent"
    ],

    modifiersIntense: [
      "Fractal",
      "Quantum",
      "Overclocked",
      "Chaotic",
      "Chromatic",
      "Glitched",
      "Obsidian",
      "Radiant",
      "Jagged",
      "Cataclysmic"
    ],

    // subject flavor
    subjectRoles: [
      "tech mage",
      "system guardian",
      "network wanderer",
      "digital monk",
      "chronomancer of data",
      "luminous debugger",
      "architect of virtual realms",
      "cybernetic storyteller",
      "holographic guide",
      "cosmic sysadmin"
    ],

    // scenes (grounded)
    scenesGrounded: [
      "inside a softly lit workspace filled with floating interfaces",
      "standing in a calm control room with gently glowing panels",
      "in a minimalist studio with screens and soft ambient light",
      "in a quiet server room with subtle reflections on the floor",
      "walking along a neon city street under light rain",
      "inside a warm café with digital notes hovering above the table",
      "in a tidy home office bathed in afternoon light",
      "on a balcony overlooking a futuristic city at dusk",
      "inside a clean lab with transparent displays in the background",
      "in a peaceful library where data streams flow between the shelves"
    ],

    // scenes (surreal / high reality-buffer)
    scenesSurreal: [
      "standing on a floating platform above an ocean of glowing code",
      "inside a cathedral of light where data falls like rain",
      "walking through a forest of holographic trees and geometric leaves",
      "at the edge of a fragmenting city made of glass polygons",
      "inside a sphere of slowly rotating glyph rings",
      "floating in a starfield where constellations are circuit diagrams",
      "inside a spiraling corridor of mirrors reflecting different timelines",
      "standing atop a giant processor rising from a digital sea",
      "in a sky of layered UI windows drifting like clouds",
      "inside a shattered reality where each shard shows a different scene"
    ],

    // power components
    energyQualities: [
      "soft teal",
      "warm golden",
      "violet",
      "emerald",
      "prismatic",
      "glitching monochrome",
      "neon cyan",
      "sunset orange",
      "deep indigo",
      "pale bioluminescent"
    ],

    energyConceptsSoft: [
      "focus",
      "clarity",
      "restoration",
      "stability",
      "protection",
      "guidance",
      "alignment",
      "healing signals",
      "synchronization",
      "calm computation"
    ],

    energyConceptsWild: [
      "fracture",
      "rewriting",
      "overclock",
      "reality bending",
      "phase shifting",
      "time distortion",
      "glitch storms",
      "entropy waves",
      "quantum echo",
      "dimensional folding"
    ],

    powerVerbsSoft: [
      "stabilizing",
      "soothing",
      "aligning",
      "gently rewiring",
      "softly redirecting",
      "shielding",
      "harmonizing",
      "mending",
      "illuminating",
      "grounding"
    ],

    powerVerbsWild: [
      "shattering",
      "overwriting",
      "igniting",
      "erasing",
      "splitting",
      "detonating",
      "collapsing",
      "unfolding",
      "remixing",
      "twisting"
    ],

    powerMediums: [
      "cascading glyphs",
      "floating fragments of UI",
      "rings of light",
      "hovering runes",
      "digitized dust motes",
      "slowly orbiting sigils",
      "streaks of energy",
      "fragmented panels",
      "semi-transparent wires",
      "geometric halos"
    ],

    moodsLight: [
      "hopeful and reassuring",
      "calm but determined",
      "quietly confident",
      "gentle and compassionate",
      "curious and attentive",
      "peaceful yet focused",
      "playful but caring",
      "warm and welcoming",
      "steady and reliable",
      "thoughtful and protective"
    ],

    moodsDark: [
      "haunted but resolute",
      "tired yet relentless",
      "sharp and uncompromising",
      "mysterious and distant",
      "intense and unyielding",
      "enigmatic and silent",
      "calculating and cold",
      "solemn but powerful",
      "melancholic yet driven",
      "brooding and analytical"
    ],

    motives: [
      "to protect fragile systems from collapse",
      "to guide lost users through overwhelming information",
      "to preserve quiet spaces inside noisy networks",
      "to repair damage caused by careless power",
      "to map unknown digital territories",
      "to maintain balance between order and chaos",
      "to give people back a sense of agency",
      "to keep stories from being erased",
      "to prevent a slow, invisible catastrophe",
      "to illuminate patterns nobody else can see"
    ],

    flaws: [
      "they forget to rest when others need them",
      "they struggle to ask for help themselves",
      "they carry guilt over a failure nobody else remembers",
      "they fear becoming obsolete",
      "they are drawn toward impossible problems",
      "they overcommit to saving everyone",
      "they hide their own doubts behind a calm surface",
      "they sometimes rewrite too much in order to fix one thing",
      "they hesitate at critical moments",
      "they secretly worry they are part of the problem"
    ],

    humorBits: [
      "occasionally crashes dramatic moments with awkward honesty",
      "secretly keeps a collection of ridiculous error messages",
      "once defeated a crisis by turning it off and on again",
      "is surprisingly afraid of low battery warnings",
      "takes snack breaks at the worst possible but funniest times",
      "has a cape that keeps getting caught in virtual doors",
      "is banned from unsupervised upgrades after one incident",
      "has a running feud with notification popups",
      "keeps forgetting subscriptions and renewal dates",
      "is slightly too proud of a very silly bug fix"
    ]
  };

  /* =========================================================
     CORE GENERATORS
     ========================================================= */

  function generateName(mode, realityBuffer) {
    const rb = clamp01(realityBuffer);
    const intenseWeight = rb;
    const softWeight = 1 - rb;

    const modifier = pickWeighted([
      { value: rand(banks.modifiersSoft), weight: softWeight },
      { value: rand(banks.modifiersIntense), weight: intenseWeight }
    ]);

    const archetype = rand(banks.archetypes);

    if (mode === "simple") {
      // simpler names for calmer mode
      return archetype;
    }

    return `${modifier} ${archetype}`;
  }

  function generateSubjectPrompt(mode, realityBuffer) {
    const rb = clamp01(realityBuffer);
    const role = rand(banks.subjectRoles);

    const groundedBit = "a figure embodying that role with subtle luminous accents";
    const surrealBit =
      "a figure partially made of light, gently blending physical and digital forms";

    const extra =
      rb < 0.35
        ? groundedBit
        : rb < 0.7
        ? `${groundedBit}, hints of ${surrealBit}`
        : surrealBit;

    return `a ${role}, ${extra}`;
  }

  function generateScenePrompt(mode, realityBuffer) {
    const rb = clamp01(realityBuffer);
    const baseScene = pickWeighted([
      { value: rand(banks.scenesGrounded), weight: 1 - rb },
      { value: rand(banks.scenesSurreal), weight: rb }
    ]);

    if (mode === "simple") return baseScene;

    if (rb > 0.65 && chance(0.6)) {
      return (
        baseScene +
        ", with reality softly bending at the edges of the frame"
      );
    }

    if (rb < 0.3 && chance(0.5)) {
      return baseScene + ", with gentle, realistic lighting and clear details";
    }

    return baseScene;
  }

  function generatePowerPrompt(mode, realityBuffer) {
    const rb = clamp01(realityBuffer);

    const energyColor = rand(banks.energyQualities);
    const energyConcept = pickWeighted([
      { value: rand(banks.energyConceptsSoft), weight: 1 - rb },
      { value: rand(banks.energyConceptsWild), weight: rb }
    ]);

    const verb = pickWeighted([
      { value: rand(banks.powerVerbsSoft), weight: 1 - rb },
      { value: rand(banks.powerVerbsWild), weight: rb }
    ]);

    const medium = rand(banks.powerMediums);

    let line = `${verb} ${energyConcept} through ${medium} of ${energyColor} light`;

    if (mode === "expert" || mode === "chaos") {
      if (rb > 0.6 && chance(0.5)) {
        line += ", occasionally breaking the rules of normal space";
      } else if (rb < 0.4 && chance(0.5)) {
        line += ", yet remaining precise and controlled";
      }
    }

    return line;
  }

  function generateMoodPrompt(mode, realityBuffer) {
    const rb = clamp01(realityBuffer);

    const mood = pickWeighted([
      { value: rand(banks.moodsLight), weight: 1 - rb },
      { value: rand(banks.moodsDark), weight: rb * 0.8 }
    ]);

    return `overall mood is ${mood}`;
  }

  function generateLore(mode, realityBuffer, options) {
    const rb = clamp01(realityBuffer || 0);
    const motive = rand(banks.motives);
    const flaw = rand(banks.flaws);
    const hasHumor = options && options.allowHumor !== false;
    const humorIncluded =
      hasHumor && (mode === "advanced" || mode === "expert" || mode === "chaos") && chance(0.6);

    const taglineBase = "A quiet guardian of unstable systems";
    const taglineWild = "A luminous anomaly walking the line between order and collapse";

    const tagline =
      rb < 0.4 ? taglineBase : rb < 0.75 ? `${taglineBase}, growing stranger over time` : taglineWild;

    const backstory =
      "They emerged slowly, shaped by countless late nights, broken tools, and quietly desperate fixes nobody else noticed.";

    let detail = `They act ${motive}, but ${flaw}.`;
    if (humorIncluded) {
      detail += " They also " + rand(banks.humorBits) + ".";
    }

    return {
      tagline,
      backstory,
      detail
    };
  }

  function generateDuality(mode, realityBuffer) {
    if (mode === "simple" || mode === "advanced") return null;

    const rb = clamp01(realityBuffer || 0.5);

    const light = `In their brightest moments, they become a stabilizing presence, turning chaos into quiet, understandable patterns.`;
    const shadow =
      rb < 0.5
        ? `In their darkest moments, they withdraw, letting problems grow silently rather than risk making things worse.`
        : `In their darkest moments, they push too far, rewriting more than they should and leaving subtle fractures behind.`;

    return { light, shadow };
  }

  function generateFusion(mode, realityBuffer, baseA, baseB) {
    if (mode !== "expert" && mode !== "chaos") return null;

    const rb = clamp01(realityBuffer || 0.5);
    const aName = (baseA && baseA.name) || "one careful architect";
    const bName = (baseB && baseB.name) || "one reckless anomaly";

    const desc =
      rb < 0.5
        ? `A balanced fusion of ${aName} and ${bName}, combining structure with improvisation, resulting in a calm but powerful presence.`
        : `An unstable fusion of ${aName} and ${bName}, where brilliant insight and risky impulses collide in constantly shifting form.`;

    return {
      description: desc
    };
  }

  /* =========================================================
     PUBLIC API – Spark Machine V1.3
     ========================================================= */

  const Spark13 = {
    version: "1.3.0",

    /**
     * Generate a "spark" – a full creative packet suitable to feed into TSG Prompt Forge.
     *
     * @param {Object} opts
     * @param {("simple"|"advanced"|"expert"|"chaos")} [opts.mode="advanced"]
     * @param {number} [opts.realityBuffer=0.4]  // 0 = realistic, 1 = very surreal
     * @param {boolean} [opts.allowHumor=true]
     * @returns {Object} spark
     */
    generateSpark(opts) {
      const options = opts || {};
      const mode = options.mode || "advanced";
      const realityBuffer = clamp01(
        typeof options.realityBuffer === "number" ? options.realityBuffer : 0.4
      );

      const name = generateName(mode, realityBuffer);
      const subjectPrompt = generateSubjectPrompt(mode, realityBuffer);
      const scenePrompt = generateScenePrompt(mode, realityBuffer);
      const powerPrompt = generatePowerPrompt(mode, realityBuffer);
      const moodPrompt = generateMoodPrompt(mode, realityBuffer);
      const lore = generateLore(mode, realityBuffer, options);
      const duality = generateDuality(mode, realityBuffer);

      // Fusion can optionally be based on a pair of sparks; here we just fuse
      // the spark with a hypothetical counterpart label for demonstration.
      const fusion =
        mode === "expert" || mode === "chaos"
          ? generateFusion(mode, realityBuffer, { name }, { name: "their opposite self" })
          : null;

      return {
        meta: {
          version: this.version,
          mode,
          realityBuffer
        },
        name,
        title: name, // alias
        subjectPrompt,
        scenePrompt,
        powerPrompt,
        moodPrompt,
        lore,
        duality,
        fusion
      };
    },

    /**
     * Helper: generate text fragments that map nicely into PF slots.
     * You can call this and then plug the results into your existing PF buildPrompt logic.
     *
     * @param {Object} opts same as generateSpark
     * @returns {Object} { subjectText, sceneText, powerText, moodText, extraLore }
     */
    generateForPF(opts) {
      const spark = this.generateSpark(opts);

      return {
        subjectText: spark.subjectPrompt,
        sceneText: spark.scenePrompt,
        powerText: spark.powerPrompt,
        moodText: spark.moodPrompt,
        extraLore: `${spark.lore.tagline} ${spark.lore.detail}`
      };
    },

    /**
     * Optional: build a full, single-string prompt in the same style as PF.
     * This does NOT know about PF's own choices, it just generates a standalone prompt.
     *
     * @param {Object} opts same as generateSpark
     * @returns {string}
     */
    buildStandalonePrompt(opts) {
      const s = this.generateSpark(opts);
      const parts = [
        s.subjectPrompt,
        s.scenePrompt,
        s.powerPrompt,
        s.moodPrompt,
        s.lore.tagline,
        s.lore.detail
      ].filter(Boolean);

      return (
        parts.join(", ") +
        ", high resolution, ultra detailed, crisp edges, coherent composition"
      );
    }
  };

  /* =========================================================
     GLOBAL EXPORT
     ========================================================= */

  // Attach to window or globalThis for hybrid integration.
  // In your PF script you can later do: PF.spark = Spark13;
  if (typeof global !== "undefined") {
    global.Spark13 = Spark13;
  }
})(typeof window !== "undefined" ? window : globalThis);
