-- SowiMotor — inventory database setup.
-- Run this once in your Supabase project's SQL editor (Project → SQL Editor → New query → paste → Run).
-- Safe to re-run: table/policy creation is guarded, and the seed insert skips rows that already exist.

create table if not exists bikes (
  id text primary key,
  name text not null,
  brand text not null,
  type text not null,
  year int not null,
  km int not null,
  price int not null,
  cc int not null,
  cv int not null,
  license text not null,
  tag text,
  color text,
  images jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

-- if you ran an earlier version of this script, add the photos column:
alter table bikes add column if not exists images jsonb not null default '[]'::jsonb;

alter table bikes enable row level security;

drop policy if exists "Public can view bikes" on bikes;
create policy "Public can view bikes"
  on bikes for select
  to anon, authenticated
  using (true);

drop policy if exists "Authenticated can insert bikes" on bikes;
create policy "Authenticated can insert bikes"
  on bikes for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated can update bikes" on bikes;
create policy "Authenticated can update bikes"
  on bikes for update
  to authenticated
  using (true) with check (true);

drop policy if exists "Authenticated can delete bikes" on bikes;
create policy "Authenticated can delete bikes"
  on bikes for delete
  to authenticated
  using (true);

-- Seed with the current showroom inventory (matches hifi-data.jsx at the time this was written).
insert into bikes (id, name, brand, type, year, km, price, cc, cv, license, tag, color, images, created_at) values
  ('z900',  'Kawasaki Z900',      'Kawasaki',   'Naked',   2021, 12400, 7490,  948,  125, 'A2', 'Recién entrada',  'Verde lima',      '["photos/z900.jpg"]'::jsonb, now() + interval '0 second'),
  ('mt07',  'Yamaha MT-07',       'Yamaha',     'Naked',   2020, 18200, 5950,  689,  73,  'A2', null,              'Negro mate',      '["photos/mt07.jpg"]'::jsonb, now() + interval '1 second'),
  ('cb650', 'Honda CB650R',       'Honda',      'Naked',   2022, 6800,  8200,  649,  95,  'A',  'Garantía 12m',    'Rojo grand prix', '["photos/cb650.jpg"]'::jsonb, now() + interval '2 second'),
  ('monst', 'Ducati Monster',     'Ducati',     'Naked',   2019, 22500, 9150,  821,  109, 'A',  null,              'Rojo Ducati',     '["photos/monst.jpg"]'::jsonb, now() + interval '3 second'),
  ('pcx',   'Honda PCX 125',      'Honda',      'Scooter', 2021, 9100,  2890,  125,  12,  'A1', 'A1',              'Plata',           '["photos/pcx.jpg"]'::jsonb, now() + interval '4 second'),
  ('xsr7',  'Yamaha XSR 700',     'Yamaha',     'Custom',  2020, 14300, 6200,  689,  73,  'A2', 'Top ventas',      'Forest green',    '["photos/xsr7.jpg"]'::jsonb, now() + interval '5 second'),
  ('gs',    'BMW R 1250 GS',      'BMW',        'Trail',   2019, 28000, 14500, 1254, 136, 'A',  null,              'Triple negro',    '["photos/gs.jpg"]'::jsonb, now() + interval '6 second'),
  ('duke',  'KTM Duke 390',       'KTM',        'Naked',   2022, 4500,  4890,  373,  44,  'A2', 'A2',              'Naranja KTM',     '["photos/duke.jpg"]'::jsonb, now() + interval '7 second'),
  ('gsxs',  'Suzuki GSX-S 750',   'Suzuki',     'Sport',   2018, 31000, 5490,  749,  114, 'A',  null,              'Azul',            '["photos/gsxs.jpg"]'::jsonb, now() + interval '8 second'),
  ('tmax',  'Yamaha TMAX 530',    'Yamaha',     'Scooter', 2019, 26000, 7290,  530,  46,  'A2', null,              'Negro',           '["photos/tmax.jpg"]'::jsonb, now() + interval '9 second'),
  ('v7',    'Moto Guzzi V7',      'Moto Guzzi', 'Custom',  2020, 11800, 7990,  744,  65,  'A2', 'Clásica',         'Crema',           '["photos/v7.jpg"]'::jsonb, now() + interval '10 second'),
  ('ninja', 'Kawasaki Ninja 650', 'Kawasaki',   'Sport',   2021, 9700,  6890,  649,  68,  'A2', null,              'Verde lima',      '["photos/ninja.jpg"]'::jsonb, now() + interval '11 second')
on conflict (id) do nothing;


-- ── photo storage ────────────────────────────────────────────────
-- Bike photos are uploaded to a public Storage bucket; the bikes table only
-- keeps the file paths. Public read so visitors see them, authenticated
-- write so only the logged-in owner can add or remove them.

insert into storage.buckets (id, name, public)
values ('bike-photos', 'bike-photos', true)
on conflict (id) do nothing;

drop policy if exists "Public can view bike photos" on storage.objects;
create policy "Public can view bike photos"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'bike-photos');

drop policy if exists "Authenticated can upload bike photos" on storage.objects;
create policy "Authenticated can upload bike photos"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'bike-photos');

drop policy if exists "Authenticated can delete bike photos" on storage.objects;
create policy "Authenticated can delete bike photos"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'bike-photos');
