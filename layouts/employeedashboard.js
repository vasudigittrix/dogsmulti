"use client";
import { styled, Container, Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import EmployeeSidebar from "@/components/Employee/sidebar/Sidebar";
import { useSession } from "next-auth/react";
import dynamic from 'next/dynamic';
import { Suspense } from "react";
import Loading from "./loading";
const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "transparent",
}));

// interface Props {
//   children: React.ReactNode;
// }



 function EmplDashboardLayout({
  children,
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { data: session, status } = useSession();

  return (
    <MainWrapper className="mainwrapper">
      {session  ? (
        <>
        <EmployeeSidebar
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
      />
     
      <PageWrapper className="page-wrapper">
        <Header toggleMobileSidebar={() => setMobileSidebarOpen(true)} />  
        <Container
          sx={{
            paddingTop: "20px",
            maxWidth: "1200px",
          }}
        >
          <Box sx={{ minHeight: "calc(100vh - 170px)" }}> <Suspense fallback={<Loading />}><main>{children}</main>
          </Suspense>
          </Box>
        </Container>
      </PageWrapper>
      </>
       ):(
        <>
<PageWrapper className="page-wrapper">
        <Container
          sx={{
            paddingTop: "20px",
            maxWidth: "1200px",
          }}
        >
          <Box sx={{ minHeight: "calc(100vh - 170px)" }}> 
            <main><Suspense fallback={<Loading />}>{children}</Suspense></main></Box>
        </Container>
      </PageWrapper>
      </>
       ) }
    </MainWrapper>
  );
}

export default dynamic(() => Promise.resolve(EmplDashboardLayout), { ssr: false });
