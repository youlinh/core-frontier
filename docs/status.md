# Implementation record

Historical record copied from the original Sites source. The independent local/GitHub deployment is described in `deployment.md`; the publication-pending statements below describe the earlier Sites build only.

Task 1 complete: model tests verified unlock order, stage-4 merge gate, 500 cap, currencies, Shanghai weekdays, duplicate claims, corrupted saves, three-layer cores, stage 1000 cap, gold shop gun-level gate and daily inventory visibility.
Task 2 complete: 3D scene, AI, respawn, raycast damage, mines/grenades, camera, mobile/desktop inputs, menu and economy integration. Browser QA at 390px and desktop widths; WebGL disabled in test browser, CPU fallback used and checked. Core damage decreased enemyHP in actual UI. No full 1000-stage playthrough.
Ruling: temporary economy values use 25 silver/sec for first gun, exponential level scaling and visible item costs; user explicitly left tuning to creation/试玩.
Ruling: 1000 procedural stages and 500 parametric weapon levels, four environment themes; unique photoreal assets require later art work.
Independent review found and fixed respawn negative countdown, touch firing release, stale affordability/date controls, persisted skin and owned-resource cleanup. Review smoke-tested forced-fallback scene startup and projection. Fallback skin coloring fixed afterward.
Task 3: all 13 tests and syntax checks passed; source packaging and private publication are the remaining steps.
