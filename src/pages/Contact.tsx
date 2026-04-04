import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, Mail, User, MessageSquare, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', query: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Form submitted:', formData);
    navigate('/success');
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto max-w-4xl">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-12"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <motion.div variants={itemVariants}>
                <Link to="/" className="inline-flex items-center gap-2 text-teal-400 hover:text-white transition-colors mb-4 group">
                  <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                  Back to Home
                </Link>
              </motion.div>
              <motion.h2 variants={itemVariants} className="text-teal-400 text-sm font-semibold tracking-widest uppercase">Get in Touch</motion.h2>
              <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl font-light text-white display-heading italic leading-tight">
                Let's <span className="text-teal-400 not-italic font-bold">Connect</span>
              </motion.h1>
            </div>
          </div>

          <motion.div 
            variants={itemVariants}
            className="glass-card p-10 md:p-16 rounded-[3rem] border border-white/10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 blur-[100px] -z-10" />
            
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2 group">
                  <label className="text-xs font-semibold text-teal-400/60 uppercase tracking-widest ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-400/40 group-focus-within:text-teal-400 transition-colors" size={18} />
                    <input 
                      type="text" 
                      required
                      placeholder="John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-teal-500/50 transition-all placeholder:text-white/20"
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2 group">
                  <label className="text-xs font-semibold text-teal-400/60 uppercase tracking-widest ml-1">Gmail Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-400/40 group-focus-within:text-teal-400 transition-colors" size={18} />
                    <input 
                      type="email" 
                      required
                      placeholder="john@gmail.com"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-teal-500/50 transition-all placeholder:text-white/20"
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 group">
                <label className="text-xs font-semibold text-teal-400/60 uppercase tracking-widest ml-1">Your Query</label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-6 text-teal-400/40 group-focus-within:text-teal-400 transition-colors" size={18} />
                  <textarea 
                    required
                    rows={6}
                    placeholder="Describe your query or proposal..."
                    className="w-full bg-white/5 border border-white/10 rounded-3xl py-5 pl-12 pr-4 text-white focus:outline-none focus:border-teal-500/50 transition-all placeholder:text-white/20 resize-none"
                    onChange={(e) => setFormData({...formData, query: e.target.value})}
                  />
                </div>
              </div>

              <div className="text-center pt-8">
                <button 
                  type="submit"
                  className="bg-teal-500 text-bg px-14 py-5 rounded-full font-bold hover:bg-teal-400 transition-all flex items-center justify-center gap-3 mx-auto hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(20,255,215,0.2)] group"
                >
                  Send Message 
                  <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </form>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Mail, title: "Email Us", detail: "jayashree.kth@gmail.com", link: "mailto:jayashree.kth@gmail.com" },
              { icon: User, title: "ExeCom Contact", detail: "Meet the Team", link: "/about" },
              { icon: MessageSquare, title: "Chat with Us", detail: "Join WhatsApp", link: "https://chat.whatsapp.com/DJWE51VDRBdAcd49HokNIr" },
            ].map((card, i) => (
              <motion.div 
                key={i}
                variants={itemVariants}
                className="glass-card p-8 rounded-3xl border border-white/5 hover:border-teal-500/30 transition-all group text-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-400 mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <card.icon size={24} />
                </div>
                <h4 className="text-lg font-bold text-white mb-1">{card.title}</h4>
                {card.link.startsWith('http') || card.link.startsWith('mailto') ? (
                  <a href={card.link} className="text-sm text-muted hover:text-teal-400 transition-colors uppercase tracking-widest">{card.detail}</a>
                ) : (
                  <Link to={card.link} className="text-sm text-muted hover:text-teal-400 transition-colors uppercase tracking-widest">{card.detail}</Link>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
