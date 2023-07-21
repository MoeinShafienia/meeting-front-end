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
    selectedProfessor: Professor;
    AddProfessorDescription: string;
    selectedFinalDateId: number;
    meetingDateStatus: DateStatus[]
    selectedDateStatus: DateStatus;
    selectedDatesStatus: DateStatus[];
    dateRangeChanged: boolean;
    shouldAddProfessor: boolean;
    shouldFinalizeDate: boolean;
    shouldSaveTimes: boolean;

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

    updateSelectedProfessor(professor: Professor): void {
        this.selectedProfessor = professor;
        this.validateAddProfessor();
    }

    addProfessor(): void {
        this.shouldAddProfessor = false;
        this.crudService.addProfessor(this.meetingInfo.id, this.selectedProfessor, this.AddProfessorDescription);
    }

    validateAddProfessor(): void {
        this.shouldAddProfessor = this.selectedProfessor != null &&
            this.AddProfessorDescription != null && this.AddProfessorDescription !== '';
    }

    updateSelectedFinalDateId(dateStatus: DateStatus): void {
        this.shouldFinalizeDate = dateStatus != null;
        this.selectedDateStatus = dateStatus;
    }

    addFinalizeDate(): void {
        this.shouldFinalizeDate = false;
        this.crudService.saveFinalizeDateStatus(this.meetingInfo.id, this.selectedDateStatus.id);
    }

    updateSelectedProfessorTimes(datesStatus: DateStatus[]): void {
        this.shouldSaveTimes = datesStatus.length > 0;
        this.selectedDatesStatus = datesStatus;
    }

    saveProfessorTimes(): void {
        this.shouldSaveTimes = false;
        const dateIds = this.selectedDatesStatus.map(d => d.id);
        this.crudService.saveProfessorTimes(this.meetingInfo.id, dateIds);
    }
}