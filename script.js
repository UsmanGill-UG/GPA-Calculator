// Get a reference to the "Add Course" button and the courses container
const addCourseBtn = document.querySelector("#addCourse");
const removeCourseBtn = document.querySelector("#removeCourse");
const coursesContainer = document.querySelector("#courses");
const inputForm = document.getElementById("inputForm");
let course_list = []
let credithour_list = []
let grade_list = []

// Add a click event listener to the "Add Course" button
addCourseBtn.addEventListener("click", (event) => {
  event.preventDefault();
  // Create a new course element with input fields for the course name and credit hour
  const newCourse = document.createElement("div");
  newCourse.classList.add("course");
  newCourse.innerHTML = `
    <input type="text" name="coursename" placeholder="Course"  >
    <input type="number" name="credithour" placeholder="Credit Hour" step="1" min="0" max="4" >
  <select name="grade" >
                <option value="">Select Grade</option>
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

  // Add the new course element to the courses container
  coursesContainer.appendChild(newCourse);
});

removeCourseBtn.addEventListener("click", () => {
  const parent = document.getElementById("courses");
  const lastChild = parent.lastChild;
  parent.removeChild(lastChild);
});


inputForm.addEventListener("submit", function (event) {
  // Prevent the form from submitting
  event.preventDefault();

  // Get all the course elements
  const courses = document.querySelectorAll(".course");

  // Loop through the course elements and collect their values
  const courseData = [];
  courses.forEach(function (course) {
    const coursename = course.querySelector('[name="coursename"]').value;
    const credithour = course.querySelector('[name="credithour"]').value;
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

  console.log(course_list);
  console.log(credithour_list);
  console.log(grade_list);

  var sgpa = calculateSGPA();
  console.log("sgpa: ", sgpa);
  document.getElementById("sgpa").innerHTML = "SGPA: " + sgpa;
});

function calculateSGPA() {
  // if (creditHours.length !== grades.length) {
  //   throw new Error("Number of credit hours and grades do not match");
  // }

  const totalCredits = credithour_list.reduce((acc, val) => acc + val, 0);
  console.log("totalCredits: ", totalCredits);
  let totalGradePoints = 0;

  for (let i = 0; i < credithour_list.length; i++) {
    totalGradePoints += credithour_list[i] * grade_list[i];
  }

  console.log("totalGradePoints: ", totalGradePoints);
  const sgpa = totalGradePoints / totalCredits;
  return sgpa.toFixed(2); // round to 2 decimal places
}
