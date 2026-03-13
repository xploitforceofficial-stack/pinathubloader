import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Rocket, 
  Zap, 
  Target, 
  Menu, 
  X, 
  Github, 
  MessageCircle, 
  Video, 
  ChevronRight, 
  Shield, 
  Cpu, 
  Eye, 
  Star, 
  Users, 
  Code,
  CheckCircle2,
  ExternalLink,
  Copy
} from "lucide-react";

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Developer", path: "/developer" },
    { name: "Changelog", path: "/changelog" },
    { name: "Community", path: "/community" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3">
            <img src="https://files.catbox.moe/b8ebir.jpeg" alt="PinatHub Logo" className="w-10 h-10 rounded-lg" referrerPolicy="no-referrer" />
            <span className="text-2xl font-bold text-gradient">PinatHub</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-secondary ${
                  location.pathname === link.path ? "text-secondary" : "text-white/70"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-4 text-base font-medium rounded-lg ${
                    location.pathname === link.path ? "bg-primary/20 text-secondary" : "text-white/70"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="glass border-t border-white/10 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center space-x-8 mb-8">
          <a href="https://discord.gg/eDbaHKEf7G" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#5865F2] transition-colors">
            <MessageCircle size={28} />
          </a>
          <a href="https://chat.whatsapp.com/I8hG44FLgrRAwQcS3lvEft" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#25D366] transition-colors">
            <Zap size={28} />
          </a>
          <a href="https://www.tiktok.com/@viunze" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
            <Video size={28} />
          </a>
        </div>
        <p className="text-white/40 text-sm">
          © 2025 PinatHub | Created by <span className="text-primary font-semibold">Vinzee</span>
        </p>
      </div>
    </footer>
  );
};

// --- Pages ---

const Home = () => {
  const [copied, setCopied] = useState(false);
  const loaderString = 'loadstring(game:HttpGet("https://pinathubloader.vercel.app/api/loader"))()';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(loaderString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pt-32 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter">
            <span className="text-gradient">PinatHub</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto font-light">
            "The Next Generation Script for The Strongest Battlegrounds"
          </p>
          
          <div className="mt-12 flex flex-col items-center">
            <button 
              onClick={copyToClipboard}
              className="group relative px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-full font-bold text-lg flex items-center space-x-3 transition-all hover:scale-105 glow-purple"
            >
              <Copy size={20} />
              <span>Copy Loader</span>
              {copied && (
                <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -top-12 left-1/2 -translate-x-1/2 bg-secondary text-black px-3 py-1 rounded text-sm font-bold"
                >
                  Loader copied!
                </motion.span>
              )}
            </button>
            <code className="mt-6 p-3 glass rounded-lg text-xs text-secondary/80 font-mono break-all max-w-md">
              {loaderString}
            </code>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            { icon: <Rocket className="text-primary" />, title: "Orbit System", desc: "Rotate around any player with customizable radius" },
            { icon: <Zap className="text-secondary" />, title: "Fling Engine", desc: "Powerful fling system to send enemies flying" },
            { icon: <Target className="text-primary" />, title: "Camlock", desc: "Advanced camera locking with prediction" }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-2xl hover:border-primary/50 transition-all group"
            >
              <div className="mb-6 p-4 bg-white/5 rounded-xl w-fit group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-white/50 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <div className="pt-32 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="text-4xl font-bold mb-8 flex items-center">
            <span className="mr-4">📌</span> About PinatHub
          </h2>
          <div className="glass p-8 rounded-2xl mb-12">
            <p className="text-lg text-white/70 leading-relaxed mb-6">
              PinatHub is the premier script solution for Roblox's "The Strongest Battlegrounds". 
              Developed with precision and performance in mind, it offers a suite of tools designed 
              to give players the ultimate edge in combat while maintaining a lightweight footprint.
            </p>
            <p className="text-lg text-white/70 leading-relaxed">
              Our engine is built on top of advanced bypass techniques to ensure stability and 
              long-term usability. Whether you're looking for tactical advantages or pure power, 
              PinatHub delivers the next generation of script technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              { title: "Orbit System", desc: "Player rotation dengan radius adjustable", icon: <Rocket size={20}/> },
              { title: "Fling Engine", desc: "Mass fling & touch fling", icon: <Zap size={20}/> },
              { title: "Camlock", desc: "Dengan prediction dan customizable speed", icon: <Target size={20}/> },
              { title: "Auto Skill", desc: "Random skill usage (1-4)", icon: <Cpu size={20}/> },
              { title: "Teleport Low", desc: "Auto teleport ke safe spot saat HP rendah", icon: <Shield size={20}/> },
              { title: "Optimizer", desc: "Performance boost dengan menghapus efek visual", icon: <Eye size={20}/> }
            ].map((item, i) => (
              <div key={i} className="glass p-6 rounded-xl flex items-start space-x-4">
                <div className="text-secondary mt-1">{item.icon}</div>
                <div>
                  <h4 className="font-bold mb-1">{i + 1}. {item.title}</h4>
                  <p className="text-sm text-white/50">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="glass p-8 rounded-2xl text-center">
              <div className="text-4xl font-black text-primary mb-2">10,000+</div>
              <div className="text-white/40 uppercase tracking-widest text-xs">Active Users</div>
            </div>
            <div className="glass p-8 rounded-2xl text-center">
              <div className="text-4xl font-black text-secondary mb-2">4.9/5</div>
              <div className="text-white/40 uppercase tracking-widest text-xs">Rating</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const Developer = () => {
  return (
    <div className="pt-32 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <h2 className="text-4xl font-bold mb-12 text-center">👨‍💻 Developer</h2>
          
          <div className="glass p-12 rounded-3xl text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary"></div>
            
            <img 
              src="https://files.catbox.moe/s58g5h.jpeg" 
              alt="Vinzee" 
              className="w-40 h-40 rounded-full mx-auto mb-8 border-4 border-primary/30 glow-purple object-cover"
              referrerPolicy="no-referrer"
            />
            
            <h3 className="text-5xl font-black mb-2">Vinzee</h3>
            <p className="text-secondary font-medium mb-8 tracking-widest uppercase text-sm">Founder & Lead Developer</p>
            
            <div className="max-w-2xl mx-auto text-white/60 leading-relaxed mb-10">
              <p className="mb-4">
                Vinzee is a dedicated developer specializing in Roblox game mechanics and script optimization. 
                With years of experience in Lua and reverse engineering, he created PinatHub to push the 
                boundaries of what's possible in TSB.
              </p>
              <p>
                He believes in creating tools that are not only powerful but also accessible and 
                user-friendly for the entire community.
              </p>
            </div>

            <div className="flex justify-center space-x-6 mb-12">
              <a href="https://discord.gg/eDbaHKEf7G" className="p-4 glass rounded-full hover:bg-primary/20 transition-colors">
                <MessageCircle />
              </a>
              <a href="https://chat.whatsapp.com/I8hG44FLgrRAwQcS3lvEft" className="p-4 glass rounded-full hover:bg-primary/20 transition-colors">
                <Zap />
              </a>
              <a href="https://www.tiktok.com/@viunze" className="p-4 glass rounded-full hover:bg-primary/20 transition-colors">
                <Video />
              </a>
            </div>

            <p className="text-white/30 italic text-sm">
              "Special thanks to the Vinzee community for their ongoing support and feedback."
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const Changelog = () => {
  const logs = [
    {
      version: "v4.0",
      date: "March 2026",
      items: [
        "Added Camlock System",
        "Added Dash Visualizer",
        "Added Dash Extender",
        "Added Optimizer",
        "Added View Mode",
        "UI Improvements",
        "Bug fixes"
      ]
    },
    {
      version: "v3.5",
      date: "February 2025",
      items: [
        "Improved Orbit System",
        "Enhanced Fling Engine",
        "Mobile support"
      ]
    },
    {
      version: "v3.0",
      date: "January 2025",
      items: [
        "Initial release",
        "Basic combat features"
      ]
    }
  ];

  return (
    <div className="pt-32 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold mb-12">📋 Changelog</h2>
        
        <div className="relative border-l-2 border-primary/30 ml-4 pl-10 space-y-12">
          {logs.map((log, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              <div className="absolute -left-[51px] top-0 w-5 h-5 rounded-full bg-primary glow-purple border-4 border-[#0a0a0f]"></div>
              <div className="glass p-8 rounded-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-secondary">{log.version}</h3>
                  <span className="text-white/40 text-sm font-medium">{log.date}</span>
                </div>
                <ul className="space-y-3">
                  {log.items.map((item, j) => (
                    <li key={j} className="flex items-center text-white/70">
                      <CheckCircle2 size={16} className="text-primary mr-3 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Community = () => {
  const platforms = [
    {
      name: "Discord Server",
      desc: "Join for updates, support",
      members: "750+ members",
      btnText: "Join Discord",
      color: "#5865F2",
      link: "https://discord.gg/eDbaHKEf7G",
      icon: <MessageCircle size={40} />
    },
    {
      name: "WhatsApp Group",
      desc: "Active discussion and help",
      members: "300+ members",
      btnText: "Join WhatsApp",
      color: "#25D366",
      link: "https://chat.whatsapp.com/I8hG44FLgrRAwQcS3lvEft",
      icon: <Zap size={40} />
    },
    {
      name: "TikTok",
      desc: "Follow for updates and previews",
      members: "1,600+ followers",
      btnText: "Follow TikTok",
      color: "#000000",
      link: "https://www.tiktok.com/@viunze",
      icon: <Video size={40} />
    }
  ];

  return (
    <div className="pt-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">👥 Community</h2>
          <p className="text-white/50">Join our growing community of 400+ members</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {platforms.map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="glass p-10 rounded-3xl text-center flex flex-col h-full"
            >
              <div className="mb-8 mx-auto p-6 bg-white/5 rounded-2xl text-secondary">
                {p.icon}
              </div>
              <h3 className="text-2xl font-bold mb-2">{p.name}</h3>
              <p className="text-white/50 mb-6 flex-grow">{p.desc}</p>
              <div className="text-primary font-bold mb-8">{p.members}</div>
              <a 
                href={p.link} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ backgroundColor: p.color }}
                className={`w-full py-4 rounded-xl font-bold text-white transition-opacity hover:opacity-90 flex items-center justify-center space-x-2 ${p.name === 'TikTok' ? 'border border-white/20' : ''}`}
              >
                <span>{p.btnText}</span>
                <ExternalLink size={18} />
              </a>
            </motion.div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-8 text-center">Recent Activity</h3>
          <div className="space-y-4">
            {[
              "Vinzee posted an update in #announcements",
              "New member joined from Discord",
              "Community reached 10k members!"
            ].map((activity, i) => (
              <div key={i} className="glass p-6 rounded-xl flex items-center space-x-4">
                <div className="w-2 h-2 rounded-full bg-secondary glow-blue"></div>
                <p className="text-white/70">{activity}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/developer" element={<Developer />} />
            <Route path="/changelog" element={<Changelog />} />
            <Route path="/community" element={<Community />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
