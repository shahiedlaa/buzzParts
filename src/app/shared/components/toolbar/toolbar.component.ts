import { Component, Inject } from '@angular/core';
import { AsyncPipe, CommonModule, DOCUMENT } from '@angular/common';

import { RouterModule } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

import { MaterialModule } from '../../materials/material.module';

@Component({
  selector: 'app-toolbar',
  imports: [MaterialModule, RouterModule, AsyncPipe, CommonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) public document: Document
  ) {}

  login() {
    this.auth.loginWithRedirect();
  }

  logout() {
    this.auth.logout({
      logoutParams: {
        returnTo: this.document.location.origin,
      },
    });
  }
}
