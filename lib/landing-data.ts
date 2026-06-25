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
  title: string;
  level: Copy;
  duration: string;
  lessons: number;
  price: string;
  rating: string;
  badge: Copy;
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
  { title: "React & Next.js", level: { en: "Intermediate", ur: "انٹرمیڈیٹ" }, duration: "8h", lessons: 42, price: "Free", rating: "4.9", badge: { en: "Free", ur: "مفت" } },
  { title: "Python for Data Science", level: { en: "Beginner", ur: "ابتدائی" }, duration: "10h", lessons: 56, price: "₹999", rating: "4.8", badge: { en: "Popular", ur: "مشہور" } },
  { title: "UI/UX with Figma", level: { en: "Beginner", ur: "ابتدائی" }, duration: "6h", lessons: 38, price: "Free", rating: "4.9", badge: { en: "Free", ur: "مفت" } },
  { title: "Node.js Backend", level: { en: "Intermediate", ur: "انٹرمیڈیٹ" }, duration: "9h", lessons: 47, price: "₹1,299", rating: "4.7", badge: { en: "Project based", ur: "پروجیکٹ بیسڈ" } },
  { title: "AI Productivity", level: { en: "Beginner", ur: "ابتدائی" }, duration: "4h", lessons: 26, price: "Free", rating: "4.9", badge: { en: "New", ur: "نیا" } },
  { title: "AWS Cloud Basics", level: { en: "Intermediate", ur: "انٹرمیڈیٹ" }, duration: "7h", lessons: 33, price: "₹1,499", rating: "4.8", badge: { en: "Popular", ur: "مشہور" } },
];

export const features: FeatureItem[] = [
  { icon: "ع", title: { en: "Urdu + English teaching", ur: "اردو + انگلش تدریس" }, description: { en: "Every lesson explained bilingually.", ur: "ہر سبق دو زبانوں میں سمجھایا جاتا ہے۔" } },
  { icon: "▤", title: { en: "Low-bandwidth video", ur: "کم بینڈوتھ ویڈیو" }, description: { en: "Smooth even on slow connections.", ur: "سست انٹرنیٹ پر بھی آسانی سے چلے۔" } },
  { icon: "▢", title: { en: "Mobile-first learning", ur: "موبائل فرسٹ سیکھنا" }, description: { en: "Complete a course on your phone.", ur: "مکمل کورس صرف فون پر مکمل کریں۔" } },
  { icon: "◷", title: { en: "Project-based courses", ur: "پروجیکٹ پر مبنی" }, description: { en: "Learn by building real projects.", ur: "کرکے سیکھیں، حقیقی پروجیکٹ بنائیں۔" } },
  { icon: "◐", title: { en: "Career mentorship", ur: "کیریئر مینٹرشپ" }, description: { en: "Guidance to get job-ready.", ur: "راہنمائی برائے نوکری کی تیاری۔" } },
  { icon: "✦", title: { en: "Verifiable certificates", ur: "قابلِ تصدیق سرٹیفکیٹ" }, description: { en: "Share with a unique verify ID.", ur: "منفرد آئی ڈی کے ساتھ شیئر کریں۔" } },
  { icon: "♥", title: { en: "Scholarships", ur: "وظائف" }, description: { en: "Special support for madrasa students.", ur: "مدرسہ طلبہ کے لیے خصوصی معاونت۔" } },
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