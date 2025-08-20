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
  TrendingUp,
  Target,
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
  github?: string;
  demo?: string;
}

const Portfolio: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [currentProject, setCurrentProject] = useState<number>(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const projectsContainerRef = useRef<HTMLDivElement>(null);

  const skills: Skill[] = [
    { name: "JavaScript (ES6+)", category: "Frontend" },
    { name: "HTML5", category: "Frontend" },
    { name: "CSS3", category: "Frontend" },
    { name: "React.js", category: "Frontend" },
    { name: "Responsive Design", category: "Frontend" },
    { name: "Node.js", category: "Backend" },
    { name: "Express.js", category: "Backend" },
    { name: "PostgreSQL", category: "Backend" },
    { name: "MongoDB", category: "Backend" },
    { name: "RESTful APIs", category: "Backend" },
    { name: "GraphQL", category: "Backend" },
    { name: "Git", category: "Tools" },
    { name: "GitHub", category: "Tools" },
    { name: "Vercel", category: "Tools" },
    { name: "Agile/Sprint", category: "Tools" },
    { name: "Unit Testing", category: "Tools" },
    { name: "Terminal/CLI", category: "Tools" },
    { name: "Content Marketing", category: "Marketing" },
    { name: "Social Media Marketing", category: "Marketing" },
    { name: "Campaign Management", category: "Marketing" },
    { name: "Data Analytics", category: "Marketing" },
    { name: "Brand Strategy", category: "Marketing" },
    { name: "User Experience Design", category: "Marketing" },
    { name: "Problem Solving", category: "Soft Skills" },
    { name: "Communication", category: "Soft Skills" },
    { name: "Adaptability", category: "Soft Skills" },
    { name: "Team Collaboration", category: "Soft Skills" },
    { name: "Project Management", category: "Soft Skills" },
  ];

  const projects: Project[] = [
    {
      id: 1,
      title: "Booking Platform",
      description:
        "Team project: Full-stack booking platform for various services. Collaborated using Git PRs and contributed to both frontend React components and backend API development.",
      tech: ["React.js", "Node.js", "Express.js", "CSS Framework", "Git"],
      icon: "📅",
      color: "from-blue-600 to-indigo-700",
      github: "https://github.com/Munkhuub/teamNABA",
      demo: "https://team-naba.vercel.app",
    },
    {
      id: 2,
      title: "Food Delivery App",
      description:
        "Full-stack application for food ordering and delivery with user authentication, search functionality, and Stripe payment integration. Built with React.js frontend and MongoDB database.",
      tech: ["React.js", "Node.js", "MongoDB", "Stripe API", "Express.js"],
      icon: "🍔",
      color: "from-orange-600 to-red-700",
      github: "https://github.com/Munkhuub/food-web-app",
      demo: "https://food-web-app-virid.vercel.app",
    },
    {
      id: 3,
      title: "Movie Review Website",
      description:
        "Dynamic website allowing users to post and read movie reviews with full CRUD functionality. Integrated third-party movie API for film data and user account management.",
      tech: ["JavaScript", "HTML5", "CSS3", "Movie API", "Local Storage"],
      icon: "🎬",
      color: "from-purple-600 to-pink-700",
      github: "https://github.com/Munkhuub/MovieWebApp",
      demo: "https://movie-web-app-rho-ecru.vercel.app/",
    },
    {
      id: 4,
      title: "Buy Me a Coffee",
      description:
        "Web application enabling creators to receive support from their audience with clean UI design and backend transaction handling for supporter messages.",
      tech: ["HTML", "CSS", "JavaScript", "Backend Integration"],
      icon: "☕",
      color: "from-green-600 to-teal-700",
      github: "https://github.com/Munkhuub/Coffee",
      demo: "https://coffee-tan-theta.vercel.app/signin",
    },
  ];

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
    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }[] = [];
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
      case "Marketing":
        return <TrendingUp className="w-5 h-5" />;
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
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeIn");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    const skillCards = document.querySelectorAll(".skill-card");
    skillCards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [skills]);

  useEffect(() => {
    const container = projectsContainerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(container);
    return () => {
      if (container) {
        observer.unobserve(container);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-gray-100 overflow-x-hidden">
      <style jsx>{`
        .initial-fade {
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 1.2s ease-in forwards;
        }

        .initial-delay {
          animation-delay: 0.3s;
        }
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
        .skill-card {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.3s ease;
        }
        .skill-card:hover {
          transform: translateY(-5px);
          border-color: rgb(107, 114, 128);
        }
        .project-nav-card {
          opacity: 0; /* Cards start invisible */
        }
        .projects-container.is-visible .project-nav-card {
          /* Animation only runs when the container is visible */
          animation: fadeInUp 0.6s ease-out forwards;
          animation-delay: var(--stagger-delay);
        }
        .main-project-display {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold text-white">
              Munkhbayar Batmunkh
            </div>
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
      <section
        id="home"
        className="min-h-screen flex items-center justify-center relative initial-fade"
      >
        <canvas ref={canvasRef} className="absolute inset-0 z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40 z-1"></div>
        <div
          ref={heroRef}
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-light mb-6 text-white">
            Software Engineer
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-8 font-light max-w-3xl mx-auto leading-relaxed">
            Transitioning from Marketing to Full-Stack Development
          </p>
          <p className="text-lg text-gray-500 mb-12 font-light max-w-2xl mx-auto leading-relaxed">
            Leveraging 3+ years of marketing expertise to build user-centric web
            applications with a fresh perspective.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={() => scrollToSection("projects")}
              className="px-8 py-3 bg-white text-black font-medium hover:bg-gray-200 transition-all duration-300"
            >
              View Projects
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
      <section id="about" className="min-h-screen flex items-center py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-center mb-16 text-white">
            About Me
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <p className="text-lg text-gray-300 leading-relaxed font-light">
                With 3 years of experience in marketing, I've honed my skills
                across diverse companies, including Zeely, Shoppy.mn, Lhamour,
                Tapa. This background has equipped me with a unique user-centric
                perspective and strong business acumen.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed font-light">
                Recently completed the Pinecone Software Engineer Bootcamp,
                focusing on full-stack development, modern web technologies, and
                best practices in software engineering. Through this, I gained
                solid skills in React, Node.js, Express, and database
                management.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed font-light">
                I'm passionate about leveraging my creative approach and
                business understanding to build applications that truly solve
                user problems and drive meaningful engagement.
              </p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 p-8">
              <h3 className="text-xl font-medium mb-8 text-white">Journey</h3>
              <div className="space-y-8">
                <div className="border-l-2 border-gray-700 pl-6">
                  <h4 className="font-medium text-white">
                    Software Engineer Bootcamp
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Pinecone Academy • Dec 2024 - Aug 2025
                  </p>
                  <p className="text-gray-500 mt-2 font-light">
                    Full-stack development, React, Node.js, Express, Database
                    management, Computer Science fundamentals
                  </p>
                </div>
                <div className="border-l-2 border-gray-700 pl-6">
                  <h4 className="font-medium text-white">
                    Marketing Content Manager
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Tapa • Aug 2024 - May 2025
                  </p>
                  <p className="text-gray-500 mt-2 font-light">
                    91% social media reach improvement, data eSIM launch
                  </p>
                </div>
                <div className="border-l-2 border-gray-700 pl-6">
                  <h4 className="font-medium text-white">
                    Business Administration
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Global Leadership University • 2018-2022
                  </p>
                  <p className="text-gray-500 mt-2 font-light">
                    BBA in Marketing & Business Management • GPA: 3.7
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="skills"
        className="min-h-screen flex items-center py-20 px-6 bg-gray-900/20"
      >
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-3xl md:text-4xl font-light text-center mb-8 text-white">
            Skills & Expertise
          </h2>
          <p className="text-gray-400 text-center mb-16 font-light">
            A unique blend of technical development skills and marketing
            expertise
          </p>
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
      <section
        id="projects"
        className="min-h-screen flex items-center py-20 px-6"
      >
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-3xl md:text-4xl font-light text-center mb-8 text-white">
            Featured Projects
          </h2>
          <p className="text-gray-400 text-center mb-16 font-light">
            Full-stack applications built during my software engineering
            bootcamp
          </p>
          <div
            ref={projectsContainerRef}
            className="max-w-4xl mx-auto projects-container"
          >
            <div className="main-project-display bg-gray-900/40 border border-gray-800 overflow-hidden transition-all duration-500 mb-8">
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
                  {projects[currentProject].tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-2 text-xs border border-gray-700 text-gray-400 font-light hover:border-gray-600 hover:text-gray-300 transition-all duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <a
                    href={projects[currentProject].demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-6 py-3 bg-white text-black font-medium hover:bg-gray-200 transition-all duration-300"
                  >
                    <span>View Demo</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href={projects[currentProject].github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-6 py-3 border border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white transition-all duration-300"
                  >
                    <Github className="w-4 h-4" />
                    <span>Source Code</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {projects.map((project, index) => (
                <button
                  key={project.id}
                  onClick={() => setCurrentProject(index)}
                  className={`project-nav-card p-4 border transition-all duration-300 hover:scale-105 ${
                    currentProject === index
                      ? "border-gray-500 bg-gray-800/50 shadow-lg"
                      : "border-gray-800 hover:border-gray-700 hover:bg-gray-900/30"
                  }`}
                  style={{ "--stagger-delay": `${index * 0.1}s` }}
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
            <div className="text-center mt-8">
              <span className="text-sm text-gray-500 font-light">
                {currentProject + 1} of {projects.length}
              </span>
            </div>
          </div>
        </div>
      </section>
      <section
        id="contact"
        className=" flex items-center py-20 px-6 bg-gray-900/20"
      >
        <div className="max-w-4xl mx-auto w-full text-center">
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="https://www.linkedin.com/in/munkhbayar-batmunkh-44a891209"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-3 px-6 py-3 border border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white transition-all duration-300 font-light"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/Munkhuub"
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
      <footer className="py-8 border-t border-gray-800 bg-black">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-500 font-light">
            © {new Date().getFullYear()} Munkhbayar Batmunkh. Built with React &
            TypeScript.
          </p>
          <p className="text-gray-600 text-sm mt-2 font-light">
            • Ulaanbaatar, Mongolia
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
