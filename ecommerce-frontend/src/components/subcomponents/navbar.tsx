import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
  };

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        
        {/* Brand */}
        <Link to="/dashboard" className="text-xl font-semibold">
          🛒 E-Commerce Admin
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/dashboard" className="hover:text-primary">Dashboard</Link>
          <Link to="/products" className="hover:text-primary">Products</Link>
          <Link to="/orders" className="hover:text-primary">Orders</Link>
          <Link to="/users" className="hover:text-primary">Users</Link>

          {/* Avatar + Logout */}
          <div className="flex items-center gap-3 ml-4">
            <Avatar>
              <AvatarFallback>U</AvatarFallback>
            </Avatar>

            <Button variant="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              {open ? <X /> : <Menu />}
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="p-6">
            <nav className="flex flex-col gap-5 text-lg">
              <Link to="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
              <Link to="/products" onClick={() => setOpen(false)}>Products</Link>
              <Link to="/orders" onClick={() => setOpen(false)}>Orders</Link>
              <Link to="/users" onClick={() => setOpen(false)}>Users</Link>

              <Button className="mt-4" onClick={handleLogout}>
                Logout
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
