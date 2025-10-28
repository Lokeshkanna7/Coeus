// =================================================================
// Filename: WebsiteComponents.js
// =================================================================
import React, { useState, useEffect, useRef, useMemo } from "react"; // Added useMemo

// === Import motion and AnimatePresence ===
import { motion, AnimatePresence } from "framer-motion";

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
  ArrowLeft,
  Quote,
  Star,
} from "lucide-react";
import Header from "./Header";
// Import assets (Ensure paths are correct)
import loadingVideo from "./assets/Screen Recording 2025-09-08 221552.mp4";
import logoImg from "./assets/logo/1000077413-removebg-preview.png";
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
import benefitsImage from "./assets/images/benefits.png";
import CollaborativeCulture from "./assets/images/Collaborative Culture.png";
import GrowthLearning from "./assets/images/Growth&Learning.png";
import InnovateImpact from "./assets/images/InnovateImpact.png";
import iidasImage from "./assets/images/grid-control.jpg";
import lineMonitoringImage from "./assets/images/grid-inspection.jpg";
import gridReliabilityImage from "./assets/images/sap-integration.jpg";

import embeddedsystemengineer from "./assets/images/embedded system engineer.png";
import finopsmanager from "./assets/images/finopsmanager.png";
import iotsolution from "./assets/images/iotsolution.png";
import ml_engineer from "./assets/images/ml_engineer.png";
import productmanager from "./assets/images/productmanager.png";
import remotedroneoperation from "./assets/images/remote drone operation.png";
import sapbtp from "./assets/images/sapbtp.png";

// --- Components (ThreeDBackground, CustomCursor, LoadingScreen, BackToTopButton - Unchanged) ---
// 3D Background Component (Unchanged)
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
// Custom Cursor Component (Unchanged)
const CustomCursor = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

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
  }, []);

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
  });

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
// Loading Screen Component (Unchanged)
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
// Back to Top Button Component (Unchanged)
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
// --- End Unchanged Components ---

const LocationsList = () => {
  // Define locations
  const locations = [
    { lat: 27.994402, lng: -81.760254, name: "Florida, USA", address: "" },
    { lat: 36.778259, lng: -119.417931, name: "California, USA", address: "" },
    { lat: 22.572645, lng: 88.363892, name: "Kolkata, India", address: "" },
    { lat: 17.385044, lng: 78.486671, name: "Hyderabad, India", address: "" },
  ];

  return (
    // Main container
    <div className="w-full bg-gray-900/30 rounded-2xl p-4 md:p-6 border border-cyan-500/10">
      <h3 className="text-xl font-semibold text-cyan-400 mb-6 text-center">
        Our Global Offices
      </h3>

      {/* Locations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {locations.map((loc) => (
          <div
            key={loc.name}
            className="bg-gray-800/50 p-4 rounded-lg border border-cyan-500/20 flex flex-col items-center"
          >
            {/* Location Name */}
            <h4 className="text-lg font-medium text-cyan-300 flex items-center gap-2">
              <MapPin size={16} className="text-cyan-400" />
              {loc.name}
            </h4>
            {/* Location Address/Description */}
            <p className="text-cyan-200 text-sm mt-1">{loc.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// =================================================================
// ============== HOMEPAGE COMPONENT (UPDATED CONTACT) =============
// =================================================================
const DroneCompanyWebsite = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [displayText, setDisplayText] = useState("Booting sequence");
  const location = useLocation();

  // State and logic for the hero image rotator
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const heroImages = [
    {
      src: iidasImage,
      alt: "IIDaaS Grid and Wildfire Monitoring",
      overline:
        "Our proprietary AI solution for grid and wildfire monitoring- IIDaaS",
      subtitle: "Intelligent Inspection and Detection as a Service",
      title: "Enhanced Grid Safety and Efficiency",
      description:
        "Leveraging cutting-edge AI for comprehensive monitoring and predictive analysis to prevent outages and mitigate wildfire risks. Your grid's future is secure.",
    },
    {
      src: lineMonitoringImage,
      alt: "Real-Time Electrical Line Monitoring & Automation",
      overline: "Advanced Oversight for Critical Infrastructure",
      subtitle: "Smart Monitoring for Peak Performance",
      title: "Real-Time Electrical Line Monitoring & Automation",
      description:
        "Our platform delivers real-time detection of electrical line anomalies using a proprietary Follow-the-Wire model, seamlessly integrated with IoT-connected drones, edge computing, and SAP BTP/CPI for automated work order generation.",
    },
    {
      src: gridReliabilityImage,
      alt: "Revolutionizing Grid Reliability with AI, IoT, & SAP Integration",
      overline: "The Next Generation of Power Infrastructure",
      subtitle: "Seamless Integration for Unmatched Reliability",
      title: "Revolutionizing Grid Reliability with AI, IoT, & SAP Integration",
      description:
        "Experience unparalleled grid stability. We combine Artificial Intelligence, Internet of Things data, and robust SAP integration to create a resilient, self-optimizing electrical network.",
    },
  ];

  useEffect(() => {
    if (!isLoading) {
      const interval = setInterval(() => {
        setCurrentImageIndex(
          (prevIndex) => (prevIndex + 1) % heroImages.length
        );
      }, 5000); // Rotates every 5 seconds
      return () => clearInterval(interval);
    }
  }, [isLoading, heroImages.length]);

  // Loading logic (Unchanged)
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

  // Handle direct anchor link access after loading (Unchanged)
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

  // Reset scroll when navigating to a new page (Unchanged)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Scroll animation logic for feature cards (Unchanged)
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

  const currentContent = heroImages[currentImageIndex];
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

      {/* <Header /> */}

      <div
        className={
          isLoading
            ? "opacity-0"
            : "opacity-100 transition-opacity duration-500 relative z-10"
        }
      >
        {/* HERO SECTION (Unchanged) */}
        <section
          id="home"
          className="relative min-h-screen flex items-center overflow-hidden"
        >
          {/* ... Hero content ... */}
          <div className="absolute inset-0 z-0">
            {heroImages.map((item, index) => (
              <img
                key={index}
                src={item.src}
                alt={item.alt}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                  index === currentImageIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent z-10"></div>
          {/* Hero text container */}
          <div className="container mx-auto px-4 z-20 relative max-w-5xl">
            <div
              key={currentImageIndex}
              className="max-w-3xl p-6 md:p-8 rounded-lg"
            >
              <p
                className="text-sm md:text-base font-semibold text-cyan-300 tracking-widest uppercase animate-fade-in-up"
                style={{ animationDelay: "100ms" }}
              >
                {currentContent.overline}
              </p>
              <h1
                className="text-4xl md:text-6xl font-extrabold my-4 text-white animate-fade-in-up"
                style={{ animationDelay: "250ms" }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-cyan-200">
                  {currentContent.title}
                </span>
              </h1>
              <p
                className="text-lg md:text-xl font-mono text-cyan-400 mb-6 animate-fade-in-up"
                style={{ animationDelay: "400ms" }}
              >
                {currentContent.subtitle}
              </p>
              <p
                className="text-lg md:text-xl text-gray-300 font-light max-w-2xl animate-fade-in-up"
                style={{ animationDelay: "550ms" }}
              >
                {currentContent.description}
              </p>
            </div>
          </div>
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
            <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-cyan-500 rounded-full mt-2"></div>
            </div>
          </div>
        </section>
        {/* Central Container */}
        <div className="container mx-auto px-4 max-w-7xl">

          
          {/* Solutions Section (Unchanged) */}
          <section id="solutions" className="py-20 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                Our Solutions
              </span>
            </h2>
            <div className="text-center text-cyan-200 max-w-3xl mx-auto mb-16">
              <p className="text-lg">
                We provide cutting-edge solutions for electrical grid monitoring
                and maintenance using advanced drone technology, AI, and IoT
                integration.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto px-4">
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
                  className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-cyan-500/20 interactive feature-card opacity-0 transform translate-y-10 transition-all duration-700 hover:border-cyan-500/40 hover:bg-gray-800/70 flex flex-col items-center md:items-start"
                >
                  <div className="w-20 h-20 bg-cyan-900/30 rounded-xl flex items-center justify-center mb-6">
                    {solution.icon}
                  </div>
                  <img
                    src={solution.imageSrc}
                    alt={solution.title}
                    className="w-full h-48 object-cover rounded-lg mb-6 shadow-lg"
                  />
                  <h3 className="text-2xl font-bold text-white mb-4 text-center md:text-left">
                    {solution.title}
                  </h3>
                  <p className="text-cyan-200 text-center md:text-left">
                    {solution.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* How It Works Section (Unchanged) */}
          <section id="technology" className="py-20 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                How It Works
              </span>
            </h2>
            <div className="flex flex-col space-y-8 w-full max-w-4xl mx-auto px-4">
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
                  className="w-full mx-auto flex flex-col md:flex-row items-start interactive feature-card opacity-0 transform translate-y-10 transition-all duration-700 space-y-2"
                >
                  <div className="bg-gray-800/50 backdrop-blur-md w-full rounded-2xl p-8 border border-cyan-500/20 flex-1 shadow-sm hover:shadow-md transition-shadow hover:border-cyan-500/40">
                    <div className="max-w-4xl w-full flex flex-col md:flex-row items-center md:items-start mb-4">
                      <div className="w-10 h-10 bg-cyan-900/30 rounded-lg flex items-center justify-center mr-4 mb-4 md:mb-0">
                        {item.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-white text-center md:text-left">
                        {item.title}
                      </h3>
                    </div>
                    <div className="flex flex-col md:flex-row items-center">
                      <div className="w-full md:w-1/3 mb-4 md:mb-0 md:mr-6">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-48 object-cover rounded-lg shadow-lg"
                        />
                      </div>
                      <div className="w-full md:w-2/3">
                        <p className="text-cyan-200">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Why It Matters Section (Unchanged) */}
          <section id="benefits" className="py-20 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                Why It Matters
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto px-4">
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
                  className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-cyan-500/20 interactive feature-card opacity-0 transform translate-y-10 transition-all duration-700 shadow-sm hover:shadow-md hover:border-cyan-500/40"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-cyan-900/30 rounded-lg flex items-center justify-center mr-4">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {item.title}
                    </h3>
                  </div>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover rounded-lg mb-6 shadow-lg"
                  />
                  <p className="text-cyan-200">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* === UPDATED: Contact Section now uses LocationsGlobe === */}
          <section id="contact" className="py-20 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                  Get In Touch & Our Locations
                </span>
              </h2>
              <p className="text-xl text-cyan-200 max-w-3xl mx-auto">
                Ready to transform your electrical grid management? Contact us
                or explore our global presence.
              </p>
            </div>

            {/* * CHANGE 3: Changed lg:grid-cols-3 to lg:grid-cols-2 for a balanced layout.
             * I also added max-w-sm to the contact card and mx-auto to center both.
             */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-4xl mx-auto px-4">
              {" "}
              {/* items-start looks better than items-center */}
              {/* Contact Form Link Card (Takes 1/2 width on large screens) */}
              <div className="lg:col-span-1 bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-cyan-500/20 shadow-sm flex flex-col justify-center items-center text-center h-full">
                <h3 className="text-2xl font-bold mb-6 text-cyan-400">
                  Send us a message
                </h3>
                <p className="text-cyan-200 mb-6 max-w-sm">
                  Have a question or want to request a demo? Click the button
                  below to open our contact form.
                </p>
                <a
                  href="https://forms.gle/your-google-form-id" // Replace with your actual form link
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full max-w-xs bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 px-6 rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/30 interactive flex items-center justify-center"
                >
                  <Send size={20} className="mr-2" />
                  Open Contact Form
                </a>
              </div>
              {/* CHANGE 4: Changed lg:col-span-2 to lg:col-span-1 */}
              <div className="w-full max-w-4xl mx-auto px-4">
                <LocationsList />
              </div>
            </div>
          </section>
          {/* ================================================== */}
        </div>{" "}
        {/* End Central Container */}
        {/* Footer (Unchanged) */}
        <footer className="border-t border-cyan-500/20 py-16 relative z-10">
          {/* ... Footer content ... */}
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

// --- CAREERS PAGE ---
const CareersPage = () => {
  const [filter, setFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All Locations");
  const [currentJobIndex, setCurrentJobIndex] = useState(0);
  const [direction, setDirection] = useState("next");

  // State for 3D Hiring Step Carousel
  const [currentHiringStep, setCurrentHiringStep] = useState(0);
  const [hiringStepDirection, setHiringStepDirection] = useState("next");

  // Logic for rotating hero images
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const heroImages = [
    { src: InnovateImpact, alt: "Innovate and make an impact" },
    { src: GrowthLearning, alt: "Growth and learning opportunities" },
    { src: CollaborativeCulture, alt: "Collaborative company culture" },
    { src: benefitsImage, alt: "Company benefits" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // --- Job Listings with Individual Application Links ---
  const jobListings = [
    {
      title: "Machine Learning Engineer (AI / Data)",
      department: "AI/Data Science",
      location: "Hyderabad",
      type: "Full-time",
      experience: "Bachelor's/Master's",
      description:
        "Design, train, and deploy machine learning and deep learning models, working with large datasets to extract insights and improve model performance.",
      skills: [
        "Python",
        "TensorFlow/PyTorch",
        "Pandas",
        "NumPy",
        "Supervised Learning",
        "Unsupervised Learning",
      ],
      imageUrl: ml_engineer,
      applicationLink: "https://forms.gle/link-for-ml-engineer", // Replace with actual link
    },
    {
      title: "Embedded Systems Engineer (Edge AI / Drones)",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      experience: "Bachelor's",
      description:
        "Develop firmware and embedded applications for AI-enabled edge or drone systems, optimizing models for real-time performance on resource-constrained hardware.",
      skills: [
        "C/C++",
        "Embedded Python",
        "RTOS",
        "Edge Inference",
        "Computer Vision",
        "Signal Processing",
      ],
      imageUrl: embeddedsystemengineer,
      applicationLink: "https://forms.gle/link-for-embedded-engineer", // Replace with actual link
    },
    {
      title: "IoT Solutions Architect",
      department: "Architecture/Cloud",
      location: "Kolkata",
      type: "Full-time",
      experience: "Bachelor's",
      description:
        "Design scalable IoT architectures connecting sensors, devices, and cloud platforms, ensuring data security and integration into analytics or AI pipelines.",
      skills: [
        "Azure IoT/AWS IoT/GCP IoT",
        "MQTT/LoRaWAN/BLE",
        "Networking",
        "Cybersecurity",
        "Encryption",
      ],
      imageUrl: iotsolution,
      applicationLink: "https://forms.gle/link-for-iot-architect", // Replace with actual link
    },
    {
      title: "SAP BTP Architect",
      department: "IT/SAP",
      location: "Hyderabad",
      type: "Full-time",
      experience: "8+ years",
      description:
        "Architect and implement SAP BTP solutions for integration, data, and extension use cases, leveraging SAP HANA, CAP, and Fiori/UI5.",
      skills: [
        "SAP BTP",
        "Cloud Foundry/Kyma",
        "CAP",
        "SAP HANA",
        "ABAP",
        "CPI",
        "REST APIs",
      ],
      imageUrl: sapbtp,
      applicationLink: "https://forms.gle/link-for-sap-architect", // Replace with actual link
    },
    {
      title: "Product Manager (Tech)",
      department: "Product Management",
      location: "Remote",
      type: "Full-time",
      experience: "Proven Experience",
      description:
        "Define and prioritize product roadmap, collaborate with engineering, design, and marketing to launch features, and analyze KPIs for decision-making.",
      skills: [
        "Product Lifecycle",
        "SaaS",
        "Agile/Scrum",
        "Jira",
        "Confluence",
        "Analytics",
      ],
      imageUrl: productmanager,
      applicationLink: "https://forms.gle/link-for-product-manager", // Replace with actual link
    },
    {
      title: "FinOps Manager (Financial Operations)",
      department: "Finance/Operations",
      location: "California",
      type: "Full-time",
      experience: "Bachelor's",
      description:
        "Manage and optimize cloud and operational costs, partner with engineering/finance for monitoring/forecasting, and develop dashboards for cost visibility.",
      skills: [
        "Finance/Accounting",
        "Cloud Costs (AWS/Azure/GCP)",
        "Cost Modeling",
        "Forecasting",
        "KPI Reporting",
        "CloudHealth/Apptio",
      ],
      imageUrl: finopsmanager,
      applicationLink: "https://forms.gle/link-for-finops-manager", // Replace with actual link
    },
    {
      title: "(Veteran Preferred) Part-Time Remote Drone Operations Consultant",
      department: "Consulting/Operations",
      location: "Remote / Part-Time / Contract",
      type: "Part-Time / Contract",
      experience: "Veteran/Military UAV Experience",
      description:
        "Provide remote consulting on drone mission design, data analysis (imagery, LiDAR), hardware selection, operational procedures, and training for civilian/enterprise projects.",
      skills: [
        "UAV Operations",
        "FAA Part 107",
        "Mission Planning Tools",
        "Data Analysis",
        "AI/IoT Integration (Preferred)",
        "Remote Collaboration",
      ],
      imageUrl: remotedroneoperation,
      applicationLink: "https://forms.gle/link-for-drone-consultant", // Replace with actual link
    },
  ];

  // --- Filtering Logic ---
  const filteredJobs = jobListings
    .filter((job) => filter === "All" || job.department === filter)
    .filter(
      (job) =>
        locationFilter === "All Locations" ||
        // Check if the locationFilter matches any part of the job's location string
        job.location
          .split(" / ")
          .map((loc) => loc.trim())
          .includes(locationFilter)
    );

  const departments = useMemo(
    () => [
      "All",
      ...[...new Set(jobListings.map((job) => job.department))].sort(),
    ],
    [jobListings]
  );

  const locations = useMemo(
    () => [
      "All Locations",
      ...[
        ...new Set(
          jobListings.flatMap((job) =>
            // Split location strings like "Remote / Part-Time / Contract" and take primary location parts
            job.location.split(" / ").map((loc) => loc.trim())
          )
        ),
      ]
        // Filter out non-location specific terms if needed, e.g., 'Part-Time', 'Contract'
        .filter((loc) => !["Part-Time", "Contract"].includes(loc))
        .filter((value, index, self) => self.indexOf(value) === index) // Ensure uniqueness
        .sort(),
    ],
    [jobListings]
  );

  const handleScrollToOpenings = (e) => {
    e.preventDefault();
    document.querySelector("#openings")?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setCurrentJobIndex(0); // Reset index when filters change
  }, [filter, locationFilter]);

  // --- Job Card Navigation ---
  const showNextJob = () => {
    setDirection("next");
    setCurrentJobIndex((prevIndex) => (prevIndex + 1) % filteredJobs.length);
  };

  const showPrevJob = () => {
    setDirection("prev");
    setCurrentJobIndex(
      (prevIndex) => (prevIndex - 1 + filteredJobs.length) % filteredJobs.length
    );
  };

  // --- Hiring Steps Carousel Logic ---
  const hiringSteps = [
    {
      icon: <FileText size={32} />,
      title: "Application",
      description:
        "Show us your unique skills and vision. We personally review every submission.",
    },
    {
      icon: <MessageSquare size={32} />,
      title: "Initial Screening",
      description:
        "Let's connect to learn about your ambitions and see if our missions align.",
    },
    {
      icon: <Cpu size={32} />,
      title: "Technical Interview",
      description:
        "Collaborate with our leads on a problem mirroring our daily work.",
    },
    {
      icon: <Award size={32} />,
      title: "Final Offer",
      description:
        "If it's a match, we'll extend an offer. Welcome to the mission!",
    },
  ];

  const nextHiringStep = () => {
    setHiringStepDirection("next");
    setCurrentHiringStep((prev) => (prev + 1) % hiringSteps.length);
  };

  const prevHiringStep = () => {
    setHiringStepDirection("prev");
    setCurrentHiringStep(
      (prev) => (prev - 1 + hiringSteps.length) % hiringSteps.length
    );
  };

  // --- Animation Variants ---
  const filterContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };
  const filterItemVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 150, damping: 15 },
    },
  };
  const jobCardVariants = {
    enter: (direction) => ({
      x: direction === "next" ? 200 : -200,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 250, damping: 25 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      },
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction === "next" ? -200 : 200,
      opacity: 0,
      scale: 0.9,
      transition: {
        x: { type: "spring", stiffness: 250, damping: 25 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      },
    }),
  };
  const hiringCardVariants = {
    enter: (direction) => ({
      rotateY: direction === "next" ? 90 : -90,
      opacity: 0,
      scale: 0.8,
      zIndex: 0,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      zIndex: 1,
      transition: { type: "spring", stiffness: 200, damping: 20 },
    },
    exit: (direction) => ({
      rotateY: direction === "next" ? -90 : 90,
      opacity: 0,
      scale: 0.8,
      zIndex: 0,
      transition: { type: "spring", stiffness: 200, damping: 20 },
    }),
  };
  // --- End Animation Variants ---

  return (
    <div className="min-h-screen text-gray-100 font-sans w-full overflow-x-hidden relative">
      <ThreeDBackground />
      <CustomCursor />
      <BackToTopButton />

      <main className="w-full relative z-10">
        {/* === HERO SECTION === */}
        <section className="relative text-center mb-24 min-h-[500px] md:min-h-[650px] flex flex-col items-center justify-center overflow-hidden p-6">
          <div className="absolute inset-0 z-0">
            {heroImages.map((img, index) => (
              <img
                key={index}
                src={img.src}
                alt={img.alt}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                  index === currentImageIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-black/60 z-10"></div>
          </div>
          <div className="relative z-20 container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Powering a Smarter Future
            </h1>
            <p className="text-xl text-cyan-200 max-w-3xl mx-auto mb-10">
              Join us at the nexus of AI, robotics, and energy to solve one of
              the world's most critical challenges.
            </p>
            <a
              href="#openings"
              onClick={handleScrollToOpenings}
              className="inline-flex items-center gap-3 mx-auto bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 px-20 text-lg rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/30 interactive"
            >
              View Open Positions
              <ArrowRight size={20} />
            </a>
          </div>
        </section>
        {/* ======================================================== */}

        <div className="mx-auto max-w-7xl px-4 py-12">
          {/* === "Why Join" SECTION (Assuming content exists) === */}
          <section className="mb-24">
            {/* Add "Why Join Us" content here if needed */}
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
              Why Join Us?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {/* Example Cards - Replace with your actual content */}
              <div className="bg-gray-800/50 p-6 rounded-lg border border-cyan-500/20">
                <Sparkles size={40} className="mx-auto mb-4 text-cyan-400" />
                <h3 className="text-xl font-semibold mb-2">
                  Innovate & Impact
                </h3>
                <p className="text-cyan-200">
                  Work on cutting-edge AI and drone tech solving real-world
                  energy problems.
                </p>
              </div>
              <div className="bg-gray-800/50 p-6 rounded-lg border border-cyan-500/20">
                <Users size={40} className="mx-auto mb-4 text-cyan-400" />
                <h3 className="text-xl font-semibold mb-2">
                  Collaborative Culture
                </h3>
                <p className="text-cyan-200">
                  Join a supportive team passionate about technology and
                  sustainability.
                </p>
              </div>
              <div className="bg-gray-800/50 p-6 rounded-lg border border-cyan-500/20">
                <Award size={40} className="mx-auto mb-4 text-cyan-400" />
                <h3 className="text-xl font-semibold mb-2">
                  Growth & Learning
                </h3>
                <p className="text-cyan-200">
                  Opportunities for professional development in a fast-growing
                  industry.
                </p>
              </div>
            </div>
          </section>
          {/* ======================================================= */}

          {/* === "Current Openings" SECTION === */}
          <section
            id="openings"
            className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-cyan-500/20 shadow-lg mb-24 max-w-5xl w-full mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-cyan-400">
              Current Openings
            </h2>
            <p className="text-center text-cyan-200 mb-10">
              Find your next opportunity in our list of open positions.
            </p>

            {/* === FILTERS === */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto mb-12"
              variants={filterContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Department Filter */}
              <motion.div
                className="w-full sm:w-1/2 relative"
                variants={filterItemVariants}
              >
                <label htmlFor="department-filter" className="sr-only">
                  Filter by department
                </label>
                <motion.select
                  id="department-filter"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="w-full appearance-none bg-gray-700/50 border border-cyan-500/30 text-cyan-200 text-center font-medium py-3 px-5 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all cursor-pointer interactive"
                  whileHover={{ scale: 1.02, borderColor: "#06B6D4" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {departments.map((dept) => (
                    <option
                      key={dept}
                      value={dept}
                      className="bg-gray-800 text-white font-medium"
                    >
                      {dept === "All" ? "All Departments" : dept}
                    </option>
                  ))}
                </motion.select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-cyan-400">
                  <ChevronDown size={20} />
                </div>
              </motion.div>
              {/* Location Filter */}
              <motion.div
                className="w-full sm:w-1/2 relative"
                variants={filterItemVariants}
              >
                <label htmlFor="location-filter" className="sr-only">
                  Filter by location
                </label>
                <motion.select
                  id="location-filter"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full appearance-none bg-gray-700/50 border border-cyan-500/30 text-cyan-200 text-center font-medium py-3 px-5 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all cursor-pointer interactive"
                  whileHover={{ scale: 1.02, borderColor: "#06B6D4" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {locations.map((loc) => (
                    <option
                      key={loc}
                      value={loc}
                      className="bg-gray-800 text-white font-medium"
                    >
                      {loc}
                    </option>
                  ))}
                </motion.select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-cyan-400">
                  <ChevronDown size={20} />
                </div>
              </motion.div>
            </motion.div>

            {/* === Job Count === */}
            <motion.div
              key={filteredJobs.length} // Re-animate when count changes
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="text-center text-cyan-200 mb-10"
            >
              {filteredJobs.length > 0 ? (
                <p className="text-lg">
                  Showing{" "}
                  <span className="font-bold text-cyan-300">
                    {currentJobIndex + 1} of {filteredJobs.length}
                  </span>{" "}
                  matching position{filteredJobs.length > 1 ? "s" : ""}
                </p>
              ) : (
                <p className="text-lg">
                  No open positions match your selected filters.
                </p>
              )}
            </motion.div>

            {/* === Job Card Display === */}
            <div className="relative min-h-[600px] md:min-h-[650px]">
              {" "}
              {/* Increased min-height slightly */}
              <AnimatePresence mode="wait" custom={direction}>
                                               {" "}
                {filteredJobs.length > 0 &&
                  (() => {
                    const job = filteredJobs[currentJobIndex];
                    if (!job) return null;

                    return (
                      <motion.a // The clickable job card link
                        key={job.title + currentJobIndex} // Use index in key for re-animation on same title filter change
                        href={job.applicationLink} // <-- Use the specific link
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 block p-6 md:p-8 rounded-2xl border border-cyan-500/20 text-center overflow-hidden group hover:border-cyan-400/60 bg-cover bg-center"
                        style={{ backgroundImage: `url(${job.imageUrl})` }}
                        custom={direction}
                        variants={jobCardVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                      >
                        {/* Background Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/75 to-transparent z-0"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 to-blue-700/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300 z-0"></div>

                        {/* Card Content */}
                        <div className="relative z-10 flex flex-col h-full justify-end">
                          {" "}
                          {/* Use flex to push content down */}
                          <div>
                            {" "}
                            {/* Inner container for content */}
                            {/* Type */}
                            <span className="inline-block bg-cyan-900/60 text-cyan-100 text-xs font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full mb-4 border border-cyan-500/40 backdrop-blur-sm">
                              {job.type}
                            </span>
                            {/* Title */}
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors">
                              {job.title}
                            </h3>
                            {/* Details */}
                            <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-cyan-300/90 mb-4 text-base md:text-lg">
                              <span className="flex items-center whitespace-nowrap">
                                <Briefcase size={18} className="mr-2" />
                                {job.department}
                              </span>
                              <span className="flex items-center whitespace-nowrap">
                                <MapPin size={18} className="mr-2" />
                                {job.location}
                              </span>
                              <span className="flex items-center whitespace-nowrap">
                                <Clock size={18} className="mr-2" />
                                {job.experience}
                              </span>
                            </div>
                            {/* Divider */}
                            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent mx-auto mb-6"></div>
                            {/* Description */}
                            <p className="text-cyan-200/95 text-base md:text-lg max-w-3xl mx-auto mb-6 text-justify line-clamp-3 md:line-clamp-4">
                              {job.description}
                            </p>
                            {/* === MODIFIED SKILLS SECTION (v5) === */}
                            <div className="mb-8">
                              <h4 className="font-semibold text-cyan-200/80 mb-4 text-base">
                                Required Skills
                              </h4>

                              {/* - Increased gap: gap-x-8 and gap-y-5
                                                  - Increased container padding: pt-3 and px-6
                                                */}
                              <div className="flex flex-wrap gap-x-8 gap-y-5 justify-center px-6 pt-3">
                                {job.skills.map((skill) => (
                                  <span
                                    key={skill}
                                    /* - Significantly increased horizontal padding: px-10
                                                               - Kept vertical padding: py-3
                                                            */
                                    className="bg-cyan-800/50 border border-cyan-400/60 text-cyan-100
                                                                       px-10 py-3 rounded-full text-base font-medium shadow-lg shadow-cyan-500/10
                                                                       transition-all duration-200
                                                                       hover:bg-cyan-700/70 hover:border-cyan-300/80 hover:scale-105"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                            {/* === END MODIFIED SECTION === */}
                            {/* Apply Text */}
                            <div className="text-cyan-400 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center font-semibold text-lg">
                              View & Apply{" "}
                              <ArrowRight size={20} className="ml-2" />
                            </div>
                          </div>
                        </div>
                      </motion.a>
                    );
                  })()}
                                           {" "}
              </AnimatePresence>
              {/* === Navigation Buttons === */}
              {filteredJobs.length > 1 && (
                <div className="absolute bottom-[-80px] left-0 right-0 flex justify-between items-center px-4">
                  {" "}
                  {/* MODIFIED: Increased gap from -70px to -80px */}
                  <motion.button
                    onClick={showPrevJob}
                    /* MODIFIED: Increased px-6 to px-8 and gap-2 to gap-3 */
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-bold py-3 px-10 rounded-lg interactive shadow-lg shadow-cyan-500/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Previous job"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 15px rgba(6, 182, 212, 0.5)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <ArrowLeft size={18} /> Prev
                  </motion.button>
                  <motion.button
                    onClick={showNextJob}
                    /* MODIFIED: Increased px-6 to px-8 and gap-2 to gap-3 */
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-bold py-3 px-10 rounded-lg interactive shadow-lg shadow-cyan-500/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Next job"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 15px rgba(6, 182, 212, 0.5)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    Next <ArrowRight size={18} />
                  </motion.button>
                </div>
              )}
            </div>
          </section>
          {/* ======================================================= */}

          {/* === "How We Hire" SECTION === */}
          <section className="mb-24">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
              How We Hire
            </h2>
            {/* Carousel Container */}
            <div
              className="relative max-w-2xl mx-auto h-[450px] md:h-[350px]"
              style={{ perspective: "1500px" }}
            >
              <AnimatePresence mode="wait" custom={hiringStepDirection}>
                <motion.div
                  key={hiringSteps[currentHiringStep].title} // Key change triggers animation
                  className="absolute w-full h-full p-8 md:p-10 rounded-2xl bg-gray-800/60 backdrop-blur-lg border border-cyan-500/25 shadow-xl flex flex-col items-center justify-center text-center"
                  style={{ transformStyle: "preserve-3d" }}
                  custom={hiringStepDirection}
                  variants={hiringCardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  {/* Card Content */}
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/40 rounded-full flex items-center justify-center mb-5 text-cyan-400 flex-shrink-0">
                    {hiringSteps[currentHiringStep].icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {hiringSteps[currentHiringStep].title}
                  </h3>
                  <p className="text-cyan-200 text-base max-w-md">
                    {hiringSteps[currentHiringStep].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
            {/* Carousel Navigation */}
            <div className="flex justify-center items-center gap-6 mt-10">
              {/* Prev Button */}
              <motion.button
                onClick={prevHiringStep}
                className="p-3 rounded-full bg-gradient-to-br from-cyan-600 to-blue-700 text-white interactive shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                aria-label="Previous step"
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 0 12px rgba(6, 182, 212, 0.5)",
                }}
                whileTap={{ scale: 0.9 }}
              >
                {" "}
                <ArrowLeft size={20} />{" "}
              </motion.button>
              {/* Dots */}
              <div className="flex gap-2.5">
                {hiringSteps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setHiringStepDirection(
                        index > currentHiringStep ? "next" : "prev"
                      );
                      setCurrentHiringStep(index);
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      index === currentHiringStep
                        ? "bg-cyan-400 scale-125"
                        : "bg-gray-600/70"
                    } interactive`}
                    aria-label={`Go to step ${index + 1}`}
                  />
                ))}
              </div>
              {/* Next Button */}
              <motion.button
                onClick={nextHiringStep}
                className="p-3 rounded-full bg-gradient-to-br from-cyan-600 to-blue-700 text-white interactive shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                aria-label="Next step"
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 0 12px rgba(6, 182, 212, 0.5)",
                }}
                whileTap={{ scale: 0.9 }}
              >
                {" "}
                <ArrowRight size={20} />{" "}
              </motion.button>
            </div>
          </section>
          {/* ====================================================== */}
        </div>
      </main>
    </div>
  );
};

// === NEW: Animated Background Component ===
const AnimatedGradientBackground = () => {
  return (
    <motion.div
      className="fixed inset-0 -z-10 w-full h-full"
      style={{
        background:
          "radial-gradient(ellipse at 50% 50%, #062029 0%, #02040a 100%)",
      }}
      animate={{
        background: [
          "radial-gradient(ellipse at 50% 50%, #062029 0%, #02040a 100%)",
          "radial-gradient(ellipse at 50% 30%, #083344 0%, #02040a 100%)",
          "radial-gradient(ellipse at 50% 50%, #062029 0%, #02040a 100%)",
        ],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    />
  );
};

// === Placeholder Components (replace with your actual components) ===
// const CustomCursor = () => null;
// const BackToTopButton = () => null;
// const Header = () => null;

const TalentSolutionsPage = () => {
  // === State for Interactive Offerings Dashboard ===
  const [activeOffering, setActiveOffering] = useState(0);

  // === State for Testimonial Carousel ===
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [testimonialDirection, setTestimonialDirection] = useState("next");

  // === Data for Core Offerings ===
  const coreOfferings = [
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
  ];

  // === Data for Partnership Process ===
  const partnershipProcess = [
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
  ];

  // === Data for Testimonials ===
  const testimonials = [
    {
      quote:
        "The specialized training completely transformed our field operations. Our team is now faster, safer, and more efficient than we ever thought possible.",
      name: "Alex Chen",
      title: "Director of Operations, GridForward Energy",
    },
    {
      quote:
        "Partnering with them for strategic consultation was a game-changer. They identified critical gaps in our drone program and provided a clear, actionable roadmap for success.",
      name: "Maria Rodriguez",
      title: "VP of Innovation, Summit Utilities",
    },
    {
      quote:
        "The specialized staff they provided integrated seamlessly with our team and were productive from day one. It was the perfect solution for our short-term project needs.",
      name: "David Kim",
      title: "Project Manager, Apex Power",
    },
  ];

  // === Navigation logic for Testimonials ===
  const nextTestimonial = () => {
    setTestimonialDirection("next");
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setTestimonialDirection("prev");
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  // === Animation Variants ===

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const offeringContentVariants = {
    enter: { opacity: 0, x: 50, scale: 0.95 },
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15, delay: 0.1 },
    },
    exit: {
      opacity: 0,
      x: -50,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  };

  const timelineContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  // NEW: Refined timeline step animation with a "pop"
  const timelineStepVariants = {
    hidden: { opacity: 0, x: -50, scale: 0.9 }, // Come in from the left and slightly scaled down
    visible: {
      opacity: 1,
      x: 0,
      scale: 1, // Scale to normal size
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const testimonialVariants = {
    enter: (direction) => ({
      rotateY: direction === "next" ? 90 : -90,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      zIndex: 1,
      transition: { type: "spring", stiffness: 200, damping: 25 },
    },
    exit: (direction) => ({
      rotateY: direction === "next" ? -90 : 90,
      opacity: 0,
      scale: 0.9,
      zIndex: 0,
      transition: { type: "spring", stiffness: 200, damping: 25 },
    }),
  };

  return (
    <div className="min-h-screen text-gray-100 font-sans w-full overflow-x-hidden relative">
      {/* NEW: Replaced background component */}
      <AnimatedGradientBackground />
      <CustomCursor />
      <BackToTopButton />
      {/* <Header /> */}

      <main className="w-full px-4 py-12 pt-20 relative z-10">
        <div className="mx-auto max-w-7xl">
          {/* === HERO SECTION (Added Animation) === */}
          <section className="text-center mb-20 md:mb-24">
            <motion.div
              className="inline-block bg-cyan-500/10 px-4 py-2 rounded-full mb-6 border border-cyan-500/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <span className="text-cyan-300 text-sm font-medium">
                Empowering Your Workforce
              </span>
            </motion.div>
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Advanced Talent Solutions
            </motion.h1>
            <motion.p
              className="text-xl text-cyan-200 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Bridge the skills gap in emerging technologies with our
              specialized training, staffing, and consultation for advanced
              drone and AI monitoring systems.
            </motion.p>
          </section>

          {/* === [IMPROVED] "Our Core Offerings" Interactive Dashboard === */}
          <section className="py-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                Our Core Offerings
              </span>
            </h2>
            {/* Adjusted max-width for the entire section content */}
            <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto">
              {/* Left Side: Control Panel / Tabs */}
              {/* Adjusted width to allow centering */}
              <div className="flex md:flex-col gap-4 w-full md:w-1/2 mx-auto">
                {coreOfferings.map((service, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveOffering(index)}
                    className={`relative w-full p-6 rounded-lg border border-cyan-500/20 text-left transition-all duration-300 interactive ${
                      activeOffering === index
                        ? ""
                        : "bg-gray-800/50 hover:bg-gray-800/80"
                    }`}
                  >
                    {activeOffering === index && (
                      <motion.div
                        className="absolute inset-0 bg-cyan-800/50 border-cyan-500/70 rounded-lg -z-10"
                        layoutId="activeOfferingHighlight"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}

                    {/* Centered text and icon */}
                    <div className="flex flex-col items-center gap-2 relative z-10 text-center">
                      <motion.div
                        layoutId={`offering-icon-${index}`}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                        className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                          activeOffering === index
                            ? "bg-cyan-500 text-white"
                            : "bg-cyan-900/50 text-cyan-400"
                        }`}
                      >
                        {React.cloneElement(service.icon, { size: 24 })}
                      </motion.div>
                      <div>
                        <h3
                          className={`text-lg font-bold transition-colors ${
                            activeOffering === index
                              ? "text-white"
                              : "text-cyan-200"
                          }`}
                        >
                          {service.title}
                        </h3>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Right Side: Content Display */}
              {/* Adjusted width for the content display */}
              <div className="w-full md:w-1/2 min-h-[400px] relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeOffering}
                    variants={offeringContentVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    /*
                     *
                     * ---  NEW CHANGES ARE HERE ---
                     *
                     */
                    className="absolute inset-0 w-full h-full bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-cyan-500/20 shadow-lg 
                     flex flex-col items-center text-center" // NEW: Added flexbox classes for centering
                  >
                    {/* This icon is now centered */}
                    <div className="relative inline-block mb-6">
                      <motion.div
                        layoutId={`offering-icon-${activeOffering}`}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                        className="w-16 h-16 bg-gradient-to-br from-cyan-900 to-blue-900/70 rounded-xl flex items-center justify-center text-cyan-400"
                      >
                        {React.cloneElement(
                          coreOfferings[activeOffering].icon,
                          { size: 32 }
                        )}
                      </motion.div>
                      <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-xl blur-lg animate-pulse"></div>
                    </div>

                    {/* This title is now centered */}
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {coreOfferings[activeOffering].title}
                    </h3>

                    {/* This description is now centered */}
                    <p className="text-cyan-200 mb-6">
                      {coreOfferings[activeOffering].description}
                    </p>

                    {/* This list is now centered as a block, but text inside is left-aligned */}
                    <ul className="space-y-2 inline-block text-left">
                      {coreOfferings[activeOffering].features.map(
                        (feature, fIndex) => (
                          <li
                            key={fIndex}
                            className="flex items-center text-cyan-300" // Kept as-is to align checkmark with text
                          >
                            <CheckCircle
                              size={16}
                              className="text-cyan-500 mr-3 flex-shrink-0"
                            />
                            <span>{feature}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </section>

          // ... (rest of your component code)

          {/* === [IMPROVED] "Our Partnership Process" Animated Horizontal Flowchart === */}
          <section className="py-20 relative">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                Our Partnership Process
              </span>
            </h2>

            {/* Main container for the horizontal flow */}
            <motion.div
              className="relative flex flex-col md:flex-row max-w-6xl mx-auto" // Changed to flex-row, max-w-6xl
              variants={timelineContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {/* NEW: Horizontal Line (desktop only) */}

              {/* 1. The Faint "Track" Line */}
              {/* This line still draws itself to show the full path */}
              <motion.div
                className="absolute top-10 left-0 right-0 h-1 bg-cyan-800/50 z-10 hidden md:block" // top-10 = center of h-20 icon
                style={{ originX: 0 }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 2, delay: 0.3, ease: "easeInOut" }} // Slower draw for the whole bar
              />

              {/* 2. NEW: The Animated "Running" Dashes Line */}
              <motion.div
                className="absolute top-10 left-0 right-0 h-1 z-10 hidden md:block"
                style={{
                  originX: 0,
                  // A 15px cyan dash, 25px gap. Total pattern size 40px.
                  backgroundSize: "40px 100%",
                  backgroundImage:
                    "repeating-linear-gradient(to right, #06b6d4, #06b6d4 15px, transparent 15px, transparent 40px)",
                }}
                initial={{
                  scaleX: 0,
                  backgroundPosition: "0 0",
                }}
                whileInView={{
                  scaleX: 1,
                  backgroundPosition: ["0 0", "40px 0"], // Animate one full pattern width
                }}
                transition={{
                  // This transition draws the line
                  scaleX: { duration: 2, delay: 0.3, ease: "easeInOut" },
                  // This transition starts *after* the line is drawn and repeats forever
                  backgroundPosition: {
                    duration: 1, // 1 second per loop
                    delay: 2.3, // Start after the line draws (2s + 0.3s)
                    repeat: Infinity,
                    repeatType: "loop", // "loop" is correct for linear movement
                    ease: "linear",
                  },
                }}
              />

              {partnershipProcess.map((step, index) => (
                <motion.div
                  key={index}
                  className="flex-1 flex flex-col items-center relative p-4" // Each step is flex-1
                  variants={timelineStepVariants}
                >
                  {/* Icon Circle (now sits on top of the horizontal line) */}
                  <motion.div
                    className="relative z-20 w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-bold
                               ring-8 ring-gray-950/50 overflow-hidden cursor-pointer" // z-20 to be above the line
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    {/* Inner glowing effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-cyan-500/80 to-blue-600/80 rounded-full"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.3 }}
                    />
                    {/* Outer subtle glow */}
                    <motion.div
                      className="absolute inset-0 rounded-full blur-lg"
                      style={{
                        background:
                          "radial-gradient(circle, rgba(6,182,212,0.6) 0%, rgba(59,130,246,0) 70%)",
                      }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 0.7 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 1, delay: index * 0.3 + 0.5 }}
                    />

                    {/* Icon */}
                    <div className="relative z-10 text-white">
                      {React.cloneElement(step.icon, { size: 36 })}
                    </div>
                  </motion.div>

                  {/* Content Card (sits below the icon) */}
                  <motion.div
                    className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-cyan-500/20 w-full text-left relative overflow-hidden mt-8" // Added mt-8
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 0 30px rgba(6, 182, 212, 0.4)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {/* Subtle pattern or gradient inside card */}
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                      }}
                    />

                    {/* Centered text for the horizontal layout */}
                    <h3 className="text-xl font-bold text-white mb-3 relative z-10 text-center">
                      {step.title}
                    </h3>
                    <p className="text-cyan-300 relative z-10 text-center">
                      {step.description}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </section>

// ... (rest of your component code)

          {/* === "Why Partner With Us?" (IMPROVED with framer-motion) === */}
          <section className="py-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                Why Partner With Us?
              </span>
            </h2>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {[
                "Industry-leading expertise in drone & AI",
                "Proven track record with enterprise clients",
                "Flexible engagement models",
                "Access to a pre-vetted talent pool",
                "Accelerated time-to-competency",
                "Measurable ROI on talent investment",
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-cyan-500/20 flex items-center gap-4"
                  variants={fadeInUpVariants}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(6, 182, 212, 0.4)",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-cyan-900/50 rounded-lg flex items-center justify-center text-cyan-400">
                    <CheckCircle size={24} />
                  </div>
                  <p className="flex-1 text-lg font-medium text-cyan-100">
                    {benefit}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* === CTA SECTION (IMPROVED with framer-motion) === */}
          <motion.section
            className="py-16 mb-12 bg-gradient-to-br from-cyan-600/80 to-blue-700/80 rounded-2xl p-12 text-white text-center border border-cyan-400/50 shadow-2xl shadow-cyan-500/10"
            variants={fadeInUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h3 className="text-4xl font-bold mb-4">
              Transform Your Team's Capabilities
            </h3>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Ready to empower your organization with the skills for tomorrow?
              Let's discuss how our talent solutions can drive your success.
            </p>
            <motion.div
              className="inline-block"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <Link
                to="/#contact"
                className="inline-flex items-center gap-3 mx-auto bg-white text-cyan-700 font-bold py-4 px-10 rounded-xl transition-all shadow-lg interactive"
              >
                <Phone size={20} />
                Schedule a Consultation
              </Link>
            </motion.div>
          </motion.section>
        </div>
      </main>
    </div>
  );
};

// --- EXPORTS (Unchanged) ---
export {
  BackToTopButton,
  LoadingScreen,
  DroneCompanyWebsite,
  CareersPage,
  TalentSolutionsPage,
};
