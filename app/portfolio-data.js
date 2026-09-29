// Content is adapted from the existing portfolio, without inferred deployment or performance claims.
export const projects = [
  {
    id: "iqra",
    number: "01",
    name: "IQRA",
    category: "Web",
    context: "School monitoring",
    year: "2024",
    organization: "SMK TI Bazma",
    description:
      "School monitoring and Qur’an memorization tracking, with dashboards for teachers, students, and parents.",
    tools: ["React", "Laravel", "MySQL", "TypeScript"],
    focus:
      "Bring school activity and memorization progress into a shared application with separate views for each role.",
    scope: [
      "Multi-role dashboards",
      "Memorization tracking",
      "School monitoring",
    ],
  },
  {
    id: "bansos",
    number: "02",
    name: "Bazma × Pertamina Bansos",
    category: "Web",
    context: "Social assistance",
    year: "2024",
    organization: "SMK TI Bazma",
    description:
      "A web platform for managing social assistance distribution, tracking records, and preparing reports.",
    tools: ["Laravel", "MySQL", "Blade", "JavaScript"],
    focus:
      "Organize distribution data so assistance records can be tracked and reported in one place.",
    scope: ["Distribution tracking", "Data management", "Reporting"],
  },
  {
    id: "kajianqu",
    number: "03",
    name: "KajianQu",
    category: "Mobile",
    context: "Qur’an learning research",
    year: "2025",
    organization: "Personal project",
    description:
      "A Qur’an learning app in development, exploring memorization tools, tafsir, and machine learning for Arabic text.",
    tools: ["Flutter", "Python", "TensorFlow"],
    focus:
      "Explore how mobile tools can support Qur’an study. Arabic OCR and Tajweed guidance are research directions, not verified production capabilities.",
    scope: ["Memorization tools", "Tafsir browsing", "Arabic text research"],
  },
  {
    id: "attendance",
    number: "04",
    name: "Dormitory Attendance",
    category: "Mobile",
    context: "Attendance management",
    year: "2024",
    organization: "SMK TI Bazma",
    description:
      "A mobile attendance application with login, monitoring, reporting, and supervisor notifications.",
    tools: ["React Native", "Laravel", "MySQL"],
    focus:
      "Give supervisors a way to track dormitory attendance and access the records needed for follow-up.",
    scope: ["Attendance records", "Supervisor notifications", "Reporting"],
  },
  {
    id: "commerce",
    number: "05",
    name: "E-Commerce Platform",
    category: "Web",
    context: "Online commerce",
    year: "2024",
    organization: "SMK TI Bazma",
    description:
      "An online store covering the product catalog, cart, checkout, and order and inventory management.",
    tools: ["Laravel", "Blade", "MySQL", "JavaScript"],
    focus:
      "Connect the customer’s shopping journey with the administrative tools needed to manage products and orders.",
    scope: ["Catalog & checkout", "Order tracking", "Inventory dashboard"],
  },
  {
    id: "cipher",
    number: "06",
    name: "Bazma Cipher",
    category: "Security",
    context: "Encryption prototype",
    year: "2024",
    organization: "SMK TI Bazma",
    description:
      "An educational encryption prototype exploring cipher algorithms and application data protection.",
    tools: ["Python", "JavaScript", "Cryptography"],
    focus:
      "Study encryption through implementation. This is a learning prototype, not a claim of audited or production-grade cryptography.",
    scope: [
      "Cipher experiments",
      "Encryption concepts",
      "Application data handling",
    ],
  },
];

export const skillGroups = [
  {
    label: "Interfaces",
    name: "Frontend engineering",
    tools: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Vue.js",
      "Tailwind CSS",
      "Astro",
    ],
    description:
      "Component-based interfaces, responsive layouts, and application state. TypeScript helps keep data contracts understandable as a project grows.",
  },
  {
    label: "Data & services",
    name: "Backend development",
    tools: ["PHP", "Laravel", "MySQL", "REST APIs"],
    description:
      "Server-side application logic, relational data models, authentication flows, and APIs that connect web and mobile clients.",
  },
  {
    label: "Devices",
    name: "Mobile applications",
    tools: ["React Native", "Flutter", "Firebase"],
    description:
      "Cross-platform applications, device interfaces, and data synchronization. Attendance and Qur’an learning are recurring project subjects.",
  },
  {
    label: "Exploration",
    name: "Security & machine learning",
    tools: ["Python", "C", "Cryptography", "TensorFlow"],
    description:
      "Encryption prototypes, automation, memory fundamentals, and research into Arabic text recognition. Experimental work is kept distinct from verified security guarantees.",
  },
  {
    label: "Workflow",
    name: "Development & delivery",
    tools: ["Git", "GitHub", "Docker", "Vercel"],
    description:
      "Version control, branching, containerized environments, and application deployment. Docker helps keep development environments consistent.",
  },
];

export const services = [
  {
    name: "Web development",
    description:
      "Websites and full-stack applications, from interface to database.",
  },
  {
    name: "Mobile development",
    description: "Cross-platform applications for everyday workflows.",
  },
  {
    name: "System architecture",
    description:
      "Application structure, REST APIs, and relational database design.",
  },
  {
    name: "Security-focused development",
    description: "Authentication, data handling, and encryption fundamentals.",
  },
  {
    name: "AI integration",
    description:
      "Exploring machine learning and AI features within applications.",
  },
  {
    name: "Islamic technology",
    description: "Digital tools for Qur’an study and community learning.",
  },
];
