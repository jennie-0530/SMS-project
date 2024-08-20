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
  constructor(studentNum, name, kor, eng, math, sum, avg) {
    this.studentNum = studentNum;
    this.name = name;
    this.kor = kor;
    this.eng = eng;
    this.math = math;
    this.sum = kor + eng + math;
    this.avg = parseInt(this.sum / 3);
  }
}

class StudentRepository {
  constructor() {
    this.students = [];
  }
  addStudent(student) {
    saveStudent(student);
    return student;
  }
}
let studentRepository = new StudentRepository();

const addBtn = document.querySelector("#addBtn");
const table = document.querySelector(".table");
const tableBody = document.querySelector("tbody");
console.log(tableBody);

addBtn.addEventListener("click", () => {
  let student = studentRepository.addStudent(
    new Student(13, "최기정", 95, 85, 88),
  );
  let students = readStudents();
  console.log(students);

  students.forEach((el, idx) => {
    // students 배열 순회
    tableBody.innerHTML = `
    <tr>
     <td>${students[idx].studentNum}</td>
     <td>${students[idx].name}</td>
     <td>${students[idx].kor}</td>
     <td>${students[idx].eng}</td>
     <td>${students[idx].math}</td>
     <td>${students[idx].sum}</td>
     <td>${students[idx].avg}</td>
    </tr>
    `;
    table.append(tableBody);
  });
});

// return `
// <tr>
//  <td>${data[idx].studentNum}</td>
//  <td>${data[idx].name}</td>
//  <td>${data[idx].kor}</td>
//  <td>${data[idx].eng}</td>
//  <td>${data[idx].math}</td>
//  <td>${data[idx].sum}</td>
//  <td>${data[idx].avg}</td>
// </tr>;
// `;

/*
tr 생성 (td를 감싸는 태그)
td 생성하는데 students 배열에 내가 새로 추가한(배열의 마지막 요소) student 객체의 값들을 td 태그들의 값(내용)으로 각각 매핑해줘야 함.

[
    {"studentNum":13,"name":"최기정","kor":95,"eng":85,"math":88, "sum":268, "avg": 89}, => data, 0
    {"studentNum":13,"name":"최기정","kor":95,"eng":85,"math":88,"sum":268, "avg": 89},
    {"studentNum":13,"name":"최기정","kor":95,"eng":85,"math":88,"sum":268, "avg": 89}
] => 서버로부터 받아온 배열 데이터
*/
