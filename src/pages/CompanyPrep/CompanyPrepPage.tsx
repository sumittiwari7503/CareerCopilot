import React, { useState } from "react";
import { 
  Building2, 
  Layers, 
  Cpu, 
  Server, 
  CheckCircle2, 
  Circle, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles, 
  BookOpen, 
  HelpCircle, 
  BrainCircuit, 
  Users, 
  Search,
  ChevronDown,
  ChevronUp,
  Award,
  Zap
} from "lucide-react";

export type CompanyTrack = "product" | "service";

interface CompanyPrepPageProps {
  initialTrack?: CompanyTrack;
  onNavigate?: (tab: string) => void;
  prepProgress?: Record<string, boolean>;
  onTogglePrepItem?: (id: string) => void;
}

interface PrepModule {
  id: string;
  title: string;
  category: "DSA" | "HLD" | "LLD" | "CS Fundamentals" | "Behavioral" | "Aptitude" | "Core CS" | "HR & Soft Skills";
  estimatedHours: string;
  importance: "Critical" | "High" | "Medium";
  provenance: "Verified Curriculum" | "AI-Generated Practice";
  description: string;
  keyTopics: string[];
  sampleQuestions: {
    q: string;
    a: string;
    tips: string;
  }[];
  verifiedResources: {
    title: string;
    url: string;
    source: string;
  }[];
}

const PRODUCT_MODULES: PrepModule[] = [
  {
    id: "prod-dsa-advanced",
    title: "Deep DSA & Problem Solving Patterns",
    category: "DSA",
    estimatedHours: "40-60 hrs",
    importance: "Critical",
    provenance: "Verified Curriculum",
    description: "Product companies test for optimal algorithmic complexity, edge-case coverage, and clean modular code under time pressure.",
    keyTopics: [
      "Sliding Window & Two Pointers (O(n) space/time optimizations)",
      "Monotonic Stacks & Queues (Next Greater Element, Trapping Rain Water)",
      "Binary Trees & BSTs (LCA, Path Sum, Serialization/Deserialization)",
      "Graph Traversals (BFS, DFS, Dijkstra, Topological Sort)",
      "Dynamic Programming (1D, 2D grid, Knapsack, Longest Common Subsequence)",
      "Heaps & Priority Queues (Top K Frequent, Merge K Sorted Lists)"
    ],
    sampleQuestions: [
      {
        q: "How do you detect a cycle in a directed graph vs an undirected graph?",
        a: "In an undirected graph, standard BFS/DFS with a visited set and tracking the parent node is sufficient (if a neighbor is visited and not the parent, a cycle exists). In a directed graph, tracking the parent is not enough; you must track the recursion stack (3 states: unvisited, visiting, visited) or use Kahn's algorithm (topological sort with in-degrees).",
        tips: "Highlight the difference between DFS back-edges and cross-edges."
      },
      {
        q: "Explain how to serialize and deserialize a Binary Tree in O(N) time.",
        a: "Use preorder DFS or level-order BFS. In preorder DFS: serialize by appending node values separated by delimiters, using '#' or 'null' for null pointers. To deserialize: split the serialized string by delimiter, iterate sequentially using recursion: the first value is the root, then recursively reconstruct left and right subtrees.",
        tips: "Mention space complexity for the recursion stack O(H) where H is tree height."
      }
    ],
    verifiedResources: [
      { title: "NeetCode 150 Pattern Roadmap", url: "https://neetcode.io/roadmap", source: "NeetCode" },
      { title: "Tech Interview Handbook - Algorithms Cheatsheet", url: "https://www.techinterviewhandbook.org/algorithms/study-cheatsheet/", source: "Yangshun Tay (Meta)" }
    ]
  },
  {
    id: "prod-hld",
    title: "High-Level System Design (HLD)",
    category: "HLD",
    estimatedHours: "30-45 hrs",
    importance: "Critical",
    provenance: "Verified Curriculum",
    description: "Architecting reliable, scalable, maintainable distributed systems that serve millions of concurrent users.",
    keyTopics: [
      "Horizontal vs Vertical Scaling, Load Balancing (Round Robin, Least Connections, Consistent Hashing)",
      "Caching Strategies (Write-through, Write-back, Cache-aside, Eviction policies: LRU/LFU)",
      "Database Sharding, Replication (Leader-Follower, Multi-Leader), and CAP Theorem",
      "Asynchronous Processing & Message Brokers (Kafka, RabbitMQ, Event-Driven Architecture)",
      "Rate Limiting Algorithms (Token Bucket, Leaky Bucket, Sliding Window Counter)",
      "CDN edge caching and Object Storage (Amazon S3, Cloudflare)"
    ],
    sampleQuestions: [
      {
        q: "Design a scalable URL Shortener (e.g., TinyURL / Bitly).",
        a: "1) Functional: shorten long URL, redirect to original. 2) Non-functional: 100:1 read-to-write ratio, sub-10ms redirect latency, 99.99% availability. 3) Core design: Base62 encoding on a unique distributed counter (Snowflake or Zookeeper ID generator) to generate 7-character hash (62^7 ≈ 3.5 trillion URLs). 4) Data store: NoSQL key-value (DynamoDB or Cassandra) for fast O(1) lookup. 5) Caching: Redis caching the top 20% most active URLs to achieve 80%+ cache hit ratio.",
        tips: "Always start with requirements, estimate QPS and storage, then draw end-to-end architecture."
      },
      {
        q: "Explain the CAP Theorem and how modern systems make trade-offs.",
        a: "CAP states a distributed system can guarantee at most 2 out of 3: Consistency (every read receives most recent write), Availability (every non-failing node returns a response), and Partition Tolerance (system continues operating despite network dropped packets). Because network partitions are inevitable in real-world distributed networks (P is mandatory), systems must choose between CP (e.g. HBase, CockroachDB) or AP (e.g. Cassandra, DynamoDB) with eventual consistency.",
        tips: "Clarify that CAP is not binary; systems tune consistency via quorum reads/writes (R + W > N)."
      }
    ],
    verifiedResources: [
      { title: "The System Design Primer (Open Source)", url: "https://github.com/donnemartin/system-design-primer", source: "Donne Martin" },
      { title: "Designing Data-Intensive Applications (DDIA)", url: "https://dataintensive.net/", source: "Martin Kleppmann" }
    ]
  },
  {
    id: "prod-lld",
    title: "Low-Level Design (LLD) & Object-Oriented Design",
    category: "LLD",
    estimatedHours: "20-30 hrs",
    importance: "High",
    provenance: "Verified Curriculum",
    description: "Translating ambiguous requirements into modular, testable, and extensible code using design patterns and SOLID principles.",
    keyTopics: [
      "SOLID Principles (Single Responsibility, Open/Closed, Liskov, Interface Segregation, Dependency Inversion)",
      "Creational Patterns (Factory, Abstract Factory, Builder, Singleton)",
      "Structural Patterns (Adapter, Decorator, Facade, Composite)",
      "Behavioral Patterns (Strategy, Observer, State, Command)",
      "Thread Safety & Concurrency (Mutexes, ReadWriteLocks, Atomic Variables, Producer-Consumer)",
      "Classic Problem Statements (Parking Lot, Elevator System, Rate Limiter, Splitwise)"
    ],
    sampleQuestions: [
      {
        q: "How would you design a Multi-Floor Elevator System in OOP?",
        a: "Create entities: ElevatorController (singleton dispatcher), ElevatorCar (holds id, currentFloor, direction [UP/DOWN/IDLE], status [MOVING/STOPPED], Door), Request (sourceFloor, destinationFloor, type [INTERNAL/EXTERNAL]). Use the State Pattern for Elevator states and Strategy Pattern for dispatching algorithms (e.g. LOOK/SCAN disk scheduling algorithm to minimize wait time).",
        tips: "Discuss how concurrency is handled when multiple passengers press buttons simultaneously."
      }
    ],
    verifiedResources: [
      { title: "Refactoring.Guru - Design Patterns Catalog", url: "https://refactoring.guru/design-patterns", source: "Refactoring Guru" }
    ]
  },
  {
    id: "prod-cs-core",
    title: "CS Fundamentals (OS, DBMS & Networks)",
    category: "CS Fundamentals",
    estimatedHours: "25-35 hrs",
    importance: "High",
    provenance: "Verified Curriculum",
    description: "Deep dive into kernel primitives, transaction isolation, and network protocol lifecycles expected in Tier-1 interviews.",
    keyTopics: [
      "Process vs Thread, Context Switching overhead, Fork/Exec, Memory Paging and Page Faults",
      "Deadlock conditions (Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait) and Bankers Algorithm",
      "DBMS Indexing (B-Tree vs Hash Index vs LSM-Tree), Index selectivity and composite keys",
      "Transaction Isolation Levels (Read Uncommitted, Read Committed, Repeatable Read, Serializable) & Phenomena (Dirty Read, Non-repeatable Read, Phantom Read)",
      "TCP 3-Way Handshake, 4-Way Connection Teardown, TCP Windowing and Flow Control vs UDP",
      "TLS/HTTPS Handshake, DNS Resolution hierarchy, and HTTP/1.1 vs HTTP/2 vs HTTP/3 (QUIC)"
    ],
    sampleQuestions: [
      {
        q: "What exactly happens when you type https://google.com into your browser and hit Enter?",
        a: "1) Browser checks DNS cache (browser, OS, router, recursive resolver). 2) ARP resolves router MAC address if on local network. 3) TCP 3-way handshake (SYN, SYN-ACK, ACK). 4) TLS 1.3 handshake (client hello, server certificate verification, Diffie-Hellman key exchange). 5) Browser sends HTTP GET request. 6) Server/Reverse proxy (Nginx) receives, load balances to web app, processes and streams HTTP response. 7) Browser parses HTML, builds DOM and CSSOM trees, executes JavaScript, renders pixels.",
        tips: "Structure chronologically from DNS -> Transport -> TLS -> Application -> DOM rendering."
      }
    ],
    verifiedResources: [
      { title: "Carnegie Mellon 15-445 Database Systems Internals", url: "https://15445.courses.cs.cmu.edu/", source: "CMU Database Group" },
      { title: "Operating Systems: Three Easy Pieces (OSTEP)", url: "https://pages.cs.wisc.edu/~remzi/OSTEP/", source: "University of Wisconsin" }
    ]
  },
  {
    id: "prod-behavioral",
    title: "Bar-Raiser & Leadership Principles",
    category: "Behavioral",
    estimatedHours: "10-15 hrs",
    importance: "High",
    provenance: "Verified Curriculum",
    description: "Evaluating cultural alignment, customer obsession, conflict resolution, and ownership using the STAR method.",
    keyTopics: [
      "Customer Obsession & Working Backwards from customer pain points",
      "Ownership & Bias for Action: Making high-velocity two-way door decisions",
      "Disagree and Commit: Handling technical disagreements with peers or leads",
      "Failure & Post-Mortem Analysis: Root causes, prevention mechanisms, blameless culture",
      "The STAR Framework: Situation (15%), Task (15%), Action (50%), Result (20%)"
    ],
    sampleQuestions: [
      {
        q: "Tell me about a time you had a technical disagreement with a teammate or team lead. How was it resolved?",
        a: "Structure using STAR: Situation: Choosing between a relational database (PostgreSQL) vs NoSQL for an analytics feature. Task: We had conflicting proposals with 1 week before sprint commitment. Action: Rather than arguing theoretical merits, I created a benchmarking prototype measuring query latency and write throughput against our peak expected traffic, invited the colleague to review the data together. Result: Data revealed PostgreSQL JSONB handled our indexing needs with 40% lower operational complexity. We aligned on PostgreSQL and shipped on schedule.",
        tips: "Always demonstrate humility, data-driven reasoning, and respect for teammates."
      }
    ],
    verifiedResources: [
      { title: "Amazon Leadership Principles Explained with Examples", url: "https://www.amazon.jobs/content/en/our-workplace/leadership-principles", source: "Amazon Careers" }
    ]
  }
];

const SERVICE_MODULES: PrepModule[] = [
  {
    id: "serv-quant-aptitude",
    title: "Quantitative Aptitude & Mathematical Reasoning",
    category: "Aptitude",
    estimatedHours: "25-35 hrs",
    importance: "Critical",
    provenance: "Verified Curriculum",
    description: "First elimination round for service companies (TCS NQT, Infosys DSY, Wipro Elite, Accenture Cognitive). Speed and accuracy are vital.",
    keyTopics: [
      "Percentages, Profit and Loss, Discount formulas",
      "Time, Speed and Distance (Relative Speed, Trains, Boats & Streams)",
      "Time and Work, Pipes and Cisterns",
      "Ratio and Proportion, Partnerships and Averages",
      "Permutation, Combination, and Probability fundamentals",
      "Number Systems (LCM, HCF, Divisibility rules, Unit digit calculations)"
    ],
    sampleQuestions: [
      {
        q: "A train 150m long passes a pole in 15 seconds and passes another train of equal length coming from opposite direction in 12 seconds. What is the speed of the second train?",
        a: "Speed of first train = Distance / Time = 150m / 15s = 10 m/s (36 km/h). In crossing the second train, total distance = 150 + 150 = 300m. Relative speed = 300m / 12s = 25 m/s. Since they are moving in opposite directions, Relative Speed = S1 + S2 => 25 = 10 + S2 => S2 = 15 m/s (54 km/h).",
        tips: "Remember: when two bodies move in opposite directions, relative speed is S1 + S2; in same direction, S1 - S2."
      },
      {
        q: "In how many ways can the letters of the word 'LEADER' be arranged?",
        a: "The word LEADER has 6 letters, where 'E' repeats 2 times. Formula: n! / (p! * q!) = 6! / 2! = 720 / 2 = 360 ways.",
        tips: "Always count repeated letters first to avoid double counting permutations."
      }
    ],
    verifiedResources: [
      { title: "IndiaBIX - Quantitative Aptitude Practice", url: "https://www.indiabix.com/aptitude/questions-and-answers/", source: "IndiaBIX" },
      { title: "GeeksforGeeks Placement Aptitude Preparation", url: "https://www.geeksforgeeks.org/placements-gq/", source: "GeeksforGeeks" }
    ]
  },
  {
    id: "serv-logical-verbal",
    title: "Logical Reasoning & Business English",
    category: "Aptitude",
    estimatedHours: "20-30 hrs",
    importance: "Critical",
    provenance: "Verified Curriculum",
    description: "Critical screening section testing pattern deduction, syllogistic reasoning, and clear verbal comprehension.",
    keyTopics: [
      "Syllogisms & Venn Diagram deductions",
      "Blood Relations, Direction Sense tests, and Coding-Decoding",
      "Seating Arrangements (Linear, Circular, Facing Inwards/Outwards)",
      "Sentence Correction, Spotting Errors, and Subject-Verb Agreement",
      "Reading Comprehension (Identifying main themes and inference questions)",
      "Active-Passive Voice and Direct-Indirect Speech transformations"
    ],
    sampleQuestions: [
      {
        q: "Statements: All mangoes are golden. No golden things are cheap. Conclusion I: All mangoes are cheap. Conclusion II: Golden things are not cheap.",
        a: "Conclusion II follows. Mangoes are subset of Golden, and Golden is disjoint from Cheap. Therefore no mango is cheap (invalidating I) and golden things are definitely not cheap (validating II).",
        tips: "Draw clean Venn diagrams with non-overlapping circles for negative statements."
      }
    ],
    verifiedResources: [
      { title: "IndiaBIX - Logical Reasoning Suite", url: "https://www.indiabix.com/logical-reasoning/questions-and-answers/", source: "IndiaBIX" },
      { title: "IndiaBIX - Verbal Ability Practice", url: "https://www.indiabix.com/verbal-ability/questions-and-answers/", source: "IndiaBIX" }
    ]
  },
  {
    id: "serv-core-programming",
    title: "Core Programming & Pseudo-Code Basics",
    category: "Core CS",
    estimatedHours: "25-35 hrs",
    importance: "High",
    provenance: "Verified Curriculum",
    description: "Evaluates ability to trace code loops, predict output, understand memory allocation, and write bug-free foundational programs.",
    keyTopics: [
      "C / C++ Basics: Pointers, memory allocation (malloc/free vs new/delete), references, and scope",
      "Java OOP Fundamentals: Polymorphism, abstraction, interfaces vs abstract classes, garbage collection",
      "Basic Data Structures: Arrays, Strings, Singly Linked Lists, Stacks, Queues",
      "Output Prediction: Bitwise operators, prefix vs postfix increment (i++ vs ++i), recursion depth",
      "Essential Algorithms: Linear & Binary Search, Bubble/Insertion/Merge Sort",
      "Relational SQL Basics: SELECT, WHERE, GROUP BY, HAVING, INNER/LEFT/RIGHT JOINs"
    ],
    sampleQuestions: [
      {
        q: "What is the difference between Call by Value and Call by Reference in C++?",
        a: "Call by Value passes a copy of the actual parameter to the function; changes made inside the function do not affect the original caller variable. Call by Reference passes the address/alias of the variable; changes directly mutate the caller's variable in memory.",
        tips: "Mention that pass by reference saves memory and CPU overhead for large objects/structs."
      },
      {
        q: "Write a SQL query to find the second highest salary from an Employee table.",
        a: "SELECT MAX(salary) FROM Employee WHERE salary < (SELECT MAX(salary) FROM Employee); OR using modern SQL: SELECT DISTINCT salary FROM Employee ORDER BY salary DESC LIMIT 1 OFFSET 1;",
        tips: "Mention handling ties (duplicate salaries) with the DISTINCT keyword."
      }
    ],
    verifiedResources: [
      { title: "GeeksforGeeks - C Programming Foundation", url: "https://www.geeksforgeeks.org/c-programming-language/", source: "GeeksforGeeks" },
      { title: "HackerRank - 30 Days of Code", url: "https://www.hackerrank.com/domains/tutorials/30-days-of-code", source: "HackerRank" }
    ]
  },
  {
    id: "serv-hr-managerial",
    title: "HR, Relocation & Managerial Interview Rounds",
    category: "HR & Soft Skills",
    estimatedHours: "10-15 hrs",
    importance: "High",
    provenance: "Verified Curriculum",
    description: "Service company HR rounds evaluate communication fluency, willingness to adapt to project tech stacks, relocation, and shift flexibility.",
    keyTopics: [
      "Self Introduction: 90-second crisp elevator pitch highlighting academics, projects, and career goal",
      "Why this company? (Company history, scale, global presence, recent digital transformation initiatives)",
      "Flexibility & Relocation: Answering questions regarding shift timings, travel, and different tech stacks",
      "Handling Service Agreements / Bonds with professionalism and clear long-term perspective",
      "Team collaboration and handling pressure during project delivery deadlines"
    ],
    sampleQuestions: [
      {
        q: "Are you willing to relocate or work in rotating shifts if required by client needs?",
        a: "Yes, absolutely. As a beginning professional in technology, my primary priority is learning and delivering value to the team and clients. I am comfortable with relocation and rotating shifts as required by project milestones.",
        tips: "Service companies prioritize adaptability and operational flexibility."
      },
      {
        q: "What if you are assigned a technology or domain that was not your first preference (e.g. legacy system or support role)?",
        a: "I view technology as a tool to solve business problems. Any project provides opportunities to understand enterprise architecture, client communication, and software lifecycles. I will perform with 100% dedication while continuing to upskill in modern technologies.",
        tips: "Highlight willingness to learn and professional responsibility."
      }
    ],
    verifiedResources: [
      { title: "Top 25 HR Interview Questions and Verified Answers", url: "https://www.geeksforgeeks.org/top-hr-interview-questions-and-answers/", source: "GeeksforGeeks" }
    ]
  }
];

export default function CompanyPrepPage({
  initialTrack = "product",
  prepProgress = {},
  onTogglePrepItem
}: CompanyPrepPageProps) {
  const [activeTrack, setActiveTrack] = useState<CompanyTrack>(initialTrack);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    "prod-dsa-advanced": true,
    "serv-quant-aptitude": true
  });

  const modules = activeTrack === "product" ? PRODUCT_MODULES : SERVICE_MODULES;

  const categories = ["All", ...Array.from(new Set(modules.map(m => m.category)))];

  const filteredModules = modules.filter(m => {
    const matchesCategory = selectedCategory === "All" || m.category === selectedCategory;
    const matchesSearch = 
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.keyTopics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedModules(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Calculate track progress
  const trackItemIds = modules.map(m => m.id);
  const completedCount = trackItemIds.filter(id => prepProgress[id]).length;
  const progressPercent = Math.round((completedCount / (trackItemIds.length || 1)) * 100);

  return (
    <div className="space-y-6">
      
      {/* Header with Track Selector */}
      <div className="bg-[#111827] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Verified Information
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Structured Curriculum
              </span>
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">Company Preparation Tracks</h1>
            <p className="text-xs text-gray-400 mt-1 max-w-xl">
              Targeted preparation tailored specifically for the rigorous requirements of Tier-1 Product Companies and High-Volume Service Companies.
            </p>
          </div>

          {/* Track Switcher */}
          <div className="flex items-center bg-[#0b0f19] p-1.5 rounded-xl border border-white/10 self-start md:self-auto">
            <button
              onClick={() => {
                setActiveTrack("product");
                setSelectedCategory("All");
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTrack === "product"
                  ? "bg-[#2563EB] text-white shadow-lg shadow-blue-500/20"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>Product-Based</span>
            </button>
            <button
              onClick={() => {
                setActiveTrack("service");
                setSelectedCategory("All");
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTrack === "service"
                  ? "bg-[#2563EB] text-white shadow-lg shadow-blue-500/20"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Service-Based</span>
            </button>
          </div>
        </div>

        {/* Track Overview & Progress Banner */}
        <div className="mt-6 pt-5 border-t border-white/5 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-[#0b0f19] border border-white/5 rounded-xl p-3.5">
            <span className="text-[10px] font-mono text-gray-400 block uppercase">Target Companies</span>
            <p className="text-xs font-bold text-white mt-1">
              {activeTrack === "product" 
                ? "Google, Meta, Amazon, Microsoft, Uber, Razorpay, Swiggy" 
                : "TCS, Infosys, Wipro, Accenture, Cognizant, Capgemini, HCL"}
            </p>
          </div>

          <div className="bg-[#0b0f19] border border-white/5 rounded-xl p-3.5">
            <span className="text-[10px] font-mono text-gray-400 block uppercase">Core Evaluation</span>
            <p className="text-xs font-bold text-white mt-1">
              {activeTrack === "product" 
                ? "Complex DSA, System Architecture (HLD/LLD), CS Fundamentals" 
                : "Aptitude (Quant/Reasoning), Verbal, Core CS, Adaptability"}
            </p>
          </div>

          <div className="bg-[#0b0f19] border border-white/5 rounded-xl p-3.5">
            <span className="text-[10px] font-mono text-gray-400 block uppercase">Interview Format</span>
            <p className="text-xs font-bold text-white mt-1">
              {activeTrack === "product" 
                ? "4-5 Rounds (DSA, Coding, HLD, LLD, Bar-Raiser)" 
                : "Online Assessment (Cognitive/Technical) + Tech/HR Interview"}
            </p>
          </div>

          <div className="bg-[#0b0f19] border border-white/5 rounded-xl p-3.5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-gray-400 uppercase">Your Track Progress</span>
              <span className="text-xs font-bold text-[#60a5fa]">{progressPercent}%</span>
            </div>
            <div className="w-full bg-white/5 h-2 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <span className="text-[9px] text-gray-400 font-mono mt-1">
              {completedCount} of {trackItemIds.length} modules completed
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 custom-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-white/10 text-white border border-white/15"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search topics or concepts..."
            className="w-full bg-[#111827] border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#2563EB]"
          />
        </div>
      </div>

      {/* Modules List */}
      <div className="space-y-4">
        {filteredModules.length === 0 ? (
          <div className="bg-[#111827] border border-white/5 rounded-2xl p-10 text-center">
            <BookOpen className="w-10 h-10 text-gray-600 mx-auto mb-3" />
            <p className="text-sm font-bold text-gray-300">No modules found matching your filter</p>
            <p className="text-xs text-gray-500 mt-1">Try selecting "All" or resetting your search term.</p>
          </div>
        ) : (
          filteredModules.map(module => {
            const isExpanded = !!expandedModules[module.id];
            const isCompleted = !!prepProgress[module.id];

            return (
              <div 
                key={module.id}
                className={`bg-[#111827] border rounded-2xl transition-all duration-200 overflow-hidden ${
                  isCompleted ? "border-emerald-500/30" : "border-white/5 hover:border-white/10"
                }`}
              >
                {/* Module Header */}
                <div className="p-5 flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5 min-w-0">
                    <button
                      onClick={() => onTogglePrepItem && onTogglePrepItem(module.id)}
                      title={isCompleted ? "Mark as Incomplete" : "Mark as Completed"}
                      className="mt-1 text-gray-500 hover:text-emerald-400 transition-colors shrink-0"
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-500" />
                      )}
                    </button>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-white/5 text-gray-300 border border-white/5">
                          {module.category}
                        </span>
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold ${
                          module.importance === "Critical" 
                            ? "bg-red-500/10 text-red-400 border border-red-500/20"
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        }`}>
                          {module.importance}
                        </span>
                        <span className="text-[10px] font-mono text-gray-500">
                          {module.estimatedHours}
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          {module.provenance}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-white tracking-tight">
                        {module.title}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                        {module.description}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleExpand(module.id)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors shrink-0"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-white/5 space-y-5 bg-[#0b0f19]/40">
                    
                    {/* Key Topics Covered */}
                    <div>
                      <h4 className="text-[11px] font-mono uppercase tracking-wider text-gray-400 font-bold mb-2.5 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-[#60a5fa]" /> Core Syllabus & Key Topics
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {module.keyTopics.map((topic, idx) => (
                          <div key={idx} className="flex items-start gap-2 bg-[#111827] p-2.5 rounded-xl border border-white/5 text-xs text-gray-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#60a5fa] mt-1.5 shrink-0"></span>
                            <span>{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Sample Interview Questions */}
                    {module.sampleQuestions.length > 0 && (
                      <div>
                        <h4 className="text-[11px] font-mono uppercase tracking-wider text-gray-400 font-bold mb-2.5 flex items-center gap-1.5">
                          <HelpCircle className="w-3.5 h-3.5 text-purple-400" /> Typical Interview Questions & Model Answers
                        </h4>
                        <div className="space-y-3">
                          {module.sampleQuestions.map((qItem, qIdx) => (
                            <div key={qIdx} className="bg-[#111827] rounded-xl p-3.5 border border-white/5 space-y-2">
                              <p className="text-xs font-bold text-white flex items-start gap-2">
                                <span className="text-[#60a5fa] font-mono">Q{qIdx + 1}:</span>
                                <span>{qItem.q}</span>
                              </p>
                              <div className="pl-5 text-xs text-gray-300 leading-relaxed bg-[#0b0f19] p-3 rounded-lg border border-white/5 font-sans">
                                <span className="text-[10px] font-mono text-emerald-400 font-bold block mb-1">RECOMMENDED ANSWER:</span>
                                {qItem.a}
                              </div>
                              <div className="pl-5 flex items-center gap-1.5 text-[11px] text-amber-400/90 font-mono">
                                <Zap className="w-3 h-3 shrink-0" />
                                <span>Pro Tip: {qItem.tips}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Verified Learning Resources */}
                    {module.verifiedResources.length > 0 && (
                      <div>
                        <h4 className="text-[11px] font-mono uppercase tracking-wider text-gray-400 font-bold mb-2 flex items-center gap-1.5">
                          <ExternalLink className="w-3.5 h-3.5 text-blue-400" /> Verified Free Learning Resources
                        </h4>
                        <div className="flex flex-wrap gap-2.5">
                          {module.verifiedResources.map((res, rIdx) => (
                            <a
                              key={rIdx}
                              href={res.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium hover:bg-blue-500/20 transition-all"
                            >
                              <span>{res.title}</span>
                              <span className="text-[10px] text-gray-400 font-mono">({res.source})</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
