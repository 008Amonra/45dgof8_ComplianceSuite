# 🌐 LinguaNode – Indigenous Language Plugin for Compliance Tools

**LinguaNode** is an offline-first, multilingual plugin that allows compliance and legal tools to be translated into indigenous and underrepresented languages.

## 📁 Structure
LinguaNode/
├── index.html # Main plugin interface
├── lang-packs/ # Folder for JSON-based language packs
│ ├── guarani.json
│ ├── ticuna.json
│ └── ...
└── README.md

## 🚀 Usage

1. Open `index.html` in a browser (no server required).
2. Select a language.
3. The corresponding `.json` file from `lang-packs/` is loaded dynamically.

## 🌍 Language Pack Format

Each file in `lang-packs/` should follow this structure:

```json
{
  "title": "Your translated title here",
  "description": "Your translated description here"
}
Example (guarani.json):

{
  "title": "GPT ñembohape ñemoañetégui Ley de Protección de Datos",
  "description": "45dgof8 ojapo ndéve GPT oñemomba'e hag̃ua derecho de privacidad."
}

⚠️ Disclaimer

All translations are community-contributed. No legal guarantee ("Ohne Gewähr").
🤝 Contributing

If you speak or work with a native speaker of an underrepresented language, feel free to:

    Submit new .json files to lang-packs/

    Propose UI improvements

Email: 45dgof8@gmail.com
Website: 45dgof8.com
📜 License

MIT License — feel free to use, remix, and expand responsibly.

