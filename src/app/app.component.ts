import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './shared/components/toolbar/toolbar.component';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './shared/materials/material.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToolbarComponent, CommonModule, MaterialModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(public auth: AuthService) {}
  title = 'fauzanLogs';
}
