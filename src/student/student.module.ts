import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Student])], // Import TypeORM features for Student
  controllers: [StudentController], // Register the controller
  providers: [StudentService], // Register the service
})
export class StudentModule {}
