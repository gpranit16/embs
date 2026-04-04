import ScrollExpandMedia from '../components/ui/scroll-expansion-hero';
import { Brain, Cpu, Globe, BookOpen, Rocket, Calendar } from 'lucide-react';
import { Accordion } from '../components/ui/accordion';

const Home = () => {
  const faqItems = [
    {
      title: "How do I become a member?",
      content: "To join EMBS as a student, you must first enroll as an IEEE Student Member. You can then add EMBS to your IEEE membership anytime through the official IEEE portal."
    },
    {
      title: "What are the benefits of joining EMBS?",
      content: "EMBS is the world's largest international society of biomedical engineers. EMBS publishes IEEE Pulse that covers a wide range of topics from AI in Healthcare, genetics and precision medicine to Neural Engineering."
    },
    {
      title: "Does EMBS help me with my research?",
      content: "Yes—members gain access to research publications, conferences, and opportunities for collaboration within the biomedical engineering field."
    },
    {
      title: "Who can join as a student member?",
      content: "Any student pursuing Engineering."
    },
    {
      title: "Is any prior experience needed?",
      content: "No prior experience is required. EMBS supports students at all levels through mentorship, student activities, and learning opportunities."
    },
    {
      title: "How does this help my career specifically?",
      content: "A verified IEEE profile improves research credibility, and connects you with academia and industry experts."
    }
  ];

  return (
    <div id="home">
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc="/assets/embs_hero_center.png"
        bgImageSrc="/assets/embs_hero_bg.png"
        title="Engineering the Future of Medicine"
        date="IEEE EMBS · Bangalore"
        scrollToExpand="Scroll to explore"
        textBlend={false}
      >
        <div id="about" className="max-w-6xl mx-auto pt-10">
          <div className="grid md:grid-cols-2 gap-16 items-center flex-col-reverse">
            <div className="space-y-8">
              <div>
                <h2 className="text-teal-400 text-sm font-semibold tracking-widest uppercase mb-2">Who We Are</h2>
                <h3 className="text-4xl md:text-5xl font-light text-white display-heading leading-tight italic">
                  Bridging <span className="text-teal-400 not-italic">Engineering</span> & <span className="text-blue-400 not-italic">Medicine</span>
                </h3>
              </div>
              <p className="text-lg text-muted font-light leading-relaxed">
                The IEEE Engineering in Medicine and Biology Society (EMBS) is the world's largest international society of biomedical engineers. At EMBS BMSIT we stand at the intersection of engineering and medicine --a place where ideas spark, grow and evolve into technologies that heal and push the frontiers of life sciences.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card p-6 rounded-2xl border-t border-teal-400/30">
                <h4 className="text-3xl font-bold text-white mb-1">16</h4>
                <p className="text-sm text-teal-400 uppercase tracking-wider">Members</p>
              </div>
              <div className="glass-card p-6 rounded-2xl border-t border-blue-400/30">
                <h4 className="text-3xl font-bold text-white mb-1">2</h4>
                <p className="text-sm text-blue-400 uppercase tracking-wider">Projects</p>
              </div>
              <div className="glass-card p-6 rounded-2xl border-t border-teal-400/30 col-span-2">
                <h4 className="text-3xl font-bold text-white mb-1">1</h4>
                <p className="text-sm text-teal-400 uppercase tracking-wider">Coordinator</p>
              </div>
            </div>
          </div>

          {/* Project Highlights Section */}
          <div className="mt-24 space-y-12">
            <div className="text-center">
              <h2 className="text-teal-400 text-sm font-semibold tracking-widest uppercase mb-2">Innovation</h2>
              <h3 className="text-3xl font-light text-white display-heading italic">Project Highlights</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-card p-8 rounded-3xl group hover:-translate-y-2 transition-transform duration-300">
                <Brain className="w-10 h-10 text-teal-400 mb-6" />
                <h4 className="text-2xl font-bold text-white mb-3">BCI-Controlled Robotic Arm</h4>
                <p className="text-muted leading-relaxed">
                  Neural engineering initiative creating hands-free robotic control interfaces for amputees, utilizing advanced brain-computer interfaces.
                </p>
              </div>
              <div className="glass-card p-8 rounded-3xl group hover:-translate-y-2 transition-transform duration-300">
                <Cpu className="w-10 h-10 text-blue-400 mb-6" />
                <h4 className="text-2xl font-bold text-white mb-3">Linear Polarization Diagnostic</h4>
                <p className="text-muted leading-relaxed">
                  Next-generation medical imaging tool focusing on tissue analysis using polarized light, aiming to identify early-stage anomalies non-invasively.
                </p>
              </div>
            </div>
          </div>

          {/* Why Join Us Section */}
          <div className="mt-32 space-y-12">
            <div className="text-center">
              <h2 className="text-teal-400 text-sm font-semibold tracking-widest uppercase mb-2">Community</h2>
              <h3 className="text-4xl md:text-5xl font-light text-white display-heading italic">Why Join Us?</h3>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Globe, title: "Global Network", color: "text-blue-400", desc: "Join 500,000+ IEEE members and 10,000+ EMBS innovators collaborating across life sciences and medicine." },
                { icon: BookOpen, title: "Resources", color: "text-teal-400", desc: "Leverage the world's largest library of 7M+ technical resources including premier biomedical journals." },
                { icon: Rocket, title: "Career Launchpad", color: "text-purple-400", desc: "Elevate your professional profile through hackathons, expert guidance and specialized research funding." },
                { icon: Calendar, title: "Events & Conferences", color: "text-orange-400", desc: "Exclusive member discounts for IEEE and EMBS innovation summits hosted globally." }
              ].map((item, i) => (
                <div key={i} className="glass-card p-6 rounded-2xl border border-white/5 hover:border-teal-500/30 transition-all group">
                  <item.icon className={`w-8 h-8 ${item.color} mb-4 group-hover:scale-110 transition-transform`} />
                  <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-32 mb-16 space-y-12">
            <div className="text-center">
              <h2 className="text-teal-400 text-sm font-semibold tracking-widest uppercase mb-2">Support</h2>
              <h3 className="text-4xl md:text-5xl font-light text-white display-heading italic">Frequently Asked Questions</h3>
            </div>

            <div className="max-w-4xl mx-auto">
              <Accordion items={faqItems} />
            </div>
          </div>
        </div>
      </ScrollExpandMedia>
    </div>
  );
};


export default Home;
