import { Projects } from '@/components/projects';

export default function Home() {
  return (
    <>
      <main className="narrow-container mb-33 space-y-4">
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
    </>
  );
}
