populateBranchSelect(
  "instituteBranch"
);


const instituteLogin =
  document.getElementById(
    "instituteLogin"
  );


const instituteApp =
  document.getElementById(
    "instituteApp"
  );


let currentInstituteEmail =
  sessionStorage.getItem(
    "yuvaCurrentInstitute"
  );



document
.getElementById(
  "instituteLoginForm"
)
.addEventListener(
  "submit",
  function(event) {

    event.preventDefault();


    const email =
      document
      .getElementById(
        "instituteLoginEmail"
      )
      .value.trim();


    const password =
      document
      .getElementById(
        "instituteLoginPassword"
      )
      .value;


    if (
      !email.includes("@") ||
      password.length < 4
    ) {

      document
        .getElementById(
          "instituteLoginError"
        )
        .textContent =
        "Enter valid email and minimum 4-character password.";

      return;
    }


    currentInstituteEmail =
      email;


    sessionStorage.setItem(
      "yuvaCurrentInstitute",
      email
    );


    showInstituteApp();

  }
);



function showInstituteApp() {

  instituteLogin.classList.add(
    "hidden"
  );


  instituteApp.classList.remove(
    "hidden"
  );


  document
    .getElementById(
      "instituteEmail"
    )
    .value =
    currentInstituteEmail;


  loadInstitute();

}



function showInstituteLogin() {

  instituteLogin.classList.remove(
    "hidden"
  );


  instituteApp.classList.add(
    "hidden"
  );

}



function loadInstitute() {

  const institutes =
    getInstitutes();


  const institute =
    institutes.find(
      item =>
        item.email ===
        currentInstituteEmail
    );


  if (!institute) {
    return;
  }


  document
    .getElementById(
      "instituteName"
    )
    .value =
    institute.name || "";


  document
    .getElementById(
      "instituteDepartment"
    )
    .value =
    institute.department || "";


  document
    .getElementById(
      "instituteBranch"
    )
    .value =
    institute.branch || "";


  document
    .getElementById(
      "instituteCourse"
    )
    .value =
    institute.course || "";


  document
    .getElementById(
      "instituteSkills"
    )
    .value =
    (institute.skillsTaught || [])
      .join(", ");


  document
    .getElementById(
      "instituteTraining"
    )
    .value =
    institute.trainingPrograms || "";


  document
    .getElementById(
      "instituteLabs"
    )
    .value =
    institute.labs || "";


  renderIndustryTrends();

}



document
.getElementById(
  "instituteBranch"
)
.addEventListener(
  "change",
  renderIndustryTrends
);



document
.getElementById(
  "saveInstitute"
)
.addEventListener(
  "click",
  saveInstitute
);



function saveInstitute() {

  const name =
    document
    .getElementById(
      "instituteName"
    )
    .value.trim();


  const branch =
    document
    .getElementById(
      "instituteBranch"
    )
    .value;


  if (!name || !branch) {

    alert(
      "Enter Institute Name and Branch."
    );

    return;
  }


  const institutes =
    getInstitutes();


  let institute =
    institutes.find(
      item =>
        item.email ===
        currentInstituteEmail
    );


  if (!institute) {

    institute = {

      id:
        generateId("INS"),

      email:
        currentInstituteEmail

    };


    institutes.push(
      institute
    );

  }


  institute.name =
    name;


  institute.department =
    document
    .getElementById(
      "instituteDepartment"
    )
    .value.trim();


  institute.branch =
    branch;


  institute.course =
    document
    .getElementById(
      "instituteCourse"
    )
    .value.trim();


  institute.skillsTaught =
    skillArray(
      document
      .getElementById(
        "instituteSkills"
      )
      .value
    );


  institute.trainingPrograms =
    document
    .getElementById(
      "instituteTraining"
    )
    .value.trim();


  institute.labs =
    document
    .getElementById(
      "instituteLabs"
    )
    .value.trim();


  institute.lastUpdated =
    new Date().toLocaleString();


  saveInstitutes(
    institutes
  );


  renderIndustryTrends();


  alert(
    "Institute data saved successfully."
  );

}



function renderIndustryTrends() {

  const branch =
    document
    .getElementById(
      "instituteBranch"
    )
    .value;


  const box =
    document
    .getElementById(
      "industryTrends"
    );


  if (!branch) {

    box.innerHTML = `

      <div class="alert alert-info">

        Select your Branch to view
        industry demand.

      </div>

    `;

    return;
  }


  const industryData =
    getIndustryData()
    .filter(
      item =>
        item.status === "Active" &&
        item.branch === branch
    );


  if (!industryData.length) {

    box.innerHTML = `

      <div class="alert alert-warning">

        No active industry data available
        for this branch.

      </div>

    `;

    return;
  }


  const counts = {};


  industryData.forEach(
    item => {

      item.requiredSkills.forEach(
        skill => {

          counts[skill] =
            (counts[skill] || 0) + 1;

        }
      );

    }
  );


  const sorted =
    Object.entries(counts)
    .sort(
      (a,b) => b[1] - a[1]
    );


  const institute =
    getInstitutes()
    .find(
      item =>
        item.email ===
        currentInstituteEmail
    );


  const taught =
    (
      institute?.skillsTaught ||
      skillArray(
        document
        .getElementById(
          "instituteSkills"
        )
        .value
      )
    )
    .map(
      skill =>
        skill.toLowerCase()
    );


  box.innerHTML = `

    <div class="trend-grid">

      ${
        sorted.map(
          ([skill,count]) => {

            const covered =
              taught.includes(
                skill.toLowerCase()
              );


            return `

              <div class="trend-card">

                <h3>
                  ${escapeHTML(skill)}
                </h3>

                <p>
                  Required in
                  ${count}
                  active job role(s)
                </p>

                <br>

                <span
                  class="skill-chip
                  ${covered ? "match" : "missing"}"
                >

                  ${
                    covered
                    ? "✓ Currently Taught"
                    : "✕ Not Listed by Institute"
                  }

                </span>

              </div>

            `;

          }
        ).join("")
      }

    </div>

  `;

}



document
.getElementById(
  "instituteLogout"
)
.addEventListener(
  "click",
  function() {

    sessionStorage.removeItem(
      "yuvaCurrentInstitute"
    );


    currentInstituteEmail =
      null;


    showInstituteLogin();

  }
);



if (currentInstituteEmail) {

  showInstituteApp();

} else {

  showInstituteLogin();

}