---
title: Adjacent Domains and Mechanisms
description: Evidence for autonomous iteration advantages from game AI, autonomous driving, and medical screening, plus analysis of interruption costs and scaling laws.
---

# Adjacent Domains and Mechanisms

## 5. Adjacent Domains: Autonomous Iteration Beyond Coding

Autonomous iteration advantages are well-established in other domains.

In game AI, AlphaGo Zero, trained entirely via self-play, defeated a human-trained predecessor 100-0. DeepMind noted that a version trained with human games "learned more quickly, but actually performed more poorly in the long run." AlphaZero surpassed Stockfish after hours of self-play while searching orders of magnitude fewer positions per second. AlphaFold 2 achieved near-experimental accuracy in protein structure prediction.

In autonomous driving, Waymo's peer-reviewed analysis of 7.14 million rider-only miles found 0.41 injuries per million miles compared to the human benchmark of 2.78, an 85 percent reduction (Kusano et al., Traffic Injury Prevention, 2024). Independent analysis of Waymo Safety Impact data through mid-2025, covering approximately 100 million driverless miles, found 91 percent fewer serious-injury-or-worse crashes versus human drivers on the same roads (Slotkin, New York Times, November 2025; underlying data from Waymo Safety Impact dashboard, waymo.com/safety/impact/). (All underlying data originates from Waymo, though it has been peer-reviewed.)

In medical screening, the MASAI trial, a randomized controlled study of 105,934 women within the Swedish national screening programme, found AI-supported mammography reduced screen-reading workload by 44 percent compared with standard double reading (Lång et al., Lancet Oncology, 2023). Final results showed AI-supported screening achieved 80.5 percent sensitivity versus 73.8 percent for standard double reading, with equal specificity (Gommers et al., The Lancet 407, 2026).

Across these domains, three shared properties appear: a clear, machine-verifiable objective; tight feedback loops; and continuous iteration without interruption.

Coding tasks that resemble these conditions benefit most from autonomous loops.

**Sources:** Silver et al., Nature 550, 2017. Silver et al., Science 362, 2018. Jumper et al., Nature 596, 2021. Kusano et al., Traffic Injury Prevention, 2024. Slotkin, "The Data on Self-Driving Cars Is Clear," New York Times, November 2025. Waymo Safety Impact, waymo.com/safety/impact/, accessed February 12, 2026. Lång et al., Lancet Oncology, 2023; 24:936-944. Gommers et al., The Lancet 407, 2026.

---

## 6. Mechanisms: Interruption Costs and Scaling Laws

Two well-supported mechanisms explain observed differences.

First, developer interruption costs are substantial. Parnin and Rugaber's study of 10,000 recorded programming sessions from 86 programmers found that only 10 percent of sessions resumed coding within one minute of an interruption. Their presentation of the data indicates resumption lags commonly spanning tens of minutes, with substantial navigation required before editing resumes. Interactive prompting inherently introduces such interruptions. Autonomous loops do not.

Second, scaling laws show that performance improves predictably with additional compute and iteration. Kaplan et al. (2020) established power-law relationships spanning 7+ orders of magnitude. Hoffmann et al. (2022) refined this, showing their 70B-parameter Chinchilla outperformed 280B-parameter Gopher using the same compute budget by training on 4.7x more tokens. Each additional iteration an autonomous agent performs yields diminishing but reliable improvements.

AlphaEvolve (DeepMind, May 2025) demonstrated this concretely: its evolutionary coding agent optimized matrix multiplication kernels for Gemini training, achieving a 23 percent kernel speedup, with the AI improving the infrastructure that trains itself.

These mechanisms provide a plausible explanatory bridge between SWE-bench improvements and real-world productivity constraints.

**Sources:** Parnin & Rugaber, Software Quality Journal, 2011. Kaplan et al., arXiv:2001.08361, 2020. Hoffmann et al., NeurIPS 2022. Novikov et al., arXiv:2506.13131, May 2025.

---

*This analysis was created with AI assistance. Sources include peer-reviewed studies as detailed above. Data as of February 2026.*
