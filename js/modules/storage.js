const saveStudent = function (student) {
  let students = readStudents(); // 항상 최신 데이터를 읽어옴
  students.push(student); // 새 학생 추가
  const json = JSON.stringify(students);
  localStorage.setItem("students", json); // 업데이트된 배열을 저장
};

const deleteStudent = function (filteredStudents) {
  // filteredStudents는 이미 삭제된 학생을 제외한 배열임.
  const json = JSON.stringify(filteredStudents);
  localStorage.setItem("students", json);
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

export { saveStudent, deleteStudent, readStudents };
