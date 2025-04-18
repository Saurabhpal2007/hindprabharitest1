
import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface CategoryItem {
  name: string;
  path: string;
  id: string;
}

interface NavItem {
  name: string;
  path: string;
  id: string;
}

interface DesktopNavigationProps {
  categories: CategoryItem[];
  mainNavigation: NavItem[];
  scrollToSection: (sectionId: string) => void;
}

const DesktopNavigation = ({
  categories,
  mainNavigation,
  scrollToSection
}: DesktopNavigationProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <nav className="hidden md:flex items-center space-x-2">
      {mainNavigation.map((item) => {
        if (item.id === "categories") {
          return (
            <div key={item.id} className="group relative">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "px-3 py-1.5 text-sm font-medium transition-colors hover:text-primary flex items-center rounded-md",
                    isActive ? "text-primary" : ""
                  )
                }
              >
                {item.name}
                <svg
                  className="ml-1 h-3 w-3 text-muted-foreground transition-transform group-hover:rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </NavLink>
              
              <div className="absolute left-0 top-full z-50 mt-1 hidden w-56 overflow-hidden rounded-md border bg-popover p-1 shadow-lg group-hover:block">
                {categories.map((category) => (
                  <NavLink
                    key={category.id}
                    to={category.path}
                    className={({ isActive }) =>
                      cn(
                        "block px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md",
                        isActive ? "bg-accent text-accent-foreground" : ""
                      )
                    }
                  >
                    {category.name}
                  </NavLink>
                ))}
              </div>
            </div>
          );
        } else {
          return (
            <NavLink
              key={item.id}
              to={item.path}
              onClick={(e) => {
                if (isHomePage && ["home", "trending", "categories", "latest", "about", "contact"].includes(item.id)) {
                  e.preventDefault();
                  scrollToSection(item.id);
                }
              }}
              className={({ isActive }) =>
                cn(
                  "px-3 py-2 text-sm font-medium transition-colors hover:text-primary rounded-md relative group",
                  isActive ? "text-primary" : ""
                )
              }
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
          );
        }
      })}
    </nav>
  );
};

export default DesktopNavigation;
