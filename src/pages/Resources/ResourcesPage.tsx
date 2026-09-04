import React, { useState } from "react";
import { 
  BookOpen, 
  Search, 
  ExternalLink, 
  ShieldCheck, 
  Tag, 
  Code2, 
  Layers, 
  Cpu, 
  Mic, 
  FileText, 
  Building2,
  FolderOpen
} from "lucide-react";
import { ResourceItem } from "../../types";
import { CURATED_RESOURCES } from "../../constants";

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "DSA",
    "Development",
    "CS Fundamentals",
    "Interview",
    "Company Prep",
    "Resume"
  ];

  const filteredResources = CURATED_RESOURCES.filter(res => {
    const matchesCategory = selectedCategory === "All" || res.category === selectedCategory;
    const matchesSearch = 
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "DSA":
        return <Code2 className="w-4 h-4 text-blue-400" />;
      case "Development":
        return <Layers className="w-4 h-4 text-purple-400" />;
      case "CS Fundamentals":
        return <Cpu className="w-4 h-4 text-emerald-400" />;
      case "Interview":
        return <Mic className="w-4 h-4 text-amber-400" />;
      case "Company Prep":
        return <Building2 className="w-4 h-4 text-indigo-400" />;
      case "Resume":
        return <FileText className="w-4 h-4 text-teal-400" />;
      default:
        return <BookOpen className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-[#111827] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Verified Free Resources
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                100% Free & Open-Source
              </span>
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">Curated Engineering Learning Library</h1>
            <p className="text-xs text-gray-400 mt-1 max-w-xl">
              Hand-picked, industry-standard tutorials, university coursewares, algorithms roadmaps, and interview handbooks used by engineers globally.
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 custom-scrollbar">
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
            placeholder="Search by topic, keyword, or author..."
            className="w-full bg-[#111827] border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#2563EB]"
          />
        </div>
      </div>

      {/* Resources Grid */}
      {filteredResources.length === 0 ? (
        <div className="bg-[#111827] border border-white/5 rounded-2xl p-12 text-center space-y-3">
          <FolderOpen className="w-12 h-12 text-gray-600 mx-auto" />
          <h3 className="text-sm font-bold text-gray-300">No resources found</h3>
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            Try resetting your search query or selecting a different category filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredResources.map(res => (
            <a
              key={res.id}
              href={res.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#111827] border border-white/5 hover:border-white/15 p-5 rounded-2xl flex flex-col justify-between transition-all group hover:bg-white/2"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/5 text-gray-300 border border-white/5 flex items-center gap-1.5">
                    {getCategoryIcon(res.category)}
                    <span>{res.category}</span>
                  </span>
                  <span className="text-[10px] font-mono text-gray-500 flex items-center gap-1 group-hover:text-blue-400 transition-colors">
                    <span>{res.source}</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors tracking-tight mb-2">
                  {res.title}
                </h3>

                <p className="text-xs text-gray-400 leading-relaxed mb-4">
                  {res.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex flex-wrap gap-1.5">
                {res.tags.map((tag, idx) => (
                  <span 
                    key={idx}
                    className="px-2 py-0.5 rounded text-[9px] font-mono bg-[#0b0f19] text-gray-400 border border-white/5"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      )}

    </div>
  );
}
