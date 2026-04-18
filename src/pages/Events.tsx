import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, ArrowLeft } from 'lucide-react';
import { eventsData } from '../data/eventsData';

const Events = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, staggerChildren: 0.2 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-[80vh] px-6 py-32 relative overflow-hidden flex flex-col items-center">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div className="max-w-6xl w-full relative z-10" initial="hidden" animate="visible" variants={containerVariants}>
        <motion.div variants={itemVariants} className="text-center mb-16">
          <Link to="/" className="inline-flex items-center gap-2 text-teal-400 hover:text-white transition-colors mb-6 group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <h2 className="text-teal-400 text-sm font-semibold tracking-widest uppercase mb-4">Our Initiatives</h2>
          <h1 className="text-5xl md:text-6xl font-light text-white display-heading italic">
            Events & <span className="text-teal-400 not-italic font-bold">Programs</span>
          </h1>
          <p className="text-muted/80 mt-6 max-w-2xl mx-auto">
            Discover our previous and upcoming events, designed to challenge, inspire, and drive real-world health and tech solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 max-w-5xl mx-auto lg:grid-cols-3 gap-8">
          {eventsData.map((event) => (
            <motion.div 
              key={event.id} 
              variants={itemVariants} 
              className="glass-card p-8 rounded-[2rem] border border-white/5 hover:border-teal-500/30 transition-all group flex flex-col items-start text-left"
            >
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-400 mb-6 group-hover:scale-110 transition-transform">
                <Calendar size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-wide">{event.title}</h3>
              <p className="text-sm text-muted mb-6 flex-grow">{event.shortDescription}</p>
              <Link 
                to={`/events/${event.id}`} 
                className="inline-flex items-center gap-2 text-teal-400 text-sm font-semibold tracking-widest uppercase mt-auto group/link"
              >
                View Details
                <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Events;
