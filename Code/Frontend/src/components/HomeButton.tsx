import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

interface HomeButtonProps {
  showText?: boolean;
  position?: 'top-left' | 'top-right';
}

/**
 * A reusable home button component that can be used across all pages
 */
export const HomeButton: React.FC<HomeButtonProps> = ({ 
  showText = true, 
  position = 'top-left'
}) => {
  const navigate = useNavigate();
  
  const positionClasses = {
    'top-left': 'top-6 left-6',
    'top-right': 'top-6 right-6'
  };
  
  return (
    <motion.button
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className={`fixed ${positionClasses[position]} z-50 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-full p-3 flex items-center justify-center transition-all duration-300`}
      onClick={() => navigate('/')}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <ArrowLeft className="h-6 w-6" />
      {showText && <span className="ml-2 font-medium">Home</span>}
    </motion.button>
  );
};

export default HomeButton; 