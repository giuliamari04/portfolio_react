import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import projectsData from '../data/projects_data.json';
import { Github } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

function useResponsiveVisibleItems() {
  const [visibleItemsCount, setVisibleItemsCount] = useState(1);

  useEffect(() => {
    const updateVisibleItemsCount = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setVisibleItemsCount(1);
      } else if (width >= 768 && width < 1024) {
        setVisibleItemsCount(2);
      } else {
        setVisibleItemsCount(3);
      }
    };

    // Chiama subito per impostare il valore iniziale
    updateVisibleItemsCount();

    // Ascolta i cambiamenti di dimensione della finestra
    window.addEventListener('resize', updateVisibleItemsCount);

    // Cleanup
    return () => window.removeEventListener('resize', updateVisibleItemsCount);
  }, []);

  return visibleItemsCount;
}

function Projects({ scrollY }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const projects = projectsData;
  const [startIndex, setStartIndex] = useState(0);
  const totalProjects = projects.length;

  // Integrazione del hook responsive
  const visibleItemsCount = useResponsiveVisibleItems();

  const handleNext = () => {
    setStartIndex((prevIndex) => {
      const newIndex = prevIndex + visibleItemsCount;
      return newIndex >= totalProjects ? 0 : newIndex;
    });
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) => {
      const newIndex = prevIndex - visibleItemsCount;
      return newIndex < 0 ? Math.max(totalProjects - visibleItemsCount, 0) : newIndex;
    });
  };

  // Funzione per ottenere gli elementi da mostrare
  const getVisibleProjects = () => {
    const visibleProjects = [];
    for (let i = 0; i < visibleItemsCount; i++) {
      const index = (startIndex + i) % totalProjects;
      visibleProjects.push(projects[index]);
    }
    return visibleProjects;
  };

  const visibleProjects = getVisibleProjects();

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      {/* Background */}
      <motion.div
        className="absolute top-1/2 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"
        style={{ y: useTransform(scrollYProgress, [0, 1], [100, -100]) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-white mb-4">Featured Projects</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Here are some of my recent works that showcase my skills and creativity.
          </p>
        </motion.div>

        {/* SLIDER */}
        <div className="relative overflow-hidden">
          {/* TRACK */}
          <motion.div
            className="flex gap-8"
            // animate non più necessario perché gestiamo il cambio con il rendering
          >
            {visibleProjects.map((project) => (
              <div
                key={project.title}
                className="w-full flex-shrink-0"
              >
                <motion.div
                  whileHover={{ y: -10 }}
                  className="group relative bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700/50 hover:border-purple-500/50 transition-all"
                >
                  {/* IMAGE */}
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-60" />
                  </div>

                  {/* CONTENT */}
                  <div className="p-6 w-[200%]">
                    <h3 className="text-white mb-3">{project.id}. {project.title}</h3>
                    <p className="text-gray-400 mb-4">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <a
                        href={project.github}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <Github size={20} />
                        <span>Code</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </motion.div>

          {/* CONTROLS */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700"
            >
              ←
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;