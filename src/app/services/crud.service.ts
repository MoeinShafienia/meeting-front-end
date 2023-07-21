import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ProfessorStatus} from '../models/professor-status.model';
import {HttpClient} from '@angular/common/http';
import {DateStatus} from '../models/date-status.model';
import {MeetingInfo} from '../models/meeting-info.model';
import {Professor} from '../models/professor.model';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class CrudService {
    user$ = new BehaviorSubject<any>(null);
    private api = 'http://localhost:3000/api';
    private professorsStatus$ = new BehaviorSubject<Partial<ProfessorStatus>[]>([]);
    private meetingInfo$ = new BehaviorSubject<MeetingInfo>(null);

    constructor(private http: HttpClient, private router: Router) {
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
        });
    }

    saveFinalizeDateStatus(id: number, dateId: number): void {
        this.http.post(`${this.api}/meeting/${id}/finilize/${dateId}`, {}).subscribe(
            (meetingInfo) => {
                this.meetingInfo$.next({...meetingInfo as MeetingInfo});
            }
        );
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

    addProfessor(id: number, professor: Professor, description: string): void {
        this.http.post(`${this.api}/meeting/${id}/addProfessor/${professor.id}/${description}`, {}).subscribe(
            (res: any) => {
                const profStatus: Partial<ProfessorStatus> = {
                    id: professor.id,
                    status: 'pending',
                    dateStatus: null,
                    description,
                    name: professor.name,
                };
                const currentStatus = this.professorsStatus$.getValue();
                currentStatus.push(profStatus);
                this.professorsStatus$.next([...currentStatus]);
            }
        );
    }

    saveProfessorTimes(id: number, dateIds: number[]): void {
        this.http.post(`${this.api}/meeting/${id}/setDate`, {
            dateIds
        }).subscribe(
            (res: any) => {
                this.loadMeeting(id.toString());
            }
        );
    }

    login(username: string, password: string): void {
        this.http.post(`${this.api}/auth/login`, {
            username,
            password,
        }).subscribe(
            (res) => {
                localStorage.setItem('user', JSON.stringify(res));
                this.user$.next(res);
                this.router.navigate(['/overview']);
            }
        )
    }

    getProfessorsStatus$(): Observable<Partial<ProfessorStatus>[]> {
        return this.professorsStatus$.asObservable();
    }

    getMeetingInfo$(): Observable<MeetingInfo> {
        return this.meetingInfo$.asObservable();
    }

    logout(): void {
        localStorage.removeItem('user');
        this.user$.next(null);
    }
}
