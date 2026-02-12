import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { UserBackendTs } from '../service/data/user-backend.js';
import { User } from '../TableSchema.js';
import { log } from 'console';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-user-list-database',
  imports: [CommonModule],
  templateUrl: './user-list-database.html',
  styleUrl: './user-list-database.css',
})
export class UserListDatabase implements OnInit {



  users: User[] = [];
  constructor(private userService: UserBackendTs, private cdr: ChangeDetectorRef, private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.loadUsers();

  }
  loadUsers() {
    this.userService.getUsers().subscribe((data) => {
      console.log(data);

      this.users = data;
      this.cdr.detectChanges();
    });
  }
  router = inject(Router);
  addUser() {
    console.log("addUser Clicked ... ")
    this.router.navigate(['/userAdd']);

  }
  updateUser(id:number) {
    console.log("Update Button Clicked ...")
    this.router.navigate(['/userAdd',id]);
  }
  deleteUser(id:number) {
 
     this.userService.deleteUser(id).subscribe((data) => {
      alert('User deleted');
      console.log("user deleted ...",data)
      this.router.navigate(['/user-list-database']);
    });

  }
}
