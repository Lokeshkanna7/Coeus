// src/Header.jsx

import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logoImg from "./assets/logo/logo.png";

// useMobile hook (no change)
const useMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
};

const Header = () => {
  const isMobile = useMobile(768);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Solutions", href: "#solutions", isAnchor: true },
    { name: "Technology", href: "#technology", isAnchor: true },
    { name: "Benefits", href: "#benefits", isAnchor: true },
    { name: "Careers", href: "/careers", isAnchor: false },
    { name: "Talent Solutions", href: "/talent-solutions", isAnchor: false },
    { name: "Contact", href: "#contact", isAnchor: true },
  ];

  // Close menu on route change (no change)
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Handle anchor scroll logic (no change)
  const handleAnchorClick = useCallback(
    (e, href) => {
      e.preventDefault();
      setIsMenuOpen(false);

      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }
    },
    [location.pathname, navigate]
  );

  return (
    // ✅ CHANGED: Replaced bg-indigo-950 with bg-logo-dark-blue
    <header className="sticky w-full top-0 z-40 bg-logo-dark-blue/80 backdrop-blur-md border-b border-cyan-500/20 shadow-lg">
      <div className="w-full px-4">
        <div className="flex justify-between items-center h-16">
          {/* ✅ Logo */}
          <Link
            to="/"
            className="flex-shrink-0 flex items-center group interactive"
          >
            <img src={logoImg} alt="COEUS Logo" className="h-15 w-auto" />
            <span className="ml-2 text-xl font-bold text-gray-200 group-hover:text-white transition-colors">
            
            </span>
          </Link>

          {/* ✅ Desktop Navigation (only when not mobile) */}
          {!isMobile && (
            <nav className="flex flex-row gap-6 items-center">
              {navLinks.map((link) => {
                const isActive = !link.isAnchor && location.pathname === link.href;

                return (
                  <React.Fragment key={link.name}>
                    {link.isAnchor ? (
                      <a
                        href={link.href}
                        onClick={(e) => handleAnchorClick(e, link.href)}
                        className="font-medium text-gray-300 hover:text-cyan-300 transition-colors interactive"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className={`font-medium transition-colors interactive ${
                          isActive
                            ? "text-cyan-400 font-semibold"
                            : "text-gray-300 hover:text-cyan-300"
                        }`}
                      >
                        {link.name}
                      </Link>
                    )}
                  </React.Fragment>
                );
              })}
            </nav>
          )}

          {/* ✅ Mobile Menu Button (only when mobile) */}
          {isMobile && (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-cyan-100 hover:text-white interactive"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>
      </div>

      {/* ✅ Mobile Dropdown Menu */}
      {isMobile && isMenuOpen && (
        // ✅ CHANGED: Replaced bg-indigo-950 with bg-logo-dark-blue
        <div className="bg-logo-dark-blue/95 border-t border-cyan-500/20 animate-slide-down">
          <nav className="container mx-auto px-4 pt-2 pb-4 flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive = !link.isAnchor && location.pathname === link.href;

              return (
                <React.Fragment key={link.name}>
                  {link.isAnchor ? (
                    <a
                      href={link.href}
                      onClick={(e) => handleAnchorClick(e, link.href)}
                      className="font-medium text-gray-200 hover:text-white p-3 rounded-md hover:bg-cyan-500/10 transition-colors interactive"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`font-medium p-3 rounded-md transition-colors interactive ${
                        isActive
                          ? "text-cyan-400 bg-cyan-500/10 font-semibold"
                          : "text-gray-200 hover:text-white hover:bg-cyan-500/10"
                      }`}
                    >
                      {link.name}
                    </Link>
                  )}
                </React.Fragment>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;