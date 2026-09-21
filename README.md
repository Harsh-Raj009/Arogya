# Arogya — AI-Assisted Patient Case-Taking & Clinical Documentation Platform

**Smart India Hackathon | Problem Statement SIH26047: "Patient Case-Taking Software"**  
*Designed for Indian clinical workflows with an interoperability-ready architecture.*

---

## 1. Project Overview

**Arogya** is an enterprise-grade, clinical case-taking and documentation platform engineered to substantially reduce clinical documentation burden while strictly maintaining physician review and clinical oversight.

In busy outpatient departments (OPDs) and public healthcare facilities across India, doctors and clinical staff face severe time pressure, often handling dozens of patients per hour. Manual paper case-taking and unstructured electronic health entries lead to missing clinical details, provider burnout, and fragmented patient records.

Arogya solves this by providing:
1. **Public Information Portal**: An intuitive, patient-centered entry point explaining clinical workflows and services.
2. **Guided 10-Section Clinical Case-Taking**: A structured stepper allowing clinical staff to capture chief complaints, history of present illness, past medical/surgical history, drug & allergy history, family/social history, and a 12-system review.
3. **AI Narrative Structuring (Assistive Draft)**: Decoupled AI provider architecture that synthesizes raw clinical history notes into clean, standardized medical summaries for clinician review.
4. **Doctor Review & Verification**: A dedicated clinical workstation where attending doctors review AI-structured drafts, inspect inline diffs, make amendments, and provide explicit clinical approval.
5. **Role-Based Access Control (RBAC)**: Strict four-tier server-side enforcement across `DOCTOR`, `CLINICAL_STAFF`, `ADMINISTRATOR`, and `PATIENT`.
6. **Patient Health Portal**: Personal health record access where verified patients view their approved visit summaries, demographic profile, and clinical timeline with strict patient data isolation.
7. **Medicine Information Assistant**: Patient-facing educational assistant with strict non-diagnostic safety guardrails, structured drug education (uses, precautions, interactions), and anti-hallucination controls.
8. **Statutory Audit Trail**: Comprehensive logging of intake events, AI structuring passes, clinician modifications, and approvals.

---

## 2. Clinical Workflow Architecture

```
[ Public Landing (/) ] ──────► [ Role-Based Authentication (/login) ]
                                            │
        ┌───────────────────┬───────────────┴───────────────┬───────────────────┐
        ▼                   ▼                               ▼                   ▼
   [ PATIENT ]     [ CLINICAL_STAFF ]                  [ DOCTOR ]       [ ADMINISTRATOR ]
        │                   │                               │                   │
  /patient/dashboard  /dashboard (Triage)             /dashboard (Queue)    /settings (System)
  /patient/records    /cases/new (10-Section Intake)  /review/queue         /activity (Audit)
  /patient/profile          │                         /review/[id]          /admin/users
  /patient/medicine-        ▼                               │
   assistant          AI-Assisted Structuring               ▼
                            │                         Doctor Review, Diff,
                            └────────────────────────► Amendment & Approval
                                                            │
                                                            ▼
                                                Final Clinical Record
                                                (Visible in Patient Portal)
```

---

## 3. Technology Stack

- **Framework**: Next.js (App Router, Server Components & Client Components)
- **UI & Styling**: React, Tailwind CSS with custom healthcare tokens (high-contrast, glare-reducing palette)
- **Icons**: Lucide React
- **Authentication & Security**: Edge-compatible JSON Web Token (JWT) sessions using `jose`, secure HTTP-only cookies, server-side RBAC middleware route guards
- **Database & ORM**: PostgreSQL with Prisma ORM
- **AI Abstraction Layer**: Decoupled multi-provider interface supporting `mock` (deterministic offline), `openai`, `anthropic`, `gemini`, and local on-premise `ollama`
- **Voice / Speech-to-Text Abstraction**: Multi-provider voice interface supporting browser-native `webspeech`, OpenAI `whisper`, and `deepgram`
- **Deployment**: Vercel-ready with zero filesystem persistence dependency and serverless connection pooling

---

## 4. Role & Permission Matrix

Arogya strictly enforces four distinct roles across both Next.js middleware and API route handlers:

| Role | Target Route | Core Capabilities | Route Restrictions |
| :--- | :--- | :--- | :--- |
| **DOCTOR** | `/dashboard` | Case triage, review queue (`/review/queue`), draft inspection, diff review, amendments, final clinical approval, audit trail inspection | Blocked from `/patient/*` routes |
| **CLINICAL_STAFF** | `/dashboard` | Patient registration (`/patients/new`), guided 10-section case intake (`/cases/new`), vitals recording, AI structuring trigger | Blocked from `/review/*`, `/settings`, `/activity`, `/admin/*`, `/patient/*` |
| **ADMINISTRATOR** | `/settings` | User account management, statutory audit trail log inspection (`/activity`), facility settings, AI & voice provider configuration | Blocked from initiating clinical cases (`/cases/new`) and `/patient/*` |
| **PATIENT** | `/patient/dashboard` | Personal case records (`/patient/records`), demographic profile (`/patient/profile`), medicine educational assistant (`/patient/medicine-assistant`) | Strictly isolated to own patient ID; blocked from all staff/clinical workstation routes (`/dashboard`, `/cases`, `/review`, etc.) |

---

## 5. Clinical Safety & Architectural Invariants

1. **Interoperability-Ready Architecture**: Designed specifically for Indian clinical workflows with standardized UHID (Unique Healthcare Identifier), ABHA ID support, and structured clinical histories aligned with health data exchange principles.
2. **Strict Non-Diagnostic Boundary**: The AI structuring engine **never** formulates diagnoses or prescribes medication. It serves exclusively as an assistive narrative structuring aid.
3. **Mandatory Clinician Approval**: No case record transitions from `UNDER_REVIEW` to `FINALIZED` without direct review, verification, and explicit approval by a licensed medical practitioner.
4. **Medicine Educational Boundary**: The Medicine Information Assistant provides objective, verified pharmacological educational information. It is strictly constrained from offering personalized diagnostic opinions, modifying dosages, or altering clinician-prescribed treatments.
5. **Zero Data Leakage & Patient Isolation**: Patient portal APIs derive the patient identity strictly from the verified session JWT (`req.session.patientId`). Client-supplied ID overrides are rejected.

---

## 6. Local Development Setup

### Prerequisites
- **Node.js**: v18.17.0+ (Node.js 20+ LTS recommended)
- **npm**: v9+ (or `pnpm` / `yarn`)
- **Git**

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/arogya-sih26047.git
   cd arogya-sih26047
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   ```bash
   # Copy the example template
   cp .env.example .env.local
   ```
   *(On Windows Command Prompt: `copy .env.example .env.local`)*

4. **Generate Prisma Client**:
   ```bash
   npx prisma generate
   ```

5. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Navigate to `http://localhost:3000` in your web browser.

---

## 7. Environment Variables Reference

Configure these variables in your `.env.local` (local development) or your cloud deployment provider settings:

| Variable Name | Required | Default / Example | Purpose |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_APP_NAME` | Yes | `"Arogya"` | Application branding name displayed across headers and metadata. |
| `NEXT_PUBLIC_APP_ENV` | Yes | `"production"` / `"development"` | Current execution environment. |
| `NEXT_PUBLIC_FACILITY_NAME`| Yes | `"General OPD - Arogya Care Unit"` | Institutional facility name shown on clinical shell and printouts. |
| `NEXT_PUBLIC_FACILITY_CODE`| Yes | `"AROGYA-OPD-104"` | Identifier tag for audit logs and case records. |
| `DATABASE_URL` | For DB mode | `postgresql://user:pass@host:5432/arogya_db?sslmode=require` | PostgreSQL connection string. Required when `DEMO_MODE=false`. |
| `JWT_SECRET` | **Yes (Prod)** | Cryptographic random 32+ char string | Symmetric secret used by `jose` to sign and verify session JWTs. Enforced in production. |
| `SESSION_SECRET` | Optional | Fallback secret | Backward-compatible session secret key. |
| `NEXTAUTH_SECRET` | Optional | Fallback secret | Additional fallback secret key. |
| `NEXTAUTH_URL` | Optional | `https://your-domain.vercel.app` | Canonical deployment URL. |
| `DEMO_MODE` | Yes | `"true"` | When `"true"`, enables complete standalone demonstration mode without requiring a live PostgreSQL database. |
| `NEXT_PUBLIC_DEMO_MODE` | Yes | `"true"` | Exposes demo mode indicator to client UI components. |
| `AI_PROVIDER_DEFAULT` | No | `"mock"` | Default AI provider (`mock`, `openai`, `anthropic`, `gemini`, `ollama`). |
| `AI_PROVIDER_API_KEY` | If using cloud AI | `""` | API key for OpenAI / Anthropic / Gemini (leave empty for `mock`). |
| `VOICE_PROVIDER_DEFAULT` | No | `"webspeech"` | Default speech-to-text provider (`webspeech`, `whisper`, `deepgram`). |
| `AUDIT_LOG_ENABLED` | No | `"true"` | Enables clinical audit trail recording. |
| `COMPLIANCE_MODE` | No | `"INTEROPERABILITY_READY"` | Architecture compliance flag. |

---

## 8. Database Setup & PostgreSQL Migrations

Arogya uses Prisma ORM with PostgreSQL.

### Mode A: Standalone Demo Mode (`DEMO_MODE=true`)
- Does **not** require PostgreSQL or Docker.
- Uses realistic in-memory clinical datasets and pre-configured accounts.
- Ideal for hackathon demonstrations, UI evaluations, and offline environments.

### Mode B: Production PostgreSQL Mode (`DEMO_MODE=false`)
1. Provide your PostgreSQL connection string in `DATABASE_URL`:
   ```bash
   DATABASE_URL="postgresql://postgres:password@localhost:5432/arogya_db?schema=public"
   ```
2. Apply schema migrations:
   ```bash
   # In development (creates migrations):
   npx prisma migrate dev --name init

   # In production or CI/CD (applies existing migrations safely):
   npx prisma migrate deploy

   # Or push schema directly to serverless database (e.g. Neon, Supabase):
   npx prisma db push
   ```
3. Open Prisma Studio to inspect records visually:
   ```bash
   npx prisma studio
   ```

---

## 9. Vercel Deployment Guide

Arogya is fully optimized for continuous deployment on **Vercel**.

### Step 1: Push Code to GitHub
Ensure all code is committed and pushed to your GitHub repository:
```bash
git add .
git commit -m "feat: complete Arogya production-ready release"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```
*(Notice: `.gitignore` automatically protects `.env`, build caches, and sensitive files from being committed).*

### Step 2: Import Project into Vercel
1. Log in to [Vercel](https://vercel.com) and click **Add New > Project**.
2. Select your `arogya` GitHub repository and click **Import**.
3. Framework Preset will automatically detect **Next.js**.
4. Root Directory: `./` (default).

### Step 3: Configure Build & Environment Settings
1. **Build Command**: The repository `package.json` already contains:
   ```json
   "build": "prisma generate && next build"
   ```
   Leave Vercel's Build Command on default or ensure it runs `npm run build`.
2. **Environment Variables**: In Vercel Project Settings > Environment Variables, add:
   - `JWT_SECRET`: A secure 32+ character random string (generate with `openssl rand -base64 32`).
   - `DEMO_MODE`: Set to `"true"` for an immediate zero-database deployment, or `"false"` if connecting PostgreSQL.
   - `NEXT_PUBLIC_DEMO_MODE`: Set to `"true"` (or match `DEMO_MODE`).
   - `DATABASE_URL`: If `DEMO_MODE="false"`, provide your connection string from [Neon](https://neon.tech), [Supabase](https://supabase.com), or AWS RDS with `?sslmode=require`.
   - `NEXT_PUBLIC_FACILITY_NAME`: `"General OPD - Arogya Care Unit"`
   - `NEXT_PUBLIC_FACILITY_CODE`: `"AROGYA-OPD-104"`

### Step 4: Deploy
1. Click **Deploy**.
2. Vercel will build the application, generate the Prisma Client, bundle static and serverless routes, and deploy the live site.
3. Your deployment will be live at `https://<your-project>.vercel.app`.

---

## 10. Demo Credentials

When running in `DEMO_MODE=true` (default), the following role-based accounts are pre-configured:

| Role | Email | Password | Destination | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **Doctor** | `doctor@arogya.gov.in` | `Doctor@Arogya2026` | `/dashboard` | Review queue, diff view, amendments, clinical approvals |
| **Clinical Staff** | `staff@arogya.gov.in` | `Staff@Arogya2026` | `/dashboard` | Patient registration, 10-section case-taking stepper, vitals |
| **Administrator** | `admin@arogya.gov.in` | `Admin@Arogya2026` | `/settings` | User directory, audit trail (`/activity`), system settings |
| **Patient** | `patient@arogya.gov.in` | `Patient@Arogya2026` | `/patient/dashboard` | Approved clinical records, profile, medicine assistant |

*Convenient "Quick Fill" demo buttons are also provided on the `/login` screen for fast evaluation.*

---

## 11. Verification & Testing

Arogya includes automated end-to-end integration and security test suites verifying RBAC boundaries, patient isolation, medicine safety, and route access:

```bash
# Verify build & TypeScript compilation:
npm run build

# Run automated role isolation & patient portal test suite (30 tests):
node scratch/test-phase-4b.mjs

# Run automated medicine assistant & safety boundary test suite (42 tests):
node scratch/test-phase-4c.mjs
```

**Test Summary**:
- Phase 4B Test Suite: **30 / 30 PASSED (100%)**
- Phase 4C Test Suite: **42 / 42 PASSED (100%)**
- Total Automated Tests: **72 / 72 PASSED (100%)**

---

## 12. Project Structure

```
Arogya_SIH26047_Website/
├── .env.example                   # Production environment template (no secrets)
├── .gitignore                     # Production Git exclusion rules
├── package.json                   # Build scripts & dependencies
├── next.config.ts                 # Next.js production configuration
├── tsconfig.json                  # Strict TypeScript configuration
├── tailwind.config.ts             # Healthcare color tokens & typography
├── prisma/
│   └── schema.prisma              # PostgreSQL schema with 4 roles, relations & audit fields
├── src/
│   ├── middleware.ts              # Edge-compatible RBAC route guard & session validator
│   ├── app/
│   │   ├── page.tsx               # Public landing page (Phase 4A)
│   │   ├── (auth)/login/page.tsx  # Unified role-based authentication portal
│   │   ├── (dashboard)/           # Clinical workstation routes (Doctor, Staff, Admin)
│   │   │   ├── dashboard/page.tsx # Operational clinical queue & triage
│   │   │   ├── cases/             # 10-section case taking & encounter details
│   │   │   ├── patients/          # Patient directory & registration
│   │   │   ├── review/            # Attending Doctor review & approval console
│   │   │   ├── activity/page.tsx  # Statutory audit trail logs
│   │   │   └── settings/page.tsx  # Facility & system settings
│   │   ├── patient/               # Patient Portal (Phase 4B & 4C)
│   │   │   ├── dashboard/page.tsx # Patient personal summary
│   │   │   ├── records/page.tsx   # Verified medical visits
│   │   │   ├── profile/page.tsx   # Demographic identity
│   │   │   └── medicine-assistant/# Educational medicine guide
│   │   └── api/                   # Protected Next.js REST API routes
│   │       ├── auth/              # Login, logout, session verification
│   │       ├── patient/           # Patient records & medicine assistant API
│   │       ├── review/            # Doctor clinical approval API
│   │       └── admin/             # Administrator user management API
│   ├── components/                # Modular UI primitives, clinical forms & shells
│   ├── lib/
│   │   ├── auth/                  # JWT generation/verification, RBAC rules & repository
│   │   ├── ai/                    # Decoupled LLM provider interfaces
│   │   ├── db/                    # Prisma singleton client
│   │   └── mock-data.ts           # Offline clinical dataset for DEMO_MODE
│   └── types/                     # Strong TypeScript domain definitions
```

---

## 13. License & Compliance Disclaimer

Designed for academic evaluation and clinical hackathon demonstrations under the Smart India Hackathon (SIH26047).  
The platform follows an **interoperability-ready architecture** designed for Indian healthcare workflows. It does not replace licensed medical judgment and requires attending physician review and verification for all clinical documentation.
