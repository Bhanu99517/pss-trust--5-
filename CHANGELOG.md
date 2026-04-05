# 📅 Changelog

All notable changes to the **PSS Trust Student Management Portal** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

> **Versioning Guide:**
> - `MAJOR` — Breaking changes or complete redesigns
> - `MINOR` — New features, backwards compatible
> - `PATCH` — Bug fixes and minor improvements

---

## [Unreleased]

> Changes that are in progress or planned for the next release.

### Planned
- PDF download for approved fee receipts
- Multi-language support (Telugu, Hindi, English)
- Student dashboard with analytics
- Email reminders for pending applications
- Supabase Row Level Security (RLS) policies

---

## [1.0.0] — 2026-04-05

### 🎉 Initial Release

The first full release of the PSS Trust Student Management Portal.

### Added
- **Student Registration** — Full signup with SSC details, course info (Diploma / B.Tech), and branch selection
- **Face Recognition Attendance** — Register face once using `face-api.js`, mark attendance daily via webcam
- **Fee Application System** — Students submit fee requests with academic records and document uploads via Multer
- **Chairman Dashboard** — Admin panel to approve/reject fee applications, view attendance logs, and manage students
- **Application Status Tracker** — Students can check their fee application status in real time
- **Student Attendance Report** — Personal attendance history with dates and recognition method
- **Email Notifications** — Automated approval/rejection emails via Nodemailer (Gmail SMTP)
- **Supabase Auth** — Secure login and session management for both students and chairman
- **Supabase Storage** — Face photos and uploaded documents stored securely
- **React Router DOM v7** — Client-side routing across all portal pages
- **Framer Motion animations** — Smooth page transitions and UI interactions
- **Vercel deployment** — Full production deployment with `vercel.json` configuration
- **Environment variable support** — `.env.example` template for easy setup
- **Database schema** — `reset_supabase.sql` with full PostgreSQL schema for all tables
- **TypeScript** — Fully typed codebase with `tsconfig.json`

### Tech Stack (v1.0.0)
| Layer | Version |
|---|---|
| React | 19.0.0 |
| TypeScript | 5.8.2 |
| Vite | 6.2.0 |
| Tailwind CSS | 4.1.14 |
| Supabase JS | 2.101.1 |
| face-api.js | 0.22.2 |
| Express | 4.21.2 |
| Nodemailer | 8.0.4 |
| React Router DOM | 7.13.2 |
| Lucide React | 0.546.0 |
| Motion | 12.23.24 |
| Multer | 2.1.1 |

### Database Tables (v1.0.0)
- `students` — Student profiles with academic and course details
- `attendance` — Daily attendance records with timestamps and method
- `attendance_faces` — Face descriptors for recognition (unique per student)
- `applications` — Fee application submissions with approval status

---

## How to Read This Changelog

Each release section uses the following change types:

| Label | Meaning |
|---|---|
| `Added` | New features or files |
| `Changed` | Changes to existing functionality |
| `Deprecated` | Features that will be removed soon |
| `Removed` | Features that have been removed |
| `Fixed` | Bug fixes |
| `Security` | Security patches or vulnerability fixes |

---

## Contributing to the Changelog

When submitting a Pull Request, please update the `[Unreleased]` section with a brief description of your change under the appropriate label. The maintainer will move it to a versioned release during the next release cycle.

---

<div align="center">

**PSS Trust — Empowering Students Since 2003** 💙

</div>
