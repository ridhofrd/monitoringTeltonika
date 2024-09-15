export const navigationsAdmin = [
  { name: "Dashboard", path: "/dashboard/admin", icon: "home" },

  {
    name: "Riwayat",
    path: "/Riwayat/admin",
    icon: "speaker_notes"
    // badge: { value: "30+", color: "secondary" },
    // children: [
    //   { name: "Auto Complete", path: "/material/autocomplete", iconText: "A" }
    // ]
  },
  {
    name: "Kelola Alat",
    path: "/Kelola_Alat/admin",
    icon: "shopping_cart"
  },
  {
    name: "Kelola Klien",
    path: "/Kelola_Client/admin",
    icon: "perm_device_information"
  },
  {
    name: "Layanan",
    path: "/Layanan/admin",
    icon: "laptop-2"
  },
  {
    name: "Laporan",
    path: "/Laporan/admin",
    icon: "graphic_eq"
  },
  {
    name: "Pengaturan",
    path: "/Pengaturan/admin",
    icon: "settings"
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
      { name: "Expansion Panel", path: "/material/expansion-panel", iconText: "E" },
      { name: "Form", path: "/material/form", iconText: "F" },
      { name: "Icons", path: "/material/icons", iconText: "I" },
      { name: "Menu", path: "/material/menu", iconText: "M" },
      { name: "Progress", path: "/material/progress", iconText: "P" },
      { name: "Radio", path: "/material/radio", iconText: "R" },
      { name: "Switch", path: "/material/switch", iconText: "S" },
      { name: "Slider", path: "/material/slider", iconText: "S" },
      { name: "Snackbar", path: "/material/snackbar", iconText: "S" },
      { name: "Table", path: "/material/table", iconText: "T" }
    ]
  },
  {
    name: "Session/Auth",
    icon: "security",
    children: [
      { name: "Sign in", iconText: "SI", path: "/session/signin" },
      { name: "Sign up", iconText: "SU", path: "/session/signup" },
      { name: "Forgot Password", iconText: "FP", path: "/session/forgot-password" },
      { name: "Error", iconText: "404", path: "/session/404" }
    ]
  },
  { 
    name: "Charts",
    icon: "trending_up",
    children: [{ name: "Echarts", path: "/charts/echarts", iconText: "E" }]
  },
  {
    name: "Documentation",
    icon: "launch",
    type: "extLink",
    path: "http://demos.ui-lib.com/matx-react-doc/"
  }
];
