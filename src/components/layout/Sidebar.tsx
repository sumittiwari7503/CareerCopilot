import React, { useState } from "react";
import { 
  Compass, 
  Map, 
  Code, 
  Building2, 
  FolderGit2, 
  Mic, 
  FileText, 
  Briefcase, 
  BarChart3, 
  BookOpen, 
  Settings,
  ChevronDown,
  ChevronRight
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
  userLevel: string;
  avatar: string;
}

export default function Sidebar({ activeTab, setActiveTab, userName, userLevel, avatar }: SidebarProps) {
  // Track open state for expandable groups
  const [companyOpen, setCompanyOpen] = useState(true);
  const [interviewOpen, setInterviewOpen] = useState(true);

  const isCompanyActive = activeTab === "company-product" || activeTab === "company-service";
  const isInterviewActive = 
    activeTab === "interview-technical" || 
    activeTab === "interview-hr" || 
    activeTab === "interview-behavioral" || 
    activeTab === "interview-mock";

  return (
    <aside className="w-64 bg-[#111827] border-r border-white/5 flex flex-col justify-between hidden lg:flex h-screen sticky top-0">
      
      {/* Branding and Navigation Links */}
      <div className="p-5 space-y-4 overflow-y-auto flex-1 custom-scrollbar">
        
        {/* Brand Header */}
        <div className="flex items-center gap-3 pb-2 border-b border-white/5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#2563EB] to-[#4F46E5] flex items-center justify-center border border-white/10 shadow-lg shadow-[#2563EB]/10">
            <Compass className="w-4.5 h-4.5 text-white" />
          </div>
          <div>
            <h1 className="text-xs font-extrabold text-white tracking-widest uppercase">CareerCopilot</h1>
            <span className="text-[9px] font-mono text-[#60a5fa] font-bold uppercase tracking-wider block">Career OS</span>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="space-y-1">
          {/* 1. Overview */}
          <button
            onClick={() => setActiveTab("overview")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all relative ${
              activeTab === "overview" 
                ? "bg-[#2563EB]/15 text-white shadow-sm border border-[#2563EB]/20" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Compass className={`w-4 h-4 ${activeTab === "overview" ? "text-[#60a5fa]" : "text-gray-400"}`} />
              <span>Overview</span>
            </div>
            {activeTab === "overview" && <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]"></span>}
          </button>

          {/* 2. Career Roadmap */}
          <button
            onClick={() => setActiveTab("roadmap")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all relative ${
              activeTab === "roadmap" 
                ? "bg-[#2563EB]/15 text-white shadow-sm border border-[#2563EB]/20" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Map className={`w-4 h-4 ${activeTab === "roadmap" ? "text-[#60a5fa]" : "text-gray-400"}`} />
              <span>Career Roadmap</span>
            </div>
            {activeTab === "roadmap" && <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]"></span>}
          </button>

          {/* 3. DSA & Coding */}
          <button
            onClick={() => setActiveTab("dsa")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all relative ${
              activeTab === "dsa" 
                ? "bg-[#2563EB]/15 text-white shadow-sm border border-[#2563EB]/20" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Code className={`w-4 h-4 ${activeTab === "dsa" ? "text-[#60a5fa]" : "text-gray-400"}`} />
              <span>DSA & Coding</span>
            </div>
            {activeTab === "dsa" && <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]"></span>}
          </button>

          {/* 4. Company Preparation (Group with sub-items) */}
          <div className="pt-1">
            <button
              onClick={() => {
                setCompanyOpen(!companyOpen);
                if (!isCompanyActive) setActiveTab("company-product");
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                isCompanyActive
                  ? "bg-white/5 text-white" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Building2 className={`w-4 h-4 ${isCompanyActive ? "text-[#60a5fa]" : "text-gray-400"}`} />
                <span>Company Prep</span>
              </div>
              {companyOpen ? <ChevronDown className="w-3.5 h-3.5 text-gray-500" /> : <ChevronRight className="w-3.5 h-3.5 text-gray-500" />}
            </button>

            {companyOpen && (
              <div className="pl-6 pr-1 py-1 space-y-0.5 border-l border-white/5 ml-4 mt-0.5">
                <button
                  onClick={() => setActiveTab("company-product")}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${
                    activeTab === "company-product"
                      ? "text-[#60a5fa] font-bold bg-[#2563EB]/10"
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  Product Based
                </button>
                <button
                  onClick={() => setActiveTab("company-service")}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${
                    activeTab === "company-service"
                      ? "text-[#60a5fa] font-bold bg-[#2563EB]/10"
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  Service Based
                </button>
              </div>
            )}
          </div>

          {/* 5. Projects */}
          <button
            onClick={() => setActiveTab("projects")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all relative ${
              activeTab === "projects" 
                ? "bg-[#2563EB]/15 text-white shadow-sm border border-[#2563EB]/20" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FolderGit2 className={`w-4 h-4 ${activeTab === "projects" ? "text-[#60a5fa]" : "text-gray-400"}`} />
              <span>Projects</span>
            </div>
            {activeTab === "projects" && <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]"></span>}
          </button>

          {/* 6. Interview Preparation (Group with sub-items) */}
          <div className="pt-1">
            <button
              onClick={() => {
                setInterviewOpen(!interviewOpen);
                if (!isInterviewActive) setActiveTab("interview-technical");
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                isInterviewActive
                  ? "bg-white/5 text-white" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Mic className={`w-4 h-4 ${isInterviewActive ? "text-[#60a5fa]" : "text-gray-400"}`} />
                <span>Interview</span>
              </div>
              {interviewOpen ? <ChevronDown className="w-3.5 h-3.5 text-gray-500" /> : <ChevronRight className="w-3.5 h-3.5 text-gray-500" />}
            </button>

            {interviewOpen && (
              <div className="pl-6 pr-1 py-1 space-y-0.5 border-l border-white/5 ml-4 mt-0.5">
                <button
                  onClick={() => setActiveTab("interview-technical")}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${
                    activeTab === "interview-technical"
                      ? "text-[#60a5fa] font-bold bg-[#2563EB]/10"
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  Technical
                </button>
                <button
                  onClick={() => setActiveTab("interview-hr")}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${
                    activeTab === "interview-hr"
                      ? "text-[#60a5fa] font-bold bg-[#2563EB]/10"
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  HR Interview
                </button>
                <button
                  onClick={() => setActiveTab("interview-behavioral")}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${
                    activeTab === "interview-behavioral"
                      ? "text-[#60a5fa] font-bold bg-[#2563EB]/10"
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  Behavioral (STAR)
                </button>
                <button
                  onClick={() => setActiveTab("interview-mock")}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${
                    activeTab === "interview-mock"
                      ? "text-[#60a5fa] font-bold bg-[#2563EB]/10"
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  Mock Coach (AI)
                </button>
              </div>
            )}
          </div>

          {/* 7. Resume & Portfolio */}
          <button
            onClick={() => setActiveTab("resume")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all relative ${
              activeTab === "resume" 
                ? "bg-[#2563EB]/15 text-white shadow-sm border border-[#2563EB]/20" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FileText className={`w-4 h-4 ${activeTab === "resume" ? "text-[#60a5fa]" : "text-gray-400"}`} />
              <span>Resume & Portfolio</span>
            </div>
            {activeTab === "resume" && <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]"></span>}
          </button>

          {/* 8. Jobs / Applications */}
          <button
            onClick={() => setActiveTab("jobs")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all relative ${
              activeTab === "jobs" 
                ? "bg-[#2563EB]/15 text-white shadow-sm border border-[#2563EB]/20" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Briefcase className={`w-4 h-4 ${activeTab === "jobs" ? "text-[#60a5fa]" : "text-gray-400"}`} />
              <span>Applications</span>
            </div>
            {activeTab === "jobs" && <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]"></span>}
          </button>

          {/* 9. Analytics */}
          <button
            onClick={() => setActiveTab("analytics")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all relative ${
              activeTab === "analytics" 
                ? "bg-[#2563EB]/15 text-white shadow-sm border border-[#2563EB]/20" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <BarChart3 className={`w-4 h-4 ${activeTab === "analytics" ? "text-[#60a5fa]" : "text-gray-400"}`} />
              <span>Analytics</span>
            </div>
            {activeTab === "analytics" && <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]"></span>}
          </button>

          {/* 10. Resources */}
          <button
            onClick={() => setActiveTab("resources")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all relative ${
              activeTab === "resources" 
                ? "bg-[#2563EB]/15 text-white shadow-sm border border-[#2563EB]/20" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <BookOpen className={`w-4 h-4 ${activeTab === "resources" ? "text-[#60a5fa]" : "text-gray-400"}`} />
              <span>Resources</span>
            </div>
            {activeTab === "resources" && <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]"></span>}
          </button>

          {/* 11. Settings (Career Profile) */}
          <button
            onClick={() => setActiveTab("settings")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all relative ${
              activeTab === "settings" 
                ? "bg-[#2563EB]/15 text-white shadow-sm border border-[#2563EB]/20" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Settings className={`w-4 h-4 ${activeTab === "settings" ? "text-[#60a5fa]" : "text-gray-400"}`} />
              <span>Settings</span>
            </div>
            {activeTab === "settings" && <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]"></span>}
          </button>
        </nav>
      </div>

      {/* User Info Footer */}
      <div className="p-4 border-t border-white/5 bg-white/2">
        <div className="flex items-center gap-3 p-2 rounded-xl bg-white/5 border border-white/5">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-white/10 border border-white/10 flex items-center justify-center font-bold text-xs text-white">
            {avatar ? (
              <img src={avatar} alt={userName} className="w-full h-full object-cover" />
            ) : (
              userName.charAt(0).toUpperCase() || "U"
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-white truncate">{userName || "Candidate"}</p>
            <span className="text-[9px] font-mono text-[#60a5fa] font-bold block">{userLevel} Level</span>
          </div>
        </div>
      </div>

    </aside>
  );
}
