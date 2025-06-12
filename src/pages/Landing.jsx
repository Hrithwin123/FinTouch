import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, Shield, Zap, Users, Smartphone, CreditCard, Lock, Star, ArrowRight, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, 25]);

  const nav = useNavigate()

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const scaleOnHover = {
    hover: { 
      scale: 1.05,
      transition: { type: "spring", stiffness: 300 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white overflow-hidden">
      {/* Navigation */}
      <motion.nav 
        className="flex justify-between items-center p-6 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">$</span>
          </div>
          <span className="text-2xl font-bold text-gray-800">FingerPay</span>
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="#features" className="text-gray-600 hover:text-orange-500 transition-colors">Features</a>
          <a href="#security" className="text-gray-600 hover:text-orange-500 transition-colors">Security</a>
          <a href="/signup" className="text-gray-600 hover:text-orange-500 transition-colors">Signup</a>
          <a href="/login" className="text-gray-600 hover:text-orange-500 transition-colors">Login</a>
        </div>
        <motion.button 
          className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.button>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative px-6 py-20 text-center">
        <motion.div
          style={{ y: y1 }}
          className="absolute top-10 left-10 w-20 h-20 bg-orange-200 rounded-full opacity-60"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute top-40 right-20 w-32 h-32 bg-red-200 rounded-full opacity-40"
        />
        
        <motion.div
          className="max-w-4xl mx-auto relative z-10"
          variants={staggerChildren}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-gray-800 mb-6"
            variants={fadeInUp}
          >
            Pay with just a
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500"> Touch</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            Secure, instant payments powered by fingerprint authentication. 
            Initiate UPI transactions from your fingertips.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={fadeInUp}
          >
            <motion.button 
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition-shadow flex items-center gap-2"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(255, 87, 34, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              Start Paying Now <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button 
            onClick={() => nav("/payments")}
              className="border-2 border-orange-500 text-orange-500 px-8 py-4 rounded-full text-lg font-semibold hover:bg-orange-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Watch Demo
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Floating Payment Cards */}
        <motion.div
          className="mt-16 relative"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { name: "ABC Stores", amount: "₹166", icon: "A", selected: true },
              { name: "XYZ Stores", amount: "₹240", icon: "X", selected: false },
              { name: "Quick Pay", amount: "₹85", icon: "Q", selected: false }
            ].map((card, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-2xl border-2 ${card.selected ? 'border-orange-500 bg-white shadow-lg' : 'border-gray-200 bg-white/70'} backdrop-blur-sm`}
                whileHover={{ y: -10, shadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">{card.icon}</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-800">{card.amount}</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-3">{card.name}</h3>
                <button className={`w-full py-2 rounded-lg font-medium ${card.selected ? 'bg-orange-500 text-white' : 'border border-orange-500 text-orange-500'}`}>
                  {card.selected ? '✓ Selected' : 'Select'}
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-white">
        <motion.div 
          className="max-w-6xl mx-auto"
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose FingerPay?</h2>
            <p className="text-xl text-gray-600">Experience the future of payments with cutting-edge security and speed</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "Bank-Grade Security", desc: "High level encryption with biometric authentication which keeps your transactions safe." },
              { icon: Zap, title: "Lightning Fast", desc: "Instant transfers with just a fingerprint touch. No passwords, no delays." },
              { icon: Users, title: "Phone-Free UPI payments", desc: "Leave your phone behind, not your payments." }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="text-center p-8 rounded-2xl hover:shadow-lg transition-shadow bg-gradient-to-b from-orange-50 to-white border border-orange-100"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-20 px-6 bg-gradient-to-r from-orange-50 to-red-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Your Security is Our Priority</h2>
              <p className="text-lg text-gray-600 mb-8">
                FingerPay uses biometric technology combined with 2 layered encryption
                to ensure your transactions are always protected.
              </p>
              <div className="space-y-4">
                {[
                  "Biometric authentication",
                  "SHA-256: Data Protection Standard",
                  "Web Socket Integration",
                  "Digital Signatures via JWT"
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white p-8 rounded-3xl shadow-2xl border border-orange-100">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Secure Payment</h3>
                  <p className="text-gray-600">Fingerprint authentication required</p>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span className="text-gray-700">Payment Amount</span>
                    <span className="font-bold text-gray-800">₹1,250</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span className="text-gray-700">Recipient</span>
                    <span className="font-bold text-gray-800">Hrithwin</span>
                  </div>
                  <motion.button 
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-semibold"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    🔒 PAY NOW
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Payments?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users already enjoying secure, instant payments with FingerPay
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button 
              className="bg-white text-orange-500 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(255,255,255,0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              Download App
            </motion.button>
            <motion.button 
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-orange-500 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">$</span>
                </div>
                <span className="text-xl font-bold">FingerPay</span>
              </div>
              <p className="text-gray-400">
                Secure payments with a touch. The future of digital transactions.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <div className="space-y-2 text-gray-400">
                <div>Features</div>
                <div>Security</div>
                <div>Pricing</div>
                <div>API</div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <div className="space-y-2 text-gray-400">
                <div>About</div>
                <div>Careers</div>
                <div>Press</div>
                <div>Contact</div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <div className="space-y-2 text-gray-400">
                <div>Help Center</div>
                <div>Documentation</div>
                <div>Status</div>
                <div>Community</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 FingerPay. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;