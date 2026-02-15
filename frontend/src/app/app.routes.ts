import { Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { TeamsComponent } from './teams.component';

export const routes: Routes = [
	{ path: '', redirectTo: 'teams', pathMatch: 'full' },
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'teams', component: TeamsComponent },
];
