import { lazy } from "react";
import { Navigate } from "react-router-dom";

import AuthGuard from "./auth/AuthGuard";
import { authRoles } from "./auth/authRoles";

import Loadable from "./components/Loadable";
import MatxLayout from "./components/MatxLayout/MatxLayout";

import materialRoutes from "app/views/material-kit/MaterialRoutes";

// SESSION PAGES
const NotFound = Loadable(lazy(() => import("app/views/sessions/NotFound")));
const JwtLogin = Loadable(lazy(() => import("app/views/sessions/JwtLogin")));
const JwtRegister = Loadable(lazy(() => import("app/views/sessions/JwtRegister")));
const ForgotPassword = Loadable(lazy(() => import("app/views/sessions/ForgotPassword")));
const OTP = Loadable(lazy(() => import("app/views/sessions/OTP")));
const ResetPassword = Loadable(lazy(() => import("app/views/sessions/ResetPassword")));
const PasswordSuccess = Loadable(lazy(() => import("app/views/sessions/PasswordSuccess")));
// E-CHART PAGE
const AppEchart = Loadable(lazy(() => import("app/views/charts/echarts/AppEchart")));

// DASHBOARD PAGE CLIENT
const Analytics = Loadable(lazy(() => import("app/views/dashboard/Analytics")));
// DASHBOARD PAGE ADMIN
const AnalyticsAdmin = Loadable(lazy(() => import("app/views/dashboard/Analytics(Admin)")));

// DASHBOARD PAGE
const Dashboard = Loadable(lazy(() => import("app/views/dashboard/Analytics")));
const Riwayat = Loadable(lazy(() => import("app/views/Riwayat/RiwayatAdmin")));
const Pengaturan = Loadable(lazy(() => import("app/views/Pengaturan/Pengaturan")));
const Layanan = Loadable(lazy(() => import("app/views/Layanan/Layanan")));
const Laporan = Loadable(lazy(() => import("app/views/Laporan/Laporan")));
const Kelola_Client = Loadable(lazy(() => import("app/views/Kelola_Client/Kelola_Client")));
const Kelola_Alat = Loadable(lazy(() => import("app/views/Kelola_Alat/Kelola_Alat")));

const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      ...materialRoutes,
      // dashboard route

      { path: "/dashboard/client", element: <Analytics />, auth: authRoles.client },
      // dashboard route untuk admin
      { path: "/dashboard/admin", element: <AnalyticsAdmin />, auth: authRoles.admin },

      { path: "/dashboard/default", element: <Dashboard />, auth: authRoles.admin },
      { path: "/Riwayat/default", element: <Riwayat />, auth: authRoles.admin },
      { path: "/Kelola_Alat/default", element: <Kelola_Alat />, auth: authRoles.admin },
      { path: "/Kelola_Client/default", element: <Kelola_Client />, auth: authRoles.admin },
      { path: "/Layanan/default", element: <Layanan />, auth: authRoles.admin },
      { path: "/Laporan/default", element: <Laporan />, auth: authRoles.admin },
      { path: "/Pengaturan/default", element: <Pengaturan />, auth: authRoles.admin },

      // e-chart route
      { path: "/charts/echarts", element: <AppEchart />, auth: authRoles.editor }
    ]
  },

  // session pages route
  { path: "/session/404", element: <NotFound /> },
  { path: "/session/signin", element: <JwtLogin /> },
  { path: "/session/signup", element: <JwtRegister /> },
  { path: "/session/forgot-password", element: <ForgotPassword /> },
  { path: "/session/OTP", element: <OTP /> },
  { path: "/session/ResetPassword", element: <ResetPassword /> },
  { path: "/session/PasswordSuccess", element: <PasswordSuccess /> },


  { path: "/", element: <Navigate to="dashboard/client" /> },
  { path: "*", element: <NotFound /> }
];

export default routes;
