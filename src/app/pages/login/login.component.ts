import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ContactsService } from '../../services/contacts.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  private readonly _contactsService = inject(ContactsService)
  ngOnInit(): void {
    console.log("Login");
    
  }
  title = 'phone_book_angular';

  login() {
    if(this.username!="" && this.password!=""){
      this._contactsService.login(this.username,this.password)
    }
  }
}
