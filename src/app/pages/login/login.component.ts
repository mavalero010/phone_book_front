import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule ,FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  title = 'phone_book_angular';
  menuOption : string="";
  
  onOption(menuOption: string){
   this.menuOption = menuOption
  }
}
