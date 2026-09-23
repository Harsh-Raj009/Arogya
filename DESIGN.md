# Arogya Clinical Design System (DESIGN.md)

**Project Title**: Arogya — AI-Assisted Patient Case-Taking & Clinical Documentation Platform
**Hackathon / Problem Statement**: Smart India Hackathon 2026 | Problem Statement SIH26047: *"Patient Case-Taking Software"*
**Software Version**: `0.3.0` (Production Healthcare Architecture)
**Framework Stack**: Next.js 16 (App Router), React 19, TypeScript (Strict Mode), Tailwind CSS v4, Prisma ORM, Edge JWT Auth

---

## 1. Overview & Healthcare Design Philosophy

The **Arogya** design system is engineered specifically for high-stress, high-volume outpatient departments (OPDs), primary health centers (PHCs), and government hospital clinical workstations in India.

### Core Visual Principles
1. **Calm Clinical Authority**: Uses a restrained, medical-grade deep teal (`#0F766E`) and crisp slate palette. Conspicuously avoids consumer "AI gimmicks" (no purple neon glows, pulsing gradient borders, floating chatbot widgets, or celebratory confetti).
2. **Glare Reduction for 8-Hour Shifts**: Employs an ultra-soft neutral off-white canvas (`#F8FAFB`) rather than harsh pure `#FFFFFF` backgrounds, reducing eye fatigue during multi-hour OPD shifts.
3. **Monospace Numbering & Entity Invariance**: Physiological vitals (BP, SpO2, Pulse), Ayushman Bharat Health Account IDs (ABHA), Unique Health IDs (UHID), and clinical timestamps are strictly formatted in monospace font to prevent misreading.
4. **Assistive, Non-Diagnostic Visual Boundary**: Clear visual distinctions demarcate AI-drafted notes (`bg-teal-50/90`, `border-teal-200/80`) from clinician-verified and approved records (`bg-emerald-50/90`, `border-emerald-200/80`).
5. **High Information Density with Generous Tap Targets**: Dense clinical data layouts for fast scanning by physicians, combined with minimum 36px–40px interactive hit targets for tablet and touchscreen usage.

---

## 2. Color Palette & Semantic Tokens

Located in `src/lib/tokens/design-tokens.ts`, `tailwind.config.ts`, and `src/app/globals.css`.

### 2.1 Neutral Canvas & Surfaces
| Token | CSS Variable | Hex Value | Usage |
|---|---|---|---|
| `canvas` | `--background` | `#F8FAFB` / `#F8FAFC` | Main application background (glare-reducing clinical neutral). |
| `surface` | `--surface` | `#FFFFFF` | Primary card, modal, and drawer container background. |
| `surface-card` | `--surface-card` | `#FFFFFF` | Workstation card panels. |
| `surface-subtle`| `--surface-subtle`| `#F1F5F9` | Secondary backgrounds, table zebra striping, pill containers. |
| `surface-muted` | `--surface-muted` | `#F8FAFC` | Inactive, disabled, or read-only zones. |
| `surface-hover` | `--surface-hover` | `#F8FAFC` | Interactive row and list item hover state. |

### 2.2 Text & Readability Hierarchy
| Token | CSS Variable / Class | Hex Value | Usage |
|---|---|---|---|
| `text-primary` | `--foreground` / `text-slate-900` | `#0F172A` | Primary high-contrast clinical copy, headings, and values. |
| `text-secondary`| `text-slate-700` | `#334155` | Secondary body text, form field values, descriptions. |
| `text-muted` | `text-slate-500` | `#64748B` | Timestamps, metadata, labels, table headers. |
| `text-subtle` | `text-slate-400` | `#94A3B8` | Placeholder text, disabled labels, decorative icons. |
| `text-inverse` | `text-white` | `#FFFFFF` | Text over dark teal buttons or critical status badges. |

### 2.3 Brand Healthcare Accent (Clinical Teal)
| Level | Hex Value | Usage |
|---|---|---|
| `teal-50` | `#F0FDFA` | Light wash for active badges, focused table rows, AI draft card backgrounds. |
| `teal-100` | `#CCFBF1` | Selection highlights, subtle borders. |
| `teal-200` | `#99F6E4` | Border for AI-structured tags and active steppers. |
| `teal-500` | `#14B8A6` | Focus indicators, status dots. |
| `teal-600` | `#0D9488` | Focus ring (`focus-visible:ring-teal-700/25`). |
| **`teal-700`** *(Primary)* | **`#0F766E`** | **Primary brand color**: Header wordmark, primary CTAs, active tab lines. |
| `teal-800` | `#115E59` | Primary button hover state. |
| `teal-900` | `#134E4A` | Active/pressed state for primary buttons. |
| `teal-950` | `#042F2E` | Deep clinical accent. |

### 2.4 Secondary Accent (Clinical Sky Blue)
* **`blue` (`#0284C7` / `sky-600`)**: External medical references, patient portal cards, secondary links.
* **`blue-light` (`#F0F9FF` / `sky-50`)**: Background for patient records and informative notices.
* **`blue-border` (`#BAE6FD` / `sky-200`)**: Informative card borders.

### 2.5 Clinical Status & Lifecycle Colors
Every clinical state has four coordinated tokens: Background, Text, Border, and Status Indicator Dot.

```
┌─────────────────┬──────────────────┬──────────────────┬──────────────────┬─────────────────┐
│     Status      │    Background    │       Text       │      Border      │   Status Dot    │
├─────────────────┼──────────────────┼──────────────────┼──────────────────┼─────────────────┤
│ DRAFT           │ #F1F5F9 (slate-100) #475569 (slate-600)│ #CBD5E1 (slate-300)│ #94A3B8 (slate-400)
│ AI_STRUCTURED   │ #F0FDFA (teal-50)  │ #0F766E (teal-700) │ #99F6E4 (teal-200) │ #14B8A6 (teal-500)
│ PENDING_REVIEW  │ #FFFBEB (amber-50) │ #B45309 (amber-700)│ #FDE68A (amber-200)│ #F59E0B (amber-500)
│ CLINICIAN_SIGNED│ #F0FDF4 (emerald-50)│ #15803D (green-700)│ #BBF7D0 (green-200)│ #22C55E (green-500)
│ CRITICAL_ALERT  │ #FEF2F2 (rose-50)  │ #B91C1C (rose-700) │ #FECACA (rose-200) │ #EF4444 (rose-500)
│ AMENDED         │ #F0F9FF (sky-50)   │ #0369A1 (sky-700)  │ #BAE6FD (sky-200)  │ #0284C7 (sky-500)
└─────────────────┴──────────────────┴──────────────────┴──────────────────┴─────────────────┘
```

### 2.6 Borders & Dividers
* **Subtle**: `#F1F5F9` (`border-slate-100`) — Internal list dividers, card content separators.
* **Default**: `#E2E8F0` (`border-slate-200`) — Standard input borders, card boundaries, table cell lines.
* **Strong**: `#CBD5E1` (`border-slate-300`) — Active inputs on hover, dialog outlines.
* **Focus**: `#0D9488` (`border-teal-700`) — Form focus outline with 25% opacity ring.

---

## 3. Typography System

### 3.1 Font Families
* **Primary Sans Stack** (`font-sans`):
  `Inter`, `-apple-system`, `BlinkMacSystemFont`, `"Segoe UI"`, `Roboto`, `"Helvetica Neue"`, `Arial`, `sans-serif`
  *OpenType features enabled: `"cv02", "cv03", "cv04", "cv11"` with `-webkit-font-smoothing: antialiased; letter-spacing: -0.01em;`.*
* **Clinical Monospace Stack** (`font-mono`):
  `"JetBrains Mono"`, `SFMono-Regular`, `Menlo`, `Monaco`, `Consolas`, `monospace`
  *Used exclusively for clinical data requiring strict numeric alignment.*

### 3.2 Type Scale Hierarchy
| Level | Font Size | Line Height | Font Weight | Tracking | Implementation Example |
|---|---|---|---|---|---|
| **Page Title** | 24px (`text-2xl`) | 32px (`leading-tight`) | 600 (`font-semibold`) | `-0.025em` (`tracking-tight`) | `<PageHeader title="..." />` |
| **Section Title** | 18px (`text-lg`) | 28px (`leading-snug`) | 600 (`font-semibold`) | `-0.025em` (`tracking-tight`) | Section group headers, `<CardTitle>` |
| **Subsection Title**| 16px (`text-base`)| 24px (`leading-normal`)| 500 (`font-medium`) | `-0.01em` | Modal titles, drawer section titles |
| **Body (Default)** | 14px (`text-sm`) | 20px (`leading-relaxed`)| 400 (`font-normal`) | `normal` | Clinical history notes, paragraphs |
| **Body Small** | 12px (`text-xs`) | 16px (`leading-normal`)| 400 (`font-normal`) | `normal` | Helper annotations, card descriptions |
| **Form Label** | 12px (`text-xs`) | 16px | 600 (`font-semibold`) | `-0.01em` | Input, select, and textarea labels |
| **Table Header** | 12px (`text-xs`) | 16px | 600 (`font-semibold`) | `0.05em` (`tracking-wider`) | `uppercase text-slate-500` |
| **Table Cell** | 14px (`text-sm`) | 20px | 400 (`font-normal`) | `normal` | Tabular clinical records |
| **Metadata / Badges**| 11px / 12px | 16px | 500 / 600 | `tight` | Status chips, timestamp markers |
| **Micro Subtitle** | 10px (`text-[10px]`)| 14px | 600 (`font-semibold`) | `0.05em` (`tracking-wider`) | Status sub-pills, system version tags |

### 3.3 Strict Monospace Invariance Rules
The following items **must** use `font-mono` across all screens:
1. **Government Identifiers**: ABHA Number (`91-4821-3920-1102`), ABHA Address (`rahul.verma@abdm`), UHID (`AIIMS-2026-0941`).
2. **Case Identifiers**: Encounter Case ID (`#AR-2026-0041`).
3. **Physiological Vitals**:
   - Blood Pressure: `120/80 mmHg`
   - Pulse Rate: `76 bpm`
   - SpO2: `98%`
   - Respiratory Rate: `16 /min`
   - Body Temperature: `98.6 °F`
4. **Standard Clinical Codes**: ICD-10 (`E11.9`), SNOMED-CT identifiers.
5. **Exact Timestamps**: ISO date-times (`2026-09-23 04:15 IST`).

---

## 4. Spacing, Elevation & Shape System

### 4.1 Spacing Scale (4px Base Grid)
| Tailwind Class | Pixels | Application |
|---|---|---|
| `p-1` / `gap-1` | 4px | Icon buttons, status dot spacing |
| `p-1.5` / `gap-1.5` | 6px | Form label-to-input gap, compact badge padding |
| `p-2` / `gap-2` | 8px | Button internal padding, small list item spacing |
| `p-2.5` / `gap-2.5` | 10px | Standard badge padding (`px-2.5 py-1`) |
| `p-3` / `gap-3` | 12px | Input interior padding, card-to-card gap on mobile |
| `p-4` / `gap-4` | 16px | Card content padding on mobile, modal footer padding |
| `p-5` / `gap-5` | 20px | Standard desktop card padding, drawer body |
| `p-6` / `gap-6` | 24px | Page header spacing, dashboard widget gap |
| `p-8` / `gap-8` | 32px | Central workstation canvas margins on desktop |

### 4.2 Border Radii (Restrained Geometry)
* **`sm` (`4px`)**: Badges, status tags, pill counters, internal checkboxes.
* **`md` (`6px`)**: Standard buttons (`h-9`), text inputs, textareas, select menus.
* **`lg` (`8px`)**: Standard cards, dialog modals, slide-out preview drawers.
* **`xl` (`12px`)**: Special stat highlight widgets, hero cards, landing cards.
* **`full` (`9999px`)**: Status dots, user avatar circles, pill tab buttons.

### 4.3 Elevation & Shadows (Flat / Glare-Free)
* **`shadow-xs` / `shadow-2xs`**: `0 1px 2px 0 rgba(15, 23, 42, 0.04)` — Subtle button & badge depth.
* **`shadow-sm`**: `0 1px 3px 0 rgba(15, 23, 42, 0.06), 0 1px 2px -1px rgba(15, 23, 42, 0.04)` — Default card elevation.
* **`shadow-md`**: `0 4px 6px -1px rgba(15, 23, 42, 0.07), 0 2px 4px -2px rgba(15, 23, 42, 0.05)` — Modal dialogs and active dropdowns.
* **`shadow-panel`**: `0 0 0 1px rgba(15, 23, 42, 0.06), 0 2px 4px 0 rgba(15, 23, 42, 0.04)` — Framed preview panels.
* **`shadow-clinical`**: `0 1px 3px 0 rgba(15, 23, 42, 0.05)` — Clinical summary blocks.

---

## 5. Buttons & Interactive Controls

Defined in [`src/components/ui/button.tsx`](file:///d:/Arogya_SIH26047_Website/src/components/ui/button.tsx).

### 5.1 Variants
* **`primary`**: `bg-teal-700 text-white hover:bg-teal-800 active:bg-teal-900 border border-teal-800/30 shadow-xs font-medium`
  *Main clinical actions: "Verify & Approve Case", "Start New Intake", "Save Patient".*
* **`secondary`**: `bg-slate-100 text-slate-800 hover:bg-slate-200/90 active:bg-slate-200 border border-slate-200/90 shadow-xs`
  *Supporting actions: "Previous Step", "Export PDF", "Filter Records".*
* **`outline`**: `border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 shadow-xs active:bg-slate-100`
  *Neutral controls: "Cancel", "View Audit Log", "Refresh".*
* **`ghost`**: `text-slate-700 hover:bg-slate-100/80 hover:text-slate-900 active:bg-slate-200/70 border border-transparent`
  *Row-level actions, sidebar navigation links, icon triggers.*
* **`destructive`**: `bg-rose-700 text-white hover:bg-rose-800 active:bg-rose-900 shadow-xs border border-rose-800/30`
  *Irreversible clinical actions: "Reject Case", "Delete Draft", "Revoke Session".*
* **`link`**: `text-teal-700 underline-offset-4 hover:underline p-0 h-auto font-normal`
  *Inline references and breadcrumbs.*

### 5.2 Sizes
| Size Token | Height | Padding | Font Size | Border Radius | Gap |
|---|---|---|---|---|---|
| `sm` | `32px` (`h-8`) | `px-2.5` | `12px` (`text-xs`) | `6px` (`rounded-md`) | 6px (`gap-1.5`) |
| **`md` (Default)** | **`36px` (`h-9`)** | **`px-3.5`** | **`13px / 14px` (`text-xs sm:text-sm`)** | **`6px` (`rounded-md`)** | **8px (`gap-2`)** |
| `lg` | `40px` (`h-10`)| `px-4` | `14px` (`text-sm font-medium`) | `6px` (`rounded-md`) | 8px (`gap-2`) |
| `icon` | `36px` (`h-9 w-9`) | `p-0` | — | `6px` (`rounded-md`) | Center |

### 5.3 States & Micro-interactions
* **Focus Ring**: `focus-visible:ring-2 focus-visible:ring-teal-700/30 focus-visible:ring-offset-1`
* **Active Press**: `active:scale-[0.99] transition-all duration-150`
* **Disabled**: `disabled:pointer-events-none disabled:opacity-50 select-none`
* **Loading State**: Displays `<Loader2 className="h-3.5 w-3.5 animate-spin" />` with optional `loadingText`.

---

## 6. Cards & Elevation Containers

Defined in [`src/components/ui/card.tsx`](file:///d:/Arogya_SIH26047_Website/src/components/ui/card.tsx).

```tsx
<Card>
  <CardHeader>
    <CardTitle>Clinical Case Details</CardTitle>
    <CardDescription>Verified encounter history and observations</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Body content */}
  </CardContent>
  <CardFooter>
    {/* Action buttons */}
  </CardFooter>
</Card>
```

### Component Structure
* **`Card`**: `rounded-lg border border-slate-200/80 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.03)] text-slate-900`
* **`CardHeader`**: `flex flex-col space-y-1 p-5 border-b border-slate-100/90`
* **`CardTitle`**: `text-sm sm:text-base font-semibold text-slate-900 tracking-tight leading-snug`
* **`CardDescription`**: `text-xs text-slate-500 leading-relaxed`
* **`CardContent`**: `p-5`
* **`CardFooter`**: `flex items-center p-4 border-t border-slate-100/90 bg-slate-50/40 rounded-b-lg`

---

## 7. Form Controls & Input Primitives

### 7.1 Input (`src/components/ui/input.tsx`)
* **Height**: `36px` (`h-9`), rounded `6px`.
* **Border**: `border border-slate-200 hover:border-slate-300 bg-white`.
* **Typography**: `text-xs sm:text-sm text-slate-900 placeholder:text-slate-400`.
* **Focus State**: `focus-visible:ring-2 focus-visible:ring-teal-700/25 focus-visible:border-teal-700`.
* **Error State**: `border-red-500 focus-visible:ring-red-500/20 text-red-600` with automated right-aligned `<AlertCircle />` icon.
* **Support**: Left & right icon slots (`leftIcon`, `rightIcon`), automated ID pairing for accessibility labels.

### 7.2 Textarea (`src/components/ui/textarea.tsx`)
* **Padding**: `p-3`, rounded `6px`, default 4 rows (`rows={4}`).
* **Typography**: `text-xs sm:text-sm text-slate-900 leading-relaxed`.
* **Focus State**: Identical teal-700 ring token.

### 7.3 Select Menu (`src/components/ui/select.tsx`)
* **Height**: `36px` (`h-9`), custom right-aligned `<ChevronDown className="h-4 w-4 text-slate-400" />` indicator with `appearance-none`.

### 7.4 Date Input (`src/components/ui/date-input.tsx`)
* Standardized ISO date picker with formatted Indian locale display (`DD/MM/YYYY`).

---

## 8. Navigation & Shell Layouts

### 8.1 Workstation Shell (`AppShell` & `AppSidebar`)
* **Container**: `min-h-screen bg-[#F8FAFB] flex text-slate-900`.
* **Sidebar Layout**: Fixed desktop width `16rem` (`w-64` / `pl-64` on content canvas). Folds into animated overlay on mobile devices (`< 768px`).
* **Sidebar Navigation Sections**:
  * **Clinical Practice**: Dashboard (`/dashboard`), Patient Directory (`/patients`), New Case Intake (`/cases/new`), Clinical Cases (`/cases`), Verification Queue (`/review/queue`).
  * **Institutional Administration**: Statutory Audit Trail (`/activity`), Facility Settings (`/settings`).
* **Active Route Indicator**: `bg-teal-50 text-teal-900 font-semibold border-r-2 border-teal-700`.
* **Clinical Assurance Banner**: Persistent high-visibility assurance strip below the topbar:
  `"Assistive Documentation: AI-generated notes are structured drafts. Attending clinician holds final medical authority."`

### 8.2 Patient Portal Shell (`PatientShell`)
* Dedicated consumer-friendly portal shell (`max-w-6xl mx-auto px-4`).
* Sticky top header with hospital wordmark and emerald `Patient Portal` badge.
* **Tab Switcher**: Dashboard (`/patient/dashboard`), My Health Records (`/patient/records`), My Profile (`/patient/profile`), Medicine Assistant (`/patient/medicine-assistant` with `Educational` pill).
* Sign-out and session identity badge.

---

## 9. Dashboard Layout & Screen Archetypes

### 9.1 Shift Metrics Grid
Top-of-dashboard 3-column or 4-column quick-glance statistical cards:
* **Metric Value**: `text-2xl font-bold text-slate-900 font-mono`
* **Metric Label**: `text-xs font-medium text-slate-500`
* **Card Border**: Light slate border with subtle teal/amber/emerald left accent strip.

### 9.2 Two-Column Doctor Verification Console (`/review/[id]`)
* **Left Column (50%–55%)**: Source clinical intake transcript, presenting complaints, and AI-extracted 10-section history sections.
* **Right Column (45%–50%)**: Attending doctor verification console, editable clinical notes, prescription entries, and explicit "Approve & Sign Encounter" action bar.

### 9.3 5-Step Case Intake Studio (`/cases/new`)
* Horizontal progress stepper at top:
  1. Patient Identification
  2. Chief Complaint
  3. Structured History (10 Sections)
  4. Physiological Vitals
  5. AI Structuring Review
* Step container with sticky bottom action controls ("Save Draft", "Previous", "Continue to Vitals").

---

## 10. Responsive Behavior & Breakpoints

Arogya strictly enforces responsive design across 4 distinct viewport tiers:

| Viewport Tier | Breakpoint | Layout Adaptations |
|---|---|---|
| **Mobile** | `< 640px` (`sm`) | Sidebar hidden into slide-over drawer; horizontal stepper replaced with compact `"Step X of Y"` label; data tables collapse to horizontally scrollable view; full-width modal dialogs. |
| **Tablet** | `640px – 767px` | 2-column forms stack into 1-column; topbar collapses shift details into compact dropdown; action buttons expand to full width. |
| **Desktop** | `768px – 1023px` (`md`) | Persistent 64-width sidebar (`pl-64`); full stepper titles visible; 2-column doctor review console active; data tables display full metadata. |
| **Wide Clinical** | `≥ 1024px` (`lg` / `xl`) | Stepper displays secondary descriptions; 3-column metric grids; patient slide-out preview drawer opens concurrently with table view. |

---

## 11. Reusable UI Components Catalog

| Component | Path | Description & Props |
|---|---|---|
| **`Button`** | `src/components/ui/button.tsx` | 6 variants (`primary`, `secondary`, `outline`, `ghost`, `destructive`, `link`), 4 sizes (`sm`, `md`, `lg`, `icon`), loading spinner support. |
| **`Card`** | `src/components/ui/card.tsx` | Compound component (`CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`). |
| **`Input`** | `src/components/ui/input.tsx` | Accessible text input with label, helper text, error state, and icon support. |
| **`Textarea`** | `src/components/ui/textarea.tsx` | Form textarea with automatic label/error binding. |
| **`Select`** | `src/components/ui/select.tsx` | Native styled dropdown with custom chevron indicator. |
| **`DateInput`** | `src/components/ui/date-input.tsx` | Standardized date picker. |
| **`StatusBadge`** | `src/components/ui/status-badge.tsx` | Specialized clinical state chip with live colored indicator dot. |
| **`Badge`** | `src/components/ui/badge.tsx` | Informational pill chip with 8 color variants. |
| **`DataTable`** | `src/components/ui/data-table.tsx` | Type-safe table with built-in instant search, pagination, loading skeleton, and empty states. |
| **`Stepper`** | `src/components/ui/stepper.tsx` | 5-step intake progress bar with checkmarks, active focus ring, and connecting lines. |
| **`Tabs`** | `src/components/ui/tabs.tsx` | Dual-mode tab switcher: `underline` (header navigation) and `pills` (dense toolbars). |
| **`Modal`** | `src/components/ui/modal.tsx` | Accessible dialog with backdrop blur, Escape key listener, and body scroll lock. |
| **`Drawer`** | `src/components/ui/drawer.tsx` | Right-side slide-out sheet panel for quick patient EHR reviews. |
| **`ConfirmationDialog`**| `src/components/ui/confirmation-dialog.tsx` | Safety prompt for high-stakes clinical actions. |
| **`Avatar`** | `src/components/ui/avatar.tsx` | Clinician and patient avatar with fallback initials. |
| **`Timeline`** | `src/components/ui/timeline.tsx` | Vertical chronological audit rail for patient history. |
| **`Toast`** | `src/components/ui/toast.tsx` | Global notification provider (`success`, `error`, `info`, `warning`). |
| **`LoadingState`** | `src/components/ui/loading-state.tsx` | Shimmer skeletons for tables, patient cards, and metrics. |
| **`ErrorState`** | `src/components/ui/error-state.tsx` | Clean error card with retry action. |
| **`EmptyState`** | `src/components/ui/empty-state.tsx` | Friendly neutral illustration and message for zero-data states. |

---

## 12. Accessibility (a11y) & Regulatory Compliance

* **Contrast Compliance**: Primary teal (`#0F766E`) on canvas (`#F8FAFB`) exceeds WCAG AAA ratio (> 7:1) for body text and headers.
* **Keyboard Navigation**: All interactive elements (buttons, inputs, select triggers, dialogs, drawers) have visible `focus-visible:ring-2 focus-visible:ring-teal-700/25` outlines and trap focus when modals are active.
* **Screen Reader Safety**: All icons include `aria-hidden="true"`, buttons without text include descriptive `aria-label`, and status dots are accompanied by explicit text labels.
* **ABHA / ABDM Alignment**: Identifiers, demographic cards, and history taxonomy conform directly to Indian digital health guidelines.
