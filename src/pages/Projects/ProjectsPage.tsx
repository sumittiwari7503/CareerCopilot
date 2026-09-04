import React, { useState } from "react";
import { 
  FolderGit2, 
  Plus, 
  Github, 
  ExternalLink, 
  Sparkles, 
  ShieldCheck, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  Clock, 
  Layers, 
  X,
  Code2,
  Tag,
  ArrowUpRight,
  RefreshCw,
  FolderOpen
} from "lucide-react";
import { UserProject, ProjectRecommendation } from "../../types";

interface ProjectsPageProps {
  userProjects: UserProject[];
  onAddProject: (project: Omit<UserProject, "id" | "createdAt">) => void;
  onUpdateProject: (id: string, updated: Partial<UserProject>) => void;
  onDeleteProject: (id: string) => void;
  projectRecommendations: ProjectRecommendation[];
  onGenerateRecommendations: () => void;
  generatingRecommendations: boolean;
}

export default function ProjectsPage({
  userProjects,
  onAddProject,
  onUpdateProject,
  onDeleteProject,
  projectRecommendations,
  onGenerateRecommendations,
  generatingRecommendations
}: ProjectsPageProps) {
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [showModal, setShowModal] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techStackInput, setTechStackInput] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [status, setStatus] = useState<"Planned" | "In Progress" | "Completed">("In Progress");
  const [resumeRelevance, setResumeRelevance] = useState("");
  const [skillsInput, setSkillsInput] = useState("");

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setTechStackInput("");
    setGithubUrl("");
    setLiveUrl("");
    setStatus("In Progress");
    setResumeRelevance("");
    setSkillsInput("");
    setEditingProjectId(null);
  };

  const handleOpenAdd = () => {
    resetForm();
    setShowModal(true);
  };

  const handleOpenEdit = (project: UserProject) => {
    setEditingProjectId(project.id);
    setTitle(project.title);
    setDescription(project.description);
    setTechStackInput(project.techStack.join(", "));
    setGithubUrl(project.githubUrl || "");
    setLiveUrl(project.liveUrl || "");
    setStatus(project.status);
    setResumeRelevance(project.resumeRelevance || "");
    setSkillsInput(project.skillsDemonstrated.join(", "));
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const techStack = techStackInput
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);

    const skillsDemonstrated = skillsInput
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);

    if (editingProjectId) {
      onUpdateProject(editingProjectId, {
        title: title.trim(),
        description: description.trim(),
        techStack,
        githubUrl: githubUrl.trim() || undefined,
        liveUrl: liveUrl.trim() || undefined,
        status,
        skillsDemonstrated,
        resumeRelevance: resumeRelevance.trim()
      });
    } else {
      onAddProject({
        title: title.trim(),
        description: description.trim(),
        techStack,
        githubUrl: githubUrl.trim() || undefined,
        liveUrl: liveUrl.trim() || undefined,
        status,
        skillsDemonstrated,
        resumeRelevance: resumeRelevance.trim()
      });
    }

    setShowModal(false);
    resetForm();
  };

  const handleAdoptRecommendation = (rec: ProjectRecommendation) => {
    onAddProject({
      title: rec.title,
      description: rec.description,
      techStack: rec.techStack,
      status: "Planned",
      skillsDemonstrated: [rec.sourceGap].filter(Boolean),
      resumeRelevance: rec.resumeValue
    });
  };

  const filteredProjects = userProjects.filter(p => {
    if (statusFilter === "All") return true;
    return p.status === statusFilter;
  });

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="bg-[#111827] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Candidate Portfolio
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {userProjects.length} Verified Projects
              </span>
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">Engineering Projects & Portfolio</h1>
            <p className="text-xs text-gray-400 mt-1 max-w-xl">
              Track and showcase your real-world software engineering projects. Highlight architectural complexity, measurable impact, and demonstrated technical skills for interviewers.
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2563EB] text-white text-xs font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20 shrink-0 self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Project</span>
          </button>
        </div>
      </div>

      {/* Projects Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-[#60a5fa]" />
              <span>Your Portfolio Projects</span>
            </h2>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Your Data
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-[#111827] p-1 rounded-xl border border-white/5">
            {["All", "Completed", "In Progress", "Planned"].map(st => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  statusFilter === st
                    ? "bg-white/10 text-white font-bold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid or Honest Empty State */}
        {filteredProjects.length === 0 ? (
          <div className="bg-[#111827] border border-white/5 rounded-2xl p-10 text-center space-y-3">
            <FolderOpen className="w-12 h-12 text-gray-600 mx-auto" />
            <div>
              <h3 className="text-sm font-bold text-gray-300">
                {userProjects.length === 0 
                  ? "No portfolio projects added yet" 
                  : `No projects with status "${statusFilter}"`}
              </h3>
              <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
                {userProjects.length === 0
                  ? "Add your production systems, full-stack web apps, or open-source contributions. You can also adopt tailored projects from the AI recommendations below."
                  : "Try selecting a different status filter or add a new project."}
              </p>
            </div>
            {userProjects.length === 0 && (
              <button
                onClick={handleOpenAdd}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-all border border-white/10"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Your First Project</span>
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProjects.map(project => (
              <div 
                key={project.id}
                className="bg-[#111827] border border-white/5 hover:border-white/10 rounded-2xl p-5 flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold mb-1.5 ${
                        project.status === "Completed"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : project.status === "In Progress"
                          ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      }`}>
                        {project.status === "Completed" ? <CheckCircle2 className="w-2.5 h-2.5" /> : <Clock className="w-2.5 h-2.5" />}
                        {project.status}
                      </span>
                      <h3 className="text-sm font-bold text-white tracking-tight">{project.title}</h3>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEdit(project)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                        title="Edit Project"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDeleteProject(project.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-white/5 transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed mb-3 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.techStack.map((tech, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/5 text-gray-300 border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Resume Relevance Note */}
                  {project.resumeRelevance && (
                    <div className="bg-[#0b0f19] p-2.5 rounded-xl border border-white/5 text-[11px] text-gray-400 mb-3">
                      <span className="font-mono text-[#60a5fa] font-bold block text-[9px] uppercase mb-0.5">Resume Impact:</span>
                      {project.resumeRelevance}
                    </div>
                  )}
                </div>

                {/* Footer Links */}
                <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-2">
                  <div className="flex items-center gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Code</span>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>

                  <span className="text-[10px] font-mono text-gray-500">
                    {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : ""}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* AI Recommendations Section */}
      <div className="bg-[#111827] border border-white/5 rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> AI-Generated Recommendation
              </span>
            </div>
            <h2 className="text-sm font-bold text-white tracking-wide">
              Tailored Portfolio Recommendations
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Targeted system architectures designed to bridge identified skill gaps in your profile.
            </p>
          </div>

          <button
            onClick={onGenerateRecommendations}
            disabled={generatingRecommendations}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-300 text-xs font-bold hover:bg-purple-600/30 transition-all disabled:opacity-50 shrink-0 self-start sm:self-auto"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${generatingRecommendations ? "animate-spin" : ""}`} />
            <span>{generatingRecommendations ? "Synthesizing Ideas..." : "Generate Fresh Ideas"}</span>
          </button>
        </div>

        {projectRecommendations.length === 0 ? (
          <div className="bg-[#0b0f19] border border-white/5 rounded-xl p-8 text-center">
            <Sparkles className="w-8 h-8 text-purple-400/50 mx-auto mb-2" />
            <p className="text-xs text-gray-400">
              No recommendations generated yet. Click "Generate Fresh Ideas" to synthesize high-impact project architectures tailored to your career goal.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {projectRecommendations.map((rec, idx) => (
              <div 
                key={idx}
                className="bg-[#0b0f19] border border-purple-500/10 hover:border-purple-500/30 rounded-xl p-4 flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-purple-500/10 text-purple-400 border border-purple-500/20 font-bold">
                      {rec.difficulty || "Intermediate"}
                    </span>
                    {rec.sourceGap && (
                      <span className="text-[10px] font-mono text-gray-400">
                        Bridges: <span className="text-purple-300 font-semibold">{rec.sourceGap}</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-xs font-bold text-white mb-1.5">{rec.title}</h3>
                  <p className="text-xs text-gray-300 leading-relaxed mb-3">
                    {rec.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {rec.techStack.map((tech, tIdx) => (
                      <span 
                        key={tIdx}
                        className="px-2 py-0.5 rounded text-[9px] font-mono bg-white/5 text-gray-400 border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {rec.resumeValue && (
                    <div className="text-[11px] text-gray-400 bg-[#111827] p-2.5 rounded-lg border border-white/5 mb-3">
                      <span className="text-[9px] font-mono text-purple-400 uppercase font-bold block mb-0.5">Resume Impact:</span>
                      {rec.resumeValue}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleAdoptRecommendation(rec)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-purple-600/15 hover:bg-purple-600/25 border border-purple-500/25 text-purple-300 text-xs font-bold transition-all mt-2"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Adopt to My Portfolio Tracker</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add / Edit Project Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-white/10 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h3 className="text-sm font-bold text-white">
                {editingProjectId ? "Edit Portfolio Project" : "Add Portfolio Project"}
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-[11px] font-mono text-gray-400 uppercase font-bold block mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Distributed Task Queue & Orchestrator"
                  className="w-full bg-[#0b0f19] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-gray-400 uppercase font-bold block mb-1">
                  Description & Architecture *
                </label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Summarize the core problem solved, architecture design, and scale..."
                  className="w-full bg-[#0b0f19] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#2563EB]"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono text-gray-400 uppercase font-bold block mb-1">
                    Tech Stack (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={techStackInput}
                    onChange={(e) => setTechStackInput(e.target.value)}
                    placeholder="Go, Redis, Docker, PostgreSQL"
                    className="w-full bg-[#0b0f19] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#2563EB]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-gray-400 uppercase font-bold block mb-1">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full bg-[#0b0f19] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#2563EB]"
                  >
                    <option value="Planned">Planned</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono text-gray-400 uppercase font-bold block mb-1">
                    GitHub URL (optional)
                  </label>
                  <input
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full bg-[#0b0f19] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#2563EB]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-gray-400 uppercase font-bold block mb-1">
                    Live Demo URL (optional)
                  </label>
                  <input
                    type="url"
                    value={liveUrl}
                    onChange={(e) => setLiveUrl(e.target.value)}
                    placeholder="https://myproject.app"
                    className="w-full bg-[#0b0f19] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono text-gray-400 uppercase font-bold block mb-1">
                  Resume Relevance & Key Metric Impact
                </label>
                <input
                  type="text"
                  value={resumeRelevance}
                  onChange={(e) => setResumeRelevance(e.target.value)}
                  placeholder="e.g. Achieved 2,500 RPS with sub-15ms p99 latency via Redis cluster caching"
                  className="w-full bg-[#0b0f19] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#2563EB] text-white text-xs font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20"
                >
                  {editingProjectId ? "Save Changes" : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
