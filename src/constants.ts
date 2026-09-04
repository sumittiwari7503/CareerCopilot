import { ResourceItem, DsaProblemItem, InterviewTopicGuide } from "./types";

export const FAQS = [
  {
    id: "faq-1",
    question: "How does CareerCopilot personalize my preparation?",
    answer: "CareerCopilot evaluates your target role, timeline, and current verified skills. It compares your skill inventory against genuine engineering benchmarks to structure tailored DSA problem sets, milestones, and interview simulations."
  },
  {
    id: "faq-2",
    question: "Is my resume and career profile data secure?",
    answer: "Yes. All profile details, uploaded resume text, and practice sessions are strictly isolated to your authenticated Supabase user ID and encrypted in PostgreSQL. Your personal data is never shared with third parties."
  },
  {
    id: "faq-3",
    question: "How is my ATS compatibility score determined?",
    answer: "The ATS engine scores resumes using a transparent 3-pillar formula: keyword alignment against target role requirements (40%), structure and section completeness (30%), and measurable quantified achievements with action verbs (30%)."
  },
  {
    id: "faq-4",
    question: "What is the difference between Product-Based and Service-Based preparation?",
    answer: "Product-based companies typically test deep DSA, system architecture, and domain problem solving across multiple rounds. Service-based companies typically test quantitative/logical aptitude, verbal communication, and foundational CS/OOP basics before HR rounds."
  }
];

// All 17 Canonical DSA Topics requested in Step 4
export const DSA_TOPICS = [
  "Arrays",
  "Strings",
  "Hashing",
  "Two Pointers",
  "Sliding Window",
  "Stack",
  "Queue",
  "Linked List",
  "Binary Search",
  "Trees",
  "BST",
  "Heap",
  "Graph",
  "Recursion",
  "Backtracking",
  "Greedy",
  "Dynamic Programming"
] as const;

export const CANONICAL_DSA_PROBLEMS: DsaProblemItem[] = [
  // Arrays
  {
    id: "dsa-1",
    name: "Two Sum",
    topic: "Arrays",
    difficulty: "Easy",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    explanation: "Use a hash map to store each number's value and index. For each element x, check if (target - x) already exists in the map.",
    solutionSnippet: `function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) return [map.get(complement)!, i];
    map.set(nums[i], i);
  }
  return [];
}`,
    link: "https://leetcode.com/problems/two-sum/",
    status: "Not Started"
  },
  {
    id: "dsa-2",
    name: "Best Time to Buy and Sell Stock",
    topic: "Arrays",
    difficulty: "Easy",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    explanation: "Track the minimum price seen so far and calculate profit at each day, maintaining the maximum profit encountered.",
    solutionSnippet: `function maxProfit(prices: number[]): number {
  let minPrice = Infinity;
  let maxProfit = 0;
  for (const p of prices) {
    if (p < minPrice) minPrice = p;
    else if (p - minPrice > maxProfit) maxProfit = p - minPrice;
  }
  return maxProfit;
}`,
    link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
    status: "Not Started"
  },
  // Strings
  {
    id: "dsa-3",
    name: "Valid Anagram",
    topic: "Strings",
    difficulty: "Easy",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    explanation: "Count character frequencies using a fixed-size frequency array of 26 letters or a hash table, comparing counts between both strings.",
    solutionSnippet: `function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false;
  const count = new Array(26).fill(0);
  for (let i = 0; i < s.length; i++) {
    count[s.charCodeAt(i) - 97]++;
    count[t.charCodeAt(i) - 97]--;
  }
  return count.every(c => c === 0);
}`,
    link: "https://leetcode.com/problems/valid-anagram/",
    status: "Not Started"
  },
  // Two Pointers
  {
    id: "dsa-4",
    name: "Valid Palindrome",
    topic: "Two Pointers",
    difficulty: "Easy",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    explanation: "Maintain two pointers (left and right). Move pointers toward center while skipping non-alphanumeric characters, verifying matching characters.",
    solutionSnippet: `function isPalindrome(s: string): boolean {
  let l = 0, r = s.length - 1;
  const clean = s.toLowerCase();
  const isAlphaNum = (c: string) => /[a-z0-9]/.test(c);
  while (l < r) {
    while (l < r && !isAlphaNum(clean[l])) l++;
    while (l < r && !isAlphaNum(clean[r])) r--;
    if (clean[l] !== clean[r]) return false;
    l++; r--;
  }
  return true;
}`,
    link: "https://leetcode.com/problems/valid-palindrome/",
    status: "Not Started"
  },
  // Sliding Window
  {
    id: "dsa-5",
    name: "Longest Substring Without Repeating Characters",
    topic: "Sliding Window",
    difficulty: "Medium",
    timeComplexity: "O(n)",
    spaceComplexity: "O(min(m, n))",
    explanation: "Use a sliding window with two pointers and a hash set or last-seen index map. Shrink the window from the left when duplicate detected.",
    solutionSnippet: `function lengthOfLongestSubstring(s: string): number {
  const seen = new Map<string, number>();
  let maxLen = 0, left = 0;
  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    if (seen.has(char) && seen.get(char)! >= left) {
      left = seen.get(char)! + 1;
    }
    seen.set(char, right);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}`,
    link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    status: "Not Started"
  },
  // Stack
  {
    id: "dsa-6",
    name: "Valid Parentheses",
    topic: "Stack",
    difficulty: "Easy",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    explanation: "Push opening brackets onto a stack. When encountering a closing bracket, pop the top of stack and check for matching pair.",
    solutionSnippet: `function isValid(s: string): boolean {
  const stack: string[] = [];
  const map: Record<string, string> = { ')': '(', '}': '{', ']': '[' };
  for (const ch of s) {
    if (map[ch]) {
      if (stack.pop() !== map[ch]) return false;
    } else {
      stack.push(ch);
    }
  }
  return stack.length === 0;
}`,
    link: "https://leetcode.com/problems/valid-parentheses/",
    status: "Not Started"
  },
  // Binary Search
  {
    id: "dsa-7",
    name: "Binary Search",
    topic: "Binary Search",
    difficulty: "Easy",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    explanation: "In a sorted array, compare target with middle element. Narrow search range to left or right half iteratively.",
    solutionSnippet: `function search(nums: number[], target: number): number {
  let l = 0, r = nums.length - 1;
  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) l = mid + 1;
    else r = mid - 1;
  }
  return -1;
}`,
    link: "https://leetcode.com/problems/binary-search/",
    status: "Not Started"
  },
  // Linked List
  {
    id: "dsa-8",
    name: "Reverse Linked List",
    topic: "Linked List",
    difficulty: "Easy",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    explanation: "Iterate through the list, redirecting each node's next pointer to the previous node using three pointers: prev, curr, next.",
    solutionSnippet: `function reverseList(head: any): any {
  let prev = null, curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}`,
    link: "https://leetcode.com/problems/reverse-linked-list/",
    status: "Not Started"
  },
  // Trees
  {
    id: "dsa-9",
    name: "Invert Binary Tree",
    topic: "Trees",
    difficulty: "Easy",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    explanation: "Recursively swap the left and right children for every node in the binary tree.",
    solutionSnippet: `function invertTree(root: any): any {
  if (!root) return null;
  const temp = root.left;
  root.left = invertTree(root.right);
  root.right = invertTree(temp);
  return root;
}`,
    link: "https://leetcode.com/problems/invert-binary-tree/",
    status: "Not Started"
  },
  // Dynamic Programming
  {
    id: "dsa-10",
    name: "Climbing Stairs",
    topic: "Dynamic Programming",
    difficulty: "Easy",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    explanation: "Each step n can be reached from (n-1) or (n-2). This reduces to Fibonacci sequence using two variables.",
    solutionSnippet: `function climbStairs(n: number): number {
  if (n <= 2) return n;
  let a = 1, b = 2;
  for (let i = 3; i <= n; i++) {
    const c = a + b;
    a = b;
    b = c;
  }
  return b;
}`,
    link: "https://leetcode.com/problems/climbing-stairs/",
    status: "Not Started"
  },
  // Graph
  {
    id: "dsa-11",
    name: "Number of Islands",
    topic: "Graph",
    difficulty: "Medium",
    timeComplexity: "O(m * n)",
    spaceComplexity: "O(m * n)",
    explanation: "Iterate through the grid. When encountering land ('1'), increment island count and run BFS/DFS to mark all connected land as visited.",
    solutionSnippet: `function numIslands(grid: string[][]): number {
  if (!grid.length) return 0;
  let count = 0;
  const dfs = (r: number, c: number) => {
    if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] !== '1') return;
    grid[r][c] = '0';
    dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1);
  };
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] === '1') { count++; dfs(r, c); }
    }
  }
  return count;
}`,
    link: "https://leetcode.com/problems/number-of-islands/",
    status: "Not Started"
  }
];

// Verified Curated Resources Library
export const CURATED_RESOURCES: ResourceItem[] = [
  // DSA
  {
    id: "res-1",
    title: "NeetCode 150 Problem Roadmap",
    category: "DSA",
    description: "Curated list of 150 high-frequency coding interview questions grouped by topic with video solutions.",
    url: "https://neetcode.io/roadmap",
    source: "NeetCode.io",
    tags: ["DSA", "LeetCode", "Patterns"]
  },
  {
    id: "res-2",
    title: "Striver's A2Z DSA Course Sheet",
    category: "DSA",
    description: "Complete topic-wise DSA roadmap from basics to advanced dynamic programming and graphs.",
    url: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2",
    source: "Take U Forward",
    tags: ["DSA", "Beginner to Advanced", "C++ / Java"]
  },
  // Development
  {
    id: "res-3",
    title: "MDN Web Docs",
    category: "Development",
    description: "The definitive reference documentation for HTML, CSS, JavaScript APIs, and modern Web Standards.",
    url: "https://developer.mozilla.org",
    source: "Mozilla Developer Network",
    tags: ["JavaScript", "Web Development", "Reference"]
  },
  {
    id: "res-4",
    title: "React Official Documentation",
    category: "Development",
    description: "Comprehensive guides on React component architecture, Hooks, state management, and rendering cycles.",
    url: "https://react.dev",
    source: "React Core Team",
    tags: ["React", "Frontend", "Architecture"]
  },
  // CS Fundamentals
  {
    id: "res-5",
    title: "Operating Systems: Three Easy Pieces (OSTEP)",
    category: "CS Fundamentals",
    description: "Free authoritative textbook covering Virtualization, Concurrency, and Persistence in modern OS.",
    url: "https://pages.cs.wisc.edu/~remzi/OSTEP/",
    source: "University of Wisconsin-Madison",
    tags: ["OS", "Threads", "Memory Management"]
  },
  {
    id: "res-6",
    title: "CMU Database Systems (15-445/645)",
    category: "CS Fundamentals",
    description: "World-renowned course on relational database internals, storage engines, buffer pool, and concurrency control.",
    url: "https://15445.courses.cs.cmu.edu/",
    source: "Carnegie Mellon University",
    tags: ["DBMS", "SQL", "Storage Engines"]
  },
  // Interview Prep
  {
    id: "res-7",
    title: "Tech Interview Handbook",
    category: "Interview",
    description: "Carefully curated coding interview study guide, algorithms cheatsheets, behavioral tips, and resume formats.",
    url: "https://www.techinterviewhandbook.org",
    source: "Yangshun Tay (Meta)",
    tags: ["Coding Interview", "Behavioral", "Cheatsheet"]
  },
  {
    id: "res-8",
    title: "System Design Primer",
    category: "Company Prep",
    description: "Open-source guide to learning large-scale system design: load balancers, caching, microservices, and databases.",
    url: "https://github.com/donnemartin/system-design-primer",
    source: "Donne Martin",
    tags: ["System Design", "Scalability", "Architecture"]
  },
  // Resume
  {
    id: "res-9",
    title: "Harvard Office of Career Services Resume Guide",
    category: "Resume",
    description: "Standard action-verb driven single-page bullet guidelines for tech and professional resumes.",
    url: "https://careerservices.fas.harvard.edu/resources/create-a-strong-resume/",
    source: "Harvard University",
    tags: ["ATS Resume", "Action Verbs", "Formatting"]
  }
];

// Verified Technical Interview Topic Guides
export const INTERVIEW_TOPIC_GUIDES: InterviewTopicGuide[] = [
  {
    id: "tech-oop",
    title: "Object-Oriented Programming (OOP)",
    category: "Technical",
    description: "Core paradigms tested in technical rounds: Encapsulation, Inheritance, Polymorphism, and Abstraction.",
    questions: [
      {
        q: "What are the 4 fundamental pillars of OOP?",
        a: "Encapsulation (bundling data and methods into single units), Abstraction (hiding internal implementation details), Inheritance (deriving new classes from existing ones), and Polymorphism (ability of an object to take many forms via method overloading or overriding).",
        keyPoints: ["Encapsulation", "Abstraction", "Inheritance", "Polymorphism"]
      },
      {
        q: "What is the difference between an Abstract Class and an Interface?",
        a: "An abstract class can contain concrete method implementations and state (instance variables), whereas an interface historically defines only method signatures and contracts without state. A class can implement multiple interfaces but only extend one abstract class in languages like Java or C#.",
        keyPoints: ["Multiple inheritance of interfaces", "Default implementations", "State retention"]
      }
    ]
  },
  {
    id: "tech-dbms",
    title: "Database Management Systems (DBMS & SQL)",
    category: "Technical",
    description: "Relational modeling, ACID properties, indexing mechanisms, and normal forms.",
    questions: [
      {
        q: "Explain ACID properties in relational databases.",
        a: "Atomicity (all operations succeed or entire transaction rolls back), Consistency (transactions preserve DB integrity constraints), Isolation (concurrent transactions do not interfere with each other), and Durability (committed data persists across crashes).",
        keyPoints: ["Atomicity", "Consistency", "Isolation levels", "WAL durability"]
      },
      {
        q: "How does a B-Tree index speed up SELECT queries?",
        a: "A B-Tree keeps sorted keys balanced in shallow height nodes (typically depth 3-4). This reduces disk I/O from an O(n) table scan to O(log n) tree traversal, rapidly locating row pointers.",
        keyPoints: ["Balanced tree depth", "Disk page lookups", "Range scan efficiency"]
      }
    ]
  },
  {
    id: "tech-os",
    title: "Operating Systems & Networking",
    category: "Technical",
    description: "Processes vs Threads, memory paging, deadlocks, and TCP/IP protocol stack.",
    questions: [
      {
        q: "What is the key difference between a Process and a Thread?",
        a: "A process is an isolated execution context with its own independent address space, file handles, and memory. A thread is a lightweight unit of execution within a process that shares memory and heap with sibling threads, requiring synchronized access.",
        keyPoints: ["Shared heap vs private address space", "Context switch overhead", "IPC vs mutexes"]
      },
      {
        q: "What occurs during the TCP 3-Way Handshake?",
        a: "1. Client sends SYN (synchronize sequence number). 2. Server responds with SYN-ACK (acknowledging client sequence and providing server sequence). 3. Client sends ACK. The connection is established reliably.",
        keyPoints: ["SYN", "SYN-ACK", "ACK", "Sequence number negotiation"]
      }
    ]
  },
  {
    id: "hr-common",
    title: "HR & Culture Screen",
    category: "HR",
    description: "Authentic behavioral and background questions commonly asked by recruiters and hiring managers.",
    questions: [
      {
        q: "Tell me about yourself and your career journey.",
        a: "Structure your response into 3 concise segments: 1. Present (your current technical focus and primary skills), 2. Past (key projects or milestones where you delivered impact), 3. Future (why this role and company aligns with your next learning trajectory). Keep it under 2 minutes.",
        keyPoints: ["Present -> Past -> Future", "Highlight quantifiable achievements", "Connect to company mission"]
      },
      {
        q: "Why do you want to work at our company?",
        a: "Demonstrate genuine research: mention a specific engineering problem the company solves, a product architecture you admire, or technical challenges you are excited to tackle. Avoid generic platitudes.",
        keyPoints: ["Specific product knowledge", "Technical alignment", "Value addition"]
      }
    ]
  },
  {
    id: "behavioral-star",
    title: "Behavioral (STAR Method)",
    category: "Behavioral",
    description: "Structured responses to past-experience questions using Situation, Task, Action, and Result.",
    questions: [
      {
        q: "Tell me about a time you faced a difficult technical challenge and how you resolved it.",
        a: "Describe the specific context, the core bottleneck, the engineering decisions you made, and the measurable outcome achieved.",
        keyPoints: ["Concrete metrics", "Ownership", "Technical trade-offs"],
        starGuide: {
          situation: "Our production API service experienced latency spikes up to 4,200ms during peak load, causing user timeouts.",
          task: "I was tasked with identifying the root cause within 48 hours and reducing p99 latency back under 200ms.",
          action: "I profiled slow queries using APM traces, uncovered missing composite indexes on tenant lookups, implemented Redis caching with a 15-minute TTL, and optimized batch database queries.",
          result: "p99 response time dropped from 4,200ms to 85ms, eliminating timeouts and reducing database CPU utilization by 65%."
        }
      },
      {
        q: "Describe a situation where you had a disagreement with a team member. How did you handle it?",
        a: "Focus on technical objectivity, data-driven prototyping, and mutual alignment rather than personal conflict.",
        keyPoints: ["Empathy", "Data-driven decisions", "Shared team goal"],
        starGuide: {
          situation: "During architectural planning, a colleague advocated for adopting a microservices architecture while I recommended staying with a modular monolith.",
          task: "We needed to align on a roadmap to meet a tight 2-month delivery deadline without accumulating premature operational overhead.",
          action: "I scheduled a 30-minute sync, listened to their concerns about scalability, and created a quick benchmark matrix comparing deployment complexity and CI/CD time. We agreed on clean domain boundary modules that could be cleanly extracted into services later.",
          result: "We delivered the project on time with zero operational incidents, and successfully split the high-traffic billing module into a standalone service 8 months later when scale demanded it."
        }
      }
    ]
  }
];

