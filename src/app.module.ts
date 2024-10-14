import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student/student.entity'; 
import { StudentService } from './student/student.service'; 
import { StudentController } from './student/student.controller'; 

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // Database type
      host: 'localhost', // Database host
      port: 3306, // Database port
      username: 'pr1', // Database username
      password: 'pr1', // Database password
      database: 'pr1', // Database name
      entities: [Student], // Entities to be registered
      synchronize: false, // Disable synchronization for production
    }),
    TypeOrmModule.forFeature([Student]), // Register the Student entity
  ],
  controllers: [StudentController], // Register the Student controller
  providers: [StudentService], // Register the Student service
})
export class AppModule {}
