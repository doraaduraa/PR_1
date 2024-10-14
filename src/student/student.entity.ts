import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// Student entity represents a student record in the database
@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id: number; // Unique identifier for each student

  @Column()
  firstName: string; // First name of the student

  @Column()
  lastName: string; // Last name of the student

  @Column()
  classNumber: number; // Class number of the student

  @Column()
  busNumber: number; // Bus number assigned to the student

  @Column()
  teacherFirstName: string; // First name of the teacher

  @Column()
  teacherLastName: string; // Last name of the teacher
}
