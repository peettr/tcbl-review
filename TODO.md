# TCBL Interactive Publication — Work Plan

## Current Status (2026-03-09 10:45 EDT)
- Day 2 of 10-day timeline
- index.qmd: 242KB, equations numbered, citations linked, figures sized
- Server: python3 http.server 8888 (project root)
- **CRITICAL BUG**: Quarto project-level render produces empty `_site/` — navbar/sidebar missing

## Priority Tasks (in order)

### P0: Fix Quarto project build ✅
- Fixed by adding explicit `render:` list to _quarto.yml
- `_site/` now contains all pages with navbar, sidebar, dark mode, footer, search

### P1: Verify 3 fixes ✅
- [x] Equation numbering renders correctly — (1) through (19) visible
- [x] Figures display (3 images loaded)
- [x] 257 citation links all working (href="#ref-author-year")

### P2: Content polish ⬜
- [ ] Check all 3 figure images display correctly (image1, image7, image8)
- [ ] Verify inline math ($...$) renders throughout
- [ ] Fix any broken cross-references
- [ ] Add figure captions where missing

### P3: Chinese translation ⬜
- [ ] Translate full article (use AI)
- [ ] Set up i18n switching in navbar

### P4: Deploy ⬜
- [ ] Set up GitHub repo (need `gh auth login`)
- [ ] GitHub Pages or Vercel
- [ ] Custom domain (optional)

### P5: Coze AI agent ⬜
- [ ] Create 菲菲分身 on Coze/扣子
- [ ] Feed review content as knowledge base
- [ ] Get embed code
- [ ] Replace placeholder in chatbot.html

### P6: Literature visualization ⬜
- [ ] literature.qmd already has Plotly charts
- [ ] Add citation network (D3.js)
- [ ] Connect to Zotero data

## Completed ✅
- [x] Word → Markdown conversion (168K chars)
- [x] 123 images WMF → PNG
- [x] 121 MathType equations → LaTeX
- [x] 19 display equations numbered
- [x] 257 citations linked to references
- [x] 198 references with anchor IDs
- [x] mindmap.qmd (interactive Markmap)
- [x] literature.qmd (Plotly timeline)
- [x] slides.qmd (Reveal.js 12 slides)
- [x] styles.css (figure sizing fix)
