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

  user: {} = {};
  userFromLocalStorage: any = localStorage.getItem('user');
  contactsFromLocalStorage: any = localStorage.getItem('contacts');

  ngOnInit(): void {
    if (this.userFromLocalStorage) {
      this.user = JSON.parse(this.userFromLocalStorage);
          
    }
    if (this.contactsFromLocalStorage) {
      this.cts = JSON.parse(this.contactsFromLocalStorage);
      console.log(this.cts);
      
    }
  }

  private _contactsservice = inject(ContactsService);
  af = this._contactsservice.af;
  ctp = this._contactsservice.ctp;
  cts = this._contactsservice.cts;

  afwithdates = this.af.filter((a) => a.Birthday != null);

  filteredContacts = this.cts.map((c) => {
    return {
      ...c,
      AdditionalField: this.af.find((a) => a.FieldId == c.AdditionalFields),
      ContactType: this.ctp.find((ci) => ci.ContactTypeId == c.ContactTypeId),
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
  deleteContact(contact: {}) {
    return this._contactsservice.deleteContact();
  }
  getContacts(): string[] {
    return (
      JSON.parse(localStorage.getItem(this.userFromLocalStorage) as string) ||
      []
    );
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

}
