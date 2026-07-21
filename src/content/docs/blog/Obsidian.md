---
title: Obsidian
date: 2026-07-21
---

Just some quick notes on installing Obsidian in KVM.
My server doesn't have a gpu which Obsidian tries to use by default?
Just pass it the --disable-gpu option and save yourself a headache.
I wasted a bunch of time trying to install drivers.

```
obsidian --disable-gpu
```

AI (haiku 4.5) actually worked for once with the first solution.
