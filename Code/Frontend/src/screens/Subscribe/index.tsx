import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import HomeButton from "../../components/HomeButton";

// Define subscription plans data
const subscriptionPlans = [
  {
    id: 1,
    title: "Basic",
    price: {
      monthly: "10",
      yearly: "100"
    },
    features: ["4K Video Enhancement", "Audio Noise Reduction", "24/7 Support", "Cloud Storage"],
  },
  {
    id: 2,
    title: "Pro",
    price: {
      monthly: "20",
      yearly: "200"
    },
    features: ["8K Video Enhancement", "Advanced Audio Processing", "Priority Support", "Unlimited Storage"],
  },
  {
    id: 3,
    title: "Enterprise",
    price: {
      monthly: "30",
      yearly: "300"
    },
    features: ["Custom Resolution", "Real-time Processing", "Dedicated Support", "Private Cloud"],
  },
];

// Menu items for fullscreen menu
const menuItems = [
  { name: "الرئيسية", path: "/" },
  { name: "رفع فيديو", path: "/upload" },
  { name: "الاشتراكات", path: "/subscribe" },
  { name: "تسجيل الدخول", path: "/login" },
  { name: "إنشاء حساب", path: "/register" },
];

export function Subscribe() {
  const [selectedPlan, setSelectedPlan] = useState(2); // Default to Pro plan
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handlePlanChange = (planId: number) => {
    setSelectedPlan(planId);
  };

  const toggleBillingCycle = () => {
    setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-[#1a2081] overflow-x-hidden relative">
      {/* Back to home button */}
      <HomeButton />
      
      {/* Enhanced Navigation */}
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
          <div className="hidden md:flex items-center space-x-6">
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
          
          {/* Mobile Menu Button */}
          <motion.button 
            className="md:hidden z-50 flex flex-col items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md"
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

      {/* Hero Section with enhanced design */}
      <section className="min-h-[60vh] relative overflow-hidden pt-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-3xl -top-40 -left-20"></div>
          <div className="absolute w-[400px] h-[400px] rounded-full bg-purple-600/20 blur-3xl -bottom-40 -right-20"></div>
        </div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md px-6 py-2 rounded-full mb-8 border border-white/10"
            >
              <span className="text-white/90 font-medium">Transform your videos with AI</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Choose the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Perfect Plan</span> for You
            </h1>
            
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-12">
              Unlock the full potential of your videos with our premium subscription plans.
              Enhance quality, reduce noise, and transform your content.
            </p>
            
            {/* Billing Toggle */}
            <motion.div 
              className="flex justify-center items-center space-x-4 mb-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className={`text-lg ${billingCycle === 'monthly' ? 'text-white font-medium' : 'text-white/60'}`}>
                Monthly
              </span>
              
              <div 
                className="w-16 h-8 bg-white/10 rounded-full p-1 cursor-pointer relative"
                onClick={toggleBillingCycle}
              >
                <motion.div 
                  className="w-6 h-6 bg-white rounded-full shadow-md absolute"
                  animate={{ 
                    x: billingCycle === 'monthly' ? 0 : 32
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              </div>
              
              <div className="flex items-center">
                <span className={`text-lg ${billingCycle === 'yearly' ? 'text-white font-medium' : 'text-white/60'}`}>
                  Yearly
                </span>
                <span className="ml-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  Save 15%
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {subscriptionPlans.map((plan) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: plan.id * 0.1 }}
              >
                <Card 
                  className={`h-full ${selectedPlan === plan.id 
                    ? 'bg-white text-[#1a2081] border-blue-300 transform scale-105 shadow-xl' 
                    : 'bg-white/10 backdrop-blur-sm border-white/20 text-white'}`}
                >
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <h3 className={`text-2xl font-bold ${selectedPlan === plan.id ? 'text-[#1a2081]' : 'text-white'}`}>
                        {plan.title}
                      </h3>
                      <div className="mt-2 text-3xl font-bold flex items-center justify-center">
                        <span className="text-lg mr-1">$</span>
                        {billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly}
                        <span className={`text-sm ml-1 ${selectedPlan === plan.id ? 'text-[#1a2081]/70' : 'text-white/70'}`}>
                          /{billingCycle === 'monthly' ? 'month' : 'year'}
                        </span>
                      </div>
                      {billingCycle === 'yearly' && (
                        <div className="mt-1 text-sm text-green-400 font-medium">
                          {`Save $${Number(plan.price.monthly) * 12 - Number(plan.price.yearly)} per year`}
                        </div>
                      )}
                    </div>
                    
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <svg
                            className={`w-5 h-5 mr-2 ${selectedPlan === plan.id ? 'text-green-600' : 'text-blue-400'}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className={selectedPlan === plan.id ? 'text-gray-700' : 'text-white/80'}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className={`w-full ${selectedPlan === plan.id 
                        ? 'bg-[#1a2081] text-white hover:bg-[#2a3091]' 
                        : 'bg-white/20 text-white hover:bg-white/30'}`}
                      onClick={() => handlePlanChange(plan.id)}
                    >
                      {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-12"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 px-10 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
              onClick={() => navigate('/payment')}
            >
              Continue to Payment
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-[#14196e]">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-white text-center mb-12"
          >
            All Plans Include
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { title: "Advanced AI Algorithm", description: "Powered by state-of-the-art machine learning models" },
              { title: "Multi-platform Support", description: "Use our service on any device, anywhere" },
              { title: "Regular Updates", description: "Constant improvements to our enhancement technology" },
              { title: "Secure Cloud Storage", description: "Your videos are stored safely and privately" },
              { title: "Batch Processing", description: "Enhance multiple videos at once" },
              { title: "Download Options", description: "Various formats and quality options available" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-lg p-6"
              >
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-white text-center mb-12"
          >
            Frequently Asked Questions
          </motion.h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              { 
                question: "How does the video enhancement work?", 
                answer: "Our AI-powered technology analyzes your video frame by frame, improving resolution, reducing noise, and enhancing colors to deliver professional-quality results." 
              },
              { 
                question: "Can I cancel my subscription anytime?", 
                answer: "Yes, you can cancel your subscription at any time with no penalties. You'll continue to have access until the end of your billing period." 
              },
              { 
                question: "What video formats are supported?", 
                answer: "We support all major video formats including MP4, MOV, AVI, and more. If you have a special format need, contact our support team." 
              },
              { 
                question: "Is there a limit to the video length?", 
                answer: "Basic plan limits videos to 10 minutes, Pro to 30 minutes, and Enterprise has no time limits." 
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
              >
                <h3 className="text-xl font-bold text-white mb-2">{faq.question}</h3>
                <p className="text-white/70">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#14196e] py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 relative">
                  <div className="absolute inset-0 bg-white rounded-full" style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} />
                </div>
                <span className="text-2xl font-bold text-white">Claro </span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="#" className="text-white/70 hover:text-white">Terms of Service</a>
              <a href="#" className="text-white/70 hover:text-white">Privacy Policy</a>
              <a href="#" className="text-white/70 hover:text-white">Contact Us</a>
            </div>
          </div>
          <div className="mt-8 text-center text-white/50 text-sm">
            &copy; {new Date().getFullYear()} Claro. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
} 