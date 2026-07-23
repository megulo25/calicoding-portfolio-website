# Deploying to GitHub Pages

This guide covers deploying the portfolio as a static site to **GitHub Pages**.

---

## Prerequisites

| Requirement | Version                       |
| ----------- | ----------------------------- |
| Bun         | ≥ 1.0                         |
| Node.js     | ≥ 18 (used by GitHub Actions) |
| Git         | any recent version            |

The repository must be hosted on GitHub (public **or** private with GitHub Pro / Team / Enterprise).

---

## What Was Configured

### 1. Static Export (`next.config.ts`)

```ts
output: "export"
```

This tells Next.js to produce a fully static site in the `out/` directory instead of requiring a Node.js server. Image optimization is disabled (`images.unoptimized: true`) since there is no server to process images at runtime.

### 2. GitHub Actions Workflow (`.github/workflows/deploy.yml`)

An automated CI/CD pipeline that:

1. Checks out the repo on every push to `main` (or manual trigger).
2. Installs dependencies with `bun install --frozen-lockfile`.
3. Runs the build (`bun run build`) — which includes type-checking and linting via the `prebuild` script.
4. Uploads the `out/` directory as a Pages artifact.
5. Deploys to GitHub Pages.

### 3. `.nojekyll` File (`public/.nojekyll`)

Prevents GitHub Pages from processing the output through Jekyll, which would strip files/folders starting with `_` (Next.js generates `_next/`).

---

## Step-by-Step Deployment

### 1. Enable GitHub Pages in Repository Settings

1. Go to your repository on GitHub: **Settings → Pages**.
2. Under **Build and deployment → Source**, select **GitHub Actions**.
3. Save.

### 2. Push to `main`

```bash
git add .
git commit -m "Configure static export and GitHub Pages deployment"
git push origin main
```

The workflow triggers automatically. Monitor progress under the **Actions** tab.

### 3. Verify

Once the workflow completes, your site will be live at:

```
https://<your-username>.github.io/<repo-name>/
```

For this repository:

```
https://megulo25.github.io/calicoding-portfolio-website/
```

> **Note:** The first deployment may take a few minutes to propagate.

---

## Using a Custom Domain

If you want to serve from a custom domain (e.g., `meguloabebe.com`):

### 1. Add a CNAME File

Create `public/CNAME` with your domain:

```
meguloabebe.com
```

This gets copied to the `out/` directory during build and tells GitHub Pages which domain to serve.

### 2. Configure DNS

Add these DNS records with your domain registrar:

| Type  | Name | Value              |
| ----- | ---- | ------------------ |
| A     | @    | 185.199.108.153    |
| A     | @    | 185.199.109.153    |
| A     | @    | 185.199.110.153    |
| A     | @    | 185.199.111.153    |
| CNAME | www  | megulo25.github.io |

### 3. Enable HTTPS

In **Settings → Pages**, check **Enforce HTTPS** (GitHub provisions a TLS certificate automatically via Let's Encrypt).

### 4. Update Base URL

If using a custom domain, update the URL in `src/data/company.ts`:

```ts
url: "https://meguloabebe.com/"
```

This value flows into the sitemap, robots.txt, Open Graph tags, JSON-LD structured data, and the `metadataBase` in the root layout.

---

## Deploying Under a Subpath (No Custom Domain)

When serving from `https://<user>.github.io/<repo>/`, assets need the repository name as a path prefix. Add `basePath` to `next.config.ts`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/calicoding-portfolio-website",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

> **Important:** `basePath` is automatically prepended to all `<Link>` and `next/image` `src` paths. However, any hardcoded absolute paths in your code (e.g., `/images/...` in project data) will need to be prefixed manually or use a helper.

If using a custom domain at the root (no subpath), **do not** set `basePath`.

---

## Local Verification

Test the static export locally before pushing:

```bash
# Build the static site
bun run build

# Serve the output directory
bunx serve out
```

Open `http://localhost:3000` (or the port `serve` reports) and verify:

- All pages render correctly.
- Images load.
- Navigation between pages works.
- 3D canvas (Three.js) initializes.
- Page transitions animate.

---

## Troubleshooting

| Issue                                  | Solution                                                                                                                                                                                                                                                                                    |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **404 on page refresh**                | GitHub Pages doesn't support client-side routing fallbacks by default. Next.js static export generates individual HTML files for each route, so direct navigation should work. If you see 404s, verify the `out/` directory contains the expected HTML files (e.g., `out/work/index.html`). |
| **Missing styles / JS (`_next/` 404)** | Ensure `public/.nojekyll` exists. Without it, GitHub Pages ignores `_next/`.                                                                                                                                                                                                                |
| **Images broken under subpath**        | If using `basePath`, hardcoded image paths in data files (like `thumbnail: "/images/..."`) won't be rewritten automatically. Prefix them with the base path or use `next/image` which handles it.                                                                                           |
| **Build fails on type/lint errors**    | The `prebuild` script runs `typecheck` and `lint`. Fix all errors before pushing. Run `bun run check` locally to catch them early.                                                                                                                                                          |
| **Custom domain not working**          | DNS propagation can take up to 48 hours. Verify records with `dig meguloabebe.com` and check the **Pages** settings for any error messages.                                                                                                                                                 |

---

## Production Checklist

- [ ] `bun run check` passes (types + lint)
- [ ] `bun run build` completes without errors
- [ ] Static output in `out/` verified locally
- [ ] GitHub Pages source set to **GitHub Actions**
- [ ] First deployment successful (green checkmark in Actions tab)
- [ ] All pages accessible and rendering correctly
- [ ] Open Graph / SEO metadata correct (test with [Open Graph Debugger](https://developers.facebook.com/tools/debug/))
- [ ] Custom domain configured (if applicable)
- [ ] HTTPS enforced
