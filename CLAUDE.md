# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **RPG Maker MV** game (吞食天地 - "Tunshi Tianguo", a Chinese Three Kingdoms themed RPG) deployed as a static site on Cloudflare Pages.

- **Live Game**: https://tunshi-sanguo.pages.dev/
- **GitHub**: https://github.com/Starktomy/tunshi

## Deployment

Changes pushed to `main` branch on GitHub automatically deploy to Cloudflare Pages. No manual deployment needed.

```bash
git add .
git commit -m "description"
git push
```

## Project Structure

```
├── index.html          # Game entry point
├── editor.html         # Save file editor tool
├── data/               # RPG Maker MV game data (JSON)
│   ├── Actors.json     # Character definitions
│   ├── Map*.json       # Map data
│   ├── Enemies.json    # Enemy definitions
│   ├── Items.json      # Item definitions
│   └── ...
├── js/
│   ├── rpg_core.js     # RPG Maker core engine
│   ├── rpg_managers.js # Game managers
│   ├── rpg_objects.js  # Game objects
│   ├── rpg_scenes.js   # Scene definitions
│   ├── rpg_sprites.js  # Sprite system
│   ├── rpg_windows.js  # UI windows
│   ├── plugins.js      # Combined plugin file
│   └── plugins/       # Individual plugin files (438 plugins)
├── audio/              # Game audio (bgm, bgs, me, se)
├── img/                # Game images (animations, battlebacks, characters, faces, etc.)
└── fonts/             # Game fonts
```

## Save File Editor (editor.html)

The editor modifies browser localStorage save files. Key technical details:

- **Save Key Format**: `RPG 吞食天地 File{N}` (localStorage)
- **Global Info Key**: `RPG 吞食天地 Global`
- **Compression**: LZString Base64 compression
- **Party Control**: `party._actors['@a']` contains array of actor IDs currently in party (max 4)

RMMV arrays are serialized with `@a` key:
```json
{"@c":12418,"@a":[1,3,2]}  // Actor IDs in party
```

## Key Technologies

- **Engine**: RPG Maker MV (JavaScript)
- **Rendering**: Pixi.js (via RPG Maker)
- **Compression**: lz-string (for save data)
- **Hosting**: Cloudflare Pages
- **Repository**: GitHub (SSH: git@github.com:Starktomy/tunshi.git)
