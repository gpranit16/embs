import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Info } from 'lucide-react';
import { eventsData } from '../data/eventsData';

const EventDetails = () => {
  const { id } = useParams();
  const event = eventsData.find(e => e.id === id);

  if (!event) {
    return <Navigate to="/events" replace />;
  }

  // A basic parser to display detailedDescription with headers and lists properly.
  const formatDescription = (text: string) => {
    return text.split('\n').map((line, idx) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('###')) {
        return <h3 key={idx} className="text-2xl font-bold text-white mt-8 mb-4">{trimmed.replace('### ', '')}</h3>;
      }
      if (trimmed.startsWith('- **')) {
        const parts = trimmed.replace('- **', '').split('**');
        return (
          <li key={idx} className="ml-6 list-disc mb-2 text-muted">
            <strong className="text-white">{parts[0]}</strong>{parts[1]}
          </li>
        );
      }
      if (trimmed.startsWith('-')) {
        return <li key={idx} className="ml-6 list-disc mb-2 text-muted">{trimmed.replace('- ', '')}</li>;
      }
      if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
        return <p key={idx} className="text-lg font-semibold text-white mt-6 mb-3">{trimmed.replace(/\*\*/g, '')}</p>;
      }
      if (trimmed === '') return <div key={idx} className="h-4" />;
      
      // Look for inline bolding
      if (trimmed.includes('**')) {
        const parts = trimmed.split('**');
        return (
          <p key={idx} className="text-muted leading-relaxed mb-4">
            {parts.map((part, i) => (i % 2 === 1 ? <strong key={i} className="text-white">{part}</strong> : part))}
          </p>
        );
      }

      return <p key={idx} className="text-muted leading-relaxed mb-4">{trimmed}</p>;
    });
  };

  return (
    <div className="min-h-screen px-6 py-32 relative overflow-hidden flex flex-col items-center">
      {/* Background Glows */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        className="max-w-4xl w-full relative z-10 glass-card p-8 md:p-14 rounded-[3rem] border border-white/5 shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link to="/events" className="inline-flex items-center gap-2 text-teal-400 hover:text-white transition-colors mb-10 group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Events
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-start gap-6 mb-12">
          <div className="w-16 h-16 shrink-0 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-400 mt-1">
            <Calendar size={28} />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">{event.title}</h1>
            <div className="flex items-center gap-2 text-teal-400 text-sm font-semibold tracking-widest uppercase">
              <Info size={16} /> 
              {event.date}
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-white/10 mb-8" />

        <div className="prose prose-invert prose-teal max-w-none">
          {formatDescription(event.detailedDescription)}
        </div>
      </motion.div>
    </div>
  );
};

export default EventDetails;
