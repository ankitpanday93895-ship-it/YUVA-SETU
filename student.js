populateBranchSelect(
  "studentBranch"
);


const loginSection =
  document.getElementById(
    "studentLogin"
  );


const appSection =
  document.getElementById(
    "studentApp"
  );


const loginForm =
  document.getElementById(
    "studentLoginForm"
  );


let currentStudentEmail =
  sessionStorage.getItem(
    "yuvaCurrentStudent"
  );



function showStudentApp() {

  loginSection.classList.add(
    "hidden"
  );


  appSection.classList.remove(
    "hidden"
  );


  document
    .getElementById(
      "studentEmail"
    )
    .value =
    currentStudentEmail;


  loadStudentProfile();
}



function showStudentLogin() {

  loginSection.classList.remove(
    "hidden"
  );


  appSection.classList.add(
    "hidden"
  );
}



loginForm.addEventListener(
  "submit",
  function(event) {

    event.preventDefault();


    const email =
      document
      .getElementById(
        "loginEmail"
      )
      .value.trim();


    const password =
      document
      .getElementById(
        "loginPassword"
      )
      .value;


    if (
      !email.includes("@") ||
      password.length < 4
    ) {

      document
        .getElementById(
          "studentLoginError"
        )
        .textContent =
        "Enter a valid email and minimum 4-character password.";

      return;
    }


    currentStudentEmail =
      email;


    sessionStorage.setItem(
      "yuvaCurrentStudent",
      email
    );


    document
      .getElementById(
        "studentLoginError"
      )
      .textContent = "";


    showStudentApp();

  }
);



function loadStudentProfile() {

  const students =
    getStudents();


  const student =
    students.find(
      item =>
        item.email ===
        currentStudentEmail
    );


  if (!student) {

    updateStudentRoles();

    return;
  }


  document
    .getElementById(
      "studentName"
    )
    .value =
    student.name || "";


  document
    .getElementById(
      "studentCourse"
    )
    .value =
    student.course || "";


  document
    .getElementById(
      "studentBranch"
    )
    .value =
    student.branch || "";


  document
    .getElementById(
      "studentUniversity"
    )
    .value =
    student.university || "";


  document
    .getElementById(
      "studentYear"
    )
    .value =
    student.year || "";


  document
    .getElementById(
      "studentSkills"
    )
    .value =
    (student.currentSkills || [])
      .join(", ");


  updateStudentRoles();


  if (student.targetRole) {

    document
      .getElementById(
        "studentTargetRole"
      )
      .value =
      student.targetRole;

  }
}



document
.getElementById(
  "studentBranch"
)
.addEventListener(
  "change",
  updateStudentRoles
);



function updateStudentRoles() {

  const branch =
    document
    .getElementById(
      "studentBranch"
    )
    .value;


  const roleSelect =
    document
    .getElementById(
      "studentTargetRole"
    );


  const industryData =
    getIndustryData()
    .filter(
      item =>
        item.status === "Active" &&
        item.branch === branch
    );


  roleSelect.innerHTML = `

    <option value="">
      -- Select Job Role --
    </option>

  `;


  industryData.forEach(
    item => {

      const option =
        document.createElement(
          "option"
        );


      option.value =
        item.jobRole;


      option.textContent =
        `${item.jobRole} — ${item.company}`;


      roleSelect.appendChild(
        option
      );

    }
  );
}



document
.getElementById(
  "saveStudentProfile"
)
.addEventListener(
  "click",
  saveStudentProfile
);



function saveStudentProfile() {

  const name =
    document
    .getElementById(
      "studentName"
    )
    .value.trim();


  const branch =
    document
    .getElementById(
      "studentBranch"
    )
    .value;


  const university =
    document
    .getElementById(
      "studentUniversity"
    )
    .value.trim();


  if (
    !name ||
    !branch ||
    !university
  ) {

    alert(
      "Please complete Name, Branch and University."
    );

    return;
  }


  const students =
    getStudents();


  let student =
    students.find(
      item =>
        item.email ===
        currentStudentEmail
    );


  if (!student) {

    student = {

      id:
        generateId("STU"),

      email:
        currentStudentEmail

    };


    students.push(
      student
    );
  }


  student.name =
    name;


  student.course =
    document
    .getElementById(
      "studentCourse"
    )
    .value.trim();


  student.branch =
    branch;


  student.university =
    university;


  student.year =
    document
    .getElementById(
      "studentYear"
    )
    .value;


  student.currentSkills =
    skillArray(
      document
      .getElementById(
        "studentSkills"
      )
      .value
    );


  student.lastUpdated =
    new Date().toLocaleString();


  saveStudents(
    students
  );


  updateStudentRoles();


  alert(
    "Student profile saved successfully."
  );
}



document
.getElementById(
  "compareStudentSkills"
)
.addEventListener(
  "click",
  compareStudent
);



function compareStudent() {

  const branch =
    document
    .getElementById(
      "studentBranch"
    )
    .value;


  const targetRole =
    document
    .getElementById(
      "studentTargetRole"
    )
    .value;


  if (!branch || !targetRole) {

    alert(
      "Select Branch and Target Job Role."
    );

    return;
  }


  const industry =
    getIndustryData()
    .find(
      item =>
        item.status === "Active" &&
        item.branch === branch &&
        item.jobRole === targetRole
    );


  if (!industry) {

    alert(
      "No active Industry Requirement found."
    );

    return;
  }


  const currentSkills =
    skillArray(
      document
      .getElementById(
        "studentSkills"
      )
      .value
    );


  const comparison =
    compareSkills(
      currentSkills,
      industry.requiredSkills
    );


  const result =
    document
    .getElementById(
      "studentResult"
    );


  result.classList.remove(
    "hidden"
  );


  result.innerHTML = `

    <div class="alert alert-info">

      Requirement source:
      <strong>
        ${escapeHTML(industry.company)}
      </strong>

      • ${escapeHTML(industry.jobRole)}

    </div>


    <div class="match-score">

      ${comparison.percentage}%

    </div>

    <p>
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
                ✓ ${escapeHTML(skill)}
              </span>
            `
          )
          .join("")
        :
        `<span class="help-text">
          No matching skills.
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
                ✕ ${escapeHTML(skill)}
              </span>
            `
          )
          .join("")
        :
        `<span class="help-text">
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
        `<span class="help-text">
          None.
        </span>`
      }

    </div>

  `;


  const students =
    getStudents();


  let student =
    students.find(
      item =>
        item.email ===
        currentStudentEmail
    );


  if (!student) {

    alert(
      "Save your profile first."
    );

    return;
  }


  student.targetRole =
    targetRole;


  student.industryCompany =
    industry.company;


  student.matchPercentage =
    comparison.percentage;


  student.matchedSkills =
    comparison.matched;


  student.missingSkills =
    comparison.missing;


  student.additionalSkills =
    comparison.additional;


  student.lastUpdated =
    new Date().toLocaleString();


  saveStudents(
    students
  );

}



document
.getElementById(
  "studentLogout"
)
.addEventListener(
  "click",
  function() {

    sessionStorage.removeItem(
      "yuvaCurrentStudent"
    );


    currentStudentEmail =
      null;


    showStudentLogin();

  }
);



if (currentStudentEmail) {

  showStudentApp();

} else {

  showStudentLogin();

}