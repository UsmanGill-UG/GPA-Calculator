const addCourseBtn = document.querySelector("#addCourse");
const removeCourseBtn = document.querySelector("#removeCourse");
const coursesContainer = document.querySelector("#courses");
const inputForm = document.getElementById("inputForm");
let course_list = []
let credithour_list = []
let grade_list = []

addCourseBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const newCourse = document.createElement("div");
  newCourse.classList.add("course");
  newCourse.innerHTML = `
    <input type="text" name="coursename" placeholder="Course"  >
            <select name="credithour">
            <option value="100">Credit Hour</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
        </select>
  <select name="grade" >
                <option value="">Grade</option>
                <option value="4.0">A+</option>
                <option value="4.0">A</option>
                <option value="3.67">A-</option>
                <option value="3.33">B+</option>
                <option value="3.00">B</option>
                <option value="2.67">B-</option>
                <option value="2.33">C+</option>
                <option value="2.00">C</option>
                <option value="1.67">C-</option>
                <option value="1.33">D+</option>
                <option value="1.0">D</option>
                <option value="0.0">F</option>
            </select>
    `;
  coursesContainer.appendChild(newCourse);
});

removeCourseBtn.addEventListener("click", () => {
  const parent = document.getElementById("courses");
  const lastChild = parent.lastChild;
  parent.removeChild(lastChild);
});


inputForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const courses = document.querySelectorAll(".course");
  const current_cgpa = document.querySelector('[name="currentgpa"]').value;
  const creditsearned = document.querySelector('[name="creditearned"]').value;

  const courseData = [];
  courses.forEach(function (course) {
    const coursename = course.querySelector('[name="coursename"]').value;
    const credithour = course.querySelector('select[name="credithour"]').value;
    const grade = course.querySelector('select[name="grade"]').value;
    courseData.push({ coursename, credithour, grade });
  });

  // clearing list
  course_list.length = 0;
  credithour_list.length = 0;
  grade_list.length = 0;

  courseData.forEach(function (course) {
    course_list.push(course.coursename);
    credithour_list.push(course.credithour);
    grade_list.push(course.grade);
  });


  credithour_list = credithour_list.map(Number);
  grade_list = grade_list.map(Number);
  let sgpa = calculateSGPA();
  let semester_credits = credithour_list.reduce((acc, val) => acc + val, 0);
  console.log("sgpa: ", sgpa," SC: ", semester_credits);
  document.getElementById("sgpa").innerHTML = "SGPA: " + sgpa;

  //  CGPA calculation
  let totalCredits = Number(semester_credits) + Number(creditsearned);
  console.log("total CG credits: ", totalCredits);
  let semester_QP = semester_credits * sgpa;
  console.log("Semester QP: ", semester_QP);
  let prev_QP = current_cgpa * creditsearned;
  console.log("prev_QP: ", prev_QP);
  let CGPA = (prev_QP + semester_QP) / (totalCredits);
  CGPA=CGPA.toFixed(2);
  console.log("CGPA: ", CGPA);
  document.getElementById("cgpa").innerHTML = "CGPA: " + CGPA;

  document.getElementById('sgpa').style.display='block';
  document.getElementById('cgpa').style.display='block';
});

function calculateSGPA() {
  const totalCredits = credithour_list.reduce((acc, val) => acc + val, 0);
  let totalGradePoints = 0;
  // console.log("totalCredits: ", totalCredits);
  // console.log("grade_list: ", grade_list);
  // console.log("credithour_list: ", credithour_list);
  for (let i = 0; i < credithour_list.length; i++) {
    totalGradePoints += (credithour_list[i] * grade_list[i]);
    console.log("totalGradePoints: ", totalGradePoints);
  }
  console.log("totalGradePoints: ", totalGradePoints);
  const sgpa = totalGradePoints / totalCredits;
  return sgpa.toFixed(2); // round to 2 decimal places
}
