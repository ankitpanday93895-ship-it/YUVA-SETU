populateBranchSelect(
  "industryBranch"
);


const GOV_USERNAME =
  "govtadmin";


const GOV_PASSWORD =
  "Yuva@123";


const governmentLogin =
  document.getElementById(
    "governmentLogin"
  );


const governmentApp =
  document.getElementById(
    "governmentApp"
  );



document
.getElementById(
  "governmentLoginForm"
)
.addEventListener(
  "submit",
  function(event) {

    event.preventDefault();


    const username =
      document
      .getElementById(
        "governmentUsername"
      )
      .value.trim();


    const password =
      document
      .getElementById(
        "governmentPassword"
      )
      .value;


    if (
      username !== GOV_USERNAME ||
      password !== GOV_PASSWORD
    ) {

      document
        .getElementById(
          "governmentLoginError"
        )
        .textContent =
        "Invalid Government username or password.";

      return;
    }


    sessionStorage.setItem(
      "yuvaGovernmentLoggedIn",
      "true"
    );


    showGovernmentApp();

  }
);



function showGovernmentApp() {

  governmentLogin.classList.add(
    "hidden"
  );


  governmentApp.classList.remove(
    "hidden"
  );


  refreshGovernment();

}



function showGovernmentLogin() {

  governmentLogin.classList.remove(
    "hidden"
  );


  governmentApp.classList.add(
    "hidden"
  );

}



document
.querySelectorAll(
  ".tab-btn"
)
.forEach(
  button => {

    button.addEventListener(
      "click",
      function() {

        document
          .querySelectorAll(
            ".tab-btn"
          )
          .forEach(
            item =>
              item.classList.remove(
                "active"
              )
          );


        document
          .querySelectorAll(
            ".tab-panel"
          )
          .forEach(
            item =>
              item.classList.remove(
                "active"
              )
          );


        button.classList.add(
          "active"
        );


        document
          .getElementById(
            button.dataset.tab
          )
          .classList.add(
            "active"
          );


        refreshGovernment();

      }
    );

  }
);



function refreshGovernment() {

  renderStats();

  renderStudents();

  renderIndustries();

  renderInstitutes();

}



function renderStats() {

  const students =
    getStudents();


  const industries =
    getIndustryData();


  const institutes =
    getInstitutes();


  const roles =
    new Set(
      industries
        .filter(
          item =>
            item.status === "Active"
        )
        .map(
          item =>
            item.jobRole
        )
    );


  document
    .getElementById(
      "governmentStats"
    )
    .innerHTML = `

      <div class="stat-card">

        <h2>
          ${students.length}
        </h2>

        <p>
          Students
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
          Institutes
        </p>

      </div>


      <div class="stat-card">

        <h2>
          ${roles.size}
        </h2>

        <p>
          Active Job Roles
        </p>

      </div>

    `;

}



function renderStudents() {

  const students =
    getStudents();


  const table =
    document
    .getElementById(
      "governmentStudents"
    );


  if (!students.length) {

    table.innerHTML = `

      <tr>

        <td colspan="8">
          No student data submitted yet.
        </td>

      </tr>

    `;

    return;
  }


  table.innerHTML =
    students.map(
      student => `

        <tr>

          <td>

            <strong>
              ${escapeHTML(student.name || "")}
            </strong>

            <br>

            <small>
              ${escapeHTML(student.email || "")}
            </small>

          </td>


          <td>
            ${escapeHTML(student.branch || "")}
          </td>


          <td>
            ${escapeHTML(student.university || "")}
          </td>


          <td>
            ${escapeHTML(
              (student.currentSkills || [])
                .join(", ")
            )}
          </td>


          <td>
            ${escapeHTML(student.targetRole || "-")}
          </td>


          <td>
            ${
              student.matchPercentage ?? "-"
            }%
          </td>


          <td>
            ${escapeHTML(
              (student.missingSkills || [])
                .join(", ")
            )}
          </td>


          <td>
            ${escapeHTML(
              (student.additionalSkills || [])
                .join(", ")
            )}
          </td>

        </tr>

      `
    ).join("");

}



function renderIndustries() {

  const industries =
    getIndustryData();


  const table =
    document
    .getElementById(
      "governmentIndustries"
    );


  table.innerHTML =
    industries.map(
      item => `

        <tr>

          <td>

            <strong>
              ${escapeHTML(item.company)}
            </strong>

            <br>

            <small>
              ${escapeHTML(item.sector)}
            </small>

          </td>


          <td>
            ${escapeHTML(item.branch)}
          </td>


          <td>
            ${escapeHTML(item.jobRole)}
          </td>


          <td>
            ${escapeHTML(
              (item.requiredSkills || [])
                .join(", ")
            )}
          </td>


          <td>
            ${Number(item.vacancies || 0)}
          </td>


          <td>
            ${escapeHTML(item.demandLevel)}
          </td>


          <td>
            ${escapeHTML(item.status)}
          </td>


          <td>

            <div class="button-row">

              <button
                class="btn btn-secondary"
                onclick="editIndustry('${item.id}')"
              >
                Edit
              </button>


              <button
                class="btn btn-danger"
                onclick="deleteIndustry('${item.id}')"
              >
                Delete
              </button>

            </div>

          </td>

        </tr>

      `
    ).join("");

}



document
.getElementById(
  "saveIndustryRequirement"
)
.addEventListener(
  "click",
  saveIndustryRequirement
);



function saveIndustryRequirement() {

  const company =
    document
    .getElementById(
      "industryCompany"
    )
    .value.trim();


  const branch =
    document
    .getElementById(
      "industryBranch"
    )
    .value;


  const role =
    document
    .getElementById(
      "industryJobRole"
    )
    .value.trim();


  const skills =
    skillArray(
      document
      .getElementById(
        "industrySkills"
      )
      .value
    );


  if (
    !company ||
    !branch ||
    !role ||
    !skills.length
  ) {

    alert(
      "Complete Company, Branch, Job Role and Required Skills."
    );

    return;
  }


  const industries =
    getIndustryData();


  const editId =
    document
    .getElementById(
      "industryEditId"
    )
    .value;


  let item =
    industries.find(
      industry =>
        industry.id === editId
    );


  if (!item) {

    item = {

      id:
        generateId("IND")

    };


    industries.push(
      item
    );

  }


  item.company =
    company;


  item.sector =
    document
    .getElementById(
      "industrySector"
    )
    .value.trim();


  item.branch =
    branch;


  item.jobRole =
    role;


  item.requiredSkills =
    skills;


  item.vacancies =
    Number(
      document
      .getElementById(
        "industryVacancies"
      )
      .value
    ) || 0;


  item.demandLevel =
    document
    .getElementById(
      "industryDemand"
    )
    .value;


  item.status =
    document
    .getElementById(
      "industryStatus"
    )
    .value;


  item.lastUpdated =
    new Date().toLocaleString();


  saveIndustryData(
    industries
  );


  clearIndustryForm();


  refreshGovernment();


  alert(
    "Industry requirement saved."
  );

}



function editIndustry(id) {

  const item =
    getIndustryData()
    .find(
      industry =>
        industry.id === id
    );


  if (!item) {
    return;
  }


  document
    .getElementById(
      "industryEditId"
    )
    .value =
    item.id;


  document
    .getElementById(
      "industryCompany"
    )
    .value =
    item.company;


  document
    .getElementById(
      "industrySector"
    )
    .value =
    item.sector || "";


  document
    .getElementById(
      "industryBranch"
    )
    .value =
    item.branch;


  document
    .getElementById(
      "industryJobRole"
    )
    .value =
    item.jobRole;


  document
    .getElementById(
      "industrySkills"
    )
    .value =
    (item.requiredSkills || [])
      .join(", ");


  document
    .getElementById(
      "industryVacancies"
    )
    .value =
    item.vacancies || 0;


  document
    .getElementById(
      "industryDemand"
    )
    .value =
    item.demandLevel || "Medium";


  document
    .getElementById(
      "industryStatus"
    )
    .value =
    item.status || "Active";


  window.scrollTo({
    top:0,
    behavior:"smooth"
  });

}



function deleteIndustry(id) {

  const confirmed =
    confirm(
      "Delete this Industry Requirement?"
    );


  if (!confirmed) {
    return;
  }


  const industries =
    getIndustryData()
    .filter(
      item =>
        item.id !== id
    );


  saveIndustryData(
    industries
  );


  refreshGovernment();

}



document
.getElementById(
  "clearIndustryForm"
)
.addEventListener(
  "click",
  clearIndustryForm
);



function clearIndustryForm() {

  document
    .getElementById(
      "industryEditId"
    )
    .value = "";


  document
    .getElementById(
      "industryCompany"
    )
    .value = "";


  document
    .getElementById(
      "industrySector"
    )
    .value = "";


  document
    .getElementById(
      "industryBranch"
    )
    .value = "";


  document
    .getElementById(
      "industryJobRole"
    )
    .value = "";


  document
    .getElementById(
      "industrySkills"
    )
    .value = "";


  document
    .getElementById(
      "industryVacancies"
    )
    .value = "1";


  document
    .getElementById(
      "industryDemand"
    )
    .value = "High";


  document
    .getElementById(
      "industryStatus"
    )
    .value = "Active";

}



function renderInstitutes() {

  const institutes =
    getInstitutes();


  const table =
    document
    .getElementById(
      "governmentInstitutes"
    );


  if (!institutes.length) {

    table.innerHTML = `

      <tr>

        <td colspan="8">

          No Institute Data submitted yet.

        </td>

      </tr>

    `;

    return;
  }


  table.innerHTML =
    institutes.map(
      institute => `

        <tr>

          <td>

            <strong>
              ${escapeHTML(institute.name)}
            </strong>

            <br>

            <small>
              ${escapeHTML(institute.email)}
            </small>

          </td>


          <td>
            ${escapeHTML(institute.department || "")}
          </td>


          <td>
            ${escapeHTML(institute.branch || "")}
          </td>


          <td>
            ${escapeHTML(institute.course || "")}
          </td>


          <td>
            ${escapeHTML(
              (institute.skillsTaught || [])
                .join(", ")
            )}
          </td>


          <td>
            ${escapeHTML(institute.trainingPrograms || "")}
          </td>


          <td>
            ${escapeHTML(institute.labs || "")}
          </td>


          <td>
            ${escapeHTML(institute.lastUpdated || "")}
          </td>

        </tr>

      `
    ).join("");

}



document
.getElementById(
  "governmentLogout"
)
.addEventListener(
  "click",
  function() {

    sessionStorage.removeItem(
      "yuvaGovernmentLoggedIn"
    );


    showGovernmentLogin();

  }
);



if (
  sessionStorage.getItem(
    "yuvaGovernmentLoggedIn"
  ) === "true"
) {

  showGovernmentApp();

} else {

  showGovernmentLogin();

}