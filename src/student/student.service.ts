import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';

// StudentService handles data operations for the Student entity
@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>, // Inject the Student repository
  ) {}

  // Find students by last name
  async findByLastName(lastName: string): Promise<Student[]> {
    return this.studentRepository.find({ where: { lastName } });
  }

  // Find students by last name and bus number
  async findByLastNameAndBus(lastName: string, busNumber: number): Promise<Student[]> {
    return this.studentRepository.find({ where: { lastName, busNumber } });
  }

  // Find students by teacher's last name
  async findByTeacherLastName(teacherLastName: string): Promise<Student[]> {
    return this.studentRepository.find({ where: { teacherLastName } });
  }

  // Find students by class number
  async findByClassNumber(classNumber: number): Promise<Student[]> {
    return this.studentRepository.find({ where: { classNumber } });
  }

  // Find students by bus number
  async findByBusNumber(busNumber: number): Promise<Student[]> {
    return this.studentRepository.find({ where: { busNumber } });
  }

  // Additional method to find students by class (grade)
  async findByClass(grade: number): Promise<Student[]> {
    return this.studentRepository.find({ where: { classNumber: grade } });
  }
}
