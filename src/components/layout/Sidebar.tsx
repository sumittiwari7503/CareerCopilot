import React, { useState } from "react";
import { 
  LayoutDashboard, 
  Map, 
  User,
  Code2, 
  Building2, 
  FolderGit2, 
  Mic, 
  FileText, 
  Briefcase, 
  BarChart3, 
  BookOpen, 
  Settings,
  ChevronDown,
  ChevronRight,
  Compass
} from "lucide-react";

export type TabId = 
  | "overview"
  | "roadmap"
  | "dsa"
  | "company-product"
  | "company-service"
  | "projects"
  | "interview-technical"
  | "interview-hr"
  | "interview-behavioral"
  | "interview-mock"
  | "resume"
  | "jobs"
  | "analytics"
  | "resources"
  | "settings";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: TabId) => void;
  userName: string;
  userLevel?: string;
  avatar: string;
  targetRole?: string;
}

export default function Sidebar({ activeTab, setActiveTab, userName, avatar, targetRole }: SidebarProps) {
  const [companyOpen, setCompanyOpen] = useState(true);
  const [interviewOpen, setInterviewOpen] = useState(true);

  const isCompanyActive = activeTab === "company-product" || activeTab === "company-service";
  const isInterviewActive = 
    activeTab === "interview-technical" || 
    activeTab === "interview-hr" || 
    activeTab === "interview-behavioral" || 
    activeTab === "interview-mock";

  const navItemClass = (isActive: boolean) => 
    `w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors duration-150 ${
      isActive 
        ? "bg-blue-600/15 text-blue-400 font-semibold border border-blue-500/20" 
        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
    }`;

  const subNavItemClass = (isActive: boolean) =>
    `w-full text-left px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors duration-150 ${
      isActive 
        ? "text-blue-400 font-semibold bg-blue-500/10" 
        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/30"
    }`;

  return (
    <aside className="w-64 bg-[#0f172a] border-r border-slate-800/80 flex flex-col justify-between hidden lg:flex h-screen sticky top-0 select-none">
      
      {/* Top Branding & Navigation */}
      <div className="p-4 space-y-4 overflow-y-auto flex-1 custom-scrollbar">
        
        {/* Brand Header */}
        <div className="flex items-center gap-2.5 px-2 py-1 pb-3 border-b border-slate-800/70">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/20">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-100 tracking-wide block uppercase">CareerCopilot</span>
            <span className="text-[10px] text-slate-400 font-normal block">Career Operating System</span>
          </div>
        </div>

        {/* Navigation Sections */}
        <nav className="space-y-4 pt-1">
          
          {/* Overview */}
          <div>
            <button
              onClick={() => setActiveTab("overview")}
              className={navItemClass(activeTab === "overview" || activeTab === "home")}
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4 text-slate-400" />
                <span>Overview</span>
              </div>
            </button>
          </div>

          {/* Section: CAREER */}
          <div className="space-y-1">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-3 block">Career</span>
            
            <button
              onClick={() => setActiveTab("roadmap")}
              className={navItemClass(activeTab === "roadmap")}
            >
              <div className="flex items-center gap-2.5">
                <Map className="w-4 h-4 text-slate-400" />
                <span>Career Roadmap</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={navItemClass(activeTab === "settings")}
            >
              <div className="flex items-center gap-2.5">
                <User className="w-4 h-4 text-slate-400" />
                <span>Career Profile</span>
              </div>
            </button>
          </div>

          {/* Section: PREPARATION */}
          <div className="space-y-1">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-3 block">Preparation</span>
            
            {/* DSA & Coding */}
            <button
              onClick={() => setActiveTab("dsa")}
              className={navItemClass(activeTab === "dsa")}
            >
              <div className="flex items-center gap-2.5">
                <Code2 className="w-4 h-4 text-slate-400" />
                <span>DSA & Coding</span>
              </div>
            </button>

            {/* Company Preparation */}
            <div>
              <button
                onClick={() => {
                  setCompanyOpen(!companyOpen);
                  if (!isCompanyActive) setActiveTab("company-product");
                }}
                className={navItemClass(isCompanyActive)}
              >
                <div className="flex items-center gap-2.5">
                  <Building2 className="w-4 h-4 text-slate-400" />
                  <span>Company Prep</span>
                </div>
                {companyOpen ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
              </button>

              {companyOpen && (
                <div className="pl-6 pr-1 py-1 space-y-0.5 border-l border-slate-800 ml-4 mt-1">
                  <button
                    onClick={() => setActiveTab("company-product")}
                    className={subNavItemClass(activeTab === "company-product")}
                  >
                    Product Based
                  </button>
                  <button
                    onClick={() => setActiveTab("company-service")}
                    className={subNavItemClass(activeTab === "company-service")}
                  >
                    Service Based
                  </button>
                </div>
              )}
            </div>

            {/* Interview Preparation */}
            <div>
              <button
                onClick={() => {
                  setInterviewOpen(!interviewOpen);
                  if (!isInterviewActive) setActiveTab("interview-technical");
                }}
                className={navItemClass(isInterviewActive)}
              >
                <div className="flex items-center gap-2.5">
                  <Mic className="w-4 h-4 text-slate-400" />
                  <span>Interview Prep</span>
                </div>
                {interviewOpen ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
              </button>

              {interviewOpen && (
                <div className="pl-6 pr-1 py-1 space-y-0.5 border-l border-slate-800 ml-4 mt-1">
                  <button
                    onClick={() => setActiveTab("interview-technical")}
                    className={subNavItemClass(activeTab === "interview-technical")}
                  >
                    Technical Questions
                  </button>
                  <button
                    onClick={() => setActiveTab("interview-hr")}
                    className={subNavItemClass(activeTab === "interview-hr")}
                  >
                    HR Questions
                  </button>
                  <button
                    onClick={() => setActiveTab("interview-behavioral")}
                    className={subNavItemClass(activeTab === "interview-behavioral")}
                  >
                    Behavioral (STAR)
                  </button>
                  <button
                    onClick={() => setActiveTab("interview-mock")}
                    className={subNavItemClass(activeTab === "interview-mock")}
                  >
                    AI Mock Coach
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Section: PORTFOLIO */}
          <div className="space-y-1">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-3 block">Portfolio</span>
            
            <button
              onClick={() => setActiveTab("projects")}
              className={navItemClass(activeTab === "projects")}
            >
              <div className="flex items-center gap-2.5">
                <FolderGit2 className="w-4 h-4 text-slate-400" />
                <span>Projects</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab("resume")}
              className={navItemClass(activeTab === "resume")}
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-slate-400" />
                <span>Resume & ATS</span>
              </div>
            </button>
          </div>

          {/* Section: JOBS */}
          <div className="space-y-1">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-3 block">Jobs</span>
            
            <button
              onClick={() => setActiveTab("jobs")}
              className={navItemClass(activeTab === "jobs")}
            >
              <div className="flex items-center gap-2.5">
                <Briefcase className="w-4 h-4 text-slate-400" />
                <span>Applications</span>
              </div>
            </button>
          </div>

          {/* Section: INSIGHTS */}
          <div className="space-y-1">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-3 block">Insights</span>
            
            <button
              onClick={() => setActiveTab("analytics")}
              className={navItemClass(activeTab === "analytics")}
            >
              <div className="flex items-center gap-2.5">
                <BarChart3 className="w-4 h-4 text-slate-400" />
                <span>Analytics</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab("resources")}
              className={navItemClass(activeTab === "resources")}
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4 text-slate-400" />
                <span>Resources</span>
              </div>
            </button>
          </div>

          {/* Section: SETTINGS */}
          <div className="space-y-1 pt-1">
            <button
              onClick={() => setActiveTab("settings")}
              className={navItemClass(activeTab === "settings")}
            >
              <div className="flex items-center gap-2.5">
                <Settings className="w-4 h-4 text-slate-400" />
                <span>Settings</span>
              </div>
            </button>
          </div>

        </nav>
      </div>

      {/* User Info Footer - Clean SaaS Account Component (No "L5 Level") */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-900/60">
        <button
          onClick={() => setActiveTab("settings")}
          className="w-full flex items-center gap-3 p-2 rounded-xl text-left hover:bg-slate-800/60 transition-colors group cursor-pointer"
          title="Open career profile and settings"
        >
          <div className="w-8 h-8 rounded-lg overflow-hidden bg-slate-800 border border-slate-700/80 flex items-center justify-center font-semibold text-xs text-slate-200 shrink-0">
            {avatar ? (
              <img src={avatar} alt={userName} className="w-full h-full object-cover" />
            ) : (
              userName ? userName.charAt(0).toUpperCase() : "U"
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-200 truncate group-hover:text-blue-400 transition-colors">
              {userName || "Candidate"}
            </p>
            <p className="text-[11px] text-slate-400 truncate">
              {targetRole || "View profile"}
            </p>
          </div>
        </button>
      </div>

    </aside>
  );
}
