const screens = {
  dashboard: "Dashboard",
  "new-case": "New Patient Case",
  cases: "Patient Cases",
  history: "Recent Activity",
  review: "Clinical Case Draft"
};

let latestDraft = null;

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => [...document.querySelectorAll(sel)];

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2400);
}

function showScreen(name) {
  $$(".screen").forEach(s => s.classList.remove("active"));
  const target = $(`#screen-${name}`);
  if (target) target.classList.add("active");

  $$(".nav-item").forEach(n => n.classList.toggle("active", n.dataset.screen === name));
  $("#pageTitle").textContent = screens[name] || "Clinical Case Draft";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

$$("[data-screen]").forEach(btn => {
  btn.addEventListener("click", () => showScreen(btn.dataset.screen));
});

const fieldsForQuality = ["fullName","age","complaint","duration","severity","narrative","pastHistory","medication","allergy"];
fieldsForQuality.forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener("input", updateQuality);
});

function updateQuality() {
  const complete = fieldsForQuality.filter(id => String(document.getElementById(id)?.value || "").trim()).length;
  const pct = Math.round((complete / fieldsForQuality.length) * 100);
  $("#qualityBar").style.width = `${pct}%`;
  $("#qualityPct").textContent = `${pct}%`;
}

$("#visitDate").valueAsDate = new Date();

$("#voiceBtn").addEventListener("click", () => {
  const sample = "Patient reports fever and headache for the last 3 days with body ache. Symptoms are worse in the evening. Patient has a history of hypertension and takes amlodipine 5 mg once daily. No known drug allergy.";
  $("#narrative").value = sample;
  if (!$("#pastHistory").value) $("#pastHistory").value = "Hypertension since 2022";
  if (!$("#medication").value) $("#medication").value = "Amlodipine 5 mg once daily";
  if (!$("#allergy").value) $("#allergy").value = "No known drug allergy";
  if (!$("#duration").value) $("#duration").value = "3 days";
  if (!$("#severity").value) $("#severity").value = "Moderate";
  updateQuality();
  showToast("Demo voice input inserted as editable text.");
});

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&","&amp;").replaceAll("<","&lt;")
    .replaceAll(">","&gt;").replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function generateDraft(form) {
  const get = id => document.getElementById(id).value.trim();
  const data = {
    fullName:get("fullName"), age:get("age"), gender:get("gender"), phone:get("phone"),
    patientId:get("patientId"), visitDate:get("visitDate"),
    complaint:get("complaint"), duration:get("duration"), severity:get("severity"), onset:get("onset"),
    narrative:get("narrative"), pastHistory:get("pastHistory"), surgicalHistory:get("surgicalHistory"),
    medication:get("medication"), allergy:get("allergy"), familyHistory:get("familyHistory"),
    personalHistory:get("personalHistory"), temperature:get("temperature"), bp:get("bp"),
    pulse:get("pulseValue"), spo2:get("spo2")
  };
  latestDraft = data;
  const summaryBits = [
    data.duration ? `a ${data.duration}` : "",
    data.complaint ? data.complaint.toLowerCase() : "presenting complaint",
    data.severity ? `of ${data.severity.toLowerCase()} severity` : ""
  ].filter(Boolean).join(" ");

  $("#reviewPatientName").textContent = data.fullName || "Unnamed Patient";
  $("#reviewMeta").textContent = `${data.patientId || "No ID"} · ${data.age || "—"} yrs${data.gender ? " · " + data.gender : ""}`;

  $("#reviewContent").innerHTML = `
    <div class="review-block">
      <h3>AI-ASSISTED CLINICAL SUMMARY</h3>
      <div class="review-summary">
        Patient presents with ${escapeHtml(summaryBits)}.
        ${data.narrative ? "Narrative indicates: " + escapeHtml(data.narrative) + " " : ""}
        ${data.pastHistory ? "Past history includes " + escapeHtml(data.pastHistory) + ". " : ""}
        ${data.medication ? "Current medication: " + escapeHtml(data.medication) + ". " : ""}
        ${data.allergy ? "Allergy status: " + escapeHtml(data.allergy) + "." : ""}
      </div>
    </div>

    <div class="review-block">
      <h3>PATIENT & COMPLAINT</h3>
      ${row("Patient ID",data.patientId)}${row("Chief Complaint",data.complaint)}
      ${row("Duration",data.duration)}${row("Severity",data.severity)}${row("Onset",data.onset)}
    </div>

    <div class="review-block">
      <h3>HISTORY</h3>
      ${row("Past Medical History",data.pastHistory)}${row("Past Surgical History",data.surgicalHistory)}
      ${row("Medication",data.medication)}${row("Allergies",data.allergy)}
      ${row("Family History",data.familyHistory)}${row("Personal / Social",data.personalHistory)}
    </div>

    <div class="review-block">
      <h3>VITALS</h3>
      ${row("Temperature",data.temperature ? data.temperature+" °C" : "")}
      ${row("Blood Pressure",data.bp ? data.bp+" mmHg" : "")}
      ${row("Pulse",data.pulse ? data.pulse+" bpm" : "")}
      ${row("SpO₂",data.spo2 ? data.spo2+" %" : "")}
    </div>
  `;
  showScreen("review");
}

function row(label, value) {
  return `<div class="review-row"><strong>${escapeHtml(label)}</strong><span>${escapeHtml(value || "Not provided")}</span></div>`;
}

$("#caseForm").addEventListener("submit", (e) => {
  e.preventDefault();
  generateDraft(e.currentTarget);
});

$("#backToEdit").addEventListener("click", () => showScreen("new-case"));

$("#saveCaseBtn").addEventListener("click", () => {
  showToast(`Case ${latestDraft?.patientId || ""} saved successfully.`);
  setTimeout(() => showScreen("cases"), 900);
});

$("#caseSearch").addEventListener("input", (e) => {
  const q = e.target.value.toLowerCase();
  $$("#casesTable tbody tr").forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(q) ? "" : "none";
  });
});

updateQuality();
