# RozgarSaathi — Hackathon Plan
**Problem ID:** TGPDS-02 | **Track:** Web & App Development

---

## Problem Summary

Daily wage workers (plumbers, electricians, painters, mazdoors) lose workdays waiting at nakas with zero digital visibility. RozgarSaathi is a **hyperlocal, zero-commission gig board** where workers register with skill tags + availability, and households/contractors post same-day jobs by location.

---

## Core Features (MVP Scope)

| # | Feature | Priority |
|---|---------|----------|
| 1 | Worker registration with skill tags & availability toggle | P0 |
| 2 | Job posting by households/contractors (location + skill needed) | P0 |
| 3 | Geo-based job feed (nearest jobs first) | P0 |
| 4 | Skill filter on job feed | P0 |
| 5 | WhatsApp-style contact flow (click-to-chat / direct call) | P1 |
| 6 | Aadhaar OTP verified worker badge | P1 |
| 7 | Worker profile page with past jobs / rating | P2 |

---

## Tech Stack

### Frontend
- **React 19 + Vite** — fast dev setup you already know
- **Tailwind CSS** — rapid UI styling
- **React Router v6** — page routing

### Backend
- **Node.js + Express** — REST API
- **MongoDB Atlas** (free tier) — workers, jobs, users collections
- **Mongoose** — schema + validation

### Location & Maps
- **Browser Geolocation API** — get user's lat/lng
- **Leaflet.js + OpenStreetMap** — free map display, no billing required
- **MongoDB geospatial queries** (`$near`) — geo-filtered job feed

### Auth & Verification
- **JWT** — session tokens
- **Aadhaar OTP simulation** — mock the OTP flow using a simple verified flag (real Aadhaar API needs govt approval; demo with a simulated flow)

### Contact Flow
- **WhatsApp deep link:** `https://wa.me/<phone>?text=<pre-filled message>` — zero backend needed
- Fallback: `tel:` link for direct call

### Deployment
- **Frontend** → Vercel (free, instant deploy)
- **Backend** → Render (free tier, same as APISecure)
- **DB** → MongoDB Atlas free cluster

---

## Data Models

```js
// Worker
{
  name, phone, location: { type: "Point", coordinates: [lng, lat] },
  skills: ["plumber", "painter"],   // multi-tag
  available: Boolean,
  aadhaarVerified: Boolean,
  rating: Number
}

// Job
{
  postedBy, title, description,
  skillNeeded: String,
  location: { type: "Point", coordinates: [lng, lat] },
  address: String,
  contactPhone, contactWhatsApp,
  postedAt: Date,
  status: "open" | "filled"
}
```

---

## App Pages / Routes

```
/                  → Landing page (hero + CTA: I'm a Worker / I need help)
/register/worker   → Worker onboarding (name, phone, skills, location, OTP verify)
/register/employer → Employer onboarding (name, phone)
/jobs              → Job feed (geo-sorted, skill filter)
/jobs/post         → Post a new job
/jobs/:id          → Job detail + WhatsApp/call CTA
/worker/:id        → Worker public profile
/dashboard         → Worker's own availability toggle + applied jobs
```

---

## Build Timeline

### Phase 1 — Foundation (0–3 hrs)
- [ ] Vite + React + Tailwind setup
- [ ] Express server scaffolded, MongoDB connected
- [ ] Worker + Job models with geospatial index
- [ ] Auth: register/login with JWT

### Phase 2 — Core Flow (3–7 hrs)
- [ ] Worker registration form + skill tag picker
- [ ] Job post form with browser geolocation capture
- [ ] Job feed API: `GET /jobs?lat=&lng=&skill=` using `$near`
- [ ] Job feed UI: card list, geo-sorted, skill filter dropdown
- [ ] Availability toggle on worker dashboard

### Phase 3 — Contact & Verify (7–10 hrs)
- [ ] WhatsApp deep link on job/worker cards
- [ ] Aadhaar OTP simulation (input OTP → mark `aadhaarVerified: true`)
- [ ] Verified badge shown on worker cards
- [ ] Worker public profile page

### Phase 4 — Polish & Deploy (10–12 hrs)
- [ ] Leaflet map view of nearby jobs
- [ ] Mobile-responsive UI pass (workers use phones)
- [ ] Deploy backend to Render, frontend to Vercel
- [ ] Seed 5–6 demo workers + jobs for demo
- [ ] README with demo video / screenshots

---

## Judging Angle — What to Highlight

1. **Real impact narrative** — open with the naka problem, show how 1 registration = more work days
2. **Zero commission model** — direct contact, no platform cut
3. **Geo-first UX** — jobs sorted by distance, not recency
4. **Low-barrier onboarding** — WhatsApp flow means no app install needed for employers
5. **Aadhaar trust layer** — verified badge addresses employer trust gap

---

## Folder Structure

```
rozgarsaathi/
├── client/                  # React frontend
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── hooks/useGeoLocation.js
│   │   └── api/             # axios calls
├── server/                  # Express backend
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── index.js
├── .env
└── README.md
```

---

## Quick Wins if Short on Time

- Skip Leaflet map → just show address text on cards
- Skip Aadhaar OTP UI → show verified toggle in admin/demo mode
- Skip rating system → static 5-star display
- Use Tailwind component libraries (shadcn/ui or DaisyUI) to skip custom styling

---

## Environment Variables Needed

```env
# server/.env
MONGO_URI=mongodb+srv://...
JWT_SECRET=rozgarsaathi_secret
PORT=5000

# client/.env
VITE_API_URL=https://your-render-url.onrender.com
```

---

*Built for TGPDS-02 Hackathon | Stack: React + Express + MongoDB Atlas | Deploy: Vercel + Render*
