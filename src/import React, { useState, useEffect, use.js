import React, { useState, useEffect, useRef } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link, 
  useLocation 
} from 'react-router-dom';
import { 
  Menu, X, ArrowRight, Wifi, Shield, Zap, 
  MapPin, Phone, Mail, Cpu, Cloud, BarChart, Activity, 
  Map, Users, Briefcase, Award, Clock, Heart, Calendar, Cog,
  Play, Satellite, Brain, Sparkles, ChevronDown,
  Send,
  Github, Linkedin, Twitter
} from 'lucide-react';
import './App.css';

// 3D Background Component
const ThreeDBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Create particles with gradient colors
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: `hsl(${Math.random() * 60 + 200}, 70%, ${Math.random() * 30 + 50}%)`
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) / 1.5
      );
      gradient.addColorStop(0, 'rgba(10, 25, 47, 0.9)');
      gradient.addColorStop(1, 'rgba(25, 55, 109, 0.6)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw connecting lines and particles
      particles.forEach((particle, index) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        
        // Draw lines between nearby particles
        for (let j = index + 1; j < particles.length; j++) {
          const dx = particle.x - particles[j].x;
          const dy = particle.y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(100, 200, 255, ${0.2 - distance/500})`;
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
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full z-0"
      style={{ background: 'linear-gradient(135deg, #0a192f 0%, #19376d 100%)' }}
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

    const handleMouseEnter = () => setCursorVariant("hover");
    const handleMouseLeave = () => setCursorVariant("default");

    // Add event listeners for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .interactive');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

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
      <div className={`w-1 h-1 bg-cyan-500 rounded-full ${cursorVariant === "hover" ? "scale-150" : ""} transition-transform`}></div>
    </div>
  );
};

// Reusable Header Component with anchor link handling
const Header = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const location = useLocation();
  
  // Navigation links with proper routing
  const navLinks = [
    { name: 'Solutions', href: '#solutions', isAnchor: true },
    { name: 'Technology', href: '#technology', isAnchor: true },
    { name: 'Benefits', href: '#benefits', isAnchor: true },
    { name: 'Careers', href: '/careers', isAnchor: false },
    { name: 'Talent Solutions', href: '/talent-solutions', isAnchor: false },
    { name: 'Contact', href: '#contact', isAnchor: true }
  ];

  // Function to handle anchor link navigation
  const handleAnchorClick = (href, e) => {
    if (location.pathname !== '/') {
      // If we're not on the homepage, navigate to homepage first
      e.preventDefault();
      window.location.href = `/${href}`;
    } else {
      // If we're on the homepage, scroll to the section
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-gray-900/80 backdrop-blur-md border-b border-cyan-500/20 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <Link to="/" className="flex items-center interactive group">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-3 bg-gradient-to-br from-cyan-500 to-blue-600 group-hover:from-cyan-400 group-hover:to-blue-500 transition-all duration-300">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="text-white text-xl font-bold hidden sm:block">COEUS</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              {navLinks.map((link, index) => (
                <li key={index}>
                  {link.isAnchor ? (
                    <a 
                      href={link.href}
                      onClick={(e) => handleAnchorClick(link.href, e)}
                      className="font-medium text-cyan-100 hover:text-white transition-all py-2 px-3 block interactive rounded-md hover:bg-cyan-500/10"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link 
                      to={link.href}
                      className="font-medium text-cyan-100 hover:text-white transition-all py-2 px-3 block interactive rounded-md hover:bg-cyan-500/10"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 interactive text-cyan-100 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-md border-t border-cyan-500/20 py-4">
          <div className="container mx-auto px-4">
            <ul className="space-y-4">
              {navLinks.map((link, index) => (
                <li key={index} className="border-b border-cyan-500/20 pb-4 last:border-b-0">
                  {link.isAnchor ? (
                    <a 
                      href={link.href} 
                      onClick={(e) => {
                        handleAnchorClick(link.href, e);
                        setMobileMenuOpen(false);
                      }}
                      className="block py-3 px-4 font-medium text-cyan-100 hover:text-white transition-colors interactive rounded-md hover:bg-cyan-500/10"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link 
                      to={link.href} 
                      className="block py-3 px-4 font-medium text-cyan-100 hover:text-white transition-colors interactive rounded-md hover:bg-cyan-500/10"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

// Loading Screen Component
const LoadingScreen = ({ isLoading, progress, displayText }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center z-50 overflow-hidden">
      <div className="text-center relative w-full max-w-md mx-4">
        {/* Video display area */}
        <div className="mb-8">
          <div className="w-128 h-64 mx-auto mb-6 flex items-center justify-center rounded-lg overflow-hidden bg-cyan-900/30 backdrop-blur-sm border border-cyan-500/20">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover rounded-lg"
              onError={(e) => {
                console.error("Video failed to load");
                e.target.style.display = 'none';
                // Create a proper fallback
                const fallback = document.createElement('div');
                fallback.className = 'w-full h-full flex items-center justify-center bg-cyan-900/30 rounded-lg';
                fallback.innerHTML = `
                  <div class="text-center">
                    <div class="text-cyan-400 text-4xl font-bold mb-1">COEUS</div>
                    <div class="text-cyan-300 text-2xl font-medium">LABS</div>
                    <div class="text-cyan-200 text-sm mt-2">PRECISION AND INTELLIGENCE</div>
                  </div>
                `;
                e.target.parentNode.appendChild(fallback);
              }}
              onCanPlay={() => {
                document.querySelector('video').style.opacity = "1";
              }}
            >
              <source src="/Screen%20Recording%202025-09-08%20221552.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Fallback if video fails to load */}
            <div 
              id="video-fallback"
              className="w-full h-full hidden items-center justify-center flex-col bg-cyan-900/30 rounded-lg"
            >
              <div className="text-cyan-400 text-4xl font-bold mb-1">COEUS</div>
              <div className="text-cyan-300 text-2xl font-medium">LABS</div>
              <div className="text-cyan-200 text-sm mt-2">PRECISION AND INTELLIGENCE</div>
            </div>
          </div>
        </div>

        {/* Circular progress indicator */}
        <div className="relative mx-auto w-32 h-32 mb-8">
          {/* Outer circle */}
          <div className="absolute inset-0 rounded-full border-4 border-cyan-800/50"></div>
          
          {/* Animated progress circle */}
          <div 
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan-400 animate-spin"
            style={{
              clipPath: `polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%)`,
              transform: `rotate(${progress * 3.6}deg)`
            }}
          ></div>
          
          {/* Inner circle with percentage */}
          <div className="absolute inset-4 flex items-center justify-center rounded-full bg-cyan-900/30 backdrop-blur-sm border border-cyan-500/20">
            <span className="text-cyan-300 text-xl font-bold">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Status text */}
        <p className="text-cyan-300 mb-4 font-mono text-lg tracking-wide">
          {displayText}<span className="animate-pulse">...</span>
        </p>

        {/* Simplified animation */}
        <div className="relative h-16">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-lg transform rotate-45 flex items-center justify-center animate-pulse border border-cyan-400/30">
              <Cpu className="text-cyan-400 transform -rotate-45 w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Website Component
const DroneCompanyWebsite = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const location = useLocation();

  // NEW: Handle direct anchor link access
  useEffect(() => {
    if (location.hash) {
      // Wait for content to load
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    }
  }, [location]);

  // Reset scroll when location changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Add the checkScroll function
  const checkScroll = () => {
    const elements = document.querySelectorAll('.service-card, .about-content, .testimonial-item, .contact-form, .map-container, .feature-card, .stat-item');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if (elementPosition < screenPosition) {
        element.classList.add('animate');
      }
    });
  };

  useEffect(() => {
    if (!isLoading) return;

    const totalTime = 3000; // 3 seconds total loading time
    const intervalTime = 30;
    const totalSteps = totalTime / intervalTime;
    const progressIncrement = 100 / totalSteps;

    const loadingInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(loadingInterval);
          setTimeout(() => setIsLoading(false), 300);
          return 100;
        }
        return prev + progressIncrement;
      });
    }, intervalTime);

    const textChanges = [
      { percent: 30, text: "Calibrating sensors" },
      { percent: 65, text: "Initializing AI models" }
    ];

    const textInterval = setInterval(() => {
      const currentTextChange = textChanges.find(t => progress >= t.percent && displayText !== t.text);
      if (currentTextChange) {
        setDisplayText(currentTextChange.text);
      }
    }, 100);

    return () => {
      clearInterval(loadingInterval);
      clearInterval(textInterval);
    };
  }, [isLoading, progress]);

  // Add scroll effect useEffect
  useEffect(() => {
    // Initial check and add scroll listener
    window.addEventListener('load', checkScroll);
    window.addEventListener('scroll', checkScroll);
    
    return () => {
      window.removeEventListener('load', checkScroll);
      window.removeEventListener('scroll', checkScroll);
    };
  }, []);

  return (
    <div className="min-h-screen text-gray-100 font-sans overflow-x-hidden relative">
      {/* 3D Background */}
      <ThreeDBackground />
      
      {/* Custom Animated Cursor */}
      <CustomCursor />

      {/* Loading Screen */}
      <LoadingScreen isLoading={isLoading} progress={progress} displayText={displayText} />

      {/* Header */}
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      {/* Rest of your content */}
      <div className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500 relative z-10'}>
        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          <div className="container mx-auto px-4 text-center z-20 relative">
            <div className="mb-8">
              <div className="inline-block bg-cyan-500/10 px-4 py-2 rounded-full mb-6 border border-cyan-500/30">
                <span className="text-cyan-300 text-sm font-medium">Innovating Grid Reliability</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Real-Time Electrical Line Monitoring & Automation
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-cyan-100">
              Revolutionizing Grid Reliability with AI, IoT & SAP Integration
            </p>
            <p className="text-lg mb-12 max-w-4xl mx-auto text-cyan-200">
              Welcome to the future of electrical infrastructure management. Our platform delivers real-time detection of electrical line anomalies using a proprietary Follow-the-Wire model, seamlessly integrated with IoT-connected drones, edge computing, and SAP BTP/CPI for automated work order generation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#technology" 
                className="inline-flex items-center bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 px-10 rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/30 interactive group"
              >
                Explore Solutions
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#contact" 
                className="inline-flex items-center bg-transparent text-cyan-300 font-bold py-4 px-10 rounded-xl hover:bg-cyan-500/10 transition-all transform hover:scale-105 border border-cyan-500/30 shadow-sm interactive"
              >
                Contact Us
              </a>
            </div>
          </div>
          
          {/* Scroll Indicator */}
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
                We provide cutting-edge solutions for electrical grid monitoring and maintenance using advanced drone technology, AI, and IoT integration.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {[
                {
                  title: "Automated Inspections",
                  description: "AI-powered drones autonomously inspect electrical infrastructure with precision",
                  icon: <Satellite size={48} className="text-cyan-400" />
                },
                {
                  title: "Predictive Maintenance",
                  description: "Machine learning algorithms predict failures before they occur",
                  icon: <Brain size={48} className="text-cyan-400" />
                },
                {
                  title: "Real-time Analytics",
                  description: "Instant insights into grid health and performance metrics",
                  icon: <BarChart size={48} className="text-cyan-400" />
                }
              ].map((solution, index) => (
                <div key={index} className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-cyan-500/20 interactive feature-card opacity-0 transform translate-y-10 transition-all duration-700 hover:border-cyan-500/40 hover:bg-gray-800/70">
                  <div className="w-20 h-20 bg-cyan-900/30 rounded-xl flex items-center justify-center mb-6 mx-auto">
                    {solution.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 text-center">{solution.title}</h3>
                  <p className="text-cyan-200 text-center">{solution.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="technology" className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                How It Works
              </span>
            </h2>
            
            <div className="flex flex-col space-y-12 max-w-4xl mx-auto">
              {[
                {
                  step: "1",
                  title: "Data Collection",
                  description: "IoT-enabled drones scan electrical lines, transmitting real-time data to edge devices.",
                  icon: <Wifi size={32} className="text-cyan-400" />,
                  image: "/images/robynne-o-HOrhCnQsxnQ-unsplash.jpg"
                },
                {
                  step: "2",
                  title: "Anomaly Detection",
                  description: "Our Follow-the-Wire model analyzes signal patterns and structural integrity to detect faults.",
                  icon: <Activity size={32} className="text-blue-400" />,
                  image: "/images/anomaly-detection.jpg"
                },
                {
                  step: "3",
                  title: "Edge Processing",
                  description: "Local edge nodes process data instantly, minimizing cloud dependency and latency.",
                  icon: <Cpu size={32} className="text-cyan-400" />,
                  image: "/images/edge-processing.jpg"
                },
                {
                  step: "4",
                  title: "SAP Integration",
                  description: "Detected issues are converted into actionable work orders via SAP CPI, routed through SAP BTP for execution.",
                  icon: <Cloud size={32} className="text-blue-400" />,
                  image: "/images/sap-integration.jpg"
                },
                {
                  step: "5",
                  title: "Field Response",
                  description: "Maintenance teams receive precise, geo-tagged tasks—accelerating resolution and improving grid reliability.",
                  icon: <BarChart size={32} className="text-cyan-400" />,
                  image: "/images/field-response.jpg"
                }
              ].map((item, index) => (
                <div key={index} className="flex flex-col md:flex-row items-start interactive feature-card opacity-0 transform translate-y-10 transition-all duration-700">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-6 shadow-lg mb-4 md:mb-0">
                    {item.step}
                  </div>
                  <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-cyan-500/20 flex-1 shadow-sm hover:shadow-md transition-shadow hover:border-cyan-500/40">
                    <div className="flex flex-col md:flex-row items-center md:items-start mb-4">
                      <div className="w-10 h-10 bg-cyan-900/30 rounded-lg flex items-center justify-center mr-4 mb-4 md:mb-0">
                        {item.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-white text-center md:text-left">{item.title}</h3>
                    </div>
                    <div className="flex flex-col md:flex-row items-center">
                      <div className="w-full md:w-1/3 mb-4 md:mb-0 md:mr-6 relative group">
                        <div className="overflow-hidden rounded-lg shadow-md bg-gradient-to-br from-cyan-900/30 to-blue-900/30 flex items-center justify-center min-h-[12rem]">
                          <div className="w-full h-48 bg-gradient-to-br from-cyan-700/20 to-blue-700/20 flex items-center justify-center">
                            <span className="text-cyan-300 text-sm">{item.title} Visualization</span>
                          </div>
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
                  description: "Proactive detection means fewer blackouts and safer communities.",
                  icon: <Shield size={32} className="text-cyan-400" />,
                  image: "/images/prevent-outages.jpg"
                },
                {
                  title: "Cut Operational Costs",
                  description: "Automating inspections and work orders reduces manual labor and administrative overhead.",
                  icon: <BarChart size={32} className="text-blue-400" />,
                  image: "/images/reduce-costs.jpg"
                },
                {
                  title: "Scale with Intelligence",
                  description: "Our modular architecture supports expansion across regions and utility networks.",
                  icon: <Cloud size={32} className="text-cyan-400" />,
                  image: "/images/scale-intelligence.jpg"
                },
                {
                  title: "Sustainability & Safety",
                  description: "Reduce carbon footprint with drone inspections and protect workers from hazardous conditions.",
                  icon: <Activity size={32} className="text-blue-400" />,
                  image: "/images/sustainability-safety.jpg"
                }
              ].map((item, index) => (
                <div key={index} className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-cyan-500/20 interactive feature-card opacity-0 transform translate-y-10 transition-all duration-700 shadow-sm hover:shadow-md transition-shadow hover:border-cyan-500/40">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-cyan-900/30 rounded-lg flex items-center justify-center mr-4">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  </div>
                  <div className="mb-4 relative group">
                    <div className="overflow-hidden rounded-lg shadow-md bg-gradient-to-br from-cyan-900/30 to-blue-900/30 flex items-center justify-center min-h-[12rem]">
                      <div className="w-full h-48 bg-gradient-to-br from-cyan-700/20 to-blue-700/20 flex items-center justify-center">
                        <span className="text-cyan-300 text-sm">{item.title} Visualization</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-cyan-200">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Contact Section with Map Container */}
        <section id="contact" className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                  Get In Touch
                </span>
              </h2>
              <p className="text-xl text-cyan-200 max-w-2xl mx-auto">
                Ready to transform your electrical grid management? Contact us today.
              </p>
            </div>
            
            {/* Contact content with map */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact form */}
              <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-cyan-500/20 shadow-sm">
                <h3 className="text-2xl font-bold mb-6 text-cyan-400">Send us a message</h3>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2 text-cyan-200">Full Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        className="w-full bg-gray-700/50 border border-cyan-500/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-white" 
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2 text-cyan-200">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        className="w-full bg-gray-700/50 border border-cyan-500/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-white" 
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2 text-cyan-200">Subject</label>
                      <input 
                        type="text" 
                        id="subject" 
                        className="w-full bg-gray-700/50 border border-cyan-500/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-white" 
                        placeholder="What is this regarding?"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2 text-cyan-200">Message</label>
                      <textarea 
                        id="message" 
                        rows="5" 
                        className="w-full bg-gray-700/50 border border-cyan-500/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-white" 
                        placeholder="Tell us how we can help you..."
                      ></textarea>
                    </div>
                    <button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 px-6 rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/30 interactive flex items-center justify-center"
                    >
                      <Send size={20} className="mr-2" />
                      Send Message
                    </button>
                  </form>
                </div>
                
                {/* Map container and contact info */}
                <div className="space-y-8">
                  {/* Map container */}
                  <div className="map-container bg-gray-800/50 backdrop-blur-md rounded-2xl p-4 border border-cyan-500/20 shadow-sm">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.234332106238!2d-82.4597229239111!3d27.76084047615287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88c2e3f0c30b2c3f%3A0x8b5e5d5b5d5b5d5b!2s114509%20University%20Point%20Pl%2C%20Tampa%2C%20FL%2033613!5e0!3m2!1sen!2sus!4v1690219999277!5m2!1sen!2sus&t=h"
                      allowFullScreen="" 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-80 rounded-lg"
                    ></iframe>
                    <div className="location-marker text-cyan-300 mt-3 flex items-center">
                      <MapPin className="inline mr-2" size={16} />
                      Our Location: 114509 University Point Pl Tampa, FL 33613
                    </div>
                  </div>
                  
                  {/* Contact information */}
                  <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-cyan-500/20 shadow-sm">
                    <h3 className="text-xl font-bold mb-4 text-cyan-400">Contact Information</h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-cyan-900/30 rounded-lg flex items-center justify-center mr-4">
                          <Mail className="text-cyan-400" size={20} />
                        </div>
                        <div>
                          <p className="text-sm text-cyan-300">Email</p>
                          <p className="font-medium text-white">info@coeus.com</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-cyan-900/30 rounded-lg flex items-center justify-center mr-4">
                          <Phone className="text-cyan-400" size={20} />
                        </div>
                        <div>
                          <p className="text-sm text-cyan-300"></p>
                          <p className="font-medium text-white"></p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-cyan-900/30 rounded-lg flex items-center justify-center mr-4">
                          <Map className="text-cyan-400" size={20} />
                        </div>
                        <div>
                          <p className="text-sm text-cyan-300">Address</p>
                          <p className="font-medium text-white">114509 University Point Pl Tampa, FL 33613</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Social Links */}
                  <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-cyan-500/20 shadow-sm">
                    <h3 className="text-xl font-bold mb-4 text-cyan-400">Follow Us</h3>
                    <div className="flex space-x-4">
                      <a href="#" className="w-12 h-12 bg-cyan-900/30 rounded-lg flex items-center justify-center interactive hover:bg-cyan-700/30 transition-colors">
                        <Twitter className="text-cyan-400" size={24} />
                      </a>
                      <a href="#" className="w-12 h-12 bg-cyan-900/30 rounded-lg flex items-center justify-center interactive hover:bg-cyan-700/30 transition-colors">
                        <Linkedin className="text-cyan-400" size={24} />
                      </a>
                      <a href="#" className="w-12 h-12 bg-cyan-900/30 rounded-lg flex items-center justify-center interactive hover:bg-cyan-700/30 transition-colors">
                        <Github className="text-cyan-400" size={24} />
                      </a>
                    </div>
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
                  {/* Company Logo */}
                  <div className="w-16 h-16 rounded-lg flex items-center justify-center mr-3 bg-gradient-to-br from-cyan-500 to-blue-600">
                    <span className="text-white font-bold text-lg">C</span>
                  </div>
                </div>
                <p className="text-cyan-300">&copy; 2025 COEUS. All rights reserved.</p>
                
                {/* Additional footer content */}
                <div className="mt-6 flex justify-center space-x-6">
                  <a href="#" className="text-cyan-300 hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                  <a href="#" className="text-cyan-300 hover:text-white transition-colors">
                    Terms of Service
                  </a>
                  <Link to="/careers" className="text-cyan-300 hover:text-white transition-colors">
                    Careers
                  </Link>
                  <Link to="/talent-solutions" className="text-cyan-300 hover:text-white transition-colors">
                    Talent Solutions
                  </Link>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    );
  };

  const CareersPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen text-gray-100 font-sans w-full overflow-x-hidden relative">
      {/* 3D Background */}
      <ThreeDBackground />
      
      {/* Custom Animated Cursor */}
      <CustomCursor />

      {/* Header */}
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      {/* Add this container div with proper padding */}
      <div className="w-full max-w-full overflow-hidden px-4 py-12 pt-20 relative z-10">
        <div className="mx-auto max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Join Our Team
            </h1>
            <p className="text-xl text-cyan-200 max-w-3xl mx-auto">
              Be part of a revolutionary team that's transforming electrical infrastructure management with cutting-edge technology.
            </p>
          </div>
          
          {/* Rest of your CareersPage content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-cyan-500/20 shadow-lg">
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-cyan-400">Current Openings</h2>
                
                <div className="space-y-6">
                  {[
                    {
                      title: "Senior Drone Engineer",
                      department: "Engineering",
                      location: "Kolkata, India",
                      type: "Full-time",
                      experience: "5+ years",
                      skills: ["Drone Technology", "IoT", "Python", "CAD"]
                    },
                    {
                      title: "AI/ML Specialist",
                      department: "Research & Development",
                      location: "Remote",
                      type: "Full-time",
                      experience: "4+ years",
                      skills: ["Machine Learning", "Python", "TensorFlow", "Data Analysis"]
                    },
                    {
                      title: "IoT Solutions Architect",
                      department: "Engineering",
                      location: "Kolkata, India",
                      type: "Full-time",
                      experience: "6+ years",
                      skills: ["IoT Architecture", "Cloud Computing", "Embedded Systems", "Security"]
                    },
                    {
                      title: "SAP Integration Developer",
                      department: "IT",
                      location: "Hybrid",
                      type: "Contract",
                      experience: "5+ years",
                      skills: ["SAP CPI", "BTP", "API Integration", "Java"]
                    }
                  ].map((job, index) => (
                    <div key={index} className="p-6 border border-cyan-500/20 rounded-xl hover:shadow-lg transition-all duration-300 interactive group hover:border-cyan-500/40">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                          {job.title}
                        </h3>
                        <span className="inline-block bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 text-sm font-medium px-3 py-1 rounded-full mt-2 md:mt-0">
                          {job.type}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-cyan-300 mb-4">
                        <span className="flex items-center">
                          <Briefcase size={16} className="mr-2" />
                          {job.department}
                        </span>
                        <span className="flex items-center">
                          <MapPin size={16} className="mr-2" />
                          {job.location}
                        </span>
                        <span className="flex items-center">
                          <Clock size={16} className="mr-2" />
                          {job.experience}
                        </span>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold text-cyan-200 mb-2">Required Skills:</h4>
                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((skill, skillIndex) => (
                            <span key={skillIndex} className="bg-cyan-900/30 text-cyan-300 px-3 py-1 rounded-full text-sm">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium py-3 px-8 rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all transform hover:scale-105 interactive">
                        Apply Now
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Why Work With Us */}
              <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-cyan-500/20 shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-cyan-400">Why Work With Us?</h2>
                <div className="space-y-4">
                  {[
                    { 
                      icon: <Award size={24} />, 
                      title: "Innovative Projects", 
                      description: "Work on cutting-edge technology that's transforming industries" 
                    },
                    { 
                      icon: <Users size={24} />, 
                      title: "Great Team", 
                      description: "Collaborate with talented, passionate professionals" 
                    },
                    { 
                      icon: <Zap size={24} />, 
                      title: "Fast-Paced Environment", 
                      description: "Grow your skills in a dynamic startup culture" 
                    },
                    { 
                      icon: <Heart size={24} />, 
                      title: "Impactful Work", 
                      description: "Your contributions directly improve critical infrastructure" 
                    },
                    { 
                      icon: <Sparkles size={24} />, 
                      title: "Learning Opportunities", 
                      description: "Continuous learning and professional development programs" 
                    },
                    { 
                      icon: <Shield size={24} />, 
                      title: "Work-Life Balance", 
                      description: "Flexible working hours and remote work options" 
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start p-4 bg-cyan-900/20 rounded-xl interactive group hover:bg-cyan-900/30 transition-colors">
                      <div className="w-12 h-12 bg-cyan-900/30 rounded-lg flex items-center justify-center mr-4 text-cyan-400 group-hover:bg-cyan-800/40 group-hover:text-cyan-300 transition-colors">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-white mb-1">{item.title}</h3>
                        <p className="text-cyan-300 text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Application Process */}
              <div className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Application Process</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                      <span className="font-bold">1</span>
                    </div>
                    <span>Submit Application</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                      <span className="font-bold">2</span>
                    </div>
                    <span>Technical Interview</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                      <span className="font-bold">3</span>
                    </div>
                    <span>Culture Fit Interview</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                      <span className="font-bold">4</span>
                    </div>
                    <span>Offer & Onboarding</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
  const TalentSolutionsPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen text-gray-100 font-sans w-full overflow-x-hidden relative">
      {/* 3D Background */}
      <ThreeDBackground />
      
      {/* Custom Animated Cursor */}
      <CustomCursor />

      {/* Header */}
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      {/* Add this container div with proper padding */}
      <div className="w-full max-w-full overflow-hidden px-4 py-12 pt-20 relative z-10">
        <div className="mx-auto max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Talent Solutions
            </h1>
            <p className="text-xl text-cyan-200 max-w-3xl mx-auto">
              We provide specialized talent and training solutions to help organizations implement and 
              maintain advanced drone and AI monitoring systems. Our programs are designed to bridge the 
              skills gap in emerging technologies.
            </p>
          </div>

          {/* Rest of your TalentSolutionsPage content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-cyan-500/20 shadow-lg">
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-cyan-400">Our Services</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    {
                      title: "Training Programs",
                      description: "Comprehensive training on drone operation, data analysis, and system maintenance",
                      icon: <Calendar size={32} className="text-cyan-400" />,
                      features: ["Certified Trainers", "Hands-on Workshops", "Custom Curriculum", "Ongoing Support"]
                    },
                    {
                      title: "Consultation Services",
                      description: "Expert guidance on implementing drone monitoring solutions in your organization",
                      icon: <Users size={32} className="text-blue-400" />,
                      features: ["Strategy Development", "Technology Assessment", "Implementation Planning", "ROI Analysis"]
                    },
                    {
                      title: "Temporary Staffing",
                      description: "Access to skilled professionals for project-based work or temporary needs",
                      icon: <Briefcase size={32} className="text-cyan-400" />,
                      features: ["Quick Deployment", "Vetted Professionals", "Flexible Terms", "Quality Assurance"]
                    },
                    {
                      title: "Custom Solutions",
                      description: "Tailored programs designed to meet your organization's specific requirements",
                      icon: <Cog size={32} className="text-blue-400" />,
                      features: ["Needs Assessment", "Custom Development", "Integration Support", "Maintenance"]
                    }
                  ].map((service, index) => (
                    <div key={index} className="p-6 border border-cyan-500/20 rounded-xl hover:shadow-lg transition-all duration-300 interactive group hover:border-cyan-500/40">
                      <div className="w-16 h-16 bg-cyan-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:bg-cyan-800/40 transition-colors">
                        {service.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-cyan-300 mb-4">{service.description}</p>
                      
                      <div className="space-y-2">
                        <h4 className="font-semibold text-cyan-200">Includes:</h4>
                        <ul className="space-y-1">
                          {service.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center text-sm text-cyan-300">
                              <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Benefits Section */}
              <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-cyan-500/20 shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-cyan-400">Why Choose Our Solutions?</h3>
                <div className="space-y-3">
                  {[
                    "Industry-leading expertise in drone technology",
                    "Proven track record with Fortune 500 companies",
                    "Customized solutions for your specific needs",
                    "Ongoing support and maintenance",
                    "Cost-effective compared to in-house development",
                    "Quick implementation and deployment"
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center p-3 bg-cyan-900/20 rounded-lg">
                      <div className="w-6 h-6 bg-cyan-600 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-sm">✓</span>
                      </div>
                      <span className="text-cyan-200">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Section */}
              <div className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-2xl p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
                <p className="mb-6 opacity-90">
                  Contact us today to discuss how our talent solutions can support your organization's needs.
                </p>
                
                <div className="space-y-4">
                  <button className="w-full bg-white text-cyan-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors interactive">
                    Schedule a Consultation
                  </button>
                  
                  <div className="text-sm opacity-80">
                    <p>Or call us directly:</p>
                    <p className="font-semibold mt-1"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

  // App Router Component
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DroneCompanyWebsite />} />
        <Route path="/careers" element={<CareersPage />} />
        {/* <Route path="/contact" element={<C />} /> */}
        <Route path="/talent-solutions" element={<TalentSolutionsPage />} />
        
        {/* Catch-all route for direct anchor link access */}
        <Route path="/:section" element={<DroneCompanyWebsite />} />
      </Routes>
    </Router>
  );
};

export default App;