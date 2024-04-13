import { Component, Input } from '@angular/core';
import { Contact } from '../../interfaces/contact.interface';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.css'
})
export class ConfirmationModalComponent {
  @Input() deleteContact?: ((contact: Contact) => void); 
  @Input() contact: Contact = {Name:"",UserName:"",PhoneNumber:1,Comments:"",AdditionalFields:1};
  delete(contact: Contact) {
    if (this.deleteContact && this.contact) {
      console.log("Contact: ",this.contact);
      
      this.deleteContact(this.contact); 
    }
  }
}
