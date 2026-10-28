# Taxora

A tax management and filing platform for Nigeria, built around the 2026 Nigerian tax law. It gives individuals and small businesses one place to record income, find the deductions they are entitled to, see their exact tax liability, and prepare reports for the Federal Inland Revenue Service and the state revenue services.

This is my own project. The frontend is working and the backend is the next phase.

## Status

The web app runs with demo data held in a React Context store, so you can open the dashboard and use every screen straight away. Nothing is persisted yet: there is no sign in, no database and no API. See [ROADMAP.md](ROADMAP.md) for the order I intend to build those in.

## What works today

- Tax engine for the 2026 Personal Income Tax rules: the consolidated relief allowance, the 800,000 naira threshold below which no tax is due, and the progressive bands from 7% to 24%. There is an early version of the Corporate Income Tax tiers as well.
- Income sources: add, edit and remove sources and see the effect on the final liability immediately.
- Deduction suggestions: the app compares your income profile with the deductions available in Nigeria, such as NHF, life assurance and rent relief, and shows the saving each one would give.
- Tax simulator: charts that show how gross income, the relief allowance and deductions lead to chargeable income.
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

## 2026 Personal Income Tax reference

The engine applies these rules for individual taxpayers:

1. Consolidated relief allowance: the larger of 200,000 naira and 1% of gross income, plus 20% of gross income.
2. Taxable income: gross income less the relief allowance and eligible deductions.
3. If taxable income is 800,000 naira or less, no tax is due.
4. Above that, the bands apply in order:
   - first 300,000 at 7%
   - next 300,000 at 11%
   - next 500,000 at 15%
   - next 500,000 at 19%
   - next 1,600,000 at 21%
   - everything above 3,200,000 at 24%

## License

[MIT](LICENSE)
