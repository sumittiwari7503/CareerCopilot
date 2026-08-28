import React from "react";
import { Briefcase, Plus, Trash2, X, PlusCircle, Calendar, MapPin, Check } from "lucide-react";
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
  onUpdateJobStatus?: (id: string, nextStatus: "Wishlist" | "Applied" | "Assessment" | "Interview" | "Offer") => void;
}

export default function PipelinePage({
  jobs,
  pipelineFilter,
  showAddJobModal,
  setShowAddJobModal,
  newJob,
  setNewJob,
  handleAddJobCard,
  deleteJobCard,
  onUpdateJobStatus
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
          className="px-4 py-2.5 font-bold text-xs"
          icon={<Plus className="w-4 h-4" />}
        >
          Add Job
        </Button>
      </section>

      {/* 2. Desktop Kanban Board */}
      <div className="hidden lg:grid grid-cols-5 gap-4 items-start">
        {stages.map((stage) => {
          const stageJobs = getJobsByStage(stage);
          return (
            <div key={stage} className="space-y-3.5 bg-white/2 p-3 rounded-2xl border border-white/5 min-h-[500px] flex flex-col">
              
              {/* Column Header */}
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider font-mono">{stage}</span>
                <Badge variant={stage === "Offer" ? "success" : stage === "Interview" ? "info" : "default"}>
                  {stageJobs.length}
                </Badge>
              </div>

              {/* Column Cards List */}
              <div className="space-y-3 pt-2 flex-1">
                {stageJobs.length === 0 ? (
                  <div className="text-center py-12 text-[10px] text-gray-500 border border-dashed border-white/5 rounded-xl flex items-center justify-center h-full">
                    Empty Stage
                  </div>
                ) : (
                  stageJobs.map((j) => (
                    <Card key={j.id} className="bg-[#111827] border border-white/5 p-4 space-y-3 relative group transition-all hover:border-white/15">
                      
                      {/* Title & priority check */}
                      <div className="flex justify-between items-start gap-1">
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-white truncate leading-snug">{j.title}</h4>
                          <span className="text-[10.5px] text-gray-400 block truncate mt-0.5">{j.company}</span>
                        </div>
                        {j.priorityFlag && <Badge variant="error" className="px-1 py-0 text-[8px] font-mono shrink-0">Priority</Badge>}
                      </div>

                      {/* Location and Date details */}
                      <div className="flex justify-between items-center text-[9px] font-mono text-gray-500">
                        <span className="flex items-center gap-0.5 truncate max-w-[55%]"><MapPin className="w-2.5 h-2.5" /> {j.location || "Remote"}</span>
                        <span className="truncate">{j.date}</span>
                      </div>

                      {/* Stage Selector and Actions */}
                      <div className="flex justify-between items-center pt-2 border-t border-white/5">
                        <select
                          value={j.status}
                          onChange={(e) => onUpdateJobStatus?.(j.id, e.target.value as any)}
                          className="bg-transparent border-none text-[9px] font-mono text-gray-400 hover:text-white cursor-pointer focus:outline-none bg-[#111827] border border-white/5 p-1 rounded hover:bg-white/5 transition-all"
                        >
                          {stages.map(st => (
                            <option key={st} value={st}>{st}</option>
                          ))}
                        </select>

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

      {/* 3. Mobile/Tablet Staged view lists */}
      <div className="lg:hidden space-y-4">
        <div className="space-y-3">
          {jobs.length === 0 ? (
            <div className="text-center py-10 text-xs text-gray-500">
              No applications in your pipeline. Click "Add Job" to start tracking.
            </div>
          ) : (
            jobs.map((j) => (
              <Card key={j.id} className="p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-bold text-white text-xs font-mono uppercase shrink-0">
                    {j.company.slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-white truncate">{j.title}</h4>
                      {j.priorityFlag && <Badge variant="error" className="text-[8px] font-mono">Priority</Badge>}
                    </div>
                    <p className="text-[11px] text-gray-400">
                      {j.company} • <span className="font-mono">{j.location || "Remote"}</span>
                    </p>
                  </div>
                </div>

                <div className="flex justify-between sm:justify-end items-center gap-4 border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-500 font-mono">{j.date}</span>
                    <select
                      value={j.status}
                      onChange={(e) => onUpdateJobStatus?.(j.id, e.target.value as any)}
                      className="bg-transparent border border-white/10 text-[9px] font-mono text-gray-400 hover:text-white cursor-pointer focus:outline-none bg-[#111827] p-1 rounded hover:bg-white/5 transition-all"
                    >
                      {stages.map(st => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>
                  
                  <button 
                    onClick={() => deleteJobCard(j.id)}
                    className="p-1.5 text-gray-500 hover:text-red-400 transition-colors border border-white/5 rounded-lg hover:bg-white/5"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </Card>
            ))
          )}
        </div>
      </div>

      {/* 4. Add Job Modal */}
      {showAddJobModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <Card className="max-w-md w-full p-6 space-y-4 relative border-white/10 shadow-2xl">
            <button 
              onClick={() => setShowAddJobModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Add Job Opportunity</h3>
              <p className="text-[11px] text-gray-400">Track target positions from your target engineering list.</p>
            </div>

            <div className="space-y-3 pt-2">
              <Input 
                label="Job Title"
                value={newJob.title}
                onChange={(e) => setNewJob(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g. Senior Frontend Architect"
                className="text-xs"
              />

              <Input 
                label="Company Name"
                value={newJob.company}
                onChange={(e) => setNewJob(prev => ({ ...prev, company: e.target.value }))}
                placeholder="e.g. Google"
                className="text-xs"
              />

              <div className="grid grid-cols-2 gap-3">
                <Input 
                  label="Office Location"
                  value={newJob.location}
                  onChange={(e) => setNewJob(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="e.g. Mountain View, CA"
                  className="text-xs"
                />

                <Select 
                  label="Application Stage"
                  value={newJob.status}
                  onChange={(e) => setNewJob(prev => ({ ...prev, status: e.target.value as any }))}
                  options={statusOptions}
                />
              </div>

              <div className="flex items-center gap-2.5 py-1.5 cursor-pointer select-none" onClick={() => setNewJob(prev => ({ ...prev, priorityFlag: !prev.priorityFlag }))}>
                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${newJob.priorityFlag ? "bg-red-500 border-red-500" : "border-white/20 hover:border-white/40"}`}>
                  {newJob.priorityFlag && <Check className="w-2.5 h-2.5 text-white stroke-[3px]" />}
                </div>
                <span className="text-xs text-gray-300 font-bold">Mark as High Priority Goal</span>
              </div>
            </div>

            <div className="flex gap-3 pt-3 border-t border-white/5">
              <Button 
                onClick={() => setShowAddJobModal(false)}
                variant="outline" 
                className="flex-1 py-2.5 text-xs font-bold"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleAddJobCard}
                variant="primary" 
                className="flex-1 py-2.5 text-xs font-bold"
              >
                Save Tracking Card
              </Button>
            </div>

          </Card>
        </div>
      )}

    </div>
  );
}
