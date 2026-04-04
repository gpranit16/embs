import React from 'react';
import { Carousel, TestimonialCard } from '../components/ui/retro-testimonial';
import { execomMembers } from '../data/execom';

const ExeComPage = () => {
  const execomCards = execomMembers.map((member, idx) => (
    <TestimonialCard
      key={idx}
      testimonial={member}
      backgroundImage="/assets/embs_card_bg.png"
    />
  ));

  return (
    <section className="min-h-screen pt-32 pb-24 bg-background relative relative overflow-hidden">
      {/* Background Orbs explicitly needed inside this page to look consistent across routes */}
      <div className="fixed top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full glow-orb-teal -z-10" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full glow-orb-blue -z-10" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-teal-400 text-sm font-semibold tracking-widest uppercase mb-2">Leadership</h2>
          <h3 className="text-4xl md:text-6xl font-light text-white display-heading italic">Meet Our ExeCom</h3>
        </div>
        <Carousel items={execomCards} />
      </div>
    </section>
  );
};

export default ExeComPage;
