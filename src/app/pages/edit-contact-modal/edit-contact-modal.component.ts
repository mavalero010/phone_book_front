import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ContactsService } from '../../services/contacts.service';
import { Contact } from '../../interfaces/contact.interface';
import { AdditionalField } from '../../interfaces/additionalfield.interface';

@Component({
  selector: 'app-edit-contact-modal',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './edit-contact-modal.component.html',
  styleUrl: './edit-contact-modal.component.css'
})
export class EditContactModalComponent {

  @ViewChild('closemodaledit') closemodaledit!: ElementRef;
  @Input() contactIndex: number = 1
   contacts : Contact[] = JSON.parse(localStorage.getItem("user") || "[{Name:'',UserName:'',PhoneNumber:2, Comments:'', AdditionalFields:2}]")

   @Input() modalInf : Contact = {Name:"",UserName:"",PhoneNumber:2, Comments:"", AdditionalFields:2,
  AdditionalField:{
    FieldId:-1,
    State:"",
    Birthday:"",
    Foundation:"",
    Nit:""
  }}

  @Output() editContacts = new EventEmitter<any>();
  protected _contactsservice = inject(ContactsService);
  submitButtonClicked: boolean = false;
  
  editContact(form : NgForm, contact : Contact) {

  if(form.valid){
    if(form.value && this.submitButtonClicked===true){
      this.contacts = JSON.parse(localStorage.getItem("user") || "[{Name:'',UserName:'',PhoneNumber:2, Comments:'', AdditionalFields:2}]")

      const ct: Contact = this.contacts[this.contactIndex] || 
      {UserName:"",Name:"",PhoneNumber:-1,Comments:"",AdditionalFields:-1}

      const af : AdditionalField = this.contacts[this.contactIndex].AdditionalField || {
        FieldId: -1,
        State: "",
        Birthday: "",
        Foundation: "",
        Nit: ""
      }
      console.log(ct); 
      
      if(form.value.contactNameEdited){
        ct.Name = form.value.contactNameEdited
      }
          
      if(form.value.contactCommentsEdited){
        ct.Comments = form.value.contactCommentsEdited
      }
          
      if(form.value.birthdayEdited){
        af.Birthday = form.value.birthdayEdited 
      }
      if(form.value.contactPhonesEdited){
        ct.PhoneNumber = form.value.contactPhonesEdited
      }
      if(form.value.foundationEdited){
        af.Foundation = form.value.foundationEdited
      }
      if(form.value.nitEdited){
        af.Nit = form.value.nitEdited
      }
      if(form.value.stateEdited){
       af.State = form.value.stateEdited
      }

      ct.AdditionalField = af
      this.contacts[this.contactIndex] = ct
      localStorage.setItem('user', JSON.stringify(this.contacts))
      this.closemodaledit.nativeElement.click();
      this.submitButtonClicked = false
      this.editContacts.emit(this.contacts);

    }
  }

 
}


}
