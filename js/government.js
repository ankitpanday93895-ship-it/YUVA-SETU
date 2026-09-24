// =====================================================
// YUVA SETU - GOVERNMENT PORTAL
// =====================================================


const GOVERNMENT_USERNAME =
  "govtadmin";


const GOVERNMENT_PASSWORD =
  "Yuva@123";


populateBranchSelect(
  "industryBranch"
);


// -----------------------------------------------------
// ELEMENTS
// -----------------------------------------------------

const governmentAuth =
  document.getElementById(
    "governmentAuth"
  );


const governmentApp =
  document.getElementById(
    "governmentApp"
  );


// =====================================================
// LOGIN
// =====================================================

document.getElementById(
  "governmentLoginForm"
).addEventListener(
  "submit",
  function(event) {

    event.preventDefault();


    const username =
      document.getElementById(
        "governmentUsername"
      ).value.trim();


    const password =
      document.getElementById(
        "governmentPassword"
      ).value;


    const errorBox =
      document.getElementById(
        "governmentLoginError"
      );


    errorBox.textContent = "";


    if (
      username !==
        GOVERNMENT_USERNAME ||
      password !==
        GOVERNMENT_PASSWORD
    ) {

      errorBox.textContent =
        "Invalid Government/Admin username or password.";

      return;

    }


    sessionStorage.setItem(
      "yuva_government_logged_in",
      "true"
    );


    showGovernmentDashboard();

  }
);


// =====================================================
// SHOW DASHBOARD
// =====================================================

function showGovernmentDashboard() {

  governmentAuth.classList.add(
    "hidden"
  );


  governmentApp.classList.remove(
    "hidden"
  );


  refreshGovernmentDashboard();

}


// =====================================================
// SHOW LOGIN
// =====================================================

function showGovernmentLogin() {

  governmentApp.classList.add(
    "hidden"
  );


  governmentAuth.classList.remove(
    "hidden"
  );

}


// =====================================================
// TABS
// =====================================================

document.querySelectorAll(
  ".tab-btn"
).forEach(
  button => {

    button.addEventListener(
      "click",
      function() {

        document.querySelectorAll(
          ".tab-btn"
        ).forEach(
          tab =>
            tab.classList.remove(
              "active"
            )
        );


        document.querySelectorAll(
          ".tab-panel"
        ).forEach(
          panel =>
            panel.classList.remove(
              "active"
            )
        );


        button.classList.add(
          "active"
        );


        const targetId =
          button.dataset.target;


        document.getElementById(
          targetId
        ).classList.add(
          "active"
        );


        refreshGovernmentDashboard();

      }
    );

  }
);


// =====================================================
// REFRESH
// =====================================================

function refreshGovernmentDashboard() {

  renderGovernmentStats();

  renderGovernmentStudents();

  renderGovernmentIndustries();

  renderGovernmentInstitutes();

}


// =====================================================
// STATS
// =====================================================

function renderGovernmentStats() {

  const students =
    getStudents();


  const industries =
    getIndustryData();


  const institutes =
    getInstitutes();


  const activeRoles =
    new Set(
      industries
        .filter(
          item =>
            item.status ===
            "Active"
        )
        .map(
          item =>
            item.jobRole
        )
    );


  document.getElementById(
    "governmentStats"
  ).innerHTML = `

    <div class="stat-card">

      <h2>
        ${students.length}
      </h2>

      <p>
        Registered Students
      </p>

    </div>


    <div class="stat-card">

      <h2>
        ${industries.length}
      </h2>

      <p>
        Industry Records
      </p>

    </div>


    <div class="stat-card">

      <h2>
        ${institutes.length}
      </h2>

      <p>
        Registered Institutes
      </p>

    </div>


    <div class="stat-card">

      <h2>
        ${activeRoles.size}
      </h2>

      <p>
        Active Job Roles
      </p>

    </div>

  `;

}


// =====================================================
// STUDENTS TABLE
// =====================================================

function renderGovernmentStudents() {

  const students =
    getStudents();


  const table =
    document.getElementById(
      "governmentStudentTable"
    );


  if (
    students.length === 0
  ) {

    table.innerHTML = `

      <tr>

        <td colspan="10">

          No student data available yet.

        </td>

      </tr>

    `;

    return;

  }


  table.innerHTML =
    students
      .map(
        student => `

          <tr>


            <td>

              <strong>
                ${escapeHTML(
                  student.name || "-"
                )}
              </strong>

              <br>

              <span class="small-muted">

                ${escapeHTML(
                  student.email || "-"
                )}

              </span>

            </td>


            <td>
              ${escapeHTML(
                student.course || "-"
              )}
            </td>


            <td>
              ${escapeHTML(
                student.branch || "-"
              )}
            </td>


            <td>
              ${escapeHTML(
                student.university || "-"
              )}
            </td>


            <td>
              ${escapeHTML(
                skillArray(
                  student.currentSkills
                ).join(", ") || "-"
              )}
            </td>


            <td>

              ${escapeHTML(
                student.targetRole || "-"
              )}

              ${
                student.industryCompany

                ?

                `<br>
                <span class="small-muted">
                  ${escapeHTML(
                    student.industryCompany
                  )}
                </span>`

                :

                ""
              }

            </td>


            <td>

              ${
                student.matchPercentage ===
                null

                ?

                "-"

                :

                escapeHTML(
                  student.matchPercentage
                ) + "%"
              }

            </td>


            <td>
              ${escapeHTML(
                skillArray(
                  student.missingSkills
                ).join(", ") || "-"
              )}
            </td>


            <td>
              ${escapeHTML(
                skillArray(
                  student.additionalSkills
                ).join(", ") || "-"
              )}
            </td>


            <td>
              ${escapeHTML(
                student.updatedAt || "-"
              )}
            </td>


          </tr>

        `
      )
      .join("");

}


// =====================================================
// INDUSTRY TABLE
// =====================================================

function renderGovernmentIndustries() {

  const industries =
    getIndustryData();


  const table =
    document.getElementById(
      "governmentIndustryTable"
    );


  if (
    industries.length === 0
  ) {

    table.innerHTML = `

      <tr>

        <td colspan="9">

          No industry data available.

        </td>

      </tr>

    `;

    return;

  }


  table.innerHTML =
    industries
      .map(
        item => `

          <tr>


            <td>

              <strong>
                ${escapeHTML(
                  item.company
                )}
              </strong>

            </td>


            <td>
              ${escapeHTML(
                item.sector
              )}
            </td>


            <td>
              ${escapeHTML(
                item.branch
              )}
            </td>


            <td>
              ${escapeHTML(
                item.jobRole
              )}
            </td>


            <td>
              ${escapeHTML(
                skillArray(
                  item.requiredSkills
                ).join(", ")
              )}
            </td>


            <td>
              ${Number(
                item.vacancies || 0
              )}
            </td>


            <td>
              ${escapeHTML(
                item.demandLevel
              )}
            </td>


            <td>
              ${escapeHTML(
                item.status
              )}
            </td>


            <td>

              <div class="button-row">


                <button
                  type="button"
                  class="btn btn-secondary industry-edit"
                  data-id="${escapeHTML(
                    item.id
                  )}"
                >
                  Edit
                </button>


                <button
                  type="button"
                  class="btn btn-danger industry-delete"
                  data-id="${escapeHTML(
                    item.id
                  )}"
                >
                  Delete
                </button>


              </div>

            </td>


          </tr>

        `
      )
      .join("");

}


// =====================================================
// SAVE INDUSTRY DATA
// =====================================================

document.getElementById(
  "saveIndustryData"
).addEventListener(
  "click",
  saveGovernmentIndustryData
);



function saveGovernmentIndustryData() {

  const company =
    document.getElementById(
      "industryCompany"
    ).value.trim();


  const sector =
    document.getElementById(
      "industrySector"
    ).value.trim();


  const branch =
    document.getElementById(
      "industryBranch"
    ).value;


  const jobRole =
    document.getElementById(
      "industryJobRole"
    ).value.trim();


  const requiredSkills =
    skillArray(
      document.getElementById(
        "industryRequiredSkills"
      ).value
    );


  const vacancies =
    Number(
      document.getElementById(
        "industryVacancies"
      ).value
    ) || 0;


  const demandLevel =
    document.getElementById(
      "industryDemand"
    ).value;


  const status =
    document.getElementById(
      "industryStatus"
    ).value;


  const editId =
    document.getElementById(
      "industryEditId"
    ).value;


  if (
    !company ||
    !sector ||
    !branch ||
    !jobRole ||
    requiredSkills.length === 0
  ) {

    alert(
      "Please complete Company, Sector, Branch, Job Role and Required Skills."
    );

    return;

  }


  const industries =
    getIndustryData();


  if (editId) {

    const index =
      industries.findIndex(
        item =>
          item.id === editId
      );


    if (
      index !== -1
    ) {

      industries[index] = {

        ...industries[index],

        company:
          company,

        sector:
          sector,

        branch:
          branch,

        jobRole:
          jobRole,

        requiredSkills:
          requiredSkills,

        vacancies:
          vacancies,

        demandLevel:
          demandLevel,

        status:
          status,

        updatedAt:
          currentDateTime()

      };

    }

  }

  else {

    industries.push({

      id:
        generateId("IND"),

      company:
        company,

      sector:
        sector,

      branch:
        branch,

      jobRole:
        jobRole,

      requiredSkills:
        requiredSkills,

      vacancies:
        vacancies,

      demandLevel:
        demandLevel,

      status:
        status,

      updatedAt:
        currentDateTime()

    });

  }


  saveIndustryData(
    industries
  );


  clearIndustryForm();


  refreshGovernmentDashboard();


  document.getElementById(
    "industrySaveMessage"
  ).innerHTML = `

    <div class="alert alert-success">

      Industry data saved successfully.
      Student and Institute portals will
      now use the updated active data.

    </div>

  `;

}


// =====================================================
// EDIT / DELETE INDUSTRY
// =====================================================

document.getElementById(
  "governmentIndustryTable"
).addEventListener(
  "click",
  function(event) {

    const editButton =
      event.target.closest(
        ".industry-edit"
      );


    const deleteButton =
      event.target.closest(
        ".industry-delete"
      );


    if (editButton) {

      editIndustryRecord(
        editButton.dataset.id
      );

    }


    if (deleteButton) {

      deleteIndustryRecord(
        deleteButton.dataset.id
      );

    }

  }
);


// =====================================================
// EDIT
// =====================================================

function editIndustryRecord(id) {

  const item =
    getIndustryData()
      .find(
        industry =>
          industry.id === id
      );


  if (!item) {

    return;

  }


  document.getElementById(
    "industryEditId"
  ).value =
    item.id;


  document.getElementById(
    "industryCompany"
  ).value =
    item.company;


  document.getElementById(
    "industrySector"
  ).value =
    item.sector;


  document.getElementById(
    "industryBranch"
  ).value =
    item.branch;


  document.getElementById(
    "industryJobRole"
  ).value =
    item.jobRole;


  document.getElementById(
    "industryRequiredSkills"
  ).value =
    skillArray(
      item.requiredSkills
    ).join(", ");


  document.getElementById(
    "industryVacancies"
  ).value =
    item.vacancies;


  document.getElementById(
    "industryDemand"
  ).value =
    item.demandLevel;


  document.getElementById(
    "industryStatus"
  ).value =
    item.status;


  window.scrollTo({

    top:
      0,

    behavior:
      "smooth"

  });

}


// =====================================================
// DELETE
// =====================================================

function deleteIndustryRecord(id) {

  const confirmed =
    confirm(
      "Are you sure you want to delete this industry record?"
    );


  if (!confirmed) {

    return;

  }


  const updated =
    getIndustryData()
      .filter(
        item =>
          item.id !== id
      );


  saveIndustryData(
    updated
  );


  refreshGovernmentDashboard();

}


// =====================================================
// CLEAR FORM
// =====================================================

document.getElementById(
  "clearIndustryForm"
).addEventListener(
  "click",
  clearIndustryForm
);



function clearIndustryForm() {

  document.getElementById(
    "industryEditId"
  ).value = "";


  document.getElementById(
    "industryCompany"
  ).value = "";


  document.getElementById(
    "industrySector"
  ).value = "";


  document.getElementById(
    "industryBranch"
  ).value = "";


  document.getElementById(
    "industryJobRole"
  ).value = "";


  document.getElementById(
    "industryRequiredSkills"
  ).value = "";


  document.getElementById(
    "industryVacancies"
  ).value = "1";


  document.getElementById(
    "industryDemand"
  ).value = "High";


  document.getElementById(
    "industryStatus"
  ).value = "Active";

}


// =====================================================
// INSTITUTES TABLE
// =====================================================

function renderGovernmentInstitutes() {

  const institutes =
    getInstitutes();


  const table =
    document.getElementById(
      "governmentInstituteTable"
    );


  if (
    institutes.length === 0
  ) {

    table.innerHTML = `

      <tr>

        <td colspan="8">

          No institute data available yet.

        </td>

      </tr>

    `;

    return;

  }


  table.innerHTML =
    institutes
      .map(
        institute => `

          <tr>


            <td>

              <strong>
                ${escapeHTML(
                  institute.name || "-"
                )}
              </strong>

              <br>

              <span class="small-muted">

                ${escapeHTML(
                  institute.email || "-"
                )}

              </span>

            </td>


            <td>
              ${escapeHTML(
                institute.department || "-"
              )}
            </td>


            <td>
              ${escapeHTML(
                institute.branch || "-"
              )}
            </td>


            <td>
              ${escapeHTML(
                institute.course || "-"
              )}
            </td>


            <td>
              ${escapeHTML(
                skillArray(
                  institute.skillsTaught
                ).join(", ") || "-"
              )}
            </td>


            <td>
              ${escapeHTML(
                institute.trainingPrograms || "-"
              )}
            </td>


            <td>
              ${escapeHTML(
                institute.labs || "-"
              )}
            </td>


            <td>
              ${escapeHTML(
                institute.updatedAt || "-"
              )}
            </td>


          </tr>

        `
      )
      .join("");

}


// =====================================================
// LOGOUT
// =====================================================

document.getElementById(
  "governmentLogout"
).addEventListener(
  "click",
  function() {

    sessionStorage.removeItem(
      "yuva_government_logged_in"
    );


    showGovernmentLogin();

  }
);


// =====================================================
// PAGE START
// =====================================================

if (
  sessionStorage.getItem(
    "yuva_government_logged_in"
  ) === "true"
) {

  showGovernmentDashboard();

}

else {

  showGovernmentLogin();

}
