import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-contact-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-contact-modal.component.html',
  styleUrl: './add-contact-modal.component.css'
})
export class AddContactModalComponent {
  username : string = ""
  name : string = ""
  contactTypeId : number = -1
  comments : string = ""
  phone : string = ""
  nit? : string = ""
  state? : string = ""
  foundation? : Date
  birthday?: Date

addContact(form : NgForm) {
  if(form.valid){
    console.log("GOllaa");
    
    if(form.value.contactUsernameAdded){
      console.log(form.value.contactUsernameAdded);
      
    }
  }
}

}
