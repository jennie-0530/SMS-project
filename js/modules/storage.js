const saveStudent = function (student) {
  let students;

  if (localStorage.getItem("students")) {
    students = JSON.parse(localStorage.getItem("students"));
  } else {
    students = [];
  }
  students.push(student);
  localStorage.setItem("students", JSON.stringify(students));
  return students;
};

const readStudents = function () {
  let students;

  if (localStorage.getItem("students")) {
    students = JSON.parse(localStorage.getItem("students"));
  } else {
    students = [];
  }
  return students;
};

export { saveStudent, readStudents };
