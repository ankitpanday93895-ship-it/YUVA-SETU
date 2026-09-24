// =====================================================
// YUVA SETU - INSTITUTE PORTAL
// =====================================================


populateBranchSelect(
  "instituteBranch"
);


let currentInstituteEmail =
  sessionStorage.getItem(
    "yuva_current_institute"
  );


// -----------------------------------------------------
// ELEMENTS
// -----------------------------------------------------

const instituteAuth =
  document.getElementById(
    "instituteAuth"
  );


const instituteApp =
  document.getElementById(
    "instituteApp"
  );


const instituteLoginForm =
  document.getElementById(
    "instituteLoginForm"
  );


const instituteRegisterForm =
  document.getElementById(
    "instituteRegisterForm"
  );


const instituteLoginTab =
  document.getElementById(
    "instituteLoginTab"
  );


const instituteRegisterTab =
  document.getElementById(
    "instituteRegisterTab"
  );


// =====================================================
// AUTH SWITCH
// =====================================================

function showInstituteLoginForm() {

  instituteLoginForm
    .classList
    .remove(
      "hidden"
    );


  instituteRegisterForm
    .classList
    .add(
      "hidden"
    );


  instituteLoginTab
    .classList
    .add(
      "active"
    );


  instituteRegisterTab
    .classList
    .remove(
      "active"
    );

}



function showInstituteRegisterForm() {

  instituteRegisterForm
    .classList
    .remove(
      "hidden"
    );


  instituteLoginForm
    .classList
    .add(
      "hidden"
    );


  instituteRegisterTab
    .classList
    .add(
      "active"
    );


  instituteLoginTab
    .classList
    .remove(
      "active"
    );

}



instituteLoginTab.addEventListener(
  "click",
  showInstituteLoginForm
);


instituteRegisterTab.addEventListener(
  "click",
  showInstituteRegisterForm
);


document.getElementById(
  "instituteOpenRegister"
).addEventListener(
  "click",
  showInstituteRegisterForm
);


document.getElementById(
  "instituteOpenLogin"
).addEventListener(
  "click",
  showInstituteLoginForm
);


// =====================================================
// REGISTER
// =====================================================

instituteRegisterForm.addEventListener(
  "submit",
  async function(event) {

    event.preventDefault();


    const name =
      document.getElementById(
        "instituteRegisterName"
      ).value.trim();


    const email =
      normalizeEmail(
        document.getElementById(
          "instituteRegisterEmail"
        ).value
      );


    const password =
      document.getElementById(
        "instituteRegisterPassword"
      ).value;


    const confirm =
      document.getElementById(
        "instituteConfirmPassword"
      ).value;


    const error =
      document.getElementById(
        "instituteRegisterError"
      );


    error.textContent = "";


    if (
      !name ||
      !email ||
      !email.includes("@")
    ) {

      error.textContent =
        "Enter valid Institute Name and Official Email.";

      return;

    }


    if (
      password.length < 6
    ) {

      error.textContent =
        "Password must contain at least 6 characters.";

      return;

    }


    if (
      password !== confirm
    ) {

      error.textContent =
        "Passwords do not match.";

      return;

    }


    const accounts =
      getInstituteAccounts();


    const exists =
      accounts.some(
        account =>
          account.email === email
      );


    if (exists) {

      error.textContent =
        "Institute account already exists. Please login.";

      return;

    }


    const passwordHash =
      await hashPassword(
        password
      );


    const accountId =
      generateId(
        "INSTITUTE-ACCOUNT"
      );


    accounts.push({

      id:
        accountId,

      instituteName:
        name,

      email:
        email,

      passwordHash:
        passwordHash,

      createdAt:
        currentDateTime()

    });


    saveInstituteAccounts(
      accounts
    );


    const institutes =
      getInstitutes();


    institutes.push({

      id:
        generateId("INS"),

      accountId:
        accountId,

      name:
        name,

      email:
        email,

      department:
        "",

      branch:
        "",

      course:
        "",

      skillsTaught:
        [],

      trainingPrograms:
        "",

      labs:
        "",

      createdAt:
        currentDateTime(),

      updatedAt:
        currentDateTime()

    });


    saveInstitutes(
      institutes
    );


    currentInstituteEmail =
      email;


    sessionStorage.setItem(
      "yuva_current_institute",
      email
    );


    showInstituteDashboard();

  }
);


// =====================================================
// LOGIN
// =====================================================

instituteLoginForm.addEventListener(
  "submit",
  async function(event) {

    event.preventDefault();


    const email =
      normalizeEmail(
        document.getElementById(
          "instituteLoginEmail"
        ).value
      );


    const password =
      document.getElementById(
        "instituteLoginPassword"
      ).value;


    const error =
      document.getElementById(
        "instituteLoginError"
      );


    error.textContent = "";


    const account =
      getInstituteAccounts()
        .find(
          item =>
            item.email === email
        );


    if (!account) {

      error.textContent =
        "Institute account not found. Please register first.";

      return;

    }


    const passwordHash =
      await hashPassword(
        password
      );


    if (
      passwordHash !==
      account.passwordHash
    ) {

      error.textContent =
        "Incorrect password.";

      return;

    }


    currentInstituteEmail =
      email;


    sessionStorage.setItem(
      "yuva_current_institute",
      email
    );


    showInstituteDashboard();

  }
);


// =====================================================
// CURRENT INSTITUTE
// =====================================================

function getCurrentInstitute() {

  return getInstitutes()
    .find(
      institute =>
        institute.email ===
        currentInstituteEmail
    );

}


// =====================================================
// SHOW DASHBOARD
// =====================================================

function showInstituteDashboard() {

  instituteAuth.classList.add(
    "hidden"
  );


  instituteApp.classList.remove(
    "hidden"
  );


  loadInstituteProfile();

}


// =====================================================
// SHOW AUTH
// =====================================================

function showInstituteAuth() {

  instituteApp.classList.add(
    "hidden"
  );


  instituteAuth.classList.remove(
    "hidden"
  );


  showInstituteLoginForm();

}


// =====================================================
// LOAD PROFILE
// =====================================================

function loadInstituteProfile() {

  const institute =
    getCurrentInstitute();


  if (!institute) {

    return;

  }


  document.getElementById(
    "instituteWelcome"
  ).textContent =
    "Welcome, " +
    (institute.name || "Institute");


  document.getElementById(
    "instituteName"
  ).value =
    institute.name || "";


  document.getElementById(
    "instituteEmail"
  ).value =
    institute.email || "";


  document.getElementById(
    "instituteDepartment"
  ).value =
    institute.department || "";


  document.getElementById(
    "instituteBranch"
  ).value =
    institute.branch || "";


  document.getElementById(
    "instituteCourse"
  ).value =
    institute.course || "";


  document.getElementById(
    "instituteSkills"
  ).value =
    skillArray(
      institute.skillsTaught
    ).join(", ");


  document.getElementById(
    "instituteTraining"
  ).value =
    institute.trainingPrograms || "";


  document.getElementById(
    "instituteLabs"
  ).value =
    institute.labs || "";


  renderInstituteIndustryData();

}


// =====================================================
// SAVE PROFILE
// =====================================================

document.getElementById(
  "saveInstituteProfile"
).addEventListener(
  "click",
  saveInstituteProfile
);



function saveInstituteProfile() {

  const name =
    document.getElementById(
      "instituteName"
    ).value.trim();


  const department =
    document.getElementById(
      "instituteDepartment"
    ).value.trim();


  const branch =
    document.getElementById(
      "instituteBranch"
    ).value;


  const course =
    document.getElementById(
      "instituteCourse"
    ).value.trim();


  const skills =
    skillArray(
      document.getElementById(
        "instituteSkills"
      ).value
    );


  const training =
    document.getElementById(
      "instituteTraining"
    ).value.trim();


  const labs =
    document.getElementById(
      "instituteLabs"
    ).value.trim();


  if (
    !name ||
    !department ||
    !branch ||
    !course
  ) {

    alert(
      "Please complete Institute Name, Department, Branch and Course."
    );

    return;

  }


  const institutes =
    getInstitutes();


  const index =
    institutes.findIndex(
      item =>
        item.email ===
        currentInstituteEmail
    );


  if (
    index === -1
  ) {

    return;

  }


  institutes[index].name =
    name;


  institutes[index].department =
    department;


  institutes[index].branch =
    branch;


  institutes[index].course =
    course;


  institutes[index].skillsTaught =
    skills;


  institutes[index].trainingPrograms =
    training;


  institutes[index].labs =
    labs;


  institutes[index].updatedAt =
    currentDateTime();


  saveInstitutes(
    institutes
  );


  document.getElementById(
    "instituteWelcome"
  ).textContent =
    "Welcome, " +
    name;


  document.getElementById(
    "instituteSaveMessage"
  ).innerHTML = `

    <div class="alert alert-success">

      Institute data saved successfully.
      Latest information is now available
      in Government → Institute Data.

    </div>

  `;


  renderInstituteIndustryData();

}


// =====================================================
// BRANCH CHANGE
// =====================================================

document.getElementById(
  "instituteBranch"
).addEventListener(
  "change",
  renderInstituteIndustryData
);


// =====================================================
// INDUSTRY DATA
// =====================================================

function renderInstituteIndustryData() {

  renderInstituteJobRoles();

  renderInstituteTrends();

}


// =====================================================
// JOB ROLES
// =====================================================

function renderInstituteJobRoles() {

  const branch =
    document.getElementById(
      "instituteBranch"
    ).value;


  const container =
    document.getElementById(
      "instituteJobRoles"
    );


  if (!branch) {

    container.innerHTML = `

      <div class="alert alert-info">

        Select a branch
        to view industry job roles.

      </div>

    `;

    return;

  }


  const industryData =
    getIndustryData()
      .filter(
        item =>
          item.branch === branch &&
          item.status === "Active"
      );


  if (
    industryData.length === 0
  ) {

    container.innerHTML = `

      <div class="alert alert-warning">

        No active industry job roles
        are available for this branch.

      </div>

    `;

    return;

  }


  container.innerHTML = `

    <div class="role-list">

      ${

        industryData
          .map(
            item => `

              <div class="role-card">

                <h3>
                  ${escapeHTML(
                    item.jobRole
                  )}
                </h3>

                <p>
                  <strong>Company:</strong>
                  ${escapeHTML(
                    item.company
                  )}
                </p>

                <p>
                  <strong>Sector:</strong>
                  ${escapeHTML(
                    item.sector
                  )}
                </p>

                <p>
                  <strong>Vacancies:</strong>
                  ${Number(
                    item.vacancies || 0
                  )}
                </p>

                <p>
                  <strong>Demand:</strong>
                  ${escapeHTML(
                    item.demandLevel
                  )}
                </p>

              </div>

            `
          )
          .join("")

      }

    </div>

  `;

}


// =====================================================
// SKILL TRENDS
// =====================================================

function renderInstituteTrends() {

  const branch =
    document.getElementById(
      "instituteBranch"
    ).value;


  const container =
    document.getElementById(
      "instituteTrends"
    );


  if (!branch) {

    container.innerHTML = `

      <div class="alert alert-info">

        Select a branch
        to view industry skill demand.

      </div>

    `;

    return;

  }


  const industries =
    getIndustryData()
      .filter(
        item =>
          item.branch === branch &&
          item.status === "Active"
      );


  if (
    industries.length === 0
  ) {

    container.innerHTML = `

      <div class="alert alert-warning">

        No industry skill data
        available for this branch.

      </div>

    `;

    return;

  }


  const skillCount = {};


  industries.forEach(
    industry => {

      skillArray(
        industry.requiredSkills
      ).forEach(
        skill => {

          const key =
            skill.toLowerCase();


          if (
            !skillCount[key]
          ) {

            skillCount[key] = {

              name:
                skill,

              count:
                0

            };

          }


          skillCount[key].count++;

        }
      );

    }
  );


  const sortedSkills =
    Object.values(
      skillCount
    )
    .sort(
      (a, b) =>
        b.count - a.count
    );


  const taughtSkills =
    skillArray(
      document.getElementById(
        "instituteSkills"
      ).value
    )
    .map(
      skill =>
        skill.toLowerCase()
    );


  container.innerHTML = `

    <div class="trend-grid">

      ${

        sortedSkills
          .map(
            item => {

              const covered =
                taughtSkills.includes(
                  item.name.toLowerCase()
                );


              return `

                <div class="trend-card">

                  <h3>
                    ${escapeHTML(
                      item.name
                    )}
                  </h3>

                  <p>

                    Required by
                    ${item.count}
                    active job role(s)

                  </p>


                  <div class="skill-wrap">

                    <span
                      class="skill-chip
                      ${
                        covered
                          ? "match"
                          : "missing"
                      }"
                    >

                      ${
                        covered
                          ? "✓ Currently Taught"
                          : "✕ Not Listed as Taught"
                      }

                    </span>

                  </div>

                </div>

              `;

            }
          )
          .join("")

      }

    </div>

  `;

}


// =====================================================
// LOGOUT
// =====================================================

document.getElementById(
  "instituteLogout"
).addEventListener(
  "click",
  function() {

    sessionStorage.removeItem(
      "yuva_current_institute"
    );


    currentInstituteEmail =
      null;


    showInstituteAuth();

  }
);


// =====================================================
// PAGE START
// =====================================================

if (
  currentInstituteEmail
) {

  const exists =
    getInstituteAccounts()
      .some(
        account =>
          account.email ===
          currentInstituteEmail
      );


  if (exists) {

    showInstituteDashboard();

  }

  else {

    sessionStorage.removeItem(
      "yuva_current_institute"
    );


    currentInstituteEmail =
      null;


    showInstituteAuth();

  }

}

else {

  showInstituteAuth();

}
