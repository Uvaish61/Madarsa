export type Locale = "en" | "ur";

export type Copy = {
  en: string;
  ur: string;
};

export type NavItem = {
  href: string;
  label: Copy;
};

export type Badge = Copy;

export type StatItem = {
  value: string;
  label: Copy;
};

export type TrackItem = {
  index: string;
  title: Copy;
  description: Copy;
  tags: string[];
  courses: Copy;
  featured?: boolean;
};

export type CourseItem = {
  icon: string;
  slug: string;
  title: string;
  level: Copy;
  duration: string;
  lessons: number;
  price: string;
  originalPrice?: string;
  rating: string;
  badge: Copy;
  tags: string[];
};

export type CurriculumLesson = {
  title: string;
  duration: string;
  preview?: boolean;
};

export type CurriculumSection = {
  title: string;
  lessons: CurriculumLesson[];
};

export type FeatureItem = {
  icon: string;
  title: Copy;
  description: Copy;
  featured?: boolean;
};

export type StepItem = {
  number: string;
  title: Copy;
  description: Copy;
};

export type StoryItem = {
  quote: Copy;
  name: string;
  role: string;
  city: string;
  initials: string;
};

export const navigation: NavItem[] = [
  { href: "#courses", label: { en: "Courses", ur: "کورسز" } },
  { href: "#tracks", label: { en: "Tracks", ur: "ٹریکس" } },
  { href: "#why", label: { en: "Why Us", ur: "کیوں ہم" } },
  { href: "#stories", label: { en: "Success Stories", ur: "کامیابیاں" } },
  { href: "#contact", label: { en: "Contact", ur: "رابطہ" } },
];

export const heroBadge: Copy = {
  en: "From madrasa to a modern tech career",
  ur: "مدرسہ سے جدید ٹیک کیریئر تک",
};

export const heroTitle: Copy = {
  en: "Tech Mastery. Deeni Excellence.",
  ur: "ٹیک مہارت۔ دینی فضیلت۔",
};

export const heroDescription: Copy = {
  en: "Expert-led tech courses for Urdu-speaking learners. Mobile-first, low-bandwidth, bilingual, and designed for students building a dual career.",
  ur: "اردو بولنے والے طلبہ کے لیے ماہرین کے تیار کردہ ٹیک کورسز — موبائل فرینڈلی، کم بینڈوتھ، دو لسانی، اور دوہری کیریئر بنانے کے لیے۔",
};

export const heroBadges: Badge[] = [
  { en: "First course free", ur: "پہلا کورس مفت" },
  { en: "Urdu + English", ur: "اردو + انگلش" },
  { en: "Mobile friendly", ur: "موبائل فرینڈلی" },
  { en: "Certificate included", ur: "سرٹیفکیٹ شامل" },
];

export const stats: StatItem[] = [
  { value: "50+", label: { en: "Courses", ur: "کورسز" } },
  { value: "10,000+", label: { en: "Learners", ur: "سیکھنے والے" } },
  { value: "300+", label: { en: "Projects built", ur: "پروجیکٹس" } },
  { value: "95%", label: { en: "Completion rate", ur: "مکمل کرنے کی شرح" } },
];

export const tracks: TrackItem[] = [
  {
    index: "01",
    title: { en: "Foundation Track", ur: "بنیادی ٹریک" },
    description: { en: "Computer basics, typing, internet, and productivity.", ur: "کمپیوٹر کی بنیادی باتیں، ٹائپنگ، انٹرنیٹ اور پروڈکٹیویٹی۔" },
    tags: ["Computer basics", "Typing", "Internet"],
    courses: { en: "6 courses", ur: "6 کورسز" },
  },
  {
    index: "02",
    title: { en: "Web Development Track", ur: "ویب ڈویلپمنٹ ٹریک" },
    description: { en: "HTML, CSS, JavaScript, React and Next.js.", ur: "HTML، CSS، JavaScript، React اور Next.js۔" },
    tags: ["HTML / CSS", "JavaScript", "React"],
    courses: { en: "12 courses", ur: "12 کورسز" },
  },
  {
    index: "03",
    title: { en: "Data Track", ur: "ڈیٹا ٹریک" },
    description: { en: "Excel, SQL, Power BI and analytics.", ur: "Excel، SQL، Power BI اور تجزیہ کاری۔" },
    tags: ["Excel", "SQL", "Power BI"],
    courses: { en: "9 courses", ur: "9 کورسز" },
  },
  {
    index: "04",
    title: { en: "AI Track", ur: "اے آئی ٹریک" },
    description: { en: "AI tools, prompt engineering and automation.", ur: "اے آئی ٹولز، پرامپٹ انجینئرنگ اور آٹومیشن۔" },
    tags: ["AI tools", "Prompting", "Automation"],
    courses: { en: "7 courses", ur: "7 کورسز" },
  },
  {
    index: "05",
    title: { en: "Career Track", ur: "کیریئر ٹریک" },
    description: { en: "Resume, GitHub, LinkedIn and interview prep.", ur: "ریزیومے، GitHub، LinkedIn اور انٹرویو کی تیاری۔" },
    tags: ["Resume", "GitHub", "Interview"],
    courses: { en: "5 courses", ur: "5 کورسز" },
    featured: true,
  },
];

export const courses: CourseItem[] = [
  { icon: "Code2", slug: "react-nextjs", title: "React & Next.js", level: { en: "Intermediate", ur: "انٹرمیڈیٹ" }, duration: "8h", lessons: 42, price: "Free", rating: "4.9", badge: { en: "Free", ur: "مفت" }, tags: ["React", "Next.js", "TypeScript"] },
  { icon: "BarChart2", slug: "python-data-science", title: "Python for Data Science", level: { en: "Beginner", ur: "ابتدائی" }, duration: "10h", lessons: 56, price: "₹999", originalPrice: "₹2,499", rating: "4.8", badge: { en: "Popular", ur: "مشہور" }, tags: ["Python", "Pandas", "ML Basics"] },
  { icon: "Paintbrush", slug: "uiux-figma", title: "UI/UX with Figma", level: { en: "Beginner", ur: "ابتدائی" }, duration: "6h", lessons: 38, price: "Free", rating: "4.9", badge: { en: "Free", ur: "مفت" }, tags: ["Figma", "Wireframing", "Prototyping"] },
  { icon: "Server", slug: "nodejs-backend", title: "Node.js Backend", level: { en: "Intermediate", ur: "انٹرمیڈیٹ" }, duration: "9h", lessons: 47, price: "₹1,299", originalPrice: "₹2,999", rating: "4.7", badge: { en: "Project based", ur: "پروجیکٹ بیسڈ" }, tags: ["Node.js", "Express", "REST APIs"] },
  { icon: "Sparkles", slug: "ai-productivity", title: "AI Productivity", level: { en: "Beginner", ur: "ابتدائی" }, duration: "4h", lessons: 26, price: "Free", rating: "4.9", badge: { en: "New", ur: "نیا" }, tags: ["ChatGPT", "Prompting", "Automation"] },
  { icon: "Cloud", slug: "aws-cloud-basics", title: "AWS Cloud Basics", level: { en: "Intermediate", ur: "انٹرمیڈیٹ" }, duration: "7h", lessons: 33, price: "₹1,499", originalPrice: "₹3,499", rating: "4.8", badge: { en: "Popular", ur: "مشہور" }, tags: ["EC2", "S3", "Lambda"] },
];

export const curricula: Record<string, CurriculumSection[]> = {
  "react-nextjs": [
    { title: "Module 1 — JavaScript Foundations", lessons: [
      { title: "Variables, let & const", duration: "10m", preview: true },
      { title: "Arrow Functions & Closures", duration: "12m", preview: true },
      { title: "Array Methods: map, filter, reduce", duration: "18m" },
      { title: "Destructuring & Spread Operator", duration: "14m" },
      { title: "Promises & Async/Await", duration: "16m" },
      { title: "ES Modules & Imports", duration: "10m" },
    ]},
    { title: "Module 2 — React Basics", lessons: [
      { title: "What is React & Why Use It", duration: "8m", preview: true },
      { title: "JSX Syntax Deep Dive", duration: "14m" },
      { title: "Components & Props", duration: "16m" },
      { title: "Rendering Lists & Keys", duration: "12m" },
      { title: "Conditional Rendering", duration: "10m" },
      { title: "Handling Events", duration: "13m" },
      { title: "Forms & Controlled Inputs", duration: "15m" },
    ]},
    { title: "Module 3 — React Hooks & State", lessons: [
      { title: "useState — Local State Management", duration: "16m" },
      { title: "useEffect & Side Effects", duration: "18m" },
      { title: "useRef — DOM Access", duration: "10m" },
      { title: "useContext — Global State", duration: "14m" },
      { title: "Custom Hooks", duration: "16m" },
      { title: "Performance with useMemo & useCallback", duration: "14m" },
    ]},
    { title: "Module 4 — Next.js Fundamentals", lessons: [
      { title: "Next.js vs Create React App", duration: "8m" },
      { title: "App Router & File-based Routing", duration: "16m" },
      { title: "Server Components vs Client Components", duration: "18m" },
      { title: "Data Fetching with fetch & cache", duration: "14m" },
      { title: "Dynamic Routes & Params", duration: "12m" },
      { title: "Layouts & Loading States", duration: "12m" },
      { title: "Image Optimisation & Metadata", duration: "10m" },
    ]},
    { title: "Module 5 — Capstone Project: Portfolio Site", lessons: [
      { title: "Project Planning & Design", duration: "12m" },
      { title: "Building the Home Page", duration: "22m" },
      { title: "Projects Section with Dynamic Routes", duration: "18m" },
      { title: "Contact Form with API Route", duration: "16m" },
      { title: "Deploying to Vercel", duration: "12m" },
      { title: "Certificate & Next Steps", duration: "8m" },
    ]},
  ],
  "python-data-science": [
    { title: "Module 1 — Python Basics", lessons: [
      { title: "Python Setup & First Program", duration: "10m", preview: true },
      { title: "Variables, Types & Operators", duration: "14m", preview: true },
      { title: "Lists, Tuples & Dictionaries", duration: "18m" },
      { title: "Loops & Conditionals", duration: "16m" },
      { title: "Functions & Modules", duration: "14m" },
      { title: "File I/O & Error Handling", duration: "13m" },
    ]},
    { title: "Module 2 — NumPy & Pandas", lessons: [
      { title: "NumPy Arrays & Operations", duration: "18m" },
      { title: "Pandas Series & DataFrames", duration: "20m" },
      { title: "Loading CSV & Excel Data", duration: "14m" },
      { title: "Cleaning Missing Data", duration: "16m" },
      { title: "Groupby & Aggregations", duration: "18m" },
      { title: "Merging & Joining DataFrames", duration: "16m" },
    ]},
    { title: "Module 3 — Data Visualisation", lessons: [
      { title: "Matplotlib Basics", duration: "16m" },
      { title: "Seaborn Charts", duration: "18m" },
      { title: "Bar, Line & Scatter Plots", duration: "14m" },
      { title: "Heatmaps & Correlation", duration: "12m" },
      { title: "Interactive Charts with Plotly", duration: "16m" },
    ]},
    { title: "Module 4 — Machine Learning Intro", lessons: [
      { title: "What is Machine Learning?", duration: "12m" },
      { title: "Scikit-learn Overview", duration: "14m" },
      { title: "Linear Regression", duration: "20m" },
      { title: "Classification with Decision Trees", duration: "18m" },
      { title: "Model Evaluation & Accuracy", duration: "16m" },
    ]},
    { title: "Module 5 — Real-World Project", lessons: [
      { title: "Sales Analysis Dataset", duration: "20m" },
      { title: "EDA & Insights Report", duration: "18m" },
      { title: "Building a Price Predictor", duration: "22m" },
      { title: "Presenting Findings", duration: "14m" },
      { title: "Certificate & Career Path", duration: "8m" },
    ]},
  ],
  "uiux-figma": [
    { title: "Module 1 — Design Fundamentals", lessons: [
      { title: "What is UI vs UX?", duration: "10m", preview: true },
      { title: "Colour Theory & Typography", duration: "16m", preview: true },
      { title: "Grid Systems & Spacing", duration: "14m" },
      { title: "Design Principles (CRAP)", duration: "12m" },
      { title: "Accessibility in Design", duration: "13m" },
    ]},
    { title: "Module 2 — Figma Interface", lessons: [
      { title: "Figma Setup & Workspace", duration: "10m", preview: true },
      { title: "Frames, Layers & Groups", duration: "14m" },
      { title: "Components & Auto Layout", duration: "18m" },
      { title: "Styles & Design Tokens", duration: "14m" },
      { title: "Plugins & Community Files", duration: "10m" },
    ]},
    { title: "Module 3 — Wireframing", lessons: [
      { title: "Low-fidelity Wireframes", duration: "14m" },
      { title: "User Flow Diagrams", duration: "12m" },
      { title: "Wireframing a Mobile App", duration: "20m" },
      { title: "Feedback & Iteration", duration: "10m" },
    ]},
    { title: "Module 4 — Prototyping", lessons: [
      { title: "Figma Prototyping Basics", duration: "14m" },
      { title: "Micro-interactions & Transitions", duration: "16m" },
      { title: "Sharing & User Testing", duration: "12m" },
      { title: "Usability Testing Tips", duration: "10m" },
    ]},
    { title: "Module 5 — Portfolio Project", lessons: [
      { title: "Case Study: Food Delivery App", duration: "24m" },
      { title: "High-fidelity Screens", duration: "20m" },
      { title: "Presentation Template", duration: "12m" },
      { title: "Certificate & Next Steps", duration: "8m" },
    ]},
  ],
  "nodejs-backend": [
    { title: "Module 1 — Node.js Basics", lessons: [
      { title: "How Node.js Works (Event Loop)", duration: "14m", preview: true },
      { title: "Modules: require vs import", duration: "12m", preview: true },
      { title: "File System (fs) Module", duration: "14m" },
      { title: "Streams & Buffers", duration: "12m" },
      { title: "npm & package.json", duration: "10m" },
    ]},
    { title: "Module 2 — Express Framework", lessons: [
      { title: "Setting Up an Express Server", duration: "12m" },
      { title: "Routing — GET, POST, PUT, DELETE", duration: "18m" },
      { title: "Middleware & Error Handling", duration: "16m" },
      { title: "Request & Response Objects", duration: "14m" },
      { title: "Serving Static Files", duration: "10m" },
      { title: "Environment Variables (.env)", duration: "10m" },
    ]},
    { title: "Module 3 — MongoDB & Mongoose", lessons: [
      { title: "NoSQL vs SQL Databases", duration: "12m" },
      { title: "MongoDB Setup & Atlas", duration: "14m" },
      { title: "Mongoose Schemas & Models", duration: "18m" },
      { title: "CRUD Operations", duration: "20m" },
      { title: "Relationships & Populate", duration: "16m" },
    ]},
    { title: "Module 4 — REST APIs", lessons: [
      { title: "REST Principles", duration: "12m" },
      { title: "Building a CRUD API", duration: "22m" },
      { title: "Validation with Joi/Zod", duration: "14m" },
      { title: "Pagination & Filtering", duration: "14m" },
      { title: "Testing with Postman", duration: "12m" },
    ]},
    { title: "Module 5 — Auth & Security", lessons: [
      { title: "JWT Authentication", duration: "20m" },
      { title: "bcrypt Password Hashing", duration: "12m" },
      { title: "Protected Routes & Roles", duration: "16m" },
      { title: "Rate Limiting & Helmet", duration: "12m" },
    ]},
    { title: "Module 6 — Capstone API Project", lessons: [
      { title: "Building a Blog API End-to-End", duration: "30m" },
      { title: "Deployment to Railway/Render", duration: "14m" },
      { title: "API Documentation", duration: "10m" },
      { title: "Certificate & Next Steps", duration: "8m" },
    ]},
  ],
  "ai-productivity": [
    { title: "Module 1 — Intro to AI Tools", lessons: [
      { title: "What is Generative AI?", duration: "10m", preview: true },
      { title: "ChatGPT, Gemini, Claude — Overview", duration: "12m", preview: true },
      { title: "Setting Up Your AI Workspace", duration: "10m" },
      { title: "AI Safety & Limitations", duration: "8m" },
    ]},
    { title: "Module 2 — ChatGPT Mastery", lessons: [
      { title: "Anatomy of a Good Prompt", duration: "14m", preview: true },
      { title: "Writing Emails & Reports with AI", duration: "16m" },
      { title: "Summarising Long Documents", duration: "12m" },
      { title: "Translation & Urdu/English Use", duration: "14m" },
      { title: "Custom GPTs & Instructions", duration: "14m" },
    ]},
    { title: "Module 3 — Prompt Engineering", lessons: [
      { title: "Zero-shot vs Few-shot Prompting", duration: "14m" },
      { title: "Chain-of-Thought Prompting", duration: "12m" },
      { title: "Role Prompting Techniques", duration: "12m" },
      { title: "Iterating & Refining Prompts", duration: "10m" },
    ]},
    { title: "Module 4 — AI Automation", lessons: [
      { title: "Zapier + ChatGPT Workflows", duration: "18m" },
      { title: "Automating Social Media Content", duration: "16m" },
      { title: "AI for Research & Learning", duration: "14m" },
      { title: "Building a Personal AI Assistant", duration: "18m" },
    ]},
    { title: "Module 5 — Real-World Projects", lessons: [
      { title: "Project 1: AI Content Calendar", duration: "18m" },
      { title: "Project 2: Resume Enhancer Bot", duration: "16m" },
      { title: "Project 3: Urdu Translator Agent", duration: "14m" },
      { title: "Certificate & Career Paths in AI", duration: "10m" },
    ]},
  ],
  "aws-cloud-basics": [
    { title: "Module 1 — Cloud Computing Intro", lessons: [
      { title: "What is Cloud Computing?", duration: "10m", preview: true },
      { title: "AWS vs Azure vs GCP", duration: "12m", preview: true },
      { title: "AWS Free Tier Setup", duration: "10m" },
      { title: "IAM — Users, Roles & Policies", duration: "14m" },
    ]},
    { title: "Module 2 — Compute Services", lessons: [
      { title: "EC2 Instances — Launch & Connect", duration: "18m" },
      { title: "Security Groups & Key Pairs", duration: "14m" },
      { title: "Elastic IPs & Load Balancers", duration: "14m" },
      { title: "Auto Scaling Groups", duration: "12m" },
      { title: "Deploying a Node.js App on EC2", duration: "20m" },
    ]},
    { title: "Module 3 — Storage & Databases", lessons: [
      { title: "S3 Buckets — Upload & Host", duration: "16m" },
      { title: "S3 Static Website Hosting", duration: "12m" },
      { title: "RDS — Managed MySQL/Postgres", duration: "16m" },
      { title: "DynamoDB Basics", duration: "14m" },
    ]},
    { title: "Module 4 — Serverless with Lambda", lessons: [
      { title: "What is Serverless?", duration: "10m" },
      { title: "Creating Lambda Functions", duration: "16m" },
      { title: "API Gateway + Lambda", duration: "18m" },
      { title: "Lambda Triggers (S3, DynamoDB)", duration: "14m" },
    ]},
    { title: "Module 5 — Security & Pricing", lessons: [
      { title: "AWS Shared Responsibility Model", duration: "12m" },
      { title: "CloudWatch Monitoring & Alerts", duration: "14m" },
      { title: "Cost Explorer & Budgets", duration: "10m" },
      { title: "AWS Well-Architected Framework", duration: "12m" },
      { title: "Certificate & Cloud Career Path", duration: "8m" },
    ]},
  ],
};

export const features: FeatureItem[] = [
  { icon: "Languages", title: { en: "Urdu + English teaching", ur: "اردو + انگلش تدریس" }, description: { en: "Every lesson explained bilingually.", ur: "ہر سبق دو زبانوں میں سمجھایا جاتا ہے۔" } },
  { icon: "Wifi", title: { en: "Low-bandwidth video", ur: "کم بینڈوتھ ویڈیو" }, description: { en: "Smooth even on slow connections.", ur: "سست انٹرنیٹ پر بھی آسانی سے چلے۔" } },
  { icon: "Smartphone", title: { en: "Mobile-first learning", ur: "موبائل فرسٹ سیکھنا" }, description: { en: "Complete a course on your phone.", ur: "مکمل کورس صرف فون پر مکمل کریں۔" } },
  { icon: "Hammer", title: { en: "Project-based courses", ur: "پروجیکٹ پر مبنی" }, description: { en: "Learn by building real projects.", ur: "کرکے سیکھیں، حقیقی پروجیکٹ بنائیں۔" } },
  { icon: "UserCheck", title: { en: "Career mentorship", ur: "کیریئر مینٹرشپ" }, description: { en: "Guidance to get job-ready.", ur: "راہنمائی برائے نوکری کی تیاری۔" } },
  { icon: "BadgeCheck", title: { en: "Verifiable certificates", ur: "قابلِ تصدیق سرٹیفکیٹ" }, description: { en: "Share with a unique verify ID.", ur: "منفرد آئی ڈی کے ساتھ شیئر کریں۔" } },
  { icon: "GraduationCap", title: { en: "Scholarships", ur: "وظائف" }, description: { en: "Special support for madrasa students.", ur: "مدرسہ طلبہ کے لیے خصوصی معاونت۔" } },
];

export const steps: StepItem[] = [
  { number: "1", title: { en: "Create free account", ur: "مفت اکاؤنٹ بنائیں" }, description: { en: "Sign up in seconds, no card.", ur: "چند سیکنڈ میں سائن اپ کریں۔" } },
  { number: "2", title: { en: "Choose your track", ur: "اپنا ٹریک منتخب کریں" }, description: { en: "Pick a path that fits your goal.", ur: "اپنے ہدف کے مطابق راستہ چنیں۔" } },
  { number: "3", title: { en: "Learn & build", ur: "مختصر اسباق سے سیکھیں" }, description: { en: "Short lessons and real projects.", ur: "مختصر اسباق اور پروجیکٹس کے ذریعے۔" } },
  { number: "4", title: { en: "Earn & apply", ur: "سرٹیفکیٹ حاصل کریں" }, description: { en: "Get certified and prep for jobs.", ur: "سرٹیفکیٹ پائیں اور نوکری کی تیاری کریں۔" } },
];

export const stories: StoryItem[] = [
  { quote: { en: "I came from a madrasa background with almost no English. The Urdu lessons made React finally make sense.", ur: "میں مدرسہ پس منظر سے آیا تھا اور انگریزی کم تھی۔ اردو اسباق نے React کو سمجھنا آسان بنا دیا۔" }, name: "Bilal Ahmed", role: "Frontend Developer", city: "Mumbai", initials: "BA" },
  { quote: { en: "Everything worked on my phone with weak internet. I finished the Data Track and landed my first analyst role.", ur: "سب کچھ کمزور انٹرنیٹ پر میرے فون پر چلتا رہا۔ میں نے Data Track مکمل کیا اور اپنی پہلی جاب لی۔" }, name: "Hafsa Noor", role: "Data Analyst", city: "Hyderabad", initials: "HN" },
  { quote: { en: "I started from the Foundation Track not knowing how to type. The mentorship and certificate gave me confidence.", ur: "میں Foundation Track سے شروع ہوا اور ٹائپ بھی نہیں آتی تھی۔ مینٹرشپ اور سرٹیفکیٹ نے اعتماد دیا۔" }, name: "Usman Tariq", role: "Junior Developer", city: "Lucknow", initials: "UT" },
];

export const certificationBullets: Copy[] = [
  { en: "Unique verifiable ID", ur: "منفرد قابلِ تصدیق آئی ڈی" },
  { en: "One-click shareable link", ur: "ایک کلک سے شیئر ایبل لنک" },
  { en: "LinkedIn & resume ready", ur: "LinkedIn اور ریزیومے کے لیے تیار" },
];

export const footerLinks = {
  platform: [
    { href: "#courses", label: { en: "Courses", ur: "کورسز" } },
    { href: "#tracks", label: { en: "Tracks", ur: "ٹریکس" } },
    { href: "#why", label: { en: "Why Us", ur: "کیوں ہم" } },
  ],
  company: [
    { href: "#stories", label: { en: "Success Stories", ur: "کامیابیاں" } },
    { href: "#cta", label: { en: "Scholarships", ur: "وظائف" } },
    { href: "#contact", label: { en: "Contact", ur: "رابطہ" } },
  ],
} as const;

// ─── Course page configs (instructor + outcomes + hero colors) ───────────────

export type Instructor = {
  name: string;
  role: string;
  bio: string;
  experience: string;
  students: string;
  rating: string;
  initials: string;
  courses: number;
};

export type CourseConfig = {
  heroFrom: string;
  heroTo: string;
  accentColor: string;
  outcomes: string[];
  instructor: Instructor;
};

export const courseConfigs: Record<string, CourseConfig> = {
  "react-nextjs": {
    heroFrom: "#020617",
    heroTo: "#0c1554",
    accentColor: "#61DAFB",
    outcomes: [
      "Build full-stack apps with React 18 & Next.js 14",
      "Master React Hooks: useState, useEffect, useContext",
      "Implement SSR & SSG with the App Router",
      "Create dynamic routes and Next.js API routes",
      "Deploy production-ready apps to Vercel",
      "Write type-safe, maintainable TypeScript code",
      "Optimise images, fonts and Core Web Vitals",
      "Consume and build REST APIs from Next.js",
    ],
    instructor: {
      name: "Asad Raza",
      role: "Senior Frontend Engineer",
      bio: "Asad has built production React apps for SaaS companies across South Asia and has been teaching web development in Urdu since 2019. He is passionate about making modern frontend engineering accessible to every Urdu speaker.",
      experience: "7 years",
      students: "3,200+",
      rating: "4.9",
      initials: "AR",
      courses: 4,
    },
  },
  "python-data-science": {
    heroFrom: "#0d1b2e",
    heroTo: "#1e3d6e",
    accentColor: "#4B8BBE",
    outcomes: [
      "Write Python from zero — no prior coding needed",
      "Analyse datasets using NumPy and Pandas",
      "Create stunning visualisations with Matplotlib & Seaborn",
      "Build your first ML model with Scikit-learn",
      "Clean and transform real-world messy data",
      "Present insights as polished professional reports",
      "Understand the full end-to-end data science pipeline",
      "Complete a real sales-analysis capstone project",
    ],
    instructor: {
      name: "Dr. Sana Mirza",
      role: "Data Scientist & Educator",
      bio: "Dr. Sana holds a PhD in computational statistics and has worked at major fintech companies as a data scientist. She simplifies complex ML concepts using relatable Urdu examples and real datasets from the subcontinent.",
      experience: "9 years",
      students: "4,800+",
      rating: "4.8",
      initials: "SM",
      courses: 3,
    },
  },
  "uiux-figma": {
    heroFrom: "#1a0630",
    heroTo: "#4a1270",
    accentColor: "#A259FF",
    outcomes: [
      "Master Figma from zero to professional level",
      "Apply colour theory, typography and layout principles",
      "Create low and high-fidelity wireframes",
      "Build interactive prototypes with micro-interactions",
      "Run usability tests and iterate from feedback",
      "Design a complete mobile app case study",
      "Understand UX research and user journey mapping",
      "Build a portfolio-ready UI/UX case study",
    ],
    instructor: {
      name: "Zara Iqbal",
      role: "Lead UX Designer",
      bio: "Zara has designed digital products used by millions across Pakistan and India, having led design teams at two funded startups. She brings real design-system experience and product thinking to every lesson.",
      experience: "6 years",
      students: "2,900+",
      rating: "4.9",
      initials: "ZI",
      courses: 2,
    },
  },
  "nodejs-backend": {
    heroFrom: "#071207",
    heroTo: "#0f3d0f",
    accentColor: "#68A063",
    outcomes: [
      "Build scalable REST APIs with Node.js & Express",
      "Model and query data with MongoDB and Mongoose",
      "Implement JWT auth and role-based access control",
      "Apply input validation and error-handling patterns",
      "Secure APIs with Helmet, bcrypt and rate limiting",
      "Write complete, professional API documentation",
      "Deploy backend services to Railway or Render",
      "Test APIs end-to-end with Postman",
    ],
    instructor: {
      name: "Hamza Khan",
      role: "Backend Engineer & Architect",
      bio: "Hamza has engineered backend systems handling millions of daily requests for e-commerce and logistics companies. He is an active Node.js community contributor and teaches backend with a sharp focus on production-ready patterns.",
      experience: "8 years",
      students: "2,100+",
      rating: "4.7",
      initials: "HK",
      courses: 5,
    },
  },
  "ai-productivity": {
    heroFrom: "#030014",
    heroTo: "#1e1040",
    accentColor: "#8B5CF6",
    outcomes: [
      "Use ChatGPT, Claude and Gemini like a power user",
      "Write prompts that produce professional-quality output",
      "Automate repetitive tasks with AI + Zapier",
      "Generate reports, emails and content in minutes",
      "Understand AI limitations and how to fact-check outputs",
      "Build a personal AI productivity system",
      "Use AI tools seamlessly in Urdu and English workflows",
      "Stay current as the AI landscape evolves rapidly",
    ],
    instructor: {
      name: "Tariq Ahmed",
      role: "AI Consultant & Prompt Engineer",
      bio: "Tariq was among the first AI consultants in Pakistan, helping businesses integrate ChatGPT into real workflows. He hosts a popular Urdu-language YouTube channel on AI productivity with over 200k subscribers.",
      experience: "4 years",
      students: "5,600+",
      rating: "4.9",
      initials: "TA",
      courses: 3,
    },
  },
  "aws-cloud-basics": {
    heroFrom: "#1a0c00",
    heroTo: "#7c3500",
    accentColor: "#FF9900",
    outcomes: [
      "Navigate the AWS Management Console with confidence",
      "Launch, configure and secure EC2 virtual machines",
      "Host static websites and store files with S3",
      "Build serverless functions using AWS Lambda",
      "Set up managed databases with RDS and DynamoDB",
      "Monitor resources and set CloudWatch alerts",
      "Understand AWS pricing and avoid surprise bills",
      "Deploy a complete full-stack app entirely on AWS",
    ],
    instructor: {
      name: "Nadia Hussain",
      role: "AWS Solutions Architect",
      bio: "Nadia holds the AWS Solutions Architect Professional certification and has architected cloud infrastructure for government and healthcare projects across South Asia. She makes AWS less intimidating through step-by-step practical labs.",
      experience: "6 years",
      students: "1,800+",
      rating: "4.8",
      initials: "NH",
      courses: 2,
    },
  },
};