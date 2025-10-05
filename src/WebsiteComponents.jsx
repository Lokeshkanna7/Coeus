// =================================================================
// Filename: WebsiteComponents.js
// =================================================================
import React, { useState, useEffect, useRef } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  Menu,
  X,
  ArrowRight,
  Wifi,
  Shield,
  Zap,
  MapPin,
  Phone,
  Mail,
  Cpu,
  Cloud,
  BarChart,
  Activity,
  Map,
  Users,
  Briefcase,
  Award,
  Clock,
  Heart,
  Calendar,
  Cog,
  Play,
  Satellite,
  Brain,
  Sparkles,
  ChevronDown,
  Send,
  FileText,
  UserCheck,
  MessageSquare,
  CheckCircle,
  Target,
  ClipboardList,
  Rocket,
  LifeBuoy,
  ArrowUp,
} from "lucide-react";
import Header from "./Header";
// Import assets to be used as variables
// import logoImg from './assets/logo/Screenshot 2025-09-08 123829.png';
import loadingVideo from "./assets/Screen Recording 2025-09-08 221552.mp4";
import logoImg from "./assets/logo/logo.png";
import automatedInspectionsImg from "./assets/images/Automated Inspections.png";
import predictiveMaintenanceImg from "./assets/images/Predictive Maintenance.png";
import realtimeAnalyticsImg from "./assets/images/Real-time Analytics.png";

import dataCollectionImg from "./assets/images/data_collection.png";
import anomalyDetectionImg from "./assets/images/anomaly_detection.png";
import edgeProcessingImg from "./assets/images/edge_detection.png";
import sapIntegrationImg from "./assets/images/sap_integeration.png";
import fieldResponseImg from "./assets/images/field_response.png";

import preventOutagesImg from "./assets/images/Prevent Outages Before They Happen.png";
import cutCostsImg from "./assets/images/Cut Operational Costs.png";
import scaleIntelligenceImg from "./assets/images/Scale with Intelligence.png";
import sustainabilitySafetyImg from "./assets/images/Sustainability & Safety.png";

// 3D Background Component
const ThreeDBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: `hsl(${Math.random() * 60 + 200}, 70%, ${
          Math.random() * 30 + 50
        }%)`,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) / 1.5
      );
      gradient.addColorStop(0, "rgba(10, 25, 47, 0.9)");
      gradient.addColorStop(1, "rgba(25, 55, 109, 0.6)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        for (let j = index + 1; j < particles.length; j++) {
          const dx = particle.x - particles[j].x;
          const dy = particle.y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(100, 200, 255, ${0.2 - distance / 500})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0"
      style={{
        background: "linear-gradient(135deg, #0a192f 0%, #19376d 100%)",
      }}
    />
  );
};

// Custom Cursor Component
const CustomCursor = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // This effect re-runs when the components update to find new interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, .interactive"
    );

    const handleMouseEnter = () => setCursorVariant("hover");
    const handleMouseLeave = () => setCursorVariant("default");

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []); // Re-run this effect only once on mount for general setup

  // A secondary effect to re-bind events when the page content changes
  useEffect(() => {
    const interactiveElements = document.querySelectorAll(
      "a, button, .interactive"
    );

    const handleMouseEnter = () => setCursorVariant("hover");
    const handleMouseLeave = () => setCursorVariant("default");

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }); // This effect runs on every render to catch new elements

  return (
    <div
      className={`fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 transition-all duration-100 ease-out ${
        cursorVariant === "hover"
          ? "w-8 h-8 bg-cyan-500/30 border-2 border-cyan-500 backdrop-blur-sm"
          : "w-6 h-6 bg-cyan-500/10 border border-cyan-300"
      } rounded-full flex items-center justify-center`}
      style={{
        left: `${cursorPosition.x}px`,
        top: `${cursorPosition.y}px`,
      }}
    >
      <div
        className={`w-1 h-1 bg-cyan-500 rounded-full ${
          cursorVariant === "hover" ? "scale-150" : ""
        } transition-transform`}
      ></div>
    </div>
  );
};

// Reusable Header Component with anchor link handling
// // src/WebsiteComponents.jsx
// const Header = () => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const navLinks = [
//     { name: 'Solutions', href: '#solutions', isAnchor: true },
//     { name: 'Technology', href: '#technology', isAnchor: true },
//     { name: 'Benefits', href: '#benefits', isAnchor: true },
//     { name: 'Careers', href: '/careers', isAnchor: false },
//     { name: 'Talent Solutions', href: '/talent-solutions', isAnchor: false },
//     { name: 'Contact', href: '#contact', isAnchor: true }
//   ];

//   // This function correctly handles clicks on anchor links
//   const handleAnchorClick = (href, e) => {
//     e.preventDefault();
//     setMobileMenuOpen(false); // Close mobile menu on click
//     if (location.pathname !== '/') {
//       // If we are not on the homepage, navigate to the homepage with the hash
//       navigate(`/${href}`);
//     } else {
//       // If we are on the homepage, just scroll smoothly
//       document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   return (
//     <header className="sticky top-0 z-40 bg-gray-900/80 backdrop-blur-md border-b border-cyan-500/20 shadow-lg">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <Link to="/" className="flex-shrink-0 flex items-center" onClick={() => setMobileMenuOpen(false)}>
//             <img src={logoImg} alt="COEUS Logo" className="h-10 w-auto" />
//           </Link>

//           {/* ====== DESKTOP NAVIGATION ====== */}
//           {/* This <nav> is hidden by default and becomes a flex container on medium screens ('md') and larger. */}
//           {/* This is the standard, correct way to create a responsive header. */}
//           <nav className="hidden md:flex items-center space-x-8">
//             {navLinks.map((link) => (
//               <React.Fragment key={link.name}>
//                 {link.isAnchor ? (
//                   <a href={link.href} onClick={(e) => handleAnchorClick(link.href, e)} className="font-medium text-cyan-100 hover:text-white transition-colors">
//                     {link.name}
//                   </a>
//                 ) : (
//                   <Link to={link.href} className="font-medium text-cyan-100 hover:text-white transition-colors">
//                     {link.name}
//                   </Link>
//                 )}
//               </React.Fragment>
//             ))}
//           </nav>

//           {/* ====== MOBILE MENU BUTTON ====== */}
//           {/* This button is visible only on small screens and is hidden on medium screens ('md') and larger. */}
//           <div className="md:hidden">
//             <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-cyan-100 hover:text-white">
//               {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ====== MOBILE MENU DROPDOWN ====== */}
//       {/* This entire block is only rendered when `mobileMenuOpen` is true. */}
//       {/* The `md:hidden` class ensures it never appears on desktop, even if the state is true. */}
//       {mobileMenuOpen && (
//         <div className="md:hidden bg-gray-900/95 border-t border-cyan-500/20">
//           <nav className="container mx-auto px-4 pt-2 pb-4 flex flex-col space-y-2">
//             {navLinks.map((link) => (
//               <React.Fragment key={link.name}>
//                 {link.isAnchor ? (
//                   <a href={link.href} onClick={(e) => handleAnchorClick(link.href, e)} className="font-medium text-cyan-100 hover:text-white p-2 rounded-md hover:bg-cyan-500/10 transition-colors">
//                     {link.name}
//                   </a>
//                 ) : (
//                   <Link to={link.href} onClick={() => setMobileMenuOpen(false)} className="font-medium text-cyan-100 hover:text-white p-2 rounded-md hover:bg-cyan-500/10 transition-colors">
//                     {link.name}
//                   </Link>
//                 )}
//               </React.Fragment>
//             ))}
//           </nav>
//         </div>
//       )}
//     </header>
//   );
// };
// Loading Screen Component 
const LoadingScreen = ({ isLoading, progress, displayText }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center z-50 overflow-hidden">
      <div className="text-center relative w-full max-w-md mx-4 z-10">
        <div className="mb-4 relative">
          <div className="relative mx-auto w-full max-w-xs">
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl blur-lg animate-pulse" />
            <div className="relative bg-gradient-to-br from-cyan-900/40 via-blue-900/40 to-purple-900/40 rounded-lg p-0.5 backdrop-blur-xl border border-cyan-500/30 shadow-md">
              <div className="relative rounded-md overflow-hidden bg-black/20 min-h-[120px] flex items-center justify-center">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover rounded-md"
                  style={{ opacity: 1, transition: "opacity 1s ease-in-out" }}
                >
                  <source src={loadingVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center pb-2">
                  <div className="text-cyan-300 text-xs font-mono tracking-widest">
                    INITIALIZING...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="relative mx-auto w-20 h-20 mb-4">
            <div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 animate-ping"
              style={{ animationDuration: "3s" }}
            />
            <div className="absolute inset-0 rounded-full border-4 border-cyan-800/30" />
            <div
              className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan-400 animate-spin"
              style={{
                clipPath: `polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%)`,
                transform: `rotate(${progress * 3.6}deg)`,
                transition: "transform 0.3s ease-out",
              }}
            />
            <div className="absolute inset-3 rounded-full bg-gradient-to-br from-cyan-900/40 to-blue-900/40 backdrop-blur-sm border border-cyan-500/20 flex items-center justify-center">
              <div className="text-center">
                <span className="text-cyan-300 text-xl font-bold block">
                  {Math.round(progress)}%
                </span>
                <span className="text-cyan-400 text-xs font-mono">
                  COMPLETE
                </span>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-cyan-300 mb-3 font-mono text-lg tracking-wider">
              <span className="inline-block min-w-[180px] text-center">
                {displayText}
                <span className="animate-blink">...</span>
              </span>
            </p>
            <div className="w-48 mx-auto bg-cyan-900/30 rounded-full h-1.5 mb-2">
              <div
                className="bg-gradient-to-r from-cyan-400 to-blue-500 h-1.5 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="flex justify-center space-x-4 mb-4">
            {[
              <Cpu key="cpu" />,
              <Satellite key="sat" />,
              <Brain key="brain" />,
              <Cloud key="cloud" />,
            ].map((Icon, index) => (
              <div
                key={index}
                className="w-8 h-8 bg-cyan-900/30 rounded-lg flex items-center justify-center border border-cyan-500/20 animate-bounce"
                style={{ animationDelay: index * 0.3 + "s" }}
              >
                {React.cloneElement(Icon, {
                  className: "text-cyan-400 w-4 h-4",
                })}
              </div>
            ))}
          </div>

          <div className="text-cyan-400 font-mono text-xs tracking-widest">
            {progress < 50
              ? "SYSTEM BOOTING"
              : progress < 80
              ? "CALIBRATING"
              : "FINALIZING"}
          </div>
        </div>
      </div>
    </div>
  );
};

// Back to Top Button Component
const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 p-3 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg interactive transition-all duration-300 transform
            ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
            } hover:scale-110 hover:shadow-cyan-500/40 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75`}
    >
      <ArrowUp size={24} />
    </button>
  );
};

// Main Website Component (HOMEPAGE)
const DroneCompanyWebsite = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [displayText, setDisplayText] = useState("Booting sequence");
  const location = useLocation();

  // Loading logic
  useEffect(() => {
    const minimumLoadingTime = 4000;
    const startTime = Date.now();
    const totalTime = 5000;
    const intervalTime = 50;
    const totalSteps = totalTime / intervalTime;
    const progressIncrement = 100 / totalSteps;

    const loadingInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + progressIncrement;
        const elapsedTime = Date.now() - startTime;
        if (newProgress >= 100 && elapsedTime >= minimumLoadingTime) {
          clearInterval(loadingInterval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, intervalTime);

    const textUpdates = [
      { percent: 10, text: "Initializing systems" },
      { percent: 30, text: "Calibrating sensors" },
      { percent: 50, text: "Loading AI modules" },
      { percent: 70, text: "Establishing connection" },
      { percent: 85, text: "Finalizing setup" },
    ];

    const textInterval = setInterval(() => {
      setProgress((currentProgress) => {
        const applicableUpdates = textUpdates.filter(
          (t) => currentProgress >= t.percent
        );
        if (applicableUpdates.length > 0) {
          const newText = applicableUpdates[applicableUpdates.length - 1].text;
          if (displayText !== newText) {
            setDisplayText(newText);
          }
        }
        return currentProgress;
      });
    }, 100);

    return () => {
      clearInterval(loadingInterval);
      clearInterval(textInterval);
    };
  }, []);

  // Handle direct anchor link access after loading
  useEffect(() => {
    if (!isLoading && location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [isLoading, location.hash]);

  // Reset scroll when navigating to a new page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Scroll animation logic for feature cards
  useEffect(() => {
    if (isLoading) return;

    const checkScroll = () => {
      const elements = document.querySelectorAll(".feature-card, .stat-item");
      elements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        if (elementPosition < screenPosition) {
          element.classList.add("animate");
        }
      });
    };

    window.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();

    return () => window.removeEventListener("scroll", checkScroll);
  }, [isLoading]);

  return (
    <div className="min-h-screen w-full text-gray-100 font-sans overflow-x-hidden relative">
      <ThreeDBackground />
      <CustomCursor />
      <BackToTopButton />
      <LoadingScreen
        isLoading={isLoading}
        progress={progress}
        displayText={displayText}
      />

      {/* FIX: Removed unused props. Header now manages its own state. */}
      {/* <Header /> */}

      <div
        className={
          isLoading
            ? "opacity-0"
            : "opacity-100 transition-opacity duration-500 relative z-10"
        }
      >
        {/* Hero Section */}
        <section
          id="home"
          className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
        >
          <div className="container mx-auto px-4 text-center z-20 relative">
            <div className="mb-8">
              <div className="inline-block bg-cyan-500/10 px-4 py-2 rounded-full mb-6 border border-cyan-500/30">
                <span className="text-cyan-300 text-sm font-medium">
                  Innovating Grid Reliability
                </span>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Real-Time Electrical Line Monitoring & Automation
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-cyan-100">
              Revolutionizing Grid Reliability with AI, IoT & SAP Integration
            </p>
            <p className="text-lg mb-12 max-w-4xl mx-auto text-cyan-200">
              Welcome to the future of electrical infrastructure management. Our
              platform delivers real-time detection of electrical line anomalies
              using a proprietary Follow-the-Wire model, seamlessly integrated
              with IoT-connected drones, edge computing, and SAP BTP/CPI for
              automated work order generation.
            </p>
            {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#solutions" 
                onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#solutions')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 px-10 rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/30 interactive group w-auto justify-center"
              >
                Explore Solutions
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#contact" 
                onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center bg-transparent text-cyan-300 font-bold py-4 px-10 rounded-xl hover:bg-cyan-500/10 transition-all transform hover:scale-105 border border-cyan-500/30 shadow-sm interactive"
              >
                Contact Us
              </a>
            </div> */}
          </div>
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-cyan-500 rounded-full mt-2"></div>
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section id="solutions" className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                Our Solutions
              </span>
            </h2>
            <div className="text-center text-cyan-200 max-w-3xl mx-auto">
              <p className="text-lg">
                We provide cutting-edge solutions for electrical grid monitoring
                and maintenance using advanced drone technology, AI, and IoT
                integration.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {[
                {
                  title: "Automated Inspections",
                  description:
                    "AI-powered drones autonomously inspect electrical infrastructure with precision",
                  icon: <Satellite size={48} className="text-cyan-400" />,
                  imageSrc: automatedInspectionsImg,
                },
                {
                  title: "Predictive Maintenance",
                  description:
                    "Machine learning algorithms predict failures before they occur",
                  icon: <Brain size={48} className="text-cyan-400" />,
                  imageSrc: predictiveMaintenanceImg,
                },
                {
                  title: "Real-time Analytics",
                  description:
                    "Instant insights into grid health and performance metrics",
                  icon: <BarChart size={48} className="text-cyan-400" />,
                  imageSrc: realtimeAnalyticsImg,
                },
              ].map((solution, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-cyan-500/20 interactive feature-card opacity-0 transform translate-y-10 transition-all duration-700 hover:border-cyan-500/40 hover:bg-gray-800/70 max-w-5xl w-full mx-auto"
                >
                  <div className="w-20 h-20 bg-cyan-900/30 rounded-xl flex items-center justify-center mb-6 mx-auto">
                    {solution.icon}
                  </div>
                  <img
                    src={solution.imageSrc}
                    alt={solution.title}
                    className="w-full h-48 object-cover rounded-lg mb-6 shadow-lg"
                  />
                  <h3 className="text-2xl font-bold text-white mb-4 text-center">
                    {solution.title}
                  </h3>
                  <p className="text-cyan-200 text-center">
                    {solution.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="technology" className="py-20 relative z-10">
          <div className="container mx-auto p-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                How It Works
              </span>
            </h2>
            <div className="flex flex-col space-y-12 max-w-4xl w-full mx-auto ">
              {[
                {
                  step: "1",
                  title: "Data Collection",
                  description:
                    "IoT-enabled drones scan electrical lines, transmitting real-time data to edge devices.",
                  icon: <Wifi size={32} className="text-cyan-400" />,
                  image: dataCollectionImg,
                },
                {
                  step: "2",
                  title: "Anomaly Detection",
                  description:
                    "Our Follow-the-Wire model analyzes signal patterns and structural integrity to detect faults.",
                  icon: <Activity size={32} className="text-blue-400" />,
                  image: anomalyDetectionImg,
                },
                {
                  step: "3",
                  title: "Edge Processing",
                  description:
                    "Local edge nodes process data instantly, minimizing cloud dependency and latency.",
                  icon: <Cpu size={32} className="text-cyan-400" />,
                  image: edgeProcessingImg,
                },
                {
                  step: "4",
                  title: "SAP Integration",
                  description:
                    "Detected issues are converted into actionable work orders via SAP CPI, routed through SAP BTP for execution.",
                  icon: <Cloud size={32} className="text-blue-400" />,
                  image: sapIntegrationImg,
                },
                {
                  step: "5",
                  title: "Field Response",
                  description:
                    "Maintenance teams receive precise, geo-tagged tasks—accelerating resolution and improving grid reliability.",
                  icon: <BarChart size={32} className="text-cyan-400" />,
                  image: fieldResponseImg,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="w-full max-w-4xl mx-auto flex flex-col md:flex-row items-start interactive feature-card opacity-0 transform translate-y-10 transition-all duration-700 space-y-2"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-6 shadow-lg mb-4 md:mb-0">
                    {item.step}
                  </div>
                  <div className="bg-gray-800/50 backdrop-blur-md max-w-4xl w-full rounded-2xl p-6 border border-cyan-500/20 flex-1 shadow-sm hover:shadow-md transition-shadow hover:border-cyan-500/40">
                    <div className="max-w-4xl w-full flex flex-col md:flex-row items-center md:items-start mb-4">
                      <div className="w-10 h-10 bg-cyan-900/30 rounded-lg flex items-center justify-center mr-4 mb-4 md:mb-0">
                        {item.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-white text-center md:text-left">
                        {item.title}
                      </h3>
                    </div>
                    <div className="flex flex-col md:flex-row items-center">
                      <div className="w-full md:w-1/3 mb-4 md:mb-0 md:mr-6 relative group">
                        <div className="overflow-hidden rounded-lg shadow-md">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg"
                          />
                        </div>
                      </div>
                      <div className="w-full md:w-2/3">
                        <p className="text-cyan-200">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why It Matters Section */}
        <section id="benefits" className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                Why It Matters
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                {
                  title: "Prevent Outages Before They Happen",
                  description:
                    "Proactive detection means fewer blackouts and safer communities.",
                  icon: <Shield size={32} className="text-cyan-400" />,
                  image: preventOutagesImg,
                },
                {
                  title: "Cut Operational Costs",
                  description:
                    "Automating inspections and work orders reduces manual labor and administrative overhead.",
                  icon: <BarChart size={32} className="text-blue-400" />,
                  image: cutCostsImg,
                },
                {
                  title: "Scale with Intelligence",
                  description:
                    "Our modular architecture supports expansion across regions and utility networks.",
                  icon: <Cloud size={32} className="text-cyan-400" />,
                  image: scaleIntelligenceImg,
                },
                {
                  title: "Sustainability & Safety",
                  description:
                    "Reduce carbon footprint with drone inspections and protect workers from hazardous conditions.",
                  icon: <Activity size={32} className="text-blue-400" />,
                  image: sustainabilitySafetyImg,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-cyan-500/20 interactive feature-card opacity-0 transform translate-y-10 transition-all duration-700 shadow-sm hover:shadow-md hover:border-cyan-500/40"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-cyan-900/30 rounded-lg flex items-center justify-center mr-4">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {item.title}
                    </h3>
                  </div>
                  <div className="mb-4 relative group">
                    <div className="overflow-hidden rounded-lg shadow-md">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg"
                      />
                    </div>
                  </div>
                  <p className="text-cyan-200">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                  Get In Touch
                </span>
              </h2>
              <p className="text-xl text-cyan-200 max-w-2xl mx-auto">
                Ready to transform your electrical grid management? Contact us
                today.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-cyan-500/20 shadow-sm flex flex-col justify-center items-center text-center">
                <h3 className="text-2xl font-bold mb-6 text-cyan-400">
                  Send us a message
                </h3>
                <p className="text-cyan-200 mb-6 max-w-sm">
                  Have a question or want to request a demo? Click the button
                  below to open our contact form.
                </p>
                <a
                  href="https://forms.gle/your-google-form-id" // <-- IMPORTANT: Replace with your actual Google Form link
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full max-w-xs bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 px-6 rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/30 interactive flex items-center justify-center"
                >
                  <Send size={20} className="mr-2" />
                  Open Contact Form
                </a>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-cyan-500/20 shadow-sm">
                <h3 className="text-xl font-bold mb-6 text-cyan-400 text-center">
                  Our Locations
                </h3>
                <div className="flex flex-col space-y-4">
                  {/* NOTE: Replace placeholder map links with your actual Google Maps links */}
                  <a
                    href="https://maps.app.goo.gl/example"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-cyan-900/40 hover:bg-cyan-900/70 border border-cyan-500/20 text-white font-semibold py-3 px-4 rounded-lg text-center transition-all shadow-md interactive flex items-center justify-center gap-2"
                  >
                    <MapPin size={18} /> Florida, USA
                  </a>
                  <a
                    href="https://maps.app.goo.gl/example"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-cyan-900/40 hover:bg-cyan-900/70 border border-cyan-500/20 text-white font-semibold py-3 px-4 rounded-lg text-center transition-all shadow-md interactive flex items-center justify-center gap-2"
                  >
                    <MapPin size={18} /> California, USA
                  </a>
                  <a
                    href="https://maps.app.goo.gl/example"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-cyan-900/40 hover:bg-cyan-900/70 border border-cyan-500/20 text-white font-semibold py-3 px-4 rounded-lg text-center transition-all shadow-md interactive flex items-center justify-center gap-2"
                  >
                    <MapPin size={18} /> Kolkata, India
                  </a>
                  <a
                    href="https://maps.app.goo.gl/example"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-cyan-900/40 hover:bg-cyan-900/70 border border-cyan-500/20 text-white font-semibold py-3 px-4 rounded-lg text-center transition-all shadow-md interactive flex items-center justify-center gap-2"
                  >
                    <MapPin size={18} /> Hyderabad, India
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-cyan-500/20 py-16 relative z-10">
          <div className="container mx-auto px-4">
            <div className="pt-8 text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="w-30 h-30 rounded-lg flex items-center justify-center mr-3 p-2">
                  <img
                    src={logoImg}
                    alt="COEUS Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <p className="text-cyan-300">
                © 2025 COEUS. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

// Careers Page Component
const CareersPage = () => {
  const [filter, setFilter] = useState("All");

  // <-- IMPORTANT: Replace this with the link to your job application form or system
  const formLink = "https://forms.gle/your-job-application-form-id";

  const jobListings = [
    {
      title: "Senior Drone Engineer",
      department: "Engineering",
      location: "Kolkata, India",
      type: "Full-time",
      experience: "5+ years",
      skills: ["Drone Technology", "IoT", "Python", "CAD"],
    },
    {
      title: "AI/ML Specialist",
      department: "Research & Development",
      location: "Remote",
      type: "Full-time",
      experience: "4+ years",
      skills: ["Machine Learning", "Python", "TensorFlow", "Data Analysis"],
    },
    {
      title: "IoT Solutions Architect",
      department: "Engineering",
      location: "Kolkata, India",
      type: "Full-time",
      experience: "6+ years",
      skills: [
        "IoT Architecture",
        "Cloud Computing",
        "Embedded Systems",
        "Security",
      ],
    },
    {
      title: "SAP Integration Developer",
      department: "IT",
      location: "Hybrid",
      type: "Contract",
      experience: "5+ years",
      skills: ["SAP CPI", "BTP", "API Integration", "Java"],
    },
  ];

  const filteredJobs =
    filter === "All"
      ? jobListings
      : jobListings.filter((job) => job.department === filter);
  const departments = [
    "All",
    ...new Set(jobListings.map((job) => job.department)),
  ];

  return (
    <div className="min-h-screen text-gray-100 font-sans w-full overflow-x-hidden relative">
      <ThreeDBackground />
      <CustomCursor />
      <BackToTopButton />
      {/* FIX: Removed unused props. Header now manages its own state. */}
      {/* <Header /> */}

      <main className="w-full px-4 py-12 pt-20 relative z-10">
        <div className="mx-auto max-w-7xl">
          <section className="text-center mb-20">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Shape the Future With Us
            </h1>
            <p className="text-xl text-cyan-200 max-w-3xl mx-auto">
              Join a revolutionary team that's transforming electrical
              infrastructure management with cutting-edge technology.
            </p>
          </section>

          <section className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
              Why Join COEUS?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Sparkles size={32} />,
                  title: "Innovate & Impact",
                  description:
                    "Work on challenging projects that have a real-world impact on grid reliability and safety.",
                },
                {
                  icon: <Award size={32} />,
                  title: "Growth & Learning",
                  description:
                    "We invest in your professional development with continuous learning opportunities.",
                },
                {
                  icon: <Users size={32} />,
                  title: "Collaborative Culture",
                  description:
                    "Be part of a diverse, inclusive, and supportive team that values every voice.",
                },
                {
                  icon: <Heart size={32} />,
                  title: "Great Benefits",
                  description:
                    "Enjoy competitive salaries, comprehensive health benefits, and a flexible work environment.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-cyan-500/20 text-center hover:border-cyan-400/50 hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 mx-auto text-white">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-cyan-200">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section
            id="openings"
            className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-cyan-500/20 shadow-lg mb-20 max-w-6xl w-full mx-auto space-y-3"
          > 
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-cyan-400">
              Current Openings
            </h2>
            <p className="text-center text-cyan-200 mb-8">
              Find your next opportunity in our list of open positions.
            </p>

            <div className="flex flex-wrap items-center mx-auto justify-center gap-3 mb-10 space-y-3">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setFilter(dept)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 interactive ${
                    filter === dept
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
                      : "bg-gray-700/50 text-cyan-200 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>

            <div className="space-y-6 mx-auto flex items-center max-w-3xl w-full flex-row gap-4">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job, index) => (
                  <div
                    key={index}
                    className="bg-gray-900/40 rounded-xl border border-cyan-500/20 overflow-hidden transition-all duration-300 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/10 group h-[33rem] max-w-3xl w-full"
                  >
                    <div className="p-6 md:p-8">
                      <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                        <h3 className="text-2xl font-bold text-white mb-2 md:mb-0 group-hover:text-cyan-400 transition-colors">
                          {job.title}
                        </h3>
                        <span className="inline-block bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 text-sm font-medium px-4 py-1.5 rounded-full self-start md:self-center">
                          {job.type}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-x-6 gap-y-3 text-cyan-300 mb-6 border-b border-cyan-500/10 pb-4">
                        <span className="flex items-center">
                          <Briefcase size={16} className="mr-2" />{" "}
                          {job.department}
                        </span>
                        <span className="flex items-center">
                          <MapPin size={16} className="mr-2" /> {job.location}
                        </span>
                        <span className="flex items-center">
                          <Clock size={16} className="mr-2" /> {job.experience}
                        </span>
                      </div>
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div className="mb-4 md:mb-0">
                          <h4 className="font-semibold text-cyan-200 mb-2">
                            Required Skills:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {job.skills.map((skill, skillIndex) => (
                              <span
                                key={skillIndex}
                                className="bg-cyan-900/40 text-cyan-200 px-3 py-1 rounded-full text-sm font-medium"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <button
                          onClick={() => window.open(formLink, "_blank")}
                          className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/20 interactive flex items-center gap-2"
                        >
                          Apply Now <ArrowRight size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-cyan-200 text-lg">
                    No open positions in this department at the moment. Please
                    check back later!
                  </p>
                </div>
              )}
            </div>
          </section>

          <section>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
              Our Hiring Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {[
                {
                  icon: <FileText />,
                  title: "1. Application",
                  description:
                    "Submit your resume through our online portal. We review every application carefully.",
                },
                {
                  icon: <UserCheck />,
                  title: "2. Initial Screening",
                  description:
                    "Our HR team will reach out for a preliminary chat to get to know you better.",
                },
                {
                  icon: <MessageSquare />,
                  title: "3. Technical Interview",
                  description:
                    "Meet with the team to discuss your skills, experience, and solve technical challenges.",
                },
                {
                  icon: <Award />,
                  title: "4. Final Offer",
                  description:
                    "Congratulations! If you're a match, we'll extend an offer to welcome you to the team.",
                },
              ].map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-cyan-500/20 h-full">
                    <div className="w-16 h-16 bg-cyan-900/50 border border-cyan-500/30 rounded-full flex items-center justify-center mb-6 mx-auto text-cyan-400 text-3xl font-bold">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {step.title.substring(3)}
                    </h3>
                    <p className="text-cyan-200">{step.description}</p>
                  </div>
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-cyan-500/30"></div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

// Talent Solutions Page Component
const TalentSolutionsPage = () => {
  useEffect(() => {
    const checkScroll = () => {
      const elements = document.querySelectorAll(".feature-card");
      elements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        if (elementPosition < screenPosition) {
          element.classList.add("animate");
        }
      });
    };
    window.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  return (
    <div className="min-h-screen text-gray-100 font-sans w-full overflow-x-hidden relative">
      <ThreeDBackground />
      <CustomCursor />
      <BackToTopButton />
      {/* FIX: Removed unused props. Header now manages its own state. */}
      {/* <Header /> */}

      <main className="w-full px-4 py-12 pt-20 relative z-10">
        <div className="mx-auto max-w-7xl">
          <section className="text-center">
            <div className="inline-block bg-cyan-500/10 px-4 py-2 rounded-full mb-6 border border-cyan-500/30">
              <span className="text-cyan-300 text-sm font-medium">
                Empowering Your Workforce
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Advanced Talent Solutions
            </h1>
            <p className="text-xl text-cyan-200 max-w-3xl mx-auto">
              Bridge the skills gap in emerging technologies with our
              specialized training, staffing, and consultation for advanced
              drone and AI monitoring systems.
            </p>
          </section>

          {/* FIX: Changed margin to padding for better spacing consistency */}
          <section className="py-28">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                Our Core Offerings
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Corporate Training Programs",
                  description:
                    "Comprehensive training on drone operation, data analysis, and system maintenance.",
                  icon: <Calendar />,
                  features: [
                    "Certified Trainers",
                    "Hands-on Workshops",
                    "Custom Curriculum",
                    "Ongoing Support",
                  ],
                },
                {
                  title: "Strategic Consultation",
                  description:
                    "Expert guidance on implementing drone monitoring solutions in your organization.",
                  icon: <Users />,
                  features: [
                    "Strategy Development",
                    "Technology Assessment",
                    "Implementation Planning",
                    "ROI Analysis",
                  ],
                },
                {
                  title: "Specialized Staffing",
                  description:
                    "Access to skilled professionals for project-based work or temporary needs.",
                  icon: <Briefcase />,
                  features: [
                    "Quick Deployment",
                    "Vetted Professionals",
                    "Flexible Terms",
                    "Quality Assurance",
                  ],
                },
                {
                  title: "Custom Solution Development",
                  description:
                    "Tailored programs and integrations to meet your organization's specific requirements.",
                  icon: <Cog />,
                  features: [
                    "Needs Assessment",
                    "Custom Development",
                    "Integration Support",
                    "Continuous Maintenance",
                  ],
                },
              ].map((service, index) => (
                <div
                  key={index}
                  className="feature-card opacity-0 transform translate-y-10 transition-all duration-700 bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-cyan-500/20 shadow-lg group hover:border-cyan-400/80 hover:-translate-y-2 interactive"
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-start gap-6">
                    <div className="relative flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-cyan-900 to-blue-900/70 rounded-xl flex items-center justify-center text-cyan-400 group-hover:text-white transition-colors duration-300">
                        {React.cloneElement(service.icon, { size: 32 })}
                      </div>
                      <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 rounded-xl blur-lg transition-all duration-300 animate-pulse group-hover:animate-none"></div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-3">
                        {service.title}
                      </h3>
                      <p className="text-cyan-200 mb-6">
                        {service.description}
                      </p>
                      <ul className="space-y-2">
                        {service.features.map((feature, fIndex) => (
                          <li
                            key={fIndex}
                            className="flex items-center text-cyan-300"
                          >
                            <CheckCircle
                              size={16}
                              className="text-cyan-500 mr-3 flex-shrink-0"
                            />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="text-center relative py-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                Our Partnership Process
              </span>
            </h2>
            <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px -mt-8">
                <svg width="100%" height="2" className="overflow-visible">
                  <line
                    x1="0"
                    y1="1"
                    x2="100%"
                    y2="1"
                    strokeWidth="2"
                    strokeDasharray="8 8"
                    className="stroke-cyan-500/30"
                  />
                </svg>
              </div>
              {[
                {
                  icon: <Target />,
                  title: "Discovery & Assessment",
                  description:
                    "We start by understanding your unique challenges, goals, and existing infrastructure.",
                },
                {
                  icon: <ClipboardList />,
                  title: "Customized Planning",
                  description:
                    "A tailored solution is designed, outlining training modules, staffing needs, or a tech roadmap.",
                },
                {
                  icon: <Rocket />,
                  title: "Implementation & Deployment",
                  description:
                    "We execute the plan, whether it's delivering training, placing talent, or building solutions.",
                },
                {
                  icon: <LifeBuoy />,
                  title: "Support & Evolution",
                  description:
                    "Our partnership continues with ongoing support to ensure long-term success and adaptation.",
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className="feature-card opacity-0 transform translate-y-10 transition-all duration-700 relative z-10"
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 border border-cyan-500/20 h-full flex flex-col items-center">
                    <div className="w-20 h-20 mb-6 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white ring-8 ring-gray-900">
                      {React.cloneElement(step.icon, { size: 36 })}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-cyan-300 flex-grow">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="py-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                Why Partner With Us?
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                "Industry-leading expertise in drone & AI",
                "Proven track record with enterprise clients",
                "Flexible engagement models",
                "Access to a pre-vetted talent pool",
                "Accelerated time-to-competency",
                "Measurable ROI on talent investment",
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="feature-card opacity-0 transform translate-y-10 transition-all duration-700 bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-cyan-500/20 flex items-center gap-4"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-cyan-900/50 rounded-lg flex items-center justify-center text-cyan-400">
                    <CheckCircle size={24} />
                  </div>
                  <p className="flex-1 text-lg font-medium text-cyan-100">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="py-16 feature-card opacity-0 transform translate-y-10 transition-all duration-700 bg-gradient-to-br from-cyan-600/80 to-blue-700/80 rounded-2xl p-12 text-white text-center border border-cyan-400/50 shadow-2xl shadow-cyan-500/10">
            <h3 className="text-4xl font-bold mb-4">
              Transform Your Team's Capabilities
            </h3>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Ready to empower your organization with the skills for tomorrow?
              Let's discuss how our talent solutions can drive your success.
            </p>
            <Link
              to="/#contact"
              className="inline-flex items-center gap-3 mx-auto bg-white text-cyan-700 font-bold py-4 px-10 rounded-xl hover:bg-gray-200 transition-all transform hover:scale-105 shadow-lg interactive"
            >
              <Phone size={20} />
              Schedule a Consultation
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
};

// FIX: Corrected export statement for clarity. This file now exports all the necessary page components.
export {BackToTopButton,LoadingScreen, DroneCompanyWebsite, CareersPage, TalentSolutionsPage };
