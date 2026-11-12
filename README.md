# T+0 Stablecoin and Tokenization Advisory — website

Static site for T+0. No build step: open `index.html`, or serve the folder:

```bash
python3 -m http.server 4173
```

- `index.html` — home, with the layered infographic and the two money-flow maps
- `practices.html`, `about.html`, `contact.html`
- `assets/styles.css`, `assets/main.js` — shared styles, nav, infographic and contact form

Before going live, set `CONTACT_EMAIL` at the top of `assets/main.js`.
