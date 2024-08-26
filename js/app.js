//app.js
import { saveStudent, readStudents, deleteStudent } from "./modules/storage.js";

class Student {
  constructor(studentNum, name, kor, eng, math) {
    this.studentNum = studentNum;
    this.name = name;
    this.kor = kor;
    this.eng = eng;
    this.math = math;
    this.sum = kor + eng + math;
    this.avg = Math.floor(this.sum / 3);
    this.rank = 0;
  }
}
// TODO 로컬 스토리지

class StudentRepository {
  constructor() {
    this.students = [];
  }
  addStudent(student) {
    this.students.push(student);
    this.sortRank();
    this.addRank();
  }
  addRank() {
    this.students.forEach((el, idx) => {
      el.rank = idx + 1;
    });
  }
  sortRank() {
    this.students.sort((a, b) => {
      return b.avg - a.avg;
    });
  }
}

let studentRepository = new StudentRepository();
let students = studentRepository.students;
const addBtn = document.querySelector("#addBtn");
const searchBtn = document.querySelector("#searchBtn");
const deleteBtn = document.querySelector("#deleteBtn");
const tBody = document.querySelector("tbody");

const displayForm = function (arr) {
  return `
  ${arr
    .map((el) => {
      return `
    <tr>
      <td>${el.studentNum}</td>
      <td>${el.name}</td>
      <td>${el.kor}</td>
      <td>${el.eng}</td>
      <td>${el.math}</td>
      <td>${el.sum}</td>
      <td>${el.avg}</td>
      <td>${el.rank}</td>
   </tr>
    `;
    })
    .join("")}
  `;
};

const inputNum = document.querySelector("input[name=sno]");
const inputName = document.querySelector("input[name=sname]");
const inputKor = document.querySelector("input[name=kor]");
const inputEng = document.querySelector("input[name=eng]");
const inputMath = document.querySelector("input[name=math]");
const sortSelect = document.querySelector("#sortSelect");
const searchSelect = document.querySelector("#searchSelect");
const searchInput = document.querySelector("#searchInput");

addBtn.addEventListener("click", () => {
  const newStudent = new Student(
    parseInt(inputNum.value),
    inputName.value,
    parseInt(inputKor.value),
    parseInt(inputEng.value),
    parseInt(inputMath.value),
  );
  studentRepository.addStudent(newStudent);
  readStudents(); // 첨에 안읽어오면 버튼 첨에 클릭했을 때 학생이 추가되는 게 아니라 빈 배열이 스토리지에 저장됨
  saveStudent(newStudent);
  tBody.innerHTML = displayForm(students);
});

deleteBtn.addEventListener("click", () => {
  students = readStudents();
  let result;
  if (inputNum.value) {
    result = students.filter(
      (el) => el.studentNum !== parseInt(inputNum.value),
    );
  } else if (inputName.value) {
    result = students.filter((el) => el.name !== inputName.value);
  }
  deleteStudent(result);
  students = result;
  tBody.innerHTML = displayForm(students);
  alert("삭제됐습니다");
});

sortSelect.addEventListener("change", (e) => {
  if (sortSelect.value === "rank") {
    studentRepository.sortRank();
    tBody.innerHTML = displayForm(students);
  } else if (sortSelect.value === "ssn") {
    let result = students.sort((a, b) => {
      return a.studentNum - b.studentNum;
    });
    tBody.innerHTML = displayForm(result);
  } else if (sortSelect.value === "name") {
    let result = students.sort((a, b) => {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });
    tBody.innerHTML = displayForm(result);
  }
});

searchBtn.addEventListener("click", () => {
  if (searchSelect.value === "ssn") {
    let result = students.filter(
      (el) => el.studentNum === parseInt(searchInput.value),
    );
    tBody.innerHTML = displayForm(result);
  } else if (searchSelect.value === "name") {
    let result = students.filter((el) => el.name === searchInput.value);
    //find 사용하면 결과가 요소 1개, filter 사용하면 만족하는 요소 모두 새로운 배열로 반환.
    tBody.innerHTML = displayForm(result);
  }
});
