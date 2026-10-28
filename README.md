# Taxora

A tax management and filing platform for people in the United States. It gives individuals and small businesses one place to record income, find the deductions and credits they are entitled to, see their federal tax liability, and prepare what they need for filing with the IRS.

This is my own project. The frontend is working and the backend is the next phase.

## Status

The web app runs with demo data held in a React Context store, so you can open the dashboard and use every screen straight away. Nothing is persisted yet: there is no sign in, no database and no API.

The code base started life as a version for Nigeria, and the tax engine, deduction rules, filing checklist and page copy still follow the 2026 Nigerian personal income tax law. Moving all of that to US federal income tax is the first item in [ROADMAP.md](ROADMAP.md), followed by accounts and a real backend.

## What works today

All of this works against the Nigerian rules until the US conversion lands.

- Tax engine with a tax free threshold, a relief allowance and progressive bands, plus an early version of corporate tax tiers.
- Income sources: add, edit and remove sources and see the effect on the final liability immediately.
- Deduction suggestions: the app compares your income profile with the deductions available and shows the saving each one would give.
- Tax simulator: charts that show how gross income, reliefs and deductions lead to taxable income.
- Filing and reports: a checklist of what is still needed before filing, plus a CSV export with the full calculation.
- Compliance score: a 0 to 100 figure that tracks how complete the profile is.
- Filing assistant: a floating panel that points out risky situations and suggests the next action.

## Built with

- Next.js 16 with the App Router, React 19, TypeScript
- Tailwind CSS v4
- Radix UI primitives wrapped as small components in src/micro-components
- Recharts for the charts, Motion for the assistant panel

## Run it

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the environment example and fill in your own values. None of them are needed to run the frontend with demo data today.

   ```bash
   cp .env.example .env
   ```

3. Start the dev server:

   ```bash
   npm run dev
   ```

   Open http://localhost:3000 for the landing page and choose "Get Started Free" to open the dashboard.

Other scripts: `npm run lint` runs ESLint and `npm run build` makes a production build.

## Project layout

```
src/app/                 routes (App Router): landing, signin, signup, dashboard
  dashboard/             overview, transactions, deductions, taxestimation, reports, settings
src/dashboard_component/ the dashboard screens and shell
src/pages_component/     landing, onboarding, sign in and sign up screens
src/micro-components/    shared UI components built on Radix
src/lib/                 tax engine, deduction suggestions, compliance and filing services, context store
src/mock-data/           demo data loaded into the context store
public/images/           static images
```

## License

[MIT](LICENSE)
