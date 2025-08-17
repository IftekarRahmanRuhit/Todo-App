import { Link } from "react-router";
import { ModeToggle } from "../mode-toggler/mode-toggler";
import { Home, CheckSquare, Users, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/tasks", label: "Tasks", icon: CheckSquare },
    { to: "/users", label: "Users", icon: Users },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-xl font-bold text-foreground hover:text-primary transition-colors duration-200"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <CheckSquare className="h-5 w-5" />
              </div>
              <span className="hidden sm:inline-block">MyTodo</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
            
            {/* Theme Toggle */}
            <div className="ml-4 flex items-center space-x-2">
              <div className="h-6 w-px bg-border" />
              <ModeToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-200"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 border-t">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="flex items-center space-x-3 rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              
              {/* Mobile Theme Toggle */}
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-sm font-medium text-muted-foreground">Theme</span>
                <ModeToggle />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
