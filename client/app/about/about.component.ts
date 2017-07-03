import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  constructor(private auth: AuthService,
  						private router: Router,) { }

	ngOnInit() {
		if (this.auth.loggedIn) {
			this.router.navigate(['/dashboard']);
		}
	}
}
