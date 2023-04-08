// Get a reference to the "Add Course" button and the courses container
const addCourseBtn = document.querySelector("#addCourse");
const removeCourseBtn = document.querySelector("#removeCourse");
const coursesContainer = document.querySelector("#courses");
const inputForm = document.getElementById("inputForm");
const course_list = []
const credithour_list = []
const grade_list = []



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

  courseData.forEach(function (course) {
    course_list.push(course.coursename);
    credithour_list.push(course.credithour);
    grade_list.push(course.grade);
  });

  console.log(course_list);
  console.log(credithour_list);
  console.log(grade_list);
});

