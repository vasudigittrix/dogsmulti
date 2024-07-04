import "@/styles/globals.css";
// import DashboardLayout from "./dashboard/layout";
import DashboardLayout from "@/layouts/dashboard";
import EmplDashboardLayout from "@/layouts/employeedashboard";
// import RootLayout from "./layout";
import dynamic from "next/dynamic";
import store from "@/store";
import { Provider } from 'react-redux';
import { SessionProvider } from "next-auth/react"
const RootLayout = dynamic(() => import('./layout'), { ssr: false });
export default function App({ Component, session, pageProps }) {
  return (
    <SessionProvider session={session}>
    
    
    <Provider store={store}>
    <RootLayout>
      <Component {...pageProps} />
      </RootLayout>
      </Provider>
    
    </SessionProvider>
  );
}