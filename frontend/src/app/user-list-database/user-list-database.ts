
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { UserBackendTs } from '../service/data/user-backend.js';
import { User } from '../TableSchema.js';
import { CommonModule } from '@angular/common';
import { GridComponent, ColumnComponent, GridModule } from "@progress/kendo-angular-grid";
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-user-list-database',
  imports: [CommonModule, GridComponent, ColumnComponent, GridModule, FormsModule],
  templateUrl: './user-list-database.html',
  styleUrl: './user-list-database.css',
})
export class UserListDatabase implements OnInit {
  users: User[] = [];

  // modal fields
  selectedUser: any;

  constructor(
    private userService: UserBackendTs,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      this.cdr.detectChanges();
    });
  }
  router = inject(Router);
  addUser() {
    alert('Add user clicked (you can open add modal here)');
    this.router.navigate(['/userAdd']);
  }

  openEditModal(user: User) {
    this.selectedUser = { ...user };
  }

  updateUser() {
    this.userService
      .updateUser(this.selectedUser, this.selectedUser.id)
      .subscribe(() => {
        this.loadUsers();
        this.selectedUser = null;
      });
  }




  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete?')) {
      this.userService.deleteUser(id).subscribe(() => {
        alert('User deleted');
        this.loadUsers();
      });
    }
  }

  closeModal() {
    this.selectedUser = null;
  }

  // users: User[] = [];
  // constructor(private userService: UserBackendTs, private cdr: ChangeDetectorRef, private route: ActivatedRoute) {

  // }
  // ngOnInit(): void {
  //   this.loadUsers();
  // }
  // loadUsers() {
  //   this.userService.getUsers().subscribe((data) => {
  //     console.log(data);

  //     this.users = data;
  //     this.cdr.detectChanges();
  //   });
  // }
  // router = inject(Router);
  // addUser() {
  //   console.log("addUser Clicked ... ")
  //   this.router.navigate(['/userAdd']);

  // }
  // updateUser(id:number) {
  //   console.log("Update Button Clicked ...")
  //   this.router.navigate(['/userAdd',id]);
  // }
  // deleteUser(id:number) {

  //    this.userService.deleteUser(id).subscribe((data) => {
  //     alert('User deleted');
  //     console.log("user deleted ...",data)
  //     this.router.navigate(['/user-list-database']);
  //     this.cdr.detectChanges();
  //   });

  // }
}
