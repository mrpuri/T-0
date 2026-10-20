# T+0 Digital Asset Consulting — website

Static site for T+0. No build step: open `index.html`, or serve the folder:

```bash
python3 -m http.server 4173
```

- `index.html` — home, with the layered architecture infographic below the hero
- `services.html`, `about.html`, `contact.html`
- `assets/styles.css`, `assets/main.js` — shared styles, nav, infographic and contact form

Before going live, set `CONTACT_EMAIL` at the top of `assets/main.js`.
