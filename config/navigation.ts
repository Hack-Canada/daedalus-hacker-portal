import {
  Clock,
  Home,
  LayoutDashboard,
  NotebookPen,
  QrCode,
  ScanQrCode,
  // ShoppingCart,
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
  {
    name: "Scanner",
    href: "/scanner",
    icon: ScanQrCode,
    requiresVolunteer: true, // Only show for volunteers/organizers/admins
  },
  // {
  //   name: "Shop",
  //   href: "/shops",
  //   icon: ShoppingCart,
  // },
  { name: "Landing Page", href: "https://hackcanada.org", icon: Home },
];
