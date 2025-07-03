import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { useNavigate } from "react-router-dom";

// Define team members data for mapping
const teamMembers = [
  {
    id: 1,
    name: "SEIF AHMED",
    role: "SOFTWARE ENGINEER",
    image: "/images--1-.png",
  },
  {
    id: 2,
    name: "MOHAMED AHMED",
    role: "SOFTWARE ENGINEER",
    image: "/IMG_20250330_161954.jpg",
  },
  {
    id: 3,
    name: "NOUR ALDEEN",
    role: "SOFTWARE ENGINEER",
    image: "/Formal_pic.jpg",
  },
  {
    id: 4,
    name: "ADBALLAH ASHRAF",
    role: "SOFTWARE ENGINEER",
    image: "/Photo.png",
  },
  {
    id: 5,
    name: "ABDELRAHMAN EMAD",
    role: "SOFTWARE ENGINEER",
    image: "/IMG_20250417_011230.jpg",
  },
  {
    id: 6,
    name: "SEIF ALDIEN",
    role: "SOFTWARE ENGINEER",
    image: "/IMG-20241117-WA0011.jpg",
  },
];

// Define subscription plans data
const subscriptionPlans = [
  {
    id: 1,
    title: "Basic",
    price: "90",
    features: ["4K Video Enhancement", "Audio Noise Reduction", "24/7 Support", "Cloud Storage"],
  },
  {
    id: 2,
    title: "Pro",
    price: "190",
    features: ["8K Video Enhancement", "Advanced Audio Processing", "Priority Support", "Unlimited Storage"],
  },
  {
    id: 3,
    title: "Enterprise",
    price: "290",
    features: ["Custom Resolution", "Real-time Processing", "Dedicated Support", "Private Cloud"],
  },
];

// Menu items for fullscreen menu
const menuItems = [
  { name: "Home", path: "/" },
  { name: "Upload Video", path: "/upload" },
  { name: "Subscriptions", path: "/subscribe" },
  { name: "Login", path: "/login" },
  { name: "Register", path: "/register" },
];

// Image comparison component
interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  title: string;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ beforeImage, afterImage, title }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    // منع التحديد الافتراضي للصورة عند السحب
    e.preventDefault();
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = Math.max(0, Math.min((x / rect.width) * 100, 100));

    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return;

    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
    const percentage = Math.max(0, Math.min((x / rect.width) * 100, 100));

    setSliderPosition(percentage);
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-lg shadow-xl aspect-video bg-black flex-1 select-none"
        onTouchMove={handleTouchMove}
      >
        {/* After image (background) */}
        <div className="absolute inset-0 select-none">
          <img
            src={afterImage}
            alt="After"
            className="w-full h-full object-cover select-none pointer-events-none"
            draggable="false"
          />
        </div>

        {/* Before image (foreground, clipped) */}
        <div
          className="absolute inset-0 select-none"
          style={{
            clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
          }}
        >
          <img
            src={beforeImage}
            alt="Before"
            className="w-full h-full object-cover select-none pointer-events-none"
            draggable="false"
          />
        </div>

        {/* Slider control */}
        <div
          className="absolute inset-y-0 transition-all duration-100 ease-out select-none"
          style={{ left: `calc(${sliderPosition}% - 1px)` }}
        >
          <div className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown as any}
          >
            <div className="flex items-center justify-center">
              <svg className="w-5 h-5 text-[#1a2081]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 19l-7-7m0 0l7-7m-7 7h18" transform="rotate(180 12 12)"></path>
                <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded select-none">
          Before
        </div>
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded select-none">
          After
        </div>
      </div>
      <div className="mt-3 text-center">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
    </div>
  );
};

// Sample comparison data
const comparisonItems = [
  {
    id: 1,
    title: "Video Quality Enhancement",
    beforeImage: "/00000000.png",
    afterImage: "/a00000000.png"
  },
  {
    id: 2,
    title: "Audio Noise Reduction",
    beforeImage: "/001.png",
    afterImage: "/a001.png"
  },
  {
    id: 3,
    title: "Footage Restoration",
    beforeImage: "/before.jpg",
    afterImage: "/after.jpg"
  }
];

// Video comparison component
interface VideoComparisonProps {
  beforeVideo: string;
  afterVideo: string;
  title: string;
}

const VideoComparison: React.FC<VideoComparisonProps> = ({ beforeVideo, afterVideo, title }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    e.preventDefault();
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = Math.max(0, Math.min((x / rect.width) * 100, 100));

    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return;

    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
    const percentage = Math.max(0, Math.min((x / rect.width) * 100, 100));

    setSliderPosition(percentage);
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-lg shadow-xl aspect-video bg-black flex-1 select-none"
        onTouchMove={handleTouchMove}
      >
        {/* After video (background) */}
        <div className="absolute inset-0 select-none">
          <video
            src={afterVideo}
            className="w-full h-full object-cover select-none pointer-events-none"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>

        {/* Before video (foreground, clipped) */}
        <div
          className="absolute inset-0 select-none"
          style={{
            clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
          }}
        >
          <video
            src={beforeVideo}
            className="w-full h-full object-cover select-none pointer-events-none"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>

        {/* Slider control */}
        <div
          className="absolute inset-y-0 transition-all duration-100 ease-out select-none"
          style={{ left: `calc(${sliderPosition}% - 1px)` }}
        >
          <div className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown as any}
          >
            <div className="flex items-center justify-center">
              <svg className="w-5 h-5 text-[#1a2081]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 19l-7-7m0 0l7-7m-7 7h18" transform="rotate(180 12 12)"></path>
                <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded select-none">
          Before
        </div>
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded select-none">
          After
        </div>
      </div>
      <div className="mt-3 text-center">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
    </div>
  );
};

// Sample video comparison data
const videoComparisonItems = [
  {
    id: 1,
    title: "HD Video Enhancement",
    beforeVideo: "/video_with_sound_low.mp4",
    afterVideo: "/video_with_sound_high.mp4"
  },
  // {
  //   id: 2,
  //   title: "Low Light Improvement",
  //   beforeVideo: "/video_with_sound_low.mp4",
  //   afterVideo: "/video_with_sound_high.mp4"
  // },
  // {
  //   id: 3,
  //   title: "Motion Stabilization",
  //   beforeVideo: "/video_with_sound_low.mp4",
  //   afterVideo: "/video_with_sound_high.mp4"
  // }
];

export const Home = (): JSX.Element => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen overflow-x-hidden relative" style={{ 
      backgroundImage: "url('/background.png')", 
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed"
    }}>
      {/* Content Container */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 bg-gradient-to-r from-[#1a2081]/90 to-[#2a3091]/90 backdrop-blur-md border-b border-white/10 shadow-lg">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <motion.div 
              className="flex items-center space-x-3 cursor-pointer z-50" 
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-10 h-10 relative bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                <div className="absolute inset-1 bg-white rounded-full" style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} />
              </div>
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">Claro</span>
            </motion.div>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-6">
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10 rounded-full px-5"
                onClick={() => navigate('/upload')}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Upload Video
              </Button>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/10 rounded-full px-5"
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
                <Button
                  variant="default"
                  className="bg-white text-[#1a2081] hover:bg-white/90 rounded-full px-5 shadow-md"
                  onClick={() => navigate('/register')}
                >
                  Register
                </Button>
              </div>
            </div>
            
            {/* Menu Button (visible on all devices) */}
            <motion.button 
              className="z-50 flex flex-col items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md"
              onClick={toggleMenu}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="w-6 h-0.5 bg-white mb-1.5"
              />
              <motion.div
                animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="w-6 h-0.5 bg-white mb-1.5"
              />
              <motion.div
                animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="w-6 h-0.5 bg-white"
              />
            </motion.button>
          </div>
        </nav>
        
        {/* Fullscreen Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="fixed inset-0 z-40 bg-gradient-to-br from-[#1a2081] to-[#3a40b1] flex flex-col justify-center items-center overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              {/* Background animated elements */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div 
                  className="absolute w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-3xl"
                  animate={{ 
                    x: [0, 100, 0], 
                    y: [0, 50, 0],
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 20,
                    ease: "easeInOut"
                  }}
                  style={{ left: '10%', top: '20%' }}
                />
                <motion.div 
                  className="absolute w-[400px] h-[400px] rounded-full bg-purple-600/10 blur-3xl"
                  animate={{ 
                    x: [0, -150, 0], 
                    y: [0, 100, 0],
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 25,
                    ease: "easeInOut",
                    delay: 1
                  }}
                  style={{ right: '10%', bottom: '20%' }}
                />
              </div>
              
              {/* Menu items */}
              <motion.div className="flex flex-col items-center space-y-8 relative z-10 p-6 rounded-xl">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    className="text-center"
                  >
                    <motion.button 
                      onClick={() => {
                        setIsMenuOpen(false);
                        navigate(item.path);
                      }}
                      className="text-3xl md:text-4xl font-bold text-white hover:text-blue-300 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.name}
                    </motion.button>
                  </motion.div>
                ))}
              </motion.div>
              
              {/* Social Media Links */}
              <motion.div 
                className="absolute bottom-16 flex space-x-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {[
                  { icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z", name: "Facebook" },
                  { icon: "M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z", name: "Twitter" },
                  { icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z", name: "Instagram" },
                ].map((social, index) => (
                  <motion.a 
                    key={social.name}
                    href="#" 
                    className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + (index * 0.1) }}
                  >
                    <svg 
                      className="w-6 h-6 text-white" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d={social.icon} />
                    </svg>
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Section - Enhanced */}
        <section className="min-h-screen relative overflow-hidden pt-20">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div 
              className="absolute w-[700px] h-[700px] rounded-full bg-blue-600/10 blur-3xl"
              animate={{ 
                x: [0, 50, 0], 
                y: [0, 30, 0],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 25,
                ease: "easeInOut"
              }}
              style={{ left: '0%', top: '10%' }}
            />
            <motion.div 
              className="absolute w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-3xl"
              animate={{ 
                x: [0, -70, 0], 
                y: [0, 50, 0],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 30,
                ease: "easeInOut",
                delay: 1
              }}
              style={{ right: '5%', bottom: '10%' }}
            />
          </div>
          
          <div className="container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center justify-between relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 text-white space-y-6"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-block bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md px-6 py-2 rounded-full mb-4 border border-white/10"
              >
                <span className="text-white/90 font-medium">AI-Powered Video Enhancement</span>
              </motion.div>
            
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                WELCOME TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Claro</span>
              </h1>
              <p className="text-xl md:text-2xl leading-relaxed opacity-90">
                We specialize in improving video and audio quality using cutting-edge AI.
                Whether you need to remove noise, enhance clarity, or restore old footage,
                our advanced algorithms ensure the best results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-lg px-8 py-6 rounded-full shadow-lg"
                  onClick={() => navigate('/subscribe')}
                >
                  Get Started
                </Button>
                <Button
                  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white text-lg px-8 py-6 rounded-full"
                  onClick={() => navigate('/upload')}
                >
                  Try For Free
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 mt-10 lg:mt-0"
            >
              <motion.img
                src="erasebg-transformed.jpg"
                alt="Hero"
                className="w-full h-auto drop-shadow-2xl"
                animate={{
                  y: [0, -15, 0],
                  filter: ["drop-shadow(0 10px 20px rgba(0,0,0,0.3))", "drop-shadow(0 20px 30px rgba(0,0,0,0.5))", "drop-shadow(0 10px 20px rgba(0,0,0,0.3))"]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a2081]/0 via-[#2a3091]/90 to-[#1a2081]/0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                ENHANCE YOUR VIDEOS LIKE NEVER BEFORE
              </h2>
              <p className="text-xl text-white/80">
                Bring clarity to your videos with AI-powered enhancement
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "4K Enhancement",
                  description: "Upgrade your videos to crystal clear 4K quality",
                  icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14v-4z M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                },
                {
                  title: "Noise Reduction",
                  description: "Remove unwanted background noise from your audio",
                  icon: "M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                },
                {
                  title: "Color Correction",
                  description: "Perfect colors and contrast automatically",
                  icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  whileHover={{ y: -10, transition: { duration: 0.2 } }}
                >
                  <Card className="h-full bg-white/10 backdrop-blur-sm border-white/20 overflow-hidden">
                    <CardContent className="p-6 text-white">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 shadow-md">
                        <svg 
                          className="w-6 h-6 text-white" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="opacity-80">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Before and After Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4 relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-white text-center mb-6"
            >
              BEFORE AND AFTER
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-white/80 text-center max-w-3xl mx-auto mb-12"
            >
              Drag the slider to see the difference our AI enhancement makes
            </motion.p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto flex items-center justify-center">
              {comparisonItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: item.id * 0.15 }}
                  className="relative"
                >
                  <BeforeAfterSlider
                    beforeImage={item.beforeImage}
                    afterImage={item.afterImage}
                    title={item.title}
                  />
                </motion.div>
              ))}
            </div>
            <div className="flex justify-center mt-12">
              <Button
                className="bg-[#5865f2] hover:bg-[#4752c4] text-white px-8 py-3 text-lg"
                onClick={() => navigate('/upload')}
              >
                Try It Yourself
              </Button>
            </div>
          </div>
        </section>

        {/* Video Enhancement Section */}
        {/* <section className="py-20 relative">
          <div className="container mx-auto px-4 relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-white text-center mb-6"
            >
              VIDEO ENHANCEMENT
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-white/80 text-center max-w-3xl mx-auto mb-12"
            >
              See how our AI technology transforms video quality in real-time
            </motion.p>
            <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-8 max-w-6xl mx-auto">
              {videoComparisonItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: item.id * 0.15 }}
                  className="relative"
                >
                  <VideoComparison
                    beforeVideo={item.beforeVideo}
                    afterVideo={item.afterVideo}
                    title={item.title}
                  />
                </motion.div>
              ))}
            </div>
            <div className="flex justify-center mt-12">
              <Button
                className="bg-[#5865f2] hover:bg-[#4752c4] text-white px-8 py-3 text-lg"
                onClick={() => navigate('/upload')}
              >
                Enhance Your Videos
              </Button>
            </div>
          </div>
        </section> */}

        {/* Subscription Plans */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a2081]/0 via-[#2a3091]/90 to-[#1a2081]/0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-white text-center mb-16"
            >
              SUBSCRIBE
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {subscriptionPlans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <Card className="h-full bg-white/10 backdrop-blur-sm border-white/20">
                    <CardContent className="p-8 text-white text-center">
                      <h3 className="text-2xl font-bold mb-4">{plan.title}</h3>
                      <div className="text-5xl font-bold mb-6">${plan.price}</div>
                      <ul className="space-y-4 mb-8">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-center justify-center">
                            <span className="mr-2">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button
                        className="w-full bg-white text-black hover:bg-white/90"
                        onClick={() => navigate('/subscribe')}
                      >
                        Choose Plan
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section - Improved */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4 relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-white text-center mb-6"
            >
              MEET OUR TEAM
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-white/80 text-center max-w-3xl mx-auto mb-16"
            >
              Our talented developers and designers working to bring you the best experience
            </motion.p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10, transition: { duration: 0.2 } }}
                >
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
                    <Card className="relative h-full bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm border-white/20 rounded-xl overflow-hidden">
                      <CardContent className="p-6 text-white text-center">
                        <div className="relative">
                          <div className="w-32 h-32 mx-auto mb-1 rounded-full overflow-hidden relative ring-4 ring-white/20 shadow-lg">
                            <img
                              src={member.image}
                              alt={member.name}
                              className="w-full h-full object-cover scale-110"
                            />
                          </div>
                          <div className="absolute bottom-0 right-[calc(50%-60px)] w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold mt-4 mb-1">{member.name}</h3>
                        <p className="text-white/60 mb-4 text-sm">{member.role}</p>
                        <div className="flex justify-center space-x-3 mt-4">
                          {[
                            "M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z",
                            "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z",
                            "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"
                          ].map((icon, i) => (
                            <a
                              key={i}
                              href="#"
                              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                              aria-label="Social link"
                            >
                              <svg 
                                className="w-4 h-4 text-white/80" 
                                fill="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path d={icon} />
                              </svg>
                            </a>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section - New */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a2081]/0 via-[#2a3091]/40 to-[#1a2081]/0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-white text-center mb-6"
            >
              WHAT OUR CLIENTS SAY
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-white/80 text-center max-w-3xl mx-auto mb-16"
            >
              Hear from content creators who have transformed their videos with Claro
            </motion.p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Seif Ahmed",
                  role: "Full Stack",
                  quote: "I was amazed by how Claro transformed my low-resolution footage into crisp, professional-quality videos. The AI technology is truly revolutionary!",
                  avatar: "/images--1-.png"
                },
                {
                  name: "Mohamed Ahmed",
                  role: "Full Stack",
                  quote: "The noise reduction feature saved hours of post-production work. My audio now sounds crystal clear without any background noise. Highly recommended.",
                  avatar: "/IMG_20250330_161954.jpg"
                },
                {
                  name: "Nour Mouner",
                  role: "Full Stack",
                  quote: "Claro has become an essential part of my workflow. I can now produce high-quality content even when shooting in challenging lighting conditions.",
                  avatar: "/Formal_pic.jpg"
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Card className="h-full bg-white/5 backdrop-blur-sm border-white/10 relative">
                    <CardContent className="p-8 text-white">
                      <div className="mb-6">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 text-yellow-400 inline-block mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        ))}
                      </div>
                      <p className="text-white/80 italic mb-6">"{testimonial.quote}"</p>
                      <div className="flex items-center">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name} 
                          className="w-12 h-12 rounded-full object-cover mr-4"
                        />
                        <div>
                          <h4 className="font-bold">{testimonial.name}</h4>
                          <p className="text-white/60 text-sm">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 relative bg-gradient-to-t from-[#14196e] to-[#1a2081]">
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
              <div className="mb-6 md:mb-0">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 relative bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                    <div className="absolute inset-1 bg-white rounded-full" style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} />
                  </div>
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">Claro</span>
                </div>
                <p className="text-white/60 mt-4 max-w-md">
                  Transforming video quality with cutting-edge AI technology. 
                  Enhance, restore, and perfect your videos with our powerful tools.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-white font-bold mb-4">Company</h3>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-white/60 hover:text-white transition-colors">About Us</a></li>
                    <li><a href="#" className="text-white/60 hover:text-white transition-colors">Careers</a></li>
                    <li><a href="#" className="text-white/60 hover:text-white transition-colors">Contact</a></li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-white font-bold mb-4">Support</h3>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-white/60 hover:text-white transition-colors">Help Center</a></li>
                    <li><a href="#" className="text-white/60 hover:text-white transition-colors">Tutorials</a></li>
                    <li><a href="#" className="text-white/60 hover:text-white transition-colors">Documentation</a></li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
              <div className="text-white/50 text-sm mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} Claro. All rights reserved.
              </div>
              
              <div className="flex space-x-6">
                <a href="#" className="text-white/50 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-white/50 hover:text-white transition-colors">Terms of Service</a>
              </div>
              
              <div className="flex mt-4 md:mt-0 space-x-4">
                {[
                  "M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z",
                  "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z",
                  "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"
                ].map((icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <svg 
                      className="w-4 h-4 text-white/80" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d={icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};