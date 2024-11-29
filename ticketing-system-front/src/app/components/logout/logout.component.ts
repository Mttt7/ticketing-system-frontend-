import {Component} from '@angular/core';
import {AuthService} from "../../services/api/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
