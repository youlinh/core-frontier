# Core Frontier Implementation Plan

> For agentic workers: execute inline using executing-plans; user explicitly requested immediate creation after completing the design discussion.

**Goal:** Deliver a playable 3D mobile-friendly combat/merge campaign.
**Architecture:** Static Three.js scene; pure campaign/economy module; DOM menu/HUD. Vendor renderer locally. Autosave only campaign progress.
**Tech Stack:** ES modules, Three.js, Node test runner.
**Spec:** ../../spec.md

## Global Constraints
- 1000 stages; weapon level cap 500; merge starts at stage 4.
- Defeat only when all three own core layers break; no battle timer.
- Currency separation and weekday claims match spec.

## Review Focus
- Early daily guns cannot bypass upgrade gating.
- Level 500 cannot merge beyond cap, and unaffordable purchases don't mutate funds.
- Duplicate weekday claims and Shanghai midnight boundaries.
- Corrupt saved inventory and nonfinite currency values.
- Respawn does not trigger loss; reset battle replaces all entities.

### Task 1: Campaign/economy
- [x] Add failing tests for unlock sequence, merge lock/cap, currencies, daily claims and save validation; run.
- [x] Implement dist/model.js exports and pass tests.

### Task 2: Playable game and menus
- [x] Implement dist/index.html, style.css, game.js with 3D scene, shooting, allies/enemies, three sequential cores, respawn, controls and responsive menus.
- [x] Link inventory, silver/gold shop, core upgrade, skins, weekday claims and campaign to pure model.
- [x] Browser-check start, movement, combat, armoury, shop, daily claims; inspect viewport at phone size.

### Task 3: Ship
- [x] Run complete tests and JS syntax checks, correct observed failures.
- [ ] Push exact sources, package and publish private Site; verify returned deployment success.
