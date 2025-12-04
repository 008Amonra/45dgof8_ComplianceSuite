// TSG Prompt Forge – JS engine v4.0 PRO
// Combined: legacy NightCafe helper + v3.1 engine + Happy Mode + glow
// Optimized version with optional user text support

(() => {
  "use strict";

  /* =========================================================
     DATA MODEL – prompt building blocks
     ========================================================= */

  const PF = {

    styles: [
      { id: "cinematic",  label: "Cinematic concept art",  text: "cinematic concept art, dramatic lighting, highly detailed" },
      { id: "ultra_real", label: "Ultrareal photography",  text: "ultra-realistic photography, sharp focus, physically correct lighting, detailed skin texture" },
      { id: "cyberpunk",  label: "Neon cyberpunk",        text: "neon cyberpunk aesthetic, glowing signs, atmospheric rain, deep blues and oranges" },
      { id: "anime",      label: "Arcane / anime style",  text: "stylized digital painting, anime-inspired, expressive lighting, smooth shading" },
      { id: "minimal",    label: "Minimal clean sci-fi",  text: "clean minimal sci-fi, soft gradients, subtle lighting, uncluttered composition" },
      { id: "retro",      label: "Retro synthwave",       text: "80s synthwave, neon grid, magenta and cyan glow, retro-futuristic vibes" }
    ],

    /* ===== SUBJECTS – balanced + abstract ===== */
    subjects: [
      { id: "tech_mage_f",    label: "Tech mage (female)",           text: "a female tech mage with flowing circuitry patterns glowing along her arms" },
      { id: "tech_mage_m",    label: "Tech mage (male)",             text: "a male tech mage with glowing circuitry woven across his robes" },
      { id: "tech_mage_nb",   label: "Tech mage (non-binary)",       text: "a non-binary tech mage radiating soft bioluminescent energy from their hands" },

      { id: "sysadmin_f",     label: "Cyber sysadmin (female)",      text: "a skilled female sysadmin working through floating holographic terminals" },
      { id: "sysadmin_nb",    label: "Cyber sysadmin (non-binary)",  text: "a non-binary sysadmin calmly navigating immersive concentric system displays" },

      { id: "hacker_f",       label: "Hacker (female)",              text: "a focused female hacker surrounded by neon reflections and cascading code" },
      { id: "hacker_m",       label: "Hacker (male)",                text: "a male hacker illuminated by screens and electric glow" },
      { id: "hacker_nb",      label: "Hacker (non-binary)",          text: "a non-binary hacker with minimal cyberpunk aesthetics and soft neon tones" },

      { id: "guardian_ai_f",  label: "AI guardian avatar (female)",        text: "a female guardian AI avatar with warm holographic light weaving around her form" },
      { id: "guardian_ai_m",  label: "AI guardian avatar (male)",          text: "a male guardian AI avatar with calm teal luminescence and geometric features" },
      { id: "guardian_ai_nb", label: "AI guardian avatar (androgynous)",   text: "an androgynous guardian AI projection shimmering with smooth gradients" },

      { id: "engineer_f",     label: "Systems engineer (female)",    text: "a female systems engineer interacting with transparent floating interfaces" },
      { id: "engineer_m",     label: "Systems engineer (male)",      text: "a male systems engineer surrounded by interactive data displays" },
      { id: "engineer_nb",    label: "Systems engineer (non-binary)",text: "a non-binary engineer designing digital constructs suspended in air" },

      { id: "digital_monk_f", label: "Digital monk (female)",        text: "a serene female monk meditating among swirling lines of code" },
      { id: "digital_monk_m", label: "Digital monk (male)",          text: "a tranquil male digital monk surrounded by soft luminous rings" },
      { id: "digital_monk_nb",label: "Digital monk (agender)",       text: "an agender monk hovering in concentric holographic glyphs" },

      // NON-HUMAN / ABSTRACT / ARTISTIC
      { id: "ai_core",        label: "Sentient AI core",             text: "a sentient AI core shaping a humanoid silhouette out of fractal light" },
      { id: "robotic_sage",   label: "Robotic sage",                 text: "a wise robotic sage with ancient digital inscriptions glowing faintly" },
      { id: "cyber_familiar", label: "Cyber familiar",               text: "a floating cyber-familiar creature composed of shifting geometric polygons" },
      { id: "hologram_person",label: "Holographic person",           text: "a soft holographic figure shimmering with neon gradients and gentle flicker" },
      { id: "data_spirit",    label: "Spirit of the network",        text: "a graceful spirit made of flowing binary code and swirling data particles" },
      { id: "ghost_machine",  label: "Ghost in the machine",         text: "an ethereal entity made of fragmented UI shards and translucent code" },

      // SOFT / ART AESTHETICS
      { id: "soft_tech_muse",   label: "Digital muse (feminine)",    text: "a feminine digital muse surrounded by soft pastel lights and floating symbols" },
      { id: "androgynous_muse", label: "Digital muse (androgynous)", text: "an androgynous muse formed from shifting light ribbons and subtle glow" },
      { id: "artistic_scribe",  label: "Techno-scribe",              text: "a futuristic artistic scribe sketching glowing diagrams mid-air" },

      // COSMIC / FANTASY-TECH
      { id: "starweaver",     label: "Star-weaver",                  text: "a cosmic figure weaving threads of starlight into digital constellations" },
      { id: "chrono_mage",    label: "Chrono-mage",                  text: "a time-bending techno-mage shaping chronal data streams" }
    ],

    scenes: [
      { id: "street",      label: "Rainy neon street",  text: "standing in a rain-soaked neon street, reflections on wet pavement" },
      { id: "server_room", label: "Deep server room",   text: "inside a glowing server room with towering racks and LED lights" },
      { id: "lab",         label: "Clean sci-fi lab",   text: "inside a clean futuristic lab with floating displays" },
      { id: "temple",      label: "Holographic temple", text: "inside a holographic techno-temple of floating terminals and light" },
      { id: "void",        label: "Dark data void",     text: "in a dark void filled with flowing data streams and glyphs" }
    ],

    powers: [
      { id: "circuits_hands", label: "Glowing circuitry hands", text: "hands glowing with intricate teal circuitry patterns" },
      { id: "code_streams",   label: "Floating code streams",   text: "streams of floating code wrapping around them like ribbons" },
      { id: "portal",         label: "Opening a portal",        text: "opening a circular digital portal made of light" },
      { id: "repair",         label: "Repairing data",          text: "repairing fractured code shards and aligning them" },
      { id: "scan",           label: "System scan",             text: "triggering a system-scan visualized as expanding light rings" }
    ],

    // moods: merged + original 'hopeful'
    moods: [
      { id: "calm",        label: "Calm & wise",           text: "mood is calm, wise, reassuring, focused on helping" },
      { id: "mysterious",  label: "Mysterious",            text: "atmosphere is mysterious and powerful, but benevolent" },
      { id: "intense",     label: "Intense & dramatic",    text: "tone is intense and dramatic, high tension, high stakes" },
      { id: "just_happy",  label: "Happy",                 text: "mood is totally happy and excited, uplifting with warm highlights" },
      { id: "hopeful",     label: "Hopeful & bright",      text: "mood is hopeful, uplifting, with warm highlights and gentle optimism" },
      { id: "zen",         label: "Zen & meditative",      text: "mood is zen-like and meditative, peaceful and focused" }
    ],

    expressions: [
      { id: "expr_calm_focus",   label: "Calm focus",      text: "expression calm and focused, eyes attentive" },
      { id: "expr_soft_smile",   label: "Soft smile",      text: "expression soft and kind, faint smile" },
      { id: "expr_confident",    label: "Confident",       text: "expression confident and self-assured" },
      { id: "expr_determined",   label: "Determined",      text: "expression serious and determined" },
      { id: "expr_serene",       label: "Serene",          text: "expression relaxed and serene" },
      { id: "expr_concentrated", label: "Deep in thought", text: "expression thoughtful, slightly distant gaze" }
    ],

    outfits: [
      { id: "outfit_sleek_suit",  label: "Sleek tech suit",      text: "wearing a sleek form-fitting sci-fi tech suit with subtle panels and seams" },
      { id: "outfit_armor_light", label: "Light armor",          text: "wearing light futuristic armor with glowing inlays" },
      { id: "outfit_casual",      label: "Casual techno-wear",   text: "wearing casual futuristic streetwear with subtle circuitry accents" },
      { id: "outfit_robes",       label: "Digital robes",        text: "wearing flowing digital robes decorated with faint holographic sigils" },
      { id: "outfit_labcoat",     label: "Scientist / engineer", text: "wearing a clean futuristic jacket or lab coat with integrated devices" }
    ],

    lighting: [
      { id: "light_soft_cinema", label: "Soft cinematic",    text: "soft cinematic lighting, gentle contrast, subtle rim light" },
      { id: "light_hard_cinema", label: "Dramatic contrast", text: "high contrast dramatic lighting, strong key light and deep shadows" },
      { id: "light_neon",        label: "Neon glow",         text: "neon lighting, glowing reflections and colorful specular highlights" },
      { id: "light_volumetric",  label: "Volumetric rays",   text: "volumetric god rays streaking through the scene" },
      { id: "light_backlit",     label: "Backlit aura",      text: "strong backlight creating a glowing outline around the subject" }
    ],

    details: [
      { id: "cinema",    label: "Cinematic camera", text: "cinematic composition, shallow depth of field, filmic look" },
      { id: "macro",     label: "Macro detail",     text: "macro-lens level detail, sharp microtextures" },
      { id: "wide",      label: "Wide shot",        text: "wide establishing shot showing environment and depth" },
      { id: "studio",    label: "Studio lighting",  text: "studio-style lighting, controlled highlights" },
      { id: "particles", label: "Particles & FX",   text: "floating dust and light particles, subtle atmospheric effects" }
    ],

    palettes: [
      { id: "teal_orange",  label: "Teal & orange",   text: "color palette of teal and warm orange lights" },
      { id: "violet_gold",  label: "Violet & gold",   text: "deep violet shadows with golden highlights" },
      { id: "blue_pink",    label: "Blue & magenta",  text: "cool blue ambience with magenta accents" },
      { id: "emerald_cyan", label: "Emerald & cyan",   text: "emerald green glows with cool cyan highlights" },
      { id: "monochrome",   label: "Soft monochrome", text: "muted near-monochrome palette with gentle contrast" }
    ],

    // merged: old + new negatives
    negative: [
      "blurry","low-res","low quality","grainy","washed out colors",
      "bad anatomy","distorted anatomy","extra fingers","mangled hands","twisted limbs",
      "text","watermark","logo",
      "oversaturated","flat lighting","chaotic background",
      "bad proportions","tiling","jpeg artifacts"
    ]
  };

  /* =========================================================
     HELPERS
     ========================================================= */
  const $   = id  => document.getElementById(id);
  const qs  = sel => document.querySelector(sel);
  const qsa = sel => Array.from(document.querySelectorAll(sel));
  const rand = list => list[Math.floor(Math.random() * list.length)];

  function fillSelect(id, list) {
    const el = $(id);
    if (!el || !list) return;
    el.innerHTML = "";
    list.forEach(item => {
      const opt = document.createElement("option");
      opt.value = item.id;
      opt.textContent = item.label;
      el.appendChild(opt);
    });
    if (list.length) el.value = rand(list).id;
  }

  function getText(id, list) {
    const el = $(id);
    if (!el || !list || !el.value) return "";
    const found = list.find(x => x.id === el.value);
    return found ? found.text : "";
  }

  function ensureToast() {
    let toast = $("pf-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "pf-toast";
      toast.className = "pf-toast";
      toast.textContent = "Prompt copied — paste into your generator!";
      document.body.appendChild(toast);
    }
    return toast;
  }

  function showToast(msg) {
    const toast = ensureToast();
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2500);
  }

  /* =========================================================
     HAPPY MODE
     ========================================================= */
  function applyHappyMode() {
    const happySwitch = $("pf-happy-switch");
    const moodSelect  = $("pf-mood");
    const forgeCard   = qs(".prompt-forge");

    const happyOn = !!(happySwitch && happySwitch.checked);

    if (moodSelect) {
      if (happyOn) {
        // lock to "Happy" mood
        moodSelect.value = "just_happy";
        moodSelect.disabled = true;
      } else {
        moodSelect.disabled = false;
      }
    }

    if (forgeCard) {
      forgeCard.classList.toggle("happy-mode", happyOn);
    }

    buildPrompt();
  }

  /* =========================================================
     BUILD UI STRUCTURE (controls + output)
     ========================================================= */
  function buildUI() {
    const controls = $("pf-controls");
    const output   = $("pf-output");
    if (!controls || !output) return;

    controls.innerHTML = `
      <div class="pf-row">
        <label for="pf-happy-switch"><strong>Happy Mode</strong></label>
        <input type="checkbox" id="pf-happy-switch" style="width:18px;height:18px;cursor:pointer;">
        <span></span>
      </div>

      <div class="pf-row">
        <label for="pf-style"><strong>1. Style</strong></label>
        <select id="pf-style"></select>
        <button type="button" class="pf-mini" data-pf-rand="style">🎲</button>
      </div>

      <div class="pf-row">
        <label for="pf-subject"><strong>2. Subject</strong></label>
        <select id="pf-subject"></select>
        <button type="button" class="pf-mini" data-pf-rand="subject">🎲</button>
      </div>

      <div class="pf-row">
        <label for="pf-scene"><strong>3. Scene</strong></label>
        <select id="pf-scene"></select>
        <button type="button" class="pf-mini" data-pf-rand="scene">🎲</button>
      </div>

      <div class="pf-row">
        <label for="pf-power"><strong>4. Focus / Power</strong></label>
        <select id="pf-power"></select>
        <button type="button" class="pf-mini" data-pf-rand="power">🎲</button>
      </div>

      <div class="pf-row">
        <label for="pf-mood"><strong>5. Mood</strong></label>
        <select id="pf-mood"></select>
        <button type="button" class="pf-mini" data-pf-rand="mood">🎲</button>
      </div>

      <div class="pf-row">
        <label for="pf-lighting"><strong>6. Lighting</strong></label>
        <select id="pf-lighting"></select>
        <button type="button" class="pf-mini" data-pf-rand="lighting">🎲</button>
      </div>

      <div class="pf-row">
        <label for="pf-detail"><strong>7. Detail / Camera</strong></label>
        <select id="pf-detail"></select>
        <button type="button" class="pf-mini" data-pf-rand="detail">🎲</button>
      </div>

      <div class="pf-row">
        <label for="pf-expression"><strong>8. Expression</strong></label>
        <select id="pf-expression"></select>
        <button type="button" class="pf-mini" data-pf-rand="expression">🎲</button>
      </div>

      <div class="pf-row">
        <label for="pf-outfit"><strong>9. Outfit</strong></label>
        <select id="pf-outfit"></select>
        <button type="button" class="pf-mini" data-pf-rand="outfit">🎲</button>
      </div>

      <div class="pf-row">
        <label for="pf-palette"><strong>10. Palette</strong></label>
        <select id="pf-palette"></select>
        <button type="button" class="pf-mini" data-pf-rand="palette">🎲</button>
      </div>

      <div class="pf-row">
        <label for="pf-usertext"><strong>Optional: add your own text</strong></label>
        <input
        type="text"
        id="pf-usertext"
        placeholder=""
        style="width:100%;padding:6px;border-radius:6px;border:1px solid #888;">
      </div>

      <div class="pf-actions">
        <button type="button" id="pf-rand-all" class="pf-mini">🎲 Randomize all</button>
        <button type="button" id="pf-generate" class="pf-mini">⚡ Regenerate prompt</button>
      </div>
    `;

    output.innerHTML = `
      <div class="pf-block">
        <div class="pf-block-head">
          <span>Image prompt</span>
          <button type="button" class="pf-copy" data-pf-copy="prompt">📋 Copy</button>
        </div>
        <textarea id="pf-prompt" rows="8"></textarea>
      </div>

      <div class="pf-block">
        <div class="pf-block-head">
          <span>Negative prompt</span>
          <button type="button" class="pf-copy" data-pf-copy="negative">📋 Copy</button>
        </div>
        <textarea id="pf-negative" rows="4" readonly></textarea>
      </div>

      <div class="pf-actions" style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
        <select id="pf-target" class="pf-mini" style="min-width:160px;">
          <option value="nightcafe">NightCafe Studio</option>
          <option value="midjourney">MidJourney</option>
          <option value="sdwebui">Stable Diffusion WebUI</option>
          <option value="leonardo">Leonardo AI</option>
          <option value="bluewillow">BlueWillow</option>
          <option value="runway">Runway ML</option>
          <option value="playground">Playground AI</option>
          <option value="dalle">OpenAI DALL·E</option>
        </select>
        <button type="button" id="pf-send" class="pf-nc-btn">Copy & open</button>
      </div>

      <p class="pf-hint">
        Tip: Paste the prompt into NightCafe (Coherent or SDXL), Midjourney, or your favorite model.
        You can tweak words after generation for even finer control.
      </p>
    `;

    const showcase = $("pf-showcase");
    if (showcase) {
      // Example image (text label removed)
      showcase.innerHTML = `<img src="images/neon-mage.png" alt="">`;
    }

    ensureToast();
  }

  /* =========================================================
     BUILD PROMPT & RANDOMIZERS
     ========================================================= */
  function buildPrompt() {
    const parts = [
      getText("pf-subject",    PF.subjects),
      getText("pf-scene",      PF.scenes),
      getText("pf-outfit",     PF.outfits),
      getText("pf-power",      PF.powers),
      getText("pf-style",      PF.styles),
      getText("pf-lighting",   PF.lighting),
      getText("pf-detail",     PF.details),
      getText("pf-palette",    PF.palettes),
      getText("pf-expression", PF.expressions),
      getText("pf-mood",       PF.moods)
    ].filter(Boolean);

    // Optional user text – appended at the end of the prompt
    const userTextEl = $("pf-usertext");
    const userText = userTextEl ? userTextEl.value.trim() : "";
    if (userText) {
      parts.push(userText);
    }

    const promptBox = $("pf-prompt");
    if (promptBox) {
      promptBox.value =
        parts.join(", ") +
        ", high resolution, ultra detailed, crisp edges, coherent composition";
    }

    const negBox = $("pf-negative");
    if (negBox) {
      negBox.value = PF.negative.join(", ");
    }
  }

  function randomizeAll() {
    const map = {
      style:      PF.styles,
      subject:    PF.subjects,
      scene:      PF.scenes,
      power:      PF.powers,
      mood:       PF.moods,
      detail:     PF.details,
      lighting:   PF.lighting,
      expression: PF.expressions,
      outfit:     PF.outfits,
      palette:    PF.palettes
    };

    const happyOn = !!($("pf-happy-switch") && $("pf-happy-switch").checked);

    Object.keys(map).forEach(type => {
      const el   = $("pf-" + type);
      const list = map[type];
      if (!el || !list || !list.length) return;

      if (type === "mood" && happyOn) {
        // Happy mode locks mood
        el.value = "just_happy";
      } else {
        el.value = rand(list).id;
      }
    });

    buildPrompt();
  }

  /* =========================================================
     EVENT WIRING
     ========================================================= */
  function attachEvents() {
    // Happy Mode switch
    const happySwitch = $("pf-happy-switch");
    if (happySwitch) {
      happySwitch.addEventListener("change", applyHappyMode);
    }

    // Individual randomizers
    qsa(".pf-mini[data-pf-rand]").forEach(btn => {
      btn.addEventListener("click", () => {
        const type = btn.getAttribute("data-pf-rand");
        if (!type) return;

        const map = {
          style:      PF.styles,
          subject:    PF.subjects,
          scene:      PF.scenes,
          power:      PF.powers,
          mood:       PF.moods,
          detail:     PF.details,
          lighting:   PF.lighting,
          expression: PF.expressions,
          outfit:     PF.outfits,
          palette:    PF.palettes
        };

        const el   = $("pf-" + type);
        const list = map[type];

        if (!el || !list || !list.length) return;

        // respect Happy Mode for mood
        if (type === "mood" && $("pf-happy-switch")?.checked) {
          el.value = "just_happy";
        } else {
          el.value = rand(list).id;
        }
        buildPrompt();
      });
    });

    // Randomize all
    const randAll = $("pf-rand-all");
    if (randAll) randAll.addEventListener("click", randomizeAll);

    // Generate
    const genBtn = $("pf-generate");
    if (genBtn) genBtn.addEventListener("click", buildPrompt);

    // Auto rebuild on any select change
    qsa("select[id^='pf-']").forEach(sel => {
      sel.addEventListener("change", buildPrompt);
    });

    // Rebuild on user text input
    const userTextEl = $("pf-usertext");
    if (userTextEl) {
      userTextEl.addEventListener("input", buildPrompt);
    }

    // Copy buttons – combined behavior: button label + toast
    qsa(".pf-copy").forEach(btn => {
      btn.addEventListener("click", async () => {
        const target = btn.getAttribute("data-pf-copy");
        const boxId  = target === "negative" ? "pf-negative" : "pf-prompt";
        const el = $(boxId);
        if (!el) return;
        const text = el.value || "";
        if (!text.trim()) return;

        try {
          await navigator.clipboard.writeText(text);
          const original = btn.textContent;
          btn.textContent = "✅ Copied";
          showToast("Copied to clipboard.");
          setTimeout(() => { btn.textContent = original; }, 1000);
        } catch (err) {
          console.error(err);
          showToast("Copy failed — please copy manually.");
        }
      });
    });

    // SEND button (multi-target + copy)
    const sendBtn = $("pf-send");
    if (sendBtn) {
      sendBtn.addEventListener("click", async () => {
        const promptBox = $("pf-prompt");
        const prompt = promptBox ? promptBox.value.trim() : "";
        if (!prompt) return;

        try {
          await navigator.clipboard.writeText(prompt);
        } catch {
          // ignore, still try to open target
        }

        const targetSel = $("pf-target");
        const target = targetSel ? targetSel.value : "nightcafe";

        const destinations = {
          nightcafe:  "https://creator.nightcafe.studio/",
          midjourney: "https://www.midjourney.com/app/",
          sdwebui:    "http://127.0.0.1:7860",
          leonardo:   "https://app.leonardo.ai/",
          bluewillow: "https://app.bluewillow.ai/",
          runway:     "https://app.runwayml.com/",
          playground: "https://playgroundai.com/",
          dalle:      "https://chat.openai.com"
        };

        const url = destinations[target] || destinations.nightcafe;
        window.open(url, "_blank", "noopener");
        showToast("Prompt copied and destination opened.");
      });
    }
  }

  /* =========================================================
     INIT
     ========================================================= */
  function initPF() {
    buildUI();

    // Populate selects
    fillSelect("pf-style",      PF.styles);
    fillSelect("pf-subject",    PF.subjects);
    fillSelect("pf-scene",      PF.scenes);
    fillSelect("pf-power",      PF.powers);
    fillSelect("pf-mood",       PF.moods);
    fillSelect("pf-detail",     PF.details);
    fillSelect("pf-lighting",   PF.lighting);
    fillSelect("pf-expression", PF.expressions);
    fillSelect("pf-outfit",     PF.outfits);
    fillSelect("pf-palette",    PF.palettes);

    buildPrompt();
    attachEvents();
    randomizeAll();
    applyHappyMode(); // ensure initial state
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPF);
  } else {
    initPF();
  }
})();
