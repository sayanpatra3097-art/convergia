const fs = require('fs');

const code = `import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, MapPin, Sparkles, Clock, ArrowRight, ExternalLink,
  ChevronRight, ChevronLeft, Download, FileText, CheckCircle2,
  Award, Users, Layers, Globe2, Mail, Phone, Menu, X,
  BookOpen, ShieldCheck, Cpu, Wifi, Atom, Send, ArrowUpRight,
  Building2, Check, AlertCircle, Compass, Zap, Activity, Microscope, BarChart3,
  MonitorCheck
} from 'lucide-react';
import './styles.css';

// CONVERGIA 2026 Official Proposal Metadata
const conf = {
  title: "CONVERGIA 2026",
  fullTitle: "International Conference on Next-generation VLSI, Energy, Rehabilitation, Green Computing, Intelligence & Analytics",
  theme: "Converging Intelligence and Emerging Technologies for a Sustainable Digital Future",
  host: "University of Engineering and Management (UEM), Jaipur",
  dates: "2026 (Dates to be announced soon)",
  format: "Offline & Online (Hybrid) Participation",
  venueShort: "UEM Jaipur Campus, Rajasthan",
  venueName: "University of Engineering & Management (UEM), Jaipur",
  venueAddress: "GURUKUL, Sikar Road, Near Udaipuria Mod, Jaipur, Rajasthan – 303807, India",
  overview: "CONVERGIA 2026 is an international flagship conference uniting leading academicians, researchers, practitioners, and industry experts. The conference aims to bridge cutting-edge research across artificial intelligence, semiconductor & VLSI, smart energy systems, business intelligence, health informatics, and scientific computing for sustainable technological progress.",
  callForPapers: "Researchers, academicians, post-docs, students, and industry professionals are cordially invited to submit original, high-quality research manuscripts across any of the six technical tracks. Submissions undergo a rigorous peer-review evaluation process."
};

const navTabs = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'tracks', label: 'Tracks (06)' },
  { id: 'publication', label: 'Publication Plan' },
  { id: 'dates', label: 'Schedule' },
  { id: 'registration', label: 'Registration' },
  { id: 'committee', label: 'Committees' },
  { id: 'venue', label: 'Venue & Mode' }
];

const tickerItems = [
  "CONVERGIA 2026 | International Conference on Next-generation VLSI, Energy, Rehabilitation, Green Computing, Intelligence & Analytics.",
  "Conference Theme: 'Converging Intelligence and Emerging Technologies for a Sustainable Digital Future'.",
  "Mode: Offline & Online (Hybrid) Participation hosted at University of Engineering & Management (UEM), Jaipur.",
  "Proceedings to include Atlantis Press, Springer Nature, Scopus & Clarivate Web of Science indexation.",
  "Students will be encouraged to submit papers in Springer format.",
  "Six Comprehensive Technical Tracks covering AI, VLSI & Antenna, Smart Energy, Business Analytics, Health Informatics & Scientific Computing."
];

const heroSlides = [
  {
    src: "/images/ai-humanoid-robot.jpg",
    alt: "AI & Machine Learning Systems",
    tag: "TRACK 01 · ARTIFICIAL INTELLIGENCE",
    caption: "Deep Learning, Generative AI & Data-Driven Systems"
  },
  {
    src: "/images/ai-quantum-chip.jpg",
    alt: "Semiconductor and VLSI hardware micro-architecture",
    tag: "TRACK 02 · VLSI & ELECTROMAGNETIC SYSTEMS",
    caption: "Machine Intelligence for Semiconductor, Antennas & EDA"
  },
  {
    src: "/images/ai-robotics.jpg",
    alt: "Health Informatics and Rehabilitation Engineering",
    tag: "TRACK 05 · REHABILITATION & HEALTH INFORMATICS",
    caption: "Biomechanics, Wearables & Assistive Technology"
  },
  {
    src: "/images/ai-summit-stage.jpg",
    alt: "Conference Plenary Sessions and Sustainable Innovation",
    tag: "TRACK 03 & 06 · ENERGY & SCIENTIFIC COMPUTING",
    caption: "Smart Energy Grids & Physics-Informed Scientific Computing"
  }
];

const quickFacts = [
  { role: "Conference Edition", name: "CONVERGIA 2026", detail: "Flagship International Conference" },
  { role: "Host Institution", name: "UEM Jaipur", detail: "University of Engineering & Management" },
  { role: "Participation Mode", name: "Hybrid Format", detail: "Offline & Online Participation" },
  { role: "Conference Tracks", name: "06 Technical Tracks", detail: "Peer-reviewed Research Tracks" }
];

const publicationPartners = [
  { name: "Springer Nature", role: "Proceedings & Publication Format", img: "/publications/springer-nature.png" },
  { name: "Atlantis Press", role: "Proceedings Publication", img: "/publications/atlantis-press.jpeg" },
  { name: "Scopus", role: "Abstracting & Indexing Database", img: "/publications/scopus.png" },
  { name: "Clarivate Web of Science", role: "Citation Indexing (WoS)", img: "/publications/clarivate-wos.gif" }
];

const trackTabs = [
  { id: "all", label: "All Tracks (06)" },
  { id: "track-1", label: "Track 1: AI & ML" },
  { id: "track-2", label: "Track 2: VLSI & Antenna" },
  { id: "track-3", label: "Track 3: Smart Energy" },
  { id: "track-4", label: "Track 4: Business Analytics" },
  { id: "track-5", label: "Track 5: Health & Rehab" },
  { id: "track-6", label: "Track 6: Scientific Computing" }
];

const tracks = [
  {
    number: "01",
    category: "track-1",
    title: "Artificial Intelligence, Machine Learning and Data-Driven Systems",
    icon: Atom,
    description: "Foundational and applied advances in deep learning, language intelligence, distributed inference, and ethical AI.",
    topics: [
      "Machine Learning and Deep Learning",
      "Generative AI and Large Language Models",
      "Computer Vision and Image Analytics",
      "Natural Language Processing and Text Mining",
      "Reinforcement Learning and Decision Systems",
      "Data Mining and Knowledge Discovery",
      "Big Data and Data Engineering",
      "Data-Driven Forecasting and Time-Series Analytics",
      "Explainable and Responsible AI",
      "AI for Cybersecurity and Privacy",
      "Cloud, Edge and Distributed AI",
      "MLOps, AutoML and AI Systems Engineering"
    ]
  },
  {
    number: "02",
    category: "track-2",
    title: "Machine Intelligence for Semiconductor, VLSI, Antenna & Electromagnetic Systems",
    icon: Cpu,
    description: "Intelligent EDA, RF metamaterials, low-power chip architectures, and electromagnetics.",
    topics: [
      "Machine Learning for VLSI Design and Verification",
      "AI-Assisted Electronic Design Automation",
      "Intelligent Semiconductor Device Modeling",
      "AI for Low-Power VLSI and Embedded Hardware",
      "Hardware Security and Trust using AI/ML",
      "Machine Intelligence for Antenna Design and Optimization",
      "AI/ML for Microwave, mmWave and THz Systems",
      "Machine Learning for Electromagnetic Modeling and Simulation",
      "AI for Metamaterials, Metasurfaces and RF Systems",
      "Intelligent Sensing, Radar and Electromagnetic Imaging",
      "Generative AI and Reinforcement Learning for Hardware Design",
      "Digital Twins, HPC and Edge AI for Semiconductor/EM Systems"
    ]
  },
  {
    number: "03",
    category: "track-3",
    title: "Intelligent Systems for Smart Energy and Power",
    icon: Zap,
    description: "Renewable energy forecasting, smart grid diagnostics, microgrids, EV charging, and power security.",
    topics: [
      "AI/ML for Load, Demand and Price Forecasting",
      "Deep Learning for Renewable Energy Forecasting",
      "Reinforcement Learning for Energy Management and Control",
      "Intelligent Smart Grid Monitoring and Fault Detection",
      "Energy IoT and Edge Intelligence",
      "Digital Twins for Power Systems",
      "AI for Microgrid and Distributed Energy Resource Management",
      "Optimization for Power System Scheduling",
      "Intelligent EV Charging and Vehicle-to-Grid Systems",
      "Blockchain and Cybersecurity for Smart Energy",
      "Big Data and Smart Metering Analytics",
      "Predictive Maintenance and Decision Support for Power Systems"
    ]
  },
  {
    number: "04",
    category: "track-4",
    title: "Business Analytics and Management Information Systems",
    icon: BarChart3,
    description: "Enterprise decision systems, predictive analytics, fintech, and digital transformation.",
    topics: [
      "Business Intelligence and Data Warehousing",
      "Predictive and Prescriptive Analytics",
      "Machine Learning for Business Decisions",
      "NLP and LLMs in Business",
      "Recommender Systems and Personalization",
      "Customer and Marketing Analytics",
      "Fraud Detection and Risk Analytics",
      "Fintech and Blockchain Analytics",
      "Supply Chain and Operations Analytics",
      "Decision Support and Enterprise Systems",
      "Digital Transformation and E-Governance",
      "Data Governance, Ethics and Cybersecurity in Business"
    ]
  },
  {
    number: "05",
    category: "track-5",
    title: "Health Informatics and Rehabilitation Engineering",
    icon: Activity,
    description: "Clinical decision support, wearable sensors, biomechanics, neuro-rehab, assistive exoskeletons, and telehealth.",
    topics: [
      "AI/ML for Clinical Decision Support",
      "Deep Learning for Medical Imaging and Rehabilitation",
      "Health Data Mining and EHR Analytics",
      "NLP and LLMs for Clinical Text",
      "Wearable Sensors and Biomedical Signal Processing",
      "IoT and Edge Intelligence for Remote Monitoring",
      "Tele-rehabilitation, Telehealth and mHealth",
      "Human Motion Analysis and Biomechanics",
      "AI in Physiotherapy and Personalized Rehabilitation",
      "VR/AR/XR and Serious Games for Therapy",
      "Assistive Technology, Exoskeletons and Prosthetics",
      "Health Data Privacy, Security and Ethics"
    ]
  },
  {
    number: "06",
    category: "track-6",
    title: "Scientific Computing, Physics and Chemistry for Sustainable Innovation",
    icon: Microscope,
    description: "Physics-informed neural networks, quantum computing, materials discovery, and molecular simulations.",
    topics: [
      "Scientific Machine Learning and Physics-Informed Neural Networks",
      "Numerical Algorithms and High-Performance Computing",
      "Quantum Computing for Physics and Chemistry",
      "Computational Physics and Chemistry",
      "Materials Informatics and AI-Driven Discovery",
      "Drug Discovery and Bioinformatics",
      "Climate Informatics and Environmental Data Science",
      "Digital Twins for Scientific Systems",
      "AI for Renewable Energy and Sustainable Materials",
      "Scientific Data Management and Reproducibility",
      "Scientific Visualization and Visual Analytics",
      "Uncertainty Quantification and Surrogate Modeling"
    ]
  }
];

const importantDates = [
  {
    title: "Paper Submission Portal Opens",
    date: "Announced Soon",
    detail: "Full paper submission portal goes live for all six technical tracks.",
    highlight: true
  },
  {
    title: "Full Manuscript Submission Deadline",
    date: "Announced Soon",
    detail: "Deadline for research manuscripts across all conference tracks."
  },
  {
    title: "Notification of Acceptance",
    date: "Announced Soon",
    detail: "Formal peer-review evaluation reports and acceptance notices dispatched."
  },
  {
    title: "Author Registration Deadline",
    date: "Announced Soon",
    detail: "Mandatory author registration cut-off to secure publication in proceedings.",
    highlight: true
  },
  {
    title: "Camera-Ready Final Submission",
    date: "Announced Soon",
    detail: "Final revised manuscripts and copyright transfer submissions due."
  },
  {
    title: "CONVERGIA 2026 Conference Dates",
    date: "Schedule 2026",
    detail: "Hybrid International Conference (Offline at UEM Jaipur & Online Virtual Sessions).",
    highlight: true
  }
];

const indianFees = [
  { category: "Faculty / Academician / Post Doc / Researcher", amount: "₹13,000", notes: "Includes full paper presentation, publication & conference kit" },
  { category: "UG / PG Students", amount: "₹12,000", notes: "Student ID verification required; covers presentation & publication" },
  { category: "Participant (only)", amount: "₹5,000", notes: "Access to all technical sessions, keynote lectures, and attendance certificate" }
];

const foreignFees = [
  { category: "Faculty / Academician / Post Doc / Researcher", amount: "$200", notes: "International delegate registration with hybrid online presentation options" },
  { category: "UG / PG Students", amount: "$100", notes: "International student concession rate upon verification" },
  { category: "Participant (only)", amount: "$50", notes: "Virtual attendance and access to digital conference proceedings" }
];

const committeeData = [
  // Chief Patrons
  {
    name: "Prof. (Dr.) Banani Chakrabarti",
    role: "Chief Patron",
    category: "patrons",
    designation: "Chancellor",
    affiliation: "University of Engineering & Management (UEM), Jaipur",
    initials: "BC"
  },
  {
    name: "Prof. (Dr.) Satyajit Chakrabarti",
    role: "Chief Patron",
    category: "patrons",
    designation: "Director",
    affiliation: "Institute of Engineering & Management (IEM) / UEM Group",
    initials: "SC",
    photo: "/images/committee/satyajit-chakrabarti.jpg"
  },
  // Patrons
  {
    name: "Prof. (Dr.) Biswajoy Chatterjee",
    role: "Patron",
    category: "patrons",
    designation: "Vice Chancellor",
    affiliation: "University of Engineering & Management (UEM), Jaipur",
    initials: "BC",
    photo: "/images/committee/biswajoy-chatterjee.jpg"
  },
  {
    name: "Prof. (Dr.) Pradeep Kumar Sharma",
    role: "Patron",
    category: "patrons",
    designation: "Registrar",
    affiliation: "University of Engineering & Management (UEM), Jaipur",
    initials: "PS"
  },
  // Conference Chair
  {
    name: "Prof. Sourav Chakraborty",
    role: "Conference Chair",
    category: "organizing",
    designation: "Professor",
    affiliation: "University of Engineering & Management (UEM), Jaipur",
    initials: "SC"
  },
  // Convener
  {
    name: "Prof. (Dr.) Mukesh Yadav",
    role: "Convener",
    category: "organizing",
    designation: "Professor",
    affiliation: "University of Engineering & Management (UEM), Jaipur",
    initials: "MY"
  },
  // Co-Conveners
  {
    name: "Prof. Dipta Mukherjee",
    role: "Co-Convener",
    category: "organizing",
    designation: "Professor",
    affiliation: "University of Engineering & Management (UEM), Jaipur",
    initials: "DM",
    photo: "/images/committee/dipta-mukherjee.jpg"
  },
  {
    name: "Prof. Surajit Sur",
    role: "Co-Convener",
    category: "organizing",
    designation: "Professor",
    affiliation: "University of Engineering & Management (UEM), Jaipur",
    initials: "SS",
    photo: "/images/committee/surajit-sur.jpg"
  },
  // TPC Chair
  {
    name: "Prof. Debajyoti Chatterjee",
    role: "TPC Chair",
    category: "tpc",
    designation: "Professor",
    affiliation: "University of Engineering & Management (UEM), Jaipur",
    initials: "DC",
    photo: "/images/committee/debajyoti-chatterjee.jpg"
  },
  // Publication Chairs
  {
    name: "Dr. Arnab Palui",
    role: "Publication Chair",
    category: "publication",
    designation: "Faculty & Researcher",
    affiliation: "University of Engineering & Management (UEM), Jaipur",
    initials: "AP"
  },
  {
    name: "Dr. Anamika Khaskel",
    role: "Publication Chair",
    category: "publication",
    designation: "Faculty & Researcher",
    affiliation: "University of Engineering & Management (UEM), Jaipur",
    initials: "AK"
  },
  // Editorial Board
  {
    name: "Dr. Tapas Si",
    role: "Editorial Board",
    category: "publication",
    designation: "Faculty & Editorial Lead",
    affiliation: "University of Engineering & Management (UEM), Jaipur",
    initials: "TS"
  }
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

  // Particle Canvas effect (Warm evergreen & terracotta particles on paper)
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

    const count = Math.min(48, Math.floor(width / 26));
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
    ? committeeData
    : committeeData.filter(m => m.category === activeCommitteeFilter);

  return (
    <div className="site-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* TWO-TIER HEADER */}
      <header className="site-header-two-tier" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        {/* Tier 1: Logo & University Bar */}
        <div className="header-top-logo-bar" style={{ padding: '8px 24px' }}>
          <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <img src="/images/uem-logo.png" alt="UEM Jaipur" style={{ height: '32px', objectFit: 'contain' }} onError={(e) => { e.target.style.display = 'none'; }} />
              <div style={{ borderLeft: '1px solid rgba(244, 241, 233, 0.3)', paddingLeft: '12px' }}>
                <span style={{ fontSize: '11px', letterSpacing: '0.08em', fontWeight: 600, display: 'block', textTransform: 'uppercase' }}>
                  University of Engineering & Management (UEM), Jaipur
                </span>
                <span style={{ fontSize: '10px', opacity: 0.85, letterSpacing: '0.05em' }}>
                  Approved International Academic Conference · Hybrid (Online & Offline)
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
              <span style={{ fontSize: '11px', opacity: 0.9 }}>Proceedings Plan: Springer · Atlantis Press · Scopus · WoS</span>
              <div className="brand-badge-pill" style={{ background: 'rgba(255, 255, 255, 0.12)', padding: '4px 12px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>
                CONVERGIA 2026 · JAIPUR
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
                C
              </span>
              <span style={{ fontWeight: 700, fontSize: '16px', letterSpacing: '0.04em', color: '#244b3c' }}>
                CONVERGIA<span style={{ color: '#c76d42' }}>–2026</span>
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
                Register Interest <ArrowUpRight size={14} />
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
                  <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 0.85fr', gap: '48px', alignItems: 'center' }}>
                    {/* Left Column */}
                    <div>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(36, 75, 60, 0.08)', border: '1px solid #d8d4c9', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, color: '#244b3c', marginBottom: '18px' }}>
                        <Sparkles size={14} color="#c76d42" />
                        <span>FLAGSHIP ACADEMIC CONFERENCE · UEM JAIPUR</span>
                      </div>

                      <div className="hero-title-wrap" style={{ marginBottom: '14px' }}>
                        <h1 style={{ fontSize: 'clamp(38px, 5vw, 62px)', lineHeight: 1.08, margin: 0, fontWeight: 700, letterSpacing: '-0.02em' }}>
                          <span className="hero-title-brand">CONVERGIA</span>
                          <span className="hero-title-year"> 2026</span>
                        </h1>
                      </div>

                      <div className="hero-conf-lead" style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#74786f', marginBottom: '10px' }}>
                        International Conference on
                      </div>

                      <h2 style={{ fontSize: '19px', color: '#244b3c', fontWeight: 600, lineHeight: 1.4, margin: '0 0 14px', fontFamily: 'Playfair Display' }}>
                        Next-generation VLSI, Energy, Rehabilitation, Green Computing, Intelligence & Analytics
                      </h2>

                      <p className="hero-subtitle" style={{ fontSize: '15px', color: '#3c443c', maxWidth: '620px', marginBottom: '26px', lineHeight: 1.6, fontStyle: 'italic' }}>
                        "{conf.theme}"
                      </p>

                      {/* Meta chips */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '16px', marginBottom: '32px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', background: '#faf8f3', border: '1px solid #d8d4c9', padding: '12px 16px', borderRadius: '8px' }}>
                          <div className="meta-icon-bubble" style={{ width: '40px', height: '40px', borderRadius: '8px', display: 'grid', placeItems: 'center' }}>
                            <Calendar size={18} />
                          </div>
                          <div>
                            <small style={{ display: 'block', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#74786f' }}>SCHEDULE</small>
                            <strong style={{ fontSize: '14px', color: '#202720' }}>{conf.dates}</strong>
                            <span style={{ display: 'block', fontSize: '11px', color: '#c76d42' }}>{conf.format}</span>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', background: '#faf8f3', border: '1px solid #d8d4c9', padding: '12px 16px', borderRadius: '8px' }}>
                          <div className="meta-icon-bubble" style={{ width: '40px', height: '40px', borderRadius: '8px', display: 'grid', placeItems: 'center' }}>
                            <MapPin size={18} />
                          </div>
                          <div>
                            <small style={{ display: 'block', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#74786f' }}>ORGANIZING VENUE</small>
                            <strong style={{ fontSize: '14px', color: '#202720' }}>UEM Jaipur Campus</strong>
                            <span style={{ display: 'block', fontSize: '11px', color: '#74786f' }}>Sikar Road, Jaipur, Rajasthan</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
                        <button
                          type="button"
                          className="btn-primary"
                          onClick={() => handleTabChange('tracks')}
                          style={{ padding: '12px 24px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                        >
                          Explore 06 Tracks <Layers size={16} />
                        </button>
                        <button
                          type="button"
                          className="btn-outline"
                          onClick={() => handleTabChange('publication')}
                          style={{ padding: '12px 22px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                        >
                          Publication Plan <FileText size={16} />
                        </button>
                        <button
                          type="button"
                          className="btn-outline"
                          onClick={() => handleTabChange('registration')}
                          style={{ padding: '12px 20px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                        >
                          Registration Fees <ArrowUpRight size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Right Column: Visual Carousel */}
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

              {/* PUBLICATION PARTNERS MARQUEE */}
              <section className="floating-marquee-section" style={{ padding: '40px 0' }}>
                <div className="container" style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <span className="floating-marquee-eyebrow" style={{ fontSize: '11px', letterSpacing: '0.14em', fontWeight: 600, textTransform: 'uppercase' }}>
                    CONFERENCE PROCEEDINGS & INDEXING
                  </span>
                  <h2 className="floating-marquee-title" style={{ fontSize: '24px', margin: '6px 0 0' }}>
                    Publication Plan & Indexing Partners
                  </h2>
                </div>

                <div style={{ overflow: 'hidden', display: 'flex', width: '100%' }}>
                  <div className="floating-marquee-track" style={{ display: 'flex', gap: '20px', animation: 'marqueeContinuous 25s linear infinite' }}>
                    {[...publicationPartners, ...publicationPartners, ...publicationPartners].map((p, idx) => (
                      <div
                        key={idx}
                        className="marquee-logo-card"
                        style={{
                          flexShrink: 0, width: '260px', padding: '16px 20px', borderRadius: '8px',
                          display: 'flex', alignItems: 'center', gap: '16px'
                        }}
                      >
                        <img src={p.img} alt={p.name} style={{ width: '56px', height: '42px', objectFit: 'contain' }} />
                        <div>
                          <strong style={{ display: 'block', fontSize: '13px', color: '#244b3c', lineHeight: 1.3 }}>{p.name}</strong>
                          <span style={{ fontSize: '11px', color: '#c76d42', fontWeight: 500 }}>{p.role}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* OVERVIEW TEASER & TRACKS SUMMARY */}
              <section style={{ padding: '60px 0', background: '#faf8f3', borderTop: '1px solid #d8d4c9' }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '40px', alignItems: 'center' }}>
                  <div>
                    <span style={{ color: '#c76d42', fontSize: '11px', letterSpacing: '0.12em', fontWeight: 700, textTransform: 'uppercase' }}>
                      CONFERENCE PURPOSE & SCOPE
                    </span>
                    <h2 style={{ fontSize: '32px', color: '#244b3c', margin: '8px 0 16px', fontFamily: 'Playfair Display' }}>
                      Bridging Intelligence & Emerging Technologies
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
                        Read Full Proposal →
                      </button>
                      <button
                        type="button"
                        className="btn-outline"
                        onClick={() => handleTabChange('committee')}
                        style={{ padding: '10px 20px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer' }}
                      >
                        Organizing Leadership
                      </button>
                    </div>
                  </div>

                  <div style={{ background: '#ffffff', border: '1px solid #d8d4c9', borderRadius: '10px', padding: '28px', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                      <Layers size={22} color="#c76d42" />
                      <h3 style={{ margin: 0, fontSize: '18px', color: '#244b3c', fontFamily: 'Playfair Display' }}>
                        06 Comprehensive Tracks
                      </h3>
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {tracks.map((t) => (
                        <li key={t.number} style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '10px', color: '#202720' }}>
                          <span style={{ background: 'rgba(36, 75, 60, 0.1)', color: '#244b3c', padding: '2px 6px', borderRadius: '3px', fontWeight: 700, fontSize: '10px' }}>
                            T{t.number}
                          </span>
                          <span style={{ fontWeight: 500 }}>{t.title}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      className="btn-amber"
                      onClick={() => handleTabChange('tracks')}
                      style={{ width: '100%', padding: '10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', textAlign: 'center' }}
                    >
                      View All Tracks & Detailed Topics →
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
                <div style={{ maxWidth: '840px', margin: '0 auto' }}>
                  <span style={{ color: '#c76d42', fontSize: '12px', letterSpacing: '0.14em', fontWeight: 700, textTransform: 'uppercase' }}>
                    PROPOSAL FOR APPROVAL
                  </span>
                  <h1 style={{ fontSize: '38px', color: '#244b3c', margin: '8px 0 16px', fontFamily: 'Playfair Display' }}>
                    CONVERGIA 2026
                  </h1>
                  <h3 style={{ fontSize: '20px', color: '#244b3c', margin: '0 0 20px', lineHeight: 1.4, fontFamily: 'Playfair Display' }}>
                    {conf.fullTitle}
                  </h3>
                  <div style={{ background: '#faf8f3', borderLeft: '4px solid #c76d42', padding: '16px 20px', borderRadius: '4px', marginBottom: '28px' }}>
                    <strong style={{ display: 'block', fontSize: '12px', color: '#74786f', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
                      Conference Theme
                    </strong>
                    <span style={{ fontSize: '16px', color: '#244b3c', fontWeight: 600 }}>
                      "{conf.theme}"
                    </span>
                  </div>

                  <p style={{ fontSize: '15px', color: '#404840', lineHeight: 1.8, marginBottom: '32px' }}>
                    {conf.overview}
                  </p>

                  {/* Mode & Venue Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginTop: '36px' }}>
                    <div style={{ background: '#ffffff', border: '1px solid #d8d4c9', borderRadius: '10px', padding: '28px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', color: '#244b3c' }}>
                        <Building2 size={20} />
                        <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                          ORGANIZING INSTITUTION
                        </span>
                      </div>
                      <h3 style={{ fontSize: '20px', color: '#244b3c', margin: '0 0 10px', fontFamily: 'Playfair Display' }}>
                        UEM Jaipur
                      </h3>
                      <p style={{ fontWeight: 600, color: '#c76d42', fontSize: '14px', marginBottom: '10px' }}>
                        University of Engineering & Management, Jaipur, Rajasthan
                      </p>
                      <p style={{ fontSize: '13px', color: '#404840', lineHeight: 1.6 }}>
                        Established by the renowned IEM-UEM Group, UEM Jaipur is an accredited institution providing advanced technical education and world-class research facilities across computer science, engineering, management, and health sciences.
                      </p>
                    </div>

                    <div style={{ background: '#ffffff', border: '1px solid #d8d4c9', borderRadius: '10px', padding: '28px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', color: '#c76d42' }}>
                        <MonitorCheck size={20} />
                        <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                          MODE OF CONFERENCE
                        </span>
                      </div>
                      <h3 style={{ fontSize: '20px', color: '#244b3c', margin: '0 0 10px', fontFamily: 'Playfair Display' }}>
                        Offline & Online (Hybrid)
                      </h3>
                      <p style={{ fontWeight: 600, color: '#244b3c', fontSize: '14px', marginBottom: '10px' }}>
                        Flexible international participation format
                      </p>
                      <p style={{ fontSize: '13px', color: '#404840', lineHeight: 1.6 }}>
                        Authors and participants can choose between in-person physical sessions at the UEM Jaipur campus or interactive virtual participation, enabling widespread international collaboration.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TRACKS TAB (6 TRACKS) */}
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
                <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 36px' }}>
                  <span style={{ color: '#c76d42', fontSize: '12px', letterSpacing: '0.14em', fontWeight: 700, textTransform: 'uppercase' }}>
                    INTERDISCIPLINARY SCOPE
                  </span>
                  <h1 style={{ fontSize: '36px', color: '#244b3c', margin: '8px 0 12px', fontFamily: 'Playfair Display' }}>
                    06 Technical Conference Tracks
                  </h1>
                  <p style={{ color: '#74786f', fontSize: '15px' }}>
                    Select a track to examine its research focus areas, subtopics, and publication avenues.
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

                        <h3 style={{ fontSize: '19px', lineHeight: 1.35, margin: '0 0 12px' }}>
                          {track.title}
                        </h3>

                        <p style={{ color: '#74786f', fontSize: '13px', lineHeight: 1.6, marginBottom: '20px' }}>
                          {track.description}
                        </p>

                        <div style={{ borderTop: '1px solid #d8d4c9', paddingTop: '16px', marginTop: 'auto' }}>
                          <h4 style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#c76d42', margin: '0 0 10px' }}>
                            Included Topics ({track.topics.length})
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

          {/* PUBLICATION PLAN TAB */}
          {activeTab === 'publication' && (
            <motion.div
              key="publication"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              style={{ padding: '60px 0' }}
            >
              <div className="container" style={{ maxWidth: '880px' }}>
                <span style={{ color: '#c76d42', fontSize: '12px', letterSpacing: '0.14em', fontWeight: 700, textTransform: 'uppercase' }}>
                  PROCEEDINGS & INDEXATION
                </span>
                <h1 style={{ fontSize: '36px', color: '#244b3c', margin: '8px 0 16px', fontFamily: 'Playfair Display' }}>
                  Publication Plan
                </h1>
                <p style={{ fontSize: '16px', lineHeight: 1.7, color: '#3c443c', marginBottom: '28px' }}>
                  The conference proceedings of <strong>CONVERGIA 2026</strong> will be published with renowned international publishers and indexed in world-leading citation databases.
                </p>

                {/* 4 Publisher Cards with Logos */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', marginBottom: '40px' }}>
                  {publicationPartners.map((partner, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: '#ffffff', border: '1px solid #d8d4c9', borderRadius: '10px',
                        padding: '24px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                      }}
                    >
                      <div style={{ height: '70px', display: 'grid', placeItems: 'center', marginBottom: '16px' }}>
                        <img src={partner.img} alt={partner.name} style={{ maxHeight: '55px', maxWidth: '100%', objectFit: 'contain' }} />
                      </div>
                      <h4 style={{ fontSize: '17px', color: '#244b3c', margin: '0 0 6px', fontFamily: 'Playfair Display' }}>
                        {partner.name}
                      </h4>
                      <p style={{ fontSize: '12px', color: '#74786f', margin: 0 }}>
                        {partner.role}
                      </p>
                    </div>
                  ))}
                </div>

                <div style={{ background: '#faf8f3', border: '1px solid #d8d4c9', borderRadius: '10px', padding: '24px 28px', marginBottom: '28px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <Sparkles size={18} color="#c76d42" />
                    <h4 style={{ margin: 0, fontSize: '15px', color: '#244b3c', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Springer Manuscript Format
                    </h4>
                  </div>
                  <p style={{ fontSize: '14px', color: '#404840', lineHeight: 1.6, margin: 0 }}>
                    Students and presenting authors will be encouraged to format their original research papers using standard <strong>Springer conference manuscript guidelines and templates</strong>.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => handleTabChange('tracks')}
                    style={{ padding: '12px 24px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
                  >
                    View 06 Tracks Scope →
                  </button>
                  <button
                    type="button"
                    className="btn-outline"
                    onClick={() => handleTabChange('registration')}
                    style={{ padding: '12px 24px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
                  >
                    View Registration Fee Structure
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* DATES TAB */}
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
                    PROPOSED SCHEDULE
                  </span>
                  <h1 style={{ fontSize: '36px', color: '#244b3c', margin: '8px 0 12px', fontFamily: 'Playfair Display' }}>
                    Important Dates & Milestones
                  </h1>
                  <p style={{ color: '#74786f', fontSize: '15px' }}>
                    Tentative Schedule: 2026 · Dates to be decided and announced soon.
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
                    APPROVED REGISTRATION TARIFF
                  </span>
                  <h1 style={{ fontSize: '36px', color: '#244b3c', margin: '8px 0 12px', fontFamily: 'Playfair Display' }}>
                    Registration Fees
                  </h1>
                  <p style={{ color: '#74786f', fontSize: '15px' }}>
                    Approved fee structure for Indian Participants (INR) and Foreign Participants (USD $).
                  </p>
                </div>

                {/* Indian Participants Table */}
                <div style={{ marginBottom: '36px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <span style={{ background: '#244b3c', color: '#f4f1e9', padding: '3px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em' }}>
                      CATEGORY 1
                    </span>
                    <h3 style={{ margin: 0, fontSize: '18px', color: '#244b3c', fontFamily: 'Playfair Display' }}>
                      Indian Participants (INR ₹)
                    </h3>
                  </div>

                  <div className="table-container" style={{ borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
                    <table className="reg-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                      <thead>
                        <tr>
                          <th style={{ padding: '16px 20px', fontSize: '13px', fontWeight: 700 }}>Participant Category</th>
                          <th style={{ padding: '16px 20px', fontSize: '13px', fontWeight: 700 }}>Notes & Eligibility</th>
                          <th style={{ padding: '16px 20px', fontSize: '13px', fontWeight: 700, color: '#c76d42', textAlign: 'right' }}>Amount (INR)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {indianFees.map((row, idx) => (
                          <tr key={idx}>
                            <td style={{ padding: '16px 20px', fontSize: '14px', fontWeight: 600 }}>{row.category}</td>
                            <td style={{ padding: '16px 20px', fontSize: '12px', color: '#74786f' }}>{row.notes}</td>
                            <td style={{ padding: '16px 20px', fontSize: '16px', fontWeight: 700, color: '#244b3c', textAlign: 'right' }}>{row.amount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Foreign Participants Table */}
                <div style={{ marginBottom: '36px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <span style={{ background: '#c76d42', color: '#ffffff', padding: '3px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em' }}>
                      CATEGORY 2
                    </span>
                    <h3 style={{ margin: 0, fontSize: '18px', color: '#244b3c', fontFamily: 'Playfair Display' }}>
                      Foreign Participants (USD $)
                    </h3>
                  </div>

                  <div className="table-container" style={{ borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
                    <table className="reg-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                      <thead>
                        <tr>
                          <th style={{ padding: '16px 20px', fontSize: '13px', fontWeight: 700 }}>Participant Category</th>
                          <th style={{ padding: '16px 20px', fontSize: '13px', fontWeight: 700 }}>Notes & Eligibility</th>
                          <th style={{ padding: '16px 20px', fontSize: '13px', fontWeight: 700, color: '#c76d42', textAlign: 'right' }}>Amount (USD $)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {foreignFees.map((row, idx) => (
                          <tr key={idx}>
                            <td style={{ padding: '16px 20px', fontSize: '14px', fontWeight: 600 }}>{row.category}</td>
                            <td style={{ padding: '16px 20px', fontSize: '12px', color: '#74786f' }}>{row.notes}</td>
                            <td style={{ padding: '16px 20px', fontSize: '16px', fontWeight: 700, color: '#244b3c', textAlign: 'right' }}>{row.amount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div style={{ background: '#faf8f3', border: '1px solid #d8d4c9', borderRadius: '8px', padding: '20px 24px' }}>
                  <h4 style={{ fontSize: '13px', color: '#244b3c', margin: '0 0 8px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    Important Registration Guidelines
                  </h4>
                  <p style={{ fontSize: '12px', color: '#74786f', lineHeight: 1.6, margin: 0 }}>
                    • Each accepted manuscript must be accompanied by at least one full author registration.<br />
                    • Student registration requires proof of current academic enrollment (valid institutional student identity card).<br />
                    • In-person registration covers conference kit, lunches, tea breaks, and session access; online delegates receive digital credentials and certificates.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* COMMITTEES TAB */}
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
                    ORGANIZATIONAL STRUCTURE
                  </span>
                  <h1 style={{ fontSize: '36px', color: '#244b3c', margin: '8px 0 12px', fontFamily: 'Playfair Display' }}>
                    Conference Leadership & Committee
                  </h1>
                  <p style={{ color: '#74786f', fontSize: '15px' }}>
                    Official organizational structure approved for CONVERGIA 2026 at UEM Jaipur.
                  </p>
                </div>

                {/* Filter Bar */}
                <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '40px' }}>
                  {[
                    { id: 'all', label: 'All Committee Members' },
                    { id: 'patrons', label: 'Chief Patrons & Patrons' },
                    { id: 'organizing', label: 'Chairs & Conveners' },
                    { id: 'tpc', label: 'Technical Program Chair' },
                    { id: 'publication', label: 'Publication & Editorial' }
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
                  {filteredCommittee.map((member, idx) => (
                    <div
                      key={idx}
                      className="committee-photo-card"
                      style={{ borderRadius: '10px', overflow: 'hidden', padding: '24px 20px', textAlign: 'center' }}
                    >
                      <div style={{ width: '84px', height: '84px', margin: '0 auto 16px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #244b3c', background: '#244b3c', position: 'relative' }}>
                        {member.photo ? (
                          <img
                            src={member.photo}
                            alt={member.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'grid';
                            }}
                          />
                        ) : null}
                        <div style={{ display: member.photo ? 'none' : 'grid', position: 'absolute', inset: 0, placeItems: 'center', background: '#244b3c', color: '#f4f1e9', fontWeight: 700, fontSize: '22px' }}>
                          {member.initials}
                        </div>
                      </div>

                      <span className="committee-role-badge" style={{ display: 'inline-block', padding: '3px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: 700, marginBottom: '8px' }}>
                        {member.role}
                      </span>

                      <h4 className="committee-member-name" style={{ fontSize: '16px', margin: '0 0 6px' }}>
                        {member.name}
                      </h4>

                      <p style={{ fontSize: '13px', color: '#74786f', lineHeight: 1.4, margin: '0 0 4px' }}>
                        {member.designation}
                      </p>

                      <p style={{ fontSize: '12px', color: '#244b3c', fontWeight: 600, margin: 0 }}>
                        {member.affiliation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* VENUE & MODE TAB */}
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
                    Conference Venue & Mode
                  </h1>
                  <p style={{ color: '#74786f', fontSize: '15px' }}>
                    University of Engineering & Management (UEM), Jaipur · Hybrid Offline & Online
                  </p>
                </div>

                {/* Hybrid Mode Highlight Banner */}
                <div style={{ background: '#244b3c', color: '#f4f1e9', borderRadius: '10px', padding: '24px 32px', marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                  <div>
                    <span style={{ background: '#c76d42', color: '#ffffff', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      HYBRID PARTICIPATION
                    </span>
                    <h3 style={{ margin: '8px 0 4px', fontSize: '20px', fontFamily: 'Playfair Display', color: '#f4f1e9' }}>
                      Offline On-Campus & Online Virtual Access
                    </h3>
                    <p style={{ margin: 0, fontSize: '13px', opacity: 0.9 }}>
                      Authors and delegates can attend either in person in Jaipur or via live interactive digital video tracks.
                    </p>
                  </div>
                  <div style={{ border: '1px solid rgba(255,255,255,0.3)', padding: '10px 18px', borderRadius: '6px', fontSize: '12px', fontWeight: 600 }}>
                    Hybrid Format · 2026
                  </div>
                </div>

                {/* Google Map Embed of UEM Jaipur */}
                <div className="venue-map-iframe-container" style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid #d8d4c9', marginBottom: '32px', height: '380px' }}>
                  <iframe
                    title="Google Map - UEM Jaipur"
                    src="https://maps.google.com/maps?q=University+of+Engineering+and+Management+Jaipur&t=&z=14&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                  />
                </div>

                {/* Venue Details Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
                  <div style={{ background: '#ffffff', border: '1px solid #d8d4c9', borderRadius: '8px', padding: '22px' }}>
                    <h4 style={{ color: '#244b3c', fontSize: '15px', margin: '0 0 6px', fontFamily: 'Playfair Display' }}>Full Campus Address</h4>
                    <p style={{ fontSize: '13px', color: '#404840', lineHeight: 1.5, margin: 0 }}>
                      {conf.venueAddress}
                    </p>
                  </div>

                  <div style={{ background: '#ffffff', border: '1px solid #d8d4c9', borderRadius: '8px', padding: '22px' }}>
                    <h4 style={{ color: '#244b3c', fontSize: '15px', margin: '0 0 6px', fontFamily: 'Playfair Display' }}>Airport Connectivity</h4>
                    <p style={{ fontSize: '13px', color: '#404840', lineHeight: 1.5, margin: 0 }}>
                      Jaipur International Airport (JAI) connects major international and domestic hubs with frequent daily flights.
                    </p>
                  </div>

                  <div style={{ background: '#ffffff', border: '1px solid #d8d4c9', borderRadius: '8px', padding: '22px' }}>
                    <h4 style={{ color: '#244b3c', fontSize: '15px', margin: '0 0 6px', fontFamily: 'Playfair Display' }}>Railway & Expressway</h4>
                    <p style={{ fontSize: '13px', color: '#404840', lineHeight: 1.5, margin: 0 }}>
                      Jaipur Junction railway station and NH-52 (Sikar Road) expressway provide seamless connectivity.
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
                  C
                </span>
                <div>
                  <strong style={{ fontSize: '16px', color: '#ffffff', display: 'block', letterSpacing: '0.04em' }}>
                    {conf.title}
                  </strong>
                  <span style={{ fontSize: '11px', color: '#a8b5a7' }}>International Conference · UEM Jaipur</span>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: '#a8b5a7', lineHeight: 1.6, maxWidth: '340px' }}>
                {conf.fullTitle}.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 style={{ fontSize: '14px', margin: '0 0 16px', letterSpacing: '0.06em' }}>Quick Navigation</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['home', 'about', 'tracks', 'publication'].map((id) => (
                  <li key={id}>
                    <button
                      type="button"
                      onClick={() => handleTabChange(id)}
                      style={{ background: 'none', border: 'none', color: '#a8b5a7', fontSize: '13px', cursor: 'pointer', padding: 0 }}
                    >
                      {id === 'tracks' ? '06 Tracks' : id.charAt(0).toUpperCase() + id.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Details & Registration */}
            <div>
              <h4 style={{ fontSize: '14px', margin: '0 0 16px', letterSpacing: '0.06em' }}>Authors & Delegates</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['dates', 'registration', 'committee', 'venue'].map((id) => (
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

            {/* Venue & University */}
            <div>
              <h4 style={{ fontSize: '14px', margin: '0 0 16px', letterSpacing: '0.06em' }}>Organizing Venue</h4>
              <p style={{ fontSize: '13px', color: '#a8b5a7', lineHeight: 1.6, margin: 0 }}>
                <strong style={{ color: '#ffffff' }}>{conf.venueName}</strong><br />
                {conf.venueAddress}<br />
                <strong style={{ color: '#ffffff' }}>Mode:</strong> {conf.format}
              </p>
            </div>
          </div>

          <div className="footer-bottom" style={{ paddingTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', fontSize: '12px' }}>
            <span>© 2026 CONVERGIA 2026 · University of Engineering & Management (UEM), Jaipur</span>
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

fs.writeFileSync('src/main.jsx', code);
console.log('src/main.jsx updated with official CONVERGIA 2026 proposal details!');
