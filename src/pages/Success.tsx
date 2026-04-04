import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, Home, ArrowRight } from 'lucide-react';

const Success = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div 
        className="max-w-xl w-full glass-card p-12 rounded-[2.5rem] border border-white/10 relative z-10 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-teal-500/10 text-teal-400 mb-8 border border-teal-500/20"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <CheckCircle size={48} />
        </motion.div>

        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-white mb-6 display-heading italic"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Message <span className="text-teal-400 not-italic">Received!</span>
        </motion.h1>

        <motion.p 
          className="text-xl text-muted/80 mb-10 font-light leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Your query was submitted successfully. Our team will get back to you shortly via the email provided.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link 
            to="/" 
            className="inline-flex items-center justify-center gap-2 bg-teal-500 text-bg px-8 py-4 rounded-full font-bold hover:bg-teal-400 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(20,255,215,0.2)]"
          >
            <Home size={18} />
            Back to Home
          </Link>
          <Link 
            to="/about" 
            className="inline-flex items-center justify-center gap-2 glass-card px-8 py-4 rounded-full font-bold text-white hover:border-teal-500/30 transition-all hover:scale-105 active:scale-95"
          >
            Learn More <ArrowRight size={18} />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Success;
