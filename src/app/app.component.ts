import {Component, OnInit} from '@angular/core';
import {CrudService} from './services/crud.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    title = 'student-app-zorro';
    user: any;

    constructor(public crudService: CrudService) {
    }

    ngOnInit(): void {
        this.crudService.autoLogin();
        this.crudService.getUser$().subscribe(user => this.user = user);
        console.log(this.user)
    }

    logout(): void {
        this.crudService.logout();
    }
}
