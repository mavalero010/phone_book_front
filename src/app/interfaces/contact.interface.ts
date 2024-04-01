import { AdditionalField } from "./additionalfield.interface";
import { ContactType } from "./contactType.interface";

export  interface Contact {
    
        Name: string;
        UserName: string;
        Comments:string,
        AdditionalFields: number;
        PhoneNumber: number;
        ContactTypeId: number;
        AdditionalField?: AdditionalField;
        ContactType?: ContactType
    
}