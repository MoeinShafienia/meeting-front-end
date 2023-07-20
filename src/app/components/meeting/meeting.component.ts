import {Component, OnInit} from '@angular/core';
import {ProfessorStatus} from '../../models/professor-status.model';
import {CrudService} from '../../services/crud.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-meeting',
    templateUrl: './meeting.component.html',
    styleUrls: ['./meeting.component.css']
})

export class MeetingComponent implements OnInit {
    professorsStatus: Partial<ProfessorStatus>[];

    constructor(private crudService: CrudService) {
    }
    ngOnInit(): void {
        this.crudService.loadProfessorStatus('1');
         this.crudService.getProfessorsStatus$().subscribe(
            (res) => {
                console.log(res)
                this.professorsStatus = res;
            }
        );
    }

}