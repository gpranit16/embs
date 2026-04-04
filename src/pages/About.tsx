import { Carousel, TestimonialCard } from '../components/ui/retro-testimonial';
import { execomMembers } from '../data/execom';

const AboutPage = () => {
  const execomCards = execomMembers.map((member, idx) => (
    <TestimonialCard
      key={idx}
      testimonial={member}
      backgroundImage="/assets/embs_card_bg.png"
    />
  ));

  return (
    <section className="min-h-screen pt-32 pb-24 bg-background relative overflow-hidden">
      {/* Background Orbs explicitly needed inside this page to look consistent across routes */}
      <div className="fixed top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full glow-orb-teal -z-10" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full glow-orb-blue -z-10" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h2 className="text-teal-400 text-sm font-semibold tracking-widest uppercase mb-2">About Us</h2>
          <h3 className="text-4xl md:text-6xl font-light text-white display-heading italic mb-8">Engineering the Future of Medicine</h3>
          <p className="text-lg md:text-xl text-muted/90 mb-8 leading-relaxed">
            IEEE EMBS BMSIT&M is a team of passionate individuals committed to Engineering the Future of Medicine and Life Sciences through real-world projects and technical events that drive innovation.
          </p>
          <p className="text-lg md:text-xl text-muted/90 leading-relaxed font-light italic border-l-2 border-teal-500/30 pl-6">
            We empower innovators to develop creative and sustainable solutions to existing challenges, while also advancing research in life sciences through new discoveries -- transforming healthcare and impacting lives globally.
          </p>
        </div>

        <div className="text-center mb-16 mt-24">
          <h2 className="text-teal-400 text-sm font-semibold tracking-widest uppercase mb-2">Leadership</h2>
          <h3 className="text-4xl md:text-6xl font-light text-white display-heading italic">Meet Our ExeCom</h3>
        </div>
        <Carousel items={execomCards} />
      </div>
    </section>
  );
};

export default AboutPage;
