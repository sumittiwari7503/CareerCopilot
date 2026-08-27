const API_BASE = "http://localhost:3000/api";

async function runE2ETests() {
  console.log("=== STARTING PROGRAMMATIC E2E VERIFICATION ===");

  const userAEmail = `user-a-${Date.now()}@example.com`;
  const userBEmail = `user-b-${Date.now()}@example.com`;
  const password = "password123";

  let tokenA = "";
  let userIdA = "";
  let tokenB = "";
  let userIdB = "";

  // 1. User A registration
  console.log("\n[1] Registering User A...");
  const signupARes = await fetch(`${API_BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: userAEmail, password, fullName: "User A" })
  });

  if (!signupARes.ok) {
    console.error("User A registration failed:", await signupARes.text());
    process.exit(1);
  }

  const signupAData = await signupARes.json() as any;
  tokenA = signupAData.session.access_token;
  userIdA = signupAData.session.user.id;
  console.log("✔ Registered User A with ID:", userIdA);

  // 2. Initial state verification (check profile defaults)
  console.log("\n[2] Verifying initial profile state for User A...");
  const profileARes = await fetch(`${API_BASE}/profile`, {
    headers: { "Authorization": `Bearer ${tokenA}` }
  });

  if (!profileARes.ok) {
    console.error("Failed to retrieve profile A:", await profileARes.text());
    process.exit(1);
  }

  const profileA = await profileARes.json() as any;
  console.log("Onboarding completed status:", profileA.onboardingCompleted);
  console.log("DSA Easy Solved count:", profileA.easySolved);
  console.log("DSA Medium Solved count:", profileA.mediumSolved);
  console.log("DSA Hard Solved count:", profileA.hardSolved);

  if (profileA.onboardingCompleted !== false || profileA.easySolved !== 0) {
    console.error("❌ Unexpected initial values on new user!");
    process.exit(1);
  }
  console.log("✔ Profile defaults validated.");

  // 3. Complete Onboarding Flow
  console.log("\n[3] Submitting Onboarding details for User A...");
  const updateProfileRes = await fetch(`${API_BASE}/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${tokenA}`
    },
    body: JSON.stringify({
      fullName: "User A Updated",
      targetRole: "Software Engineer",
      targetCompany: "Google",
      companyType: "Product Company",
      specialization: "Backend",
      experienceLevel: "Fresher",
      targetTimeline: 4,
      timeAvailable: "2 hours",
      currentSkills: JSON.stringify(["JavaScript", "React", "Node.js", "SQL"]),
      onboardingCompleted: true
    })
  });

  if (!updateProfileRes.ok) {
    console.error("Onboarding profile save failed:", await updateProfileRes.text());
    process.exit(1);
  }

  const updatedProfileA = await updateProfileRes.json() as any;
  console.log("Updated targetRole:", updatedProfileA.targetRole);
  console.log("Updated onboarding completed:", updatedProfileA.onboardingCompleted);
  if (updatedProfileA.targetRole !== "Software Engineer" || updatedProfileA.onboardingCompleted !== true) {
    console.error("❌ Onboarding values did not save correctly!");
    process.exit(1);
  }
  console.log("✔ Onboarding submitted successfully.");

  // 4. Generate Career Plan
  console.log("\n[4] Generating career plan for User A...");
  const generatePlanRes = await fetch(`${API_BASE}/career-plan/generate`, {
    method: "POST",
    headers: { "Authorization": `Bearer ${tokenA}` }
  });

  if (!generatePlanRes.ok) {
    console.error("Roadmap generation failed:", await generatePlanRes.text());
    process.exit(1);
  }

  const roadmapA = await generatePlanRes.json() as any;
  console.log("Generated plan title:", roadmapA.roadmapTitle);
  console.log("Milestones count:", roadmapA.months.length);
  const totalWeeks = roadmapA.months.reduce((acc: number, m: any) => acc + m.weeks.length, 0);
  console.log("Total weeks in plan:", totalWeeks);

  if (roadmapA.months.length !== 4) {
    console.warn("⚠️ Month counts did not match target timeline of 4 months. Result was:", roadmapA.months.length);
  }
  console.log("✔ Career plan generated.");

  // 5. Test Roadmap Persistence
  console.log("\n[5] Verifying roadmap persistence (getting plan again)...");
  const getPlanRes = await fetch(`${API_BASE}/career-plan`, {
    headers: { "Authorization": `Bearer ${tokenA}` }
  });

  if (!getPlanRes.ok) {
    console.error("Failed to retrieve plan:", await getPlanRes.text());
    process.exit(1);
  }

  const retrievedRoadmap = await getPlanRes.json() as any;
  console.log("Retrieved plan title:", retrievedRoadmap.roadmapTitle);
  if (retrievedRoadmap.id !== roadmapA.id) {
    console.error("❌ Roadmap did not persist correctly or generated a new one!");
    process.exit(1);
  }
  console.log("✔ Roadmap persistence verified.");

  // 6. Roadmap Checklist Test
  console.log("\n[6] Testing checklist checks persistence...");
  const milestoneId = roadmapA.months[0].id;
  const taskKey = `${milestoneId}-w0-t0`;
  const checkedPayload = { checkedTasks: { [taskKey]: true } };

  const updateTasksRes = await fetch(`${API_BASE}/roadmap/${roadmapA.id}/tasks`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${tokenA}`
    },
    body: JSON.stringify(checkedPayload)
  });

  if (!updateTasksRes.ok) {
    console.error("Failed to update tasks checkoff:", await updateTasksRes.text());
    process.exit(1);
  }

  // Fetch plan again and check checkedTasks
  const verifyTasksRes = await fetch(`${API_BASE}/career-plan`, {
    headers: { "Authorization": `Bearer ${tokenA}` }
  });

  const verifiedRoadmap = await verifyTasksRes.json() as any;
  console.log("Verified checkedTasks map:", verifiedRoadmap.checkedTasks);
  if (verifiedRoadmap.checkedTasks[taskKey] !== true) {
    console.error("❌ Checked tasks did not persist in PostgreSQL!");
    process.exit(1);
  }
  console.log("✔ Checklist persistence verified.");

  // 7. Today Action Item Completion
  console.log("\n[7] Testing today's action item loop...");
  const actionRes = await fetch(`${API_BASE}/actions/today`, {
    headers: { "Authorization": `Bearer ${tokenA}` }
  });

  if (!actionRes.ok) {
    console.error("Failed to retrieve today action item:", await actionRes.text());
    process.exit(1);
  }

  const action = await actionRes.json() as any;
  console.log("Today's action title:", action.title);
  console.log("Today's action status:", action.status);

  // Complete action
  console.log("Completing today's action item...");
  const completeActionRes = await fetch(`${API_BASE}/actions/${action.id}/complete`, {
    method: "POST",
    headers: { "Authorization": `Bearer ${tokenA}` }
  });

  if (!completeActionRes.ok) {
    console.error("Failed to complete action item:", await completeActionRes.text());
    process.exit(1);
  }

  const completed = await completeActionRes.json() as any;
  console.log("Action updated status:", completed.status);
  if (completed.status !== "Completed") {
    console.error("❌ Action item status did not update to Completed!");
    process.exit(1);
  }
  console.log("✔ Action item completion verified.");

  // 8. Log DSA counters
  console.log("\n[8] Testing DSA solved counter log update...");
  const updateDsaRes = await fetch(`${API_BASE}/profile/dsa`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${tokenA}`
    },
    body: JSON.stringify({ easySolved: 10, mediumSolved: 5, hardSolved: 1 })
  });

  if (!updateDsaRes.ok) {
    console.error("Failed to log DSA counts:", await updateDsaRes.text());
    process.exit(1);
  }

  const dsaVerifyRes = await fetch(`${API_BASE}/profile`, {
    headers: { "Authorization": `Bearer ${tokenA}` }
  });
  const dsaProfile = await dsaVerifyRes.json() as any;
  console.log("Persisted Easy Solved:", dsaProfile.easySolved);
  console.log("Persisted Medium Solved:", dsaProfile.mediumSolved);
  console.log("Persisted Hard Solved:", dsaProfile.hardSolved);

  if (dsaProfile.easySolved !== 10 || dsaProfile.mediumSolved !== 5 || dsaProfile.hardSolved !== 1) {
    console.error("❌ DSA counts failed to persist correctly!");
    process.exit(1);
  }
  console.log("✔ DSA counters verified.");

  // 9. Pipeline Tracking E2E
  console.log("\n[9] Testing Pipeline applications CRUD...");
  const createJobRes = await fetch(`${API_BASE}/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${tokenA}`
    },
    body: JSON.stringify({
      title: "Backend Engineer",
      company: "Google",
      status: "Interviewing",
      location: "San Francisco"
    })
  });

  if (!createJobRes.ok) {
    console.error("Failed to create pipeline application:", await createJobRes.text());
    process.exit(1);
  }

  const job = await createJobRes.json() as any;
  console.log("Created job title:", job.title);

  // Read job
  const getJobsRes = await fetch(`${API_BASE}/applications`, {
    headers: { "Authorization": `Bearer ${tokenA}` }
  });
  const jobsList = await getJobsRes.json() as any[];
  console.log("Active applications count for User A:", jobsList.length);
  if (!jobsList.some(item => item.id === job.id)) {
    console.error("❌ Job not found in user applications list!");
    process.exit(1);
  }

  // 10. Multi-user isolation & Authorization tests
  console.log("\n[10] Testing User B registration & isolation checks...");
  const signupBRes = await fetch(`${API_BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: userBEmail, password, fullName: "User B" })
  });

  if (!signupBRes.ok) {
    console.error("User B registration failed:", await signupBRes.text());
    process.exit(1);
  }

  const signupBData = await signupBRes.json() as any;
  tokenB = signupBData.session.access_token;
  userIdB = signupBData.session.user.id;
  console.log("Registered User B with ID:", userIdB);

  // Attempt to fetch User A's roadmap using User B's token
  console.log("User B requesting User A's roadmap (PUT tasks)...");
  const malTaskRes = await fetch(`${API_BASE}/roadmap/${roadmapA.id}/tasks`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${tokenB}`
    },
    body: JSON.stringify({ checkedTasks: {} })
  });

  console.log("User B roadmap access response status:", malTaskRes.status);
  if (malTaskRes.status !== 404 && malTaskRes.status !== 403) {
    console.error("❌ Authorization leak! User B was able to access/update User A's roadmap!");
    process.exit(1);
  }

  // Attempt to fetch User A's jobs list using User B's token
  console.log("User B reading jobs list...");
  const jobsBRes = await fetch(`${API_BASE}/applications`, {
    headers: { "Authorization": `Bearer ${tokenB}` }
  });
  const jobsBList = await jobsBRes.json() as any[];
  console.log("User B applications count:", jobsBList.length);
  if (jobsBList.some(item => item.id === job.id)) {
    console.error("❌ Leak! User B saw User A's application card!");
    process.exit(1);
  }
  console.log("✔ All user isolation checks passed.");

  // Delete Job Card
  console.log("\n[11] Deleting application card...");
  const deleteJobRes = await fetch(`${API_BASE}/applications/${job.id}`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${tokenA}` }
  });

  if (!deleteJobRes.ok) {
    console.error("Failed to delete application card:", await deleteJobRes.text());
    process.exit(1);
  }
  console.log("✔ Application card deleted successfully.");

  console.log("\n=== ALL PROGRAMMATIC E2E VERIFICATIONS PASSED SUCCESSFULLY! ===");
}

runE2ETests().catch(err => {
  console.error("E2E verification script crashed:", err);
  process.exit(1);
});
