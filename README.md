# 🌿 Smart Community Health Monitoring System
### Early Warning System for Water-Borne Diseases — Rural Northeast India

> 🏆 **Built for Inter College Smart India Hackathon (SIH)**

> 🌐 **Live Demo:** [https://sjm2006.github.io/health-monitor-web-app/](https://sjm2006.github.io/health-monitor-web-app/)

---

## 📝 Description

**Smart Community Health Monitoring System** is a web-based early warning platform designed to protect rural communities in Northeast India from water-borne disease outbreaks such as Cholera, Typhoid, and Hepatitis A.

In remote villages of Northeast India, disease outbreaks often go undetected until they become life-threatening emergencies. This system bridges that gap by putting powerful health tools directly in the hands of community members and health workers — no technical expertise required.

With just a smartphone or computer, users can:
- **Instantly assess** their household's risk of water-borne disease based on symptoms, water source, and recent rainfall
- **Monitor real-time trends** across multiple villages through an interactive health dashboard
- **Report illness cases** directly to health authorities for faster response
- **Access health education** in both English and Assamese — making it truly local

This project was proudly developed and presented at the **Inter College Smart India Hackathon (SIH)**, targeting the problem statement of improving health monitoring and early disease detection in underserved rural communities.

---

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Pages Overview](#pages-overview)
- [Design System](#design-system)
- [Running Without Node.js](#running-without-nodejs)
- [Future Improvements](#future-improvements)
- [Team](#team)

---

## 🎯 About the Project

Rural communities in Northeast India face significant challenges from water-borne diseases like Cholera, Typhoid, and Hepatitis A — especially during monsoon season when contaminated water sources lead to rapid outbreaks.

This system provides:
- **Early detection** of disease patterns before they become outbreaks
- **Risk assessment** for individual households based on symptoms and environment
- **Real-time monitoring** of community health across multiple villages
- **Bilingual health education** in English and Assamese
- **Easy case reporting** to alert health authorities quickly

Built for the **Inter College Smart India Hackathon (SIH)**, this project targets the problem statement: *Health Monitoring and Early Disease Detection for Rural Communities in Northeast India*.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🧮 **Risk Calculator** | Assesses disease risk based on symptoms, water source, and rainfall — gives Low / Medium / High result with recommendations |
| 📊 **Live Dashboard** | Real-time charts showing case trends, symptom distribution, village risk levels, and water source data |
| 📖 **Health Awareness** | Prevention tips, ORS preparation guide, warning signs, and disease info — available in English and Assamese |
| 📋 **Case Reporting** | Community members can report illness cases directly to health authorities |
| 📞 **Emergency Access** | One-tap access to Ambulance (108) and Medical Emergency (102) from every page |

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **React** | 18.3.1 | UI framework |
| **TypeScript** | 5.8.3 | Type safety |
| **Vite** | 5.4.19 | Build tool and dev server |
| **Tailwind CSS** | 3.4.17 | Utility-first styling |
| **Recharts** | 3.2.0 | Data visualization charts |
| **Radix UI** | Latest | Accessible UI primitives |
| **React Router** | 6.30.1 | Client-side routing |
| **Lucide React** | 0.462.0 | Icon library |
| **shadcn/ui** | Latest | Pre-built component system |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher → Download from [nodejs.org](https://nodejs.org)
- **npm** (comes with Node.js)

### Installation

**1. Clone or extract the project**
```bash
# If using git
git clone https://github.com/your-username/health-monitor-ne.git

# Or extract the ZIP file you downloaded
```

**2. Navigate into the project folder**
```bash
cd fixed-project
```

**3. Install dependencies**
```bash
npm install
```

**4. Start the development server**
```bash
npm run dev
```

**5. Open in browser**
```
http://localhost:8080
```

### Windows Users — If you see a script error

Run this in PowerShell first:
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```
Then run `npm install` again.

### Build for Production

```bash
npm run build
```
This creates a `dist/` folder with optimized files ready to deploy to any web server.

---

## 📁 Project Structure

```
fixed-project/
│
├── index.html                  # Entry point HTML file
├── package.json                # Project dependencies and scripts
├── vite.config.ts              # Vite build tool configuration
├── tailwind.config.ts          # Tailwind CSS design system config
├── tsconfig.json               # TypeScript configuration
├── postcss.config.js           # PostCSS configuration
├── components.json             # shadcn/ui component config
│
└── src/
    ├── main.tsx                # App entry point — starts React
    ├── App.tsx                 # Root component with routing setup
    ├── index.css               # Global styles and CSS design tokens
    ├── vite-env.d.ts           # Vite type declarations
    │
    ├── pages/
    │   ├── Index.tsx           # Page router — switches between views
    │   └── NotFound.tsx        # 404 error page
    │
    ├── components/
    │   ├── Homepage.tsx        # Landing page
    │   ├── RiskCalculator.tsx  # Health risk assessment tool
    │   ├── Dashboard.tsx       # Community health dashboard
    │   ├── HealthAwareness.tsx # Educational content (bilingual)
    │   ├── ReportCase.tsx      # Case reporting form
    │   ├── Layout.tsx          # Shared navigation header
    │   └── ui/                 # shadcn/ui base components
    │       ├── button.tsx
    │       ├── card.tsx
    │       ├── badge.tsx
    │       ├── tabs.tsx
    │       ├── select.tsx
    │       ├── checkbox.tsx
    │       ├── toast.tsx
    │       └── ...
    │
    ├── hooks/
    │   ├── use-toast.ts        # Toast notification hook
    │   └── use-mobile.tsx      # Mobile detection hook
    │
    └── lib/
        └── utils.ts            # Utility functions (cn helper)
```

---

## 📱 Pages Overview

### 🏠 Homepage
The main landing page featuring:
- Sticky navigation with emergency call button
- Full-screen hero section with gradient overlay
- Live statistics strip (Reports, Alerts, Healthy Villages, Risk Level)
- 4 feature action cards
- Emergency contact banner with quick-dial buttons

### 🧮 Risk Calculator
A two-stage interactive risk assessment:

**Stage 1 — Input**
- 8 symptom checkboxes (each with weighted score)
- Water source selection (treated water = safe, river = high risk)
- Recent rainfall selector (flooding = highest risk)

**Stage 2 — Result**
- Calculated risk level: **Low** / **Medium** / **High**
- Visual score bar showing severity
- Tailored recommendations list
- Emergency alert for High risk results

**Scoring Logic:**
```
Symptoms:     Diarrhea (+3), Vomiting (+3), Blood in Stool (+5), Dehydration (+4)...
Water Source: River/Stream (+5), Pond (+4), Public Well (+3), Treated Water (+0)
Rainfall:     Heavy/Flooding (+4), Moderate (+2), Light (+1), None (+0)

Score 0–3  → Low Risk (Green)
Score 4–8  → Medium Risk (Amber)
Score 9+   → High Risk (Red)
```

### 📊 Dashboard
Community-wide health monitoring for health workers:
- **KPI Cards** — Total Cases, High Risk Areas, Population Monitored, Alert Rate
- **Line Chart** — Weekly case trends over 6 weeks
- **Donut Chart** — Symptom distribution breakdown
- **Village Risk Table** — 6 villages with case counts and risk badges
- **Bar Chart** — Cases by water source type
- **Action Items** — Prioritized response tasks

### 📖 Health Awareness
Bilingual educational content (English / Assamese):
- **Prevention Tab** — 4 prevention tips with priority badges
- **ORS Recipe Tab** — Step-by-step Oral Rehydration Solution preparation
- **Warning Signs Tab** — 6 symptoms requiring immediate medical attention
- **Diseases Tab** — Cholera, Typhoid, Hepatitis A information

### 📋 Report a Case
Community illness reporting form:
- Personal information (name, age, gender, phone)
- Location selection (9 villages)
- Health information (symptoms, duration, water source)
- Additional notes
- Submit triggers toast notification confirming report

---

## 🎨 Design System

### Color Palette

| Color | Hex | Usage |
|---|---|---|
| Primary (Teal) | `#1a7a6e` | Buttons, links, primary actions |
| Secondary (Amber) | `#e07b2a` | Hero accent, highlights |
| Danger (Red) | `#d03b3b` | High risk, emergency alerts |
| Warning (Amber) | `#d4900a` | Medium risk, caution |
| Success (Green) | `#2d8a4e` | Low risk, healthy status |
| Background | `#f7f6f2` | Warm off-white page background |

### Typography

| Font | Usage |
|---|---|
| **DM Serif Display** | All headings — elegant, trustworthy |
| **Sora** | Body text, labels, buttons — clean and readable |

### Animations
- `animate-fade-up` — elements slide up on page load
- Staggered delays (100ms–500ms) for sequential reveals
- `hover-lift` — cards lift on hover with shadow
- Smooth transitions on all interactive elements

---

## 🌐 Running Without Node.js

If you just need to demo the app without any setup:

1. Download the `health-monitor.html` file (included in this project)
2. Double-click it
3. Opens instantly in any browser — Chrome, Firefox, Edge

This single HTML file contains the complete app with all features, charts, bilingual support, and forms — no installation required.

> Perfect for presentations and demonstrations.

---

## 🔮 Future Improvements

- **Real Backend API** — Connect to Node.js/FastAPI server for storing actual case reports
- **Database Integration** — PostgreSQL or MongoDB for persistent village health data
- **Real-time Updates** — WebSocket or Firebase for live dashboard without page refresh
- **SMS Alerts** — Notify health workers via SMS when high-risk cases are reported
- **Offline Support** — PWA (Progressive Web App) so it works without internet in remote areas
- **GPS Location** — Auto-detect village based on device location
- **Photo Evidence** — Allow attaching photos when reporting cases
- **Admin Panel** — Health authority dashboard to manage and respond to reports
- **Data Export** — Export reports as PDF or Excel for government submissions
- **More Languages** — Add Bodo, Meitei, and other Northeast India languages

---

## 👥 Team

Built for the **Inter College Smart India Hackathon (SIH)**



---

## 📄 License

This project was built for educational and hackathon purposes.

---

## 🙏 Acknowledgements

- [shadcn/ui](https://ui.shadcn.com/) — Component library
- [Recharts](https://recharts.org/) — Chart library
- [Lucide](https://lucide.dev/) — Icons
- [Radix UI](https://www.radix-ui.com/) — Accessible primitives
- [Google Fonts](https://fonts.google.com/) — DM Serif Display & Sora fonts
- National Health Mission (NHM) — For inspiring the problem statement

---

*Made with ❤️ for rural communities of Northeast India*