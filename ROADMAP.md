# Roadmap

What I plan to build next on Taxora, roughly in order. The frontend works with demo data; everything below is about making it a real product.

## Next up

- [ ] Accounts: sign up and sign in with email and password, sessions, and a protected dashboard. Google sign in can come later.
- [ ] Database: a Postgres schema with Prisma for users, income sources, deductions and filings.
- [ ] API routes for the dashboard data so the React Context store reads from and writes to the server instead of demo data.
- [ ] Settings that persist, including the tax year and profile details.
- [ ] Fix the current ESLint errors and keep lint clean from then on.

## After that

- [ ] Bank account linking to pull income automatically.
- [ ] TIN verification against the FIRS service.
- [ ] PDF reports and email delivery.
- [ ] Multiple tax years per account.
- [ ] Notifications and a tax calendar with reminders.
- [ ] Accountant access so a business can invite the person who files for them.
- [ ] Audit trail of every change to financial data.
- [ ] Document upload for receipts and certificates.
- [ ] Two factor authentication.
- [ ] Withholding tax calculator and invoice generation.
