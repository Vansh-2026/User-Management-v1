import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { UserData } from '../service/data/user-data';
import { User1 } from '../list-user/list-user';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'console';
import { ToolbarTemplateDirective } from '@progress/kendo-angular-grid';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  imports: [FormsModule,CommonModule],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User implements OnInit {
  id: number = 0;

  user: User1 = new User1(1, '', '', '', '');
  constructor(private userService: UserData, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.user = new User1(this.id,'','','','');
    if (this.id != -1) {
        this.userService.retreiveTodo('Het', this.id).subscribe(data => {
          this.user = data;
          console.log(this.user);
          this.cdr.detectChanges();

          // console.log(data);
        });
      }
  
  }
  router = inject(Router);
  saveTodo() {
    if (this.id === -1) {
      this.id = this.route.snapshot.params['id'];
      console.log(this.id + " is ID");

      this.userService.createTodo('Het', this.user).subscribe((data) => {
        console.log(data);
        this.router.navigate(['/list-user']);
      })
      //create 
    } else {

      this.id = this.route.snapshot.params['id'];
      console.log(this.id + " is ID");

      this.userService.updateTodo('Het', this.id, this.user).subscribe((data) => {
        console.log(data);
        this.router.navigate(['/list-user']);
      })
    }


  }

}
