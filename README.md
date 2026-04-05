<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://wojpyqvcargyffkyxfln.supabase.co/storage/v1/object/public/shared-files/42cb9343-6c24-4522-8ac5-0c27336aff3c/974e4549-30b9-4cce-9a10-4ea107da6b4f.png" />

# 🎓 PSS Trust — Student Management Portal

### POTUKUCHI SOMASUNDARA SOCIAL WELFARE AND CHARITABLE TRUST
**Established on. August 15, 2003**

*Digitizing welfare for students from Below Poverty Line families*

---

![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?logo=vite&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?logo=supabase&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38BDF8?logo=tailwindcss&logoColor=white)
![Deployed on Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?logo=vercel&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

</div>

---

## 📖 About

**PSS Trust** is a registered NGO dedicated to breaking financial barriers for underprivileged students. This full-stack portal replaces manual paperwork with a seamless digital workflow — from student registration and face-based attendance to fee applications and chairman approvals.

> Built with ❤️ to empower students who deserve a fair chance at education.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🧑‍🎓 **Student Registration** | Full signup with SSC details, course info (Diploma / B.Tech), and branch selection |
| 🤖 **Face Recognition Attendance** | Register your face once, mark attendance daily using `face-api.js` |
| 📄 **Fee Application System** | Submit fee requests with academic records and document uploads |
| 🏛️ **Chairman Dashboard** | Approve/reject applications, view attendance logs, manage all students |
| 🔍 **Application Status Tracker** | Students can check their fee application status in real time |
| 📊 **Attendance Reports** | View personal attendance history with dates and methods |
| 📧 **Email Notifications** | Automated approval/rejection emails via Nodemailer (Gmail SMTP) |
| 🔐 **Secure Auth** | Supabase Auth for both student and chairman roles |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, TypeScript 5.8, Vite 6.2 |
| **Styling** | Tailwind CSS 4.1, Framer Motion (via `motion`) |
| **Backend** | Express.js, Node.js (served via `tsx`) |
| **Database** | Supabase (PostgreSQL) |
| **Auth** | Supabase Auth |
| **Storage** | Supabase Storage (face photos, documents) |
| **Face Recognition** | face-api.js |
| **Email** | Nodemailer with Gmail SMTP |
| **File Uploads** | Multer |
| **Routing** | React Router DOM v7 |
| **Icons** | Lucide React |
| **Deployment** | Vercel |

---

## 📁 Project Structure

```
pss-trust/
├── public/
│   └── models/                   # face-api.js model weights (local)
├── src/
│   ├── components/
│   │   ├── Attendance.tsx         # Face verification & mark attendance
│   │   ├── ChairmanDashboard.tsx  # Admin panel for approvals
│   │   ├── ChairmanLogin.tsx      # Chairman authentication
│   │   ├── ChangePassword.tsx     # Password update screen
│   │   ├── CheckStatus.tsx        # Application status tracker
│   │   ├── FaceRegistration.tsx   # Register face for attendance
│   │   ├── FeeApplication.tsx     # Submit fee requests
│   │   ├── Signup.tsx             # Student registration
│   │   └── StudentAttendance.tsx  # Personal attendance report
│   ├── App.tsx                    # Main app & routing logic
│   ├── supabaseClient.ts          # Supabase client initialization
│   ├── index.css                  # Global styles
│   └── main.tsx                   # App entry point
├── api/                           # Serverless API handlers (Vercel)
├── server.ts                      # Express backend + Vite middleware
├── reset_supabase.sql             # Full database schema
├── supabase_setup.sql             # Additional migrations
├── supabase-blueprint.json        # Supabase project blueprint
├── .env.example                   # Environment variable template
├── vite.config.ts
├── tsconfig.json
├── vercel.json
└── package.json
```

---

## 🗄️ Database Schema

| Table | Description |
|---|---|
| `students` | Student profiles with academic details and course info |
| `attendance` | Daily attendance records with timestamps and method |
| `attendance_faces` | Stored face descriptors for recognition (unique per student) |
| `applications` | Fee application submissions with status tracking |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+
- A [Supabase](https://supabase.com) project (free tier works)
- A **Gmail account** with an [App Password](https://support.google.com/accounts/answer/185833) enabled

---

### 1. Clone the repository

```bash
git clone https://github.com/Bhanu99517/pss-trust--5-.git
cd pss-trust--5-
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example file and fill in your credentials:

```bash
cp .env.example .env
```

```env
# .env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
```

### 4. Set up the database

Open your **Supabase SQL Editor** and run the full schema:

```bash
# Copy and paste the contents of reset_supabase.sql into Supabase SQL Editor
```

Then run these additional migrations:

```sql
ALTER TABLE students ADD COLUMN IF NOT EXISTS photo_url TEXT;

ALTER TABLE attendance
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  ADD COLUMN IF NOT EXISTS method TEXT DEFAULT 'face_recognition';

ALTER TABLE attendance_faces
  ADD CONSTRAINT attendance_faces_student_id_unique UNIQUE (student_id);
```

### 5. Create the Chairman user

In **Supabase → Authentication → Users → Add User**:
- **Email:** your chairman email (must match `chairmanEmail` in `src/App.tsx`)
- **Password:** your choice

### 6. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 📜 Scripts

```bash
npm run dev       # Start dev server (Express + Vite)
npm run build     # Build for production
npm run preview   # Preview the production build locally
npm run lint      # TypeScript type check (tsc --noEmit)
npm run clean     # Remove the dist/ directory
```

---

## 🔒 Environment Variables Reference

| Variable | Required | Description |
|---|---|---|
| `VITE_SUPABASE_URL` | ✅ | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | ✅ | Supabase anon/public API key |
| `SMTP_HOST` | ✅ | SMTP server (e.g. `smtp.gmail.com`) |
| `SMTP_PORT` | ✅ | SMTP port (usually `587`) |
| `SMTP_USER` | ✅ | Gmail address used for sending emails |
| `SMTP_PASS` | ✅ | Gmail App Password (not your login password) |

---

## 🌐 Deployment (Vercel)

This project is pre-configured for Vercel with `vercel.json`.

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

> ⚠️ Make sure to add **all environment variables** in your Vercel project's **Settings → Environment Variables**.

---

## 🤝 Contributing

Contributions, bug reports, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 👤 Author

**G Bhanu Prakash**
Electronics & Communication Engineering
Government Polytechnic College, Sangareddy

[![GitHub](https://img.shields.io/badge/GitHub-Bhanu99517-181717?logo=github)](https://github.com/Bhanu99517)

---

<div align="center">

Made with ❤️ for **PSS Trust** — *Empowering Students Since 2003*

</div>
