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
  { id: "on the Beach",     label: "Beachlife",                  text: "doing anything one does on the beach" },
  { id: "fashion_vintage",  label: "Vintage fashion portfolio",  text: "classic mid-century fashion photography, elegant styling" },
  { id: "holoconcept",      label: "Holographic concept art",    text: "translucent holographic effects, volumetric light, futuristic color blending" },
  { id: "mythic_ink",       label: "Mythic ink illustration",    text: "handcrafted ink style, elegant linework, mythical motifs" },
  { id: "signal_walker",    label: "Signal walker",              text: "male figure moving through invisible signal currents, subtle light traces around him, attentive calm, modern mythic tone" },
  { id: "threshold_keeper", label: "Keeper of thresholds",       text: "calm masculine presence standing between spaces, doors and light frames implied, patient watchfulness, soft suspended atmosphere" },
  { id: "memory_tide",      label: "Memory tide bearer",         text: "male figure carrying slow-moving waves of memory and light, gentle forward motion, emotional depth without heaviness, luminous pastel flow" }
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
      { id: "gothic fantasy",        label: "Gothic fantasy",           text: "in a gothic environment with ominous architecture and eerie lighting" },
      { id: "steampunk_industrial_scene", label: "Steampunk industrial",text: "in a gritty steampunk industrial setting with Victorian machinery and smoky atmosphere" },
      { id: "future_tech_scene",     label: "Future tech city",         text: "inside a sleek futuristic city with advanced technology and glowing neon structures" },

      { id: "fantasy_landscape_scene", label: "Fantasy landscape",      text: "in a lush fantasy landscape with ethereal lighting and mystical creatures" },

      { id: "steampunk_fantasy_scene", label: "Steampunk fantasy",      text: "in a whimsical steampunk fantasy world of brass, iron, and Victorian technology" },
      { id: "pixel_adventure_scene", label: "Pixel art adventure",      text: "inside an 8-bit pixel art world with retro landscapes and blocky characters" },
    // New
      { id: "open_sea",              label: "Open sea",                 text: "on a calm open sea under a wide luminous sky, gentle waves, peaceful horizon" },
      { id: "floating_platform",     label: "Floating platform",        text: "on a quiet floating platform above water, soft reflections, tranquil atmosphere" },
      { id: "sunlit_city",           label: "Sunlit future city",       text: "in a bright future city with open spaces, clean architecture, gentle activity" },
      { id: "studio_light",          label: "Light studio",             text: "in a softly lit neutral environment with clean background and calm focus" },
      { id: "magical_realism_scene", label: "Magical realism tableau",  text: "in a surreal magical realism tableau with dreamlike imagery and fantastical elements" },
      { id: "Techno_Party",          label: "People at a wild Party",   text: "SaturdayNight, Dancefloor, Lasershow, Heavy Bassdrums, hundreds of people dancing,let the bass kick!"},  
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
  { id: "mono_warm",        label: "Warm monochrome",     text: "warm grayscale palette with subtle soft tones" },

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
     CREATOR BATTERY – narrative prompt building blocks
     ========================================================= */

  const CF = {

    surroundings: [
      { id: "abandoned_server",     label: "Abandoned server room",       text: "inside a dark abandoned server room with blinking residual lights" },
      { id: "bio_forest",           label: "Bioluminescent forest",       text: "in a glowing bioluminescent forest with floating spores and soft light" },
      { id: "neon_rooftop",         label: "Neon rooftop at night",       text: "on a rain-soaked neon rooftop overlooking a vast city at night" },
      { id: "floating_market",      label: "Floating market",             text: "above a floating market suspended in clouds, lanterns and voices below" },
      { id: "cathedral_data",       label: "Cathedral of data",           text: "inside a crumbling cathedral made entirely of flowing data streams" },
      { id: "underwater_temple",    label: "Underwater temple of light",  text: "in an underwater temple bathed in shafts of filtered sunlight" },
      { id: "desert_machines",      label: "Desert of broken machines",   text: "walking through a vast desert littered with ancient broken machines" },
      { id: "rooftop_garden",       label: "Rooftop garden future city",  text: "on a lush rooftop garden above a gleaming future city" },
      { id: "library_forgotten",    label: "Library of forgotten code",   text: "in a quiet infinite library storing forgotten code and lost programs" },
      { id: "volcanic_forge",       label: "Volcanic forge of computation", text: "inside a volcanic forge where raw computation is hammered into form" },
      { id: "glass_bridge",         label: "Glass bridge between towers",  text: "standing on a transparent glass bridge between two colossal towers" },
      { id: "clockwork_room",       label: "Clockwork workshop",          text: "in a warm clockwork workshop filled with ticking mechanisms and brass" },
      { id: "starship_bridge",      label: "Starship bridge",             text: "on the bridge of an ancient starship drifting through nebula light" },
      { id: "moonlit_ruins",        label: "Moonlit ancient ruins",       text: "among ancient ruins bathed in cold moonlight and drifting mist" },
      { id: "neon Alley",           label: "Neon alley",                  text: "in a narrow neon-lit alley with steam rising from grates below" },
      { id: "cloud_palace",         label: "Cloud palace",                text: "inside a palace made of clouds with pillars of condensed light" },
      { id: "frozen_lake",          label: "Frozen lake at dawn",         text: "standing on a vast frozen lake at dawn, ice cracks glowing faintly" },
      { id: "jungle_of_cables",     label: "Jungle of cables",            text: "in an overgrown jungle where vines are replaced by thick glowing cables" },
      { id: "empty_stadium",        label: "Empty stadium",               text: "in a vast empty stadium with holographic advertisements still playing" },
      { id: "attic_of_time",        label: "Attic of time",               text: "in a dusty attic where forgotten hours are stored in jars of light" }
    ],

    abilities: [
      { id: "data_streams",         label: "Summoning data streams",      text: "summoning rivers of luminous data that flow around their body" },
      { id: "light_shield",         label: "Bending light into shields",  text: "bending light into shimmering defensive shields" },
      { id: "repair_code",          label: "Repairing broken code",       text: "repairing fractured code with precise gestures and focused intent" },
      { id: "open_portal",          label: "Opening digital portals",     text: "opening circular digital portals made of layered light" },
      { id: "command_swarms",       label: "Commanding swarms",           text: "commanding autonomous micro-drones in synchronized swarms" },
      { id: "channel_electricity",  label: "Channeling raw electricity",  text: "channeling raw electrical energy through their fingertips" },
      { id: "weave_memory",         label: "Weaving threads of memory",   text: "weaving luminous threads of memory into coherent visions" },
      { id: "phase_shift",          label: "Phase-shifting through walls", text: "phase-shifting through solid walls like a ghost" },
      { id: "machine_speech",       label: "Speaking in machine frequencies", text: "speaking in frequencies only machines can hear" },
      { id: "grow_crystals",        label: "Growing data crystals",       text: "growing crystalline data structures from raw information" },
      { id: "decode_symbols",       label: "Decoding ancient symbols",    text: "decoding ancient glowing symbols that appear in the air" },
      { id: "summon_familiar",      label: "Summoning a digital familiar", text: "summoning a small floating digital familiar made of light" },
      { id: "time_loop",            label: "Bending a time loop",         text: "bending a local time loop to replay a critical moment" },
      { id: "gravity_shift",        label: "Shifting local gravity",      text: "shifting local gravity to float objects and people" },
      { id: "echo_location",        label: "Echo-location through data",  text: "sensing the environment through data echo-location" },
      { id: "shadow_step",          label: "Shadow stepping",             text: "stepping through shadows to teleport short distances" },
      { id: " emotion_read",        label: "Reading emotional auras",     text: "reading the emotional aura of everyone nearby as colored light" },
      { id: "code_singing",         label: "Code singing",                text: "singing raw code into existence through harmonic resonance" },
      { id: "dream_projection",     label: "Projecting shared dreams",    text: "projecting a shared dream into the minds of others" },
      { id: "fractal_vision",       label: "Fractal vision",              text: "seeing the fractal mathematics underlying all visible reality" }
    ],

    styles: [
      { id: "oil_painting",         label: "Oil painting",               text: "rich oil painting with visible brushstrokes and warm depth" },
      { id: "vaporwave",            label: "Vaporwave collage",          text: "vaporwave collage aesthetic, pastel gradients, retro digital" },
      { id: "ink_wash",             label: "Ink wash",                   text: "delicate ink wash style, flowing gradients, East Asian influence" },
      { id: "photoreal",            label: "Photorealistic",             text: "photorealistic rendering, sharp detail, natural lighting" },
      { id: "art_nouveau",          label: "Art nouveau",                text: "art nouveau style, elegant flowing lines, organic ornament" },
      { id: "pixel_art",            label: "Pixel art",                  text: "retro pixel art style, limited palette, nostalgic charm" },
      { id: "concept_art",          label: "Concept art",                text: "professional concept art, clean rendering, strong silhouette" },
      { id: "watercolor",           label: "Watercolor",                 text: "soft watercolor painting, transparent washes, gentle color bleeding" },
      { id: "comic_book",           label: "Comic book",                 text: "bold comic book style, strong outlines, dynamic shading" },
      { id: "charcoal",             label: "Charcoal sketch",            text: "expressive charcoal sketch, rich blacks, textured paper" },
      { id: "3d_render",            label: "3D render",                  text: "clean 3D render, subsurface scattering, physically based materials" },
      { id: "collage",              label: "Mixed media collage",        text: "mixed media collage, layered textures, torn paper edges" },
      { id: "line_art",             label: "Clean line art",             text: "precise clean line art with minimal shading" },
      { id: "impressionist",        label: "Impressionist",              text: "impressionist style, visible dabs of color, light as subject" },
      { id: "surrealist",           label: "Surrealist",                 text: "surrealist dream logic, impossible objects, Dali-esque atmosphere" },
      { id: "ukiyo_e",              label: "Ukiyo-e woodblock",          text: "Japanese ukiyo-e woodblock print style, flat color, elegant lines" },
      { id: "low_poly",             label: "Low poly 3D",                text: "low-polygon 3D aesthetic, faceted surfaces, modern minimal" },
      { id: "stained_glass",        label: "Stained glass",              text: "stained glass window style, bold color panels, lead outlines" },
      { id: "matte_painting",       label: "Matte painting",             text: "cinematic matte painting, photorealistic environment, dramatic scale" },
      { id: "sketch_and_watercolor", label: "Sketch + watercolor",       text: "pencil sketch combined with soft watercolor fills" }
    ],

    timelines: [
      { id: "medieval",             label: "Medieval",                   text: "set in a medieval world of castles, swords, and candlelight" },
      { id: "renaissance",          label: "Renaissance",                text: "set in the Renaissance era of art, science, and discovery" },
      { id: "noir_1920s",           label: "1920s noir",                 text: "set in 1920s film noir atmosphere, smoke, jazz, and shadow" },
      { id: "retro_1980s",          label: "1980s retro",                text: "set in the 1980s with synthesizers, arcades, and neon" },
      { id: "cyberpunk_now",        label: "Cyberpunk now",              text: "set in a present-day cyberpunk underground of hackers and code" },
      { id: "far_future",           label: "Far future",                 text: "set in the far future where humanity has merged with machines" },
      { id: "ancient_myth",         label: "Ancient mythology",          text: "set in ancient mythological times of gods, heroes, and monsters" },
      { id: "prehistoric",          label: "Prehistoric",                text: "set in a prehistoric world of raw nature and early consciousness" },
      { id: "victorian",            label: "Victorian",                  text: "set in the Victorian era of industry, gaslight, and exploration" },
      { id: "space_age",            label: "Space age",                  text: "set in the golden space age of rockets, optimism, and discovery" },
      { id: "bronze_age",           label: "Bronze age",                 text: "set in the Bronze age of early civilizations and trade routes" },
      { id: "roaring_20s",          label: "Roaring twenties",           text: "set in the roaring twenties of jazz, flappers, and excess" },
      { id: "cold_war",             label: "Cold War era",               text: "set during the Cold War era of espionage, secrecy, and tension" },
      { id: "digital_now",          label: "Digital now",                text: "set right now in the age of algorithms, screens, and data" },
      { id: "post_apocalypse",      label: "Post-apocalypse",            text: "set after the collapse, rebuilding among ruins and silence" }
    ],

    goals: [
      { id: "find_knowledge",       label: "Finding lost knowledge",     text: "searching for ancient knowledge hidden in forgotten systems" },
      { id: "protect_portal",       label: "Protecting a portal",        text: "standing guard at a portal between worlds that must not open" },
      { id: "decode_message",       label: "Decoding a message",         text: "decoding an encrypted message that holds the key to everything" },
      { id: "build_something",      label: "Building something new",     text: "constructing a new device from salvaged parts and raw data" },
      { id: "hunt_rogue_ai",        label: "Hunting a rogue AI",         text: "tracking down a rogue AI that has escaped into the network" },
      { id: "guard_sacred",         label: "Guarding a sacred place",    text: "quietly guarding a sacred digital place from intruders" },
      { id: "cross_worlds",         label: "Crossing into another world", text: "preparing to cross the threshold into another world" },
      { id: "solve_mystery",        label: "Solving a mystery",          text: "investigating a deep mystery that spans multiple timelines" },
      { id: "heal_system",          label: "Healing a broken system",    text: "repairing a massive broken system before it collapses entirely" },
      { id: "deliver_message",      label: "Delivering a message",       text: "racing to deliver a critical message across hostile territory" },
      { id: "rescue_soul",          label: "Rescuing a trapped soul",    text: "rescuing a consciousness trapped inside a failing machine" },
      { id: "ignite_revolution",    label: "Igniting a revolution",      text: "sparking a quiet revolution against an oppressive system" },
      { id: "find_home",            label: "Finding a way home",         text: "navigating back to a home that may no longer exist" },
      { id: "unlock_archive",       label: "Unlocking a sealed archive",  text: "unlocking a vast sealed archive of forbidden knowledge" },
      { id: "bridge_divide",        label: "Bridging a great divide",    text: "building a bridge between two factions that have forgotten peace" }
    ],

    descriptions: [
      { id: "old_woman_silver",     label: "Old woman, silver hair",     text: "an old woman with flowing silver hair and knowing eyes" },
      { id: "young_monk_white",     label: "Young monk, white robes",    text: "a young monk in pure white robes with a serene expression" },
      { id: "chrome_android",       label: "Chrome android, cracked",    text: "a chrome android with a cracked visor leaking soft light" },
      { id: "child_lantern",        label: "Child with a lantern",       text: "a small child holding a lantern that glows with warm data-light" },
      { id: "masked_cloak",         label: "Masked figure in cloak",     text: "a tall masked figure wrapped in a dark flowing cloak" },
      { id: "woman_circuit",        label: "Woman, circuit tattoos",     text: "a woman with glowing circuit tattoos winding across her skin" },
      { id: "figure_of_light",      label: "Figure made of light",       text: "a tall figure composed entirely of shifting beams of light" },
      { id: "old_man_staff",        label: "Old man with a staff",       text: "an old man leaning on a staff that pulses with data energy" },
      { id: "twin_echoes",          label: "Twin mirror images",         text: "two mirror-image figures facing each other across a divide" },
      { id: "child_robot",          label: "Child with a robot friend",  text: "a small child walking beside a gentle floating robot companion" },
      { id: "warrior_glowing",      label: "Warrior with glowing armor", text: "a warrior in armor that glows with warm inner circuitry" },
      { id: "woman_veil_stars",     label: "Woman with starlit veil",    text: "a woman wearing a translucent veil woven from tiny stars" },
      { id: "figure_shadow",        label: "Shadow figure",              text: "a mysterious figure that exists only as a shadow with glowing eyes" },
      { id: "elder_data",           label: "Elder of the data realm",    text: "an ancient elder whose skin is etched with flowing data streams" },
      { id: "pilot_scarred",        label: "Scarred pilot",              text: "a scarred pilot with weathered flight gear and tired bright eyes" },
      { id: "keeper_clockwork",     label: "Clockwork keeper",           text: "a half-human half-clockwork keeper with brass limbs and gentle gears" },
      { id: "weaver_thread",        label: "Weaver of threads",          text: "a slender figure whose fingers trail luminous threads of fate" },
      { id: "child_dreamer",        label: "Dreaming child",             text: "a sleeping child surrounded by a visible aura of shared dreams" },
      { id: "sentinel_stone",       label: "Stone sentinel",             text: "an ancient stone sentinel slowly coming to life with inner light" },
      { id: "wanderer_cloak",       label: "Wanderer with a map",        text: "a lone wanderer studying a glowing map that redraws itself" }
    ],

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
     CREATOR BATTERY – UI, PROMPT, RANDOMIZE, EVENTS
     ========================================================= */

  function buildCFUI() {
    const forge = qs(".prompt-forge");
    if (!forge) return;

    const section = document.createElement("section");
    section.id = "creator-battery";
    section.style.cssText = "margin-top:2.5rem;padding-top:1.5rem;border-top:1px solid rgba(255,255,255,.12);";
    section.innerHTML = `
      <h2 style="font-size:1.4rem;text-align:center;margin-bottom:0.3rem;letter-spacing:0.04em;">Creator Battery</h2>
      <p style="text-align:center;font-size:0.8rem;color:var(--muted);margin-bottom:1.2rem;">Narrative Prompt Builder</p>

      <div class="pf-grid">
        <div class="pf-column cf-controls" id="cf-controls"></div>
        <div class="pf-column cf-output" id="cf-output"></div>
      </div>
    `;
    forge.appendChild(section);

    const controls = $("cf-controls");
    const output   = $("cf-output");
    if (!controls || !output) return;

    controls.innerHTML = `
      <div class="pf-row">
        <label for="cf-surroundings"><strong>1. Surroundings</strong></label>
        <select id="cf-surroundings"></select>
        <button type="button" class="pf-mini" data-cf-rand="surroundings">🎲</button>
      </div>
      <div class="pf-row">
        <label for="cf-abilities"><strong>2. Abilities</strong></label>
        <select id="cf-abilities"></select>
        <button type="button" class="pf-mini" data-cf-rand="abilities">🎲</button>
      </div>
      <div class="pf-row">
        <label for="cf-styles"><strong>3. Styles</strong></label>
        <select id="cf-styles"></select>
        <button type="button" class="pf-mini" data-cf-rand="styles">🎲</button>
      </div>
      <div class="pf-row">
        <label for="cf-timelines"><strong>4. Timelines</strong></label>
        <select id="cf-timelines"></select>
        <button type="button" class="pf-mini" data-cf-rand="timelines">🎲</button>
      </div>
      <div class="pf-row">
        <label for="cf-goals"><strong>5. Goals</strong></label>
        <select id="cf-goals"></select>
        <button type="button" class="pf-mini" data-cf-rand="goals">🎲</button>
      </div>
      <div class="pf-row">
        <label for="cf-descriptions"><strong>6. Descriptions</strong></label>
        <select id="cf-descriptions"></select>
        <button type="button" class="pf-mini" data-cf-rand="descriptions">🎲</button>
      </div>

      <div class="pf-actions" style="margin-top:10px;">
        <button type="button" id="cf-rand-all" class="pf-mini">🎲 Randomize all</button>
        <button type="button" id="cf-generate" class="pf-mini">⚡ Regenerate prompt</button>
      </div>
    `;

    output.innerHTML = `
      <div class="pf-block">
        <div class="pf-block-head">
          <span>Narrative prompt</span>
          <button type="button" class="pf-copy" data-cf-copy="prompt">📋 Copy</button>
        </div>
        <textarea id="cf-prompt" rows="8"></textarea>
      </div>

      <div class="pf-block">
        <div class="pf-block-head">
          <span>Negative prompt</span>
          <button type="button" class="pf-copy" data-cf-copy="negative">📋 Copy</button>
        </div>
        <textarea id="cf-negative" rows="4" readonly></textarea>
      </div>

      <div class="pf-actions" style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
        <select id="cf-target" class="pf-mini" style="min-width:160px;">
          <option value="nightcafe">NightCafe Studio</option>
          <option value="midjourney">MidJourney</option>
          <option value="sdwebui">Stable Diffusion WebUI</option>
          <option value="leonardo">Leonardo AI</option>
          <option value="bluewillow">BlueWillow</option>
          <option value="runway">Runway ML</option>
          <option value="playground">Playground AI</option>
          <option value="dalle">OpenAI DALL·E</option>
        </select>
        <button type="button" id="cf-send" class="pf-nc-btn">Copy & open</button>
      </div>

      <p class="pf-hint">
        Tip: Select your narrative elements and generate a prompt for any AI image generator.
      </p>
    `;
  }

  function buildCFPrompt() {
    const coreParts = [
      getText("cf-descriptions",  CF.descriptions),
      getText("cf-surroundings", CF.surroundings),
      getText("cf-abilities",    CF.abilities),
      getText("cf-styles",       CF.styles),
      getText("cf-timelines",    CF.timelines),
      getText("cf-goals",        CF.goals)
    ].filter(Boolean);

    let corePrompt = coreParts.join(", ");
    if (corePrompt) {
      corePrompt += ", narrative scene, high resolution, detailed, coherent composition";
    }

    const promptBox = $("cf-prompt");
    if (promptBox) promptBox.value = corePrompt;

    const negBox = $("cf-negative");
    if (negBox) negBox.value = CF.negative.join(", ");
  }

  function randomizeCFAll() {
    const map = {
      surroundings: CF.surroundings,
      abilities:    CF.abilities,
      styles:       CF.styles,
      timelines:    CF.timelines,
      goals:        CF.goals,
      descriptions: CF.descriptions
    };

    Object.keys(map).forEach(type => {
      const el   = $("cf-" + type);
      const list = map[type];
      if (!el || !list || !list.length) return;
      el.value = rand(list).id;
    });

    buildCFPrompt();
  }

  function attachCFEvents() {
    // Individual randomizers
    qsa(".pf-mini[data-cf-rand]").forEach(btn => {
      btn.addEventListener("click", () => {
        const type = btn.getAttribute("data-cf-rand");
        if (!type) return;

        const map = {
          surroundings: CF.surroundings,
          abilities:    CF.abilities,
          styles:       CF.styles,
          timelines:    CF.timelines,
          goals:        CF.goals,
          descriptions: CF.descriptions
        };

        const el   = $("cf-" + type);
        const list = map[type];
        if (!el || !list || !list.length) return;
        el.value = rand(list).id;
        buildCFPrompt();
      });
    });

    // Randomize all
    const randAll = $("cf-rand-all");
    if (randAll) randAll.addEventListener("click", randomizeCFAll);

    // Generate
    const genBtn = $("cf-generate");
    if (genBtn) genBtn.addEventListener("click", buildCFPrompt);

    // Auto rebuild on any select change
    qsa("select[id^='cf-']").forEach(sel => {
      sel.addEventListener("change", buildCFPrompt);
    });

    // Copy buttons
    qsa(".pf-copy[data-cf-copy]").forEach(btn => {
      btn.addEventListener("click", async () => {
        const target = btn.getAttribute("data-cf-copy");
        const boxId  = target === "negative" ? "cf-negative" : "cf-prompt";
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

    // SEND button
    const sendBtn = $("cf-send");
    if (sendBtn) {
      sendBtn.addEventListener("click", async () => {
        const promptBox = $("cf-prompt");
        const prompt = promptBox ? promptBox.value.trim() : "";
        if (!prompt) return;

        try {
          await navigator.clipboard.writeText(prompt);
        } catch { /* ignore */ }

        const targetSel = $("cf-target");
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
     MOVIE STORYLINE GENERATOR – DATA MODEL
     ========================================================= */

  const MS = {
    genres: [
      { id: "action",       label: "Action / Thriller",    keywords: ["explosive","high-stakes","fast-paced","intense","dynamic"] },
      { id: "sci_fi",       label: "Sci-Fi / Cyberpunk",   keywords: ["neon-lit","futuristic","holographic","chrome","dystopian"] },
      { id: "fantasy",      label: "Fantasy / Epic",       keywords: ["mythical","ancient","magical","enchanted","legendary"] },
      { id: "noir",         label: "Noir / Mystery",       keywords: ["shadowy","smoky","femme fatale","clandestine","moody"] },
      { id: "horror",       label: "Horror / Suspense",    keywords: ["eerie","dread-filled","flickering","claustrophobic","unsettling"] },
      { id: "romance",      label: "Romance / Drama",      keywords: ["intimate","warm","tender","emotional","bittersweet"] },
      { id: "comedy",       label: "Comedy / Quirky",      keywords: ["whimsical","absurd","playful","exaggerated","lighthearted"] },
      { id: "documentary",  label: "Documentary / Real",    keywords: ["authentic","raw","observational","natural light","grainy"] },
      { id: "anime",        label: "Anime / Stylized",     keywords: ["expressive","dynamic poses","speed lines","vibrant","stylized"] },
      { id: "western",      label: "Western / Frontier",   keywords: ["dusty","sun-baked","wide open","rugged","frontier town"] },
      { id: "musical",      label: "Musical / Performance",keywords: ["theatrical","spotlight","rhythmic","dramatic staging","costumed"] },
      { id: "dream",        label: "Dream / Surreal",      keywords: ["surreal","impossible","floating","melting","hallucinatory"] }
    ],

    cameras: [
      { id: "static_wide",    label: "Static wide shot",          text: "wide establishing shot, camera locked" },
      { id: "slow_push",      label: "Slow push-in",              text: "camera slowly pushes in toward subject" },
      { id: "orbit",          label: "Orbit / Arc shot",          text: "camera orbits around subject in a slow arc" },
      { id: "tracking",       label: "Tracking shot",             text: "camera tracks alongside subject in motion" },
      { id: "dolly_zoom",     label: "Dolly zoom (Vertigo)",     text: "dolly zoom effect, background warps, subject stays" },
      { id: "crane_up",       label: "Crane up / Reveal",        text: "camera cranes upward revealing the full scene" },
      { id: "handheld",       label: "Handheld / Shaky",         text: "handheld camera, raw documentary feel, slight shake" },
      { id: "fpv",            label: "FPV drone",                text: "first-person view drone swooping through the scene" },
      { id: "whip_pan",       label: "Whip pan",                 text: "fast whip pan transition between focal points" },
      { id: "static_close",   label: "Static close-up",          text: "tight close-up, camera locked, shallow depth of field" },
      { id: "pull_back",      label: "Pull back / Reveal",       text: "camera pulls back revealing a larger world" },
      { id: "aerial",         label: "Aerial / Top-down",        text: "aerial bird's-eye view looking straight down" },
      { id: "steadicam",      label: "Steadicam follow",         text: "smooth steadicam follows subject through environment" },
      { id: "dutch_angle",    label: "Dutch angle",              text: "tilted dutch angle creating unease and tension" }
    ],

    durations: [
      { id: "3s",  label: "3 sec",  seconds: 3 },
      { id: "5s",  label: "5 sec",  seconds: 5 },
      { id: "7s",  label: "7 sec",  seconds: 7 },
      { id: "10s", label: "10 sec", seconds: 10 },
      { id: "15s", label: "15 sec", seconds: 15 }
    ],

    moods: [
      "Tense anticipation","Euphoric release","Melancholic reflection","Dark foreboding",
      "Serene calm before the storm","Frantic urgency","Whimsical wonder","Cold menace",
      "Warm nostalgia","Chaotic energy","Quiet grief","Electric excitement",
      "Suffocating dread","Gentle hope","Bitter triumph","Unsettling stillness"
    ],

    transitions: [
      "Hard cut","Smash cut","Match cut","Dissolve","Fade to black",
      "Whip pan transition","J-cut (audio leads)","L-cut (audio trails)",
      "Flash cut","Invisible cut","Jump cut","Iris wipe"
    ],

    lighting: [
      "Golden hour side-light","Cold neon rim light","Single overhead practical",
      "Backlit silhouette","Dappled forest light","Harsh interrogation lamp",
      "Soft diffused overcast","Firelight flicker","Moonlight through blinds",
      "Strobe / flickering","Deep shadow with motivated fill","Volumetric god rays"
    ],

    storyTemplates: {
      action: [
        { arc: "The Drop", beats: ["Wide shot: protagonist lands in hostile territory","Close-up: eyes lock on objective","Tracking: sprint through chaos","Slow-mo: final strike","Wide pull-back: aftermath silence"] },
        { arc: "The Chase", beats: ["Aerial: cityscape at night","FPV: subject weaves through traffic","Close-up: hand grabs wheel/ledge","Whip pan: pursuer closes in","Crane up: escape or cornered?"] }
      ],
      sci_fi: [
        { arc: "First Contact", beats: ["Static wide: empty landscape, something appears","Push-in: subject notices anomaly","Orbit: object reveals itself","Close-up: hand reaches out","Pull back: the scale of what just happened"] },
        { arc: "System Override", beats: ["Close-up: fingers on terminal","Wide: room lights shift","Tracking: moving through corridors","Dutch angle: something is wrong","Static wide: system comes alive"] }
      ],
      fantasy: [
        { arc: "The Awakening", beats: ["Darkness, then a glow","Crane up: ancient ruins revealed","Slow push: subject approaches altar","Close-up: eyes open, power surges","Aerial: landscape transforms"] },
        { arc: "The Alliance", beats: ["Wide: lone figure in wilderness","Tracking: journey through terrain","Handheld: tense meeting","Orbit: mutual respect forms","Crane up: two figures against the horizon"] }
      ],
      noir: [
        { arc: "The Tip-Off", beats: ["Static close: cigarette glow in dark","Wide: rain-slicked street","Steadicam: following through alley","Close-up: envelope exchanged","Pull back: city watches"] },
        { arc: "Double Cross", beats: ["Dutch angle: unease in office","Push-in: realization dawns","Handheld: confrontation","Static wide: the fallout","Fade: empty room, door ajar"] }
      ],
      horror: [
        { arc: "Something's Wrong", beats: ["Static wide: ordinary room, wrong detail","Push-in: slowly closer to anomaly","Handheld: subject investigates","Close-up: the reveal","Hard cut to black. Silence."] },
        { arc: "The Descent", beats: ["Aerial: safe world above","Crane down: into darkness","Tracking: moving deeper","Close-up: breath visible, terrified","Dutch angle: not alone"] }
      ],
      romance: [
        { arc: "First Glance", beats: ["Wide: crowded room","Slow push: two people notice","Close-up: eyes meet","Orbit: world fades around them","Soft dissolve: moment lingers"] },
        { arc: "The Goodbye", beats: ["Static wide: platform/station","Close-up: hands almost touching","Tracking: walking away","Pull back: one figure remains","Fade: empty space where they stood"] }
      ],
      comedy: [
        { arc: "The Setup", beats: ["Wide: everything seems normal","Close-up: subtle wrong detail","Tracking: chain reaction begins","Handheld: escalating chaos","Static wide: aftermath, deadpan"] },
        { arc: "Mistaken Identity", beats: ["Close-up: confident subject","Wide: enters wrong situation","Orbit: confusion around them","Handheld: trying to escape","Pull back: even bigger misunderstanding"] }
      ],
      documentary: [
        { arc: "The Subject", beats: ["Static wide: environment established","Close-up: face, natural light","Handheld: following daily routine","Tracking: through their world","Static wide: context fully revealed"] },
        { arc: "The Moment", beats: ["Aerial: landscape context","Steadicam: approaching subject","Close-up: hands at work","Handheld: something changes","Pull back: new understanding"] }
      ],
      anime: [
        { arc: "Power Awakens", beats: ["Close-up: eye snaps open, iris glows","Wide: energy erupts outward","Tracking: subject launches into action","Dynamic poses: mid-air strike","Crane up: transformation complete"] },
        { arc: "The Rival Appears", beats: ["Wide: battlefield established","Slow push: figure emerges from dust","Orbit: two forces circle","Close-up: determination in both eyes","Whip pan: first clash"] }
      ],
      western: [
        { arc: "High Noon", beats: ["Aerial: dusty main street","Steadicam: figure walks to center","Close-up: hand hovers over holster","Dutch angle: tension peaks","Wide: smoke clears"] },
        { arc: "The Ride", beats: ["Aerial: vast frontier","Tracking: horse and rider","Close-up: weathered face, determination","FPV: galloping through terrain","Crane up: destination on horizon"] }
      ],
      musical: [
        { arc: "Opening Number", beats: ["Wide: stage/venue dark","Spotlight hits: subject illuminated","Tracking: choreographed movement","Close-up: expression, passion","Crane up: full spectacle revealed"] },
        { arc: "The Ballad", beats: ["Close-up: tears, intimate moment","Slow push: emotional crescendo","Orbit: world narrows to subject","Static wide: audience/empty seats","Fade: single spotlight remains"] }
      ],
      dream: [
        { arc: "The Shift", beats: ["Static wide: normal reality","Dutch angle: gravity bends","Orbit: impossible geometry","Close-up: subject realizes","Pull back: reality fully transformed"] },
        { arc: "The Loop", beats: ["Wide: familiar scene","Match cut: same scene, different","Close-up: déjà vu expression","Handheld: growing unease","Dissolve: back where we started"] }
      ]
    }
  };

  /* =========================================================
     MOVIE STORYLINE GENERATOR – UI
     ========================================================= */

  function buildMSUI() {
    const forge = qs(".prompt-forge");
    if (!forge) return;

    const section = document.createElement("section");
    section.id = "movie-storyline";
    section.style.cssText = "margin-top:2.5rem;padding-top:1.5rem;border-top:1px solid rgba(255,255,255,.12);";
    section.innerHTML = `
      <h2 style="font-size:1.4rem;text-align:center;margin-bottom:0.3rem;letter-spacing:0.04em;">Movie Storyline Generator</h2>
      <p style="text-align:center;font-size:0.8rem;color:var(--muted);margin-bottom:1.2rem;">Scene-by-scene image prompts — 3×5s quick mode or custom</p>

      <div class="pf-grid">
        <div class="pf-column ms-controls" id="ms-controls"></div>
        <div class="pf-column ms-output" id="ms-output"></div>
      </div>
    `;
    forge.appendChild(section);

    const controls = $("ms-controls");
    const output   = $("ms-output");
    if (!controls || !output) return;

    controls.innerHTML = `
      <div class="pf-row">
        <label for="ms-premise"><strong>Premise</strong></label>
        <textarea id="ms-premise" rows="2" placeholder="e.g. A lone samurai walks through a neon-lit alley in the rain" style="width:100%;background:#0a0e17;color:#e5e7eb;border:1px solid #1f2937;border-radius:6px;padding:8px;font-size:0.85rem;resize:vertical;"></textarea>
      </div>

      <div class="pf-row">
        <label for="ms-genre"><strong>Genre</strong></label>
        <select id="ms-genre"></select>
        <button type="button" class="pf-mini" data-ms-rand="genre">🎲</button>
      </div>

      <div class="pf-row">
        <label for="ms-scenes"><strong>Scenes</strong></label>
        <select id="ms-scenes">
          <option value="3">3 scenes (15s)</option>
          <option value="4">4 scenes (20s)</option>
          <option value="5">5 scenes (25s)</option>
        </select>
      </div>

      <div class="pf-row">
        <label for="ms-duration"><strong>Scene duration</strong></label>
        <select id="ms-duration"></select>
      </div>

      <div class="pf-actions" style="margin-top:10px;">
        <button type="button" id="ms-quick3x5" class="pf-mini" style="background:#6366f1;color:#fff;">⚡ Quick 3×5s</button>
        <button type="button" id="ms-rand-all" class="pf-mini">🎲 Randomize all</button>
        <button type="button" id="ms-generate" class="pf-mini">🎬 Generate storyline</button>
      </div>

      <div class="pf-actions" style="margin-top:8px;">
        <button type="button" id="ms-use-template" class="pf-mini" style="background:#1f2937;">📖 Use story template</button>
      </div>
    `;

    output.innerHTML = `
      <div id="ms-storyboard" class="ms-storyboard"></div>

      <div class="pf-actions" style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
        <button type="button" id="ms-copy-all" class="pf-mini">📋 Copy all scenes</button>
        <button type="button" id="ms-copy-json" class="pf-mini">📋 Copy as JSON</button>
        <button type="button" id="ms-send-runway" class="pf-nc-btn" style="background:#6366f1;">Open NightCafe</button>
      </div>

      <p class="pf-hint">
        Tip: Type a premise, pick genre, hit Generate. Or use Quick 3×5s for instant results. Copy prompts into NightCafe.
      </p>
    `;
  }

  /* =========================================================
     MOVIE STORYLINE GENERATOR – SCENE GENERATION
     ========================================================= */

  function generateScenes(count, genreId, durationSec, premise) {
    const genre = MS.genres.find(g => g.id === genreId) || MS.genres[0];
    const scenes = [];

    for (let i = 0; i < count; i++) {
      const camera    = rand(MS.cameras);
      const mood      = rand(MS.moods);
      const lighting  = rand(MS.lighting);
      const transIn   = i === 0 ? "Opening" : rand(MS.transitions);
      const keyword   = rand(genre.keywords);

      // Build visual prompt
      const promptParts = [
        premise || "cinematic scene",
        keyword,
        camera.text,
        `lighting: ${lighting.toLowerCase()}`,
        mood.toLowerCase(),
        "film grain, anamorphic lens, 2.39:1 aspect ratio",
        "high detail, cinematic color grading"
      ];

      const scene = {
        number: i + 1,
        title: `Scene ${i + 1}`,
        prompt: promptParts.join(", "),
        basePrompt: promptParts.join(", "),
        camera: camera.label,
        mood: mood,
        lighting: lighting,
        duration: durationSec,
        transition: transIn,
        moodEmojis: getMoodEmoji(mood),
        chainImage: null
      };
      scenes.push(scene);
    }

    return scenes;
  }

  function getMoodEmoji(mood) {
    const map = {
      "Tense anticipation": "😰",
      "Euphoric release": "🥳",
      "Melancholic reflection": "😔",
      "Dark foreboding": "🌑",
      "Serene calm before the storm": "😌",
      "Frantic urgency": "🏃",
      "Whimsical wonder": "✨",
      "Cold menace": "🥶",
      "Warm nostalgia": "🌅",
      "Chaotic energy": "⚡",
      "Quiet grief": "🖤",
      "Electric excitement": "⚡",
      "Suffocating dread": "😱",
      "Gentle hope": "🌱",
      "Bitter triumph": "😤",
      "Unsettling stillness": "🫥"
    };
    return map[mood] || "🎬";
  }

  /* =========================================================
     MOVIE STORYLINE GENERATOR – RENDER
     ========================================================= */

  function renderScenes(scenes) {
    const board = $("ms-storyboard");
    if (!board) return;

    if (!scenes || !scenes.length) {
      board.innerHTML = `<p style="color:var(--muted);text-align:center;font-size:0.85rem;">Click Generate to create your storyline.</p>`;
      return;
    }

    let html = `<div style="display:flex;flex-direction:column;gap:12px;">`;

    scenes.forEach((s, idx) => {
      const isChained = !!s.chainImage;
      const chainBadge = isChained
        ? `<span style="background:#22c55e22;color:#22c55e;font-size:0.65rem;padding:2px 6px;border-radius:4px;margin-left:6px;">🔗 chained</span>`
        : (idx > 0 ? `<span style="background:#f59e0b22;color:#f59e0b;font-size:0.65rem;padding:2px 6px;border-radius:4px;margin-left:6px;">⏳ waiting for last frame</span>` : '');

      html += `
        <div class="ms-scene-card" data-scene-idx="${idx}" style="background:#0d1117;border:1px solid ${isChained ? '#22c55e44' : '#1f2937'};border-radius:8px;padding:12px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
            <span style="font-weight:700;color:#6366f1;font-size:1rem;">${s.title} <span style="font-size:0.75rem;color:var(--muted);">${s.duration}s</span>${chainBadge}</span>
            <span title="${s.mood}">${s.moodEmojis}</span>
          </div>
          <div style="font-size:0.75rem;color:var(--muted);margin-bottom:6px;">
            📷 ${s.camera} &nbsp;|&nbsp; 💡 ${s.lighting} &nbsp;|&nbsp; 🎭 ${s.mood} &nbsp;|&nbsp; ✂️ ${s.transition}
          </div>
          <textarea readonly rows="3" style="width:100%;background:#050810;color:#e5e7eb;border:1px solid #1f2937;border-radius:4px;padding:6px;font-size:0.78rem;font-family:monospace;resize:vertical;">${s.prompt}</textarea>
          <div style="display:flex;gap:6px;margin-top:4px;flex-wrap:wrap;">
            <button type="button" class="pf-mini ms-copy-scene" data-prompt="${encodeURIComponent(s.prompt)}" style="font-size:0.7rem;">📋 Copy prompt</button>
            ${idx > 0 ? `<button type="button" class="pf-mini ms-upload-frame" data-scene-idx="${idx}" style="font-size:0.7rem;background:#6366f1;color:#fff;">🖼️ Upload last frame</button>` : ''}
            ${idx > 0 && isChained ? `<button type="button" class="pf-mini ms-clear-chain" data-scene-idx="${idx}" style="font-size:0.7rem;background:#ef4444;color:#fff;">✕ Clear frame</button>` : ''}
          </div>
          ${isChained ? `<div style="margin-top:6px;"><img src="${s.chainImage}" style="max-height:60px;border-radius:4px;border:1px solid #1f2937;" alt="Last frame reference"/></div>` : ''}
          ${idx === 0 ? `<div style="margin-top:6px;font-size:0.7rem;color:var(--muted);font-style:italic;">Generate this scene in NightCafe → screenshot the last frame → upload to Scene 2</div>` : ''}
        </div>
      `;
    });

    html += `</div>`;

    // Summary
    const totalDuration = scenes.reduce((a, s) => a + s.duration, 0);
    const chainedCount = scenes.filter(s => s.chainImage).length;
    html += `<p style="text-align:center;font-size:0.75rem;color:var(--muted);margin-top:10px;">Total: ${scenes.length} scenes × ${scenes[0].duration}s = ${totalDuration}s — ${chainedCount} chained</p>`;

    board.innerHTML = html;

    // Attach per-scene copy
    qsa(".ms-copy-scene").forEach(btn => {
      btn.addEventListener("click", async () => {
        const prompt = decodeURIComponent(btn.getAttribute("data-prompt") || "");
        try {
          await navigator.clipboard.writeText(prompt);
          btn.textContent = "✅ Copied";
          showToast("Scene prompt copied.");
          setTimeout(() => { btn.textContent = "📋 Copy prompt"; }, 1000);
        } catch {
          showToast("Copy failed.");
        }
      });
    });

    // Attach upload frame buttons
    qsa(".ms-upload-frame").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.getAttribute("data-scene-idx"), 10);
        triggerFrameUpload(idx);
      });
    });

    // Attach clear chain buttons
    qsa(".ms-clear-chain").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.getAttribute("data-scene-idx"), 10);
        if (window._msScenes && window._msScenes[idx]) {
          window._msScenes[idx].chainImage = null;
          window._msScenes[idx].prompt = window._msScenes[idx].basePrompt || window._msScenes[idx].prompt;
          renderScenes(window._msScenes);
          showToast("Frame cleared.");
        }
      });
    });
  }

  /* =========================================================
     CONTINUITY CHAIN – frame upload + prompt inheritance
     ========================================================= */

  function triggerFrameUpload(sceneIdx) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.style.display = "none";
    document.body.appendChild(input);

    input.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target.result;

        // Store on scene
        if (window._msScenes && window._msScenes[sceneIdx]) {
          const scene = window._msScenes[sceneIdx];
          scene.chainImage = dataUrl;

          // Store original prompt as base
          if (!scene.basePrompt) scene.basePrompt = scene.prompt;

          // Analyze image + generate continuation prompt
          const continuationPrompt = buildContinuationPrompt(scene, sceneIdx);
          scene.prompt = continuationPrompt;

          renderScenes(window._msScenes);
          showToast(`Scene ${sceneIdx + 1} chained — prompt updated from last frame.`);
        }
      };
      reader.readAsDataURL(file);
      document.body.removeChild(input);
    });

    input.click();
  }

  function buildContinuationPrompt(scene, idx) {
    const scenes = window._msScenes || [];
    const prevScene = idx > 0 ? scenes[idx - 1] : null;

    // Extract visual DNA from the chain image context
    const basePrompt = scene.basePrompt || scene.prompt;

    // Build continuity-aware prompt
    const continuityParts = [
      "VISUAL CONTINUITY: match the previous frame's character appearance, color palette, lighting mood, and environment",
      prevScene ? `continuing from: ${prevScene.mood.toLowerCase()} atmosphere` : "",
      "same character design, same outfit, same environment",
      "consistent art style, matching color grading",
      basePrompt
    ].filter(Boolean);

    return continuityParts.join(", ");
  }

  /* =========================================================
     MOVIE STORYLINE GENERATOR – EVENTS
     ========================================================= */

  function attachMSEvents() {
    // Genre randomizer
    qsa(".pf-mini[data-ms-rand]").forEach(btn => {
      btn.addEventListener("click", () => {
        const type = btn.getAttribute("data-ms-rand");
        if (type === "genre") {
          const el = $("ms-genre");
          if (el) el.value = rand(MS.genres).id;
        }
      });
    });

    // Quick 3×5s
    const quickBtn = $("ms-quick3x5");
    if (quickBtn) quickBtn.addEventListener("click", () => {
      const genre = $("ms-genre") ? $("ms-genre").value : "sci_fi";
      const premise = $("ms-premise") ? $("ms-premise").value.trim() : "";
      const scenes = generateScenes(3, genre, 5, premise);
      renderScenes(scenes);
      window._msScenes = scenes;
      showToast("Quick 3×5s storyline generated!");
    });

    // Randomize all
    const randAll = $("ms-rand-all");
    if (randAll) randAll.addEventListener("click", () => {
      const el = $("ms-genre");
      if (el) el.value = rand(MS.genres).id;
      const scenesEl = $("ms-scenes");
      if (scenesEl) scenesEl.value = ["3","4","5"][Math.floor(Math.random()*3)];
      const durEl = $("ms-duration");
      if (durEl) durEl.value = rand(MS.durations).id;
    });

    // Generate
    const genBtn = $("ms-generate");
    if (genBtn) genBtn.addEventListener("click", () => {
      const count   = parseInt(($("ms-scenes") || {}).value || "3", 10);
      const genre   = $("ms-genre") ? $("ms-genre").value : "sci_fi";
      const durId   = $("ms-duration") ? $("ms-duration").value : "5s";
      const durObj  = MS.durations.find(d => d.id === durId) || MS.durations[1];
      const premise = $("ms-premise") ? $("ms-premise").value.trim() : "";
      const scenes  = generateScenes(count, genre, durObj.seconds, premise);
      renderScenes(scenes);
      window._msScenes = scenes;
    });

    // Use story template
    const templateBtn = $("ms-use-template");
    if (templateBtn) templateBtn.addEventListener("click", () => {
      const genreId = $("ms-genre") ? $("ms-genre").value : "sci_fi";
      const templates = MS.storyTemplates[genreId] || MS.storyTemplates.sci_fi;
      const template = rand(templates);
      const durId = $("ms-duration") ? $("ms-duration").value : "5s";
      const durObj = MS.durations.find(d => d.id === durId) || MS.durations[1];

      const scenes = template.beats.map((beat, i) => ({
        number: i + 1,
        title: `${template.arc} — Beat ${i + 1}`,
        prompt: `${beat}. ${rand(MS.genres.find(g=>g.id===genreId).keywords)} style, ${rand(MS.cameras).text}, ${rand(MS.lighting).toLowerCase()} lighting, film grain, anamorphic lens, 2.39:1 aspect ratio, high detail`,
        camera: rand(MS.cameras).label,
        mood: rand(MS.moods),
        lighting: rand(MS.lighting),
        duration: durObj.seconds,
        transition: i === 0 ? "Opening" : rand(MS.transitions),
        moodEmojis: getMoodEmoji(rand(MS.moods))
      }));

      renderScenes(scenes);
      window._msScenes = scenes;
      showToast(`Template "${template.arc}" loaded with ${scenes.length} scenes!`);
    });

    // Copy all scenes
    const copyAllBtn = $("ms-copy-all");
    if (copyAllBtn) copyAllBtn.addEventListener("click", async () => {
      const scenes = window._msScenes;
      if (!scenes || !scenes.length) { showToast("Generate a storyline first."); return; }
      const text = scenes.map(s => `=== ${s.title} (${s.duration}s) ===\n📷 ${s.camera} | 💡 ${s.lighting} | 🎭 ${s.mood} | ✂️ ${s.transition}\n\n${s.prompt}\n`).join("\n");
      try {
        await navigator.clipboard.writeText(text);
        showToast("All scenes copied.");
      } catch { showToast("Copy failed."); }
    });

    // Copy as JSON
    const copyJsonBtn = $("ms-copy-json");
    if (copyJsonBtn) copyJsonBtn.addEventListener("click", async () => {
      const scenes = window._msScenes;
      if (!scenes || !scenes.length) { showToast("Generate a storyline first."); return; }
      try {
        await navigator.clipboard.writeText(JSON.stringify(scenes, null, 2));
        showToast("JSON copied.");
      } catch { showToast("Copy failed."); }
    });

    // Send to NightCafe
    const runwayBtn = $("ms-send-runway");
    if (runwayBtn) runwayBtn.addEventListener("click", () => {
      window.open("https://creator.nightcafe.studio/", "_blank", "noopener,noreferrer");
      showToast("NightCafe opened — paste your prompts.");
    });
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

    // Creator Battery
    buildCFUI();
    fillSelect("cf-surroundings", CF.surroundings);
    fillSelect("cf-abilities",    CF.abilities);
    fillSelect("cf-styles",       CF.styles);
    fillSelect("cf-timelines",    CF.timelines);
    fillSelect("cf-goals",        CF.goals);
    fillSelect("cf-descriptions", CF.descriptions);
    buildCFPrompt();
    attachCFEvents();
    randomizeCFAll();


      <div style="text-align:center;margin:0 auto 1.2rem;max-width:380px;padding:10px 16px;border:1px solid rgba(255,255,255,.1);border-radius:8px;background:rgba(255,255,255,.03);">
        <p style="font-size:0.78rem;color:#9ca3af;margin:0 0 6px;">We edit with <a href="https://www.openshot.org/" target="_blank" rel="noopener" style="color:#38bdf8;text-decoration:none;border-bottom:1px dotted #38bdf8;">OpenShot</a> — free, open-source video editor.</p>
      </div>

    
    // Movie Storyline Generator
    buildMSUI();
    fillSelect("ms-genre",    MS.genres);
    fillSelect("ms-duration", MS.durations);
    attachMSEvents();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPF);
  } else {
    initPF();
  }
})();
