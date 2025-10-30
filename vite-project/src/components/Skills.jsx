import {  motion, useScroll, useTransform} from "framer-motion";
import { useRef } from 'react';

function Skills({scrollY}){
     const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const skills = [
    { name: 'React', level: 95 },
    { name: 'JavaScript', level: 95 },
    { name: 'Node.js', level: 85 },
    { name: 'Tailwind CSS', level: 90 },
    { name: 'Bootstrap CSS', level: 90 },
    { name: 'Blade', level: 85 },
    { name: 'PHP', level: 70 },
    { name: 'Larevel', level: 90 },
    { name: 'Java', level: 40 },    
    { name: 'Git', level: 90 },
    { name: 'UI/UX Design', level: 80 },
  ];

  const tools = [
    'Figma',
    'VS Code',
    'Vite',
    'AWS',
    'PostgreSQL',
  ];
    return(
            <section id="skills" className="relative py-32 overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-white mb-4">Skills & Expertise</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Technologies and tools I work with to bring ideas to life.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Skills with Progress Bars */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white mb-6">Technical Skills</h3>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">{skill.name}</span>
                    <span className="text-purple-400">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Tools Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white mb-6">Tools & Technologies</h3>
            <div className="grid grid-cols-3 gap-4">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-4 bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700/50 hover:border-purple-500/50 transition-all text-center"
                >
                  <span className="text-gray-300">{tool}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Certifications or Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 p-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20"
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-white mb-2">90+</h3>
              <p className="text-gray-400">Projects Completed</p>
            </div>
            <div>
              <h3 className="text-white mb-2">Just started</h3>
              <p className="text-gray-400">Happy Clients</p>
            </div>
            <div>
              <h3 className="text-white mb-2">1+</h3>
              <p className="text-gray-400">Years Experience</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
    )
}
export default Skills;