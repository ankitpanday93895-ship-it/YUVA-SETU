// ==========================================
// YUVA SETU - COMMON DATA
// ==========================================

const BRANCHES = [
  "Electronics & Instrumentation Engineering",
  "Electronics & Communication Engineering",
  "Computer Science Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Food Technology",
  "Biomedical Engineering"
];

// ==========================================
// DEFAULT GOVERNMENT INDUSTRY DATA
// ==========================================

const DEFAULT_INDUSTRY_DATA = [
  {
    id: "IND001",
    company: "Demo Automation Systems",
    sector: "Industrial Automation",
    branch: "Electronics & Instrumentation Engineering",
    jobRole: "Automation Engineer",
    requiredSkills: [
      "PLC",
      "SCADA",
      "Sensors",
      "Python"
    ],
    vacancies: 10,
    demandLevel: "High",
    status: "Active"
  },

  {
    id: "IND002",
    company: "Demo Embedded Technologies",
    sector: "Embedded Systems",
    branch: "Electronics & Communication Engineering",
    jobRole: "Embedded Engineer",
    requiredSkills: [
      "C",
      "Embedded Systems",
      "PCB Design",
      "IoT"
    ],
    vacancies: 8,
    demandLevel: "High",
    status: "Active"
  },

  {
    id: "IND003",
    company: "Demo Software Labs",
    sector: "Information Technology",
    branch: "Computer Science Engineering",
    jobRole: "Software Developer",
    requiredSkills: [
      "Python",
      "Web Development",
      "Data Structures",
      "Networking"
    ],
    vacancies: 20,
    demandLevel: "High",
    status: "Active"
  },

  {
    id: "IND004",
    company: "Demo Manufacturing Works",
    sector: "Manufacturing",
    branch: "Mechanical Engineering",
    jobRole: "Production Engineer",
    requiredSkills: [
      "CAD",
      "CNC",
      "Quality Control",
      "Thermodynamics"
    ],
    vacancies: 7,
    demandLevel: "Medium",
    status: "Active"
  },

  {
    id: "IND005",
    company: "Demo Infrastructure",
    sector: "Construction",
    branch: "Civil Engineering",
    jobRole: "Site Engineer",
    requiredSkills: [
      "AutoCAD",
      "Surveying",
      "Structural Analysis",
      "Quality Control"
    ],
    vacancies: 12,
    demandLevel: "Medium",
    status: "Active"
  },

  {
    id: "IND006",
    company: "Demo Food Industries",
    sector: "Food Processing",
    branch: "Food Technology",
    jobRole: "Food Quality Executive",
    requiredSkills: [
      "HACCP",
      "Food Safety",
      "Quality Control"
    ],
    vacancies: 6,
    demandLevel: "Medium",
    status: "Active"
  },

  {
    id: "IND007",
    company: "Demo MedTech",
    sector: "Healthcare Technology",
    branch: "Biomedical Engineering",
    jobRole: "Biomedical Service Engineer",
    requiredSkills: [
      "Biomedical Instrumentation",
      "Biomedical Sensors",
      "Calibration",
      "Electrical Safety"
    ],
    vacancies: 5,
    demandLevel: "High",
    status: "Active"
  }
];

// ==========================================
// BASIC STORAGE FUNCTIONS
// ==========================================

function readData(key, fallback = []) {
  try {
    const value = localStorage.getItem(key);

    if (!value) {
      return fallback;
    }

    return JSON.parse(value);
  } catch (error) {
    console.error("Storage read error:", error);
    return fallback;
  }
}

function writeData(key, data) {
  localStorage.setItem(
    key,
    JSON.stringify(data)
  );
}

// ==========================================
// INITIAL DATABASE
// ==========================================

function initializeYuvaSetu() {
  if (!localStorage.getItem("yuvaIndustryData")) {
    writeData(
      "yuvaIndustryData",
      DEFAULT_INDUSTRY_DATA
    );
  }

  if (!localStorage.getItem("yuvaStudents")) {
    writeData(
      "yuvaStudents",
      []
    );
  }

  if (!localStorage.getItem("yuvaInstitutes")) {
    writeData(
      "yuvaInstitutes",
      []
    );
  }
}

initializeYuvaSetu();

// ==========================================
// GET / SAVE
// ==========================================

function getStudents() {
  return readData(
    "yuvaStudents",
    []
  );
}

function saveStudents(data) {
  writeData(
    "yuvaStudents",
    data
  );
}

function getInstitutes() {
  return readData(
    "yuvaInstitutes",
    []
  );
}

function saveInstitutes(data) {
  writeData(
    "yuvaInstitutes",
    data
  );
}

function getIndustryData() {
  return readData(
    "yuvaIndustryData",
    []
  );
}

function saveIndustryData(data) {
  writeData(
    "yuvaIndustryData",
    data
  );
}

// ==========================================
// UTILITIES
// ==========================================

function generateId(prefix) {
  return (
    prefix +
    "-" +
    Date.now()
  );
}

function skillArray(value) {
  if (Array.isArray(value)) {
    return value
      .map(
        (skill) =>
          String(skill).trim()
      )
      .filter(Boolean);
  }

  return String(value || "")
    .split(",")
    .map(
      (skill) =>
        skill.trim()
    )
    .filter(Boolean);
}

function populateBranchSelect(id) {
  const select =
    document.getElementById(id);

  if (!select) {
    return;
  }

  select.innerHTML = `
    <option value="">
      -- Select Branch --
    </option>
  `;

  BRANCHES.forEach(
    (branch) => {
      const option =
        document.createElement(
          "option"
        );

      option.value =
        branch;

      option.textContent =
        branch;

      select.appendChild(
        option
      );
    }
  );
}

function compareSkills(
  currentSkills,
  requiredSkills
) {
  const current =
    skillArray(currentSkills);

  const required =
    skillArray(requiredSkills);

  const currentLower =
    current.map(
      (skill) =>
        skill.toLowerCase()
    );

  const requiredLower =
    required.map(
      (skill) =>
        skill.toLowerCase()
    );

  const matched =
    required.filter(
      (skill) =>
        currentLower.includes(
          skill.toLowerCase()
        )
    );

  const missing =
    required.filter(
      (skill) =>
        !currentLower.includes(
          skill.toLowerCase()
        )
    );

  const additional =
    current.filter(
      (skill) =>
        !requiredLower.includes(
          skill.toLowerCase()
        )
    );

  const percentage =
    required.length === 0
      ? 0
      : Math.round(
          (
            matched.length /
            required.length
          ) * 100
        );

  return {
    percentage,
    matched,
    missing,
    additional
  };
}

function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
