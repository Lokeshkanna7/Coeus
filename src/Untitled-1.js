// === UPDATED: Locations Globe Component ===
const LocationsGlobe = () => {
  // Define locations with coordinates and optional address (Unchanged)
  const locations = [
    { lat: 27.994402, lng: -81.760254, name: "Florida, USA", address: "Serving the Southeast Region" },
    { lat: 36.778259, lng: -119.417931, name: "California, USA", address: "West Coast Operations Hub" },
    { lat: 22.572645, lng: 88.363892, name: "Kolkata, India", address: "Asia-Pacific Development Center" },
    { lat: 17.385044, lng: 78.486671, name: "Hyderabad, India", address: "R&D and Support Center" },
  ];

  const globeEl = useRef();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isRotating, setIsRotating] = useState(true);
  const [GlobeComponent, setGlobeComponent] = useState(null);

  // Dynamic import useEffect (Unchanged)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('react-globe.gl')
        .then(module => {
          setGlobeComponent(() => module.default);
        })
        .catch(err => {
          console.error("Failed to load Globe component:", err);
        });
    }
  }, []);

  // Auto-rotation effect (Unchanged)
  useEffect(() => {
    if (globeEl.current && GlobeComponent) {
        globeEl.current.controls().autoRotate = isRotating;
        globeEl.current.controls().autoRotateSpeed = 0.4;
        globeEl.current.controls().enableDamping = true;
        globeEl.current.controls().dampingFactor = 0.1;
        globeEl.current.controls().minDistance = 200;
        globeEl.current.controls().maxDistance = 500;
    }
  }, [isRotating, GlobeComponent]);

  const handlePointClick = (point) => {
    setSelectedLocation(point);
    setIsRotating(false);
    const { lat, lng } = point;
    if (globeEl.current && GlobeComponent) {
        globeEl.current.pointOfView({ lat: lat, lng: lng, altitude: 1.5 }, 1000);
    }
  };

  // --- JSX ---
  return (
    // Main container now includes space for the text list below
    <div className="flex flex-col items-center bg-gray-900/30 rounded-2xl p-4 border border-cyan-500/10 overflow-hidden">
        {/* Top section: Globe and Info Card side-by-side */}
        <div className="relative w-full h-[550px] md:h-[600px] flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8"> {/* Adjusted height */}
            {/* Globe Container */}
            <div className="w-full md:w-2/3 h-[300px] md:h-full cursor-grab active:cursor-grabbing">
                {GlobeComponent ? (
                    <GlobeComponent
                        ref={globeEl}
                        // ... globe props ...
                        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                        pointsData={locations}
                        pointLabel="name"
                        pointLat="lat"
                        pointLng="lng"
                        pointRadius={0.6}
                        pointAltitude={0.02}
                        pointColor={(loc) => loc === selectedLocation ? 'rgba(255, 255, 0, 0.9)' : 'rgba(6, 182, 212, 0.8)'} // Highlight selected
                        pointsTransitionDuration={500}
                        pointsMerge={true}
                        onPointClick={handlePointClick}
                        atmosphereColor={'rgba(0, 200, 255, 0.2)'}
                        atmosphereAltitude={0.2}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-cyan-400">Loading Globe...</div>
                )}
            </div>

            {/* Info Overlay Area */}
            <div className="w-full md:w-1/3 h-auto md:h-full flex items-center justify-center p-4">
                <AnimatePresence>
                    {selectedLocation && (
                    <motion.div
                        key={selectedLocation.name}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 30 }}
                        transition={{ type: 'spring', stiffness: 120, damping: 15 }}
                        className="relative bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 border border-cyan-500/30 shadow-xl text-left max-w-sm w-full"
                    >
                        <h4 className="text-xl font-bold text-cyan-400 mb-2 flex items-center gap-2">
                        <MapPin size={18} /> {selectedLocation.name}
                        </h4>
                        <p className="text-cyan-200 text-sm mb-4">
                        {selectedLocation.address || 'Global Operations Center'}
                        </p>
                        <a
                            href={`http://googleusercontent.com/maps.google.com/9{selectedLocation.lat},${selectedLocation.lng},12z`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-100 transition-colors interactive font-medium"
                        >
                        Explore Location <ArrowRight size={14} />
                        </a>
                        <button
                        onClick={() => {
                            setSelectedLocation(null);
                            setIsRotating(true);
                        }}
                        className="absolute top-3 right-3 p-1 text-gray-400 hover:text-white interactive rounded-full hover:bg-white/10"
                        aria-label="Close location info"
                        >
                        <X size={18} />
                        </button>
                    </motion.div>
                    )}
                    {!selectedLocation && (
                        <motion.div // Placeholder text
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-center text-cyan-300/70 p-4"
                        >
                            <Map size={32} className="mx-auto mb-4 opacity-50"/>
                            <p className="font-medium">Explore Our Global Presence</p>
                            <p className="text-sm">Click a marker or name below.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>

        {/* === NEW: Clickable Location Text List === */}
        <div className="w-full flex flex-wrap justify-center gap-4 py-4 mt-4 border-t border-cyan-500/10">
            {locations.map((loc) => (
                <button
                    key={loc.name}
                    onClick={() => handlePointClick(loc)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 interactive border ${
                        selectedLocation?.name === loc.name
                        ? 'bg-cyan-500 text-white border-cyan-400 scale-105 shadow-md shadow-cyan-500/30'
                        : 'bg-cyan-900/40 text-cyan-200 border-cyan-500/20 hover:bg-cyan-900/70 hover:border-cyan-500/40'
                    }`}
                >
                    <MapPin size={14} className="inline mr-1.5 mb-0.5" />
                    {loc.name}
                </button>
            ))}
        </div>
        {/* ======================================= */}
    </div>
  );
};
