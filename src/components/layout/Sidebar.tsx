import React from "react";
import { Compass, Map, Mic, Briefcase, TrendingUp, Settings } from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: "home" | "roadmap" | "coach" | "jobs" | "tracker" | "settings") => void;
  userName: string;
  userLevel: string;
  avatar: string;
}

export default function Sidebar({ activeTab, setActiveTab, userName, userLevel, avatar }: SidebarProps) {
  const links = [
    { id: "home", label: "Home Dashboard", icon: Compass },
    { id: "roadmap", label: "Prep Planning", icon: Map },
    { id: "coach", label: "AI Mock Coach", icon: Mic },
    { id: "jobs", label: "Jobs Pipeline", icon: Briefcase },
    { id: "tracker", label: "DSA Tracker", icon: TrendingUp },
    { id: "settings", label: "Settings", icon: Settings }
  ] as const;

  return (
    <aside className="w-64 bg-[#111827] border-r border-white/5 flex flex-col justify-between hidden lg:flex">
      
      {/* Branding and Navigation Links */}
      <div className="p-6 space-y-6">
        
        {/* Brand Header */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#2563EB] to-[#4F46E5] flex items-center justify-center border border-white/10 shadow-lg shadow-[#2563EB]/10">
            <Compass className="w-4.5 h-4.5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-extrabold text-white tracking-widest uppercase">CareerCopilot</h1>
            <span className="text-[9px] font-mono text-[#60a5fa] font-bold uppercase tracking-wider block">Aether OS</span>
          </div>
        </div>

        {/* Navigation buttons */}
        <nav className="space-y-1 pt-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all relative ${
                  isActive 
                    ? "bg-[#2563EB]/10 text-white" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 transition-colors ${isActive ? "text-[#2563EB]" : "text-gray-400"}`} />
                  <span>{link.label}</span>
                </div>
                {/* Active Indicator Bar */}
                {isActive && (
                  <span className="absolute right-0 top-3 bottom-3 w-1 bg-[#2563EB] rounded-l-full"></span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Info footer */}
      <div className="p-4 border-t border-white/5 bg-white/2">
        <div className="flex items-center gap-3 p-2 rounded-xl bg-white/5 border border-white/5">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-white/10 border border-white/10">
            <img src={avatar} alt={userName} className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-white truncate">{userName}</p>
            <span className="text-[9px] font-mono text-gray-400 font-bold block">{userLevel} Level</span>
          </div>
        </div>
      </div>

    </aside>
  );
}
