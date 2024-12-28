import { ChatLayoutComponent } from './layouts/chat-layout/chat-layout.component';
import { Routes } from '@angular/router';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { CharacterProfileComponent } from './layouts/character-profile/character-profile.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeLayoutComponent },
  {
    path: 'character',
    component: CharacterProfileComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'chat', component: ChatLayoutComponent, canActivate: [authGuard] },
];
