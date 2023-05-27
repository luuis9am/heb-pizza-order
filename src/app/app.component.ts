import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'heb-pizza-order';

  constructor(private readonly router: Router) { }

  ngOnInit(): void {
    this.navToLoginOnLoad();
  }

  navToLoginOnLoad() {
    this.router.navigate(['login']).then(() => {
      console.log('Navigation to login completed!');
    }).catch((error) => {
      console.error('Navigation to login failed!', error);
    });
  }
}
