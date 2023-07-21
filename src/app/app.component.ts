import { Component } from '@angular/core';
import {CrudService} from './services/crud.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'student-app-zorro';

    constructor(public crudService: CrudService) {
    }

    logout(): void {
        this.crudService.logout();
    }
}
