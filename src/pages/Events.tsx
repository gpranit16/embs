import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Settings, Calendar, Clock, Bell, ArrowLeft } from 'lucide-react';

const Events = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div 
        className="max-w-2xl w-full glass-card p-12 rounded-[2.5rem] border border-white/10 relative z-10 text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div 
          className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-teal-500/10 text-teal-400 mb-8"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <Settings size={40} />
        </motion.div>

        <motion.h1 
          className="text-5xl md:text-6xl font-bold text-white mb-4 display-heading italic"
          variants={itemVariants}
        >
          Coming <span className="text-teal-400 not-italic">Soon!</span>
        </motion.h1>

        <motion.p 
          className="text-xl text-muted/80 mb-12 font-light"
          variants={itemVariants}
        >
          Our Events page is currently under construction. We're planning something amazing for you.
        </motion.p>

        <div className="space-y-6 text-left max-w-sm mx-auto mb-12">
          {[
            { icon: Calendar, text: "Exciting events are being planned", color: "text-teal-400" },
            { icon: Clock, text: "Check back soon for updates", color: "text-blue-400" },
            { icon: Bell, text: "Stay tuned for announcements", color: "text-teal-400" }
          ].map((item, index) => (
            <motion.div 
              key={index}
              className="flex items-center gap-4 group"
              variants={itemVariants}
            >
              <div className={`w-10 h-10 rounded-xl glass-card flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform border border-white/5`}>
                <item.icon size={18} />
              </div>
              <span className="text-muted group-hover:text-white transition-colors">{item.text}</span>
            </motion.div>
          ))}
        </div>

        <motion.div variants={itemVariants}>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 bg-teal-500 text-bg px-8 py-4 rounded-full font-bold hover:bg-teal-400 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(20,255,215,0.2)]"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Events;
