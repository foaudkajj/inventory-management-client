import { Student } from "./student.model";

export class Installment {
  id: string;
  date: Date;
  amount: number;
  studentId: string;
  student: Student;
}
