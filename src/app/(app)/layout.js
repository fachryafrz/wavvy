import "../globals.css";
import Sidebar from "@/components/Layout/Sidebar";

export default function AppLayout({ children }) {
  return <Sidebar>{children}</Sidebar>;
}
