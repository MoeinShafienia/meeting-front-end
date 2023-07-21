import {Component, OnInit} from '@angular/core';
import {ProfessorStatus} from '../../models/professor-status.model';
import {CrudService} from '../../services/crud.service';
import {MeetingInfo} from '../../models/meeting-info.model';
import {Professor} from '../../models/professor.model';
import { DateStatus } from 'src/app/models/date-status.model';

@Component({
    selector: 'app-meeting',
    templateUrl: './meeting.component.html',
    styleUrls: ['./meeting.component.css']
})

export class MeetingComponent implements OnInit {
    professorsStatus: Partial<ProfessorStatus>[];
    meetingInfo: MeetingInfo;
    dateRange: any = [];
    professors: Professor[] = [];
    dateRangeChanged: boolean;
    shouldAddProfessor: boolean;
    selectedProfessorId: string;
    AddProfessorDescription: string;
    selectedfinalDateId: number;
    meetingDateStatus: DateStatus[]

    constructor(private crudService: CrudService) {
    }
    ngOnInit(): void {
        this.crudService.loadMeeting('1');
         this.crudService.getProfessorsStatus$().subscribe(
            (res) => {
                this.professorsStatus = res;
            }
        );
         this.crudService.getMeetingInfo$().subscribe((meetingInfo) => {
             if(meetingInfo != null) {
                 this.meetingInfo = meetingInfo;
                 this.dateRange.push(meetingInfo.startDate);
                 this.dateRange.push(meetingInfo.endDate);
             }

         });
         this.crudService.getProfessors$().subscribe((professors) => {
             this.professors = professors;
         });
         this.crudService.getDateStatus$('1').subscribe((dateStatus) => {
            this.meetingDateStatus =    dateStatus
        });
    }

    updateRangeDate(dateRange: any[]) {
        this.dateRangeChanged = true;
        this.dateRange = dateRange;

    }

    saveDateRange(): void {
        this.crudService.saveDateRange(this.meetingInfo.id, this.dateRange);
        this.dateRangeChanged = false;
    }

    updateSelectedProfessor(professorId: string): void {
        if(professorId != null) {
            this.shouldAddProfessor = true;
            this.selectedProfessorId = professorId;
        }
    }

    updateSelectedfinalDateId(dateId: number): void {
        // if(professorId != null) {
        //     this.shouldAddProfessor = true;
        //     this.selectedProfessorId = professorId;
        // }
    }

    addProfessor(): void {
        this.shouldAddProfessor = false;
        this.crudService.addProfessor(this.meetingInfo.id, this.selectedProfessorId, this.AddProfessorDescription);
    }
}