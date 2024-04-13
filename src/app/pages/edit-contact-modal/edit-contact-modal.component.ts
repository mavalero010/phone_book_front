import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ContactsService } from '../../services/contacts.service';
import { Contact } from '../../interfaces/contact.interface';

@Component({
  selector: 'app-edit-contact-modal',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './edit-contact-modal.component.html',
  styleUrl: './edit-contact-modal.component.css'
})
export class EditContactModalComponent {

  @ViewChild('closemodaledit') closemodal!: ElementRef;
  @Input() modalInfo : Contact = {Name:"",UserName:"",PhoneNumber:2, Comments:"", AdditionalFields:2,
  AdditionalField:{
    FieldId:-1,
    State:"",
    Birthday:"",
    Foundation:"",
    Nit:""
  }}
  @Output() editContacts = new EventEmitter<Contact[]>();
  protected _contactsservice = inject(ContactsService);

editContact(form : NgForm, contact : Contact) {
  if(form.valid){
    console.log(form.value.contactPhonesEdited);
    if(form.value){
      console.log(contact);
      
      this.closemodal.nativeElement.click();

    }
  }

 
}


}
