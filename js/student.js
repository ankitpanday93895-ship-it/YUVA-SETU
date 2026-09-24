// =====================================================
// YUVA SETU - STUDENT PORTAL
// =====================================================


// -----------------------------------------------------
// INITIAL SETUP
// -----------------------------------------------------

populateBranchSelect(
  "studentBranch"
);


let currentStudentEmail =
  sessionStorage.getItem(
    "yuva_current_student"
  );


// -----------------------------------------------------
// ELEMENTS
// -----------------------------------------------------

const studentAuth =
  document.getElementById(
    "studentAuth"
  );


const studentApp =
  document.getElementById(
    "studentApp"
  );


const loginForm =
  document.getElementById(
    "studentLoginForm"
  );


const registerForm =
  document.getElementById(
    "studentRegisterForm"
  );


const loginTab =
  document.getElementById(
    "studentLoginTab"
  );


const registerTab =
  document.getElementById(
    "studentRegisterTab"
  );


// =====================================================
// AUTH SWITCH
// =====================================================

function showStudentLoginForm() {

  loginForm.classList.remove(
    "hidden"
  );


  registerForm.classList.add(
    "hidden"
  );


  loginTab.classList.add(
    "active"
  );


  registerTab.classList.remove(
    "active"
  );


  document.getElementById(
    "studentLoginError"
  ).textContent = "";

}



function showStudentRegisterForm() {

  registerForm.classList.remove(
    "hidden"
  );


  loginForm.classList.add(
    "hidden"
  );


  registerTab.classList.add(
    "active"
  );


  loginTab.classList.remove(
    "active"
  );


  document.getElementById(
    "studentRegisterError"
  ).textContent = "";

}



loginTab.addEventListener(
  "click",
  showStudentLoginForm
);


registerTab.addEventListener(
  "click",
  showStudentRegisterForm
);


document.getElementById(
  "studentOpenRegister"
).addEventListener(
  "click",
  showStudentRegisterForm
);


document.getElementById(
  "studentOpenLogin"
).addEventListener(
  "click",
  showStudentLoginForm
);


// =====================================================
// REGISTER
// =====================================================

registerForm.addEventListener(
  "submit",
  async function(event) {

    event.preventDefault();


    const name =
      document
        .getElementById(
          "studentRegisterName"
        )
        .value
        .trim();


    const email =
      normalizeEmail(
        document
          .getElementById(
            "studentRegisterEmail"
          )
          .value
      );


    const password =
      document
        .getElementById(
          "studentRegisterPassword"
        )
        .value;


    const confirmPassword =
      document
        .getElementById(
          "studentConfirmPassword"
        )
        .value;


    const errorBox =
      document.getElementById(
        "studentRegisterError"
      );


    errorBox.textContent = "";


    if (
      !name ||
      !email ||
      !email.includes("@")
    ) {

      errorBox.textContent =
        "Please enter a valid name and email.";

      return;

    }


    if (
      password.length < 6
    ) {

      errorBox.textContent =
        "Password must contain at least 6 characters.";

      return;

    }


    if (
      password !==
      confirmPassword
    ) {

      errorBox.textContent =
        "Passwords do not match.";

      return;

    }


    const accounts =
      getStudentAccounts();


    const alreadyExists =
      accounts.some(
        account =>
          account.email === email
      );


    if (alreadyExists) {

      errorBox.textContent =
        "This email is already registered. Please login.";

      return;

    }


    const passwordHash =
      await hashPassword(
        password
      );


    const accountId =
      generateId(
        "STUDENT-ACCOUNT"
      );


    accounts.push({

      id:
        accountId,

      name:
        name,

      email:
        email,

      passwordHash:
        passwordHash,

      createdAt:
        currentDateTime()

    });


    saveStudentAccounts(
      accounts
    );


    const students =
      getStudents();


    students.push({

      id:
        generateId("STU"),

      accountId:
        accountId,

      name:
        name,

      email:
        email,

      course:
        "",

      branch:
        "",

      university:
        "",

      year:
        "",

      currentSkills:
        [],

      targetIndustryId:
        "",

      targetRole:
        "",

      industryCompany:
        "",

      matchPercentage:
        null,

      matchedSkills:
        [],

      missingSkills:
        [],

      additionalSkills:
        [],

      createdAt:
        currentDateTime(),

      updatedAt:
        currentDateTime()

    });


    saveStudents(
      students
    );


    currentStudentEmail =
      email;


    sessionStorage.setItem(
      "yuva_current_student",
      email
    );


    showStudentDashboard();

  }
);


// =====================================================
// LOGIN
// =====================================================

loginForm.addEventListener(
  "submit",
  async function(event) {

    event.preventDefault();


    const email =
      normalizeEmail(
        document
          .getElementById(
            "studentLoginEmail"
          )
          .value
      );


    const password =
      document
        .getElementById(
          "studentLoginPassword"
        )
        .value;


    const errorBox =
      document.getElementById(
        "studentLoginError"
      );


    errorBox.textContent = "";


    const accounts =
      getStudentAccounts();


    const account =
      accounts.find(
        item =>
          item.email === email
      );


    if (!account) {

      errorBox.textContent =
        "Account not found. Please register first.";

      return;

    }


    const enteredHash =
      await hashPassword(
        password
      );


    if (
      enteredHash !==
      account.passwordHash
    ) {

      errorBox.textContent =
        "Incorrect password.";

      return;

    }


    currentStudentEmail =
      email;


    sessionStorage.setItem(
      "yuva_current_student",
      email
    );


    showStudentDashboard();

  }
);


// =====================================================
// SHOW DASHBOARD
// =====================================================

function showStudentDashboard() {

  studentAuth.classList.add(
    "hidden"
  );


  studentApp.classList.remove(
    "hidden"
  );


  loadStudentProfile();

}


// =====================================================
// SHOW AUTH
// =====================================================

function showStudentAuth() {

  studentApp.classList.add(
    "hidden"
  );


  studentAuth.classList.remove(
    "hidden"
  );


  showStudentLoginForm();

}


// =====================================================
// GET CURRENT STUDENT
// =====================================================

function getCurrentStudent() {

  return getStudents()
    .find(
      student =>
        student.email ===
        currentStudentEmail
    );

}


// =====================================================
// LOAD PROFILE
// =====================================================

function loadStudentProfile() {

  const student =
    getCurrentStudent();


  if (!student) {

    return;

  }


  document.getElementById(
    "studentWelcome"
  ).textContent =
    "Welcome, " +
    (student.name || "Student");


  document.getElementById(
    "studentName"
  ).value =
    student.name || "";


  document.getElementById(
    "studentEmail"
  ).value =
    student.email || "";


  document.getElementById(
    "studentCourse"
  ).value =
    student.course || "";


  document.getElementById(
    "studentBranch"
  ).value =
    student.branch || "";


  document.getElementById(
    "studentUniversity"
  ).value =
    student.university || "";


  document.getElementById(
    "studentYear"
  ).value =
    student.year || "";


  document.getElementById(
    "studentSkills"
  ).value =
    skillArray(
      student.currentSkills
    ).join(", ");


  updateStudentJobRoles();


  if (
    student.targetIndustryId
  ) {

    document.getElementById(
      "studentTargetRole"
    ).value =
      student.targetIndustryId;

  }


  if (
    student.matchPercentage !==
    null &&
    student.targetRole
  ) {

    renderSavedResult(
      student
    );

  }

}


// =====================================================
// SAVE STUDENT PROFILE
// =====================================================

document.getElementById(
  "saveStudentProfile"
).addEventListener(
  "click",
  saveStudentProfile
);



function saveStudentProfile() {

  const name =
    document.getElementById(
      "studentName"
    ).value.trim();


  const course =
    document.getElementById(
      "studentCourse"
    ).value.trim();


  const branch =
    document.getElementById(
      "studentBranch"
    ).value;


  const university =
    document.getElementById(
      "studentUniversity"
    ).value.trim();


  const year =
    document.getElementById(
      "studentYear"
    ).value;


  const skills =
    skillArray(
      document.getElementById(
        "studentSkills"
      ).value
    );


  if (
    !name ||
    !course ||
    !branch ||
    !university ||
    !year
  ) {

    alert(
      "Please complete Name, Course, Branch, University and Year."
    );

    return;

  }


  const students =
    getStudents();


  const index =
    students.findIndex(
      student =>
        student.email ===
        currentStudentEmail
    );


  if (
    index === -1
  ) {

    alert(
      "Student account data not found."
    );

    return;

  }


  students[index].name =
    name;


  students[index].course =
    course;


  students[index].branch =
    branch;


  students[index].university =
    university;


  students[index].year =
    year;


  students[index].currentSkills =
    skills;


  students[index].updatedAt =
    currentDateTime();


  saveStudents(
    students
  );


  document.getElementById(
    "studentWelcome"
  ).textContent =
    "Welcome, " +
    name;


  updateStudentJobRoles();


  document.getElementById(
    "studentSaveMessage"
  ).innerHTML = `

    <div class="alert alert-success">

      Profile saved successfully.
      Your latest data is now available
      in Government → Student Data.

    </div>

  `;

}


// =====================================================
// BRANCH CHANGE
// =====================================================

document.getElementById(
  "studentBranch"
).addEventListener(
  "change",
  updateStudentJobRoles
);


// =====================================================
// JOB ROLES
// =====================================================

function updateStudentJobRoles() {

  const branch =
    document.getElementById(
      "studentBranch"
    ).value;


  const dropdown =
    document.getElementById(
      "studentTargetRole"
    );


  dropdown.innerHTML = `

    <option value="">
      -- Select Job Role --
    </option>

  `;


  if (!branch) {

    return;

  }


  const requirements =
    getIndustryData()
      .filter(
        item =>
          item.branch === branch &&
          item.status === "Active"
      );


  requirements.forEach(
    requirement => {

      const option =
        document.createElement(
          "option"
        );


      option.value =
        requirement.id;


      option.textContent =
        requirement.jobRole +
        " — " +
        requirement.company;


      dropdown.appendChild(
        option
      );

    }
  );

}


// =====================================================
// COMPARE BUTTON
// =====================================================

document.getElementById(
  "compareStudentSkills"
).addEventListener(
  "click",
  compareStudentSkills
);


// =====================================================
// COMPARE SKILLS
// =====================================================

function compareStudentSkills() {

  const student =
    getCurrentStudent();


  if (!student) {

    alert(
      "Student profile not found."
    );

    return;

  }


  const branch =
    document.getElementById(
      "studentBranch"
    ).value;


  const selectedIndustryId =
    document.getElementById(
      "studentTargetRole"
    ).value;


  const currentSkills =
    skillArray(
      document.getElementById(
        "studentSkills"
      ).value
    );


  if (
    !branch ||
    !selectedIndustryId
  ) {

    alert(
      "Please select Branch and Target Job Role."
    );

    return;

  }


  const requirement =
    getIndustryData()
      .find(
        item =>
          item.id ===
          selectedIndustryId &&
          item.status ===
          "Active"
      );


  if (!requirement) {

    alert(
      "Selected industry requirement is not available."
    );

    updateStudentJobRoles();

    return;

  }


  const comparison =
    compareSkills(
      currentSkills,
      requirement.requiredSkills
    );


  const students =
    getStudents();


  const index =
    students.findIndex(
      item =>
        item.email ===
        currentStudentEmail
    );


  if (
    index === -1
  ) {

    return;

  }


  students[index].currentSkills =
    currentSkills;


  students[index].targetIndustryId =
    requirement.id;


  students[index].targetRole =
    requirement.jobRole;


  students[index].industryCompany =
    requirement.company;


  students[index].matchPercentage =
    comparison.percentage;


  students[index].matchedSkills =
    comparison.matched;


  students[index].missingSkills =
    comparison.missing;


  students[index].additionalSkills =
    comparison.additional;


  students[index].updatedAt =
    currentDateTime();


  saveStudents(
    students
  );


  renderStudentComparison(
    requirement,
    comparison
  );

}


// =====================================================
// RENDER COMPARISON
// =====================================================

function renderStudentComparison(
  requirement,
  comparison
) {

  const result =
    document.getElementById(
      "studentResult"
    );


  result.classList.remove(
    "hidden"
  );


  result.innerHTML = `

    <div class="alert alert-info">

      Comparing with:

      <strong>
        ${escapeHTML(
          requirement.jobRole
        )}
      </strong>

      at

      <strong>
        ${escapeHTML(
          requirement.company
        )}
      </strong>

    </div>


    <div class="match-score">

      ${comparison.percentage}%

    </div>

    <p class="small-muted">
      Skill Match
    </p>


    <br>


    <h3>
      Matched Skills
    </h3>


    <div class="skill-wrap">

      ${
        comparison.matched.length

        ?

        comparison.matched
          .map(
            skill => `

              <span class="skill-chip match">

                ✓
                ${escapeHTML(skill)}

              </span>

            `
          )
          .join("")

        :

        `<span class="small-muted">
          No matched skills.
        </span>`
      }

    </div>


    <br>


    <h3>
      Missing Skills
    </h3>


    <div class="skill-wrap">

      ${
        comparison.missing.length

        ?

        comparison.missing
          .map(
            skill => `

              <span class="skill-chip missing">

                ✕
                ${escapeHTML(skill)}

              </span>

            `
          )
          .join("")

        :

        `<span class="small-muted">
          No missing skills.
        </span>`
      }

    </div>


    <br>


    <h3>
      Additional / Not Required Skills
    </h3>


    <div class="skill-wrap">

      ${
        comparison.additional.length

        ?

        comparison.additional
          .map(
            skill => `

              <span class="skill-chip extra">

                ${escapeHTML(skill)}

              </span>

            `
          )
          .join("")

        :

        `<span class="small-muted">
          None.
        </span>`
      }

    </div>

  `;

}


// =====================================================
// SAVED RESULT
// =====================================================

function renderSavedResult(
  student
) {

  const requirement =
    getIndustryData()
      .find(
        item =>
          item.id ===
          student.targetIndustryId
      );


  if (!requirement) {

    return;

  }


  renderStudentComparison(

    requirement,

    {

      percentage:
        student.matchPercentage || 0,

      matched:
        student.matchedSkills || [],

      missing:
        student.missingSkills || [],

      additional:
        student.additionalSkills || []

    }

  );

}


// =====================================================
// LOGOUT
// =====================================================

document.getElementById(
  "studentLogout"
).addEventListener(
  "click",
  function() {

    sessionStorage.removeItem(
      "yuva_current_student"
    );


    currentStudentEmail =
      null;


    showStudentAuth();

  }
);


// =====================================================
// PAGE START
// =====================================================

if (currentStudentEmail) {

  const accountExists =
    getStudentAccounts()
      .some(
        account =>
          account.email ===
          currentStudentEmail
      );


  if (accountExists) {

    showStudentDashboard();

  }

  else {

    sessionStorage.removeItem(
      "yuva_current_student"
    );

    currentStudentEmail =
      null;

    showStudentAuth();

  }

}

else {

  showStudentAuth();

}
