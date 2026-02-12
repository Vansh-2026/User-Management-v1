import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Students } from '../Services/students';
import { student } from '../Interface/student';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, FormsModule],
  templateUrl: './students.html',
  styleUrl: './students.css',
})
export class students implements OnInit {
  selectedStudent: student | undefined;
  student: student[] = [];
  constructor(private studentService: Students,private cdr:ChangeDetectorRef) {

  }
  ngOnInit(): void {
    this.getUser();
    
  }

  getUser() {
    this.studentService.getStudent().subscribe((data: student[]) => {
      console.log(data);
      this.student = data;
      this.cdr.detectChanges();
    });
  }

  addUser(stud: student) {
    if (!this.selectedStudent) {
      this.studentService.saveStudent(stud).subscribe((data: student) => {
        if (data) {
          this.getUser();
        }
      });
    }
    else {
      const userData={...stud,id:this.selectedStudent.id}
      this.studentService.updateStudent(userData).subscribe((data: student) => {
        if (data) {
          this.getUser();
        }
      });
    }

  }
  deleteStudent(id: any) {
    this.studentService.deleteStudent(id).subscribe((data: student) => {
      console.log(data);
      if (data) {
        this.getUser();
      }
    });
  }
  updateStudent(id: string) {
    this.studentService.getSelectedStudent(id).subscribe((data: student) => {
      console.log(data);
      this.selectedStudent = data

    });
  }

}
export { Students };

