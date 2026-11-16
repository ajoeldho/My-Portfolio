# Portfolio — Ajo Eldho Baby

Static portfolio site. No build step, no dependencies, no framework. Runs on any static host.

## Update content

Everything on the page comes from **one file: `content/site-data.js`**.

| To change | Do this |
|---|---|
| Any text | Edit the value between the quotes in `content/site-data.js` |
| Profile photo | Replace `assets/images/profile.jpg` (square, 600×600 or larger), or set `photo:` to a new path |
| Add a project | Copy one `{ ... }` block inside `projects: [ ]`, paste it, edit the values |
| Project picture | Put the image in `assets/images/projects/`, set `image: "assets/images/projects/your-file.jpg"` (16:7 landscape works best) |
| Project link | Set `link: "https://..."` |
| Add a job / skill group / education | Copy a block in `experience`, `skills` or `education` and edit |
| Resume download button | Put a PDF in `assets/resume/`, set `resume: "assets/resume/your-file.pdf"`. Empty = button hidden |
| Hide something | Set the field to `""` or delete the block |
| Years of experience | Automatic, calculated from `careerStart` |
| Project filter buttons | Automatic, built from each project's `category` |
| Colours / fonts | Edit the `:root` block at the top of `css/styles.css` |
| Browser tab title, Google description | Edit the `<title>` and `<meta name="description">` lines in `index.html` |

Rules for editing `site-data.js`:

- Keep text inside double quotes. To use a double quote inside text, write `\"`.
- Keep the comma after each `{ ... }` block and each line.
- If the page goes blank after an edit, a comma, quote or bracket is missing. Open the browser console (F12) for the line number.

You can edit directly on github.com (open the file, click the pencil icon, commit).

## Preview locally

Double-click `index.html`, or run a local server:

```bash
python3 -m http.server 4173
```

Then open http://localhost:4173.

## Publish

Any static host works. No build command; publish directory is the repository root.

- **GitHub Pages**: repo Settings → Pages → Source "Deploy from a branch" → pick the branch, folder `/ (root)`.
- **Netlify / Vercel / Cloudflare Pages**: import the repo, leave build command empty, output directory `.`.

## Structure

```
index.html              page shell + SEO tags
content/site-data.js    ALL content (edit this)
css/styles.css          design
js/app.js               renders the page from site-data.js
assets/images/          profile.jpg, projects/
assets/resume/          optional CV PDF
```
