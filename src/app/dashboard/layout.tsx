import { AdminShell } from "./adminShell";

// Force dynamic rendering to avoid database access at build time
export const dynamic = "force-dynamic";

{
  /* @ admin-layout : admin dashboard layout with authentication and role-based access control */
}
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
