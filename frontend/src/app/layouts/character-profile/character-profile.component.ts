import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { CharacterRegistrationService } from '../../core/services/character-registration.service';
import { RouterModule, Routes } from '@angular/router';
import { ChatLayoutComponent } from '../chat-layout/chat-layout.component';
import { Router } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';

import { camelCase } from 'lodash';

const routes: Routes = [
  { path: 'chat', component: ChatLayoutComponent, canActivate: [authGuard] },
];

@Component({
  selector: 'app-character-profile',
  standalone: true,
  imports: [FormsModule, NgIf, RouterModule],
  templateUrl: './character-profile.component.html',
  styleUrl: './character-profile.component.css',
})
export class CharacterProfileComponent {
  constructor(
    private characterRegistrationService: CharacterRegistrationService,
    private router: Router
  ) {}

  onSubmit(characterForm: NgForm) {
    if (characterForm.valid) {
      console.log('Form Submitted', characterForm.value);
      this.characterRegistrationService
        .registerCharacter(characterForm.value)
        .subscribe({
          next: (response) => {
            console.log('Character registered successfully:', response);
            this.router.navigate(['/chat']);
          },
          error: (error) => {
            console.error('Error registering character:', error);
          },
        });
    } else {
      console.error('Form is invalid.');
    }
  }
}
