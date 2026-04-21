import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { sendForm, init } from "@emailjs/browser";

// Inizializza EmailJS con la tua public key
init("Dc7DhvJPInSgD5ZkN");

function Contacts({ scrollY }) {
  const ref = useRef < HTMLElement > null;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const [messageStatus, setMessageStatus] = useState("");
  const [flagStatusmessage, setFlagStatusMessage] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Usa sendForm per inviare l'email
    sendForm(
      "service_fl2m96v", // Sostituisci con il tuo Service ID
      "template_1zh1poh", // Sostituisci con il tuo Template ID
      e.target,
    ).then(
      (result) => {
        console.log("Email inviata con successo:", result.text);
        setFlagStatusMessage(true);
        setMessageStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      },
      (error) => {
        console.log("Errore:", error);
        setMessageStatus("Error sending message. Try again later.");
      },
    );
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "giuliamari04@gmail.com",
      href: "mailto:giuliamari04@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+39 331 303 3634",
      href: "tel:+393313033634",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Milano, MI, Italy",
      href: "https://maps.app.goo.gl/7HDtH2HMxzuDXZZR7",
    },
  ];

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        style={{ y: useTransform(scrollYProgress, [0, 1], [100, -100]) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sezione intro */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-white mb-4">Get In Touch</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have a project in mind? Let's work together to create something
            amazing.
          </p>
        </motion.div>

        {/* Griglia contatti */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-white mb-6">Contact Information</h3>
              <p className="text-gray-400 mb-8">
                Feel free to reach out through any of these channels. I'm always
                open to discussing new projects, creative ideas, or
                opportunities to be part of your vision.
              </p>
            </div>
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 p-4 bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700/50 hover:border-purple-500/50 transition-all group"
                >
                  <div className="p-3 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                    <item.icon className="text-purple-400" size={24} />
                  </div>
                  <div>
                    <p className="text-gray-400">{item.label}</p>
                    <p className="text-white">{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-300 mb-2">
                  Name and Surname
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-shadow flex items-center justify-center gap-2"
              >
                <span>Send Message</span>
                <Send size={20} />
                {/* <!-- Elemento per mostrare il messaggio --> */}
              </motion.button>
              {flagStatusmessage && (
                <div>
                  <span className="badge-success">
                    {messageStatus}
                  </span>
                </div>
              )}
              {!flagStatusmessage && messageStatus && (
                <div>
                  <span className="badge-error">
                    {messageStatus}
                  </span>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 pt-8 border-t border-slate-800"
      >
        <div className="text-center text-gray-400">
          <p>
            © {new Date().getFullYear()} Made by Giulia Mariano &hearts;. All
            rights reserved.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
export default Contacts;
