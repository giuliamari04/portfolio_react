import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Code2, Palette, Rocket } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

function About({scrollY}) {
  const ref = useRef < HTMLElement > null;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const features = [
    {
      icon: Code2,
      title: "Clean Code",
      description:
        "Writing maintainable, scalable code following best practices and modern standards.",
    },
    {
      icon: Palette,
      title: "Beautiful Design",
      description:
        "Creating stunning user interfaces with attention to detail and user experience.",
    },
    {
      icon: Rocket,
      title: "Continuous Improvement",
      description:
      "I am pursuing studies in Computer Engineering and AI, with a strong interest in continuously expanding my technical knowledge and skills."    },
  ];

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Parallax Background Elements */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        style={{ y }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          style={{ opacity }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-white mb-6">About Me</h2>
            <p className="text-gray-300 mb-6">
              After graduating from a linguistic high school, I discovered a
              passion for computer science, a field where I found the perfect
              balance between logic and language.I’m a curious and motivated
              person, constantly seeking to expand my technical and cultural
              knowledge. I'm currently studying Computer Engineering and AI at the <a href="https://instituteoftechnology.epicode.com/it/bachelor-in-computer-engineering-artificial-intelligence/?_gl=1*4kqs86*_up*MQ..*_gs*MQ..&gclid=CjwKCAjwnZfPBhAGEiwAzg-VzB7ha7bRTiZAw8ojV07EQWbcFBjuKKblRuvQ0NQO8TJR7Jt9DQ_uPBoCgo0QAvD_BwE"><span className="text-purple-400 hover:underline">Institute of Technology Epicode</span></a>, and I’m always eager to learn new technologies and improve my skills
            </p>
            <p className="text-gray-300 mb-8">
              My approach combines technical expertise with creative
              problem-solving, ensuring every project not only looks great but
              performs flawlessly.
            </p>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  <div className="p-3 bg-purple-500/10 rounded-lg">
                    <feature.icon className="text-purple-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image with Parallax */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <motion.div
              style={{ y: useTransform(scrollYProgress, [0, 1], [50, -50]) }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1630283017802-785b7aff9aac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBkZXNrfGVufDF8fHx8MTc2MTc3OTQxMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Workspace"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent" />
            </motion.div>

            {/* Floating Card */}
            <motion.div
              className="absolute -bottom-6 -right-6 bg-slate-800/90 backdrop-blur-md p-6 rounded-xl shadow-xl border border-purple-500/20"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="text-purple-400 mb-2">Years of Experience</p>
              <p className="text-white">1+</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
export default About;
