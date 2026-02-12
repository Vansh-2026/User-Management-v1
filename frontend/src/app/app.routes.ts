import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { Login } from './login/login';

import { CrudKendoGrid } from './crud-kendo-grid/crud-kendo-grid';
import { SignUp } from './sign-up/sign-up';
import { ProductDetails } from './product-details/product-details';
import { students } from './students/students';
import { Footer } from './footer/footer';
import { ListUser } from './list-user/list-user';
import { User } from './user/user';
import { UserListDatabase } from './user-list-database/user-list-database';
import { UserDatabaseAdd } from './user-database-add/user-database-add';








export const routes: Routes = [
  { path: "home", component: Home },
  { path: "about", component: About },
  { path: "contact", component: Contact },
  { path: "login", component: Login },
  { path: "sign_up", component: SignUp },
  { path: "product_details", component: ProductDetails },
  { path: "students", component: students },
  { path: "crud", component: CrudKendoGrid },
  { path: "footer", component: Footer },
  { path: "list-user", component: ListUser },
  { path: "user-list-database", component:UserListDatabase },
  { path: "user/:id", component: User },
  { path: "userAdd/:id", component: UserDatabaseAdd },
  { path: "userAdd", component: UserDatabaseAdd },
  { path: "", component: Home, pathMatch: "full" }
];
