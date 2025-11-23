// src/Header.jsx

import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
// MAKE SURE THIS PATH POINTS TO THE NEW CROPPED IMAGE
import logoImg from "./assets/logo/1000077413-removebg-preview.png"; 

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

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

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
    <header className="sticky w-full top-0 z-40 bg-logo-dark-blue/80 backdrop-blur-md border-b border-cyan-500/20 shadow-lg">
      <div className="w-full px-4">
        {/* ✅ UPDATED: Container is now taller (h-24 mobile, h-32 desktop) */}
        <div className="flex justify-between items-center h-22 md:h-28 transition-all duration-300">
          
          <Link
            to="/"
            className="flex-shrink-0 flex items-center group interactive py-2"
          >
            {/* ✅ UPDATED: Logo is now much larger (h-20 mobile, h-28 desktop) */}
            <img 
              src={logoImg} 
              alt="COEUS Logo" 
              className="h-24 md:h-38 w-auto object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105" 
            />
          </Link>

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
                        className="font-medium text-gray-300 hover:text-cyan-300 transition-colors interactive text-lg"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className={`font-medium transition-colors interactive text-lg ${
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

          {isMobile && (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-cyan-100 hover:text-white interactive"
            >
              {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          )}
        </div>
      </div>

      {isMobile && isMenuOpen && (
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