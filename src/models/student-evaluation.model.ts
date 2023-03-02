import { Attendance, Evaluation } from "./enums";
import { Student } from "./student.model";

export class StudentEvaluation {
  id: string;
  date: Date;
  attendance: Attendance;
  participation: Evaluation;
  homework: Evaluation;
  behaviour: Evaluation;
  fee: number;
  discount: number;
  transportFee: number;
  note: string;
  studentId: string;
  student: Student;
}
