# SowiMotor — deploy & setup

The site is plain static files: no build step, no server code. It runs in two
modes, and it picks the mode automatically.

| | Demo mode (now) | Live mode (after setup) |
|---|---|---|
| Inventory lives in | the visitor's own browser | a shared database |
| Owner can add/edit/delete | yes | yes |
| Changes visible to | only that device | everyone |
| Login | any email/password | real password |
| Setup needed | none | ~10 min, see below |

**Right now the site is in demo mode.** That is deliberate: the owner can open
`/admin`, log in with anything, add and delete motorcycles, and watch them
appear on the public site — without anyone creating an account first. It's a
working preview, so it is safe to share as a pitch.

---

## Deploy to Netlify

1. Netlify → **Add new site** → **Import an existing project** → pick this
   GitHub repo and the `claude/web-in-git-1x1xbg` branch.
2. Leave the build command empty and publish directory as `.` —
   `netlify.toml` already sets this.
3. Deploy. You get:
   - `/` — the public site
   - `/admin` — the owner's inventory panel

Nothing else is required for the demo.

---

## Going live (only when the owner says yes)

Demo mode is per-device, so it is not what a real shop runs on. To make the
inventory shared and permanent, connect a free [Supabase](https://supabase.com)
project.

### 1. Create the project
supabase.com → sign up → **New project**. Any name/region. Save the database
password somewhere. Wait ~2 minutes.

The free tier is far more than this site needs (500MB database, 5GB/month
bandwidth, 50k users — the inventory is a few kilobytes and needs one login).
One caveat: free projects pause after 7 days with **zero** traffic and need a
click in the dashboard to resume. A live site with visitors never hits this,
and if it ever did, the site falls back to the static list rather than breaking.

### 2. Create the table
**SQL Editor** → **New query** → paste all of `supabase-setup.sql` → **Run**.

That creates the `bikes` table, sets the security rules (anyone can read,
only a logged-in user can write), and seeds it with the current 12 bikes.

### 3. Create the owner's login
**Authentication** → **Users** → **Add user** → **Create new user**. Enter the
owner's email and a password, and tick **Auto Confirm User**.

Then — important — **Authentication** → **Sign In / Providers** → turn **off**
"Allow new users to sign up", so nobody can create their own account against
the API.

### 4. Connect the site
**Project Settings** → **API**. Copy the **Project URL** and the **anon /
public** key (never the `service_role` key — that one must not be in
client-side code). Put both into `supabase-config.js`:

```js
window.SUPABASE_URL = "https://xxxxxxxx.supabase.co";
window.SUPABASE_ANON_KEY = "eyJ...";
```

Commit and push; Netlify redeploys automatically. The anon key is designed to
ship in client-side code — the row-level security rules from step 2 are what
protect the data — so committing it is fine.

### 5. Check it
Open `/admin`, log in with the owner's real account, edit something, and
confirm it shows on `/` — including from a different device, which is the part
demo mode could not do. The demo banner disappears on its own once the site is
connected.

---

## Files

| File | What it is |
|---|---|
| `index.html` | the public site (what Netlify serves at `/`) |
| `admin.html` | the owner's inventory panel (`/admin`) |
| `inventory-sync.js` | picks demo vs live mode and exposes one API to both pages |
| `supabase-config.js` | the two keys; empty = demo mode |
| `supabase-setup.sql` | run once in Supabase to create the table |
| `hifi-*.jsx`, `hifi.css` | the site itself |
| `admin.jsx`, `admin.css` | the admin panel |
| `SowiMotor Web/Wireframes.html` | earlier design-stage prototypes, not deployed |

## Known follow-ups before a real launch

- **Photos.** Every bike image is still a grey placeholder. Real photos are
  the single biggest visual upgrade, and the admin panel has no image upload
  yet — that needs Supabase Storage (also free tier) once live mode is on.
- **Page speed.** React and Babel load from a CDN and compile the JSX in the
  browser on every visit (~3MB, a second or two on mobile data). Fine for a
  demo; worth precompiling before a real launch.
- **Domain.** Netlify gives a `*.netlify.app` URL. A real domain
  (sowimotor.com) is a small extra step.
