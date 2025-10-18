// Fix: Implement the HomePage component.
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="bg-brand-bg">
      {/* HERO SECTION */}
      <div className="text-center py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 border-b border-brand-secondary/50">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-text tracking-tight animate-fade-in-down">
          Mastering the Sort: An Interactive Algorithm Visualizer
        </h1>
        <h2 className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl lg:text-2xl text-brand-text-secondary animate-fade-in-down" style={{ animationDelay: '0.2s' }}>
          Deconstructing core sorting algorithms with real-time visualization and AI-powered analysis.
        </h2>
        <div className="mt-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Link
            to="/visualizer"
            className="inline-block px-8 py-4 bg-brand-accent text-white font-bold rounded-lg text-lg hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg"
          >
            Launch the Visualizer
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* THE FOUR PILLARS SECTION */}
        <section className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <h2 className="text-3xl font-bold text-center text-brand-accent mb-12">The Four Pillars: From Theory to Proven Skill</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            {/* Card 1 */}
            <div className="bg-brand-primary/50 p-6 rounded-lg border border-brand-secondary/50 h-full">
              <h3 className="text-xl font-semibold text-brand-text mb-2">What skill is proven by implementing Bubble Sort?</h3>
              <p className="text-brand-text-secondary">This demonstrates a foundational grasp of nested loops, in-place swapping, and brute-force optimization—the essential building blocks of algorithmic thinking.</p>
            </div>
            {/* Card 2 */}
            <div className="bg-brand-primary/50 p-6 rounded-lg border border-brand-secondary/50 h-full">
              <h3 className="text-xl font-semibold text-brand-text mb-2">What skill is proven by implementing Selection Sort?</h3>
              <p className="text-brand-text-secondary">This shows proficiency in array traversal, identifying minimum values, and minimizing write operations, a critical consideration for memory-sensitive applications.</p>
            </div>
            {/* Card 3 */}
            <div className="bg-brand-primary/50 p-6 rounded-lg border border-brand-secondary/50 h-full">
              <h3 className="text-xl font-semibold text-brand-text mb-2">What skill is proven by implementing Insertion Sort?</h3>
              <p className="text-brand-text-secondary">This highlights an understanding of adaptive algorithms that excel on partially-sorted data, proving an ability to choose the right tool for a specific problem.</p>
            </div>
            {/* Card 4 */}
            <div className="bg-brand-primary/50 p-6 rounded-lg border border-brand-secondary/50 h-full">
              <h3 className="text-xl font-semibold text-brand-text mb-2">What skill is proven by implementing Merge Sort?</h3>
              <p className="text-brand-text-secondary">This proves mastery of recursion and the divide-and-conquer paradigm—a core concept essential for tackling complex, large-scale engineering challenges.</p>
            </div>
          </div>
        </section>

        {/* AI INSIGHTS SECTION */}
        <section className="mt-20 text-center animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <h2 className="text-3xl font-bold text-center text-brand-accent mb-4">The Gemini Edge: AI-Accelerated Learning</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-brand-text-secondary mb-8">
              This isn't just a visualizer; it's an AI-enhanced learning environment. By integrating Google's Gemini API, the application transforms into a personal computer science tutor, delivering instant, context-aware explanations that go far beyond what a simple animation can demonstrate.
            </p>
            <ul className="text-left space-y-4 inline-block">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span className="text-brand-text-secondary"><strong className="text-brand-text">Instant Big O Analysis:</strong> Receive immediate, expert-level analysis of best-case, average-case, and worst-case time complexities.</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span className="text-brand-text-secondary"><strong className="text-brand-text">Conceptual Deep Dive:</strong> Understand the 'why' behind the code with clear explanations of the core logic and trade-offs for each algorithm.</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span className="text-brand-text-secondary"><strong className="text-brand-text">Performance Verification:</strong> Use the AI as a sounding board to verify your own understanding and solidify complex theoretical concepts.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* TECHNICAL FOOTPRINT SECTION */}
        <section className="mt-20 animate-fade-in-up" style={{ animationDelay: '1s' }}>
          <div className="max-w-4xl mx-auto bg-brand-primary/50 p-8 rounded-lg border border-brand-secondary/50 text-center">
            <h2 className="text-2xl font-bold text-brand-accent mb-4">Technical Footprint: A Snapshot for Recruiters</h2>
            <p className="text-lg text-brand-text-secondary">
              Demonstrated full-stack proficiency by architecting a performant React/TypeScript frontend, implementing complex state management for real-time animations, and integrating a powerful third-party AI service (Google's Gemini API) to deliver a unique educational experience.
            </p>
          </div>
        </section>
      </div>

      <footer className="text-center py-8 mt-12 border-t border-brand-secondary/50">
        <p className="text-brand-text-secondary">© {new Date().getFullYear()} AlgoVisual. A portfolio project.</p>
      </footer>
    </div>
  );
};

export default HomePage;