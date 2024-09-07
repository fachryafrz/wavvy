import "../globals.css";
import Sidebar from "@/components/Layout/Sidebar";

export default function RootLayout({ children }) {
  return <Sidebar>{children}</Sidebar>;
}
