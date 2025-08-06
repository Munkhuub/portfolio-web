"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  Code,
  Database,
  Globe,
  Users,
  Brain,
  Lightbulb,
  ArrowDown,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
} from "lucide-react";

interface Skill {
  name: string;
  category: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  icon: string;
  color: string;
}

const Portfolio: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [currentProject, setCurrentProject] = useState<number>(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const skills: Skill[] = [
    // Frontend
    { name: "HTML5", category: "Frontend" },
    { name: "CSS3", category: "Frontend" },
    { name: "JavaScript", category: "Frontend" },
    { name: "TypeScript", category: "Frontend" },
    { name: "React", category: "Frontend" },
    { name: "Next.js", category: "Frontend" },
    { name: "Tailwind CSS", category: "Frontend" },
    { name: "Redux", category: "Frontend" },
    { name: "SASS", category: "Frontend" },
    { name: "Responsive Design", category: "Frontend" },

    // Backend & Database
    { name: "Node.js", category: "Backend" },
    { name: "Express", category: "Backend" },
    { name: "PostgreSQL", category: "Backend" },
    { name: "MongoDB", category: "Backend" },
    { name: "GraphQL", category: "Backend" },
    { name: "REST API", category: "Backend" },
    { name: "Firebase", category: "Backend" },
    { name: "OOP", category: "Backend" },

    // Tools & DevOps
    { name: "Git", category: "Tools" },
    { name: "GitHub", category: "Tools" },
    { name: "Vercel", category: "Tools" },
    { name: "Netlify", category: "Tools" },
    { name: "Docker", category: "Tools" },
    { name: "Webpack", category: "Tools" },
    { name: "Jest", category: "Tools" },
    { name: "Cypress", category: "Tools" },

    // Testing & Practices
    { name: "Unit Testing", category: "Testing" },
    { name: "E2E Testing", category: "Testing" },
    { name: "Agile", category: "Testing" },
    { name: "Scrum", category: "Testing" },
    { name: "Code Review", category: "Testing" },
    { name: "CI/CD", category: "Testing" },

    // Soft Skills
    { name: "Problem Solving", category: "Soft Skills" },
    { name: "Communication", category: "Soft Skills" },
    { name: "Adaptability", category: "Soft Skills" },
    { name: "Teamwork", category: "Soft Skills" },
    { name: "Time Management", category: "Soft Skills" },
  ];

  const projects: Project[] = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with Next.js, TypeScript, and PostgreSQL. Features include user authentication, payment processing, and responsive design.",
      tech: ["Next.js", "TypeScript", "React", "PostgreSQL", "Stripe"],
      icon: "🛒",
      color: "from-slate-600 to-slate-800",
    },
    {
      id: 2,
      title: "Task Management App",
      description:
        "Modern task management application with real-time updates, drag-and-drop functionality, and team collaboration features using React and GraphQL.",
      tech: ["React", "TypeScript", "GraphQL", "MongoDB", "WebSockets"],
      icon: "📋",
      color: "from-zinc-600 to-zinc-800",
    },
    {
      id: 3,
      title: "Analytics Dashboard",
      description:
        "Comprehensive analytics dashboard with interactive charts, real-time data visualization, and responsive design built with React and TypeScript.",
      tech: ["React", "TypeScript", "D3.js", "REST API", "Tailwind CSS"],
      icon: "📊",
      color: "from-gray-600 to-gray-800",
    },
    {
      id: 4,
      title: "Fitness Tracker",
      description:
        "Mobile-first fitness tracking application with workout plans, progress visualization, and social sharing features.",
      tech: ["React Native", "Redux", "Firebase", "Chart.js", "Jest"],
      icon: "💪",
      color: "from-neutral-600 to-neutral-800",
    },
  ];

  // Canvas animation for subtle background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Minimal particle system
    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }[] = [];

    // Create fewer, subtler particles
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.3 + 0.1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x <= 0 || p.x >= canvas.width) p.speedX *= -1;
        if (p.y <= 0 || p.y >= canvas.height) p.speedY *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 116, 139, ${p.opacity})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill.name);
    return acc;
  }, {} as Record<string, string[]>);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Frontend":
        return <Code className="w-5 h-5" />;
      case "Backend":
        return <Database className="w-5 h-5" />;
      case "Tools":
        return <Globe className="w-5 h-5" />;
      case "Testing":
        return <Lightbulb className="w-5 h-5" />;
      case "Soft Skills":
        return <Users className="w-5 h-5" />;
      default:
        return <Brain className="w-5 h-5" />;
    }
  };

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call immediately to set initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation effects for skills and projects
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fadeIn");
        }
      });
    }, observerOptions);

    // Observe skill cards
    const skillCards = document.querySelectorAll(".skill-card");
    skillCards.forEach((card) => observer.observe(card));

    // Observe project elements
    const projectElements = document.querySelectorAll(".project-element");
    projectElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-black text-gray-100 overflow-x-hidden">
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .skill-card,
        .project-element {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.3s ease;
        }

        .skill-card:hover {
          transform: translateY(-5px);
          border-color: rgb(107, 114, 128);
        }
      `}</style>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold text-white">Portfolio</div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {["home", "about", "skills", "projects", "contact"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`text-sm font-medium transition-colors duration-300 ${
                      activeSection === item
                        ? "text-white"
                        : "text-gray-400 hover:text-gray-200"
                    }`}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                )
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-400 hover:text-white"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-sm border-t border-gray-800">
            <div className="px-6 py-4 space-y-3">
              {["home", "about", "skills", "projects", "contact"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`block text-left w-full py-2 text-sm font-medium transition-colors ${
                      activeSection === item
                        ? "text-white"
                        : "text-gray-400 hover:text-gray-200"
                    }`}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center relative"
      >
        <canvas ref={canvasRef} className="absolute inset-0 z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40 z-1"></div>

        <div
          ref={heroRef}
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-light mb-6 text-white">
            Frontend Developer
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 font-light max-w-2xl mx-auto leading-relaxed">
            Creating minimal, elegant web experiences with modern technologies
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={() => scrollToSection("projects")}
              className="px-8 py-3 bg-white text-black font-medium hover:bg-gray-200 transition-all duration-300"
            >
              View Work
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="px-8 py-3 border border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white transition-all duration-300"
            >
              Get in Touch
            </button>
          </div>

          <div className="mt-20">
            <button
              onClick={() => scrollToSection("about")}
              className="p-3 border border-gray-700 hover:border-gray-500 transition-colors animate-pulse"
            >
              <ArrowDown className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-center mb-16 text-white">
            About
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <p className="text-lg text-gray-300 leading-relaxed font-light">
                I'm a frontend developer focused on creating clean, functional
                interfaces. I believe in the power of simplicity and attention
                to detail in crafting user experiences that feel natural and
                effortless.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed font-light">
                With 3+ years of experience, I've worked across various domains
                from e-commerce to data visualization, always prioritizing code
                quality and user-centered design.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed font-light">
                When not coding, I contribute to open-source projects and
                explore emerging web technologies to stay at the forefront of
                modern development.
              </p>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 p-8">
              <h3 className="text-xl font-medium mb-8 text-white">
                Experience
              </h3>
              <div className="space-y-8">
                <div className="border-l-2 border-gray-700 pl-6">
                  <h4 className="font-medium text-white">Frontend Developer</h4>
                  <p className="text-gray-400 text-sm">
                    Tech Innovations Inc. • 2022-Present
                  </p>
                  <p className="text-gray-500 mt-2 font-light">
                    Developing responsive UIs with React and TypeScript
                  </p>
                </div>
                <div className="border-l-2 border-gray-700 pl-6">
                  <h4 className="font-medium text-white">
                    Web Development Bootcamp
                  </h4>
                  <p className="text-gray-400 text-sm">Code Academy • 2021</p>
                  <p className="text-gray-500 mt-2 font-light">
                    Full-stack web development certification
                  </p>
                </div>
                <div className="border-l-2 border-gray-700 pl-6">
                  <h4 className="font-medium text-white">
                    Computer Science Degree
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Tech University • 2017-2021
                  </p>
                  <p className="text-gray-500 mt-2 font-light">
                    Bachelor of Science in Computer Science
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="min-h-screen flex items-center py-20 px-6 bg-gray-900/20"
      >
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-3xl md:text-4xl font-light text-center mb-16 text-white">
            Skills & Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skillsByCategory).map(
              ([category, categorySkills], index) => (
                <div
                  key={category}
                  className="skill-card bg-gray-900/40 border border-gray-800 p-6 hover:border-gray-600 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="text-gray-300">
                      {getCategoryIcon(category)}
                    </div>
                    <h3 className="text-lg font-medium text-white">
                      {category}
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {categorySkills.map((skill, skillIndex) => (
                      <div
                        key={skill}
                        className="text-sm text-gray-400 font-light py-2 px-3 bg-gray-800/50 border border-gray-700 hover:border-gray-600 hover:text-gray-300 transition-all duration-200"
                        style={{
                          animationDelay: `${index * 0.1 + skillIndex * 0.05}s`,
                        }}
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="min-h-screen flex items-center py-20 px-6"
      >
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-3xl md:text-4xl font-light text-center mb-16 text-white">
            Featured Projects
          </h2>

          <div className="max-w-4xl mx-auto">
            {/* Main Project Display */}
            <div className="project-element bg-gray-900/40 border border-gray-800 overflow-hidden transition-all duration-500 mb-8">
              <div
                className={`h-64 flex items-center justify-center text-6xl bg-gradient-to-br ${projects[currentProject].color} relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-black/20"></div>
                <span className="relative z-10">
                  {projects[currentProject].icon}
                </span>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-medium text-white mb-4">
                      {projects[currentProject].title}
                    </h3>
                    <p className="text-gray-300 mb-6 leading-relaxed font-light">
                      {projects[currentProject].description}
                    </p>
                  </div>
                  <div className="flex space-x-2 ml-6">
                    <button
                      onClick={prevProject}
                      className="p-3 border border-gray-700 hover:border-gray-600 hover:bg-gray-800/50 transition-all duration-200"
                      title="Previous Project"
                    >
                      <ChevronLeft className="w-4 h-4 text-gray-400" />
                    </button>
                    <button
                      onClick={nextProject}
                      className="p-3 border border-gray-700 hover:border-gray-600 hover:bg-gray-800/50 transition-all duration-200"
                      title="Next Project"
                    >
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mb-8">
                  {projects[currentProject].tech.map((tech, index) => (
                    <span
                      key={tech}
                      className="px-3 py-2 text-xs border border-gray-700 text-gray-400 font-light hover:border-gray-600 hover:text-gray-300 transition-all duration-200"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-4">
                  <button className="flex items-center space-x-2 px-6 py-3 bg-white text-black font-medium hover:bg-gray-200 transition-all duration-300">
                    <span>View Live</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                  <button className="flex items-center space-x-2 px-6 py-3 border border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white transition-all duration-300">
                    <Github className="w-4 h-4" />
                    <span>Source Code</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Project Navigation */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {projects.map((project, index) => (
                <button
                  key={project.id}
                  onClick={() => setCurrentProject(index)}
                  className={`project-element p-4 border transition-all duration-300 hover:scale-105 ${
                    currentProject === index
                      ? "border-gray-500 bg-gray-800/50 shadow-lg"
                      : "border-gray-800 hover:border-gray-700 hover:bg-gray-900/30"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-2xl mb-3">{project.icon}</div>
                  <h4 className="text-xs font-light text-left text-gray-400 truncate">
                    {project.title}
                  </h4>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {project.tech.slice(0, 2).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 bg-gray-800/80 text-gray-500 border border-gray-700"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 2 && (
                      <span className="text-xs px-2 py-1 bg-gray-800/80 text-gray-500 border border-gray-700">
                        +{project.tech.length - 2}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Project Counter */}
            <div className="text-center mt-8">
              <span className="text-sm text-gray-500 font-light">
                {currentProject + 1} of {projects.length}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="min-h-screen flex items-center py-20 px-6 bg-gray-900/20"
      >
        <div className="max-w-4xl mx-auto w-full text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-8 text-white">
            Contact
          </h2>
          <p className="text-xl text-gray-400 mb-16 max-w-2xl mx-auto font-light leading-relaxed">
            Available for freelance work and full-time opportunities. Let's
            discuss your next project.
          </p>

          <div className="bg-gray-900/30 border border-gray-800 p-8 max-w-2xl mx-auto mb-16">
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-gray-700 focus:outline-none focus:border-gray-500 text-white placeholder-gray-500 font-light"
                    placeholder="Name"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-gray-700 focus:outline-none focus:border-gray-500 text-white placeholder-gray-500 font-light"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div>
                <input
                  type="text"
                  className="w-full px-0 py-3 bg-transparent border-0 border-b border-gray-700 focus:outline-none focus:border-gray-500 text-white placeholder-gray-500 font-light"
                  placeholder="Subject"
                />
              </div>
              <div>
                <textarea
                  rows={4}
                  className="w-full px-0 py-3 bg-transparent border-0 border-b border-gray-700 focus:outline-none focus:border-gray-500 text-white placeholder-gray-500 font-light resize-none"
                  placeholder="Message"
                ></textarea>
              </div>
              <button className="w-full px-8 py-4 bg-white text-black font-medium hover:bg-gray-200 transition-all duration-300 mt-8">
                Send Message
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="mailto:contact@portfolio.dev"
              className="flex items-center justify-center space-x-3 px-6 py-3 border border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white transition-all duration-300 font-light"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-3 px-6 py-3 border border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white transition-all duration-300 font-light"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-3 px-6 py-3 border border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white transition-all duration-300 font-light"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800 bg-black">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-500 font-light">
            © {new Date().getFullYear()} Portfolio. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
