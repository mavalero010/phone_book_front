import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ContactsService } from '../../services/contacts.service';
import { Contact } from '../../interfaces/contact.interface';
import { AddContactModalComponent } from '../add-contact-modal/add-contact-modal.component'

@Component({
    selector: 'app-contactlist',
    standalone: true,
    templateUrl: './contactlist.component.html',
    styleUrl: './contactlist.component.css',
    imports: [CommonModule, FormsModule, AddContactModalComponent]
})
export class ContactlistComponent implements OnInit {
  

  ngOnInit(): void {
   this.cts = JSON.parse(localStorage.getItem("user") || "")
  }

  private _contactsservice = inject(ContactsService);
  ctp = this._contactsservice.ctp;
  cts: Contact[] = JSON.parse(localStorage.getItem("user") || "")

  filteredContacts = this.cts.map((c) => {
    return {
      ...c,
    };
  });
  modalInfo: Contact = this.cts[0];
  formatContacts = this.filteredContacts;
  selectedContactType = 'All';
  
  
  onContactTypeChange($event: Event) {
    if ($event.toString() !== 'All') {
      const ct = this.ctp.find(
        (c) => c.TypeName == $event.toString()
      )?.ContactTypeId;
      this.filteredContacts = this.formatContacts.filter(
        (c) => c.ContactTypeId == ct
      );
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

  getEntriesValue(obj: any): any[] {
   

    return Object.entries(obj);
  }
  getEntriesValuesContactType(obj: Contact): any[] {
    if (obj.ContactType) {
      return Object.entries(obj.ContactType);
    }
    return [];
  }
  onSubmit(form: NgForm, m: Contact) {
    if (form.valid) {
    }
  }

  getEntriesValuesAdditionalFields(obj: Contact): any[] {
    if (obj.AdditionalField) {
      return Object.entries(obj.AdditionalField);
    }
    return [];
  }
  deleteContact(contact: Contact) {
    const contactList:Contact[]= JSON.parse(localStorage.getItem("user") || "{UserName:''}")
    const filter = contactList.filter(c => c.UserName !== contact.UserName);
    localStorage.setItem('user', JSON.stringify(filter))
    this.filteredContacts = filter
    console.log(filter);
    
  }
  getContacts(): string[] {
    return [""]
  }
  formatDate(dt: string) {
    const date = dt.split('/');
    return new Date(dt[0]);
  }

  editContact(contact: any) {
    const keys = this.getObjectKeys(contact);

    this.modalInfo = contact;
    return this._contactsservice.editContact();
  }
  postContact(info: { C: string }) {
    const contacts = this.getContacts();
    contacts.push(info.C);
    //Insert request to backend
  }

  updateList($event: Event) {
   console.log("EVENTE: ",$event);
   this.filteredContacts = JSON.parse(JSON.stringify($event))
    }

}
