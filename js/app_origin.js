/*
^ 강사님 코드
import { Student } from "./Student.js";
import { StudentRepository } from "./student-repository.js";
import { EventHandler } from "./event-handler.js";

let studentRepository = new StudentRepository();
// 테스트를 위한 더미데이터 입력
studentRepository.addStudent(new Student(10, '김기정', 90, 80, 60));
studentRepository.addStudent(new Student(11, '최기정', 100, 90, 90));
studentRepository.addStudent(new Student(12, '박기정', 92, 82, 80));
studentRepository.addStudent(new Student(13, '최기정', 95, 85, 88));

let eventHandler = new EventHandler();
eventHandler.eventRegist();

export {studentRepository}
*/

import { saveStudent, readStudents } from "./modules/storage.js";

class Student {
  constructor(studentNum, name, kor, eng, math) {
    this.studentNum = studentNum;
    this.name = name;
    this.kor = kor;
    this.eng = eng;
    this.math = math;
    this.sum = kor + eng + math;
    this.avg = parseInt(this.sum / 3);
    this.rank = "";
  }
  addRank(num) {
    this.rank = num;
  }
}

// ! Repository는 학생 정보들을 저장하는 것!
class StudentRepository {
  constructor() {
    this.students = [];
  }
  addStudent(student) {
    // saveStudent(student); => 로컬 스토리지는 나중에 구현

    this.students.sort(function (a, b) {
      if (parseInt(a.avg) > parseInt(b.avg)) {
        return 1;
      }
      if (parseInt(a.avg) < parseInt(b.avg)) {
        return -1;
      }
      return 0;
    });
    console.log(this.students);
    this.students.push(student);
    console.log(this.students);
    return student;
  }
}
let studentRepository = new StudentRepository();
let students = studentRepository.students;
const addBtn = document.querySelector("#addBtn");
const tBody = document.querySelector("tbody");
const input = document.querySelectorAll(".form-control"); 
// TODO 각 input창을 접근할 때 input의 인덱스로 접근하는 것보다는 input[name=sno]처럼 name 속성으로 접근하기
// 인덱스로 접근하면 만약에 입력 순서가 바뀐다면 인덱스도 다 수정해야 하기 때문에 비효율적이다.

let inputNum,
  inputName,
  inputKor,
  inputEng,
  inputMath = "";

addBtn.addEventListener("click", () => {
  const newStudent = studentRepository.addStudent(
    new Student(inputNum, inputName, inputKor, inputEng, inputMath),
  );
// TODO map + join 메소드 사용해보기
  const tableRow = `
      <tr>
         <td>${newStudent.studentNum}</td>
         <td>${newStudent.name}</td>
         <td>${newStudent.kor}</td>
         <td>${newStudent.eng}</td>
         <td>${newStudent.math}</td>
         <td>${newStudent.sum}</td>
         <td>${newStudent.avg}</td>
        </tr>
        `;
  tBody.innerHTML += tableRow;

  input[0].value = ""; 
  input[1].value = "";
  input[2].value = "";
  input[3].value = "";
  input[4].value = "";
});

// TODO 최적화, 유효성 검증 필요
input[0].addEventListener("change", (e) => {
  inputNum = parseInt(e.target.value);
});
input[1].addEventListener("change", (e) => {
  inputName = e.target.value;
});
input[2].addEventListener("change", (e) => {
  inputKor = parseInt(e.target.value);
});
input[3].addEventListener("change", (e) => {
  inputEng = parseInt(e.target.value);
});
input[4].addEventListener("change", (e) => {
  inputMath = parseInt(e.target.value);
});
