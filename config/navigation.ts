import {
  Clock,
  Home,
  LayoutDashboard,
  NotebookPen,
  QrCode,
  Trophy,
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
    name: "Challenges",
    href: "/challenges",
    icon: Trophy,
  },
  {
    name: "QR Code",
    href: "/qr-code",
    icon: QrCode,
  },
  { name: "Landing Page", href: "https://hackcanada.org", icon: Home },
  {
    name: "Admin",
    href: "/admin",
    icon: LayoutDashboard,
    adminOnly: true,
  },
];
