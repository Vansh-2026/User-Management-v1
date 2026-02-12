import { Component, importProvidersFrom, OnInit } from '@angular/core';
import { WelcomeDataService } from '../service/data/welcome-data';
import { response } from 'express';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  message = 'Some Welcome Message'
  welcomeMessageFromService: string = ''
  name = ''


  constructor(
    private service: WelcomeDataService
  ) { }


  welcomeService: string | undefined;
  

  getWelcomeMessageWithParameter() {
    //console.log(this.service.executeHelloWorldBeanService());

    this.service.executeHelloWorldServiceWithPathVariable('Vansh').subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    );

    //console.log('last line of getWelcomeMessage')

    //console.log("get welcome message");
  }


  handleSuccessfulResponse(response: any) {
    this.welcomeMessageFromService = response.message
    //console.log(response);
    //console.log(response.message);
  }

  handleErrorResponse(error: any) {
    //console.log(error);
    //console.log(error.error);
    //console.log(error.error.message);
    this.welcomeMessageFromService = error.error.message
  }





}

