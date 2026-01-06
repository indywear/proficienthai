-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users Table
create table public.users (
  id uuid primary key default uuid_generate_v4(),
  line_id text unique not null,
  display_name text not null,
  student_id text,
  university text,
  level text check (level in ('Beginner', 'Intermediate', 'Advanced')),
  points int default 0,
  xp int default 0,
  streak int default 0,
  last_activity_at timestamp with time zone, -- changed from auth.token with time zone, -- changed from auth.token
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- Profile Details
  metadata jsonb default '{}'::jsonb -- Can store nationality, email, etc.
);

-- Tasks Table
create table public.tasks (
  id uuid primary key default uuid_generate_v4(),
  week int not null,
  title text not null,
  description text,
  content_url text, -- Link to reading material
  rubric jsonb not null, -- { criteria: [{ name: string, max_score: int }] }
  is_active boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Submissions Table
create table public.submissions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) not null,
  task_id uuid references public.tasks(id) not null,
  content text not null,
  feedback text, -- AI generated feedback summary
  score_details jsonb, -- { grammar: 5, vocab: 4, total: 9 }
  total_score int,
  submitted_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Activity Logs (for Gamification & Analytics)
create table public.activity_logs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) not null,
  action_type text not null, -- 'PRACTICE', 'FEEDBACK_REQUEST', 'SUBMIT_TASK', 'LOGIN'
  points_earned int default 0,
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Notification Settings (Smart Nudge)
create table public.notification_settings (
  user_id uuid references public.users(id) primary key,
  enabled boolean default true,
  silent_hours_start int default 22, -- 22:00
  silent_hours_end int default 8, -- 08:00
  preferred_time int, -- inferred by AI or set manually
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies (Row Level Security) - Basic Setup
alter table public.users enable row level security;
alter table public.tasks enable row level security;
alter table public.submissions enable row level security;

-- Policies (Allow public access for now via service role or anon if needed, but standard is restrictive)
-- For a Bot, we often use Service Role, so RLS might not block the bot. 
-- But for Dashboard (Client side), we need correct policies.
create policy "Allow public read users" on public.users for select using (true);
create policy "Allow public read tasks" on public.tasks for select using (true);
