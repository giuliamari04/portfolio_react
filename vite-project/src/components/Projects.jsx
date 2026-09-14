import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Github, ExternalLink } from 'lucide-react'

import projectsData from '../data/projects_data.json'
import { ImageWithFallback } from './figma/ImageWithFallback'

function useResponsiveVisibleItems() {
  const [visibleItemsCount, setVisibleItemsCount] = useState(1)

  useEffect(() => {
    const updateVisibleItemsCount = () => {
      const width = window.innerWidth

      if (width < 768) {
        setVisibleItemsCount(1)
      } else if (width < 1024) {
        setVisibleItemsCount(2)
      } else {
        setVisibleItemsCount(3)
      }
    }

    updateVisibleItemsCount()

    window.addEventListener('resize', updateVisibleItemsCount)

    return () => {
      window.removeEventListener('resize', updateVisibleItemsCount)
    }
  }, [])

  return visibleItemsCount
}

function Projects() {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const projects = Array.isArray(projectsData) ? projectsData : []
  const totalProjects = projects.length

  const [startIndex, setStartIndex] = useState(0)

  const visibleItemsCount = useResponsiveVisibleItems()

  const handleNext = () => {
    if (totalProjects === 0) return

    setStartIndex((prevIndex) => {
      const newIndex = prevIndex + visibleItemsCount

      return newIndex >= totalProjects ? 0 : newIndex
    })
  }

  const handlePrev = () => {
    if (totalProjects === 0) return

    setStartIndex((prevIndex) => {
      const newIndex = prevIndex - visibleItemsCount

      return newIndex < 0
        ? Math.max(totalProjects - visibleItemsCount, 0)
        : newIndex
    })
  }

  const getVisibleProjects = () => {
    if (totalProjects === 0) return []

    const visibleProjects = []

    const itemsToShow = Math.min(
      visibleItemsCount,
      totalProjects
    )

    for (let i = 0; i < itemsToShow; i++) {
      const index = (startIndex + i) % totalProjects
      visibleProjects.push(projects[index])
    }

    return visibleProjects
  }

  const visibleProjects = getVisibleProjects()

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <motion.div
        className="absolute top-1/2 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none"
        style={{
          y: useTransform(
            scrollYProgress,
            [0, 1],
            [100, -100]
          ),
        }}
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
          <h2 className="text-white mb-4">
            Featured Projects
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Here are some of my recent works that showcase my
            skills and creativity.
          </p>
        </motion.div>

        {/* SLIDER */}
        <div className="relative overflow-hidden">
          {/* TRACK */}
          <motion.div className="flex gap-8">
            {visibleProjects.map((project) => (
              <div
                key={project.id ?? project.title}
                className="w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)] flex-shrink-0"
              >
                <motion.div
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="
                    group
                    relative
                    bg-slate-800/50
                    backdrop-blur-sm
                    rounded-xl
                    overflow-hidden
                    border
                    border-slate-700/50
                    hover:border-purple-500/50
                    transition-all
                    h-full
                  "
                >
                  {/* IMAGE */}
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="
                        w-full
                        h-full
                        object-cover
                        group-hover:scale-110
                        transition-transform
                        duration-500
                      "
                    />

                    <div
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-slate-900
                        via-slate-900/50
                        to-transparent
                        opacity-60
                      "
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="p-6 w-full">
                    <h3 className="text-white mb-3">
                      {project.id}. {project.title}
                    </h3>

                    <p className="text-gray-400 mb-4">
                      {project.description}
                    </p>

                    {/* TAGS */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="
                            px-3
                            py-1
                            bg-purple-500/10
                            text-purple-400
                            rounded-full
                          "
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* LINKS */}
                    <div className="flex gap-4">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            flex
                            items-center
                            gap-2
                            text-gray-400
                            hover:text-white
                            transition-colors
                          "
                        >
                          <Github size={20} />
                          <span>Code</span>
                        </a>
                      )}

                      {project.live &&
                        project.live !== '#' && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                              flex
                              items-center
                              gap-2
                              text-gray-400
                              hover:text-white
                              transition-colors
                            "
                          >
                            <ExternalLink size={20} />
                            <span>Live Demo</span>
                          </a>
                        )}
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </motion.div>

          {/* CONTROLS */}
          {totalProjects > visibleItemsCount && (
            <div className="flex justify-center gap-4 mt-8">
              <button
                type="button"
                onClick={handlePrev}
                className="
                  px-4
                  py-2
                  bg-slate-800
                  text-white
                  rounded-lg
                  hover:bg-slate-700
                  transition-colors
                "
                aria-label="Previous projects"
              >
                ←
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="
                  px-4
                  py-2
                  bg-slate-800
                  text-white
                  rounded-lg
                  hover:bg-slate-700
                  transition-colors
                "
                aria-label="Next projects"
              >
                →
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Projects