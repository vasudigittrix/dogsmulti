"use client";
import { baselightTheme } from "@/utils/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import DashboardLayout from "@/layouts/dashboard";
import EmplDashboardLayout from "@/layouts/employeedashboard";
import dynamic from "next/dynamic";
import Loading from "@/layouts/loading";

export default function RootLayout({
  children,
}) {
  const router = useRouter();
  const { data: session } = useSession();
  const role = session?.user?.role;
  const Layout = role === 'admin' ? DashboardLayout : EmplDashboardLayout;
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={baselightTheme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
