export const navigations = [
  { name: "Dashboard", path: "/dashboard/default", icon: "home" },
  { name: "Riwayat", path: "/Riwayat/client", icon: "history" },
  { name: "Kelola Komoditas", path: "/KelolaKomoditas/client", icon: "build" },
<<<<<<< HEAD
  { name: "Konfigurasi Alat", path: "/konfigurasi/client", icon: "cable" },
=======
  // { name: "Konfigurasi Alat", path: "/konfigurasi/client", icon: "cable" },
>>>>>>> 62c8a381df22c34c038941cb6b0f4895be2126fe
  { name: "Layanan", path: "/Layanan/client", icon: "person" },
  {
    name: "Informasi Layanan",
    path: "",
    icon: "help",
    children: [
      { name: "Layanan A", path: "/InformasiLayanan/client", iconText: "A" },
    ],
  },
  { name: "Kelola Alat", path: "/Kelola_Alat/client", icon: "construction" },
  {
    name: "Laporan",
    icon: "settings",
    children: [{ name: "Laporan A", path: "/Laporan/client", iconText: "A" }],
  },
  {
    name: "Ubah Profil Pengguna",
    path: "/Ubah_Profil/client",
    icon: "settings",
  },
  { label: "Components", type: "label" },

  {
    name: "Session/Auth",
    icon: "security",
    children: [
      { name: "Sign in", iconText: "SI", path: "/session/signin" },
      { name: "Sign up", iconText: "SU", path: "/session/signup" },
      {
        name: "Forgot Password",
        iconText: "FP",
        path: "/session/forgot-password",
      },
      { name: "Error", iconText: "404", path: "/session/404" },
    ],
  },
];
