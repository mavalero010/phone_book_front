import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AdditionalField } from '../interfaces/additionalfield.interface';
import { ContactType } from '../interfaces/contactType.interface';
import { Contact } from '../interfaces/contact.interface';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  httpOptions : {} ={}
  private localStorageKey = "contactlist" // From backend

  //Hardcoding provisional
 
  ctp:ContactType[] = [
    { ContactTypeId: 1, TypeName: 'Person' },
    { ContactTypeId: 2, TypeName: 'Public Organization' },
    { ContactTypeId: 3, TypeName: 'Private Organization' },
    
  ];

  cts:Contact[] = [
    {
      Name: 'Juan perez',
      UserName:"JuanPi",
      AdditionalFields: 0,
      Comments:"",
      PhoneNumber: 877567,
            AdditionalField:    {
        FieldId: 1,
        State: 'Kansas',
      },
      ContactTypeId: 0,
    },
    {
      Name: 'Joaquin Ardila',
      UserName:"Juaco",
      Comments:"Colegio",
      AdditionalFields: 1,
      AdditionalField:    {
        FieldId: 1,
        State: 'Kansas',
      },
      PhoneNumber: 877567,
      ContactTypeId: 0,
    },
    {
      Name: 'Miguel perez',
      UserName:"Miguelo",
      Comments:"Universidad",
      AdditionalFields: 1,
      AdditionalField:    {
        FieldId: 1,
        State: 'Kansas',
      },
      PhoneNumber: 234654,
      ContactTypeId: 0,
    },
    {
      Name: 'Org Inc',
      UserName:"Orginc",
      Comments:"Postulación de empleo",
      AdditionalFields: 2,
      AdditionalField:{
        FieldId: 2,
        Nit: '555555555',
        State: 'Arizona',
        Foundation: '30/09/1990',
      },
      PhoneNumber: 123125,
      ContactTypeId: 1,
    },
    {
      Name: 'Taxes Inc',
      UserName:"Tax",
      Comments:"Impuestos",
      AdditionalFields: 2,
      AdditionalField:{
        FieldId: 2,
        Nit: '555555555',
        State: 'Activo',
        Foundation: '30/09/2012',
      },
      PhoneNumber: 645464,
      ContactTypeId: 2,
    },
  ];
 
  constructor(private _router: Router) { 
    //localStorage.removeItem('user');
    //localStorage.setItem('user', JSON.stringify(this.cts))
    
    
  }
  
  
  deleteContact() {
    console.log("delete service");
    
  }
  editContact() {
    console.log("Edit service");
    
  }

  public _http = inject(HttpClient);
  public _baseurl = "http://localhost:5173"


 login(username: string, password : string){
  if(username !== null && password !== null){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this._http.post(`${this._baseurl}/user/login/${username}/${password}`,{}).subscribe(
      (response: any) => {
        if(response!==undefined && response!==null ){
          localStorage.setItem('user', JSON.stringify(response));
          this._router.navigate(['/contacts']);    
          
        }
        else{
        }
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }
 }

 getAllContacts(contactNames : []){
  let ctcs : any = localStorage.getItem("contacts");
  if(ctcs == null){
    this._http.get(`${this._baseurl}/contact/getall/`).subscribe(
      (response: any) => {
        if(response!==undefined){
          ctcs = localStorage.setItem('contacts', JSON.stringify(response));
          return localStorage.getItem("contacts");

        }
        else{
          return [];
        }
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }

  return ctcs
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

getEntriesValuesAdditionalFields(obj: Contact): any[] {
  if (obj.AdditionalField) {
    
    return Object.entries(obj.AdditionalField);
  }
  return [];
}
}
