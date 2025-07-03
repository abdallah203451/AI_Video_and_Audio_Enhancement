import React, { useCallback, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { Progress } from "../../components/ui/progress";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import Lottie from "lottie-react";
import uploadAnimation from "./upload-animation.json";
import { useNavigate } from "react-router-dom";
import { Upload as UploadIcon, Film, Volume2, PaintBucket, Zap, Download, ArrowLeft } from "lucide-react";
import HomeButton from "../../components/HomeButton";

// API endpoint
const API_URL = "http://e5ed-34-83-193-141.ngrok-free.app/process_video";

const VideoPlayer = ({ src }: { src: string }) => {
  const [error, setError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Reset error state when src changes
    setError(false);
  }, [src]);

  return error ? (
    <div className="bg-red-900/20 p-4 rounded-lg text-red-300">
      Failed to load video. Please try again or download the file.
    </div>
  ) : (
    <video 
      ref={videoRef}
      controls
      preload="auto"
      onError={() => setError(true)}
      className="w-full"
      crossOrigin="anonymous"
      playsInline
    >
      <source src={src} type="video/mp4" />
      Your browser does not support video playback.
    </video>
  );
};

export const Upload = (): JSX.Element => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{ before: string; after: string } | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const videoFile = acceptedFiles[0];
    if (videoFile && videoFile.type.startsWith('video/')) {
      setFile(videoFile);
      handleUpload(videoFile);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi']
    },
    maxFiles: 1
  });

  const checkVideoValidity = async (url: string) => {
    const video = document.createElement('video');
    video.src = url;
    return new Promise((resolve) => {
      video.onloadedmetadata = () => resolve(true);
      video.onerror = () => resolve(false);
    });
  };

  const handleUpload = async (videoFile: File) => {
    setUploading(true);
    setProgress(0);
    setError(null);

    const formData = new FormData();
    formData.append('video', videoFile);

    let progressInterval: number | undefined;

    try {
      progressInterval = window.setInterval(() => {
        setProgress(prev => Math.min(prev + Math.random() * 10, 95));
      }, 10000);

      console.log("Starting video upload to:", API_URL);
      
      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
        mode: 'cors',
        credentials: 'omit',
        headers: {
          'Accept': 'video/mp4,*/*'
        }
      });

      if (progressInterval) clearInterval(progressInterval);
      setProgress(100);
      setShowSuccess(true);

      if (!response.ok) {
        const errorText = await response.text().catch(() => "");
        throw new Error(`API request failed: ${response.status} ${errorText}`);
      }

      // Get the enhanced video as blob from the response
      const enhancedVideoBlob = await response.blob();
      
      if (enhancedVideoBlob.size === 0) {
        throw new Error("Received empty file from server");
      }
      console.log("########### enhancedVideoBlob : ###########")
      console.log(enhancedVideoBlob);
      console.log("######################")
      console.log("Successfully received data, file size:", 
        (enhancedVideoBlob.size / (1024 * 1024)).toFixed(2) + " MB", 
        "file type:", enhancedVideoBlob.type);
      
      // Create URL for the video blob with correct MIME type
      const enhancedVideoUrl = URL.createObjectURL(enhancedVideoBlob);
      
      // Verify video can be played
      const videoElement = document.createElement('video');
      videoElement.src = enhancedVideoUrl;
      videoElement.muted = true;
      
      // Wait for video metadata to load to confirm it's valid
      await new Promise((resolve, reject) => {
        videoElement.onloadedmetadata = resolve;
        videoElement.onerror = () => reject(new Error("Video cannot be played"));
        // Set a timeout in case the video never loads
        setTimeout(() => reject(new Error("Video loading timeout")), 5000);
      }).catch(err => {
        console.error("Video validation error:", err);
        throw new Error("The received video cannot be played. Please try again.");
      });
      
      setTimeout(() => {
        setUploading(false);
        setResult({
          before: URL.createObjectURL(videoFile),
          after: enhancedVideoUrl
        });
        setShowSuccess(false);
      }, 1500);
    } catch (err) {
      console.error("Upload error:", err);
      if (progressInterval) clearInterval(progressInterval);
      setError(err instanceof Error ? err.message : "An error occurred while processing the video");
      setUploading(false);
      setShowSuccess(false);
    }
  };

  // Animated particles component
  const Particles = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/20"
            style={{
              width: Math.random() * 6 + 1,
              height: Math.random() * 6 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -Math.random() * 500 - 200],
              x: [0, (Math.random() - 0.5) * 200],
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0.5]
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div 
      className="min-h-screen pt-20 px-4 pb-20 relative overflow-hidden"
      style={{ 
        backgroundImage: "url('/background.png')", 
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      {/* Back to home button */}
      <HomeButton />
      
      {/* Animated particles effect */}
      <Particles />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a2081]/50 via-[#3a40a5]/70 to-[#1a2081]/90 backdrop-blur-sm pointer-events-none"></div>
      
      <div className="container mx-auto py-8 relative z-10">
        {/* Page title with effects */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#aeb4ff] mb-4"
            animate={{ 
              textShadow: ["0 0 20px rgba(255,255,255,0.3)", "0 0 30px rgba(255,255,255,0.5)", "0 0 20px rgba(255,255,255,0.3)"] 
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            AI Video Enhancement
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-white/80 max-w-3xl mx-auto"
          >
            Upload your video and see it transform with advanced AI technology
          </motion.p>
        </motion.div>
        
        <AnimatePresence mode="wait">
          {!result && !uploading && (
            <motion.div 
              key="upload-section"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto"
            >
              <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-[0_20px_80px_-10px_rgba(90,100,234,0.3)] rounded-2xl overflow-hidden">
                <CardContent className="p-8">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center"
                  >
                    <h2 className="text-2xl font-bold text-white mb-10 text-center">Upload Your Video</h2>
                    
                    <motion.div
                      {...getRootProps()}
                      className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer min-h-[300px] w-full flex flex-col items-center justify-center transition-all duration-300 ${
                        isDragActive ? 'border-white bg-white/10' : 'border-white/30 hover:border-white/50 hover:bg-white/5'
                      }`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <input {...getInputProps()} ref={fileInputRef} />
                      
                      <motion.div 
                        className="w-40 h-40 mx-auto mb-8"
                        animate={{ 
                          y: [0, -10, 0],
                          filter: ["drop-shadow(0 0 10px rgba(88,101,242,0.3))", "drop-shadow(0 0 20px rgba(88,101,242,0.6))", "drop-shadow(0 0 10px rgba(88,101,242,0.3))"]
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Lottie animationData={uploadAnimation} loop={true} />
                      </motion.div>
                      
                      <motion.h3 
                        className="text-2xl font-bold text-white mb-4"
                        animate={{ scale: isDragActive ? 1.05 : 1 }}
                      >
                        {isDragActive ? "Drop Video Here" : "Drag & Drop Video Here"}
                      </motion.h3>
                      
                      <p className="text-white/60 mb-10 text-lg">Or click to select a file</p>
                      
                      <motion.button 
                        className="px-10 py-4 bg-gradient-to-r from-[#5865f2] to-[#7b83eb] text-white rounded-full font-medium hover:from-[#4752c4] hover:to-[#5865f2] transition-all shadow-lg flex items-center gap-2"
                        whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(88,101,242,0.4)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <UploadIcon className="w-5 h-5" />
                        <span>Choose Video</span>
                      </motion.button>
                      
                      <p className="text-white/40 text-sm mt-8">
                        Supports MP4, MOV and AVI formats up to 100MB
                      </p>
                    </motion.div>
                  </motion.div>
                </CardContent>
              </Card>
              
              {/* Trust badges */}
              <motion.div 
                className="mt-16 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="text-white/90 text-lg mb-6">Trusted technology used by</h3>
                <div className="flex justify-center flex-wrap gap-8">
                  {[
                    { name: "Creative Studio", icon: <Film className="w-6 h-6" /> },
                    { name: "FilmPro", icon: <Film className="w-6 h-6" /> },
                    { name: "MediaCorp", icon: <Film className="w-6 h-6" /> },
                    { name: "VideoTech", icon: <Film className="w-6 h-6" /> }
                  ].map((company, i) => (
                    <motion.div 
                      key={i}
                      className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg px-5 py-3"
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + (i * 0.1) }}
                    >
                      <span className="text-white">{company.icon}</span>
                      <span className="text-white/90 font-medium">{company.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
          
          {uploading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-3xl mx-auto"
            >
              <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-[0_20px_80px_-10px_rgba(90,100,234,0.3)] rounded-2xl overflow-hidden">
                <CardContent className="p-10">
                  <div className="flex flex-col items-center justify-center">
                    {showSuccess ? (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, rotate: [0, 5, -5, 0] }}
                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        className="text-center"
                      >
                        <div className="w-28 h-28 bg-gradient-to-r from-green-400 to-green-500 rounded-full mx-auto flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(74,222,128,0.5)]">
                          <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-3">Processing Complete!</h3>
                        <p className="text-white/70 text-lg">Preparing results...</p>
                      </motion.div>
                    ) : (
                      <>
                        <div className="relative w-40 h-40 mb-10">
                          <Lottie animationData={uploadAnimation} loop={true} />
                          <motion.div 
                            className="absolute inset-0 flex items-center justify-center"
                            animate={{ 
                              opacity: [0.5, 1, 0.5],
                              scale: [0.95, 1.05, 0.95]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <div className="w-full h-full rounded-full border-4 border-[#5865f2]/30 flex items-center justify-center">
                              <span className="text-3xl font-bold text-white">{Math.round(progress)}%</span>
                            </div>
                          </motion.div>
                        </div>
                        
                        <h3 className="text-3xl font-bold text-white mb-10">Processing Video</h3>
                        
                        <div className="w-full max-w-md mb-10 relative">
                          <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-gradient-to-r from-[#5865f2] to-[#a5b4ff]"
                              initial={{ width: "0%" }}
                              animate={{ width: `${progress}%` }}
                              transition={{ duration: 0.5 }}
                            />
                          </div>
                          
                          <div className="mt-3 flex justify-between text-sm text-white/60">
                            <span>Upload</span>
                            <span>Enhance</span>
                            <span>Complete</span>
                          </div>
                        </div>
                        
                        <div className="text-white/70 text-xl max-w-md text-center font-medium mb-8">
                          {progress < 30 && "Analyzing video..."}
                          {progress >= 30 && progress < 60 && "Enhancing image quality..."}
                          {progress >= 60 && progress < 90 && "Cleaning audio..."}
                          {progress >= 90 && "Finalizing enhancements..."}
                        </div>
                        
                        <div className="flex justify-center">
                          {[0, 1, 2].map(i => (
                            <motion.div 
                              key={i}
                              className="mx-1 w-2 h-2 bg-white/50 rounded-full"
                              animate={{ 
                                opacity: [0.3, 1, 0.3],
                                scale: [0.8, 1.2, 0.8]
                              }}
                              transition={{ 
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.3
                              }}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
          
          {error && !uploading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-3xl mx-auto"
            >
              <Card className="bg-white/10 backdrop-blur-md border-red-500/30 shadow-[0_20px_80px_-10px_rgba(239,68,68,0.3)] rounded-2xl overflow-hidden">
                <CardContent className="p-10">
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="w-28 h-28 bg-gradient-to-r from-red-400 to-red-500 rounded-full mx-auto flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(239,68,68,0.5)]">
                      <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-5">Processing Error</h3>
                    <p className="text-white/80 text-lg mb-8">{error}</p>
                    
                    <motion.button 
                      className="px-8 py-4 bg-gradient-to-r from-[#5865f2] to-[#7d89ff] text-white rounded-full font-semibold hover:shadow-lg hover:from-[#4752c4] hover:to-[#5865f2] transition-all flex items-center gap-2"
                      whileHover={{ scale: 1.05, boxShadow: "0 15px 30px -5px rgba(88,101,242,0.3)" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setFile(null);
                        setError(null);
                      }}
                    >
                      <UploadIcon className="w-5 h-5" />
                      <span>Try Again</span>
                    </motion.button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
          
          {result && (
            <motion.div 
              key="result-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-6xl mx-auto"
            >
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-bold text-white mb-4">Video Enhancement Complete! 🎉</h2>
                <p className="text-xl text-white/70 max-w-3xl mx-auto">
                  Compare the results below to see the difference between the original and enhanced videos
                </p>
              </motion.div>
              
              <div className="grid md:grid-cols-2 gap-12">
                {/* Original video */}
                <motion.div 
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md border-white/10 rounded-2xl overflow-hidden shadow-lg">
                    <div className="bg-gradient-to-r from-[#2a3091] to-[#5865f2] py-5 px-6 flex items-center justify-between">
                      <h3 className="text-xl font-bold text-white">Original Video</h3>
                      <div className="bg-white/20 rounded-full px-3 py-1 text-xs text-white">720p</div>
                    </div>
                    <CardContent className="p-6">
                      <div className="rounded-lg overflow-hidden relative">
                        <video
                          ref={videoRef}
                          src={result.before}
                          controls
                          className="w-full"
                        />
                        <div className="absolute inset-0 pointer-events-none border border-white/10 rounded-lg"></div>
                      </div>
                      
                      <div className="mt-5 flex flex-wrap gap-3">
                        <div className="bg-white/10 rounded-lg px-3 py-2 text-sm text-white/70">
                          Size: {(file?.size ? (file.size / (1024 * 1024)).toFixed(2) : 0)} MB
                        </div>
                        <div className="bg-white/10 rounded-lg px-3 py-2 text-sm text-white/70">
                          Duration: {videoRef.current?.duration?.toFixed(2) || 0}s
                        </div>
                        <div className="bg-white/10 rounded-lg px-3 py-2 text-sm text-white/70">
                          Format: {file?.type.split('/')[1].toUpperCase() || 'MP4'}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                
                {/* Enhanced video */}
                <motion.div 
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border-[#5865f2]/30 rounded-2xl overflow-hidden shadow-[0_10px_40px_-5px_rgba(88,101,242,0.3)]">
                    <div className="bg-gradient-to-r from-[#5865f2] to-[#7d89ff] py-5 px-6 flex items-center justify-between">
                      <h3 className="text-xl font-bold text-white flex items-center">
                        Enhanced Video
                        <motion.span 
                          className="ml-2 inline-block"
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                        >
                          ✨
                        </motion.span>
                      </h3>
                      <div className="bg-white/30 rounded-full px-3 py-1 text-xs text-white font-semibold">4K</div>
                    </div>
                    <CardContent className="p-6">
                      <div className="rounded-lg overflow-hidden relative">
                        <VideoPlayer src={result.after} />
                        <motion.div 
                          className="absolute inset-0 pointer-events-none border-2 border-[#5865f2]/30 rounded-lg"
                          animate={{ boxShadow: ["0 0 0px rgba(88,101,242,0)", "0 0 20px rgba(88,101,242,0.4)", "0 0 0px rgba(88,101,242,0)"] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        ></motion.div>
                      </div>
                      
                      <div className="mt-5">
                        <div className="bg-gradient-to-r from-[#5865f2]/20 to-[#5865f2]/5 rounded-lg px-5 py-4">
                          <h4 className="text-white font-semibold mb-2">Applied Enhancements:</h4>
                          <ul className="text-white/80 grid grid-cols-2 gap-x-4 gap-y-2">
                            <li className="flex items-center">
                              <span className="mr-2 text-green-400">✓</span> Resolution Increase
                            </li>
                            <li className="flex items-center">
                              <span className="mr-2 text-green-400">✓</span> Noise Reduction
                            </li>
                            <li className="flex items-center">
                              <span className="mr-2 text-green-400">✓</span> Color Enhancement
                            </li>
                            <li className="flex items-center">
                              <span className="mr-2 text-green-400">✓</span> Audio Cleanup
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
              
              <motion.div 
                className="mt-12 flex flex-wrap justify-center gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.button 
                  className="px-8 py-4 bg-gradient-to-r from-[#5865f2] to-[#7d89ff] text-white rounded-full font-semibold hover:shadow-lg hover:from-[#4752c4] hover:to-[#5865f2] transition-all flex items-center gap-2"
                  whileHover={{ scale: 1.05, boxShadow: "0 15px 30px -5px rgba(88,101,242,0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setFile(null);
                    setResult(null);
                  }}
                >
                  <UploadIcon className="w-5 h-5" />
                  <span>Process Another Video</span>
                </motion.button>
                
                <motion.a
                  href={result?.after}
                  download="enhanced_video.mp4"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold hover:bg-white/20 transition-all flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="w-5 h-5" />
                  <span>Download Enhanced Video</span>
                </motion.a>
              </motion.div>
              
              <motion.div 
                className="mt-20 bg-white/5 backdrop-blur-sm rounded-2xl p-10"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <h3 className="text-3xl font-bold text-white mb-8 text-center">Premium Subscription Plans</h3>
                
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    { 
                      title: "Basic", 
                      price: "90",
                      features: ["4K Quality", "Limited Audio Enhancement", "10 Videos per Month", "Email Support"],
                      color: "from-blue-400 to-blue-600"
                    },
                    { 
                      title: "Professional", 
                      price: "190",
                      popular: true,
                      features: ["8K Quality", "Advanced Audio Enhancement", "Unlimited Processing", "24/7 Support", "Custom Output Settings"],
                      color: "from-[#5865f2] to-[#7d89ff]"
                    },
                    { 
                      title: "Enterprise", 
                      price: "290",
                      features: ["Ultra High Definition", "Live Stream Processing", "API Access", "Dedicated Support", "Custom Solutions"],
                      color: "from-purple-500 to-purple-700"
                    }
                  ].map((plan, i) => (
                    <motion.div 
                      key={i}
                      className={`bg-white/10 backdrop-blur-md rounded-xl overflow-hidden ${plan.popular ? 'transform scale-105 shadow-[0_10px_40px_-5px_rgba(88,101,242,0.3)]' : ''}`}
                      whileHover={{ y: -5, boxShadow: "0 15px 30px -5px rgba(88,101,242,0.3)" }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + (i * 0.1) }}
                    >
                      {plan.popular && (
                        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-center py-1 text-sm font-bold text-white">
                          MOST POPULAR
                        </div>
                      )}
                      
                      <div className={`bg-gradient-to-r ${plan.color} px-6 py-8 text-center`}>
                        <h4 className="text-2xl font-bold text-white mb-1">{plan.title}</h4>
                        <div className="text-4xl font-bold text-white">
                          ${plan.price}
                          <span className="text-sm font-normal opacity-80">/ month</span>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <ul className="space-y-3">
                          {plan.features.map((feature, j) => (
                            <li key={j} className="text-white/80 flex items-center">
                              <span className="mr-2 text-[#5865f2]">✓</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                        
                        <motion.button 
                          className={`mt-8 w-full py-3 rounded-lg font-medium ${
                            plan.popular 
                              ? 'bg-gradient-to-r from-[#5865f2] to-[#7d89ff] text-white' 
                              : 'bg-white/20 text-white hover:bg-white/30'
                          }`}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          Subscribe Now
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};