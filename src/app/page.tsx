import { Businesses } from '@/components/businesses';
import { FloatingThingy } from '@/components/floating-thingy';
import { Projects } from '@/components/projects';

export default function Home() {
  return (
    <>
      <FloatingThingy />
      <div className="space-y-33 pt-13 pb-80">
        <main className="narrow-container space-y-4" data-color="#FF7524" data-title="Intro">
          <h3 className="-tracking-[0.01em] font-medium text-28/10 text-white">
            Designer turning ideas into products people actually enjoy using.
          </h3>
          <p className="-tracking-[0.01em] font-medium text-28/10">
            I’ve built my own businesses and helped clients worldwide create complete digital
            experiences that look great and work even better.
          </p>
          <p className="-tracking-[0.01em] font-medium text-28/10">Let’s work together!</p>
        </main>
        <Projects />
        <Businesses />
      </div>
    </>
  );
}
