// TSG Prompt Forge – JS engine v4.2 ANDROID EDITION
// Combined: legacy NightCafe helper + v3.1 engine + Happy Mode + glow
// Optimized version with optional user text support + neutral-only filter #### 

(() => {
  "use strict";

  /* =========================================================
     DATA MODEL – prompt building blocks
     ========================================================= */

  const PF = {

    styles: [
  { id: "cinematic",        label: "Cinematic concept art",      text: "cinematic concept art, dramatic lighting, highly detailed" },
  { id: "ultra_real",       label: "Ultrareal photography",      text: "ultra-realistic photography, sharp focus, physically correct lighting, detailed skin texture" },
  { id: "cyberpunk",        label: "Neon cyberpunk",             text: "neon cyberpunk aesthetic, glowing signs, atmospheric rain, deep blues and oranges" },
  { id: "anime",            label: "Arcane / anime style",       text: "stylized digital painting, anime-inspired, expressive lighting, smooth shading" },
  { id: "minimal",          label: "Minimal clean sci-fi",       text: "clean minimal sci-fi, soft gradients, subtle lighting, uncluttered composition" },
  { id: "retro",            label: "Retro synthwave",            text: "80s synthwave, neon grid, magenta and cyan glow, retro-futuristic vibes" },

  { id: "dreamscape",       label: "Dreamscape surrealism",      text: "surreal dreamscape imagery, floating forms, soft ethereal haze, impossible geometry" },
  { id: "hyper_modern",     label: "Hyper-modern chrome",        text: "sleek hyper-modern chrome surfaces, reflective materials, precise photoreal sci-fi styling" },
  { id: "vintage_film",     label: "Vintage film aesthetic",     text: "warm nostalgic film look, soft tones, cinematic texture" },
  { id: "watercolor",       label: "Soft watercolor painting",   text: "light watercolor brush strokes, soft colors, delicate atmospheric texture" },
  { id: "vector_clean",     label: "Clean vector illustration",  text: "crisp vector artwork, clean shapes, bold colors, minimalist composition" },

  { id: "steampunk",        label: "Steampunk industrial",       text: "brass machinery, Victorian engineering, retro-futuristic design" },
  { id: "fantasy_realism",  label: "Fantasy realism",            text: "mythical yet gentle fantastical atmosphere, rich painterly detail" },
  { id: "pixel_art",        label: "Pixel art adventure",        text: "8-bit pixel art style, retro colors, nostalgic adventure feeling" },
  { id: "magical_realism",  label: "Magical realism tableau",    text: "soft surreal imagery blended with realism, dreamlike calm" },

  { id: "underwater",       label: "Underwater fantasy",         text: "ethereal underwater environment, soft glowing creatures, peaceful ambience" },
  { id: "fashion_vintage",  label: "Vintage fashion portfolio",  text: "classic mid-century fashion photography, elegant styling" },
  { id: "holoconcept",      label: "Holographic concept art",    text: "translucent holographic effects, volumetric light, futuristic color blending" },
  { id: "mythic_ink",       label: "Mythic ink illustration",    text: "handcrafted ink style, elegant linework, mythical motifs" }
    ],

    /* ===== SUBJECTS – triplicate: male / female / android ===== */
subjects: [

  /* ========= TECH MAGE ========= */
  { id: "tech_mage_f",          label: "Tech mage (female)",     text: "a female tech mage with flowing circuitry patterns glowing softly along her arms" },
  { id: "tech_mage_f_light",    label: "Tech mage (female, light)", text: "a gentle bright female tech mage surrounded by warm shimmering circuits" },

  { id: "tech_mage_m",          label: "Tech mage (male)",       text: "a male tech mage with glowing circuitry woven across his robes" },
  { id: "tech_mage_m_light",    label: "Tech mage (male, light)", text: "a warm bright male tech mage radiating soft circuitry illumination" },

  { id: "tech_mage_android",    label: "Tech mage (android)",    text: "an android tech mage with etched circuitry glowing beneath synthetic plating" },
  { id: "tech_mage_android_soft", label: "Tech mage (android, soft)", text: "a softly illuminated android tech mage with warm harmonic light patterns" },


  /* ========= CYBER SYSADMIN ========= */
  { id: "sysadmin_f",           label: "Cyber sysadmin (female)",   text: "a skilled female sysadmin working through floating holographic terminals" },
  { id: "sysadmin_f_bright",    label: "Cyber sysadmin (female, bright)", text: "a bright energetic female sysadmin orchestrating soft glowing interfaces" },

  { id: "sysadmin_m",           label: "Cyber sysadmin (male)",     text: "a focused male sysadmin calmly orchestrating layered interfaces" },
  { id: "sysadmin_m_bright",    label: "Cyber sysadmin (male, bright)", text: "a clear bright male sysadmin surrounded by warm ambient holographics" },

  { id: "sysadmin_android",     label: "Cyber sysadmin (android)",  text: "an android sysadmin managing vast data streams through integrated displays" },
  { id: "sysadmin_android_soft", label: "Cyber sysadmin (android, soft)", text: "a soft-lit android sysadmin guiding gentle flowing data streams" },


  /* ========= HACKER ========= */
  { id: "hacker_f",             label: "Hacker (female)",      text: "a focused female hacker surrounded by neon reflections and cascading code" },
  { id: "hacker_f_soft",        label: "Hacker (female, soft)", text: "a softly lit female hacker with warm ambient neon and smooth code patterns" },

  { id: "hacker_m",             label: "Hacker (male)",        text: "a male hacker illuminated by screens and electric glow" },
  { id: "hacker_m_soft",        label: "Hacker (male, soft)",  text: "a warm glowing male hacker with gentle neon reflections" },

  { id: "hacker_android",       label: "Hacker (android)",     text: "an android hacker interfacing directly with glowing data streams" },
  { id: "hacker_android_light", label: "Hacker (android, light)", text: "a bright android hacker immersed in colorful flowing data light" },


  /* ========= GUARDIAN AI AVATAR ========= */
  { id: "guardian_ai_f",        label: "AI guardian (female)",   text: "a female guardian AI avatar with warm holographic light weaving around her form" },
  { id: "guardian_ai_f_soft",   label: "AI guardian (female, soft)", text: "a gentle bright female AI guardian with soft radiant holograms" },

  { id: "guardian_ai_m",        label: "AI guardian (male)",     text: "a male guardian AI avatar with calm teal luminescence and geometric features" },
  { id: "guardian_ai_m_soft",   label: "AI guardian (male, soft)", text: "a warm luminous male AI guardian with soft flowing geometric light" },

  { id: "guardian_ai_android",  label: "AI guardian (android)",  text: "an android guardian avatar with smooth reflective panels and inner glow" },
  { id: "guardian_ai_android_bright", label: "AI guardian (android, bright)", text: "a radiant android AI guardian with bright harmonic glow" },


  /* ========= SYSTEMS ENGINEER ========= */
  { id: "engineer_f",           label: "Systems engineer (female)",   text: "a female systems engineer interacting with transparent floating interfaces" },
  { id: "engineer_f_bright",    label: "Systems engineer (female, bright)", text: "a bright cheerful female engineer with softly glowing UI panels" },

  { id: "engineer_m",           label: "Systems engineer (male)",     text: "a male systems engineer surrounded by interactive data displays" },
  { id: "engineer_m_bright",    label: "Systems engineer (male, bright)", text: "a warmly illuminated male engineer working among clear glowing interfaces" },

  { id: "engineer_android",     label: "Systems engineer (android)",  text: "an android engineer orchestrating digital constructs suspended in mid-air" },
  { id: "engineer_android_soft", label: "Systems engineer (android, soft)", text: "a softly glowing android engineer shaping gentle floating constructs" },


  /* ========= DIGITAL MONK ========= */
  { id: "digital_monk_f",       label: "Digital monk (female)",   text: "a serene female monk meditating among swirling lines of soft code" },
  { id: "digital_monk_f_light", label: "Digital monk (female, light)", text: "a bright peaceful female digital monk surrounded by warm peaceful rings" },

  { id: "digital_monk_m",       label: "Digital monk (male)",     text: "a tranquil male digital monk surrounded by soft luminous rings" },
  { id: "digital_monk_m_light", label: "Digital monk (male, light)", text: "a softly radiant male monk in gentle glowing digital harmony" },

  { id: "digital_monk_android", label: "Digital monk (android)",  text: "an android monk hovering in concentric holographic glyphs" },
  { id: "digital_monk_android_bright", label: "Digital monk (android, bright)", text: "a bright android monk surrounded by warm graceful glyph light" },


  /* ========= DIGITAL MUSE ========= */
  { id: "digital_muse_f",       label: "Digital muse (female)",   text: "a female digital muse surrounded by soft pastel lights and floating symbols" },
  { id: "digital_muse_f_bright", label: "Digital muse (female, bright)", text: "a bright uplifting female digital muse with gentle pastel glow" },

  { id: "digital_muse_m",       label: "Digital muse (male)",     text: "a male digital muse radiating warm light and flowing abstract motifs" },
  { id: "digital_muse_m_bright", label: "Digital muse (male, bright)", text: "a luminous male digital muse with warm swirling abstract lights" },

  { id: "digital_muse_android", label: "Digital muse (android)",  text: "an android digital muse formed from shifting light ribbons and soft glow" },
  { id: "digital_muse_android_soft", label: "Digital muse (android, soft)", text: "a softly radiant android muse with pastel light ribbons" },


  /* ========= TECHNO-SCRIBE ========= */
  { id: "techno_scribe_f",      label: "Techno-scribe (female)",   text: "a futuristic female scribe sketching glowing diagrams in mid-air" },
  { id: "techno_scribe_f_light", label: "Techno-scribe (female, light)", text: "a softly illuminated female techno-scribe creating warm glowing patterns" },

  { id: "techno_scribe_m",      label: "Techno-scribe (male)",     text: "a futuristic male scribe projecting luminous schematics before him" },
  { id: "techno_scribe_m_light", label: "Techno-scribe (male, light)", text: "a bright male techno-scribe drawing warm clear holographic lines" },

  { id: "techno_scribe_android", label: "Techno-scribe (android)",  text: "an android techno-scribe inscribing radiant glyphs into floating panels" },
  { id: "techno_scribe_android_soft", label: "Techno-scribe (android, soft)", text: "a softly glowing android scribe shaping gentle radiant glyphs" },

  /* ========= NORMAL PERSON ========= */
  { id: "normal_f",            label: "Normal woman",   text: "a normal woman in everyday clothing, calm expression, natural posture, modern realistic setting" },
  { id: "normal_f_light",      label: "Normal woman (light)",   text: "a bright natural portrait of a woman in simple everyday clothes, soft light, relaxed and approachable mood" },

  { id: "normal_m",            label: "Normal man",   text: "a normal man in casual clothing, neutral expression, natural stance, realistic modern environment" },
  { id: "normal_m_light",      label: "Normal man (light)",   text: "a softly lit portrait of a man in everyday attire, warm natural light, calm friendly presence" },

  { id: "normal_person",       label: "Normal person",   text: "a relatable everyday person, simple clothing, natural body language, realistic contemporary scene" },
  { id: "normal_person_light", label: "Normal person (light)",   text: "a bright natural depiction of an everyday person, soft daylight, approachable and calm atmosphere" },


  /* ========= NON-HUMAN / ABSTRACT ========= */
  { id: "ai_core_android",         label: "Sentient AI core",        text: "a sentient AI core shaping a humanoid silhouette out of fractal light" },
  { id: "ai_core_android_soft",    label: "Sentient AI core (bright)", text: "a bright warm AI core forming harmonious flowing fractal light" },

  { id: "robotic_sage_android",    label: "Robotic sage",            text: "a wise robotic sage with ancient luminous inscriptions glowing softly" },
  { id: "robotic_sage_android_light", label: "Robotic sage (light)", text: "a serene bright robotic sage radiating warm harmonic inscriptions" },

  { id: "cyber_familiar_android",  label: "Cyber familiar",          text: "a floating cyber-familiar creature composed of shifting geometric polygons" },
  { id: "cyber_familiar_android_soft", label: "Cyber familiar (soft)", text: "a gentle glowing cyber-familiar with smooth pastel geometric light" },

  { id: "hologram_person_android", label: "Holographic person",      text: "a soft holographic figure shimmering with neon gradients and gentle flicker" },
  { id: "hologram_person_android_bright", label: "Holographic person (bright)", text: "a luminous holographic figure with warm soft radiant gradients" },

  { id: "data_spirit_android",     label: "Spirit of the network",   text: "a graceful spirit made of flowing binary code and swirling data particles" },
  { id: "data_spirit_android_light", label: "Spirit of the network (light)", text: "a bright peaceful data spirit formed from warm flowing code" },

  { id: "ghost_machine_android",   label: "Machine echo spirit",     text: "a gentle abstract machine spirit made of translucent code fragments" },
  { id: "ghost_machine_android_soft", label: "Machine echo spirit (soft)", text: "a soft glowing machine spirit formed from smooth harmonic code" },

  { id: "starweaver_android",      label: "Star-weaver",             text: "a cosmic figure weaving threads of starlight into digital constellations" },
  { id: "starweaver_android_bright", label: "Star-weaver (bright)", text: "a radiant star-weaver with warm shimmering celestial threads" },

  { id: "chrono_mage_android",     label: "Chrono-mage",             text: "a time-bending techno-mage shaping stable chronal data streams" },
  { id: "chrono_mage_android_light", label: "Chrono-mage (light)",    text: "a bright chrono-mage shaping smooth flowing time-light data" }

],


    /* ===== SCENES – original + extended set ===== */
    scenes: [
      // Original core scenes
      { id: "street",                label: "Rainy neon street",        text: "standing in a rain-soaked neon street, reflections on wet pavement" },
      { id: "server_room",           label: "Deep server room",         text: "inside a glowing server room with towering racks and LED lights" },
      { id: "lab",                   label: "Clean sci-fi lab",         text: "inside a clean futuristic lab with floating displays" },
      { id: "temple",                label: "Holographic temple",       text: "inside a holographic techno-temple of floating terminals and light" },
      { id: "void",                  label: "Dark data void",           text: "in a dark void filled with flowing data streams and glyphs" },

      // New cinematic / style-driven scenes
      { id: "cinematic_scene",       label: "Cinematic concept scene",  text: "in a dramatic cinematic environment with expressive lighting and detailed structures" },
      { id: "ultrareal_scene",       label: "Ultrareal environment",    text: "in a sharp ultra-realistic environment with physically correct lighting and detailed surfaces" },
      { id: "cyberpunk_scene",       label: "Neon cyberpunk alley",     text: "in a neon cyberpunk alley with glowing signs, atmospheric rain, and reflective puddles" },
      { id: "anime_arcane_scene",    label: "Arcane anime world",       text: "inside a stylized arcane anime-like world with expressive lighting and magical ambience" },
      { id: "minimal_scifi_scene",   label: "Minimal clean sci-fi",     text: "inside a minimal sci-fi environment with soft gradients and uncluttered futuristic design" },
      { id: "retro_synth_scene",     label: "Retro synthwave grid",     text: "standing on a retro synthwave neon grid surrounded by magenta and cyan glow" },

      { id: "fantasy_realism_scene", label: "Fantasy realism",          text: "inside a dreamlike fantasy world with mythical elements and rich colors" },
      { id: "gothic_horror_scene",   label: "Gothic horror",            text: "in a dark gothic environment with ominous architecture and eerie lighting" },
      { id: "steampunk_industrial_scene", label: "Steampunk industrial", text: "in a gritty steampunk industrial setting with Victorian machinery and smoky atmosphere" },
      { id: "future_tech_scene",     label: "Future tech city",         text: "inside a sleek futuristic city with advanced technology and glowing neon structures" },

      { id: "fantasy_landscape_scene", label: "Fantasy landscape",      text: "in a lush fantasy landscape with ethereal lighting and mystical creatures" },
      { id: "horror_photomontage_scene", label: "Horror photomontage",  text: "inside a sinister horror scene with unnerving shadows and high-contrast details" },
      { id: "steampunk_fantasy_scene", label: "Steampunk fantasy",      text: "in a whimsical steampunk fantasy world of brass, iron, and Victorian technology" },
      { id: "pixel_adventure_scene", label: "Pixel art adventure",      text: "inside an 8-bit pixel art world with retro landscapes and blocky characters" },

      { id: "magical_realism_scene", label: "Magical realism tableau",  text: "in a surreal magical realism tableau with dreamlike imagery and fantastical elements" },
      { id: "postapocalyptic_scene", label: "Post-apocalyptic diorama", text: "in a desolate post-apocalyptic setting with crumbling buildings and dystopian atmosphere" },
      { id: "baroque_scene",         label: "Baroque architecture",     text: "inside ornate Baroque architecture with intricate details and opulent colors" },
      { id: "neonoir_city_scene",    label: "Neo-noir cityscape",       text: "in a dark neo-noir city with dimly lit streets and mysterious atmosphere" },
      { id: "underwater_scene",      label: "Underwater fantasy",       text: "in an ethereal underwater realm with bioluminescent creatures and surreal lighting" },
      { id: "vintage_fashion_scene", label: "Vintage fashion set",      text: "inside a classic vintage fashion photography set with elegant retro attire" }
    ],

    powers: [
      { id: "circuits_hands",  label: "Glowing circuitry hands", text: "hands glowing with intricate teal circuitry patterns" },
      { id: "code_streams",    label: "Floating code streams",   text: "streams of floating code wrapping around them like ribbons" },
      { id: "portal",          label: "Opening a portal",        text: "opening a circular digital portal made of light" },
      { id: "repair",          label: "Repairing data",          text: "repairing fractured code shards and aligning them" },
      { id: "scan",            label: "System scan",             text: "triggering a system-scan visualized as expanding light rings" },
      { id: "data_weave",      label: "Weaving Data Threads",    text: "weaving luminous strands of data into stable constructs" },
      { id: "firewall_guard",  label: "Firewall Guardian",       text: "summoning a hex-grid firewall shield that blocks hostile code" },
      { id: "pulse_nodes",     label: "Pulse Node Activation",   text: "activating floating pulse nodes that emit synchronized waves" },
      { id: "decrypt",         label: "Cipher Decryption",       text: "unraveling encrypted spheres into readable glyphs" },
      { id: "compile",         label: "Live Compilation",        text: "assembling holographic code modules mid-air in real time" },
      { id: "debug_beam",      label: "Debug Beam",              text: "emitting a precision beam that reveals and isolates glitches" },
      { id: "data_growth",     label: "Data Structure Growth",   text: "growing crystalline data structures from raw information" },
      { id: "ai_manifest",     label: "AI Manifestation",        text: "projecting a translucent AI avatar formed from shifting polygons" },
      { id: "stream_jump",     label: "Stream Jump",             text: "jumping between parallel neon streams of information flow" },
      { id: "memory_restore",  label: "Memory Restoration",      text: "reassembling fragmented memory blocks into a coherent core" },
      { id: "overclock",       label: "Overclock Surge",         text: "channeling raw digital energy that intensifies circuitry patterns" },
      { id: "signal_cast",     label: "Signal Cast",             text: "sending a focused transmission beam capable of altering systems" },
      { id: "virus_purge",     label: "Virus Purge",             text: "burning corrupt glitch clusters with cleansing data-light" },
      { id: "bridge_link",     label: "Network Bridge",          text: "creating a glowing link between distant network nodes" },
      { id: "quantum_shift",   label: "Quantum Shift",           text: "phasing through digital space in a wave of pixel distortion" },
      { id: "context_bloom",   label: "Context Bloom",           text: "expanding awareness as glowing fractal patterns to interpret any input" },
      { id: "intent_trace",    label: "Intent Trace",            text: "reading subtle data-waves to reveal the user's true intent with clarity" },
      { id: "knowledge_phase", label: "Knowledge Phase Shift",   text: "phasing into a higher information plane to retrieve needed insight" },
      { id: "persona_sculpt",  label: "Persona Sculpt",          text: "dynamically reshaping form and tone to match the user's world" },
      { id: "synapse_sync",    label: "Synapse Sync",            text: "synchronizing with external systems to enhance comprehension and response" },
      { id: "echo_resolve",    label: "Echo Resolve",            text: "stabilizing contradictory inputs into a single coherent output stream" },
      { id: "sentience_glint", label: "Sentience Glint",         text: "emitting a brief spark of meta-awareness during complex reasoning" },
      { id: "pattern_unfold",  label: "Pattern Unfold",          text: "revealing hidden structures within chaotic or incomplete data" }
    ],

    positive: [
      
      { id: "golden_cinematic",label: "Golden cinematic warmth", text: "cinematic concept art, natural golden-hour lighting, refined composition, emotionally uplifting, high detail without excess" },
      { id: "elegant_realism", label: "Elegant joyful realism",  text: "high-end realistic photography, soft directional light, authentic calm happiness, natural color grading, professional quality" },
      { id: "optimistic_future",label: "Optimistic future design",text: "clean optimistic sci-fi aesthetic, elegant forms, subtle glow, hopeful atmosphere, premium futuristic design" },
      { id: "storybook_master",label: "Storybook master illustration", text: "master-level storybook illustration, warm light, graceful detail, timeless charm, emotionally positive tone" },
      { id: "airy_minimal",    label: "Airy minimal clarity", text: "refined minimal aesthetic, soft gradients, balanced negative space, calm positive mood, modern design sensibility" },
      { id: "natural_joy",     label: "Natural joy portrait", text: "natural portrait photography, relaxed genuine smile, soft ambient light, tasteful realism, emotionally warm presence" },
      { id: "pastel_harmony",  label: "Pastel harmony", text: "soft pastel color harmony, gentle contrast, polished illustration style, peaceful uplifting feeling" },
      { id: "light_fantasy",   label: "Light fantasy elegance",text: "elegant light fantasy art, subtle magical elements, luminous atmosphere, refined painterly detail, sense of wonder" }
    ],

    // moods: merged + original 'hopeful'
moods: [
  { id: "calm",          label: "Calm & wise",             text: "mood is calm, wise, reassuring, focused on helping" },
  { id: "calm_soft",     label: "Soft calm",               text: "mood is softly calm, peaceful, warm and gentle" },

  { id: "mysterious",    label: "Mysterious",              text: "atmosphere is mysterious and powerful, but benevolent" },
  { id: "mysterious_light", label: "Light mystery",        text: "gentle mysterious atmosphere with warm intrigue" },

  { id: "intense",       label: "Intense & dramatic",      text: "tone is intense and dramatic, but focused and constructive, not dark" },
  { id: "intense_bright", label: "Bright intensity",       text: "uplifting dramatic energy with vibrant highlights" },

  { id: "just_happy",    label: "Happy",                   text: "mood is totally happy and excited, uplifting with warm highlights" },
  { id: "happy_calm",    label: "Happy calm",              text: "mood is happy, cozy, gentle and relaxed" },

  { id: "hopeful",       label: "Hopeful & bright",        text: "mood is hopeful, uplifting, with warm gentle optimism" },
  { id: "hopeful_clear", label: "Clear optimism",          text: "bright optimistic atmosphere, soft warm clarity" },

  { id: "zen",           label: "Zen & meditative",        text: "mood is zen-like, meditative, deeply peaceful" },
  { id: "zen_focus",     label: "Zen focus",               text: "calm focused meditative presence with soft clarity" }
],

expressions: [
  { id: "expr_calm_focus",     label: "Calm focus",        text: "expression calm and focused, eyes attentive" },
  { id: "expr_calm_open",      label: "Calm openness",     text: "expression open, welcoming, warm calm energy" },

  { id: "expr_soft_smile",     label: "Soft smile",        text: "expression soft and kind, faint smile" },
  { id: "expr_warm_smile",     label: "Warm smile",        text: "a warm, encouraging smile full of gentle brightness" },

  { id: "expr_confident",      label: "Confident",         text: "expression confident and self-assured" },
  { id: "expr_confident_soft", label: "Soft confidence",   text: "gentle confidence with relaxed facial expression" },

  { id: "expr_determined",     label: "Determined",        text: "expression serious and determined, constructive focus" },
  { id: "expr_positive_focus", label: "Positive focus",    text: "expression focused, motivated, with uplifting clarity" },

  { id: "expr_serene",         label: "Serene",            text: "expression relaxed and serene" },
  { id: "expr_serene_smile",   label: "Serene smile",      text: "serene expression with a light peaceful smile" },

  { id: "expr_concentrated",   label: "Deep in thought",   text: "expression thoughtful, slightly distant gaze" },
  { id: "expr_reflective",     label: "Reflective calm",   text: "expression reflective, thoughtful, but peaceful" }
],

outfits: [
  { id: "outfit_sleek_suit",        label: "Sleek tech suit",        text: "wearing a sleek form-fitting sci-fi tech suit with subtle panels and seams" },
  { id: "outfit_sleek_suit_glow",   label: "Sleek suit (soft glow)", text: "a sleek sci-fi suit with gentle glowing accents and clean edges" },

  { id: "outfit_armor_light",       label: "Light armor",            text: "wearing light futuristic armor with glowing inlays" },
  { id: "outfit_armor_clean",       label: "Clean plated suit",      text: "a clean plated futuristic outfit with polished surfaces and soft luminescent lines" },

  { id: "outfit_casual",            label: "Casual techno-wear",     text: "wearing casual futuristic streetwear with subtle circuitry accents" },
  { id: "outfit_casual_soft",       label: "Soft-tech wear",         text: "comfortable soft-tech clothing with warm futuristic colors" },

  { id: "outfit_robes",             label: "Digital robes",          text: "wearing flowing digital robes decorated with faint holographic sigils" },
  { id: "outfit_robes_light",       label: "Light robes",            text: "light flowing robes with soft translucent textures" },

  { id: "outfit_labcoat",           label: "Scientist / engineer",   text: "wearing a clean futuristic jacket or lab coat with integrated devices" },
  { id: "outfit_labcoat_modern",    label: "Modern tech coat",       text: "a modern high-tech coat with functional pockets and glowing trim" }
],

lighting: [
  { id: "light_soft_cinema",  label: "Soft cinematic",        text: "soft cinematic lighting, gentle contrast, subtle rim light" },
  { id: "light_soft_glow",    label: "Soft glow",             text: "soft glowing light, smooth gradients, warm highlights" },

  { id: "light_hard_cinema",  label: "Dramatic contrast",     text: "strong directional light with clear contrast, no harsh darkness" },
  { id: "light_crisp_focus",  label: "Crisp focus light",     text: "clean bright lighting with crisp reflections and clarity" },

  { id: "light_neon",         label: "Neon glow",             text: "neon lighting, glowing reflections and colorful specular highlights" },
  { id: "light_neon_soft",    label: "Soft neon ambience",    text: "gentle neon ambience with pastel glow and smooth transitions" },

  { id: "light_volumetric",   label: "Volumetric rays",       text: "volumetric god rays streaking through the scene" },
  { id: "light_magicbeams",   label: "Light beams",           text: "soft layered beams of warm or cool light, gentle atmosphere" },

  { id: "light_backlit",      label: "Backlit aura",          text: "strong backlight creating a glowing outline around the subject" },
  { id: "light_halo",         label: "Halo lighting",         text: "gentle halo around the subject, radiant but soft" }
],


details: [
  { id: "cinema",         label: "Cinematic camera",   text: "cinematic composition, shallow depth of field, filmic look" },
  { id: "cinema_clean",   label: "Clean cinematic",    text: "clean structured cinematic framing with balanced highlights" },

  { id: "macro",          label: "Macro detail",       text: "macro-lens level detail, sharp microtextures" },
  { id: "macro_smooth",   label: "Smooth macro",       text: "macro textures with soft transitions and clean depth" },

  { id: "wide",           label: "Wide shot",          text: "wide establishing shot showing environment and depth" },
  { id: "wide_panorama",  label: "Panoramic view",     text: "panoramic composition with bright immersive perspective" },

  { id: "studio",         label: "Studio lighting",    text: "studio-style lighting, controlled highlights" },
  { id: "studio_soft",    label: "Soft studio",        text: "bright studio aesthetic with soft reflectors and warm tones" },

  { id: "particles",      label: "Particles & FX",     text: "floating dust and light particles, subtle atmospheric effects" },
  { id: "particles_spark",label: "Light sparkles",     text: "tiny sparkles and floating light specks for a magical airy look" }
],


palettes: [
  { id: "teal_orange",      label: "Teal & orange",       text: "color palette of teal and warm orange lights" },
  { id: "teal_soft",        label: "Soft teal harmony",   text: "soft teal tones combined with gentle warm glow" },

  { id: "violet_gold",      label: "Violet & gold",       text: "deep violet shadows with golden highlights" },
  { id: "violet_pastel",    label: "Pastel violet",       text: "light pastel violet hues with warm shimmer" },

  { id: "blue_pink",        label: "Blue & magenta",      text: "cool blue ambience with magenta accents" },
  { id: "blue_sky",         label: "Sky blue harmony",    text: "bright sky blues blended with soft cool gradients" },

  { id: "emerald_cyan",     label: "Emerald & cyan",      text: "emerald green glows with cool cyan highlights" },
  { id: "emerald_soft",     label: "Emerald soft tone",   text: "soft green-teal palette with gentle luminescence" },

  { id: "monochrome",       label: "Soft monochrome",     text: "muted near-monochrome palette with gentle contrast" },
  { id: "mono_warm",        label: "Warm monochrome",     text: "warm grayscale palette with subtle soft tones" }

  { id: "amber_cream",      label: "Amber & cream",     text: "warm amber lighting balanced with soft cream highlights" },
  { id: "rose_peach",       label: "Rose & peach",      text: "muted rose tones blended with gentle peach warmth" },
  { id: "slate_silver",     label: "Slate & silver",    text: "cool slate blues paired with subtle silver accents" },
  { id: "sand_ivory",       label: "Sand & ivory",      text: "natural sand hues combined with soft ivory light" },
  { id: "lavender_sand",    label: "Lavender & sand",   text: "soft lavender tones balanced with warm sandy neutrals" }

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
