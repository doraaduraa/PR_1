import { Controller, Get, Query } from '@nestjs/common';
import { StudentService } from './student.service';
import { performance } from 'perf_hooks';

@Controller('students') // The base route for this controller
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  // Endpoint to search for students based on various criteria
  @Get('search')
  async search(@Query('query') query: string) {
    const start = performance.now(); // Start performance tracking

    // Split the query into parts: instruction and parameters
    const [instruction, param1, param2] = query.split(':').map((str) => str.trim());
    let result;

    switch (instruction) {
      // Search by last name
      case 'S':
        result = await this.studentService.findByLastName(param1);
        if (result.length === 0) return { message: 'No students found' };
        return result.map(student => ({
          lastName: student.lastName,
          firstName: student.firstName,
          classNumber: student.classNumber,
          teacher: `${student.teacherFirstName} ${student.teacherLastName}`,
        }));

      // Search by last name and bus number
      case 'S: B':
        const busNumber = parseInt(param2);
        if (isNaN(busNumber)) {
          return { message: 'Invalid bus number' };
        }
        result = await this.studentService.findByLastNameAndBus(param1, busNumber);
        return result.length === 0 ? { message: 'No students found' } : result.map(student => ({
          lastName: student.lastName,
          firstName: student.firstName,
          busNumber: student.busNumber,
        }));

      // Search by teacher's last name
      case 'T':
        result = await this.studentService.findByTeacherLastName(param1);
        return result.length === 0 ? { message: 'No students found' } : result.map(student => ({
          lastName: student.lastName,
          firstName: student.firstName,
        }));

      // Search by class number
      case 'C':
        const classNumber = parseInt(param1);
        if (isNaN(classNumber)) {
          return { message: 'Invalid class number' };
        }
        result = await this.studentService.findByClassNumber(classNumber);
        return result.length === 0 ? { message: 'No students found' } : result.map(student => ({
          lastName: student.lastName,
          firstName: student.firstName,
        }));

      // Search by bus number
      case 'B':
        const busNum = parseInt(param1);
        if (isNaN(busNum)) {
          return { message: 'Invalid bus number' };
        }
        result = await this.studentService.findByBusNumber(busNum);
        return result.length === 0 ? { message: 'No students found' } : result.map(student => ({
          lastName: student.lastName,
          firstName: student.firstName,
          classNumber: student.classNumber,
        }));

      // Quit command
      case 'Q':
        return { message: 'Quit command received' };

      // Handle invalid query instruction
      default:
        return { message: 'Invalid query' };
    }

  }
}
