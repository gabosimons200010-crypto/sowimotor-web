# Inventory admin — setup

The site now has a real admin panel (`admin.html`) where the SowiMotor owner
can add, edit, and delete motorcycles themselves, without touching code.
Changes save to a small hosted database (Supabase) and show up on the public
site (`SowiMotor Final.html`) for every visitor.

This only took effect on the "Final" hi-fi version of the site. The
Wireframes/Web prototype versions still use the old hardcoded list.

None of this is wired up yet — it needs a one-time, ~10 minute setup below.
Until you do this, `admin.html` shows a "not connected yet" message and the
public site keeps showing the static 12-bike list exactly as before, so
nothing is broken in the meantime.

## 1. Create a Supabase project

[Supabase](https://supabase.com) is a free hosted Postgres database with a
ready-made API and login system — no server to run yourself.

1. Go to supabase.com → sign up (free) → **New project**.
2. Pick any name/region, set a database password (you won't need it again —
   save it somewhere just in case), wait ~2 minutes for it to provision.

## 2. Create the `bikes` table

1. In the project, open **SQL Editor** → **New query**.
2. Paste the entire contents of `supabase-setup.sql` (in this repo) and click
   **Run**.
3. This creates the `bikes` table, sets up the security rules (anyone can
   view bikes, only a logged-in user can add/edit/delete them), and seeds it
   with the current 12 motorcycles so you start from today's live inventory.

## 3. Create the owner's login

This is the account the owner will use to sign in at `admin.html`.

1. **Authentication** → **Users** → **Add user** → **Create new user**.
2. Enter the owner's email and a password. Check "Auto Confirm User" so it's
   usable immediately.
3. Important — stop strangers from creating their own accounts: go to
   **Authentication** → **Sign In / Providers** (or **Settings**, depending
   on your Supabase version) and turn **off** "Allow new users to sign up".
   The admin panel only has a login form, not a signup form, but without this
   setting someone could still create an account directly against the API.

You can repeat step 1 later to add more staff logins if needed.

## 4. Connect the site to your project

1. In Supabase: **Project Settings** → **API**.
2. Copy the **Project URL** and the **anon / public** key (not the
   `service_role` key — that one must never be used in client-side code).
3. Open `supabase-config.js` in this repo and fill in:
   ```js
   window.SUPABASE_URL = "https://xxxxxxxx.supabase.co";
   window.SUPABASE_ANON_KEY = "eyJ...";
   ```
4. Save, commit, and deploy as usual. The anon key is designed to be public
   (it's meant to ship in client-side code) — the security rules from step 2
   are what actually protect the data, so it's fine to commit this file.

## 5. Try it

1. Open `admin.html` on the deployed site, log in with the owner account.
2. You should see the 12 seeded motorcycles. Try editing one, adding a new
   one, and deleting one.
3. Open `SowiMotor Final.html` (or reload it) — the changes should appear
   there too.

## Notes for whoever hosts this

- Everything is still plain static files — no build step, no server code.
  `admin.html` just needs to be deployed alongside the rest of the site.
- Consider not linking to `admin.html` from the public nav — it's reachable
  by anyone who knows the URL, but nothing sensitive is exposed there before
  login (login is required to see or change any data).
- If you'd rather not manage a Supabase project yourself, this is also a
  reasonable point to hand the credentials step to whoever ends up hosting
  the site for the client.
