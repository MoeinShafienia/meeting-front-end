import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ProfessorStatus} from '../models/professor-status.model';
import {HttpClient} from '@angular/common/http';
import {DateStatus} from '../models/date-status.model';
import {MeetingInfo} from '../models/meeting-info.model';

@Injectable({
    providedIn: 'root'
})
export class CrudService {
    private api = 'http://localhost:3000/api';
    private professorsStatus$ = new BehaviorSubject<Partial<ProfessorStatus>[]>([]);
    private meetingInfo$ = new BehaviorSubject<MeetingInfo>(null);

    constructor(private http: HttpClient) {
    }

    loadProfessorStatus(id: string): void {
        this.http.get(`${this.api}/meeting/${id}/professorStatus`).subscribe(
            (res: any) => {
                this.getDateStatus(res, id);
            }
        );
    }

    loadMeeting(id: string): void {
        this.loadProfessorStatus(id);
        this.http.get(`${this.api}/meeting/${id}`).subscribe(
            (res: any) => {
                this.meetingInfo$.next(res);
            }
        );
    }

    getProfessors$(): Observable<any> {
        return this.http.get(`${this.api}/professor/test`);
    }

    getDateStatus$(id: string): Observable<any> {
        return this.http.get(`${this.api}/meeting/${id}/dateStatus`);
    }

    saveDateRange(id: number, rangeDate: string[]): void {
        this.http.post(`${this.api}/meeting/${id}/date`, {
            startDate: rangeDate[0],
            endDate: rangeDate[1],
        }).subscribe();
    }

    getDateStatus(professorsStatus: Partial<ProfessorStatus>[], id: string): void {
        this.http.get(`${this.api}/meeting/${id}/dateStatus`).subscribe(
            (res: any) => {
                const dateStatus = res as DateStatus[];
                professorsStatus.forEach(r => r.dateStatus = []);
                dateStatus.forEach(d => {
                    professorsStatus.forEach(f => {
                        f.dateStatus.push({
                            id: d.id,
                            value: d.time,
                            canFinilize: d.canFinilize,
                            status: d.professorIds.includes(f.id),
                        });
                    });
                });
                this.professorsStatus$.next(professorsStatus);
            },
        )
    }

    addProfessor(id: number, professorId: string, description: string): void {
        this.http.post(`${this.api}/meeting/${id}/addProfessor/${professorId}/${description}`, {}).subscribe(
            (res: any) => {
                const profStatus = res as ProfessorStatus;
                const currentStatus = this.professorsStatus$.getValue();
                currentStatus.push(profStatus);
                this.professorsStatus$.next([...currentStatus]);
            }
        );
    }

    getProfessorsStatus$(): Observable<Partial<ProfessorStatus>[]> {
        return this.professorsStatus$.asObservable();
    }

    getMeetingInfo$(): Observable<MeetingInfo> {
        return this.meetingInfo$.asObservable();
    }
}
