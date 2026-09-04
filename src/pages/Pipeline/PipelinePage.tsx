import React, { useState, useEffect } from "react";
import { 
  Briefcase, 
  Plus, 
  Trash2, 
  X, 
  Calendar, 
  MapPin, 
  Search, 
  ExternalLink, 
  ShieldCheck, 
  Edit3, 
  CheckCircle2, 
  XCircle,
  Clock,
  DollarSign,
  Building2,
  FolderOpen
} from "lucide-react";
import { JobCard } from "../../types";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import Input from "../../components/ui/Input";

export const PIPELINE_STAGES = [
  "Saved",
  "Applied",
  "Online Assessment",
  "Technical Interview",
  "HR Interview",
  "Offer",
  "Rejected"
] as const;

export type PipelineStage = typeof PIPELINE_STAGES[number];

interface PipelinePageProps {
  jobs: JobCard[];
  pipelineFilter: string;
  setPipelineFilter: (filter: string) => void;
  showAddJobModal: boolean;
  setShowAddJobModal: (show: boolean) => void;
  newJob: {
    title: string;
    company: string;
    status: any;
    priorityFlag: boolean;
    location: string;
  };
  setNewJob: React.Dispatch<React.SetStateAction<{
    title: string;
    company: string;
    status: any;
    priorityFlag: boolean;
    location: string;
  }>>;
  handleAddJobCard: () => void;
  deleteJobCard: (id: string) => void;
  onUpdateJobStatus?: (id: string, nextStatus: any) => void;
  onUpdateJobCard?: (id: string, updatedFields: Partial<JobCard>) => void;
}

export default function PipelinePage({
  jobs,
  pipelineFilter,
  setPipelineFilter,
  showAddJobModal,
  setShowAddJobModal,
  newJob,
  setNewJob,
  handleAddJobCard,
  deleteJobCard,
  onUpdateJobStatus,
  onUpdateJobCard
}: PipelinePageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStageTab, setSelectedStageTab] = useState<string>("All");
  
  // Edit Modal State
  const [editingJob, setEditingJob] = useState<JobCard | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCompany, setEditCompany] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editStatus, setEditStatus] = useState<string>("Saved");
  const [editPriority, setEditPriority] = useState(false);
  const [editSalary, setEditSalary] = useState("");
  const [editUrl, setEditUrl] = useState("");
  const [editInterviewDate, setEditInterviewDate] = useState("");
  const [editFollowUpDate, setEditFollowUpDate] = useState("");
  const [editNotes, setEditNotes] = useState("");

  // Normalizer for stages to handle legacy data
  const normalizeStage = (status: string): PipelineStage => {
    if (status === "Wishlist") return "Saved";
    if (status === "Assessment") return "Online Assessment";
    if (status === "Interview") return "Technical Interview";
    if (PIPELINE_STAGES.includes(status as any)) return status as PipelineStage;
    return "Saved";
  };

  useEffect(() => {
    if (editingJob) {
      setEditTitle(editingJob.title || "");
      setEditCompany(editingJob.company || "");
      setEditLocation(editingJob.location || "");
      setEditStatus(normalizeStage(editingJob.status));
      setEditPriority(!!editingJob.priorityFlag);
      setEditSalary(editingJob.meta?.salary || "");
      setEditUrl(editingJob.meta?.url || "");
      setEditInterviewDate(editingJob.meta?.interviewDate || "");
      setEditFollowUpDate(editingJob.meta?.followUpDate || "");
      setEditNotes(editingJob.meta?.notes || "");
    }
  }, [editingJob]);

  const handleSaveEdit = () => {
    if (!editingJob || !onUpdateJobCard) return;
    onUpdateJobCard(editingJob.id, {
      title: editTitle,
      company: editCompany,
      location: editLocation,
      status: editStatus as any,
      priorityFlag: editPriority,
      meta: {
        salary: editSalary,
        url: editUrl,
        interviewDate: editInterviewDate,
        followUpDate: editFollowUpDate,
        notes: editNotes
      }
    });
    setEditingJob(null);
  };

  // Filtered jobs
  const filteredJobs = jobs.filter(job => {
    const stage = normalizeStage(job.status);
    const matchesStage = selectedStageTab === "All" || stage === selectedStageTab;
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (job.location && job.location.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStage && matchesSearch;
  });

  const getJobsByStage = (stage: PipelineStage) => {
    return filteredJobs.filter(j => normalizeStage(j.status) === stage);
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="bg-[#111827] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Candidate Pipeline
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {jobs.length} Applications Tracked
              </span>
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">Job Applications & Pipeline Tracker</h1>
            <p className="text-xs text-gray-400 mt-1 max-w-xl">
              Manage your end-to-end recruitment funnel across all 7 stages from wishlist to final offers.
            </p>
          </div>

          <button
            onClick={() => setShowAddJobModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2563EB] text-white text-xs font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20 shrink-0 self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Application</span>
          </button>
        </div>

        {/* Funnel Metrics Bar */}
        <div className="mt-6 pt-4 border-t border-white/5 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {PIPELINE_STAGES.map(st => {
            const count = jobs.filter(j => normalizeStage(j.status) === st).length;
            return (
              <div 
                key={st}
                onClick={() => setSelectedStageTab(selectedStageTab === st ? "All" : st)}
                className={`p-2 rounded-xl border transition-all cursor-pointer text-center ${
                  selectedStageTab === st 
                    ? "bg-[#2563EB]/15 border-[#2563EB]/40 text-white" 
                    : "bg-[#0b0f19] border-white/5 hover:border-white/10 text-gray-400"
                }`}
              >
                <span className="text-[9px] font-mono uppercase block truncate">{st}</span>
                <span className="text-sm font-bold text-white block mt-0.5">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 custom-scrollbar">
          <button
            onClick={() => setSelectedStageTab("All")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedStageTab === "All"
                ? "bg-white/10 text-white border border-white/15"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            All Stages ({jobs.length})
          </button>
          {PIPELINE_STAGES.map(st => (
            <button
              key={st}
              onClick={() => setSelectedStageTab(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedStageTab === st
                  ? "bg-white/10 text-white border border-white/15"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search company or role..."
            className="w-full bg-[#111827] border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#2563EB]"
          />
        </div>
      </div>

      {/* Main Content Area */}
      {jobs.length === 0 ? (
        <div className="bg-[#111827] border border-white/5 rounded-2xl p-12 text-center space-y-3">
          <FolderOpen className="w-12 h-12 text-gray-600 mx-auto" />
          <h3 className="text-sm font-bold text-gray-300">No applications tracked yet</h3>
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            Keep all your job applications organized in one unified Kanban pipeline. Track interview schedules, follow-up dates, and salary offers.
          </p>
          <button
            onClick={() => setShowAddJobModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-lg shadow-blue-500/20 mt-2"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Your First Application</span>
          </button>
        </div>
      ) : selectedStageTab !== "All" ? (
        /* Single Stage List View */
        <div className="space-y-3">
          {filteredJobs.length === 0 ? (
            <div className="bg-[#111827] border border-white/5 rounded-2xl p-10 text-center text-xs text-gray-500">
              No applications currently in stage "{selectedStageTab}".
            </div>
          ) : (
            filteredJobs.map(job => (
              <div
                key={job.id}
                onClick={() => setEditingJob(job)}
                className="bg-[#111827] border border-white/5 hover:border-white/15 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-white text-xs font-mono uppercase shrink-0">
                    {job.company.slice(0, 2)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-white">{job.title}</h4>
                      {job.priorityFlag && <span className="px-1.5 py-0.5 rounded text-[8px] font-mono font-bold bg-red-500/20 text-red-400 border border-red-500/30">Priority</span>}
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {job.company} • <span className="font-mono text-gray-500">{job.location || "Remote"}</span>
                      {job.meta?.salary && <span className="text-emerald-400 font-mono ml-2">• {job.meta.salary}</span>}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <select
                    value={normalizeStage(job.status)}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => {
                      e.stopPropagation();
                      onUpdateJobStatus?.(job.id, e.target.value as any);
                    }}
                    className="bg-[#0b0f19] border border-white/10 rounded-lg px-2.5 py-1 text-xs text-gray-300 focus:outline-none focus:border-[#2563EB]"
                  >
                    {PIPELINE_STAGES.map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteJobCard(job.id);
                    }}
                    className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-white/5 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        /* Full 7-Stage Desktop Kanban View */
        <div className="overflow-x-auto pb-4 custom-scrollbar">
          <div className="grid grid-cols-7 gap-3 min-w-[1200px]">
            {PIPELINE_STAGES.map(stage => {
              const stageJobs = getJobsByStage(stage);

              return (
                <div 
                  key={stage}
                  className="bg-[#111827] border border-white/5 rounded-2xl p-3 flex flex-col min-h-[480px]"
                >
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400">
                      {stage}
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/5 text-gray-300">
                      {stageJobs.length}
                    </span>
                  </div>

                  <div className="space-y-2.5 flex-1">
                    {stageJobs.length === 0 ? (
                      <div className="h-full flex items-center justify-center text-[10px] text-gray-600 font-mono border border-dashed border-white/5 rounded-xl p-4 text-center">
                        No cards
                      </div>
                    ) : (
                      stageJobs.map(job => (
                        <div
                          key={job.id}
                          onClick={() => setEditingJob(job)}
                          className="bg-[#0b0f19] border border-white/5 hover:border-white/15 p-3 rounded-xl cursor-pointer transition-all space-y-2 group"
                        >
                          <div className="flex items-start justify-between gap-1">
                            <div className="min-w-0">
                              <h4 className="text-xs font-bold text-white truncate leading-snug">{job.title}</h4>
                              <p className="text-[11px] text-gray-400 truncate">{job.company}</p>
                            </div>
                            {job.priorityFlag && (
                              <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 mt-1"></span>
                            )}
                          </div>

                          <div className="flex items-center justify-between text-[10px] font-mono text-gray-500">
                            <span className="truncate max-w-[60%]">{job.location || "Remote"}</span>
                            <span>{job.date ? job.date.slice(5) : ""}</span>
                          </div>

                          <div className="pt-1.5 border-t border-white/5 flex items-center justify-between">
                            <select
                              value={normalizeStage(job.status)}
                              onClick={(e) => e.stopPropagation()}
                              onChange={(e) => {
                                e.stopPropagation();
                                onUpdateJobStatus?.(job.id, e.target.value as any);
                              }}
                              className="bg-transparent border-none text-[9px] font-mono text-gray-400 hover:text-white cursor-pointer focus:outline-none"
                            >
                              {PIPELINE_STAGES.map(st => (
                                <option key={st} value={st}>{st}</option>
                              ))}
                            </select>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteJobCard(job.id);
                              }}
                              className="text-gray-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add Job Modal */}
      {showAddJobModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-white/10 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h3 className="text-sm font-bold text-white">Add Job Application</h3>
              <button 
                onClick={() => setShowAddJobModal(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-mono text-gray-400 uppercase font-bold block mb-1">
                  Job Title *
                </label>
                <input
                  type="text"
                  required
                  value={newJob.title}
                  onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                  placeholder="e.g. Software Engineer II"
                  className="w-full bg-[#0b0f19] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-gray-400 uppercase font-bold block mb-1">
                  Company *
                </label>
                <input
                  type="text"
                  required
                  value={newJob.company}
                  onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                  placeholder="e.g. Google, Microsoft, Stripe"
                  className="w-full bg-[#0b0f19] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono text-gray-400 uppercase font-bold block mb-1">
                    Pipeline Stage
                  </label>
                  <select
                    value={newJob.status}
                    onChange={(e) => setNewJob({ ...newJob, status: e.target.value as any })}
                    className="w-full bg-[#0b0f19] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#2563EB]"
                  >
                    {PIPELINE_STAGES.map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-gray-400 uppercase font-bold block mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={newJob.location}
                    onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                    placeholder="Remote / Bengaluru / SF"
                    className="w-full bg-[#0b0f19] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="priorityCheck"
                  checked={newJob.priorityFlag}
                  onChange={(e) => setNewJob({ ...newJob, priorityFlag: e.target.checked })}
                  className="rounded bg-[#0b0f19] border-white/10 text-[#2563EB]"
                />
                <label htmlFor="priorityCheck" className="text-xs text-gray-300">
                  Mark as High Priority Target
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setShowAddJobModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleAddJobCard();
                    setShowAddJobModal(false);
                  }}
                  disabled={!newJob.title.trim() || !newJob.company.trim()}
                  className="px-5 py-2 rounded-xl bg-[#2563EB] text-white text-xs font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50"
                >
                  Save Application
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Job Modal */}
      {editingJob && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-white/10 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h3 className="text-sm font-bold text-white">Edit Application Details</h3>
              <button 
                onClick={() => setEditingJob(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono text-gray-400 uppercase font-bold block mb-1">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full bg-[#0b0f19] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#2563EB]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-gray-400 uppercase font-bold block mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    value={editCompany}
                    onChange={(e) => setEditCompany(e.target.value)}
                    className="w-full bg-[#0b0f19] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono text-gray-400 uppercase font-bold block mb-1">
                    Stage
                  </label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    className="w-full bg-[#0b0f19] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#2563EB]"
                  >
                    {PIPELINE_STAGES.map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-gray-400 uppercase font-bold block mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    className="w-full bg-[#0b0f19] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono text-gray-400 uppercase font-bold block mb-1">
                    Compensation / Salary
                  </label>
                  <input
                    type="text"
                    value={editSalary}
                    onChange={(e) => setEditSalary(e.target.value)}
                    placeholder="e.g. $140,000 / ₹28 LPA"
                    className="w-full bg-[#0b0f19] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#2563EB]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-gray-400 uppercase font-bold block mb-1">
                    Application / Job URL
                  </label>
                  <input
                    type="url"
                    value={editUrl}
                    onChange={(e) => setEditUrl(e.target.value)}
                    placeholder="https://careers..."
                    className="w-full bg-[#0b0f19] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono text-gray-400 uppercase font-bold block mb-1">
                    Interview Date
                  </label>
                  <input
                    type="date"
                    value={editInterviewDate}
                    onChange={(e) => setEditInterviewDate(e.target.value)}
                    className="w-full bg-[#0b0f19] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#2563EB]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-gray-400 uppercase font-bold block mb-1">
                    Follow-Up Date
                  </label>
                  <input
                    type="date"
                    value={editFollowUpDate}
                    onChange={(e) => setEditFollowUpDate(e.target.value)}
                    className="w-full bg-[#0b0f19] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono text-gray-400 uppercase font-bold block mb-1">
                  Interview Notes & Interviewer Names
                </label>
                <textarea
                  rows={3}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Notes about the recruiter screen, technical topics asked, or feedback..."
                  className="w-full bg-[#0b0f19] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#2563EB]"
                ></textarea>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="editPriorityCheck"
                  checked={editPriority}
                  onChange={(e) => setEditPriority(e.target.checked)}
                  className="rounded bg-[#0b0f19] border-white/10 text-[#2563EB]"
                />
                <label htmlFor="editPriorityCheck" className="text-xs text-gray-300">
                  Priority Target
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setEditingJob(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveEdit}
                  className="px-5 py-2 rounded-xl bg-[#2563EB] text-white text-xs font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
