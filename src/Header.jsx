import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logoImg from "./assets/logo/logo.png";

// ✅ useMobile hook (768px breakpoint)
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

  // ✅ Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // ✅ Handle anchor scroll logic
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
    <header className="sticky w-full top-0 z-40 bg-gray-900/80 backdrop-blur-md border-b border-cyan-500/20 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* ✅ Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center -ml-4">
            <img src={logoImg} alt="COEUS Logo" className="h-15 w-auto" />
            <span className="ml-3 text-xl font-bold text-white"></span>
          </Link>

          {/* ✅ Desktop Navigation (only when not mobile) */}
          {!isMobile && (
            <nav className="flex flex-row gap-5 items-center">
              {navLinks.map((link) => (
                <React.Fragment key={link.name}>
                  {link.isAnchor ? (
                    <a
                      href={link.href}
                      onClick={(e) => handleAnchorClick(e, link.href)}
                      className="font-medium text-cyan-100 hover:text-white transition-colors interactive"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="font-medium text-cyan-100 hover:text-white transition-colors interactive"
                    >
                      {link.name}
                    </Link>
                  )}
                </React.Fragment>
              ))}
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
        <div className="bg-gray-900/95 border-t border-cyan-500/20">
          <nav className="container mx-auto px-4 pt-2 pb-4 flex flex-col space-y-2">
            {navLinks.map((link) => (
              <React.Fragment key={link.name}>
                {link.isAnchor ? (
                  <a
                    href={link.href}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="font-medium text-cyan-100 hover:text-white p-2 rounded-md hover:bg-cyan-500/10 transition-colors interactive"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    to={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="font-medium text-cyan-100 hover:text-white p-2 rounded-md hover:bg-cyan-500/10 transition-colors interactive"
                  >
                    {link.name}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
