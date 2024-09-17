import "../globals.css";
import Sidebar from "@/components/Layout/Sidebar";

export default function AppLayout({ children }) {
  const authorizationURL = process.env.AUTHORIZATION_URL;
  const client_id = process.env.CLIENT_ID;

  return (
    <Sidebar authorizationURL={authorizationURL} client_id={client_id}>
      {children}
    </Sidebar>
  );
}
