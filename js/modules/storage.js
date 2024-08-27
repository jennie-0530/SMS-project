const saveStudent = function (students) {
  const json = JSON.stringify(students);
  localStorage.setItem("students", json); // 업데이트된 배열을 저장
};

const readStudents = function () {
  let students = [];

  if (localStorage.getItem("students")) {
    students = JSON.parse(localStorage.getItem("students"));
  }
  return students;
};

export { saveStudent, readStudents };
