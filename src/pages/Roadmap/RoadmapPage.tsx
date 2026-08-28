import React from "react";
import { Map, Sparkles, CheckCircle2, Lock, Check } from "lucide-react";
import { CareerRoadmap, ProjectRecommendation } from "../../types";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import Select from "../../components/ui/Select";

interface RoadmapPageProps {
  targetRole: string;
  setTargetRole: (role: string) => void;
  duration: number;
  setDuration: (duration: number) => void;
  skillLevel: "Beginner" | "Intermediate";
  setSkillLevel: (level: "Beginner" | "Intermediate") => void;
  generateRoadmap: () => void;
  generatingRoadmap: boolean;
  roadmap: CareerRoadmap | null;
  checkedTasks: Record<string, boolean>;
  onToggleTask?: (key: string) => void;
  projectRecommendations: ProjectRecommendation[];
  onGenerateProjects?: () => void;
  generatingProjects: boolean;
}

export default function RoadmapPage({
  targetRole,
  setTargetRole,
  duration,
  setDuration,
  skillLevel,
  setSkillLevel,
  generateRoadmap,
  generatingRoadmap,
  roadmap,
  checkedTasks,
  onToggleTask,
  projectRecommendations,
  onGenerateProjects,
  generatingProjects
}: RoadmapPageProps) {
  // Target roles dropdown choices matching onboarding options
  const defaultRoleOptions = [
    { value: "Software Engineer", label: "Software Engineer" },
    { value: "Frontend Engineer", label: "Frontend Engineer" },
    { value: "Backend Engineer", label: "Backend Engineer" },
    { value: "Full Stack Engineer", label: "Full Stack Engineer" },
    { value: "Fullstack Developer", label: "Fullstack Developer" },
    { value: "Data Analyst", label: "Data Analyst" },
    { value: "Data Scientist", label: "Data Scientist" },
    { value: "DevOps Engineer", label: "DevOps Engineer" },
    { value: "SDE at Google", label: "SDE at Google" }
  ];

  const roleOptions = [...defaultRoleOptions];
  if (targetRole && !roleOptions.some(opt => opt.value === targetRole)) {
    roleOptions.push({ value: targetRole, label: targetRole });
  }

  return (
    <div className="space-y-8">
      
      {/* 1. Header Details */}
      <section className="space-y-1">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Map className="w-5 h-5 text-[#2563EB]" /> Prep Planning & Timeline
        </h2>
        <p className="text-xs text-gray-400">
          Configure target specialties and milestones to build procedural progression pathways.
        </p>
      </section>

      {/* 2. Config Block */}
      <Card className="p-6 space-y-5">
        
        <div className="grid md:grid-cols-2 gap-4">
          
          <Select 
            label="Target Engineering Role"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            options={roleOptions}
          />

          <div>
            <label className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1.5 flex justify-between">
              <span>Timeline Duration</span>
              <span className="font-mono text-[#2563EB] font-bold">{duration} Months</span>
            </label>
            <div className="pt-2">
              <input 
                type="range"
                min="1"
                max="6"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg cursor-pointer accent-[#2563EB]"
              />
            </div>
          </div>

        </div>

        <div>
          <label className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1.5">Complexity Tier</label>
          <div className="flex gap-3">
            {["Beginner", "Intermediate"].map((level) => (
              <Button
                key={level}
                type="button"
                variant={skillLevel === level ? "secondary" : "outline"}
                onClick={() => setSkillLevel(level as any)}
                className="flex-1 py-2.5 text-[10px] tracking-widest uppercase font-bold"
              >
                {level}
              </Button>
            ))}
          </div>
        </div>

        <Button
          onClick={generateRoadmap}
          loading={generatingRoadmap}
          variant="primary"
          className="w-full py-3"
          icon={<Sparkles className="w-4 h-4" />}
        >
          Generate AI Roadmap
        </Button>

      </Card>

      {/* 3. Timeline (Progression Layout) */}
      {roadmap && (
        <section className="space-y-4">
          
          {(duration !== roadmap.duration || !roadmap.roadmapTitle.toLowerCase().includes(targetRole.toLowerCase())) && (
            <div className="bg-purple-500/10 border border-purple-500/20 p-4 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-purple-300">Your career goal parameters changed</h4>
                <p className="text-[10.5px] text-gray-400">
                  The active plan was built for another target setup. Update your roadmap to align milestone tasks?
                </p>
              </div>
              <Button
                onClick={generateRoadmap}
                loading={generatingRoadmap}
                variant="primary"
                className="text-[10px] tracking-wider py-2 px-4 shrink-0 bg-purple-600 hover:bg-purple-700 border-none font-bold"
              >
                Update My Plan
              </Button>
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <h3 className="text-xs uppercase tracking-wider font-extrabold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#10B981]" /> Active Career Progression Path
            </h3>
            <span className="text-[10px] text-gray-400 font-mono font-bold">{roadmap.completionRateText}</span>
          </div>

          <div className="space-y-4 relative pl-5 border-l border-white/10 ml-2 pt-1">
            {roadmap.months.map((m) => (
              <div key={m.id} className="relative space-y-3">
                
                {/* Pointer indicator */}
                <span className={`absolute -left-[25px] top-2.5 w-2 h-2 rounded-full z-10 ${m.status === "active" ? "bg-[#2563EB] ring-4 ring-[#2563EB]/20" : m.status === "completed" ? "bg-[#10B981]" : "bg-gray-600"}`}></span>
                
                <div className="bg-[#111827] p-5 rounded-2xl border border-white/5 space-y-3.5">
                  
                  <div className="flex justify-between items-start border-b border-white/5 pb-2">
                    <div>
                      <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest block font-bold">Month Target</span>
                      <h4 className="text-xs font-bold text-white mt-0.5">{m.monthTitle}</h4>
                    </div>
                    {m.status === "locked" ? (
                      <Lock className="w-3.5 h-3.5 text-gray-500" />
                    ) : (
                      <Badge variant={m.status === "active" ? "info" : "success"}>
                        {m.status}
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-[11px] text-gray-400 leading-relaxed">{m.monthDesc}</p>

                  {/* Weeks list */}
                  <div className="space-y-3 pt-1">
                    {m.weeks.map((week, wIdx) => (
                      <div key={wIdx} className="bg-white/2 p-4 rounded-xl border border-white/5 space-y-2">
                        <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#60a5fa] block">Week {week.weekNumber}: {week.weekTitle}</span>
                        <p className="text-[10.5px] italic text-gray-300">Focus: {week.focus}</p>

                        <ul className="space-y-2 pt-2.5 border-t border-white/5">
                          {week.tasks.map((task, tIdx) => {
                            const key = `${m.id}-w${wIdx}-t${tIdx}`;
                            const done = checkedTasks[key];
                            return (
                              <li 
                                key={tIdx} 
                                onClick={() => onToggleTask?.(key)}
                                className="flex items-center gap-2.5 text-[10.5px] cursor-pointer select-none"
                              >
                                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all shrink-0 ${done ? "bg-[#10B981] border-[#10B981]" : "border-white/20 hover:border-white/40"}`}>
                                  {done && <Check className="w-2.5 h-2.5 text-slate-900 stroke-[3px]" />}
                                </div>
                                <span className={`${done ? "line-through text-gray-500" : "text-gray-300"}`}>{task}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>

                </div>

              </div>
            ))}
          </div>

        </section>
      )}

      {/* 4. Project recommendations */}
      <section className="space-y-4 pt-6 border-t border-white/5">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xs uppercase tracking-wider font-extrabold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#8b5cf6]" /> Gap-Closing Projects
            </h3>
            <p className="text-[10px] text-gray-400">Custom project specs recommended to bridge your candidate skill gaps.</p>
          </div>
          <Button
            onClick={onGenerateProjects}
            loading={generatingProjects}
            variant="outline"
            className="px-4 py-2.5 text-[10px] uppercase tracking-wider font-bold"
          >
            Generate Projects
          </Button>
        </div>

        {projectRecommendations.length === 0 ? (
          <Card className="text-center py-10 text-xs text-gray-500 border border-dashed border-white/10 bg-transparent rounded-2xl">
            No projects recommended yet. Click "Generate Projects" to analyze your skill gaps.
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {projectRecommendations.map((project) => (
              <Card key={project.id} className="p-5 space-y-3.5">
                <div>
                  <Badge variant={project.difficulty === "Advanced" ? "error" : project.difficulty === "Intermediate" ? "warning" : "default"}>
                    {project.difficulty}
                  </Badge>
                  <h4 className="text-xs font-bold text-white mt-1.5">{project.title}</h4>
                  <span className="text-[9px] font-mono text-gray-400 block mt-0.5">Focus Gap: <b className="text-[#60a5fa]">{project.sourceGap}</b></span>
                </div>

                <p className="text-[11px] text-gray-400 leading-relaxed">{project.description}</p>

                <div className="space-y-1.5 pt-2 border-t border-white/5 text-[10.5px]">
                  <span className="text-gray-500 font-bold block">Deliverables Checklist:</span>
                  <ul className="space-y-1 pl-2">
                    {project.deliverables.map((item, idx) => (
                      <li key={idx} className="text-gray-300 flex items-start gap-1">
                        <span className="text-[#10B981] mt-0.5">•</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-white/5 text-[10.5px]">
                  <span className="text-gray-500 font-bold block">Resume Value Statement:</span>
                  <p className="text-gray-300 italic">"{project.resumeValue}"</p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
