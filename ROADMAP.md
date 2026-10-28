# Roadmap

What I plan to build next on Taxora, roughly in order. The frontend works with demo data; everything below is about turning it into a real product for US taxpayers.

## Next up

- [ ] Move the tax engine from the 2026 Nigerian rules to US federal income tax: filing status, the standard deduction, the federal brackets, and the result shown as a 1040 style summary. Keep the band by band breakdown the simulator uses.
- [ ] Replace the Nigerian deduction catalogue with common US ones, both above the line items such as retirement and HSA contributions and student loan interest, and itemized ones such as mortgage interest, state and local taxes and charitable gifts, so the suggestion panel compares standard against itemized.
- [ ] Update the filing checklist, compliance score and assistant for the IRS: Form 1040, W-2 and 1099 income, estimated payments and the April deadline. Social security or employer identification numbers in place of the TIN field.
- [ ] Dollar formatting everywhere and US copy on the landing, onboarding, sign up and settings pages.
- [ ] Unit tests for the tax engine and the deduction logic.
- [ ] Fix the current ESLint errors and keep lint clean from then on.

## After that

- [ ] Accounts: sign up and sign in with email and password, sessions, and a protected dashboard.
- [ ] Database: a Postgres schema with Prisma for users, income sources, deductions and filings.
- [ ] API routes so the React Context store reads from and writes to the server instead of demo data.
- [ ] State income tax for the states that have one.
- [ ] Bank account linking to pull income automatically.
- [ ] PDF reports and email delivery.
- [ ] Multiple tax years per account.
- [ ] Notifications and a tax calendar with reminders.
- [ ] Accountant access so a business can invite the person who files for them.
- [ ] Audit trail of every change to financial data.
- [ ] Document upload for W-2s, 1099s and receipts.
- [ ] Two factor authentication.
