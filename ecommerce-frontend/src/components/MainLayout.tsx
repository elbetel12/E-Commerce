import { ReactNode } from "react";
import Navbar from "./subcomponents/navbar";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="p-6 md:p-10">{children}</main>
    </div>
  );
}
