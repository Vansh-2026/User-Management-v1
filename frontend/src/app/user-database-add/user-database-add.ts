import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, NgForm } from '@angular/forms';
import { UserBackendTs } from '../service/data/user-backend';
import { User } from '../TableSchema';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-user-database-add',
  imports: [FormsModule],
  templateUrl: './user-database-add.html',
  styleUrl: './user-database-add.css',
})
export class UserDatabaseAdd implements OnInit {

  user: User = new User(null, '', '', '', '');
  id !: number;
  pid = '';
  name = '';
  email = '';
  city = '';
  constructor(private userService: UserBackendTs, private route: ActivatedRoute, private router: Router,private ref:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.userService.getUserById(this.id).subscribe(resp => {
      this.user.id=this.id;
      this.user.pid=resp.pid;
      this.user.name=resp.name;
      this.user.email=resp.email;
      this.user.city=resp.city;
      this.ref.detectChanges();
      // this.pid = user.pid;
      // this.name = user.name;
      // this.email = user.email;
      // this.city = user.city;
    });
  }

  // addUser
  addUser(form: NgForm) {
    let userData: User = form.value;


    this.userService.addUser(userData).subscribe({
      next: (data) => {
        console.log(data);
        form.reset();
      }
    });
  }
  // updateUser 
  updateUser() {

    const user: User = {
      id:this.id,
      pid: this.pid,
      name: this.name,
      email: this.email,
      city: this.city
    };

    this.userService.updateUser(this.id, user).subscribe(() => {
      alert('User updated');
      this.router.navigate(['/users']);
    });

  }
}
