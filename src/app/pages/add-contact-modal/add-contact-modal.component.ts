import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Contact } from '../../interfaces/contact.interface';
import { Router } from '@angular/router';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component'

@Component({
  selector: 'app-add-contact-modal',
  standalone: true,
  imports: [FormsModule,ConfirmationModalComponent],
  templateUrl: './add-contact-modal.component.html',
  styleUrl: './add-contact-modal.component.css'
})
export class AddContactModalComponent {
  constructor(private _router: Router) {}
  contact : Contact = {Name:"",UserName:"",Comments:"",PhoneNumber:-1,AdditionalFields:-1}
  @ViewChild('closemodaledit') closemodal!: ElementRef;
  @Output() contactList = new EventEmitter<any>();
  contactType: string = "Person";
 
addContact(form : NgForm) {
  if(form.valid){
    
    if(form.value){
      const conts:Contact[] = JSON.parse(localStorage.getItem("user") || "{}")
      let FieldsID : number = 1

      if(conts.length > 0){
        FieldsID = conts.filter(c=>c.AdditionalFields!=null).map(f=> f.AdditionalFields)
        .reduce((a, b) => Math.max(a, b))
      }
      console.log(typeof(form.value.contactPhonesadded))

      this.contact = {
        Name: form.value.contactNameAdded,
        UserName: form.value.contactUsernameAdded,
        Comments:form.value.contactCommentsadded,
        PhoneNumber:parseInt(form.value.contactPhonesadded),
        AdditionalFields:FieldsID+1,
        AdditionalField : {
          FieldId:FieldsID+1,
          State:form.value.state,
          Birthday:form.value.birthday,
          Foundation:form.value.foundation,
          Nit:form.value.nit,
      },
    }
    
    if(this.contactType=="Person" || this.contactType==null){    
      this.contact.ContactType = {ContactTypeId: 1,TypeName: "Person"}
      this.contact.ContactTypeId = 1
    }
    if(this.contactType=="Public Organization"){
      this.contact.ContactType = {ContactTypeId: 2,TypeName: "Public Organization"}
      this.contact.ContactTypeId = 2
    }
    if(this.contactType=="Private Organization"){
      this.contact.ContactType={ContactTypeId: 3,TypeName: "Private Organization"}
      this.contact.ContactTypeId = 3
    }
    

    
    if(conts.find((c: { UserName: string; }) => c.UserName === this.contact.UserName)){
      console.log("User exist");
      return null
    }else{
      
      conts.push(this.contact)
      localStorage.setItem('user', JSON.stringify(conts))
      this.closemodal.nativeElement.click();
      this.contactList.emit(conts);
      
      form.reset()
      form.value.state=""
      form.value.birthday=""
      form.value.foundation=""
      form.value.nit=""
      form.value.FieldId=conts.length-1
      return conts
    }
    
  }

}
return null

}
}