import { Component } from '@angular/core';
import { FormGroup, FormsModule, NgForm } from '@angular/forms';
import { UserBackendTs } from '../service/data/user-backend';
import { User } from '../TableSchema';

@Component({
  selector: 'app-user-database-add',
  imports: [FormsModule],
  templateUrl: './user-database-add.html',
  styleUrl: './user-database-add.css',
})
export class UserDatabaseAdd {
  
   user: User = new User(0, '', '', '', '');
  constructor(private userService : UserBackendTs){}
   addUser(form:NgForm) {
     let userData: User = form.value;


    this.userService.addUser(userData).subscribe({
      next: (data) => {
        console.log(data);
        form.reset();
      }
    });
  }

}
