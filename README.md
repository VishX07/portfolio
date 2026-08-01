# Vishal — Portfolio

Premium, macOS-inspired hybrid developer portfolio. Single-page home with all sections, plus dedicated case-study routes for each project and a full DSA dashboard.

## Stack
React + Vite, Tailwind CSS v4, Framer Motion, React Router, Lucide Icons.

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```
Output goes to `dist/`. Deploy `dist/` to Vercel, Netlify, or any static host.

## Structure
```
src/
  components/   Navbar, Dock, Terminal, GlassCard, Reveal, Stats
  sections/     Hero, About, Skills, Projects, DSAPreview, Timeline, Contact, Footer
  pages/        Home, ProjectDetail, DSAPage
  data/         projects.js, content.js  (edit these to update content)
```

## Notes
- Replace `/resume.pdf` in `public/` with your actual resume.
- Update social links and project GitHub/demo URLs in `src/data/projects.js` and `src/sections/Contact.jsx`.
- The floating terminal (bottom-left) responds to: help, about, skills, projects, dsa, resume, contact, whoami, open projects, open dsa, clear.
