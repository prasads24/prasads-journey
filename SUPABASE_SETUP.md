# Setting Up the Endorsement System (Supabase)

This powers the "Endorse Me" feature — visitors submit endorsements, which sit
as "pending" until you approve them in the Supabase dashboard. Nothing shows
publicly without your approval.

## 1. Create a free Supabase project

1. Go to https://supabase.com and sign up (free tier is plenty for this).
2. Click **New Project**. Pick any name (e.g. `prasads-journey`), set a
   database password (save it somewhere), and choose a region close to you.
3. Wait ~2 minutes for the project to finish provisioning.

## 2. Create the `endorsements` table

In your new project, go to the **SQL Editor** (left sidebar) → **New query**,
paste this in, and click **Run**:

```sql
create table endorsements (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  title text not null,
  company text not null,
  relationship text not null,
  text text not null,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

alter table endorsements enable row level security;

-- Anyone can submit a new endorsement, but it's always forced to 'pending'
-- regardless of what they send — they cannot make it appear approved.
create policy "Public can submit pending endorsements"
on endorsements for insert
to anon
with check (status = 'pending');

-- Anyone can read endorsements, but ONLY ones marked 'approved'.
create policy "Public can read approved endorsements"
on endorsements for select
to anon
using (status = 'approved');
```

This is the entire security model — enforced by the database itself, not by
the website's code. Even a technically savvy visitor poking at the API
directly cannot bypass moderation.

## 3. Get your API keys

Go to **Project Settings** (gear icon) → **API**. You'll need two values:

- **Project URL** (looks like `https://xxxxx.supabase.co`)
- **anon public** key (a long string starting with `eyJ...`)

Both of these are safe to make public — they're meant to be embedded in
frontend code. The actual protection comes from the RLS policies above, not
from keeping these secret.

## 4. Add them to Vercel

1. In your Vercel project → **Settings** → **Environment Variables**.
2. Add two variables:
   - `VITE_SUPABASE_URL` → your Project URL
   - `VITE_SUPABASE_ANON_KEY` → your anon public key
3. Apply to **Production** (and Preview/Development if you want it working
   on preview deployments too).
4. Redeploy (or just push your next commit — it'll pick up the new env vars).

For local development, also create a `.env.local` file in the project root
with the same two lines (this file is already gitignored, so it won't get
committed):

```
VITE_SUPABASE_URL="https://xxxxx.supabase.co"
VITE_SUPABASE_ANON_KEY="eyJ..."
```

## 5. Approving submissions

Whenever someone submits an endorsement:

1. Go to your Supabase project → **Table Editor** → `endorsements`.
2. You'll see new rows with `status = pending`.
3. Read it, and if you're happy with it, click into that row's `status`
   cell and change it to `approved`.
4. It'll show up on your live site within a few seconds (next time someone
   loads the page — there's no need to redeploy).

To reject one, just leave it as `pending` forever, or delete the row.

## Notes

- There's no email notification when someone submits — you'll need to check
  the Table Editor periodically. (If you want notifications later, that's a
  reasonably small follow-up feature — just let me know.)
- The free Supabase tier covers far more traffic than a personal portfolio
  site will ever see.
