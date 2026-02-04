# How to Update Content

Since the application is now completely static and does not rely on a database, all content is managed through a single configuration file.

## Data Source

**File Location:** `client/src/lib/data.ts`

This file contains all the data for Projects, Skills, Experience, and Certifications. To update any content, you simply need to edit this file.

## Updating Specific Sections

### 1. Projects
Find the `export const projects = [...]` array.
To add a new project, append a new object to the array:

```typescript
{
  id: "unique-id-here", // You can use any unique string
  title: "My New Project",
  description: "Description of the project...",
  techStack: ["React", "TypeScript", "Node.js"],
  demoUrl: "https://demo-link.com", // Optional
  repoUrl: "https://github.com/link", // Optional
  featured: true // Set to true to show on the main page
}
```

### 2. Skills
Find the `export const skills = [...]` array.
Each skill has a proficiency level (1-5) and a category.

```typescript
{
  id: "unique-id",
  name: "New Skill",
  category: "Frontend", // or "Backend", "Security", "Tools", etc.
  proficiency: 4
}
```

### 3. Experience
Find the `export const experience = [...]` array.

```typescript
{
  id: "unique-id",
  role: "Job Title",
  company: "Company Name",
  duration: "Jan 2024 - Present",
  description: "Description of responsibilities..."
}
```

### 4. Certifications
Find the `export const certifications = [...]` array.

**Adding PDFs:**
If you want to display a PDF for a certificate:
1. Place the PDF file in `client/public/certifications/`.
2. Reference it in the `pdfUrl` field.

```typescript
{
  id: "unique-id",
  name: "Certificate Name",
  issuer: "Issuer Name",
  date: "Jan 2024",
  description: "Description...",
  pdfUrl: "/certifications/MyCertificate.pdf", // Path relative to public folder
  contentType: "application/pdf"
}
```

## Applying Changes

1. Save `client/src/lib/data.ts`.
2. The development server (if running) will automatically reload with the new content.
3. If deploying, rebuild the application using `npm run build`.

## Server & Troubleshooting

The server is kept only to satisfy the application's server entry point and returns a 404 for legacy API calls under `/api/*`.

If you see an error like:

```
PathError [TypeError]: Missing parameter name at index <n>: /api/*
```

it's caused by using wildcard route strings (for example `/api/*`) that the project's version of `path-to-regexp` rejects. The easiest, reliable fix is to use a RegExp route in `server/routes.ts`, for example:

```ts
app.get(/^\/api\/.*/, (req, res) => {
  res.status(404).json({ message: "API is deprecated. Application is now static." });
});
```

You can also try an explicit capture (support varies by `path-to-regexp` version):

```ts
app.get('/api/:path(.*)', (req, res) => { /* ... */ });
```

But the RegExp approach works consistently with the current dependencies. If `npm run dev` fails with the PathError, update the `/api` route as shown above and re-run the server.

---

## Extended Content Guide — Full walkthrough ✨

This section expands on the short instructions above and provides step-by-step guidance for updating every visible section of the website.

### Files to know
- **Primary content file:** `client/src/lib/data.ts` — all site content lives here.
- **Public assets:** `client/public/` — images (`/images/`) and certificates (`/certifications/`).
- **Types & validation:** `shared/schema.ts` — follow these types to avoid TypeScript errors.

### Projects (complete checklist)
1. Open `data.ts` → `projects` array.
2. Add an entry with fields: `id`, `title`, `description`, `techStack` (array). Optional: `demoUrl`, `repoUrl`, `featured`.
3. Use a descriptive `id` (kebab-case). Keep `description` concise (1–2 lines).
4. Save and preview with `npm run dev`.

Example:
```ts
{
  id: "my-project",
  title: "My Project",
  description: "Short summary of what the project does and why it's interesting.",
  techStack: ["React", "TypeScript"],
  repoUrl: "https://github.com/you/my-project",
  featured: true
}
```

### Skills
- Edit `skills` array. Fields: `id`, `name`, `category`, `proficiency` (1–5).
- Keep categories consistent (Frontend/Backend/Tools/etc.).

### Experience
- Edit `experience` array. Fields: `id`, `role`, `company`, `duration`, `description`.
- Use short bullets or a concise paragraph for responsibilities and accomplishments.

### Certifications
- Edit `certifications` array. Good fields: `id`, `name`, `issuer`, `date`, optional `description`, `imageUrl`, `pdfUrl`, `contentType`.
- Upload PDFs/images to `client/public/certifications/` and reference them as `/certifications/your-file.pdf`.

Example:
```ts
{
  id: "cert-1",
  name: "Cert Name",
  issuer: "Organization",
  date: "Apr 2024",
  pdfUrl: "/certifications/cert-name.pdf",
  contentType: "application/pdf"
}
```

### Profile & Contact
- Update bio and role in `data.ts`.
- If changing contact form fields, mirror validation updates in `shared/schema.ts`.

### Images & media best-practices
- Store images under `client/public/images/`.
- Use optimized formats (WebP/AVIF when possible). Resize thumbnails for better performance.
- Reference with leading slash: `/images/avatar.webp`.

### Validation & Type Safety
- After edits, your editor's TypeScript checks will flag shape and type errors (fix them as per `shared/schema.ts`).
- If you want automated checks, we can add a simple script that validates `data.ts` against the schema before commits.

### Preview & deploy
- Preview locally: `npm run dev` (hot reload on save).
- Build for production: `npm run build`.
- Quick checklist: types validated, assets present, featured flags set, previewed.

### Troubleshooting quick tips
- If `npm run dev` crashes with a PathError related to `/api/*`, switch the route to a RegExp (see above).
- For missing images, confirm the asset path and file names in `client/public`.
- For TypeScript issues, check `shared/schema.ts` for expected properties.

---

If you'd like, I can:
- Validate `data.ts` automatically with a small script, or
- Add templates for Projects/Experience entries to speed up content edits.

---

Happy to polish any section further (shorter examples, PR template, or a validation script). 🚀
