const fs = require('fs');

const mainJsx = `import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, MapPin, Sparkles, Clock, ArrowRight, ExternalLink,
  ChevronRight, ChevronLeft, Download, FileText, CheckCircle2,
  Award, Users, Layers, Globe2, Mail, Phone, Menu, X,
  BookOpen, ShieldCheck, Cpu, Wifi, Atom, Send, ArrowUpRight,
  Navigation, Building2, Check, AlertCircle, Compass, Share2
} from 'lucide-react';
import './styles.css';

// Conference Metadata
const conf = {
  title: "AI UNIVERSE–2028",
  subtitle: "Artificial Intelligence for Unified, Next-generation Intelligent & Verified Ecosystems in Research, Security and Engineering",
  lead: "IEEE International Conference on",
  dates: "24–26 August 2028",
  venueShort: "Rajasthan International Center, Jaipur",
  venueName: "Rajasthan International Center (RIC)",
  venueAddress: "Bhamashah State Data Center, Block-C, Jhalana Doongri, Jaipur, Rajasthan – 302017, India",
  overview: "AI UNIVERSE–2028 provides an interdisciplinary forum for researchers, academicians, students, and industry professionals to present advances in artificial intelligence and its verified applications across computing, cybersecurity, communication systems, electronics, robotics, healthcare, sustainable infrastructure, and emerging technologies.",
  callForPapers: "Researchers, academicians, students, and industry professionals are cordially invited to submit original research contributions relevant to the conference theme across any of the four technical tracks. Submissions should present novel work, sound technical content, and clear research contributions."
};

const navTabs = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'tracks', label: 'Tracks' },
  { id: 'dates', label: 'Important Dates' },
  { id: 'papers', label: 'Call for Papers' },
  { id: 'publication', label: 'Publication' },
  { id: 'registration', label: 'Registration' },
  { id: 'committee', label: 'Committee' },
  { id: 'venue', label: 'Venue' }
];

const tickerItems = [
  "AI UNIVERSE–2028 | International Conference · 24–26 August 2028 at Rajasthan International Center, Jaipur.",
  "Paper Submission Opens on 16 April 2028 · Paper Submission Deadline: 10 May 2028.",
  "Acceptance Notification: 26 June 2028 · Registration Opens: 03 July 2028 · Registration Deadline: 25 July 2028.",
  "Four comprehensive technical tracks covering Frontier AI & Agentic Systems, Secure & Trustworthy AI, Autonomous Intelligence & Cyber-Physical Systems, and Intelligent Communication & AI-Native Hardware.",
  "Registration fees announced in Indian Rupees (INR) for both IEEE and Non-IEEE Authors, Students, and Industry Professionals."
];

const heroSlides = [
  {
    src: "/images/ai-humanoid-robot.jpg",
    alt: "Autonomous humanoid robotic intelligence and cognitive systems",
    tag: "AUTONOMOUS & EMBODIED AI",
    caption: "Intelligent Robotics, Automation & Cognitive Systems"
  },
  {
    src: "/images/ai-quantum-chip.jpg",
    alt: "Next-generation quantum AI processor chip and photonic neural micro-architecture",
    tag: "QUANTUM AI & HARDWARE SYSTEMS",
    caption: "Advanced Computing, VLSI & Trusted Digital Architectures"
  },
  {
    src: "/images/ai-robotics.jpg",
    alt: "AI robotics research lab with autonomous manipulation and vision engineers",
    tag: "ROBOTICS & HEALTHCARE AI",
    caption: "Intelligent Robotics, Autonomous Control & Biomedical Systems"
  },
  {
    src: "/images/ai-summit-stage.jpg",
    alt: "Keynote presentation at AI UNIVERSE summit featuring a panoramic 3D display",
    tag: "KEYNOTE & PLENARY FORUM",
    caption: "Unified, Next-Generation Intelligence & Verified Ecosystems"
  }
];

const quickFacts = [
  { role: "Conference Dates", name: "24–26 August 2028", detail: "Three-Day International Programme" },
  { role: "Conference Venue", name: "Rajasthan International Center (RIC)", detail: "Jhalana Doongri, Jaipur – 302017" },
  { role: "Format", name: "International Conference", detail: "4 Technical Tracks & Research Forum" },
  { role: "Paper Submission Opens", name: "16 April 2028", detail: "Submission Deadline: 10 May 2028" }
];

const trackTabs = [
  { id: "all", label: "All Tracks (04)" },
  { id: "track-1", label: "Track 01: Frontier AI" },
  { id: "track-2", label: "Track 02: Trustworthy AI" },
  { id: "track-3", label: "Track 03: Autonomous Systems" },
  { id: "track-4", label: "Track 04: AI Hardware & 6G" }
];

const tracks = [
  {
    number: "01",
    category: "track-1",
    title: "Frontier Artificial Intelligence, Foundation Models & Agentic Systems",
    icon: Atom,
    description: "Advanced intelligence, generative technologies, multimodal perception, and next-generation AI architectures.",
    topics: [
      "Generative AI, Foundation Models and Large Language Models",
      "Agentic AI, Autonomous AI Agents and Multi-Agent Intelligence",
      "Multimodal AI: Vision, Language, Audio and Video Intelligence",
      "Retrieval-Augmented Generation (RAG) and Knowledge-Augmented AI",
      "Reasoning Models, Neuro-Symbolic AI and Cognitive Architectures",
      "Small Language Models and On-Device Intelligence",
      "World Models and Predictive Intelligence",
      "Continual Learning, Adaptive AI and Self-Evolving Systems",
      "Synthetic Data Generation and AI-Driven Scientific Discovery",
      "Advanced neural networks and algorithmic breakthroughs"
    ]
  },
  {
    number: "02",
    category: "track-2",
    title: "Secure, Trustworthy & Verifiable Artificial Intelligence",
    icon: ShieldCheck,
    description: "Ensuring robustness, mathematical verification, privacy preservation, ethical alignment, and safety in intelligent systems.",
    topics: [
      "Trustworthy, Explainable and Responsible AI",
      "AI Safety, Alignment and Model Reliability",
      "Adversarial Machine Learning and Robust AI",
      "Privacy-Preserving AI and Federated Learning",
      "AI Red Teaming and Large Language Model Security",
      "Deepfake Detection, Content Authenticity and Digital Provenance",
      "Formal Verification and Validation of AI Systems",
      "Post-Quantum Cryptography and Quantum-Safe Security",
      "Confidential Computing and Secure AI Infrastructure",
      "AI Governance, Digital Trust and Autonomous System Security"
    ]
  },
  {
    number: "03",
    category: "track-3",
    title: "Autonomous Intelligence, Intelligent Computing & Cyber-Physical Ecosystems",
    icon: Cpu,
    description: "Connecting physical environments, smart infrastructure, edge robotics, and autonomous digital twins.",
    topics: [
      "Embodied AI and Physical Intelligence",
      "Autonomous Robotics and Collaborative Multi-Agent Systems",
      "Edge AI, Distributed Intelligence and TinyML",
      "AI-Driven Digital Twins and Simulation Intelligence",
      "Intelligent Cyber-Physical Systems and Autonomous Infrastructure",
      "Human-AI Collaboration and Human-Machine Intelligence",
      "Spatial Computing, Extended Reality and Intelligent Metaverse",
      "AI for Smart Cities, Intelligent Mobility and Autonomous Transportation",
      "AI-Driven Healthcare, Bioinformatics and Computational Biology",
      "AI for Climate Intelligence, Precision Agriculture and Scientific Modelling"
    ]
  },
  {
    number: "04",
    category: "track-4",
    title: "Intelligent Communication, Advanced Electronics & AI-Native Hardware",
    icon: Wifi,
    description: "Next-generation semiconductor accelerators, 6G communication networks, photonics, and neuromorphic computing.",
    topics: [
      "AI-Native 6G and Beyond Wireless Communication",
      "Integrated Sensing and Communication (ISAC)",
      "Reconfigurable Intelligent Surfaces (RIS) and Smart Radio Environments",
      "AI-Driven Antenna Design, Electromagnetic Systems and Metasurfaces",
      "Terahertz, Millimeter-Wave and Next-Generation RF Technologies",
      "AI Accelerators, In-Memory Computing and Advanced Semiconductor Architectures",
      "Intelligent Sensors, Edge Electronics and Hardware-Level AI Security",
      "Photonic Computing and Optical Wireless Communication",
      "Quantum Electronics and Quantum Communication Technologies",
      "Neuromorphic Computing and Brain-Inspired Hardware"
    ]
  }
];

const importantDates = [
  {
    title: "Paper Submission Portal Opens",
    date: "16 April 2028",
    detail: "Full paper submission portal goes live for all four technical tracks.",
    highlight: true
  },
  {
    title: "Paper Submission Deadline",
    date: "10 May 2028",
    detail: "Final deadline for initial manuscript submission. No extensions anticipated.",
    highlight: true
  },
  {
    title: "Notification of Acceptance",
    date: "26 June 2028",
    detail: "Formal peer-review evaluation reports and acceptance notices issued to authors."
  },
  {
    title: "Registration Opens",
    date: "03 July 2028",
    detail: "Early registration opens for presenting authors, students, and attendees."
  },
  {
    title: "Registration Deadline",
    date: "25 July 2028",
    detail: "Mandatory author registration cut-off to ensure inclusion in the conference proceedings."
  },
  {
    title: "Camera-Ready Final Submission",
    date: "05 August 2028",
    detail: "Final revised manuscripts and signed copyright transfer forms due."
  },
  {
    title: "Conference Dates",
    date: "24–26 August 2028",
    detail: "Three days of technical sessions, keynotes, workshops, and symposiums at RIC Jaipur.",
    highlight: true
  }
];

const fees = [
  {
    category: "Academician / Research Scholar",
    nonIeee: "₹9,000",
    ieee: "₹7,500",
    scope: "Indian Delegates (INR)",
    notes: "Faculty members, academicians, and research scholars"
  },
  {
    category: "Student",
    nonIeee: "₹6,500",
    ieee: "₹5,000",
    scope: "Indian Delegates (INR)",
    notes: "Full-time undergraduate, postgraduate, and doctoral students"
  },
  {
    category: "Industry Professional",
    nonIeee: "₹12,000",
    ieee: "₹10,000",
    scope: "Indian Delegates (INR)",
    notes: "Industry researchers, engineers, and corporate practitioners"
  },
  {
    category: "Foreign Authors",
    nonIeee: "$250",
    ieee: "$200",
    scope: "Foreign Delegates (USD)",
    notes: "International presenting authors, researchers, and global delegates"
  }
];

const committeeMembers = [
  {
    id: "satyajit-chakrabarti",
    name: "Prof. (Dr.) Satyajit Chakrabarti",
    role: "Chief Patron",
    category: "patrons",
    designation: "Director, IEM UEM Group",
    affiliation: "Director - IEM UEM Group",
    initials: "SC",
    photo: "/images/committee/satyajit-chakrabarti.jpg"
  },
  {
    id: "biswajoy-chatterjee",
    name: "Prof. (Dr.) Biswajoy Chatterjee",
    role: "Patron",
    category: "patrons",
    designation: "Vice Chancellor, UEM Jaipur",
    affiliation: "Vice Chancellor - UEM Jaipur",
    initials: "BC",
    photo: "/images/committee/biswajoy-chatterjee.jpg"
  },
  {
    id: "amlan-chakrabarti",
    name: "Prof. (Dr.) Amlan Chakrabarti",
    role: "General Chair",
    category: "patrons",
    designation: "Professor & Director, A.K. Choudhury School of IT, University of Calcutta & Visiting Professor, IIT Kharagpur",
    affiliation: "University of Calcutta & IIT Kharagpur",
    initials: "AC",
    photo: "/images/committee/amlan-chakrabarti.jpg"
  },
  {
    id: "debajyoti-chatterjee",
    name: "Prof. (Dr.) Debajyoti Chatterjee",
    role: "Convener",
    category: "organizing",
    designation: "Professor, UEM Jaipur, Rajasthan",
    affiliation: "UEM Jaipur, Rajasthan",
    initials: "DC",
    photo: "/images/committee/debajyoti-chatterjee.jpg"
  },
  {
    id: "dipta-mukherjee",
    name: "Prof. Dipta Mukherjee",
    role: "Co-Convener",
    category: "organizing",
    designation: "Professor, UEM Jaipur, Rajasthan",
    affiliation: "UEM Jaipur, Rajasthan",
    initials: "DM",
    photo: "/images/committee/dipta-mukherjee.jpg"
  },
  {
    id: "surajit-sur",
    name: "Prof. Surajit Sur",
    role: "Organizing Secretary",
    category: "organizing",
    designation: "Professor, UEM Jaipur, Rajasthan",
    affiliation: "UEM Jaipur, Rajasthan",
    initials: "SS",
    photo: "/images/committee/surajit-sur.jpg"
  },
  {
    id: "lava-bhargava",
    name: "Prof. (Dr.) Lava Bhargava",
    role: "Program Chair",
    category: "tpc",
    designation: "Professor, MNIT Jaipur, Rajasthan",
    affiliation: "MNIT Jaipur, Rajasthan",
    initials: "LB",
    photo: "/images/committee/lava-bhargava.jpg"
  },
  {
    id: "nitin-awathare",
    name: "Prof. (Dr.) Nitin Awathare",
    role: "Program Co-Chair",
    category: "tpc",
    designation: "Professor, IIT Jodhpur, Rajasthan",
    affiliation: "IIT Jodhpur, Rajasthan",
    initials: "NA",
    photo: "/images/committee/nitin-awathare.jpg"
  },
  {
    id: "arka-prokash-mazumdar",
    name: "Prof. (Dr.) Arka Prokash Mazumdar",
    role: "Technical Program Chair (TPC)",
    category: "tpc",
    designation: "Professor, MNIT Jaipur, Rajasthan",
    affiliation: "MNIT Jaipur, Rajasthan",
    initials: "AM",
    photo: "/images/committee/arka-prokash-mazumdar.jpg"
  },
  {
    id: "arindam-biswas",
    name: "Prof. (Dr.) Arindam Biswas",
    role: "Technical Program Chair (TPC)",
    category: "tpc",
    designation: "Professor, Kazi Nazrul University, West Bengal",
    affiliation: "Kazi Nazrul University, West Bengal",
    initials: "AB",
    photo: "/images/committee/arindam-biswas.jpg"
  },
  {
    id: "angshuman-khan",
    name: "Prof. (Dr.) Angshuman Khan",
    role: "Technical Program Co-Chair (TPC)",
    category: "tpc",
    designation: "Professor, UEM Jaipur, Rajasthan",
    affiliation: "UEM Jaipur, Rajasthan",
    initials: "AK",
    photo: "/images/committee/angshuman-khan.jpg"
  },
  {
    id: "abheek-gupta",
    name: "Prof. (Dr.) Abheek Gupta",
    role: "Technical Program Co-Chair (TPC)",
    category: "tpc",
    designation: "Professor, UEM Jaipur, Rajasthan",
    affiliation: "UEM Jaipur, Rajasthan",
    initials: "AG",
    photo: "/images/committee/abheek-gupta.jpg"
  },
  {
    id: "arpit-khandelwal",
    name: "Prof. (Dr.) Arpit Khandelwal",
    role: "Publication Chair",
    category: "publication",
    designation: "Professor, IIT Jodhpur, Rajasthan",
    affiliation: "IIT Jodhpur, Rajasthan",
    initials: "AK",
    photo: "/images/committee/arpit-khandelwal.jpg"
  },
  {
    id: "soumya-sen",
    name: "Prof. (Dr.) Soumya Sen",
    role: "Publication Chair",
    category: "publication",
    designation: "Professor, UEM Jaipur, Rajasthan",
    affiliation: "UEM Jaipur, Rajasthan",
    initials: "SS",
    photo: "/images/committee/soumya-sen.jpg"
  },
  {
    id: "hriday-banerjee",
    name: "Prof. (Dr.) Hriday Banerjee",
    role: "Publicity Chair",
    category: "publication",
    designation: "Professor, UEM Jaipur, Rajasthan",
    affiliation: "UEM Jaipur, Rajasthan",
    initials: "HB",
    photo: "/images/committee/hriday-banerjee.jpg"
  },
  {
    id: "santanu-basak",
    name: "Prof. Santanu Basak",
    role: "Publicity Chair",
    category: "publication",
    designation: "Professor, UEM Jaipur, Rajasthan",
    affiliation: "UEM Jaipur, Rajasthan",
    initials: "SB",
    photo: "/images/committee/santanu-basak.jpg"
  }
];

const partners = [
  { name: "University of Engineering & Management (UEM) Jaipur", role: "Host University", img: "/images/floating_logos/logo-uem.png" },
  { name: "IEEE UEMJ Student Branch", role: "Organizer", img: "/images/floating_logos/logo-ieee-uemj.png" },
  { name: "IEEE Computer Society UEMJ", role: "Technical Co-Sponsor", img: "/images/floating_logos/logo-ieee-cs.png" },
  { name: "IEEE MTT-S UEMJ", role: "Technical Co-Sponsor", img: "/images/floating_logos/logo-mtts.png" },
  { name: "IEEE AP-S UEMJ", role: "Technical Co-Sponsor", img: "/images/floating_logos/logo-aps.png" },
  { name: "IEEE EMC Society UEMJ", role: "Technical Co-Sponsor", img: "/images/floating_logos/logo-emc.png" }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [activeTrackFilter, setActiveTrackFilter] = useState('all');
  const [activeCommitteeFilter, setActiveCommitteeFilter] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const canvasRef = useRef(null);

  // Smooth scroll to top on tab switch
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Carousel timer
  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [paused]);

  // Particle Canvas effect (Warm green and terracotta particles)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let width = canvas.width = canvas.parentElement.offsetWidth;
    let height = canvas.height = canvas.parentElement.offsetHeight;

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const count = Math.min(45, Math.floor(width / 28));
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 2.2 + 1.2,
      baseAlpha: Math.random() * 0.45 + 0.25
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 135;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.16;
            ctx.strokeStyle = \`rgba(36, 75, 60, \${alpha})\`;
            ctx.lineWidth = 0.85;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = \`rgba(199, 109, 66, \${p.baseAlpha * 0.5})\`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const filteredTracks = activeTrackFilter === 'all'
    ? tracks
    : tracks.filter(t => t.category === activeTrackFilter);

  const filteredCommittee = activeCommitteeFilter === 'all'
    ? committeeMembers
    : committeeMembers.filter(m => m.category === activeCommitteeFilter);

  return (
    <div className="site-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* TWO-TIER HEADER */}
      <header className="site-header-two-tier" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        {/* Tier 1: Logo and Institution Bar */}
        <div className="header-top-logo-bar" style={{ padding: '8px 24px' }}>
          <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <img src="/images/uem-logo.png" alt="UEM Jaipur" style={{ height: '32px', objectFit: 'contain' }} onError={(e) => { e.target.style.display = 'none'; }} />
              <div style={{ borderLeft: '1px solid rgba(244, 241, 233, 0.3)', paddingLeft: '12px' }}>
                <span style={{ fontSize: '11px', letterSpacing: '0.08em', fontWeight: 600, display: 'block', textTransform: 'uppercase' }}>
                  University of Engineering & Management, Jaipur
                </span>
                <span style={{ fontSize: '10px', opacity: 0.85, letterSpacing: '0.05em' }}>
                  In association with IEEE Student Branch & Technical Chapters
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
              <img src="/images/ieee-cs-uemj-logo.png" alt="IEEE CS" style={{ height: '26px', objectFit: 'contain' }} onError={(e) => { e.target.style.display = 'none'; }} />
              <img src="/images/ieee-uemj-student-branch.png" alt="IEEE UEMJ" style={{ height: '26px', objectFit: 'contain' }} onError={(e) => { e.target.style.display = 'none'; }} />
              <div className="brand-badge-pill" style={{ background: 'rgba(255, 255, 255, 0.12)', padding: '4px 12px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>
                {conf.dates} · JAIPUR
              </div>
            </div>
          </div>
        </div>

        {/* Tier 2: Navigation Bar */}
        <nav className="header-nav-bar" style={{ padding: '0 24px', height: '58px', display: 'flex', alignItems: 'center' }}>
          <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <button
              type="button"
              onClick={() => handleTabChange('home')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', padding: 0 }}
            >
              <span style={{
                width: '32px', height: '32px', background: '#244b3c', color: '#f4f1e9',
                display: 'grid', placeItems: 'center', fontWeight: 'bold', borderRadius: '4px', fontFamily: 'Playfair Display'
              }}>
                AI
              </span>
              <span style={{ fontWeight: 700, fontSize: '16px', letterSpacing: '0.04em', color: '#244b3c' }}>
                AI UNIVERSE<span style={{ color: '#c76d42' }}>–2028</span>
              </span>
            </button>

            {/* Desktop Navigation */}
            <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {navTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabChange(tab.id)}
                  className={\`nav-link-btn \${activeTab === tab.id ? 'active' : ''}\`}
                  style={{
                    padding: '8px 14px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer', border: 'none'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Action CTA */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                type="button"
                className="btn-amber"
                onClick={() => handleTabChange('registration')}
                style={{ padding: '9px 18px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
              >
                Register Now <ArrowUpRight size={14} />
              </button>

              <button
                type="button"
                className="menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{ background: 'none', border: 'none', padding: '6px', cursor: 'pointer', color: '#244b3c' }}
                aria-label="Toggle navigation"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-nav" style={{ background: '#f4f1e9', borderBottom: '2px solid #244b3c', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {navTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id)}
                style={{
                  textAlign: 'left', padding: '10px 14px', background: activeTab === tab.id ? 'rgba(36, 75, 60, 0.1)' : 'transparent',
                  border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: activeTab === tab.id ? 700 : 500, color: activeTab === tab.id ? '#244b3c' : '#404840', cursor: 'pointer'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* MAIN CONTENT AREA */}
      <main style={{ flex: 1 }}>
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* HERO SECTION */}
              <section className="hero" style={{ position: 'relative', overflow: 'hidden', padding: '50px 0 60px' }}>
                <canvas ref={canvasRef} className="hero-particle-canvas" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }} />

                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.9fr', gap: '48px', alignItems: 'center' }}>
                    {/* Hero Left Column: Copy & Actions */}
                    <div>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(36, 75, 60, 0.08)', border: '1px solid #d8d4c9', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, color: '#244b3c', marginBottom: '18px' }}>
                        <Sparkles size={14} color="#c76d42" />
                        <span>INTERNATIONAL ACADEMIC CONFERENCE · JAIPUR 2028</span>
                      </div>

                      <div className="hero-title-wrap" style={{ marginBottom: '14px' }}>
                        <h1 style={{ fontSize: 'clamp(38px, 5.5vw, 64px)', lineHeight: 1.08, margin: 0, fontWeight: 700, letterSpacing: '-0.02em' }}>
                          <span className="hero-title-brand">AI UNIVERSE</span>
                          <span className="hero-title-year">–2028</span>
                        </h1>
                      </div>

                      <div className="hero-conf-lead" style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#74786f', marginBottom: '12px' }}>
                        {conf.lead}
                      </div>

                      <p className="hero-subtitle" style={{ fontSize: '17px', color: '#3c443c', maxWidth: '600px', marginBottom: '28px', lineHeight: 1.6 }}>
                        {conf.subtitle}.
                      </p>

                      {/* Meta chips (Dates & Venue) */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '32px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', background: '#faf8f3', border: '1px solid #d8d4c9', padding: '12px 16px', borderRadius: '8px' }}>
                          <div className="meta-icon-bubble" style={{ width: '40px', height: '40px', borderRadius: '8px', display: 'grid', placeItems: 'center' }}>
                            <Calendar size={18} />
                          </div>
                          <div>
                            <small style={{ display: 'block', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#74786f' }}>CONFERENCE DATES</small>
                            <strong style={{ fontSize: '14px', color: '#202720' }}>{conf.dates}</strong>
                            <span style={{ display: 'block', fontSize: '11px', color: '#c76d42' }}>Three-Day International Summit</span>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', background: '#faf8f3', border: '1px solid #d8d4c9', padding: '12px 16px', borderRadius: '8px' }}>
                          <div className="meta-icon-bubble" style={{ width: '40px', height: '40px', borderRadius: '8px', display: 'grid', placeItems: 'center' }}>
                            <MapPin size={18} />
                          </div>
                          <div>
                            <small style={{ display: 'block', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#74786f' }}>OFFICIAL VENUE</small>
                            <strong style={{ fontSize: '14px', color: '#202720' }}>{conf.venueShort}</strong>
                            <span style={{ display: 'block', fontSize: '11px', color: '#74786f' }}>Jaipur, Rajasthan, India</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
                        <button
                          type="button"
                          className="btn-primary"
                          onClick={() => handleTabChange('papers')}
                          style={{ padding: '12px 24px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                        >
                          Call for Papers <ArrowRight size={16} />
                        </button>
                        <button
                          type="button"
                          className="btn-outline"
                          onClick={() => handleTabChange('tracks')}
                          style={{ padding: '12px 22px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                        >
                          Explore 4 Tracks <Layers size={16} />
                        </button>
                        <button
                          type="button"
                          className="btn-outline"
                          onClick={() => handleTabChange('dates')}
                          style={{ padding: '12px 20px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                        >
                          Important Dates <Clock size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Hero Right Column: Showcase Slider */}
                    <div
                      onMouseEnter={() => setPaused(true)}
                      onMouseLeave={() => setPaused(false)}
                      style={{
                        position: 'relative', background: '#faf8f3', border: '1px solid #d8d4c9', borderRadius: '12px',
                        overflow: 'hidden', boxShadow: '0 8px 30px rgba(0,0,0,0.06)'
                      }}
                    >
                      <div style={{ height: '360px', position: 'relative', overflow: 'hidden' }}>
                        <img
                          src={heroSlides[currentSlide].src}
                          alt={heroSlides[currentSlide].alt}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'all 0.5s ease' }}
                        />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(23, 51, 40, 0.85) 0%, rgba(23, 51, 40, 0.2) 60%, transparent 100%)' }} />
                        
                        <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px', color: '#ffffff' }}>
                          <span style={{
                            display: 'inline-block', background: '#c76d42', color: '#ffffff',
                            padding: '3px 10px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '8px'
                          }}>
                            {heroSlides[currentSlide].tag}
                          </span>
                          <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#f4f1e9', fontFamily: 'Playfair Display' }}>
                            {heroSlides[currentSlide].caption}
                          </h4>
                        </div>
                      </div>

                      {/* Slider Controls */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 18px', background: '#ffffff', borderTop: '1px solid #d8d4c9' }}>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          {heroSlides.map((_, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setCurrentSlide(idx)}
                              style={{
                                width: currentSlide === idx ? '20px' : '8px', height: '8px', borderRadius: '4px',
                                background: currentSlide === idx ? '#244b3c' : '#d8d4c9', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', padding: 0
                              }}
                              aria-label={\`Go to slide \${idx + 1}\`}
                            />
                          ))}
                        </div>

                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            type="button"
                            onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
                            style={{ width: '28px', height: '28px', borderRadius: '4px', border: '1px solid #d8d4c9', background: '#faf8f3', cursor: 'pointer', display: 'grid', placeItems: 'center' }}
                            aria-label="Previous slide"
                          >
                            <ChevronLeft size={16} color="#244b3c" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
                            style={{ width: '28px', height: '28px', borderRadius: '4px', border: '1px solid #d8d4c9', background: '#faf8f3', cursor: 'pointer', display: 'grid', placeItems: 'center' }}
                            aria-label="Next slide"
                          >
                            <ChevronRight size={16} color="#244b3c" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* LIVE TICKER STRIP */}
              <div style={{ background: '#244b3c', color: '#f4f1e9', padding: '10px 0', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
                <div style={{ padding: '0 20px', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '8px', borderRight: '1px solid rgba(255,255,255,0.2)', zIndex: 2 }}>
                  <span style={{ background: '#c76d42', color: '#ffffff', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em' }}>
                    UPDATES
                  </span>
                </div>
                <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', display: 'flex', flex: 1 }}>
                  <div className="ticker-track" style={{ display: 'inline-flex', gap: '48px', animation: 'marqueeContinuous 35s linear infinite' }}>
                    {tickerItems.map((item, idx) => (
                      <span key={idx} style={{ fontSize: '12px', letterSpacing: '0.04em', display: 'inline-flex', alignItems: 'center', gap: '16px' }}>
                        <span>{item}</span>
                        <span style={{ color: '#c76d42' }}>✦</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* QUICK FACTS 4-CELL STRIP */}
              <section className="partners-strip" style={{ padding: '36px 0' }}>
                <div className="container">
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                    {quickFacts.map((fact, idx) => (
                      <div key={idx} className="partner-cell" style={{ padding: '20px 24px', borderRadius: '8px' }}>
                        <span className="partner-role" style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                          {fact.role}
                        </span>
                        <strong style={{ fontSize: '18px', display: 'block', marginBottom: '4px', fontFamily: 'Playfair Display' }}>
                          {fact.name}
                        </strong>
                        <small style={{ color: '#74786f', fontSize: '12px' }}>{fact.detail}</small>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* CO-SPONSORING SOCIETIES MARQUEE */}
              <section className="floating-marquee-section" style={{ padding: '38px 0' }}>
                <div className="container" style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <span className="floating-marquee-eyebrow" style={{ fontSize: '11px', letterSpacing: '0.14em', fontWeight: 600, textTransform: 'uppercase' }}>
                    ORGANIZING ENTITIES & CO-SPONSORS
                  </span>
                  <h2 className="floating-marquee-title" style={{ fontSize: '24px', margin: '6px 0 0' }}>
                    Technical Co-Sponsoring Societies & Partners
                  </h2>
                </div>

                <div style={{ overflow: 'hidden', display: 'flex', width: '100%' }}>
                  <div className="floating-marquee-track" style={{ display: 'flex', gap: '20px', animation: 'marqueeContinuous 28s linear infinite' }}>
                    {[...partners, ...partners].map((p, idx) => (
                      <div
                        key={idx}
                        className="marquee-logo-card"
                        style={{
                          flexShrink: 0, width: '240px', padding: '16px 20px', borderRadius: '8px',
                          display: 'flex', alignItems: 'center', gap: '14px'
                        }}
                      >
                        <img src={p.img} alt={p.name} style={{ width: '42px', height: '42px', objectFit: 'contain' }} onError={(e) => { e.target.style.display = 'none'; }} />
                        <div>
                          <strong style={{ display: 'block', fontSize: '12px', color: '#244b3c', lineHeight: 1.3 }}>{p.name}</strong>
                          <span style={{ fontSize: '10px', color: '#c76d42', fontWeight: 600 }}>{p.role}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* CFP QUICK CARD & OVERVIEW TEASER */}
              <section style={{ padding: '60px 0', background: '#faf8f3', borderTop: '1px solid #d8d4c9' }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '40px', alignItems: 'center' }}>
                  <div>
                    <span style={{ color: '#c76d42', fontSize: '11px', letterSpacing: '0.12em', fontWeight: 700, textTransform: 'uppercase' }}>
                      CONFERENCE PURPOSE & OVERVIEW
                    </span>
                    <h2 style={{ fontSize: '32px', color: '#244b3c', margin: '8px 0 16px', fontFamily: 'Playfair Display' }}>
                      Unifying Intelligence Across Disciplines
                    </h2>
                    <p style={{ color: '#404840', lineHeight: 1.7, fontSize: '15px', marginBottom: '20px' }}>
                      {conf.overview}
                    </p>
                    <div style={{ display: 'flex', gap: '14px' }}>
                      <button
                        type="button"
                        className="btn-primary"
                        onClick={() => handleTabChange('about')}
                        style={{ padding: '10px 20px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer' }}
                      >
                        Read Full Overview →
                      </button>
                      <button
                        type="button"
                        className="btn-outline"
                        onClick={() => handleTabChange('committee')}
                        style={{ padding: '10px 20px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer' }}
                      >
                        Meet Committees
                      </button>
                    </div>
                  </div>

                  <div style={{ background: '#ffffff', border: '1px solid #d8d4c9', borderRadius: '10px', padding: '28px', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                      <FileText size={22} color="#c76d42" />
                      <h3 style={{ margin: 0, fontSize: '18px', color: '#244b3c', fontFamily: 'Playfair Display' }}>Call for Papers</h3>
                    </div>
                    <p style={{ fontSize: '13px', color: '#404840', lineHeight: 1.6, marginBottom: '20px' }}>
                      {conf.callForPapers}
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <li style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px', color: '#202720' }}>
                        <Check size={14} color="#244b3c" /> Paper Submission Opens: <strong>16 April 2028</strong>
                      </li>
                      <li style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px', color: '#202720' }}>
                        <Check size={14} color="#244b3c" /> Submission Deadline: <strong>10 May 2028</strong>
                      </li>
                      <li style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px', color: '#202720' }}>
                        <Check size={14} color="#244b3c" /> 4 Technical Peer-Reviewed Tracks
                      </li>
                    </ul>
                    <button
                      type="button"
                      className="btn-amber"
                      onClick={() => handleTabChange('papers')}
                      style={{ width: '100%', padding: '10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', textAlign: 'center' }}
                    >
                      View Submission Guidelines →
                    </button>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {/* ABOUT TAB */}
          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              style={{ padding: '60px 0' }}
            >
              <div className="container">
                <div style={{ maxWidth: '820px', margin: '0 auto' }}>
                  <span style={{ color: '#c76d42', fontSize: '12px', letterSpacing: '0.14em', fontWeight: 700, textTransform: 'uppercase' }}>
                    ABOUT THE CONFERENCE
                  </span>
                  <h1 style={{ fontSize: '38px', color: '#244b3c', margin: '8px 0 24px', fontFamily: 'Playfair Display' }}>
                    AI UNIVERSE–2028
                  </h1>
                  <p style={{ fontSize: '18px', color: '#244b3c', fontWeight: 500, lineHeight: 1.6, marginBottom: '20px' }}>
                    {conf.subtitle}.
                  </p>
                  <p style={{ fontSize: '15px', color: '#404840', lineHeight: 1.8, marginBottom: '32px' }}>
                    {conf.overview}
                  </p>

                  {/* Institution Cards */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginTop: '40px' }}>
                    <div style={{ background: '#ffffff', border: '1px solid #d8d4c9', borderRadius: '10px', padding: '28px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', color: '#244b3c' }}>
                        <Building2 size={20} />
                        <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                          ORGANIZING HOST INSTITUTION
                        </span>
                      </div>
                      <h3 style={{ fontSize: '20px', color: '#244b3c', margin: '0 0 10px', fontFamily: 'Playfair Display' }}>
                        Dept. of Computer Science & Engineering
                      </h3>
                      <p style={{ fontWeight: 600, color: '#c76d42', fontSize: '14px', marginBottom: '10px' }}>
                        University of Engineering & Management (UEM), Jaipur
                      </p>
                      <p style={{ fontSize: '13px', color: '#404840', lineHeight: 1.6 }}>
                        UEM Jaipur is a premier technical and research university in Rajasthan, recognized for high-impact IEEE international conferences, advanced laboratories, research publications, and global academic collaborations.
                      </p>
                    </div>

                    <div style={{ background: '#ffffff', border: '1px solid #d8d4c9', borderRadius: '10px', padding: '28px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', color: '#c76d42' }}>
                        <Compass size={20} />
                        <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                          ABOUT JAIPUR (THE PINK CITY)
                        </span>
                      </div>
                      <h3 style={{ fontSize: '20px', color: '#244b3c', margin: '0 0 10px', fontFamily: 'Playfair Display' }}>
                        Heritage, Technology & Culture
                      </h3>
                      <p style={{ fontWeight: 600, color: '#244b3c', fontSize: '14px', marginBottom: '10px' }}>
                        A UNESCO World Heritage destination & emerging technology hub
                      </p>
                      <p style={{ fontSize: '13px', color: '#404840', lineHeight: 1.6 }}>
                        Jaipur is conveniently connected via Jaipur International Airport (JAI), major railway junctions, and modern expressways. Renowned for its historic forts, palaces, and vibrant hospitality, Jaipur offers an unforgettable experience for delegates and authors.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TRACKS TAB */}
          {activeTab === 'tracks' && (
            <motion.div
              key="tracks"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              style={{ padding: '60px 0' }}
            >
              <div className="container">
                <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 36px' }}>
                  <span style={{ color: '#c76d42', fontSize: '12px', letterSpacing: '0.14em', fontWeight: 700, textTransform: 'uppercase' }}>
                    CONFERENCE PROGRAMME
                  </span>
                  <h1 style={{ fontSize: '36px', color: '#244b3c', margin: '8px 0 12px', fontFamily: 'Playfair Display' }}>
                    04 Technical Tracks
                  </h1>
                  <p style={{ color: '#74786f', fontSize: '15px' }}>
                    Comprehensive research areas spanning foundational algorithms, verified intelligence, robotics, and edge hardware.
                  </p>
                </div>

                {/* Filter Pills */}
                <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '40px' }}>
                  {trackTabs.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setActiveTrackFilter(t.id)}
                      style={{
                        padding: '8px 16px', borderRadius: '20px', fontSize: '13px', cursor: 'pointer',
                        border: '1px solid ' + (activeTrackFilter === t.id ? '#244b3c' : '#d8d4c9'),
                        background: activeTrackFilter === t.id ? '#244b3c' : '#ffffff',
                        color: activeTrackFilter === t.id ? '#ffffff' : '#404840',
                        fontWeight: activeTrackFilter === t.id ? 600 : 500,
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                {/* Tracks Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '28px' }}>
                  {filteredTracks.map((track) => {
                    const TrackIcon = track.icon;
                    return (
                      <div
                        key={track.number}
                        className="track-card"
                        style={{
                          borderRadius: '10px', padding: '32px', display: 'flex', flexDirection: 'column'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                          <span className="track-badge" style={{ padding: '4px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 700 }}>
                            TRACK {track.number}
                          </span>
                          <TrackIcon size={24} color="#244b3c" />
                        </div>

                        <h3 style={{ fontSize: '20px', lineHeight: 1.35, margin: '0 0 12px' }}>
                          {track.title}
                        </h3>

                        <p style={{ color: '#74786f', fontSize: '13px', lineHeight: 1.6, marginBottom: '20px' }}>
                          {track.description}
                        </p>

                        <div style={{ borderTop: '1px solid #d8d4c9', paddingTop: '16px', marginTop: 'auto' }}>
                          <h4 style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#c76d42', margin: '0 0 10px' }}>
                            Sub-topics & Scope
                          </h4>
                          <ul className="track-topics" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {track.topics.map((topic, i) => (
                              <li key={i} style={{ fontSize: '12px', display: 'flex', alignItems: 'flex-start', gap: '8px', lineHeight: 1.4 }}>
                                <span style={{ color: '#c76d42', fontSize: '14px', lineHeight: 1 }}>•</span>
                                <span>{topic}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* IMPORTANT DATES TAB */}
          {activeTab === 'dates' && (
            <motion.div
              key="dates"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              style={{ padding: '60px 0' }}
            >
              <div className="container" style={{ maxWidth: '800px' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                  <span style={{ color: '#c76d42', fontSize: '12px', letterSpacing: '0.14em', fontWeight: 700, textTransform: 'uppercase' }}>
                    SUBMISSION MILESTONES
                  </span>
                  <h1 style={{ fontSize: '36px', color: '#244b3c', margin: '8px 0 12px', fontFamily: 'Playfair Display' }}>
                    Important Dates
                  </h1>
                  <p style={{ color: '#74786f', fontSize: '15px' }}>
                    Key conference deadlines for researchers, authors, and participants.
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {importantDates.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: '#ffffff', border: '1px solid ' + (item.highlight ? '#244b3c' : '#d8d4c9'),
                        borderRadius: '8px', padding: '22px 26px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        boxShadow: item.highlight ? '0 4px 14px rgba(36, 75, 60, 0.08)' : '0 2px 6px rgba(0,0,0,0.02)',
                        flexWrap: 'wrap', gap: '14px'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                          <Clock size={16} color={item.highlight ? '#c76d42' : '#244b3c'} />
                          <h3 style={{ margin: 0, fontSize: '16px', color: '#244b3c', fontFamily: 'Playfair Display' }}>
                            {item.title}
                          </h3>
                        </div>
                        <p style={{ margin: 0, fontSize: '13px', color: '#74786f' }}>{item.detail}</p>
                      </div>

                      <div style={{
                        background: item.highlight ? '#244b3c' : '#faf8f3',
                        color: item.highlight ? '#f4f1e9' : '#244b3c',
                        padding: '8px 18px', borderRadius: '6px', fontSize: '14px', fontWeight: 700,
                        border: '1px solid ' + (item.highlight ? '#244b3c' : '#d8d4c9')
                      }}>
                        {item.date}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* CALL FOR PAPERS TAB */}
          {activeTab === 'papers' && (
            <motion.div
              key="papers"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              style={{ padding: '60px 0' }}
            >
              <div className="container" style={{ maxWidth: '860px' }}>
                <span style={{ color: '#c76d42', fontSize: '12px', letterSpacing: '0.14em', fontWeight: 700, textTransform: 'uppercase' }}>
                  CALL FOR PAPERS / AUTHORS
                </span>
                <h1 style={{ fontSize: '36px', color: '#244b3c', margin: '8px 0 20px', fontFamily: 'Playfair Display' }}>
                  Call for Research Papers
                </h1>
                <p style={{ fontSize: '16px', lineHeight: 1.8, color: '#3c443c', marginBottom: '28px' }}>
                  {conf.callForPapers}
                </p>

                <div style={{ background: '#ffffff', border: '1px solid #d8d4c9', borderRadius: '10px', padding: '32px', marginBottom: '32px' }}>
                  <h3 style={{ fontSize: '20px', color: '#244b3c', margin: '0 0 16px', fontFamily: 'Playfair Display' }}>
                    Submission Guidelines & Paper Formatting
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <li style={{ fontSize: '14px', color: '#404840', display: 'flex', alignItems: 'flex-start', gap: '10px', lineHeight: 1.5 }}>
                      <CheckCircle2 size={18} color="#244b3c" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>Originality:</strong> Submissions must present original, unpublished research and should not be under review in any other conference or journal.</span>
                    </li>
                    <li style={{ fontSize: '14px', color: '#404840', display: 'flex', alignItems: 'flex-start', gap: '10px', lineHeight: 1.5 }}>
                      <CheckCircle2 size={18} color="#244b3c" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>Double-Blind Review:</strong> All manuscripts undergo rigorous double-blind peer review by international Technical Program Committee experts.</span>
                    </li>
                    <li style={{ fontSize: '14px', color: '#404840', display: 'flex', alignItems: 'flex-start', gap: '10px', lineHeight: 1.5 }}>
                      <CheckCircle2 size={18} color="#244b3c" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>Length & Style:</strong> Regular full papers should be formatted according to standard IEEE 2-column format (typically 4–6 pages including figures, tables, and references).</span>
                    </li>
                    <li style={{ fontSize: '14px', color: '#404840', display: 'flex', alignItems: 'flex-start', gap: '10px', lineHeight: 1.5 }}>
                      <CheckCircle2 size={18} color="#244b3c" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>Plagiarism Threshold:</strong> Submissions with similarity index exceeding IEEE guidelines will be rejected without review.</span>
                    </li>
                  </ul>
                </div>

                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    className="btn-amber"
                    onClick={() => handleTabChange('dates')}
                    style={{ padding: '12px 24px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
                  >
                    View Key Submission Deadlines →
                  </button>
                  <button
                    type="button"
                    className="btn-outline"
                    onClick={() => handleTabChange('tracks')}
                    style={{ padding: '12px 24px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
                  >
                    Explore 4 Tracks
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* PUBLICATION TAB */}
          {activeTab === 'publication' && (
            <motion.div
              key="publication"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              style={{ padding: '60px 0' }}
            >
              <div className="container" style={{ maxWidth: '860px' }}>
                <span style={{ color: '#c76d42', fontSize: '12px', letterSpacing: '0.14em', fontWeight: 700, textTransform: 'uppercase' }}>
                  PROCEEDINGS & INDEXATION
                </span>
                <h1 style={{ fontSize: '36px', color: '#244b3c', margin: '8px 0 20px', fontFamily: 'Playfair Display' }}>
                  Submission Format & Publication Updates
                </h1>
                <p style={{ fontSize: '16px', lineHeight: 1.8, color: '#3c443c', marginBottom: '24px' }}>
                  Submissions to AI UNIVERSE–2028 must present novel work, sound technical content, and clear research contributions aligned with any of the four conference tracks.
                </p>
                <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#74786f', marginBottom: '36px' }}>
                  Further details regarding the submission format, publication arrangements, registration procedure, and conference programme will be announced prior to the paper submission opening date on 16 April 2028.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                  <div style={{ background: '#ffffff', border: '1px solid #d8d4c9', borderRadius: '8px', padding: '24px' }}>
                    <ShieldCheck size={28} color="#244b3c" style={{ marginBottom: '12px' }} />
                    <h3 style={{ fontSize: '18px', color: '#244b3c', margin: '0 0 8px', fontFamily: 'Playfair Display' }}>Technical Review</h3>
                    <p style={{ fontSize: '13px', color: '#74786f', lineHeight: 1.6, margin: 0 }}>
                      All manuscripts are evaluated for originality, rigorous methodology, mathematical validity, and practical relevance.
                    </p>
                  </div>

                  <div style={{ background: '#ffffff', border: '1px solid #d8d4c9', borderRadius: '8px', padding: '24px' }}>
                    <Globe2 size={28} color="#c76d42" style={{ marginBottom: '12px' }} />
                    <h3 style={{ fontSize: '18px', color: '#244b3c', margin: '0 0 8px', fontFamily: 'Playfair Display' }}>Global Indexation</h3>
                    <p style={{ fontSize: '13px', color: '#74786f', lineHeight: 1.6, margin: 0 }}>
                      Accepted and presented papers will be submitted for inclusion in major digital libraries and abstracting databases.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* REGISTRATION TAB */}
          {activeTab === 'registration' && (
            <motion.div
              key="registration"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              style={{ padding: '60px 0' }}
            >
              <div className="container" style={{ maxWidth: '900px' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                  <span style={{ color: '#c76d42', fontSize: '12px', letterSpacing: '0.14em', fontWeight: 700, textTransform: 'uppercase' }}>
                    FEES & ATTENDANCE
                  </span>
                  <h1 style={{ fontSize: '36px', color: '#244b3c', margin: '8px 0 12px', fontFamily: 'Playfair Display' }}>
                    Registration Charges
                  </h1>
                  <p style={{ color: '#74786f', fontSize: '15px' }}>
                    Tiered pricing for Indian Delegates (INR) and International Delegates (USD).
                  </p>
                </div>

                <div className="table-container" style={{ borderRadius: '10px', overflow: 'hidden', marginBottom: '32px', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
                  <table className="reg-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr>
                        <th style={{ padding: '16px 20px', fontSize: '13px', fontWeight: 700 }}>Category</th>
                        <th style={{ padding: '16px 20px', fontSize: '13px', fontWeight: 700 }}>Scope</th>
                        <th style={{ padding: '16px 20px', fontSize: '13px', fontWeight: 700 }}>Non-IEEE Members</th>
                        <th style={{ padding: '16px 20px', fontSize: '13px', fontWeight: 700, color: '#c76d42' }}>IEEE Members</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fees.map((row, idx) => (
                        <tr key={idx}>
                          <td style={{ padding: '16px 20px', fontSize: '14px', fontWeight: 600 }}>
                            {row.category}
                            <small style={{ display: 'block', fontSize: '11px', color: '#74786f', fontWeight: 400, marginTop: '2px' }}>{row.notes}</small>
                          </td>
                          <td style={{ padding: '16px 20px', fontSize: '13px', color: '#74786f' }}>{row.scope}</td>
                          <td style={{ padding: '16px 20px', fontSize: '14px', fontWeight: 600 }}>{row.nonIeee}</td>
                          <td style={{ padding: '16px 20px', fontSize: '15px', fontWeight: 700, color: '#244b3c' }}>{row.ieee}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div style={{ background: '#faf8f3', border: '1px solid #d8d4c9', borderRadius: '8px', padding: '20px 24px' }}>
                  <h4 style={{ fontSize: '13px', color: '#244b3c', margin: '0 0 8px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    Registration Terms & Conditions
                  </h4>
                  <p style={{ fontSize: '12px', color: '#74786f', lineHeight: 1.6, margin: 0 }}>
                    • At least one author of each accepted paper must register at the full author rate to ensure publication in the proceedings.<br />
                    • Student registrations must provide valid student identification / verification from their academic institution upon registration.<br />
                    • Registration fee covers conference kit, technical session access, tea/coffee breaks, and working lunches during the conference days.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* COMMITTEE TAB */}
          {activeTab === 'committee' && (
            <motion.div
              key="committee"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              style={{ padding: '60px 0' }}
            >
              <div className="container">
                <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 36px' }}>
                  <span style={{ color: '#c76d42', fontSize: '12px', letterSpacing: '0.14em', fontWeight: 700, textTransform: 'uppercase' }}>
                    ORGANIZING COMMITTEES
                  </span>
                  <h1 style={{ fontSize: '36px', color: '#244b3c', margin: '8px 0 12px', fontFamily: 'Playfair Display' }}>
                    Conference Leadership & Chairs
                  </h1>
                  <p style={{ color: '#74786f', fontSize: '15px' }}>
                    Distinguished leadership, technical program committee chairs, and organizers guiding AI UNIVERSE–2028.
                  </p>
                </div>

                {/* Filter Bar */}
                <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '40px' }}>
                  {[
                    { id: 'all', label: 'All Members' },
                    { id: 'patrons', label: 'Patrons & General Chairs' },
                    { id: 'organizing', label: 'Organizing Committee' },
                    { id: 'tpc', label: 'Technical Program (TPC)' },
                    { id: 'publication', label: 'Publication & Publicity' }
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      type="button"
                      onClick={() => setActiveCommitteeFilter(filter.id)}
                      className={\`committee-filter-pill \${activeCommitteeFilter === filter.id ? 'active' : ''}\`}
                      style={{
                        padding: '8px 18px', borderRadius: '20px', fontSize: '13px', cursor: 'pointer',
                        border: '1px solid ' + (activeCommitteeFilter === filter.id ? '#244b3c' : '#d8d4c9'),
                        background: activeCommitteeFilter === filter.id ? '#244b3c' : '#ffffff',
                        color: activeCommitteeFilter === filter.id ? '#ffffff' : '#404840',
                        fontWeight: activeCommitteeFilter === filter.id ? 600 : 500,
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>

                {/* Members Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '24px' }}>
                  {filteredCommittee.map((member) => (
                    <div
                      key={member.id}
                      className="committee-photo-card"
                      style={{ borderRadius: '10px', overflow: 'hidden', padding: '20px', textAlign: 'center' }}
                    >
                      <div style={{ width: '90px', height: '90px', margin: '0 auto 16px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #244b3c', background: '#faf8f3', position: 'relative' }}>
                        <img
                          src={member.photo}
                          alt={member.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'grid';
                          }}
                        />
                        <div style={{ display: 'none', position: 'absolute', inset: 0, placeItems: 'center', background: '#244b3c', color: '#f4f1e9', fontWeight: 700, fontSize: '22px' }}>
                          {member.initials}
                        </div>
                      </div>

                      <span className="committee-role-badge" style={{ display: 'inline-block', padding: '3px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: 700, marginBottom: '8px' }}>
                        {member.role}
                      </span>

                      <h4 className="committee-member-name" style={{ fontSize: '16px', margin: '0 0 6px' }}>
                        {member.name}
                      </h4>

                      <p style={{ fontSize: '12px', color: '#74786f', lineHeight: 1.4, margin: '0 0 4px' }}>
                        {member.designation}
                      </p>

                      <p style={{ fontSize: '11px', color: '#244b3c', fontWeight: 600, margin: 0 }}>
                        {member.affiliation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* VENUE TAB */}
          {activeTab === 'venue' && (
            <motion.div
              key="venue"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              style={{ padding: '60px 0' }}
            >
              <div className="container">
                <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 36px' }}>
                  <span style={{ color: '#c76d42', fontSize: '12px', letterSpacing: '0.14em', fontWeight: 700, textTransform: 'uppercase' }}>
                    LOCATION & TRAVEL
                  </span>
                  <h1 style={{ fontSize: '36px', color: '#244b3c', margin: '8px 0 12px', fontFamily: 'Playfair Display' }}>
                    Conference Venue
                  </h1>
                  <p style={{ color: '#74786f', fontSize: '15px' }}>
                    Rajasthan International Center (RIC), Jaipur — Rajasthan's premier world-class convention destination.
                  </p>
                </div>

                {/* Venue Photos */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }}>
                  <div style={{ height: '260px', borderRadius: '10px', overflow: 'hidden', border: '1px solid #d8d4c9' }}>
                    <img src="/images/ric-exterior.jpg" alt="RIC Exterior" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; }} />
                  </div>
                  <div style={{ height: '260px', borderRadius: '10px', overflow: 'hidden', border: '1px solid #d8d4c9' }}>
                    <img src="/images/ric-auditorium.jpg" alt="RIC Auditorium" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; }} />
                  </div>
                </div>

                {/* Google Map Embed */}
                <div className="venue-map-iframe-container" style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid #d8d4c9', marginBottom: '32px', height: '380px' }}>
                  <iframe
                    title="Google Map - Rajasthan International Center Jaipur"
                    src="https://maps.google.com/maps?q=Rajasthan+International+Center+Jaipur&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                  />
                </div>

                {/* Venue Details & Transit Strip */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
                  <div style={{ background: '#ffffff', border: '1px solid #d8d4c9', borderRadius: '8px', padding: '22px' }}>
                    <h4 style={{ color: '#244b3c', fontSize: '15px', margin: '0 0 6px', fontFamily: 'Playfair Display' }}>Full Address</h4>
                    <p style={{ fontSize: '13px', color: '#404840', lineHeight: 1.5, margin: 0 }}>
                      {conf.venueAddress}
                    </p>
                  </div>

                  <div style={{ background: '#ffffff', border: '1px solid #d8d4c9', borderRadius: '8px', padding: '22px' }}>
                    <h4 style={{ color: '#244b3c', fontSize: '15px', margin: '0 0 6px', fontFamily: 'Playfair Display' }}>Airport Transit</h4>
                    <p style={{ fontSize: '13px', color: '#404840', lineHeight: 1.5, margin: 0 }}>
                      Jaipur International Airport (JAI) is approximately 8 km (15 minutes) from Rajasthan International Center.
                    </p>
                  </div>

                  <div style={{ background: '#ffffff', border: '1px solid #d8d4c9', borderRadius: '8px', padding: '22px' }}>
                    <h4 style={{ color: '#244b3c', fontSize: '15px', margin: '0 0 6px', fontFamily: 'Playfair Display' }}>Railway Connectivity</h4>
                    <p style={{ fontSize: '13px', color: '#404840', lineHeight: 1.5, margin: 0 }}>
                      Jaipur Junction & Gandhinagar Jaipur Railway Stations provide regular superfast train connections across India.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* SITE FOOTER */}
      <footer className="site-footer" style={{ padding: '60px 0 24px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1.2fr', gap: '36px', marginBottom: '40px' }}>
            {/* Brand Col */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <span style={{
                  width: '32px', height: '32px', background: '#c76d42', color: '#ffffff',
                  display: 'grid', placeItems: 'center', fontWeight: 'bold', borderRadius: '4px', fontFamily: 'Playfair Display'
                }}>
                  AI
                </span>
                <div>
                  <strong style={{ fontSize: '16px', color: '#ffffff', display: 'block', letterSpacing: '0.04em' }}>
                    {conf.title}
                  </strong>
                  <span style={{ fontSize: '11px', color: '#a8b5a7' }}>International Conference</span>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: '#a8b5a7', lineHeight: 1.6, maxWidth: '320px' }}>
                {conf.subtitle}.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 style={{ fontSize: '14px', margin: '0 0 16px', letterSpacing: '0.06em' }}>Quick Navigation</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['home', 'about', 'tracks', 'dates'].map((id) => (
                  <li key={id}>
                    <button
                      type="button"
                      onClick={() => handleTabChange(id)}
                      style={{ background: 'none', border: 'none', color: '#a8b5a7', fontSize: '13px', cursor: 'pointer', padding: 0 }}
                    >
                      {id.charAt(0).toUpperCase() + id.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Authors & Venue */}
            <div>
              <h4 style={{ fontSize: '14px', margin: '0 0 16px', letterSpacing: '0.06em' }}>Authors & Venue</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['papers', 'publication', 'registration', 'committee', 'venue'].map((id) => (
                  <li key={id}>
                    <button
                      type="button"
                      onClick={() => handleTabChange(id)}
                      style={{ background: 'none', border: 'none', color: '#a8b5a7', fontSize: '13px', cursor: 'pointer', padding: 0 }}
                    >
                      {id.charAt(0).toUpperCase() + id.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Conference Venue */}
            <div>
              <h4 style={{ fontSize: '14px', margin: '0 0 16px', letterSpacing: '0.06em' }}>Official Venue</h4>
              <p style={{ fontSize: '13px', color: '#a8b5a7', lineHeight: 1.6, margin: 0 }}>
                <strong style={{ color: '#ffffff' }}>{conf.venueName}</strong><br />
                {conf.venueAddress}<br />
                <strong style={{ color: '#ffffff' }}>Dates:</strong> {conf.dates}
              </p>
            </div>
          </div>

          <div className="footer-bottom" style={{ paddingTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', fontSize: '12px' }}>
            <span>© 2028 AI UNIVERSE–2028 · Rajasthan International Center (RIC), Jaipur, India</span>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{ background: 'none', border: 'none', color: '#a8b5a7', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
`;

fs.writeFileSync('src/main.jsx', mainJsx);
console.log('src/main.jsx written successfully!');
