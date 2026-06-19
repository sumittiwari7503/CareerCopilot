import { JobCard, DailyMission } from "./types";

export const TESTIMONIALS = [
  {
    stars: 5,
    quote: "The AI interview prep was so realistic that when I sat for my actual Google interview, it felt like just another supportive session.",
    name: "Sarah Chen",
    role: "L5 SWE @ Google",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBg8bfg2rEfTRME6dzaMDMzwplwTyDYxg4I2Yl2T37nIAzA07DybYYGPiUcNCo7Vq06GZu4p3fJ8AAMnnRZQjfwYyQ3MaAOTEdeKalB1RuhSBuWwIFDaWkiw3ifLbtuu8CGI9xnBXiREAdX-qn12noo1s9oQ60R5wyr4bqalVRLvwkm9nKX8y1EphMLHlGRaYWzs7NfrLtNAgPYPI5WXHo_xtU4TvP9sPk55Tw7sgMq4PCONSa1HyzW1sTUYECt5BoNnJeVg7QkNMCh"
  },
  {
    stars: 5,
    quote: "Found my dream job at Stripe within 3 weeks of using CareerCopilot's personalized roadmap generator. It's a game changer.",
    name: "Marcus Miller",
    role: "Product Manager @ Stripe",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUY5NQPJrFZ3kzW2KyYvCMFDF5g6b1SaSutkmBZ7HL_SeY8Q5FiKSz18by9AvgV-B-bnfUprm85wYhoPDMITznEdlcL9JeS6fDK8lwD0hS2m14re46xG0RISrvguWdK5BiPdD3-5d6IhDozCPRZAiQPlZtWk_4AF0tIPdztciaZHbNKsCRQV-5Ocz5zFHd6pMdaTy1rMlSbgRJXhgYao3ViKh3MDUp4TRc_t8bLHju_4hZfVENhS-TKju6qFCiLqb842ZdZ1hc0b-2"
  }
];

export const FAQS = [
  {
    id: "faq1",
    question: "How does the AI create my roadmap?",
    answer: "Our advanced model analyzes millions of successful career trajectories alongside live corporate recruiter criteria to compile weekly milestones customized to your deadline, role, and focus."
  },
  {
    id: "faq-2",
    title: "Is my resume parsing secure?",
    question: "Is my data secure?",
    answer: "Yes, we prioritize enterprise bank-grade local and server-side encryption. We never share your personal resume tethers or profile metrics with unauthorized external third parties."
  },
  {
    id: "faq-3",
    question: "Can I cancel my subscription easily?",
    answer: "You are allowed to cancel, pause, or adjust your Elite membership tiers instantly from the active Profile screen without waiting in any lines."
  }
];

export const INITIAL_JOBS: JobCard[] = [
  {
    id: "job-1",
    title: "Senior Product Designer",
    company: "Aether Systems",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWQ_LJdQUOvsS60sXsRiUxL8iDAz1pZSEo3TnU6GMZvrKdC9qIon2_6h11WAZD_-lA5gAAy8AkgDa9uVzGRrzQtS_2rII3YB7qUk3Z4kxByymTbEQGUh8uXCDjhaxYs5TS3Uku_ExOfPzyqwHJPTT7U7psOYK9nbXN2UmOi7ujJ1JMdjIZSQ0S01E1f1YZEessjLll3mEhUJyPOa84OCIc9o6LSgg9MNfOO2zGzdEVzKlD-k8ZlQtAfL9r80vuZsrgebNbeCSNk9EW",
    date: "Applied Oct 24",
    status: "Wishlist",
    priorityFlag: false,
    location: "Remote"
  },
  {
    id: "job-2",
    title: "AI Interaction Lead",
    company: "Luminal AI",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9DqAF2R9gIFek6OLioAGn05yo7MJaSr7NtTTrY2FR5HB3u7qICtLguttO4NlFO4iwJKzvD3dxxNfs4HM_03CqByvU-PxnvQwNqIPNCgZIiUei50uUvEMqRuUuhVH4at3jZj8gCY1UPiTTvKvez8vWwcrZU67gqKsvkBAvS-LA37PvzvdK8LJOxXm_Ih3kHkC5AxNxWn6plJ62nIYyMD1-Pu46qaxB-IwI0jrgVH89xpyM8ga-l9eQrLgBvt3rIFH9Oguw_qwouvG3",
    date: "Awaiting Schedule",
    status: "Assessment",
    priorityFlag: true,
    location: "Hybrid • New York"
  },
  {
    id: "job-3",
    title: "Lead UX Strategist",
    company: "Nova Capital",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWQ_LJdQUOvsS60sXsRiUxL8iDAz1pZSEo3TnU6GMZvrKdC9qIon2_6h11WAZD_-lA5gAAy8AkgDa9uVzGRrzQtS_2rII3YB7qUk3Z4kxByymTbEQGUh8uXCDjhaxYs5TS3Uku_ExOfPzyqwHJPTT7U7psOYK9nbXN2UmOi7ujJ1JMdjIZSQ0S01E1f1YZEessjLll3mEhUJyPOa84OCIc9o6LSgg9MNfOO2zGzdEVzKlD-k8ZlQtAfL9r80vuZsrgebNbeCSNk9EW",
    date: "Applied Nov 12",
    status: "Wishlist",
    priorityFlag: false,
    location: "Hybrid • SF"
  }
];

export const INITIAL_MISSIONS: DailyMission[] = [
  {
    id: "mis-1",
    description: "Solve 3 Hard Dynamic Programming Problems",
    metadata: "Arrays & Bitmasks • 2h est.",
    completed: false
  },
  {
    id: "mis-2",
    description: "Refine experience metrics on Resume Optimizer",
    metadata: "Profile Optimization • 45m est.",
    completed: false
  },
  {
    id: "mis-3",
    description: "Conduct high-pacing mock HR session",
    metadata: "Soft Skills • 30m est.",
    completed: false
  }
];

export const SKILL_GAP_DATA = [
  { name: "System Design", current: 65, target: 90, color: "bg-primary" },
  { name: "Data Structures", current: 82, target: 85, color: "bg-tertiary" },
  { name: "Behavioral Wisdom", current: 40, target: 95, color: "bg-secondary" }
];
