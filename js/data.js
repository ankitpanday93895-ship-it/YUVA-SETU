// ======================================================
// YUVA SETU - COMMON DATA / DATABASE FUNCTIONS
// GitHub Pages Prototype
// ======================================================


// ------------------------------------------------------
// STORAGE KEYS
// ------------------------------------------------------

const YUVA_KEYS = {

  studentAccounts: "yuva_student_accounts",

  students: "yuva_students",

  instituteAccounts: "yuva_institute_accounts",

  institutes: "yuva_institutes",

  industries: "yuva_industries"

};


// ------------------------------------------------------
// BRANCHES
// ------------------------------------------------------

const YUVA_BRANCHES = [

  "Electronics & Instrumentation Engineering",

  "Electronics & Communication Engineering",

  "Computer Science Engineering",

  "Mechanical Engineering",

  "Civil Engineering",

  "Food Technology",

  "Biomedical Engineering"

];


// ------------------------------------------------------
// DEMO INDUSTRY DATA
// Government/Admin baad me edit/delete/add kar sakta hai
// ------------------------------------------------------

const DEFAULT_INDUSTRY_DATA = [

  {
    id: "IND-DEMO-001",

    company: "Demo Automation Systems",

    sector: "Industrial Automation",

    branch:
      "Electronics & Instrumentation Engineering",

    jobRole:
      "Automation Engineer",

    requiredSkills: [
      "PLC",
      "SCADA",
      "Sensors",
      "Python"
    ],

    vacancies: 10,

    demandLevel: "High",

    status: "Active",

    updatedAt: ""
  },


  {
    id: "IND-DEMO-002",

    company:
      "Demo Electronics Technologies",

    sector:
      "Electronics & Embedded Systems",

    branch:
      "Electronics & Communication Engineering",

    jobRole:
      "Embedded Systems Engineer",

    requiredSkills: [
      "C",
      "Embedded Systems",
      "PCB Design",
      "IoT"
    ],

    vacancies: 8,

    demandLevel: "High",

    status: "Active",

    updatedAt: ""
  },


  {
    id: "IND-DEMO-003",

    company:
      "Demo Software Technologies",

    sector:
      "Information Technology",

    branch:
      "Computer Science Engineering",

    jobRole:
      "Software Developer",

    requiredSkills: [
      "Python",
      "Web Development",
      "Data Structures",
      "Database"
    ],

    vacancies: 20,

    demandLevel: "High",

    status: "Active",

    updatedAt: ""
  },


  {
    id: "IND-DEMO-004",

    company:
      "Demo Manufacturing Industries",

    sector:
      "Manufacturing",

    branch:
      "Mechanical Engineering",

    jobRole:
      "Production Engineer",

    requiredSkills: [
      "CAD",
      "CNC",
      "Quality Control",
      "Manufacturing Process"
    ],

    vacancies: 12,

    demandLevel: "Medium",

    status: "Active",

    updatedAt: ""
  },


  {
    id: "IND-DEMO-005",

    company:
      "Demo Infrastructure Limited",

    sector:
      "Construction",

    branch:
      "Civil Engineering",

    jobRole:
      "Site Engineer",

    requiredSkills: [
      "AutoCAD",
      "Surveying",
      "Structural Analysis",
      "Quality Control"
    ],

    vacancies: 7,

    demandLevel: "Medium",

    status: "Active",

    updatedAt: ""
  },


  {
    id: "IND-DEMO-006",

    company:
      "Demo Food Industries",

    sector:
      "Food Processing",

    branch:
      "Food Technology",

    jobRole:
      "Food Quality Executive",

    requiredSkills: [
      "HACCP",
      "Food Safety",
      "Quality Control",
      "Food Processing"
    ],

    vacancies: 6,

    demandLevel: "Medium",

    status: "Active",

    updatedAt: ""
  },


  {
    id: "IND-DEMO-007",

    company:
      "Demo MedTech Systems",

    sector:
      "Biomedical / Healthcare",

    branch:
      "Biomedical Engineering",

    jobRole:
      "Biomedical Service Engineer",

    requiredSkills: [
      "Biomedical Instrumentation",
      "Biomedical Sensors",
      "Calibration",
      "Electrical Safety"
    ],

    vacancies: 5,

    demandLevel: "High",

    status: "Active",

    updatedAt: ""
  }

];


// ======================================================
// LOCAL STORAGE
// ======================================================

function readStorage(key, fallback = []) {

  try {

    const saved =
      localStorage.getItem(key);


    if (!saved) {

      return fallback;
    }


    return JSON.parse(saved);

  }

  catch (error) {

    console.error(
      "YUVA SETU storage read error:",
      error
    );

    return fallback;

  }

}



function writeStorage(key, value) {

  try {

    localStorage.setItem(
      key,
      JSON.stringify(value)
    );

  }

  catch (error) {

    console.error(
      "YUVA SETU storage write error:",
      error
    );

  }

}


// ======================================================
// INITIALIZE DATABASE
// ======================================================

function initializeYuvaSetu() {


  if (
    !localStorage.getItem(
      YUVA_KEYS.studentAccounts
    )
  ) {

    writeStorage(
      YUVA_KEYS.studentAccounts,
      []
    );

  }


  if (
    !localStorage.getItem(
      YUVA_KEYS.students
    )
  ) {

    writeStorage(
      YUVA_KEYS.students,
      []
    );

  }


  if (
    !localStorage.getItem(
      YUVA_KEYS.instituteAccounts
    )
  ) {

    writeStorage(
      YUVA_KEYS.instituteAccounts,
      []
    );

  }


  if (
    !localStorage.getItem(
      YUVA_KEYS.institutes
    )
  ) {

    writeStorage(
      YUVA_KEYS.institutes,
      []
    );

  }


  if (
    !localStorage.getItem(
      YUVA_KEYS.industries
    )
  ) {

    writeStorage(
      YUVA_KEYS.industries,
      DEFAULT_INDUSTRY_DATA
    );

  }

}


initializeYuvaSetu();


// ======================================================
// STUDENT ACCOUNTS
// ======================================================

function getStudentAccounts() {

  return readStorage(
    YUVA_KEYS.studentAccounts,
    []
  );

}



function saveStudentAccounts(data) {

  writeStorage(
    YUVA_KEYS.studentAccounts,
    data
  );

}


// ======================================================
// STUDENT DATA
// ======================================================

function getStudents() {

  return readStorage(
    YUVA_KEYS.students,
    []
  );

}



function saveStudents(data) {

  writeStorage(
    YUVA_KEYS.students,
    data
  );

}


// ======================================================
// INSTITUTE ACCOUNTS
// ======================================================

function getInstituteAccounts() {

  return readStorage(
    YUVA_KEYS.instituteAccounts,
    []
  );

}



function saveInstituteAccounts(data) {

  writeStorage(
    YUVA_KEYS.instituteAccounts,
    data
  );

}


// ======================================================
// INSTITUTE DATA
// ======================================================

function getInstitutes() {

  return readStorage(
    YUVA_KEYS.institutes,
    []
  );

}



function saveInstitutes(data) {

  writeStorage(
    YUVA_KEYS.institutes,
    data
  );

}


// ======================================================
// INDUSTRY DATA
// ======================================================

function getIndustryData() {

  return readStorage(
    YUVA_KEYS.industries,
    []
  );

}



function saveIndustryData(data) {

  writeStorage(
    YUVA_KEYS.industries,
    data
  );

}


// ======================================================
// GENERATE ID
// ======================================================

function generateId(prefix = "ID") {

  if (
    window.crypto &&
    typeof crypto.randomUUID === "function"
  ) {

    return (
      prefix +
      "-" +
      crypto.randomUUID()
    );

  }


  return (
    prefix +
    "-" +
    Date.now() +
    "-" +
    Math.floor(
      Math.random() * 100000
    )
  );

}


// ======================================================
// EMAIL NORMALIZATION
// ======================================================

function normalizeEmail(email) {

  return String(email || "")
    .trim()
    .toLowerCase();

}


// ======================================================
// PASSWORD HASH
// Prototype only.
// Real production authentication needs backend/Firebase.
// ======================================================

async function hashPassword(password) {

  const encoder =
    new TextEncoder();


  const encoded =
    encoder.encode(password);


  const hashBuffer =
    await crypto.subtle.digest(
      "SHA-256",
      encoded
    );


  const bytes =
    Array.from(
      new Uint8Array(hashBuffer)
    );


  return bytes
    .map(
      byte =>
        byte
          .toString(16)
          .padStart(2, "0")
    )
    .join("");

}


// ======================================================
// SKILLS
// ======================================================

function skillArray(value) {

  const original =
    Array.isArray(value)
      ? value
      : String(value || "")
          .split(",");


  const result = [];

  const seen =
    new Set();


  original.forEach(item => {

    const skill =
      String(item)
        .trim();


    if (!skill) {

      return;
    }


    const key =
      skill.toLowerCase();


    if (!seen.has(key)) {

      seen.add(key);

      result.push(skill);

    }

  });


  return result;

}


// ======================================================
// SKILL COMPARISON
// ======================================================

function compareSkills(
  studentSkills,
  requiredSkills
) {

  const current =
    skillArray(studentSkills);


  const required =
    skillArray(requiredSkills);


  const currentLower =
    current.map(
      skill =>
        skill.toLowerCase()
    );


  const requiredLower =
    required.map(
      skill =>
        skill.toLowerCase()
    );


  const matched =
    required.filter(
      skill =>
        currentLower.includes(
          skill.toLowerCase()
        )
    );


  const missing =
    required.filter(
      skill =>
        !currentLower.includes(
          skill.toLowerCase()
        )
    );


  const additional =
    current.filter(
      skill =>
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


// ======================================================
// BRANCH DROPDOWN
// ======================================================

function populateBranchSelect(
  elementId,
  placeholder = "-- Select Branch --"
) {

  const select =
    document.getElementById(
      elementId
    );


  if (!select) {

    return;
  }


  select.innerHTML = "";


  const placeholderOption =
    document.createElement(
      "option"
    );


  placeholderOption.value = "";

  placeholderOption.textContent =
    placeholder;


  select.appendChild(
    placeholderOption
  );


  YUVA_BRANCHES.forEach(
    branch => {

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


// ======================================================
// ESCAPE HTML
// ======================================================

function escapeHTML(value) {

  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}


// ======================================================
// DATE
// ======================================================

function currentDateTime() {

  return new Date()
    .toLocaleString();

}
