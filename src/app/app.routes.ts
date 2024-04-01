import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ContactlistComponent } from './pages/contactlist/contactlist.component';
import { ModalConfirmationComponent } from './pages/modal-confirmation/modal-confirmation.component';
import { ContactformComponent } from './pages/contactform/contactform.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
    {path:'',component: LoginComponent},
    {path:'contacts',component: ContactlistComponent},
    {path:'',component: ModalConfirmationComponent},
    {path:'contact/:id',component: ContactComponent},
    {path:'contactform',component: ContactformComponent},
    {path:'modal',component: ModalConfirmationComponent},
    {path:'**',redirectTo:"", pathMatch:"full"},
];
