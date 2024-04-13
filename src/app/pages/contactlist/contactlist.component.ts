import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ContactsService } from '../../services/contacts.service';
import { Contact } from '../../interfaces/contact.interface';
import { AddContactModalComponent } from '../add-contact-modal/add-contact-modal.component'
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component'
import { EditContactModalComponent } from '../edit-contact-modal/edit-contact-modal.component';

@Component({
    selector: 'app-contactlist',
    standalone: true,
    templateUrl: './contactlist.component.html',
    styleUrl: './contactlist.component.css',
    imports: [CommonModule, FormsModule, AddContactModalComponent,ConfirmationModalComponent,EditContactModalComponent]
})
export class ContactlistComponent implements OnInit {
  

  ngOnInit(): void {
   this.cts = JSON.parse(localStorage.getItem("user") || "")
  }

  protected _contactsservice = inject(ContactsService);
  ctp = this._contactsservice.ctp;
  cts: Contact[] = JSON.parse(localStorage.getItem("user") || "")

  filteredContacts = this.cts.map((c) => {
    return {
      ...c,
    };
  });
  modalInfo: Contact = {Name:"",UserName:"",PhoneNumber:-1,Comments:"",AdditionalFields:-1};
  formatContacts = this.filteredContacts;
  selectedContactType = 'All';
  
  
  onContactTypeChange($event: Event) {
    
    if ($event.toString() !== 'All') {

      if(this.formatContacts.length>0){
        const ct = this.ctp.find(
          (c) => c.TypeName == $event.toString()
        )?.ContactTypeId;
        this.filteredContacts = this.formatContacts.filter(
          (c) => c.ContactTypeId == ct
        );
        
      }
    } else {
      
      this.filteredContacts = this.formatContacts;
    }
  }

  getAdditionalFieldObjectValues(contact: any): any[] {
    if (
      contact.AdditionalFields == null ||
      contact.AdditionalFields == undefined
    ) {
      delete contact.AdditionalFields;
      delete contact.AdditionalField;
    }
    return Object.values(contact.AdditionalField);
  }
  getObjectValues(obj: any): any[] {
    return Object.values(obj);
  }
  getObjectKeys(obj: any): any[] {
    return Object.keys(obj);
  }

  
 
  onSubmit(form: NgForm, m: Contact) {
    if (form.valid) {
    }
  }


  deleteContact(contact: Contact) {
    const contactList:Contact[]= JSON.parse(localStorage.getItem("user") || "{UserName:''}")
    const filter = contactList.filter(c => c.UserName !== contact.UserName);
    localStorage.setItem('user', JSON.stringify(filter))
    this.filteredContacts = filter
    this.formatContacts = filter
    
  }
  

  editContact(contact: Contact) {
    const contactList:Contact[]= JSON.parse(localStorage.getItem("user") || "{UserName:''}")

    const filter = contactList.filter(c => c.UserName !== contact.UserName);
    


    this.modalInfo = contact;
    console.log("ello",this.modalInfo);
    
    return this._contactsservice.editContact();
  }
 

  updateList($event: Event) {
   this.filteredContacts = JSON.parse(JSON.stringify($event))
   this.formatContacts = this.filteredContacts
    }

}
