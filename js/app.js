//app.js
import { saveStudent, readStudents } from "./modules/storage.js";

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
class StudentRepository {
  constructor() {
    this.students = readStudents();
  }
  addStudent(student) {
    this.students.push(student);
    this.sortRank();
    this.addRank();
    saveStudent(this.students);
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
  deleteStudent(studentNum, studentName) {
    if (studentNum) {
      this.students = this.students.filter(
        (el) => el.studentNum !== parseInt(studentNum),
      );
    } else if (studentName) {
      this.students = this.students.filter((el) => el.name !== studentName);
    }
    saveStudent(this.students);
  }
}

let studentRepository = new StudentRepository();
// let students = studentRepository.students; => 배열을 변수로 저장(복사)하면 원본 배열이 업데이트 돼도 복사본은 변하지 않음. 따라서 변수로 저장하면 X
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

tBody.innerHTML = displayForm(studentRepository.students); // 초기 학생 목록 표시

addBtn.addEventListener("click", () => {
  const newStudent = new Student(
    parseInt(inputNum.value),
    inputName.value,
    parseInt(inputKor.value),
    parseInt(inputEng.value),
    parseInt(inputMath.value),
  );
  readStudents(); // 첨에 안읽어오면 버튼 첨에 클릭했을 때 학생이 추가되는 게 아니라 빈 배열이 스토리지에 저장됨
  studentRepository.addStudent(newStudent);
  tBody.innerHTML = displayForm(studentRepository.students);
  inputNum.value = "";
  inputName.value = "";
  inputKor.value = "";
  inputEng.value = "";
  inputMath.value = "";
});

deleteBtn.addEventListener("click", () => {
  studentRepository.deleteStudent(inputNum.value, inputName.value);

  tBody.innerHTML = displayForm(studentRepository.students);
  alert("삭제됐습니다");

  inputNum.value = "";
  inputName.value = "";
});

sortSelect.addEventListener("change", (e) => {
  if (sortSelect.value === "rank") {
    studentRepository.sortRank();
    tBody.innerHTML = displayForm(studentRepository.students);
  } else if (sortSelect.value === "ssn") {
    let result = studentRepository.students.sort((a, b) => {
      return a.studentNum - b.studentNum;
    });
    tBody.innerHTML = displayForm(result);
  } else if (sortSelect.value === "name") {
    let result = studentRepository.students.sort((a, b) => {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });
    tBody.innerHTML = displayForm(result);
  }
});

searchBtn.addEventListener("click", (e) => {
  console.log(e);
  if (
    (searchSelect.value === "ssn" || searchSelect.value === "name") &&
    searchInput.value === ""
  ) {
    let result = readStudents();
    tBody.innerHTML = displayForm(result);
  } else if (searchSelect.value === "ssn") {
    let result = studentRepository.students.filter(
      (el) => el.studentNum === parseInt(searchInput.value),
    );
    tBody.innerHTML = displayForm(result);
  } else if (searchSelect.value === "name") {
    let result = studentRepository.students.filter(
      (el) => el.name === searchInput.value,
    );
    //find 사용하면 결과가 요소 1개, filter 사용하면 만족하는 요소 모두 새로운 배열로 반환.
    tBody.innerHTML = displayForm(result);
  }
});
