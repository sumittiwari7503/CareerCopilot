import React from "react";
import { Briefcase, Plus, Trash2, X, PlusCircle, Calendar, MapPin } from "lucide-react";
import { JobCard } from "../../types";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";

interface PipelinePageProps {
  jobs: JobCard[];
  pipelineFilter: string;
  setPipelineFilter: (filter: string) => void;
  showAddJobModal: boolean;
  setShowAddJobModal: (show: boolean) => void;
  newJob: {
    title: string;
    company: string;
    status: "Wishlist" | "Applied" | "Assessment" | "Interview" | "Offer";
    priorityFlag: boolean;
    location: string;
  };
  setNewJob: React.Dispatch<React.SetStateAction<{
    title: string;
    company: string;
    status: "Wishlist" | "Applied" | "Assessment" | "Interview" | "Offer";
    priorityFlag: boolean;
    location: string;
  }>>;
  handleAddJobCard: () => void;
  deleteJobCard: (id: string) => void;
}

export default function PipelinePage({
  jobs,
  pipelineFilter,
  showAddJobModal,
  setShowAddJobModal,
  newJob,
  setNewJob,
  handleAddJobCard,
  deleteJobCard
}: PipelinePageProps) {
  // Available Stages
  const stages = ["Wishlist", "Applied", "Assessment", "Interview", "Offer"] as const;

  const getJobsByStage = (stage: typeof stages[number]) => {
    return jobs.filter((j) => j.status === stage);
  };

  const statusOptions = [
    { value: "Wishlist", label: "Wishlist" },
    { value: "Applied", label: "Applied" },
    { value: "Assessment", label: "Assessment" },
    { value: "Interview", label: "Interview" },
    { value: "Offer", label: "Offer" }
  ];

  return (
    <div className="space-y-8">
      
      {/* 1. Header Details */}
      <section className="flex justify-between items-center border-b border-white/5 pb-4">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-[#2563EB]" /> Jobs Pipeline Tracker
          </h2>
          <p className="text-xs text-gray-400">
            Organize target vacancies, applications, and scheduling stages.
          </p>
        </div>
        <Button 
          onClick={() => setShowAddJobModal(true)}
          variant="primary"
          className="px-3.5 py-2.5"
          icon={<Plus className="w-4 h-4" />}
        >
          Add Job
        </Button>
      </section>

      {/* 2. Desktop Kanban Board (Hidden on mobile/tablet, multi-column grid) */}
      <div className="hidden lg:grid grid-cols-5 gap-3.5 items-start">
        {stages.map((stage) => {
          const stageJobs = getJobsByStage(stage);
          return (
            <div key={stage} className="space-y-3.5">
              
              {/* Column Header */}
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider font-mono">{stage}</span>
                <Badge variant={stage === "Offer" ? "success" : stage === "Interview" ? "info" : "default"}>
                  {stageJobs.length}
                </Badge>
              </div>

              {/* Column Cards List */}
              <div className="space-y-2.5 min-h-[300px]">
                {stageJobs.length === 0 ? (
                  <div className="text-center py-8 text-[10px] text-gray-600 border border-dashed border-white/5 rounded-xl">
                    Empty Stage
                  </div>
                ) : (
                  stageJobs.map((j) => (
                    <Card key={j.id} variant="compact" className="bg-[#111827] border border-white/5 space-y-2.5 relative group">
                      
                      {/* Title & priority check */}
                      <div className="flex justify-between items-start gap-1">
                        <div className="min-w-0">
                          <h4 className="text-[11px] font-bold text-white truncate">{j.title}</h4>
                          <span className="text-[10px] text-gray-400 block truncate">{j.company}</span>
                        </div>
                        {j.priorityFlag && <Badge variant="error" className="px-1 py-0 text-[8px]">P</Badge>}
                      </div>

                      {/* Location and Date details */}
                      <div className="flex justify-between items-center text-[9px] font-mono text-gray-500">
                        <span className="flex items-center gap-0.5 truncate max-w-[50%]"><MapPin className="w-2.5 h-2.5" /> {j.location || "Remote"}</span>
                        <span className="truncate">{j.date}</span>
                      </div>

                      {/* Hover action delete icon */}
                      <div className="flex justify-end pt-1 border-t border-white/2">
                        <button 
                          onClick={() => deleteJobCard(j.id)}
                          className="text-gray-500 hover:text-red-400 transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    </Card>
                  ))
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* 3. Mobile/Tablet Staged view lists (Collapses giant horizontal table) */}
      <div className="lg:hidden space-y-4">
        
        {/* Horizontal scroll select status column tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1.5 no-scrollbar text-xs">
          {stages.map((stage) => (
            <button
              key={stage}
              onClick={() => {}}
              className="px-3.5 py-1.5 rounded-full border border-white/5 text-[10px] font-bold uppercase tracking-wider bg-white/2 text-gray-400"
            >
              {stage}
            </button>
          ))}
        </div>

        {/* Unified list board showing all card statuses */}
        <div className="space-y-3">
          {jobs.length === 0 ? (
            <div className="text-center py-10 text-xs text-gray-500">
              No applications in your pipeline. Click "Add Job" to start tracking.
            </div>
          ) : (
            jobs.map((j) => (
              <Card key={j.id} className="flex justify-between items-center">
                
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-bold text-white text-xs font-serif uppercase shrink-0">
                    {j.company.slice(0, 2)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-white">{j.title}</h4>
                      {j.priorityFlag && <Badge variant="error">Priority</Badge>}
                    </div>
                    <p className="text-[11px] text-gray-400">
                      {j.company} • <span className="font-mono">{j.location || "Remote"}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-gray-500 block">{j.date}</span>
                    <Badge variant="default" className="mt-1">{j.status}</Badge>
                  </div>
                  
                  <button 
                    onClick={() => deleteJobCard(j.id)}
                    className="p-1 text-gray-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </Card>
            ))
          )}
        </div>

      </div>

      {/* 4. Add Job Modal Overlay */}
      {showAddJobModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-[#111827] border border-white/10 rounded-2xl p-5 w-full max-w-sm space-y-4">
            
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <h4 className="text-xs uppercase font-extrabold text-white tracking-wider">Tether Job Target</h4>
              <button onClick={() => setShowAddJobModal(false)} className="text-gray-400 hover:text-white"><X className="w-4 h-4" /></button>
            </div>

            <div className="space-y-3.5">
              <Input 
                label="Job Title"
                value={newJob.title}
                onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                placeholder="e.g. Frontend Specialist"
                required
              />

              <Input 
                label="Company Name"
                value={newJob.company}
                onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                placeholder="e.g. Vercel Inc"
                required
              />

              <Select 
                label="Status Stage"
                value={newJob.status}
                onChange={(e) => setNewJob({ ...newJob, status: e.target.value as any })}
                options={statusOptions}
              />

              <div className="flex gap-2 items-center pt-1.5 select-none">
                <input 
                  type="checkbox"
                  id="modal-priority-chk"
                  checked={newJob.priorityFlag}
                  onChange={(e) => setNewJob({ ...newJob, priorityFlag: e.target.checked })}
                  className="rounded border-white/20 accent-[#2563EB]"
                />
                <label htmlFor="modal-priority-chk" className="text-[10px] uppercase font-bold text-gray-400 tracking-wider cursor-pointer">
                  Mark as Priority Application
                </label>
              </div>
            </div>

            <Button 
              onClick={handleAddJobCard}
              variant="primary"
              className="w-full py-2.5"
            >
              Add to Pipeline
            </Button>

          </div>
        </div>
      )}

    </div>
  );
}
