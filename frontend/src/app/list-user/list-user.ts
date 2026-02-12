import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { UserData } from '../service/data/user-data';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


export class User1 {

  constructor(
    public id: number,
    public pid: string,
    public name: string,
    public email: string,
    public city: string
  ) { }
}

@Component({
  selector: 'app-list-user',
  imports: [CommonModule, FormsModule],
  templateUrl: './list-user.html',
  styleUrl: './list-user.css',
})
export class ListUser implements OnInit {

  User: User1[] = []
  message: string = '';

  constructor(private userService: UserData, private cdr: ChangeDetectorRef) {

  }
  ngOnInit() {
    this.refreshUser();
    this.cdr.detectChanges();

  }
  refreshUser() {
    this.userService.retrieveAllTodos('Vansh').subscribe(
      response => {

        this.User = response;
        this.cdr.detectChanges();
      }

    );
  }
  deleteUser(id: any) {
    console.log(`Delete Id ... ${id}`)

    this.userService.deleteTodo('Vansh', id).subscribe(() => {
      this.User = this.User.filter(User => User.id !== id);
      this.message = `Delete of Todo ${id} Successful!`;
      this.cdr.detectChanges();
    });



  }
  router = inject(Router);
  updateUser(id: number) {
    this.router.navigate(['/user', id]);
    console.log(`Update  Id ... ${id}`)
  }

  addUser(){
    this.router.navigate(['user',-1]);
  }



}
