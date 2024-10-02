export const navigations = [
  { name: "Dashboard", path: "/dashboard/default", icon: "home" },
  { name: "Riwayat", path: "/Riwayat/client", icon: "history" },
  {
    name: "Kelola Alat",
    icon: "report",
    children: [{ name: "Alat", path: "/Kelola_Alat/client", iconText: "A" }],
  },
  { name: "Kelola Komoditas", path: "/KelolaKomoditas/client", icon: "build" },
  { name: "Layanan", path: "/Layanan/client", icon: "person" },
  {
    name: "Informasi Layanan",
    path: "",
    icon: "help",
    children: [
      { name: "Layanan A", path: "/InformasiLayanan/client", iconText: "A" },
    ],
  },
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
    name: "Components",
    icon: "favorite",
    badge: { value: "30+", color: "secondary" },
    children: [
      { name: "Auto Complete", path: "/material/autocomplete", iconText: "A" },
      { name: "Buttons", path: "/material/buttons", iconText: "B" },
      { name: "Checkbox", path: "/material/checkbox", iconText: "C" },
      { name: "Dialog", path: "/material/dialog", iconText: "D" },
      {
        name: "Expansion Panel",
        path: "/material/expansion-panel",
        iconText: "E",
      },
      { name: "Form", path: "/material/form", iconText: "F" },
      { name: "Icons", path: "/material/icons", iconText: "I" },
      { name: "Menu", path: "/material/menu", iconText: "M" },
      { name: "Progress", path: "/material/progress", iconText: "P" },
      { name: "Radio", path: "/material/radio", iconText: "R" },
      { name: "Switch", path: "/material/switch", iconText: "S" },
      { name: "Slider", path: "/material/slider", iconText: "S" },
      { name: "Snackbar", path: "/material/snackbar", iconText: "S" },
      { name: "Table", path: "/material/table", iconText: "T" },
    ],
  },
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
  {
    name: "Charts",
    icon: "trending_up",
    children: [{ name: "Echarts", path: "/charts/echarts", iconText: "E" }],
  },
];
