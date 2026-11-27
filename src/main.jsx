import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, MapPin, Sparkles, Clock, ArrowRight, ExternalLink,
  ChevronRight, ChevronLeft, Download, FileText, CheckCircle2,
  Award, Users, Layers, Globe2, Mail, Phone, Menu, X,
  BookOpen, ShieldCheck, Cpu, Wifi, Atom, Send, ArrowUpRight,
  Building2, Check, AlertCircle, Compass, Zap, Activity, Microscope, BarChart3,
  MonitorCheck, Home, ChevronDown
} from 'lucide-react';
import './styles.css';

// CONVERGIA 2027 Official Proposal Metadata
const conf = {
  title: "CONVERGIA 2027",
  fullTitle: "International Conference on Next-generation VLSI, Energy, Rehabilitation, Green Computing, Intelligence & Analytics",
  theme: "Converging Intelligence and Emerging Technologies for a Sustainable Digital Future",
  host: "University of Engineering and Management (UEM), Jaipur",
  dates: "2027 (Dates to be announced soon)",
  format: "Offline & Online (Hybrid) Participation",
  venueShort: "UEM Jaipur Campus, Rajasthan",
  venueName: "University of Engineering & Management (UEM), Jaipur",
  venueAddress: "GURUKUL, Sikar Road, Near Udaipuria Mod, Jaipur, Rajasthan – 303807, India",
  overview: "CONVERGIA 2027 is an international flagship conference uniting leading academicians, researchers, practitioners, and industry experts. The conference aims to bridge cutting-edge research across artificial intelligence, semiconductor & VLSI, smart energy systems, business intelligence, health informatics, and scientific computing for sustainable technological progress.",
  callForPapers: "Researchers, academicians, post-docs, students, and industry professionals are cordially invited to submit original, high-quality research manuscripts across any of the six technical tracks. Submissions undergo a rigorous peer-review evaluation process."
};

const navLinks = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'tracks', label: 'Tracks', href: '#tracks' },
  { id: 'publication', label: 'Publication', href: '#publication' },
  { id: 'dates', label: 'Dates', href: '#dates' },
  { id: 'registration', label: 'Registration', href: '#registration' },
  { id: 'committee', label: 'Committee', href: '#committee' },
  { id: 'venue', label: 'Venue', href: '#venue' }
];

const tickerItems = [
  "CONVERGIA 2027 | International Conference on Next-generation VLSI, Energy, Rehabilitation, Green Computing, Intelligence & Analytics.",
  "Theme: 'Converging Intelligence and Emerging Technologies for a Sustainable Digital Future'.",
  "Mode: Offline & Online (Hybrid) Participation hosted at University of Engineering & Management (UEM), Jaipur.",
  "Proceedings Plan: Atlantis Press, Springer Nature, Scopus & Clarivate Web of Science indexation.",
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
  { role: "Conference Edition", name: "CONVERGIA 2027", detail: "Flagship International Conference" },
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
    title: "CONVERGIA 2027 Conference Dates",
    date: "Schedule 2027",
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

// Official CONVERGIA 2027 Committee Hierarchy & Leadership Structure
const committeeFilters = [
  { id: 'all', label: 'All Hierarchy Tiers' },
  { id: 'patrons', label: 'Patrons & Leadership' },
  { id: 'chairs', label: 'Chairs & Convenors' },
  { id: 'tpc', label: 'TPC & Organizing' },
  { id: 'publication', label: 'Publication & Editorial' }
];

const committeeTiers = [
  // Tier 1: Chief Patrons
  {
    tierId: "chief-patrons",
    tierBadge: "Tier 1 • Chief Patrons",
    title: "Chief Patrons",
    subtitle: "Visionary patronage & patron-in-chief leadership",
    filterCategory: "patrons",
    layout: "centered-2",
    members: [
      {
        name: "Prof. (Dr.) Banani Chakrabarti",
        role: "Chief Patron",
        badgeType: "patron",
        designation: "Chancellor",
        affiliation: "University of Engineering & Management (UEM), Jaipur",
        initials: "BC",
        photo: "/images/committee/banani-chakrabarti.jpeg"
      },
      {
        name: "Prof. (Dr.) Satyajit Chakrabarti",
        role: "Chief Patron",
        badgeType: "patron",
        designation: "Director",
        affiliation: "Institute of Engineering & Management (IEM) / UEM Group",
        initials: "SC",
        photo: "/images/committee/satyajit-chakrabarti.jpeg"
      }
    ]
  },
  // Tier 2: Patron
  {
    tierId: "patron",
    tierBadge: "Tier 2 • Patron",
    title: "Patron",
    subtitle: "Institutional leadership & executive direction",
    filterCategory: "patrons",
    layout: "centered-1",
    members: [
      {
        name: "Prof. (Dr.) Biswajoy Chatterjee",
        role: "Patron",
        badgeType: "patron",
        designation: "Vice Chancellor",
        affiliation: "University of Engineering & Management (UEM), Jaipur",
        initials: "BC",
        photo: "/images/committee/biswajoy-chatterjee.jpeg"
      }
    ]
  },
  // Tier 3: Honorary Chairs
  {
    tierId: "honorary-chairs",
    tierBadge: "Tier 3 • Honorary Chairs",
    title: "Honorary Chairs",
    subtitle: "Distinguished academic oversight & honorary advisory",
    filterCategory: "patrons",
    layout: "centered-2",
    members: [
      {
        name: "Prof. (Dr.) Pradeep Kumar Sharma",
        role: "Honorary Chair",
        badgeType: "leadership",
        designation: "Registrar",
        affiliation: "University of Engineering & Management (UEM), Jaipur",
        initials: "PS",
        photo: "/images/committee/pradeep-kumar-sharma.jpeg"
      },
      {
        name: "Prof. (Dr.) Mukesh Yadav",
        role: "Honorary Chair",
        badgeType: "leadership",
        designation: "Professor",
        affiliation: "University of Engineering & Management (UEM), Jaipur",
        initials: "MY",
        photo: "/images/committee/mukesh-yadav.jpeg"
      }
    ]
  },
  // Tier 4: Conference Chair & Convenor
  {
    tierId: "chairs-convenors",
    tierBadge: "Tier 4 • Conference Leadership",
    title: "Conference Chairs & Convenors",
    subtitle: "Executive conference execution & academic convening",
    filterCategory: "chairs",
    layout: "split-columns",
    columns: [
      {
        groupTitle: "Conference Chairs",
        members: [
          {
            name: "Prof. (Dr.) Chandra Prakash",
            role: "Conference Chair",
            badgeType: "chair",
            designation: "Professor",
            affiliation: "University of Engineering & Management (UEM), Jaipur",
            initials: "CP",
            photo: "/images/committee/chandra-prakash.jpeg"
          },
          {
            name: "Prof. Dipta Mukherjee",
            role: "Conference Chair",
            badgeType: "chair",
            designation: "Professor",
            affiliation: "University of Engineering & Management (UEM), Jaipur",
            initials: "DM",
            photo: "/images/committee/dipta-mukherjee.jpeg"
          }
        ]
      },
      {
        groupTitle: "Convenors",
        members: [
          {
            name: "Prof. Debajyoti Chatterjee",
            role: "Convenor",
            badgeType: "convenor",
            designation: "Professor",
            affiliation: "University of Engineering & Management (UEM), Jaipur",
            initials: "DC",
            photo: "/images/committee/debajyoti-chatterjee.jpeg"
          },
          {
            name: "Prof. Surajit Sur",
            role: "Convenor",
            badgeType: "convenor",
            designation: "Professor",
            affiliation: "University of Engineering & Management (UEM), Jaipur",
            initials: "SS",
            photo: "/images/committee/surajit-sur.jpeg"
          }
        ]
      }
    ]
  },
  // Tier 5: TPC Chair
  {
    tierId: "tpc-chair",
    tierBadge: "Tier 5 • Technical Leadership",
    title: "Technical Program Committee (TPC) Chair",
    subtitle: "Technical review standards, track peer-reviews & scholarly rigor",
    filterCategory: "tpc",
    layout: "centered-1",
    members: [
      {
        name: "Dr. S. K. Ghosh",
        role: "TPC Chair",
        badgeType: "tpc",
        designation: "Chief Scientist and Professor",
        affiliation: "CSIR-CEERI Pilani",
        initials: "SG",
        photo: "/images/committee/sk-ghosh.jpg"
      }
    ]
  },
  // Tier 6: Organizing Secretary
  {
    tierId: "organizing-sec",
    tierBadge: "Tier 6 • Secretariat",
    title: "Organizing Secretary",
    subtitle: "Conference operations, secretarial governance & delegate liaison",
    filterCategory: "tpc",
    layout: "centered-1",
    members: [
      {
        name: "Prof. Sourav Chakraborty",
        role: "Organizing Secretary",
        badgeType: "organizing",
        designation: "Professor",
        affiliation: "University of Engineering & Management (UEM), Jaipur",
        initials: "SC",
        photo: "/images/committee/sourav-chakraborty.jpeg"
      }
    ]
  },
  // Tier 7: Editorial Board
  {
    tierId: "publication-editorial",
    tierBadge: "Tier 7 • Editorial Leadership",
    title: "Editorial Board",
    subtitle: "Scopus proceedings compilation, publisher indexing & camera-ready management",
    filterCategory: "publication",
    layout: "grid-3",
    members: [
      {
        name: "Dr. Tapas Si",
        role: "Editorial Board",
        badgeType: "publication",
        designation: "Faculty & Editorial Lead",
        affiliation: "University of Engineering & Management (UEM), Jaipur",
        initials: "TS",
        photo: "/images/committee/tapas-si.jpg"
      },
      {
        name: "Prof. (Dr.) Souvik Saha",
        role: "Editorial Board",
        badgeType: "publication",
        designation: "Professor",
        affiliation: "Amity University Kolkata",
        initials: "SS",
        photo: "/images/committee/souvik-saha.jpeg"
      },
      {
        name: "Prof. (Dr.) Pritha Chanda",
        role: "Editorial Board",
        badgeType: "publication",
        designation: " Professor",
        affiliation: "Institute of Engineering & Management (IEM), Kolkata",
        initials: "PC",
        photo: "/images/committee/pritha-chanda.jpeg"
      }
    ]
  }
];

function CommitteeMemberCard({ member }) {
  const [imgError, setImgError] = useState(false);

  return (
    <article className={`committee-photo-card badge-type-${member.badgeType || 'general'}`}>
      <div className="committee-photo-frame">
        {member.photo && !imgError ? (
          <img
            src={member.photo}
            alt={member.name}
            className="committee-photo-img"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="committee-photo-placeholder">
            <span className="placeholder-avatar-bubble">{member.initials}</span>
          </div>
        )}
        <span className="committee-role-badge">{member.role}</span>
      </div>

      <div className="committee-card-body">
        <h4 className="committee-member-name">{member.name}</h4>
        {member.designation && (
          <p className="committee-member-designation">{member.designation}</p>
        )}
        {member.affiliation && (
          <p className="committee-member-affil">
            <Award size={13} style={{ flexShrink: 0, opacity: 0.8 }} />
            <span>{member.affiliation}</span>
          </p>
        )}
      </div>
    </article>
  );
}

function SectionHeading({ eyebrow, title, text, align = "left" }) {
  return (
    <div className={`section-heading ${align === "center" ? "is-centered" : ""}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      <span className="heading-rule" aria-hidden="true" />
      {text && <p>{text}</p>}
    </div>
  );
}

export default function App() {
  const getInitialTab = () => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const valid = ['home', 'about', 'tracks', 'dates', 'registration', 'committee', 'venue'];
      if (valid.includes(hash)) return hash;
    }
    return 'home';
  };

  const [activeTab, setActiveTab] = useState(getInitialTab);
  const [activeTrackFilter, setActiveTrackFilter] = useState('all');
  const [activeCommitteeFilter, setActiveCommitteeFilter] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const canvasRef = useRef(null);
  const marqueeRef = useRef(null);

  // Sync hash changes
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const valid = ['home', 'about', 'tracks', 'dates', 'registration', 'committee', 'venue'];
      if (valid.includes(hash)) {
        setActiveTab(hash);
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Dynamic center pop-out effect for publication marquee logos
  useEffect(() => {
    let animId;
    const updateCenterPop = () => {
      const container = marqueeRef.current;
      if (container) {
        const rect = container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const maxDist = Math.min(rect.width * 0.35, 260);
        const cards = container.querySelectorAll('.marquee-logo-card');

        cards.forEach((card) => {
          if (card.matches(':hover')) return; // Allow mouse hover to override
          const cardRect = card.getBoundingClientRect();
          const cardCenter = cardRect.left + cardRect.width / 2;
          const dist = Math.abs(cardCenter - centerX);

          if (dist < maxDist) {
            const factor = Math.cos((dist / maxDist) * (Math.PI / 2)); // Smooth 0 to 1 curve
            const scale = 1 + 0.16 * factor;
            const translateY = -10 * factor;
            const shadowY = Math.round(4 + 14 * factor);
            const shadowBlur = Math.round(8 + 22 * factor);
            const alpha = (0.05 + 0.14 * factor).toFixed(2);
            card.style.transform = `scale(${scale.toFixed(3)}) translateY(${translateY.toFixed(1)}px)`;
            card.style.boxShadow = `0 ${shadowY}px ${shadowBlur}px rgba(23, 51, 40, ${alpha})`;
            card.style.borderColor = factor > 0.4 ? '#c76d42' : '#d8d4c9';
            card.style.zIndex = Math.round(5 + 10 * factor);
          } else {
            card.style.transform = 'scale(1) translateY(0px)';
            card.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
            card.style.borderColor = '#d8d4c9';
            card.style.zIndex = 1;
          }
        });
      }
      animId = requestAnimationFrame(updateCenterPop);
    };

    animId = requestAnimationFrame(updateCenterPop);
    return () => cancelAnimationFrame(animId);
  }, [activeTab]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    if (typeof window !== 'undefined') {
      try {
        window.history.replaceState(null, '', tabId === 'home' ? window.location.pathname : `#${tabId}`);
      } catch (err) {}
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [paused]);

  // Particle Canvas effect matching ai-universe
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

    const count = Math.min(50, Math.floor(width / 26));
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 2 + 1.2,
      baseAlpha: Math.random() * 0.45 + 0.2
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
            ctx.strokeStyle = `rgba(36, 75, 60, ${alpha})`;
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

        ctx.fillStyle = `rgba(36, 75, 60, ${p.baseAlpha * 0.4})`;
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

  const filteredCommitteeTiers = activeCommitteeFilter === 'all'
    ? committeeTiers
    : committeeTiers.filter(t => t.filterCategory === activeCommitteeFilter);

  return (
    <div className="page-shell">
      {/* Scroll Progress Indicator */}
      <div className="scroll-progress-track" aria-hidden="true" />

      {/* TWO-TIER SITE HEADER */}
      <header className="site-header-two-tier">
        {/* Tier 1: Logo & University Bar */}
        <div className="header-top-logo-bar">
          <div className="container header-top-inner">
            <div className="header-top-item header-top-uem-col">
              <div className="header-provided-logo-item">
                <img src="/images/uem-logo.png" alt="University of Engineering & Management (UEM) Jaipur" className="header-top-provided-logo header-top-uem-logo" onError={(e) => { e.target.style.display = 'none'; }} />
              </div>
            </div>

            <div className="header-top-item header-top-brand-col" style={{ flex: '1 1 auto', display: 'flex', justifyContent: 'center' }}>
              <a className="brand-mapcon brand-mapcon-center" href="#home" onClick={(e) => { e.preventDefault(); handleTabChange('home'); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
                <img
                  src="/images/convergia-logo.png"
                  alt="CONVERGIA 2027"
                  style={{
                    height: '110px',
                    width: 'auto',
                    maxHeight: '118px',
                    maxWidth: '480px',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 3px 10px rgba(36,75,60,0.12)) contrast(1.15)',
                    transition: 'transform 0.25s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.03)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                />
              </a>
            </div>

            <div className="header-top-item header-top-right-col" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <div className="brand-badge-pill" style={{ background: '#244b3c', padding: '6px 16px', borderRadius: '4px', fontSize: '11px', fontWeight: 700, color: '#ffffff', letterSpacing: '0.06em' }}>
                HYBRID · JAIPUR, INDIA
              </div>
            </div>
          </div>
        </div>

        {/* Tier 2: Main Dark Navigation Bar */}
        <div className={`main-nav-bar-dark ${isScrolled ? 'is-scrolled' : ''}`}>
          <div className="container nav-bar-inner">
            <nav className="desktop-nav-dark" aria-label="Main navigation">
              {navLinks.map((tab) => (
                <a
                  key={tab.id}
                  href={tab.href}
                  className={`nav-link-dark ${activeTab === tab.id ? 'is-active' : ''}`}
                  onClick={(e) => { e.preventDefault(); handleTabChange(tab.id); }}
                >
                  {tab.label}
                </a>
              ))}
            </nav>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                type="button"
                className="btn-register-now"
                onClick={() => handleTabChange('registration')}
              >
                <span>Register Interest</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </button>

              <button
                type="button"
                className="menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation"
                style={{ background: 'none', border: 'none', color: '#f4f1e9', cursor: 'pointer', display: 'none' }}
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-nav-drawer" style={{ background: '#244b3c', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '10px', borderBottom: '2px solid #c76d42' }}>
            {navLinks.map((tab) => (
              <a
                key={tab.id}
                href={tab.href}
                className={`nav-link-dark ${activeTab === tab.id ? 'is-active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleTabChange(tab.id); }}
                style={{ textAlign: 'left', padding: '8px 0', fontSize: '14px' }}
              >
                {tab.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* MAIN CONTENT AREA */}
      <main>
        {activeTab !== 'home' && (
          <div className="active-tab-banner">
            <div className="container active-tab-banner-inner">
              <div className="active-tab-breadcrumbs">
                <button type="button" className="breadcrumb-home-link" onClick={() => handleTabChange('home')}>
                  <Home size={13} aria-hidden="true" />
                  <span>Home</span>
                </button>
                <span className="breadcrumb-separator" aria-hidden="true">/</span>
                <span className="breadcrumb-current">
                  {navLinks.find(u => u.id === activeTab)?.label}
                </span>
              </div>
              <button type="button" className="view-all-sections-btn" onClick={() => handleTabChange('home')}>
                <Home size={14} aria-hidden="true" />
                <span>Return to Home Page</span>
              </button>
            </div>
          </div>
        )}

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
              <section className="hero" id="top">
                <div className="hero-backdrop" aria-hidden="true" />
                <div className="hero-grid-pattern" aria-hidden="true" />
                <canvas ref={canvasRef} className="hero-particle-canvas" aria-hidden="true" />

                <div className="container hero-layout">
                  <div className="hero-main">
                    <div className="hero-title-wrap" style={{ display: 'flex', alignItems: 'center', gap: '22px', flexWrap: 'wrap' }}>
                      <img
                        src="/images/convergia-logo.png"
                        alt="CONVERGIA 2027 Logo"
                        style={{ height: '78px', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 4px 14px rgba(36,75,60,0.12))' }}
                      />
                      <h1 className="hero-title" style={{ margin: 0 }}>
                        <span className="hero-title-brand">CONVERGIA</span>
                        <span className="hero-title-year">
                          <span className="year-dash">–</span>2027
                        </span>
                      </h1>
                      <div className="hero-title-glow" aria-hidden="true" />
                    </div>

                    <div className="hero-conf-lead">International Conference on</div>
                    <h2 style={{ fontSize: '19px', fontWeight: 600, color: '#244b3c', margin: '0 0 12px', lineHeight: 1.35, fontFamily: 'Playfair Display' }}>
                      Next-generation VLSI, Energy, Rehabilitation, Green Computing, Intelligence & Analytics
                    </h2>

                    <p className="hero-subtitle">
                      "{conf.theme}."
                    </p>

                    <div className="hero-meta-grid">
                      <div className="hero-meta-item">
                        <div className="meta-icon-bubble">
                          <Calendar size={18} aria-hidden="true" />
                        </div>
                        <div>
                          <small>SCHEDULE</small>
                          <strong>{conf.dates}</strong>
                          <span className="meta-sub">{conf.format}</span>
                        </div>
                      </div>

                      <div className="hero-meta-item">
                        <div className="meta-icon-bubble">
                          <MapPin size={18} aria-hidden="true" />
                        </div>
                        <div>
                          <small>HOST INSTITUTION</small>
                          <strong>UEM Jaipur Campus</strong>
                          <span className="meta-sub">Jaipur, Rajasthan, India</span>
                        </div>
                      </div>
                    </div>

                    <div className="hero-actions">
                      <button type="button" className="btn btn-amber" onClick={() => handleTabChange('tracks')}>
                        <span>Explore 06 Tracks</span>
                        <Layers size={16} aria-hidden="true" />
                      </button>
                      <button type="button" className="btn btn-outline" onClick={() => handleTabChange('publication')}>
                        <span>Publication Plan</span>
                        <FileText size={16} aria-hidden="true" />
                      </button>
                      <button type="button" className="btn btn-outline" onClick={() => handleTabChange('registration')}>
                        <span>Registration Tariff</span>
                        <ArrowUpRight size={16} aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  {/* Hero Right Column: Showcase Slider */}
                  <div
                    className="hero-gallery-wrap"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                    style={{ position: 'relative', background: '#faf8f3', border: '1px solid #d8d4c9', borderRadius: '12px', overflow: 'hidden' }}
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
                            aria-label={`Go to slide ${idx + 1}`}
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
              </section>

              {/* TICKER */}
              <div style={{ background: '#244b3c', color: '#f4f1e9', padding: '10px 0', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
                <div style={{ padding: '0 20px', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '8px', borderRight: '1px solid rgba(255,255,255,0.2)', zIndex: 2 }}>
                  <span style={{ background: '#c76d42', color: '#ffffff', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em' }}>
                    UPDATES
                  </span>
                </div>
                <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', display: 'flex', flex: 1 }}>
                  <div className="ticker-track">
                    {tickerItems.map((item, idx) => (
                      <span key={idx} style={{ fontSize: '12px', letterSpacing: '0.04em', display: 'inline-flex', alignItems: 'center', gap: '16px' }}>
                        <span>{item}</span>
                        <span style={{ color: '#c76d42' }}>✦</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* FACTS STRIP */}
              <section className="partners-strip" aria-label="Conference quick facts">
                <div className="container partners-grid">
                  {quickFacts.map((fact, idx) => (
                    <div key={idx} className="partner-cell">
                      <span className="partner-role">{fact.role}</span>
                      <strong>{fact.name}</strong>
                      <small>{fact.detail}</small>
                    </div>
                  ))}
                </div>
              </section>

              {/* PUBLICATION MARQUEE */}
              <section className="floating-marquee-section" aria-label="Proceedings & Publication Partners">
                <div className="floating-marquee-header-bar">
                  <div className="container floating-marquee-header-inner">
                    <div className="floating-marquee-heading-wrap">
                      <span className="floating-marquee-eyebrow">
                        <Sparkles size={13} className="floating-marquee-sparkle" aria-hidden="true" />
                        PROCEEDINGS & CITATION DATABASES
                      </span>
                      <h2 className="floating-marquee-title">
                        Publication Plan & Indexing Partners
                      </h2>
                    </div>
                    <p className="floating-marquee-subtitle">
                      Proceedings will include Atlantis Press, Springer Nature, Scopus & Clarivate Web of Science.
                    </p>
                  </div>
                </div>

                <div
                  ref={marqueeRef}
                  className="floating-marquee-outer"
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    width: '100%',
                    padding: '38px 0',
                    perspective: '1000px'
                  }}
                >
                  <div className="floating-marquee-fade floating-marquee-fade-left" aria-hidden="true" />
                  <div className="floating-marquee-fade floating-marquee-fade-right" aria-hidden="true" />
                  <div className="floating-marquee-track">
                    {[...publicationPartners, ...publicationPartners, ...publicationPartners, ...publicationPartners].map((p, idx) => (
                      <div
                        key={idx}
                        className="marquee-logo-card"
                        style={{
                          flexShrink: 0,
                          width: '190px',
                          height: '82px',
                          padding: '12px 22px',
                          borderRadius: '10px',
                          display: 'grid',
                          placeItems: 'center',
                          background: '#ffffff',
                          border: '1px solid #d8d4c9',
                          cursor: 'pointer',
                          transition: 'transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.18s ease, border-color 0.18s ease'
                        }}
                      >
                        <img
                          src={p.img}
                          alt={p.name}
                          style={{
                            maxHeight: '46px',
                            maxWidth: '142px',
                            objectFit: 'contain',
                            display: 'block',
                            transition: 'transform 0.25s ease'
                          }}
                        />
                      </div>
                    ))}
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
            >
              <section className="section section-alt" id="about">
                <div className="container">
                  <SectionHeading
                    eyebrow="CONFERENCE PROPOSAL FOR APPROVAL"
                    title="About CONVERGIA 2027"
                    text="International Conference on Next-generation VLSI, Energy, Rehabilitation, Green Computing, Intelligence & Analytics."
                  />

                  <div style={{ maxWidth: '820px', margin: '30px auto 0' }}>
                    <div style={{ background: '#faf8f3', borderLeft: '4px solid #c76d42', padding: '18px 22px', borderRadius: '4px', marginBottom: '28px' }}>
                      <strong style={{ display: 'block', fontSize: '11px', color: '#74786f', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
                        Approved Conference Theme
                      </strong>
                      <span style={{ fontSize: '16px', color: '#244b3c', fontWeight: 600 }}>
                        "{conf.theme}"
                      </span>
                    </div>

                    <p style={{ fontSize: '15px', color: '#404840', lineHeight: 1.8, marginBottom: '24px' }}>
                      {conf.overview}
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginTop: '36px' }}>
                      <div style={{ background: '#ffffff', border: '1px solid #d8d4c9', borderRadius: '10px', padding: '26px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', color: '#244b3c' }}>
                          <Building2 size={20} />
                          <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                            ORGANIZING INSTITUTION
                          </span>
                        </div>
                        <h3 style={{ fontSize: '19px', color: '#244b3c', margin: '0 0 10px', fontFamily: 'Playfair Display' }}>
                          UEM Jaipur
                        </h3>
                        <p style={{ fontWeight: 600, color: '#c76d42', fontSize: '13px', marginBottom: '8px' }}>
                          University of Engineering & Management (UEM), Jaipur, Rajasthan
                        </p>
                        <p style={{ fontSize: '13px', color: '#404840', lineHeight: 1.6 }}>
                          Established by the acclaimed IEM-UEM Group, UEM Jaipur is a leading technical and research institution providing state-of-the-art facilities across engineering, computer science, management, and healthcare studies.
                        </p>
                      </div>

                      <div style={{ background: '#ffffff', border: '1px solid #d8d4c9', borderRadius: '10px', padding: '26px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', color: '#c76d42' }}>
                          <MonitorCheck size={20} />
                          <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                            MODE OF CONFERENCE
                          </span>
                        </div>
                        <h3 style={{ fontSize: '19px', color: '#244b3c', margin: '0 0 10px', fontFamily: 'Playfair Display' }}>
                          Offline & Online (Hybrid)
                        </h3>
                        <p style={{ fontWeight: 600, color: '#244b3c', fontSize: '13px', marginBottom: '8px' }}>
                          Inclusive dual-mode participation
                        </p>
                        <p style={{ fontSize: '13px', color: '#404840', lineHeight: 1.6 }}>
                          Accommodating delegates worldwide through interactive on-campus sessions at the UEM Jaipur campus alongside fully integrated high-definition virtual presentation tracks.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
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
            >
              <section className="section tracks-section-wrap" id="tracks">
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                  <SectionHeading
                    eyebrow="RESEARCH DOMAINS"
                    title="06 Technical Conference Tracks"
                    text="Filter across the six interdisciplinary tracks to review topics, methodologies, and technical scope."
                    align="center"
                  />

                  {/* Filter Pills */}
                  <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '8px', margin: '30px 0 40px' }}>
                    {trackTabs.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setActiveTrackFilter(t.id)}
                        className={`track-filter-btn ${activeTrackFilter === t.id ? 'is-active' : ''}`}
                        style={{
                          padding: '7px 16px', borderRadius: '20px', fontSize: '13px', cursor: 'pointer',
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
                        <div key={track.number} className="track-card">
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                            <span className="track-badge">
                              TRACK {track.number}
                            </span>
                            <TrackIcon size={22} color="#244b3c" />
                          </div>

                          <h3>{track.title}</h3>
                          <p className="track-desc">{track.description}</p>

                          <div style={{ borderTop: '1px solid #d8d4c9', paddingTop: '16px', marginTop: 'auto' }}>
                            <h4 style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#c76d42', margin: '0 0 10px' }}>
                              Included Topics ({track.topics.length})
                            </h4>
                            <ul className="track-topics">
                              {track.topics.map((topic, i) => (
                                <li key={i}>
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
              </section>
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
            >
              <section className="section section-alt" id="publication">
                <div className="container" style={{ maxWidth: '860px' }}>
                  <SectionHeading
                    eyebrow="PROCEEDINGS & CITATION INDEXATION"
                    title="Publication Plan"
                    text="All accepted, registered, and presented manuscripts of CONVERGIA 2027 will be published with premier academic publishing houses."
                  />

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', margin: '36px 0' }}>
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
                </div>
              </section>
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
            >
              <section className="section section-alt" id="dates">
                <div className="container" style={{ maxWidth: '800px' }}>
                  <SectionHeading
                    eyebrow="CONFERENCE TIMELINE"
                    title="Important Dates & Milestones"
                    text="Tentative Schedule: 2027 · Dates to be decided and announced soon."
                    align="center"
                  />

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '36px' }}>
                    {importantDates.map((item, idx) => (
                      <div
                        key={idx}
                        style={{
                          background: '#ffffff', border: '1px solid ' + (item.highlight ? '#244b3c' : '#d8d4c9'),
                          borderRadius: '8px', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
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
                          padding: '7px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: 700,
                          border: '1px solid ' + (item.highlight ? '#244b3c' : '#d8d4c9')
                        }}>
                          {item.date}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
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
            >
              <section className="section section-alt" id="registration">
                <div className="container" style={{ maxWidth: '900px' }}>
                  <SectionHeading
                    eyebrow="FEES & PARTICIPATION TARIFF"
                    title="Registration Charges"
                    text="Official registration fee schedule for Indian Participants (INR ₹) and Foreign Participants (USD $)."
                    align="center"
                  />

                  {/* Indian Table */}
                  <div style={{ margin: '36px 0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                      <span style={{ background: '#244b3c', color: '#f4f1e9', padding: '3px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em' }}>
                        CATEGORY 1
                      </span>
                      <h3 style={{ margin: 0, fontSize: '18px', color: '#244b3c', fontFamily: 'Playfair Display' }}>
                        Indian Participants (INR ₹)
                      </h3>
                    </div>

                    <div className="table-container">
                      <table className="reg-table">
                        <thead>
                          <tr>
                            <th>Participant Category</th>
                            <th style={{ textAlign: 'right' }}>Amount (INR)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {indianFees.map((row, idx) => (
                            <tr key={idx}>
                              <td>{row.category}</td>
                              <td style={{ fontWeight: 700, color: '#244b3c', textAlign: 'right' }}>{row.amount}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Foreign Table */}
                  <div style={{ marginBottom: '36px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                      <span style={{ background: '#c76d42', color: '#ffffff', padding: '3px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em' }}>
                        CATEGORY 2
                      </span>
                      <h3 style={{ margin: 0, fontSize: '18px', color: '#244b3c', fontFamily: 'Playfair Display' }}>
                        Foreign Participants (USD $)
                      </h3>
                    </div>

                    <div className="table-container">
                      <table className="reg-table">
                        <thead>
                          <tr>
                            <th>Participant Category</th>
                            <th style={{ textAlign: 'right' }}>Amount (USD $)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {foreignFees.map((row, idx) => (
                            <tr key={idx}>
                              <td>{row.category}</td>
                              <td style={{ fontWeight: 700, color: '#244b3c', textAlign: 'right' }}>{row.amount}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </section>
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
            >
              <section className="section committee-section-enhanced" id="committee">
                <div className="container">
                  <SectionHeading
                    eyebrow="GOVERNANCE & HIERARCHY"
                    title="Organizing & Technical Committees"
                    text="Approved hierarchical leadership structure comprising Chief Patrons, Patron, Honorary Chairs, Conference Chairs, Convenors, TPC Chair, and Organizing Secretary."
                    align="center"
                  />

                  {/* Filter / View Bar */}
                  <div className="committee-filter-bar" style={{ margin: '30px auto 44px' }}>
                    {committeeFilters.map((filter) => (
                      <button
                        key={filter.id}
                        type="button"
                        onClick={() => setActiveCommitteeFilter(filter.id)}
                        className={`committee-filter-pill ${activeCommitteeFilter === filter.id ? 'active' : ''}`}
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>

                  {/* Hierarchical Tree Container */}
                  <div className="committee-tree-container">
                    {filteredCommitteeTiers.map((tier, tIdx) => (
                      <React.Fragment key={tier.tierId}>
                        {tIdx > 0 && (
                          <div className="committee-tree-connector" aria-hidden="true">
                            <div className="committee-tree-connector-line" />
                            <div className="committee-tree-connector-node" />
                          </div>
                        )}

                        <section className="committee-tier-block">
                          <div className="committee-tier-header">
                            <span className="committee-tier-badge">{tier.tierBadge}</span>
                            <h3 className="committee-tier-title">{tier.title}</h3>
                            {tier.subtitle && <p className="committee-tier-subtitle">{tier.subtitle}</p>}
                          </div>

                          {/* Layout: Centered 1 Card */}
                          {tier.layout === 'centered-1' && (
                            <div className="committee-row-single">
                              {tier.members.map((member, mIdx) => (
                                <CommitteeMemberCard key={mIdx} member={member} />
                              ))}
                            </div>
                          )}

                          {/* Layout: Centered 2 Cards */}
                          {tier.layout === 'centered-2' && (
                            <div className="committee-row-double">
                              {tier.members.map((member, mIdx) => (
                                <CommitteeMemberCard key={mIdx} member={member} />
                              ))}
                            </div>
                          )}

                          {/* Layout: Split Columns (Chairs & Convenors) */}
                          {tier.layout === 'split-columns' && (
                            <div className="committee-split-container">
                              {tier.columns.map((col, cIdx) => (
                                <div key={cIdx} className="committee-split-panel">
                                  <div className="committee-subgroup-header">
                                    <h4 className="committee-subgroup-title">
                                      <Users size={18} style={{ color: '#c76d42', flexShrink: 0 }} />
                                      <span>{col.groupTitle}</span>
                                    </h4>
                                    <span className="committee-subgroup-count">
                                      {col.members.length} {col.members.length === 1 ? 'Member' : 'Members'}
                                    </span>
                                  </div>
                                  <div className="committee-subgroup-grid">
                                    {col.members.map((member, mIdx) => (
                                      <CommitteeMemberCard key={mIdx} member={member} />
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Layout: Grid 3 Cards */}
                          {tier.layout === 'grid-3' && (
                            <div className="committee-row-triple">
                              {tier.members.map((member, mIdx) => (
                                <CommitteeMemberCard key={mIdx} member={member} />
                              ))}
                            </div>
                          )}
                        </section>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </section>
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
            >
              <section className="section section-alt" id="venue">
                <div className="container">
                  <SectionHeading
                    eyebrow="LOCATION & TRAVEL"
                    title="Conference Venue & Mode"
                    text="University of Engineering & Management (UEM), Jaipur · Hybrid Offline & Online Participation."
                    align="center"
                  />

                  {/* Hybrid Mode Highlight Banner */}
                  <div style={{ background: '#244b3c', color: '#f4f1e9', borderRadius: '10px', padding: '24px 32px', margin: '30px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
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
                      Hybrid Format · 2027
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
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* SITE FOOTER */}
      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand-col">
            <div className="footer-brand" style={{ display: 'inline-flex', alignItems: 'center' }}>
              <div style={{
                background: '#ffffff',
                padding: '10px 20px',
                borderRadius: '8px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.18)'
              }}>
                <img
                  src="/images/convergia-logo.png"
                  alt="CONVERGIA 2027 Logo"
                  style={{ height: '58px', width: 'auto', maxHeight: '66px', objectFit: 'contain', display: 'block' }}
                />
              </div>
            </div>
            <p className="footer-summary" style={{ marginTop: '14px' }}>
              {conf.fullTitle}.
            </p>
          </div>

          <div className="footer-col">
            <h4>Quick Navigation</h4>
            <ul>
              {['home', 'about', 'tracks', 'publication'].map((id) => (
                <li key={id}>
                  <button type="button" className="footer-link-btn" onClick={() => handleTabChange(id)}>
                    {id === 'tracks' ? '06 Tracks' : id.charAt(0).toUpperCase() + id.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Authors & Delegates</h4>
            <ul>
              {['dates', 'registration', 'committee', 'venue'].map((id) => (
                <li key={id}>
                  <button type="button" className="footer-link-btn" onClick={() => handleTabChange(id)}>
                    {id.charAt(0).toUpperCase() + id.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Organizing Venue</h4>
            <p className="footer-venue-text">
              <strong>{conf.venueName}</strong><br />
              {conf.venueAddress}<br />
              <strong>Mode:</strong> {conf.format}
            </p>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>© 2027 CONVERGIA 2027 · University of Engineering & Management (UEM), Jaipur</span>
          <button
            type="button"
            className="back-to-top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Back to Top ↑
          </button>
        </div>
      </footer>
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
