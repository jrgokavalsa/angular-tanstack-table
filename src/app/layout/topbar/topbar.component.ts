import { NgClass } from '@angular/common';
import {
  Component,
  EventEmitter,
  Output,
  Renderer2,
  inject,
} from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  standalone: true,
  imports: [NgClass],
})
export class AppTopBarComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  private _enableDarkMode: boolean = false;

  public get enableDarkMode(): boolean {
    return this._enableDarkMode;
  }
  public set enableDarkMode(value: boolean) {
    this._enableDarkMode = value;
  }

  private _render = inject(Renderer2);

  toggleSlidebar() {
    this.toggleSidebar.next();
  }

  toggleTheme() {
    this._enableDarkMode = !this._enableDarkMode;
    if (this.enableDarkMode)
      this._render.addClass(document.body, 'dark-theme-variables');
    else this._render.removeClass(document.body, 'dark-theme-variables');
  }
}
