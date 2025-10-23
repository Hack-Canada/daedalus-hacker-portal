import {
  Clock,
  Home,
  LayoutDashboard,
  NotebookPen,
  QrCode,
  User,
} from "lucide-react";

export const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    name: "Applications",
    href: "/applications",
    icon: NotebookPen,
  },
  {
    name: "Schedule",
    href: "/schedule",
    icon: Clock,
  },
  {
    name: "QR Code",
    href: "/qr-code",
    icon: QrCode,
  },
  { name: "Landing Page", href: "https://hackcanada.org", icon: Home },
];
