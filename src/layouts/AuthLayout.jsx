import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Outlet />
      </main>
    </div>
  );
}