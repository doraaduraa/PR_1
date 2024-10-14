import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student/student.entity';
import * as fs from 'fs';
import * as readline from 'readline';

// Service to load student data from a file
@Injectable()
export class DataLoaderService implements OnModuleInit {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>, // Inject the Student repository
  ) {}

  async onModuleInit() {
    await this.loadStudentsFromFile('students.txt'); // Load data when the module initializes
  }

  // Load students from a text file
  async loadStudentsFromFile(filePath: string) {
    const fileStream = fs.createReadStream(filePath); // Create a readable stream from the file
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity, // Handle line endings
    });

    // Read each line of the file
    for await (const line of rl) {
      const [
        lastName,
        firstName,
        classNumber,
        classroom,
        busNumber,
        teacherLastName,
        teacherFirstName,
      ] = line.split(','); // Split the line by commas

      // Create a new student entity and save it to the database
      const student = this.studentRepository.create({
        lastName: lastName.trim(),
        firstName: firstName.trim(),
        classNumber: parseInt(classNumber.trim(), 10),
        busNumber: parseInt(busNumber.trim(), 10),
        teacherLastName: teacherLastName.trim(),
        teacherFirstName: teacherFirstName.trim(),
      });

      await this.studentRepository.save(student);
    }

    console.log('Data uploaded successfully'); // Log success message
  }
}
