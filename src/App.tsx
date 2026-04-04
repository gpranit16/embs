import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { MapPin, Mail, ArrowRight, Menu, X, ArrowUp, Globe, MessageSquare } from 'lucide-react';
import Home from './pages/Home';
import AboutPage from './pages/About';
import { AdvancedMap } from './components/ui/interactive-map';
import './index.css';

// Shared scroll function
const scrollToAnchor = (id: string, location: any, setMobileMenuOpen?: (open: boolean) => void) => {
  if (setMobileMenuOpen) setMobileMenuOpen(false);
  if (location.pathname !== '/') {
    window.location.href = `/#${id}`;
    return;
  }
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 ${isScrolled || location.pathname !== '/' ? 'glass-nav py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-4 cursor-pointer">
            <img src="/assets/embslogo1.png" alt="Logo" className="w-16 h-16 md:w-20 md:h-20 object-contain" />
            <div className="flex flex-col">
              <h1 className="text-xl md:text-2xl font-bold tracking-wider text-white">IEEE EMBS</h1>
              <span className="text-xs text-teal-400 font-medium tracking-widest uppercase">BMSIT · Bangalore</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link to="/" className="hover:text-teal-400 transition-colors">Home</Link>
            <Link to="/about" className="hover:text-teal-400 transition-colors">About</Link>
            <button onClick={() => scrollToAnchor('contact', location)} className="hover:text-teal-400 transition-colors">Contact</button>
            <a 
              href="https://bmsit-ieee.github.io/sps/Membership_Drive/front.html" 
              target="_blank" 
              rel="noreferrer"
              className="bg-transparent border border-teal-500 text-teal-400 px-5 py-2 rounded-full hover:bg-teal-500 hover:text-bg transition-all flex items-center gap-2"
            >
              Join Now <ArrowRight size={16} />
            </a>
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[90] bg-[#020C18]/95 backdrop-blur-md flex flex-col items-center justify-center gap-8">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-medium">Home</Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-medium">About</Link>
          <button onClick={() => scrollToAnchor('contact', location, setMobileMenuOpen)} className="text-2xl font-medium">Contact</button>
        </div>
      )}
    </>
  );
};

// Custom Social Icons to avoid lucide-react version issues
const InstagramIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

const LinkedinIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const WhatsAppIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .013 5.403.01 12.039a11.81 11.81 0 001.532 5.795L0 24l6.33-1.66a11.782 11.782 0 005.715 1.47h.005c6.637 0 12.038-5.404 12.042-12.04a11.79 11.79 0 00-3.417-8.467z" /></svg>
);

const Footer = () => {
  const location = useLocation();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/5 pt-20 pb-10 relative z-10 bg-[#010810]">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-4">
              <img src="/assets/embslogo1.png" alt="Logo" className="w-16 h-16 object-contain" />
              <div>
                <h1 className="text-2xl font-bold tracking-wider text-white">IEEE EMBS</h1>
                <span className="text-xs text-teal-400 font-medium tracking-widest uppercase">BMSIT · Bangalore</span>
              </div>
            </div>
            <p className="text-muted max-w-md leading-relaxed">
              Advancing technology for the benefit of humanity. Join the world's largest international society of biomedical engineers.
            </p>
          </div>

          {/* Contact Column */}
          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-widest text-sm">Get in Touch</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-muted group hover:text-teal-400 transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded-full glass-card flex items-center justify-center text-teal-400 group-hover:bg-teal-400 group-hover:text-bg transition-colors">
                  <Mail size={14} />
                </div>
                <a href="mailto:jayashree.kth@gmail.com" className="text-sm">jayashree.kth@gmail.com</a>
              </div>
              <div className="flex items-center gap-3 text-muted group hover:text-blue-400 transition-colors">
                <div className="w-8 h-8 rounded-full glass-card flex items-center justify-center text-blue-400 group-hover:bg-blue-400 group-hover:text-bg transition-colors">
                  <MapPin size={14} />
                </div>
                <span className="text-sm">BMSIT&M, Yelhanka, Bangalore</span>
              </div>
            </div>
          </div>

          {/* Social Column */}
          <div className="space-y-6" id="contact">
            <h4 className="text-white font-bold uppercase tracking-widest text-sm">Follow Us</h4>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/embs_bmsit?igsh=MWlmeHFxenNwMWxhdQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl glass-card flex items-center justify-center text-muted transition-all duration-300 hover:text-pink-500 hover:-translate-y-1 hover:border-teal-500/30"
              >
                <InstagramIcon size={22} />
              </a>
              <a 
                href="https://www.linkedin.com/company/ieee-embs-bmsit/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl glass-card flex items-center justify-center text-muted transition-all duration-300 hover:text-blue-600 hover:-translate-y-1 hover:border-teal-500/30"
              >
                <LinkedinIcon size={22} />
              </a>
              <a 
                href="https://chat.whatsapp.com/DJWE51VDRBdAcd49HokNIr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl glass-card flex items-center justify-center text-muted transition-all duration-300 hover:text-green-500 hover:-translate-y-1 hover:border-teal-500/30"
              >
                <WhatsAppIcon size={22} />
              </a>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mb-16 h-[300px] w-full rounded-2xl overflow-hidden glass-card p-1 border border-white/5">
          <AdvancedMap 
            center={[13.1026, 77.5878]} 
            zoom={15}
            markers={[
              {
                position: [13.1026, 77.5878],
                popup: { title: "BMSIT&M Campus", content: "Click here to open in Google Maps →" },
                url: "https://www.google.com/maps/search/?api=1&query=BMS+Institute+of+Technology+%26+Management,+Doddaballapur+Main+Road,+Avalahalli,+Yelahanka,+Bengaluru+-+560119"
              }
            ]} 
            className="rounded-xl h-full w-full" 
          />
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted/60">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
            <span>&copy; 2026 IEEE EMBS BMSIT</span>
            <span className="hidden md:inline">•</span>
            <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
            <span className="hidden md:inline">•</span>
            <button onClick={() => scrollToAnchor('contact', location)} className="hover:text-white transition-colors">Contact</button>
          </div>
          
          <button 
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-muted hover:text-teal-400 hover:border-teal-400/30 transition-all group"
          >
            <ArrowUp size={18} className="group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

const App = () => {
  return (
    <Router>
      <div className="bg-background min-h-screen relative font-sans text-text overflow-x-hidden flex flex-col">
        <div className="fixed inset-0 scanline z-0 pointer-events-none opacity-30" />
        
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
