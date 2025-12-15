// TSG Prompt Forge – JS engine v4.2 ANDROID EDITION
// Combined: legacy NightCafe helper + v3.1 engine + Happy Mode + glow
// Optimized version with optional user text support + neutral-only filter #### 

(() => {
  "use strict";

  /* =========================================================
     TSG Prompt Forge – Data Model
     ========================================================= */

  const PF = {
    /* ================= STYLES ================= */
    styles: [
      { id: "cinematic", label: "Cinematic concept art", text: "cinematic concept art, dramatic lighting, highly detailed" },
      { id: "ultra_real", label: "Ultrareal photography", text: "ultra-realistic photography, sharp focus, physically correct lighting, detailed skin texture" },
      { id: "cyberpunk", label: "Neon cyberpunk", text: "neon cyberpunk aesthetic, glowing signs, atmospheric rain, deep blues and oranges" },
      { id: "anime", label: "Arcane / anime style", text: "stylized digital painting, anime-inspired, expressive lighting, smooth shading" },
      { id: "minimal", label: "Minimal clean sci-fi", text: "clean minimal sci-fi, soft gradients, subtle lighting, uncluttered composition" },
      { id: "retro", label: "Retro synthwave", text: "80s synthwave, neon grid, magenta and cyan glow, retro-futuristic vibes" },
      { id: "dreamscape", label: "Dreamscape surrealism", text: "surreal dreamscape imagery, floating forms, soft ethereal haze, impossible geometry" },
      { id: "hyper_modern", label: "Hyper-modern chrome", text: "sleek hyper-modern chrome surfaces, reflective materials, precise photoreal sci-fi styling" },
      { id: "vintage_film", label: "Vintage film aesthetic", text: "warm nostalgic film look, soft tones, cinematic texture" },
      { id: "watercolor", label: "Soft watercolor painting", text: "light watercolor brush strokes, soft colors, delicate atmospheric texture" },
      { id: "vector_clean", label: "Clean vector illustration", text: "crisp vector artwork, clean shapes, bold colors, minimalist composition" },
      { id: "steampunk", label: "Steampunk industrial", text: "brass machinery, Victorian engineering, retro-futuristic design" },
      { id: "fantasy_realism", label: "Fantasy realism", text: "mythical yet gentle fantastical atmosphere, rich painterly detail" },
      { id: "pixel_art", label: "Pixel art adventure", text: "8-bit pixel art style, retro colors, nostalgic adventure feeling" },
      { id: "magical_realism", label: "Magical realism tableau", text: "soft surreal imagery blended with realism, dreamlike calm" },
      { id: "underwater", label: "Underwater fantasy", text: "ethereal underwater environment, soft glowing creatures, peaceful ambience" },
      { id: "fashion_vintage", label: "Vintage fashion portfolio", text: "classic mid-century fashion photography, elegant styling" },
      { id: "holoconcept", label: "Holographic concept art", text: "translucent holographic effects, volumetric light, futuristic color blending" },
      { id: "mythic_ink", label: "Mythic ink illustration", text: "handcrafted ink style, elegant linework, mythical motifs" }
    ],

    /* ================= SUBJECTS ================= */
    subjects: [
      /* --- Normal humans (this is where you were blocked before) --- */
      { id: "normal_f", label: "Normal woman", text: "a normal woman in everyday clothing, calm expression, natural posture, modern realistic setting" },
      { id: "normal_f_light", label: "Normal woman (light)", text: "a bright natural portrait of a woman in simple everyday clothes, soft light, relaxed and approachable mood" },

      { id: "normal_m", label: "Normal man", text: "a normal man in casual clothing, neutral expression, natural stance, realistic modern environment" },
      { id: "normal_m_light", label: "Normal man (light)", text: "a softly lit portrait of a man in everyday attire, warm natural light, calm friendly presence" },

      { id: "normal_person", label: "Normal person", text: "a relatable everyday person, simple clothing, natural body language, realistic contemporary scene" },
      { id: "normal_person_light", label: "Normal person (light)", text: "a bright natural depiction of an everyday person, soft daylight, approachable and calm atmosphere" }
    ],

    /* ================= PALETTES ================= */
    palettes: [
      { id: "teal_orange", label: "Teal & orange", text: "color palette of teal and warm orange lights" },
      { id: "teal_soft", label: "Soft teal harmony", text: "soft teal tones combined with gentle warm glow" },
      { id: "violet_gold", label: "Violet & gold", text: "deep violet shadows with golden highlights" },
      { id: "blue_sky", label: "Sky blue harmony", text: "bright sky blues blended with soft cool gradients" },
      { id: "emerald_soft", label: "Emerald soft tone", text: "soft green-teal palette with gentle luminescence" },
      { id: "mono_warm", label: "Warm monochrome", text: "warm grayscale palette with subtle soft tones" },
      { id: "sand_ivory", label: "Sand & ivory", text: "natural sand hues combined with soft ivory light" }
    ],

    /* ================= HEROES / SCI-FI ================= */

    settings: [
    /* ========= TECH MAGE ========= */
    { id: "tech_mage_f", label: "Tech mage (female)", text: "a female tech mage with flowing circuitry patterns glowing softly along her arms" },
    { id: "tech_mage_m", label: "Tech mage (male)", text: "a male tech mage with glowing circuitry woven across his robes" },
    { id: "tech_mage_android", label: "Tech mage (android)", text: "an android tech mage with etched circuitry glowing beneath synthetic plating" },

    /* ========= CYBER SYSADMIN ========= */
    { id: "sysadmin_f", label: "Cyber sysadmin (female)", text: "a skilled female sysadmin calmly working through floating holographic terminals" },
    { id: "sysadmin_m", label: "Cyber sysadmin (male)", text: "a focused male sysadmin orchestrating layered holographic interfaces" },
    { id: "sysadmin_android", label: "Cyber sysadmin (android)", text: "an android sysadmin managing vast data streams through integrated displays" },

    /* ========= HACKER ========= */
    { id: "hacker_f", label: "Hacker (female)", text: "a focused female hacker surrounded by neon reflections and cascading code" },
    { id: "hacker_m", label: "Hacker (male)", text: "a male hacker illuminated by screens and subtle electric glow" },
    { id: "hacker_android", label: "Hacker (android)", text: "an android hacker interfacing directly with flowing data streams" },

    /* ========= DIGITAL MONK ========= */
    { id: "digital_monk_f", label: "Digital monk (female)", text: "a serene female monk meditating among softly flowing lines of code" },
    { id: "digital_monk_m", label: "Digital monk (male)", text: "a tranquil male monk surrounded by gentle luminous rings of data" },
    { id: "digital_monk_android", label: "Digital monk (android)", text: "an android monk hovering in concentric holographic glyphs" },

    /* ========= GUARDIAN AI ========= */
    { id: "guardian_ai_f", label: "AI guardian (female)", text: "a female AI guardian avatar with warm holographic light weaving around her form" },
    { id: "guardian_ai_m", label: "AI guardian (male)", text: "a male AI guardian avatar with calm teal luminescence and geometric features" },
    { id: "guardian_ai_android", label: "AI guardian (android)", text: "an android AI guardian with smooth reflective panels and a soft inner glow" }
    ],

    /* ================= NEGATIVE ================= */
    negative: [
      "blurry", "low-res", "low quality", "grainy",
      "bad anatomy", "extra fingers", "distorted face",
      "text", "watermark", "logo"
    ]
  };

  /* =========================================================
     Minimal sanity check (keeps you safe)
     ========================================================= */
  Object.keys(PF).forEach(key => {
    console.assert(Array.isArray(PF[key]), `PF.${key} must be an array`);
  });

  // Expose globally if needed
  window.PF = PF;
})();



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
    if (!el || !list || !list.length) return;
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
     LANGUAGE FILTERS – REMOVE NEUTRAL TERMS ONLY
     ========================================================= */

  function pfEscapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  const PF_FILTER_TERMS = {
    // Only gender / binary / androgynous descriptors
    neutral: [
      "male",
      "female",
      "non-binary",
      "binary",
      "androgynous"
    ],
    slang: [], // no slang removal
    glow:  []  // no glow removal
  };

  function applyNeutralFilter(str) {
    const sw = $("pf-filter-neutral");
    if (!sw?.checked || !str) return str;

    PF_FILTER_TERMS.neutral.forEach(term => {
      const re = new RegExp("\\b" + pfEscapeRegex(term) + "\\b", "gi");
      str = str.replace(re, "").replace(/\s+/g, " ").trim();
    });

    return str;
  }

  function applySlangFilter(str) {
    // No-op: we no longer remove slang like "cool", "badass"
    return str;
  }

  function applyGlowFilter(str) {
    // No-op: we keep glow terms intact
    return str;
  }

  function applyCustomFilter(str) {
    const sw  = $("pf-custom-switch");
    const box = $("pf-custom-filter");
    if (!sw?.checked || !box || !str) return str;

    const lines = box.value.split("\n").map(l => l.trim()).filter(Boolean);

    lines.forEach(line => {
      const re = new RegExp("\\b" + pfEscapeRegex(line) + "\\b", "gi");
      str = str.replace(re, "").replace(/\s+/g, " ").trim();
    });

    return str;
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
      <div class="pf-row" style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
        <label for="pf-happy-switch"><strong>Happy Mode</strong></label>
        <input type="checkbox" id="pf-happy-switch" style="width:18px;height:18px;cursor:pointer;">

        <label style="display:flex;align-items:center;gap:4px;">
          <input type="checkbox" id="pf-filter-neutral" style="cursor:pointer;"> Neutral filter
        </label>
        <label style="display:flex;align-items:center;gap:4px;">
          <input type="checkbox" id="pf-filter-slang" style="cursor:pointer;" disabled> Slang (n/a)
        </label>
        <label style="display:flex;align-items:center;gap:4px;">
          <input type="checkbox" id="pf-filter-glow" style="cursor:pointer;" disabled> Glow (n/a)
        </label>
        <label style="display:flex;align-items:center;gap:4px;">
          <input type="checkbox" id="pf-custom-switch" style="cursor:pointer;"> Custom filter
        </label>
      </div>

      <div id="pf-custom-wrapper" style="display:none;margin-bottom:8px;">
        <textarea id="pf-custom-filter" rows="3"
          placeholder="One word or phrase per line to remove"
          style="width:100%;padding:6px;border:1px solid #888;border-radius:6px;"></textarea>
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
      showcase.innerHTML = `<img src="images/neon-mage.png" alt="">`;
    }

    ensureToast();
  }

  /* =========================================================
     BUILD PROMPT & RANDOMIZERS
     ========================================================= */
  function buildPrompt() {
    const coreParts = [
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

    let corePrompt = coreParts.join(", ");
    if (corePrompt) {
      corePrompt += ", high resolution, ultra detailed, crisp edges, coherent composition";
    }

    // Apply filters ONLY to generated PF text (never user text)
    corePrompt = applyNeutralFilter(corePrompt);
    corePrompt = applySlangFilter(corePrompt); // no-op currently
    corePrompt = applyGlowFilter(corePrompt);  // no-op currently
    corePrompt = applyCustomFilter(corePrompt);

    const userTextEl = $("pf-usertext");
    const userText   = userTextEl ? userTextEl.value.trim() : "";

    const finalPrompt = userText
      ? (corePrompt ? corePrompt + ", " + userText : userText)
      : corePrompt;

    const promptBox = $("pf-prompt");
    if (promptBox) {
      promptBox.value = finalPrompt;
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
      happySwitch.addEventListener("change", () => {
  applyHappyMode();
  if (happySwitch.checked) {
    tsgSetMode("happy");
  }
});
    }

    // Language filter toggles
    ["pf-filter-neutral", "pf-filter-slang", "pf-filter-glow", "pf-custom-switch"].forEach(id => {
      const el = $(id);
      if (!el) return;

      el.addEventListener("change", () => {
        if (id === "pf-custom-switch") {
          const wrapper = $("pf-custom-wrapper");
          if (wrapper) wrapper.style.display = el.checked ? "block" : "none";
        }
        buildPrompt();
      });
    });

    const customBox = $("pf-custom-filter");
    if (customBox) {
      customBox.addEventListener("input", buildPrompt);
    }
    const neutralSwitch = $("pf-filter-neutral");
if (neutralSwitch) {
  neutralSwitch.addEventListener("change", () => {
    if (neutralSwitch.checked) {
      tsgSetMode("neutral");
      $("pf-happy-switch").checked = false;
    } else {
      tsgSetMode("happy");
      $("pf-happy-switch").checked = true;
    }
    buildPrompt();
  });
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
        window.open(url, "_blank", "noopener,noreferrer");
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
