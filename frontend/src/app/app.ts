import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import {  FormGroup, ReactiveFormsModule ,} from '@angular/forms';
import { Footer } from "./footer/footer";
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, ReactiveFormsModule, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('user');

}
