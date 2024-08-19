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

