# Synegro Digital Solutions — Fresh React + TypeScript build

A redesigned and responsive business website for **Synegro Digital Solutions**. It keeps the original service list, QR menu/ordering/booking information, pricing, process, and contact details, but uses a clean React + TypeScript structure and a rebuilt responsive CSS system.

## Features

- React + TypeScript + Vite (`src/App.tsx`, `src/main.tsx`, `src/styles.css`)
- Mobile menu, responsive grids, reduced-motion support, accessible focus states, and smooth in-page navigation
- Recognizable SVG brand marks for WhatsApp, Instagram and Gmail (not generic rings or emoji substitutes)
- Contact enquiry form using EmailJS, browser validation, a honeypot field, submission state, clear status messages, and client-side throttling
- Existing services and pricing preserved: Starter ₹999, Business ₹9,999, Premium ₹19,999, QR add-ons, and Launch Combo
- GitHub Actions workflow that builds the site and deploys the `dist/` folder to GitHub Pages
- No server-side credentials, Gmail passwords, or EmailJS private keys in the frontend

## 1. Run locally on Windows / VS Code

1. Extract the ZIP.
2. In VS Code, open the inner `Synegro-Digital-Solutions-Fresh` folder — the one containing `package.json`.
3. Open **Terminal → New Terminal** and run:

   ```powershell
   npm install
   npm run dev
   ```

4. Open **http://localhost:3000**.

Stop the local server with `Ctrl+C` in that terminal.

## 2. Complete EmailJS setup

The source ZIP available for this rebuild did not contain your EmailJS Public Key, so the key is intentionally a placeholder. Add the browser **Public Key** once:

1. Open `src/config.ts`.
2. Replace only `PASTE_YOUR_EMAILJS_PUBLIC_KEY_HERE` with your EmailJS **Public Key** from <https://dashboard.emailjs.com/admin/account>.
3. Keep the existing Service ID and Template ID unless you have since changed your EmailJS dashboard settings:
   - Service ID: `service_5z62wte`
   - Template ID: `template_hnu9luv`
4. Save the file, restart/refresh the site, and send a real test enquiry.
5. In EmailJS, confirm the template **To Email** is `synegrodigisolutions@gmail.com`, set **Reply To** to `{{email}}` if available, and check Email History plus Inbox/Spam.

The template should include these variables:

```text
New Website Enquiry — Synegro Digital Solutions

Name: {{name}}
Age: {{age}}
Phone: {{phone}}
Email: {{email}}
Service: {{service}}

Message:
{{message}}
```

If EmailJS restricts allowed origins/domains, allow `localhost` for local tests and your final published domain. The browser Public Key is meant for frontend use, but **never** put an EmailJS Private Key, Gmail password, or App Password in `src/config.ts` or any public file. For high-volume or high-risk form handling, use a server-side form endpoint instead of relying only on a browser form.

## 3. Publish to your GitHub Pages repository

This project includes `.github/workflows/deploy.yml`; GitHub Actions builds the TypeScript/React site and deploys the generated `dist/` output automatically after a push to `main`.

1. Open your existing repository: <https://github.com/Rajat-2007/Synegro-Digital-Solutions>.
2. Back up/download the current repository before replacing files.
3. Copy **the contents** of this extracted project folder into the root of your cloned repository, including the hidden `.github` folder. Do not upload `node_modules` or `dist`.
4. From the cloned repository folder, run:

   ```powershell
   npm install
   npm run build
   git add -A
   git commit -m "Rebuild Synegro site with React and TypeScript"
   git push origin main
   ```

5. In GitHub, open **Settings → Pages → Build and deployment → Source** and select **GitHub Actions**. Do this once if the repository is still configured for “Deploy from a branch”.
6. In the repository’s **Actions** tab, wait for “Build and deploy Synegro website” to finish successfully.
7. Open <https://rajat-2007.github.io/Synegro-Digital-Solutions/> and hard-refresh with `Ctrl+F5`.

The Vite build automatically uses the repository path for GitHub Pages; local development uses `/`.

## 4. Quick checks

```powershell
npm run typecheck
npm run build
```

If `npm run build` passes, the result is generated in `dist/`. GitHub Pages uses that build output through the workflow above.

## Important deployment note

This is a static frontend because GitHub Pages does not run Node/Express servers. EmailJS is used for the form delivery. There is no admin dashboard or database in this site package; do not assume an enquiry is stored unless the EmailJS send returns success and you can see it in EmailJS history.
